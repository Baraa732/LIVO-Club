import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Games from '@/components/Games/Games'
import About from '@/components/About/About'
import Tournament from '@/components/Tournament/Tournament'
import Events from '@/components/Events/Events'
import Teams from '@/components/Teams/Teams'
import Champions from '@/components/Champions/Champions'
import Gallery from '@/components/Gallery/Gallery'
import CTA from '@/components/CTA/CTA'
import Rules from '@/components/Rules/Rules'
import Contact from '@/components/Contact/Contact'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* #home */}
        <Hero />

        {/* #games */}
        <Games />

        {/* #about */}
        <About />

        {/* #tournament */}
        <Tournament />

        {/* #events */}
        <Events />

        {/* #teams */}
        <Teams />

        {/* #champions */}
        <Champions />

        {/* #gallery */}
        <Gallery />

        {/* #join */}
        <CTA />

        {/* #rules */}
        <Rules />

        {/* #contact */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
