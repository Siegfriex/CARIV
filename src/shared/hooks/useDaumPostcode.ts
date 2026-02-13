/**
 * Daum(Kakao) 우편번호 검색 API 연동
 * placeId/lat/lng는 Geocoding API로 별도 확보
 * @see https://postcode.map.daum.net/guide
 */

const DAUM_POSTCODE_SCRIPT = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

export interface DaumPostcodeData {
  zonecode: string;
  address: string;
  roadAddress: string;
  jibunAddress: string;
  buildingName: string;
  addressEnglish?: string;
}

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: { oncomplete: (data: DaumPostcodeData) => void }) => { open: () => void };
    };
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Daum 우편번호 검색 팝업 열기
 * @param onComplete - 선택 완료 시 zonecode, address 등 전달
 */
export async function openDaumPostcode(
  onComplete: (data: { zonecode: string; address: string; addressDetail?: string }) => void
): Promise<void> {
  await loadScript(DAUM_POSTCODE_SCRIPT);
  const daum = window.daum;
  if (!daum?.Postcode) {
    throw new Error('Daum Postcode API를 불러올 수 없습니다.');
  }
  new daum.Postcode({
    oncomplete: (data: DaumPostcodeData) => {
      const address = data.roadAddress || data.jibunAddress || data.address;
      const addressDetail = data.buildingName ? ` (${data.buildingName})` : '';
      onComplete({
        zonecode: data.zonecode,
        address,
        addressDetail: addressDetail.trim() || undefined,
      });
    },
  }).open();
}
