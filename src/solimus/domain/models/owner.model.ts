import { Amount, IsoDate, Party } from './common.model';

export type OwnerKind = 'individual' | 'company' | 'jointOwnership';

/** How the manager pays the owner back every month. */
export type RemittanceMethod = 'bankTransfer' | 'mobileMoney' | 'cheque';

export interface Owner extends Party {
  readonly kind: OwnerKind;
  /** Legal identifiers, for companies. */
  readonly rccm?: string;
  readonly ninea?: string;
  readonly countryOfResidence: string;
  readonly hasMobileAccess: boolean;
  readonly mandateId: string;
}

/**
 * Management mandate signed between the owner and the agency.
 * It carries the two figures the platform uses everywhere: the management fee
 * and the threshold above which repair quotes need the owner's approval.
 */
export interface ManagementMandate {
  readonly id: string;
  readonly ownerId: string;
  readonly signedOn: IsoDate;
  readonly durationLabel: string;
  /** Percentage of collected rent, charges excluded. */
  readonly feeRate: number;
  /** Quotes at or below this amount are approved by the manager alone (RG-25). */
  readonly worksApprovalThreshold: Amount;
  readonly lettingFeeLabel: string;
  readonly remittanceMethod: RemittanceMethod;
  readonly remittanceAccount: string;
  /** Day of the month the owner is paid. */
  readonly remittanceDay: number;
}
