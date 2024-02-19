<script setup lang="ts">
import hljs from 'highlight.js'
import { useIpStore } from '@/stores/ipStore'
// import { useSessionStore } from '@/stores/session'

// const session = useSessionStore()
const ipStore = useIpStore()
const clipboard = useClipboard()
// const localePath = useLocalePath()

const isBusy = ref(true)

const demoCode = ref<HTMLElement>()
watchEffect(() => ipStore.info && applySyntaxHighlighting().then(() => (isBusy.value = false)))

watchEffect(() => ipStore.error && (isBusy.value = false))

async function applySyntaxHighlighting() {
  await nextTick()
  if (demoCode.value) hljs.highlightElement(demoCode.value)
  await new Promise((resolve) => setTimeout(resolve, 300))
}

onMounted(() => !process.server && applySyntaxHighlighting())
</script>

<template>
  <section aria-label="hero" class="flex w-full flex-col-reverse items-center justify-center gap-32 p-4 lg:flex-row">
    <section aria-label="information" class="flex max-w-[80ch] flex-col items-center gap-8 text-center lg:items-start lg:text-start">
      <header class="main-glitch-text text-4xl capitalize lg:self-start lg:text-6xl">
        <span aria-hidden="true" class="select-none"> {{ $t('welcomeRocket') }}</span>
        <h2>{{ $t('welcomeRocket') }}</h2>
        <span aria-hidden="true" class="select-none">{{ $t('welcomeRocket') }}</span>
      </header>

      <h3 class="leading-7" v-html="$t('content.homeH2', { IP: ipStore.ip })"> </h3>

      <SectionHeroCommands />
    </section>

    <section aria-label="demo" class="flex w-full flex-col gap-8 lg:w-[25rem] lg:shrink-0" dir="ltr">
      <header>
        <div class="border-bg-300 bg-bg-400/20 relative flex h-full w-full rounded-xl border-2 p-4">
          <div class="relative flex items-center">
            <span class="bg-secondary-500 absolute inset-0 -z-10 scale-50 rounded-full blur-lg"></span>
            <span class="icon-[gravity-ui--map-pin] text-secondary text-xl"></span>
          </div>

          <div v-if="!isBusy && ipStore.error" key="error" class="absolute inset-0 flex h-full w-full items-center justify-center">
            <div class="icon-[gravity-ui--triangle-exclamation] text-bg-400/50 absolute flex text-[2rem] lg:text-[2rem]"></div>
          </div>

          <p v-else-if="ipStore.ip" class="w-full text-center">{{ ipStore.ip }}</p>
        </div>
      </header>

      <div class="bg-bg-400/20 border-bg-400 relative flex min-h-[29rem] w-full rounded-xl border-2">
        <Transition name="fade-preset" mode="out-in">
          <div v-show="isBusy" key="loader" class="absolute flex h-full w-full flex-1 items-center justify-center">
            <BaseLoaderCircleFancy class="text-primary-500" />
          </div>
        </Transition>

        <Transition name="fade-preset" mode="out-in">
          <div v-if="!isBusy && ipStore.error" key="error" class="flex h-full w-full items-center justify-center">
            <div class="icon-[gravity-ui--triangle-exclamation] text-bg-400/50 text-[4rem] lg:text-[8rem]"></div>
          </div>

          <pre
            v-else-if="ipStore.info"
            key="content"
            class="relative h-full w-full flex-1 overflow-auto p-4"
          ><div class="flex  bg-bg-400/50 rounded-lg border-2 hover:bg-bg-400 transition-all cursor-pointer border-bg-300 absolute p-2 right-4 top-4" @click="clipboard.copy(JSON.stringify(ipStore.info,null,3))">
              <span class="icon-[gravity-ui--copy]"></span>
            </div><code ref="demoCode" class="w-full h-full text-sm language-json"  >{{ ipStore.info }}</code></pre>
        </Transition>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">
.ip-input:deep(input) {
  text-align: center;
}

.ip-input:deep(label) {
  left: 50%;
  transform: translateX(50%);
}
</style>
