/**
 * OIDC автоматическая проверка и обновление токенов
 * Работает под капотом на каждой странице
 * Скопировано из fun_and_sun/resources/js/plugins/oidc.js
 */

import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

// Конфигурация OIDC из переменных окружения
// OAuth2 Authorization Code + PKCE Flow

// Базовый URL провайдера
const authority = import.meta.env.VITE_OIDC_AUTHORITY || 'https://auth2.fstravel.com'

const oidcConfig = {
    // Базовый URL провайдера
    authority: authority,

    // Client ID для клиента fstravelcom
    client_id: import.meta.env.VITE_OIDC_CLIENT_ID || 'fstravelcom',

    // URL для редиректа после авторизации
    redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI || `${window.location.origin}/oidc/callback`,

    // URL для редиректа после выхода
    post_logout_redirect_uri: import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI || `${window.location.origin}/`,

    // Scopes (разрешения)
    scope: import.meta.env.VITE_OIDC_SCOPE || 'openid',

    // Authorization Code flow (PKCE включен автоматически в oidc-client-ts)
    response_type: 'code',

    // Автоматическое обновление токена
    automaticSilentRenew: true,
    includeIdTokenInSilentRenew: true,

    // За сколько секунд до истечения токена начинать обновление
    accessTokenExpiringNotificationTimeInSeconds: parseInt(import.meta.env.VITE_OIDC_TOKEN_RENEW_TIME || '30'),

    // Хранилище состояния
    userStore: new WebStorageStateStore({ store: window.localStorage }),

    // Дополнительные настройки
    loadUserInfo: false,
    filterProtocolClaims: true,

    // Указываем endpoints вручную
    metadata: {
        issuer: authority,
        authorization_endpoint: `${authority}/connect/authorize`,
        token_endpoint: `${authority}/connect/token`,
        userinfo_endpoint: `${authority}/connect/userinfo`,
        end_session_endpoint: `${authority}/connect/endsession`,
    },
}

let userManager: UserManager | null = null

/**
 * Инициализация OIDC UserManager
 */
function initOidc(): UserManager | null {
    if (!oidcConfig.authority || !oidcConfig.client_id) {
        return null
    }

    if (!userManager) {
        userManager = new UserManager(oidcConfig)

        // События для автоматического обновления токенов
        userManager.events.addUserLoaded((user) => {
            console.log('OIDC: Пользователь загружен', user)
        })

        userManager.events.addAccessTokenExpiring(() => {
            console.log('OIDC: Токен скоро истечет, обновляем...')
        })

        userManager.events.addAccessTokenExpired(() => {
            console.log('OIDC: Токен истек')
            userManager?.signinSilent().catch(() => {
                userManager?.removeUser().catch(() => {})
            })
        })

        userManager.events.addSilentRenewError((error) => {
            console.error('OIDC: Ошибка автоматического обновления токена', error)
            userManager?.removeUser().catch(() => {})
        })
    }

    return userManager
}

/**
 * Проверяет наличие токена и обновляет его если нужно
 */
export async function checkAndRefreshToken() {
    if (!oidcConfig.authority || !oidcConfig.client_id) {
        return null
    }

    try {
        const manager = initOidc()
        if (!manager) return null

        // Получаем текущего пользователя
        let user = await manager.getUser()

        if (user) {
            if (user.expired) {
                // Токен истек, пытаемся обновить через silent renew
                try {
                    user = await manager.signinSilent()
                    return user
                } catch (error) {
                    console.error('OIDC: Не удалось обновить токен', error)
                    return null
                }
            } else {
                // Токен валиден
                return user
            }
        }
    } catch (error) {
        console.debug('OIDC: Пользователь не авторизован или ошибка getUser', error)
        return null
    }

    return null
}

/**
 * Получить текущий access token
 */
export async function getAccessToken(): Promise<string | null> {
    if (!oidcConfig.authority || !oidcConfig.client_id) {
        return null
    }

    try {
        const manager = initOidc()
        if (!manager) return null

        const user = await manager.getUser()
        if (user && !user.expired) {
            return user.access_token
        }
    } catch (error) {
        console.debug('OIDC: Не удалось получить access token', error)
    }

    return null
}

/**
 * Инициирует вход через OIDC (редирект на страницу авторизации)
 */
export async function signinOidc() {
    if (!oidcConfig.authority || !oidcConfig.client_id) {
        throw new Error('OIDC не настроен')
    }

    try {
        // Сохраняем текущий URL для возврата после авторизации
        const currentUrl = window.location.pathname + window.location.search
        sessionStorage.setItem('oidc_return_url', currentUrl)

        const manager = initOidc()
        if (manager) {
            await manager.signinRedirect()
        }
    } catch (error) {
        console.error('OIDC signin error:', error)
        throw error
    }
}

/**
 * Обработка callback после редиректа от OIDC провайдера
 */
export async function handleOidcCallback() {
    try {
        const manager = initOidc()
        if (!manager) {
            throw new Error('Не удалось инициализировать OIDC')
        }

        const user = await manager.signinRedirectCallback()

        // Получаем сохраненный URL для возврата
        const returnUrl = sessionStorage.getItem('oidc_return_url')
        if (returnUrl) {
            sessionStorage.removeItem('oidc_return_url')
        }

        return { user, returnUrl }
    } catch (error) {
        console.error('OIDC callback error:', error)
        throw error
    }
}

/**
 * Выход из системы
 */
export async function signoutOidc() {
    try {
        // Сохраняем текущий URL для возврата после разлогина
        const currentUrl = window.location.pathname + window.location.search
        sessionStorage.setItem('oidc_signout_return_url', currentUrl)

        const postLogoutRedirectUri = oidcConfig.post_logout_redirect_uri || `${window.location.origin}/`

        // Формируем URL для разлогина
        const logoutUrl = `${oidcConfig.authority}/connect/logout?client_id=${encodeURIComponent(oidcConfig.client_id)}&post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`

        // Редирект на endpoint разлогина
        window.location.href = logoutUrl
    } catch (error) {
        console.error('OIDC signout error:', error)
        throw error
    }
}

/**
 * Проверка авторизации пользователя
 */
export async function isAuthenticated(): Promise<boolean> {
    try {
        const manager = initOidc()
        if (!manager) return false

        const user = await manager.getUser()
        return user !== null && !user.expired
    } catch (error) {
        console.debug('OIDC: Ошибка проверки авторизации', error)
        return false
    }
}

// Экспортируем для возможности ручной инициализации
export { initOidc, userManager }
