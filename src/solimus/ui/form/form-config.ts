import { IconName } from '@solimus/ui';

/** One input of a form section. */
export interface FormField {
  readonly label: string;
  readonly value: string;
  readonly kind?: 'text' | 'select' | 'readonly' | 'textarea' | 'locked';
  readonly prefix?: string;
  readonly suffix?: string;
  readonly hint?: string;
  readonly required?: boolean;
  readonly focus?: boolean;
  /** `2` spans the whole row. */
  readonly span?: 1 | 2;
}

export interface FormChoice {
  readonly label: string;
  readonly hint?: string;
  readonly icon?: IconName;
  readonly selected?: boolean;
}

export interface FormChip {
  readonly label: string;
  readonly selected?: boolean;
}

export interface FormToggle {
  readonly label: string;
  readonly hint?: string;
  readonly enabled?: boolean;
}

export interface FormUpload {
  readonly label: string;
  readonly hint?: string;
  /** Photo gallery, or a list of attached files. */
  readonly photos?: number;
  readonly files?: readonly { readonly name: string; readonly meta: string; readonly kind: 'pdf' | 'img' | 'doc' }[];
}

export interface FormSection {
  readonly title: string;
  readonly subtitle?: string;
  readonly columns?: 1 | 2 | 3;
  readonly choiceLabel?: string;
  readonly choiceColumns?: number;
  readonly choices?: readonly FormChoice[];
  readonly fields?: readonly FormField[];
  readonly chipLabel?: string;
  readonly chips?: readonly FormChip[];
  readonly chipHint?: string;
  readonly uploads?: readonly FormUpload[];
  readonly toggles?: readonly FormToggle[];
  readonly note?: { readonly tone: 'al-b' | 'al-g' | 'al-o' | 'al-r'; readonly icon: IconName; readonly title: string; readonly detail: string };
}

export interface FormSummaryLine {
  readonly label: string;
  readonly value: string;
}

export interface FormAside {
  readonly steps?: readonly string[];
  readonly currentStep?: number;
  readonly summaryTitle?: string;
  readonly summary?: readonly FormSummaryLine[];
  readonly summaryNote?: string;
  readonly limitTitle?: string;
  readonly limitLabel?: string;
  readonly limitUsed?: number;
  readonly limitMax?: number;
  readonly limitNote?: string;
}
