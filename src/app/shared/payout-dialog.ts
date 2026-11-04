import { ChangeDetectionStrategy, Component, computed, inject, input, model, output, signal } from '@angular/core';
import {
  DateFrPipe, FcfaPipe, SolIcon, SolToggle,
} from '@solimus/ui';
import { PLATFORM_REPOSITORY, payoutNeedsDoubleApproval } from '@solimus/domain';
import { PayoutRequest } from '@solimus/domain/models/finance.model';

/**
 * Records a transfer Solimus already made outside the platform and marks the
 * matching request as paid (RG-11). Nothing is sent from this screen.
 */
@Component({
  host: { '(document:keydown.escape)': 'close.emit()' },
  selector: 'app-payout-dialog',
  imports: [DateFrPipe, FcfaPipe, SolIcon, SolToggle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payout-dialog.html',
})
export class PayoutDialog {
  /** Set when the dialog settles a pending request; omitted for a free-form payout. */
  readonly request = input<PayoutRequest | undefined>(undefined);
  readonly managerName = input('Teranga Gestion Immobilière');
  readonly available = input(2_900_000);

  readonly close = output<void>();
  readonly recorded = output<string>();

  private readonly platform = inject(PLATFORM_REPOSITORY);

  protected readonly state = signal<'form' | 'done'>('form');
  protected readonly reference = signal('TX 9KD31P');
  protected readonly confirmed = model(true);
  protected readonly payoutId = signal('VRS-1059');

  protected readonly locked = computed(() => Boolean(this.request()));
  protected readonly amount = computed(() => this.request()?.amount ?? 2_000_000);
  protected readonly account = computed(() => this.request()?.account ?? 'Wave · +221 77 540 88 12');
  protected readonly remaining = computed(() => Math.max(0, this.available() - this.amount()));
  protected readonly needsDoubleApproval = computed(() => payoutNeedsDoubleApproval(this.amount()));

  protected readonly referenceSlug = computed(() => this.reference().replace(/\s+/g, '').toUpperCase());

  protected readonly canSubmit = computed(() => this.confirmed() && this.reference().trim().length > 0);

  protected value(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected submit(): void {
    const pending = this.request();
    if (pending) {
      this.platform.markPayoutAsPaid(pending.id, this.reference()).subscribe((payout) => {
        this.payoutId.set(payout.id);
        this.state.set('done');
        this.recorded.emit(payout.id);
      });
      return;
    }

    this.state.set('done');
    this.recorded.emit(this.payoutId());
  }
}
