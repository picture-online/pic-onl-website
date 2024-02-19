<script setup lang="ts">
import type { SentCode } from '@ip-online/types'
import { useSessionStore } from '@/stores/session'

const { t } = useI18n()
const session = useSessionStore()
const { updateUserData } = useDatacenter()

const page = ref<'EMAIL' | 'CHANGE_EMAIL' | 'CODE' | 'NEW_EMAIL'>('EMAIL')
const password = ref('')
const errorMessage = ref('')
const isBusy = ref(false)

const code = ref('')
const resend = useState('resendTimeoutChangeEmail', () => 0)
const resendTimeout = ref(0)
const { toast } = useToastMessage()

const newEmail = ref('')

async function submitChangeEmail() {
  // if (!validateInputs()) return
  errorMessage.value = ''
  isBusy.value = true
  const res = await useAPI('change_email', { password: password.value })

  if (!res) return (isBusy.value = false)

  if (!res.success) {
    errorMessage.value = res.msg
    isBusy.value = false

    if ((res as unknown as { result: SentCode }).result.resend) {
      resend.value = (res as unknown as { result: SentCode }).result.resend
      errorMessage.value = ''
      page.value = 'CODE'
    }
    return
  }

  page.value = 'CODE'
  resend.value = res.result.resend
  isBusy.value = false
}

async function submitVerifyChangeEmail() {
  // if (!validateInputs()) return
  errorMessage.value = ''
  isBusy.value = true
  const res = await useAPI('change_email_verify', { code: code.value, new_email: newEmail.value })

  if (!res) return (isBusy.value = false)

  if (!res.success) {
    errorMessage.value = res.msg
    isBusy.value = false
    return
  }

  await updateUserData()
  toast(t('successfullyChangedYourEmail'), 'SUCCESS')
  page.value = 'EMAIL'
  isBusy.value = false
}

async function processResendTimeout(resend: number) {
  resendTimeout.value = resend
  for (let i = 0; i < resend; i++) {
    // if (page.value !== 'code') return
    resendTimeout.value = resend - i
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  resendTimeout.value = 0
}

watch(page, (page) => {
  errorMessage.value = ''
  page === 'CODE' && resend.value && !resendTimeout.value && processResendTimeout(resend.value)
})
</script>

<template>
  <div class="flex w-full justify-between">
    <Transition name="fade-preset" mode="out-in">
      <div v-if="page === 'EMAIL'" key="email" class="flex w-full flex-col justify-between gap-2 lg:flex-row">
        <div class="flex items-center gap-2">
          <p class="text-lg text-neutral-400">{{ $t('email') }}:</p>
          <p>{{ session.user?.user_email }}</p>
        </div>

        <OpButton style-suffix="ip-online" style-type="btn-ghost-side" @click="page = 'CHANGE_EMAIL'">
          {{ $t('change') }}
        </OpButton>
      </div>

      <form v-else-if="page === 'CHANGE_EMAIL'" key="change email" class="flex w-full flex-col gap-4" @submit.prevent="submitChangeEmail">
        <p class="flex text-lg font-semibold">
          {{ $t('password') }}
        </p>
        <OpInput
          v-model="password"
          style-suffix="ip-online"
          dir="ltr"
          :initial-value="password"
          :auto-focus="300"
          auto-complete="off"
          name="current password"
          :label="$t('password')"
          type="password"
        >
          <template #pre>
            <span class="icon-[gravity-ui--key] icon"></span>
          </template>
        </OpInput>

        <div class="mt-4 flex w-full flex-col justify-center gap-4">
          <p v-if="errorMessage" class="w-full py-2 text-center text-red-400"> {{ errorMessage }}</p>

          <div class="flex justify-center gap-4">
            <OpButton style-suffix="ip-online" style-type="btn-ghost-side" class="w-full" :disabled="isBusy" @click="page = 'EMAIL'">
              {{ $t('back') }}
            </OpButton>
            <OpButton style-suffix="ip-online" style-type="btn-primary-outline" class="w-full" type="submit" :loading="isBusy">
              <template #loader>
                <BaseLoaderDots class="w-[1.7rem] text-white" />
              </template>

              {{ $t('submit') }}
            </OpButton>
          </div>
        </div>
      </form>

      <div v-else-if="page === 'CODE'" key="code" class="flex w-full flex-col gap-4">
        <form class="flex w-full flex-col gap-4" @submit.prevent="page = 'NEW_EMAIL'">
          <p class="flex text-sm text-neutral-300">{{ $t('codeHasBeenSentToEmail', { email: session.user?.user_email }) }}</p>
          <OpInput v-model="code" dir="ltr" style-suffix="ip-online" auto-complete="one-time-code" name="username" :label="$t('code')" :auto-focus="300" type="text">
            <template #pre>
              <span class="icon-[gravity-ui--envelope] icon"></span>
            </template>
          </OpInput>

          <div class="mt-4 flex w-full flex-col justify-center gap-4">
            <p v-if="errorMessage" class="w-full py-2 text-center text-red-400"> {{ errorMessage }}</p>

            <div class="flex flex-col justify-center gap-4">
              <OpButton style-suffix="ip-online" style-type="btn-primary" class="w-full" type="submit" :disabled="!code" :loading="isBusy">
                <template #loader>
                  <BaseLoaderDots class="w-[1.7rem] text-white" />
                </template>

                {{ $t('next') }}
              </OpButton>

              <OpButton style-suffix="ip-online" style-type="btn-primary-outline" class="capitalize" :disabled="isBusy || resendTimeout !== 0" dir="ltr" @click="''">
                {{ resendTimeout ? resendTimeout + ' s' : $t('resendCode') }}
              </OpButton>
              <OpButton style-suffix="ip-online" style-type="btn-ghost-side" class="w-full" :disabled="isBusy" @click="page = 'CHANGE_EMAIL'">
                {{ $t('back') }}
              </OpButton>
            </div>
          </div>
        </form>
      </div>

      <div v-else-if="page === 'NEW_EMAIL'" key="new email" class="flex w-full flex-col gap-4">
        <form class="flex w-full flex-col gap-4" @submit.prevent="submitVerifyChangeEmail">
          <p class="flex text-lg font-semibold">{{ $t('newEmail') }}:</p>

          <OpInput
            v-model="newEmail"
            style-suffix="ip-online"
            dir="ltr"
            name="email"
            :initial-value="newEmail"
            auto-complete="email"
            :label="$t('email')"
            :auto-focus="300"
            type="email"
          >
            <template #pre>
              <span class="icon-[gravity-ui--envelope] icon"></span>
            </template>
          </OpInput>

          <div class="mt-4 flex w-full flex-col justify-center gap-4">
            <p v-if="errorMessage" class="w-full py-2 text-center text-red-400"> {{ errorMessage }}</p>

            <div class="flex flex-col justify-center gap-4">
              <OpButton style-suffix="ip-online" style-type="btn-primary" class="w-full" type="submit" :disabled="!newEmail" :loading="isBusy">
                <template #loader>
                  <BaseLoaderDots class="w-[1.7rem] text-white" />
                </template>

                {{ $t('changeEmail') }}
              </OpButton>

              <OpButton style-suffix="ip-online" style-type="btn-ghost-side" class="w-full" :disabled="isBusy" @click="page = 'CODE'">
                {{ $t('back') }}
              </OpButton>
            </div>
          </div>
        </form>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
