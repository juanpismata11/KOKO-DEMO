import type { ReactNode } from "react"

/* Line icons, white, matching the "ícono de línea blanco"
   brief — aria-hidden since every link already carries its
   own visible text ("Facebook", "Instagram", ...). */
function AtIcon() {
    return (
        <span className="flex h-[18px] w-[18px] items-center justify-center text-[15px] font-semibold leading-none">
            @
        </span>
    )
}

function FacebookIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="9.2" />
            <path
                d="M13.8 9.2h1.8V6.8h-2c-1.8 0-2.9 1.1-2.9 2.9v1.5H9v2.3h1.7V18h2.3v-4.5h1.8l.4-2.3h-2.2v-1.1c0-.5.2-.9.8-.9Z"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function InstagramIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" focusable="false">
            <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
            <circle cx="12" cy="12" r="4.2" />
            <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
        </svg>
    )
}

function TikTokIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M14 3v11.3a3.3 3.3 0 1 1-2.6-3.2" />
            <path d="M14 3c.4 2.4 2 4 4.4 4.3" />
        </svg>
    )
}

function WhatsAppIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
            <path
                d="M8.5 8.4c.3-.7.6-.7.9-.7h.5c.2 0 .4 0 .6.5l.6 1.4c.1.3 0 .5-.1.7l-.5.6c-.1.2-.2.3 0 .6.4.7 1.5 1.8 2.2 2.1.3.2.4.1.6-.1l.5-.6c.2-.2.4-.2.6-.1l1.4.7c.3.1.3.3.3.5 0 .4-.2 1-.6 1.3-.4.4-1 .6-1.6.5-1.4-.2-3-1.1-4.1-2.2-1.1-1.1-1.9-2.5-2.2-3.8-.1-.6.1-1.2.5-1.6Z"
                strokeLinecap="round"
            />
        </svg>
    )
}

/* Same underline-reveal hover every other nav link on the site
   uses (see the tabs in HeaderLanding), just on white instead
   of navy for the dark footer ground. */
function FooterLink({
    href,
    external,
    icon,
    children,
}: {
    href: string
    external?: boolean
    icon: ReactNode
    children: ReactNode
}) {
    return (
        <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group inline-flex items-center gap-2 rounded text-sm text-white/80 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
        >
            <span className="text-white/70 transition-colors group-hover:text-white">{icon}</span>
            <span className="relative">
                {children}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
            </span>
        </a>
    )
}

function LegalLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <a
            href={href}
            className="group relative rounded text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
        >
            {children}
            <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
        </a>
    )
}

export default function FooterLanding() {
    return (
        <footer className="w-full overflow-x-hidden bg-navy px-6 py-12 text-white lg:px-12 lg:py-16">
            <div className="mx-auto flex max-w-6xl flex-col items-center">
                {/* Logo */}
                <a
                    href="/"
                    className="rounded text-2xl font-bold tracking-[0.15em] text-white transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                    KOKO<span className="align-super text-xs">™</span>
                </a>

                {/* Contact + social */}
                <nav
                    aria-label="Contacto y redes sociales"
                    className="mt-10 flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-4"
                >
                    <FooterLink href="mailto:info@kokomls.com" icon={<AtIcon />}>
                        info@kokomls.com
                    </FooterLink>
                    {/* PLACEHOLDER — swap "#" for the real profile URLs */}
                    <FooterLink href="#" external icon={<FacebookIcon />}>
                        Facebook
                    </FooterLink>
                    <FooterLink href="#" external icon={<InstagramIcon />}>
                        Instagram
                    </FooterLink>
                    <FooterLink href="#" external icon={<TikTokIcon />}>
                        TikTok
                    </FooterLink>
                    {/* PLACEHOLDER — swap 52XXXXXXXXXX for the real number */}
                    <FooterLink href="https://wa.me/52XXXXXXXXXX" external icon={<WhatsAppIcon />}>
                        WhatsApp
                    </FooterLink>
                </nav>

                {/* Divider */}
                <div className="mt-10 h-px w-full bg-white/20" />

                {/* Bottom bar */}
                <div className="mt-6 flex w-full flex-col items-center gap-4 text-center text-xs text-white/70 lg:flex-row lg:justify-between lg:text-left">
                    <p>© 2026 KOKO™. Todos los derechos reservados.</p>

                    <LegalLink href="#">Preguntas frecuentes</LegalLink>

                    <div className="flex items-center gap-6">
                        <LegalLink href="#">Términos y condiciones</LegalLink>
                        <LegalLink href="#">Aviso de privacidad</LegalLink>
                    </div>
                </div>
            </div>
        </footer>
    )
}
