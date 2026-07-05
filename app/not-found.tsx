import Link from 'next/link'

// Playful 404 starring a sad clay mascot.
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 text-center bg-background">
      <div className="relative" style={{ width: 180, height: 210 }}>
        {/* ground shadow */}
        <div
          style={{
            position: 'absolute',
            bottom: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 150,
            height: 22,
            background: 'rgba(0,0,0,0.18)',
            borderRadius: '50%',
            filter: 'blur(8px)',
          }}
        />
        {/* clay blob */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 150,
            height: 190,
            borderRadius: '70px 70px 26px 26px',
            backgroundImage:
              'radial-gradient(120% 100% at 32% 16%, #FFD9EC 0%, #FF7EC0 48%, #E23E9A 100%)',
            boxShadow:
              'inset 0 10px 16px rgba(255,255,255,0.6), inset 0 -20px 28px rgba(0,0,0,0.14), 0 14px 24px rgba(0,0,0,0.18)',
          }}
        >
          {/* droopy eyes */}
          <div style={{ position: 'absolute', display: 'flex', gap: 26, left: 38, top: 56 }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 -2px 3px rgba(0,0,0,0.12)',
                }}
              >
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#3A2E2A', marginBottom: 3 }} />
              </div>
            ))}
          </div>
          {/* cheeks */}
          <div style={{ position: 'absolute', display: 'flex', gap: 60, left: 27, top: 90 }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  width: 16,
                  height: 10,
                  borderRadius: '50%',
                  background: 'rgba(255,110,125,0.42)',
                  filter: 'blur(2px)',
                }}
              />
            ))}
          </div>
          {/* frown */}
          <svg width={44} height={22} style={{ position: 'absolute', left: 53, top: 98, overflow: 'visible' }}>
            <path d="M3 18 Q 22 2 41 18" fill="none" stroke="#5A463E" strokeWidth={3} strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-[rgb(var(--primary))]">404</h1>
        <p className="text-xl font-medium">This page wandered off exploring…</p>
        <p className="text-muted-foreground">Let&apos;s get you back to something that exists.</p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-[rgb(var(--primary))] px-6 py-3 font-medium text-white transition-colors hover:bg-[rgb(var(--accent))]"
      >
        Take me home
      </Link>
    </main>
  )
}
