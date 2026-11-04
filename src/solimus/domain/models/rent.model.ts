import { Amount, IsoDate, IsoDateTime } from './common.model';

/** One line of a rent notice. Order matters: it is the printed order. */
export type RentLineKind = 'rent' | 'charges' | 'wasteTax' | 'vat' | 'previousBalance';

export interface RentLine {
  readonly kind: RentLineKind;
  readonly label: string;
  readonly amount: Amount;
}

/** Rent notice issued on the 25th for the following month (RG-16). */
export interface RentNotice {
  /** `AE-AAMM-NNNN`. */
  readonly id: string;
  readonly leaseId: string;
  readonly tenantId: string;
  readonly tenantName: string;
  readonly propertyLabel: string;
  /** First day of the period covered. */
  readonly period: IsoDate;
  readonly issuedOn: IsoDate;
  readonly dueOn: IsoDate;
  readonly lines: readonly RentLine[];
  readonly total: Amount;
  readonly managerId: string;
}

export type PaymentChannel = 'wave' | 'orangeMoney' | 'cash' | 'bankTransfer' | 'cheque';

export type RentStatus = 'upcoming' | 'pending' | 'paid' | 'late';

export interface Payment {
  /** `PAY-AAMMNNNN` online, `RM-…` when recorded by the manager. */
  readonly id: string;
  readonly noticeId: string;
  readonly leaseId: string;
  readonly amount: Amount;
  readonly paidAt: IsoDateTime;
  readonly channel: PaymentChannel;
  readonly reference: string;
  /** `false` for cash, cheque or direct transfers recorded by the manager (RG-06). */
  readonly collectedBySolimus: boolean;
}

/** A due date as shown in the manager's rent table. */
export interface RentSchedule {
  readonly noticeId: string;
  readonly leaseId: string;
  readonly tenantId: string;
  readonly tenantName: string;
  readonly propertyLabel: string;
  readonly period: IsoDate;
  readonly amount: Amount;
  readonly dueOn: IsoDate;
  readonly status: RentStatus;
  readonly paidOn?: IsoDate;
  readonly channel?: PaymentChannel;
  readonly daysLate?: number;
  readonly avatarPalette: number;
}

/** Reminder ladder defined by RG-19. */
export type ReminderStage = 'none' | 'beforeDue' | 'first' | 'second' | 'formalNotice';
