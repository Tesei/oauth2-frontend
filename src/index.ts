// Импорт стилей из пакетов (как в их проектах)
import '@fun-sun/vue-components/vue-components.css'
import '@fun-sun/style/dist/style.css'

// Экспорты Header и Footer
export { HeaderBlock } from '@fun-sun/header'
export { AppFooter } from '@fun-sun/footer'

// Экспорты директив
export { vOutside } from '@fun-sun/vue-components/directives'

// Экспорты из shared (наши компоненты)
export * from './shared'
