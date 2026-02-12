# CarivDealer 프론트엔드 (Vercel)

B2B 중고차 딜러 플랫폼 — React/Vite 기반 프론트엔드.  
FSD(Feature-Sliced Design) 구조. Vercel 배포용, Mock 전용.

---

## 저장소

- **GitHub**: https://github.com/Siegfriex/CARIV.git
- **백엔드 참조**: https://github.com/cariv-dev/saas-front.git

---

## 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 (Vite, port 3000)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 프리뷰
npm run preview
```

---

## 필수 의존성 및 환경 변수

### 1. Node.js
- **권장**: Node.js 20+ (LTS)

### 2. 환경 변수 (`.env.local`)

`.env.example`을 `.env.local`로 복사 후 값 입력:

| 변수 | 필수 | 설명 |
|------|------|------|
| `VITE_API_BASE_URL` | 예 | API 서버 URL (백엔드) |
| `VITE_USE_MOCK_LIST` | 아니오 | `true` 시 차량 목록 Mock 사용 |
| `VITE_RUN_DEV` | 아니오 | `true` 시 런데브 모드 (DevSkip 버튼 등) |

Auth/Storage는 Mock·localStorage 사용. 백엔드 API 연동 전.

---

## 주요 npm 패키지

| 패키지 | 용도 |
|--------|------|
| react, react-dom | UI |
| react-router-dom | 라우팅 |
| @tanstack/react-query | 서버 상태·캐시 |
| zustand | 클라이언트 상태 |
| zod | 스키마 검증 |
| tailwindcss | 스타일 |
| lucide-react | 아이콘 |

---

## 문서 (IA·스펙)

`docs/` 폴더 내 핵심 문서: `CarivDealer_IA.md`, `CarivDealer_UserFlow.md`, `CarivDealer_Storyboard.md` 등.

---

## 배포 (Vercel)

```bash
# 프로덕션 빌드
npm run build

# Vercel 배포 (프리뷰)
vercel deploy

# 프로덕션 배포
vercel deploy --prod
```

- Vercel 연동 시 `vercel.json` 기반 자동 빌드
- **환경 변수**: Vercel 대시보드 → Project Settings → Environment Variables에서 `VITE_*` 변수 설정

---

## 협업

- **협업 가이드**: [docs/PROJECT_COLLABORATION_GUIDE.md](docs/PROJECT_COLLABORATION_GUIDE.md)
- **브랜치 전략**: `main` (배포) / `develop` (개발) / `feature/*` (기능) / `hotfix/*` (긴급 수정)
- 모든 기능은 `feature` 브랜치에서 개발 후 `develop`로 PR Merge

---

## 2026-02-13 작업 요약

- 의존성 점검: `docs/DEPENDENCY_AUDIT_REPORT.md` 생성 (npm audit 0 취약점)
- 협업 가이드: `docs/PROJECT_COLLABORATION_GUIDE.md` 추가
- Vercel 설정: `vercel.json` SPA rewrites 적용
- Git 워크플로우: main/develop/feature 브랜치 전략 확립

---

*최종 업데이트: 2026-02-13*
