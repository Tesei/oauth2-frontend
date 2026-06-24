// Глобальные типы для TypeScript

// Расширяем интерфейс Window для dataLayer
declare global {
    interface Window {
        dataLayer: any[]
    }
}

export {}
