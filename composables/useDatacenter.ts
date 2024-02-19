import { useSessionStore } from '@/stores/session'

export default function useDatacenter() {
  const session = useSessionStore()

  const userProfile = useCookie<undefined>('userProfile', { maxAge: 60 * 60 * 24 * 7 })
  const userToken = useCookie<string>('session', { maxAge: 60 * 60 * 24 * 7 })

  function load() {
    session.token = userToken.value
    session.user = userProfile.value
  }

  async function createSession(accessToken: string) {
    // Set session token in store
    session.token = accessToken

    // Set cookie
    useCookie('session', {
      maxAge: 60 * 60 * 24 * 7 // 7 day
    }).value = accessToken

    // Update user data
    await updateUserData()
  }

  async function updateUserData() {
    const res = await useAPI('session')
    if (!res) return
    if (!res.success) terminateSession()
    else {
      userProfile.value = res.result
      session.user = res.result
    }
  }

  function terminateSession() {
    userToken.value = '' // Remove session cookie
    userProfile.value = undefined // Remove session cookie
    session.token = undefined // Remove session store
    session.user = undefined // Remove profile store
  }

  return {
    load,
    createSession,
    updateUserData,
    terminateSession
  }
}
