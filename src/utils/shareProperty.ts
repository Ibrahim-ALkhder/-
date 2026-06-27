export function shareViaWhatsApp(url: string, title: string): void {
  const text = encodeURIComponent(`${title}\n${url}`)
  window.open(`https://wa.me/?text=${text}`, "_blank")
}

export function shareViaTwitter(url: string, title: string): void {
  const text = encodeURIComponent(title)
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, "_blank")
}

export async function copyLink(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url)
    return true
  } catch {
    return false
  }
}
