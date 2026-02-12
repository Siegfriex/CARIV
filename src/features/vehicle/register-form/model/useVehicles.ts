/**
 * useVehicles Hook (Vercel — Mock 전용)
 * Mock 데이터 사용
 */

import { useQuery } from '@tanstack/react-query';
import { vehicleKeys } from '@/shared/api/queryKeys';
import { MOCK_VEHICLES_ALL } from '@/shared/api/mockLists';
import { vehicleSchema } from '@/entities/vehicle/model/schema';
import type { Vehicle, VehicleStatus } from '@/entities/vehicle/model/types';

interface UseVehiclesOptions {
  ownerId?: string;
  status?: VehicleStatus[];
}

function getMockVehicles(): Vehicle[] {
  return MOCK_VEHICLES_ALL.map((v) => vehicleSchema.parse(v)) as Vehicle[];
}

export const useVehicles = (options: UseVehiclesOptions = {}) => {
  return useQuery({
    queryKey: vehicleKeys.list(options.ownerId, options.status),
    queryFn: async (): Promise<Vehicle[]> => {
      const mock = getMockVehicles();
      return options.status && options.status.length > 0
        ? mock.filter((v) => options.status!.includes(v.status))
        : mock;
    },
    staleTime: 5 * 60 * 1000,
  });
};
