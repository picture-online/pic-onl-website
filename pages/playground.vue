<script setup lang="ts">
import type { IDropdownData } from 'op-headless-lib/dist/types/lib/components/dropdown/Dropdown'

const testData = ref<IDropdownData[]>([
  { title: 'data-1', value: 'data-1' },
  { title: 'data-2', value: 'data-2' }
])

const selectedData = ref<IDropdownData[]>([testData.value[0]])

const inputs = ref('')
</script>
<template>
  <div class="flex flex-1 flex-col items-center justify-center gap-6 p-8">
    <div class="flex gap-4">
      {{ selectedData }}

      <OpDropdown
        v-model:selected-data="selectedData"
        :default-data="[testData[0]]"
        :data="testData"
        multi-selection
        style-suffix="ip-online"
        :caret-icon="'icon-[gravity-ui--chevron-down-wide] text-2xl'"
        >Button</OpDropdown
      >
    </div>

    <div class="flex gap-4">
      <OpButton style-suffix="ip-online" style-type="btn-primary">Button</OpButton>
      <OpButton style-suffix="ip-online" style-type="btn-primary-outline">Button</OpButton>
      <OpButton style-suffix="ip-online" style-type="btn-primary-side">Button</OpButton>
      <OpButton style-suffix="ip-online" style-type="btn-secondary">Button</OpButton>
      <OpButton style-suffix="ip-online" style-type="btn-secondary-outline">Button</OpButton>
      <OpButton style-suffix="ip-online" style-type="btn-secondary-side">Button</OpButton>
      <OpButton style-suffix="ip-online" style-type="btn-ghost">Button</OpButton>
      <OpButton style-suffix="ip-online" style-type="btn-ghost-outline">Button</OpButton>
      <OpButton style-suffix="ip-online" style-type="btn-ghost-side">Button</OpButton>
      <OpButton style-suffix="ip-online" style-type="btn-ghost" class="danger">Button</OpButton>
    </div>

    <OpInput v-model="inputs" style-suffix="ip-online" name="test" type="text" label="ip-online" />
    <OpInput v-model="inputs" style-suffix="normal" name="test" type="text" label="panel" class="text-base" />
    <OpInput v-model="inputs" style-suffix="normal" name="test" type="text" label="panel" class="text-base">
      <template #pre>
        <span class="icon-[gravity-ui--person] text-xl"></span>
      </template>
    </OpInput>
    <OpInput v-model="inputs" style-suffix="filled" name="test" type="text" label="panel" class="text-base" />
    <!-- <ClientOnly>
			<ChartTest3 />
		</ClientOnly>
		<ChartTest2 />
		<ChartMain :data="chartData" />
		<ChartTime :data="chartData" /> -->

    <svg stroke-linecap="round" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <rect rx="2" width="2.8" height="12" x="1" y="6" fill="#ffffff">
        <animate attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6" />
        <animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12" />
      </rect>
      <rect rx="2" width="2.8" height="12" x="5.8" y="6" fill="#ffffff">
        <animate attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6" />
        <animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12" />
      </rect>
      <rect rx="2" width="2.8" height="12" x="10.6" y="6" fill="#ffffff">
        <animate
          id="svgSpinnersBarsScaleMiddle0"
          attributeName="y"
          begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="6;1;6"
        />
        <animate attributeName="height" begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12" />
      </rect>
      <rect rx="2" width="2.8" height="12" x="15.4" y="6" fill="#ffffff">
        <animate attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6" />
        <animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12" />
      </rect>
      <rect rx="2" width="2.8" height="12" x="20.2" y="6" fill="#ffffff">
        <animate
          id="svgSpinnersBarsScaleMiddle1"
          attributeName="y"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.4s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="6;1;6"
        />
        <animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12" />
      </rect>
    </svg>

    <span class="icon-[svg-spinners--bars-scale-middle]"></span>
    <span class="icon-[gravity-ui--face-alien]"></span>
    <p>hello normal</p>
    <p class="font-[Inter]">hello Inter</p>
    <p class="font-[Lexend]">hello Lexend</p>

    <p class="">سلام معمولی</p>
    <p class="font-[Yekan_bakh]">سلام ایران یکان بخ</p>
    <p class="font- font-[Rubik]">سلام روبیک</p>
  </div>
</template>

<style scoped></style>
