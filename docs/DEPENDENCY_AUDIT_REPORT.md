# CarivDealer 의존성 점검 보고서

**검증 일시**: 2026-02-13  
**프로젝트**: CarivDealer (CARIV) — 중고차 딜러 플랫폼

---

## 1. npm audit 결과

| 구분 | 결과 |
|------|------|
| **취약점** | 0개 (found 0 vulnerabilities) |
| **심각도** | 없음 |

> 프로덕션 의존성 기준으로 알려진 보안 취약점 없음.

---

## 2. npm outdated 결과 (구버전 패키지)

| 패키지 | Current | Wanted | Latest | 비고 |
|--------|---------|--------|--------|------|
| @eslint/js | 9.39.2 | 9.39.2 | 10.0.1 | 마이너 업데이트 |
| @types/node | 22.19.11 | 22.19.11 | 25.2.3 | 메이저 업데이트 |
| @vitest/coverage-v8 | 3.2.4 | 3.2.4 | 4.0.18 | 메이저 업데이트 |
| eslint | 9.39.2 | 9.39.2 | 10.0.0 | 마이너 업데이트 |
| jsdom | 27.4.0 | 27.4.0 | 28.0.0 | 메이저 업데이트 |
| lucide-react | 0.562.0 | 0.562.0 | 0.563.0 | 패치 |
| tailwindcss | 3.4.19 | 3.4.19 | 4.1.18 | 메이저 업데이트 |
| typescript | 5.8.3 | 5.8.3 | 5.9.3 | 마이너 업데이트 |
| vite | 6.4.1 | 6.4.1 | 7.3.1 | 메이저 업데이트 |
| vitest | 3.2.4 | 3.2.4 | 4.0.18 | 메이저 업데이트 |
| zod | 3.25.76 | 3.25.76 | 4.3.6 | 메이저 업데이트 |

---

## 3. package.json 의존성 검토

### dependencies (필수 패키지)

| 패키지 | 버전 | 용도 | 누락 여부 |
|--------|------|------|-----------|
| react | ^19.2.3 | UI | ✓ |
| react-dom | ^19.2.3 | UI | ✓ |
| react-router-dom | ^7.13.0 | 라우팅 | ✓ |
| @tanstack/react-query | ^5.62.0 | 서버 상태 | ✓ |
| @tanstack/react-query-devtools | ^5.91.2 | 개발 도구 | ✓ |
| @tanstack/react-query-persist-client | ^5.90.22 | 캐시 영속화 | ✓ |
| @tanstack/query-sync-storage-persister | ^5.90.22 | 스토리지 동기화 | ✓ |
| zustand | ^5.0.3 | 클라이언트 상태 | ✓ |
| zod | ^3.24.1 | 스키마 검증 | ✓ |
| lucide-react | ^0.562.0 | 아이콘 | ✓ |

**누락 패키지**: 없음

### devDependencies

| 패키지 | 용도 | 누락 여부 |
|--------|------|-----------|
| typescript | 타입 체크 | ✓ |
| vite | 빌드 | ✓ |
| @vitejs/plugin-react | React 플러그인 | ✓ |
| vitest | 테스트 | ✓ |
| @vitest/coverage-v8 | 커버리지 | ✓ |
| @testing-library/react | 컴포넌트 테스트 | ✓ |
| @testing-library/jest-dom | DOM 매처 | ✓ |
| @testing-library/user-event | 사용자 이벤트 | ✓ |
| eslint | 린트 | ✓ |
| playwright | E2E | ✓ |
| tailwindcss, postcss, autoprefixer | 스타일 | ✓ |

**누락 패키지**: 없음

---

## 4. 권장 사항

### 업데이트 시 고려사항

- **메이저 업데이트** (tailwindcss 4.x, vite 7.x, vitest 4.x, zod 4.x 등): breaking change 가능성 있음. 별도 브랜치에서 검증 후 적용 권장.
- **마이너/패치 업데이트** (lucide-react, typescript 등): 비교적 안전. 필요 시 점진적 업데이트.

### 보안

- 현재 취약점 0개로 안전한 상태 유지.
- 정기적으로 `npm audit` 실행 권장.

---

*최종 업데이트: 2026-02-13*
