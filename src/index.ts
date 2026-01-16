// Импорт стилей из пакетов (как в их проектах)
import '@fun-sun/vue-components/vue-components.css'
import '@fun-sun/vue-components/web-components.css'
import '@fun-sun/style/dist/style.css'

// Импорт стилей страниц (FSD)
import './pages/login/styles.css'
import './pages/signup/styles.css'
import './pages/forgot-password/styles.css'
import './pages/reset-password/styles.css'
import './pages/reset-password-success/styles.css'
import './pages/reset-password-error/styles.css'

// Экспорты Header и Footer
export { HeaderBlock } from '@fun-sun/header'
export { AppFooter } from '@fun-sun/footer'

// Экспорты директив
export { vOutside } from '@fun-sun/vue-components/directives'

// Экспорты веб-компонентов (для использования в коде)
export * from '@fun-sun/vue-components/web-components'
