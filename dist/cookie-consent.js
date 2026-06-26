;(function () {
    var COOKIE_NAME = 'cookie_consent'
    var COOKIE_VALUE = 'accepted'
    var COOKIE_MAX_AGE = 365 * 24 * 60 * 60
    var GTM_ID = 'GTM-P7DMFQ2'

    function getCookie(name) {
        var escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        var match = document.cookie.match(new RegExp('(?:^|; )' + escapedName + '=([^;]*)'))

        return match ? decodeURIComponent(match[1]) : null
    }

    function setCookie(name, value, maxAge) {
        document.cookie =
            name + '=' + encodeURIComponent(value) + '; Max-Age=' + maxAge + '; Path=/; SameSite=Lax'
    }

    function hasConsent() {
        return getCookie(COOKIE_NAME) === COOKIE_VALUE
    }

    function hideBanner() {
        document.documentElement.classList.add('cookie-consent-accepted')
    }

    function loadGtm() {
        if (window.__gtmLoaded) {
            return
        }

        window.__gtmLoaded = true

        ;(function (w, d, s, l, i) {
            w[l] = w[l] || []
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
            var f = d.getElementsByTagName(s)[0]
            var j = d.createElement(s)
            var dl = l != 'dataLayer' ? '&l=' + l : ''
            j.async = true
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
            f.parentNode.insertBefore(j, f)
        })(window, document, 'script', 'dataLayer', GTM_ID)
    }

    function pushConsentEvent() {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
            event: 'cookie_consent_accepted',
        })
    }

    function acceptConsent() {
        setCookie(COOKIE_NAME, COOKIE_VALUE, COOKIE_MAX_AGE)
        hideBanner()
        loadGtm()
        pushConsentEvent()
    }

    function initBanner() {
        var banner = document.querySelector('.js-cookie-consent-banner')
        if (!banner) {
            return
        }

        if (hasConsent()) {
            hideBanner()
            return
        }

        banner.addEventListener('click', function (event) {
            var target = event.target
            if (!target || typeof target.closest !== 'function') {
                return
            }

            if (!target.closest('.js-cookie-consent-accept')) {
                return
            }

            event.preventDefault()
            acceptConsent()
        })
    }

    window.dataLayer = window.dataLayer || []

    if (hasConsent()) {
        hideBanner()
        loadGtm()
    }

    window.FunSunCookieConsent = {
        hasConsent: hasConsent,
        accept: acceptConsent,
        initBanner: initBanner,
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBanner)
    } else {
        initBanner()
    }
})()
