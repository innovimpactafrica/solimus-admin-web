import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BreadcrumbService, DateFrPipe, FcfaPipe, PillTone, SheetService, SolIcon, SolKpiCard, SolPill } from '@solimus/ui';
import { PLATFORM_REPOSITORY } from '@solimus/domain';
import { COLLECTIONS, PLATFORM_SUMMARY } from '@solimus/mocks';

@Component({
  selector: 'app-collection-list',
  imports: [SolIcon, SolPill, SolKpiCard, FcfaPipe, DateFrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './collection-list.html',
  styles: `
    .f-in input, .f-sel select { border: 0; outline: 0; background: none; font: inherit; color: var(--ink); }
    .f-sel select { appearance: none; cursor: pointer; }
  ` })
export default class CollectionList implements OnInit {
  private readonly breadcrumbs = inject(BreadcrumbService);
  protected readonly sheets = inject(SheetService);
  private readonly platform = inject(PLATFORM_REPOSITORY);

  protected readonly summary = toSignal(this.platform.summary(), { initialValue: PLATFORM_SUMMARY });
  protected readonly managers = toSignal(this.platform.managers(), { initialValue: [] });

  protected readonly search = signal('');
  protected readonly managerFilter = signal('');

  protected readonly filtered = computed(() => {
    const needle = this.search().trim().toLowerCase();
    return COLLECTIONS
      .filter((payment) => !needle || `${payment.id} ${payment.tenant} ${payment.property}`.toLowerCase().includes(needle))
      .filter((payment) => !this.managerFilter() || payment.managerId === this.managerFilter());
  });

  ngOnInit(): void {
    this.breadcrumbs.set({ label: 'Encaissements' });
  }

  protected value(event: Event): string {
    return (event.target as HTMLInputElement | HTMLSelectElement).value;
  }

  protected managerName(id: string): string {
    return this.managers().find((manager) => manager.id === id)?.name ?? id;
  }

  protected toneOf(tone: string): PillTone {
    return tone as PillTone;
  }
}
