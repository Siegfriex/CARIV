/**
 * API 인증 토큰 관리
 * Auth O 엔드포인트 호출 시 Authorization 헤더 주입용.
 * 로그인 API 연동 시 setAccessToken 호출.
 */

let accessToken: string | null = null;

/** 현재 accessToken 반환 */
export function getAccessToken(): string | null {
  return accessToken;
}

/** accessToken 설정 (로그인 성공 시 호출) */
export function setAccessToken(token: string | null): void {
  accessToken = token;
}

/** Authorization 헤더 생성. 토큰 없으면 undefined */
export function getAuthHeader(): { Authorization: string } | Record<string, never> {
  const token = getAccessToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}
