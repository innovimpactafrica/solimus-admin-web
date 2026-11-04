import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AgencyIdentity } from '../../domain/models/agency.model';

/** Letterhead: issuing agency on the left, addressee block on the right. */
@Component({
  selector: 'sol-doc-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dh">
      <div class="dh-l">
        <div class="dh-logo">{{ agency().initials }}</div>
        <div>
          <b>{{ agency().name }}</b>
          <small>{{ agency().legalLine }}</small>
          <small>{{ agency().contactLine }}</small>
        </div>
      </div>
      <div class="dh-to">
        @for (line of addressee(); track $index) {
          @if ($first) { <b>{{ line }}</b> } @else { <span>{{ line }}</span> }
        }
      </div>
    </div>
  `,
  styles: `:host { display: contents; }`,
})
export class SolDocHeader {
  readonly agency = input.required<AgencyIdentity>();
  readonly addressee = input.required<readonly string[]>();
}
