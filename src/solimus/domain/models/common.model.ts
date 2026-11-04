/** Shared primitives used across the Solimus Gestion domain. */

/** All amounts are integer XOF (FCFA). The currency has no sub-unit in practice. */
export type Amount = number;

/** ISO date, `YYYY-MM-DD`. Display formatting happens in the `dateFr` pipe. */
export type IsoDate = string;

/** ISO date and time, `YYYY-MM-DDTHH:mm`. */
export type IsoDateTime = string;

/** Senegalese cities covered by the platform. */
export type City = string;

/** A person or company the platform can address. */
export interface Party {
  readonly id: string;
  readonly name: string;
  readonly phone?: string;
  readonly email?: string;
  readonly address?: string;
}

/** Entry of an audit trail attached to a lease, an incident or the platform itself. */
export interface JournalEntry {
  readonly at: IsoDateTime;
  readonly title: string;
  readonly detail: string;
  readonly author?: string;
}

/** A file stored in the document library. */
export type DocumentKind =
  | 'lease'
  | 'amendment'
  | 'conditionReport'
  | 'rentNotice'
  | 'paymentReceipt'
  | 'rentReceipt'
  | 'reminder'
  | 'formalNotice'
  | 'residenceCertificate'
  | 'depositSettlement'
  | 'mandate'
  | 'managementStatement'
  | 'annualIncomeSummary'
  | 'workOrder'
  | 'quote'
  | 'contractorInvoice'
  | 'payoutAdvice'
  | 'subscriptionInvoice'
  | 'tenantFile'
  | 'photos';

/** Who a document is shared with. Everyone only sees what is shared with them. */
export type DocumentAudience = 'internal' | 'owner' | 'tenant';

export interface StoredDocument {
  readonly id: string;
  readonly kind: DocumentKind;
  readonly name: string;
  readonly createdAt: IsoDate;
  readonly sizeLabel: string;
  readonly propertyRef?: string;
  readonly leaseId?: string;
  readonly sharedWith: readonly DocumentAudience[];
  /** Key resolving to a document template component, when the file is generated. */
  readonly templateKey?: string;
}
