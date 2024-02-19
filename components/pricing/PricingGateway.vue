<script setup lang="ts">
// import type { IDropdownData } from 'op-headless-lib/dist/types/lib/components/dropdown/Dropdown'
import type { Plan, CoinCurrency } from '@ip-online/types/pricing'
import type { IDropdownData } from '@ip-online/types/op-headless-lib'

const { t } = useI18n()
// const router = useRouter()

defineEmits<{
  back: [back: void]
}>()

const props = defineProps<{
  plan: Plan
  gateways: string[]
  currencies: CoinCurrency[]
}>()

const yearly = useState('isPlanYearly', () => true)

const gatewaysData = ref<IDropdownData[]>([
  {
    title: t('crypto'),
    value: 'coinpayments'
  },
  {
    title: t('stripe'),
    value: 'stripe'
  }
])

const selectedGateway = ref<IDropdownData[]>([gatewaysData.value[0]])

const currenciesData = ref<IDropdownData[]>(props.currencies.map((currency) => ({ title: currency.symbol, value: currency.symbol, img: currency.icon })))

const selectedCurrency = ref<IDropdownData[]>([currenciesData.value[0]])

// API
// ====
const isBusy = ref(false)
const errorMessage = ref('')

async function submitPayment() {
  if (!props.plan.billing_cycle) return
  isBusy.value = true
  errorMessage.value = ''

  const res = await useAPI('payment', {
    plan_id: props.plan.billing_cycle[yearly.value ? 'yearly' : 'monthly'].plan_id,
    billing_cycle: yearly.value ? 'yearly' : 'monthly',
    gateway: selectedGateway.value[0].value as string,
    currency: selectedCurrency.value[0].value as string
  })

  // console.log('res 💬', res)
  if (!res) return (isBusy.value = false)
  if (!res.success) {
    errorMessage.value = res.msg
    isBusy.value = false
    return
  }

  isBusy.value = false
  window.location.href = res.result.checkout_url
}
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center gap-8 p-8 lg:flex-row lg:gap-24">
    <!-- <pre>{{ plan }}</pre> -->

    <section aria-label="check out" class="flex w-full flex-col items-center gap-8 lg:w-auto">
      <header class="flex w-full items-center gap-2">
        <div class="main-glitch-text items-center text-center text-3xl capitalize lg:text-4xl">
          <span aria-hidden="true" class="select-none"> {{ $t('checkOut') }} </span>
          <h1> {{ $t('checkOut') }} </h1>
          <span aria-hidden="true" class="select-none"> {{ $t('checkOut') }} </span>
        </div>
      </header>

      <div class="flex w-full flex-wrap items-center justify-center gap-4 lg:w-[18rem]">
        <OpDropdown
          v-model:selected-data="selectedGateway"
          :data="gatewaysData"
          style-suffix="ip-online"
          class="w-full"
          :caret-icon="'icon-[gravity-ui--chevron-down-wide] text-2xl'"
        ></OpDropdown>

        <OpDropdown
          v-if="selectedGateway[0].value === 'coinpayments'"
          v-model:selected-data="selectedCurrency"
          :data="currenciesData"
          style-suffix="ip-online"
          class="w-full"
          :caret-icon="'icon-[gravity-ui--chevron-down-wide] text-2xl'"
        ></OpDropdown>

        <div class="mt-7 flex w-full lg:hidden">
          <div class="bg-bg-700 border-primary it flex w-full flex-col gap-8 rounded-3xl border-2 p-4 lg:w-[18rem] lg:p-8">
            <header class="relative flex w-full flex-col items-center justify-center gap-4">
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

              <div class="flex flex-col items-center gap-4">
                <p>
                  <Transition v-if="plan.billing_cycle" mode="out-in" name="fade-preset">
                    <strong :key="String(yearly)" class="text-5xl">${{ yearly ? plan.billing_cycle.yearly.price : plan.billing_cycle.monthly.price }}</strong>
                  </Transition>
                </p>

                <p class="text-lg font-semibold text-neutral-500">
                  {{ yearly ? t('yearly') : t('monthly') }}
                </p>
              </div>
            </header>

            <ul class="w-full items-center justify-center">
              <li class="flex w-full items-center justify-center py-2">
                <span>{{ $t('hourlyLimit') }} {{ plan.hourly_limit }}</span>
              </li>

              <li class="flex w-full items-center justify-center py-2">
                <span>{{ $t('dailyLimit') }} {{ plan.daily_limit }}</span>
              </li>

              <li class="flex w-full items-center justify-center py-2">
                <span>{{ $t('monthlyLimit') }} {{ plan.monthly_limit }}</span>
              </li>
            </ul>
          </div>
        </div>

        <form class="mt-12 flex w-full flex-col gap-6" @submit.prevent="submitPayment">
          <OpButton style-suffix="ip-online" class="w-full" style-type="btn-primary" type="submit" :loading="isBusy">
            {{ $t('buy') }}
            <template #loader>
              <BaseLoaderDots class="w-[1.7rem] text-white" />
            </template>
          </OpButton>

          <OpButton style-suffix="ip-online" class="w-full" style-type="btn-ghost" @click="$emit('back')" :disabled="isBusy">
            {{ $t('back') }}
          </OpButton>
        </form>
      </div>
    </section>

    <div class="hidden lg:flex">
      <div class="bg-bg-700 border-primary it flex w-full flex-col gap-8 rounded-3xl border-2 p-4 lg:w-[18rem] lg:p-8">
        <header class="relative flex w-full flex-col items-center justify-center gap-4">
          <h3 class="text-lg text-neutral-400">
            {{ plan.plan_name }}
          </h3>

          <Transition v-if="plan.billing_cycle" mode="out-in" name="fade-preset">
            <span
              v-if="plan.billing_cycle"
              :key="String(yearly)"
              class="bg-primary absolute bottom-full right-0 whitespace-nowrap p-4 py-2 text-xs text-white empty:hidden lg:bottom-auto lg:top-[0rem] lg:translate-x-[60%] lg:text-sm"
            >
              {{ yearly ? plan.billing_cycle.yearly.label : plan.billing_cycle.monthly.label }}
            </span>
          </Transition>

          <div class="flex flex-col items-center gap-4">
            <p>
              <Transition v-if="plan.billing_cycle" mode="out-in" name="fade-preset">
                <strong :key="String(yearly)" class="text-5xl">${{ yearly ? plan.billing_cycle.yearly.price : plan.billing_cycle.monthly.price }}</strong>
              </Transition>
            </p>

            <p class="text-lg font-semibold text-neutral-500">
              {{ yearly ? t('yearly') : t('monthly') }}
            </p>
          </div>
        </header>

        <ul class="w-full items-center justify-center">
          <li class="flex w-full items-center justify-center py-2">
            <span>{{ $t('hourlyLimit') }} {{ plan.hourly_limit }}</span>
          </li>

          <li class="flex w-full items-center justify-center py-2">
            <span>{{ $t('dailyLimit') }} {{ plan.daily_limit }}</span>
          </li>

          <li class="flex w-full items-center justify-center py-2">
            <span>{{ $t('monthlyLimit') }} {{ plan.monthly_limit }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
