import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { LeaseKind } from '../domain/models/lease.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { amountInWords } from '../ui/pipes/amount-in-words.pipe';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocSignatures } from './parts/doc-signatures';
import { SolDocTitle } from './parts/doc-title';
import { Signatory } from './parts/doc-signature';

export interface LeaseContractDocument {
  readonly agency: AgencyIdentity;
  readonly kind: LeaseKind;
  readonly reference: string;
  readonly subtitle: string;
  readonly lessor: string;
  readonly tenant: string;
  readonly premises: string;
  readonly usage: string;
  readonly termLabel: string;
  readonly startedOn: string;
  readonly endsOn: string;
  readonly rent: Amount;
  readonly charges?: Amount;
  readonly wasteTax?: Amount;
  readonly vat?: Amount;
  readonly dueDay: number;
  readonly deposit: Amount;
  readonly depositMonths: number;
  readonly specialClauses: string;
  readonly signatories: readonly [Signatory, Signatory];
  readonly issuedOn: string;
  /** A blank agency template rather than a lease for a real tenant. */
  readonly isTemplate?: boolean;
}

const TITLES: Record<LeaseKind, string> = {
  residentialUnfurnished: 'CONTRAT DE BAIL D’HABITATION',
  residentialFurnished: 'CONTRAT DE BAIL D’HABITATION MEUBLÉ',
  professional: 'CONTRAT DE BAIL PROFESSIONNEL',
  commercial: 'CONTRAT DE BAIL COMMERCIAL',
};

/** Residential leases carry a three month notice, the others six. */
const SHORT_NOTICE: readonly LeaseKind[] = ['residentialUnfurnished', 'residentialFurnished'];

/** Lease contract, in the four kinds the agency issues (RG-09). */
@Component({
  selector: 'sol-lease-contract-document',
  imports: [SolDocFooter, SolDocHeader, SolDocSignatures, SolDocTitle, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let doc = data();
    <sol-doc-header [agency]="doc.agency" [addressee]="[]" />
    <sol-doc-title [title]="title()" [subtitle]="subtitle()" />

    <p class="dp">
      <b>Entre les soussignés :</b> {{ doc.lessor }}, ci-après « le bailleur » ; et
      {{ doc.tenant }}, ci-après « le locataire ».
    </p>
    <p class="dp">
      <b>Article 1 · Objet.</b> Le bailleur loue au locataire {{ doc.premises }}, {{ doc.usage }}.
    </p>
    <p class="dp">
      <b>Article 2 · Durée.</b> Le bail est consenti pour {{ doc.termLabel }}, du
      {{ doc.startedOn }} au {{ doc.endsOn }}@if (doc.kind !== 'commercial') {, renouvelable par
      tacite reconduction}. Préavis du locataire : {{ noticePeriod() }}.
    </p>
    <p class="dp">
      <b>Article 3 · Loyer et charges.</b> {{ rentSentence() }}, payables au plus tard le
      {{ doc.dueDay }} de chaque mois, en ligne depuis l’application Solimus Gestion. Un avis
      d’échéance est adressé le 25 du mois précédent.
    </p>
    <p class="dp">
      <b>Article 4 · Dépôt de garantie.</b> {{ doc.deposit | fcfa }}, soit
      {{ depositInWords() }} mois de loyer, restitués dans un délai d’un mois après l’état des
      lieux de sortie, déduction faite des sommes dues.
    </p>
    <p class="dp"><b>Article 5 · Obligations du locataire.</b> {{ obligations() }}</p>
    <p class="dp"><b>Clauses particulières.</b> {{ doc.specialClauses }}</p>

    <sol-doc-signatures [parties]="doc.signatories" />

    @if (doc.isTemplate) {
      <sol-doc-footer
        [date]="doc.issuedOn"
        page="1 / 4"
        label="Modèle mis à jour le"
        issuer="Modèle de l’agence · champs remplis à la création du bail" />
    } @else {
      <sol-doc-footer [date]="doc.issuedOn" page="1 / 4" />
    }
  `,
  styles: `:host { display: contents; }`,
})
export class SolLeaseContractDocument {
  private readonly fcfa = new FcfaPipe();

  readonly data = input.required<LeaseContractDocument>();

  protected readonly title = computed(() => TITLES[this.data().kind]);

  protected readonly subtitle = computed(() => {
    const doc = this.data();
    return doc.isTemplate ? doc.subtitle : `${doc.subtitle} · N° ${doc.reference}`;
  });

  protected noticePeriod(): string {
    return SHORT_NOTICE.includes(this.data().kind) ? 'trois (3) mois' : 'six (6) mois';
  }

  /** Reads as a sentence: rent, then charges, waste tax and VAT when they apply. */
  protected rentSentence(): string {
    const doc = this.data();
    const parts = [`Loyer mensuel de ${this.fcfa.transform(doc.rent)}`];
    if (doc.charges) parts.push(`provision sur charges de ${this.fcfa.transform(doc.charges)}`);
    if (doc.wasteTax) parts.push(`provision T.O.M. de ${this.fcfa.transform(doc.wasteTax)}`);
    if (doc.vat) parts.push(`TVA de 18 % sur le loyer, soit ${this.fcfa.transform(doc.vat)}`);
    if (parts.length === 1) return parts[0];
    return `${parts.slice(0, -1).join(', ')} et ${parts[parts.length - 1]}`;
  }

  protected depositInWords(): string {
    return amountInWords(this.data().depositMonths);
  }

  protected obligations(): string {
    return SHORT_NOTICE.includes(this.data().kind)
      ? 'Payer le loyer aux échéances, user paisiblement des lieux, assurer le logement, ne pas sous-louer, laisser exécuter les travaux nécessaires.'
      : 'Payer le loyer et les taxes aux échéances, exercer l’activité prévue, assurer les locaux, ne pas céder ni sous-louer sans l’accord écrit du bailleur.';
  }
}
