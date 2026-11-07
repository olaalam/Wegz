import { useEffect, useState } from "react";
import {
  Phone,
  Search,
  ArrowRight,
  Check,
  Calculator,
  Truck,
  Lock,
  ShoppingBag,
  Code2,
  Play,
  Wrench,
  ArrowLeft,
  Clock,
  FolderOpen,
} from "lucide-react";
import { SERIF } from "../shared/styles";
import { prefersReducedMotion, Reveal } from "../shared/hooks";
import { Logo, Socials } from "../shared/ui";

export function HeaderCorporate({ ctx }) {
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

// 2) HERO CORPORATE (مطابق لـ image_7f5b21.png)
export function HeroCorporate({ ctx }) {
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

function InfoCorporateIntro({ ctx }) {
  const services = [
    { title: "ACCOUNTING SERVICES", tag: "FINANCIAL FUNCTIONS", icon: Calculator },
    { title: "PURCHASING SERVICES", tag: "MATERIALS DISTRIBUTION", icon: Truck },
    { title: "INTERNAL CONTROLS", tag: "SAFEGUARD ASSETS", icon: Lock },
    { title: "E-COMMERCE ORDERING", tag: "ONLINE PURCHASING", icon: ShoppingBag },
  ];

  return (
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
  );
}

// قسم info بتاع corporate = كروت الخدمات + فيديو/خدمات + المدونة
export function InfoCorporate({ ctx }) {
  return (
    <>
      <InfoCorporateIntro ctx={ctx} />
      <ServicesCorporate ctx={ctx} />
      <BlogCorporate ctx={ctx} />
    </>
  );
}

// ─── CORPORATE NEW SECTIONS (مطابقة لتصميم xtratheme corporate) ──────────────
const CORP_BLUE = "#0b2a6b";
const CORP_ACCENT = "#0a2a9c";

// عنوان آخر كلمة فيه بلون مميز (HOW IT WORKS? → WORKS زرقا)
function TitleLastAccent({ text, accent = CORP_ACCENT }) {
  const raw = String(text || "").trim();
  const m = raw.match(/^(.*?)([?!.:]*)$/);
  const words = (m?.[1] || raw).split(" ").filter(Boolean);
  const tail = m?.[2] || "";
  if (words.length < 2) return <>{raw}</>;
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <span style={{ color: accent }}>{last}</span>
      {tail}
    </>
  );
}

// ─── Info2: How it works (نص + قايمة + 4 كروت مرقّمة بالأرقام الرومانية) ─────
export function Info2Corporate({ ctx }) {
  const { form, c, isRtl } = ctx;
  const L = (en, ar) => (isRtl ? ar : en);

  const steps = [
    { n: "01", roman: "I", title: L("IDEA", "الفكرة"), desc: L("Based on client needs, We will provide some good solutions", "بناءً على احتياجات العميل، هنقدم أفضل الحلول") },
    { n: "02", roman: "II", title: L("DESIGN", "التصميم"), desc: L("Based on client needs, We will provide some good solutions", "بناءً على احتياجات العميل، هنقدم أفضل الحلول") },
    { n: "03", roman: "III", title: L("CREATE", "التنفيذ"), desc: L("Based on client needs, We will provide some good solutions", "بناءً على احتياجات العميل، هنقدم أفضل الحلول") },
    { n: "04", roman: "IV", title: L("EXECUTE", "الإطلاق"), desc: L("Based on client needs, We will provide some good solutions", "بناءً على احتياجات العميل، هنقدم أفضل الحلول") },
  ];
  const checks = [
    L("Create a new idea for client project", "ابتكار فكرة جديدة لمشروع العميل"),
    L("Start designing wire frame in Photoshop", "بدء تصميم الـ wireframe"),
    L("Development and coding overall project", "تطوير وبرمجة المشروع بالكامل"),
    L("Test and execute final project on online server", "اختبار المشروع وإطلاقه على السيرفر"),
  ];

  return (
    <div className="relative overflow-hidden bg-white px-6 py-12" style={{ color: "#111827" }}>
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.05fr]">
        {/* النص + القايمة */}
        <div>
          <Reveal x={isRtl ? 24 : -24} y={0}>
            <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">{L("Work process", "خطوات العمل")}</p>
            <h3 className="mt-2 text-[28px] font-black uppercase leading-tight">
              <TitleLastAccent text={form.heading || c.info2Heading || L("How it works?", "إزاي بنشتغل؟")} />
            </h3>
            <span className="mt-3 block h-[3px] w-12 origin-left" style={{ background: CORP_ACCENT, animation: "dsDraw .8s .3s ease-out backwards" }} />
            <p className="mt-4 text-[11px] leading-[1.9] text-slate-500">
              {form.paragraph || c.info2Paragraph || L("As an example, let’s take the content marketing process. It’s a process you’ll find in every Marketing Department out there. The issue is, it can be rather hectic and chaotic unless the process is clear.", "مثال بسيط: عملية التسويق بالمحتوى، موجودة في كل قسم تسويق. المشكلة إنها ممكن تبقى عشوائية لو الخطوات مش واضحة.")}
            </p>
          </Reveal>

          <ul className="mt-7 space-y-4">
            {checks.map((t, i) => (
              <Reveal as="li" key={i} delay={150 + i * 110} x={isRtl ? 16 : -16} y={0} className="group flex items-center gap-3 text-[11px] font-bold">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500">
                  <Check className="h-3 w-3 text-emerald-500 transition-colors duration-300 group-hover:text-white" strokeWidth={3} />
                </span>
                {t}
              </Reveal>
            ))}
          </ul>
        </div>

        {/* الكروت (عمودين، التاني نازل شوية) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 130} y={28} className={i % 2 ? "sm:mt-12" : ""}>
              <div className="group relative h-full overflow-hidden bg-white p-5 shadow-[0_14px_40px_-16px_rgba(11,42,107,0.28)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_-16px_rgba(11,42,107,0.4)]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute start-3 top-1 select-none text-[78px] font-black leading-none text-slate-100 transition-all duration-500 group-hover:scale-110 group-hover:text-[#0a2a9c]/15"
                  style={{ fontFamily: SERIF }}
                >
                  {s.roman}
                </span>
                <div className="relative pt-9">
                  <h4 className="text-sm font-black">
                    <span className="text-slate-300 transition-colors duration-300 group-hover:text-[#0a2a9c]">{s.n}.</span> {s.title}
                  </h4>
                  <p className="mt-3 text-[10px] leading-relaxed text-slate-500">{s.desc}</p>
                </div>
                <span className="absolute bottom-0 start-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full" style={{ background: CORP_ACCENT }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Services: صورة بفيديو (ديو-تون أزرق) + 3 خدمات بأيقونات ─────────────────
function ServicesCorporate({ ctx }) {
  const { image, isRtl } = ctx;
  const L = (en, ar) => (isRtl ? ar : en);
  const photo = image || "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=75";
  const desc = L("The editor reviews the content to ensure there are no process, Once this is done, it moves to designer.", "المحرر بيراجع المحتوى للتأكد من سلامته، وبعدها بينتقل للمصمم.");
  const items = [
    { icon: Calculator, title: L("Financial Services", "الخدمات المالية") },
    { icon: Code2, title: L("Software Services", "خدمات البرمجيات") },
    { icon: Wrench, title: L("Industrial Services", "الخدمات الصناعية") },
  ];

  return (
    <div className="grid grid-cols-1 bg-white md:grid-cols-[0.95fr_1.1fr]">
      {/* الفيديو */}
      <div className="relative min-h-[300px] overflow-hidden" style={{ background: CORP_BLUE }}>
        <img
          src={photo}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-luminosity"
          style={{ animation: "dsKenBurns 18s ease-in-out infinite alternate" }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 40%, ${CORP_BLUE}cc 100%)` }} />
        <div className="relative z-10 flex h-full min-h-[300px] flex-col items-center justify-center gap-4 text-white">
          <button
            type="button"
            aria-label={L("Play video", "تشغيل الفيديو")}
            className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/50 transition-transform duration-300 hover:scale-110"
          >
            <span className="absolute inset-0 rounded-full border border-white/60" style={{ animation: "dsRing 2.2s ease-out infinite" }} />
            <Play className="h-6 w-6 fill-white" />
          </button>
          <p className="text-center text-[9px] font-semibold uppercase leading-[1.9] tracking-wider" style={{ animation: "dsFade .8s .3s ease-out backwards" }}>
            {L("About our", "عن")}
            <br />
            {L("Business solutions", "حلولنا للأعمال")}
          </p>
        </div>
      </div>

      {/* الخدمات */}
      <div className="flex flex-col justify-center gap-7 px-6 py-8 md:px-10">
        {items.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={i} delay={i * 140} x={isRtl ? -24 : 24} y={0}>
              <div className="group flex items-start gap-5 md:-ms-16">
                <span className="flex h-[58px] w-[58px] shrink-0 items-center justify-center bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#0b2a6b]">
                  <Icon className="h-7 w-7 text-slate-900 transition-colors duration-300 group-hover:text-white" strokeWidth={1.4} />
                </span>
                <div>
                  <h4 className="inline-block border-b border-slate-200 pb-1 text-[15px] font-black">{s.title}</h4>
                  <p className="mt-2 max-w-sm text-[10px] leading-relaxed text-slate-500">{desc}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

// ─── Blog: سلايدر مقالات (autoplay + أسهم) ───────────────────────────────────
function BlogCorporate({ ctx }) {
  const { isRtl } = ctx;
  const L = (en, ar) => (isRtl ? ar : en);
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);

  const posts = [
    { title: L("How to Be Ahead of Stock Changes", "كيف تسبق تغيّرات السوق"), cats: "Tutorials, Uncategorized", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&auto=format&fit=crop&q=75" },
    { title: L("Online Reputation And Management", "السمعة الرقمية وإدارتها"), cats: "Interview, News", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&auto=format&fit=crop&q=75" },
    { title: L("Tips To Move Your Project More Forward", "نصائح لدفع مشروعك للأمام"), cats: "Miscellaneous, Tutorials", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&auto=format&fit=crop&q=75" },
    { title: L("Building Trust With Every Client", "بناء الثقة مع كل عميل"), cats: "Interview, News", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&auto=format&fit=crop&q=75" },
    { title: L("Planning Growth In Uncertain Times", "التخطيط للنمو وقت عدم اليقين"), cats: "News", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700&auto=format&fit=crop&q=75" },
  ];
  const visible = [0, 1, 2].map((i) => posts[(start + i) % posts.length]);
  const move = (n) => setStart((s) => (s + n + posts.length) % posts.length);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = setInterval(() => setStart((s) => (s + 1) % posts.length), 4500);
    return () => clearInterval(t);
  }, [paused, posts.length]);

  const Prev = isRtl ? ArrowRight : ArrowLeft;
  const Next = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-white px-6 pb-12 pt-10" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Reveal className="text-center">
        <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">{L("Latest updates and news", "آخر الأخبار والتحديثات")}</p>
        <h3 className="mt-2 text-[26px] font-black uppercase">
          <TitleLastAccent text={L("From the blog", "من المدونة")} />
        </h3>
      </Reveal>

      <div className="relative mx-auto mt-8 max-w-5xl px-9">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {visible.map((p, i) => (
            <article key={`${start}-${i}`} className="group" style={{ animation: `dsRise .6s ${i * 0.1}s ease-out backwards` }}>
              <div className="relative">
                <div className="h-40 overflow-hidden">
                  <img src={p.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute -bottom-3 start-3 flex items-center gap-2 bg-white px-3 py-1.5 text-[8px] font-medium text-[#0a2a9c] shadow-sm">
                  <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> 1 {L("June", "يونيو")} 2024</span>
                  <span className="flex items-center gap-1"><FolderOpen className="h-2.5 w-2.5" /> {p.cats}</span>
                </div>
              </div>
              <h4 className="mt-6 text-[13px] font-black leading-snug transition-colors duration-300 group-hover:text-[#0a2a9c]">{p.title}</h4>
            </article>
          ))}
        </div>

        <button type="button" onClick={() => move(-1)} aria-label={L("Previous", "السابق")} className="absolute start-0 top-[35%] flex h-8 w-8 items-center justify-center text-slate-400 transition hover:scale-125 hover:text-slate-800">
          <Prev className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => move(1)} aria-label={L("Next", "التالي")} className="absolute end-0 top-[35%] flex h-8 w-8 items-center justify-center text-slate-400 transition hover:scale-125 hover:text-slate-800">
          <Next className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-1.5">
        {posts.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${i + 1}`}
            onClick={() => setStart(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === start ? 20 : 6, background: i === start ? CORP_ACCENT : "#cbd5e1" }}
          />
        ))}
      </div>
    </div>
  );
}

function FooterCol({ title, items, delay }) {
  return (
  <Reveal delay={delay}>
    <h4 className="text-[10px] font-black uppercase tracking-wide">{title}</h4>
    <ul className="mt-4 space-y-2.5">
      {items.map((t, i) => (
        <li key={i} className="flex items-center gap-2 text-[11px] opacity-85 transition-all duration-300 hover:translate-x-1 hover:opacity-100 rtl:hover:-translate-x-1">
          <span className="h-2 w-2 shrink-0 rounded-full border border-white/80" />
          {t}
        </li>
      ))}
    </ul>
  </Reveal>
);
}

// ─── Footer: صورة خلفية زرقا + نيوزليتر + 4 أعمدة + شريط سفلي ───────────────
export function FooterCorporate({ ctx }) {
  const { form, c, links, image, isRtl } = ctx;
  const L = (en, ar) => (isRtl ? ar : en);
  const bgImg = image || "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&auto=format&fit=crop&q=70";

  const useful = [L("Purchase now", "اشترِ الآن"), L("Support", "الدعم"), L("Documentation", "التوثيق"), L("Custom Services", "خدمات مخصصة"), L("Marketplaces", "المتاجر"), L("Portfolio Reviews", "آراء العملاء")];
  const shortcuts = links.slice(0, 6).map((l) => l.label);
  const contact = [L("General enquiries", "استفسارات عامة"), L("Schedule a callback", "حدد موعد اتصال"), L("General FAQ’s", "الأسئلة الشائعة"), L("Get in Touch", "تواصل معنا"), L("Popular Events", "الفعاليات"), L("Reviews", "التقييمات")];

  return (
    <div className="relative overflow-hidden px-6 pb-5 pt-10" style={{ background: ctx.bg || CORP_BLUE, color: ctx.text || "#fff" }}>
      <img src={bgImg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity" style={{ animation: "dsKenBurns 24s ease-in-out infinite alternate" }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${ctx.bg || CORP_BLUE}e6, ${ctx.bg || CORP_BLUE}cc)` }} />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* النيوزليتر */}
        <Reveal className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_1.4fr]">
          <h3 className="text-lg font-light uppercase">
            {L("Subscribe to our", "اشترك في")} <b className="font-black">{L("Newsletter", "نشرتنا البريدية")}</b>
          </h3>
          <div className="flex items-center border border-white/25 bg-white/5 p-1.5 backdrop-blur-sm">
            <input readOnly tabIndex={-1} placeholder={L("Enter your email address please ...", "اكتب بريدك الإلكتروني ...")} className="h-8 min-w-0 flex-1 bg-transparent px-3 text-[10px] text-white outline-none placeholder:text-white/80" />
            <button type="button" className="bg-white px-4 py-2 text-[9px] font-black uppercase transition hover:scale-105 active:scale-95" style={{ color: CORP_BLUE }}>
              {L("Join now", "اشترك")}
            </button>
          </div>
        </Reveal>

        <div className="my-7 h-px origin-left bg-white/20" style={{ animation: "dsDraw 1s ease-out backwards" }} />

        {/* الأعمدة */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.7fr_1fr_1fr_1fr]">
          <Reveal x={isRtl ? 24 : -24} y={0} className="col-span-2 md:col-span-1">
            <Logo ctx={ctx} color={ctx.text || "#fff"} />
            <p className="mt-5 max-w-xs text-[11px] leading-relaxed opacity-85">
              {form.description || c.footerDescription || L("The last theme you will ever have to buy for your business. More powerful and easy to use with incredible features and friendly support.", "كل اللي محتاجه لشغلك في مكان واحد، بإمكانيات قوية وسهلة الاستخدام ودعم ودود.")}
            </p>
            <button type="button" className="mt-5 border border-white/70 px-5 py-2.5 text-[10px] font-bold transition-all duration-300 hover:bg-white active:scale-95 hover:text-[#0b2a6b]">
              {L("Learn more", "اعرف المزيد")}
            </button>
          </Reveal>
          <FooterCol title={L("Useful links", "روابط مفيدة")} items={useful} delay={100} />
          <FooterCol title={L("Shortcuts", "اختصارات")} items={shortcuts} delay={200} />
          <FooterCol title={L("Contact us", "تواصل معنا")} items={contact} delay={300} />
        </div>

        <div className="mb-4 mt-8 h-px origin-left bg-white/20" style={{ animation: "dsDraw 1s .1s ease-out backwards" }} />

        {/* الشريط السفلي */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9px]">
          <span className="opacity-85">{form.copyright || `© Copyright 2026. All Rights Reserved - ${c.brand}.`}</span>
          <div className="flex items-center gap-4">
            <Socials />
            <span className="h-3 w-px bg-white/30" />
            <span className="opacity-85">{L("Advertisement", "إعلانات")}</span>
            <span className="h-3 w-px bg-white/30" />
            <span className="opacity-85">{L("Privacy Policy", "سياسة الخصوصية")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default {
  Header: HeaderCorporate,
  Hero: HeroCorporate,
  Info: InfoCorporate,
  Info2: Info2Corporate,
  Footer: FooterCorporate,
};