/**
 * useBuyNow Hook
 * 즉시구매 (useMutation). apiClient.auction.buyNow 단일 경로 사용.
 * STATE_MANAGEMENT_POLICY §5.2 Optimistic Update 패턴 적용.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';
import { auctionKeys, vehicleKeys } from '@/shared/api/queryKeys';
import { handleError } from '@/shared/lib/errorHandler';
import { useToast } from '@/shared/ui/Toast';

/** 즉시구매 요청 입력 */
interface BuyNowInput {
  auction_id: string;
}

/** 즉시구매 응답 */
interface BuyNowResponse {
  success: boolean;
  contract_id: string;
  message: string;
}

/**
 * 즉시구매 뮤테이션 훅
 * @description apiClient.auction.buyNow 호출. Optimistic: 취소·스냅샷·롤백.
 * @returns useMutation (mutationFn: BuyNowInput → BuyNowResponse)
 */
export const useBuyNow = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (input: BuyNowInput): Promise<BuyNowResponse> => {
      return await apiClient.auction.buyNow(input.auction_id);
    },
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: auctionKeys.detail(input.auction_id) });
      const previous = queryClient.getQueryData(auctionKeys.detail(input.auction_id));
      return { previous };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.auctions });
      queryClient.invalidateQueries({ queryKey: vehicleKeys.all });
    },
    onError: (err, input, context) => {
      if (context?.previous != null) {
        queryClient.setQueryData(auctionKeys.detail(input.auction_id), context.previous);
      }
      showToast(handleError(err), 'error');
    },
  });
};
