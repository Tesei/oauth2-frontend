/**
 * Главный обработчик аналитики для страниц
 * Загружает модули аналитики для каждой страницы
 *
 * Хэширование импортируется из ./hash.ts при необходимости
 */
export function initPageAnalytics(pageName: string) {
    console.log('Инициализация аналитики для:', pageName)

    // Reset Password Success
    if (pageName === 'reset-password-success') {
        console.log('Загружаем модуль аналитики для reset-password-success')
        import('../../pages/reset-password-success/analytics')
            .then((module) => {
                console.log('Модуль загружен, вызываем функцию')
                setTimeout(() => {
                    module.initResetPasswordSuccessAnalytics()
                }, 200)
            })
            .catch((err) => {
                console.error('Ошибка загрузки модуля:', err)
            })
    }

    // Forgot Password
    if (pageName === 'forgot-password') {
        import('../../pages/forgot-password/analytics').then((module) => {
            setTimeout(() => {
                module.initForgotPasswordAnalytics()
            }, 200)
        })
    }

    // Forgot Password Sent (Письмо отправлено)
    if (pageName === 'forgot-password-sent') {
        console.log('Загружаем модуль аналитики для forgot-password-sent')
        import('../../pages/forgot-password-sent/analytics')
            .then((module) => {
                console.log('Модуль загружен')
                setTimeout(() => {
                    module.initForgotPasswordSentAnalytics()
                }, 200)
            })
            .catch((err) => {
                console.error('Ошибка загрузки модуля:', err)
            })
    }
}
