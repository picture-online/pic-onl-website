import type { CoinCurrency, Plan } from '@ip-online/types/pricing'
import type { IPInfo, User, Logins, UserAPI, UserTransaction, SentCode } from '@ip-online/types'

interface ISuccessResponse<Data, Action> {
  success: true
  status: number
  action: Action
  msg: string
  result: Data
  timestamp: number
}

interface IErrorResponse<Action> {
  success: false
  status: number
  action: Action
  msg: string
  error: boolean
  timestamp: number
}

interface IRateLimitResponse<Action> {
  status: 429
  success: false
  error: true
  msg: string
  result: { 'retry-after': number }
  action: Action
}

export type IBaseResponse<Data, Action = undefined> = ISuccessResponse<Data, Action> | IErrorResponse<Action> | IRateLimitResponse<Action>

// ---------------------
type IFetchPricingResponse = IBaseResponse<{ plans: Plan[]; gateways: string[]; coinpayments_currencies: CoinCurrency[] }>
type IFetchDemoResponse = IBaseResponse<IPInfo, 'retry-after'>
type IRegisterResponse = IBaseResponse<SentCode, 'retry' | 'resend'>
type IVerifyEmailResponse = IBaseResponse<{ email: string; session: string }>
type ILoginResponse = IBaseResponse<{ session: string }, 'retry'>
type IResendEmailVerificationResponse = IBaseResponse<SentCode>
type IChangePasswordResponse = IBaseResponse<void>
type IResetPasswordResponse = IBaseResponse<SentCode>
type IChangeEmailResponse = IBaseResponse<SentCode>
type IVerifyChangeEmailResponse = IBaseResponse<void>
type IDashboardResponse = IBaseResponse<{
  user: User
  logins: Logins[]
  api: UserAPI
}>

type ITransactionsResponse = IBaseResponse<{
  result: {
    list: UserTransaction[]
    pages: number
    page: number
  }
  status_list: string[]
}>
type ISessionResponse = IBaseResponse<User>
type IGenerateApiKeyResponse = IBaseResponse<{ api_key: string }>
type IRevokeApiKeyResponse = IBaseResponse<void>
type IPaymentResponse = IBaseResponse<{ checkout_url: string }>

// New:
// interface IAPI {
//   demo: () => Promise<IFetchDemoResponse | undefined>
//   pricing: () => Promise<IFetchPricingResponse | undefined>
//   login: (loginPayload: { email: string; password: string }, captchaResponse: string) => Promise<ILoginResponse | undefined>
//   register: (createUserPayload: { email: string; password: string }, captchaResponse: string) => Promise<IRegisterResponse | undefined>
//   verify: (email: string, code: string) => Promise<IVerifyEmailResponse | undefined>
//   resend_code: (email: string) => Promise<IResendEmailVerificationResponse | undefined>
//   change_password: (oldPassword: string, newPassword: string) => Promise<IChangePasswordResponse | undefined>
//   dashboard: () => Promise<IDashboardResponse | undefined>
//   transactions: (status: string, page: number) => Promise<ITransactionsResponse | undefined>
//   payment: (planId: number, billing_cycle: string, gateway: string, currency?: string) => Promise<IPaymentResponse | undefined>
//   change_email: (password: string) => Promise<IChangeEmailResponse | undefined>
//   change_email_verify: (newEmail: string, code: string) => Promise<IVerifyChangeEmailResponse | undefined>
//   generate_api: () => Promise<IGenerateApiKeyResponse | undefined>
//   revoke_api: (apiKey: string) => Promise<IRevokeApiKeyResponse | undefined>
//   resetpassword: (email: string, captchaResponse: string) => Promise<IResetPasswordResponse | undefined>
//   resetpassword_verify: (email: string, code: string, newPassword: string) => Promise<IVerifyEmailResponse | undefined>
//   session: () => Promise<ISessionResponse | undefined>
// }
// export type APIParams<T extends Endpoint> = Parameters<IAPI[T]>[0]

// Define a mapping of Endpoint to return types
type ResponseTypes = {
  demo: IFetchDemoResponse
  pricing: IFetchPricingResponse
  login: ILoginResponse
  register: IRegisterResponse
  verify: IVerifyEmailResponse
  resend_code: IResendEmailVerificationResponse
  change_password: IChangePasswordResponse
  dashboard: IDashboardResponse
  transactions: ITransactionsResponse
  payment: IPaymentResponse
  change_email: IChangeEmailResponse
  change_email_verify: IVerifyChangeEmailResponse
  generate_api: IGenerateApiKeyResponse
  revoke_api: IRevokeApiKeyResponse
  resetpassword: IResetPasswordResponse
  resetpassword_verify: IVerifyEmailResponse
  session: ISessionResponse
}

// Define a mapping of Endpoint to request body types
type BodyTypes = {
  demo: undefined
  pricing: undefined
  login: { email: string; password: string; recaptcha_response: string }
  register: { email: string; password: string; recaptcha_response: string }
  verify: { email: string; code: string }
  resend_code: { email: string; type: 'register' | 'resetpassword' | 'changeemail' }
  change_password: { old_password: string; new_password: string }
  dashboard: undefined
  transactions: { status: string; page: number }
  payment: { plan_id: number; billing_cycle: string; gateway: string; currency?: string }
  change_email: { password: string }
  change_email_verify: { new_email: string; code: string }
  generate_api: undefined
  revoke_api: { api_key: string }
  resetpassword: { email: string; recaptcha_response: string }
  resetpassword_verify: { email: string; code: string; new_password: string }
  session: undefined
}

// Define a mapping of Endpoint to request header types
type HeaderTypes = {
  demo: undefined
  pricing: undefined
  login: undefined
  register: undefined
  verify: undefined
  resend_code: undefined
  change_password: undefined
  dashboard: undefined
  transactions: undefined
  payment: undefined
  change_email: undefined
  change_email_verify: undefined
  generate_api: undefined
  revoke_api: undefined
  resetpassword: undefined
  resetpassword_verify: undefined
  session: undefined
}

export type Endpoint =
  | 'demo'
  | 'pricing'
  | 'login'
  | 'register'
  | 'verify'
  | 'resend_code'
  | 'change_password'
  | 'dashboard'
  | 'transactions'
  | 'payment'
  | 'change_email'
  | 'change_email_verify'
  | 'generate_api'
  | 'revoke_api'
  | 'resend_code'
  | 'resetpassword'
  | 'resetpassword_verify'
  | 'session'

// Helper type to get the return type based on the endpoint
export type ReturnType<T extends Endpoint> = ResponseTypes[T]
export type RequestBody<T extends Endpoint> = BodyTypes[T]
export type RequestHeader<T extends Endpoint> = HeaderTypes[T]
