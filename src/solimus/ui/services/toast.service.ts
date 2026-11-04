import { Injectable, signal } from '@angular/core';

/** Short confirmation message shown at the bottom of the screen. */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly current = signal<string | null>(null);
  private timer?: ReturnType<typeof setTimeout>;

  readonly message = this.current.asReadonly();

  show(message: string, durationMs = 2600): void {
    this.current.set(message);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.current.set(null), durationMs);
  }

  dismiss(): void {
    clearTimeout(this.timer);
    this.current.set(null);
  }
}
