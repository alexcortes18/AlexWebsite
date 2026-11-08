import portrait from './assets/Alex_dark_blue.jpg'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const stops = [
  { title: 'Honduras', note: 'Home, mechatronics, and the factory floor.', to: '/journey/honduras', frame: 'falls', x: 110, y: 403, color: '#dce78e' },
  { title: 'Hsinchu', note: 'A new home, a master’s at NTHU, and a summer at IBM.', to: '/journey/nthu', frame: 'dorm_view', x: 339, y: 216, color: '#ffd48a' },
  { title: 'Taiwan’s coast', note: 'A little 125 cc scooter and more than 800 km on the west coast.', to: '/photos/coastal-road', frame: 'kenting', x: 584, y: 337, color: '#f4a992' },
  { title: 'Today', note: 'Power BI, clinical machine learning, RAG, and a SQL agent.', to: '/work', frame: 'lab', x: 778, y: 143, color: '#c8bff2' },
]

const roads = [
  'M110 403 C168 480 288 424 235 351 S205 240 339 216',
  'M339 216 C446 184 482 212 451 277 S470 391 584 337',
  'M584 337 C661 301 617 257 666 219 S778 216 778 143',
]

function Rider({ riderRef }) {
  return <g ref={riderRef} transform="translate(110 403)">
    <ellipse cx="0" cy="10" rx="53" ry="9" fill="#20332c" opacity=".16" />
    <g stroke="#242722" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round">
      <circle cx="-31" cy="-2" r="12" fill="#242722" /><circle cx="34" cy="-2" r="12" fill="#242722" />
      <circle cx="-31" cy="-2" r="4" fill="#e4d9bc" /><circle cx="34" cy="-2" r="4" fill="#e4d9bc" />
      <path d="M-44-17Q-44-37-19-39L-4-34 1-16 18-16 22-37 16-52 31-54 42-22 45-13 31-12 19-8-22-8Z" fill="#dce2db" />
      <path d="M-43-33Q-29-42-6-36L1-31H-38Z" fill="#303a36" />
      <path d="M21-49 16-59 10-59M27-56 34-66 41-66" fill="none" />
      <path d="M31-48 38-31 31-31 26-46Z" fill="#ffe47b" />
      <path d="M-21-57-8-48 6-43 2-23 13-19 11-14H-5L-11-34-29-39Z" fill="#355b68" />
      <path d="M-24-74Q-8-82-4-62L-12-47-30-48-31-57Z" fill="#df664b" />
      <path d="M-17-67-5-62 13-61 16-56-4-54-19-59" fill="#f5a66c" />
      <defs><clipPath id="rider-face"><ellipse cx="-14" cy="-82" rx="13" ry="15" /></clipPath></defs>
      <image href={portrait} x="-38" y="-106" width="48" height="51" preserveAspectRatio="xMidYMid slice" clipPath="url(#rider-face)" />
      <ellipse cx="-14" cy="-82" rx="13" ry="15" fill="none" />
      <path d="M-29-81Q-37-95-25-102-8-109-1-91L-1-86-19-87-22-79Z" fill="#fbe279" />
      <path d="M-31-72Q-45-75-46-57L-42-44-29-47Z" fill="#5b7c57" />
    </g>
  </g>
}

export default function RoadTrip() {
  const tripRef = useRef(null)
  const pathRefs = useRef([])
  const riderRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const trip = tripRef.current
    const rider = riderRef.current
    const paths = pathRefs.current
    const lengths = paths.map(path => path.getTotalLength())
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    function draw() {
      const distance = Math.max(1, trip.offsetHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -trip.getBoundingClientRect().top / distance)) * roads.length
      const index = Math.min(roads.length - 1, Math.floor(progress))
      const stop = Math.round(progress)
      const point = reduced.matches ? stops[stop] : paths[index].getPointAtLength((progress - index) * lengths[index])
      rider.setAttribute('transform', 'translate(' + point.x + ' ' + point.y + ')')
      paths.forEach((path, i) => {
        path.style.strokeDasharray = lengths[i]
        path.style.strokeDashoffset = lengths[i] * (1 - Math.min(1, Math.max(0, progress - i)))
      })
      setActive(stop)
      frame = 0
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduced.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduced.removeEventListener('change', schedule)
    }
  }, [])

  function goTo(index) {
    const trip = tripRef.current
    window.scrollTo({
      top: window.scrollY + trip.getBoundingClientRect().top + (trip.offsetHeight - window.innerHeight) * index / roads.length,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  const stop = stops[active]
  return <section className="ride" ref={tripRef} id="ride" aria-label="Ride through Alex’s story">
    <div className="ride-stage" style={{ '--stop-color': stop.color }}>
      <div className="ride-top"><span>FIELD MAP / 01</span><span>SCROLL TO RIDE ↓</span></div>
      <div className="atlas">
        <svg viewBox="0 0 900 510" role="img" aria-label="Illustrated route through Honduras, Taiwan, and Alex’s current work">
          <defs><pattern id="atlas-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M0 30V0H30" fill="none" stroke="#355b68" strokeOpacity=".17" /></pattern></defs>
          <rect width="900" height="510" fill="#a5c8c2" /><rect width="900" height="510" fill="url(#atlas-grid)" />
          <path d="M0 146 57 165 96 144 143 161 173 194 205 196 246 222 259 258 232 300 235 352 194 376 172 429 131 437 99 472 0 465Z" fill="#c6d784" stroke="#506b4f" strokeWidth="3" />
          <path d="M425 83Q451 56 469 78T467 144Q452 177 439 209T392 263Q367 270 362 240T381 170Q391 121 425 83Z" fill="#dfdf94" stroke="#506b4f" strokeWidth="3" />
          <path d="M709 268Q774 221 900 245V510H617Q600 472 636 422T709 268Z" fill="#e1bb7c" stroke="#8c7150" strokeWidth="3" />
          <g fill="none" stroke="#526b57" strokeWidth="3" strokeLinecap="round">
            <path d="m24 238 24-30 23 28 22-30 29 33m-85 80 15-19 18 19m333-162 15-25 12 19 15-24 14 25m294 222 29-35 20 25 19-29 24 29"/>
            <path d="M278 117q15-9 30 0t30 0m-75 24q15-9 30 0t30 0m240-37q15-9 30 0t30 0m-64 23q15-9 30 0t30 0m-271 289q15-9 30 0t30 0" opacity=".6"/>
          </g>
          <g fill="#29463b" fontFamily="monospace" fontSize="18" fontWeight="bold" letterSpacing="3">
            <text x="22" y="184">HONDURAS</text><text x="374" y="63">TAIWAN</text><text x="697" y="105">TODAY</text>
          </g>
          {roads.map(d => <path key={d} d={d} fill="none" stroke="#fbf2d8" strokeWidth="21" strokeLinecap="round" />)}
          {roads.map((d, i) => <path key={d} ref={el => { pathRefs.current[i] = el }} d={d} fill="none" stroke="#b84735" strokeWidth="5" strokeLinecap="round" />)}
          {stops.map(({ x, y, title }, i) => <circle key={title} cx={x} cy={y} r="9" fill={active === i ? '#fbe279' : '#fff5dc'} stroke="#24372e" strokeWidth="3" />)}
          <Rider riderRef={riderRef} />
          <g transform="translate(825 419)" fill="none" stroke="#284b45" strokeWidth="2"><circle r="27" /><path d="M0-20 7 9 0 3-7 9Z" fill="#284b45" /></g>
        </svg>
        <article className="ride-ticket">
          <img src={'/frames/' + stop.frame + '.webp'} alt="" />
          <div><span className="eyebrow">STOP 0{active + 1} / 04</span><h2>{stop.title}</h2><p>{stop.note}</p><Link to={stop.to}>Pull over here ↗</Link></div>
        </article>
      </div>
      <nav className="ride-dial" aria-label="Jump to a ride stop">
        {stops.map(({ title }, i) => <button key={title} type="button" onClick={() => goTo(i)} aria-current={active === i ? 'step' : undefined}><span>0{i + 1}</span>{title}</button>)}
      </nav>
    </div>
  </section>
}
