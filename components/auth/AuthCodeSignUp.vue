<script setup lang="ts">
import type { FormValidationError, SentCode } from '@ip-online/types'

defineEmits(['back'])

const props = defineProps<{
  email: string
}>()

const { t } = useI18n()
const { toast } = useToastMessage()
const { createSession } = useDatacenter()
const router = useRouter()
const localePath = useLocalePath()

const resend = useState('resendTimeoutSignUp', () => 0)

const code = ref('')
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
    return validate
  }

  validate = true
  return validate
}

async function submitVerifyEmail() {
  if (!validateInputs()) return
  isBusy.value = true
  const res = await useAPI('verify', { email: props.email, code: code.value })

  if (!res) return (isBusy.value = false)

  if (!res.success) {
    errorMessage.value = res.msg
    isBusy.value = false
    return
  }

  toast(t('welcome'), 'SUCCESS')
  createSession(res.result.session)
  router.push(localePath('/'))

  isBusy.value = false
}

async function submitResendEmailVerification() {
  isBusy.value = true
  const res = await useAPI('resend_code', { email: props.email, type: 'register' })

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

    <form class="flex flex-1 flex-col gap-4" @submit.prevent="submitVerifyEmail">
      <div class="flex flex-col gap-4">
        <OpInput v-model="code" dir="ltr" style-suffix="ip-online" auto-complete="one-time-code" name="username" :label="$t('code')" :auto-focus="300" type="text">
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

        <OpButton style-suffix="ip-online" style-type="btn-primary" class="capitalize" type="submit" :loading="isBusy">
          {{ $t('verify') }}

          <template #loader>
            <BaseLoaderDots class="w-[1.7rem] text-white" />
          </template>
        </OpButton>

        <OpButton style-suffix="ip-online" style-type="btn-primary-outline" class="capitalize" :disabled="isBusy || resendTimeout !== 0" @click="submitResendEmailVerification">
          {{ resendTimeout ? resendTimeout + ' s' : $t('resendCode') }}
        </OpButton>
        <OpButton style-suffix="ip-online" style-type="btn-ghost" class="capitalize" :disabled="isBusy" @click="$emit('back')">{{ $t('back') }}</OpButton>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
