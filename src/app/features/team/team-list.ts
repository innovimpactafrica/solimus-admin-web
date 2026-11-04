import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbService, SolAvatar, SolIcon, SolPill } from '@solimus/ui';
import { SOLIMUS_TEAM, TEAM_PERMISSIONS } from '@solimus/mocks';

type Permission = (typeof TEAM_PERMISSIONS)[number];

@Component({
  selector: 'app-team-list',
  imports: [RouterLink, SolIcon, SolPill, SolAvatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './team-list.html',
})
export default class TeamList implements OnInit {
  private readonly breadcrumbs = inject(BreadcrumbService);

  protected readonly team = SOLIMUS_TEAM;
  protected readonly permissions = TEAM_PERMISSIONS;

  ngOnInit(): void {
    this.breadcrumbs.set({ label: 'Équipe Solimus' });
  }

  protected cells(row: Permission): readonly boolean[] {
    return [row.superAdmin, row.finance, row.support, row.readOnly];
  }
}
