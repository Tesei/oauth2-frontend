/**
 * Аналитика для страницы Forgot Password Sent (Письмо отправлено)
 */

/**
 * Инициализация аналитики (отправка события при первой загрузке)
 */
export function initForgotPasswordSentAnalytics() {
    if (window.dataLayer) {
        window.dataLayer.push({
            event: "success_restore_password"
        });
        console.log('Событие отправлено: success_restore_password (forgot-password-sent)');
    }
}
