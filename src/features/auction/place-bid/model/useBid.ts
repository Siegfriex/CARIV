/**
 * useBid Hook
 * 경매 입찰 (useMutation). apiClient.auction.bid 단일 경로 사용.
 * STATE_MANAGEMENT_POLICY §5.2 Optimistic Update 패턴 적용.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';
import { auctionKeys } from '@/shared/api/queryKeys';
import { handleError } from '@/shared/lib/errorHandler';
import { useToast } from '@/shared/ui/Toast';

/** 입찰 요청 입력 */
interface BidInput {
  auction_id: string;
  bid_amount: number;
}

/** 입찰 응답 */
interface BidResponse {
  success: boolean;
  message: string;
}

/**
 * 경매 입찰 뮤테이션 훅
 * @description apiClient.auction.bid 호출. Optimistic: 취소·스냅샷·롤백.
 *   auction API 확장 시 setQueryData로 currentPrice 즉시 반영 가능.
 * @returns useMutation (mutationFn: BidInput → BidResponse)
 */
export const useBid = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (input: BidInput): Promise<BidResponse> => {
      return await apiClient.auction.bid(input.auction_id, input.bid_amount);
    },
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: auctionKeys.detail(input.auction_id) });
      const previous = queryClient.getQueryData(auctionKeys.detail(input.auction_id));
      return { previous };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auctionKeys.auctions });
    },
    onError: (err, input, context) => {
      if (context?.previous != null) {
        queryClient.setQueryData(auctionKeys.detail(input.auction_id), context.previous);
      }
      showToast(handleError(err), 'error');
    },
  });
};
