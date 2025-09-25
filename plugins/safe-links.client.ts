/**
 * Safe Links Plugin
 * - Ensures any <a target="_blank"> has rel="noopener noreferrer" to prevent tabnabbing.
 * - Runs after DOM is ready and observes future DOM changes with a lightweight MutationObserver.
 */
export default defineNuxtPlugin(() => {
  if (process.server) return

  const harden = (root: ParentNode | Document = document) => {
    const anchors = root.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]')
    anchors.forEach((a) => {
      const rel = (a.getAttribute('rel') || '').toLowerCase()
      const parts = new Set(rel.split(/\s+/).filter(Boolean))
      if (!parts.has('noopener')) parts.add('noopener')
      if (!parts.has('noreferrer')) parts.add('noreferrer')
      a.setAttribute('rel', Array.from(parts).join(' '))
    })
  }

  const init = () => {
    harden(document)

    // Observe for added anchors to keep policy applied for dynamically inserted content
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'childList') {
          m.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              harden(node as Element)
            }
          })
        }
      }
    })

    observer.observe(document.documentElement, {
      subtree: true,
      childList: true
    })

    // Clean up on page unload
    window.addEventListener('beforeunload', () => observer.disconnect())
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true })
  } else {
    init()
  }
})
