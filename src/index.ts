// Импорт стилей из пакетов (как в их проектах)
import '@fun-sun/ui-tokens/css'
import '@fun-sun/ui-kit/web-components.css'

// Глобальные стили
import './shared/config/styles.css'
import './shared/config/back-button.css'

// Импорт стилей страниц (FSD)
import './pages/login/styles.css'
// import './pages/signup/styles.css'
// import './pages/forgot-password/styles.css'
// import './pages/forgot-password-sent/styles.css'
// import './pages/reset-password/styles.css'
// import './pages/reset-password-success/styles.css'
// import './pages/reset-password-error/styles.css'
// import './pages/wb-auth-confirm/styles.css'
// import './pages/wb-auth-register/styles.css'

// Экспорты директив
export { vOutside } from '@fun-sun/ui-kit/directives'

// Экспорты веб-компонентов (для использования в коде)
export * from '@fun-sun/ui-kit/web-components'
