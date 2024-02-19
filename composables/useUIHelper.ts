export default function useSettings() {
  const router = useRouter()
  const { setLocale, locale, setLocaleCookie } = useI18n()
  const localePath = useLocalePath()

  const load = () => {
    window.addEventListener('keydown', (e) => {
      if (e.key === '`' && !e.ctrlKey) {
        setLocale(locale.value === 'en' ? 'fa' : 'en')
        setLocaleCookie(locale.value)
      }
      if (e.key === '`' && e.ctrlKey) router.push(localePath('/playground'))
    })
  }

  return {
    load
  }
}
