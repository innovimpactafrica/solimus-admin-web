import { Amount, IsoDate } from './common.model';

export type PlanId = 'essentiel' | 'pro' | 'entreprise';

export interface PlanLimits {
  readonly owners: number;
  readonly properties: number;
  readonly users: number;
  /** Document storage, in gigabytes. */
  readonly storageGb: number;
}

export interface Plan {
  readonly id: PlanId;
  readonly name: string;
  /** Prices are quoted excluding tax; the invoice adds 18% VAT (RG-28). */
  readonly monthlyExclTax: Amount;
  readonly yearlyExclTax: Amount;
  readonly limits: PlanLimits;
  readonly features: readonly string[];
  readonly visibleOnWebsite: boolean;
}

export type BillingCycle = 'monthly' | 'yearly' | 'trial';

export type SubscriptionStatus = 'active' | 'trial' | 'suspended';

export interface Subscription {
  readonly managerId: string;
  readonly planId: PlanId;
  readonly cycle: BillingCycle;
  readonly status: SubscriptionStatus;
  readonly renewsOn: IsoDate;
  readonly startedOn: IsoDate;
}

/** Current consumption against the plan limits (RG-29). */
export interface PlanUsage {
  readonly owners: number;
  readonly properties: number;
  readonly users: number;
  readonly storageGb: number;
}

export type UsageLevel = 'ok' | 'warning' | 'blocked';

export type InvoiceStatus = 'paid' | 'unpaid' | 'trial';

export interface SubscriptionInvoice {
  /** `FAC-AAMM-NNN`. */
  readonly id: string;
  readonly managerId: string;
  readonly label: string;
  readonly periodLabel: string;
  readonly amountExclTax: Amount;
  readonly status: InvoiceStatus;
  readonly issuedOn: IsoDate;
  readonly paidOn?: IsoDate;
}
