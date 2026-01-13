<template>
    <div>
        <!-- Main Content -->
        <div class="container">
            <slot>
            </slot>
            <main
                role="main"
                class="pb-1"
            >
                <div
                    id="page-content"
                    v-html="pageContent"
                ></div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Данные для форм
const loginData = ref({
    email: '',
    password: '',
    rememberMe: false,
})

const signupData = ref({
    email: '',
    password: '',
    confirmPassword: '',
})

const pageContent = ref('')

// Методы
const handleLoginSubmit = () => {
    console.log('Login:', loginData.value)
    // eslint-disable-next-line no-alert
    alert(`Email: ${loginData.value.email}`)
}

const handleSignupSubmit = () => {
    console.log('Signup:', signupData.value)
    // eslint-disable-next-line no-alert
    alert(`Email: ${signupData.value.email}`)
}

// Загрузка контента страницы
const loadPage = async (pageName: string) => {
    const response = await fetch(`/pages/${pageName}.html`)
    const html = await response.text()
    pageContent.value = html
}

// Определяем какую страницу загрузить
onMounted(() => {
    const path = window.location.pathname
    if (path.includes('login')) {
        loadPage('login')
    } else if (path.includes('signup')) {
        loadPage('signup')
    } else {
        loadPage('login')
    }
})

// Экспортируем для использования в HTML контенте
;(window as any).handleLoginSubmit = handleLoginSubmit
;(window as any).handleSignupSubmit = handleSignupSubmit
;(window as any).loginData = loginData
;(window as any).signupData = signupData
</script>
