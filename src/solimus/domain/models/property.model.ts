import { Amount, IsoDate } from './common.model';

export type PropertyKind = 'apartment' | 'villa' | 'studio' | 'shop' | 'office';

/** Lifecycle of a property inside the portfolio. */
export type PropertyStatus = 'available' | 'reserved' | 'rented' | 'notice';

export type PropertyUse = 'residential' | 'professional' | 'commercial';

export interface PropertyMeters {
  readonly electricity: string;
  readonly water: string;
}

export interface Property {
  /** Agency wide reference, `B-NNN`. */
  readonly ref: string;
  readonly kind: PropertyKind;
  readonly use: PropertyUse;
  readonly status: PropertyStatus;
  readonly title: string;
  readonly building: string;
  readonly district: string;
  readonly city: string;
  readonly addressLine?: string;
  readonly surface: number;
  readonly rooms: number;
  readonly bedrooms: number;
  readonly bathrooms?: number;
  readonly furnished: boolean;
  readonly builtIn?: string;
  readonly floorLabel?: string;
  readonly amenities: readonly string[];
  readonly meters?: PropertyMeters;
  readonly rent: Amount;
  readonly charges: Amount;
  readonly deposit?: Amount;
  /** Day of the month the rent falls due. */
  readonly dueDay: number;
  readonly description: string;
  readonly ownerId: string;
  readonly leaseId?: string;
  readonly tenantId?: string;
  readonly listedOn?: IsoDate;
  readonly virtualTour?: { readonly published: boolean; readonly views: number };
  readonly photoCount: number;
  /** Index into the shared photo set, so the mock imagery stays stable per property. */
  readonly photoSeed: number;
}
