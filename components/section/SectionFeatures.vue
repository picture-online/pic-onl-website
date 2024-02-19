<script setup lang="ts">
const { t } = useI18n()

const features = ref([
  {
    title: t('modern'),
    key: 'modern',
    description: 'description 1',
    icon: 'icon 1'
  },
  {
    title: t('accurate'),
    key: 'accurate',
    description: 'description 2',
    icon: 'icon 2'
  },
  {
    title: t('publicApi'),
    key: 'public-api',
    description: 'description 3',
    icon: 'icon 3'
  },
  {
    title: t('curl'),
    key: 'curl',
    description: 'description 4',
    icon: 'icon 4'
  },
  {
    title: t('reliable'),
    key: 'reliable',
    description: 'description 5',
    icon: 'icon 5'
  }
])
</script>

<template>
  <section aria-label="features section" class="mb-24 flex w-full flex-col items-center justify-center">
    <header class="main-glitch-text mb-24 items-center text-center text-4xl capitalize lg:text-6xl">
      <span aria-hidden="true" class="select-none"> {{ $t('features') }} </span>
      <h3> {{ $t('features') }} </h3>
      <span aria-hidden="true" class="select-none"> {{ $t('features') }} </span>
    </header>

    <div class="flex w-full items-center justify-center">
      <ul class="flex w-full flex-wrap items-center justify-center px-8">
        <li v-for="i in features" :key="i.key" class="width-[24rem] relative flex lg:-mx-6 lg:odd:translate-y-[3rem] lg:even:translate-y-[-3rem]">
          <div class="feature bg-bg-400 w-[14rem]"></div>

          <div class="text-bg-50 absolute inset-0 flex items-center justify-center text-3xl font-semibold">
            {{ i.title }}
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
// li {
//   &:nth-child(even) {
//     transform: translateY(-3rem);
//   }

//   &:nth-child(odd) {
//     transform: translateY(3rem);
//   }
// }
.feature {
  clip-path: polygon(
    100% 50%,
    75% 93.3%,
    25% 93.3%,
    0% 50%,
    25% 6.7%,
    75% 6.7%,
    100% 50%,
    calc(75% - 4px) calc(6.7% - -6.93px),
    calc(25% - -4px) calc(6.7% - -6.93px),
    calc(0% - -8px) calc(50% - 0px),
    calc(25% - -4px) calc(93.3% - 6.93px),
    calc(75% - 4px) calc(93.3% - 6.93px),
    calc(100% - 8px) calc(50% - 0px),
    calc(75% - 4px) calc(6.7% - -6.93px)
  );
  aspect-ratio: 1;
}
</style>
