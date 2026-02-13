/**
 * API/ERD Enum ↔ 프론트엔드 상태 변환
 * CarivDealer_API_ERD_Mapping.md, Status_Enum_Conflict_Report.md §4 기준
 */

/** API/ERD vehicle.status (등록·노출) */
export type ApiVehicleStatus = 'DRAFT' | 'LISTABLE' | 'HIDDEN' | 'DELETED';

/** 프론트 vehicle.status (거래 라이프사이클) */
export type FrontendVehicleStatus =
  | 'draft'
  | 'inspection'
  | 'bidding'
  | 'active_sale'
  | 'sold'
  | 'pending_settlement'
  | 'completed';

/** API/ERD inspection.status */
export type ApiInspectionStatus =
  | 'REQUESTED'
  | 'MATCHING_IN_PROGRESS'
  | 'MATCHING_COMPLETED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELED'
  | 'DRAFT';

/** 프론트 inspection.status */
export type FrontendInspectionStatus =
  | 'pending'
  | 'assigned'
  | 'in_progress'
  | 'completed'
  | 'canceled'
  | 'draft';

/** API vehicle.status → 프론트 (목록/상세 응답) */
export function mapApiVehicleStatusToFrontend(
  apiStatus: ApiVehicleStatus | string
): FrontendVehicleStatus {
  const mapping: Record<string, FrontendVehicleStatus> = {
    DRAFT: 'draft',
    LISTABLE: 'inspection',
    HIDDEN: 'active_sale',
    DELETED: 'completed',
  };
  return mapping[String(apiStatus).toUpperCase()] ?? 'draft';
}

/** 프론트 vehicle.status → API (저장/수정 요청) */
export function mapFrontendVehicleStatusToApi(
  status: FrontendVehicleStatus
): ApiVehicleStatus {
  const mapping: Record<FrontendVehicleStatus, ApiVehicleStatus> = {
    draft: 'DRAFT',
    inspection: 'LISTABLE',
    bidding: 'LISTABLE',
    active_sale: 'LISTABLE',
    sold: 'LISTABLE',
    pending_settlement: 'LISTABLE',
    completed: 'LISTABLE',
  };
  return mapping[status] ?? 'DRAFT';
}

/** API inspection.status → 프론트 */
export function mapApiInspectionStatusToFrontend(
  apiStatus: ApiInspectionStatus | string
): FrontendInspectionStatus {
  const mapping: Record<string, FrontendInspectionStatus> = {
    REQUESTED: 'pending',
    MATCHING_IN_PROGRESS: 'pending',
    MATCHING_COMPLETED: 'assigned',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELED: 'canceled',
    DRAFT: 'draft',
  };
  return mapping[String(apiStatus).toUpperCase()] ?? 'pending';
}

/** 프론트 inspection.status → API */
export function mapFrontendInspectionStatusToApi(
  status: FrontendInspectionStatus
): ApiInspectionStatus {
  const mapping: Record<FrontendInspectionStatus, ApiInspectionStatus> = {
    pending: 'REQUESTED',
    assigned: 'MATCHING_COMPLETED',
    in_progress: 'IN_PROGRESS',
    completed: 'COMPLETED',
    canceled: 'CANCELED',
    draft: 'DRAFT',
  };
  return mapping[status] ?? 'REQUESTED';
}
