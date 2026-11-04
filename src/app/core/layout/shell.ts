import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreadcrumbService, SolAvatar, SolIcon, SolToast } from '@solimus/ui';
import { SOLIMUS_TEAM } from '@solimus/mocks';
import { NAVIGATION } from '../navigation';

/**
 * Shell of the Solimus administration. Same components as the manager
 * workspace, with the dark primary colour carried by `.theme-admin`.
 */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SolIcon, SolAvatar, SolToast],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shell.html',
  styles: `
    :host { display: block; min-height: 100vh; }
    .s-logout { margin-left: auto; opacity: .7; display: inline-flex; color: inherit; }
    .s-logout:hover { opacity: 1; }
    /* The administration sidebar keeps a wider letter-spacing on the wordmark. */
    .logo span { letter-spacing: .16em; }
  `,
})
export class Shell {
  private readonly router = inject(Router);
  private readonly content = viewChild<ElementRef<HTMLElement>>('content');

  protected readonly navigation = NAVIGATION;
  protected readonly member = SOLIMUS_TEAM[0];
  protected readonly crumbs = inject(BreadcrumbService).crumbs;

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.content()?.nativeElement.scrollTo({ top: 0 }));
  }
}
