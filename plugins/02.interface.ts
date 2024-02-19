import type { NuxtApp } from 'nuxt/app'

export default defineNuxtPlugin(((nuxtApp: NuxtApp) => {
  function setup() {
    if (process.client) {
      useUIHelper().load()
    }
  }
  nuxtApp.hook('vue:setup', setup)
}) as any)
