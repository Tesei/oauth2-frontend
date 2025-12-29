import { createApp } from 'vue'
import './shared/config/styles.css'
import DemoApp from './App.vue'

// Импортируем компоненты
import AuthInput from './shared/ui/auth/AuthInput.vue'
import AuthButton from './shared/ui/auth/AuthButton.vue'
import AuthCheckbox from './shared/ui/auth/AuthCheckbox.vue'

// Создаем приложение для демо
const app = createApp(DemoApp)

// Регистрируем компоненты
app.component('AuthInput', AuthInput)
app.component('AuthButton', AuthButton)
app.component('AuthCheckbox', AuthCheckbox)

// Монтируем (только для http://localhost:5173/ - демо)
app.mount('#app')
