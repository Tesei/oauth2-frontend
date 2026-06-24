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
    { path: '/old-forgot-password-sent', pageName: 'old-forgot-password-sent' },
    { path: '/old-forgot-password', pageName: 'old-forgot-password' },
    { path: '/old-reset-password-success', pageName: 'old-reset-password-success' },
    { path: '/old-reset-password-error', pageName: 'old-reset-password-error' },
    { path: '/old-reset-password', pageName: 'old-reset-password' },
    { path: '/old-wb-auth-register', pageName: 'old-wb-auth-register' },
    { path: '/old-wb-auth-confirm', pageName: 'old-wb-auth-confirm' },
    { path: '/old-signup', pageName: 'old-signup' },
    { path: '/login-otp', pageName: 'login-otp' },
    { path: '/old-login', pageName: 'old-login' },
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

        // Инициализация back-button с backUrl для login и old-login
        if (pageName === 'login' || pageName === 'old-login') {
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
