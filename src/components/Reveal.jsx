import { useLayoutEffect, useRef } from 'react'

// Content stays visible by default. Animation is an enhancement, not a gate.
export default function Reveal({ as: Element = 'div', children, delay = 0, distance = 24, duration = 720, ...props }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const element = ref.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!element?.animate || !('IntersectionObserver' in window) || preference.matches) return

    let animation = null
    let observer = null
    let revealed = false

    const showImmediately = () => {
      revealed = true
      observer?.disconnect()
      animation?.cancel()
      animation = null
      delete element.dataset.revealed
    }

    const reveal = () => {
      if (revealed) return
      if (preference.matches || element.contains(document.activeElement)) {
        showImmediately()
        return
      }
      revealed = true
      observer?.disconnect()
      element.dataset.revealed = 'true'
      const entrance = element.animate([
        { opacity: 0, transform: `translate3d(0, ${distance}px, 0)` },
        { opacity: 1, transform: 'translate3d(0, 0, 0)' },
      ], {
        duration,
        delay,
        easing: 'cubic-bezier(.22, 1, .36, 1)',
        fill: 'backwards',
      })
      animation = entrance
      entrance.onfinish = () => {
        entrance.cancel()
        if (animation === entrance) animation = null
      }
    }

    const onPreferenceChange = event => { if (event.matches) showImmediately() }
    element.addEventListener('focusin', showImmediately)
    preference.addEventListener('change', onPreferenceChange)
    const bounds = element.getBoundingClientRect()
    if (bounds.top < window.innerHeight - 32 && bounds.bottom > 0) {
      reveal()
    } else {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) reveal()
      }, { threshold: 0, rootMargin: '0px 0px -32px 0px' })
      observer.observe(element)
    }

    return () => {
      observer?.disconnect()
      animation?.cancel()
      element.removeEventListener('focusin', showImmediately)
      preference.removeEventListener('change', onPreferenceChange)
      delete element.dataset.revealed
    }
  }, [delay, distance, duration])

  return <Element {...props} ref={ref} data-reveal>{children}</Element>
}
