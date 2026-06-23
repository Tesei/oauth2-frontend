import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = resolve(fileURLToPath(new URL('.', import.meta.url)))
const projectRoot = resolve(scriptDirectory, '..')

const pages = [
    {
        pageName: 'login',
        sourcePath: 'src/pages/login/index.html',
        targetPath: 'cshtml-new/Login-Index.cshtml',
        modelNamespace: 'FunSun.Auth.Pages.Login',
    },
    {
        pageName: 'login-otp',
        sourcePath: 'src/pages/login-otp/index.html',
        targetPath: 'cshtml-new/LoginOtp-Index.cshtml',
        modelNamespace: 'FunSun.Auth.Pages.LoginOtp',
    },
]

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

for (const page of pages) {
    const sourceAbsolutePath = resolve(projectRoot, page.sourcePath)
    const targetAbsolutePath = resolve(projectRoot, page.targetPath)

    const sourceMarkup = readFileSync(sourceAbsolutePath, 'utf8').trim()
    const normalizedMarkup = normalizeHtmlForCshtml(sourceMarkup)
    const cshtmlContent = `${buildCshtmlPreamble(page.modelNamespace)}\n\n${normalizedMarkup}\n`

    writeFileSync(targetAbsolutePath, cshtmlContent, 'utf8')
    console.log(`Generated ${page.pageName}: ${page.targetPath}`)
}
