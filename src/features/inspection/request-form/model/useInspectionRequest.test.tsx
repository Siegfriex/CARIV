/**
 * useInspectionRequest 훅 테스트
 * 검차 신청 뮤테이션 호출·성공 시 쿼리 무효화·에러 시 toast를 검증한다.
 */

import type { ReactNode } from 'react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/shared/ui/Toast';
import { useInspectionRequest } from './useInspectionRequest';

const inspectionRequest = vi.fn();

vi.mock('@/shared/api/client', () => ({
  apiClient: {
    vehicle: {
      inspection: {
        request: (vehicleId: string, body: unknown) =>
          inspectionRequest(vehicleId, body),
      },
    },
  },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    );
  };
}

describe('useInspectionRequest', () => {
  beforeEach(() => {
    inspectionRequest.mockReset();
  });

  test('mutation 성공 시 apiClient.vehicle.inspection.request 호출 및 onSuccess 동작', async () => {
    inspectionRequest.mockResolvedValue({
      ok: true,
      result: { inspectionId: 9001, vehicleId: 101, status: 'REQUESTED' },
      message: null,
    });

    const { result } = renderHook(() => useInspectionRequest(), {
      wrapper: createWrapper(),
    });

    const input = {
      vehicleId: 'v-1',
      preferredDate: '2026-02-15',
      preferredTime: '14:00',
      address: '서울 강남구',
    };
    result.current.mutate(input);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(inspectionRequest).toHaveBeenCalledWith(
      'v-1',
      expect.objectContaining({
        inspectionPlace: expect.any(Object),
        schedule: expect.objectContaining({ requestDate: '2026-02-15T14:00:00' }),
        payment: expect.objectContaining({ method: 'AUTO', provider: 'CARD' }),
      })
    );
    expect(result.current.data).toEqual({
      success: true,
      inspectionId: '9001',
      message: '검차 신청이 완료되었습니다.',
    });
  });

  test('mutation 실패 시 error 상태', async () => {
    inspectionRequest.mockRejectedValue(new Error('검차 신청 실패'));

    const { result } = renderHook(() => useInspectionRequest(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      vehicleId: 'v-1',
      preferredDate: '2026-02-15',
      preferredTime: '14:00',
      address: '서울 강남구',
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
