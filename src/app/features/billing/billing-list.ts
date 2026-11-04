import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BreadcrumbService, DateFrPipe, FcfaPipe, SheetService, SolAvatar, SolIcon, SolKpiCard, SolPill } from '@solimus/ui';
import { PLATFORM_REPOSITORY, withVat } from '@solimus/domain';
import { MANAGERS, PLATFORM_SUMMARY } from '@solimus/mocks';

@Component({
  selector: 'app-billing-list',
  imports: [SolIcon, SolPill, SolAvatar, SolKpiCard, FcfaPipe, DateFrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './billing-list.html' })
export default class BillingList implements OnInit {
  private readonly breadcrumbs = inject(BreadcrumbService);
  protected readonly sheets = inject(SheetService);
  private readonly platform = inject(PLATFORM_REPOSITORY);

  private readonly allInvoices = toSignal(this.platform.invoices(), { initialValue: [] });

  /** Only the invoices issued for the current month. */
  protected readonly invoices = computed(() =>
    this.allInvoices().filter((invoice) => invoice.issuedOn >= '2026-03-01'),
  );

  protected readonly monthlyRevenue = computed(() => PLATFORM_SUMMARY.subscriptionRevenueExclTax);

  protected readonly paidLabel = computed(() => {
    const october = this.invoices().filter((invoice) => invoice.issuedOn.startsWith('2026-10'));
    const paid = october.filter((invoice) => invoice.status === 'paid').length;
    return `${paid} sur ${october.length}`;
  });

  protected readonly unpaidInclTax = computed(() =>
    this.invoices().filter((invoice) => invoice.status === 'unpaid')
      .reduce((total, invoice) => total + withVat(invoice.amountExclTax), 0),
  );

  ngOnInit(): void {
    this.breadcrumbs.set({ label: 'Facturation' });
  }

  protected managerName(id: string): string {
    return MANAGERS.find((manager) => manager.id === id)?.name ?? id;
  }

  protected palette(id: string): number {
    return MANAGERS.find((manager) => manager.id === id)?.avatarPalette ?? 1;
  }

  protected remind(managerId: string): void {
    this.sheets.open('relance', { row: this.managerName(managerId) });
  }
}
