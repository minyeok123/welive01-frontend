import axios from '@/shared/lib/axios';
import type { UserRole } from '@/shared/store/auth.store';

//아파트 조회 API
export interface Apartment {
  id: string;
  name: string;
  address: string;
  officeNumber: string;
  description: string;
  dongRange: {
    start: string;
    end: string;
  };
  hoRange: {
    start: string;
    end: string;
  };
  startComplexNumber: string;
  endComplexNumber: string;
  startDongNumber: string;
  endDongNumber: string;
  startFloorNumber: string;
  endFloorNumber: string;
  startHoNumber: string;
  endHoNumber: string;
}

export const getApartments = async (): Promise<Apartment[]> => {
  const response = await axios.get<{ apartments: Apartment[] }>('/apartments');
  return response.data.apartments;
};

export const getPublicApartments = async (): Promise<Apartment[]> => {
  const response = await axios.get<{ apartments: Apartment[] }>('/apartments/public');
  return response.data.apartments;
};

//아파트 상세 조회 API
export interface ApartmentDetail {
  id: string;
  name: string;
  address: string;
  officeNumber: string;
  description: string;
  startComplexNumber: string;
  endComplexNumber: string;
  startDongNumber: string;
  endDongNumber: string;
  startFloorNumber: string;
  endFloorNumber: string;
  startHoNumber: string;
  endHoNumber: string;
}

export const getApartmentDetail = async (apartmentId: string): Promise<ApartmentDetail> => {
  const response = await axios.get(`/apartments/${apartmentId}`);
  return response.data;
};

export const getPublicApartmentDetail = async (apartmentId: string): Promise<ApartmentDetail> => {
  const response = await axios.get(`/apartments/public/${apartmentId}`);
  return response.data;
};

/** 동·단지 범위(투표 권한 셀렉트 등). USER는 인증 /apartments/:id 가 403이라 공개 API 사용 */
export type ApartmentDongLayout = Pick<
  ApartmentDetail,
  | 'startComplexNumber'
  | 'endComplexNumber'
  | 'startDongNumber'
  | 'endDongNumber'
>;

export async function getApartmentDongLayout(
  apartmentId: string,
  role: UserRole | undefined,
): Promise<ApartmentDongLayout> {
  if (role === 'USER') {
    return getPublicApartmentDetail(apartmentId);
  }
  return getApartmentDetail(apartmentId);
}
