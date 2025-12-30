# FunSun Auth - Vue 3 + TypeScript

Vue компоненты для интеграции в ASP.NET Core CSHTML шаблоны.

## 🚀 Запуск

```bash
npm install
npm run dev
```

Откроется: **http://localhost:5173/login**

## 📂 Структура проекта

```
oauth2-frontend/
├── index.html              # 🎯 Главный HTML (header/footer/Vue app)
├── pages/                  # Контент страниц
│   └── login.html         # Контент Login (без header/footer)
│
├── src/shared/ui/auth/    # Vue компоненты
│   ├── AuthInput.vue
│   ├── AuthButton.vue
│   └── AuthCheckbox.vue
│
└── original-templates/     # Reference CSHTML файлы
```

## 🎯 Архитектура

### Главный файл - `index.html`:
- Header (один раз)
- `<div id="page-content">` - сюда загружается контент
- Footer (один раз)
- Vue app инициализация

### Контент страниц - `pages/*.html`:
- Только контент (без header/footer)
- Vue компоненты
- Логика формы

## 📝 Создание новой страницы

### Шаг 1: Создай файл контента
```bash
touch pages/signup.html
```

### Шаг 2: Напиши контент
```html
<!-- pages/signup.html -->
<h1>Регистрация</h1>
<form @submit.prevent="handleSignupSubmit">
    <auth-input v-model="signupData.email" label="Email" />
    <auth-button type="submit" label="Зарегистрироваться" />
</form>
```

### Шаг 3: Добавь данные в `index.html`
```javascript
signupData: {
    email: '',
    password: ''
}
```

### Шаг 4: Добавь роут в `index.html`
```javascript
else if (path.includes('signup')) {
    loadPage('signup')
}
```

## 🔌 Интеграция Header/Footer из npm

В `index.html`:
```javascript
import { Header, Footer } from '@fun-sun/vue-components'
app.component('AppHeader', Header)
app.component('AppFooter', Footer)
```

Замени:
```html
<header>...</header>  →  <app-header />
<footer>...</footer>  →  <app-footer />
```

## 📋 Команды

```bash
npm run dev        # Разработка
npm run build      # Сборка
npm run lint       # Проверка кода
npm run format     # Форматирование
```

## 💡 Доступные компоненты

### AuthInput
```html
<auth-input 
    v-model="data.field"
    type="email"
    label="Email"
/>
```

### AuthButton
```html
<auth-button
    type="submit"
    label="Войти"
    variant="primary"
/>
```

### AuthCheckbox
```html
<auth-checkbox
    v-model="data.flag"
    label="Запомнить меня"
/>
```

---

**Проект готов к разработке!** 🎉
