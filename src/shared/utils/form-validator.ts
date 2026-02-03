/**
 * Универсальный обработчик валидации форм
 * Автоматически управляет состоянием кнопки submit
 */

export function initFormValidation() {
    // Находим все формы на странице
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const submitButton = form.querySelector('[type="submit"]') as HTMLElement;
        if (!submitButton) return;
        
        /**
         * Проверяет есть ли ошибки в форме
         */
        function checkFormErrors() {
            // Ищем все элементы с ошибками
            const errorElements = form.querySelectorAll('.input__error-text');
            
            // Проверяем есть ли хоть одна непустая ошибка
            const hasErrors = Array.from(errorElements).some(el => {
                const errorText = el.textContent?.trim();
                return errorText && errorText.length > 0;
            });
            
            // Устанавливаем disabled на кнопку
            if (hasErrors) {
                submitButton.setAttribute('disabled', '');
                console.log('Форма имеет ошибки, кнопка disabled');
            } else {
                submitButton.removeAttribute('disabled');
                console.log('Форма валидна, кнопка активна');
            }
        }
        
        // Проверяем при загрузке (server-side ошибки)
        checkFormErrors();
        
        // Слушаем input - когда пользователь вводит, проверяем снова
        form.addEventListener('input', () => {
            setTimeout(checkFormErrors, 50);
        });
        
        // Слушаем blur - когда теряет фокус, проверяем
        form.addEventListener('blur', () => {
            setTimeout(checkFormErrors, 50);
        }, true);
        
        // Слушаем изменения в DOM (на случай если ошибки добавляются динамически)
        const observer = new MutationObserver(() => {
            checkFormErrors();
        });
        
        observer.observe(form, {
            childList: true,
            subtree: true,
            characterData: true
        });
    });
}
