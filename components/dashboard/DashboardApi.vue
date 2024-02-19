<script setup lang="ts">
import type { UserAPI } from '@ip-online/types'

const props = defineProps<{
  apiKey?: UserAPI
}>()

const isBusy = ref(false)
const { toast } = useToastMessage()
const clipboard = useClipboard()
const allApiKeys = ref<UserAPI['api_keys']>(props.apiKey?.api_keys || [])
const selectedApiKey = ref(props.apiKey?.api_keys.find((key) => !key.is_revoked)?.api_key)

const submitGenerateApiKey = async () => {
  isBusy.value = true
  const res = await useAPI('generate_api')
  if (!res) return (isBusy.value = false)
  if (!res.success) toast(res.msg, 'ERROR')
  if (res.success) selectedApiKey.value = res.result.api_key
  isBusy.value = false
}

const submitRevokeApiKey = async () => {
  isBusy.value = true
  if (!selectedApiKey.value) return (isBusy.value = false)
  const res = await useAPI('revoke_api', { api_key: selectedApiKey.value })
  if (!res) return (isBusy.value = false)
  if (!res.success) toast(res.msg, 'ERROR')
  if (res.success) {
    if (allApiKeys.value.find((key) => key.api_key === selectedApiKey.value)) allApiKeys.value.find((key) => key.api_key === selectedApiKey.value)!.is_revoked = 1
    else allApiKeys.value.unshift({ api_key: selectedApiKey.value, date: new Date().toString(), is_revoked: 1 })

    selectedApiKey.value = undefined
  }
  isBusy.value = false
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col justify-between gap-6 lg:flex-row">
      <header class="main-glitch-text self-start text-4xl capitalize">
        <span aria-hidden="true"> {{ $t('api') }}</span>

        <h1>{{ $t('api') }}</h1>
        <span aria-hidden="true"> {{ $t('api') }}</span>
      </header>

      <OpButton v-if="!selectedApiKey" style-suffix="ip-online" style-type="btn-primary-outline" class="flex capitalize" :loading="isBusy" @click="submitGenerateApiKey">
        {{ $t('generate') }}
      </OpButton>
    </div>
    <div class="flex w-full flex-col justify-between gap-8 lg:gap-4">
      <div v-if="selectedApiKey" class="bg-bg-500/50 relative flex items-center rounded-xl p-3 font-mono">
        {{ selectedApiKey }}

        <div class="bg-bg-400/50 hover:bg-bg-400 border-bg-300 absolute right-2 flex cursor-pointer rounded-lg border-2 p-2 transition-all" @click="clipboard.copy(selectedApiKey)">
          <span class="icon-[gravity-ui--copy]"></span>
        </div>
      </div>

      <OpButton v-if="selectedApiKey" style-suffix="ip-online" style-type="btn-primary-outline" class="flex capitalize" :loading="isBusy" @click="submitRevokeApiKey">
        {{ $t('revokeApi') }}
      </OpButton>

      <div>
        <ul class="flex max-h-[17rem] flex-col gap-2 overflow-y-auto">
          <li
            v-for="api in allApiKeys"
            :key="api.api_key"
            class="bg-bg-500/20 relative flex items-center rounded-xl p-3 font-mono text-neutral-500"
            :class="{ hidden: !api.is_revoked }"
          >
            <s>
              {{ api.api_key }}
            </s>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
