import { Amount, IsoDate, IsoDateTime, JournalEntry } from './common.model';

export type LeaseKind = 'residentialUnfurnished' | 'residentialFurnished' | 'commercial' | 'professional';

export type LeaseStatus =
  | 'draft'
  | 'awaitingSignature'
  | 'signed'
  | 'dueForRenewal'
  | 'noticeGiven'
  | 'ended';

export interface LeaseSignature {
  readonly role: 'owner' | 'tenant' | 'guarantor' | 'manager';
  readonly name: string;
  readonly signedAt?: IsoDateTime;
  readonly method: 'smsCode';
}

export interface Lease {
  /** Agency wide reference, `BAIL-NNN`. */
  readonly id: string;
  readonly kind: LeaseKind;
  readonly status: LeaseStatus;
  readonly propertyRef: string;
  readonly propertyLabel: string;
  readonly tenantId: string;
  readonly tenantName: string;
  readonly ownerId: string;
  readonly ownerName: string;
  readonly startsOn: IsoDate;
  readonly endsOn: IsoDate;
  readonly durationLabel: string;
  readonly noticePeriodLabel: string;
  readonly rent: Amount;
  readonly charges: Amount;
  readonly chargesLabel: string;
  readonly deposit: Amount;
  readonly dueDay: number;
  readonly clauses: readonly string[];
  readonly specialClauses?: string;
  readonly signatures: readonly LeaseSignature[];
  readonly journal: readonly JournalEntry[];
  readonly documentIds: readonly string[];
  readonly mandateId?: string;
  /** Percentage of the term already elapsed, used by the lease list progress bar. */
  readonly progress: number;
}

export interface LeaseAmendment {
  readonly id: string;
  readonly leaseId: string;
  readonly subject: 'rentReview' | 'coTenant' | 'extension';
  readonly signedOn: IsoDate;
  readonly previousRent?: Amount;
  readonly newRent?: Amount;
  readonly newEndDate?: IsoDate;
  readonly text: string;
}
