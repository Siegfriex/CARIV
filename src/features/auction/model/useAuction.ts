/**
 * useAuction Hook (Vercel — Mock 전용)
 * Mock 차량 데이터 사용
 */

import { useQuery } from '@tanstack/react-query';
import { auctionKeys } from '@/shared/api/queryKeys';
import { MOCK_VEHICLES_ALL } from '@/shared/api/mockLists';
import { vehicleSchema } from '@/entities/vehicle/model/schema';
import type { Vehicle } from '@/entities/vehicle/model/types';

export interface UseAuctionOptions {
  enabled?: boolean;
}

export const useAuction = (vehicleId: string | undefined, options?: UseAuctionOptions) => {
  const enabled = options?.enabled ?? true;

  return useQuery({
    queryKey: auctionKeys.detail(vehicleId),
    queryFn: async (): Promise<Vehicle> => {
      if (!vehicleId) throw new Error('Vehicle ID is required');
      const found = MOCK_VEHICLES_ALL.find((v) => v.id === vehicleId);
      if (!found) throw new Error('Vehicle not found');
      return vehicleSchema.parse(found);
    },
    enabled: !!vehicleId && enabled,
    staleTime: 0,
    refetchInterval: 5000,
  });
};
