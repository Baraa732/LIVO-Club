import dynamic from 'next/dynamic'
import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import GamesShell from '@/components/Games/GamesShell'

const About      = dynamic(() => import('@/components/About/About'))
const Tournament = dynamic(() => import('@/components/Tournament/Tournament'))
const Events     = dynamic(() => import('@/components/Events/Events'))
const Teams      = dynamic(() => import('@/components/Teams/Teams'))
const Champions  = dynamic(() => import('@/components/Champions/Champions'))
const Gallery    = dynamic(() => import('@/components/Gallery/Gallery'))
const CTA        = dynamic(() => import('@/components/CTA/CTA'))
const Rules      = dynamic(() => import('@/components/Rules/Rules'))
const Contact    = dynamic(() => import('@/components/Contact/Contact'))
const Footer     = dynamic(() => import('@/components/Footer/Footer'))

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* #home */}
        <Hero />

        {/* #games */}
        <GamesShell />

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
