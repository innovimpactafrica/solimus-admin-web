import { Injectable, signal } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import {
  ConditionReportRepository, DocumentRepository, FinanceRepository, IncidentRepository,
  LeaseRepository, OwnerRepository, PlatformRepository, PropertyRepository,
  RentRepository, TenantRepository,
} from '../../domain/ports/repositories';
import { Payout, PayoutRequest } from '../../domain/models/finance.model';
import { RentSchedule } from '../../domain/models/rent.model';
import { PROPERTIES } from '../properties.mock';
import { MANDATES, OWNERS } from '../owners.mock';
import { APPLICATIONS, TENANTS } from '../tenants.mock';
import { LEASES } from '../leases.mock';
import { CONDITION_REPORTS } from '../condition-reports.mock';
import { RENT_SCHEDULE_OCTOBER } from '../rents.mock';
import { CONTRACTORS } from '../contractors.mock';
import { INCIDENTS, QUOTES } from '../incidents.mock';
import { MANAGER_BALANCE, MANAGER_LEDGER, PAYOUTS, PAYOUT_REQUESTS } from '../finance.mock';
import { DOCUMENTS } from '../documents.mock';
import { MANAGERS, PLANS, PLATFORM_SUMMARY, SUBSCRIPTION_INVOICES } from '../platform.mock';

/** Small latency so loading states are visible while developing. */
const LATENCY_MS = 120;

function respond<T>(value: T): Observable<T> {
  return of(value).pipe(delay(LATENCY_MS));
}

@Injectable()
export class MockPropertyRepository implements PropertyRepository {
  list() { return respond(PROPERTIES); }
  byRef(ref: string) { return respond(PROPERTIES.find((p) => p.ref === ref)); }
}

@Injectable()
export class MockOwnerRepository implements OwnerRepository {
  list() { return respond(OWNERS); }
  byId(id: string) { return respond(OWNERS.find((o) => o.id === id)); }
  mandate(id: string) { return respond(MANDATES.find((m) => m.id === id)); }
}

@Injectable()
export class MockTenantRepository implements TenantRepository {
  list() { return respond(TENANTS); }
  byId(id: string) { return respond(TENANTS.find((t) => t.id === id)); }
  applications(propertyRef?: string) {
    return respond(propertyRef ? APPLICATIONS.filter((a) => a.propertyRef === propertyRef) : APPLICATIONS);
  }
}

@Injectable()
export class MockLeaseRepository implements LeaseRepository {
  list() { return respond(LEASES); }
  byId(id: string) { return respond(LEASES.find((l) => l.id === id)); }
}

@Injectable()
export class MockConditionReportRepository implements ConditionReportRepository {
  list() { return respond(CONDITION_REPORTS); }
  byId(id: string) { return respond(CONDITION_REPORTS.find((r) => r.id === id)); }
}

@Injectable()
export class MockRentRepository implements RentRepository {
  /** Kept in a signal so "Marquer payé" updates every screen at once. */
  private readonly schedules = signal<readonly RentSchedule[]>(RENT_SCHEDULE_OCTOBER);

  schedule(period: string) {
    return respond(this.schedules().filter((s) => s.period === period || period === 'all'));
  }

  markAsPaid(noticeId: string, channel: string): Observable<void> {
    this.schedules.update((list) =>
      list.map((item) =>
        item.noticeId === noticeId
          ? { ...item, status: 'paid' as const, paidOn: '2026-10-16', channel: channel as RentSchedule['channel'], daysLate: undefined }
          : item,
      ),
    );
    return respond(undefined);
  }
}

@Injectable()
export class MockIncidentRepository implements IncidentRepository {
  list() { return respond(INCIDENTS); }
  byId(id: string) { return respond(INCIDENTS.find((i) => i.id === id)); }
  quote(id: string) { return respond(QUOTES.find((q) => q.id === id)); }
  contractors() { return respond(CONTRACTORS); }
}

@Injectable()
export class MockFinanceRepository implements FinanceRepository {
  private readonly requests = signal<readonly PayoutRequest[]>(PAYOUT_REQUESTS);

  balance() { return respond(MANAGER_BALANCE); }
  payoutRequests() { return respond(this.requests()); }
  payouts() { return respond(PAYOUTS); }
  ledger(period: string) {
    return respond(period === 'all' ? MANAGER_LEDGER : MANAGER_LEDGER.filter((e) => e.at.startsWith(period.slice(0, 7))));
  }

  requestPayout(amount: number, account: string, note?: string) {
    const created: PayoutRequest = {
      id: `DP-2026-0${37 + this.requests().length - PAYOUT_REQUESTS.length}`,
      managerId: MANAGER_BALANCE.managerId,
      amount, account, status: 'processing',
      requestedAt: '2026-10-16T11:05', requestedBy: 'Awa Ndoye', note,
    };
    this.requests.update((list) => [created, ...list]);
    return respond(created);
  }
}

@Injectable()
export class MockDocumentRepository implements DocumentRepository {
  list() { return respond(DOCUMENTS); }
  byId(id: string) { return respond(DOCUMENTS.find((d) => d.id === id)); }
}

@Injectable()
export class MockPlatformRepository implements PlatformRepository {
  private readonly requests = signal<readonly PayoutRequest[]>(PAYOUT_REQUESTS);
  private readonly payouts_ = signal<readonly Payout[]>(PAYOUTS);

  summary() { return respond(PLATFORM_SUMMARY); }
  managers() { return respond(MANAGERS); }
  manager(id: string) { return respond(MANAGERS.find((m) => m.id === id)); }
  plans() { return respond(PLANS); }
  invoices() { return respond(SUBSCRIPTION_INVOICES); }
  allPayouts() { return respond(this.payouts_()); }
  allPayoutRequests() { return respond(this.requests()); }

  /** Records an off-platform transfer and marks the matching request as paid (RG-11). */
  markPayoutAsPaid(requestId: string, reference: string) {
    const request = this.requests().find((r) => r.id === requestId);
    const payout: Payout = {
      id: 'VRS-1059',
      managerId: request?.managerId ?? 'm-teranga',
      amount: request?.amount ?? 0,
      execution: 'offPlatform',
      executedAt: '2026-10-16T11:30',
      account: request?.account ?? '',
      reference,
      requestId,
      balanceAfter: MANAGER_BALANCE.available - (request?.amount ?? 0),
    };
    this.requests.update((list) =>
      list.map((r) => (r.id === requestId ? { ...r, status: 'paid' as const, payoutId: payout.id } : r)),
    );
    this.payouts_.update((list) => [payout, ...list]);
    return respond(payout);
  }
}
