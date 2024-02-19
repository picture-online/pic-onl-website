import { acceptHMRUpdate, defineStore } from 'pinia'


export const useSessionStore = defineStore('user', {
  state: () => ({
    user: undefined ,
    token: undefined as string | undefined
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    logout() {
      this.user = undefined
      this.token = undefined
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSessionStore, import.meta.hot))
}
