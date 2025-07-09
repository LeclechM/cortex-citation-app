import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase',
    '@nuxtjs/turnstile',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  colorMode: {
    classSuffix: '',
  },
  runtimeConfig: {
    turnstile: {
      // This can be overridden at runtime via the NUXT_TURNSTILE_SECRET_KEY
      // environment variable.
      secretKey: '',
    },
  },
  compatibilityDate: '2025-05-15',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  typescript: {
    typeCheck: true,
  },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
  shadcn: {
    componentDir: '~/components/ui',
  },
  supabase: {
    redirectOptions: {
      login: '/signin',
      callback: '/confirm',
      include: undefined,
      exclude: ['/signup'],
      saveRedirectToCookie: false,
    },
  },
  turnstile: {
    siteKey: '0x4AAAAAABjlV1KpqF8ABtGR',
  },

})
