<script setup lang="ts">
import type { Plan } from '@ip-online/types/pricing'
import { useSessionStore } from '@/stores/session'

const session = useSessionStore()

const localePath = useLocalePath()

defineEmits<{
  selectedPlan: [plan: Plan]
}>()

const props = defineProps<{
  plan: Plan
}>()

const yearly = useState('isPlanYearly', () => true)
const favorPickPlan = computed(() => props.plan.plan_name === 'Personal')

function roundTo(decimals: number) {
  return Math.round((decimals + Number.EPSILON) * 100) / 100
}

function formatNumber(num: number) {
  if (num > 999 && num < 1000000) {
    const formattedNum = (num / 1000).toFixed(1)
    return formattedNum.endsWith('.0') ? formattedNum.slice(0, -2) + 'k' : formattedNum + 'k'
  } else if (num > 1000000) {
    const formattedNum = (num / 1000000).toFixed(1)
    return formattedNum.endsWith('.0') ? formattedNum.slice(0, -2) + 'm' : formattedNum + 'm'
  } else {
    return num
  }
}
</script>

<template>
  <div class="bg-bg-700 border-bg-400 it flex min-h-[32rem] w-full flex-col gap-8 rounded-3xl border-2 lg:w-[18rem]">
    <header class="relative flex h-[11rem] w-full flex-col items-center justify-start gap-4 p-4 lg:p-8">
      <h3 class="text-lg text-neutral-400">
        {{ plan.plan_name }}
      </h3>

      <Transition v-if="plan.billing_cycle" mode="out-in" name="fade-preset">
        <span
          v-if="plan.billing_cycle"
          :key="String(yearly)"
          class="bg-primary absolute bottom-full right-0 whitespace-nowrap p-4 py-2 text-xs text-white empty:hidden lg:bottom-auto lg:top-[1.5rem] lg:translate-x-[60%] lg:text-sm"
        >
          {{ yearly ? plan.billing_cycle.yearly.label : plan.billing_cycle.monthly.label }}
        </span>
      </Transition>

      <div class="h-full">
        <span v-if="session.isLoggedIn && plan.plan_name === session.user?.user_plan" class="border-primary flex h-full flex-1 items-center border-b-2 text-xl text-neutral-100">
          {{ $t('currentPlan') }}
        </span>
        <p v-else>
          <Transition v-if="plan.billing_cycle" mode="out-in" name="fade-preset">
            <strong :key="String(yearly)" class="text-5xl" :class="{ 'text-primary': favorPickPlan }"
              >${{ yearly ? roundTo(plan.billing_cycle.yearly.price / 12) : plan.billing_cycle.monthly.price }}</strong
            >
          </Transition>

          <strong v-else class="text-5xl" :class="{ 'text-primary': favorPickPlan }"> $0 </strong>
          <span class="text-neutral-500">/mo</span>
        </p>
      </div>

      <div v-if="plan.plan_name !== session.user?.user_plan" class="mt-4 w-full">
        <OpButton
          v-if="plan.plan_name === 'Basic'"
          style-suffix="ip-online"
          class="w-full"
          :style-type="favorPickPlan ? 'btn-primary' : 'btn-primary-outline'"
          @click="$router.push(localePath('/login'))"
        >
          {{ $t('getStarted') }}
        </OpButton>

        <OpButton
          v-else
          style-suffix="ip-online"
          class="w-full"
          :style-type="favorPickPlan ? 'btn-primary' : 'btn-primary-outline'"
          @click="session.isLoggedIn ? $emit('selectedPlan', plan) : $router.push(localePath('/login'))"
        >
          {{ $t('buyNow') }}
        </OpButton>
      </div>
    </header>

    <ul class="mt-4 flex w-full flex-col items-center justify-center gap-4 p-4 lg:mt-9">
      <li class="bg-bg-600/60 flex w-full items-center justify-center rounded-xl py-2">
        <span> {{ formatNumber(plan.hourly_limit) }} {{ $t('requests') }}/{{ $t('hour') }}</span>
      </li>

      <li class="bg-bg-600/60 flex w-full items-center justify-center rounded-xl py-2">
        <span> {{ formatNumber(plan.daily_limit) }} {{ $t('requests') }}/{{ $t('day') }}</span>
      </li>

      <li class="bg-bg-600/60 flex w-full items-center justify-center rounded-xl py-2">
        <span> {{ formatNumber(plan.monthly_limit) }} {{ $t('requests') }}/{{ $t('month') }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
