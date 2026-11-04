import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SolIcon } from './icon';
import { IconName } from './icon-paths';

export type KpiTone = 'green' | 'blue' | 'orange' | 'red' | 'purple' | 'neutral' | 'brand';

const TONE_CLASS: Record<KpiTone, string> = {
  green: 't-g', blue: 't-b', orange: 't-o', red: 't-r',
  purple: 't-p', neutral: 't-n', brand: 't-gr',
};

/** Dashboard indicator: label, value, optional note and a tinted icon. */
@Component({
  selector: 'sol-kpi-card',
  imports: [SolIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card kpi">
      <small>{{ label() }}</small>
      <div class="v">{{ value() }}@if (unit()) {<em>{{ unit() }}</em>}</div>
      @if (note()) {
        <div class="s" [class.ok]="noteTone() === 'positive'" [class.r]="noteTone() === 'negative'">{{ note() }}</div>
      }
      @if (progress() !== null) {
        <div class="bar-p"><i [style.width.%]="progress()! * 100"></i></div>
      }
      <span class="ic tint" [class]="toneClass()"><sol-icon [name]="icon()" /></span>
    </div>
  `,
  styles: `:host { display: block; }`,
})
export class SolKpiCard {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly unit = input<string | null>(null);
  readonly note = input<string | null>(null);
  readonly noteTone = input<'neutral' | 'positive' | 'negative'>('neutral');
  readonly icon = input.required<IconName>();
  readonly tone = input<KpiTone>('neutral');
  readonly progress = input<number | null>(null);

  protected toneClass(): string {
    return TONE_CLASS[this.tone()];
  }
}
