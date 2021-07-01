import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { polyfill } from '../../polyfills'
import App from 'next/app'

function MyApp({ Component, pageProps, locale, messages }: any) {
  return (
    <IntlProvider locale={locale} defaultLocale="de" messages={messages}>
      <Component {...pageProps} />
    </IntlProvider>
  )
}

function getMessages(locales: string | string[] = ['de']) {
  if (!Array.isArray(locales)) {
    locales = [locales]
  }
  let langBundle
  let locale
  for (let i = 0; i < locales.length && !locale; i++) {
    locale = locales[i]
    switch (locale) {
      case 'de':
        langBundle = import('../../compiled-lang/de.json')
        break
      case 'en':
        langBundle = import('../../compiled-lang/en.json')
        break
      default:
        break
    }
  }
  if (!langBundle) {
    return ['de', import('../../compiled-lang/de.json')]
  }
  return [locale, langBundle]
}

const getInitialProps: typeof App.getInitialProps = async (appContext) => {
  const {
    ctx: { req },
  } = appContext
  const requestedLocales: string | string[] =
    (req as any)?.locale ||
    (typeof navigator !== 'undefined' && navigator.languages) ||
    // IE11
    (typeof navigator !== 'undefined' && (navigator as any).userLanguage) ||
    (typeof window !== 'undefined' && (window as any).LOCALE) ||
    'de'

  const [supportedLocale, messagePromise] = getMessages(requestedLocales)

  const [, messages, appProps] = await Promise.all([
    polyfill(supportedLocale),
    messagePromise,
    App.getInitialProps(appContext),
  ])

  return {
    ...(appProps as any),
    locale: supportedLocale,
    messages: messages.default,
  }
}

MyApp.getInitialProps = getInitialProps

export default MyApp
