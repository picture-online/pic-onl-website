<script setup lang="ts">
import { NuxtTurnstile } from '#components'
const props = defineProps<{
  modelValue: string
  action?: string
}>()

const $emit = defineEmits(['update:modelValue'])
const { toast } = useToastMessage()

const turnstile = ref<InstanceType<typeof NuxtTurnstile>>()
const captchaToken = ref('')
const { t } = useI18n()

watch(captchaToken, (val) => $emit('update:modelValue', val))
watch(
  () => props.modelValue,
  (val) => val === 'RESET' && turnstile.value?.reset()
)

function handleError() {
  toast(t('anErrorHasOccurred'), 'ERROR')
  captchaToken.value = ''
}

function handleExpired() {
  toast(t('captchaIsExpired'), 'ERROR')
  captchaToken.value = ''
}
</script>

<template>
  <div class="flex items-center justify-center">
    <NuxtTurnstile
      ref="turnstile"
      v-model="captchaToken"
      :options="{
        // sitekey: 'xxx',
        'error-callback': handleError,
        'expired-callback': handleExpired,
        action: action
      }"
    />
  </div>
</template>

<style scoped></style>
