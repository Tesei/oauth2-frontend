/**
 * Обработчик кнопки "Назад" для страницы Login
 * Читает backUrl из query параметров и перенаправляет туда
 * Использует OIDC для проверки авторизации
 */

import { goBack } from '../../shared/utils/url-helper'
import { isAuthenticated } from '../../shared/utils/oidc'

export function initLoginBackButton() {
    // Ищем кнопку "Назад" только на странице login
    const backButton = document.querySelector('.back-button')

    if (!backButton) {
        return
    }

    // Заменяем стандартное поведение onclick
    backButton.removeAttribute('onclick')

    backButton.addEventListener('click', async (event) => {
        event.preventDefault()

        // Проверяем авторизацию через OIDC
        const authenticated = await isAuthenticated()

        if (authenticated) {
            // Если авторизован - используем backUrl
            goBack()
        } else {
            // Если не авторизован - проверяем есть ли backUrl
            const urlHelper = await import('../../shared/utils/url-helper')
            const backUrl = urlHelper.getBackUrl()

            if (backUrl) {
                // Если backUrl есть - используем его даже без авторизации
                window.location.href = backUrl
            } else {
                // Если backUrl нет - просто history.back()
                window.history.back()
            }
        }
    })
}
