/**
 * Обработчики аналитики для страниц
 * Этот файл выполняется через import в App.vue (работает в dev режиме)
 */

// Функция хэширования
async function js_hash(input_value: string, salt: string): Promise<string> {
    const concat1 = input_value.concat(salt);
    const textAsBuffer = new TextEncoder().encode(concat1);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const sha256_hex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    
    const concat2 = sha256_hex.concat(salt);
    const textAsBuffer2 = new TextEncoder().encode(concat2);
    const hashBuffer2 = await window.crypto.subtle.digest('SHA-256', textAsBuffer2);
    const hashArray2 = Array.from(new Uint8Array(hashBuffer2));
    const sha256_hex2 = hashArray2.map((b) => b.toString(16).padStart(2, '0')).join('');
    
    return sha256_hex2;
}

/**
 * Главный обработчик аналитики
 * Загружает модули аналитики для каждой страницы
 */
export function initPageAnalytics(pageName: string) {
    console.log('Инициализация аналитики для:', pageName);
    
    // Reset Password Success
    if (pageName === 'reset-password-success') {
        import('../../pages/reset-password-success/analytics').then(module => {
            setTimeout(() => {
                module.initResetPasswordSuccessAnalytics();
            }, 200);
        });
    }
    
    // Forgot Password
    if (pageName === 'forgot-password') {
        import('../../pages/forgot-password/analytics').then(module => {
            setTimeout(() => {
                module.initForgotPasswordAnalytics();
            }, 200);
        });
    }
}
