import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Signatory } from './doc-signature';

/** Side by side signature boxes, for contracts signed by two or more parties. */
@Component({
  selector: 'sol-doc-signatures',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dsig2">
      @for (party of parties(); track party.role) {
        <div>
          <span>{{ party.role }}</span>
          <small>{{ party.name }}</small>
        </div>
      }
    </div>
  `,
  styles: `:host { display: contents; }`,
})
export class SolDocSignatures {
  readonly parties = input.required<readonly Signatory[]>();
}
