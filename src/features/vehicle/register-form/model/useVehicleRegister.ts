/**
 * useVehicleRegister Hook (Vercel — Mock 전용)
 * Mock ID 반환, 쿼리 무효화 수행
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleKeys } from '@/shared/api/queryKeys';
import { vehicleSchema } from '@/entities/vehicle/model/schema';
import { Timestamp } from '@/shared/lib/timestamp';
import type { Vehicle, CreateVehicleInput } from '@/entities/vehicle/model/types';
import { handleError } from '@/shared/lib/errorHandler';
import { useToast } from '@/shared/ui/Toast';

export const useVehicleRegister = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateVehicleInput): Promise<Vehicle> => {
      const createdVehicle = {
        id: `mock-${Date.now()}`,
        ...input,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      return vehicleSchema.parse(createdVehicle);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.all });
    },
    onError: (err) => {
      showToast(handleError(err), 'error');
    },
  });
};
