import { IsoDateTime } from './common.model';

export type NotificationChannel = 'app' | 'email' | 'sms' | 'whatsapp';

/** Every event the platform can notify about (section 8 of the specification). */
export type NotificationEvent =
  | 'rentNoticeIssued'
  | 'reminderBeforeDue'
  | 'paymentReceived'
  | 'paymentLate'
  | 'signatureRequired'
  | 'signatureCompleted'
  | 'leaseRenewal'
  | 'incidentDeclared'
  | 'incidentStageChanged'
  | 'contractorScheduled'
  | 'conditionReportDue'
  | 'documentAvailable'
  | 'payoutExecuted'
  | 'payoutRequested'
  | 'planLimitReached'
  | 'subscriptionInvoice';

export interface NotificationPreference {
  readonly event: NotificationEvent;
  readonly label: string;
  readonly channels: readonly NotificationChannel[];
  /** Security codes and payment notices cannot be switched off. */
  readonly locked?: boolean;
}

export interface AppNotification {
  readonly id: string;
  readonly at: IsoDateTime;
  readonly title: string;
  readonly detail: string;
  readonly read: boolean;
  readonly tone: 'green' | 'blue' | 'orange' | 'red' | 'purple' | 'neutral';
  readonly icon: string;
  /** Router link opened when the notification is tapped. */
  readonly link?: readonly (string | number)[];
}
