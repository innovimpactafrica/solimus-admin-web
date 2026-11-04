import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Status tone shared by every Solimus application. */
export type PillTone = 'green' | 'orange' | 'red' | 'blue' | 'neutral' | 'purple' | 'brand';

const TONE_CLASS: Record<PillTone, string> = {
  green: 'p-g',
  orange: 'p-o',
  red: 'p-r',
  blue: 'p-b',
  neutral: 'p-n',
  purple: 'p-p',
  brand: 'p-gr',
};

/** Coloured status badge, with or without the leading dot. */
@Component({
  selector: 'sol-pill',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="pill" [class]="toneClass()" [class.nod]="!dot()"><ng-content /></span>`,
  styles: `:host { display: inline-flex; }`,
})
export class SolPill {
  readonly tone = input<PillTone>('neutral');
  readonly dot = input(true);

  protected toneClass(): string {
    return TONE_CLASS[this.tone()];
  }
}
