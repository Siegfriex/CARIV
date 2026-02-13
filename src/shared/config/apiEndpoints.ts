/**
 * API 엔드포인트 중앙 관리 (SSOT)
 * CarivDealer_api_v1.md RESTful 경로 기준.
 * 참조: docs/CarivDealer_api_v1.md
 */

/** REST 경로 템플릿·빌더 */
export const API_PATHS = {
  /** Auth */
  AUTH: {
    LOGIN: 'auth/login',
    KAKAO_LOGIN: 'auth/kakao/login',
    GOOGLE_LOGIN: 'auth/google/login',
    REFRESH: 'auth/refresh',
    LOGOUT: 'auth/logout',
    FILES: 'auth/files',
  },

  /** Signup */
  SIGNUP: {
    STATUS: 'signup/status',
    DEALER: 'signup/dealer',
    DEALER_SUBMIT: 'signup/dealer/submit',
    DEALER_BUSINESS_VERIFY: 'signup/dealer/business-number/verify',
    SETTLEMENT: 'signup/settlement',
  },

  /** Vehicle */
  VEHICLE: {
    FILES: 'vehicle/files',
    LOOKUP: 'vehicles/lookup',
    OCR_PARSE: 'vehicles/ocr/parse',
    LIST: 'vehicles',
    SEARCH: 'vehicles/search',
    byId: (id: string) => `vehicles/${id}` as const,
    inspections: (vehicleId: string) => `vehicles/${vehicleId}/inspections` as const,
    inspectionsLatest: (vehicleId: string) => `vehicles/${vehicleId}/inspections/latest` as const,
  },
} as const;

/**
 * 경로 파라미터가 필요한 엔드포인트 빌더
 * @deprecated API_PATHS 사용. 하위 호환용 유지.
 */
export const API_ENDPOINTS = {
  MEMBER: {
    REGISTER: API_PATHS.SIGNUP.DEALER,
    VERIFY_BUSINESS: API_PATHS.SIGNUP.DEALER_BUSINESS_VERIFY,
  },

  VEHICLE: {
    OCR_PARSE: API_PATHS.VEHICLE.OCR_PARSE,
    /** @deprecated OCR_PARSE 사용 */
    OCR_REGISTRATION: API_PATHS.VEHICLE.OCR_PARSE,
    /** 경로: vehicles/{vehicleId}/inspections — buildVehicleInspectionsPath(vehicleId) 사용 */
    INSPECTION_REQUEST: 'vehicles/{vehicleId}/inspections',
    INSPECTIONS_LATEST: 'vehicles/{vehicleId}/inspections/latest',
    GET_STATISTICS: 'vehicles/statistics',
  },

  INSPECTION: {
    ASSIGN: 'inspections/assign',
    UPLOAD_RESULT: 'inspections/upload-result',
    GET_RESULT: 'inspections/result',
    ASSIGN_EVALUATOR: 'inspections/assign-evaluator',
  },

  TRADE: {
    CHANGE_SALE_METHOD: 'trade/sale-method',
    ACCEPT_PROPOSAL: 'trade/proposal/accept',
    MANAGE_PROPOSAL_TTL: 'trade/proposal/ttl',
  },

  AUCTION: {
    BID: 'auctions/bid',
    BUY_NOW: 'auctions/buy-now',
  },

  LOGISTICS: {
    SCHEDULE: 'logistics/schedule',
    DISPATCH_REQUEST: 'logistics/dispatch/request',
    DISPATCH_CONFIRM: 'logistics/dispatch/confirm',
    HANDOVER_APPROVE: 'logistics/handover/approve',
  },

  SETTLEMENT: {
    NOTIFY: 'settlements/notify',
  },

  REPORT: {
    GENERATE: 'reports/generate',
    SAVE: 'reports/save',
  },

  CONFIG: {
    GOOGLE_MAPS_API_KEY: 'config/google-maps-api-key',
  },

  ORDER: {
    CREATE: 'orders',
    GET: 'orders',
    UPDATE_STATUS: 'orders/status',
  },

  PAYMENT: {
    CREATE: 'payments',
    GET: 'payments',
    REFUND: 'payments/refund',
  },

  ADDRESS: {
    CREATE: 'addresses',
    GET: 'addresses',
    LIST: 'addresses',
    UPDATE: 'addresses',
    DELETE: 'addresses',
  },

  REVIEW: {
    CREATE: 'reviews',
    LIST: 'reviews',
  },

  SELLER_DOCS: {
    UPLOAD: 'seller-docs/upload',
    APPROVE: 'seller-docs/approve',
    LIST: 'seller-docs',
  },
} as const;

/** API_ENDPOINTS에 정의된 모든 엔드포인트 경로 문자열 유니온 타입 */
export type ApiEndpoint =
  | typeof API_ENDPOINTS.MEMBER[keyof typeof API_ENDPOINTS.MEMBER]
  | typeof API_ENDPOINTS.VEHICLE[keyof typeof API_ENDPOINTS.VEHICLE]
  | typeof API_ENDPOINTS.INSPECTION[keyof typeof API_ENDPOINTS.INSPECTION]
  | typeof API_ENDPOINTS.TRADE[keyof typeof API_ENDPOINTS.TRADE]
  | typeof API_ENDPOINTS.AUCTION[keyof typeof API_ENDPOINTS.AUCTION]
  | typeof API_ENDPOINTS.LOGISTICS[keyof typeof API_ENDPOINTS.LOGISTICS]
  | typeof API_ENDPOINTS.SETTLEMENT[keyof typeof API_ENDPOINTS.SETTLEMENT]
  | typeof API_ENDPOINTS.REPORT[keyof typeof API_ENDPOINTS.REPORT]
  | typeof API_ENDPOINTS.CONFIG[keyof typeof API_ENDPOINTS.CONFIG]
  | typeof API_ENDPOINTS.ORDER[keyof typeof API_ENDPOINTS.ORDER]
  | typeof API_ENDPOINTS.PAYMENT[keyof typeof API_ENDPOINTS.PAYMENT]
  | typeof API_ENDPOINTS.ADDRESS[keyof typeof API_ENDPOINTS.ADDRESS]
  | typeof API_ENDPOINTS.REVIEW[keyof typeof API_ENDPOINTS.REVIEW]
  | typeof API_ENDPOINTS.SELLER_DOCS[keyof typeof API_ENDPOINTS.SELLER_DOCS];

/** vehicleId 유효성 검사 (routeManager 정책과 동기화) */
function requireVehicleId(vehicleId: unknown): string {
  const id = typeof vehicleId === 'string' ? vehicleId.trim() : '';
  if (!id) {
    throw new Error('vehicleId가 필요합니다. 차량을 선택해주세요.');
  }
  return id;
}

/** vehicleId로 검차 신청 경로 생성 */
export function buildVehicleInspectionsPath(vehicleId: string): string {
  const id = requireVehicleId(vehicleId);
  return API_ENDPOINTS.VEHICLE.INSPECTION_REQUEST.replace('{vehicleId}', id);
}

/** vehicleId로 최신 검차 상태 경로 생성 */
export function buildVehicleInspectionsLatestPath(vehicleId: string): string {
  const id = requireVehicleId(vehicleId);
  return API_ENDPOINTS.VEHICLE.INSPECTIONS_LATEST.replace('{vehicleId}', id);
}

/**
 * 문자열이 정의된 API 엔드포인트인지 검증.
 */
export function isValidEndpoint(endpoint: string): endpoint is ApiEndpoint {
  const allEndpoints = Object.values(API_ENDPOINTS).flatMap(category =>
    typeof category === 'object' && category !== null
      ? Object.values(category).filter((v): v is string => typeof v === 'string')
      : []
  );
  return allEndpoints.includes(endpoint as ApiEndpoint);
}
