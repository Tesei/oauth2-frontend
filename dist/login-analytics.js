;(function () {
    function pushDataLayerEvent(eventName, params) {
        if (!Array.isArray(window.dataLayer)) {
            return
        }

        window.dataLayer.push({
            event: eventName,
            ...params,
        })
    }

    function normalizeErrorText(rawError) {
        if (!rawError) {
            return null
        }

        var trimmedValue = rawError.trim()
        if (!trimmedValue) {
            return null
        }

        return trimmedValue
    }

    function isRealInputError(hostElement, errorText) {
        var label = (hostElement.getAttribute('label') || '').trim()
        var placeholder = (hostElement.getAttribute('placeholder') || '').trim()

        return errorText !== label && errorText !== placeholder
    }

    function findAuthErrorText(formElement) {
        var webInputs = formElement.querySelectorAll(
            'web-input[error-text], web-input-password[error-text], web-input-phone[error-text]',
        )

        for (var i = 0; i < webInputs.length; i++) {
            var inputElement = webInputs[i]
            var inputError = normalizeErrorText(inputElement.getAttribute('error-text'))
            if (!inputError) {
                continue
            }

            if (!isRealInputError(inputElement, inputError)) {
                continue
            }

            return inputError
        }

        var fallbackErrors = formElement.querySelectorAll('.input__error-text')
        for (var j = 0; j < fallbackErrors.length; j++) {
            var fallbackElement = fallbackErrors[j]
            var fallbackError = normalizeErrorText(fallbackElement.textContent)
            if (!fallbackError) {
                continue
            }

            var parentInputElement = fallbackElement.closest('web-input, web-input-password, web-input-phone')
            if (parentInputElement && !isRealInputError(parentInputElement, fallbackError)) {
                continue
            }

            return fallbackError
        }

        return null
    }

    function initLoginAnalytics() {
        var formElement = document.querySelector('#account')
        if (!formElement) {
            return
        }

        var failedAuthSent = false
        var debounceTimer

        function sendFailedAuth(errorText) {
            if (failedAuthSent) {
                return
            }

            failedAuthSent = true
            pushDataLayerEvent('failed_auth', {
                param: 'authorization',
                event_action: errorText,
            })
        }

        function checkAndSendErrors() {
            var errorText = findAuthErrorText(formElement)
            if (errorText) {
                sendFailedAuth(errorText)
            }
        }

        function debouncedCheck() {
            if (debounceTimer) {
                clearTimeout(debounceTimer)
            }

            debounceTimer = setTimeout(function () {
                failedAuthSent = false
                checkAndSendErrors()
            }, 100)
        }

        var observer = new MutationObserver(function (mutations) {
            var hasErrorMutation = false

            for (var mutationIndex = 0; mutationIndex < mutations.length; mutationIndex++) {
                var mutation = mutations[mutationIndex]

                if (mutation.type === 'attributes' && mutation.attributeName === 'error-text') {
                    hasErrorMutation = true
                }

                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    for (var nodeIndex = 0; nodeIndex < mutation.addedNodes.length; nodeIndex++) {
                        var node = mutation.addedNodes[nodeIndex]
                        if (!(node instanceof Element)) {
                            continue
                        }

                        if (node.hasAttribute('error-text') || node.querySelector('[error-text], .input__error-text')) {
                            hasErrorMutation = true
                            break
                        }
                    }
                }

                if (hasErrorMutation) {
                    break
                }
            }

            if (hasErrorMutation) {
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoginAnalytics, { once: true })
    } else {
        initLoginAnalytics()
    }
})()
