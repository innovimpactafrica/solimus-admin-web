import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface BarPoint {
  readonly label: string;
  /** Foreground series, drawn in the brand colour. */
  readonly value: number;
  /** Optional background series, drawn in grey behind the main one. */
  readonly reference?: number;
}

interface Bar {
  readonly label: string;
  readonly x: number;
  readonly mainX: number;
  readonly mainY: number;
  readonly mainH: number;
  readonly refX: number;
  readonly refY: number;
  readonly refH: number;
  readonly hasRef: boolean;
  readonly width: number;
}

/**
 * Column chart used by the dashboards and the reports.
 * Ported from the mockup's `bars()` helper, so proportions and grid stay identical.
 */
@Component({
  selector: 'sol-bar-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.viewBox]="'0 0 ' + width() + ' ' + height()" role="img" [attr.aria-label]="ariaLabel()">
      @for (tick of ticks(); track tick.value) {
        <line [attr.x1]="padding" [attr.x2]="width()" [attr.y1]="tick.y" [attr.y2]="tick.y"
              stroke="#efede8" [attr.stroke-dasharray]="tick.value ? '3 4' : null" />
        <text x="0" [attr.y]="tick.y + 4" font-size="11" fill="#8a8f95">{{ tick.label }}</text>
      }
      @for (bar of bars(); track bar.label) {
        @if (bar.hasRef) {
          <rect [attr.x]="bar.refX" [attr.y]="bar.refY" [attr.width]="bar.width" [attr.height]="bar.refH" rx="3" fill="#d9e4df" />
        }
        <rect [attr.x]="bar.mainX" [attr.y]="bar.mainY" [attr.width]="bar.width" [attr.height]="bar.mainH" rx="3" [attr.fill]="color()" />
        <text [attr.x]="bar.x" [attr.y]="height() - 6" font-size="11" fill="#8a8f95" text-anchor="middle">{{ bar.label }}</text>
      }
    </svg>
  `,
  styles: `
    :host { display: block; }
    svg { width: 100%; height: auto; display: block; font-family: var(--font); }
  `,
})
export class SolBarChart {
  readonly data = input.required<readonly BarPoint[]>();
  readonly width = input(640);
  readonly height = input(220);
  readonly max = input<number | null>(null);
  readonly color = input('#3f5f55');
  readonly tickValues = input<readonly number[]>([0, 0.25, 0.5, 0.75, 1]);
  readonly formatTick = input<(value: number) => string>((value) => String(Math.round(value)));
  readonly ariaLabel = input('Graphique en colonnes');

  protected readonly padding = 34;

  private readonly scale = computed(() => {
    const explicit = this.max();
    if (explicit) return explicit;
    const peak = Math.max(...this.data().map((d) => Math.max(d.value, d.reference ?? 0)));
    return peak * 1.15 || 1;
  });

  protected readonly ticks = computed(() =>
    this.tickValues().map((ratio) => ({
      value: ratio,
      y: this.height() - 24 - (this.height() - 44) * ratio,
      label: this.formatTick()(this.scale() * ratio),
    })),
  );

  protected readonly bars = computed<readonly Bar[]>(() => {
    const data = this.data();
    const slot = (this.width() - this.padding - 10) / data.length;
    const plot = this.height() - 44;
    const baseline = this.height() - 24;

    return data.map((point, index) => {
      const x = this.padding + 8 + index * slot;
      const centre = x + slot / 2;
      const barWidth = Math.min(18, slot / 3.2);
      const mainH = plot * (point.value / this.scale());
      const hasRef = point.reference !== undefined;
      const refH = hasRef ? plot * (point.reference! / this.scale()) : 0;

      return {
        label: point.label,
        x: centre,
        width: barWidth,
        hasRef,
        refX: centre - barWidth - 2,
        refY: baseline - refH,
        refH,
        mainX: hasRef ? centre + 2 : centre - barWidth / 2,
        mainY: baseline - mainH,
        mainH,
      };
    });
  });
}
