import axios from '@/shared/lib/axios';
import { ResidentNoticeTypes } from '../model/notice.types';

/** 백엔드 getNoticesQuerySchema: limit 최대 100 */
export const RESIDENT_NOTICES_MAX_LIMIT = 100;

// ✅ 공지사항 목록 불러오기
export const fetchResidentNotices = async (
  page = 1,
  limit = RESIDENT_NOTICES_MAX_LIMIT,
): Promise<{ notices: ResidentNoticeTypes[]; totalCount: number }> => {
  const safeLimit = Math.min(Math.max(1, limit), RESIDENT_NOTICES_MAX_LIMIT);
  const res = await axios.get('/notices', {
    params: { limit: safeLimit, page },
  });

  return {
    notices: res.data.notices,
    totalCount: res.data.totalCount,
  };
};

// ✅ 공지사항 상세 불러오기
export const fetchResidentNoticeDetail = async (noticeId: string) => {
  const res = await axios.get(`/notices/${noticeId}`);
  return res.data;
};

/** 상세 페이지에서 1회 조회수 반영 (GET과 분리 — Strict Mode 중복 요청 대응) */
export const postNoticeView = async (noticeId: string): Promise<{ viewsCount: number }> => {
  const res = await axios.post(`/notices/${noticeId}/view`);
  return res.data;
};
