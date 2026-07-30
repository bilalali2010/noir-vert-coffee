import { useState, useCallback } from 'react'
import useLenis from './hooks/useLenis'
import Loader from './components/Loader/Loader'
import Cursor from './components/Cursor/Cursor'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Menu from './components/Menu/Menu'
import About from './components/About/About'
import Gallery from './components/Gallery/Gallery'
import Rewards from './components/Rewards/Rewards'
import Testimonials from './components/Testimonials/Testimonials'
import Locations from './components/Locations/Locations'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useLenis()

  const handleLoaded = useCallback(() => setLoaded(true), [])

  return (
    <>
      <Loader onFinish={handleLoaded} />
      <Cursor />
      <Navbar />
      <main aria-hidden={!loaded}>
        <Hero ready={loaded} />
        <Menu />
        <About />
        <Gallery />
        <Rewards />
        <Testimonials />
        <Locations />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
