import { Injectable, computed, signal } from '@angular/core';

/**
 * What the button that opened a sheet knows: its label, the row it sits on
 * (a tenant, a lease, a manager…) and, for document previews, which document.
 */
export interface SheetContext {
  readonly label?: string;
  readonly row?: string;
  readonly doc?: string;
  readonly [key: string]: string | undefined;
}

export interface SheetOutcome {
  readonly title: string;
  readonly detail?: string;
}

interface OpenSheet {
  readonly key: string;
  readonly context: SheetContext;
  readonly outcome: SheetOutcome | null;
}

/**
 * The action panels of the mockup: every button that needs a confirmation,
 * a choice or a preview opens one sheet over the current screen. A sheet
 * ends either closed, or on a success state that recaps what was done.
 */
@Injectable({ providedIn: 'root' })
export class SheetService {
  private readonly state = signal<OpenSheet | null>(null);

  readonly key = computed(() => this.state()?.key ?? null);
  readonly context = computed<SheetContext>(() => this.state()?.context ?? {});
  readonly outcome = computed(() => this.state()?.outcome ?? null);

  /** Opens `key`. Chaining from one sheet to another keeps the row it was about. */
  open(key: string, context: SheetContext = {}): void {
    const previous = this.state()?.context ?? {};
    this.state.set({ key, context: { ...previous, ...context }, outcome: null });
  }

  /** Replaces the sheet body with its success state. */
  finish(title: string, detail?: string): void {
    const current = this.state();
    if (current) this.state.set({ ...current, outcome: { title, detail } });
  }

  close(): void {
    this.state.set(null);
  }
}
