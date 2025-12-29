<template>
    <div
        id="demo-app"
        class="container"
    >
        <h1>🎨 Vue Components Demo</h1>
        <p>Демонстрация компонентов. Реальные страницы в <code>/pages/</code></p>

        <div class="demo-section">
            <h2>AuthInput</h2>
            <auth-input
                v-model="email"
                type="email"
                label="Email"
                placeholder="test@example.com"
            />
            <p>
                Значение: <code>{{ email }}</code>
            </p>
        </div>

        <div class="demo-section">
            <h2>AuthButton</h2>
            <auth-button
                label="Primary"
                variant="primary"
                @click="showAlert('Primary clicked')"
            />
            <auth-button
                label="Secondary"
                variant="secondary"
                @click="showAlert('Secondary clicked')"
            />
        </div>

        <div class="demo-section">
            <h2>AuthCheckbox</h2>
            <auth-checkbox
                v-model="checked"
                label="Запомнить меня"
            />
            <p>
                Значение: <code>{{ checked }}</code>
            </p>
        </div>

        <hr />
        <p class="text-muted">
            Полная страница Login: <a href="/pages/login.html">http://localhost:5173/pages/login.html</a>
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const checked = ref(false)

const showAlert = (msg: string) => {
    // eslint-disable-next-line no-alert
    alert(msg)
}
</script>

<style scoped>
.demo-section {
    margin: 2rem 0;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
}
code {
    background: #f5f5f5;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
}
</style>
