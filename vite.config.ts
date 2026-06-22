import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { existsSync, mkdirSync, copyFileSync } from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Функция для копирования sprite.svg
function copySpriteFile() {
    const spriteSourcePath = resolve(__dirname, 'node_modules/@fun-sun/ui-tokens/dist/assets/sprite.svg')
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
        if (error instanceof Error) {
            console.error(`❌ Ошибка при копировании файла: ${error.message}`)
        } else {
            console.error(`❌ Ошибка при копировании файла: ${error}`)
        }
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

export default defineConfig(({ command }) => {
    const isBuild = command === 'build'
    return {
        define: {
            __VUE_PROD_DEVTOOLS__: !isBuild,
        },
        plugins: [vue(), copySpritePlugin()],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@fun-sun/ui-tokens/tokens" as *;',
                    api: 'modern',
                },
            },
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        ...(isBuild
            ? {
                  build: {
                      minify: 'esbuild',
                      sourcemap: true,
                  },
              }
            : {
                  server: {
                      open: true,
                      // port: 8080,
                  },
              }),
    }
})
