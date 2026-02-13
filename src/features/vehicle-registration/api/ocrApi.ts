/**
 * OCR 등록원부 API
 * 차량번호 → 등록원부 정보 추출 (vehicle-registration 전용)
 */

import { apiClient } from '@/shared/api/client';
import { API_ENDPOINTS } from '@/shared/config/apiEndpoints';

/** OCR 등록원부 처리 응답 (VIN·제조사·모델·연식·주행거리) */
export interface OcrResponse {
  vin: string;
  manufacturer: string;
  model: string;
  year: string;
  mileage: string;
}

/**
 * OCR 등록원부 처리 (차량번호 → 등록원부 정보 추출)
 * 문서 §3: POST /vehicles/ocr/parse, body: { vehicleNo, fileId? }
 * @param vehicleNo - 차량번호 (문서 vehicleNo)
 * @param fileId - 업로드된 파일 ID (2단계 플로우 시, 선택)
 * @returns OcrResponse
 */
export const ocrRegistration = async (
  vehicleNo: string,
  fileId?: number
): Promise<OcrResponse> => {
  const body: { vehicleNo: string; fileId?: number } = { vehicleNo };
  if (fileId != null) body.fileId = fileId;
  const raw = await apiClient.post<
    | { ok: boolean; result?: { extracted?: Record<string, unknown> }; message?: string | null }
    | OcrResponse
  >(API_ENDPOINTS.VEHICLE.OCR_PARSE, body);

  const extracted = (raw as { result?: { extracted?: Record<string, unknown> } })?.result?.extracted;
  if (extracted) {
    return {
      vin: String(extracted.vin ?? ''),
      manufacturer: String(extracted.manufacturer ?? extracted.brand ?? ''),
      model: String(extracted.model ?? extracted.modelName ?? ''),
      year: String(extracted.year ?? extracted.modelYear ?? ''),
      mileage: String(extracted.mileage ?? extracted.mileageKm ?? ''),
    };
  }
  return raw as OcrResponse;
};
