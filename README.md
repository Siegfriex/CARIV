# CarivDealer 프로젝트 협업 가이드

**프로젝트**: CarivDealer (CARIV) — 중고차 딜러 플랫폼  
**저장소**: https://github.com/Siegfriex/CARIV.git  
**vercel링크**: https://carivfront.vercel.app?_vercel_share=uAiAkSogG2pAkLp8v1pLyOXe7jw066gz
**vercel_1차도메인**: https://carivfront.vercel.app/

---
## 0. 화면테스트방법
-해당 도메인 접속시, 다음 화면은 미인증 상태임. <img width="2558" height="1296" alt="image" src="https://github.com/user-attachments/assets/c4b986f7-3d2a-4148-8303-58db3e793443" />
-> 따라서-> 플로우 테스트 목적, **인증상태전환**은 다음과 같음.

1. GNB 우상단 로그인 / 회원가입 버튼 클릭
   
3. 다음 모달 팝업에서 **회원가입** 버튼 클릭.  <img width="2559" height="1295" alt="image" src="https://github.com/user-attachments/assets/764f6799-ec23-482c-8b6e-733037e17ba4" />

4. 회원가입탭 - /signup 탭에서, 하단 **로그인**버튼 클릭   <img width="2554" height="1301" alt="image" src="https://github.com/user-attachments/assets/68d6862f-08a3-4379-b188-0524d642ba59" />

5. 다시, 로그인탭 - /login 탭에서 **로그인**버튼 클릭 <img width="2559" height="1288" alt="image" src="https://github.com/user-attachments/assets/1489ffb5-7edb-47aa-978e-8db71fd60554" />

6. 다음 화면 쇼잉시 성공 <img width="1537" height="1266" alt="image" src="https://github.com/user-attachments/assets/4f992aa2-de81-4096-bf58-dc820a1c6b07" />
또는 <img width="1651" height="1279" alt="image" src="https://github.com/user-attachments/assets/e0c3f019-5f80-47f8-97f9-6e1df95589b1" />


## 1. 브랜치 전략

| 브랜치 | 용도 |
|--------|------|
| `main` | 배포용 브랜치, 프로덕션 배포 기준 |
| `develop` | 개발용 브랜치, 기능 통합 전용 |
| `feature/기능명` | 기능 개발용 브랜치 |
| `hotfix/긴급수정` | 배포 후 긴급 수정용 |

**원칙**: 모든 기능은 `feature` 브랜치에서 개발 후 `develop`로 Merge.

---

## 2. 기능 브랜치 작업 흐름

1. **기능 브랜치 생성**  
   예: `feature/login`, `feature/vehicle-register`, `feature/inspection`

2. **개발 후 변경 사항 커밋**

3. **원격 저장소로 Push**

4. **GitHub에서 Pull Request 생성**
   - base: `develop`
   - compare: `feature/기능명`
   - 리뷰어 지정

5. **리뷰 및 승인**
   - 코드·테스트 확인 후 승인

6. **Merge**
   - PR 승인 후 `develop` / `main` Merge
   - 필요 시 feature 브랜치 삭제

---

## 3. PR 책임

| 역할 | 작업 |
|------|------|
| **팀원** | 기능 브랜치에서 개발 → Push → PR 생성 |
| **관리자/팀장** | PR 검토 → 승인 → develop/main Merge |

---

## 4. Pull 기준

- **개발 중**: 항상 `develop` 브랜치 기준 Pull
- **배포/핫픽스 확인 시**: `main` 브랜치 Pull

---

## 5. 커밋 메시지 규칙

**형식**: `[타입](영역): 설명`

| 타입 | 설명 | 예시 |
|------|------|------|
| feat | 새로운 기능 추가 | feat(auth): 로그인 기능 추가 |
| fix | 버그 수정 | fix(payment): 결제 오류 수정 |
| docs | 문서 수정 | docs(readme): 설치 방법 업데이트 |
| style | 코드 스타일 변경 | style: 코드 포맷팅 적용 |
| refactor | 기능 변경 없는 구조 개선 | refactor(user): 회원 관리 코드 개선 |
| test | 테스트 추가/수정 | test: 로그인 기능 테스트 추가 |
| chore | 빌드/환경/패키지 등 기타 변경 | chore: 패키지 버전 업데이트 |

> 커밋 메시지는 항상 명확하게 작성하여 변경 목적이 쉽게 이해되도록 합니다.

---

## 6. 개발 환경

### 필수 도구

| 항목 | 버전/도구 |
|------|-----------|
| Node.js | 18+ 권장 |
| npm | 9+ |
| React | 19.x |
| Vite | 6.x |
| TypeScript | 5.8.x |

### 의존성 설치 및 테스트

```bash
# 의존성 설치
npm install

# 테스트 실행
npm run test

# 타입 체크
npm run type-check

# lint
npm run lint

# 전체 검증 (lint + type-check + test:coverage + build)
npm run validate
```

---

## 7. 이슈 관리

- 이슈 작성 시 **제목, 내용, 우선순위** 필수
- 기능 관련 이슈는 반드시 **기능 브랜치와 연결**
- PR, 이슈, 커밋 등 모든 기록은 **GitHub 기준**

---

## 8. 배포 & 운영

- **배포 프로세스**: `develop` → `main` → 배포
- **긴급 수정 시**: `main`에서 `hotfix/*` 브랜치 사용
- **Vercel 배포**: CarivDealer 웹용 (vercel.json, SPA rewrites 적용)
- **배포 담당자**: (팀장 이름 또는 담당자)

---

## 9. 코드 리뷰

- 코드 품질, 가독성, 테스트 여부 확인
- 친절하고 구체적인 피드백 제공
- 리뷰 승인 후 Merge 가능

---

## 10. 커뮤니케이션

- **팀 내 소통 채널**: Notion / 카카오톡
- **기록**: PR, 이슈, 커밋 등 모두 GitHub 기준

---

*최종 업데이트: 2026-02-13*
