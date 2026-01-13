<template>
    <div
        id="page-content"
        v-html="pageContent"
    ></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const pageContent = ref('')

// Загрузка контента страницы (FSD: pages/)
const loadPage = async (pageName: string) => {
    const response = await fetch(`/src/pages/${pageName}/index.html`)
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
</script>
