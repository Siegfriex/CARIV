/**
 * 거래 엔티티 Zod 스키마 (런타임 검증)
 */

import { z } from 'zod';
import { Timestamp, isTimestamp } from '@/shared/lib/timestamp';

/** Timestamp 호환 스키마 */
const timestampSchema = z.custom<Timestamp>(
  (val) => isTimestamp(val),
  { message: 'Invalid Timestamp' }
);

export const tradeStatusSchema = z.enum(['pending', 'accepted', 'rejected', 'completed']);

export const tradeSchema = z.object({
  id: z.string(),
  vehicleId: z.string(),
  buyerId: z.string().optional(),
  sellerId: z.string().optional(),
  price: z.number().positive(),
  status: tradeStatusSchema,
  expiresAt: timestampSchema.optional(),
  acceptedAt: timestampSchema.optional(),
  rejectedAt: timestampSchema.optional(),
  createdAt: timestampSchema,
});

export type TradeSchemaType = z.infer<typeof tradeSchema>;
