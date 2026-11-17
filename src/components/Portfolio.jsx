import { useState, useEffect, useRef } from "react";

// ── Utility ──────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Projects", "Experience", "Contact"];

const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "GraphQL",
  "Tailwind CSS",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Figma",
];

const PROJECTS = [
  {
    id: 1,
    tag: "Full-Stack",
    title: "NexaFlow — SaaS Dashboard",
    desc: "Real-time analytics platform processing 2M+ events/day with sub-50 ms query latency.",
    stack: ["React", "Node.js", "PostgreSQL", "Redis"],
    metrics: ["↑ 340% retention", "50 ms p99 latency", "2M+ events/day"],
    color: "#00fbff",
    icon: "◈",
  },
  {
    id: 2,
    tag: "E-Commerce",
    title: "Prism — Headless Commerce",
    desc: "Headless Shopify storefront with AI-powered recommendations and dynamic personalisation engine.",
    stack: ["Next.js", "TypeScript", "Shopify", "OpenAI"],
    metrics: ["↑ 28% conv. rate", "1.2s LCP", "↓ 60% bounce"],
    color: "#7c6fff",
    icon: "⬡",
  },
  {
    id: 3,
    tag: "Mobile",
    title: "Orbit — Finance App",
    desc: "Cross-platform fintech app with end-to-end encryption, biometric auth, and real-time notifications.",
    stack: ["React Native", "GraphQL", "AWS Cognito"],
    metrics: ["4.9★ App Store", "98% crash-free", "50k+ users"],
    color: "#00e5a0",
    icon: "◎",
  },
  {
    id: 4,
    tag: "AI / ML",
    title: "Lexis — AI Writing Suite",
    desc: "GPT-powered long-form editor with semantic search, version history, and collaborative editing.",
    stack: ["React", "Python", "OpenAI", "Pinecone"],
    metrics: ["10k+ active users", "↑ 5× output speed", "150+ integrations"],
    color: "#ff6b6b",
    icon: "◉",
  },
];

const EXPERIENCE = [
  {
    year: "2023–Present",
    role: "Senior Frontend Engineer",
    company: "Veritas Digital",
    type: "Full-time",
    achievements: [
      "Led migration from CRA → Next.js App Router, cutting TTFB by 62%.",
      "Designed and shipped design-system used across 4 product teams.",
      "Mentored 3 junior engineers; 2 promoted within 12 months.",
    ],
  },
  {
    year: "2021–2023",
    role: "Full-Stack Developer",
    company: "Launchpad Studios",
    type: "Full-time",
    achievements: [
      "Architected microservices backend serving 500 k req/day on AWS ECS.",
      "Reduced CI pipeline runtime from 18 min → 4 min via parallelisation.",
      "Shipped 11 client products — 100% on time, within scope.",
    ],
  },
  {
    year: "2019–2021",
    role: "Frontend Developer",
    company: "PixelCraft Agency",
    type: "Full-time",
    achievements: [
      "Rebuilt client's e-commerce checkout: conversion rate ↑ 31%.",
      "Introduced Storybook & Chromatic for visual regression testing.",
      "Core contributor to open-source component library (1.2 k GitHub ★).",
    ],
  },
];

const FILTERS = ["All", "Full-Stack", "E-Commerce", "Mobile", "AI / ML"];

// ── Sub-components ────────────────────────────────────────────────────────────

function GlitchName() {
  const name = "Alex Mercer";
  return (
    <span className="glitch-name" data-text={name} aria-label={name}>
      {name}
    </span>
  );
}

function TerminalTag({ text, delay = 0 }) {
  return (
    <span className="terminal-tag" style={{ animationDelay: `${delay}ms` }}>
      <span className="terminal-prompt">$</span> {text}
    </span>
  );
}

function HeroSection() {
  const [typed, setTyped] = useState("");
  const phrases = [
    "Building intuitive digital experiences.",
    "Crafting performant web applications.",
    "Turning ideas into scalable products.",
  ];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const speed = deleting ? 35 : 65;
    const timeout = setTimeout(() => {
      if (!deleting && typed === current) {
        setTimeout(() => setDeleting(true), 1800);
        return;
      }
      if (deleting && typed === "") {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % phrases.length);
        return;
      }
      setTyped(
        deleting ? typed.slice(0, -1) : current.slice(0, typed.length + 1),
      );
    }, speed);
    return () => clearTimeout(timeout);
  }, [typed, deleting, phraseIdx]);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Available for new projects
          </div>

          <h1 className="hero-name">
            <GlitchName />
          </h1>

          <div className="hero-tagline">
            <span>{typed}</span>
            <span className="cursor-blink" aria-hidden="true">
              |
            </span>
          </div>

          <p className="hero-sub">
            Full-stack developer with 6+ years crafting high-performance web
            products. Obsessed with clean code, thoughtful UX, and measurable
            outcomes.
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn-primary">
              View Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>

          <div className="hero-skills">
            {SKILLS.slice(0, 6).map((s, i) => (
              <TerminalTag key={s} text={s} delay={i * 80} />
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="code-card">
            <div className="code-card-header">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
              <span className="code-card-filename">portfolio.ts</span>
            </div>
            <pre className="code-body">
              <code>{`const developer = {
  name: "Alex Mercer",
  focus: "Full-Stack",
  years: 6,
  stack: [
    "React", "Next.js",
    "Node", "TypeScript",
    "PostgreSQL", "AWS",
  ],
  available: true,
  passion: () => "great UX",
};

export default developer;`}</code>
            </pre>
          </div>
          <div className="floating-stat stat-1">
            <span className="stat-num">40+</span>
            <span className="stat-lbl">Projects shipped</span>
          </div>
          <div className="floating-stat stat-2">
            <span className="stat-num">6yr</span>
            <span className="stat-lbl">Experience</span>
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-label="Scroll down">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const [ref, visible] = useInView();
  return (
    <section id="about" className="section" ref={ref}>
      <div className={`about-grid fade-in ${visible ? "visible" : ""}`}>
        <div className="about-left">
          <div className="section-eyebrow">About Me</div>
          <h2 className="section-title">
            Code with
            <br />
            <span className="accent">purpose</span>.
          </h2>
          <div className="about-avatar-wrap">
            <div className="about-avatar">
              <div className="avatar-initials">AM</div>
              <div className="avatar-ring" />
            </div>
            <div className="avatar-badge">
              <span className="badge-dot" />
              Open to work
            </div>
          </div>
        </div>
        <div className="about-right">
          <p className="about-text">
            I'm a full-stack developer who believes great software is as much
            about empathy as it is about engineering. I partner with startups
            and scale-ups to turn complex problems into clean, performant, and
            delightful products.
          </p>
          <p className="about-text">
            My sweet spot lives at the intersection of beautiful UI and
            bulletproof backend architecture. Whether it's shaving milliseconds
            off a query, or obsessing over micro-animations — I care about every
            layer of the stack.
          </p>
          <div className="skills-grid">
            {SKILLS.map((s) => (
              <div key={s} className="skill-pill">
                {s}
              </div>
            ))}
          </div>
          <div className="about-stats">
            {[
              ["40+", "Projects"],
              ["6+", "Years"],
              ["20+", "Clients"],
              ["99%", "Satisfaction"],
            ].map(([n, l]) => (
              <div key={l} className="about-stat">
                <span className="about-stat-num">{n}</span>
                <span className="about-stat-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, idx }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      className={`project-card fade-in ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${idx * 80}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="project-card-top" style={{ "--accent": p.color }}>
        <div className="project-icon" style={{ color: p.color }}>
          {p.icon}
        </div>
        <span
          className="project-tag"
          style={{
            color: p.color,
            borderColor: p.color + "40",
            background: p.color + "12",
          }}
        >
          {p.tag}
        </span>
      </div>
      <h3 className="project-title">{p.title}</h3>
      <p className="project-desc">{p.desc}</p>
      <div className="project-stack">
        {p.stack.map((s) => (
          <span key={s} className="stack-chip">
            {s}
          </span>
        ))}
      </div>
      <div className="project-metrics">
        {p.metrics.map((m) => (
          <span key={m} className="metric" style={{ color: p.color }}>
            {m}
          </span>
        ))}
      </div>
      <div className={`project-cta ${hovered ? "hovered" : ""}`}>
        <span>View Case Study</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const [ref, visible] = useInView();
  const filtered =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);
  return (
    <section id="projects" className="section section-alt">
      <div
        className={`section-header fade-in ${visible ? "visible" : ""}`}
        ref={ref}
      >
        <div className="section-eyebrow">Selected Work</div>
        <h2 className="section-title">
          Projects that <span className="accent">matter</span>.
        </h2>
      </div>
      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {filtered.map((p, i) => (
          <ProjectCard key={p.id} p={p} idx={i} />
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [ref, visible] = useInView();
  return (
    <section id="experience" className="section">
      <div
        className={`section-header fade-in ${visible ? "visible" : ""}`}
        ref={ref}
      >
        <div className="section-eyebrow">Experience</div>
        <h2 className="section-title">
          Where I've <span className="accent">been</span>.
        </h2>
      </div>
      <div className="timeline">
        {EXPERIENCE.map((e, i) => {
          const [cardRef, cardVisible] = useInView(0.1);
          return (
            <div
              key={i}
              ref={cardRef}
              className={`timeline-item fade-in ${cardVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="timeline-marker">
                <div className="timeline-dot" />
                <div className="timeline-line" />
              </div>
              <div className="timeline-card">
                <div className="tl-top">
                  <div>
                    <div className="tl-role">{e.role}</div>
                    <div className="tl-company">{e.company}</div>
                  </div>
                  <div className="tl-meta">
                    <span className="tl-year">{e.year}</span>
                    <span className="tl-type">{e.type}</span>
                  </div>
                </div>
                <ul className="tl-achievements">
                  {e.achievements.map((a, j) => (
                    <li key={j}>
                      <span className="tl-bullet" aria-hidden="true">
                        ▸
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [focused, setFocused] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleFocus = (name) => setFocused((f) => ({ ...f, [name]: true }));
  const handleBlur = (name) =>
    setFocused((f) => ({ ...f, [name]: form[name] !== "" }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1800);
  };

  const isFloat = (name) => focused[name] || form[name];

  return (
    <section id="contact" className="section section-alt">
      <div
        className={`contact-grid fade-in ${visible ? "visible" : ""}`}
        ref={ref}
      >
        <div className="contact-left">
          <div className="section-eyebrow">Get In Touch</div>
          <h2 className="section-title">
            Let's build
            <br />
            something <span className="accent">great</span>.
          </h2>
          <p className="contact-sub">
            Open to freelance projects, full-time roles, and interesting
            collaborations. Drop me a message and I'll respond within 24 hours.
          </p>
          <div className="social-links">
            {[
              { name: "GitHub", icon: "⌥", href: "#" },
              { name: "LinkedIn", icon: "in", href: "#" },
              { name: "Dribbble", icon: "◕", href: "#" },
              { name: "Behance", icon: "Bē", href: "#" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="social-link"
                aria-label={s.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="social-icon">{s.icon}</span>
                <span>{s.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="contact-right">
          {status === "sent" ? (
            <div className="form-success">
              <div className="success-icon">✓</div>
              <h3>Message received!</h3>
              <p>
                Thanks for reaching out. I'll get back to you within 24 hours.
              </p>
              <button
                className="btn-primary"
                onClick={() => {
                  setStatus("idle");
                  setForm({
                    name: "",
                    email: "",
                    budget: "",
                    timeline: "",
                    message: "",
                  });
                }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                {["name", "email"].map((f) => (
                  <div key={f} className="form-field">
                    <label
                      className={`float-label ${isFloat(f) ? "floated" : ""}`}
                      htmlFor={f}
                    >
                      {f === "name" ? "Your Name" : "Email Address"}
                    </label>
                    <input
                      id={f}
                      name={f}
                      type={f === "email" ? "email" : "text"}
                      value={form[f]}
                      required
                      onChange={handleChange}
                      onFocus={() => handleFocus(f)}
                      onBlur={() => handleBlur(f)}
                    />
                  </div>
                ))}
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label
                    className={`float-label ${isFloat("budget") ? "floated" : ""}`}
                    htmlFor="budget"
                  >
                    Project Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    onFocus={() => handleFocus("budget")}
                    onBlur={() => handleBlur("budget")}
                    className={form.budget ? "has-value" : ""}
                  >
                    <option value="" hidden />
                    <option>Under $5k</option>
                    <option>$5k – $15k</option>
                    <option>$15k – $50k</option>
                    <option>$50k+</option>
                    <option>Let's discuss</option>
                  </select>
                </div>
                <div className="form-field">
                  <label
                    className={`float-label ${isFloat("timeline") ? "floated" : ""}`}
                    htmlFor="timeline"
                  >
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    onFocus={() => handleFocus("timeline")}
                    onBlur={() => handleBlur("timeline")}
                    className={form.timeline ? "has-value" : ""}
                  >
                    <option value="" hidden />
                    <option>ASAP</option>
                    <option>1–3 months</option>
                    <option>3–6 months</option>
                    <option>6 months+</option>
                    <option>Ongoing</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label
                  className={`float-label ${isFloat("message") ? "floated" : ""}`}
                  htmlFor="message"
                >
                  Tell me about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  required
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={() => handleBlur("message")}
                />
              </div>
              <button
                type="submit"
                className={`btn-primary btn-full ${status === "sending" ? "loading" : ""}`}
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <span className="spinner" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a href="#hero" className="nav-logo">
        <span className="logo-bracket">&lt;</span>AM
        <span className="logo-bracket">/&gt;</span>
      </a>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {l}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Hire Me
          </a>
        </li>
      </ul>
      <button
        className="hamburger"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((m) => !m)}
      >
        <span className={menuOpen ? "open" : ""} />
        <span className={menuOpen ? "open" : ""} />
        <span className={menuOpen ? "open" : ""} />
      </button>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-logo">
          <span className="logo-bracket">&lt;</span>AM
          <span className="logo-bracket">/&gt;</span>
        </span>
        <span className="footer-copy">
          © 2025 Alex Mercer. All rights reserved.
        </span>
        <span className="footer-made">Crafted with React & ♥</span>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
/* ─── Reset & Base ─── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:       #080C10;
  --bg-alt:   #0D1117;
  --surface:  #0A1628;
  --border:   rgba(255,255,255,0.07);
  --accent:   #00fbff;
  --accent2:  #7c6fff;
  --text:     #e2e8f0;
  --muted:    #6b7a8f;
  --white:    #ffffff;
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;
  --radius:   12px;
  --radius-lg: 20px;
  --trans:    cubic-bezier(0.4,0,0.2,1);
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.app { min-height: 100vh; }

/* ─── Animations ─── */
@keyframes fadeUp {
  from { opacity:0; transform:translateY(28px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes spin { to { transform:rotate(360deg); } }
@keyframes pulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.15);opacity:1} }
@keyframes terminalIn {
  from { opacity:0; transform:translateX(-8px); }
  to   { opacity:1; transform:translateX(0); }
}
@keyframes orb1 {
  0%,100% { transform:translate(0,0) scale(1); }
  50%     { transform:translate(40px,-30px) scale(1.08); }
}
@keyframes orb2 {
  0%,100% { transform:translate(0,0) scale(1); }
  50%     { transform:translate(-30px,40px) scale(1.05); }
}
@keyframes glitch {
  0%,90%,100% { clip-path:none; transform:none; }
  91% { clip-path:inset(40% 0 50% 0); transform:translate(-2px,0); }
  93% { clip-path:inset(10% 0 75% 0); transform:translate(2px,0); }
  95% { clip-path:inset(60% 0 20% 0); transform:translate(-1px,0); }
}
@keyframes scrollWheel {
  0%   { opacity:1; transform:translateY(0); }
  100% { opacity:0; transform:translateY(6px); }
}

.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.65s var(--trans), transform 0.65s var(--trans);
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ─── Navbar ─── */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.25rem 5vw;
  transition: background 0.3s, backdrop-filter 0.3s, box-shadow 0.3s;
}
.navbar.scrolled {
  background: rgba(8,12,16,0.85);
  backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--border);
}
.nav-logo {
  font-family: var(--font-display);
  font-size: 1.25rem; font-weight: 700;
  color: var(--white); text-decoration: none;
  letter-spacing: -0.02em;
}
.logo-bracket { color: var(--accent); }
.nav-links {
  display: flex; align-items: center; gap: 2rem;
  list-style: none;
}
.nav-links a {
  color: var(--muted); text-decoration: none;
  font-size: 0.9rem; font-weight: 500;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--white); }
.nav-cta {
  background: var(--accent) !important;
  color: var(--bg) !important;
  padding: 0.45rem 1.1rem;
  border-radius: 6px;
  font-weight: 600 !important;
  transition: opacity 0.2s !important;
}
.nav-cta:hover { opacity: 0.85; }
.hamburger {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 4px;
}
.hamburger span {
  display: block; width: 22px; height: 2px;
  background: var(--text); border-radius: 2px;
  transition: transform 0.25s, opacity 0.25s;
}
.hamburger span.open:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
.hamburger span.open:nth-child(2) { opacity: 0; }
.hamburger span.open:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

/* ─── Hero ─── */
.hero-section {
  min-height: 100vh;
  display: flex; flex-direction: column; justify-content: center;
  position: relative; overflow: hidden;
  padding: 8rem 5vw 5rem;
}
.hero-bg-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
  pointer-events: none;
}
.hero-orb {
  position: absolute; border-radius: 50%; pointer-events: none; filter: blur(90px);
}
.hero-orb-1 {
  width: 480px; height: 480px;
  background: rgba(0,251,255,0.07);
  top: -80px; right: 10%;
  animation: orb1 8s ease-in-out infinite;
}
.hero-orb-2 {
  width: 340px; height: 340px;
  background: rgba(124,111,255,0.06);
  bottom: 10%; left: 5%;
  animation: orb2 11s ease-in-out infinite;
}
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: center;
  max-width: 1200px; margin: 0 auto; width: 100%;
}
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.8rem; font-weight: 500; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--accent);
  margin-bottom: 1.25rem;
}
.eyebrow-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent);
  animation: pulse 2s ease-in-out infinite;
}
.hero-name {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 5.5vw, 4.5rem);
  font-weight: 700; line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--white);
  margin-bottom: 1rem;
}
.glitch-name {
  position: relative; display: inline-block;
}
.glitch-name::before, .glitch-name::after {
  content: attr(data-text);
  position: absolute; inset: 0;
  color: var(--accent);
  animation: glitch 6s steps(1) infinite;
}
.glitch-name::after { color: var(--accent2); animation-delay: 0.15s; }
.hero-tagline {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--muted); min-height: 2rem;
  margin-bottom: 1.25rem;
}
.cursor-blink { animation: blink 1s step-end infinite; color: var(--accent); }
.hero-sub {
  color: var(--muted); max-width: 480px;
  font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.8;
}
.hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: var(--accent); color: var(--bg);
  padding: 0.75rem 1.6rem; border-radius: 8px;
  font-weight: 600; font-size: 0.95rem;
  text-decoration: none; border: none; cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
}
.btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
.btn-primary.loading { opacity: 0.6; cursor: wait; }
.btn-secondary {
  display: inline-flex; align-items: center;
  border: 1px solid var(--border);
  color: var(--text); background: transparent;
  padding: 0.75rem 1.6rem; border-radius: 8px;
  font-weight: 500; font-size: 0.95rem;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s, transform 0.2s;
}
.btn-secondary:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }
.btn-full { width: 100%; justify-content: center; }
.hero-skills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.terminal-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem; color: var(--accent);
  background: rgba(0,251,255,0.06);
  border: 1px solid rgba(0,251,255,0.15);
  padding: 0.25rem 0.6rem; border-radius: 5px;
  animation: terminalIn 0.5s var(--trans) both;
  white-space: nowrap;
}
.terminal-prompt { opacity: 0.4; margin-right: 0.2rem; }

/* Hero Visual */
.hero-visual { position: relative; display: flex; justify-content: center; }
.code-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden; width: 100%; max-width: 400px;
  box-shadow: 0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,251,255,0.04);
}
.code-card-header {
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.75rem 1rem;
  background: rgba(255,255,255,0.03);
  border-bottom: 1px solid var(--border);
}
.dot { width: 11px; height: 11px; border-radius: 50%; }
.dot-red    { background: #ff5f57; }
.dot-yellow { background: #febc2e; }
.dot-green  { background: #28c840; }
.code-card-filename {
  margin-left: 0.5rem; font-family: var(--font-mono);
  font-size: 0.75rem; color: var(--muted);
}
.code-body {
  padding: 1.25rem 1.25rem 1.5rem;
  font-family: var(--font-mono); font-size: 0.78rem;
  line-height: 1.75; color: var(--text); overflow-x: auto;
}
.floating-stat {
  position: absolute;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.6rem 0.9rem;
  display: flex; flex-direction: column; align-items: center;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  backdrop-filter: blur(8px);
}
.stat-num {
  font-family: var(--font-display);
  font-size: 1.3rem; font-weight: 700; color: var(--accent); line-height: 1;
}
.stat-lbl { font-size: 0.7rem; color: var(--muted); }
.stat-1 { top: -1rem; left: -1.5rem; }
.stat-2 { bottom: 1rem; right: -1.5rem; }

/* Scroll hint */
.scroll-hint {
  position: absolute; bottom: 2.5rem; left: 50%;
  transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center;
}
.scroll-mouse {
  width: 22px; height: 34px;
  border: 1.5px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  display: flex; justify-content: center; padding-top: 5px;
}
.scroll-wheel {
  width: 3px; height: 6px; background: var(--accent);
  border-radius: 2px;
  animation: scrollWheel 1.6s ease-in-out infinite;
}

/* ─── Sections ─── */
.section { padding: 7rem 5vw; max-width: 1200px; margin: 0 auto; }
.section-alt {
  background: var(--bg-alt);
  max-width: unset;
  padding: 7rem 5vw;
}
.section-alt > * { max-width: 1200px; margin-left: auto; margin-right: auto; }
.section-eyebrow {
  font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 0.75rem;
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700; line-height: 1.1;
  letter-spacing: -0.02em; color: var(--white);
  margin-bottom: 3rem;
}
.accent { color: var(--accent); }
.section-header { text-align: center; }
.section-header .section-title { margin-bottom: 1.5rem; }

/* ─── About ─── */
.about-grid {
  display: grid; grid-template-columns: 1fr 1.6fr; gap: 6rem; align-items: center;
}
.about-left .section-title { margin-bottom: 2rem; }
.about-avatar-wrap { display: flex; flex-direction: column; align-items: flex-start; gap: 0.75rem; }
.about-avatar {
  width: 100px; height: 100px; border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.avatar-initials {
  font-family: var(--font-display);
  font-size: 1.6rem; font-weight: 700; color: var(--bg);
}
.avatar-ring {
  position: absolute; inset: -4px; border-radius: 50%;
  border: 1.5px solid var(--accent);
  opacity: 0.4;
}
.avatar-badge {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: 0.75rem; color: var(--accent);
  background: rgba(0,251,255,0.08);
  border: 1px solid rgba(0,251,255,0.2);
  padding: 0.3rem 0.7rem; border-radius: 20px;
}
.badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
  animation: pulse 2s ease-in-out infinite;
}
.about-text { color: var(--muted); margin-bottom: 1rem; line-height: 1.8; }
.skills-grid {
  display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1.5rem 0;
}
.skill-pill {
  font-family: var(--font-mono); font-size: 0.75rem;
  padding: 0.3rem 0.7rem; border-radius: 5px;
  border: 1px solid var(--border);
  color: var(--muted);
  transition: border-color 0.2s, color 0.2s;
}
.skill-pill:hover { border-color: var(--accent); color: var(--accent); }
.about-stats {
  display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; margin-top: 1.5rem;
}
.about-stat { text-align: center; }
.about-stat-num {
  display: block; font-family: var(--font-display);
  font-size: 1.6rem; font-weight: 700; color: var(--white);
}
.about-stat-lbl { font-size: 0.75rem; color: var(--muted); }

/* ─── Projects ─── */
.filter-bar {
  display: flex; flex-wrap: wrap; gap: 0.5rem;
  justify-content: center; margin-bottom: 3rem;
  max-width: 1200px; margin-left: auto; margin-right: auto;
}
.filter-btn {
  font-size: 0.8rem; font-weight: 500;
  padding: 0.4rem 1rem; border-radius: 6px;
  border: 1px solid var(--border); background: transparent;
  color: var(--muted); cursor: pointer;
  transition: all 0.2s;
}
.filter-btn:hover { border-color: var(--accent); color: var(--accent); }
.filter-btn.active {
  background: var(--accent); border-color: var(--accent);
  color: var(--bg); font-weight: 600;
}
.projects-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem; max-width: 1200px; margin: 0 auto;
}
.project-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 1.75rem;
  display: flex; flex-direction: column; gap: 0.9rem;
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  cursor: pointer;
}
.project-card:hover {
  border-color: rgba(0,251,255,0.2);
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.3);
}
.project-card-top { display: flex; align-items: center; justify-content: space-between; }
.project-icon { font-size: 1.8rem; }
.project-tag {
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em;
  text-transform: uppercase; padding: 0.2rem 0.6rem;
  border: 1px solid; border-radius: 4px;
}
.project-title {
  font-family: var(--font-display);
  font-size: 1.05rem; font-weight: 600; color: var(--white); line-height: 1.3;
}
.project-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; }
.project-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.stack-chip {
  font-family: var(--font-mono); font-size: 0.7rem;
  padding: 0.2rem 0.5rem; border-radius: 4px;
  background: rgba(255,255,255,0.05); color: var(--muted);
}
.project-metrics { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: auto; }
.metric { font-size: 0.72rem; font-weight: 600; }
.project-cta {
  display: flex; align-items: center; gap: 0.4rem;
  font-size: 0.8rem; font-weight: 600; color: var(--muted);
  margin-top: 0.25rem;
  transition: color 0.2s, gap 0.2s;
}
.project-cta.hovered { color: var(--accent); gap: 0.6rem; }

/* ─── Timeline ─── */
.timeline { display: flex; flex-direction: column; gap: 0; padding-top: 1rem; }
.timeline-item { display: flex; gap: 1.5rem; }
.timeline-marker { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
.timeline-dot {
  width: 12px; height: 12px; border-radius: 50%;
  background: var(--accent); flex-shrink: 0; margin-top: 4px;
  box-shadow: 0 0 0 4px rgba(0,251,255,0.12);
}
.timeline-line {
  width: 1px; flex: 1;
  background: linear-gradient(to bottom, rgba(0,251,255,0.3), transparent);
  margin: 6px 0;
}
.timeline-item:last-child .timeline-line { display: none; }
.timeline-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1.5rem;
  flex: 1; margin-bottom: 1.75rem;
  transition: border-color 0.2s;
}
.timeline-card:hover { border-color: rgba(0,251,255,0.2); }
.tl-top {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;
}
.tl-role {
  font-family: var(--font-display);
  font-size: 1rem; font-weight: 600; color: var(--white);
}
.tl-company { font-size: 0.85rem; color: var(--accent); margin-top: 0.2rem; }
.tl-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 0.3rem; }
.tl-year { font-size: 0.8rem; color: var(--muted); font-family: var(--font-mono); }
.tl-type {
  font-size: 0.7rem; font-weight: 600;
  background: rgba(0,251,255,0.08);
  border: 1px solid rgba(0,251,255,0.15);
  color: var(--accent); padding: 0.1rem 0.5rem; border-radius: 4px;
}
.tl-achievements { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
.tl-achievements li { font-size: 0.85rem; color: var(--muted); display: flex; gap: 0.6rem; line-height: 1.5; }
.tl-bullet { color: var(--accent); flex-shrink: 0; }

/* ─── Contact ─── */
.contact-grid {
  display: grid; grid-template-columns: 1fr 1.4fr; gap: 6rem; align-items: start;
  max-width: 1200px; margin: 0 auto;
}
.contact-sub { color: var(--muted); line-height: 1.8; margin-bottom: 2rem; }
.social-links { display: flex; flex-direction: column; gap: 0.75rem; }
.social-link {
  display: flex; align-items: center; gap: 0.75rem;
  color: var(--muted); text-decoration: none; font-size: 0.9rem;
  transition: color 0.2s;
}
.social-link:hover { color: var(--accent); }
.social-icon {
  width: 36px; height: 36px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  font-size: 0.85rem; font-weight: 700;
  transition: border-color 0.2s;
}
.social-link:hover .social-icon { border-color: var(--accent); }
.contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-field { position: relative; }
.float-label {
  position: absolute; left: 1rem; top: 50%; transform: translateY(-50%);
  font-size: 0.9rem; color: var(--muted);
  pointer-events: none;
  transition: top 0.2s, font-size 0.2s, color 0.2s, transform 0.2s;
}
.form-field textarea ~ .float-label,
.float-label { }
.float-label.floated {
  top: 0.5rem; transform: none;
  font-size: 0.7rem; color: var(--accent);
}
.form-field input,
.form-field select,
.form-field textarea {
  width: 100%; background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius); color: var(--text);
  font-family: var(--font-body); font-size: 0.9rem;
  padding: 1.4rem 1rem 0.6rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  appearance: none;
  -webkit-appearance: none;
}
.form-field textarea { resize: vertical; min-height: 120px; }
.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(0,251,255,0.1);
}
.form-field select option { background: var(--bg-alt); }
.spinner {
  display: inline-block; width: 14px; height: 14px;
  border: 2px solid rgba(8,12,16,0.3); border-top-color: var(--bg);
  border-radius: 50%; animation: spin 0.7s linear infinite; margin-right: 0.5rem;
}
.form-success {
  display: flex; flex-direction: column; align-items: center;
  gap: 1rem; text-align: center;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 3rem 2rem;
}
.success-icon {
  width: 56px; height: 56px; border-radius: 50%;
  background: rgba(0,251,255,0.1); border: 1.5px solid var(--accent);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; color: var(--accent);
}
.form-success h3 { font-family: var(--font-display); font-size: 1.3rem; color: var(--white); }
.form-success p { color: var(--muted); font-size: 0.9rem; }

/* ─── Footer ─── */
.footer {
  border-top: 1px solid var(--border);
  padding: 2rem 5vw;
}
.footer-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 1rem;
}
.footer-logo {
  font-family: var(--font-display);
  font-size: 1rem; font-weight: 700; color: var(--white);
}
.footer-copy, .footer-made { font-size: 0.8rem; color: var(--muted); }

/* ─── Responsive ─── */
@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; gap: 3rem; }
  .hero-visual { display: none; }
  .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .about-stats { grid-template-columns: repeat(2,1fr); }
  .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
}
@media (max-width: 640px) {
  .navbar { padding: 1rem 1.25rem; }
  .nav-links {
    position: fixed; inset: 0; top: 60px;
    background: rgba(8,12,16,0.97); backdrop-filter: blur(12px);
    flex-direction: column; gap: 1.5rem; align-items: center;
    justify-content: center; display: none; z-index: 99;
  }
  .nav-links.open { display: flex; }
  .hamburger { display: flex; }
  .hero-section { padding: 6rem 1.25rem 4rem; }
  .section { padding: 4.5rem 1.25rem; }
  .section-alt { padding: 4.5rem 1.25rem; }
  .form-row { grid-template-columns: 1fr; }
  .projects-grid { grid-template-columns: 1fr; }
  .about-stats { grid-template-columns: repeat(2,1fr); }
  .footer-inner { flex-direction: column; text-align: center; }
  .stat-1, .stat-2 { display: none; }
  .hero-cta { flex-direction: column; }
  .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
`;
