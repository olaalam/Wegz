import { useEffect, useMemo, useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Search,
  ShoppingCart,
  Menu,
  Star,
  Quote,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Check,
  Building2,
  ShieldCheck,
  HardHat,
  Calculator,
  Truck,
  Lock,
  ShoppingBag,
  Share2,
  Lightbulb,
  Code2,
  Play,
  Wrench,
  ArrowLeft,
  Box,
  Users,
  ShieldAlert,
  Wallet,
  Headphones,
  BarChart3,
  Monitor,
  Crosshair,
  Clock,
  FolderOpen,
  Paintbrush,
  Globe,
  ThumbsUp,
  CalendarDays,
  Send,
} from "lucide-react";
import { DESIGNS, DESIGN_CONTENT, DESIGN_KEYS, designColors, resolveVariant } from "./sectionsConfig";

// ─── Keyframe Animations & CSS Styles ─────────────────────────────────────────
const KF = `
@keyframes dsDrop     { from { opacity:0; transform:translateY(-16px) } to { opacity:1; transform:none } }
@keyframes dsFade     { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:none } }
@keyframes dsSlide    { from { opacity:0; transform:translateX(-20px) } to { opacity:1; transform:none } }
@keyframes dsSlideR   { from { opacity:0; transform:translateX(20px) } to { opacity:1; transform:none } }
@keyframes dsPop      { 0% { opacity:0; transform:scale(.8) } 70% { transform:scale(1.03) } 100% { opacity:1; transform:scale(1) } }
@keyframes dsFloat    { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-6px) } }
@keyframes dsPulse    { 0%,100% { box-shadow:0 0 0 0 rgba(217,8,43,.45) } 50% { box-shadow:0 0 0 8px rgba(217,8,43,0) } }
@keyframes dsPulseGlow { 0%,100% { transform:scale(1); opacity:0.8; } 50% { transform:scale(1.15); opacity:1; } }
@keyframes dsKenBurns { from { transform:scale(1) } to { transform:scale(1.09) } }
@keyframes dsFloatSoft { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-9px) } }
@keyframes dsRise     { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:none } }
@keyframes dsShine    { 0% { transform:translateX(-150%) skewX(-20deg) } 60%,100% { transform:translateX(450%) skewX(-20deg) } }
@keyframes dsDraw     { from { transform:scaleX(0) } to { transform:scaleX(1) } }
@keyframes dsRing     { 0% { transform:scale(1); opacity:.7 } 100% { transform:scale(1.7); opacity:0 } }
@keyframes dsDrift    { from { transform:translateX(-14px) } to { transform:translateX(14px) } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}

/* Flip Card Animation */
.flip-card { perspective: 1000px; }
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}
.flip-card.flipped .flip-card-inner,
.flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.flip-card-back { transform: rotateY(180deg); }
`;

const SERIF = "Georgia, 'Times New Roman', serif";

function useUrl(file, value) {
  return useMemo(() => {
    if (file) return URL.createObjectURL(file);
    if (!value) return null;
    return /^(https?:|blob:)/.test(value)
      ? value
      : `${import.meta.env.VITE_API_URL || ""}${value}`;
  }, [file, value]);
}

// ─── Animation helpers ─────────────────────────────────────────────────────
const prefersReducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// بيظهر العنصر بحركة لما يدخل الشاشة (مرة واحدة)
function Reveal({ children, delay = 0, y = 20, x = 0, as: Tag = "div", className = "", style, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translate(${x}px, ${y}px)`,
        transition: `opacity .7s ease-out ${delay}ms, transform .8s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// عدّاد أرقام بيشتغل لما يظهر في الشاشة
function CountUp({ to, suffix = "", duration = 1400, className = "", style }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setVal(to);
      return;
    }
    let raf;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / duration, 1);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {val}
      {suffix}
    </span>
  );
}

// عنوان بجزء ملوّن (الكلمات اللي في النص بتتلوّن بالـ accent)
function AccentTitle({ text, accent }) {
  const words = String(text || "").split(" ").filter(Boolean);
  if (words.length === 0) return null;
  const from = words.length <= 2 ? words.length - 1 : 1;
  const to = words.length <= 2 ? words.length : Math.max(from + 1, words.length - Math.ceil(words.length / 3));
  return (
    <>
      {from > 0 && <span>{words.slice(0, from).join(" ")} </span>}
      <span className="font-bold" style={{ color: accent }}>
        {words.slice(from, to).join(" ")}
      </span>
      {to < words.length && <span> {words.slice(to).join(" ")}</span>}
    </>
  );
}

function RedButton({ children, accent, accentText, isRtl, className = "" }) {
  return (
    <button
      type="button"
      className={`group inline-flex items-center gap-3 rounded-md px-5 py-3 text-[10px] font-bold uppercase tracking-wide transition-all duration-300 hover:brightness-110 active:scale-95 ${className}`}
      style={{ background: accent, color: accentText || "#ffffff" }}
    >
      <span>{children}</span>
      <ArrowRight
        className={`h-3.5 w-3.5 transition-transform duration-300 ${
          isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
        }`}
      />
    </button>
  );
}

function Chrome() {
  return (
    <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-100/80 px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      <span className="ms-2 flex-1 rounded bg-white/70 px-2 py-0.5 font-mono text-[9px] text-slate-400">
        wegostores.com
      </span>
    </div>
  );
}

function Logo({ ctx, color }) {
  const { logo, brand, d } = ctx;
  return (
    <div className="group flex shrink-0 items-center gap-2">
      {logo ? (
        <img
          src={logo}
          alt=""
          className="h-8 w-8 object-contain transition-transform duration-700 group-hover:rotate-[360deg]"
        />
      ) : (
        <div
          className="flex h-8 w-8 items-center justify-center text-xs font-black transition-transform duration-700 group-hover:rotate-[360deg]"
          style={{
            background: d.accent || "#3db88a",
            color: d.accentText || "#ffffff",
            borderRadius: d.key === "business" ? 12 : d.key === "corporate-red" ? 8 : 2,
          }}
        >
          {brand?.[0]?.toUpperCase() || "X"}
        </div>
      )}
      <div className="flex flex-col">
        <span
          className="text-base font-black tracking-tighter uppercase leading-none"
          style={{ color: color || "#1a2b3c" }}
        >
          {brand}
        </span>
        <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase leading-none mt-0.5">
          BUSINESS
        </span>
      </div>
    </div>
  );
}

const brandIcon = (path) =>
  function BrandIcon({ className }) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d={path} />
      </svg>
    );
  };

const Facebook = brandIcon("M22 12a10 10 0 1 0-11.5 9.9v-7H7.9V12h2.6V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z");
const Twitter = brandIcon("M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z");
const Linkedin = brandIcon("M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452z");
const Youtube = brandIcon("M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z");

function Instagram({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS = [Facebook, Twitter, Linkedin, Youtube];

function Socials({ className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {SOCIALS.map((I, i) => (
        <I key={i} className="h-3 w-3 opacity-80 transition hover:-translate-y-0.5 hover:opacity-100" />
      ))}
    </div>
  );
}

// ─── HEADERS ─────────────────────────────────────────────────────────────
function HeaderBusiness({ ctx }) {
  const [active, setActive] = useState(0);
  const { d, links, isRtl } = ctx;
  return (
    <div className="relative bg-[#212429] pt-2 px-4 pb-12">
      <div className="flex justify-between items-center text-[10px] text-slate-300 pb-2 px-6 border-b border-white/10 mb-3">
        <span>Limited time offer, Buy WordPress theme only <strong>$39</strong></span>
        <button className="bg-[#59981A] text-white px-2 py-0.5 rounded text-[9px] hover:bg-opacity-90">Download Theme</button>
      </div>

      <div
        className="relative mx-auto flex items-center justify-between gap-4 rounded-full bg-white px-6 py-2.5 shadow-2xl max-w-5xl"
        style={{ animation: "dsDrop .6s ease-out both" }}
      >
        <Logo ctx={ctx} color="#1f2d45" />

        <nav className="hidden min-w-0 items-center gap-4 sm:flex">
          {links.slice(0, 6).map((l, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="shrink-0 px-2 py-1 text-xs font-semibold transition-all duration-200"
              style={active === i ? { color: "#3db88a", fontWeight: "bold" } : { color: "#475569" }}
            >
              {l.label}
              {l.hasDropdown && <span className="ms-1 text-[8px]">▼</span>}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="shrink-0 rounded-full px-5 py-2.5 text-xs font-bold text-white transition-transform duration-300 hover:scale-105 active:scale-95 shadow-md"
          style={{ background: "linear-gradient(90deg, #3db88a, #2aa080)" }}
        >
          {d.headerCta?.[isRtl ? "ar" : "en"] || (isRtl ? "استشارة مجانية" : "Free Consultation")}
        </button>
      </div>
    </div>
  );
}

function HeaderCorporate({ ctx }) {
  const [active, setActive] = useState(0);
  const { links } = ctx;
  return (
    <div
      className="relative px-5 pb-6 pt-2.5"
      style={{
        background: `linear-gradient(135deg, ${ctx.bg}, #06163d)`,
        color: ctx.text,
      }}
    >
      <div className="flex items-center justify-between border-b border-white/15 pb-2 text-[9px]" style={{ animation: "dsFade .5s ease-out both" }}>
        <Socials />
        <div className="flex items-center gap-3 opacity-90">
          <span className="flex items-center gap-1"><Phone className="h-2.5 w-2.5" /> +1 (818) 23 45 678</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 pt-3.5" style={{ animation: "dsDrop .6s .1s ease-out both" }}>
        <Logo ctx={ctx} color={ctx.text} />
        <nav className="flex min-w-0 items-center gap-3 overflow-x-auto whitespace-nowrap text-[10px] font-bold">
          {links.slice(0, 6).map((l, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="group relative shrink-0 py-1 opacity-80 transition hover:opacity-100"
              style={active === i ? { opacity: 1 } : undefined}
            >
              {l.label}
              <span
                className="absolute -bottom-0.5 start-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"
                style={{ width: active === i ? "100%" : 0 }}
              />
            </button>
          ))}
          <Search className="h-3.5 w-3.5 shrink-0" />
        </nav>
      </div>
    </div>
  );
}

function HeaderCorporateRed({ ctx }) {
  const [active, setActive] = useState(0);
  const { links, d, isRtl } = ctx;
  return (
    <div style={{ background: ctx.bg, color: ctx.text }}>
      <div className="flex items-stretch justify-between">
        <div className="flex items-center px-5 py-3" style={{ animation: "dsSlide .5s ease-out both" }}>
          <Logo ctx={ctx} color={ctx.text} />
        </div>
        <nav className="flex items-stretch overflow-x-auto" style={{ animation: "dsDrop .6s ease-out both" }}>
          {links.slice(0, 6).map((l, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="relative flex shrink-0 items-center px-3 text-[9px] font-bold uppercase tracking-wide transition-colors duration-300 hover:bg-white/10"
              style={active === i ? { background: "rgba(255,255,255,.12)" } : undefined}
            >
              {active === i && (
                <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: d.accent }} />
              )}
              {l.label}
            </button>
          ))}
          <button
            type="button"
            className="flex w-24 shrink-0 items-center justify-center px-2 text-center text-[8px] font-extrabold uppercase leading-tight transition hover:brightness-110"
            style={{
              background: d.accent,
              color: d.accentText,
              animation: "dsPulse 2.4s ease-in-out infinite",
            }}
          >
            {d.headerCta?.[isRtl ? "ar" : "en"] || "Get A Free Quote"}
          </button>
        </nav>
      </div>
    </div>
  );
}

function HeaderConstruction({ ctx }) {
  const { links, d, isRtl } = ctx;
  return (
    <div>
      <div
        className="flex items-center justify-between px-5 py-1.5 text-[9px]"
        style={{ background: ctx.bg, color: ctx.text, animation: "dsFade .5s ease-out both" }}
      >
        <span className="flex items-center gap-1.5 opacity-90">
          <Phone className="h-2.5 w-2.5" style={{ color: d.accent }} /> +1 (818) 23 45 678
        </span>
        <Socials />
      </div>
      <div
        className="relative px-5 pb-6 pt-4"
        style={{ background: "linear-gradient(120deg,#f1e4cf 0%,#e5c799 45%,#b98a52 100%)" }}
      >
        <div
          className="flex items-center justify-between gap-3"
          style={{ animation: "dsDrop .6s ease-out both", color: "#1f2d45" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-black tracking-tight" style={{ fontFamily: SERIF }}>{ctx.brand}</span>
          </div>
          <nav className="flex min-w-0 items-center gap-3 overflow-x-auto whitespace-nowrap text-[10px] font-semibold">
            {links.slice(0, 5).map((l, i) => (
              <button key={i} type="button" className="shrink-0 transition-colors hover:text-black">
                {l.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            className="shrink-0 bg-white px-3 py-2 text-[10px] font-bold shadow-md transition-all duration-300 hover:-translate-y-0.5"
          >
            {d.headerCta?.[isRtl ? "ar" : "en"] || "Free Consultation"}
          </button>
        </div>
      </div>
    </div>
  );
}

function HeroBusiness({ ctx }) {
  const { d, form, image, isRtl, c, links } = ctx;
  const heroImg =
    image ||
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80";
  const title =
    form.title ||
    c.heroTitle ||
    "We create products that makes people's lives easier & better.";
  const titleParts = title.split(/(lives)/i);
  const [activeLink, setActiveLink] = useState(0);

  // clip-path يعكس الانحناء الطبيعي الظاهر في الصورة
  const clipStyle = isRtl
    ? "polygon(0 0, 100% 0, 100% 100%, 55% 100%, 50% 85%, 45% 65%, 40% 45%, 30% 30%, 0 20%)"
    : "M 0,0 L 100,0 L 100,100 L 48,100 C 60,85 65,70 60,50 C 55,30 35,30 0,40 Z";

  return (
    <div className="relative min-h-[650px] w-full overflow-hidden bg-white">
      {/* 1. خلفية الصورة المغطاة لليمين والأعلى */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroImg}
          alt="Hero background"
          className="h-full w-full object-cover object-center"
          style={{ animation: "dsKenBurns 20s ease-in-out infinite alternate" }}
        />
      </div>

      {/* 2. الطبقة البيضاء المنحنية (Curved Shape) على اليسار */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <svg
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`h-full w-full preserve-3d ${isRtl ? "scale-x-[-1]" : ""}`}
          preserveAspectRatio="none"
        >
          {/* الظل/الحاشية الرمادية الخفيفة خلف الشكل الأبيض */}
          <path
            d="M -50 -50 L 720 -50 C 680 180 850 320 750 520 C 650 700 500 850 -50 850 Z"
            fill="#e5e7eb"
            opacity="0.5"
          />
          {/* الشكل الأبيض الرئيسي */}
          <path
            d="M -50 -50 L 680 -50 C 630 190 820 300 710 500 C 610 680 460 850 -50 850 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* 3. شريط الهيدر (Navbar Floating) */}
      <div className="absolute inset-x-0 top-6 z-30 flex justify-center px-4 sm:px-8">
        <div className="flex w-full max-w-5xl items-center justify-between rounded-full bg-white/95 px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md">
          {/* الشعار */}
          <Logo ctx={ctx} color="#17212b" />

          {/* القائمة الرئيسية */}
          <nav className="hidden items-center gap-6 md:flex">
            {links.slice(0, 6).map((link, index) => (
              <button
                key={`${link.label}-${index}`}
                type="button"
                onClick={() => setActiveLink(index)}
                className={`text-xs font-semibold transition-colors ${
                  activeLink === index
                    ? "text-[#3db88a]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
                {link.hasDropdown && <span className="ms-1 text-[9px]">⌄</span>}
              </button>
            ))}
          </nav>

          {/* زر الاستشارة */}
          <button
            type="button"
            className="rounded-full bg-[#3db88a] px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#349e76] hover:shadow-lg active:scale-95"
          >
            {d.headerCta?.[isRtl ? "ar" : "en"] ||
              (isRtl ? "استشارة مجانية" : "Free Consultation")}
          </button>
        </div>
      </div>

      {/* 4. محتوى النص الرئيسي (Hero Content) */}
      <div className="relative z-20 flex min-h-[650px] items-center px-6 pt-24 lg:px-20">
        <div className="max-w-md space-y-6" style={{ animation: "dsSlide .9s .2s ease-out backwards" }}>
          {/* Eyebrow */}
          <p
            className="text-[11px] font-bold tracking-[0.25em] uppercase"
            style={{ color: d.accent || "#3db88a" }}
          >
            {c.eyebrow || "WE ARE EXPERT TEAM"}
          </p>

          {/* Main Title */}
          <h1
            className="text-4xl font-extrabold leading-[1.2] text-[#111827] lg:text-5xl"
            style={{ fontFamily: SERIF }}
          >
            {titleParts.map((part, index) =>
              part.toLowerCase() === "lives" ? (
                <span
                  key={index}
                  className="relative inline-block text-[#3db88a] underline decoration-2 underline-offset-4"
                  style={{
                    color: d.accent || "#3db88a",
                    textDecorationColor: d.accent || "#3db88a",
                  }}
                >
                  {part}
                </span>
              ) : (
                <span key={index}>{part}</span>
              )
            )}
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <button
              type="button"
              className="rounded-full bg-white px-7 py-3.5 text-xs font-bold text-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 transition duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
            >
              {form.ctaText || c.heroCta || "How it works?"}
            </button>

            <a
              href={form.ctaUrl || "#story"}
              className="text-xs font-semibold text-slate-400 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-600"
            >
              {isRtl ? "اقرأ قصتنا كاملة" : "Read the full story line"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2) HERO CORPORATE (مطابق لـ image_7f5b21.png)
function HeroCorporate({ ctx }) {
  const { form, image, c } = ctx;
  const bgImg = image || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80";
  const overlay = `linear-gradient(180deg, color-mix(in srgb, ${ctx.bg} 42%, transparent) 0%, color-mix(in srgb, ${ctx.bg} 48%, transparent) 55%, color-mix(in srgb, ${ctx.bg} 58%, transparent) 100%)`;

  return (
    <div
      className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
      style={{
        color: ctx.text || "#ffffff",
        backgroundColor: ctx.bg || "#0b2a6b",
        containerType: "inline-size",
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})`, animation: "dsKenBurns 22s ease-in-out infinite alternate" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0" style={{ background: overlay }} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.55) 0.7px, transparent 0.7px)",
          backgroundSize: "4px 4px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl space-y-4">
        <h1
          className="font-extrabold leading-tight tracking-tight"
          style={{ animation: "dsDrop .7s ease-out both", textShadow: "0 2px 24px rgba(0,0,0,.2)", fontSize: "clamp(26px, 4.2cqw, 56px)" }}
        >
          {form.title || c.heroTitle || "We Plan, We Execute, You Celebrate"}
        </h1>
        <p
          className="mx-auto max-w-2xl text-sm font-normal leading-relaxed"
          style={{ animation: "dsFade .7s .2s ease-out both" }}
        >
          {form.subtitle || c.heroSubtitle || "We Are Advertising Technology Experts That Drive Business Results."}
        </p>

        <div className="flex flex-col items-center gap-3 pt-6" style={{ animation: "dsPop .7s .4s ease-out both" }}>
          <button
            type="button"
            className="inline-block border border-white px-8 py-3 text-xs font-extrabold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white hover:text-[#0b2a6b] active:scale-95"
          >
            {form.ctaText || c.heroCta || "Start Your New Project"}
          </button>
          <a
            href={form.ctaUrl || "#plans"}
            className="text-[10px] font-medium text-white/90 transition-colors hover:text-white"
          >
            {ctx.isRtl ? "اكتشف المزيد عن خططنا" : "Read More About Plans"}
          </a>
        </div>
      </div>
    </div>
  );
}
//3) HERO CORPORATE RED (مطابق لـ image_7f5b21.png)

function HeroCorporateRed({ ctx }) {
  const { d, form, image, c, isRtl, links } = ctx;
  const mainImg =
    image ||
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700&auto=format&fit=crop&q=80";
  const secondaryImg =
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&auto=format&fit=crop&q=80";
  const groupImg =
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80";
  const [activeLink, setActiveLink] = useState(0);

  const defaultLinks = [
    { label: "HOME" },
    { label: "SERVICES" },
    { label: "BLOG" },
    { label: "SHOP", hasDropdown: true },
    { label: "ABOUT US" },
    { label: "CONTACT" },
  ];

  const navLinks = links && links.length > 0 ? links : defaultLinks;

  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden text-white min-h-[620px]"
      style={{
        background: `linear-gradient(135deg, ${
          ctx.bg || "#0a1045"
        } 0%, #0d1654 100%)`,
      }}
    >
      {/* 1. Header / Navbar - تم ضبط الـ Layout والمسافات ومنع التداخل */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between border-b border-white/10 px-6 py-4 lg:px-10">
        <div className="shrink-0 flex items-center">
          <Logo ctx={ctx} color="#ffffff" />
        </div>

        <nav className="hidden min-w-0 items-center justify-center gap-4 xl:gap-6 lg:flex">
          {navLinks.map((link, index) => (
            <button
              key={`${link.label}-${index}`}
              type="button"
              onClick={() => setActiveLink(index)}
              className={`shrink-0 text-[11px] font-bold tracking-wider transition-colors uppercase ${
                activeLink === index
                  ? "text-[#e50914]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
              {link.hasDropdown && <span className="ms-1 text-[8px]">⌄</span>}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="shrink-0 rounded-sm bg-[#e50914] px-5 py-2.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#c40711]"
        >
          {d.headerCta?.[isRtl ? "ar" : "en"] ||
            (isRtl ? "طلب عرض سعر" : "GET A FREE QUOTE")}
        </button>
      </div>

      {/* 2. Hero Content Area */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-28 pb-12 lg:grid-cols-2 lg:px-12">
        {/* Left Column: Text Details */}
        <div className="space-y-6" style={{ animation: "dsSlide .8s ease-out backwards" }}>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {form.title || c.heroTitle || "We Bring Experimental"}
          </h1>

          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-white/80">
            {form.subtitle ||
              c.heroSubtitle ||
              "Tackle your most significant business challenges with behavioral science, anthropology and strategic foresight to create powerful solutions."}
          </p>

          <div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-sm bg-[#e50914] px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              style={{ background: d.accent || "#e50914" }}
            >
              <span>{form.ctaText || c.heroCta || "FIND OUT HOW?"}</span>
              <span className={isRtl ? "rotate-180" : ""}>→</span>
            </button>
          </div>

          <div className="flex items-center gap-3 border-t border-white/10 pt-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0a1045] shadow-md">
              <span className="text-sm">📞</span>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/60">
                HOTLINE 24/7
              </p>
              <p className="text-sm font-black text-white">+1 (800) 345 678</p>
            </div>
          </div>
        </div>

        {/* Right Column: Images Layout (نفس ترتيب وقصات التصميم الأصلي) */}
        <div className="relative min-h-[360px] w-full">
          {/* الصورة الرئيسية القوسية (Tall Arch) */}
          <div className="absolute start-[8%] top-0 z-10 h-[88%] w-[48%] overflow-hidden rounded-t-[120px] shadow-2xl" style={{ animation: "dsRise .9s .15s ease-out backwards" }}>
            <img
              src={mainImg}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* الصورة العلوية اليمين (مربعة بحواف خفيفة) */}
          <div className="absolute end-[6%] top-[8%] z-20 h-[38%] w-[38%] overflow-hidden rounded-sm shadow-xl" style={{ animation: "dsPop .7s .4s ease-out backwards, dsFloatSoft 7s 1.2s ease-in-out infinite" }}>
            <img
              src={secondaryImg}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          {/* الصورة السفليّة اليمين (منحنية القاع rounded-b-full) */}
          <div className="absolute end-[2%] bottom-[0%] z-20 h-[46%] w-[44%] overflow-hidden rounded-b-full shadow-xl" style={{ animation: "dsPop .7s .55s ease-out backwards, dsFloat 6s 1.4s ease-in-out infinite" }}>
            <img src={groupImg} alt="" className="h-full w-full object-cover" />
          </div>

          {/* الشكل الدائري الأحمر في الخلفية */}
          <div className="absolute end-[28%] bottom-0 z-0 h-16 w-16 rounded-tl-full bg-[#e50914]" />
        </div>
      </div>

      {/* 3. Bottom Stats Bar */}
      <div className="relative z-20 border-t border-white/10 bg-[#060a30] py-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-y-0 sm:divide-x sm:divide-white/10">
          <div className="flex items-center justify-center gap-4 py-2">
            <CountUp to={125} suffix="+" className="text-3xl font-black text-[#e50914]" />
            <span className="text-xs font-semibold leading-tight text-white/80">
              Happy Private
              <br />
              New Clients
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 py-2">
            <CountUp to={400} suffix="+" className="text-3xl font-black text-[#e50914]" />
            <span className="text-xs font-semibold leading-tight text-white/80">
              Best Partnership
              <br />
              Agreements
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 py-2">
            <CountUp to={87} suffix="%" className="text-3xl font-black text-[#e50914]" />
            <span className="text-xs font-semibold leading-tight text-white/80">
              Successfully
              <br />
              Completed Projects
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4) HERO CONSTRUCTION (مطابق لـ image_803c5f.png)
function HeroConstruction({ ctx }) {
  const { d, form, image, c, isRtl } = ctx;
  const backgroundImg = image || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&auto=format&fit=crop&q=85";
  const defaultTitle = c.heroTitle || "START NEW PROJECTS";
  const title = form.title || defaultTitle;
  const titleLines = title === defaultTitle ? ["START", "NEW", "PROJECTS"] : title.split(/\n/).filter(Boolean);

  return (
    <div
      className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-cover bg-center px-6 py-12"
      style={{ backgroundImage: `url(${backgroundImg})`, containerType: "inline-size" }}
    >
      <div className="relative z-10 flex w-full flex-col items-center pt-2" style={{ animation: "dsPop .8s .1s ease-out both" }}>
        <div
          className="px-4 py-4 text-center shadow-lg"
          style={{ width: "min(82cqw, 600px)", background: "#1f2d45", animation: "dsSlide .7s ease-out both" }}
        >
          <h1 className="font-black leading-[1.05] tracking-tight" style={{ fontFamily: SERIF, fontSize: "clamp(20px, 4.2cqw, 38px)", color: d.accent || "#f2b933" }}>
            {titleLines.map((line, index) => <span key={index} className="block">{line}</span>)}
          </h1>
        </div>
        <p
          className="-mt-1 px-4 py-3 text-center font-bold shadow-md"
          style={{ width: "min(70cqw, 445px)", background: d.accent || "#f2b933", color: "#1f2d45", fontFamily: SERIF, fontSize: "clamp(12px, 2.4cqw, 23px)", animation: "dsSlideR .7s .15s ease-out both" }}
        >
          {form.subtitle || c.heroSubtitle || "Don’t get framed by the competition, trust our solid reputation."}
        </p>

        <div className="absolute bottom-5 end-5 z-20 flex gap-2">
          <button type="button" aria-label={isRtl ? "الصورة السابقة" : "Previous slide"} className="flex h-9 w-9 items-center justify-center rounded-md text-white transition hover:bg-black/20">
              <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" aria-label={isRtl ? "الصورة التالية" : "Next slide"} className="flex h-9 w-9 items-center justify-center rounded-md text-white transition hover:bg-black/20">
              <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── INFO SECTIONS ────────────────────────────────────────────────────────
function InfoConstruction({ ctx }) {
  const { form, isRtl } = ctx;
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const cards = [
    {
      title: isRtl ? "الهندسة المعمارية" : "Building Engineering",
      img: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=600",
      desc: isRtl ? "توفير أحدث الحلول والخطط الهندسية للمشاريع الكبيرة." : "Providing advanced structural blueprints and modern engineering solutions.",
    },
    {
      title: isRtl ? "الأمن والسلامة أولاً" : "Safety First",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
      desc: isRtl ? "تطبيق أعلى معايير الأمان لحماية كل العمال والمواقع." : "Applying rigorous international safety standards on all sites.",
    },
    {
      title: isRtl ? "إنشاء الطرق والجسور" : "Road Construction",
      img: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=600",
      desc: isRtl ? "بناء ورصف الطرق باستخدام الخرسانة والإسفلت العالي الجودة." : "The construction of a new road whether from asphalt or concrete requires structural integrity.",
      isDefaultFlipped: true,
    },
  ];

  return (
    <>
    <div className="bg-[#1f2d45] py-10 px-6 text-white">
      <div className="text-center mb-8" style={{ animation: "dsFade .7s ease-out backwards" }}>
        <p className="text-[10px] font-extrabold tracking-widest text-[#f2b933]">FEATURES AT A GLANCE</p>
        <h3 className="text-2xl font-black mt-1 leading-tight">{form.heading || "We know what your needs are"}</h3>
      </div>

      <div className="mx-auto max-w-4xl grid grid-cols-1 gap-6 sm:grid-cols-3">
        {cards.map((item, idx) => {
          const isFlipped = flippedCards[idx] ?? item.isDefaultFlipped;
          return (
            <div
              key={idx}
              className={`flip-card h-72 cursor-pointer ${isFlipped ? "flipped" : ""}`}
              style={{ animation: `dsRise .7s ${0.1 + idx * 0.15}s ease-out backwards` }}
              onClick={() => toggleFlip(idx)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front overflow-hidden shadow-lg border border-slate-700/50">
                  <img src={item.img} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-[#1f2d45]/90 px-4 py-3.5 flex items-center justify-between border-t border-slate-600/40">
                    <span className="text-xs font-bold text-white tracking-wide">{item.title}</span>
                    <ChevronUp className="h-4 w-4 text-[#f2b933] animate-bounce" />
                  </div>
                </div>

                <div className="flip-card-back flex flex-col justify-between bg-[#f2b933] p-6 text-[#1f2d45] shadow-2xl">
                  <div>
                    <h4 className="text-base font-black tracking-tight">{item.title}</h4>
                    <p className="mt-3 text-[11px] font-semibold leading-relaxed opacity-90">
                      {item.desc}
                    </p>
                  </div>
                  <button className="mt-4 self-start bg-white px-4 py-2 text-[10px] font-extrabold text-[#1f2d45] shadow transition-transform hover:scale-105 active:scale-95">
                    {isRtl ? "اقرأ المزيد ..." : "Learn More ..."}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <ServicesConstruction ctx={ctx} />
    </>
  );
}

function InfoBusiness({ ctx }) {
  const { isRtl } = ctx;
  const cards = [
    { icon: Share2, title: isRtl ? "التسويق الاجتماعي" : "Social Marketing", desc: "Social marketing is an approach used to develop activities aimed." },
    { icon: Lightbulb, title: isRtl ? "أفكار تجارية" : "Business Ideas", desc: "Based on client needs, We will provide some good business solutions." },
    { icon: Code2, title: isRtl ? "التطوير والبرمجة" : "Development", desc: "Creating Your Own Website was Never That Easy. Come and Check it Out!" },
  ];

  return (
    <div className="bg-[#effaf6] pb-10">
      <div className="mx-auto max-w-4xl px-4 pt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl bg-[#34b78f] p-5 text-white shadow-lg" style={{ animation: "dsSlide .7s ease-out backwards" }}>
            <p className="text-[10px] font-extrabold uppercase tracking-widest opacity-80">OUR SERVICES</p>
            <h4 className="mt-2 text-base font-black leading-snug">We Will Help Your Business Growing</h4>
          </div>
          {cards.map((item, idx) => (
            <div key={idx} className="group rounded-2xl bg-white p-5 text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ animation: `dsRise .7s ${0.12 + idx * 0.12}s ease-out backwards` }}>
              <item.icon className="h-8 w-8 text-[#34b78f] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
              <h5 className="mt-3 text-xs font-bold">{item.title}</h5>
              <p className="mt-1 text-[10px] leading-relaxed text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoCorporate({ ctx }) {
  const services = [
    { title: "ACCOUNTING SERVICES", tag: "FINANCIAL FUNCTIONS", icon: Calculator },
    { title: "PURCHASING SERVICES", tag: "MATERIALS DISTRIBUTION", icon: Truck },
    { title: "INTERNAL CONTROLS", tag: "SAFEGUARD ASSETS", icon: Lock },
    { title: "E-COMMERCE ORDERING", tag: "ONLINE PURCHASING", icon: ShoppingBag },
  ];

  return (
    <>
    <div className="bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col justify-between bg-[#0b2a6b] p-6 text-white shadow-md" style={{ animation: "dsSlide .7s ease-out backwards" }}>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest opacity-70">OUR SERVICES</p>
            <h4 className="mt-2 text-xl font-black leading-tight">WHAT WE CAN DO?</h4>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((s, i) => (
            <div key={i} className="flex flex-col justify-between border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0b2a6b]/40 hover:shadow-md" style={{ animation: `dsRise .7s ${0.1 + i * 0.1}s ease-out backwards` }}>
              <div>
                <s.icon className="h-6 w-6 text-slate-700" />
                <p className="mt-4 text-[9px] font-bold tracking-wider text-slate-400">{s.tag}</p>
                <h5 className="mt-1 text-xs font-black text-slate-900">{s.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <ServicesVideoCorporate ctx={ctx} />
    </>
  );
}

function InfoCorporateRed({ ctx }) {
  const { d, form, c, isRtl } = ctx || {};

  const mainImg =
    ctx?.image ||
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&auto=format&fit=crop&q=80";
  const secondaryImg =
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&auto=format&fit=crop&q=80";

  const title =
    form?.title || c?.infoTitle || "Grow Your Wealth So You Can Live The Life You Want";
  const titleParts = title.split(/(Live The Life You Want)/i);

  return (
    <>
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* 1. قسم الصور (جهة اليسار) */}
          <div className="relative mx-auto flex w-full max-w-md items-center justify-center min-h-[420px] lg:max-w-none">
            {/* الصورة الرئيسية الطويلة الدائرية */}
            <div className="relative z-10 h-[380px] w-[58%] overflow-hidden rounded-full shadow-xl sm:h-[440px]" style={{ animation: "dsSlide .8s ease-out backwards" }}>
              <img
                src={mainImg}
                alt="Business Discussion"
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* الصورة البيضاوية المتداخلة جهة اليسار/الأسفل */}
            <div className="absolute left-0 bottom-0 z-20 h-[220px] w-[52%] overflow-hidden rounded-full border-4 border-white shadow-2xl sm:h-[260px]" style={{ animation: "dsPop .7s .3s ease-out backwards, dsFloatSoft 6s 1.2s ease-in-out infinite" }}>
              <img
                src={secondaryImg}
                alt="Contract Signing"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* 2. قسم المحتوى والنصوص (جهة اليمين) */}
          <div className="space-y-6" style={{ animation: "dsSlideR .8s .15s ease-out backwards" }}>
            {/* العنوان الرئيسي */}
            <h2 className="text-3xl font-extrabold leading-tight text-[#17212b] sm:text-4xl lg:text-[42px]">
              {titleParts.map((part, index) =>
                part.toLowerCase() === "live the life you want" ? (
                  <span
                    key={index}
                    style={{ color: d?.accent || "#d9082b" }}
                    className="block sm:inline"
                  >
                    {part}
                  </span>
                ) : (
                  <span key={index}>{part}</span>
                )
              )}
            </h2>

            {/* الوصف */}
            <p className="max-w-xl text-sm leading-relaxed text-slate-500">
              {form?.subtitle ||
                c?.infoSubtitle ||
                "Solving social problems requires leaders from foundations, businesses, nonprofits, and governments to reimagine the systems and relationships that shape our world. We strive for a deep understanding of how to create social change."}
            </p>

            {/* زر العمليات CTA */}
            <div className="pt-2">
              <button
                type="button"
                className="inline-flex items-center gap-3 rounded-sm px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition-all hover:opacity-90 active:scale-95"
                style={{ background: d?.accent || "#d9082b" }}
              >
                <span>{form?.ctaText || c?.infoCta || "LEARN MORE"}</span>
                <span className={isRtl ? "rotate-180" : ""}>→</span>
              </button>
            </div>

            {/* قسم النسب والإحصائيات في الأسفل */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
              <div>
                <CountUp
                  to={97}
                  suffix="%"
                  className="text-3xl font-black sm:text-4xl"
                  style={{ color: d?.accent || "#d9082b" }}
                />
                <p className="mt-1 text-xs font-extrabold text-[#17212b]">
                  Success Rate
                </p>
              </div>

              <div>
                <CountUp
                  to={83}
                  suffix="%"
                  className="text-3xl font-black sm:text-4xl"
                  style={{ color: d?.accent || "#d9082b" }}
                />
                <p className="mt-1 text-xs font-extrabold text-[#17212b]">
                  Repaymnet Rate
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    <IndustryCorporateRed ctx={ctx} />
    </>
  );
}

// ─── CONSTRUCTION SECTIONS (مطابقة لتصميم xtratheme construction) ───────────
// كل سكشن بياخد الألوان من ctx.bg / ctx.text (اللي جاية من حقول اللون في الإعدادات)
// والنصوص من الـ form، والمحتوى التجريبي (الخطوات / الآراء / الخدمات) ثابت زي كروت الـ flip.

const CONSTRUCTION_NAVY = "#1f2d45";

// عنوان القسم: كلمة خلفية باهتة + سطر صغير + عنوان كبير
function ConstructionHeading({ watermark, eyebrow, title, subtitle, accent, color, align = "center" }) {
  const center = align === "center";
  return (
    <Reveal className={`relative ${center ? "text-center" : "text-start"}`}>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-3 select-none whitespace-nowrap text-[64px] font-black uppercase leading-none ${
          center ? "start-1/2 -translate-x-1/2 rtl:translate-x-1/2" : "start-0"
        }`}
        style={{ color: accent, opacity: 0.1 }}
      >
        {watermark}
      </span>
      <p className="relative text-[11px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
        {eyebrow}
      </p>
      <h3 className="relative mt-1 text-2xl font-black leading-tight" style={{ color }}>
        {title}
      </h3>
      {subtitle && (
        <p className="relative mx-auto mt-2 max-w-md text-[11px] leading-relaxed opacity-60" style={{ color }}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

// ─── Services (يتعرض تحت كروت الـ flip في قسم info) ─────────────────────────
function ServicesConstruction({ ctx }) {
  const { d, form, isRtl } = ctx;
  const accent = d.accent || "#f2b933";
  const [active, setActive] = useState(2);

  const services = [
    {
      icon: Building2,
      title: isRtl ? "المباني" : "Building",
      desc: isRtl
        ? "المبنى هو منشأ له سقف وجدران قائمة، نصممه وننفذه بأعلى معايير الجودة."
        : "A building, or edifice, is a structure with a roof and walls standing.",
    },
    {
      icon: Truck,
      title: isRtl ? "إنشاء الطرق" : "Road Construction",
      desc: isRtl
        ? "تشمل إنشاء الطرق استخدام الأسفلت والخرسانة وتثبيت التربة وآلات الرصف."
        : "Road construction involves the use of asphalt, concrete, soil stabilization and paving machines.",
    },
    {
      icon: Wrench,
      title: isRtl ? "الصيانة" : "Maintenance",
      desc: isRtl
        ? "كل المسؤوليات المرتبطة بوضع الصيانة موزعة على فريق متخصص."
        : "All are assigned responsibilities relate to the maintenance mode.",
    },
  ];

  return (
    <div className="relative bg-white px-6 pb-10 pt-10" style={{ color: CONSTRUCTION_NAVY }}>
      {/* الشريط الرمادي اللي بيطلع من ورا الكروت */}
      <div className="absolute inset-x-0 bottom-0 h-[52%] bg-slate-100" aria-hidden="true" />

      <div className="relative">
        <ConstructionHeading
          watermark="Services"
          eyebrow={isRtl ? "ايه اللي نقدر نعمله ليك" : "WHAT WE CAN DO FOR YOU"}
          title={isRtl ? "خدماتنا الإنشائية" : "Our construction services"}
          subtitle={form.subheading}
          accent={accent}
          color={CONSTRUCTION_NAVY}
        />

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 items-stretch gap-3">
          {services.map((s, i) => {
            const on = active === i;
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={i * 120} className="h-full">
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`flex h-full w-full flex-col items-center px-3 pb-6 pt-7 text-center shadow-[0_10px_30px_-12px_rgba(31,45,69,0.25)] transition-all duration-300 ${
                  on ? "-translate-y-1.5" : ""
                }`}
                style={{ background: on ? accent : "#ffffff" }}
              >
                <span className="relative flex h-16 w-16 items-center justify-center">
                  {!on && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background: accent,
                        opacity: 0.18,
                        clipPath: "polygon(50% 8%, 100% 100%, 0 100%)",
                      }}
                    />
                  )}
                  <Icon className="relative h-9 w-9" style={{ color: "#111827" }} strokeWidth={1.5} />
                </span>

                <h4
                  className="mt-5 border-b-2 pb-1.5 text-[13px] font-black"
                  style={{ color: on ? "#ffffff" : CONSTRUCTION_NAVY, borderColor: on ? "#ffffff" : accent }}
                >
                  {s.title}
                </h4>
                <p
                  className="mt-4 text-[10px] leading-relaxed"
                  style={{ color: on ? "#ffffff" : "#94a3b8" }}
                >
                  {s.desc}
                </p>
              </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Info2: How it works (نص وصورة على الشمال + لوحة كحلي بخطوات مرقّمة) ────
function Info2Construction({ ctx }) {
  const { d, form, c, image, isRtl } = ctx;
  const accent = d.accent || "#f2b933";
  const photo =
    image ||
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&auto=format&fit=crop&q=80";

  const steps = [
    {
      title: isRtl ? "التعاقد / المناقصة" : "Agency / Bidding",
      desc: isRtl ? "نراجع مستندات التصميم ونتأكد من الحصول على التصاريح." : "Ensure design documents are reviewed and permitted",
    },
    {
      title: isRtl ? "التنفيذ" : "Construction",
      desc: isRtl ? "ننسّق التجهيزات وعمليات التسليم والانتقال للموقع." : "Helps to coordinate furnishings and move-in process",
    },
    {
      title: isRtl ? "تنفيذ المشروع" : "Project Execution",
      desc: isRtl ? "نتابع كل مرحلة حتى التسليم النهائي." : "We follow every stage through to final handover",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-white" style={{ color: CONSTRUCTION_NAVY }}>
      <div className="grid grid-cols-2">
        {/* العمود النصي + الصورة */}
        <Reveal x={-24} y={0} className="relative px-6 pb-8 pt-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute start-3 top-3 select-none text-[78px] font-black uppercase leading-none"
            style={{ color: accent, opacity: 0.12 }}
          >
            How?
          </span>
          <p className="relative mt-7 text-[11px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
            {isRtl ? "مراحل التنفيذ" : "PROCESS OF CONSTRUCTION"}
          </p>
          <h3 className="relative mt-1 text-2xl font-black leading-tight">
            {form.heading || c.info2Heading || "How it works in construction?"}
          </h3>
          <p className="relative mt-3 text-[11px] leading-relaxed text-slate-500">
            {form.paragraph || c.info2Paragraph}
          </p>

          <div className="relative mt-5">
            <span
              aria-hidden="true"
              className="absolute -bottom-3 -start-6 top-6 w-6"
              style={{ background: accent }}
            />
            <img
              src={photo}
              alt=""
              className="relative h-40 w-full object-cover shadow-[0_12px_30px_-12px_rgba(31,45,69,0.35)]"
            />
          </div>
        </Reveal>

        {/* لوحة الخطوات */}
        <div className="mt-12 px-5 py-6" style={{ background: ctx.bg, color: ctx.text }}>
          <ol className="space-y-5">
            {steps.map((s, i) => (
              <Reveal as="li" key={i} x={28} y={0} delay={150 + i * 170} className="flex items-start gap-3">
                <span
                  className="-ms-9 flex h-14 w-14 shrink-0 items-center justify-center text-2xl font-black"
                  style={{ background: accent, color: d.accentText || CONSTRUCTION_NAVY }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 pt-1">
                  <h4 className="text-sm font-black leading-tight">{s.title}</h4>
                  <p className="mt-1 text-[10px] leading-relaxed opacity-70">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

// ─── Testimonials: سلايدر بصورة بإطار أصفر وعلامة اقتباس ────────────────────
function TestimonialsConstruction({ ctx }) {
  const { d, form, c, isRtl } = ctx;
  const accent = d.accent || "#f2b933";
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const dir = isRtl ? -1 : 1;

  const items = [
    {
      name: "Richard Dowson",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
      text: isRtl
        ? "تجربة رائعة! الفريق سهّل علينا العملية كلها من مرحلة التخطيط لحد التسليم، واستمعوا لكل أفكارنا."
        : "Great Experience!! Michael has made the whole process easy from the planning stage to the final plant going in. Steve & his crew did a great job.",
    },
    {
      name: "Lisa Jordan",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      text: isRtl
        ? "كنت متحمسة للشغل معاهم، وبصراحة ما شفتش في حياتي فريق بالالتزام ده."
        : "I just wanted to say it was a pleasure to work with them. The best experience ever on this kind of project, and the team really listened.",
    },
    {
      name: "Daniel Foster",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
      text: isRtl
        ? "فريق محترف وملتزم بالمواعيد، والنتيجة النهائية فاقت توقعاتنا."
        : "A professional crew that kept to the schedule. The final result went beyond what we expected.",
    },
  ];

  const go = (n) => setIdx((i) => (i + n + items.length) % items.length);

  // تمرير تلقائي كل 5 ثواني، ويقف لما الماوس يكون فوق السلايدر
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [paused, items.length]);

  return (
    <div className="relative overflow-hidden px-4 pb-8 pt-9" style={{ background: ctx.bg, color: ctx.text }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <ConstructionHeading
        watermark="Testimonials"
        eyebrow={isRtl ? "شوف عملاءنا بيقولوا ايه" : "SEE WHAT SAYS OUR HAPPY CLIENTS"}
        title={form.heading || c.testiHeading || "Our happy customers"}
        subtitle={form.subheading}
        accent={accent}
        color={ctx.text}
      />

      {/* المسار: الكارت الحالي في النص والجيران باهتين على الجنب */}
      <div className="relative mt-8 h-[250px]">
        {items.map((it, i) => {
          const offset = i - idx;
          const on = offset === 0;
          return (
            <div
              key={i}
              aria-hidden={!on}
              className="absolute bottom-0 top-9 w-[74%] transition-all duration-500 ease-out"
              style={{
                insetInlineStart: "50%",
                transform: `translateX(${isRtl ? "50%" : "-50%"}) translateX(${offset * 108 * dir}%) scale(${on ? 1 : 0.94})`,
                opacity: on ? 1 : 0.35,
                pointerEvents: on ? "auto" : "none",
              }}
            >
              <div className="relative h-full bg-white px-6 pb-6 pt-8 shadow-[0_14px_40px_-14px_rgba(31,45,69,0.25)] ring-1 ring-slate-100">
                {/* الصورة بإطار أصفر */}
                <div className="absolute -top-8 -start-6 h-[104px] w-[104px]">
                  <span aria-hidden="true" className="absolute -bottom-3 -start-3 h-full w-full" style={{ background: accent }} />
                  <img src={it.photo} alt="" className="relative h-full w-full object-cover" />
                </div>

                <div className="ms-[92px] flex h-full flex-col justify-between">
                  <p className="text-[11px] leading-relaxed text-slate-700">“{it.text}”</p>
                  <p className="text-[11px] italic text-slate-400">- {it.name}</p>
                </div>

                <Quote
                  aria-hidden="true"
                  className="absolute bottom-3 end-4 h-9 w-9"
                  style={{ color: accent, fill: accent, opacity: 0.35 }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={isRtl ? "السابق" : "Previous"}
          className="flex h-7 w-7 items-center justify-center border transition hover:bg-black/5"
          style={{ borderColor: accent, color: accent }}
        >
          {isRtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: i === idx ? 20 : 8, background: i === idx ? accent : "#cbd5e1" }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={isRtl ? "التالي" : "Next"}
          className="flex h-7 w-7 items-center justify-center border transition hover:bg-black/5"
          style={{ borderColor: accent, color: accent }}
        >
          {isRtl ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

// ─── Contact: لوحة كحلي + فورم أصفر بيطلع على الجنب الأبيض ───────────────────
function ContactConstruction({ ctx }) {
  const { d, form, c, isRtl } = ctx;
  const accent = d.accent || "#f2b933";
  const navy = ctx.bg;

  const labelCls = "mb-1 block text-[9px] font-medium";
  const inputCls = "h-8 w-full bg-white px-2 text-[10px] text-slate-800 outline-none";
  const L = (en, ar) => (isRtl ? ar : en);

  const info = [
    { icon: Phone, value: form.phone },
    { icon: Mail, value: form.email },
    { icon: MapPin, value: form.address },
  ].filter((r) => r.value);

  return (
    <div
      className="relative overflow-hidden px-6 py-10"
      style={{ background: `linear-gradient(to ${isRtl ? "left" : "right"}, ${navy} 0 56%, #ffffff 56% 100%)` }}
    >
      <div className="grid grid-cols-[1fr_1.15fr] items-center gap-6">
        <div className="relative" style={{ color: ctx.text, animation: "dsSlide .8s ease-out backwards" }}>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-5 start-0 select-none text-[76px] font-black uppercase leading-none"
            style={{ color: ctx.text, opacity: 0.07 }}
          >
            Quote
          </span>
          <p className="relative text-[11px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
            {L("INTERESTED IN CONSTRUCTION?", "مهتم بمشاريع الإنشاءات؟")}
          </p>
          <h3 className="relative mt-2 text-2xl font-black leading-tight">
            {form.heading || c.contactHeading || "Request a free and fair quote"}
          </h3>
          <p className="relative mt-4 text-[11px] leading-relaxed opacity-60">
            {form.subheading || c.contactSubheading}
          </p>

          {info.length > 0 && (
            <ul className="relative mt-4 space-y-1.5">
              {info.map(({ icon: Icon, value }, i) => (
                <li key={i} className="flex items-center gap-2 text-[10px] opacity-80">
                  <Icon className="h-3 w-3 shrink-0" style={{ color: accent }} />
                  <span className="truncate">{value}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* الفورم */}
        <div className="p-5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.35)]" style={{ background: accent, color: CONSTRUCTION_NAVY, animation: "dsSlideR .8s .15s ease-out backwards" }}>
          <div className="grid grid-cols-2 gap-x-3 gap-y-3">
            <label className="block">
              <span className={labelCls}>{L("Your Name (required)", "الاسم (مطلوب)")}</span>
              <input readOnly tabIndex={-1} className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>{L("Your Email (required)", "البريد الإلكتروني (مطلوب)")}</span>
              <input readOnly tabIndex={-1} className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>{L("Subject", "الموضوع")}</span>
              <input readOnly tabIndex={-1} className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>{L("Department", "القسم")}</span>
              <div className={`${inputCls} flex items-center justify-between`}>
                <span>{L("Business Department", "قسم الأعمال")}</span>
                <span className="text-[7px] text-slate-400">▼</span>
              </div>
            </label>
            <label className="col-span-2 block">
              <span className={labelCls}>{L("Your Message", "رسالتك")}</span>
              <textarea readOnly tabIndex={-1} rows={4} className="w-full resize-none bg-white p-2 text-[10px] outline-none" />
            </label>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="px-5 py-2.5 text-[11px] font-bold text-white transition hover:brightness-125 active:scale-95"
              style={{ background: CONSTRUCTION_NAVY }}
            >
              {form.submitText || L("Send", "إرسال")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer: لوجو + نبذة + مربعات سوشيال صفرا + شريط أبيض بالحقوق والروابط ───
function FooterConstruction({ ctx }) {
  const { d, form, c, links, logo, isRtl } = ctx;
  const accent = d.accent || "#f2b933";
  const brand = form.brandName || c.brand || "XTRA Construction";
  const [first, ...rest] = brand.split(" ");
  const socials = [Facebook, Twitter, Instagram, Youtube];

  return (
    <div>
      <div className="px-6 py-10 text-center" style={{ background: ctx.bg, color: ctx.text }}>
        <div className="mx-auto flex w-fit items-center gap-3">
          {logo ? (
            <img src={logo} alt="" className="h-12 w-12 object-contain" />
          ) : (
            <Building2 className="h-11 w-11" style={{ color: accent }} strokeWidth={1.6} />
          )}
          <div className="text-start leading-none">
            <p className="text-2xl font-black uppercase tracking-tight">{first}</p>
            {rest.length > 0 && (
              <p className="mt-1 text-sm font-light uppercase tracking-wide">{rest.join(" ")}</p>
            )}
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-sm text-[11px] leading-loose opacity-70">
          {form.description || c.footerDescription}
        </p>

        <div className="mt-6 flex items-center justify-center gap-2.5">
          {socials.map((I, i) => (
            <span
              key={i}
              className="flex h-9 w-9 items-center justify-center transition-transform duration-300 hover:-translate-y-1"
              style={{ background: accent, color: d.accentText || CONSTRUCTION_NAVY, animation: `dsPop .5s ${0.1 + i * 0.1}s ease-out backwards` }}
            >
              <I className="h-4 w-4" />
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-6 py-3 text-[10px] text-slate-500">
        <span>{form.copyright || `Copyright 2026 ${brand}. All Rights Reserved.`}</span>
        <nav className="flex items-center divide-x divide-slate-200 rtl:divide-x-reverse">
          {links.slice(0, 4).map((l, i) => (
            <span key={i} className="px-3 first:ps-0 last:pe-0">
              {l.label}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}

// ─── CORPORATE RED SECTIONS (مطابقة لتصميم xtratheme corporate-3) ───────────
const CR_LOREM = "Xtra Business works with clients to transform the performance, health, and our capabilities.";

// Info2: Award Winning + كروت الخدمات + اقتباس العميل
function Info2CorporateRed({ ctx }) {
  const { d, form, c, image, isRtl } = ctx;
  const accent = d.accent || "#d9082b";
  const navy = d.bg || "#1b2470";
  const L = (en, ar) => (isRtl ? ar : en);
  const avatar =
    image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80";

  const cards = [
    { icon: Box, title: L("Transformation", "التحوّل"), desc: L(CR_LOREM, "نعمل مع عملائنا لتحويل الأداء والجاهزية وقدراتنا.") },
    { icon: Users, title: L("Consulting", "الاستشارات"), desc: L("Consulting Practices Combine Deep Functional, Industry And Technical Experience.", "ممارسات استشارية تجمع الخبرة الوظيفية والصناعية والتقنية.") },
    { icon: ShieldAlert, title: L("Risk Advisory", "إدارة المخاطر"), desc: L(CR_LOREM, "نساعدك على رؤية المخاطر مبكراً والتعامل معها بثقة.") },
    { icon: Wallet, title: L("Private Wealth", "إدارة الثروات"), desc: L(CR_LOREM, "حلول مخصصة لحماية ثروتك وتنميتها على المدى الطويل.") },
  ];

  return (
    <div className="relative overflow-hidden bg-white px-6 py-10" style={{ color: navy }}>
      <div className="grid grid-cols-[1fr_1.05fr] items-start gap-6">
        <div>
          <Reveal x={-24} y={0}>
            <h3 className="text-[26px] font-light leading-tight">
              <AccentTitle text={form.heading || c.info2Heading || "We’re Award Winning Business Consultants"} accent={accent} />
            </h3>
            <p className="mt-4 text-[11px] leading-relaxed opacity-70">{form.paragraph || c.info2Paragraph}</p>
            <div className="mt-5">
              <RedButton accent={accent} accentText={d.accentText} isRtl={isRtl}>
                {L("All services", "كل الخدمات")}
              </RedButton>
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-7 border-t border-slate-200 pt-5">
            <p className="max-w-xs text-[10px] italic leading-relaxed opacity-70">
              {L(
                "“We are so moved and taken aback by how committed our acceleration partners team has been to our program.”",
                "“تأثرنا جداً بمدى التزام فريق شركائنا ببرنامجنا.”"
              )}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <img src={avatar} alt="" className="h-10 w-10 rounded-full object-cover shadow" />
              <div>
                <p className="text-xs font-bold">Kevin Perry</p>
                <p className="text-[9px] opacity-60">CEO of Robot Man Corp</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {cards.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={i} delay={i * 130} className={i % 2 ? "mt-8" : ""}>
                <div className="group h-full rounded-bl-md rounded-br-[44px] rounded-tl-[44px] rounded-tr-md bg-white p-4 shadow-[0_12px_36px_-14px_rgba(27,36,112,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(27,36,112,0.38)]">
                  <span className="flex h-11 w-11 items-center justify-center bg-slate-100 transition-colors duration-300 group-hover:bg-[var(--cr-accent)]" style={{ "--cr-accent": accent }}>
                    <Icon className="h-6 w-6 transition-colors duration-300 group-hover:text-white" strokeWidth={1.4} />
                  </span>
                  <h4 className="mt-4 text-base font-light">{it.title}</h4>
                  <p className="mt-2 text-[9px] leading-relaxed opacity-65">{it.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Contact: خلفية داكنة بنقط خريطة + إحصائيات + شريط اتصال
function ContactCorporateRed({ ctx }) {
  const { d, form, c, isRtl } = ctx;
  const accent = d.accent || "#d9082b";
  const L = (en, ar) => (isRtl ? ar : en);
  const mask = "radial-gradient(ellipse 62% 58% at 38% 50%, #000 25%, transparent 78%)";

  return (
    <div className="relative overflow-hidden px-6 pb-7 pt-12" style={{ background: ctx.bg, color: ctx.text }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.55) 1px, transparent 1.3px)",
          backgroundSize: "7px 7px",
          opacity: 0.22,
          WebkitMaskImage: mask,
          maskImage: mask,
          animation: "dsDrift 16s ease-in-out infinite alternate",
        }}
      />

      <div className="relative grid grid-cols-[1.7fr_1fr] items-center gap-6">
        <Reveal x={-24} y={0}>
          <h3 className="text-[28px] font-light leading-[1.25]">
            <AccentTitle text={form.heading || c.contactHeading || "Xtra business have helped More than 1,200 companies"} accent={accent} />
          </h3>
          <p className="mt-4 max-w-md text-[11px] leading-relaxed opacity-60">{form.subheading || c.contactSubheading}</p>
        </Reveal>

        <Reveal x={24} y={0} delay={150} className="space-y-5">
          <div>
            <p className="text-lg font-light">
              <CountUp to={3} /> {L("Offices", "مكاتب")}
            </p>
            <p className="mt-1 text-[10px] opacity-60">{L("10th Largest International Firm", "العاشرة بين أكبر الشركات الدولية")}</p>
          </div>
          <div>
            <p className="text-lg font-light">
              <CountUp to={122} /> {L("Members", "عضو")}
            </p>
            <p className="mt-1 text-[10px] opacity-60">{L("All across United States of America", "في كل الولايات المتحدة")}</p>
          </div>
        </Reveal>
      </div>

      <div className="relative my-7 h-px origin-left" style={{ background: "currentColor", opacity: 0.14, animation: "dsDraw 1s ease-out backwards" }} />

      <Reveal delay={250} className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Headphones className="h-9 w-9 shrink-0" style={{ color: accent, animation: "dsFloatSoft 5s ease-in-out infinite" }} strokeWidth={1.3} />
          <div>
            <p className="text-sm font-light">{L("Having Hard Time Making Decision?", "محتار في اتخاذ القرار؟")}</p>
            <p className="mt-0.5 text-[10px] opacity-60">
              {L("Just Call us", "اتصل بنا على")} {form.phone || "+1 (800) 325 55648"}
              {form.email ? ` · ${form.email}` : ""}
            </p>
          </div>
        </div>
        <RedButton accent={accent} accentText={d.accentText} isRtl={isRtl}>
          {form.submitText || L("Get a free quote", "اطلب عرض سعر")}
        </RedButton>
      </Reveal>
    </div>
  );
}

// Testimonials: أرقام النجاح (عدّادات) + زر دراسات الحالة
function TestimonialsCorporateRed({ ctx }) {
  const { d, form, c, isRtl } = ctx;
  const accent = d.accent || "#d9082b";
  const L = (en, ar) => (isRtl ? ar : en);
  const stats = [
    { n: 77, title: L("Success Rate", "معدل النجاح") },
    { n: 59, title: L("Good Ideas", "أفكار ناجحة") },
    { n: 31, title: L("Cost Reduction", "خفض التكلفة") },
    { n: 42, title: L("Improvement", "التحسّن") },
  ];

  return (
    <div className="px-6 py-10" style={{ background: ctx.bg, color: ctx.text }}>
      <Reveal className="text-center">
        <h3 className="mx-auto max-w-md text-[26px] font-light leading-snug">
          <AccentTitle text={form.heading || c.testiHeading || "Why More Than 1200 Companies Trusted Xtra Business"} accent={accent} />
        </h3>
        {form.subheading && <p className="mx-auto mt-2 max-w-md text-[11px] opacity-60">{form.subheading}</p>}
      </Reveal>

      <div className="mx-auto mt-9 grid max-w-3xl grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 120}>
            <CountUp to={s.n} suffix="%" className="block text-4xl font-bold leading-none" style={{ color: accent }} />
            <h4 className="mt-2 text-sm font-bold">{s.title}</h4>
            <p className="mt-3 text-[10px] leading-relaxed opacity-65">
              {L("Of the names we recommend are approved by global regulatory bodies.", "من الأسماء التي نوصي بها معتمدة من جهات تنظيمية عالمية.")}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={350} className="mt-8 flex justify-center">
        <RedButton accent={accent} accentText={d.accentText} isRtl={isRtl}>
          {L("More case studies", "المزيد من دراسات الحالة")}
        </RedButton>
      </Reveal>
    </div>
  );
}

// Info (تحت القسم الحالي): سلايدر المقالات "Industry Specialization"
function IndustryCorporateRed({ ctx }) {
  const { d, form, c, isRtl } = ctx;
  const accent = d.accent || "#d9082b";
  const navy = d.bg || "#1b2470";
  const L = (en, ar) => (isRtl ? ar : en);
  const [start, setStart] = useState(0);

  const posts = [
    { title: L("How to Be Ahead of Stock Changes", "كيف تسبق تغيّرات السوق"), img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=75" },
    { title: L("Online Reputation And Management", "السمعة الرقمية وإدارتها"), img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=75" },
    { title: L("Tips To Move Your Project More Forward", "نصائح لدفع مشروعك للأمام"), img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=75" },
    { title: L("Building Trust With Every Client", "بناء الثقة مع كل عميل"), img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=75" },
    { title: L("Planning Growth In Uncertain Times", "التخطيط للنمو وقت عدم اليقين"), img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&auto=format&fit=crop&q=75" },
  ];
  const visible = [0, 1, 2].map((i) => posts[(start + i) % posts.length]);
  const move = (n) => setStart((s) => (s + n + posts.length) % posts.length);
  const Prev = isRtl ? ArrowRight : ArrowLeft;
  const Next = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="relative bg-white pt-4" style={{ color: navy }}>
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="grid grid-cols-[1.6fr_1fr] items-start gap-6">
          <h3 className="text-[24px] font-light leading-tight">
            <AccentTitle text={form.heading || "Our Industry Specialization Tailored to Your Needs"} accent={accent} />
          </h3>
          <p className="text-[10px] leading-relaxed opacity-70">{form.subheading || c.infoSubheading}</p>
        </Reveal>
      </div>

      <div className="relative mt-8 pb-8">
        <div className="absolute inset-x-0 bottom-0 h-[48%]" style={{ background: navy }} aria-hidden="true" />

        <div className="relative mx-auto grid max-w-4xl grid-cols-3 gap-4 px-10">
          {visible.map((p, i) => (
            <article
              key={`${start}-${i}`}
              className="group overflow-hidden bg-white shadow-[0_14px_36px_-14px_rgba(27,36,112,0.35)]"
              style={{ animation: `dsRise .6s ${i * 0.1}s ease-out backwards` }}
            >
              <div className="relative">
                <div className="h-32 overflow-hidden rounded-tl-[44px]">
                  <img src={p.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <span
                  className="absolute -bottom-3 start-4 rounded-sm px-2 py-1 text-[8px] font-semibold italic text-white"
                  style={{ background: accent }}
                >
                  1 {L("June", "يونيو")} 2024
                </span>
              </div>
              <h4 className="px-4 pb-5 pt-6 text-[13px] font-light leading-snug">{p.title}</h4>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => move(-1)}
          aria-label={L("Previous", "السابق")}
          className="absolute start-2 bottom-8 z-10 flex h-8 w-8 items-center justify-center text-white transition hover:scale-125"
        >
          <Prev className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label={L("Next", "التالي")}
          className="absolute end-2 bottom-8 z-10 flex h-8 w-8 items-center justify-center text-white transition hover:scale-125"
        >
          <Next className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

// Footer: شكل منحني + روابط + عنوان + نشرة بريدية
function FooterCorporateRed({ ctx }) {
  const { d, form, c, links, isRtl } = ctx;
  const accent = d.accent || "#d9082b";
  const L = (en, ar) => (isRtl ? ar : en);
  const items = links.slice(0, 6);

  return (
    <div className="bg-white pt-5">
      <div className="relative overflow-hidden rounded-tl-[96px] px-7 pb-5 pt-10" style={{ background: ctx.bg, color: ctx.text }}>
        <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-6">
          <Reveal x={-24} y={0}>
            <h3 className="text-[24px] font-light leading-snug">
              {form.description || c.footerDescription || "Don’t Be a Stranger, Let’s Do Something Amazing Together…"}
            </h3>
            <div className="mt-6">
              <RedButton accent={accent} accentText={d.accentText} isRtl={isRtl}>
                {L("Get a free quote", "اطلب عرض سعر")}
              </RedButton>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h4 className="text-sm font-light opacity-70">{L("Useful Links", "روابط مفيدة")}</h4>
            <ul className="mt-4 space-y-2.5">
              {items.map((l, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[11px] transition-transform duration-300 hover:translate-x-1 rtl:hover:-translate-x-1">
                  <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: accent }}>
                    <span className="h-1 w-1 rounded-full" style={{ background: accent }} />
                  </span>
                  {l.label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240}>
            <h4 className="text-sm font-light opacity-70">{L("Contact", "تواصل معنا")}</h4>
            <p className="mt-4 text-[11px] leading-relaxed">
              528 Oxford Ave,
              <br />
              Brooklyn, NY 77208
            </p>
            <p className="mt-4 text-[11px] leading-relaxed">
              +1 (800) 456 789
              <br />
              hi@xtrathemes.com
            </p>
          </Reveal>
        </div>

        <div className="my-6 h-px origin-left" style={{ background: "currentColor", opacity: 0.14, animation: "dsDraw 1s ease-out backwards" }} />

        <Reveal delay={150} className="grid grid-cols-[1fr_1.4fr] items-center gap-6">
          <div className="flex items-center gap-3">
            <Mail className="h-6 w-6 shrink-0" strokeWidth={1.4} />
            <p className="text-sm font-light">{L("Subscribe Our Weekly Newsletter", "اشترك في نشرتنا الأسبوعية")}</p>
          </div>
          <div className="flex overflow-hidden rounded-md">
            <input
              readOnly
              tabIndex={-1}
              placeholder={L("Enter Your Email...", "اكتب بريدك الإلكتروني...")}
              className="h-9 min-w-0 flex-1 bg-white px-3 text-[10px] text-slate-700 outline-none placeholder:text-slate-400"
            />
            <button
              type="button"
              className="px-4 text-[10px] font-bold uppercase transition hover:brightness-110"
              style={{ background: accent, color: d.accentText || "#fff" }}
            >
              {L("Join now", "اشترك")}
            </button>
          </div>
        </Reveal>

        <div className="my-5 h-px origin-left" style={{ background: "currentColor", opacity: 0.14, animation: "dsDraw 1s .1s ease-out backwards" }} />

        <div className="flex flex-wrap items-center justify-between gap-2 text-[9px]">
          <span className="opacity-70">{form.copyright || `Copyright 2026 ${c.brand}. All Rights Reserved.`}</span>
          <span className="flex items-center gap-2 text-[10px] font-medium">
            Facebook
            <span style={{ color: accent }}>–</span>X<span style={{ color: accent }}>–</span>Instagram
          </span>
        </div>
      </div>
    </div>
  );
}

function Announcement({ ctx }) {
  const { form, c } = ctx;
  return (
    <div className="p-4">
      <div
        className="relative flex items-center justify-between gap-3 overflow-hidden rounded-full px-4 py-3"
        style={{ background: ctx.bg, color: ctx.text, animation: "dsDrop .6s ease-out backwards" }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 start-0 w-1/5 bg-white/25"
          style={{ animation: "dsShine 4s 1s ease-in-out infinite" }}
        />
        <span className="relative flex items-center gap-2 text-xs font-bold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
          </span>
          {form.text || c.announcement}
        </span>
      </div>
    </div>
  );
}

function Info2({ ctx }) {
  const { form, c } = ctx;
  return (
    <div className="flex items-center gap-5 p-6" style={{ background: ctx.bg, color: ctx.text }}>
      <Reveal x={-20} y={0} className="flex-1 space-y-2">
        <h4 className="text-base font-extrabold">{form.heading || c.info2Heading}</h4>
        <p className="text-[11px] opacity-70">{form.paragraph || c.info2Paragraph}</p>
      </Reveal>
    </div>
  );
}

function Testimonials({ ctx }) {
  const { form, c } = ctx;
  return (
    <div className="p-6 text-center" style={{ background: ctx.bg, color: ctx.text }}>
      <Reveal className="space-y-3">
        <h4 className="text-base font-extrabold">{form.heading || c.testiHeading}</h4>
        <p className="text-xs italic opacity-80">“Great experience and professional service!”</p>
      </Reveal>
    </div>
  );
}

function Contact({ ctx }) {
  const { form, c } = ctx;
  return (
    <div className="p-6" style={{ background: ctx.bg, color: ctx.text }}>
      <Reveal>
        <h4 className="text-base font-extrabold">{form.heading || c.contactHeading}</h4>
        <p className="text-xs opacity-75">{form.subheading || c.contactSubheading}</p>
      </Reveal>
    </div>
  );
}

function Footer({ ctx }) {
  const { form, c } = ctx;
  return (
    <div className="p-6 text-xs" style={{ background: ctx.bg, color: ctx.text }}>
      <Reveal y={10}>
        <p>{form.copyright || `Copyright 2026 ${c.brand}. All Rights Reserved.`}</p>
      </Reveal>
    </div>
  );
}

// ─── CORPORATE SECTIONS (مطابقة لتصميم xtratheme corporate) ─────────────────
const CORP_ACCENT = "#0a2fa3";

// عنوان بآخر كلمة ملوّنة (HOW IT WORKS? → WORKS بالأزرق)
function LastWordTitle({ text, accent }) {
  const words = String(text || "").trim().split(" ").filter(Boolean);
  if (!words.length) return null;
  const last = words.pop();
  const m = last.match(/^(.*?)([?!.:]*)$/);
  return (
    <>
      {words.length > 0 && <span>{words.join(" ")} </span>}
      <span style={{ color: accent }}>{m[1]}</span>
      <span>{m[2]}</span>
    </>
  );
}

// Info2: How it works (قايمة نقاط + 4 كروت متدرجة برقم روماني)
function Info2Corporate({ ctx }) {
  const { d, form, c, isRtl } = ctx;
  const accent = CORP_ACCENT;
  const L = (en, ar) => (isRtl ? ar : en);
  const cardText = L("Based on client needs, We will provide some good solutions", "بناءً على احتياجات العميل، سنقدّم لك أفضل الحلول");

  const steps = [
    { n: "01", roman: "I", title: L("IDEA", "الفكرة") },
    { n: "02", roman: "II", title: L("DESIGN", "التصميم") },
    { n: "03", roman: "III", title: L("CREATE", "الإنشاء") },
    { n: "04", roman: "IV", title: L("EXECUTE", "التنفيذ") },
  ];
  const checks = [
    L("Create a new idea for client project", "ابتكار فكرة جديدة لمشروع العميل"),
    L("Start designing wire frame in Photoshop", "بدء تصميم الـ wire frame"),
    L("Development and coding overall project", "تطوير وبرمجة المشروع بالكامل"),
    L("Test and execute final project on online server", "اختبار وتشغيل المشروع النهائي على السيرفر"),
  ];

  return (
    <div className="relative overflow-hidden bg-white px-6 py-12 text-slate-900">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.05fr]">
        <div>
          <Reveal x={isRtl ? 24 : -24} y={0}>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{L("Work Process", "مراحل العمل")}</p>
            <h3 className="mt-2 text-[28px] font-black uppercase leading-tight">
              <LastWordTitle text={form.heading || c.info2Heading || L("HOW IT WORKS?", "كيف نعمل؟")} accent={accent} />
            </h3>
            <p className="mt-4 text-[11px] leading-relaxed text-slate-600">
              {form.paragraph || c.info2Paragraph || L("As an example, let’s take the content marketing process. It’s a process you’ll find in every Marketing Department out there. There will be writers, designers, extra experts, and web designers, all working together to create a single piece of content.", "كمثال، لنأخذ عملية التسويق بالمحتوى. هي عملية موجودة في كل قسم تسويق، حيث يعمل الكتّاب والمصممون والخبراء معاً لإنتاج محتوى واحد متكامل.")}
            </p>
          </Reveal>

          <ul className="mt-7 space-y-3.5">
            {checks.map((t, i) => (
              <Reveal as="li" key={i} delay={150 + i * 110} x={isRtl ? 18 : -18} y={0} className="group flex items-center gap-3 text-[11px] font-bold">
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 group-hover:scale-110 group-hover:text-white"
                  style={{ borderColor: "#3db88a", color: "#3db88a" }}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">{t}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 140} y={32} className={i % 2 ? "mt-10" : ""}>
              <div className="group relative h-full overflow-hidden bg-white p-5 shadow-[0_14px_40px_-16px_rgba(10,47,163,0.28)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_-14px_rgba(10,47,163,0.4)]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute start-3 top-2 select-none text-[64px] font-black leading-none text-slate-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                  style={{ fontFamily: SERIF }}
                >
                  {s.roman}
                </span>
                <h4 className="relative mt-9 text-sm font-black">
                  <span className="text-slate-300 transition-colors duration-300 group-hover:text-[var(--hw-accent)]" style={{ "--hw-accent": accent }}>{s.n}.</span>{" "}
                  {s.title}
                </h4>
                <p className="relative mt-3 text-[10px] leading-relaxed text-slate-500">{cardText}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// Info (جزء 2): فيديو + 3 خدمات بأيقونات
function ServicesVideoCorporate({ ctx }) {
  const { d, c, image, isRtl } = ctx;
  const navy = d.bg || "#0b2a6b";
  const L = (en, ar) => (isRtl ? ar : en);
  const photo = image || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&auto=format&fit=crop&q=75";
  const desc = L("The editor reviews the content to ensure there are no process, Once this is done, it moves to designer.", "يراجع المحرر المحتوى للتأكد من سلامته، وبعدها ينتقل إلى المصمم.");
  const items = [
    { icon: BarChart3, title: L("Financial Services", "الخدمات المالية") },
    { icon: Monitor, title: L("Software Services", "خدمات البرمجيات") },
    { icon: Crosshair, title: L("Industrial Services", "الخدمات الصناعية") },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch md:grid-cols-[1fr_1.1fr]">
        <Reveal x={isRtl ? 30 : -30} y={0} className="relative min-h-[280px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center grayscale"
            style={{ backgroundImage: `url(${photo})`, animation: "dsKenBurns 20s ease-in-out infinite alternate" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 mix-blend-multiply" style={{ background: navy, opacity: 0.85 }} aria-hidden="true" />
          <div className="relative z-10 flex h-full min-h-[280px] flex-col items-center justify-center gap-5 text-white">
            <button
              type="button"
              aria-label={L("Play video", "تشغيل الفيديو")}
              className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/70 transition-transform duration-300 hover:scale-110"
            >
              <span className="absolute inset-0 rounded-full border border-white/60" style={{ animation: "dsRing 2.2s ease-out infinite" }} />
              <Play className="h-6 w-6 fill-white" />
            </button>
            <p className="text-center text-[9px] font-medium uppercase leading-relaxed tracking-wider">
              {L("About our", "عن")}
              <br />
              {L("Business Solutions", "حلولنا للأعمال")}
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col justify-center gap-7 px-6 py-10 md:py-12">
          {items.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={i * 150} x={isRtl ? -24 : 24} y={0} className="group flex items-start gap-4 md:-ms-9">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:-translate-y-1" style={{ "--sv": CORP_ACCENT }}>
                  <Icon className="h-7 w-7 text-slate-900 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.3} />
                </span>
                <div className="min-w-0 pt-1">
                  <h4 className="relative inline-block pb-1.5 text-sm font-black text-slate-900">
                    {s.title}
                    <span className="absolute bottom-0 start-0 h-px w-full bg-slate-200" />
                    <span className="absolute bottom-0 start-0 h-px w-0 transition-all duration-500 group-hover:w-full" style={{ background: CORP_ACCENT }} />
                  </h4>
                  <p className="mt-2 text-[10px] leading-relaxed text-slate-500">{desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Info (جزء 3): سلايدر البلوج (أوتو بلاي + أسهم)
function BlogCorporate({ ctx }) {
  const { form, c, isRtl } = ctx;
  const accent = CORP_ACCENT;
  const L = (en, ar) => (isRtl ? ar : en);
  const [start, setStart] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const posts = [
    { title: L("How to Be Ahead of Stock Changes", "كيف تسبق تغيّرات السوق"), cats: L("Tutorials, Uncategorized", "دروس، غير مصنّف"), img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=75" },
    { title: L("Online Reputation And Management", "السمعة الرقمية وإدارتها"), cats: L("Interview, News", "مقابلات، أخبار"), img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=75" },
    { title: L("Tips To Move Your Project More Forward", "نصائح لدفع مشروعك للأمام"), cats: L("Miscellaneous, Tutorials", "متنوعات، دروس"), img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=75" },
    { title: L("Top 20 Small Business Blogs to Follow", "أفضل 20 مدونة للأعمال الصغيرة"), cats: L("Interview, News", "مقابلات، أخبار"), img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=75" },
    { title: L("Planning Growth In Uncertain Times", "التخطيط للنمو وقت عدم اليقين"), cats: L("News", "أخبار"), img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&auto=format&fit=crop&q=75" },
  ];
  const visible = [0, 1, 2].map((i) => posts[(start + i) % posts.length]);
  const move = (n) => {
    setDir(n);
    setStart((s) => (s + n + posts.length) % posts.length);
  };

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = setInterval(() => {
      setDir(1);
      setStart((s) => (s + 1) % posts.length);
    }, 4200);
    return () => clearInterval(t);
  }, [paused, posts.length]);

  const Prev = isRtl ? ArrowRight : ArrowLeft;
  const Next = isRtl ? ArrowLeft : ArrowRight;
  const slideAnim = (dir > 0) !== isRtl ? "dsSlideR" : "dsSlide";

  return (
    <div className="bg-white px-6 pb-12 pt-10 text-slate-900" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Reveal className="text-center">
        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{L("Latest Updates and News", "آخر الأخبار والتحديثات")}</p>
        <h3 className="mt-2 text-[28px] font-black uppercase leading-tight">
          <LastWordTitle text={form.heading || L("FROM THE BLOG", "من المدونة")} accent={accent} />
        </h3>
      </Reveal>

      <div className="relative mx-auto mt-8 max-w-4xl px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {visible.map((p, i) => (
            <article key={`${start}-${i}`} className="group" style={{ animation: `${slideAnim} .55s ${i * 0.08}s ease-out backwards` }}>
              <div className="relative">
                <div className="h-36 overflow-hidden">
                  <img src={p.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-x-[-8px] -bottom-3 flex items-center gap-3 bg-white px-3 py-1.5 text-[8px] shadow-sm" style={{ color: accent }}>
                  <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> 1 {L("June", "يونيو")} 2024</span>
                  <span className="flex min-w-0 items-center gap-1 truncate"><FolderOpen className="h-2.5 w-2.5 shrink-0" /> {p.cats}</span>
                </div>
              </div>
              <h4 className="mt-7 text-[13px] font-black leading-snug transition-colors duration-300 group-hover:text-[var(--bl-accent)]" style={{ "--bl-accent": accent }}>
                {p.title}
              </h4>
            </article>
          ))}
        </div>

        <button type="button" onClick={() => move(-1)} aria-label={L("Previous", "السابق")} className="absolute start-0 top-1/3 flex h-8 w-8 items-center justify-center text-slate-500 transition hover:scale-125 hover:text-slate-900">
          <Prev className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => move(1)} aria-label={L("Next", "التالي")} className="absolute end-0 top-1/3 flex h-8 w-8 items-center justify-center text-slate-500 transition hover:scale-125 hover:text-slate-900">
          <Next className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-1.5">
        {posts.map((_, i) => (
          <span key={i} className="h-1 rounded-full transition-all duration-500" style={{ width: i === start ? 20 : 6, background: i === start ? accent : "#cbd5e1" }} />
        ))}
      </div>
    </div>
  );
}

// Footer: نشرة بريدية + روابط على خلفية صورة بطبقة زرقاء
function FooterCorporate({ ctx }) {
  const { d, form, c, isRtl } = ctx;
  const L = (en, ar) => (isRtl ? ar : en);
  const bgImg = ctx.image || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&auto=format&fit=crop&q=70";
  const overlay = `color-mix(in srgb, ${ctx.bg} 90%, transparent)`;

  const cols = [
    { h: L("Useful Links", "روابط مفيدة"), items: [L("Purchase now", "اشترِ الآن"), L("Support", "الدعم"), L("Documentation", "التوثيق"), L("Custom Services", "خدمات مخصصة"), L("Marketplaces", "الأسواق"), L("Portfolio Reviews", "تقييمات الأعمال")] },
    { h: L("Shortcuts", "اختصارات"), items: [L("About Us", "من نحن"), L("Services", "الخدمات"), L("News & Updates", "الأخبار"), L("Our Projects", "مشاريعنا"), L("Contact Us", "اتصل بنا"), L("Creative Career Tips", "نصائح مهنية")] },
    { h: L("Contact Us", "تواصل معنا"), items: [L("General enquiries", "استفسارات عامة"), L("Schedule a callback", "حدّد موعد اتصال"), L("General FAQ’s", "الأسئلة الشائعة"), L("Get in Touch", "تواصل معنا"), L("Popular Events", "الفعاليات"), L("Reviews", "التقييمات")] },
  ];

  return (
    <div className="relative overflow-hidden px-7 pb-5 pt-10" style={{ background: ctx.bg, color: ctx.text }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImg})`, animation: "dsKenBurns 24s ease-in-out infinite alternate" }} aria-hidden="true" />
      <div className="absolute inset-0" style={{ background: overlay }} aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_1.4fr]">
          <h3 className="text-lg font-light uppercase">
            {L("Subscribe to our", "اشترك في")} <b className="font-black">{L("Newsletter", "نشرتنا البريدية")}</b>
          </h3>
          <div className="flex overflow-hidden border border-white/25 bg-white/5 p-1 transition-colors duration-300 focus-within:border-white/60">
            <input readOnly tabIndex={-1} placeholder={L("Enter your email address please ...", "اكتب بريدك الإلكتروني ...")} className="h-8 min-w-0 flex-1 bg-transparent px-3 text-[10px] text-white outline-none placeholder:text-white/70" />
            <button type="button" className="bg-white px-4 text-[9px] font-black uppercase text-[#0b2a6b] transition hover:scale-[1.04] active:scale-95">
              {L("Join now", "اشترك")}
            </button>
          </div>
        </Reveal>

        <div className="my-6 h-px origin-left bg-white/20" style={{ animation: "dsDraw 1s ease-out backwards" }} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <Reveal x={isRtl ? 24 : -24} y={0}>
            <Logo ctx={ctx} color={ctx.text} />
            <p className="mt-4 text-[10px] leading-relaxed opacity-85">
              {form.description || c.footerDescription || L("The last theme you will ever have to buy for your business. More powerful and easy to use, with incredible features and friendly support.", "آخر قالب ستحتاج لشرائه لعملك. أقوى وأسهل في الاستخدام بمميزات رائعة ودعم ودود.")}
            </p>
            <button type="button" className="mt-5 border border-white/70 px-4 py-2 text-[10px] font-bold transition-all duration-300 hover:bg-white hover:text-[#0b2a6b] active:scale-95">
              {L("Purchase Theme", "اشترِ القالب")}
            </button>
          </Reveal>

          {cols.map((col, ci) => (
            <Reveal key={ci} delay={120 + ci * 120}>
              <h4 className="text-[10px] font-black uppercase tracking-wide">{col.h}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((t, i) => (
                  <li key={i} className="group flex cursor-pointer items-center gap-2 text-[10px] opacity-90 transition-all duration-300 hover:translate-x-1 hover:opacity-100 rtl:hover:-translate-x-1">
                    <span className="h-2 w-2 shrink-0 rounded-full border border-current transition-all duration-300 group-hover:bg-white" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="my-6 h-px origin-left bg-white/20" style={{ animation: "dsDraw 1s .15s ease-out backwards" }} />

        <div className="flex flex-wrap items-center justify-between gap-3 text-[9px]">
          <span className="opacity-85">{form.copyright || L("© Copyright 2026. All Rights Reserved.", "© 2026 جميع الحقوق محفوظة.")}</span>
          <div className="flex items-center gap-4">
            <Socials />
            <span className="opacity-40">/</span>
            <span className="cursor-pointer opacity-85 transition hover:opacity-100">{L("Advertisement", "إعلان")}</span>
            <span className="opacity-40">/</span>
            <span className="cursor-pointer opacity-85 transition hover:opacity-100">{L("Privacy Policy", "سياسة الخصوصية")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BUSINESS SECTIONS (مطابقة لتصميم xtratheme business-4) ─────────────────
const BIZ_TEAL = "#0b7d9b";
const BIZ_LIGHT = "#e8f4f7";
const bizAccent = (d) => d?.accent || "#3db88a";

function BizEyebrow({ children, className = "" }) {
  return (
    <p className={`text-[9px] font-medium uppercase tracking-[0.38em] ${className}`} style={{ color: BIZ_TEAL, fontFamily: SERIF }}>
      {children}
    </p>
  );
}

// Info (جزء 2): About our company
function AboutCompanyBusiness({ ctx }) {
  const { d, form, c, image, isRtl } = ctx;
  const accent = bizAccent(d);
  const L = (en, ar) => (isRtl ? ar : en);
  const photo = image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=75";
  const items = [
    { icon: Paintbrush, title: L("Designing", "التصميم"), sub: L("Expert in photoshop", "خبرة في الفوتوشوب") },
    { icon: Code2, title: L("Development", "التطوير"), sub: L("Any CMS you want", "أي نظام تريده") },
    { icon: Share2, title: L("Social Media", "السوشيال ميديا"), sub: L("Increase your likes", "زوّد تفاعلك") },
    { icon: Globe, title: L("WordPress", "ووردبريس"), sub: L("Themes and Plugins", "قوالب وإضافات") },
  ];
  return (
    <div className="relative overflow-hidden px-6 py-12" style={{ background: BIZ_LIGHT, fontFamily: SERIF }}>
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        <Reveal x={isRtl ? 30 : -30} y={0} className="relative mx-auto h-[320px] w-full max-w-[300px]">
          <span className="absolute inset-x-6 bottom-0 top-10 rounded-t-full bg-white/60" style={{ animation: "dsPulseGlow 5s ease-in-out infinite" }} />
          <img src={photo} alt="" className="relative h-full w-full rounded-t-[140px] object-cover object-top" style={{ animation: "dsFloatSoft 6s ease-in-out infinite" }} />
        </Reveal>
        <div>
          <Reveal>
            <Users className="h-9 w-9" style={{ color: accent }} strokeWidth={1.3} />
            <BizEyebrow className="mt-4">{L("About our company", "عن شركتنا")}</BizEyebrow>
            <h3 className="mt-3 text-[26px] font-bold leading-snug text-slate-900">{form.title || c.aboutHeading || L("We are team of expert people with creativity ideas", "نحن فريق من الخبراء أصحاب الأفكار الإبداعية")}</h3>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">{form.paragraph || c.aboutParagraph || L("As an example, let’s take the content marketing process, It’s a process you’ll find in every Marketing Department out there.", "كمثال، لنأخذ عملية التسويق بالمحتوى، وهي عملية موجودة في كل قسم تسويق.")}</p>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
            {items.map((it, i) => {
              const Icon = it.icon;
              return (
                <Reveal key={i} delay={150 + i * 110} className="group flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" style={{ background: accent, animation: `dsPop .6s ${0.2 + i * 0.1}s ease-out backwards` }}>
                    <Icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{it.title}</h4>
                    <p className="text-[9px] text-slate-400">{it.sub}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Info2 (جزء 1): Business process road
function ProcessRoadBusiness({ ctx }) {
  const { d, image, isRtl } = ctx;
  const accent = bizAccent(d);
  const L = (en, ar) => (isRtl ? ar : en);
  const photo = image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=75";
  const steps = [
    { n: "01", t: L("Create an Idea", "ابتكر فكرة"), p: L("What’s hard is to develop the habits that enable us to come up with great ideas.", "الصعب هو بناء العادات التي تمكّننا من ابتكار أفكار عظيمة.") },
    { n: "02", t: L("Complete the Project", "أنجز المشروع"), p: L("You can organize yourself and your team in endless ways.", "يمكنك تنظيم نفسك وفريقك بطرق لا حصر لها.") },
    { n: "03", t: L("Execution", "التنفيذ"), p: L("When it comes to motivating teams, awarding members for good performance.", "عند تحفيز الفرق، نكافئ الأعضاء على الأداء الجيد.") },
  ];
  return (
    <div className="relative overflow-hidden bg-white px-6 py-12" style={{ fontFamily: SERIF }}>
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-8 md:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <BizEyebrow>{L("About our company", "عن شركتنا")}</BizEyebrow>
            <h3 className="mt-2 text-[26px] font-bold text-slate-900">{L("Our business process road", "خارطة طريق عملنا")}</h3>
          </Reveal>
          <div className="mt-6 space-y-6">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 150} x={isRtl ? 24 : -24} y={0} className="group flex items-start gap-4">
                <span className="w-[84px] shrink-0 text-[54px] font-light leading-none transition-transform duration-500 group-hover:scale-110" style={{ color: accent }}>
                  {s.n}<span className="text-[30px]">.</span>
                </span>
                <div className="pt-1">
                  <h4 className="text-sm font-bold text-slate-900">{s.t}</h4>
                  <p className="mt-1 text-[10px] leading-relaxed text-slate-400">{s.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal x={isRtl ? -30 : 30} y={0} className="relative mx-auto h-[300px] w-full max-w-[320px]">
          <div className="absolute inset-4 overflow-hidden bg-cover bg-center shadow-xl" style={{ backgroundImage: `url(${photo})`, borderRadius: "60% 40% 30% 70% / 40% 50% 50% 60%", animation: "dsFloatSoft 7s ease-in-out infinite" }} />
          <span className="absolute end-2 top-3 h-14 w-14 rounded-full border-[3px]" style={{ borderColor: accent, animation: "dsFloat 4s ease-in-out infinite" }} />
          <span className="absolute start-0 top-0 h-3 w-3 bg-amber-200" style={{ animation: "dsFloat 5s ease-in-out infinite" }} />
          <span className="absolute bottom-16 start-2 h-0 w-0 border-x-[12px] border-b-[20px] border-x-transparent" style={{ borderBottomColor: "#4fb3b0", animation: "dsDrift 4s ease-in-out infinite alternate" }} />
          <span className="absolute bottom-8 end-0 h-6 w-6 rotate-45 bg-slate-500/70" style={{ animation: "dsFloat 6s ease-in-out infinite" }} />
        </Reveal>
      </div>
    </div>
  );
}

// Info2 (جزء 2): Recent creative projects (سلايدر)
function ProjectsBusiness({ ctx }) {
  const { d, isRtl } = ctx;
  const accent = bizAccent(d);
  const L = (en, ar) => (isRtl ? ar : en);
  const [start, setStart] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const imgs = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=75",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=75",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&auto=format&fit=crop&q=75",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=75",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=75",
  ];
  const visible = [0, 1, 2].map((i) => imgs[(start + i) % imgs.length]);
  const move = (n) => { setDir(n); setStart((s) => (s + n + imgs.length) % imgs.length); };
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = setInterval(() => { setDir(1); setStart((s) => (s + 1) % imgs.length); }, 4000);
    return () => clearInterval(t);
  }, [paused, imgs.length]);
  const Prev = isRtl ? ChevronRight : ChevronLeft;
  const Next = isRtl ? ChevronLeft : ChevronRight;
  const anim = (dir > 0) !== isRtl ? "dsSlideR" : "dsSlide";

  return (
    <div className="px-6 py-12 text-center" style={{ background: BIZ_LIGHT, fontFamily: SERIF }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Reveal>
        <BizEyebrow>{L("Projects we done", "مشاريعنا المنجزة")}</BizEyebrow>
        <h3 className="mt-3 text-[26px] font-bold text-slate-900">{L("Our recent creative projects", "أحدث مشاريعنا الإبداعية")}</h3>
        <p className="mt-3 text-xs" style={{ color: accent }}>{L("Let’s check some of our perfect projects.", "تعالَ نستعرض بعض مشاريعنا المميزة.")}</p>
      </Reveal>
      <div className="relative mx-auto mt-8 max-w-4xl px-9">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {visible.map((src, i) => (
            <div key={`${start}-${i}`} className="group relative aspect-square overflow-hidden bg-slate-300 shadow-md" style={{ animation: `${anim} .55s ${i * 0.08}s ease-out backwards` }}>
              <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30" style={{ background: accent }} />
            </div>
          ))}
        </div>
        <button type="button" onClick={() => move(-1)} aria-label={L("Previous", "السابق")} className="absolute start-0 top-1/2 -translate-y-1/2 text-slate-500 transition hover:scale-125 hover:text-slate-900"><Prev className="h-6 w-6" /></button>
        <button type="button" onClick={() => move(1)} aria-label={L("Next", "التالي")} className="absolute end-0 top-1/2 -translate-y-1/2 text-slate-500 transition hover:scale-125 hover:text-slate-900"><Next className="h-6 w-6" /></button>
      </div>
    </div>
  );
}

function Info2Business({ ctx }) {
  return (
    <>
      <ProcessRoadBusiness ctx={ctx} />
      <ProjectsBusiness ctx={ctx} />
    </>
  );
}

function InfoBusinessFull({ ctx }) {
  return (
    <>
      <InfoBusiness ctx={ctx} />
      <AboutCompanyBusiness ctx={ctx} />
    </>
  );
}

// Testimonials: Our happy customers
function TestimonialsBusiness({ ctx }) {
  const { d, form, c, isRtl } = ctx;
  const accent = bizAccent(d);
  const L = (en, ar) => (isRtl ? ar : en);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const list = [
    { q: L("Great customer service, Social Media Marketing Company is professional and extremely serious about business. I have increased my revenue of my business.", "خدمة عملاء رائعة، الشركة محترفة وجادة جداً في عملها وقد زادت إيراداتي بشكل ملحوظ."), n: "Sarah Lee", r: L("Teacher", "معلمة"), img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=75" },
    { q: L("The team understood our needs from day one and delivered a website that our customers love.", "فهم الفريق احتياجاتنا من اليوم الأول وسلّم موقعاً يحبه عملاؤنا."), n: "Kevin Perry", r: L("CEO", "رئيس تنفيذي"), img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=75" },
    { q: L("Professional, fast and creative. Highly recommended for any growing business.", "احترافية وسريعة ومبدعة. أنصح بها لأي شركة نامية."), n: "Maya Adel", r: L("Founder", "مؤسسة"), img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&auto=format&fit=crop&q=75" },
  ];
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = setInterval(() => setI((x) => (x + 1) % list.length), 5000);
    return () => clearInterval(t);
  }, [paused, list.length]);
  const t = list[i];

  return (
    <div className="bg-white px-6 py-12" style={{ fontFamily: SERIF }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        <Reveal x={isRtl ? 24 : -24} y={0}>
          <ThumbsUp className="h-10 w-10" style={{ color: accent }} strokeWidth={1.3} />
          <BizEyebrow className="mt-4">{L("Our testimonials", "آراء عملائنا")}</BizEyebrow>
          <h3 className="mt-3 text-[26px] font-bold text-slate-900">{form.heading || c.testiHeading || L("Our happy customers", "عملاؤنا السعداء")}</h3>
          <p className="mt-3 text-[11px] leading-relaxed text-slate-400">{form.subheading || L("The testimonials feature lets you collect kudos from customers and clients and display them on your site in different ways to add credibility and a professional feel.", "تتيح لك الآراء جمع إشادات العملاء وعرضها في موقعك لزيادة المصداقية والاحترافية.")}</p>
        </Reveal>
        <Reveal delay={150} className="relative px-2 pt-10">
          <Quote className="absolute start-1/2 top-0 h-14 w-14 -translate-x-1/2 fill-current" style={{ color: accent, animation: "dsFloat 4s ease-in-out infinite" }} />
          <div key={i} className="relative bg-white px-8 pb-12 pt-10 text-center shadow-[0_16px_44px_-14px_rgba(0,0,0,0.2)]" style={{ animation: "dsFade .6s ease-out both" }}>
            <p className="text-[12px] leading-relaxed text-slate-700">“{t.q}”</p>
            <p className="mt-4 text-[10px]"><b style={{ color: accent }}>{t.n}</b> <span className="text-slate-500">{t.r}</span></p>
            <img src={t.img} alt="" className="absolute -bottom-7 start-1/2 h-14 w-14 -translate-x-1/2 rounded-full border-4 border-white object-cover shadow" />
          </div>
          <div className="mt-11 flex justify-center gap-1.5">
            {list.map((_, k) => (
              <button key={k} type="button" aria-label={`${k + 1}`} onClick={() => setI(k)} className="h-2 w-2 rounded-full border transition-all duration-300" style={{ borderColor: BIZ_TEAL, background: k === i ? BIZ_TEAL : "transparent", transform: k === i ? "scale(1.25)" : "none" }} />
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// Contact: Ready? Start your own business
function ContactBusiness({ ctx }) {
  const { d, form, c, isRtl } = ctx;
  const accent = bizAccent(d);
  const L = (en, ar) => (isRtl ? ar : en);
  return (
    <div className="px-6 pb-4 pt-8" style={{ background: BIZ_LIGHT, fontFamily: SERIF }}>
      <Reveal className="mx-auto max-w-4xl rounded-b-[72px] bg-white px-10 pb-12 pt-10 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.2)]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 className="text-[24px] font-bold text-slate-900">
              <span style={{ color: accent }}>{L("Ready?", "جاهز؟")}</span> {form.heading || c.contactHeading || L("Start your own business", "ابدأ مشروعك الخاص")}
            </h3>
            <p className="mt-2 text-sm text-slate-400">{form.subheading || c.contactSubheading || L("We are here to start your new project and finish it soon", "نحن هنا لنبدأ مشروعك الجديد وننهيه بسرعة")}</p>
          </div>
          <button type="button" className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95" style={{ background: `linear-gradient(90deg, ${accent}, ${BIZ_TEAL})` }}>
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 start-0 w-1/5 bg-white/30" style={{ animation: "dsShine 3.5s 1s ease-in-out infinite" }} />
            <CalendarDays className="relative h-4 w-4" />
            <span className="relative">{L("Contact Us Today", "تواصل معنا اليوم")}</span>
          </button>
        </div>
      </Reveal>
    </div>
  );
}

// Footer
function FooterBusiness({ ctx }) {
  const { d, form, c, isRtl } = ctx;
  const accent = bizAccent(d);
  const L = (en, ar) => (isRtl ? ar : en);
  const cols = [
    { h: L("Useful links", "روابط مفيدة"), it: [L("Privacy Policy", "سياسة الخصوصية"), L("Our Services", "خدماتنا"), L("About Company", "عن الشركة"), L("Forums", "المنتديات"), L("Categories", "التصنيفات"), L("Latest Products", "أحدث المنتجات"), L("Testimonials", "الآراء")] },
    { h: L("Quick access", "وصول سريع"), it: [L("Marketplace", "المتجر"), L("Licenses", "التراخيص"), L("Reviews", "التقييمات"), L("Refunds", "الاسترجاع"), L("Contact Us", "اتصل بنا"), L("Support Policy", "سياسة الدعم")] },
    { h: L("More links", "المزيد"), it: [L("About Us", "من نحن"), L("Our Projects", "مشاريعنا"), L("Our Office", "مكتبنا"), L("Our Location", "موقعنا"), L("Who We Are?", "من نحن؟")] },
  ];
  const socials = [Facebook, Twitter, Instagram, Linkedin, Youtube];
  return (
    <div style={{ fontFamily: SERIF }}>
      <div className="px-7 pb-10 pt-10" style={{ background: BIZ_LIGHT }}>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <Reveal x={isRtl ? 24 : -24} y={0}>
            <Logo ctx={ctx} color="#0f172a" />
            <p className="mt-5 text-[10px] leading-relaxed text-slate-600">{form.description || c.footerDescription || L("A company is any entity that engages in business. Companies can be structured in different ways. For example, your company can be a sole proprietorship, a partnership, or a corporation.", "الشركة هي أي كيان يمارس نشاطاً تجارياً، ويمكن أن تُنظَّم بطرق مختلفة.")}</p>
            <div className="mt-5 flex gap-2">
              {socials.map((I, k) => (
                <span key={k} className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ background: accent, animation: `dsPop .5s ${0.1 + k * 0.08}s ease-out backwards` }}>
                  <I className="h-3.5 w-3.5" />
                </span>
              ))}
            </div>
          </Reveal>
          {cols.map((col, ci) => (
            <Reveal key={ci} delay={120 + ci * 120}>
              <h4 className="text-[10px] font-bold uppercase tracking-wide" style={{ color: BIZ_TEAL }}>{col.h}</h4>
              <div className="relative mt-3 h-px bg-slate-300">
                <span className="absolute -top-[3px] start-0 h-[7px] w-[7px] rounded-full" style={{ background: accent }} />
              </div>
              <ul className="mt-4 space-y-2">
                {col.it.map((t, k) => (
                  <li key={k} className="flex cursor-pointer items-center gap-2 text-[10px] text-slate-700 transition-all duration-300 hover:translate-x-1 hover:text-slate-900 rtl:hover:-translate-x-1">
                    <ChevronRight className={`h-3 w-3 shrink-0 ${isRtl ? "rotate-180" : ""}`} style={{ color: accent }} />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 px-7 py-3 text-[9px] text-white" style={{ background: BIZ_TEAL }}>
        <span>{form.copyright || L("© 2026 by XTRA Theme, Powered by WordPress", "© 2026 جميع الحقوق محفوظة")}</span>
        <span className="flex items-center gap-3 font-bold">
          {[L("Privacy Policy", "الخصوصية"), L("About", "عنا"), L("Contact Us", "اتصل بنا")].map((t, k) => (
            <span key={k} className="cursor-pointer opacity-90 transition hover:opacity-100">{t}</span>
          ))}
        </span>
      </div>
    </div>
  );
}

// ─── CORPORATE: Contact (كان فاضي) ─────────────────────────────────────────
function ContactCorporate({ ctx }) {
  const { d, form, c, isRtl } = ctx;
  const navy = d.bg || "#0b2a6b";
  const L = (en, ar) => (isRtl ? ar : en);
  const info = [
    { icon: Phone, t: L("Call us", "اتصل بنا"), v: "+1 (818) 23 45 678" },
    { icon: Mail, t: L("Email us", "راسلنا"), v: "hi@xtratheme.com" },
    { icon: MapPin, t: L("Visit us", "زورنا"), v: L("528 Oxford Ave, Brooklyn, NY", "528 أوكسفورد، بروكلين، نيويورك") },
  ];
  const field = "h-9 w-full border border-slate-200 bg-white px-3 text-[10px] text-slate-700 outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[var(--cc)]";
  return (
    <div className="bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-[1fr_1.1fr]">
        <div>
          <Reveal x={isRtl ? 24 : -24} y={0}>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{L("Contact us", "تواصل معنا")}</p>
            <h3 className="mt-2 text-[28px] font-black uppercase leading-tight">
              <LastWordTitle text={form.heading || c.contactHeading || L("GET IN TOUCH", "تواصل معنا")} accent={CORP_ACCENT} />
            </h3>
            <p className="mt-4 text-[11px] leading-relaxed text-slate-600">{form.subheading || c.contactSubheading || L("Have a project in mind? Send us a message and our team will get back to you within one business day.", "عندك مشروع في بالك؟ ارسل لنا رسالة وسيرد عليك فريقنا خلال يوم عمل.")}</p>
          </Reveal>
          <div className="mt-6 space-y-4">
            {info.map((it, i) => {
              const Icon = it.icon;
              return (
                <Reveal key={i} delay={120 + i * 120} x={isRtl ? 20 : -20} y={0} className="group flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-white" style={{ "--cc": navy }}>
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{it.t}</p>
                    <p className="text-xs font-black">{it.v}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        <Reveal delay={150} x={isRtl ? -24 : 24} y={0}>
          <div className="space-y-3 bg-white p-6 shadow-[0_18px_46px_-18px_rgba(10,47,163,0.3)]" style={{ "--cc": CORP_ACCENT }}>
            <div className="grid grid-cols-2 gap-3">
              <input readOnly tabIndex={-1} placeholder={L("Your name", "الاسم")} className={field} />
              <input readOnly tabIndex={-1} placeholder={L("Your email", "البريد الإلكتروني")} className={field} />
            </div>
            <input readOnly tabIndex={-1} placeholder={L("Subject", "الموضوع")} className={field} />
            <textarea readOnly tabIndex={-1} rows={4} placeholder={L("Your message", "رسالتك")} className={`${field} h-auto resize-none py-2`} />
            <button type="button" className="group inline-flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase text-white transition-all duration-300 hover:brightness-110 active:scale-95" style={{ background: navy }}>
              {L("Send message", "إرسال")}
              <Send className={`h-3.5 w-3.5 transition-transform duration-300 ${isRtl ? "-scale-x-100 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ─── Dispatcher Maps ────────────────────────────────────────────────────────
const HEADERS = {
  business: HeaderBusiness,
  corporate: HeaderCorporate,
  "corporate-red": HeaderCorporateRed,
  construction: HeaderConstruction,
};
const HEROES = {
  business: HeroBusiness,
  corporate: HeroCorporate,
  "corporate-red": HeroCorporateRed,
  construction: HeroConstruction,
};
const INFO_SECTIONS = {
  business: InfoBusinessFull,
  corporate: InfoCorporate,
  "corporate-red": InfoCorporateRed,
  construction: InfoConstruction,
};
const SIMPLE = {
  announcement: Announcement,
  info2: Info2,
  testimonials: Testimonials,
  contact: Contact,
  footer: Footer,
};

// تصاميم خاصة بكل theme للسكاشن البسيطة. لما تيجي باقي الـ themes
// ضيفي سطر جديد هنا (مثلاً: testimonials: { construction: ..., corporate: ... })
// ولو الـ theme مالوش تصميم هنا بيرجع للتصميم البسيط الافتراضي.
const VARIANT_SECTIONS = {
  info2: { business: Info2Business, construction: Info2Construction, "corporate-red": Info2CorporateRed, corporate: Info2Corporate },
  testimonials: { business: TestimonialsBusiness, construction: TestimonialsConstruction, "corporate-red": TestimonialsCorporateRed, corporate: BlogCorporate },
  contact: { business: ContactBusiness, corporate: ContactCorporate, construction: ContactConstruction, "corporate-red": ContactCorporateRed },
  footer: { business: FooterBusiness, construction: FooterConstruction, "corporate-red": FooterCorporateRed, corporate: FooterCorporate },
};

export default function SectionDesignPreview({ section, form = {}, files = {}, isRtl }) {
  const key = resolveVariant(section, form);
  const d = DESIGNS[key] || {};
  const c = DESIGN_CONTENT[key] || {};
  const logo = useUrl(files?.logo, form.logo);
  const image = useUrl(files?.image, form.image);
  const [defBg, defText] = designColors(key, section);

  const defaultLinks = [
    { label: "Home", hasDropdown: false },
    { label: "About", hasDropdown: false },
    { label: "Services", hasDropdown: false },
    { label: "Blog", hasDropdown: false },
    { label: "Pages", hasDropdown: true },
    { label: "Contact", hasDropdown: false },
  ];

  const links = (form.links?.length ? form.links : (c.links ? c.links.map((label) => ({ label })) : defaultLinks))
    .filter((l) => l.isActive !== false)
    .map((l, i) => ({ ...l, label: l.label || `Link ${i + 1}` }));

  const ctx = {
    d, c, form, logo, image, links, isRtl,
    brand: form.brandName || c.brand,
    bg: form.bgColor || defBg,
    text: form.textColor || defText,
  };

  let body = null;
  if (section === "header") {
    const H = HEADERS[key] || HeaderBusiness;
    body = <H ctx={ctx} />;
  } else if (section === "hero") {
    const H = HEROES[key] || HeroBusiness;
    body = <H ctx={ctx} />;
  } else if (section === "info") {
    const Component = INFO_SECTIONS[key] || InfoBusiness;
    body = <Component ctx={ctx} />;
  } else if (SIMPLE[section]) {
    const S = VARIANT_SECTIONS[section]?.[key] || SIMPLE[section];
    body = <S ctx={ctx} />;
  }

  return (
    <div key={`${section}-${key}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
      <style>{KF}</style>
      <Chrome />
      {body}
    </div>
  );
}

function VariantThumbnail({ variant, design }) {
  const photo = {
    business: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=420&auto=format&fit=crop&q=70",
    corporate: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=420&auto=format&fit=crop&q=70",
    "corporate-red": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=420&auto=format&fit=crop&q=70",
    construction: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=420&auto=format&fit=crop&q=70",
  }[variant];

  if (variant === "business") {
    return (
      <div className="relative h-[72px] w-full overflow-hidden bg-white">
        <div className="absolute inset-y-0 end-0 w-[58%] bg-cover bg-center" style={{ backgroundImage: `url(${photo})`, clipPath: "polygon(22% 0,100% 0,100% 100%,0 100%,10% 70%,0 50%,10% 30%)" }} />
        <div className="absolute inset-y-0 start-0 z-10 flex w-[55%] flex-col justify-center gap-1 px-2">
          <span className="h-1 w-6 rounded-full" style={{ background: design.accent }} />
          <span className="h-1.5 w-full rounded-sm bg-slate-800" />
          <span className="h-1.5 w-4/5 rounded-sm bg-slate-800" />
          <span className="mt-1 h-3 w-9 rounded-full bg-slate-100" />
        </div>
      </div>
    );
  }

  if (variant === "corporate") {
    return (
      <div className="relative flex h-[72px] w-full flex-col items-center justify-center gap-1 overflow-hidden bg-cover bg-center px-2" style={{ backgroundImage: `linear-gradient(rgba(11,42,107,.66),rgba(11,42,107,.78)),url(${photo})` }}>
        <span className="z-10 h-2 w-3/4 rounded-sm bg-white" />
        <span className="z-10 h-1 w-1/2 rounded-sm bg-white/80" />
        <span className="z-10 mt-1 h-3 w-12 border border-white" />
      </div>
    );
  }

  if (variant === "corporate-red") {
    return (
      <div className="relative flex h-[72px] w-full items-center overflow-hidden bg-[#1b2470] px-2">
        <div className="z-10 flex w-[53%] flex-col gap-1">
          <span className="h-1.5 w-full rounded-sm bg-white" />
          <span className="h-1.5 w-4/5 rounded-sm bg-white" />
          <span className="mt-1 h-3 w-9 rounded-sm" style={{ background: design.accent }} />
        </div>
        <div className="absolute end-[17%] top-1 h-14 w-9 rounded-t-full bg-cover bg-center" style={{ backgroundImage: `url(${photo})` }} />
        <div className="absolute end-1 top-3 h-6 w-6 border-2 border-[#1b2470] bg-cover bg-center" style={{ backgroundImage: `url(${photo})` }} />
        <span className="absolute bottom-1 end-[20%] h-4 w-6 rounded-full" style={{ background: design.accent }} />
      </div>
    );
  }

  return (
    <div className="relative flex h-[72px] w-full items-center overflow-hidden bg-cover bg-center px-2" style={{ backgroundImage: `url(${photo})` }}>
      <div className="absolute inset-0 bg-white/10" />
      <div className="relative z-10 w-[65%]">
        <div className="bg-[#1f2d45] px-1.5 py-1 text-center">
          <span className="block h-1.5 w-full rounded-sm" style={{ background: design.accent }} />
          <span className="mt-0.5 block h-1 w-4/5 rounded-sm" style={{ background: design.accent }} />
        </div>
        <div className="mx-auto h-4 w-[80%]" style={{ background: design.accent }} />
      </div>
    </div>
  );
}

export function VariantField({ value, onChange, lang }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {DESIGN_KEYS.map((k) => {
        const d = DESIGNS[k] || {};
        const selected = (value || "business") === k;
        return (
          <button
            key={k}
            type="button"
            onClick={() => onChange(k)}
            aria-pressed={selected}
            className={`relative flex min-w-0 flex-col gap-2 overflow-hidden rounded-xl border p-2 text-start transition-all hover:-translate-y-0.5 hover:shadow-md ${
              selected ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20" : "border-slate-200 bg-white"
            }`}
          >
            <VariantThumbnail variant={k} design={d} />
            <span className="flex w-full items-center justify-between gap-1 px-0.5">
              <span className="truncate text-xs font-extrabold text-slate-800">{d.name?.[lang === "ar" ? "ar" : "en"] || k}</span>
              <span className="flex shrink-0 gap-0.5">
                {[d.bg, d.accent].map((col, i) => (
                  <span key={i} className="h-2.5 w-2.5 rounded-full border border-slate-200" style={{ background: col }} />
                ))}
              </span>
            </span>
            {selected && <Check className="absolute end-2 top-2 h-3.5 w-3.5 text-blue-600" />}
          </button>
        );
      })}
    </div>
  );
}