// Импорт стилей из пакетов (как в их проектах)
import '@fun-sun/ui-tokens/css'
import '@fun-sun/ui-kit/web-components.css'

// Глобальные стили
import './shared/config/styles.css'
import './shared/config/back-button.css'

// Импорт стилей страниц (FSD)
import './pages/login/styles.css'
import './pages/login-otp/styles.css'
import './pages/old-login/styles.css'
import './pages/old-signup/styles.css'
import './pages/old-forgot-password/styles.css'
import './pages/old-forgot-password-sent/styles.css'
import './pages/old-reset-password/styles.css'
import './pages/old-reset-password-success/styles.css'
import './pages/old-reset-password-error/styles.css'
import './pages/old-wb-auth-confirm/styles.css'
import './pages/old-wb-auth-register/styles.css'

// Экспорты директив
export { vOutside } from '@fun-sun/ui-kit/directives'

// Экспорты веб-компонентов (для использования в коде)
export * from '@fun-sun/ui-kit/web-components'
