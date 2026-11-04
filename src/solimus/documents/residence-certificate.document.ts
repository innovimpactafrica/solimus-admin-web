import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocSignature } from './parts/doc-signature';
import { SolDocTitle } from './parts/doc-title';

export interface ResidenceCertificateDocument {
  readonly agency: AgencyIdentity;
  readonly reference: string;
  readonly ownerName: string;
  readonly tenantName: string;
  readonly propertyLine: string;
  readonly leaseId: string;
  readonly leaseKindLabel: string;
  readonly startedOn: string;
  readonly rent: Amount;
  readonly charges: Amount;
  readonly upToDate: boolean;
  readonly place: string;
  readonly signatory: string;
  readonly issuedOn: string;
}

/** Residence certificate, produced on the tenant's own request from the app. */
@Component({
  selector: 'sol-residence-certificate-document',
  imports: [SolDocFooter, SolDocHeader, SolDocSignature, SolDocTitle, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let doc = data();
    <sol-doc-header [agency]="doc.agency" [addressee]="[]" />
    <sol-doc-title title="ATTESTATION DE LOCATION" [subtitle]="'N° ' + doc.reference" />

    <p class="dp">
      {{ doc.agency.name }}, agissant pour le compte de {{ doc.ownerName }}, atteste que
      <b>{{ doc.tenantName }}</b> occupe en qualité de locataire {{ doc.propertyLine }}, en vertu
      d’un bail {{ doc.leaseKindLabel }} n° {{ doc.leaseId }} prenant effet le {{ doc.startedOn }}.
    </p>
    <p class="dp">
      Le loyer mensuel s’élève à {{ doc.rent | fcfa }}@if (doc.charges) {, majoré de
      {{ doc.charges | fcfa }} de charges}.
      @if (doc.upToDate) {
        À la date du présent document, le locataire est à jour de ses paiements.
      }
    </p>
    <p class="dp">Attestation délivrée pour servir et valoir ce que de droit.</p>

    <sol-doc-signature [role]="'Fait à ' + doc.place + ', le ' + doc.issuedOn" [name]="doc.signatory" />
    <sol-doc-footer [date]="doc.issuedOn" />
  `,
  styles: `:host { display: contents; }`,
})
export class SolResidenceCertificateDocument {
  readonly data = input.required<ResidenceCertificateDocument>();
}
