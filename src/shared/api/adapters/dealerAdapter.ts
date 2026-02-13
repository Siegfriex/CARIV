/**
 * 딜러 인증 API DTO ↔ 프론트 변환
 * CarivDealer_api_v1.md §1.1, Request_Body_Mismatch_Report.md §3.3 기준
 */

/** API 요청 바디 (문서 §1.1 PUT /signup/dealer) */
export interface SignupDealerApiBody {
  business: {
    businessNo: string;
    representativeName: string;
    businessPhone: string;
    businessType: string;
    businessInfoType: string;
    vatType: string;
    officeAddress: {
      placeId: string;
      detailAddress?: string;
    };
    businessRegistrationFileId: number;
  };
  usedCarDealer: {
    usedCarDealerLicenseFileIds: number[];
    dealerCompanyName: string;
    dealerEmployeeCardNo: string;
    employeeCardPhotoFileIds: number[];
    dealerRegistrationImageFileIds: number[];
  };
  pledge: {
    signatureText: string;
    associationMember: boolean;
  };
  action: 'SUBMIT' | 'DRAFT';
}
