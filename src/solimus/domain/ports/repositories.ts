import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';
import { Owner, ManagementMandate } from '../models/owner.model';
import { Tenant, TenantApplication } from '../models/tenant.model';
import { Lease } from '../models/lease.model';
import { ConditionReport } from '../models/condition-report.model';
import { RentSchedule } from '../models/rent.model';
import { Contractor, Incident, Quote } from '../models/incident.model';
import { LedgerEntry, ManagerBalance, Payout, PayoutRequest } from '../models/finance.model';
import { StoredDocument } from '../models/common.model';
import { Manager, PlatformSummary } from '../models/agency.model';
import { Plan, SubscriptionInvoice } from '../models/subscription.model';

/**
 * Ports of the domain. Screens depend on these interfaces only, never on a
 * concrete data source, so switching the mocks for an HTTP backend is a
 * one-line change in `app.config.ts`.
 */

export interface PropertyRepository {
  list(): Observable<readonly Property[]>;
  byRef(ref: string): Observable<Property | undefined>;
}

export interface OwnerRepository {
  list(): Observable<readonly Owner[]>;
  byId(id: string): Observable<Owner | undefined>;
  mandate(id: string): Observable<ManagementMandate | undefined>;
}

export interface TenantRepository {
  list(): Observable<readonly Tenant[]>;
  byId(id: string): Observable<Tenant | undefined>;
  applications(propertyRef?: string): Observable<readonly TenantApplication[]>;
}

export interface LeaseRepository {
  list(): Observable<readonly Lease[]>;
  byId(id: string): Observable<Lease | undefined>;
}

export interface ConditionReportRepository {
  list(): Observable<readonly ConditionReport[]>;
  byId(id: string): Observable<ConditionReport | undefined>;
}

export interface RentRepository {
  schedule(period: string): Observable<readonly RentSchedule[]>;
  markAsPaid(noticeId: string, channel: string, amount: number): Observable<void>;
}

export interface IncidentRepository {
  list(): Observable<readonly Incident[]>;
  byId(id: string): Observable<Incident | undefined>;
  quote(id: string): Observable<Quote | undefined>;
  contractors(): Observable<readonly Contractor[]>;
}

export interface FinanceRepository {
  balance(): Observable<ManagerBalance>;
  payoutRequests(): Observable<readonly PayoutRequest[]>;
  payouts(): Observable<readonly Payout[]>;
  ledger(period: string): Observable<readonly LedgerEntry[]>;
  requestPayout(amount: number, account: string, note?: string): Observable<PayoutRequest>;
}

export interface DocumentRepository {
  list(): Observable<readonly StoredDocument[]>;
  byId(id: string): Observable<StoredDocument | undefined>;
}

/** Used by the Solimus administration only. */
export interface PlatformRepository {
  summary(): Observable<PlatformSummary>;
  managers(): Observable<readonly Manager[]>;
  manager(id: string): Observable<Manager | undefined>;
  plans(): Observable<readonly Plan[]>;
  invoices(): Observable<readonly SubscriptionInvoice[]>;
  allPayouts(): Observable<readonly Payout[]>;
  allPayoutRequests(): Observable<readonly PayoutRequest[]>;
  markPayoutAsPaid(requestId: string, reference: string): Observable<Payout>;
}

export const PROPERTY_REPOSITORY = new InjectionToken<PropertyRepository>('PropertyRepository');
export const OWNER_REPOSITORY = new InjectionToken<OwnerRepository>('OwnerRepository');
export const TENANT_REPOSITORY = new InjectionToken<TenantRepository>('TenantRepository');
export const LEASE_REPOSITORY = new InjectionToken<LeaseRepository>('LeaseRepository');
export const CONDITION_REPORT_REPOSITORY = new InjectionToken<ConditionReportRepository>('ConditionReportRepository');
export const RENT_REPOSITORY = new InjectionToken<RentRepository>('RentRepository');
export const INCIDENT_REPOSITORY = new InjectionToken<IncidentRepository>('IncidentRepository');
export const FINANCE_REPOSITORY = new InjectionToken<FinanceRepository>('FinanceRepository');
export const DOCUMENT_REPOSITORY = new InjectionToken<DocumentRepository>('DocumentRepository');
export const PLATFORM_REPOSITORY = new InjectionToken<PlatformRepository>('PlatformRepository');
