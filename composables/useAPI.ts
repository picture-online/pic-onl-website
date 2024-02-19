import { stringify } from 'qs'
import type { UseFetchOptions } from '#app'
import type { ReturnType, Endpoint, RequestBody, RequestHeader, IBaseResponse } from '~/shared/types/api'

const endpointMethodMapping: Record<Endpoint, 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'> = {
  demo: 'POST',
  pricing: 'POST',
  login: 'POST',
  register: 'POST',
  verify: 'POST',
  resend_code: 'POST',
  change_password: 'POST',
  dashboard: 'POST',
  transactions: 'POST',
  payment: 'POST',
  change_email: 'POST',
  change_email_verify: 'POST',
  generate_api: 'POST',
  revoke_api: 'POST',
  resetpassword: 'POST',
  resetpassword_verify: 'POST',
  session: 'POST'
}

// Hook
type NonUndefined<A> = A extends undefined ? never : A
export default async function useAPI<T extends Endpoint>(
  endpoint: T,
  ...args: NonUndefined<RequestBody<T>> extends never ? [RequestBody<T>?, RequestHeader<T>?] : [RequestBody<T>, RequestHeader<T>?]
): Promise<ReturnType<T> | undefined> {
  // Config
  const BASE_URL = 'https://api.ip.onl/api'
  const requestOptions = {
    ignoreResponseError: true
  }

  // Internals
  // ---------
  const gateway = (path: string) => BASE_URL + '/v1/action/' + path
  function handleError(e: any) {
    if (e.status) console.error('[API] Global Exception Handler:', e)
    const { toast } = useToastMessage()
    const { $i18n } = useNuxtApp()
    const { t, locale } = $i18n
    toast(t('error.networkError'), 'ERROR')
  }
  function buildHeaders(overrides: Record<string, string | undefined> = {}) {
    const session = useSessionStore()
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      session: session.token || '',
      ...overrides
    }
  }

  // Invokation
  // ----------
  const [payload, headers] = args
  const options: UseFetchOptions<ReturnType<T>> = { ...requestOptions }
  options.method = endpointMethodMapping[endpoint]
  if (payload) {
    if (options.method === 'GET') options.query = payload
    else options.body = stringify(payload)
  }
  if (headers) options.headers = buildHeaders(headers)

  const response = await $fetch<ReturnType<T>>(gateway(endpoint), options as any).catch(handleError)

  if (!response) return

  // Handle actions
  const action = (response as IBaseResponse<void, string>)?.action
  switch (action) {
    case 'login':
      useDatacenter().terminateSession()
      break
  }

  return response as any as ReturnType<T>
}
