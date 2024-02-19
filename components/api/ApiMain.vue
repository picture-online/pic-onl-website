<script setup lang="ts">
import hljs from 'highlight.js'
const example = useExampleAPI()
const clipboard = useClipboard()

defineProps<{
  h1?: boolean
}>()
const localePath = useLocalePath()

const examples = ref([
  {
    title: 'JS',
    code: example.js
  },
  {
    title: 'Python',
    code: example.python
  },
  {
    title: 'PHP',
    code: example.php
  }
])

async function applySyntaxHighlighting() {
  await nextTick()

  document.querySelectorAll('.example-code').forEach((el) => {
    // console.log(el)
    hljs.highlightElement(el as HTMLElement)
  })
  await new Promise((resolve) => setTimeout(resolve, 300))
}

onMounted(async () => await applySyntaxHighlighting())
</script>

<template>
  <section aria-label="api section" class="flex w-full flex-col items-center justify-center p-8" dir="ltr">
    <header class="main-glitch-text mb-24 items-center text-center text-4xl capitalize lg:text-6xl">
      <span aria-hidden="true" class="select-none"> {{ $t('apiDocumentation') }} </span>
      <h1 v-if="h1"> {{ $t('apiDocumentation') }} </h1>
      <h5 v-else> {{ $t('apiDocumentation') }} </h5>
      <span aria-hidden="true" class="select-none"> {{ $t('apiDocumentation') }} </span>
    </header>

    <div class="flex w-full max-w-[80ch] flex-col gap-8">
      <h2> {{ $t('content.apiPage.h2') }} </h2>

      <h3 v-html="$t('content.apiPage.h3', { dashboard: localePath('/dashboard') })"> </h3>

      <div class="bg-bg-600 relative flex items-center justify-between gap-3 overflow-y-auto rounded-xl p-3 font-mono">
        <div class="flex gap-4">
          <span class="text-bg-300 font-bold"> [POST] </span>
          <code> https://api.ip.onl/api/webservice/action/query </code>
        </div>

        <div
          class="bg-bg-400/50 hover:bg-bg-400 border-bg-300 flex cursor-pointer rounded-lg border-2 p-2 transition-all"
          @click="clipboard.copy('https://api.ip.onl/api/webservice/action/query')"
        >
          <span class="icon-[gravity-ui--copy]"></span>
        </div>
      </div>

      <div class="flex flex-col">
        <h4> Headers: </h4>
        <ul class="ms-4 font-mono">
          <li>
            <span>api-key: </span>
            <span>Your API key</span>
          </li>
        </ul>
      </div>

      <div class="flex flex-col">
        <h4> Body: </h4>
        <ul class="ms-4 font-mono">
          <li>
            <span>ip: </span>
            <span> User's IP Address </span>
          </li>

          <li>
            <span>format: </span>
            <span> Response format: json, xml or yaml - Default: json </span>
          </li>

          <li>
            <span>type: </span>
            <span> Response type: short or full </span>
          </li>

          <li>
            <span> user-agent: </span>
            <span> User's user agent </span>
          </li>
        </ul>
      </div>

      <h4 class="mt-4"> Examples </h4>

      <div v-for="section in examples" :key="section.title" class="flex flex-col gap-4">
        <span class="flex items-center gap-4">
          <h5> {{ section.title }} </h5>
          <span class="bg-bg-400 h-[2px] w-full rounded-full"></span>
          <div class="bg-bg-400/50 hover:bg-bg-400 border-bg-300 flex cursor-pointer rounded-lg border-2 p-2 transition-all" @click="clipboard.copy(section.code)">
            <span class="icon-[gravity-ui--copy]"></span>
          </div>
        </span>
        <pre
          class="bg-bg-600/50 border-bg-400/50 rounded-xl border-2"
        ><code class="example-code" :class="[{'language-js': section.title === 'JS'}, {'language-python': section.title === 'Python'}, {'language-php': section.title === 'PHP'}]">{{ section.code }}</code></pre>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
