import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';
import { BaseChartDirective, provideCharts } from 'ng2-charts';
import { chartFont, CHART_GRID, CHART_MUTED, CHART_REFERENCE, CHART_TOOLTIP } from './chart-theme';

export interface BarPoint {
  readonly label: string;
  /** Foreground series, drawn in the brand colour. */
  readonly value: number;
  /** Optional background series, drawn in grey-green beside the main one. */
  readonly reference?: number;
}

/**
 * Column chart used by the dashboards and the reports, rendered with Chart.js
 * (ng2-charts). The legend is Chart.js's own, built from the series labels.
 */
@Component({
  selector: 'sol-bar-chart',
  imports: [BaseChartDirective],
  providers: [provideCharts({ registerables: [BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip] })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrap" [style.aspect-ratio]="width() + ' / ' + height()">
      <canvas baseChart type="bar" [data]="chartData()" [options]="options()" role="img"
              [attr.aria-label]="ariaLabel()"></canvas>
    </div>
  `,
  styles: `
    :host { display: block; }
    .wrap { position: relative; width: 100%; }
  `,
})
export class SolBarChart {
  readonly data = input.required<readonly BarPoint[]>();
  /** Width / height only set the aspect ratio: the chart fills its container. */
  readonly width = input(640);
  readonly height = input(220);
  readonly max = input<number | null>(null);
  readonly color = input('#3f5f55');
  readonly referenceColor = input(CHART_REFERENCE);
  /** Legend label of the main series. */
  readonly label = input('Valeur');
  /** Legend label of the reference series (shown only when the data has one). */
  readonly referenceLabel = input('Référence');
  readonly showLegend = input(true);
  readonly tickValues = input<readonly number[]>([0, 0.25, 0.5, 0.75, 1]);
  readonly formatTick = input<(value: number) => string>((value) => String(Math.round(value)));
  readonly ariaLabel = input('Graphique en colonnes');

  private readonly hasReference = computed(() => this.data().some((d) => d.reference !== undefined));

  private readonly scale = computed(() => {
    const explicit = this.max();
    if (explicit) return explicit;
    const peak = Math.max(...this.data().map((d) => Math.max(d.value, d.reference ?? 0)));
    return peak * 1.15 || 1;
  });

  protected readonly chartData = computed<ChartConfiguration<'bar'>['data']>(() => {
    const data = this.data();
    const bar = { borderRadius: 3, maxBarThickness: 18, categoryPercentage: 0.6, barPercentage: 0.9 };
    const datasets: ChartConfiguration<'bar'>['data']['datasets'] = [];

    if (this.hasReference()) {
      datasets.push({
        ...bar,
        label: this.referenceLabel(),
        data: data.map((d) => d.reference ?? 0),
        backgroundColor: this.referenceColor(),
        hoverBackgroundColor: this.referenceColor(),
      });
    }
    datasets.push({
      ...bar,
      label: this.label(),
      data: data.map((d) => d.value),
      backgroundColor: this.color(),
      hoverBackgroundColor: this.color(),
    });

    return { labels: data.map((d) => d.label), datasets };
  });

  protected readonly options = computed<ChartConfiguration<'bar'>['options']>(() => {
    const scale = this.scale();
    const format = this.formatTick();
    const font = chartFont();
    const ticks = this.tickValues().map((ratio) => scale * ratio);

    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 400 },
      font,
      layout: { padding: { top: 4 } },
      plugins: {
        legend: {
          display: this.showLegend(),
          position: 'top',
          align: 'end',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            useBorderRadius: true,
            borderRadius: 3,
            color: CHART_MUTED,
            font: { ...font, size: 12 },
            padding: 14,
          },
        },
        tooltip: {
          ...CHART_TOOLTIP,
          titleFont: { ...font, weight: 600 },
          bodyFont: font,
          callbacks: { label: (item) => ` ${item.dataset.label} : ${format(item.parsed.y ?? 0)}` },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: CHART_MUTED, font: { ...font, size: 11 } },
        },
        y: {
          min: 0,
          max: scale,
          border: { display: false },
          grid: { color: CHART_GRID },
          afterBuildTicks: (axis) => { axis.ticks = ticks.map((value) => ({ value })); },
          ticks: { color: CHART_MUTED, font: { ...font, size: 11 }, callback: (value) => format(Number(value)) },
        },
      },
    };
  });
}
