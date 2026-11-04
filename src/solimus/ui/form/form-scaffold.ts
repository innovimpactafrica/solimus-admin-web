import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SolIcon } from '../components/icon';
import { SolPhoto } from '../components/photo.directive';
import { SolToggle } from '../components/toggle';
import { ToastService } from '../services/toast.service';
import { usageLevel } from '../../domain/rules/subscription.rules';
import { FormAside, FormChip, FormChoice, FormSection } from './form-config';

/**
 * Renders the multi-section forms of the workspace from a declarative
 * configuration, so every form shares the same layout, step list and side panel.
 */
@Component({
  selector: 'app-form-scaffold',
  imports: [RouterLink, SolIcon, SolToggle, SolPhoto],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-scaffold.html',
  styles: `:host { display: block; }`,
})
export class FormScaffold {
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly sections = input.required<readonly FormSection[]>();
  readonly aside = input<FormAside>({});
  readonly submitLabel = input('Enregistrer');
  readonly cancelLink = input<readonly string[]>(['/tableau-de-bord']);
  readonly successMessage = input('Enregistré');
  readonly successLink = input<readonly string[] | null>(null);

  protected readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly draftSaved = signal(false);

  /** Choices and chips selected in this session, keyed by section title. */
  private readonly choices = signal<Record<string, string>>({});
  private readonly chips = signal<Record<string, Set<string>>>({});

  protected readonly limitRatio = computed(() => {
    const { limitUsed = 0, limitMax = 0 } = this.aside();
    return limitMax ? Math.min(1, limitUsed / limitMax) : 0;
  });

  protected readonly limitLevel = computed(() => {
    const { limitUsed = 0, limitMax = 0 } = this.aside();
    return usageLevel(limitUsed, limitMax);
  });

  protected columns(section: FormSection): string {
    return `repeat(${section.columns ?? 2}, minmax(0, 1fr))`;
  }

  protected choiceColumns(section: FormSection): string {
    return `repeat(${section.choiceColumns ?? section.choices?.length ?? 2}, minmax(0, 1fr))`;
  }

  protected isChosen(sectionTitle: string, choice: FormChoice): boolean {
    const chosen = this.choices()[sectionTitle];
    return chosen ? chosen === choice.label : (choice.selected ?? false);
  }

  protected choose(sectionTitle: string, label: string): void {
    this.choices.update((map) => ({ ...map, [sectionTitle]: label }));
  }

  protected isChipOn(sectionTitle: string, chip: FormChip): boolean {
    const set = this.chips()[sectionTitle];
    return set ? set.has(chip.label) : (chip.selected ?? false);
  }

  protected toggleChip(sectionTitle: string, chip: FormChip): void {
    this.chips.update((map) => {
      const current = new Set(map[sectionTitle] ?? this.initialChips(sectionTitle));
      current.has(chip.label) ? current.delete(chip.label) : current.add(chip.label);
      return { ...map, [sectionTitle]: current };
    });
  }

  private initialChips(sectionTitle: string): readonly string[] {
    const section = this.sections().find((item) => item.title === sectionTitle);
    return (section?.chips ?? []).filter((chip) => chip.selected).map((chip) => chip.label);
  }

  protected range(count: number): readonly number[] {
    return Array.from({ length: count }, (_, index) => index);
  }

  protected saveDraft(): void {
    this.draftSaved.set(true);
    this.toast.show('Brouillon enregistré');
  }

  protected submit(): void {
    this.toast.show(this.successMessage());
    const link = this.successLink() ?? this.cancelLink();
    void this.router.navigate([...link]);
  }
}
