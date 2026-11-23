import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import StudioShowcase from './components/StudioShowcase.jsx'
import SecuritySection from './components/SecuritySection.jsx'
import RolesSection from './components/RolesSection.jsx'
import JoinCta from './components/JoinCta.jsx'
import Footer from './components/Footer.jsx'
import AccessibleModal from './components/AccessibleModal.jsx'
import './components/shared.css'

export default function App() {
  const [modal, setModal] = useState({ open: false, type: 'join' })

  const openModal = (type) => setModal({ open: true, type })
  const closeModal = () => setModal((state) => ({ ...state, open: false }))

  return (
    <div className="app-container">
      <Navbar onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <StudioShowcase />
        <SecuritySection />
        <RolesSection onOpenModal={openModal} />
        <JoinCta />
      </main>
      <Footer />
      <AccessibleModal open={modal.open} type={modal.type} onClose={closeModal} />
    </div>
  )
}
