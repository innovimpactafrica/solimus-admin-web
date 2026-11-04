import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Amount } from '../../domain/models/common.model';
import { FcfaPipe } from '../../ui/pipes/fcfa.pipe';

export interface LedgerRow {
  readonly label: string;
  readonly debit?: Amount;
  readonly credit?: Amount;
  readonly balance?: Amount;
  /** Highlighted total line. */
  readonly total?: boolean;
}

/** Debit / credit / balance table, as used by notices and settlements. */
@Component({
  selector: 'sol-doc-ledger',
  imports: [FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table class="dtb">
      <thead>
        <tr>
          <th class="left">Libellé</th>
          <th>Débit</th>
          <th>Crédit</th>
          <th>Solde</th>
        </tr>
      </thead>
      <tbody>
        @for (row of rows(); track row.label) {
          <tr [class.b]="row.total">
            <td>{{ row.label }}</td>
            <td>{{ row.debit === undefined ? '' : (row.debit | fcfa: false: 2) }}</td>
            <td>{{ row.credit === undefined ? '' : (row.credit | fcfa: false: 2) }}</td>
            <td>{{ row.balance === undefined ? '' : (row.balance | fcfa: false: 2) }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: `
    :host { display: contents; }
    .left { text-align: left; }
  `,
})
export class SolDocLedger {
  readonly rows = input.required<readonly LedgerRow[]>();
}
