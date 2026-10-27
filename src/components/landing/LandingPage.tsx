import HeaderLanding from "./HeaderLanding"
import HeroLanding from "./HeroLanding"
import MlsSection from "./MlsSection"
import LocalbirdSection from "./LocalbirdSection"
import FooterLanding from "./FooterLanding"

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-frame font-sans text-navy">
            <HeaderLanding />
            <HeroLanding />
            <MlsSection />
            <LocalbirdSection />
            <FooterLanding />
        </main>
    )
}
