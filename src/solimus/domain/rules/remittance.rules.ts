import { Amount } from '../models/common.model';

export interface OwnerRemittanceInput {
  /** Rent actually collected this month, charges excluded. */
  readonly rentCollected: Amount;
  /** Charges collected on top of the rent; they fund the expenses they cover. */
  readonly chargesCollected?: Amount;
  /** Management fee rate from the mandate, e.g. 0.10. */
  readonly feeRate: number;
  /** Approved repair work charged to the owner this month. */
  readonly works?: Amount;
}

export interface OwnerRemittanceComputation {
  readonly fees: Amount;
  readonly works: Amount;
  readonly net: Amount;
}

/**
 * What the manager owes the owner (RG-15).
 * The fee is computed on the rent only, never on the charges.
 */
export function computeOwnerRemittance(input: OwnerRemittanceInput): OwnerRemittanceComputation {
  const fees = Math.round(input.rentCollected * input.feeRate);
  const works = input.works ?? 0;
  return { fees, works, net: input.rentCollected - fees - works };
}

/** Management fee kept by the agency on a given amount of collected rent. */
export function managementFee(rentCollected: Amount, feeRate: number): Amount {
  return Math.round(rentCollected * feeRate);
}
