/**
 * Обработчик кнопки "Назад" для страницы Login (CSHTML версия)
 * Читает backUrl из query параметров и перенаправляет туда
 */

;(function () {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get(param)
    }

    function getBackUrl() {
        var backUrl = getQueryParam('backUrl')

        if (!backUrl) {
            var returnUrl = getQueryParam('ReturnUrl')
            if (returnUrl) {
                try {
                    var returnUrlParams = new URLSearchParams(returnUrl.split('?')[1] || '')
                    backUrl = returnUrlParams.get('backurl') || returnUrlParams.get('backUrl')
                } catch (error) {
                    console.warn('Не удалось распарсить ReturnUrl:', error)
                }
            }
        }

        if (!backUrl) {
            return null
        }

        return validateBackUrl(backUrl)
    }

    function validateBackUrl(backUrl) {
        try {
            if (backUrl.startsWith('/')) {
                return backUrl
            }

            var url = new URL(backUrl)
            var currentDomain = window.location.hostname

            if (
                url.hostname === currentDomain ||
                url.hostname.endsWith('.fstravel.com') ||
                url.hostname === 'fstravel.com'
            ) {
                return backUrl
            }

            console.warn('backUrl домен не разрешен:', url.hostname)
            return null
        } catch (error) {
            console.warn('Невалидный backUrl:', backUrl)
            return null
        }
    }

    function goBack() {
        const backUrl = getBackUrl()

        if (backUrl) {
            window.location.href = backUrl
        } else {
            window.history.back()
        }
    }

    function initLoginBackButton() {
        const backButton = document.querySelector('.back-button')

        if (!backButton) {
            return
        }

        backButton.removeAttribute('onclick')

        backButton.addEventListener('click', function (event) {
            event.preventDefault()
            goBack()
        })
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoginBackButton)
    } else {
        initLoginBackButton()
    }
})()
