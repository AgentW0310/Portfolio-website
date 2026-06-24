import React, { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollReveal.css'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollReveal({
  children,
  as: Tag = 'div',
  lang = 'en',
  enableBlur = true,
  baseOpacity = 0.12,
  baseRotation = 2,
  blurStrength = 5,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom 65%',
  wordAnimationEnd = 'bottom 62%',
}) {
  const containerRef = useRef(null)
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : ''
    const segments = lang === 'en' ? text.split(/(\s+)/) : Array.from(text)
    return segments.map((word, index) => {
      if (word.match(/^\s+$/)) return word
      return <span className="reveal-word" key={`${word}-${index}`}>{word}</span>
    })
  }, [children, lang])

  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    const words = element.querySelectorAll('.reveal-word')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(element, { rotate: 0 })
      gsap.set(words, { opacity: 1, filter: 'none' })
      return
    }
    const context = gsap.context(() => {
      gsap.fromTo(element, {
        transformOrigin: '0% 50%',
        rotate: baseRotation,
      }, {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: element,
          start: 'top 92%',
          end: rotationEnd,
          scrub: true,
        },
      })
      gsap.fromTo(words, {
        opacity: baseOpacity,
        filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
      }, {
        ease: 'none',
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.035,
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          end: wordAnimationEnd,
          scrub: true,
        },
      })
    }, element)
    return () => context.revert()
  }, [enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength])

  return (
    <Tag ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <span className={`scroll-reveal-text ${textClassName}`}>{splitText}</span>
    </Tag>
  )
}
