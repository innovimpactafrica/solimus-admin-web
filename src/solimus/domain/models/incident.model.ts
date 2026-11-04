import { Amount, IsoDate, IsoDateTime, JournalEntry } from './common.model';

export type IncidentStage = 'declared' | 'acknowledged' | 'quoting' | 'inProgress' | 'resolved';

export type IncidentUrgency = 'normal' | 'urgent' | 'danger';

export interface Incident {
  /** `SIN-AAAA-NNN`. */
  readonly id: string;
  readonly stage: IncidentStage;
  readonly urgency: IncidentUrgency;
  readonly title: string;
  readonly propertyRef: string;
  readonly propertyLabel: string;
  readonly location: string;
  readonly tenantName: string;
  readonly ownerName: string;
  readonly declaredBy: string;
  readonly declaredAt: IsoDateTime;
  readonly source: string;
  readonly description: string;
  readonly contractorId?: string;
  readonly quoteId?: string;
  readonly insuranceStatus: string;
  readonly journal: readonly JournalEntry[];
  readonly photoSeed: number;
}

export interface QuoteLine {
  readonly label: string;
  readonly amount: Amount;
  /** VAT lines are shown greyed out in the mockup. */
  readonly isTax?: boolean;
}

export type QuoteStatus = 'pending' | 'awaitingOwner' | 'approved' | 'rejected' | 'paid';

export interface Quote {
  /** Contractor's own reference, e.g. `PX-0912`. */
  readonly id: string;
  readonly incidentId: string;
  readonly contractorId: string;
  readonly status: QuoteStatus;
  readonly lines: readonly QuoteLine[];
  readonly total: Amount;
  readonly depositPaid?: Amount;
  readonly note?: string;
  readonly issuedOn: IsoDate;
  readonly decidedOn?: IsoDate;
  readonly rejectionReason?: string;
}

export interface WorkOrder {
  /** `OS-AAAA-NNNN`. */
  readonly id: string;
  readonly quoteId: string;
  readonly incidentId: string;
  readonly issuedOn: IsoDate;
  readonly scheduledFor: string;
}

export type ContractorStatus = 'available' | 'onSite' | 'unavailable' | 'invited';

export interface Contractor {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly trades: readonly string[];
  readonly areas: string;
  readonly rating: number;
  readonly jobsCompleted: number;
  readonly averageLeadTimeLabel: string;
  readonly status: ContractorStatus;
  readonly avatarPalette: number;
}
