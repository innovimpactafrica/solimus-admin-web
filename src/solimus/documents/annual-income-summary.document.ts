import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocTitle } from './parts/doc-title';
import { DocumentLine } from './rent-notice.document';

export interface AnnualIncomeSummaryDocument {
  readonly agency: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly year: number;
  readonly lines: readonly DocumentLine[];
  readonly net: Amount;
  readonly issuedOn: string;
  readonly page: string;
}

/** Annual income summary, issued in January for the owner's tax return. */
@Component({
  selector: 'sol-annual-income-summary-document',
  imports: [SolDocFooter, SolDocHeader, SolDocTitle, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let doc = data();
    <sol-doc-header [agency]="doc.agency" [addressee]="doc.addressee" />
    <sol-doc-title title="RÉCAPITULATIF DES REVENUS LOCATIFS" [subtitle]="'Année ' + doc.year" />

    <table class="dtb">
      <thead>
        <tr><th class="left">Rubrique</th><th>Montant</th></tr>
      </thead>
      <tbody>
        @for (line of doc.lines; track line.label) {
          <tr><td>{{ line.label }}</td><td>{{ line.amount | fcfa: false: 2 }}</td></tr>
        }
        <tr class="b"><td>Revenu net reversé</td><td>{{ doc.net | fcfa: false: 2 }}</td></tr>
      </tbody>
    </table>

    <p class="dnote">
      Les charges locatives encaissées couvrent les dépenses de l’immeuble et ne constituent pas
      un revenu. Détail mensuel par bien en annexe. Document établi pour vous aider dans vos
      démarches fiscales ; il ne remplace pas votre déclaration.
    </p>

    <sol-doc-footer [date]="doc.issuedOn" [page]="doc.page" />
  `,
  styles: `
    :host { display: contents; }
    .left { text-align: left; }
  `,
})
export class SolAnnualIncomeSummaryDocument {
  readonly data = input.required<AnnualIncomeSummaryDocument>();
}
