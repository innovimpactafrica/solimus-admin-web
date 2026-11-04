import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocTitle } from './parts/doc-title';
import { DocumentLine } from './rent-notice.document';

export interface ManagementStatementDocument {
  readonly agency: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly reference: string;
  readonly periodLabel: string;
  readonly mandateLine: string;
  readonly lines: readonly DocumentLine[];
  readonly collected: Amount;
  readonly fees: Amount;
  readonly works: Amount;
  readonly net: Amount;
  readonly payoutLabel: string;
  readonly issuedOn: string;
}

/** Management statement: rent collected, fees and works, net remitted (RG-27). */
@Component({
  selector: 'sol-management-statement-document',
  imports: [SolDocFooter, SolDocHeader, SolDocTitle, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let doc = data();
    <sol-doc-header [agency]="doc.agency" [addressee]="doc.addressee" />

    <p class="dref">
      Référence : <b>{{ doc.reference }}</b><br>
      {{ doc.mandateLine }}
    </p>

    <sol-doc-title title="RELEVÉ DE GESTION" [subtitle]="doc.periodLabel" />

    <table class="dtb">
      <thead>
        <tr><th>Bien et locataire</th><th>Loyer encaissé</th></tr>
      </thead>
      <tbody>
        @for (line of doc.lines; track line.label) {
          <tr><td>{{ line.label }}</td><td>{{ line.amount | fcfa: false: 2 }}</td></tr>
        }
        <tr class="b"><td>TOTAL ENCAISSÉ</td><td>{{ doc.collected | fcfa: false: 2 }}</td></tr>
        <tr><td>HONORAIRES DE GESTION</td><td>− {{ doc.fees | fcfa: false: 2 }}</td></tr>
        <tr><td>TRAVAUX ET RÉPARATIONS</td><td>− {{ doc.works | fcfa: false: 2 }}</td></tr>
        <tr class="b"><td>NET À REVERSER</td><td>{{ doc.net | fcfa: false: 2 }}</td></tr>
      </tbody>
    </table>

    <p class="dnote">{{ doc.payoutLabel }}</p>

    <div class="dsig">
      <span>Pour {{ doc.agency.name }}</span>
      <small>Le gérant</small>
    </div>

    <sol-doc-footer [date]="doc.issuedOn" />
  `,
  styles: `:host { display: contents; }`,
})
export class SolManagementStatementDocument {
  readonly data = input.required<ManagementStatementDocument>();
}
