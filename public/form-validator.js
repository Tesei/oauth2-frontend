/**
 * Универсальный обработчик валидации форм (для CSHTML)
 * Подключается в _Layout.cshtml
 */

(function() {
    'use strict'
    
    function initFormValidation() {
        // Находим все формы на странице
        const forms = document.querySelectorAll('form')
        
        forms.forEach(form => {
            const submitButton = form.querySelector('[type="submit"]')
            if (!submitButton) return
            
            /**
             * Проверяет есть ли ошибки в форме
             */
            function checkFormErrors() {
                // Ищем все элементы с ошибками
                const errorElements = form.querySelectorAll('.input__error-text')
                
                // Проверяем есть ли хоть одна непустая ошибка
                const hasErrors = Array.from(errorElements).some(el => {
                    const errorText = el.textContent?.trim()
                    return errorText && errorText.length > 0
                })
                
                // Устанавливаем disabled на кнопку
                if (hasErrors) {
                    submitButton.setAttribute('disabled', '')
                } else {
                    submitButton.removeAttribute('disabled')
                }
            }
            
            // Проверяем при загрузке (server-side ошибки)
            checkFormErrors()
            
            // Слушаем input - когда пользователь вводит
            form.addEventListener('input', () => {
                setTimeout(checkFormErrors, 50)
            })
            
            // Слушаем blur - когда теряет фокус
            form.addEventListener('blur', () => {
                setTimeout(checkFormErrors, 50)
            }, true)
            
            // Слушаем изменения в DOM
            const observer = new MutationObserver(() => {
                checkFormErrors()
            })
            
            observer.observe(form, {
                childList: true,
                subtree: true,
                characterData: true,
            })
        })
    }
    
    // Инициализация после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFormValidation)
    } else {
        initFormValidation()
    }
})()
