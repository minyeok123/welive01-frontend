import { getBaseUrl } from '@/shared/lib/axios';

/**
 * axios baseURL은 보통 .../api 이고, 정적 업로드는 Express에서 /uploads 로 같은 호스트에 마운트됨.
 */
export function getApiOrigin(): string {
  const base = getBaseUrl().replace(/\/$/, '');
  return base.replace(/\/api$/, '');
}

/**
 * 로그인/DB에 저장된 프로필 경로(/uploads/...) 또는 절대 URL을 이미지 요청용 절대 URL로 변환.
 */
export function resolveBackendAssetUrl(url: string | null | undefined): string | undefined {
  if (url == null || url.trim() === '') return undefined;
  const u = url.trim();
  if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('data:')) return u;
  const origin = getApiOrigin();
  if (u.startsWith('/')) return `${origin}${u}`;
  return `${origin}/${u}`;
}
