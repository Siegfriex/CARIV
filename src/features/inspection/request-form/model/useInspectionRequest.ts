/**
 * useInspectionRequest Hook
 * 검차 신청 (useMutation)
 * CarivDealer_api_v1.md §3.1 바디 구조, adapters/inspectionAdapter 사용
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';
import { inspectionKeys, vehicleKeys } from '@/shared/api/queryKeys';
import {
  toInspectionRequestApiBody,
  fromInspectionRequestApiResponse,
  type InspectionRequestFormInput,
  type InspectionRequestFrontendResponse,
} from '@/shared/api/adapters';
import { handleError } from '@/shared/lib/errorHandler';
import { useToast } from '@/shared/ui/Toast';

/**
 * 검차 신청 뮤테이션 훅
 * @description POST /vehicles/{vehicleId}/inspections, 문서 §3.1 바디(inspectionPlace, schedule, payment, memo)
 * @returns useMutation (mutationFn: InspectionRequestFormInput → InspectionRequestFrontendResponse)
 */
export const useInspectionRequest = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (
      input: InspectionRequestFormInput
    ): Promise<InspectionRequestFrontendResponse> => {
      const { vehicleId, ...form } = input;
      const apiBody = toInspectionRequestApiBody({ vehicleId, ...form });
      const raw = await apiClient.vehicle.inspection.request(vehicleId, apiBody);
      return fromInspectionRequestApiResponse(raw as Parameters<typeof fromInspectionRequestApiResponse>[0]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inspectionKeys.all });
      queryClient.invalidateQueries({ queryKey: vehicleKeys.all });
    },
    onError: (err) => {
      showToast(handleError(err), 'error');
    },
  });
};
