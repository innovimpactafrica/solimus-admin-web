import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ChartConfiguration, Plugin } from 'chart.js';
import { ArcElement, DoughnutController, Legend, Tooltip } from 'chart.js';
import { BaseChartDirective, provideCharts } from 'ng2-charts';
import { chartFont, CHART_INK, CHART_MUTED, CHART_TOOLTIP, CHART_TRACK } from './chart-theme';

export interface DonutSlice {
  readonly label: string;
  /** Share of the whole, between 0 and 1. */
  readonly value: number;
  readonly color: string;
}

/**
 * Occupancy donut of the reports screen, rendered with Chart.js (ng2-charts).
 * The unfilled share is drawn as a grey track; Chart.js's legend lists the slices.
 */
@Component({
  selector: 'sol-donut-chart',
  imports: [BaseChartDirective],
  providers: [provideCharts({ registerables: [DoughnutController, ArcElement, Legend, Tooltip] })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ring" [style.width.px]="boxWidth()" [style.height.px]="boxHeight()">
      <canvas baseChart type="doughnut" [data]="chartData()" [options]="options()" [plugins]="plugins"
              role="img" [attr.aria-label]="centerLabel() + ' ' + caption()"></canvas>
    </div>
  `,
  styles: `
    :host { display: inline-block; }
    .ring { position: relative; max-width: 100%; }
  `,
})
export class SolDonutChart {
  readonly slices = input.required<readonly DonutSlice[]>();
  readonly size = input(150);
  readonly centerLabel = input('');
  readonly caption = input('occupation');
  readonly showLegend = input(true);
  readonly legendPosition = input<'right' | 'bottom'>('right');

  /** The canvas grows to make room for the legend, the ring keeps `size`. */
  protected readonly boxWidth = computed(() =>
    this.showLegend() && this.legendPosition() === 'right' ? this.size() + 170 : this.size());
  protected readonly boxHeight = computed(() =>
    this.showLegend() && this.legendPosition() === 'bottom'
      ? this.size() + 12 + Math.ceil(this.slices().length / 2) * 22
      : this.size());

  /** Draws the center label and caption in the middle of the ring. */
  protected readonly plugins: Plugin<'doughnut'>[] = [{
    id: 'solDonutCenter',
    afterDraw: (chart) => {
      const { ctx, chartArea } = chart;
      const x = (chartArea.left + chartArea.right) / 2;
      const y = (chartArea.top + chartArea.bottom) / 2;
      const family = chartFont().family;
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = CHART_INK;
      ctx.font = `600 22px ${family}`;
      ctx.fillText(this.centerLabel(), x, y - 6);
      ctx.fillStyle = CHART_MUTED;
      ctx.font = `11px ${family}`;
      ctx.fillText(this.caption(), x, y + 14);
      ctx.restore();
    },
  }];

  /** Remaining share up to 100 %, drawn as the grey track (hidden from the legend). */
  private readonly rest = computed(() =>
    Math.max(0, 1 - this.slices().reduce((sum, s) => sum + s.value, 0)),
  );

  protected readonly chartData = computed<ChartConfiguration<'doughnut'>['data']>(() => {
    const slices = this.slices();
    const rest = this.rest();
    return {
      labels: [...slices.map((s) => s.label), ...(rest > 0 ? [''] : [])],
      datasets: [{
        data: [...slices.map((s) => s.value), ...(rest > 0 ? [rest] : [])],
        backgroundColor: [...slices.map((s) => s.color), CHART_TRACK],
        hoverBackgroundColor: [...slices.map((s) => s.color), CHART_TRACK],
        borderWidth: 0,
      }],
    };
  });

  protected readonly options = computed<ChartConfiguration<'doughnut'>['options']>(() => {
    const font = chartFont();
    const count = this.slices().length;
    return {
      responsive: true,
      maintainAspectRatio: false,
      cutout: `${Math.round(100 - (16 / (this.size() / 2 - 6)) * 100)}%`,
      animation: { duration: 400 },
      font,
      plugins: {
        legend: {
          display: this.showLegend(),
          position: this.legendPosition(),
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            useBorderRadius: true,
            borderRadius: 3,
            color: CHART_MUTED,
            font: { ...font, size: 12 },
            padding: 12,
            filter: (item) => (item.index ?? 0) < count,
          },
        },
        tooltip: {
          ...CHART_TOOLTIP,
          bodyFont: font,
          filter: (item) => item.dataIndex < count,
          callbacks: { label: (item) => ` ${item.label} : ${Math.round(item.parsed * 100)} %` },
        },
      },
    };
  });
}
