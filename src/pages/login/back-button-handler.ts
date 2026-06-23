/**
 * Обработчик кнопки "Назад" для страницы Login
 * Читает backUrl из query параметров и перенаправляет туда
 * Использует OIDC для проверки авторизации
 */

import { goBack, getBackUrl } from '../../shared/utils/url-helper'
import { isAuthenticated } from '../../shared/utils/oidc'

export function initLoginBackButton() {
    // Ищем кнопку "Назад" только на странице login
    const backButtons = document.querySelectorAll('.js-back-button')
    if (!backButtons.length) {
        return
    }

    // Заменяем стандартное поведение onclick
    backButtons.forEach((button) => {
        button.removeAttribute('onclick')
        const innerButton = button.querySelector('button.js-back-button')
        innerButton?.removeAttribute('onclick')
    })

    backButtons.forEach((button) => {
        // Если внутри есть кнопка с таким же классом, значит это веб компонент и чтобы избежать дублирования,
        // пропускаем родителя, ребенок будет итак в массиве
        const innerButton = button.querySelector('button.js-back-button')
        if (innerButton) {
            return
        }

        button.addEventListener('click', async (event) => {
            event.preventDefault()
            // Проверяем авторизацию через OIDC
            const authenticated = await isAuthenticated()

            if (authenticated) {
                // Если авторизован - используем backUrl
                goBack()
            } else {
                // Если не авторизован - проверяем есть ли backUrl
                const backUrl = getBackUrl()

                if (backUrl) {
                    // Если backUrl есть - используем его даже без авторизации
                    window.location.href = backUrl
                } else {
                    // Если backUrl нет - просто history.back()
                    window.history.back()
                }
            }
        })
    })
}
