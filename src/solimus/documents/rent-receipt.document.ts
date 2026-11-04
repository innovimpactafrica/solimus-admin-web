import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { AmountInWordsPipe } from '../ui/pipes/amount-in-words.pipe';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocTitle } from './parts/doc-title';
import { DocumentLine } from './rent-notice.document';

export interface RentReceiptDocument {
  readonly agency: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly reference: string;
  readonly periodLabel: string;
  readonly propertyLine: string;
  readonly leaseLine: string;
  readonly payerName: string;
  readonly lines: readonly DocumentLine[];
  readonly total: Amount;
  readonly paidOn: string;
  readonly paymentLabel: string;
  readonly signatory: string;
}

/** Rent receipt, generated the moment a payment is confirmed (RG-19). */
@Component({
  selector: 'sol-rent-receipt-document',
  imports: [SolDocFooter, SolDocHeader, SolDocTitle, AmountInWordsPipe, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let doc = data();
    <sol-doc-header [agency]="doc.agency" [addressee]="doc.addressee" />

    <p class="dref">
      Référence : <b>{{ doc.reference }}</b><br>
      Bien : {{ doc.propertyLine }}<br>
      {{ doc.leaseLine }}
    </p>

    <sol-doc-title title="QUITTANCE DE LOYER" [subtitle]="doc.periodLabel" />

    <p class="dp">
      Je soussigné, {{ doc.agency.name }}, agissant pour le compte du propriétaire,
      reconnais avoir reçu de <b>{{ doc.payerName }}</b> la somme de
      <b>{{ doc.total | amountInWords }}</b> ({{ doc.total | fcfa }}), au titre du loyer et des
      charges de la période {{ doc.periodLabel }}.
    </p>

    <table class="dtb">
      <thead>
        <tr><th>Désignation</th><th>Montant</th></tr>
      </thead>
      <tbody>
        @for (line of doc.lines; track line.label) {
          <tr><td>{{ line.label }}</td><td>{{ line.amount | fcfa: false: 2 }}</td></tr>
        }
        <tr class="b"><td>TOTAL PAYÉ</td><td>{{ doc.total | fcfa: false: 2 }}</td></tr>
      </tbody>
    </table>

    <p class="dnote">
      Payé le {{ doc.paidOn }} · {{ doc.paymentLabel }}. La présente quittance annule tout reçu
      antérieur portant sur la même période.
    </p>

    <div class="dsig">
      <span>Pour le propriétaire</span>
      <small>{{ doc.signatory }}</small>
    </div>

    <sol-doc-footer [date]="doc.paidOn" />
  `,
  styles: `:host { display: contents; }`,
})
export class SolRentReceiptDocument {
  readonly data = input.required<RentReceiptDocument>();
}
