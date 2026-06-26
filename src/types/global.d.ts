// Глобальные типы для TypeScript

// Расширяем интерфейс Window для dataLayer
declare global {
    interface Window {
        dataLayer: any[]
        __gtmLoaded?: boolean
        FunSunCookieConsent?: {
            hasConsent: () => boolean
            accept: () => void
            initBanner: () => void
        }
    }
}

export {}
