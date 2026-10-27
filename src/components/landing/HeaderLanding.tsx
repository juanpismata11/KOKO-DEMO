import { Link } from "react-router"

const TABS = ["Home", "Properties", "Pricing", "Blog", "About Us"]

export default function HeaderLanding() {
    return (
        <header className="sticky top-0 z-50 w-full bg-frame/90 backdrop-blur-md">
            <div className="flex w-full items-center justify-between gap-6 px-6 py-4 lg:px-12">

                {/* Logo */}
                <a
                    href="/"
                    className="text-2xl font-bold tracking-[0.15em] text-navy transition-opacity hover:opacity-60"
                >
                    KOKO
                </a>

                {/* Tabs */}
                <nav className="hidden items-center gap-1 lg:flex">
                    {TABS.map((tab) => (
                        <a
                            key={tab}
                            href={`#${tab.toLowerCase().replace(/\s/g, "-")}`}
                            className="group relative px-3 py-2 text-[17px] font-medium text-navy/80 transition-colors hover:text-navy"
                        >
                            <b>{tab}</b>
                            <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-navy transition-transform duration-300 group-hover:scale-x-100" />
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                <Link
                    to="/registro"
                    className="rounded-md bg-navy px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-navy/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-frame"
                >
                    Login
                </Link>

            </div>
        </header>
    )
}
