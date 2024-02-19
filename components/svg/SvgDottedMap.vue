<script setup lang="ts">
import DottedMap from 'dotted-map'
import type { DottedMapLib } from 'dotted-map'
import { useIpStore } from '@/stores/ipStore'

// Hooks
const ipStore = useIpStore()

// Config
const map = new DottedMap({ height: 70, grid: 'diagonal', avoidOuterPins: false, width: 180 })
const mapOption: DottedMapLib.SvgSettings = {
  radius: 0.18,
  color: '#2E303E',
  shape: 'hexagon',
  backgroundColor: 'transparent'
}
const pinPointColor = '#f90345'

const svgMap = ref(map.getSVG(mapOption))
watchEffect(() => {
  if (!ipStore.info) return
  const { latitude: lat, longitude: lng } = ipStore.info
  const point: DottedMapLib.Pin = { lat, lng, svgOptions: { color: pinPointColor, radius: 0.33 } }
  map.addPin(point)
  svgMap.value = manipulateSVG(map.getSVG(mapOption))
})

// Manipulate svg
function manipulateSVG(baseSVG: string) {
  const color = pinPointColor
  const attributeToAppend = `id="IP-LOCATION-PIN"`
  const classAppend = `class="w-full h-full"`
  return baseSVG.replace(`<svg`, `<svg ` + classAppend).replace(`fill="${color}"`, `fill="${color}" ` + attributeToAppend)
}
</script>
<template>
  <div class="h-full w-full origin-center p-[2rem]" style="transform: rotateX(35deg)" v-html="svgMap"></div>
</template>

<style scoped></style>
