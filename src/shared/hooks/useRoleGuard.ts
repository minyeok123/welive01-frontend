import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore, UserRole } from '@/shared/store/auth.store';

const SKIP_LOGIN_ALERT_KEY = 'welive_skip_login_guard_alert';

/** 로그아웃 시 역할 가드가 "로그인을 해주세요" 알림을 띄우지 않도록 표시 */
export function markIntentionalLogout() {
  try {
    sessionStorage.setItem(SKIP_LOGIN_ALERT_KEY, '1');
  } catch {
    /* ignore */
  }
}

function consumeSkipLoginAlert(): boolean {
  try {
    if (sessionStorage.getItem(SKIP_LOGIN_ALERT_KEY)) {
      sessionStorage.removeItem(SKIP_LOGIN_ALERT_KEY);
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}

interface RoleGuardOptions {
  redirectIfNoLogin?: string;
  redirectIfUnauthorized?: string;
  showAlertOnNoLogin?: boolean;
}

export const useRoleGuard = (
  allowedRoles: UserRole[],
  {
    redirectIfNoLogin = '/',
    redirectIfUnauthorized = '/unauthorized',
    showAlertOnNoLogin = true,
  }: RoleGuardOptions = {},
) => {
  const router = useRouter();
  const role = useAuthStore((state) => state.user?.role);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (!role) {
      if (showAlertOnNoLogin && !consumeSkipLoginAlert()) {
        alert('로그인을 해주세요');
      }
      router.replace(redirectIfNoLogin);
    } else if (!allowedRoles.includes(role)) {
      router.replace(redirectIfUnauthorized);
    }
  }, [
    role,
    hydrated,
    router,
    allowedRoles,
    redirectIfNoLogin,
    redirectIfUnauthorized,
    showAlertOnNoLogin,
  ]);

  const isAllowed = hydrated && role && allowedRoles.includes(role);
  return { isAllowed };
};
