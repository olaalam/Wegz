import { useMemo, useState } from "react";
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
          {brand || "XTRA"}
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
        <span>Limited time offer, Buy XTRA WordPress theme only <strong>$39</strong></span>
        <button className="bg-[#59981A] text-white px-2 py-0.5 rounded text-[9px] hover:bg-opacity-90">Download XTRA Theme</button>
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
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Hero background"
          className="h-full w-full object-cover object-center"
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
        <div className="max-w-md space-y-6">
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
    { label: "FAQ'S" },
    { label: "BLOG" },
    { label: "PORTFOLIO", hasDropdown: true },
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
        <div className="space-y-6">
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
          <div className="absolute start-[8%] top-0 z-10 h-[88%] w-[48%] overflow-hidden rounded-t-[120px] shadow-2xl">
            <img
              src={mainImg}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* الصورة العلوية اليمين (مربعة بحواف خفيفة) */}
          <div className="absolute end-[6%] top-[8%] z-20 h-[38%] w-[38%] overflow-hidden rounded-sm shadow-xl">
            <img
              src={secondaryImg}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          {/* الصورة السفليّة اليمين (منحنية القاع rounded-b-full) */}
          <div className="absolute end-[2%] bottom-[0%] z-20 h-[46%] w-[44%] overflow-hidden rounded-b-full shadow-xl">
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
            <span className="text-3xl font-black text-[#e50914]">125+</span>
            <span className="text-xs font-semibold leading-tight text-white/80">
              Happy Private
              <br />
              New Clients
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 py-2">
            <span className="text-3xl font-black text-[#e50914]">400+</span>
            <span className="text-xs font-semibold leading-tight text-white/80">
              Best Partnership
              <br />
              Agreements
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 py-2">
            <span className="text-3xl font-black text-[#e50914]">87%</span>
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
    <div className="bg-[#1f2d45] py-10 px-6 text-white">
      <div className="text-center mb-8">
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
          <div className="rounded-2xl bg-[#34b78f] p-5 text-white shadow-lg">
            <p className="text-[10px] font-extrabold uppercase tracking-widest opacity-80">OUR SERVICES</p>
            <h4 className="mt-2 text-base font-black leading-snug">We Will Help Your Business Growing</h4>
          </div>
          {cards.map((item, idx) => (
            <div key={idx} className="rounded-2xl bg-white p-5 text-slate-800 shadow-sm">
              <item.icon className="h-8 w-8 text-[#34b78f]" />
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
    <div className="bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col justify-between bg-[#0b2a6b] p-6 text-white shadow-md">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest opacity-70">OUR SERVICES</p>
            <h4 className="mt-2 text-xl font-black leading-tight">WHAT WE CAN DO?</h4>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((s, i) => (
            <div key={i} className="flex flex-col justify-between border border-slate-200 bg-white p-5 shadow-sm">
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
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* 1. قسم الصور (جهة اليسار) */}
          <div className="relative mx-auto flex w-full max-w-md items-center justify-center min-h-[420px] lg:max-w-none">
            {/* الصورة الرئيسية الطويلة الدائرية */}
            <div className="relative z-10 h-[380px] w-[58%] overflow-hidden rounded-full shadow-xl sm:h-[440px]">
              <img
                src={mainImg}
                alt="Business Discussion"
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* الصورة البيضاوية المتداخلة جهة اليسار/الأسفل */}
            <div className="absolute left-0 bottom-0 z-20 h-[220px] w-[52%] overflow-hidden rounded-full border-4 border-white shadow-2xl sm:h-[260px]">
              <img
                src={secondaryImg}
                alt="Contract Signing"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* 2. قسم المحتوى والنصوص (جهة اليمين) */}
          <div className="space-y-6">
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
                <span
                  className="text-3xl font-black sm:text-4xl"
                  style={{ color: d?.accent || "#d9082b" }}
                >
                  97%
                </span>
                <p className="mt-1 text-xs font-extrabold text-[#17212b]">
                  Success Rate
                </p>
              </div>

              <div>
                <span
                  className="text-3xl font-black sm:text-4xl"
                  style={{ color: d?.accent || "#d9082b" }}
                >
                  83%
                </span>
                <p className="mt-1 text-xs font-extrabold text-[#17212b]">
                  Repaymnet Rate
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Announcement({ ctx }) {
  const { form, c } = ctx;
  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-full" style={{ background: ctx.bg, color: ctx.text }}>
        <span className="text-xs font-bold">{form.text || c.announcement}</span>
      </div>
    </div>
  );
}

function Info2({ ctx }) {
  const { form, c } = ctx;
  return (
    <div className="flex items-center gap-5 p-6" style={{ background: ctx.bg, color: ctx.text }}>
      <div className="flex-1 space-y-2">
        <h4 className="text-base font-extrabold">{form.heading || c.info2Heading}</h4>
        <p className="text-[11px] opacity-70">{form.paragraph || c.info2Paragraph}</p>
      </div>
    </div>
  );
}

function Testimonials({ ctx }) {
  const { form, c } = ctx;
  return (
    <div className="space-y-3 p-6 text-center" style={{ background: ctx.bg, color: ctx.text }}>
      <h4 className="text-base font-extrabold">{form.heading || c.testiHeading}</h4>
      <p className="text-xs italic opacity-80">“Great experience and professional service!”</p>
    </div>
  );
}

function Contact({ ctx }) {
  const { form, c } = ctx;
  return (
    <div className="p-6" style={{ background: ctx.bg, color: ctx.text }}>
      <h4 className="text-base font-extrabold">{form.heading || c.contactHeading}</h4>
      <p className="text-xs opacity-75">{form.subheading || c.contactSubheading}</p>
    </div>
  );
}

function Footer({ ctx }) {
  const { form, c } = ctx;
  return (
    <div className="p-6 text-xs" style={{ background: ctx.bg, color: ctx.text }}>
      <p>{form.copyright || `Copyright 2026 ${c.brand}. All Rights Reserved.`}</p>
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
  business: InfoBusiness,
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
    brand: form.brandName || c.brand || "XTRA",
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
    const S = SIMPLE[section];
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