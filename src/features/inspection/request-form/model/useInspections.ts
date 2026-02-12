/**
 * useInspections Hook (Vercel — Mock 전용)
 * 빈 배열 또는 Mock 반환
 */

import { useQuery } from '@tanstack/react-query';
import { inspectionKeys } from '@/shared/api/queryKeys';
import type { Inspection, InspectionStatus } from '@/entities/inspection/model/types';

interface UseInspectionsOptions {
  vehicleId?: string;
  evaluatorId?: string;
  status?: InspectionStatus;
}

export const useInspections = (options: UseInspectionsOptions = {}) => {
  return useQuery({
    queryKey: inspectionKeys.list(options.vehicleId, options.evaluatorId, options.status),
    queryFn: async (): Promise<Inspection[]> => {
      return [];
    },
  });
};
