import { Amount } from '../models/common.model';

export interface DepositDeduction {
  readonly label: string;
  readonly amount: Amount;
}

export interface DepositSettlement {
  readonly deposit: Amount;
  readonly deductions: readonly DepositDeduction[];
  readonly refunded: Amount;
}

/**
 * Deposit refund after the exit condition report (RG-23).
 * The refund is due within a month, net of justified amounts owed.
 */
export function settleDeposit(deposit: Amount, deductions: readonly DepositDeduction[]): DepositSettlement {
  const total = deductions.reduce((sum, item) => sum + item.amount, 0);
  return { deposit, deductions, refunded: Math.max(0, deposit - total) };
}

/** Deposits are usually two months of rent. */
export function defaultDeposit(rent: Amount, months = 2): Amount {
  return rent * months;
}
