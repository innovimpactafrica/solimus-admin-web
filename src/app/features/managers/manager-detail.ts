import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import {
  BreadcrumbService, DateFrPipe, FcfaPipe, PillTone, SheetService, SolAvatar, SolIcon, SolKpiCard, SolPill, SolToggle } from '@solimus/ui';
import { PLATFORM_REPOSITORY, planUsageStatus } from '@solimus/domain';
import { AgencyRole } from '@solimus/domain/models/agency.model';
import { BillingCycle, SubscriptionStatus } from '@solimus/domain/models/subscription.model';
import { AGENCY_USERS, COLLECTIONS, MANAGER_MONTH, PLANS, ROLE_LABEL } from '@solimus/mocks';
import { CYCLE_LABEL, STATUS_LABEL, STATUS_TONE } from './manager-labels';

type TabId = 'overview' | 'requests' | 'collections' | 'payouts' | 'users';

@Component({
  selector: 'app-manager-detail',
  imports: [RouterLink, SolIcon, SolPill, SolAvatar, SolKpiCard, SolToggle, FcfaPipe, DateFrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './manager-detail.html',
  styles: `
    button.alert { border: 1px solid; font: inherit; }
    .empty { display: grid; justify-items: center; gap: 8px; padding: 72px 20px; color: var(--muted); }
    .empty b { color: var(--ink); font-size: 15px; }
    .empty p { margin: 0; font-size: 13px; }
    .empty a { margin-top: 8px; }
  ` })
export default class ManagerDetail {
  readonly id = input.required<string>();

  private readonly breadcrumbs = inject(BreadcrumbService);
  protected readonly sheets = inject(SheetService);
  private readonly platform = inject(PLATFORM_REPOSITORY);

  protected readonly activeTab = signal<TabId>('overview');
  /** The agency team is only detailed for Teranga in the mock data set. */
  protected readonly agencyUsers = AGENCY_USERS;

  protected readonly tabs: readonly { id: TabId; label: string }[] = [
    { id: 'overview', label: 'Aperçu' },
    { id: 'requests', label: 'Demandes de paiement' },
    { id: 'collections', label: 'Encaissements' },
    { id: 'payouts', label: 'Versements' },
    { id: 'users', label: 'Utilisateurs' },
  ];

  protected readonly manager = toSignal(
    toObservable(computed(() => this.id())).pipe(switchMap((id) => this.platform.manager(id))),
    { initialValue: undefined },
  );

  private readonly allRequests = toSignal(this.platform.allPayoutRequests(), { initialValue: [] });
  private readonly allPayouts = toSignal(this.platform.allPayouts(), { initialValue: [] });

  protected readonly requests = computed(() =>
    this.allRequests().filter((request) => request.managerId === this.id()),
  );

  protected readonly payouts = computed(() =>
    this.allPayouts().filter((payout) => payout.managerId === this.id()),
  );

  protected readonly collections = computed(() =>
    COLLECTIONS.filter((payment) => payment.managerId === this.id()),
  );

  protected readonly pendingRequest = computed(() =>
    this.requests().find((request) => request.status === 'processing'),
  );

  protected readonly paidOut = computed(() =>
    this.payouts().filter((payout) => payout.executedAt >= '2026-10-01')
      .reduce((total, payout) => total + payout.amount, 0),
  );

  private readonly plan = computed(() => PLANS.find((item) => item.id === this.manager()?.planId) ?? PLANS[0]);

  protected readonly limits = computed(() => this.plan().limits);
  protected readonly usage = computed(() =>
    planUsageStatus(this.manager()?.usage ?? { owners: 0, properties: 0, users: 0, storageGb: 0 }, this.limits()),
  );

  protected readonly subscriptionAmount = computed(() =>
    this.manager()?.cycle === 'yearly' ? this.plan().yearlyExclTax : this.plan().monthlyExclTax,
  );

  protected readonly subscriptionNote = computed(() => {
    const manager = this.manager();
    if (manager?.status === 'trial') return "essai gratuit jusqu'au 31/10";
    return manager?.cycle === 'yearly' ? 'payé le 01/03/2026' : 'payé le 01/10/2026';
  });

  protected readonly cyclePerLabel = computed(() => (this.manager()?.cycle === 'yearly' ? '/ an' : '/ mois'));

  protected readonly payoutModeHint = computed(() =>
    this.manager()?.payoutMode === 'onRequest'
      ? 'Le gestionnaire envoie ses demandes depuis Finances ; Solimus vire hors système puis marque la demande comme versée.'
      : "Chaque jour à 06:00, l'API verse les paiements de la veille.",
  );

  constructor() {
    effect(() => {
      const manager = this.manager();
      this.breadcrumbs.set(
        { label: 'Gestionnaires', link: ['/gestionnaires'] },
        { label: manager?.name ?? 'Gestionnaire' },
      );
    });
  }

  protected month() {
    return MANAGER_MONTH[this.id()] ?? { collected: 0, owed: 0, payments: 0, tenants: 0 };
  }

  protected planName(): string {
    return this.plan().name;
  }

  protected statusLabel(status: SubscriptionStatus): string {
    return STATUS_LABEL[status];
  }

  protected statusTone(status: SubscriptionStatus): PillTone {
    return STATUS_TONE[status];
  }

  protected cycleLabel(cycle: BillingCycle): string {
    return CYCLE_LABEL[cycle];
  }

  protected roleLabel(role: AgencyRole): string {
    return ROLE_LABEL[role];
  }

  protected toneOf(tone: string): PillTone {
    return tone as PillTone;
  }

  protected suspend(name: string): void {
    this.sheets.open('suspend', { row: name });
  }
}
