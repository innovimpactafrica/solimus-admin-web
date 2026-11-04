import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

export interface SegmentOption<T extends string = string> {
  readonly value: T;
  readonly label: string;
}

/** Inline segmented control (`.seg` in the design). */
@Component({
  selector: 'sol-segmented',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="seg" role="tablist">
      @for (option of options(); track option.value) {
        <button type="button" role="tab" [class.on]="option.value === value()"
                [attr.aria-selected]="option.value === value()"
                (click)="value.set(option.value)">{{ option.label }}</button>
      }
    </div>
  `,
  styles: `:host { display: inline-flex; }`,
})
export class SolSegmented<T extends string = string> {
  readonly options = input.required<readonly SegmentOption<T>[]>();
  readonly value = model.required<T>();
}
