import { initLoginAnalytics } from '../../pages/login/analytics'
import { initLoginAnalytics as initOldLoginAnalytics } from '../../pages/old-login/analytics'
import { initForgotPasswordAnalytics } from '../../pages/old-forgot-password/analytics'
import { initForgotPasswordSentAnalytics } from '../../pages/old-forgot-password-sent/analytics'
import { initResetPasswordSuccessAnalytics } from '../../pages/old-reset-password-success/analytics'
import { initWbAuthConfirmHandlers } from '../../pages/old-wb-auth-confirm/analytics'

let cleanupFn: (() => void) | null = null

/**
 * Главный обработчик аналитики для страниц
 */
export function initPageAnalytics(pageName: string) {
    if (cleanupFn) {
        cleanupFn()
        cleanupFn = null
    }

    if (pageName === 'login') {
        cleanupFn = initLoginAnalytics()
    } else if (pageName === 'old-login') {
        initOldLoginAnalytics()
    } else if (pageName === 'old-forgot-password') {
        initForgotPasswordAnalytics()
    } else if (pageName === 'old-forgot-password-sent') {
        initForgotPasswordSentAnalytics()
    } else if (pageName === 'old-reset-password-success') {
        initResetPasswordSuccessAnalytics()
    } else if (pageName === 'old-wb-auth-confirm') {
        initWbAuthConfirmHandlers()
    }
}
