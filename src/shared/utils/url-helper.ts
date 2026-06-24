/**
 * Утилита для работы с URL параметрами
 */

/**
 * Получить query параметр из URL
 * @param param - название параметра
 * @returns значение параметра или null
 */
export function getQueryParam(param: string): string | null {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
}

/**
 * Получить backUrl из query параметров
 * Пытается найти backUrl в двух местах:
 * 1. Прямой параметр ?backUrl=...
 * 2. Вложенный в ReturnUrl: ?ReturnUrl=/page?backUrl=...
 */
export function getBackUrl(): string | null {
    // Сначала пробуем прямой backUrl
    let backUrl = getQueryParam('backUrl')

    // Если нет прямого, пробуем извлечь из ReturnUrl
    if (!backUrl) {
        const returnUrl = getQueryParam('ReturnUrl')
        if (returnUrl) {
            try {
                // Извлекаем backUrl из ReturnUrl
                // ReturnUrl может быть вида: /manage/changepassword?backurl=https://stage.fstravel.com/cabinet/
                const returnUrlParams = new URLSearchParams(returnUrl.split('?')[1] || '')
                backUrl = returnUrlParams.get('backurl') || returnUrlParams.get('backUrl')
            } catch (error) {
                console.warn('Не удалось распарсить ReturnUrl:', error)
            }
        }
    }

    if (!backUrl) {
        return null
    }

    // Валидация backUrl
    return validateBackUrl(backUrl)
}

/**
 * Валидирует backUrl для безопасности
 */
function validateBackUrl(backUrl: string): string | null {
    try {
        // Если это относительный путь - возвращаем как есть
        if (backUrl.startsWith('/')) {
            return backUrl
        }

        // Если это полный URL - проверяем домен
        const url = new URL(backUrl)
        const currentDomain = window.location.hostname

        // Разрешаем fstravel.com и все его поддомены
        if (
            url.hostname === currentDomain ||
            url.hostname.endsWith('.fstravel.com') ||
            url.hostname === 'fstravel.com'
        ) {
            return backUrl
        }

        // Если домен не совпадает - не используем
        console.warn('backUrl домен не разрешен:', url.hostname)
        return null
    } catch (error) {
        // Если URL невалиден - не используем
        console.warn('Невалидный backUrl:', backUrl)
        return null
    }
}

/**
 * Выполнить переход "Назад" с учетом backUrl
 * Если backUrl есть - переходит туда
 * Иначе - использует window.history.back()
 */
export function goBack(): void {
    const backUrl = getBackUrl()

    if (backUrl) {
        window.location.href = backUrl
    } else {
        window.history.back()
    }
}
