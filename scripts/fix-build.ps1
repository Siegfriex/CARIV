# CarivDealer 빌드 오류 해결 스크립트
# fdir index.mjs 누락 또는 Vite 6 호환성 문제 시 사용

$ErrorActionPreference = "Stop"

Write-Host "CarivDealer 빌드 복구 중..." -ForegroundColor Cyan

# 1. node_modules, package-lock.json 삭제
if (Test-Path "node_modules") {
    Write-Host "node_modules 삭제 중..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
}
if (Test-Path "package-lock.json") {
    Write-Host "package-lock.json 삭제 중..." -ForegroundColor Yellow
    Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
}

# 2. npm install (Vite 5.4.x로 설치됨 - fdir 이슈 없음)
Write-Host "npm install 실행 중..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "npm install 실패. IDE/터미널을 모두 닫고 다시 시도하세요." -ForegroundColor Red
    exit 1
}

# 3. 빌드 테스트
Write-Host "빌드 테스트..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "빌드 성공!" -ForegroundColor Green
} else {
    Write-Host "빌드 실패. 에러 메시지를 확인하세요." -ForegroundColor Red
    exit 1
}
