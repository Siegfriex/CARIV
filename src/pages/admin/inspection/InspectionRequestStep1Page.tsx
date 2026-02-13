/**
 * InspectionRequestStep1Page Component
 * SSOT: docs/figmaMCP/mcp_outputs/1033-4903 (metadata_raw.txt, design_context_raw.txt)
 * Figma nodeId: 1033:4903 — 검차 신청 Step1 (차량 선택 · 일정 · 장소 · 검차비 결제)
 * 레이아웃: 루트 #f8f9fa, 사이드바 249px, 메인 980px, 제목 28px/44px
 */

import { useNavigate, useSearchParams } from 'react-router-dom';
import { logEventWithHypothesis } from '@/shared/lib/logEvent';
import { LandingHeader } from '@/widgets/Header';
import { ProgressSidebar } from '@/widgets/ProgressSidebar';
import { LAYOUT_CLASSES } from '@/shared/config/layout';
import { getRegisterFlowSteps } from '@/shared/config/registerFlowSteps';
import { Button } from '@/shared/ui/Button';
import { useDevSkip } from '@/shared/context/DevSkipContext';
import { useFormFeedback } from '@/shared/lib/formFeedback';
import { useCallback } from 'react';
import { useInspectionRequestStep1, useInspectionRequest } from '@/features/inspection/request-form';
import {
  InspectionVehicleSelectSection,
  InspectionScheduleSection,
  InspectionLocationSection,
  InspectionPaymentSection,
} from '@/widgets/InspectionRequestStep1';
import { openDaumPostcode } from '@/shared/hooks/useDaumPostcode';
import { geocodeAddress } from '@/shared/hooks/useGeocode';

export const InspectionRequestStep1Page = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { skipRequired } = useDevSkip();
  const { showValidationError } = useFormFeedback();
  const vehicleIdFromUrl = searchParams.get('vehicleId')?.trim() ?? '';
  const vehicleId = vehicleIdFromUrl || (skipRequired ? 'v-1' : '');

  const { mutate: submitInspection, isPending } = useInspectionRequest();
  const {
    form,
    setVehicleSearch,
    setPreferredDate,
    setPreferredTime,
    setZipCode,
    setAddress,
    setAddressDetail,
    setDefaultAddress,
    setPlaceInfo,
  } = useInspectionRequestStep1({
    skipRequired,
    onValidationError: showValidationError,
  });

  const handleFindZipCode = useCallback(() => {
    openDaumPostcode(({ zonecode, address, addressDetail }) => {
      setZipCode(zonecode);
      setAddress(address);
      if (addressDetail) setAddressDetail(addressDetail);
      geocodeAddress(address).then((geo) => {
        if (geo) setPlaceInfo({ placeId: geo.placeId, placeName: address, lat: geo.lat, lng: geo.lng });
      });
    }).catch((err) => showValidationError(err instanceof Error ? err.message : '우편번호 검색을 불러올 수 없습니다.'));
  }, [setZipCode, setAddress, setAddressDetail, setPlaceInfo, showValidationError]);

  const handleSubmit = () => {
    if (!vehicleId) {
      showValidationError('차량을 선택해주세요. 차량 목록에서 검차 신청할 차량을 선택한 후 진행해주세요.');
      return;
    }
    if (!skipRequired && (!form.preferredDate || !form.preferredTime || !form.address)) {
      showValidationError('필수 항목을 입력해주세요.');
      return;
    }
    submitInspection(
      {
        vehicleId,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        zipCode: form.zipCode,
        address: form.address,
        addressDetail: form.addressDetail,
        placeId: form.placeId,
        placeName: form.placeName,
        lat: form.lat,
        lng: form.lng,
      },
      {
        onSuccess: () => {
          logEventWithHypothesis('InspectionRequestStep1Page:next', '검차 step1→목록', { to: '/inspections' }, 'H_CTA2');
          navigate('/inspections');
        },
      }
    );
  };

  return (
    <div className="inspection-step1-root min-h-screen" data-name="매물 목록 - 차량목록 페이지 랜딩페이지" data-node-id="1033:4903">
      <LandingHeader userName="홍길동" variant="main" activeNav="inspections" />

      <div className={`flex ${LAYOUT_CLASSES.CONTAINER}`}>
        <aside
          className={`${LAYOUT_CLASSES.GNB_SIDEBAR} flex-shrink-0 bg-white ${LAYOUT_CLASSES.CONTENT_MIN_HEIGHT} flex flex-col overflow-hidden border-r border-black/10`}
          data-node-id="1033:4943"
        >
          <p className="px-6 pt-[30px] text-[14px] leading-[20px] text-[var(--color-gray-60)]" data-node-id="1033:4945">
            검색
          </p>
          <div className="relative mx-6 mt-3.5 h-[40px] w-[210px]" data-node-id="1033:4946">
            <input
              type="text"
              placeholder="차량번호/모델명"
              className="h-full w-full rounded-[20px] border-[1.5px] border-black/10 bg-white pl-4 pr-10 text-[13.757px] leading-[21.496px] text-gray-900 placeholder:text-[var(--color-1033-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              data-node-id="1033:4947"
            />
          </div>
          <div className="flex-1 overflow-auto">
            <ProgressSidebar steps={getRegisterFlowSteps('inspection')} inline />
          </div>
        </aside>

        <main className={`flex-1 ${LAYOUT_CLASSES.MAIN_PADDING} max-w-[980px]`}>
          <h1
            className="mb-8 font-bold leading-[44px] text-[28px] text-black"
            data-node-id="1033:4974"
          >
            검차 신청
          </h1>

          <div className="space-y-8">
            <InspectionVehicleSelectSection
              searchValue={form.vehicleSearch}
              onSearchChange={setVehicleSearch}
            />

            <InspectionScheduleSection
              preferredDate={form.preferredDate}
              preferredTime={form.preferredTime}
              onPreferredDateChange={setPreferredDate}
              onPreferredTimeChange={setPreferredTime}
            />

            <InspectionLocationSection
              zipCode={form.zipCode}
              address={form.address}
              addressDetail={form.addressDetail}
              defaultAddress={form.defaultAddress}
              onZipCodeChange={setZipCode}
              onAddressChange={setAddress}
              onAddressDetailChange={setAddressDetail}
              onDefaultAddressChange={setDefaultAddress}
              onFindZipCode={handleFindZipCode}
            />

            <InspectionPaymentSection />

            <div className="flex justify-between pt-6">
              <Button
                variant="secondary"
                onClick={() => navigate(-1)}
                className="rounded-[10px] border border-[var(--color-gray-200)] bg-[var(--color-gray-100)] text-[12px] font-medium text-[var(--color-text-primary)] shadow-[var(--shadow-figma-card)]"
              >
                이전
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="h-[37px] w-[92px] rounded-[10px] border border-[var(--color-gray-200)] bg-[var(--color-gray-100)] text-[12px] font-medium text-[var(--color-text-primary)] shadow-[var(--shadow-figma-card)]"
                  data-node-id="1193:6887"
                  onClick={() => navigate('/inspections')}
                >
                  임시저장
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="h-[37px] w-[118px] rounded-[10px] border border-[var(--color-gray-200)] bg-[var(--color-primary)] text-[12px] font-medium text-white shadow-[var(--shadow-figma-card)]"
                  data-node-id="1193:6885"
                >
                  {isPending ? '처리 중...' : '신청하기'}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
