import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_NAME,
  buildJsonLd,
  canonicalFor,
  getSeo,
} from '../data/seo.js'

/**
 * Keeps <head> in sync during client-side navigation.
 *
 * Renders nothing. On a prerendered page the tags are already correct in the
 * served HTML, so the first pass here simply confirms them; on client-side
 * route changes it rewrites them.
 *
 * Tags are matched by their real selector (e.g. meta[property="og:title"])
 * rather than a private marker, so the prerendered tags are updated in place
 * instead of being duplicated.
 */

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(pathname) {
  const id = 'seo-jsonld'
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(buildJsonLd(pathname))
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = getSeo(pathname)
    const url = canonicalFor(seo.path)

    document.title = seo.title

    setMeta('name', 'description', seo.description)
    setMeta(
      'name',
      'robots',
      seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    )
    setLink('canonical', url)

    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'en_US')
    setMeta('property', 'og:title', seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', OG_IMAGE)
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')
    setMeta('property', 'og:image:alt', OG_IMAGE_ALT)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', seo.title)
    setMeta('name', 'twitter:description', seo.description)
    setMeta('name', 'twitter:image', OG_IMAGE)
    setMeta('name', 'twitter:image:alt', OG_IMAGE_ALT)

    setJsonLd(seo.path)
  }, [pathname])

  return null
}
