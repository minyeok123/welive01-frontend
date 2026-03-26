export type ApartmentRequest = {
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
  apartmentStatus: 'APPROVED' | 'PENDING' | 'REJECTED';
  /** 승인 대기 시 가입 신청(Register) id — PATCH /auth/admins/:id/status 에 사용 */
  adminRegisterId?: string | null;
  adminId: string;
  adminName: string;
  adminContact: string;
  adminEmail: string;
};
