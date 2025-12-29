<template>
    <div class="auth-input">
        <input
            :id="inputId"
            :type="type"
            :name="name"
            :value="modelValue"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            :aria-required="required"
            class="auth-input__field"
            @input="handleInput"
        />
        <label
            :for="inputId"
            class="auth-input__label"
        >
            {{ label }}
        </label>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    modelValue?: string
    type?: string
    name?: string
    label: string
    placeholder?: string
    autocomplete?: string
    required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'text',
    name: '',
    placeholder: '',
    autocomplete: 'off',
    required: false,
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

let idCounter = 0
const inputId = computed(() => `input-${props.name || ++idCounter}`)

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}
</script>

<style scoped>
.auth-input {
    position: relative;
    margin-bottom: 1rem;
}

.auth-input__field {
    width: 100%;
    padding: 1rem 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s;
}

.auth-input__field:focus {
    border-color: #0066ff;
}

.auth-input__label {
    position: absolute;
    top: 1rem;
    left: 0.75rem;
    padding: 0 0.25rem;
    background: white;
    color: #666;
    pointer-events: none;
    transition: all 0.2s;
    transform-origin: left top;
}

.auth-input__field:focus ~ .auth-input__label,
.auth-input__field:not(:placeholder-shown) ~ .auth-input__label {
    top: -0.5rem;
    left: 0.5rem;
    font-size: 0.875rem;
    color: #0066ff;
}

/* Минимальные стили - легко заменяются на UI Kit */
</style>
