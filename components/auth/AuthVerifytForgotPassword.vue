<script setup lang="ts">
import type { FormValidationError, SentCode } from '@ip-online/types'

defineEmits(['back'])

const props = defineProps<{
  email: string
}>()

const { createSession } = useDatacenter()
const { t } = useI18n()
const { toast } = useToastMessage()
const localePath = useLocalePath()
const router = useRouter()

const resend = useState('resendTimeoutForgotPassword', () => 0)

const page = ref<'PASSWORD' | 'CODE'>('CODE')
const code = ref('')
const password = ref('')
const repeatPassword = ref('')
const errorMessage = ref('')
const resendTimeout = ref(0)
const isBusy = ref(false)

async function processResendTimeout(resend: number) {
  resendTimeout.value = resend
  for (let i = 0; i < resend; i++) {
    // if (page.value !== 'code') return
    resendTimeout.value = resend - i
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  resendTimeout.value = 0
}

onMounted(() => resend.value && processResendTimeout(resend.value))

const validationErrors = ref<FormValidationError[]>([])
function validateInputs() {
  let validate = false

  // Reset errors
  validationErrors.value = []
  errorMessage.value = ''

  // Validation
  if (!code.value) {
    validate = false
    validationErrors.value.push({ property: 'code', message: t('codeIsRequired') })
    page.value = 'CODE'
    return validate
  }

  if (!password.value) {
    validate = false
    validationErrors.value.push({ property: 'password', message: t('passwordIsRequired') })
    return validate
  }

  if (!password.value.match(/^(?=.*\d)(?=.*[@#\-_$%^&+=!\\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\\?]{12,36}$/)) {
    validate = false
    validationErrors.value.push({ property: 'password', message: t('passwordValidation') })
    return validate
  }

  if (!repeatPassword.value) {
    validate = false
    validationErrors.value.push({ property: 'repeatPassword', message: t('repeatPasswordIsRequired') })
    return validate
  }

  if (password.value !== repeatPassword.value) {
    validate = false
    validationErrors.value.push({ property: 'repeatPassword', message: t('passwordsDoNotMatch') })
    return validate
  }

  validate = true
  return validate
}

async function submitResetPassword() {
  if (!validateInputs()) return
  isBusy.value = true
  const res = await useAPI('resetpassword_verify', { email: props.email, code: code.value, new_password: password.value })

  if (!res) return (isBusy.value = false)

  if (!res.success) {
    errorMessage.value = res.msg
    isBusy.value = false
    return
  }

  toast(t('changedPasswordSuccessfully'), 'SUCCESS')

  createSession(res.result.session)
  router.push(localePath('/'))
  isBusy.value = false
}

async function submitResendEmailVerification() {
  isBusy.value = true
  const res = await useAPI('resend_code', { email: props.email, type: 'resetpassword' })

  if (!res) return (isBusy.value = false)

  if ((res as unknown as { result: SentCode }).result) {
    resend.value = (res as unknown as { result: SentCode }).result.resend
    processResendTimeout(resend.value)
  }

  if (!res.success) {
    errorMessage.value = res.msg
    isBusy.value = false
    return
  }

  toast(t('verificationCodeSent'), 'SUCCESS')
  isBusy.value = false
}
</script>

<template>
  <div class="lg:bg-bg-600/30 lg:border-bg-400 flex w-full flex-col gap-8 rounded-3xl border-2 border-transparent p-4 lg:w-[28rem] lg:p-12">
    <header class="main-glitch-text self-start text-4xl capitalize">
      <span aria-hidden="true"> {{ $t('code') }} </span>

      <h1>{{ $t('code') }} </h1>
      <span aria-hidden="true"> {{ $t('code') }} </span>
    </header>

    <p class="flex text-sm text-neutral-300">{{ $t('codeHasBeenSentToEmail', { email: email }) }}</p>

    <form class="flex flex-1 flex-col gap-4" @submit.prevent="submitResetPassword">
      <Transition name="fade-preset" mode="out-in">
        <div v-if="page === 'CODE'" key="code" class="flex flex-1 flex-col gap-4">
          <div class="flex flex-col gap-4">
            <OpInput
              v-model="code"
              dir="ltr"
              style-suffix="ip-online"
              :initial-value="code"
              auto-complete="one-time-code"
              name="username"
              :label="$t('code')"
              :auto-focus="300"
              type="text"
            >
              <template #pre>
                <span class="icon-[gravity-ui--envelope] icon"></span>
              </template>
            </OpInput>

            <p v-if="validationErrors.find((error) => error.property === 'code')?.message" class="text-red-400">
              {{ validationErrors.find((error) => error.property === 'code')?.message }}
            </p>
          </div>

          <div class="mt-24 flex w-full flex-1 flex-col justify-end gap-2">
            <p v-if="errorMessage" class="w-full py-2 text-center text-red-400"> {{ errorMessage }}</p>

            <OpButton style-suffix="ip-online" style-type="btn-primary" class="capitalize" :loading="isBusy" :disabled="!code" @click="page = 'PASSWORD'">
              {{ $t('next') }}

              <template #loader>
                <BaseLoaderDots class="w-[1.7rem] text-white" />
              </template>
            </OpButton>

            <OpButton
              style-suffix="ip-online"
              style-type="btn-primary-outline"
              class="capitalize"
              dir="ltr"
              :disabled="isBusy || resendTimeout !== 0"
              @click="submitResendEmailVerification"
            >
              {{ resendTimeout ? resendTimeout + ' s' : $t('resendCode') }}
            </OpButton>
            <OpButton style-suffix="ip-online" style-type="btn-ghost" class="capitalize" :disabled="isBusy" @click="$emit('back')">{{ $t('back') }}</OpButton>
          </div>
        </div>

        <div v-else-if="page === 'PASSWORD'" key="password" class="flex flex-1 flex-col gap-4">
          <div class="flex flex-col gap-4">
            <OpInput
              v-model="password"
              dir="ltr"
              style-suffix="ip-online"
              :initial-value="password"
              auto-complete="new-password"
              :auto-focus="300"
              name="password"
              :label="$t('password')"
              type="password"
            >
              <template #pre>
                <span class="icon-[gravity-ui--key] icon"></span>
              </template>
            </OpInput>

            <p v-if="validationErrors.find((error) => error.property === 'password')?.message" class="text-red-400">
              {{ validationErrors.find((error) => error.property === 'password')?.message }}
            </p>

            <OpInput v-model="repeatPassword" dir="ltr" style-suffix="ip-online" auto-complete="off" name="repeatPassword" :label="$t('repeatPassword')" type="password">
              <template #pre>
                <span class="icon-[gravity-ui--key] icon"></span>
              </template>
            </OpInput>

            <p v-if="validationErrors.find((error) => error.property === 'repeatPassword')?.message" class="text-red-400">
              {{ validationErrors.find((error) => error.property === 'repeatPassword')?.message }}
            </p>
          </div>

          <div class="mt-24 flex w-full flex-1 flex-col justify-end gap-2">
            <p v-if="errorMessage" class="w-full py-2 text-center text-red-400"> {{ errorMessage }}</p>

            <OpButton style-suffix="ip-online" style-type="btn-primary" class="capitalize" :loading="isBusy" type="submit">
              {{ $t('submit') }}

              <template #loader>
                <BaseLoaderDots class="w-[1.7rem] text-white" />
              </template>
            </OpButton>

            <OpButton style-suffix="ip-online" style-type="btn-ghost" class="capitalize" :disabled="isBusy" @click="page = 'CODE'">{{ $t('back') }}</OpButton>
          </div>
        </div>
      </Transition>
    </form>
  </div>
</template>

<style scoped></style>
