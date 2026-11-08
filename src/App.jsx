import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { chapters, projects, photos, github, linkedin } from './portfolio'
import resume from './assets/AlexCortesCV.pdf'
import { coverLetter } from './data/coverletter'

const destinations = [['/journey', 'Journey'], ['/work', 'Work'], ['/lab', 'AI Lab'], ['/photos', 'Photos']]

function Frame({ name, caption, eager = false }) {
  return <figure><img src={'/frames/' + name + '.webp'} alt={caption} loading={eager ? 'eager' : 'lazy'} /><figcaption>{caption}</figcaption></figure>
}

function Key() {
  return <svg viewBox="0 0 80 38" width="66" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M33 21 14 33 5 31l1-7 7-5 4 1 4-5 10-5"/><path d="M31 10c0-6 8-9 16-7 12 3 16 9 12 16-4 6-12 10-20 7-5-2-8-8-8-16Z"/><circle cx="49" cy="13" r="3"/><path d="M49 13c12-14 28-6 24 5-3 8-13 10-18 3"/></g></svg>
}

function RoadMap({ mapRef }) {
  return <dialog ref={mapRef} className="map" onClick={event => { if (event.target === event.currentTarget) mapRef.current.close() }}>
    <div className="map-inner">
      <button className="close" onClick={() => mapRef.current.close()} aria-label="Close route map">×</button>
      <p className="eyebrow">The long way around</p><h2>Where to?</h2>
      <nav className="map-stops" aria-label="Route destinations">
        {destinations.map(([path, title], index) => <Link key={path} to={path} onClick={() => mapRef.current.close()}><span>0{index + 1}</span>{title}<span aria-hidden="true">↗</span></Link>)}
        <Link to="/photos/coastal-road" onClick={() => mapRef.current.close()}><span>↳</span> The coastal road <span aria-hidden="true">↗</span></Link>
      </nav>
    </div>
  </dialog>
}

function Home({ openMap }) {
  return <>
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow"><span className="dot" /> Honduras → Taiwan</p>
        <h1>Hi, I’m<br />Alex Cortés<span>.</span></h1>
        <p className="lede">I started on factory floors in Honduras, found a second home in Taiwan, and now build things with data and machine learning.</p>
        <button className="key-button" onClick={openMap}><Key /><span>Open the route map <span aria-hidden="true">↗</span></span></button>
      </div>
      <Link className="hero-photo" to="/photos/dongmen" aria-label="See the Dongmen Market photo"><Frame name="dongmen" caption="FRAME 01 / DONGMEN MARKET, TAIWAN" eager /></Link>
    </section>
    <section className="home-route" aria-label="Three stops on the journey">
      <p className="eyebrow">The long way around / a few stops</p>
      <div className="route-teasers">
        {[[chapters[0], 'Where I started'], [chapters[2], 'Where I found a second home'], [chapters[5], 'What I build now']].map(([stop, label], i) => <Link key={stop.id} to={'/journey/' + stop.id}><span className="mile">0{i + 1}</span><strong>{['Honduras', 'NTHU, Taiwan', 'Today'][i]}</strong><small>{label}</small></Link>)}
      </div>
      <Link className="arrow-link" to="/journey">See the full journey →</Link>
    </section>
  </>
}

function PageHead({ label, title, intro }) {
  return <header className="page-head"><p className="eyebrow">{label}</p><h1>{title}</h1>{intro && <p className="lede">{intro}</p>}</header>
}

function Journey() {
  const routeRef = useRef(null)
  useEffect(() => {
    const route = routeRef.current
    let frame = 0
    function draw() {
      const { top, height } = route.getBoundingClientRect()
      const progress = (window.innerHeight * 0.73 - top) / height
      route.style.setProperty('--progress', Math.min(1, Math.max(0, progress)))
      frame = 0
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
  return <>
    <PageHead label="01 / The long way around" title="The journey." intro="Six stops, from Honduras to Taiwan and into the work I do today." />
    <ol className="journey" ref={routeRef}>
      {chapters.map((chapter, i) => <li key={chapter.id}>
        <span className="mile">0{i + 1}</span>
        <Link className="stop" to={'/journey/' + chapter.id}>
          <div><p className="eyebrow">{chapter.time}</p><h2>{chapter.title}</h2><p>{chapter.intro}</p><span className="arrow-link">Open chapter →</span></div>
          <Frame name={chapter.image} caption={chapter.caption} />
        </Link>
      </li>)}
    </ol>
  </>
}

function Chapter() {
  const { id } = useParams()
  const index = chapters.findIndex(chapter => chapter.id === id)
  if (index < 0) return <Missing />
  const chapter = chapters[index]
  const next = chapters[index + 1]
  return <>
    <Link className="back" to="/journey">← All stops</Link>
    <PageHead label={chapter.time} title={chapter.title} intro={chapter.intro} />
    <div className="chapter-image"><Frame name={chapter.image} caption={chapter.caption} eager /></div>
    <div className="chapter-notes">
      {chapter.notes.map(([title, copy, photo]) => <details key={title}>
        <summary>{photo && <img src={'/frames/' + photo + '.webp'} alt="" />}{title}<span aria-hidden="true">+</span></summary>
        <p>{copy}</p>
      </details>)}
      {id === 'nthu' && <Link className="arrow-link" to="/work/eeg">See the EEG project →</Link>}
      {chapter.link && <Link className="arrow-link" to={chapter.link[0]}>{chapter.link[1]} →</Link>}
    </div>
    {next && <Link className="next" to={'/journey/' + next.id}>Next stop <strong>{next.title} →</strong></Link>}
  </>
}

function Work() {
  return <>
    <PageHead label="02 / Selected work" title="Things I’ve built." intro="From industrial controls to reporting, clinical machine learning, and tools that help people ask questions of their data." />
    <div className="project-list">
      {projects.map((project, i) => <Link key={project.id} to={'/work/' + project.id}><span className="eyebrow">0{i + 1} / {project.area}</span><div><h2>{project.title}</h2><p>{project.intro}</p></div><span aria-hidden="true">↗</span></Link>)}
    </div>
  </>
}

function Project() {
  const { id } = useParams()
  const project = projects.find(item => item.id === id)
  if (!project) return <Missing />
  return <>
    <Link className="back" to="/work">← Selected work</Link>
    <PageHead label={project.area} title={project.title} intro={project.intro} />
    {project.image && <div className="chapter-image"><Frame name={project.image} caption="Control panel, Honduras" /></div>}
    <article className="reading"><h2>How it worked</h2><p>{project.method}</p><h2>What you can explore</h2><p>{project.outcome}</p>
      {project.link && (project.link[0].startsWith('/') ? <Link className="arrow-link" to={project.link[0]}>{project.link[1]} →</Link> : <a className="arrow-link" href={project.link[0]}>{project.link[1]} ↗</a>)}
    </article>
  </>
}

function Photos() {
  const [place, setPlace] = useState('All')
  return <>
    <PageHead label="04 / Photo archive" title="Things I noticed." intro="Scenes from home and places I’ve been, photographed along the way." />
    <Link className="next" to="/photos/coastal-road">Photo story <strong>Take the coastal road →</strong></Link>
    <div className="filters" aria-label="Filter by place">
      {['All', 'Taiwan', 'Honduras', 'Japan'].map(item => <button key={item} onClick={() => setPlace(item)} aria-pressed={place === item}>{item}</button>)}
    </div>
    <div className="photo-grid">
      {photos.filter(([, , location]) => place === 'All' || location === place).map(([name, title, location]) => <Link key={name} to={'/photos/' + name}><Frame name={name} caption={title + ' / ' + location} /></Link>)}
    </div>
  </>
}

function PhotoStory() {
  const { id } = useParams()
  const photo = photos.find(([name]) => name === id)
  if (id !== 'coastal-road' && !photo) return <Missing />
  return <>
    <Link className="back" to="/photos">← Photo archive</Link>
    {photo ? <>
      <PageHead label={photo[2]} title={photo[1]} />
      <div className="chapter-image"><Frame name={photo[0]} caption={photo[1]} eager /></div>
    </> : <>
      <PageHead label="A detour / Taiwan" title="Take the coastal road." intro="More than 800 km solo along Taiwan’s west coast on a 125 cc scooter, with plenty of stops by the water." />
      <div className="chapter-image"><Frame name="kenting" caption="From my Taiwan coastal photo archive" eager /></div>
      <p className="reading"><a className="arrow-link" href="https://www.instagram.com/alexjcortes10/p/DFhi--2v343WadFxZuvkZBSU_nOr89DyBbIw7Y0/">See the original ride photos on Instagram ↗</a></p>
    </>}
  </>
}

const sampleCodes = [['Procedure A', 0.91], ['Procedure B', 0.74], ['Procedure C', 0.53], ['Procedure D', 0.28]]
const queries = [
  { label: 'How many reviews are open?', sql: "SELECT COUNT(*) FROM reviews WHERE status = 'open';", result: '3 open reviews' },
  { label: 'Which queues have open reviews?', sql: "SELECT queue, COUNT(*) FROM reviews WHERE status = 'open' GROUP BY queue;", result: 'Coding: 2 · Audit: 1' },
]

function Lab() {
  const [threshold, setThreshold] = useState(0.5)
  const [query, setQuery] = useState(0)
  const [search, setSearch] = useState('')
  const [submitted, setSubmitted] = useState('')
  const tokens = submitted.toLowerCase().match(/[a-z0-9]+/g)?.filter(word => word.length >= 3 && !['the', 'and', 'what', 'how', 'you', 'did', 'for', 'about', 'which'].includes(word)) ?? []
  const matches = projects.map(project => ({
    project,
    score: tokens.filter(word => [project.title, project.area, project.intro, project.method].join(' ').toLowerCase().includes(word)).length,
  })).filter(match => match.score > 0).sort((a, b) => b.score - a.score).slice(0, 3)
  const candidates = sampleCodes.filter(([, score]) => score >= threshold)
  return <>
    <PageHead label="03 / Experiments" title="AI Lab." intro="Small examples of the ideas behind my clinical ML, retrieval, and SQL agent work." />
    <section className="lab-panel" id="threshold">
      <p className="eyebrow">01 / Synthetic example</p><h2>Where do you set the cutoff?</h2>
      <p>Lowering the cutoff puts more candidate procedure codes in front of the reviewer. Try moving it.</p>
      <label htmlFor="cutoff">Score cutoff <strong>{threshold.toFixed(2)}</strong></label>
      <input id="cutoff" type="range" min="0" max="1" step=".01" value={threshold} onChange={event => setThreshold(Number(event.target.value))} />
      <ul aria-live="polite">{candidates.map(([name, score]) => <li key={name}>{name} <strong>{score.toFixed(2)}</strong></li>)}</ul>
      {candidates.length === 0 && <p role="status">No candidates meet this cutoff.</p>}
    </section>
    <section className="lab-panel" id="retrieval">
      <p className="eyebrow">02 / Search public project notes</p><h2>What would the model read?</h2>
      <p>Try “clinical coding”, “vector database”, or “EEG”. This demo uses keyword matching to show the retrieval step.</p>
      <form onSubmit={event => { event.preventDefault(); setSubmitted(search.trim()) }}>
        <label htmlFor="search">Search terms</label><div className="search-row"><input id="search" type="search" value={search} onChange={event => setSearch(event.target.value)} required /><button>Find sources</button></div>
      </form>
      <div aria-live="polite">{submitted && (matches.length ? matches.map(({ project }) => <article key={project.id}><h3><Link to={'/work/' + project.id}>{project.title} ↗</Link></h3><p>{project.method}</p></article>) : <p>No matches. Try a different term.</p>)}</div>
      <a className="arrow-link" href={github + '/RAG_Fundamentals'}>See my RAG example on GitHub ↗</a>
    </section>
    <section className="lab-panel" id="sql">
      <p className="eyebrow">03 / Fictional data · example queries</p><h2>From question to SQL.</h2>
      <label htmlFor="query">Choose a question</label>
      <select id="query" value={query} onChange={event => setQuery(Number(event.target.value))}>{queries.map(({ label }, i) => <option key={label} value={i}>{label}</option>)}</select>
      <pre><code>{queries[query].sql}</code></pre><p aria-live="polite">{queries[query].result}</p>
    </section>
  </>
}

function Missing() {
  return <><PageHead label="Detour" title="This road ends here." /><Link className="arrow-link" to="/">← Back home</Link></>
}

export default function App() {
  const mapRef = useRef(null)
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  const openMap = () => mapRef.current.showModal()
  return <>
    <a href="#content" className="skip">Skip to content</a>
    <header className="site-header">
      <Link className="wordmark" to="/">Alex Cortés<span>.</span><small>The long way around</small></Link>
      <nav aria-label="Main navigation">{destinations.map(([path, title]) => <NavLink key={path} to={path}>{title}</NavLink>)}</nav>
      <button className="map-trigger" onClick={openMap} aria-label="Open route map"><Key /></button>
    </header>
    <RoadMap mapRef={mapRef} />
    <main id="content">
      <Routes>
        <Route index element={<Home openMap={openMap} />} />
        <Route path="journey" element={<Journey />} /><Route path="journey/:id" element={<Chapter />} />
        <Route path="work" element={<Work />} /><Route path="work/:id" element={<Project />} />
        <Route path="photos" element={<Photos />} /><Route path="photos/:id" element={<PhotoStory />} />
        <Route path="lab" element={<Lab />} />
        <Route path="curriculum" element={<><PageHead label="Alex Cortés" title="Résumé." intro="Mechatronics, data engineering, analytics, and applied machine learning." /><a className="arrow-link" href={resume}>Open résumé PDF ↗</a></>} />
        <Route path="coverletter" element={<><PageHead label="Alex Cortés" title="Cover letter." /><article className="reading">{Array.isArray(coverLetter) && coverLetter.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</article></>} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </main>
    <footer><Link to="/">Alex Cortés</Link><div><Link to="/curriculum">Résumé</Link><a href={github}>GitHub</a><a href={linkedin}>LinkedIn</a><a href="mailto:alex.cortes.i10@gmail.com">Email</a></div></footer>
  </>
}
