import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ICON_PATHS, IconName } from './icon-paths';

/**
 * Inline SVG icon. Stroke based, inherits `currentColor` and the font size
 * of its container unless an explicit size is given.
 */
@Component({
  selector: 'sol-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false">
      <path [attr.d]="path()" />
    </svg>
  `,
  styles: `
    :host { display: inline-flex; align-items: center; justify-content: center; flex: none; }
  `,
})
export class SolIcon {
  readonly name = input.required<IconName>();
  readonly size = input<number | string | null>(null);
  readonly strokeWidth = input<number | string>(1.8);

  protected readonly path = computed(() => ICON_PATHS[this.name()]);
}
