import { useEffect, useRef, useState } from 'react'

const stops = [
  { id: 'honduras-start', title: 'Honduras', place: 'Choluteca · first chapter', note: 'Mechatronics, industrial automation, and learning how real systems behave outside the classroom.', frame: 'controlPanel', color: '#dce78e', x: 187, y: 324 },
  { id: 'hsinchu-masters', title: 'Hsinchu', place: 'NTHU · the master’s years', note: 'A new home, a new language around data, and the beginning of my life in Taiwan.', frame: 'dorm_view', color: '#ffd48a', x: 610, y: 298 },
  { id: 'taipei-ibm', title: 'Taipei', place: 'IBM · a first industry chapter', note: 'Taking what I learned at NTHU into a fast-moving team and seeing data work at a different scale.', frame: 'taipei1', color: '#f4a992', x: 637, y: 207 },
  { id: 'hsinchu-finish', title: 'Hsinchu', place: 'NTHU · bringing it home', note: 'Finishing the master’s, building research experience, and connecting engineering with applied AI.', frame: 'Oral_defense', color: '#c8bff2', x: 610, y: 298 },
  { id: 'honduras-work', title: 'Honduras', place: 'MoxieLink · back to build', note: 'Back in Honduras at MoxieLink, bringing analytics, machine learning, RAG, and an engineering mindset into practical work.', frame: 'green_meters', color: '#a5c8c2', x: 187, y: 281 },
]

const route = 'M187 324 C318 308 472 365 610 298 C690 264 684 210 637 207 C584 203 565 260 610 298 C485 384 314 409 187 281'

function Rider({ riderRef }) {
  return <g ref={riderRef} transform="translate(187 324)">
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
          <svg viewBox="0 0 760 900" role="img" aria-label="A vertical illustrated route from Honduras to Hsinchu and Taipei, then back to Hsinchu and Honduras">
            <defs><pattern id="atlas-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M0 30V0H30" fill="none" stroke="#355b68" strokeOpacity=".17" /></pattern></defs>
            <rect width="760" height="900" fill="#a5c8c2" /><rect width="760" height="900" fill="url(#atlas-grid)" />
            {/* Honduras, simplified from its real national outline. */}
            <path d="M401.4 234.2 L383.2 233.1 L375.9 240.4 L357.5 247.3 L344.1 247.3 L332.4 254.1 L321.8 251.7 L312.7 243.6 L307.2 245.1 L300.4 257.8 L295.3 257.3 L294.4 268.2 L275.9 282.8 L266.2 289.1 L260.7 295.7 L245.1 285 L233.7 299.1 L222.6 298.7 L210.2 300 L211.3 326.1 L203.5 326.5 L196.9 338.6 L180.4 340.8 L171.3 324.2 L155.2 319.6 L158.9 298.4 L151.6 292.7 L140.7 288.9 L117.5 295.2 L115.5 288.1 L99.5 279.6 L88.1 269 L72.5 264.5 L83.5 251.1 L79.3 240.7 L83 230.5 L108.1 215.6 L132.3 195.4 L137.8 197.5 L149.4 188.2 L164.6 187.4 L169.5 191.7 L177.7 189.1 L202.3 193.9 L226.8 192.5 L243.9 186.6 L250.1 180.7 L267 183.5 L279.7 187.1 L293.5 185.8 L304.1 181.2 L328.3 188.6 L336.7 189.7 L352.9 199.6 L368.2 211.5 L387.4 219.6 Z" fill="#dce78e" stroke="#506b4f" strokeWidth="3" />
            {/* Taiwan: elongated north-to-south island; Hsinchu is west coast, Taipei north */}
            <path d="M626 183Q641 169 655 187Q671 208 668 235L663 270Q656 296 665 321Q674 347 660 377L649 408Q641 435 624 464Q613 485 599 476Q585 468 589 443L598 408Q607 380 602 354Q596 329 603 302L610 269Q614 235 611 211Q612 193 626 183Z" fill="#dfdf94" stroke="#506b4f" strokeWidth="4" />
            <path d="M609 287Q631 291 658 280" fill="none" stroke="#79905e" strokeWidth="8" strokeLinecap="round" />
            <g fill="#29463b" fontFamily="monospace" fontSize="17" fontWeight="bold" letterSpacing="2"><text x="177" y="256">HONDURAS</text><text x="602" y="148">TAIWAN</text><text x="520" y="210">TAIPEI</text><text x="518" y="300">HSINCHU</text></g>
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
