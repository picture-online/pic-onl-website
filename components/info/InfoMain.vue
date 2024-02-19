<script setup lang="ts">
const userAgent = ref<string>('')
const ip = ref<string>('')
const country = ref<string>('')
const city = ref<string>('')
const region = ref<string>('')
const isp = ref<string>('')
</script>

<template>
  <div class="h-full w-full">
    <!-- generate a table for user agent and ip info -->
    <div class="border-primary-500 mt-5 w-full rounded-2xl border-2 p-2">
      <div class="">
        <table class="mx-auto table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2">User Agent</th>
              <th class="px-4 py-2">IP</th>
              <th class="px-4 py-2">Country</th>
              <th class="px-4 py-2">City</th>
              <th class="px-4 py-2">Region</th>
              <th class="px-4 py-2">ISP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">{{ userAgent }}</td>
              <td class="border px-4 py-2">{{ ip }}</td>
              <td class="border px-4 py-2">{{ country }}</td>
              <td class="border px-4 py-2">{{ city }}</td>
              <td class="border px-4 py-2">{{ region }}</td>
              <td class="border px-4 py-2">{{ isp }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
