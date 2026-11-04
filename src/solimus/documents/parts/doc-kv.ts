import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface DocumentField {
  readonly label: string;
  readonly value: string;
  /** Renders the value in bold, for the figure a reader looks for first. */
  readonly strong?: boolean;
}

/** Two column fact table used by mandates, work orders and settlements. */
@Component({
  selector: 'sol-doc-kv',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table class="dkv">
      <tbody>
        @for (field of fields(); track field.label) {
          <tr>
            <td>{{ field.label }}</td>
            <td>
              @if (field.strong) { <b>{{ field.value }}</b> } @else { {{ field.value }} }
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: `:host { display: contents; }`,
})
export class SolDocKv {
  readonly fields = input.required<readonly DocumentField[]>();
}
