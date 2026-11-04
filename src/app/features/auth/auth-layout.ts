import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Two-column frame shared by the authentication screens: brand panel on
 * the left, the projected form on the right. Shown outside the shell.
 */
@Component({
  selector: 'app-auth-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="auth theme-admin">
      <section class="l">
        <div class="logo-block">
          <b>SOLIMUS</b>
          <span>ADMINISTRATION</span>
        </div>

        <div>
          <h2>Pilotez la plateforme Solimus en toute sécurité.</h2>
          <p>
            Gestionnaires, encaissements, versements et abonnements : supervisez l'activité
            de la plateforme depuis un espace réservé à l'équipe Solimus.
          </p>
        </div>

        <small>© 2026 Solimus · Dakar, Sénégal</small>
      </section>

      <section class="r">
        <ng-content />
      </section>
    </div>
  `,
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
