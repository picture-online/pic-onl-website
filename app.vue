<script setup lang="ts">
import { Toaster } from 'vue-sonner'

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})

useSeoMeta({
  robots: () => 'noindex'
})

const mounted = ref(false)

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  mounted.value = true
})
</script>
<template>
  <Html :lang="head?.htmlAttrs?.lang" :dir="head?.htmlAttrs?.dir">
    <ClientOnly>
      <Toaster theme="dark" rich-colors position="bottom-center" />
    </ClientOnly>
    <div class="h-full w-full overflow-hidden lg:overflow-visible" :class="{ '[&_*]:!animate-none [&_*]:!transition-none': !mounted }">
      <NuxtLayout />
    </div>
  </Html>
</template>

<style lang="scss"></style>
