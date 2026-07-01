import { mkdirSync, readFileSync, rmSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = resolve(fileURLToPath(new URL('.', import.meta.url)))
const projectRoot = resolve(scriptDirectory, '..')
const cshtmlReadyDir = resolve(projectRoot, 'cshtml-ready')
const pagesDir = resolve(projectRoot, 'src/pages')

function cleanCshtmlReadyDir() {
    rmSync(cshtmlReadyDir, { recursive: true, force: true })
    mkdirSync(cshtmlReadyDir, { recursive: true })
}

/**
 * Преобразует kebab-case в PascalCase
 * login-otp-email -> LoginOtpEmail
 */
function toPascalCase(str) {
    return str
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
}

/**
 * Сканирует директорию страниц и возвращает список всех страниц с index.html
 */
function scanPages() {
    const pages = []
    const entries = readdirSync(pagesDir)

    for (const entry of entries) {
        const entryPath = join(pagesDir, entry)
        if (statSync(entryPath).isDirectory()) {
            const indexPath = join(entryPath, 'index.html')
            if (statSync(indexPath).isFile()) {
                const pageName = entry
                const pascalName = toPascalCase(pageName)
                pages.push({
                    pageName,
                    sourcePath: `src/pages/${pageName}/index.html`,
                    targetPath: `cshtml-ready/${pascalName}-Index.cshtml`,
                    modelNamespace: `FunSun.Auth.Pages.${pascalName}`,
                })
            }
        }
    }

    return pages
}

function normalizeHtmlForCshtml(htmlContent) {
    return htmlContent
        .replaceAll('src="/icons/', 'src="~/dist/icons/')
        .replaceAll("src='/icons/", "src='~/dist/icons/")
}

function buildCshtmlPreamble(modelNamespace) {
    return `@page
@using ${modelNamespace}
@inject IHtmlLocalizer<IndexModel> Localizer
@model IndexModel
@{
    ViewData["Title"] = Localizer["Title"];
}`
}

cleanCshtmlReadyDir()
console.log('Cleaned cshtml-ready/')

const pages = scanPages()

for (const page of pages) {
    const sourceAbsolutePath = resolve(projectRoot, page.sourcePath)
    const targetAbsolutePath = resolve(projectRoot, page.targetPath)

    const sourceMarkup = readFileSync(sourceAbsolutePath, 'utf8').trim()
    const normalizedMarkup = normalizeHtmlForCshtml(sourceMarkup)
    const cshtmlContent = `${buildCshtmlPreamble(page.modelNamespace)}\n\n${normalizedMarkup}\n`

    writeFileSync(targetAbsolutePath, cshtmlContent, 'utf8')
    console.log(`Generated ${page.pageName}: ${page.targetPath}`)
}

console.log(`\n✅ Total pages generated: ${pages.length}`)
