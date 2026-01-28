/**
 * Аналитика для страницы Reset Password Success
 */

/**
 * Инициализация аналитики (отправка события при первой загрузке)
 */
export function initResetPasswordSuccessAnalytics() {
    const eventKey = 'reset_password_success_sent';
    const eventSent = sessionStorage.getItem(eventKey);
    
    if (!eventSent && window.dataLayer) {
        window.dataLayer.push({
            event: "success_restore_password"
        });
        sessionStorage.setItem(eventKey, 'true');
        console.log('Событие отправлено: success_restore_password');
    } else {
        console.log('Событие уже было отправлено (повтор заблокирован)');
    }
}
