import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SolIcon } from './icon';
import { ToastService } from '../services/toast.service';

/** Renders the single toast managed by `ToastService`. */
@Component({
  selector: 'sol-toast',
  imports: [SolIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="gtoast" [class.on]="toasts.message() !== null" role="status" aria-live="polite">
      <sol-icon name="check" [size]="16" strokeWidth="2.6" />
      {{ toasts.message() }}
    </div>
  `,
})
export class SolToast {
  protected readonly toasts = inject(ToastService);
}
