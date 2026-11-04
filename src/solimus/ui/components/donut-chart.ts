import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface DonutSlice {
  readonly label: string;
  /** Share of the whole, between 0 and 1. */
  readonly value: number;
  readonly color: string;
}

/** Occupancy donut of the reports screen, ported from the mockup's `donut()` helper. */
@Component({
  selector: 'sol-donut-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.viewBox]="'0 0 ' + size() + ' ' + size()" [attr.width]="size()" [attr.height]="size()"
         role="img" [attr.aria-label]="centerLabel() + ' ' + caption()">
      <circle [attr.cx]="half()" [attr.cy]="half()" [attr.r]="radius()" fill="none" stroke="#efede8" stroke-width="16" />
      @for (arc of arcs(); track arc.label) {
        <circle [attr.cx]="half()" [attr.cy]="half()" [attr.r]="radius()" fill="none"
                [attr.stroke]="arc.color" stroke-width="16"
                [attr.stroke-dasharray]="arc.dash" [attr.stroke-dashoffset]="arc.offset"
                [attr.transform]="'rotate(-90 ' + half() + ' ' + half() + ')'" />
      }
      <text x="50%" y="48%" text-anchor="middle" font-size="22" font-weight="600" fill="#1f2328">{{ centerLabel() }}</text>
      <text x="50%" y="62%" text-anchor="middle" font-size="11" fill="#6b7177">{{ caption() }}</text>
    </svg>
  `,
  styles: `
    :host { display: inline-block; }
    svg { font-family: var(--font); }
  `,
})
export class SolDonutChart {
  readonly slices = input.required<readonly DonutSlice[]>();
  readonly size = input(150);
  readonly centerLabel = input('');
  readonly caption = input('occupation');

  protected readonly half = computed(() => this.size() / 2);
  protected readonly radius = computed(() => this.size() / 2 - 14);

  protected readonly arcs = computed(() => {
    const circumference = 2 * Math.PI * this.radius();
    let consumed = 0;

    return this.slices().map((slice) => {
      const arc = {
        label: slice.label,
        color: slice.color,
        dash: `${slice.value * circumference} ${circumference}`,
        offset: -consumed * circumference,
      };
      consumed += slice.value;
      return arc;
    });
  });
}
