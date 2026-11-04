import { Provider } from '@angular/core';
import {
  CONDITION_REPORT_REPOSITORY, DOCUMENT_REPOSITORY, FINANCE_REPOSITORY, INCIDENT_REPOSITORY,
  LEASE_REPOSITORY, OWNER_REPOSITORY, PLATFORM_REPOSITORY, PROPERTY_REPOSITORY,
  RENT_REPOSITORY, TENANT_REPOSITORY,
} from '../../domain/ports/repositories';
import {
  MockConditionReportRepository, MockDocumentRepository, MockFinanceRepository, MockIncidentRepository,
  MockLeaseRepository, MockOwnerRepository, MockPlatformRepository, MockPropertyRepository,
  MockRentRepository, MockTenantRepository,
} from './mock-repositories';

/**
 * Binds every domain port to its mock implementation.
 * Swap these providers for HTTP ones when the API is available; no screen changes.
 */
export function provideMockData(): Provider[] {
  return [
    { provide: PROPERTY_REPOSITORY, useClass: MockPropertyRepository },
    { provide: OWNER_REPOSITORY, useClass: MockOwnerRepository },
    { provide: TENANT_REPOSITORY, useClass: MockTenantRepository },
    { provide: LEASE_REPOSITORY, useClass: MockLeaseRepository },
    { provide: CONDITION_REPORT_REPOSITORY, useClass: MockConditionReportRepository },
    { provide: RENT_REPOSITORY, useClass: MockRentRepository },
    { provide: INCIDENT_REPOSITORY, useClass: MockIncidentRepository },
    { provide: FINANCE_REPOSITORY, useClass: MockFinanceRepository },
    { provide: DOCUMENT_REPOSITORY, useClass: MockDocumentRepository },
    { provide: PLATFORM_REPOSITORY, useClass: MockPlatformRepository },
  ];
}
