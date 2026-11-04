import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface Signatory {
  readonly role: string;
  readonly name: string;
}

/** One signature block, right aligned. */
@Component({
  selector: 'sol-doc-signature',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dsig">
      <span>{{ role() }}</span>
      <b>{{ name() }}</b>
    </div>
  `,
  styles: `:host { display: contents; }`,
})
export class SolDocSignature {
  readonly role = input.required<string>();
  readonly name = input.required<string>();
}
