import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

/** Two-state switch used throughout the settings screens. */
@Component({
  selector: 'sol-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="toggle" [class.on]="checked()"
            role="switch" [attr.aria-checked]="checked()" [attr.aria-label]="label()"
            (click)="checked.set(!checked())"></button>
  `,
  styles: `:host { display: inline-flex; }`,
})
export class SolToggle {
  readonly checked = model(false);
  readonly label = input('');
}
