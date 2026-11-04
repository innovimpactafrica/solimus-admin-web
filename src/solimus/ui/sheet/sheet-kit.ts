import { SolIcon } from '../components/icon';
import { SolAvatar } from '../components/avatar';
import { SolPill } from '../components/pill';
import { SolSheet } from './sheet';
import {
  SolSheetChecklist, SolSheetChips, SolSheetChoices, SolSheetFacts, SolSheetField, SolSheetFiles,
  SolSheetGrid, SolSheetHistory, SolSheetMessage, SolSheetTextarea, SolSheetToggle,
} from './sheet-fields';

/** Everything a sheet template uses, imported in one go by each sheet component. */
export const SHEET_KIT = [
  SolIcon, SolAvatar, SolPill, SolSheet,
  SolSheetChecklist, SolSheetChips, SolSheetChoices, SolSheetFacts, SolSheetField, SolSheetFiles,
  SolSheetGrid, SolSheetHistory, SolSheetMessage, SolSheetTextarea, SolSheetToggle,
] as const;
