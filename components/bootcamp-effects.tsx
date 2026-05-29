'use client'

export default function BootcampEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Top-left orb */}
      <div
        className="absolute rounded-full blur-3xl opacity-20 dark:opacity-10"
        style={{
          width: '600px',
          height: '600px',
          top: '-200px',
          left: '-200px',
          background: 'radial-gradient(circle, hsl(var(--foreground) / 0.15), transparent 70%)',
          animation: 'float-orb-1 20s ease-in-out infinite',
        }}
      />

      {/* Top-right orb */}
      <div
        className="absolute rounded-full blur-3xl opacity-15 dark:opacity-10"
        style={{
          width: '500px',
          height: '500px',
          top: '10%',
          right: '-150px',
          background: 'radial-gradient(circle, hsl(var(--foreground) / 0.12), transparent 70%)',
          animation: 'float-orb-2 25s ease-in-out infinite',
        }}
      />

      {/* Center orb */}
      <div
        className="absolute rounded-full blur-3xl opacity-10 dark:opacity-5"
        style={{
          width: '800px',
          height: '800px',
          top: '40%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, hsl(var(--foreground) / 0.08), transparent 70%)',
          animation: 'float-orb-3 30s ease-in-out infinite',
        }}
      />

      {/* Bottom-left orb */}
      <div
        className="absolute rounded-full blur-3xl opacity-15 dark:opacity-10"
        style={{
          width: '450px',
          height: '450px',
          bottom: '20%',
          left: '-100px',
          background: 'radial-gradient(circle, hsl(var(--foreground) / 0.1), transparent 70%)',
          animation: 'float-orb-1 22s ease-in-out infinite reverse',
        }}
      />

      {/* Bottom-right orb */}
      <div
        className="absolute rounded-full blur-3xl opacity-20 dark:opacity-10"
        style={{
          width: '550px',
          height: '550px',
          bottom: '-100px',
          right: '-100px',
          background: 'radial-gradient(circle, hsl(var(--foreground) / 0.12), transparent 70%)',
          animation: 'float-orb-2 18s ease-in-out infinite reverse',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.01]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  )
}
