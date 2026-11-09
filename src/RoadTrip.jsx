import { useEffect, useRef, useState } from 'react'

const stops = [
  { id: 'honduras-start', title: 'Honduras', place: 'Choluteca · first chapter', note: 'Mechatronics, industrial automation, and learning how real systems behave outside the classroom.', frame: 'controlPanel', color: '#dce78e', x: 295, y: 245 },
  { id: 'hsinchu-masters', title: 'Hsinchu', place: 'NTHU · the master’s years', note: 'A new home, a new language around data, and the beginning of my life in Taiwan.', frame: 'dorm_view', color: '#ffd48a', x: 610, y: 298 },
  { id: 'taipei-ibm', title: 'Taipei', place: 'IBM · a first industry chapter', note: 'Taking what I learned at NTHU into a fast-moving team and seeing data work at a different scale.', frame: 'taipei1', color: '#f4a992', x: 637, y: 207 },
  { id: 'hsinchu-finish', title: 'Hsinchu', place: 'NTHU · bringing it home', note: 'Finishing the master’s, building research experience, and connecting engineering with applied AI.', frame: 'Oral_defense', color: '#c8bff2', x: 610, y: 298 },
  { id: 'honduras-work', title: 'Honduras', place: 'MoxieLink · back to build', note: 'Back in Honduras at MoxieLink, bringing analytics, machine learning, RAG, and an engineering mindset into practical work.', frame: 'green_meters', color: '#a5c8c2', x: 230, y: 734 },
]

const route = 'M295 245 C410 230 505 355 610 298 C690 264 684 210 637 207 C584 203 565 260 610 298 C547 414 410 560 230 734'

function Rider({ riderRef }) {
  return <g ref={riderRef} transform="translate(295 245)">
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
            {/* Central America, with Honduras highlighted in the isthmus */}
            <path d="M58 121 104 104 147 115 176 139 205 150 226 174 254 184 273 210 302 221 320 246 342 256 354 282 375 296 384 320 414 330 427 350 455 352 474 370 501 372 516 391 548 395 561 415 589 420 604 442 629 448 640 468 676 476 690 499 670 518 636 513 612 496 580 492 558 474 525 468 506 448 474 443 456 424 427 418 410 397 379 393 362 370 333 366 316 344 289 337 269 315 239 307 221 286 194 276 177 253 145 244 124 223 97 214 83 189 62 174Z" fill="#dce78e" stroke="#506b4f" strokeWidth="3" />
            <path d="M258 180 280 198 301 216 320 243 343 254" fill="none" stroke="#79905e" strokeWidth="17" strokeLinecap="round" />
            <path d="M0 701 47 681 88 690 126 674 174 689 205 711 244 714 278 741 317 753 348 784 365 815 348 846 309 866 262 858 221 875 174 858 126 873 84 850 42 861 0 841Z" fill="#dce78e" stroke="#506b4f" strokeWidth="3" />
            {/* Taiwan: elongated north-to-south island; Hsinchu is west coast, Taipei north */}
            <path d="M626 183Q641 169 655 187Q671 208 668 235L663 270Q656 296 665 321Q674 347 660 377L649 408Q641 435 624 464Q613 485 599 476Q585 468 589 443L598 408Q607 380 602 354Q596 329 603 302L610 269Q614 235 611 211Q612 193 626 183Z" fill="#dfdf94" stroke="#506b4f" strokeWidth="4" />
            <path d="M609 287Q631 291 658 280" fill="none" stroke="#79905e" strokeWidth="8" strokeLinecap="round" />
            <g fill="#29463b" fontFamily="monospace" fontSize="17" fontWeight="bold" letterSpacing="2"><text x="92" y="151">HONDURAS</text><text x="602" y="148">TAIWAN</text><text x="520" y="210">TAIPEI</text><text x="518" y="300">HSINCHU</text><text x="28" y="822">HONDURAS · RETURN</text></g>
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
