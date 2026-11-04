import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  BreadcrumbService, FcfaPipe, PillTone, SheetService, SolAvatar, SolIcon, SolPill } from '@solimus/ui';
import { PLATFORM_REPOSITORY, planUsageStatus } from '@solimus/domain';
import { Manager } from '@solimus/domain/models/agency.model';
import { BillingCycle, PlanId, PlanLimits, SubscriptionStatus, UsageLevel } from '@solimus/domain/models/subscription.model';
import { MANAGER_MONTH, PLANS } from '@solimus/mocks';
import { CYCLE_LABEL, PAYOUT_MODE_LABEL, STATUS_LABEL, STATUS_TONE } from './manager-labels';

@Component({
  selector: 'app-manager-list',
  imports: [RouterLink, SolIcon, SolPill, SolAvatar, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './manager-list.html',
  styles: `
    .f-in input, .f-sel select { border: 0; outline: 0; background: none; font: inherit; color: var(--ink); }
    .f-sel select { appearance: none; cursor: pointer; }
    .gauge { min-width: 96px; }
    .gauge .row { display: flex; justify-content: space-between; font-size: 12.5px; }
    .gauge .row b { font-size: 11.5px; }
    .gauge .bar-p { margin-top: 5px; height: 5px; }
  ` })
export default class ManagerList implements OnInit {
  private readonly breadcrumbs = inject(BreadcrumbService);
  protected readonly sheets = inject(SheetService);

  private readonly platform = inject(PLATFORM_REPOSITORY);
  protected readonly managers = toSignal(this.platform.managers(), { initialValue: [] });
  protected readonly plans = toSignal(this.platform.plans(), { initialValue: PLANS });

  protected readonly search = signal('');
  protected readonly planFilter = signal('');
  protected readonly statusFilter = signal('');

  protected readonly filtered = computed(() => {
    const needle = this.search().trim().toLowerCase();
    return this.managers()
      .filter((manager) => !needle || `${manager.name} ${manager.contactName} ${manager.city}`.toLowerCase().includes(needle))
      .filter((manager) => !this.planFilter() || manager.planId === this.planFilter())
      .filter((manager) => !this.statusFilter() || manager.status === this.statusFilter());
  });

  ngOnInit(): void {
    this.breadcrumbs.set({ label: 'Gestionnaires' });
  }

  protected value(event: Event): string {
    return (event.target as HTMLInputElement | HTMLSelectElement).value;
  }

  protected planName(id: PlanId): string {
    return this.plans().find((plan) => plan.id === id)?.name ?? id;
  }

  private limits(manager: Manager): PlanLimits {
    return this.plans().find((plan) => plan.id === manager.planId)!.limits;
  }

  protected limitOf(manager: Manager, key: 'owners' | 'properties'): number {
    return this.limits(manager)[key];
  }

  protected ratioOf(manager: Manager, key: 'owners' | 'properties'): number {
    return Math.min(100, Math.round((manager.usage[key] / this.limitOf(manager, key)) * 100));
  }

  protected levelOf(manager: Manager, key: 'owners' | 'properties'): UsageLevel {
    return planUsageStatus(manager.usage, this.limits(manager)).find((limit) => limit.key === key)!.level;
  }

  protected barColor(level: UsageLevel): string {
    return level === 'blocked' ? '#d63c32' : level === 'warning' ? '#d9822b' : '#22292c';
  }

  protected month(id: string) {
    return MANAGER_MONTH[id] ?? { collected: 0, owed: 0, payments: 0, tenants: 0 };
  }

  protected verified(manager: Manager): boolean {
    return manager.accounts.every((account) => account.verified);
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

  protected payoutMode(mode: 'automatic' | 'onRequest'): string {
    return PAYOUT_MODE_LABEL[mode];
  }
}
