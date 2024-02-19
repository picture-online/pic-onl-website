<script setup lang="ts">
import { useSessionStore } from '@/stores/session'

const localePath = useLocalePath()
const session = useSessionStore()
const crisp = useCrisp()

const { t } = useI18n()
const menu = computed(() => [
  {
    key: 'home',
    title: t('home'),
    path: localePath('/'),
    icon: 'icon-[gravity-ui--house]'
  },
  {
    key: 'docs',
    title: t('docs'),
    path: localePath('/docs'),
    icon: 'icon-[gravity-ui--abbr-api]'
  },
  {
    key: 'about',
    title: t('aboutUs'),
    path: localePath('/about'),
    icon: 'icon-[gravity-ui--persons]'
  },
  {
    key: 'contact',
    title: t('contactUs'),
    path: '',
    icon: 'icon-[gravity-ui--envelope]'
  }
])

const showSidebar = ref(false)

watch(showSidebar, (value) => (value ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')))
</script>

<template>
  <header class="flex w-full items-center justify-center gap-8 whitespace-nowrap p-8 lg:justify-start">
    <div class="flex items-center justify-center">
      <LazyLogoMain animation="SEMI" mt="mt-[-0.05rem]" />
    </div>
    <ul class="hidden flex-1 items-center gap-12 lg:flex">
      <li v-for="item in menu" :key="item.key">
        <div v-if="item.key === 'contact'" class="group relative cursor-pointer text-sm min-[1120px]:text-lg" @click="item.key === 'contact' ? crisp.showCrisp() : ''">
          <p class="flex items-center gap-2 text-neutral-400 transition-all group-hover:text-white" :class="{ '!text-white': $route.path === item.path }">
            <span :class="[item.icon]"></span>

            {{ item.title }}
          </p>

          <div class="absolute top-full -z-10 flex w-full flex-col gap-1 ltr:left-6 ltr:right-6">
            <span
              class="bg-primary-500 w-1/2 scale-x-0 py-[0.1rem] opacity-0 transition-all group-hover:scale-100 group-hover:opacity-50 ltr:origin-left rtl:origin-right"
              :class="{ 'scale-x-100 opacity-100 group-hover:!opacity-100': $route.path === item.path }"
            ></span>
          </div>
        </div>

        <NuxtLink v-else :to="item.path" class="group relative cursor-pointer text-sm min-[1120px]:text-lg">
          <p class="flex items-center gap-2 text-neutral-400 transition-all group-hover:text-white" :class="{ '!text-white': $route.path === item.path }">
            <span :class="[item.icon]"></span>

            {{ item.title }}
          </p>

          <div class="absolute top-full -z-10 flex w-full flex-col gap-1 ltr:left-6 ltr:right-6">
            <span
              class="bg-primary-500 w-1/2 scale-x-0 py-[0.1rem] opacity-0 transition-all group-hover:scale-100 group-hover:opacity-50 ltr:origin-left rtl:origin-right"
              :class="{ 'scale-x-100 opacity-100 group-hover:!opacity-100': $route.path === item.path }"
            ></span>
          </div>
        </NuxtLink>
      </li>
    </ul>

    <div class="hidden items-center gap-4 lg:flex">
      <NuxtLink v-if="!session.isLoggedIn && $route.path !== localePath('/login')" :to="localePath('/login')">
        <OpButton style-suffix="ip-online" style-type="btn-primary-side" class="capitalize">{{ $t('login') }}</OpButton>
      </NuxtLink>

      <NuxtLink v-if="!session.isLoggedIn && $route.path !== localePath('/register')" :to="localePath('/register')" class="max-[1120px]:hidden">
        <OpButton style-suffix="ip-online" style-type="btn-primary-outline" class="capitalize">{{ $t('register') }}</OpButton>
      </NuxtLink>

      <NuxtLink v-if="$route.path !== localePath('/pricing')" :to="localePath('/pricing')">
        <OpButton style-suffix="ip-online" style-type="btn-primary" class="capitalize">{{ $t('pricing') }}</OpButton>
      </NuxtLink>

      <OpButton v-if="session.isLoggedIn" style-suffix="ip-online" style-type="btn-primary-side" class="capitalize" @click="$router.push(localePath('/dashboard'))">
        {{ $t('dashboard') }}
      </OpButton>
    </div>

    <div
      class="bg-bg-700 fixed z-20 flex h-[1.5rem] w-[1.5rem] cursor-pointer items-center justify-center text-2xl lg:hidden ltr:left-6 rtl:right-6"
      @click="showSidebar = !showSidebar"
    >
      <Transition name="fade-preset">
        <span v-if="!showSidebar" key="closed" class="icon-[gravity-ui--bars] absolute"></span>
        <span v-else key="opened" class="icon-[gravity-ui--xmark] absolute"></span>
      </Transition>
    </div>

    <Transition name="fade-preset">
      <aside v-if="showSidebar" class="fixed top-0 z-10 h-full w-full lg:hidden">
        <span class="absolute inset-0 -z-10 bg-black/60" @click="showSidebar = false"></span>
        <div class="bg-bg-700 border-bg-400 z-20 flex h-full w-3/4 flex-col border-e-2 ltr:left-0 rtl:right-0">
          <header class="flex w-full justify-end px-2 py-9">
            <LogoMain animation="NONE" width="120px" height="auto" />
          </header>
          <span class="flex w-full px-4">
            <hr class="bg-bg-500 h-1 w-full border-0 outline-0" />
          </span>
          <ul class="mt-4 flex w-full flex-1 flex-col gap-4 overflow-y-auto px-2 py-4">
            <li v-for="item in menu" :key="item.key" class="w-full rounded-lg px-4" :class="{ 'bg-bg-600': $route.path === item.path }">
              <NuxtLink
                :to="item.path"
                class="group relative isolate flex py-3 text-lg"
                @click="
                  () => {
                    item.key === 'contact' ? crisp.showCrisp() : ''
                    showSidebar = false
                  }
                "
              >
                <p class="flex items-center gap-2 text-neutral-400 transition-all group-hover:text-white" :class="{ '!text-white': $route.path === item.path }">
                  <span :class="[item.icon]"></span>

                  {{ item.title }}
                </p>

                <div class="absolute left-6 top-full -z-10 flex w-full flex-col gap-1"> </div>
              </NuxtLink>
            </li>
          </ul>
          <div class="flex w-full flex-col justify-end gap-4 p-6">
            <NuxtLink v-if="!session.isLoggedIn" :to="localePath('/login')" class="w-full">
              <OpButton style-suffix="ip-online" style-type="btn-primary" class="w-full capitalize">{{ $t('login') }}</OpButton>
            </NuxtLink>

            <NuxtLink :to="localePath('/pricing')" class="w-full">
              <OpButton style-suffix="ip-online" style-type="btn-primary-outline" class="w-full capitalize">{{ $t('buyApi') }}</OpButton>
            </NuxtLink>

            <OpButton v-if="session.isLoggedIn" style-suffix="ip-online" style-type="btn-primary-side" class="w-full capitalize" @click="$router.push(localePath('/dashboard'))">
              {{ $t('dashboard') }}
            </OpButton>
          </div>
        </div>
      </aside>
    </Transition>
  </header>
</template>

<style scoped></style>
