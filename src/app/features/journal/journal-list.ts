import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbService, DateFrPipe, IconName, SheetService, SolIcon } from '@solimus/ui';
import { AUDIT_TRAIL } from '@solimus/mocks';

const TONE_CLASS: Record<string, string> = {
  green: 't-g', blue: 't-b', orange: 't-o', red: 't-r', purple: 't-p', neutral: 't-n' };

@Component({
  selector: 'app-journal-list',
  imports: [SolIcon, DateFrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './journal-list.html',
  styles: `
    .f-in input, .f-sel select { border: 0; outline: 0; background: none; font: inherit; color: var(--ink); }
    .f-sel select { appearance: none; cursor: pointer; }
  ` })
export default class JournalList implements OnInit {
  private readonly breadcrumbs = inject(BreadcrumbService);
  protected readonly sheets = inject(SheetService);

  protected readonly search = signal('');
  protected readonly authorFilter = signal('');

  protected readonly authors = computed(() => [...new Set(AUDIT_TRAIL.map((entry) => entry.author))]);

  protected readonly filtered = computed(() => {
    const needle = this.search().trim().toLowerCase();
    return AUDIT_TRAIL
      .filter((entry) => !needle || `${entry.event} ${entry.detail}`.toLowerCase().includes(needle))
      .filter((entry) => !this.authorFilter() || entry.author === this.authorFilter());
  });

  ngOnInit(): void {
    this.breadcrumbs.set({ label: "Journal d'activité" });
  }

  protected value(event: Event): string {
    return (event.target as HTMLInputElement | HTMLSelectElement).value;
  }

  protected toneClass(tone: string): string {
    return TONE_CLASS[tone] ?? 't-n';
  }

  protected iconOf(name: string): IconName {
    return name as IconName;
  }
}
