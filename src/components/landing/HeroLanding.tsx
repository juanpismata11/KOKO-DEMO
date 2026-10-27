import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const INTERVAL = 6000;
/* fraction of the width a drag must cover to change slide */
const THRESHOLD = 0.15;

type Slide = {
    title: string
    description: string
    background?: string
    buttons?: { label: string; primary?: boolean }[]
}

const SLIDES: Slide[] = [
    {
        title: "LEADS",
        description:
            "Discover breathtaking destinations across the Philippines with curated tours, local insights, and hassle-free planning all in one platform.",
        background: "linear-gradient(135deg, #050505 0%, #262626 55%, #6e6e6e 100%)",
        buttons: [{ label: "Plan Your Trip", primary: true }, { label: "Explore Destinations" }],
    },
    {
        title: "KOKOPICKS",
        description: "Hand-picked properties and opportunities, curated by locals who know the market.",
        background: "linear-gradient(160deg, #0d0d0d 0%, #3a3a3a 55%, #8c8c8c 100%)",
        buttons: [{ label: "See the picks", primary: true }],
    },
    {
        title: "LOCALBIRD",
        description: "Your local guide on the ground: trusted insights, introductions and support wherever you invest.",
        background: "linear-gradient(200deg, #1c1c1c 0%, #4d4d4d 55%, #b0b0b0 100%)",
    },
]

/* shortest signed distance from the ring position to a slide, in slides */
const wrap = (d: number, n: number) => ((((d + n / 2) % n) + n) % n) - n / 2

export default function HeroLanding() {
    /* `pos` is unbounded (never wrapped) so going past the last slide keeps moving forward */
    const [pos, setPos] = useState(0)
    const [dragX, setDragX] = useState(0)
    const [dragging, setDragging] = useState(false)

    const box = useRef<HTMLDivElement>(null)
    const drag = useRef<{ x0: number; moved: boolean } | null>(null)
    const prevOffsets = useRef<number[]>([])

    const count = SLIDES.length
    const index = ((pos % count) + count) % count
    const offsets = SLIDES.map((_, i) => wrap(i - pos, count))

    /* a slide that wraps from one side to the other must teleport, not slide across the screen */
    const jumped = offsets.map(
        (o, i) => prevOffsets.current[i] !== undefined && Math.abs(o - prevOffsets.current[i]) > 1.5,
    )
    useEffect(() => {
        prevOffsets.current = offsets
    })

    const goTo = useCallback((i: number) => setPos((p) => p + wrap(i - p, count)), [count])

    /* Autoplay. Depends on `pos`, so any change (manual or automatic)
       restarts the countdown; paused while the pointer is dragging. */
    useEffect(() => {
        if (dragging) return
        const id = window.setTimeout(() => setPos((p) => p + 1), INTERVAL)
        return () => window.clearTimeout(id)
    }, [pos, dragging])

    const down = (e: ReactPointerEvent<HTMLDivElement>) => {
        drag.current = { x0: e.clientX, moved: false }
    }

    const move = (e: ReactPointerEvent<HTMLDivElement>) => {
        const g = drag.current
        if (!g) return
        const dx = e.clientX - g.x0
        if (!g.moved) {
            if (Math.abs(dx) < 6) return
            g.moved = true
            setDragging(true)
            /* capture only once it is a real drag, so plain clicks on the buttons still work */
            try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* not a live pointer */ }
        }
        setDragX(dx)
    }

    const up = (e: ReactPointerEvent<HTMLDivElement>) => {
        const g = drag.current
        drag.current = null
        if (!g?.moved) return
        const width = box.current?.offsetWidth ?? 1
        const dx = e.clientX - g.x0
        if (Math.abs(dx) > width * THRESHOLD) setPos((p) => p + (dx < 0 ? 1 : -1))
        setDragging(false)
        setDragX(0)
    }

    return (
        <section className="w-full px-6 pb-16 lg:px-12">

            {/* Giant rounded carousel */}
            <div
                ref={box}
                role="group"
                aria-roledescription="carousel"
                aria-label="Featured"
                onPointerDown={down}
                onPointerMove={move}
                onPointerUp={up}
                onPointerCancel={up}
                className={`relative aspect-[4/3] w-full select-none overflow-hidden rounded-[2rem] [touch-action:pan-y] motion-safe:animate-hero-in sm:aspect-[16/9] lg:aspect-[21/9] lg:rounded-[2.5rem] ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
            >

                {/* Slides: each is placed by its offset from the current one, so the ring wraps in both directions */}
                {SLIDES.map((slide, i) => (
                    <div
                        key={slide.title}
                        className={`absolute inset-0 will-change-transform ${dragging || jumped[i] ? "" : "transition-transform duration-[1100ms] ease-[cubic-bezier(0.25,1,0.3,1)]"}`}
                        aria-hidden={i !== index}
                        style={{
                            transform: `translateX(calc(${offsets[i] * 100}% + ${dragX}px))`,
                            ...(slide.background ? { background: slide.background } : {}),
                        }}
                    >
                        {!slide.background && (
                            <img
                                src="/hero.jpg"
                                alt="Green coastal hills meeting the sea in the Philippines"
                                draggable={false}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        )}

                        {/* Legibility gradient */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                        {/* Content, anchored bottom-left */}
                        <div className="absolute inset-x-6 bottom-14 flex flex-col sm:inset-x-10 lg:inset-x-14 lg:bottom-16">

                            {/* Giant title */}
                            <h1 className="relative w-fit font-display text-[15vw] font-extrabold leading-[0.8] tracking-tight sm:text-[12vw] lg:text-[9rem]">
                                <span className="bg-gradient-to-b from-white from-40% to-white/55 bg-clip-text text-transparent">
                                    {slide.title}
                                </span>
                                <span className="absolute -right-2 bottom-1 translate-x-full text-xs font-semibold tracking-widest text-white/80 sm:text-sm">
                                    TM
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-[15px]">
                                {slide.description}
                            </p>

                            {/* Buttons (optional per slide) */}
                            {slide.buttons && (
                                <div className="mt-5 flex flex-wrap gap-3">
                                    {slide.buttons.map((b) => (
                                        <button
                                            key={b.label}
                                            type="button"
                                            tabIndex={i === index ? 0 : -1}
                                            className={
                                                b.primary
                                                    ? "rounded-full bg-white px-6 py-2.5 text-[13px] font-medium text-navy transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)]"
                                                    : "rounded-full border border-white/70 px-6 py-2.5 text-[13px] font-medium text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-navy"
                                            }
                                        >
                                            {b.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Breadcrumb dots, below the text */}
                <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2.5 sm:bottom-6">
                    {SLIDES.map((slide, i) => (
                        <button
                            key={slide.title}
                            type="button"
                            aria-label={`Go to ${slide.title}`}
                            aria-current={i === index}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={() => goTo(i)}
                            className={`h-2 rounded-full bg-white transition-all duration-300 ${i === index ? "w-6 opacity-100" : "w-2 opacity-50 hover:opacity-80"}`}
                        />
                    ))}
                </div>

            </div>

        </section>
    )
}
