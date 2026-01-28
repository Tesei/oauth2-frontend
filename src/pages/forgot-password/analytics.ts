/**
 * Аналитика для страницы Forgot Password
 */

// Событие: ошибка при восстановлении пароля
function sendErrorRestorePassword(errorText: string) {
    window.dataLayer.push({
        event: "error_restore_password",
        event_action: errorText
    });
}

/**
 * Инициализация tracking ошибок
 */
export function initForgotPasswordAnalytics() {
    const form = document.querySelector('#forgot-password-form');
    if (!form) return;
    
    // Server-side ошибка (при загрузке страницы)
    const errorOnLoad = form.querySelector('.input__error-text')?.textContent.trim();
    if (errorOnLoad) {
        sendErrorRestorePassword(errorOnLoad);
        console.log('Ошибка (server-side):', errorOnLoad);
    }
    
    // Client-side ошибка (при submit)
    form.addEventListener('submit', () => {
        setTimeout(() => {
            const errorAfterSubmit = form.querySelector('.input__error-text')?.textContent.trim();
            if (errorAfterSubmit) {
                sendErrorRestorePassword(errorAfterSubmit);
                console.log('Ошибка (client-side):', errorAfterSubmit);
            }
        }, 100);
    });
}
