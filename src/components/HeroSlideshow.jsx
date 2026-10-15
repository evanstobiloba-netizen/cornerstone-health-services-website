import { useEffect, useState } from 'react'

/**
 * Hero background slideshow.
 *
 * The three images are the practice's own hero-slider assets, taken from the
 * live site (`/wp-content/themes/cornerstonde928/images/slider/{1,2,3}.jpg`)
 * and stored locally so nothing is hot-linked.
 *
 * Behaviour notes:
 *   - Auto-advance is disabled when the visitor asks for reduced motion. The
 *     dots still work, so the images stay reachable without moving on their own.
 *   - The first slide renders visible in the prerendered HTML; the interval
 *     only starts after mount, so there is never a hydration mismatch.
 *   - Images are decorative (the hero copy carries the meaning), so they are
 *     aria-hidden with empty alt text.
 */
export const HERO_SLIDES = [
  { src: '/hero/slide-1.jpg' },
  { src: '/hero/slide-2.jpg' },
  { src: '/hero/slide-3.jpg' },
]

export default function HeroSlideshow({
  slides = HERO_SLIDES,
  interval = 6500,
  className = '',
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reducedMotion || paused) return undefined
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      interval,
    )
    return () => window.clearInterval(id)
  }, [reducedMotion, paused, interval, slides.length])

  return (
    <>
      <div
        className={className}
        aria-hidden="true"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt=""
            decoding="async"
            fetchPriority={i === 0 ? 'high' : 'low'}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      <div
        className="absolute inset-x-0 bottom-5 z-20 flex justify-center gap-1.5"
        role="group"
        aria-label="Hero image slideshow"
      >
        {slides.map((slide, i) => {
          const active = i === index
          return (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1} of ${slides.length}`}
              aria-current={active ? 'true' : undefined}
              className="group grid h-6 w-6 place-items-center rounded-full"
            >
              <span
                aria-hidden="true"
                className={`block rounded-full transition-all duration-300 ${
                  active
                    ? 'h-2.5 w-6 bg-cyan-deep'
                    : 'h-2.5 w-2.5 bg-navy/30 group-hover:bg-navy/60'
                }`}
              />
            </button>
          )
        })}
      </div>
    </>
  )
}
