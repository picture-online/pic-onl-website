export default defineNuxtRouteMiddleware(() => {
  const session = useCookie<string>('session')
  const localePath = useLocalePath()

  if (!session.value) return navigateTo({ path: localePath('/login') })
})
