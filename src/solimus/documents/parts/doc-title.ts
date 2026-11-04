import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'sol-doc-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dt-t">
      <h2>{{ title() }}</h2>
      @if (subtitle()) { <p>{{ subtitle() }}</p> }
    </div>
  `,
  styles: `:host { display: contents; }`,
})
export class SolDocTitle {
  readonly title = input.required<string>();
  readonly subtitle = input('');
}
