import { initLoginAnalytics } from '../../pages/login/analytics'

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
    }
}
