/**
 * Аналитика и обработчики для страницы WB Auth Confirm
 */

/**
 * Инициализация обработчиков кнопок
 */
export function initWbAuthConfirmHandlers() {
    // Навешиваем onclick на кнопку "Назад"
    const backButtonWrapper = document.querySelector('#back-button-wb');
    if (backButtonWrapper) {
        const backButton = backButtonWrapper.querySelector('.button');
        if (backButton) {
            backButton.addEventListener('click', () => {
                console.log('Кнопка "Назад" нажата');
                window.history.back();
            });
        }
    }
}
