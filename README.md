# OAuth2 Frontend - FunSun Auth

Проект авторизации с использованием Vue 3 + TypeScript и веб-компонентов.

## 🏗️ Архитектура

### Гибридный подход:

**Header/Footer** - Vue компоненты (из @fun-sun/header, @fun-sun/footer)  
**Auth формы** - Веб-компоненты (из @fun-sun/vue-components)

### Структура (FSD):

```
src/
├── pages/login/          # Страница Login (HTML с веб-компонентами)
│   └── index.html
├── App.vue              # Главный компонент (Header + Main + Footer)
└── index.ts             # Точка входа (стили + экспорты)
```

## 🚀 Запуск

```bash
npm install
npm run dev  # http://localhost:5176/login
```

## 🎯 Как работает

### 1. index.html → App.vue
- Header (Vue компонент)
- Main с `<div v-html>` (загружает HTML страницы)
- Footer (Vue компонент)

### 2. pages/login/index.html
- Чистый HTML
- Веб-компоненты: `<web-input>`, `<web-button>`, `<web-checkbox>`
- Работают без Vue app!

## 📦 Веб-компоненты

Используются из `@fun-sun/vue-components`:

```html
<web-input
    name="LoginInput.Email"
    type="email"
    label="Email"
></web-input>

<web-button type="submit">Войти</web-button>

<web-checkbox
    name="RememberMe"
    label="Запомнить меня"
></web-checkbox>
```

## 📝 Создание новой страницы

```bash
# 1. Создай HTML в pages/
touch src/pages/signup/index.html

# 2. Используй веб-компоненты
<web-input name="Email" label="Email"></web-input>

# 3. Добавь роут в App.vue
if (path.includes('signup')) {
    loadPage('signup')
}
```

## 🔧 Команды

```bash
npm run dev        # Разработка
npm run build      # Сборка
npm run lint       # Проверка
npm run format     # Форматирование
```

---

**Статус:** Login страница готова с веб-компонентами ✅
