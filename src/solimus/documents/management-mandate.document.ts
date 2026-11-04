import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocSignatures } from './parts/doc-signatures';
import { SolDocTitle } from './parts/doc-title';
import { Signatory } from './parts/doc-signature';

export interface ManagementMandateDocument {
  readonly agency: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly reference: string;
  readonly principal: string;
  readonly feeRatePercent: number;
  readonly worksThreshold: Amount;
  readonly remittanceDay: number;
  readonly account: string;
  readonly signedOn: string;
  readonly noticeMonths: number;
  readonly signatories: readonly [Signatory, Signatory];
}

/** Management mandate: what the agency may do, and for what fee (RG-02). */
@Component({
  selector: 'sol-management-mandate-document',
  imports: [SolDocFooter, SolDocHeader, SolDocSignatures, SolDocTitle, FcfaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let doc = data();
    <sol-doc-header [agency]="doc.agency" [addressee]="doc.addressee" />
    <sol-doc-title title="MANDAT DE GESTION LOCATIVE" [subtitle]="'N° ' + doc.reference" />

    <p class="dp">
      <b>Mandant :</b> {{ doc.principal }}, propriétaire des biens désignés en annexe.
      <b>Mandataire :</b> {{ doc.agency.name }}, administrateur de biens.
    </p>
    <p class="dp">
      <b>Article 1 · Objet.</b> Le mandant confie au mandataire la gestion locative de ses biens :
      recherche de locataires, rédaction des baux, états des lieux, émission des avis d’échéance,
      encaissement des loyers, relances, suivi des travaux et reversement des sommes perçues.
    </p>
    <p class="dp">
      <b>Article 2 · Rémunération.</b> {{ doc.feeRatePercent }} % des loyers encaissés hors
      charges. Les travaux de plus de {{ doc.worksThreshold | fcfa }} sont soumis à l’accord
      préalable du mandant depuis son application.
    </p>
    <p class="dp">
      <b>Article 3 · Reversements.</b> Le {{ doc.remittanceDay }} de chaque mois, accompagnés d’un
      relevé de gestion, sur le compte {{ doc.account }}.
    </p>
    <p class="dp">
      <b>Article 4 · Durée.</b> Un an à compter du {{ doc.signedOn }}, renouvelable par tacite
      reconduction, résiliable avec un préavis de {{ doc.noticeMonths }} mois.
    </p>

    <sol-doc-signatures [parties]="doc.signatories" />
    <sol-doc-footer [date]="doc.signedOn" />
  `,
  styles: `:host { display: contents; }`,
})
export class SolManagementMandateDocument {
  readonly data = input.required<ManagementMandateDocument>();
}
