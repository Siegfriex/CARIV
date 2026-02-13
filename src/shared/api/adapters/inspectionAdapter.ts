/**
 * 검차 신청 API DTO ↔ 프론트 폼 변환
 * CarivDealer_api_v1.md §3.1, Request_Body_Mismatch_Report.md §3.1 기준
 */

/** API 요청 바디 (문서 §3.1) */
export interface InspectionRequestApiBody {
  inspectionPlace: {
    placeId: string;
    placeName: string;
    address: string;
    lat: number;
    lng: number;
  };
  schedule: {
    requestDate: string; // ISO datetime "2026-02-01T00:00:00"
  };
  payment: {
    method: 'AUTO';
    provider: 'CARD';
    autoPayAgree: boolean;
  };
  memo?: string;
}

/** 프론트 검차 신청 폼 (Step1 등) */
export interface InspectionRequestFormInput {
  vehicleId: string;
  preferredDate: string;
  preferredTime: string;
  zipCode?: string;
  address: string;
  addressDetail?: string;
  placeId?: string;
  placeName?: string;
  lat?: number;
  lng?: number;
  memo?: string;
  paymentMethod?: 'AUTO';
  paymentProvider?: 'CARD';
  autoPayAgree?: boolean;
}

/** API 응답 (문서 §3) */
export interface InspectionRequestApiResponse {
  ok: boolean;
  result: { inspectionId: number; vehicleId: number; status: string };
  message: string | null;
}

/** 프론트 검차 신청 응답 (호환용) */
export interface InspectionRequestFrontendResponse {
  success: boolean;
  inspectionId: string;
  message: string;
}

/** API 응답 → 프론트 변환 */
export function fromInspectionRequestApiResponse(
  res: InspectionRequestApiResponse
): InspectionRequestFrontendResponse {
  return {
    success: res.ok,
    inspectionId: String(res.result?.inspectionId ?? ''),
    message: res.message ?? '검차 신청이 완료되었습니다.',
  };
}

/** 폼 → API 바디 변환 */
export function toInspectionRequestApiBody(
  form: InspectionRequestFormInput
): InspectionRequestApiBody {
  const requestDate = `${form.preferredDate}T${form.preferredTime}:00`;
  const address = [form.address, form.addressDetail].filter(Boolean).join(' ');

  return {
    inspectionPlace: {
      placeId: form.placeId ?? '',
      placeName: form.placeName ?? form.address ?? '',
      address: address || form.address,
      lat: form.lat ?? 0,
      lng: form.lng ?? 0,
    },
    schedule: {
      requestDate,
    },
    payment: {
      method: form.paymentMethod ?? 'AUTO',
      provider: form.paymentProvider ?? 'CARD',
      autoPayAgree: form.autoPayAgree ?? true,
    },
    memo: form.memo,
  };
}
