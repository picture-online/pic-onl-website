<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    maxPage: number
    yield?: boolean
    selectedPage: number
    isLoading?: boolean
    query?: boolean
  }>(),
  {
    maxPage: 1,
    selectedPage: 1
  }
)

const currentPage = ref(1)
const emits = defineEmits(['pageChanged'])

// TODO: route and queries should be handled as well

async function clickedPage(page: number) {
  if (props.yield || currentPage.value === page) {
    return
  }
  await new Promise((resolve) => setTimeout(resolve, 25))

  currentPage.value = page
  emits('pageChanged', page)
}

function getSelectedPage() {
  if (currentPage.value <= 3) {
    return 3
  } else {
    return currentPage.value
  }
}

function formatIV(iv: any) {
  const formattedIv = []
  for (const ivItem of iv) {
    if (ivItem > 0 && ivItem <= props.maxPage) {
      formattedIv.push(ivItem)
    }
  }
  return formattedIv
}

function getPagesIV() {
  const pagesIV = [getSelectedPage() - 2, getSelectedPage() - 1, getSelectedPage(), getSelectedPage() + 1, getSelectedPage() + 2]

  if (pagesIV.length === 5 && props.maxPage === 5) {
    return formatIV([1, 2, 3, 4, 5])
  }
  // console.log('pagesIV', pagesIV)

  for (const pageIndex in pagesIV) {
    const page = pagesIV[pageIndex]
    if (page >= props.maxPage) {
      if (pageIndex === '3') {
        return formatIV([getSelectedPage() - 3, getSelectedPage() - 2, getSelectedPage() - 1, getSelectedPage(), getSelectedPage() + 1])
      }
      if (pageIndex === '2') {
        return formatIV([getSelectedPage() - 4, getSelectedPage() - 3, getSelectedPage() - 2, getSelectedPage() - 1, getSelectedPage()])
      }
    }
  }

  return pagesIV
}

watch(
  () => props.selectedPage,
  () => {
    currentPage.value = props.selectedPage
  }
)
onMounted(() => (currentPage.value = props.selectedPage))
</script>
<template>
  <ul class="local-numbers flex select-none flex-row items-center gap-1 text-base" :class="{ 'disable-block': isLoading }" dir="ltr">
    <!-- first  -->
    <li v-if="getPagesIV()[0] > 1">
      <NuxtLink
        class="hover:bg-primary-500/50 flex min-w-[2em] shrink-0 cursor-pointer items-center justify-center rounded-lg px-2 py-1 font-bold transition-colors"
        :class="{ 'bg-primary-500 hover:!bg-primary-500 cursor-default !rounded-lg font-bold text-white': currentPage === 1 }"
        :to="query ? { query: { ...$route.query, page: 1 } } : ''"
        @click="clickedPage(1)"
      >
        1
      </NuxtLink>
    </li>
    <li v-if="getPagesIV()[0] > 1"> ... </li>

    <!-- middle -->
    <li v-for="page in getPagesIV()" :key="page.id">
      <NuxtLink
        class="hover:bg-primary-500/50 flex min-w-[2em] shrink-0 cursor-pointer items-center justify-center rounded-lg px-2 py-1 font-bold transition-colors"
        :class="{ 'bg-primary-500 hover:!bg-primary-500 cursor-default !rounded-lg font-bold text-white': currentPage === page }"
        :to="query ? { query: { ...$route.query, page } } : ''"
        @click="clickedPage(page)"
      >
        {{ page.toString() }}
      </NuxtLink>
    </li>

    <li v-if="currentPage + 2 < maxPage && maxPage > 5"> ... </li>

    <!-- last -->
    <li v-if="currentPage + 2 < maxPage && maxPage > 5">
      <NuxtLink
        class="hover:bg-primary-500/50 flex min-w-[2em] shrink-0 cursor-pointer items-center justify-center rounded-lg px-2 py-1 font-bold transition-colors"
        :class="{ 'bg-primary-500 hover:!bg-primary-500 cursor-default !rounded-lg font-bold text-white': currentPage === maxPage }"
        :to="query ? { query: { ...$route.query, page: maxPage } } : ''"
        @click="clickedPage(maxPage)"
      >
        {{ maxPage.toString() }}
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
