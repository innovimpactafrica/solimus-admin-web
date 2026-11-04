import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AgencyIdentity } from '../domain/models/agency.model';
import { Amount } from '../domain/models/common.model';
import { FcfaPipe } from '../ui/pipes/fcfa.pipe';
import { DocumentField, SolDocKv } from './parts/doc-kv';
import { SolDocFooter } from './parts/doc-footer';
import { SolDocHeader } from './parts/doc-header';
import { SolDocSignature } from './parts/doc-signature';
import { SolDocTitle } from './parts/doc-title';

export interface ReminderLetterDocument {
  readonly agency: AgencyIdentity;
  readonly addressee: readonly string[];
  readonly title: string;
  readonly periodLabel: string;
  readonly salutation: string;
  readonly propertyLine: string;
  readonly dueOn: string;
  readonly amount: Amount;
  readonly amountDetail: string;
  readonly daysLate: number;
  readonly noticeReference: string;
  readonly ownerInformed: boolean;
  readonly issuedOn: string;
}

/** Reminder sent one day then seven days after the due date (RG-20). */
@Component({
  selector: 'sol-reminder-letter-document',
  imports: [SolDocFooter, SolDocHeader, SolDocKv, SolDocSignature, SolDocTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let doc = data();
    <sol-doc-header [agency]="doc.agency" [addressee]="doc.addressee" />
    <sol-doc-title [title]="doc.title" [subtitle]="doc.periodLabel" />

    <p class="dp">{{ doc.salutation }},</p>
    <p class="dp">
      Sauf erreur de notre part, le loyer de {{ doc.periodLabel.toLowerCase() }} de votre logement
      ({{ doc.propertyLine }}), échu le {{ doc.dueOn }}, reste impayé à ce jour.
    </p>

    <sol-doc-kv [fields]="fields()" />

    <p class="dp">
      Nous vous invitons à régulariser votre situation dans les meilleurs délais, directement
      depuis l’application Solimus Gestion. Si vous rencontrez une difficulté, contactez-nous pour
      convenir d’un échéancier.
      @if (doc.ownerInformed) { Votre propriétaire a été informé de ce retard. }
    </p>
    <p class="dp">Veuillez agréer, {{ doc.salutation }}, nos salutations distinguées.</p>

    <sol-doc-signature role="Le service gestion" [name]="doc.agency.name" />
    <sol-doc-footer [date]="doc.issuedOn" />
  `,
  styles: `:host { display: contents; }`,
})
export class SolReminderLetterDocument {
  private readonly fcfa = new FcfaPipe();

  readonly data = input.required<ReminderLetterDocument>();

  protected fields(): readonly DocumentField[] {
    const doc = this.data();
    return [
      { label: 'Échéance', value: doc.dueOn },
      { label: 'Montant dû', value: `${this.fcfa.transform(doc.amount)} (${doc.amountDetail})`, strong: true },
      { label: 'Jours de retard', value: `${doc.daysLate} jours` },
      { label: 'Référence de paiement', value: doc.noticeReference },
    ];
  }
}
