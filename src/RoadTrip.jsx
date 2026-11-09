import { useEffect, useRef, useState } from 'react'

const stops = [
  { id: 'honduras-start', title: 'Honduras', place: 'Choluteca · first chapter', note: 'Mechatronics, industrial automation, and learning how real systems behave outside the classroom.', frame: 'controlPanel', color: '#dce78e', x: 172, y: 85 },
  { id: 'hsinchu-masters', title: 'Hsinchu', place: 'NTHU · the master’s years', note: 'A new home, a new language around data, and the beginning of my life in Taiwan.', frame: 'dorm_view', color: '#ffd48a', x: 303, y: 256 },
  { id: 'taipei-ibm', title: 'Taipei', place: 'IBM · a first industry chapter', note: 'Taking what I learned at NTHU into a fast-moving team and seeing data work at a different scale.', frame: 'taipei1', color: '#f4a992', x: 315, y: 185 },
  { id: 'hsinchu-finish', title: 'Hsinchu', place: 'NTHU · bringing it home', note: 'Finishing the master’s, building research experience, and connecting engineering with applied AI.', frame: 'Oral_defense', color: '#c8bff2', x: 303, y: 625 },
  { id: 'honduras-work', title: 'Honduras', place: 'Moxland · back to build', note: 'Returning with a wider toolkit: analytics, machine learning, RAG, and a practical engineering mindset.', frame: 'green_meters', color: '#a5c8c2', x: 45, y: 438 },
]

const route = 'M172 85 C284 122 206 209 303 256 C386 230 361 164 315 185 C268 207 250 308 303 256 C238 330 205 400 45 438'

function Rider({ riderRef }) {
  return <g ref={riderRef} transform="translate(172 85)">
    <ellipse cx="0" cy="4" rx="48" ry="7" fill="#20332c" opacity=".14" />
    <svg x="-26" y="-106" width="144" height="119" viewBox="0 0 1379 1141" overflow="visible" aria-hidden="true">
      <image href="/frames/rider-cutout.webp" width="1379" height="1141" preserveAspectRatio="none" />
    </svg>
  </g>
}

export default function RoadTrip() {
  const sectionRef = useRef(null)
  const pathRef = useRef(null)
  const riderRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const path = pathRef.current
    const rider = riderRef.current
    const length = path.getTotalLength()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    function draw() {
      const distance = Math.max(1, section.offsetHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance))
      const point = reduced.matches ? stops[Math.min(stops.length - 1, Math.round(progress * (stops.length - 1)))] : path.getPointAtLength(progress * length)
      rider.setAttribute('transform', `translate(${point.x} ${point.y})`)
      path.style.strokeDasharray = length
      path.style.strokeDashoffset = length * (1 - progress)
      setActive(Math.min(stops.length - 1, Math.round(progress * (stops.length - 1))))
      frame = 0
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(draw) }
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

  function jumpTo(index) {
    document.getElementById(stops[index].id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' })
  }

  return <section className="ride" ref={sectionRef} id="ride" aria-label="Alex’s journey from Honduras to Taiwan and back">
    <div className="ride-stage" style={{ '--stop-color': stops[active].color }}>
      <div className="ride-top"><span>A road shaped by a few detours</span><span>KEEP SCROLLING ↓</span></div>
      <div className="vertical-route">
        <div className="route-map">
          <svg viewBox="0 0 450 900" role="img" aria-label="A vertical illustrated route connecting five chapters in Honduras and Taiwan">
            <defs><pattern id="atlas-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M0 30V0H30" fill="none" stroke="#355b68" strokeOpacity=".17" /></pattern></defs>
            <rect width="450" height="900" fill="#a5c8c2" /><rect width="450" height="900" fill="url(#atlas-grid)" />
            <path d="M0 26 68 47 95 35 138 61 168 92 153 140 124 180 143 223 123 279 93 307 117 359 78 410 52 473 0 468Z" fill="#c6d784" stroke="#506b4f" strokeWidth="3" />
            <path d="M278 177Q312 151 334 178T327 243Q306 276 295 309T249 353Q223 356 220 327T239 257Q245 208 278 177Z" fill="#dfdf94" stroke="#506b4f" strokeWidth="3" />
            <path d="M337 423Q371 399 450 419V900H305Q291 864 314 809T337 423Z" fill="#e1bb7c" stroke="#8c7150" strokeWidth="3" />
            <g fill="#29463b" fontFamily="monospace" fontSize="15" fontWeight="bold" letterSpacing="2"><text x="14" y="58">HONDURAS</text><text x="257" y="161">TAIWAN</text><text x="319" y="163">TAIPEI</text><text x="226" y="300">HSINCHU</text></g>
            <path d={route} fill="none" stroke="#fbf2d8" strokeWidth="21" strokeLinecap="round" />
            <path ref={pathRef} d={route} fill="none" stroke="#b84735" strokeWidth="5" strokeLinecap="round" />
            {stops.map(({ x, y, title, id }, index) => <g key={id} onClick={() => jumpTo(index)} role="button" tabIndex="0" aria-label={`Go to ${title}, stop ${index + 1}`} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') jumpTo(index) }} style={{ cursor: 'pointer' }}><circle cx={x} cy={y} r="15" fill={active === index ? '#fbe279' : '#fff5dc'} stroke="#24372e" strokeWidth="3" /><circle cx={x} cy={y} r="4" fill="#b84735" /></g>)}
            <Rider riderRef={riderRef} />
          </svg>
        </div>
        <ol className="route-stories">
          {stops.map(({ id, title, place, note, frame, color }, index) => <li id={id} key={id} className={active === index ? 'is-active' : ''} style={{ '--chapter-color': color }}>
            <button type="button" className="chapter-select" onClick={() => jumpTo(index)} aria-current={active === index ? 'step' : undefined}>
              <img src={`/frames/${frame}.webp`} alt="" loading={index < 2 ? 'eager' : 'lazy'} />
              <span><small>{place}</small><strong>{title}</strong><em>{note}</em></span>
            </button>
          </li>)}
        </ol>
      </div>
    </div>
  </section>
}
