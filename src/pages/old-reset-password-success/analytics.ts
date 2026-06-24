/**
 * Аналитика для страницы Reset Password Success
 */

/**
 * Инициализация аналитики (отправка события при первой загрузке)
 */
export function initResetPasswordSuccessAnalytics() {
    if (window.dataLayer) {
        window.dataLayer.push({
            event: 'success_restore_password',
        })
        console.log('Событие отправлено: success_restore_password')
    }
}
