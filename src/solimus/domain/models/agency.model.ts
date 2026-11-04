import { Amount, IsoDate, IsoDateTime } from './common.model';
import { PayoutMode } from './finance.model';
import { PlanId, PlanUsage, SubscriptionStatus, BillingCycle } from './subscription.model';

export type AgencyRole = 'admin' | 'manager' | 'accountant' | 'fieldAgent';

export interface AgencyUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: AgencyRole;
  readonly scopeLabel: string;
  readonly lastSeen: string;
  /** Payout requests are reserved to admins and accountants by default. */
  readonly canRequestPayouts: boolean;
  readonly avatarPalette: number;
}

/** VAT and waste-tax settings, overridable lease by lease (RG-17). */
export interface TaxSettings {
  readonly vatEnabled: boolean;
  readonly vatRate: number;
  readonly vatBase: 'rent' | 'rentAndCharges';
  readonly vatLabel: string;
  readonly wasteTaxEnabled: boolean;
  readonly wasteTaxRate: number;
  readonly wasteTaxAppliesTo: 'professionalAndCommercial' | 'all';
}

export interface BankAccount {
  readonly label: string;
  readonly verified: boolean;
}

/** A management agency: the tenant of the platform. */
export interface Manager {
  readonly id: string;
  readonly name: string;
  readonly city: string;
  readonly contactName: string;
  readonly phone: string;
  readonly email: string;
  readonly rccm?: string;
  readonly ninea?: string;
  readonly address?: string;
  readonly subscribedOn: IsoDate;
  readonly planId: PlanId;
  readonly cycle: BillingCycle;
  readonly status: SubscriptionStatus;
  readonly usage: PlanUsage;
  readonly payoutMode: PayoutMode;
  readonly accounts: readonly BankAccount[];
  /** Management fee applied to the owners of this agency. */
  readonly feeRate: number;
  readonly avatarPalette: number;
}

/** Agency identity printed on every generated document. */
export interface AgencyIdentity {
  readonly name: string;
  readonly legalLine: string;
  readonly contactLine: string;
  readonly initials: string;
}

/** Non repudiable platform audit trail entry. */
export interface AuditEntry {
  readonly at: IsoDateTime;
  readonly event: string;
  readonly detail: string;
  readonly author: string;
  readonly tone: 'green' | 'blue' | 'orange' | 'red' | 'purple' | 'neutral';
  readonly icon: string;
}

/** Aggregated figures shown on the Solimus administration dashboard. */
export interface PlatformSummary {
  readonly period: IsoDate;
  readonly collected: Amount;
  readonly owedToManagers: Amount;
  readonly paidOut: Amount;
  readonly subscriptionRevenueExclTax: Amount;
  readonly paymentCount: number;
  readonly managerCount: number;
}
