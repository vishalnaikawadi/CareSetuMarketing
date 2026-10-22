import { FlaskConical, Pill, Stethoscope, UserRound } from 'lucide-react'

const FOREST = '#2F4A3E'

/** "Setu" means bridge: the mark is an arch joining two people. */
export function BridgeMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="18" fill={FOREST} />
      <path d="M12 42c6-14 14-20 20-20s14 6 20 20" fill="none" stroke="#E3EADF" strokeWidth="5" strokeLinecap="round" />
      <circle cx="12" cy="42" r="4.5" fill="#E3EADF" />
      <circle cx="52" cy="42" r="4.5" fill="#D97A5B" />
    </svg>
  )
}

/** Quadratic arch from (80,230) to (920,230) with apex at y=110. */
const archY = (t: number) => 230 - 480 * t * (1 - t)
const archX = (t: number) => 80 + 840 * t

const networkNodes = [
  { t: 0.14, label: 'Patients', icon: UserRound },
  { t: 0.32, label: 'Doctors', icon: Stethoscope },
  { t: 0.68, label: 'Labs', icon: FlaskConical },
  { t: 0.86, label: 'Pharmacies', icon: Pill },
]

export function BridgeNetwork() {
  const hangers = Array.from({ length: 11 }, (_, i) => 0.1 + i * 0.08)
  return (
    <figure className="relative" aria-label="Care Setu as a bridge connecting patients, doctors, labs and pharmacies">
      <figcaption className="sr-only">Patients, doctors, labs and pharmacies connected through Care Setu, subject to facility permissions and integrations.</figcaption>
      <div className="relative hidden sm:block">
        <svg viewBox="0 0 1000 320" className="w-full" aria-hidden="true">
          {[268, 288, 306].map((y, i) => (
            <path key={y} d={`M${40 + i * 30} ${y} q 30 -8 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0`} fill="none" stroke="#C9D6C5" strokeWidth="2" strokeLinecap="round" />
          ))}
          <path d="M40 230H960" stroke={FOREST} strokeWidth="4" strokeLinecap="round" />
          {hangers.map((t) => (
            <path key={t} d={`M${archX(t)} ${archY(t)}V230`} stroke="#8BA592" strokeWidth="2" />
          ))}
          <path d="M80 230Q500 -10 920 230" fill="none" stroke={FOREST} strokeWidth="5" strokeLinecap="round" />
          <path d="M80 230v70M920 230v70" stroke={FOREST} strokeWidth="5" strokeLinecap="round" />
        </svg>
        {networkNodes.map(({ t, label, icon: Icon }) => (
          <div key={label} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: `${archX(t) / 10}%`, top: `${(archY(t) / 320) * 100}%` }}>
            <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-forest bg-white text-forest lg:h-14 lg:w-14"><Icon size={22} aria-hidden="true" /></span>
            <span className="mt-2 rounded-full bg-white px-2 text-sm font-bold text-ink">{label}</span>
          </div>
        ))}
        <div className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: '50%', top: `${(110 / 320) * 100}%` }}>
          <span className="grid h-16 w-16 place-items-center rounded-full bg-forest shadow-lift lg:h-20 lg:w-20"><BridgeMark className="h-10 w-10 lg:h-12 lg:w-12" /></span>
          <span className="mt-2 rounded-full bg-white px-2 font-display text-lg font-semibold text-forest">Care Setu</span>
        </div>
      </div>

      <div className="sm:hidden">
        <div className="mx-auto flex w-fit items-center gap-3 rounded-full bg-forest py-2 pl-2 pr-5 text-white">
          <BridgeMark className="h-9 w-9" />
          <span className="font-display text-lg font-semibold">Care Setu</span>
        </div>
        <svg viewBox="0 0 300 40" className="mx-auto mt-1 w-full max-w-[300px]" aria-hidden="true">
          <path d="M20 38Q150 -14 280 38" fill="none" stroke={FOREST} strokeWidth="3" strokeLinecap="round" />
        </svg>
        <ul className="mt-2 grid grid-cols-2 gap-3">
          {networkNodes.map(({ label, icon: Icon }) => (
            <li key={label} className="flex items-center gap-3 rounded-full border border-line bg-white py-2 pl-2 pr-4 text-sm font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-forest text-forest"><Icon size={17} aria-hidden="true" /></span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}

type AvatarKind = 'care' | 'patient' | 'hospital'

export function Avatar({ kind, className = 'h-12 w-12' }: { kind: AvatarKind; className?: string }) {
  const stroke = { stroke: FOREST, strokeWidth: 2.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <defs>
        <clipPath id={`avatar-${kind}`}><circle cx="48" cy="48" r="48" /></clipPath>
      </defs>
      <g clipPath={`url(#avatar-${kind})`}>
        <rect width="96" height="96" fill={kind === 'patient' ? '#F3DDD2' : kind === 'hospital' ? '#F6E7C4' : '#E3EADF'} />
        {kind === 'care' && (
          <>
            <path d="M18 100c0-24 13-36 30-36s30 12 30 36" fill="#fff" {...stroke} />
            <path d="M40 64l8 12 8-12" fill="none" {...stroke} />
            <path d="M36 66c-3 14 4 22 12 22s15-8 12-22" fill="none" {...stroke} />
            <circle cx="48" cy="88" r="3.5" fill="#B5563A" />
            <circle cx="48" cy="40" r="15" fill="#E9C7B4" {...stroke} />
            <path d="M33 38c1-10 8-15 15-15s14 5 15 15c-5-4-12-6-15-6s-10 2-15 6z" fill={FOREST} />
          </>
        )}
        {kind === 'patient' && (
          <>
            <path d="M6 100c0-22 11-34 28-34s28 12 28 34" fill="#fff" {...stroke} />
            <circle cx="34" cy="44" r="14" fill="#E9C7B4" {...stroke} />
            <path d="M21 40c2-9 7-13 13-13s11 4 13 13" fill="none" stroke="#F2F4EE" strokeWidth="5" strokeLinecap="round" />
            <circle cx="29" cy="45" r="4" fill="none" {...stroke} strokeWidth={2} />
            <circle cx="40" cy="45" r="4" fill="none" {...stroke} strokeWidth={2} />
            <path d="M54 100c0-16 8-25 20-25s20 9 20 25" fill="#E3EADF" {...stroke} />
            <circle cx="74" cy="60" r="10" fill="#D8A88E" {...stroke} />
            <path d="M64 58c0-7 5-11 10-11s10 4 10 11c-3-3-7-4-10-4s-7 1-10 4z" fill={FOREST} />
          </>
        )}
        {kind === 'hospital' && (
          <>
            <path d="M14 82h68" {...stroke} />
            <rect x="26" y="34" width="44" height="48" rx="3" fill="#fff" {...stroke} />
            <path d="M48 20v12M42 26h12" {...stroke} stroke="#B5563A" strokeWidth={3.5} />
            {[44, 56].map((y) => [33, 45, 57].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" rx="1" fill="#C9D6C5" />))}
            <path d="M42 82V70h12v12" fill="#E3EADF" {...stroke} />
            <circle cx="80" cy="66" r="7" fill="#8BA592" />
            <path d="M80 72v10" {...stroke} />
          </>
        )}
      </g>
    </svg>
  )
}

/** A cutting-chai glass: the waitlist form takes about as long as one. */
export function ChaiGlass({ className = 'h-20 w-16' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 80" className={className} aria-hidden="true">
      <path d="M24 16c-3-4 3-6 0-10M32 16c-3-4 3-6 0-10M40 16c-3-4 3-6 0-10" fill="none" stroke="#8BA592" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 22h36l-5 52H19z" fill="#fff" stroke={FOREST} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M16.5 34h31l-3.6 38H20.1z" fill="#D9A23B" opacity=".55" />
      {[26, 31.5, 37, 42.5].map((x) => (
        <path key={x} d={`M${x} 24l-0.6 48`} stroke={FOREST} strokeWidth="1.2" opacity=".25" />
      ))}
      <path d="M14 22h36" stroke={FOREST} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
