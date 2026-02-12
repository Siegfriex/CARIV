/**
 * Timestamp 호환 레이어
 * 서버 타임스탬프 흐름을 위한 Date 기반 구현
 */

export interface TimestampLike {
  seconds: number;
  nanoseconds?: number;
  toDate: () => Date;
  toMillis?: () => number;
}

/** TimestampLike 타입 가드 (instanceof 대체, 객체 export용) */
export function isTimestamp(val: unknown): val is TimestampLike {
  return val != null && typeof (val as TimestampLike).toDate === 'function';
}

export const Timestamp = {
  fromDate: (d: Date): TimestampLike => ({
    seconds: Math.floor(d.getTime() / 1000),
    nanoseconds: 0,
    toDate: () => d,
    toMillis: () => d.getTime(),
  }),
  now: (): TimestampLike => Timestamp.fromDate(new Date()),
};

export type Timestamp = TimestampLike;
