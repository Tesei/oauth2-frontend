<template>
    <div class="auth-checkbox">
        <label
            :for="checkboxId"
            class="auth-checkbox__label"
        >
            <input
                :id="checkboxId"
                type="checkbox"
                :name="name"
                :checked="modelValue"
                class="auth-checkbox__input"
                @change="handleChange"
            />
            <span class="auth-checkbox__text">{{ label }}</span>
        </label>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    modelValue?: boolean
    name?: string
    label: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    name: '',
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

const checkboxId = computed(() => {
    return `checkbox-${props.name || Math.random().toString(36).substr(2, 9)}`
})

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.checked)
}
</script>

<style scoped>
.auth-checkbox {
    margin-bottom: 1rem;
}

.auth-checkbox__label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
}

.auth-checkbox__input {
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
}

.auth-checkbox__text {
    user-select: none;
}

/* Минимальные стили - легко заменяются на UI Kit */
</style>
