import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BreadcrumbService, DateFrPipe, FcfaPipe, SheetService, SolIcon, SolKpiCard, SolPill, ToastService,
} from '@solimus/ui';
import { PLATFORM_REPOSITORY } from '@solimus/domain';
import { PayoutRequest } from '@solimus/domain/models/finance.model';
import { MANAGER_MONTH } from '@solimus/mocks';
import { PayoutDialog } from '../../shared/payout-dialog';

@Component({
  selector: 'app-payout-request-list',
  imports: [PayoutDialog, SolIcon, SolPill, SolKpiCard, FcfaPipe, DateFrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payout-request-list.html',
  styles: `
    .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; padding: 16px 20px; }
    .steps-grid > div { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: #3f4348; line-height: 1.45; }
    @media (max-width: 1100px) { .steps-grid { grid-template-columns: repeat(2, 1fr); } }
  `,
})
export default class PayoutRequestList implements OnInit {
  private readonly breadcrumbs = inject(BreadcrumbService);
  protected readonly sheets = inject(SheetService);
  protected readonly toast = inject(ToastService);
  private readonly platform = inject(PLATFORM_REPOSITORY);

  protected readonly requests = toSignal(this.platform.allPayoutRequests(), { initialValue: [] });
  private readonly managers = toSignal(this.platform.managers(), { initialValue: [] });

  protected readonly settling = signal<PayoutRequest | null>(null);

  protected readonly procedure = [
    { n: 1, label: 'Vérifier le solde disponible du gestionnaire' },
    { n: 2, label: 'Faire le virement hors système, depuis Wave Business ou la banque' },
    { n: 3, label: 'Cliquer sur « Marquer comme versé » avec la référence et la preuve' },
    { n: 4, label: 'Le solde est mis à jour et le gestionnaire est notifié' },
  ];

  protected readonly pending = computed(() => this.requests().filter((request) => request.status === 'processing'));

  protected readonly pendingTotal = computed(() =>
    this.pending().reduce((total, request) => total + request.amount, 0),
  );

  protected readonly paidThisMonth = computed(() =>
    this.requests().filter((request) => request.status === 'paid' && request.requestedAt >= '2026-10-01'),
  );

  protected readonly paidTotal = computed(() =>
    this.paidThisMonth().reduce((total, request) => total + request.amount, 0),
  );

  protected readonly onRequestCount = computed(
    () => this.managers().filter((manager) => manager.payoutMode === 'onRequest').length,
  );

  protected readonly automaticCount = computed(
    () => this.managers().filter((manager) => manager.payoutMode === 'automatic').length,
  );

  ngOnInit(): void {
    this.breadcrumbs.set({ label: 'Demandes de paiement' });
  }

  protected managerName(id: string): string {
    return this.managers().find((manager) => manager.id === id)?.name ?? id;
  }

  protected available(managerId: string): number {
    return MANAGER_MONTH[managerId]?.owed ?? 0;
  }

  protected settle(request: PayoutRequest): void {
    this.settling.set(request);
  }

  protected onRecorded(payoutId: string): void {
    this.toast.show(`Versement ${payoutId} enregistré · le gestionnaire est notifié`);
  }
}
