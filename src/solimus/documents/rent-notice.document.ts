import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocTitle } from './parts/doc-title';

export interface DocumentLine {
  readonly label: string;
  readonly amount: Amount;
}

export interface RentNoticeDocument {
  readonly agency: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly reference: string;
  readonly periodLabel: string;
  readonly propertyLine: string;
  readonly leaseLine: string;
  readonly lines: readonly DocumentLine[];
  readonly previousBalance: Amount;
  readonly total: Amount;
  readonly issuedOn: string;
  readonly dueOn: string;
  readonly vatLiable: boolean;
}

/** Rent notice, issued on the 25th for the month ahead (RG-16). */
@Component({
  selector: 'sol-rent-notice-document',
  imports: [SolDocFooter, SolDocHeader, SolDocTitle, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let doc = data();
    <sol-doc-header [agency]="doc.agency" [addressee]="doc.addressee" />

    <p class="dref">
      Référence : <b>{{ doc.reference }}</b><br>
      Bien : {{ doc.propertyLine }}<br>
      {{ doc.leaseLine }}
    </p>

    <sol-doc-title title="AVIS D’ÉCHÉANCE" [subtitle]="doc.periodLabel" />

    <table class="dtb">
      <thead>
        <tr><th>Désignation</th><th>Montant</th></tr>
      </thead>
      <tbody>
        @for (line of doc.lines; track line.label) {
          <tr><td>{{ line.label }}</td><td>{{ line.amount | fcfa: false: 2 }}</td></tr>
        }
        <tr><td>SOLDE ANTÉRIEUR</td><td>{{ doc.previousBalance | fcfa: false: 2 }}</td></tr>
        <tr class="b"><td>TOTAL À PAYER</td><td>{{ doc.total | fcfa: false: 2 }}</td></tr>
      </tbody>
    </table>

    <p class="dnote">
      Émis le {{ doc.issuedOn }} · à régler avant le {{ doc.dueOn }}.
      @if (doc.vatLiable) {
        TVA de 18 % appliquée au loyer, le preneur étant assujetti.
      }
    </p>

    <div class="dpay">
      <div>
        <span>Paiement en ligne</span>
        <b>Application Solimus · Wave ou Orange Money</b>
      </div>
      <div>
        <span>Montant</span>
        <b>{{ doc.total | fcfa }}</b>
      </div>
    </div>

    <sol-doc-footer [date]="doc.issuedOn" />
  `,
  styles: `:host { display: contents; }`,
})
export class SolRentNoticeDocument {
  readonly data = input.required<RentNoticeDocument>();
}
