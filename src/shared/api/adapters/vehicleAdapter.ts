/**
 * 차량 API 응답 ↔ 프론트 엔티티 변환
 * CarivDealer_api_v1.md §3.2, Status_Enum_Conflict_Report.md
 * 흐름: [API (_SNAKE) → Mapper → Zod → UI (camelCase)]
 */

import { mapApiVehicleStatusToFrontend } from './statusMappers';
import { Timestamp } from '@/shared/lib/timestamp';

/** API 차량 목록 항목 (문서 §3.2 items) */
export interface ApiVehicleItem {
  vehicleId: number;
  vehicleNo?: string;
  modelName?: string;
  modelYear?: number;
  mileageKm?: number;
  status?: string;
  displayStatus?: string;
  latestInspectionStatus?: string;
  canEdit?: boolean;
  primaryCta?: string;
  [key: string]: unknown;
}

/** Mock/프론트 차량 형식 (vehicleSchema 입력) */
export interface VehicleParseInput {
  id: string;
  status: string;
  plateNumber: string;
  vin?: string;
  manufacturer: string;
  modelName: string;
  modelYear: string;
  mileage: string;
  [key: string]: unknown;
}

/**
 * API 차량 항목 → Zod parse 입력 형식
 * status는 vehicleStatusSchema transform에서 mapApiVehicleStatusToFrontend 적용됨.
 * API 응답에 없는 필드(createdAt 등)는 기본값으로 채움.
 */
export function fromApiVehicleItem(raw: ApiVehicleItem): VehicleParseInput & { createdAt: unknown; updatedAt: unknown } {
  const status = mapApiVehicleStatusToFrontend(raw.status ?? '');
  const now = Timestamp.now();
  return {
    id: String(raw.vehicleId ?? raw.id ?? ''),
    status,
    plateNumber: String(raw.vehicleNo ?? raw.plateNumber ?? ''),
    vin: raw.vin ? String(raw.vin) : undefined,
    manufacturer: String(raw.brand ?? raw.manufacturer ?? ''),
    modelName: String(raw.modelName ?? ''),
    modelYear: String(raw.modelYear ?? ''),
    mileage: String(raw.mileageKm ?? raw.mileage ?? '0'),
    createdAt: (raw as { createdAt?: unknown }).createdAt ?? now,
    updatedAt: (raw as { updatedAt?: unknown }).updatedAt ?? now,
  };
}

/**
 * API 차량 목록 → parse 가능한 배열
 */
export function fromApiVehicleList(raw: { items?: ApiVehicleItem[] }): VehicleParseInput[] {
  const items = raw?.items ?? [];
  return items.map(fromApiVehicleItem);
}
