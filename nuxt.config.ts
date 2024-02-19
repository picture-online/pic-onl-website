// https://nuxt.com/docs/api/configuration/nuxt-config

import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/web-vitals',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    // '@nuxt/image',
    // '@nuxtjs/seo',
    '@pinia/nuxt',
    'nuxt-simple-robots',
    'nuxt-gtag',
    '@nuxtjs/turnstile'
  ],

  css: [`~/assets/styles/main.scss`, 'op-headless-lib/dist/style.css', '~/assets/styles/style.scss'],

  site: {
    url: 'https://pic.onl',
    name: 'pic.onl',
    description:
      'Find out what your public IPv4 and IPv6 address is revealing about you! My IP address information shows your IP location; city, region, country, ISP and location on a map. Many proxy servers, VPNs, and Tor exit nodes give themselves away.'
  },

  ignore: process.env.NODE_ENV === 'production' ? ['pages/playground.vue'] : [],

  turnstile: {
    siteKey: 'xxxx'
  },

  runtimeConfig: {
    public: {
      NODE_ENV: process.env.NODE_ENV,
      PRODUCTION: process.env.NODE_ENV !== 'development',
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY
    }
  },

  gtag: {
    id: 'xxx'
  },

  robots: {
    mergeWithRobotsTxtPath: `robots.txt`
  },

  devtools: { enabled: false },

  webVitals: {
    // provider: '', // auto detectd
    debug: false,
    disabled: true
  },

  // ssr: false,

  alias: {
    '@pic-onl': fileURLToPath(new URL('./shared', import.meta.url))
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      failOnError: false
      // crawlLinks: true
    },
    minify: true
  },

  i18n: {
    // strategy: 'pre',
    baseUrl: '',

    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    compilation: {
      strictMessage: false
    },

    // skipSettingLocaleOnNavigate: true,
    locales: [
      // {
      //   code: 'fa',
      //   name: 'فارسی',
      //   file: 'fa-IR.json',
      //   dir: 'rtl',
      //   iso: 'fa-IR'
      // },
      {
        code: 'en',
        name: 'English',
        file: 'en-US.json',
        dir: 'ltr',
        iso: 'en-US'
      }
    ],

    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'en',
      redirectOn: 'no prefix',
      alwaysRedirect: false
    },

    langDir: 'i18n'
  },

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1 viewport-fit=cover maximum-scale=3'
    }
  },

  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    },
    display: 'swap',
    download: false
  },

  future: {
    typescriptBundlerResolution: false
  },

  build: {
    transpile: ['vue-sonner']
  },

  tailwindcss: {
    viewer: false,
    cssPath: '~/.neoX/tailwind/global.css',
    configPath: '~/tailwind/tailwind.config.ts'
  }
})
