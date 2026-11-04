import { Amount, IsoDate, IsoDateTime } from './common.model';

/**
 * Money held by Solimus on behalf of a manager.
 * Solimus takes no commission: the balance is the full amount collected
 * minus what has already been paid out (RG-09).
 */
export interface ManagerBalance {
  readonly managerId: string;
  readonly available: Amount;
  readonly beingProcessed: Amount;
  readonly collectedThisMonth: Amount;
  readonly paidOutThisMonth: Amount;
  readonly paymentCount: number;
  /** Manager's own fee on this month's rent, charges excluded. */
  readonly managementFees: Amount;
}

export type PayoutMode = 'automatic' | 'onRequest';

export type PayoutRequestStatus = 'processing' | 'paid' | 'cancelled';

/** Payout request sent by a manager working in `onRequest` mode. */
export interface PayoutRequest {
  /** `DP-AAAA-NNN`. */
  readonly id: string;
  readonly managerId: string;
  readonly amount: Amount;
  readonly account: string;
  readonly status: PayoutRequestStatus;
  readonly requestedAt: IsoDateTime;
  readonly requestedBy: string;
  readonly note?: string;
  readonly payoutId?: string;
}

export type PayoutExecution = 'automatic' | 'offPlatform';

/** Money actually sent to a manager. */
export interface Payout {
  /** `VRS-NNNN`. */
  readonly id: string;
  readonly managerId: string;
  readonly amount: Amount;
  readonly execution: PayoutExecution;
  readonly executedAt: IsoDateTime;
  readonly account: string;
  readonly reference: string;
  readonly requestId?: string;
  readonly blocked?: boolean;
  readonly blockedReason?: string;
  readonly balanceAfter: Amount;
}

/** Monthly statement sent to an owner with the remittance. */
export interface ManagementStatementLine {
  readonly propertyLabel: string;
  readonly tenantName: string;
  readonly rentCalled: Amount;
  readonly rentCollected: Amount;
  readonly fee: Amount;
  readonly net: Amount;
}

export interface OwnerRemittance {
  readonly ownerId: string;
  readonly period: IsoDate;
  readonly lines: readonly ManagementStatementLine[];
  readonly collected: Amount;
  readonly fees: Amount;
  readonly works: Amount;
  readonly net: Amount;
  readonly paidOn?: IsoDate;
  readonly method: string;
  readonly account: string;
}

/** One line of the manager's statement of account with Solimus. */
export type LedgerKind = 'collection' | 'payout' | 'offPlatform';

export interface LedgerEntry {
  readonly at: IsoDateTime;
  readonly label: string;
  readonly kind: LedgerKind;
  readonly amount: Amount;
  readonly balance: Amount;
}
