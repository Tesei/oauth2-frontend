/**
 * Функция хэширования для аналитики (из fun_and_sun проекта)
 * Двойное SHA-256 хэширование с солью
 */
export async function js_hash(input_value: string, salt: string): Promise<string> {
    // Шаг 1: конкатенация данных и соли
    const concat1 = input_value.concat(salt)

    // Шаг 2: первое SHA-256 хэширование
    const textAsBuffer = new TextEncoder().encode(concat1)
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer)

    // Шаг 3: преобразование в hex
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const sha256_hex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

    // Шаг 4: конкатенация sha256_hex и соли
    const concat2 = sha256_hex.concat(salt)

    // Шаг 5: второе SHA-256 хэширование
    const textAsBuffer2 = new TextEncoder().encode(concat2)
    const hashBuffer2 = await window.crypto.subtle.digest('SHA-256', textAsBuffer2)

    // Шаг 6: преобразование в hex (финальный результат)
    const hashArray2 = Array.from(new Uint8Array(hashBuffer2))
    const sha256_hex2 = hashArray2.map((b) => b.toString(16).padStart(2, '0')).join('')

    return sha256_hex2
}

/**
 * Хэширование email для аналитики
 */
export async function hashEmail(email: string): Promise<string> {
    return js_hash(email, 'T_I-*umiW#_FRuBrIfR0cr-Get')
}

/**
 * Хэширование phone для аналитики
 */
export async function hashPhone(phone: string): Promise<string> {
    return js_hash(phone, 'T_I-*umiW#_FRuBrIfR0cr-Get')
}
