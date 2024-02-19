import lib from 'op-headless-lib'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(lib)
})
