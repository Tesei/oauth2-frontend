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
    { path: '/login-otp', pageName: 'login-otp' },
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

        // Инициализация back-button с backUrl только для login
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
