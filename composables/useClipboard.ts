export default function clipboard() {
  const { toast } = useToastMessage()
  const { t } = useI18n()

  const permissionWrite = usePermission('clipboard-write')
  const permissionRead = usePermission('clipboard-read')

  async function copy(value: string, id?: string) {
    if (permissionWrite.value === 'denied' || !navigator.clipboard) return toast(t('clipboard.NO_PERMISSION'), 'ERROR', { id: 'permissionDenied' })
    await navigator.clipboard.writeText(value)
    toast(t('clipboard.COPIED'), 'SUCCESS', { id: id || 'copyToClipboardSuccess' })
  }

  async function read() {
    if (permissionRead.value === 'denied' || !navigator.clipboard) {
      toast(t('clipboard.NO_PERMISSION'), 'ERROR', { id: 'permissionDenied' })
      return false
    }

    return await navigator.clipboard.readText()
  }

  return { read, copy }
}
