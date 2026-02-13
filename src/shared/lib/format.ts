/**
 * 포맷팅 유틸리티
 * 금액·날짜·시간 등 UI 표시용
 */

/** 만원 단위 통화 포맷 */
export function formatCurrencyManwon(value: string | number, fallback = '--- 만원'): string {
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  if (Number.isNaN(num) || num < 0) return fallback;
  return `${num.toLocaleString()}만원`;
}

/** 숫자만 포맷 (천단위 콤마) */
export function formatNumber(value: string | number): string {
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  if (Number.isNaN(num)) return '0';
  return num.toLocaleString();
}

/** Timestamp 또는 Date → 시간 문자열 (HH:mm:ss) */
export function formatTime(ts: { toDate?: () => Date } | Date): string {
  const date = ts && typeof (ts as { toDate?: () => Date }).toDate === 'function'
    ? (ts as { toDate: () => Date }).toDate()
    : (ts as Date);
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '--:--:--';
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

/** ISO 날짜 문자열 → 한글 날짜 라벨 */
export function formatDateLabel(isoDate: string): string {
  if (!isoDate) return '';
  const date = new Date(isoDate + 'T12:00:00');
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** ISO 날짜 문자열 → 한글 날짜 라벨 (요일 포함, 예: "2026년 1월 25일 일요일") */
export function formatDateLabelWithWeekday(isoDate: string): string {
  if (!isoDate) return '';
  const date = new Date(isoDate + 'T12:00:00');
  if (Number.isNaN(date.getTime())) return isoDate;
  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const base = date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  return `${base} ${weekdays[date.getDay()]}`;
}

/** 시간 슬롯 문자열(HH:mm) → "오전 09:00" / "오후 12:00" 형식 */
export function formatTimeSlotLabel(time: string): string {
  if (!time) return '';
  const [h] = time.split(':').map(Number);
  if (h < 12) return `오전 ${time}`;
  if (h === 12) return `오후 12:00`;
  return `오후 ${String(h - 12).padStart(2, '0')}:00`;
}

/** 주행거리(km) → "N.N만 km" (만 km 단위, 소수 1자리) */
export function formatMileageManKm(value: string | number, fallback = '--- 만 km'): string {
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  if (Number.isNaN(num) || num < 0) return fallback;
  return `${(num / 10000).toFixed(1)}만 km`;
}
