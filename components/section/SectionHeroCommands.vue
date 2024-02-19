<script setup lang="ts">
// const { t } = useI18n()
import { useIpStore } from '@/stores/ipStore'

const ipStore = useIpStore()
const { t } = useI18n()

const isBusy = ref(true)

watchEffect(() => (isBusy.value = ipStore.error ? false : !ipStore.info))

type key = 'ip' | 'country' | 'city' | 'asn' | 'json' | 'ua'

interface Command {
  title: string
  key: key
  command: string
}

const commands = ref<Command[]>([
  {
    title: t('ip'),
    key: 'ip',
    command: '$ curl ip.onl'
  },
  // {
  //   title: t('ua'),
  //   key: 'ua',
  //   command: '$ curl ip.onl/json'
  // }
  {
    title: t('json'),
    key: 'json',
    command: '$ curl ip.onl/json'
  }
  // {
  //   title: t('country'),
  //   key: 'country',
  //   command: '$ curl ip.onl/country'
  // },
  // {
  //   title: t('city'),
  //   key: 'city',
  //   command: '$ curl ip.onl/city'
  // },
  // {
  //   title: t('asn'),
  //   key: 'asn',
  //   command: '$ curl ip.onl/asn'
  // }
])

const selectedCommand = ref<Command>(commands.value[0])

function getOutput(command: Command) {
  switch (command.key) {
    case 'ip':
      return ipStore.ip

    case 'country':
      return ipStore.country

    case 'city':
      return ipStore.info?.city

    case 'asn':
      return ipStore.info?.as_number

    case 'ua':
      return ipStore.info?.user_agent

    case 'json':
      return {
        ip: ipStore.ip,
        country: ipStore.info?.country
      }

    default:
      return 'default'
  }
}
</script>

<template>
  <section
    aria-label="commands"
    class="bg-bg-400/20 border-bg-400 relative flex min-h-[12em] w-full flex-col items-start gap-6 rounded-xl border-2 p-6 lg:min-h-[15rem] lg:p-2"
    dir="ltr"
  >
    <Transition name="fade-preset" mode="out-in">
      <div v-show="isBusy" key="loader" class="absolute inset-0 flex h-full w-full flex-1 items-center justify-center">
        <BaseLoaderCircleFancy class="text-primary-500" />
      </div>
    </Transition>

    <Transition name="fade-preset">
      <div v-if="!isBusy && ipStore.error" key="error" class="flex h-full w-full items-center justify-center">
        <div class="icon-[gravity-ui--triangle-exclamation] text-bg-400/50 text-[4rem] lg:text-[8rem]"></div>
      </div>

      <div v-else-if="!isBusy" class="flex w-full flex-col items-start gap-8 lg:gap-0">
        <header class="flex w-full lg:mt-4">
          <ul class="flex w-full flex-col justify-around gap-0 px-4 lg:flex-row">
            <li
              v-for="i in commands"
              :key="i.key"
              class="flex min-w-[6rem] shrink-0 cursor-pointer select-none items-center justify-center border-b-4 border-transparent p-4 text-center text-lg text-neutral-400 transition-all lg:text-2xl"
              :class="{ '!border-primary text-white': i === selectedCommand }"
              @click="selectedCommand = i"
              >{{ i.title }}
            </li>
          </ul>
        </header>

        <div class="flex flex-col gap-4 self-center font-['Monomaniac_One'] lg:self-start lg:p-8">
          <div class="flex w-auto self-start">
            <p
              :key="selectedCommand.key"
              class="anim-typewriter inline-flex overflow-hidden whitespace-nowrap border-r-2 text-xl lg:text-4xl"
              :style="`  
        animation:
        typewriter 1s steps(${selectedCommand.command.length}),
        blinkTextCursor 500ms steps(${selectedCommand.command.length}) infinite normal;
        `"
              >{{ selectedCommand.command }} &nbsp;
            </p>
          </div>

          <pre
            :key="selectedCommand.key"
            class="text-secondary invisible animate-[show_1s_1s_forwards] whitespace-break-spaces break-all text-left text-lg opacity-0"
            v-html="JSON.stringify(getOutput(selectedCommand), null, 2)"
          ></pre>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style>
@keyframes typewriter {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
@keyframes blinkTextCursor {
  from {
    border-right-color: rgba(255, 255, 255, 0.75);
  }
  to {
    border-right-color: transparent;
  }
}

@keyframes show {
  from {
    visibility: hidden;
    opacity: 0;
  }
  to {
    visibility: visible;
    opacity: 1;
  }
}
</style>
