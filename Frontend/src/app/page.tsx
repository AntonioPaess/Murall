import Hero from "../components/hero"
import Navbar from "../components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="relative z-10">
        <Navbar />
        <Hero />
      </div>
    </main>
  )
}
