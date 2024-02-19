<script lang="ts" setup>
defineProps<{
  error?: boolean
}>()
</script>
<template>
  <section class="isolate flex h-full w-full flex-col">
    <NuxtLoadingIndicator color="#E9436F" />

    <slot v-if="error" name="error"></slot>
    <div v-else class="flex flex-1">
      <NuxtPage class="w-full" />
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
