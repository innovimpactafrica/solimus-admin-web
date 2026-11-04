import { Injectable, signal } from '@angular/core';

export interface Crumb {
  readonly label: string;
  readonly link?: readonly string[];
}

/**
 * Breadcrumb shown in the top bar. Each feature screen publishes its own trail
 * on init, which keeps the shell free of route-to-label mappings.
 */
@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private readonly trail = signal<readonly Crumb[]>([]);
  readonly crumbs = this.trail.asReadonly();

  set(...crumbs: Crumb[]): void {
    this.trail.set(crumbs);
  }
}
