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

const pageContent = ref('')

// Загрузка контента страницы (FSD: pages/)
const loadPage = async (pageName: string) => {
    const response = await fetch(`/src/pages/${pageName}/index.html`)
    const html = await response.text()
    pageContent.value = html
    
    // Инициализация аналитики и валидации для страницы
    setTimeout(() => {
        initPageAnalytics(pageName);
        initFormValidation();  // Универсальная валидация форм
    }, 200)
}

// Определяем какую страницу загрузить
onMounted(() => {
    const path = window.location.pathname
    if (path.includes('login')) {
        loadPage('login')
    } else if (path.includes('signup')) {
        loadPage('signup')
    } else if (path.includes('forgot-password-sent')) {
        loadPage('forgot-password-sent')
    } else if (path.includes('forgot-password')) {
        loadPage('forgot-password')
    } else if (path.includes('reset-password-success')) {
        loadPage('reset-password-success')
    } else if (path.includes('reset-password-error')) {
        loadPage('reset-password-error')
    } else if (path.includes('reset-password')) {
        loadPage('reset-password')
    } else if (path.includes('wb-auth-confirm')) {
        loadPage('wb-auth-confirm')
    } else if (path.includes('wb-auth-register')) {
        loadPage('wb-auth-register')
    } else {
        loadPage('login')
    }
})
</script>
