/**
 * Обработчик кнопки "Назад" для страницы Login (CSHTML версия с OIDC)
 * Читает backUrl из query параметров и перенаправляет туда
 * Проверяет авторизацию через localStorage (OIDC токены)
 */

(function() {
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
            
            if (url.hostname === currentDomain || 
                url.hostname.endsWith('.fstravel.com') || 
                url.hostname === 'fstravel.com') {
                return backUrl
            }
            
            console.warn('backUrl домен не разрешен:', url.hostname)
            return null
        } catch (error) {
            console.warn('Невалидный backUrl:', backUrl)
            return null
        }
    }
    
    /**
     * Проверка авторизации через localStorage (OIDC токены)
     */
    function isAuthenticated() {
        try {
            // Ищем OIDC токены в localStorage
            var keys = Object.keys(localStorage)
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].startsWith('oidc.user:')) {
                    var userData = localStorage.getItem(keys[i])
                    if (userData) {
                        var user = JSON.parse(userData)
                        // Проверяем что токен не истек
                        if (user.expires_at && user.expires_at > Math.floor(Date.now() / 1000)) {
                            return true
                        }
                    }
                }
            }
            return false
        } catch (error) {
            console.warn('Ошибка проверки авторизации:', error)
            return false
        }
    }

    function goBack() {
        var authenticated = isAuthenticated()
        var backUrl = getBackUrl()
        
        if (authenticated && backUrl) {
            // Авторизован И есть backUrl - используем его
            window.location.href = backUrl
        } else if (!authenticated && backUrl) {
            // НЕ авторизован НО есть backUrl - тоже используем
            window.location.href = backUrl
        } else {
            // Нет backUrl - стандартное поведение
            window.history.back()
        }
    }

    function initLoginBackButton() {
        var backButton = document.querySelector('.back-button')
        
        if (!backButton) {
            return
        }
        
        backButton.removeAttribute('onclick')
        
        backButton.addEventListener('click', function(event) {
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
