import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocSignatures } from './parts/doc-signatures';
import { SolDocTitle } from './parts/doc-title';
import { Signatory } from './parts/doc-signature';

export interface LeaseAmendmentDocument {
  readonly agency: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly number: number;
  readonly subtitle: string;
  readonly lessor: string;
  readonly tenant: string;
  readonly purpose: string;
  readonly effectiveOn: string;
  readonly previousRent: Amount;
  readonly newRent: Amount;
  readonly signatories: readonly [Signatory, Signatory];
  readonly issuedOn: string;
}

/** Amendment to a lease: rent review, added co-tenant or extension (RG-11). */
@Component({
  selector: 'sol-lease-amendment-document',
  imports: [SolDocFooter, SolDocHeader, SolDocSignatures, SolDocTitle, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let doc = data();
    <sol-doc-header [agency]="doc.agency" [addressee]="doc.addressee" />
    <sol-doc-title
      [title]="'AVENANT N° ' + doc.number + ' AU CONTRAT DE BAIL'"
      [subtitle]="doc.subtitle" />

    <p class="dp">
      <b>Entre les soussignés :</b> {{ doc.lessor }}, ci-après « le bailleur » ; et
      {{ doc.tenant }}, ci-après « le locataire ».
    </p>
    <p class="dp"><b>Article 1 · Objet.</b> {{ doc.purpose }}</p>
    <p class="dp">
      <b>Article 2 · Nouveau loyer.</b> À compter du {{ doc.effectiveOn }}, le loyer mensuel est
      porté de {{ doc.previousRent | fcfa }} à <b>{{ doc.newRent | fcfa }}</b>. Les avis
      d’échéance sont établis sur ce nouveau montant.
    </p>
    <p class="dp">
      <b>Article 3 · Autres clauses.</b> Toutes les autres clauses du bail restent inchangées.
    </p>

    <sol-doc-signatures [parties]="doc.signatories" />
    <sol-doc-footer [date]="doc.issuedOn" />
  `,
  styles: `:host { display: contents; }`,
})
export class SolLeaseAmendmentDocument {
  readonly data = input.required<LeaseAmendmentDocument>();
}
