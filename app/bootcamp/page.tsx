'use client'

import BootcampRoadmap from '@/components/bootcamp-roadmap'

import RegistrationModal from '@/components/registration-modal'
import Footer from '@/components/footer'
import Reveal from '@/components/ui/reveal'
import { Check, X, ArrowRight, Zap, Users, Globe, Bot, FileText, Briefcase, Box, Award, Video, Presentation } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const WHATS_YOU_GET = [
  { icon: FileText, title: 'Mémoire complet', desc: 'Structuré, rédigé avec l\'IA, prêt à soumettre' },
  { icon: Globe, title: 'Application déployée', desc: 'Hébergée sur Hawiyat, tu envoies le lien au jury' },
  { icon: Presentation, title: 'Présentation + simulation', desc: 'Slides finalisés + simulation de soutenance' },
  { icon: Users, title: 'Coaching one-on-one', desc: 'Pendant toute la formation' },
  { icon: 'anthropic' as const, title: 'Claude Code activé', desc: 'Tu continues à coder après la formation' },
  { icon: Zap, title: '10,000 DA en crédits IA', desc: 'Pour les sessions et après' },
  { icon: Briefcase, title: 'Portfolio freelance', desc: 'Tu sors avec quelque chose à montrer à des clients' },
  { icon: Award, title: 'Certificat de complétion', desc: 'Attestation officielle Hawiyat pour ton CV et LinkedIn' },
  { icon: Video, title: 'Accès aux enregistrements', desc: 'Revois chaque session à ton rythme, même après le bootcamp' },
]

const PRICING_ITEMS = [
  'Accès Claude Premium + Claude Code pendant la formation',
  'Crédits IA pour toutes les sessions',
  'Hébergement de ton MVP inclus',
  '5 sessions + review + module freelance',
  'Coach dédié en live',
]

const FAQ_ITEMS = [
  {
    q: 'Est-ce que je dois savoir coder ?',
    a: 'Non. Claude Code est conçu pour construire même sans expérience. On te guide de zéro. Ce qui compte c\'est de comprendre la logique pas de mémoriser de la syntaxe.',
  },
  {
    q: 'Est-ce que le mémoire sera conforme à mon université ?',
    a: 'Oui. Le programme est construit sur la base des exigences académiques algériennes. Le coach connaît les standards. Si ton université a des exigences spécifiques, on adapte.',
  },
  {
    q: 'Combien de temps ça prend ?',
    a: 'Selon ton rythme et ta deadline. En intensif (format bootcamp weekend), tu peux finir en 2 semaines. En format souple avec sessions hebdomadaires, 4-6 semaines. On définit ça avec toi au kickoff.',
  },
  {
    q: 'Et si je bloque pendant une session ?',
    a: 'C\'est pour ça que le coach est là en live. Tu poses ta question, il répond. Pas de ticket, pas d\'attente une vraie personne qui débloque en temps réel.',
  },
  {
    q: 'Est-ce que l\'hébergement est permanent ?',
    a: 'L\'hébergement est inclus pour toute la période jusqu\'à ta soutenance. Après, tu peux continuer sur Hawiyat à tarif étudiant.',
  },
  {
    q: 'Est-ce que je peux vraiment trouver des clients en freelance après ?',
    a: 'Si tu livres ton MVP, tu as un portfolio. Si tu as un portfolio, tu as quelque chose à montrer. Le module freelance te donne le reste. Ce n\'est pas une promesse de richesse c\'est un point de départ réel.',
  },
  {
    q: 'Mon sujet est très spécifique / technique. Ça marche quand même ?',
    a: 'Oui. La session kickoff est là pour ça. On adapte l\'approche à ton sujet. On a accompagné des projets en informatique, en gestion, en électronique, en économie.',
  },
]

const FOR_YOU = [
  { type: 'yes' as const, text: 'Étudiant en fin de licence ou master avec un PFE / mémoire à rendre' },
  { type: 'yes' as const, text: 'Tu as une deadline dans moins de 3 mois' },
  { type: 'yes' as const, text: 'Tu veux comprendre ce que tu construis pas juste le soumettre' },
  { type: 'yes' as const, text: 'Tu veux repartir avec des compétences qui valent de l\'argent après' },
  { type: 'no' as const, text: 'Pas pour toi si tu cherches quelqu\'un qui fait tout à ta place' },
  { type: 'no' as const, text: 'Pas pour toi si tu n\'as pas de sujet du tout (voir kickoff d\'abord)' },
  { type: 'no' as const, text: 'Pas pour toi si tu as encore 1 an devant toi attends d\'être en fin d\'études' },
]

const FORMAT_ITEMS = [
  { icon: Globe, label: 'En ligne', desc: 'Google Meet / Zoom + outils partagés en live' },
  { icon: Users, label: 'Contact direct WhatsApp', desc: 'Communication rapide et directe avec ton coach' },
  { icon: Users, label: '10 étudiants max', desc: 'Par cohorte pour que le coach puisse suivre chacun' },
  { icon: Bot, label: 'Darija + Anglais', desc: 'Coaching one-on-one personnalisé' },
]

const FREELANCE_MODULES = [
  {
    title: 'Comprendre le marché freelance algérien avec l\'IA',
    items: [
      'Quels types de projets les PME et startups algériennes demandent réellement',
      'Ce qu\'un développeur no-code/AI peut facturer fourchette réelle : 30,000–200,000 DA par projet',
      'Les plateformes où trouver des clients (locales et internationales)',
    ],
  },
  {
    title: 'Construire ton profil et ton portfolio',
    items: [
      'Comment présenter ton MVP de mémoire comme une réalisation professionnelle',
      'Rédiger un profil Upwork/Freelancer qui attire des clients avec l\'IA',
      'Créer 2-3 projets démo rapides pour montrer ce que tu sais faire',
    ],
  },
  {
    title: 'Trouver tes premiers clients',
    items: [
      'Le message d\'approche qui fonctionne avec les entreprises algériennes',
      'Comment proposer un MVP à une PME locale',
      'Pricing : comment ne pas se sous-vendre',
    ],
  },
  {
    title: 'Livrer des projets en freelance avec l\'IA',
    items: [
      'Ton workflow de production : brief → architecture → développement → livraison',
      'Comment gérer les demandes de modification',
      'Automatiser les parties répétitives avec n8n (outil inclus dans l\'offre Hawiyat)',
    ],
  },
]

export default function BootcampPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }
  return (
    <>
    
      <main className="hero-bg-gradient  relative" style={{ zIndex: 1 }}>
        {/* Hero */}
        <section className="min-h-[80vh]  flex items-center justify-center px-4 sm:px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 bg-background border border-border">
                <Box className="w-4 h-4" />
                <span>Hawiyat AI Bootcamp</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                La Formation Ultime pour Étudiants Algériens
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                En quelques semaines, tu finis ton mémoire, tu construis un vrai produit, et tu acquiers les compétences pour facturer <strong className="text-foreground">50,000–200,000 DA</strong> par projet en freelance.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#cta" className="btn group inline-flex items-center gap-2">
                  <span>Rejoindre le Bootcamp</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#programme" className="btn !bg-transparent !text-foreground dark:!text-foreground border border-border">
                  Voir le Programme
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Why This Exists */}
        <section className="py-20   px-4 sm:px-6">
          <div className="max-w-4xl  mx-auto">
            <Reveal direction="up" delay={0.2}>
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 tracking-tight">
                Pourquoi Cette Formation Existe
              </h2>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2">
              {[
                'Il paye un freelancer pour faire son projet et se retrouve avec quelque chose qu\'il ne comprend pas et ne peut pas défendre devant le jury',
                'Il passe des semaines à rédiger un rapport qu\'il aurait pu faire en 3 jours',
                'Il sort diplômé sans aucune compétence commercialisable en dehors du système académique',
                'Il sait que l\'IA existe mais ne sait pas comment l\'utiliser de façon professionnelle',
              ].map((item, i) => (
                <Reveal key={i} direction="up" delay={0.1 + i * 0.1}>
                  <div className="flex gap-4 p-6 rounded-xl bg-background border border-border">
                    <X className="w-5 h-5 flex-shrink-0 mt-1 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal direction="up" delay={0.5}>
              <div className="mt-10 text-center">
                <p className="text-lg text-foreground">
                  Hawiyat résout les trois problèmes en même temps :{' '}
                  <strong className="text-foreground">le mémoire, le produit, et l&apos;avenir.</strong>
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal direction="up" delay={0.2}>
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 tracking-tight">
                Ce Que Tu Repartes Avec
              </h2>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WHATS_YOU_GET.map((item, i) => (
                <Reveal key={i} direction="up" delay={0.1 + i * 0.05}>
                  <div className="rounded-md p-6 bg-[#f2f3f4] dark:bg-[#141414] dark:border-[#1f2123] flex flex-col gap-4 box-border h-full">
                    {item.icon === 'anthropic' ? (
                      <div className="w-16 h-16 mx-auto flex items-center justify-center">
                        <Image
                          src="https://cdn.simpleicons.org/anthropic"
                          alt="Anthropic"
                          width={56}
                          height={56}
                          className="w-14 h-14 dark:invert"
                        />
                      </div>
                    ) : (
                      <item.icon className="w-16 h-16 text-black dark:text-white mx-auto" />
                    )}
                    <h3 className="text-2xl text-center text-foreground">{item.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 px-2 text-center text-sm break-words">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="programme">
          <BootcampRoadmap />
        </section>

        {/* Freelance Module */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal direction="up" delay={0.2}>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 bg-secondary text-secondary-foreground border border-border">
                  <Briefcase className="w-4 h-4" />
                  <span>Module Bonus</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Freelance avec l&apos;IA
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                  Ce que personne d&apos;autre ne t&apos;enseigne. Tu as construit un MVP avec l&apos;IA. Tu sais maintenant faire quelque chose que la plupart des étudiants ne savent pas faire.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-8 sm:grid-cols-2">
              {FREELANCE_MODULES.map((mod, i) => (
                <Reveal key={i} direction="up" delay={0.1 + i * 0.1}>
                  <div className="rounded-md p-6 bg-[#f2f3f4] dark:bg-[#141414] dark:border-[#1f2123] flex flex-col gap-4 box-border h-full">
                    <h3 className="text-xl font-semibold text-foreground">{mod.title}</h3>
                    <ul className="space-y-2">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex gap-2 items-start text-sm text-muted-foreground">
                          <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-foreground" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal direction="up" delay={0.5}>
              <div className="mt-12 p-6 rounded-xl bg-[#f2f3f4] dark:bg-[#141414] dark:border-[#1f2123] text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">La réalité :</strong> Des étudiants sans diplôme technique facturent 50,000–150,000 DA par projet en construisant des applications simples avec Claude Code. Tu as les mêmes outils. La différence c&apos;est savoir les utiliser c&apos;est exactement ce que tu apprends dans ce programme.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Coach Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal direction="up" delay={0.2}>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  L&apos;Accompagnement Coach
                </h2>
                <p className="text-lg text-muted-foreground">Tu n&apos;es jamais seul.</p>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                '1 coach dédié pendant toute la durée du programme',
                'Disponible en live sur Google Meet / Zoom pendant chaque session',
                'Feedback personnalisé sur chaque livrable',
                'Réponses aux blocages techniques en temps réel',
                'Connaissance du système universitaire algérien il sait ce que ton jury attend',
              ].map((item, i) => (
                <Reveal key={i} direction="up" delay={0.1 + i * 0.05}>
                  <div className="flex gap-3 items-start p-4 rounded-lg bg-background border border-border">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-foreground" />
                    <p className="text-sm text-foreground">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal direction="up" delay={0.6}>
              <p className="text-center text-muted-foreground mt-8">
                Ce n&apos;est pas un chatbot. Ce n&apos;est pas un forum. C&apos;est une personne qui connaît les outils, connaît le système algérien, et est là pour s&apos;assurer que tu livres.
              </p>
            </Reveal>
          </div>
        </section>

        {/* For Who */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal direction="up" delay={0.2}>
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 tracking-tight">
                Pour Qui C&apos;est Fait
              </h2>
            </Reveal>

            <div className="space-y-3">
              {FOR_YOU.map((item, i) => (
                <Reveal key={i} direction="up" delay={0.05 + i * 0.05}>
                  <div className="flex gap-3 items-start p-4 rounded-lg bg-background border border-border">
                    {item.type === 'yes' ? (
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-foreground" />
                    ) : (
                      <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
                    )}
                    <p className="text-sm text-foreground">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Format */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal direction="up" delay={0.2}>
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 tracking-tight">
                Format & Logistique
              </h2>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FORMAT_ITEMS.map((item, i) => (
                <Reveal key={i} direction="up" delay={0.1 + i * 0.1}>
                  <div className="rounded-md p-6 bg-[#f2f3f4] dark:bg-[#141414] dark:border-[#1f2123] flex flex-col gap-4 box-border text-center">
                    <item.icon className="w-16 h-16 text-black dark:text-white mx-auto" />
                    <h3 className="text-xl text-center text-foreground">{item.label}</h3>
                    <p className="text-gray-700 dark:text-gray-300 px-2 text-center text-sm break-words">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal direction="up" delay={0.2}>
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 tracking-tight">
                FAQ
              </h2>
            </Reveal>

            <div className="flex min-h-[300px] w-full flex-col gap-4">
              {FAQ_ITEMS.map((faq, i) => (
                <Reveal key={i} direction="up" delay={0.05 + i * 0.05}>
                  <div className="w-full border-b border-border">
                    <button
                      className="flex w-full items-center justify-between select-none text-left text-xl max-md:text-lg cursor-pointer focus:outline-none py-4 transition-colors duration-200"
                      onClick={() => toggleFaq(i)}
                      aria-expanded={openFaq === i}
                    >
                      <span className="font-medium text-foreground">{faq.q}</span>
                      <span className={`text-xl origin-center duration-300 transition-transform font-semibold flex-shrink-0 ml-4 text-foreground ${openFaq === i ? 'rotate-45' : ''}`}>
                        +
                      </span>
                    </button>

                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 pb-0'}`}>
                      <div className="px-4">
                        <p className="whitespace-pre-line text-gray-700 dark:text-white/60 max-lg:text-sm leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="py-24 px-4 sm:px-6 bg-background">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal direction="up" delay={0.2}>
              <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight">
                Prêt(e) à Passer à l&apos;Action ?
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                Rejoins le bootcamp Hawiyat et repars avec ton mémoire, ton application, et des compétences freelance.
              </p>
              <div className="flex items-center justify-center">
                <button onClick={() => setModalOpen(true)} className="btn group inline-flex items-center gap-2">
                  <span>Rejoindre le Bootcamp 50,000 DA</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <RegistrationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
