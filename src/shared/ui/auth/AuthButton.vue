<template>
    <button
        :id="buttonId"
        :type="type"
        :class="['auth-button', `auth-button--${variant}`, `auth-button--${size}`, { 'auth-button--full': fullWidth }]"
        @click="handleClick"
    >
        {{ label }}
    </button>
</template>

<script setup lang="ts">
interface Props {
    label: string
    type?: 'button' | 'submit' | 'reset'
    buttonId?: string
    variant?: 'primary' | 'secondary'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
}

withDefaults(defineProps<Props>(), {
    type: 'button',
    buttonId: '',
    variant: 'primary',
    size: 'md',
    fullWidth: false,
})

const emit = defineEmits<{
    click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
    emit('click', event)
}
</script>

<style scoped>
.auth-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.auth-button--primary {
    background-color: #0066ff;
    color: white;
}

.auth-button--primary:hover {
    background-color: #0052cc;
}

.auth-button--secondary {
    background-color: #6c757d;
    color: white;
}

.auth-button--secondary:hover {
    background-color: #5a6268;
}

.auth-button--sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
}

.auth-button--lg {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
}

.auth-button--full {
    width: 100%;
}

/* Минимальные стили - легко заменяются на UI Kit */
</style>
