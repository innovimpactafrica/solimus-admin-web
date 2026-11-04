import { computeRentNotice, rentNoticeIssueDate } from './rent-notice.rules';
import { computeOwnerRemittance, managementFee } from './remittance.rules';
import { checkPayoutRequest, payoutNeedsDoubleApproval } from './payout.rules';
import { quoteNeedsOwnerApproval, canCloseIncident } from './works.rules';
import { usageLevel, canAdd, canSwitchTo, withVat, yearlyFromMonthly } from './subscription.rules';
import { effortRate, applicationIsComplete, missingApplicationDocuments } from './application.rules';
import { reminderStage } from './reminder.rules';
import { settleDeposit } from './deposit.rules';
import { Plan } from '../models/subscription.model';

/**
 * Every figure below is taken from the reference mockup, so the Angular apps
 * are guaranteed to show the same amounts as the approved design.
 */
describe('Solimus business rules', () => {
  describe('rent notices (RG-16, RG-17)', () => {
    it('bills rent plus charges for a private tenant', () => {
      const notice = computeRentNotice({ rent: 450_000, charges: 25_000, vatLiable: false, wasteTaxApplies: false });

      expect(notice.lines.map((l) => l.kind)).toEqual(['rent', 'charges']);
      expect(notice.total).toBe(475_000);
    });

    it('adds the waste tax and 18% VAT for a company on a professional lease', () => {
      const notice = computeRentNotice({ rent: 600_000, charges: 0, vatLiable: true, wasteTaxApplies: true });

      expect(notice.lines.map((l) => l.amount)).toEqual([600_000, 21_600, 108_000]);
      expect(notice.total).toBe(729_600);
    });

    it('bills the commercial lease of the mockup at 912 000 FCFA', () => {
      const notice = computeRentNotice({ rent: 750_000, charges: 0, vatLiable: true, wasteTaxApplies: true });

      expect(notice.total).toBe(912_000);
    });

    it('carries the unpaid balance over to the next notice', () => {
      const notice = computeRentNotice({
        rent: 650_000,
        charges: 35_000,
        vatLiable: false,
        wasteTaxApplies: false,
        previousBalance: 685_000,
      });

      expect(notice.periodTotal).toBe(685_000);
      expect(notice.total).toBe(1_370_000);
    });

    it('issues the notice on the 25th of the previous month', () => {
      expect(rentNoticeIssueDate('2026-11-01')).toBe('2026-10-25');
      expect(rentNoticeIssueDate('2027-01-01')).toBe('2026-12-25');
    });

    it('issues the first notice on the signature date when the lease is signed after the 25th (RG-18)', () => {
      expect(rentNoticeIssueDate('2026-11-01', '2026-10-28')).toBe('2026-10-28');
    });
  });

  describe('owner remittance (RG-15)', () => {
    it('pays 405 000 FCFA on a 450 000 FCFA rent with a 10% fee', () => {
      const remittance = computeOwnerRemittance({ rentCollected: 450_000, feeRate: 0.1 });

      expect(remittance.fees).toBe(45_000);
      expect(remittance.net).toBe(405_000);
    });

    it('deducts approved repair work from the next remittance', () => {
      const remittance = computeOwnerRemittance({ rentCollected: 1_170_000, feeRate: 0.1, works: 134_000 });

      expect(remittance.net).toBe(919_000);
    });

    it('matches the September statement of the mockup', () => {
      expect(managementFee(1_820_000, 0.1)).toBe(182_000);
      expect(computeOwnerRemittance({ rentCollected: 1_820_000, feeRate: 0.1 }).net).toBe(1_638_000);
    });
  });

  describe('payout requests (RG-12, RG-13)', () => {
    const base = { available: 2_900_000, beingProcessed: 0, accountVerified: true };

    it('accepts a request within the available balance', () => {
      expect(checkPayoutRequest({ ...base, amount: 2_000_000 }).valid).toBeTrue();
    });

    it('refuses an amount below 10 000 FCFA', () => {
      expect(checkPayoutRequest({ ...base, amount: 9_000 }).reason).toBe('belowMinimum');
    });

    it('refuses more than the balance left once pending requests are counted', () => {
      const check = checkPayoutRequest({ ...base, beingProcessed: 2_000_000, amount: 1_000_000 });

      expect(check.reason).toBe('aboveAvailable');
      expect(check.requestable).toBe(900_000);
    });

    it('refuses any payout while the account is unverified', () => {
      expect(checkPayoutRequest({ ...base, accountVerified: false, amount: 1_200_000 }).reason)
        .toBe('accountNotVerified');
    });

    it('requires a second approval from 5 000 000 FCFA', () => {
      expect(payoutNeedsDoubleApproval(5_500_000)).toBeTrue();
      expect(payoutNeedsDoubleApproval(4_000_000)).toBeFalse();
    });
  });

  describe('repair quotes (RG-25, RG-27)', () => {
    it('lets the manager approve a quote up to the mandate threshold', () => {
      expect(quoteNeedsOwnerApproval(38_000)).toBeFalse();
      expect(quoteNeedsOwnerApproval(50_000)).toBeFalse();
    });

    it('sends larger quotes to the owner', () => {
      expect(quoteNeedsOwnerApproval(96_000)).toBeTrue();
      expect(quoteNeedsOwnerApproval(185_000)).toBeTrue();
    });

    it('only closes an incident with an approved quote, work done and an invoice', () => {
      expect(canCloseIncident({ quoteApproved: true, workDone: true, invoiceUploaded: true })).toBeTrue();
      expect(canCloseIncident({ quoteApproved: true, workDone: true, invoiceUploaded: false })).toBeFalse();
    });
  });

  describe('plans and limits (RG-28, RG-29)', () => {
    it('warns at 80% and blocks at 100%', () => {
      expect(usageLevel(46, 100)).toBe('ok');
      expect(usageLevel(4, 5)).toBe('warning');
      expect(usageLevel(3, 3)).toBe('blocked');
    });

    it('refuses to add an owner once the Essentiel limit is reached', () => {
      const usage = { owners: 3, properties: 22, users: 2, storageGb: 2.1 };
      const limits = { owners: 3, properties: 25, users: 2, storageGb: 5 };

      expect(canAdd('owners', usage, limits)).toBeFalse();
      expect(canAdd('properties', usage, limits)).toBeTrue();
    });

    it('allows a downgrade only when usage fits the smaller plan', () => {
      const essentiel = {
        id: 'essentiel', name: 'Essentiel', monthlyExclTax: 25_000, yearlyExclTax: 250_000,
        limits: { owners: 3, properties: 25, users: 2, storageGb: 5 }, features: [], visibleOnWebsite: true,
      } as Plan;

      expect(canSwitchTo(essentiel, { owners: 12, properties: 46, users: 4, storageGb: 6.4 })).toBeFalse();
      expect(canSwitchTo(essentiel, { owners: 2, properties: 9, users: 1, storageGb: 0.4 })).toBeTrue();
    });

    it('adds 18% VAT to the subscription invoice', () => {
      expect(withVat(750_000)).toBe(885_000);
      expect(withVat(25_000)).toBe(29_500);
      expect(withVat(200_000)).toBe(236_000);
    });

    it('gives two months free on the yearly cycle', () => {
      expect(yearlyFromMonthly(75_000)).toBe(750_000);
    });
  });

  describe('applications', () => {
    it('computes the effort rate shown on the applicant card', () => {
      expect(Math.round(effortRate(350_000, 15_000, 950_000) * 100)).toBe(38);
    });

    it('knows when a file is complete', () => {
      expect(applicationIsComplete(6)).toBeTrue();
      expect(applicationIsComplete(5)).toBeFalse();
      expect(missingApplicationDocuments(4).length).toBe(2);
    });
  });

  describe('reminders (RG-19)', () => {
    it('follows the J-3, J+1, J+7, J+15 ladder', () => {
      expect(reminderStage(-3, false)).toBe('beforeDue');
      expect(reminderStage(1, false)).toBe('first');
      expect(reminderStage(11, false)).toBe('second');
      expect(reminderStage(15, false)).toBe('formalNotice');
    });

    it('stops as soon as the rent is paid', () => {
      expect(reminderStage(11, true)).toBe('none');
    });
  });

  describe('deposit refund (RG-23)', () => {
    it('refunds 422 400 FCFA after the deductions of the mockup', () => {
      const settlement = settleDeposit(480_000, [
        { label: 'Remplacement de deux vitres', amount: 45_000 },
        { label: 'Facture SDE de septembre', amount: 12_600 },
      ]);

      expect(settlement.refunded).toBe(422_400);
    });
  });
});
