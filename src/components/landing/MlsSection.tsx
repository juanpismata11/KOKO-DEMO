import { useEffect, useRef, useState } from "react"
import { Accordion } from "./Accordion"

/* The site has no scroll-reveal yet — Header/Hero are both
   always-visible. This is the first section far enough down
   the page for a scroll entrance to make sense, so the pattern
   starts here: one IntersectionObserver, no library, skipped
   entirely under reduced motion rather than just shortened. */
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
            { threshold: 0.2 },
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return { ref, visible }
}

export default function MlsSection() {
    const { ref, visible } = useRevealOnScroll<HTMLDivElement>()

    return (
        <section className="flex min-h-screen w-full flex-col justify-center px-6 py-16 lg:px-12">
            <div
                ref={ref}
                className={`mx-auto grid w-full max-w-6xl items-center gap-12 transition-all duration-700 ease-out lg:grid-cols-2 lg:gap-24 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
                {/* Info, left */}
                <div className="flex flex-col items-start text-left lg:order-1 mr-20 lg:-ml-24 lg:pr-8">
                    <h2 className="font-display text-5xl font-bold leading-[1.05] text-navy sm:text-6xl">Explora, compra, vende y alquila</h2>

                    <p className="mt-6 max-w-lg text-base leading-relaxed text-navy/70 sm:text-lg">
                        Con nuestro MLS explora propiedades en todo México con nuestra plataforma intuitiva, diseñada para
                        ofrecerte <strong className="text-lg font-semibold text-navy sm:text-xl">control y transparencia</strong>{" "}
                        en cada transacción. Miles de{" "}
                        <strong className="text-lg font-semibold text-navy sm:text-xl">listados verificados</strong>, actualizados
                        cada día.
                    </p>

                    <p className="mt-6 max-w-lg text-base leading-relaxed text-navy/70 sm:text-lg">
                    Explora propiedades que se ajustan a tus deseos y necesidades en una plataforma fácil de usar.
                    </p>

                    

                    <a
                        href="#"
                        className="mt-8 rounded-md bg-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-navy transition-colors duration-200 hover:bg-navy hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-frame"
                    >
                        Explora MLS
                    </a>
                </div>

                {/* Photos, right */}
                <div className="acc-wrap flex items-center justify-center lg:order-2">
                    <Accordion />
                </div>
            </div>
        </section>
    )
}
