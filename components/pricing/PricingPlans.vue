<script setup lang="ts">
import type { Plan } from '@ip-online/types/pricing'

defineEmits<{
  selectedPlan: [plan: Plan]
}>()

defineProps<{
  plans: Plan[]
}>()

const yearly = useState('isPlanYearly', () => true)
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <div class="flex flex-col items-center gap-4">
      <header class="main-glitch-text items-center text-center text-3xl capitalize lg:text-4xl">
        <span aria-hidden="true" class="select-none"> {{ $t('selectYourPlan') }} </span>
        <h1> {{ $t('selectYourPlan') }} </h1>
        <span aria-hidden="true" class="select-none"> {{ $t('selectYourPlan') }} </span>
      </header>
      <p class="max-w-[70ch] text-center text-base text-neutral-400"
        >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p
      >

      <div class="mt-6 flex items-center gap-9 lg:gap-6">
        <span class="flex cursor-pointer select-none items-center justify-center lg:w-32" @click="yearly = false">
          <p class="relative flex text-lg text-neutral-500 transition-all lg:text-2xl" :class="{ '!text-white': !yearly }">
            {{ $t('monthly') }}

            <span
              class="bg-primary-500 absolute right-4 top-full h-1 w-full scale-x-0 transform-gpu transition-all will-change-transform ltr:origin-right rtl:origin-left"
              :class="{ 'scale-x-100': !yearly }"
            ></span>
          </p>
        </span>

        <OpSwitch v-model="yearly" class="!hidden lg:!flex" style-suffix="ip-online-pricing" :initial-value="yearly" />

        <span class="relative flex cursor-pointer select-none items-center justify-center lg:w-32" @click="yearly = true">
          <p class="relative text-lg text-neutral-500 transition-all lg:text-2xl" :class="{ '!text-white': yearly }">
            {{ $t('yearly') }}

            <span
              class="bg-primary-500 absolute right-4 top-full h-1 w-full scale-x-0 transform-gpu transition-all will-change-transform ltr:origin-right rtl:origin-left"
              :class="{ 'scale-x-100': yearly }"
            ></span>
          </p>
          <span
            class="border-primary bg-primary/20 absolute top-[calc(100%_+_0.5rem)] whitespace-nowrap rounded-full border-2 px-3 py-1 text-xs lg:left-[calc(100%)] lg:top-auto lg:text-sm"
            >Save 20%</span
          >
        </span>
      </div>

      <section v-if="plans.length" class="mt-16 flex w-full flex-col gap-12 lg:flex-row" aria-label="plans">
        <div
          v-for="plan in plans"
          :key="plan.plan_name"
          class="lg:order-1"
          :class="[{ 'order-1': plan.plan_name === 'Personal' }, { 'order-2': plan.plan_name === 'Standard' }, { 'order-3': plan.plan_name === 'Basic' }]"
        >
          <PricingPlan :plan="plan" :yearly="yearly" @selected-plan="$emit('selectedPlan', $event)" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
