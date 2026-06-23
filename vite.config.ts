import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { existsSync, mkdirSync, copyFileSync } from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function copyAsset(sourcePath: string, destinationPath: string) {
    if (!existsSync(sourcePath)) {
        console.warn(`⚠️  Файл не найден: ${sourcePath}`)
        return
    }

    const destinationDir = dirname(destinationPath)
    if (!existsSync(destinationDir)) {
        mkdirSync(destinationDir, { recursive: true })
    }

    try {
        copyFileSync(sourcePath, destinationPath)
        console.log(`✅ Файл скопирован: ${destinationPath}`)
    } catch (error) {
        if (error instanceof Error) {
            console.error(`❌ Ошибка при копировании файла: ${error.message}`)
        } else {
            console.error(`❌ Ошибка при копировании файла: ${error}`)
        }
    }
}

// Синхронизация css и sprite из @fun-sun/ui-tokens в public
function syncUiTokensAssets() {
    const spriteSourcePath = resolve(__dirname, 'node_modules/@fun-sun/ui-tokens/dist/assets/sprite.svg')
    const cssSourcePath = resolve(__dirname, 'node_modules/@fun-sun/ui-tokens/dist/css/ui-tokens.css')
    const publicDir = resolve(__dirname, 'public')

    copyAsset(spriteSourcePath, resolve(publicDir, 'sprite.svg'))
    copyAsset(spriteSourcePath, resolve(publicDir, 'icons/sprite/sprite.svg'))
    copyAsset(cssSourcePath, resolve(publicDir, 'css/ui-tokens.css'))
}

// Плагин для копирования ассетов из @fun-sun/ui-tokens в папку public
function copyUiTokensAssetsPlugin() {
    return {
        name: 'copy-ui-tokens-assets-plugin',
        enforce: 'pre' as const,
        configResolved() {
            syncUiTokensAssets()
        },
        buildStart() {
            syncUiTokensAssets()
        },
    }
}

export default defineConfig(({ command }) => {
    const isBuild = command === 'build'
    const baseConfig = {
        define: {
            __VUE_PROD_DEVTOOLS__: !isBuild,
        },
        plugins: [vue(), copyUiTokensAssetsPlugin()],
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
    }

    if (isBuild) {
        return {
            ...baseConfig,
            build: {
                minify: 'esbuild',
                sourcemap: true,
                manifest: true,
                rollupOptions: {
                    output: {
                        entryFileNames: 'assets/[name].js',
                        chunkFileNames: 'assets/chunks/[name].js',
                        assetFileNames: 'assets/[name][extname]',
                    },
                },
            },
        }
    }

    return {
        ...baseConfig,
        server: {
            open: true,
            // port: 8080,
        },
    }
})
