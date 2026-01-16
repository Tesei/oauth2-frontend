# OAuth2 Frontend - Техническая документация

Проект авторизации для интеграции в ASP.NET Core с использованием Vue 3, TypeScript и веб-компонентов.

---

## 🚀 Быстрый старт (для тестеров)

### Требования:
- **Node.js:** v22.21.1 (или >= 18.0.0)
- **npm:** 10.x

### Команды:
```bash
# 1. Клонировать проект
git clone <repository-url>
cd oauth2-frontend

# 2. Установить зависимости
npm install

# 3. Запустить dev сервер
npm run dev
```

### Доступные страницы:
- http://localhost:5174/login - Вход
- http://localhost:5174/signup - Регистрация
- http://localhost:5174/forgot-password - Восстановление пароля
- http://localhost:5174/reset-password - Изменение пароля (форма)
- http://localhost:5174/reset-password-success - Успешное изменение
- http://localhost:5174/reset-password-error - Ошибка изменения

### Файлы для просмотра:
- `src/pages/login/index.html` - Login страница
- `src/pages/signup/index.html` - Signup страница
- `dist/` - Скомпилированные файлы для бэкенда

---

## 🚀 Быстрый старт (для разработчиков)

---

## 🏗️ Архитектура проекта

### Гибридный подход (3 независимых приложения)

Проект использует **3 отдельных Vue приложения**, которые монтируются в разные контейнеры:

```
┌────────────────────────────────────┐
│  <header id="header">              │ ← HeaderApp (Vue)
│    @fun-sun/header                 │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│  <main id="main">                  │ ← MainApp (Vue)
│    └── загружает HTML              │
│        └── веб-компоненты          │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│  <footer id="footer">              │ ← FooterApp (Vue)
│    @fun-sun/footer                 │
└────────────────────────────────────┘
```

**Почему так:**
- **Header/Footer** - сложные (меню, поиск, корзина) → используем готовые Vue компоненты из npm
- **Main (формы)** - простые, часто меняются → используем веб-компоненты (работают из HTML)

---

## 📂 Структура проекта (FSD)

```
oauth2-frontend/
├── index.html              # Точка входа (3 Vue app)
│
├── src/
│   ├── pages/             # Страницы (HTML + веб-компоненты)
│   │   └── login/
│   │       └── index.html # Login страница
│   │
│   ├── App.vue            # Компонент загрузки страниц
│   ├── index.ts           # Главный файл (стили + экспорты)
│   │
│   └── shared/            # Переиспользуемый код
│       ├── config/        # Конфигурация
│       │   └── styles.css # Глобальные стили
│       └── ui/icons/      # SVG иконки
│
├── public/                # Статические файлы
│   ├── icons/            # SVG иконки соцсетей
│   └── css/              # CSS Header/Footer
│
├── original-templates/    # Reference CSHTML файлы
│
└── package.json          # Зависимости
```

---

## 🔄 Как работает (пошагово)

### 1. Браузер открывает `index.html`

```html
<body>
    <header id="header"></header>
    <main id="main"></main>
    <footer id="footer"></footer>
    
    <script type="module">
        // Создается 3 Vue приложения
    </script>
</body>
```

### 2. Создаются 3 Vue приложения

```javascript
// Header app
const headerApp = createApp(HeaderBlock, { locale: 'ru' })
headerApp.mount('#header')

// Main app (загружает HTML)
const mainApp = createApp(App)
mainApp.mount('#main')

// Footer app
const footerApp = createApp(AppFooter)
footerApp.mount('#footer')
```

### 3. Main загружает HTML страницу

```javascript
// App.vue
fetch('/src/pages/login/index.html')
    .then(html => вставляет в DOM)
```

### 4. Веб-компоненты работают автоматически

```html
<!-- pages/login/index.html -->
<web-input name="Email" />   ← Работает сразу!
<web-button>Войти</web-button>
```

**Не нужен Vue app!** Веб-компоненты автоматически регистрируются при импорте!

---

## 📦 Веб-компоненты

### Что это?

**Веб-компоненты** - это кастомные HTML теги (как `<input>`, `<button>`, но свои).

Работают **прямо из HTML** без необходимости создавать Vue приложение!

### Доступные компоненты

Из пакета `@fun-sun/vue-components`:

```html
<!-- Поля ввода -->
<web-input type="email" label="Email" name="Email" />
<web-input-password label="Пароль" name="Password" />

<!-- Кнопка -->
<web-button class="button_yellow">Войти</web-button>

<!-- Чекбокс -->
<web-checkbox label="Запомнить меня" name="RememberMe" />
```

### Передача данных

**Все через HTML атрибуты:**

```html
<web-input
    name="LoginInput.Email"      ← Имя для формы
    label="Email"                ← Текст лейбла
    placeholder="test@mail.com"  ← Плейсхолдер
    value="john@example.com"     ← Значение
    error-text="Неверный email"  ← Текст ошибки
    disabled                     ← Заблокировать
    required                     ← Обязательное поле
/>
```

---

## 🎨 Стили

### Подключены автоматически

Все стили импортируются в `src/index.ts`:

```typescript
import '@fun-sun/vue-components/vue-components.css'  // Стили компонентов
import '@fun-sun/vue-components/web-components.css'  // Стили веб-компонентов
import '@fun-sun/style/dist/style.css'               // UI Kit базовые стили
```

### Утилитарные классы

Из `@fun-sun/style` доступны готовые классы:

```html
<!-- Цвета -->
<div class="bg-black c-white">Черный фон, белый текст</div>
<a class="c-cornflower">Синяя ссылка</a>

<!-- Отступы -->
<div class="mt-8 mb-16 px-24">margin-top: 8px, margin-bottom: 16px, padding: 0 24px</div>

<!-- Размеры -->
<button class="w-100p">width: 100%</button>

<!-- Радиусы -->
<div class="radius-12">border-radius: 12px</div>

<!-- Кнопки -->
<web-button class="button_yellow">Желтая кнопка</web-button>
<web-button class="button_transparent">Прозрачная кнопка</web-button>
```

### Кастомные стили страниц

Каждая страница может иметь свои стили внутри `<style>`:

```html
<!-- pages/login/index.html -->
<div class="login-card">...</div>

<style>
    .login-card {
        background: white;
        border-radius: 16px;
        padding: 40px;
    }
</style>
```

---

## 📝 Создание новой страницы

### Шаг 1: Создай HTML файл

```bash
mkdir -p src/pages/signup
touch src/pages/signup/index.html
```

### Шаг 2: Напиши разметку с веб-компонентами

```html
<!-- src/pages/signup/index.html -->
<div class="signup-container">
    <h2>Регистрация</h2>
    
    <div class="signup-card">
        <form method="post">
            <web-input
                name="Email"
                type="email"
                label="Email"
                required
            />
            
            <web-input-password
                name="Password"
                label="Пароль"
                required
            />
            
            <web-button
                type="submit"
                class="button_yellow w-100p"
            >
                Зарегистрироваться
            </web-button>
</form>
    </div>
</div>

<style>
    .signup-container { /* стили */ }
    .signup-card { /* стили */ }
</style>
```

### Шаг 3: Добавь роут в App.vue

```typescript
// src/App.vue
onMounted(() => {
    const path = window.location.pathname
    if (path.includes('login')) {
        loadPage('login')
    } else if (path.includes('signup')) {
        loadPage('signup')  // ← Добавить
    }
})
```

### Шаг 4: Добавь роут в Router (index.html)

```javascript
const router = createRouter({
    routes: [
        { path: '/login', component: { template: '<div></div>' } },
        { path: '/signup', component: { template: '<div></div>' } }  // ← Добавить
    ]
})
```

### Шаг 5: Открой в браузере

```
http://localhost:5174/signup
```

---

## 🔗 Интеграция с CSHTML

### Как передавать данные из бэкенда

Веб-компоненты работают через HTML атрибуты:

```cshtml
@page
@model LoginModel

<web-input
    name="LoginInput.Email"
    label="@Localizer["EmailLabel"]"           ← Переводы
    value="@Model.Email"                       ← Значение от модели
    error-text="@Model.Errors.Email"           ← Ошибки валидации
    placeholder="@Localizer["EmailPlaceholder"]"
/>

<web-button
    type="submit"
    class="button_yellow w-100p"
    disabled="@Model.IsSubmitting"             ← Динамическое состояние
    loading="@Model.IsLoading"
>
    @Localizer["LoginButton"]                  ← Перевод текста
</web-button>
```

### Dynamic External Providers

```cshtml
@foreach (var provider in Model.ExternalLogins.Schemes)
{
    <web-button
        name="provider"
        value="@provider.Name"
        class="bg-black c-white radius-12"
    >
        <span>Войти с</span>
        <img src="/icons/@(provider.Name.ToLower()).svg" />
    </web-button>
}
```

---

## 🛠️ Разработка

### Команды

```bash
npm run dev        # Dev сервер с hot reload
npm run build      # Production сборка
npm run preview    # Просмотр production сборки
npm run lint       # ESLint проверка
npm run lint:fix   # ESLint автоисправление
npm run format     # Prettier форматирование
```

### Правила кода

**ESLint:**
- `indent: 4` (4 пробела)
- `quotes: 'single'` (одинарные кавычки)
- `semi: never` (без точек с запятой)

**Prettier:**
- `tabWidth: 4`
- `singleQuote: true`
- `singleAttributePerLine: true`

### Hot Reload

При изменении файлов проект автоматически перезагружается:
- `src/**/*.vue` - Vue компоненты
- `src/**/*.ts` - TypeScript файлы
- `src/pages/**/*.html` - HTML страницы (через Ctrl+R в браузере)

---

## 🔧 Настройка пакетов @fun-sun

### Переустановка пакета (если нужна новая версия)

```bash
# 1. Удалить из package.json строку
"@fun-sun/style": "^1.0.3"

# 2. Удалить папку
rm -rf node_modules/@fun-sun/style

# 3. Установить заново
npm install @fun-sun/style@latest
```

### Обновление всех пакетов

```bash
npm install @fun-sun/header@latest @fun-sun/footer@latest @fun-sun/style@latest @fun-sun/vue-components@latest
```

---

## 📋 Структура файлов

### index.html - точка входа

Создает 3 Vue приложения и монтирует их:

```javascript
const headerApp = createApp(HeaderBlock, { locale: 'ru' })
const mainApp = createApp(App)
const footerApp = createApp(AppFooter)

headerApp.mount('#header')
mainApp.mount('#main')
footerApp.mount('#footer')
```

### App.vue - загрузчик HTML

Загружает HTML страницы через fetch:

```vue
<template>
    <div v-html="pageContent"></div>
</template>

<script setup>
const loadPage = async (name) => {
    const html = await fetch(`/src/pages/${name}/index.html`)
    pageContent.value = await html.text()
}
</script>
```

### pages/*/index.html - страницы

HTML файлы с веб-компонентами и стилями:

```html
<div class="page-container">
    <web-input />
    <web-button />
</div>

<style>
    .page-container { /* стили */ }
</style>
```

---

## 🎯 Принципы работы

### Почему 3 отдельных приложения?

**Проблема:** Vue при `mount` **ЗАМЕНЯЕТ** содержимое контейнера.

**Решение:** 3 независимых контейнера → Header/Footer не перерисовываются при смене Main!

### Почему веб-компоненты для форм?

**Проблема:** Vue компоненты **не работают из чистого HTML** (нужен Vue app).

**Решение:** Веб-компоненты = обычные HTML теги → работают везде!

```html
<!-- Работает в любом HTML! -->
<web-input name="Email" />
```

**Для CSHTML:** Бэкенд может легко передавать данные через атрибуты!

---


## 🐛 Частые проблемы

### Header/Footer не отображаются

**Причина:** Не переданы обязательные props

**Решение:**
```javascript
const headerApp = createApp(HeaderBlock, {
    locale: 'ru'  // Обязательно!
})
```

## 🎯 Статус проекта

- ✅ Архитектура настроена
- ✅ Header/Footer интегрированы
- ✅ Веб-компоненты работают
- ✅ Login страница готова
- ⏳ Signup страница
- ⏳ ForgotPassword страница
- ⏳ Остальные страницы

---

**Проект готов к разработке и демонстрации!** 🚀
