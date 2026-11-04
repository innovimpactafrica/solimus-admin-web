import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import {
  BreadcrumbService, DateFrPipe, FcfaPipe, SheetService, SolIcon, SolKpiCard, SolPill, SolToggle, ToastService,
} from '@solimus/ui';
import { MIN_PAYOUT_AMOUNT, PLATFORM_REPOSITORY } from '@solimus/domain';
import { BLOCKED_PAYOUT, PLATFORM_SUMMARY } from '@solimus/mocks';
import { PayoutDialog } from '../../shared/payout-dialog';

@Component({
  selector: 'app-payout-list',
  imports: [RouterLink, PayoutDialog, SolIcon, SolPill, SolKpiCard, SolToggle, FcfaPipe, DateFrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payout-list.html',
  styles: `
    .mode { display: flex; gap: 14px; align-items: flex-start; padding: 18px 20px; }
    .mode b { font-size: 14px; font-weight: 600; }
    .settings-link { color: var(--ink); font-weight: 500; font-size: 13px; cursor: pointer; }
  `,
})
export default class PayoutList implements OnInit {
  private readonly breadcrumbs = inject(BreadcrumbService);
  protected readonly sheets = inject(SheetService);
  protected readonly toast = inject(ToastService);
  private readonly platform = inject(PLATFORM_REPOSITORY);
  private readonly router = inject(Router);

  protected readonly payouts = toSignal(this.platform.allPayouts(), { initialValue: [] });
  private readonly requests = toSignal(this.platform.allPayoutRequests(), { initialValue: [] });
  private readonly managers = toSignal(this.platform.managers(), { initialValue: [] });
  protected readonly summary = toSignal(this.platform.summary(), { initialValue: PLATFORM_SUMMARY });

  /** Set by the `versements/nouveau` route, which opens the recording dialog directly. */
  readonly recording = input(false);
  protected readonly opened = linkedSignal(() => this.recording());
  protected readonly minimum = MIN_PAYOUT_AMOUNT;
  protected readonly blocked = BLOCKED_PAYOUT;

  protected readonly paidThisMonth = computed(() =>
    this.payouts().filter((payout) => payout.executedAt >= '2026-10-01')
      .reduce((total, payout) => total + payout.amount, 0),
  );

  protected readonly pendingTotal = computed(() =>
    this.requests().filter((request) => request.status === 'processing')
      .reduce((total, request) => total + request.amount, 0),
  );

  protected readonly automaticCount = computed(
    () => this.managers().filter((manager) => manager.payoutMode === 'automatic').length,
  );

  /** Money held back because the account is not verified (RG-13). */
  protected readonly blockedRow = computed(() => ({
    managerName: this.managers().find((manager) => manager.id === BLOCKED_PAYOUT.managerId)?.name ?? 'Diourbel Habitat',
    amount: BLOCKED_PAYOUT.amount,
    reason: BLOCKED_PAYOUT.reason,
  }));

  ngOnInit(): void {
    this.breadcrumbs.set({ label: 'Versements' });
  }

  protected managerName(id: string): string {
    return this.managers().find((manager) => manager.id === id)?.name ?? id;
  }

  protected modeOf(id: string): string {
    return this.managers().find((manager) => manager.id === id)?.payoutMode === 'onRequest'
      ? 'Sur demande' : 'Automatique';
  }

  protected remind(name: string): void {
    this.sheets.open('relance', { row: name });
  }

  protected closeDialog(): void {
    this.opened.set(false);
    if (this.recording()) void this.router.navigate(['/versements']);
  }

  protected onRecorded(payoutId: string): void {
    this.toast.show(`Versement ${payoutId} enregistré`);
  }
}
