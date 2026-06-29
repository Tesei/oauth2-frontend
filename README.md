# OAuth2 Frontend

Фронтенд проекта авторизации для интеграции с ASP.NET Core/Razor Pages.

Основная задача репозитория — хранить source-of-truth разметку страниц авторизации в `src/pages/*/index.html`, собирать web-components UI и генерировать итоговые `*.cshtml` для backend.

## Технологии

- Vue 3 + TypeScript + Vite
- Web Components из `@fun-sun/ui-kit`
- Дизайн-токены и спрайты из `@fun-sun/ui-tokens`
- CSHTML-шаблоны для ASP.NET Core

## Актуальная архитектура

- `src/pages/*/index.html` — source-of-truth HTML-страниц
- `src/pages/*/styles.css` — page-level стили
- `src/App.vue` — загрузка нужной страницы по `pathname`
- `src/index.ts` — подключение токенов, web-components CSS и page styles
- `cshtml-ready/` — итоговые backend-файлы (результат генерации)
- `cshtml-templates/` — reference-паттерны (ручные примеры Razor, не источник разметки)
- `scripts/generate-cshtml.mjs` — генерация `cshtml-ready/*.cshtml` из `src/pages`

## Структура

```text
oauth2-frontend/
├── cshtml-ready/                    # итоговые .cshtml для backend
├── cshtml-templates/              # reference-паттерны Razor
├── public/
│   ├── css/ui-tokens.css          # копия из @fun-sun/ui-tokens
│   ├── icons/                     # иконки и sprite
│   ├── form-validator.js
│   ├── back-button-handler-oidc.js
│   └── login-analytics.js
├── scripts/
│   └── generate-cshtml.mjs        # генерация cshtml из src/pages
├── src/
│   ├── pages/
│   │   ├── login/
│   │   │   ├── index.html
│   │   │   ├── styles.css
│   │   │   ├── analytics.ts
│   │   │   └── back-button-handler.ts
│   │   └── login-otp/
│   │       ├── index.html
│   │       └── styles.css
│   ├── shared/
│   ├── App.vue
│   └── index.ts
├── index.html
├── vite.config.ts
└── package.json
```

## Быстрый старт

### Требования

- Node.js 22+
- npm 10+

### Установка

```bash
npm install
```

### Локальная разработка

```bash
npm run dev
```

Доступные роуты в текущем состоянии:

- `http://localhost:5174/login`
- `http://localhost:5174/login-otp`

## Команды

```bash
npm run dev              # dev-сервер
npm run build            # сборка фронтенда в dist
npm run generate:cshtml  # генерация cshtml-ready/* из src/pages/*
npm run build:cshtml     # build + generate:cshtml
npm run preview          # предпросмотр dist
npm run lint             # eslint
npm run lint:fix         # eslint --fix
npm run format           # prettier
```

## Pipeline для backend (`.cshtml`)

Рекомендуемый сценарий перед передачей артефактов в backend:

```bash
npm run build:cshtml
```

Команда делает две вещи:

1. `vite build`:
   - собирает `dist/assets/index.js` и `dist/assets/index.css` (стабильные имена без hash)
   - копирует статику из `public` в `dist`
2. `generate:cshtml`:
   - генерирует `cshtml-ready/Login-Index.cshtml` из `src/pages/login/index.html`
   - генерирует `cshtml-ready/LoginOtp-Index.cshtml` из `src/pages/login-otp/index.html`

## `@fun-sun/ui-tokens`: css, sprite, шрифты

В `vite.config.ts` настроена синхронизация ассетов из пакета `@fun-sun/ui-tokens`:

- `node_modules/@fun-sun/ui-tokens/dist/assets/sprite.svg` -> `public/sprite.svg`
- `node_modules/@fun-sun/ui-tokens/dist/assets/sprite.svg` -> `public/icons/sprite/sprite.svg`
- `node_modules/@fun-sun/ui-tokens/dist/css/ui-tokens.css` -> `public/css/ui-tokens.css`

Далее при `build` эти файлы попадают в `dist`.

### Что со шрифтами

Шрифты из `@fun-sun/ui-tokens` подтягиваются через CSS (`@font-face`) и кладутся Vite в `dist/assets/*.woff2`.

## Аналитика и вспомогательные скрипты

- Dev-аналитика login: `src/pages/login/analytics.ts` через `initPageAnalytics()`
- Backend-аналитика login: `public/login-analytics.js` (подключается в `cshtml-ready/_Layout.cshtml`)
- Валидация формы: `public/form-validator.js`
- Кнопка назад/OIDC для backend: `public/back-button-handler-oidc.js`

## Правила source-of-truth

- Изменения дизайна и структуры форм вносятся в `src/pages/*`.
- `cshtml-ready/*` не редактируются вручную как первичный источник — они должны обновляться через `npm run generate:cshtml` (или `npm run build:cshtml`).
- `cshtml-templates/*` используются как reference-паттерны Razor.

## Как добавить новую auth-страницу

1. Создать страницу:
   - `src/pages/<page>/index.html`
   - `src/pages/<page>/styles.css`
2. Подключить стиль в `src/index.ts`
3. Добавить роут в `index.html` (router routes)
4. Добавить сопоставление пути в `src/App.vue` (`pageRoutes`)
5. Добавить генерацию в `scripts/generate-cshtml.mjs` (map `sourcePath -> targetPath`)

## Примечания

- В проекте используются web-components (`@fun-sun/ui-kit/web-components`), поэтому разметка в `index.html`/`cshtml` остается близкой к обычному HTML.
- Для backend layout сейчас используются стабильные пути:
  - `~/dist/assets/index.js`
  - `~/dist/assets/index.css`
  - `~/dist/css/ui-tokens.css`

## Чеклист перед передачей в backend

1. Обновить зависимости:
   - `npm install`
2. Сгенерировать финальные артефакты:
   - `npm run build:cshtml`
3. Проверить, что обновились frontend-ассеты:
   - `dist/assets/index.js`
   - `dist/assets/index.css`
   - `dist/css/ui-tokens.css`
   - `dist/sprite.svg` и `dist/icons/sprite/sprite.svg`
   - `dist/assets/*.woff2` (шрифты)
4. Проверить, что обновились backend-шаблоны:
   - `cshtml-ready/Login-Index.cshtml`
   - `cshtml-ready/LoginOtp-Index.cshtml`
   - Проверить что скрипты подключатся в шаблонах, а не написаны в самих шаблонах. (Просьба от бэкенда, что бы при правках менять не шаблоны, а папку dist)
5. Проверить layout для backend:
   - в `cshtml-ready/_Layout.cshtml` пути указывают на стабильные файлы (`~/dist/assets/index.js`, `~/dist/assets/index.css`, `~/dist/css/ui-tokens.css`)
   - [ ] `name` полей совпадают с C# Model
   - [ ] GTM / dataLayer инициализированы в layout
6. Выполнить быструю smoke-проверку:
   - открыть `/login` и `/login-otp`
   - проверить отображение web-components, иконок/sprite и шрифтов
   - убедиться, что нет ошибок в консоли браузера


## Как указывать иконки в HTML
Id иконки: {папка}--{имя-файла} (без .svg).

Пример: /sprite.svg#search--normal

<link rel="stylesheet" href="/css/ui-tokens.css">
<!-- иконка из спрайта -->
<svg class="icon" width="24" height="24" aria-hidden="true">
  <use href="/sprite.svg#search--normal"></use>
</svg>

Backend (Razor):
<link rel="stylesheet" href="~/dist/css/ui-tokens.css">
<svg class="icon" width="24" height="24" aria-hidden="true">
  <use href="~/dist/sprite.svg#common--like"></use>
</svg>

Стили:

.icon {
  width: 24px;
  height: 24px;
  color: #397ee0; /* для одноцветных иконок (currentColor) */
}
