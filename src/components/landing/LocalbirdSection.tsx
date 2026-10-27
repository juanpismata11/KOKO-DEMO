import { useEffect, useRef, useState } from "react"

/* Same self-contained scroll-reveal MlsSection uses — kept as
   its own copy rather than shared, the way useSpring stays
   duplicated across Carousel.tsx and Accordion.tsx: it's a
   dozen lines, and extracting it is a decision for whenever a
   third caller actually needs the exact same thing. */
function useRevealOnScroll<T extends HTMLElement>() {
    const ref = useRef<T | null>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReducedMotion) {
            setVisible(true)
            return
        }

        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.15 },
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return { ref, visible }
}

/* ── bento photos ──────────────────────────────────────────
   `imagen` is any CSS background value, so a gradient stands in
   until there are photographs: swap it for `url(/foto.jpg)` and
   nothing else has to change. Order matters — it fills the grid
   row by row (large, medium / medium, large). */
const PHOTOS: { titulo: string; imagen: string }[] = [
    { titulo: "Mexico", imagen: "linear-gradient(135deg, #0d0d0d 0%, #3a3a3a 60%, #8c8c8c 100%)" },
    { titulo: "Colombia", imagen: "linear-gradient(200deg, #1c1c1c 0%, #4d4d4d 100%)" },
    { titulo: "Costa Rica", imagen: "linear-gradient(160deg, #262626 0%, #6e6e6e 100%)" },
    { titulo: "Estados Unidos", imagen: "linear-gradient(120deg, #050505 0%, #333333 55%, #7a7a7a 100%)" },
]

/* wide, narrow / narrow, wide on the 5-column desktop grid */
const SPANS = [
    "min-[900px]:col-span-3",
    "min-[900px]:col-span-2",
    "min-[900px]:col-span-2",
    "min-[900px]:col-span-3",
]

function BentoGrid() {
    return (
        <div className="grid grid-cols-1 gap-3 min-[600px]:grid-cols-2 min-[900px]:grid-cols-5 min-[900px]:auto-rows-[280px] auto-rows-[240px]">
            {PHOTOS.map((p, i) => {
                const large = i === 0 || i === 3
                return (
                    <div
                        key={p.titulo}
                        className={`group relative overflow-hidden rounded-2xl ${SPANS[i]}`}
                    >
                        <div
                            className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-105"
                            style={{ background: p.imagen, backgroundSize: "cover", backgroundPosition: "center" }}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/40" />
                        <h3
                            className={`absolute bottom-0 left-0 p-6 font-display font-extrabold leading-none tracking-[-0.02em] text-white ${
                                large ? "text-[40px]" : "text-[36px]"
                            }`}
                        >
                            {p.titulo}
                        </h3>
                    </div>
                )
            })}
        </div>
    )
}

export default function LocalbirdSection() {
    const { ref, visible } = useRevealOnScroll<HTMLDivElement>()

    return (
        <section className="flex min-h-screen w-full flex-col justify-center px-6 py-16 lg:px-12">
            <div
                ref={ref}
                className={`mx-auto grid w-full max-w-7xl items-center gap-12 transition-all duration-700 ease-out lg:grid-cols-3 lg:gap-16 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
                {/* Bento photo grid, left — two thirds */}
                <div className="order-2 lg:order-1 lg:col-span-2">
                    <BentoGrid />
                </div>

                {/* Info, right — one third */}
                <div className="order-1 flex flex-col items-start text-left lg:order-2">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-navy/50">
                        Alianza
                    </p>
                    <h2 className="mt-3 font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-navy">
                        KOKO<span className="text-gold">+</span>
                        <br />
                        localbird
                    </h2>

                    <p className="mt-5 max-w-md text-sm leading-relaxed text-navy/70 sm:text-base">
                        La experiencia inmobiliaria y de viaje completa. Encuentra tu próxima
                        propiedad ideal en México y vive el destino al máximo con experiencias
                        curadas, tours y proveedores locales — todo en un mismo lugar.
                    </p>

                    {/* CTA row, inline — same treatment as MLS's own link */}
                    <div className="mt-6 flex flex-col items-start gap-3">
                        <a
                            href="#"
                            className="group inline-flex items-center gap-2 text-lg font-bold text-navy transition-colors duration-200 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-frame"
                        >
                            Explorar experiencias
                            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </a>

                        <p className="text-sm text-navy/60">
                            <span className="font-display text-2xl font-bold text-gold">+1,800</span> experiencias
                            &middot; by <strong className="font-semibold text-navy">localbird</strong>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
