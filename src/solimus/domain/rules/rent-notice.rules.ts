import { Amount, IsoDate } from '../models/common.model';
import { RentLine } from '../models/rent.model';
import { TaxSettings } from '../models/agency.model';

/** Default agency tax settings: 18% VAT, 3.6% waste tax (specification 4.14). */
export const DEFAULT_TAX_SETTINGS: TaxSettings = {
  vatEnabled: true,
  vatRate: 0.18,
  vatBase: 'rent',
  vatLabel: 'TVA SUR LOYER (18 %)',
  wasteTaxEnabled: true,
  wasteTaxRate: 0.036,
  wasteTaxAppliesTo: 'professionalAndCommercial',
};

export interface RentNoticeInput {
  readonly rent: Amount;
  readonly charges: Amount;
  /** Companies with a NINEA are VAT liable (RG-17). */
  readonly vatLiable: boolean;
  /** Professional and commercial leases carry a waste-tax provision instead of charges. */
  readonly wasteTaxApplies: boolean;
  /** Unpaid amount carried over from the previous notice (RG-16). */
  readonly previousBalance?: Amount;
  readonly settings?: TaxSettings;
}

export interface RentNoticeComputation {
  readonly lines: readonly RentLine[];
  readonly periodTotal: Amount;
  readonly total: Amount;
}

/** Amounts are rounded to the nearest franc: the currency has no sub-unit. */
const round = (value: number): Amount => Math.round(value);

/**
 * Builds the lines of a rent notice (RG-16, RG-17).
 *
 * Order is the printed order: rent, charges or waste tax, VAT, previous balance.
 */
export function computeRentNotice(input: RentNoticeInput): RentNoticeComputation {
  const settings = input.settings ?? DEFAULT_TAX_SETTINGS;
  const lines: RentLine[] = [{ kind: 'rent', label: 'LOYER', amount: input.rent }];

  if (input.wasteTaxApplies && settings.wasteTaxEnabled) {
    lines.push({
      kind: 'wasteTax',
      label: `PROVISION T.O.M. (${(settings.wasteTaxRate * 100).toLocaleString('fr-FR')} %)`,
      amount: round(input.rent * settings.wasteTaxRate),
    });
  } else if (input.charges > 0) {
    lines.push({ kind: 'charges', label: 'CHARGES LOCATIVES (provision)', amount: input.charges });
  }

  if (input.vatLiable && settings.vatEnabled) {
    const base = settings.vatBase === 'rentAndCharges' ? input.rent + input.charges : input.rent;
    lines.push({ kind: 'vat', label: settings.vatLabel, amount: round(base * settings.vatRate) });
  }

  const periodTotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const previousBalance = input.previousBalance ?? 0;

  if (previousBalance !== 0) {
    lines.push({ kind: 'previousBalance', label: 'SOLDE ANTÉRIEUR', amount: previousBalance });
  }

  return { lines, periodTotal, total: periodTotal + previousBalance };
}

/**
 * Date a rent notice is issued: the 25th of the previous month (RG-16).
 * A lease signed after the 25th gets its first notice on the signature date (RG-18).
 */
export function rentNoticeIssueDate(period: IsoDate, leaseSignedOn?: IsoDate): IsoDate {
  const [year, month] = period.split('-').map(Number);
  const previousMonth = month === 1 ? 12 : month - 1;
  const previousYear = month === 1 ? year - 1 : year;
  const scheduled = `${previousYear}-${String(previousMonth).padStart(2, '0')}-25`;
  return leaseSignedOn && leaseSignedOn > scheduled ? leaseSignedOn : scheduled;
}
