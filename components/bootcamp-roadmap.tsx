'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Reveal from '@/components/ui/reveal'

function buildPath(
  circles: { cx: number; top: number; bottom: number }[],
  cpRatio = 0.55,
): string {
  if (circles.length < 1) return ''

  const first = circles[0]
  let d = `M ${first.cx} ${first.top - 100} L ${first.cx} ${first.bottom}`

  for (let i = 0; i < circles.length - 1; i++) {
    const from = circles[i]
    const to = circles[i + 1]
    const dy = to.top - from.bottom
    d += ` C ${from.cx} ${from.bottom + dy * cpRatio}, ${to.cx} ${to.top - dy * cpRatio}, ${to.cx} ${to.top}`
    d += ` L ${to.cx} ${to.bottom}`
  }

  const last = circles[circles.length - 1]
  d += ` L ${last.cx} ${last.bottom + 100}`
  return d
}

const EVENTS = [
  {
    session: 'Session 0',
    side: 'left' as const,
    title: 'Kickoff & Clarté',
    subtitle: 'Gratuite, avant le début',
    items: [
      'Appel de 30 min avec ton coach pour comprendre ton sujet, ton niveau, ta deadline',
      'On définit ensemble les fonctionnalités de ton MVP',
      'On structure ton plan de mémoire en amont',
      'Tu arrives à la Session 1 sans confusion avec un plan clair',
    ],
  },
  {
    session: 'Session 1',
    side: 'right' as const,
    title: 'Architecture & Setup du MVP',
    subtitle: 'Environnement configuré',
    items: [
      'Comment définir exactement les fonctionnalités de ton projet',
      'Configurer Claude Code et ton environnement de développement',
      'Générer la structure de base de ton application avec l\'IA',
      'Comprendre ce que l\'IA génère tu es le chef de projet',
    ],
    deliverable: 'Architecture définie + structure de base fonctionnelle',
  },
  {
    session: 'Session 2',
    side: 'left' as const,
    title: 'Développement Guidé',
    subtitle: 'Fonctionnalités principales construites',
    items: [
      'Construire les pages et fonctionnalités principales avec Claude Code',
      'Déboguer avec l\'IA comment décrire une erreur',
      'Connecter une base de données simple',
      'Itérer vite la méthode pour ne pas rester bloqué',
    ],
    deliverable: 'Application avec toutes les fonctionnalités principales',
  },
  {
    session: 'Session 3',
    side: 'right' as const,
    title: 'Déploiement & Finalisation',
    subtitle: 'Ton app est en ligne',
    items: [
      'Déployer sur Hawiyat SSL, domaine, configuration production',
      'Préparer la démo pour la soutenance',
      'Documenter ton projet de façon professionnelle',
      'Un lien réel à envoyer au jury pas un localhost',
    ],
    deliverable: 'MVP en production, accessible en ligne, demo-ready',
  },
  {
    session: 'Session 4',
    side: 'left' as const,
    title: 'Mémoire & Rapport',
    subtitle: 'Rédaction avec l\'IA',
    items: [
      'Structurer ton mémoire selon les exigences de l\'université algérienne',
      'Utiliser Claude Premium pour rédiger des sections complètes et académiques',
      'Techniques de prompting pour le contenu académique',
      'Template fourni : Prompt réutilisable pour chaque section',
    ],
    deliverable: 'Brouillon de mémoire 80% complet',
  },
  {
    session: 'Session 5',
    side: 'right' as const,
    title: 'Présentation & Soutenance',
    subtitle: 'Slides finalisés + simulation',
    items: [
      'Créer des slides impactantes avec l\'IA contenu, structure, visuels',
      'La structure narrative qui marche avec les jurys algériens',
      'Les 10 questions que les jurys posent toujours',
      'Simulation de soutenance en live avec ton coach',
    ],
    deliverable: 'Présentation finalisée + confiance à l\'oral',
  },
  {
    session: 'Bonus',
    side: 'left' as const,
    title: 'Review Complète & Go-Live',
    subtitle: 'Tout est parfait',
    items: [
      'Relecture finale du mémoire avec le coach',
      'Derniers ajustements de la présentation',
      'Simulation de soutenance complète',
      'Préparation mentale gérer le stress et les questions imprévues',
    ],
    deliverable: 'Dossier complet validé. Tu es prêt(e).',
  },
]

export default function BootcampRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const circleRefs = useRef<(HTMLDivElement | null)[]>([])

  const [pathD, setPathD] = useState('')
  const [svgW, setSvgW] = useState(0)
  const [svgH, setSvgH] = useState(0)
  const [totalLen, setTotalLen] = useState(0)
  const [activeCircle, setActiveCircle] = useState(-1)

  const recalculate = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { left: cl, top: ct, width, height } = container.getBoundingClientRect()
    const extraTop = 120

    setSvgW(width)
    setSvgH(height + extraTop)

    const circleData = circleRefs.current
      .filter(Boolean)
      .map((el) => {
        const r = el!.getBoundingClientRect()
        return {
          cx: r.left - cl + r.width / 2,
          top: r.top - ct + extraTop,
          bottom: r.top - ct + r.height + extraTop,
        }
      })

    if (circleData.length < 1) return

    setPathD(buildPath(circleData))
    setActiveCircle(-1)
  }, [])

  useEffect(() => {
    if (!pathD || !pathRef.current) return
    setTotalLen(pathRef.current.getTotalLength())
  }, [pathD])

  useEffect(() => {
    if (totalLen === 0 || !pathRef.current) return

    const onScroll = () => {
      const container = containerRef.current
      if (!container || !pathRef.current) return

      const rect = container.getBoundingClientRect()
      const vh = window.innerHeight
      const start = rect.top - vh * 0.8
      const end = rect.bottom - vh * 0.2
      const progress = Math.min(Math.max(-start / (end - start), 0), 1)

      pathRef.current.style.strokeDashoffset = String(totalLen * (1 - progress))

      const circleElements = circleRefs.current.filter(Boolean)
      let reachedCircle = -1
      for (let i = 0; i < circleElements.length; i++) {
        const threshold = (i + 0.5) / circleElements.length
        if (progress >= threshold) {
          reachedCircle = i
        }
      }
      setActiveCircle(reachedCircle)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [totalLen])

  useEffect(() => {
    recalculate()
    const ro = new ResizeObserver(recalculate)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [recalculate])

  const dashArray = totalLen || 9999

  return (
    <div className="relative w-full py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal direction="up" delay={0.2}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6 tracking-tight">
            Le Programme Session par Session
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-20 max-w-2xl mx-auto">
            En quelques semaines, tu finis ton mémoire, tu construis un vrai produit, et tu acquiers les compétences pour facturer 50,000–200,000 DA par projet.
          </p>
        </Reveal>

        <div ref={containerRef} className="relative" style={{ paddingTop: '80px' }}>

          {svgW > 0 && pathD && (
            <svg
              width={svgW}
              height={svgH}
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="absolute pointer-events-none"
              style={{ top: '-120px', left: 0, zIndex: 0, overflow: 'visible' }}
              aria-hidden="true"
            >
              <defs>
                <filter id="pglow" x="-60%" y="-20%" width="220%" height="140%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path d={pathD} fill="none" stroke="hsl(var(--foreground) / 0.08)" strokeWidth={1.5} strokeLinecap="round" />
              <path d={pathD} fill="none" stroke="hsl(var(--foreground) / 0.04)" strokeWidth={12} strokeLinecap="round" filter="url(#pglow)" strokeDasharray={dashArray} strokeDashoffset={dashArray} className="roadmap-line-glow" />
              <path ref={pathRef} d={pathD} fill="none" stroke="hsl(var(--foreground) / 0.2)" strokeWidth={1.8} strokeLinecap="round" strokeDasharray={dashArray} strokeDashoffset={dashArray} className="roadmap-line" />
            </svg>
          )}

          <div className="relative flex flex-col gap-48 sm:gap-64 mb-12" style={{ zIndex: 1 }}>
            {EVENTS.map((event, i) => {
              const isRight = event.side === 'right'
              return (
                <div key={event.session} className={`flex items-start gap-8 sm:gap-16 ${isRight ? 'flex-row-reverse' : ''}`}>
                  <div
                    ref={(el) => { circleRefs.current[i] = el }}
                    className="circle-node flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 flex flex-col items-center justify-center text-center cursor-default select-none transition-all duration-500 ease-out bg-card"
                    style={{
                      borderColor: activeCircle >= i ? 'hsl(var(--foreground))' : 'hsl(var(--border))',
                      boxShadow: activeCircle >= i ? '0 0 40px hsl(var(--foreground) / 0.1)' : 'none',
                    }}
                  >
                    <span className="text-xs sm:text-sm font-medium tracking-wide uppercase" style={{ color: activeCircle >= i ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))' }}>
                      {event.session}
                    </span>
                  </div>

                  <Reveal direction="up" delay={0.15 + i * 0.08}>
                    <div className={`flex-1 ${isRight ? 'text-right' : ''}`}>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground tracking-tight">
                        {event.title}
                      </h3>
                      <p className="text-sm mb-4 text-muted-foreground">
                        {event.subtitle}
                      </p>
                      <ul className={`space-y-2 ${isRight ? 'flex flex-col items-end' : ''}`}>
                        {event.items.map((item, j) => (
                          <li key={j} className={`text-sm text-muted-foreground leading-relaxed flex gap-2 items-baseline ${isRight ? 'flex-row-reverse' : ''}`}>
                            <span className="text-foreground flex-shrink-0 text-xs">◆</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {event.deliverable && (
                        <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border ${isRight ? 'flex-row-reverse' : ''}`} style={{ borderColor: 'hsl(var(--border))' }}>
                          <span className="text-muted-foreground">Livrable :</span>
                          <span className="text-foreground font-semibold">{event.deliverable}</span>
                        </div>
                      )}
                    </div>
                  </Reveal>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
