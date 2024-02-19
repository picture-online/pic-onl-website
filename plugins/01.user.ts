import type { NuxtApp } from 'nuxt/app'

export default defineNuxtPlugin(((nuxtApp: NuxtApp) => {
  useDatacenter().load()

  function setup() {
    const session = useSessionStore()

    if (process.client) {
      if (session.isLoggedIn) useDatacenter().updateUserData()
    }
  }
  nuxtApp.hook('vue:setup', setup)
}) as any)
