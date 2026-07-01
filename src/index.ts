// Импорт стилей из пакетов (как в их проектах)
import '@fun-sun/ui-tokens/css'
import '@fun-sun/ui-kit/web-components.css'

// Глобальные стили
import './shared/config/styles.css'
import './shared/config/back-button.css'

// Импорт стилей страниц (FSD)
import './pages/login/styles.css'
import './pages/login-otp-email/styles.css'
import './pages/login-otp-phone/styles.css'
import './pages/login-otp-resend-email/styles.css'
import './pages/login-otp-resend-phone/styles.css'
import './pages/login-otp-resend-phone-and-email/styles.css'
import './pages/login-otp-resend-phone-and-sms/styles.css'
import './pages/login-otp-resend-sms/styles.css'
import './pages/login-otp-resend-support-and-email/styles.css'
import './pages/conferme-email/styles.css'

// Экспорты директив
export { vOutside } from '@fun-sun/ui-kit/directives'

// Экспорты веб-компонентов (для использования в коде)
export * from '@fun-sun/ui-kit/web-components'
