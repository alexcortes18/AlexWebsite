import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import RoadTrip from './RoadTrip.jsx'

function Frame({ name, caption, eager = false, className = '' }) {
  return <figure className={className}><img src={`/frames/${name}.webp`} alt={caption} loading={eager ? 'eager' : 'lazy'} /><figcaption>{caption}</figcaption></figure>
}

function Home() {
  return <>
    <section className="departure">
      <div className="departure-copy">
        <p className="eyebrow">HONDURAS ↔ TAIWAN</p>
        <h1>Alex<br />Cortés<span>.</span></h1>
        <p>Engineer from Honduras. Taiwan became home, and somewhere along the way I picked up a camera, a 125 cc scooter, and a taste for working with data.</p>
        <div className="departure-actions">
          <a href="#ride">Start the ride ↓</a>
          <label className="pick-stop">Pick a stop
            <select defaultValue="" onChange={event => document.getElementById(event.target.value)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
              <option value="" disabled>Choose a place…</option>
              <option value="honduras-start">Honduras · Choluteca</option>
              <option value="hsinchu-masters">Hsinchu · start the master’s</option>
              <option value="taipei-ibm">Taipei · IBM</option>
              <option value="hsinchu-finish">Hsinchu · finish the master’s</option>
              <option value="honduras-work">Honduras · Moxland</option>
            </select>
          </label>
        </div>
      </div>
      <div className="departure-collage" aria-label="A few moments from Honduras and Taiwan">
        <span className="collage-mark" aria-hidden="true">✷</span>
        <Frame name="dongmen" caption="Taipei after dark" eager className="departure-photo" />
        <Frame name="helmet-ride" caption="On two wheels" eager className="scooter-photo" />
        <Frame name="dorm_view" caption="Hsinchu" eager className="collage-extra collage-campus" />
        <Frame name="falls" caption="Honduras" eager className="collage-extra collage-home" />
        <Frame name="ig-coast" caption="Taiwan’s coast" eager className="collage-extra collage-coast" />
      </div>
    </section>
    <RoadTrip />
  </>
}

export default function App() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return <>
    <a href="#content" className="skip">Skip to content</a>
    <main id="content">
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </>
}
