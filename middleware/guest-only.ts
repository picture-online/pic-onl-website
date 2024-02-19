export default defineNuxtRouteMiddleware(() => {
  const session = useCookie<string>('session')
  const localePath = useLocalePath()

  if (session.value) {
    if (process.server) return navigateTo({ path: localePath('/') })

    return abortNavigation()
  }
})
