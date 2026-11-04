import { Amount } from '../models/common.model';

/** No payout may be smaller than this (RG-12). */
export const MIN_PAYOUT_AMOUNT: Amount = 10_000;

/** Off-platform transfers at or above this amount need a second approval (RG-12). */
export const DOUBLE_APPROVAL_THRESHOLD: Amount = 5_000_000;

export interface PayoutRequestInput {
  readonly amount: Amount;
  /** Balance held by Solimus for this manager. */
  readonly available: Amount;
  /** Amount already requested and not yet paid. */
  readonly beingProcessed: Amount;
  /** Payouts are impossible until Solimus has verified the account (RG-13). */
  readonly accountVerified: boolean;
}

export type PayoutRejection =
  | 'accountNotVerified'
  | 'belowMinimum'
  | 'aboveAvailable';

export interface PayoutRequestCheck {
  readonly valid: boolean;
  readonly reason?: PayoutRejection;
  readonly requestable: Amount;
}

/** Validates a payout request before it reaches Solimus (RG-12, RG-13). */
export function checkPayoutRequest(input: PayoutRequestInput): PayoutRequestCheck {
  const requestable = Math.max(0, input.available - input.beingProcessed);

  if (!input.accountVerified) return { valid: false, reason: 'accountNotVerified', requestable: 0 };
  if (input.amount < MIN_PAYOUT_AMOUNT) return { valid: false, reason: 'belowMinimum', requestable };
  if (input.amount > requestable) return { valid: false, reason: 'aboveAvailable', requestable };

  return { valid: true, requestable };
}

export function payoutNeedsDoubleApproval(amount: Amount): boolean {
  return amount >= DOUBLE_APPROVAL_THRESHOLD;
}

/** Human readable reason, reused by the web app and the administration. */
export const PAYOUT_REJECTION_LABEL: Record<PayoutRejection, string> = {
  accountNotVerified: "Le compte de versement n'est pas encore vérifié par Solimus.",
  belowMinimum: `Le montant minimum d'une demande est de ${MIN_PAYOUT_AMOUNT.toLocaleString('fr-FR')} FCFA.`,
  aboveAvailable: 'Le montant demandé dépasse le solde disponible.',
};
