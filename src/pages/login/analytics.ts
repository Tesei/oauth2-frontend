type Cleanup = () => void

function pushDataLayerEvent(eventName: string, params: Record<string, string>) {
    const maybeWindow = window as Window & { dataLayer?: Array<Record<string, string>> }
    if (!Array.isArray(maybeWindow.dataLayer)) {
        return
    }

    maybeWindow.dataLayer.push({
        event: eventName,
        ...params,
    })
}

function normalizeErrorText(rawError: string | null): string | null {
    if (!rawError) {
        return null
    }

    const trimmedValue = rawError.trim()
    if (!trimmedValue) {
        return null
    }

    return trimmedValue
}

function isRealInputError(hostElement: Element, errorText: string): boolean {
    const label = hostElement.getAttribute('label')?.trim() ?? ''
    const placeholder = hostElement.getAttribute('placeholder')?.trim() ?? ''

    return errorText !== label && errorText !== placeholder
}

function findAuthErrorText(formElement: Element): string | null {
    const webInputs = formElement.querySelectorAll(
        'web-input[error-text], web-input-password[error-text], web-input-phone[error-text]',
    )

    for (const inputElement of webInputs) {
        const errorText = normalizeErrorText(inputElement.getAttribute('error-text'))
        if (!errorText) {
            continue
        }

        if (!isRealInputError(inputElement, errorText)) {
            continue
        }

        return errorText
    }

    const fallbackErrors = formElement.querySelectorAll('.input__error-text')
    for (const fallbackElement of fallbackErrors) {
        const errorText = normalizeErrorText(fallbackElement.textContent)
        if (!errorText) {
            continue
        }

        const parentInputElement = fallbackElement.closest('web-input, web-input-password, web-input-phone')
        if (parentInputElement && !isRealInputError(parentInputElement, errorText)) {
            continue
        }

        return errorText
    }

    return null
}

function hasErrorAttributesOrNodes(node: Node): boolean {
    if (!(node instanceof Element)) {
        return false
    }

    return Boolean(node.hasAttribute('error-text') || node.querySelector('[error-text], .input__error-text'))
}

function isErrorMutation(mutation: MutationRecord): boolean {
    if (mutation.type === 'attributes') {
        return mutation.attributeName === 'error-text'
    }

    if (mutation.type === 'childList') {
        return Array.from(mutation.addedNodes).some(hasErrorAttributesOrNodes)
    }

    return false
}

export function initLoginAnalytics(): Cleanup {
    const formElement = document.querySelector('#account')
    if (!formElement) {
        return () => {}
    }

    let failedAuthSent = false
    let debounceTimer: ReturnType<typeof setTimeout> | undefined

    const sendFailedAuth = (errorText: string) => {
        if (failedAuthSent) {
            return
        }

        failedAuthSent = true
        pushDataLayerEvent('failed_auth', {
            param: 'authorization',
            event_action: errorText,
        })
    }

    const checkAndSendErrors = () => {
        const errorText = findAuthErrorText(formElement)
        if (errorText) {
            sendFailedAuth(errorText)
        }
    }

    const debouncedCheck = () => {
        if (debounceTimer) {
            clearTimeout(debounceTimer)
        }

        debounceTimer = setTimeout(() => {
            failedAuthSent = false
            checkAndSendErrors()
        }, 100)
    }

    const observer = new MutationObserver((mutations) => {
        if (mutations.some(isErrorMutation)) {
            debouncedCheck()
        }
    })

    checkAndSendErrors()
    observer.observe(formElement, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['error-text'],
    })

    return () => {
        observer.disconnect()
        if (debounceTimer) {
            clearTimeout(debounceTimer)
        }
    }
}
