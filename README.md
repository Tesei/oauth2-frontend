# FunSun Auth - Vue 3 + TypeScript

Vue компоненты для CSHTML шаблонов.

## 🚀 Запуск

```bash
npm install
npm run dev
```

Откроется: **http://localhost:5175/login** (или другой порт)

## 📂 Финальная структура (чистая)

```
dev/
├── public/
│   ├── index.html           # 🎯 ГЛАВНЫЙ HTML (header/footer/Vue)
│   └── pages/content/       # Контент страниц (без header/footer)
│       └── login.html       # Контент Login
│
├── src/
│   ├── shared/ui/auth/      # Vue компоненты
│   │   ├── AuthInput.vue
│   │   ├── AuthButton.vue
│   │   └── AuthCheckbox.vue
│   └── App.vue              # Демо (http://localhost:5175/)
│
└── original-templates/       # Reference CSHTML
```

## 🎯 Архитектура

```
public/index.html (главный)
├── <header>                    ← Header (один раз)
├── <div id="page-content">     ← Контент загружается сюда
│   └── content/login.html      ← Только контент (без header/footer)
└── <footer>                    ← Footer (один раз)
```

## 📝 Создание новой страницы

```bash
# 1. Создай контент
touch public/pages/content/signup.html
```

```html
<!-- signup.html - только контент -->
<h1>Регистрация</h1>
<form @submit.prevent="handleSignupSubmit">
    <auth-input v-model="signupData.email" label="Email" />
    <auth-button type="submit" label="Зарегистрироваться" />
</form>
```

```javascript
// 2. Добавь данные в index.html
signupData: { email: '', password: '' }

// 3. Добавь роут в index.html
else if (path.includes('signup')) {
    loadPage('signup')
}
```

## 🔌 Добавление Header/Footer из npm

В `public/index.html` (один раз):

```javascript
import { Header, Footer } from 'ваш-ui-kit'
app.component('AppHeader', Header)
app.component('AppFooter', Footer)
```

Замени:
```html
<header>...</header>  →  <app-header />
<footer>...</footer>  →  <app-footer />
```

**Все страницы обновятся автоматически!** 🎉

## 📋 Команды

```bash
npm run dev        # Разработка
npm run build      # Сборка
npm run format     # Prettier
```

---

**Чисто и минимально!** ✨
