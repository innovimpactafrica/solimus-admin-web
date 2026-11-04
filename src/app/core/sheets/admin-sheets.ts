import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  SolPayoutAdviceDocument, SolSubscriptionInvoiceDocument,
} from '@solimus/documents';
import { MANAGERS, MANAGER_MONTH, PLANS, SAMPLE_INVOICE, SAMPLE_PAYOUT_ADVICE } from '@solimus/mocks';
import { SHEET_KIT, SheetService, formatAmount } from '@solimus/ui';

const PAYOUT_MODE = { automatic: 'Automatique', onRequest: 'Sur demande' } as const;

function managerFor(name: string | undefined) {
  return MANAGERS.find((manager) => manager.name === name) ?? MANAGERS.find((manager) => manager.id === 'm-teranga')!;
}

/** Export of an administration list. */
@Component({
  selector: 'app-admin-export-sheet',
  imports: [SHEET_KIT],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <sol-sheet [title]="(sheets.context().label || 'Exporter') + ' · ' + screen()"
               subtitle="Le fichier reprend les filtres et la période affichés à l’écran.">
      <sol-sheet-choices label="Format" selected="Excel"
                         [options]="[{ label: 'Excel', hint: 'Fichier .xlsx', icon: 'list' }, { label: 'PDF', hint: 'Mise en page imprimable', icon: 'file' }, { label: 'CSV', hint: 'Pour la comptabilité', icon: 'down' }]" />
      <sol-sheet-grid>
        <sol-sheet-field label="Période" value="Octobre 2026" [select]="true" />
        <sol-sheet-field label="Lignes" value="Toutes · 6 gestionnaires" [select]="true" />
      </sol-sheet-grid>
      <sol-sheet-chips label="Colonnes" [chips]="columns" />
      <div class="input">
        <label>Aperçu des premières lignes</label>
        <table class="tbl mini"><tbody>
          @for (row of preview; track row[0]) {
            <tr>@for (cell of row; track $index) { <td>{{ cell }}</td> }</tr>
          }
        </tbody></table>
      </div>
      <ng-container sheet-actions>
        <button type="button" class="btn btn-s" (click)="sheets.close()">Annuler</button>
        <button type="button" class="btn btn-p" (click)="download()"><sol-icon name="down" />Télécharger</button>
      </ng-container>
    </sol-sheet>
  `,
})
export class AdminExportSheet {
  protected readonly sheets = inject(SheetService);

  protected readonly columns = ['Gestionnaire', 'Formule', 'Encaissé', 'Mode de versement', 'Statut', 'Compte']
    .map((label, index) => ({ label, on: index < 5 }));

  protected readonly preview = MANAGERS.slice(0, 4).map((manager) => [
    manager.name,
    PLANS.find((plan) => plan.id === manager.planId)?.name ?? '',
    formatAmount(MANAGER_MONTH[manager.id]?.collected ?? 0),
    PAYOUT_MODE[manager.payoutMode],
  ]);

  protected readonly screen = computed(() => this.sheets.context()['screen'] ?? 'Liste');

  protected download(): void {
    const slug = this.screen().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]+/g, '-');
    this.sheets.finish(`admin-${slug}-octobre-2026.xlsx téléchargé`, '6 lignes · format Excel');
  }
}

/** Reminder to a manager: unverified payout account, or unpaid subscription. */
@Component({
  selector: 'app-admin-reminder-sheet',
  imports: [SHEET_KIT],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <sol-sheet title="Relancer" [subtitle]="reminder().to">
      <sol-sheet-chips label="Canaux"
                       [chips]="[{ label: 'Application', on: true }, { label: 'SMS', on: true }, { label: 'WhatsApp', on: true }, { label: 'E-mail', on: true }]" />
      <sol-sheet-message [text]="reminder().text" />
      <sol-sheet-history label="Relances déjà envoyées" [entries]="history" />
      <ng-container sheet-actions>
        <button type="button" class="btn btn-s" (click)="sheets.close()">Annuler</button>
        <button type="button" class="btn btn-p" (click)="sheets.finish('Relance envoyée', reminder().to + ' · 11:20 · SMS, WhatsApp et application')">
          <sol-icon name="send" />Envoyer la relance
        </button>
      </ng-container>
    </sol-sheet>
  `,
})
export class AdminReminderSheet {
  protected readonly sheets = inject(SheetService);

  protected readonly history: [string, string][] = [
    ['01/10', 'E-mail · facture émise'], ['04/10', 'SMS · 1re relance'], ['07/10', 'WhatsApp · 2e relance'],
  ];

  protected readonly reminder = computed(() => {
    const manager = managerFor(this.sheets.context().row);
    if (manager.id === 'm-diourbel') {
      return {
        to: `${manager.name} · ${manager.contactName}`,
        text: `Bonjour ${manager.contactName}, vos versements (1 200 000 FCFA) sont en attente : votre compte de versement n’est pas encore vérifié. Confirmez-le depuis Paramètres > Comptes de versement avec le code reçu par SMS.`,
      };
    }
    return {
      to: `${manager.name} · ${manager.contactName}`,
      text: `Bonjour ${manager.contactName}, la facture FAC-2610-005 (25 000 FCFA HT) reste impayée et votre espace est en lecture seule depuis le 08/10. Réglez-la en ligne pour réactiver l’accès.`,
    };
  });
}

/** Payout advice or subscription invoice, as sent to the manager. */
@Component({
  selector: 'app-admin-document-sheet',
  imports: [SHEET_KIT, SolPayoutAdviceDocument, SolSubscriptionInvoiceDocument],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <sol-sheet [title]="invoice() ? 'Facture d’abonnement' : 'Avis de versement'" [subtitle]="sheets.context().row ?? ''" [width]="760">
      <div class="docbox">
        <div class="dpage">
          @if (invoice()) {
            <sol-subscription-invoice-document [data]="samples.invoice" />
          } @else {
            <sol-payout-advice-document [data]="samples.payoutAdvice" />
          }
        </div>
      </div>
      <ng-container sheet-actions>
        <button type="button" class="btn btn-s" (click)="sheets.open('share')"><sol-icon name="send" />Partager</button>
        <button type="button" class="btn btn-p" (click)="sheets.finish((invoice() ? 'Facture' : 'Avis de versement') + ' téléchargé', (sheets.context().row ?? '') + '.pdf')">
          <sol-icon name="down" />Télécharger le PDF
        </button>
      </ng-container>
    </sol-sheet>
  `,
})
export class AdminDocumentSheet {
  protected readonly sheets = inject(SheetService);
  protected readonly samples = { invoice: SAMPLE_INVOICE, payoutAdvice: SAMPLE_PAYOUT_ADVICE };
  protected readonly invoice = computed(() => this.sheets.context().doc === 'invoice');
}

/** Sends a document to the manager's contact. */
@Component({
  selector: 'app-admin-share-sheet',
  imports: [SHEET_KIT],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <sol-sheet title="Partager le document" subtitle="Envoyé avec un lien sécurisé valable 30 jours.">
      <sol-sheet-choices label="Envoyer par" selected="E-mail"
                         [options]="[{ label: 'E-mail', icon: 'mail' }, { label: 'WhatsApp', icon: 'msg' }, { label: 'SMS', icon: 'phone' }]" />
      <sol-sheet-grid>
        <sol-sheet-field label="Destinataire" value="contact@teranga-gestion.sn" />
        <sol-sheet-field label="Copie à" value="Babacar Diouf" />
      </sol-sheet-grid>
      <sol-sheet-textarea label="Message" value="Bonjour, vous trouverez ci-joint le document demandé. Cordialement, l’équipe Solimus." />
      <ng-container sheet-actions>
        <button type="button" class="btn btn-s" (click)="sheets.close()">Annuler</button>
        <button type="button" class="btn btn-p" (click)="sheets.finish('Document envoyé', 'à contact@teranga-gestion.sn · lien valable 30 jours')">
          <sol-icon name="send" />Envoyer
        </button>
      </ng-container>
    </sol-sheet>
  `,
})
export class AdminShareSheet {
  protected readonly sheets = inject(SheetService);
}

/** Per-manager exception to the plan limits. */
@Component({
  selector: 'app-limits-sheet',
  imports: [SHEET_KIT],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let item = manager();
    <sol-sheet title="Ajuster les limites" [subtitle]="item.name + ' · formule ' + planName()">
      <sol-sheet-grid>
        <sol-sheet-field label="Propriétaires" value="25" suffix="au lieu de 20" />
        <sol-sheet-field label="Biens" value="100" suffix="inchangé" />
        <sol-sheet-field label="Utilisateurs" value="6" suffix="au lieu de 5" />
        <sol-sheet-field label="Stockage" value="20" suffix="Go" />
        <sol-sheet-field label="Valable jusqu’au" value="31/12/2026" />
        <sol-sheet-field label="Motif" value="Geste commercial" [select]="true" />
      </sol-sheet-grid>
      <p class="hint" style="margin:0">Dérogation propre à ce gestionnaire ; la formule {{ planName() }} n’est pas modifiée.</p>
      <ng-container sheet-actions>
        <button type="button" class="btn btn-s" (click)="sheets.close()">Annuler</button>
        <button type="button" class="btn btn-p" (click)="sheets.finish('Limites ajustées jusqu’au 31/12/2026', '25 propriétaires · 6 utilisateurs · inscrit au journal')">
          <sol-icon name="check" />Appliquer
        </button>
      </ng-container>
    </sol-sheet>
  `,
})
export class LimitsSheet {
  protected readonly sheets = inject(SheetService);
  protected readonly manager = computed(() => managerFor(this.sheets.context().row));
  protected readonly planName = computed(() => PLANS.find((plan) => plan.id === this.manager().planId)?.name ?? '');
}

/** Suspends a manager: read-only workspace, tenants can still pay (RG-30). */
@Component({
  selector: 'app-suspend-sheet',
  imports: [SHEET_KIT],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let item = manager();
    <sol-sheet [title]="'Suspendre ' + item.name">
      <sol-sheet-choices label="Motif" selected="Demande du gestionnaire"
                         [options]="[{ label: 'Abonnement impayé' }, { label: 'Demande du gestionnaire' }, { label: 'Non-respect des conditions' }]" />
      <sol-sheet-checklist [items]="consequences()" />
      <sol-sheet-textarea label="Note interne" [value]="'Demande écrite de ' + item.contactName + ' du 15/10 : pause d’activité de deux semaines.'" />
      <ng-container sheet-actions>
        <button type="button" class="btn btn-s" (click)="sheets.close()">Annuler</button>
        <button type="button" class="btn btn-d"
                (click)="sheets.finish('Accès suspendu', item.name + ' est en lecture seule · réactivation possible à tout moment')">
          <sol-icon name="pause" />Suspendre l’accès
        </button>
      </ng-container>
    </sol-sheet>
  `,
})
export class SuspendSheet {
  protected readonly sheets = inject(SheetService);
  protected readonly manager = computed(() => managerFor(this.sheets.context().row));
  protected readonly consequences = computed(() => [
    `Espace web en lecture seule pour les ${this.manager().usage.users} utilisateurs`,
    'Les locataires peuvent toujours payer',
    'Les versements dus restent possibles',
    'Le gestionnaire est notifié par e-mail et SMS',
  ]);
}

/** Edits the manager's identity, payout mode and billing cycle. */
@Component({
  selector: 'app-edit-manager-sheet',
  imports: [SHEET_KIT],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let item = manager();
    <sol-sheet [title]="'Modifier ' + item.name">
      <sol-sheet-grid>
        <sol-sheet-field label="Raison sociale" [value]="item.name" />
        <sol-sheet-field label="Contact principal" [value]="item.contactName" />
        <sol-sheet-field label="Téléphone" [value]="item.phone" />
        <sol-sheet-field label="E-mail" [value]="item.email" />
      </sol-sheet-grid>
      <sol-sheet-choices label="Mode de versement" [selected]="mode()"
                         [options]="[{ label: 'Automatique', hint: 'Chaque jour à 06:00', icon: 'refresh' }, { label: 'Sur demande', hint: 'Demandes depuis Finances', icon: 'inbox' }]" />
      <sol-sheet-toggle label="Facturation annuelle" [checked]="item.cycle === 'yearly'"
                        hint="Dix mois payés pour douze · renouvellement à la date anniversaire" />
      <ng-container sheet-actions>
        <button type="button" class="btn btn-s" (click)="sheets.close()">Annuler</button>
        <button type="button" class="btn btn-p" (click)="sheets.finish('Fiche mise à jour', item.name)"><sol-icon name="check" />Enregistrer</button>
      </ng-container>
    </sol-sheet>
  `,
})
export class EditManagerSheet {
  protected readonly sheets = inject(SheetService);
  protected readonly manager = computed(() => managerFor(this.sheets.context().row));
  protected readonly mode = computed(() => PAYOUT_MODE[this.manager().payoutMode]);
}

/** Changes the plan of one manager. */
@Component({
  selector: 'app-change-plan-sheet',
  imports: [SHEET_KIT],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let item = manager();
    <sol-sheet title="Changer de formule" [subtitle]="item.name + ' · formule actuelle : ' + currentName()" [width]="760">
      <div class="plancmp">
        @for (plan of plans; track plan.id) {
          <div class="pc2" [class.cur]="plan.id === item.planId">
            <b>{{ plan.name }}</b>
            <div style="font-size:20px;font-weight:600">{{ amount(plan.yearlyExclTax) }} <small class="hint">FCFA HT / an</small></div>
            <span class="hint">ou {{ amount(plan.monthlyExclTax) }} FCFA HT / mois</span>
            <ul>
              <li>{{ plan.limits.owners }} propriétaires</li>
              <li>{{ plan.limits.properties }} biens</li>
              <li>{{ plan.limits.users }} utilisateurs</li>
              <li>{{ plan.limits.storageGb }} Go</li>
            </ul>
            @if (plan.id === item.planId) {
              <span class="pill p-n nod" style="justify-self:start">Formule actuelle</span>
            } @else {
              <button type="button" class="btn btn-s btn-sm"
                      (click)="sheets.finish('Formule ' + plan.name + ' appliquée', item.name + ' · montant calculé au prorata · inscrit au journal')">
                Choisir {{ plan.name }}
              </button>
            }
          </div>
        }
      </div>
      <p class="hint" style="margin:0">Une baisse de limite ne supprime aucune donnée. Aucune commission sur les loyers.</p>
      <ng-container sheet-actions>
        <button type="button" class="btn btn-s" (click)="sheets.close()">Fermer</button>
      </ng-container>
    </sol-sheet>
  `,
})
export class ChangePlanSheet {
  protected readonly sheets = inject(SheetService);
  protected readonly plans = PLANS;
  protected readonly manager = computed(() => managerFor(this.sheets.context().row));
  protected readonly currentName = computed(() => PLANS.find((plan) => plan.id === this.manager().planId)?.name ?? '');

  protected amount(value: number): string {
    return formatAmount(value);
  }
}

/** Confirmation before saving a plan that managers are subscribed to. */
@Component({
  selector: 'app-plan-save-sheet',
  imports: [SHEET_KIT],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <sol-sheet [title]="'Enregistrer la formule ' + name()">
      <div class="calc">
        <div><span>Stockage</span><span>15 Go → 20 Go</span></div>
        <div><span>Prix annuel</span><span>inchangé</span></div>
        <div><span>Gestionnaires concernés</span><span>{{ subscribers() }}</span></div>
      </div>
      <p class="hint" style="margin:0">
        Effet immédiat pour les gestionnaires concernés. Les prix modifiés s’appliquent au prochain renouvellement.
      </p>
      <ng-container sheet-actions>
        <button type="button" class="btn btn-s" (click)="sheets.close()">Annuler</button>
        <button type="button" class="btn btn-p"
                (click)="sheets.finish('Formule ' + name() + ' enregistrée', subscribers() + ' gestionnaires notifiés · inscrit au journal')">
          <sol-icon name="check" />Enregistrer
        </button>
      </ng-container>
    </sol-sheet>
  `,
})
export class PlanSaveSheet {
  protected readonly sheets = inject(SheetService);
  protected readonly name = computed(() => this.sheets.context().row ?? 'Pro');
  protected readonly subscribers = computed(() => {
    const plan = PLANS.find((item) => item.name === this.name());
    return MANAGERS.filter((manager) => manager.planId === plan?.id).length;
  });
}
