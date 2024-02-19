<script setup lang="ts">
import { useIpStore } from '@/stores/ipStore'

const ipStore = useIpStore()
const { ips, fetchIps } = useUserIp()
const isBusy = ref(true)
const clipboard = useClipboard()

watchEffect(async () => {
  const timeout = new Promise((resolve) => setTimeout(resolve, 5000))
  await Promise.race([fetchIps(), timeout])
  if (ipStore.info) isBusy.value = false
  else
    watch(
      () => ipStore.info,
      () => (isBusy.value = !ipStore.info)
    )
})

function loadCountryFlag(countryCode: string) {
  return `https://raw.githubusercontent.com/hampusborgos/country-flags/master/svg/${countryCode}.svg`
}
</script>

<template>
  <div class="flex flex-col p-4">
    <div class="flex flex-col gap-8 lg:flex-row">
      <div class="top-1/2 flex w-full flex-col gap-4 self-start lg:sticky lg:w-[25rem]">
        <section aria-label="My Public IPv4" class="border-bg-400 bg-bg-500/50 group relative flex flex-row items-center gap-4 rounded-xl border-2 p-2">
          <h2 class="whitespace-nowrap text-neutral-400">My Public IPv4:</h2>
          <span v-if="isBusy" class="flex w-full"><BaseLoaderDots class="w-6 opacity-40" /></span>
          <span v-else-if="ips.v4" class="line-clamp-1 w-[55%] break-all"> {{ ips.v4 }}</span>

          <div
            class="bg-bg-500 hover:bg-bg-400 border-bg-300 absolute right-2 top-1/2 flex -translate-y-1/2 cursor-pointer rounded-lg border-2 p-1 transition-all lg:invisible lg:opacity-0 group-hover:lg:visible group-hover:lg:opacity-100"
            @click="clipboard.copy(ips.v4)"
          >
            <span class="icon-[gravity-ui--copy]"></span>
          </div>
        </section>

        <section aria-label="My Public IPv6" class="group w-full">
          <div class="border-bg-400 bg-bg-500/50 relative flex flex-row items-center gap-4 rounded-xl border-2 p-2">
            <h2 class="whitespace-nowrap text-neutral-400">My Public IPv6:</h2>
            <span v-if="isBusy" class="flex w-full"><BaseLoaderDots class="w-6 opacity-40" /></span>

            <span v-else-if="ips.v6" class="line-clamp-1 w-[55%] break-all"> {{ ips.v6 }}</span>

            <div
              class="bg-bg-500 hover:bg-bg-400 border-bg-300 absolute right-2 top-1/2 flex -translate-y-1/2 cursor-pointer rounded-lg border-2 p-1 transition-all lg:invisible lg:opacity-0 group-hover:lg:visible group-hover:lg:opacity-100"
              @click="clipboard.copy(ips.v6)"
            >
              <span class="icon-[gravity-ui--copy]"></span>
            </div>
          </div>
        </section>

        <section aria-label="My IP Location">
          <div class="border-bg-400 bg-bg-500/50 flex flex-row items-center gap-4 rounded-xl border-2 p-2">
            <h2 class="whitespace-nowrap text-neutral-400">My IP Location:</h2>
            <span v-if="isBusy" class="flex w-full"><BaseLoaderDots class="w-6 opacity-40" /></span>
            <span v-else-if="ipStore.info?.country" class="flex items-center gap-2">
              {{ ipStore.info?.country }}
              <span class="flex w-12 shrink-0">
                <img class="h-[9px] w-[16px]" width="16" height="9" :src="loadCountryFlag(ipStore.info.country_code.toLocaleLowerCase())" loading="lazy" alt=""
              /></span>
            </span>
          </div>
        </section>
        <section aria-label="My Continent">
          <div class="border-bg-400 bg-bg-500/50 flex flex-row items-center gap-4 rounded-xl border-2 p-2">
            <h5 class="whitespace-nowrap text-neutral-400">My Continent:</h5>
            <span v-if="isBusy" class="flex w-full"><BaseLoaderDots class="w-6 opacity-40" /></span>
            <span v-else-if="ipStore.info?.continent"> {{ ipStore.info?.continent }}</span>
          </div>
        </section>

        <section aria-label="My City">
          <div class="border-bg-400 bg-bg-500/50 flex flex-row items-center gap-4 rounded-xl border-2 p-2">
            <h5 class="whitespace-nowrap text-neutral-400">My City:</h5>
            <span v-if="isBusy" class="flex w-full"><BaseLoaderDots class="w-6 opacity-40" /></span>
            <span v-else-if="ipStore.info?.city"> {{ ipStore.info?.city }}</span>
          </div>
        </section>
        <section aria-label="My ISP">
          <div class="border-bg-400 bg-bg-500/50 flex flex-row items-center gap-4 rounded-xl border-2 p-2">
            <h2 class="whitespace-nowrap text-neutral-400">My ISP:</h2>
            <span v-if="isBusy" class="flex w-full"><BaseLoaderDots class="w-6 opacity-40" /></span>
            <span v-else-if="ipStore.info?.isp" class="line-clamp-1 text-sm"> {{ ipStore.info?.isp }} </span>
          </div>
        </section>
      </div>

      <div class="flex max-w-[70ch] flex-col gap-8">
        <header class="main-glitch-text text-4xl capitalize lg:self-start lg:text-5xl">
          <span aria-hidden="true" class="select-none"> What is my ip?</span>
          <h1>What is my ip?</h1>
          <span aria-hidden="true" class="select-none">What is my ip?</span>
        </header>

        <section aria-label="what is dns" class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold"> What Is DNS? </h3>

          <p>
            DNS, short for Domain Name System, is a crucial component of the internet's functionality, acting as the internet's phone book. It translates human-friendly domain
            names, like <a href="Https://ip.onl" class="normal-link"> ip.onl </a>, into IP addresses that computers use to identify each other on the network. This system allows
            users to access websites using domain names instead of complex numerical IP addresses.
          </p>
        </section>

        <section aria-label="what is dns" class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold"> What Is A vpn? </h3>

          <p>
            A VPN, or Virtual Private Network, is a security tool that creates a secure, encrypted connection over a less secure network, such as the internet. It allows users to
            send and receive data across shared or public networks as if their computing devices were directly connected to a private network. This enhances privacy and security by
            masking the user's IP address, thus making their online actions virtually untraceable.
          </p>
        </section>

        <section aria-label="what is dns" class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold"> What Is A Proxy? </h3>

          <p>
            A proxy, in the context of networking, acts as an intermediary server between a user's device and the internet. It serves various purposes, such as facilitating access
            to websites, hiding a user's real IP address for anonymity, and bypassing geo-restrictions or filters. By routing requests through itself, a proxy can also cache data
            to speed up common requests, enhance security by blocking malicious websites, and monitor and log web traffic for compliance or auditing purposes.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
