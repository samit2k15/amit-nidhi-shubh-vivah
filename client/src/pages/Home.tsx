import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowDown, ArrowUpRight, Calendar, CalendarPlus, Check, Copy, Heart,
  MapPin, Menu, MessageCircleHeart, Navigation, Share2, Sparkles, X,
} from "lucide-react";

const ASSETS = {
  ganesh: "/manus-storage/ganesh-blessing-DyBfqEVI_9c9341e3.png",
  couple: "/manus-storage/couple-wedding-DNZh5g2r_25b6b125.png",
  tilak: "/manus-storage/couple-tilak-C545pus7_a4ae1cd2.png",
  haldi: "/manus-storage/couple-haldi-ELdMGoSf_bca26df5.png",
  mehendi: "/manus-storage/couple-mehendi-_DvWMSJt_974cd314.png",
  sangeet: "/manus-storage/couple-sangeet-eOyNn5iR_6b17526e.png",
  reception: "/manus-storage/couple-reception-DK_gvnuW_80faa8e0.png",
};

const wedding = {
  groom: "Amit",
  bride: "Nidhi",
  weddingDate: new Date("2026-12-05T23:30:00+05:30"),
  dateLabel: "Saturday, 5th December 2026",
  timeLabel: "11:30 PM IST",
  venue: "Bride's home, Varanasi City",
  address: "Varanasi City",
  mapUrl: "https://goo.gl/maps/bgXCoWRZ7y2ZErQw5",
  replyBy: "01 November 2026",
};

const storyChapters = [
  ["01", "First Meeting", "✦"], ["02", "First Conversation", "💌"],
  ["03", "Falling in Love", "♡"], ["04", "Families Met", "⌂"],
  ["05", "The Proposal", "♢"], ["06", "Our Wedding", "🪷"],
];

type Celebration = { title: string; icon: string; image: string; date: string; time: string; venue: string; copy: string };
const celebrations: Celebration[] = [
  { title: "Tilak Ritual", icon: "🪔", image: ASSETS.tilak, date: "Details to be announced", time: "Details to be announced", venue: "Details to be announced", copy: "Ceremony details will be shared with our loved ones soon." },
  { title: "Haldi", icon: "🌼", image: ASSETS.haldi, date: "Details to be announced", time: "Details to be announced", venue: "Details to be announced", copy: "Ceremony details will be shared with our loved ones soon." },
  { title: "Mehendi", icon: "🌿", image: ASSETS.mehendi, date: "Details to be announced", time: "Details to be announced", venue: "Details to be announced", copy: "Ceremony details will be shared with our loved ones soon." },
  { title: "Sangeet", icon: "🎶", image: ASSETS.sangeet, date: "Details to be announced", time: "Details to be announced", venue: "Details to be announced", copy: "Ceremony details will be shared with our loved ones soon." },
  { title: "Wedding Ceremony", icon: "🪷", image: ASSETS.couple, date: wedding.dateLabel, time: wedding.timeLabel, venue: wedding.venue, copy: "Ceremony details will be shared with our loved ones soon." },
  { title: "Reception", icon: "✨", image: ASSETS.reception, date: "Details to be announced", time: "Details to be announced", venue: "Details to be announced", copy: "Ceremony details will be shared with our loved ones soon." },
];

const gallery = [
  ["Together", ASSETS.tilak], ["Joy", ASSETS.haldi], ["Forever", ASSETS.mehendi],
  ["Us", ASSETS.sangeet], ["Love", ASSETS.couple], ["Always", ASSETS.reception],
];

function remainingTime() {
  const diff = Math.max(0, wedding.weddingDate.getTime() - Date.now());
  return { days: Math.floor(diff / 86400000), hours: Math.floor((diff / 3600000) % 24), minutes: Math.floor((diff / 60000) % 60), seconds: Math.floor((diff / 1000) % 60) };
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scratched, setScratched] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [shareLabel, setShareLabel] = useState("Share Invitation");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [time, setTime] = useState(remainingTime);
  useEffect(() => { const timer = window.setInterval(() => setTime(remainingTime()), 1000); return () => window.clearInterval(timer); }, []);
  const dateParts = useMemo(() => ({ day: "05", month: "December", year: "2026" }), []);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const handleShare = async () => {
    try {
      if (navigator.share) { await navigator.share({ title: "Amit & Nidhi | Wedding Invitation", text: "You are invited to celebrate Amit and Nidhi's wedding.", url: window.location.href }); setShareLabel("Shared"); }
      else { await navigator.clipboard.writeText(window.location.href); setShareLabel("Link copied"); }
    } catch { setShareLabel("Share Invitation"); }
    window.setTimeout(() => setShareLabel("Share Invitation"), 2200);
  };
  const handleRsvp = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setRsvpSent(true); };
  const googleCalendar = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Amit%20%26%20Nidhi's%20Wedding&dates=20261205T233000/20261206T003000&ctz=Asia%2FKolkata&location=Bride's%20home%2C%20Varanasi%20City&details=You're%20invited%20to%20celebrate%20Amit%20%26%20Nidhi!";

  return (
    <main className={`lovable-page ${opened ? "is-open" : ""}`}>
      <div className={`opening-overlay ${opened ? "opening-overlay--hidden" : ""}`} aria-hidden={opened}>
        <img src={ASSETS.ganesh} alt="Lord Ganesha offering blessings" /><p>श्री गणेशाय नमः</p><span>With divine blessings, our celebration begins</span><h1>✦ शुभ विवाह</h1><h2>{wedding.groom} <i>❤</i> {wedding.bride}</h2><button onClick={() => setOpened(true)}>☝ Tap to Open</button>
      </div>
      <header className="lovable-nav"><button className="nav-monogram" onClick={() => scrollTo("home")} aria-label="Back to home">A <span>♥</span> N</button><nav className={menuOpen ? "nav-menu nav-menu--open" : "nav-menu"}><button onClick={() => scrollTo("home")}>Home</button><button onClick={() => scrollTo("story")}>Our Story</button><button onClick={() => scrollTo("functions")}>Functions</button><button onClick={() => scrollTo("gallery")}>Gallery</button><button onClick={() => scrollTo("rsvp")}>RSVP</button><button onClick={() => scrollTo("location")}>Location</button></nav><button className="nav-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button></header>

      <section id="home" className="lovable-hero"><div className="floral-row">❀　♡　✦　❀　♡</div><div className="hero-copy"><p className="mini-label">Together with their families</p><h2>{wedding.groom}<i>❤</i>{wedding.bride}</h2><p className="hero-tagline">Two Hearts · Two Families<br />One Beautiful Beginning</p><p className="hero-invite">invite you to celebrate their wedding</p><div className="date-lockup"><span>{dateParts.month}</span><strong>{dateParts.day}</strong><span>{dateParts.year}</span></div><button className="primary-pill" onClick={() => scrollTo("story")}>Enter Our Wedding 💕</button></div><div className="hero-portrait"><img src={ASSETS.couple} alt="Amit and Nidhi in traditional wedding attire" /><span>Scroll to begin</span></div><div className="hero-sparkle">✦</div></section>

      <section id="story" className="story-section page-section"><p className="section-kicker">Every forever has a beginning</p><h3>Our Story <span>❤️</span></h3><div className="ornament">❦</div><div className="story-grid">{storyChapters.map(([number, title, icon]) => <article className="story-card" key={number}><span className="story-icon">{icon}</span><small>Chapter {number}</small><h4>{title}</h4><p>A beautiful chapter we’ll share with you soon.</p></article>)}</div></section>

      <section id="functions" className="functions-section page-section"><p className="section-kicker">Together with our families</p><h3>Wedding Celebrations <span>🌸</span></h3><div className="ornament">❦</div><div className="function-grid">{celebrations.map((celebration) => <article className="function-card" key={celebration.title}><div className="function-art"><img src={celebration.image} alt={`${wedding.groom} and ${wedding.bride} illustrated for ${celebration.title}`} /><span>{celebration.icon}</span></div><div className="function-copy"><p className="section-kicker">Sacred Celebration</p><h4>{celebration.title}</h4><dl><div><dt>Date</dt><dd>{celebration.date}</dd></div><div><dt>Time</dt><dd>{celebration.time}</dd></div><div><dt>Venue</dt><dd>{celebration.venue}</dd></div></dl><p>{celebration.copy}</p></div></article>)}</div></section>

      <section className="secret-section page-section"><p className="section-kicker">A little secret</p><h3>Can You Guess Our Special Day? <span>💕</span></h3><div className="ornament">❦</div><div className={`scratch-card ${scratched ? "scratch-card--revealed" : ""}`} role="button" tabIndex={0} onClick={() => setScratched(true)} onKeyDown={(event) => event.key === "Enter" && setScratched(true)} aria-label="Scratch card. Press Enter to reveal the wedding date."><div className="scratch-card__cover"><Sparkles size={34} /><span>Tap to reveal</span></div><div className="scratch-card__reveal"><span>We are getting married! 💍</span><strong>{wedding.dateLabel}</strong><em>Save the Date ❤️</em></div></div><button className="replay-button" onClick={() => setScratched(false)}>↻ Replay</button></section>

      <section className="countdown-section page-section"><p className="section-kicker">{wedding.dateLabel}</p><h3>The Countdown Begins <span>⏳</span></h3><div className="ornament">❦</div><div className="countdown-grid">{[["Days", time.days], ["Hours", time.hours], ["Minutes", time.minutes], ["Seconds", time.seconds]].map(([label, value]) => <div key={String(label)}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div></section>

      <section id="gallery" className="gallery-section page-section"><p className="section-kicker">Little moments, endless memories</p><h3>Our Beautiful Moments <span>❤️</span></h3><div className="ornament">❦</div><div className="gallery-grid">{gallery.map(([label, image], index) => <button key={label} onClick={() => setLightbox(index)}><img src={image} alt={`${wedding.groom} and ${wedding.bride} — ${label}`} /><span>{label} <ArrowUpRight size={14} /></span></button>)}</div></section>

      <section className="families-section page-section"><p className="section-kicker">In love and gratitude</p><h3>With the Blessings of Our Families</h3><div className="ornament">❦</div><div className="families-grid"><article><span>वर पक्ष</span><h4>Groom’s Family</h4><p>Sri Surender Singh and Shrimati Seema Devi</p></article><div className="family-lotus">🪷</div><article><span>वधू पक्ष</span><h4>Bride’s Family</h4><p>Sri Triloki Singh and Shrimati Anita Devi</p></article></div></section>

      <section id="rsvp" className="rsvp-section page-section"><p className="section-kicker">We hope you’ll be there</p><h3>Will You Join Us? <span>💕</span></h3><div className="ornament">❦</div><p className="section-intro">Your presence will make our celebration even more special.</p>{rsvpSent ? <div className="rsvp-success"><Check size={25} /><p>Thank you, we have received your reply.</p><button onClick={() => setRsvpSent(false)}>Send another RSVP</button></div> : <form className="rsvp-form" onSubmit={handleRsvp}><label>Name *<input required name="name" /></label><label>Mobile Number *<input required name="mobile" inputMode="tel" /></label><label>Number of Guests *<input required name="guests" type="number" min="1" defaultValue="1" /></label><fieldset><legend>Your response *</legend><label><input required type="radio" name="response" value="yes" /> ✓ Yes, I’ll be there!</label><label><input type="radio" name="response" value="maybe" /> ? I’ll try my best</label><label><input type="radio" name="response" value="no" /> × Sorry, I can’t make it</label></fieldset><label>Message for the Couple<textarea name="message" rows={4} /></label><button className="primary-pill" type="submit">Send RSVP 💌</button></form>}</section>

      <section id="location" className="location-section page-section"><p className="section-kicker">The sacred destination</p><h3>Where We Celebrate <span>📍</span></h3><div className="ornament">❦</div><div className="location-card"><div className="location-icon"><MapPin /></div><p><b>Venue</b>{wedding.venue}</p><p><b>Date</b>{wedding.dateLabel}</p><p><b>Time</b>{wedding.timeLabel}</p><p><b>Address</b>{wedding.address}</p><div className="location-actions"><a href={wedding.mapUrl} target="_blank" rel="noreferrer"><Navigation size={15} /> Open in Google Maps</a><a href={wedding.mapUrl} target="_blank" rel="noreferrer"><ArrowUpRight size={15} /> Get Directions</a></div></div></section>

      <section className="save-section page-section"><p className="section-kicker">A date to remember</p><h3>Save the Date <span>📅</span></h3><div className="ornament">❦</div><div className="save-actions"><a href={googleCalendar} target="_blank" rel="noreferrer"><CalendarPlus size={18} /> Google Calendar</a><button onClick={() => downloadIcs()}><Calendar size={18} /> Apple / ICS Calendar</button></div></section>
      <section className="share-section page-section"><p className="section-kicker">Pass the joy along</p><h3>Share Our Invitation <span>💌</span></h3><div className="ornament">❦</div><p className="section-intro">Invite your favourite people to celebrate Amit and Nidhi.</p><div className="share-actions"><button onClick={handleShare}><Share2 size={18} /> {shareLabel}</button><button onClick={async () => { await navigator.clipboard.writeText(window.location.href); setShareLabel("Link copied"); window.setTimeout(() => setShareLabel("Share Invitation"), 2200); }}><Copy size={18} /> Copy invitation link</button></div></section>
      <footer className="lovable-footer"><span>A <b>♥</b> N</span><p>With love, Amit & Nidhi · 2026</p><button onClick={() => scrollTo("home")}><ArrowDown size={14} /> Back to top</button></footer><div className="mobile-bottom-bar"><button onClick={handleShare}><Share2 size={16} /> Share</button><button onClick={() => scrollTo("rsvp")}><MessageCircleHeart size={16} /> RSVP</button></div>
      {lightbox !== null && <div className="lovable-lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}><button onClick={() => setLightbox(null)} aria-label="Close image"><X /></button><img src={gallery[lightbox][1]} alt={gallery[lightbox][0]} onClick={(event) => event.stopPropagation()} /><p>{gallery[lightbox][0]}</p></div>}
    </main>
  );
}

function downloadIcs() {
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "DTSTART:20261205T233000", "DTEND:20261206T003000", "SUMMARY:Amit & Nidhi's Wedding", "LOCATION:Bride's home, Varanasi City", "DESCRIPTION:You are invited to celebrate Amit & Nidhi.", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "amit-nidhi-wedding.ics"; anchor.click(); URL.revokeObjectURL(url);
}
