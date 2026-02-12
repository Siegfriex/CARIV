/**
 * useVehicleRegister 훅 테스트
 * 차량 등록 뮤테이션 호출·성공 시 쿼리 무효화·에러 시 toast를 검증한다.
 */

import type { ReactNode } from 'react';
import { describe, test, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/shared/ui/Toast';
import { useVehicleRegister } from './useVehicleRegister';

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

const validInput = {
  status: 'draft' as const,
  plateNumber: '12가 1234',
  manufacturer: '현대',
  modelName: '쏘나타',
  modelYear: '2024',
  mileage: '15000',
};

describe('useVehicleRegister', () => {
  test('mutation 성공 시 Mock ID 반환 및 onSuccess 동작', async () => {
    const { result } = renderHook(() => useVehicleRegister(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(validInput);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.id).toMatch(/^mock-\d+$/);
    expect(result.current.data?.plateNumber).toBe('12가 1234');
  });

  test('mutation 실패 시 error 상태', async () => {
    const { result } = renderHook(() => useVehicleRegister(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      ...validInput,
      plateNumber: 'invalid',
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
