import type { ExternalToast } from 'vue-sonner/lib/types'
export default () => {
  // const dir = document.getElementsByTagName('html')[0].dir
  const defaultOptions = () => {
    return <ExternalToast>{
      position: 'bottom-center'
    }
  }
  return {
    defaultOptions
  }
}
