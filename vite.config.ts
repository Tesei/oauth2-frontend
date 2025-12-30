import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'
import { resolve, dirname } from 'node:path'
import { existsSync, mkdirSync, copyFileSync } from 'node:fs'

const optionsTime = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Europe/Moscow',
}
const currentTime = new Date().toLocaleTimeString('ru-RU', optionsTime)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Функция для копирования sprite.svg
function copySpriteFile() {
    const spriteSourcePath = resolve(__dirname, 'node_modules/@fun-sun/style/dist/assets/sprite.svg')
    const publicDir = resolve(__dirname, 'public')
    const spriteDestPath = resolve(publicDir, 'sprite.svg')

    if (!existsSync(spriteSourcePath)) {
        console.warn(`⚠️  Файл не найден: ${spriteSourcePath}`)
        return
    }

    if (!existsSync(publicDir)) {
        mkdirSync(publicDir, { recursive: true })
    }

    try {
        copyFileSync(spriteSourcePath, spriteDestPath)
        console.log(`✅ Файл скопирован: ${spriteDestPath}`)
    } catch (error) {
        console.error(`❌ Ошибка при копировании файла: ${error.message}`)
    }
}

// Плагин для копирования sprite.svg из @fun-sun/style в папку public
function copySpritePlugin() {
    return {
        name: 'copy-sprite-plugin',
        enforce: 'pre',
        configResolved() {
            copySpriteFile()
        },
        buildStart() {
            copySpriteFile()
        },
    }
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const buildDate = env.VITE_BUILD_DATE || currentTime

    return {
        define: {
            'import.meta.env.VITE_BUILD_DATE': JSON.stringify(buildDate),
            __VUE_PROD_DEVTOOLS__: true,
        },
        plugins: [vue(), copySpritePlugin()],
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: '@use "@fun-sun/style/dist/scss/_variables" as *;',
                    api: 'modern-compiler',
                },
            },
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        build: {
            minify: 'esbuild',
            sourcemap: true,
        },
        server: {
            open: '/login',
        },
    }
})
