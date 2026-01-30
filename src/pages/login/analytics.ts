/**
 * Аналитика для страницы Login
 */

/**
 * Событие: ошибка авторизации
 */
function sendFailedAuth(errorText: string) {
    window.dataLayer.push({
        event: 'failed_auth',
        param: 'authorization',
        event_action: errorText,
    })
}

/**
 * Инициализация tracking ошибок
 */
export function initLoginAnalytics() {
    const form = document.querySelector('#account')
    if (!form) return

    // Проверяем ВСЕ инпуты с ошибками при загрузке
    const inputs = form.querySelectorAll('[error-text], .input__error-text')

    inputs.forEach((input) => {
        // Проверяем атрибут
        let error = (input as HTMLElement).getAttribute?.('error-text')

        // Fallback: textContent
        if (!error && input.textContent) {
            error = input.textContent.trim()
        }

        if (error) {
            sendFailedAuth(error)
            console.log('Ошибка авторизации:', error)
        }
    })
}
