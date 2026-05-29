'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Reveal from '@/components/ui/reveal'
import { Zap, BookOpen, Presentation, Code, Rocket, Globe, Check } from 'lucide-react'

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

const SESSIONS = [
  {
    icon: Zap,
    session: 'Session 0',
    title: 'Kickoff & Clarté',
    subtitle: 'Gratuite, avant le début',
    description: 'Avant même de commencer, on clarifie ton projet.',
    items: [
      'Appel de 30 min avec ton coach pour comprendre ton sujet, ton niveau, ta deadline',
      'On définit ensemble les fonctionnalités de ton MVP',
      'On structure ton plan de mémoire en amont',
      'Tu arrives à la Session 1 sans confusion avec un plan clair',
    ],
    why: 'La plupart des étudiants perdent 2 semaines à tourner en rond sur leur sujet. On coupe ça dès le départ.',
  },
  {
    icon: Code,
    session: 'Session 1',
    title: 'Architecture & Setup du MVP',
    subtitle: 'Environnement configuré',
    description: 'Objectif : Environnement configuré, architecture définie, premiers fichiers générés.',
    items: [
      'Ce qu\'est un MVP et pourquoi les étudiants le construisent mal (trop complexe, mauvaises priorités)',
      'Comment définir exactement les fonctionnalités de ton projet ni trop, ni trop peu',
      'Configurer Claude Code et ton environnement de développement from scratch',
      'Générer la structure de base de ton application avec l\'IA',
      'Comprendre ce que l\'IA génère tu n\'es pas un copier-coller, tu es le chef de projet',
    ],
    deliverable: 'Architecture définie + structure de base fonctionnelle',
    why: 'Tu guides l\'IA, tu ne la suis pas aveuglément. À la fin de cette session, tu comprends chaque fichier de ton projet.',
  },
  {
    icon: Rocket,
    session: 'Session 2',
    title: 'Développement Guidé',
    subtitle: 'Fonctionnalités principales construites',
    description: 'Objectif : Fonctionnalités principales construites et testées.',
    items: [
      'Construire les pages et fonctionnalités principales avec Claude Code',
      'Déboguer avec l\'IA comment décrire une erreur pour obtenir la bonne solution',
      'Connecter une base de données simple',
      'Tester et valider chaque fonctionnalité au fur et à mesure',
      'Itérer vite la méthode pour ne pas rester bloqué des heures sur un bug',
    ],
    deliverable: 'Application avec toutes les fonctionnalités principales qui marchent',
    why: 'Pas de cours magistral. On code ensemble, en live. Quand tu bloques, ton coach est là.',
  },
  {
    icon: Globe,
    session: 'Session 3',
    title: 'Déploiement & Finalisation',
    subtitle: 'Ton app est en ligne',
    description: 'Objectif : Ton app est en ligne. Tu as un lien à envoyer à ton jury.',
    items: [
      'Déployer sur Hawiyat SSL, domaine, configuration production',
      'Préparer la démo pour la soutenance le parcours exact que tu vas montrer au jury',
      'Documenter ton projet de façon professionnelle (README, description technique pour le mémoire)',
      'Préparer les screenshots et captures pour le rapport',
    ],
    deliverable: 'MVP en production, accessible en ligne, demo-ready',
    why: 'Un lien. Une vraie URL. Pas un projet qui tourne sur localhost. Quand tu envoies "voici mon application : https://monprojet.hawiyat.org" tu te démarques de 95% des étudiants.',
  },
  {
    icon: BookOpen,
    session: 'Session 4',
    title: 'Mémoire & Rapport',
    subtitle: 'Rédaction avec l\'IA',
    description: 'Objectif : Brouillon complet du mémoire à la fin de cette session.',
    items: [
      'Structurer ton mémoire selon les exigences exactes de l\'université algérienne introduction, problématique, revue de littérature, méthodologie, résultats, conclusion, bibliographie',
      'Utiliser Claude Premium pour rédiger des sections complètes, cohérentes et académiques sans que ça sonne "généré par l\'IA"',
      'Techniques de prompting pour le contenu académique comment obtenir du texte qui te ressemble',
      'Générer des reformulations, transitions, et références automatiquement',
      'Corriger, affiner et personnaliser chaque partie',
    ],
    deliverable: 'Brouillon de mémoire 80% complet',
    template: 'Prompt réutilisable pour chaque section du mémoire. Tu remplis les variables, l\'IA génère, tu valides et ajustes.',
  },
  {
    icon: Presentation,
    session: 'Session 5',
    title: 'Présentation & Soutenance',
    subtitle: 'Slides finalisés + simulation',
    description: 'Objectif : Slides finalisés + tu sais comment répondre aux questions du jury.',
    items: [
      'Créer des slides impactantes avec l\'IA contenu, structure, visuels',
      'La structure narrative qui marche avec les jurys algériens : problème → solution → démo → résultats → perspectives',
      'Générer le script oral avec l\'IA et l\'adapter à ta façon de parler',
      'Les 10 questions que les jurys posent toujours et comment y répondre sans bloquer',
      'Simulation de soutenance en live avec ton coach qui joue le rôle du jury',
    ],
    deliverable: 'Présentation finalisée + confiance à l\'oral',
    why: 'La simulation. C\'est le seul moyen de ne pas avoir de mauvaise surprise le jour J. Ton coach te pose les questions dures avant que le vrai jury le fasse.',
  },
  {
    icon: Check,
    session: 'Session Bonus',
    title: 'Review Complète & Go-Live',
    subtitle: 'Tout est parfait',
    description: 'Objectif : Tout est parfait. Tu es prêt(e).',
    items: [
      'Relecture finale du mémoire avec le coach',
      'Derniers ajustements de la présentation',
      'Test final du MVP en conditions réelles',
      'Simulation de soutenance complète (mémoire + présentation + questions)',
      'Préparation mentale gérer le stress, les questions imprévues, les pannes techniques',
    ],
    deliverable: 'Dossier complet validé. Tu arrives à ta soutenance avec rien à improviser.',
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
    <div className="relative w-full py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal direction="up" delay={0.2}>
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-4 sm:mb-6 tracking-tight">
            Le Programme Session par Session
          </h2>
          <p className="text-center text-muted-foreground text-base sm:text-lg mb-12 sm:mb-20 max-w-2xl mx-auto px-2">
            Chaque session a un objectif clair et un livrable concret. Tu ne sors pas les mains vides.
          </p>
        </Reveal>

        {/* Desktop: alternating layout with SVG line */}
        <div className="hidden lg:block">
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
                <path d={pathD} fill="none" stroke="hsl(var(--foreground) / 0.04)" strokeWidth={12} strokeLinecap="round" filter="url(#pglow)" strokeDasharray={dashArray} strokeDashoffset={dashArray} />
                <path ref={pathRef} d={pathD} fill="none" stroke="hsl(var(--foreground) / 0.2)" strokeWidth={1.8} strokeLinecap="round" strokeDasharray={dashArray} strokeDashoffset={dashArray} />
              </svg>
            )}

            <div className="relative flex flex-col gap-48 sm:gap-64 mb-12" style={{ zIndex: 1 }}>
              {SESSIONS.map((event, i) => {
                const isRight = i % 2 === 1
                return (
                  <div key={event.session} className={`flex items-start gap-8 sm:gap-16 ${isRight ? 'flex-row-reverse' : ''}`}>
                    <div
                      ref={(el) => { circleRefs.current[i] = el }}
                      className="circle-node flex-shrink-0 w-40 h-40 rounded-full border-2 flex flex-col items-center justify-center text-center cursor-default select-none transition-all duration-500 ease-out bg-card"
                      style={{
                        borderColor: activeCircle >= i ? 'hsl(var(--foreground))' : 'hsl(var(--border))',
                        boxShadow: activeCircle >= i ? '0 0 40px hsl(var(--foreground) / 0.1)' : 'none',
                      }}
                    >
                      <span className="text-sm font-medium tracking-wide uppercase" style={{ color: activeCircle >= i ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))' }}>
                        {event.session}
                      </span>
                    </div>

                    <Reveal direction="up" delay={0.15 + i * 0.08}>
                      <div className={`flex-1 ${isRight ? 'text-right' : ''}`}>
                        <h3 className="text-2xl font-bold mb-2 text-foreground tracking-tight">
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

        {/* Mobile: card grid */}
        <div className="lg:hidden">
          <div className="grid gap-6 sm:grid-cols-2">
            {SESSIONS.map((session, i) => (
                <div key={i} className="rounded-md p-5 bg-[#f2f3f4] dark:bg-[#141414] dark:border-[#1f2123] flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <session.icon className="w-10 h-10 text-black dark:text-white flex-shrink-0" />
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{session.session}</span>
                      <h3 className="text-lg font-semibold text-foreground leading-tight">{session.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground italic">{session.subtitle}</p>
                  <p className="text-sm text-foreground">{session.description}</p>

                  <ul className="space-y-2">
                    {session.items.map((item, j) => (
                      <li key={j} className="flex gap-2 items-start text-sm text-muted-foreground">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-foreground" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {session.deliverable && (
                    <div className="mt-auto pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        <span className="text-foreground font-medium">Livrable : </span>
                        {session.deliverable}
                      </p>
                    </div>
                  )}

                  {session.why && (
                    <div className="mt-auto pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground italic">{session.why}</p>
                    </div>
                  )}

                  {session.template && (
                    <div className="mt-auto pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        <span className="text-foreground font-medium">Template fourni : </span>
                        {session.template}
                      </p>
                    </div>
                  )}
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
