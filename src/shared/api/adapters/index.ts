/**
 * API DTO ↔ 도메인 어댑터
 * CarivDealer_api_v1.md SSOT
 */

export {
  mapApiVehicleStatusToFrontend,
  mapFrontendVehicleStatusToApi,
  mapApiInspectionStatusToFrontend,
  mapFrontendInspectionStatusToApi,
} from './statusMappers';
export type {
  ApiVehicleStatus,
  FrontendVehicleStatus,
  ApiInspectionStatus,
  FrontendInspectionStatus,
} from './statusMappers';

export {
  toInspectionRequestApiBody,
  fromInspectionRequestApiResponse,
} from './inspectionAdapter';
export type {
  InspectionRequestApiBody,
  InspectionRequestFormInput,
  InspectionRequestApiResponse,
  InspectionRequestFrontendResponse,
} from './inspectionAdapter';

export type { SignupDealerApiBody } from './dealerAdapter';

export {
  fromApiVehicleItem,
  fromApiVehicleList,
} from './vehicleAdapter';
export type {
  ApiVehicleItem,
  VehicleParseInput,
} from './vehicleAdapter';
