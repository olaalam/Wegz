// ════════════════════════════════════════════════════════════════════════════
// 1) Imports (في أول SectionSettings.jsx)
// ════════════════════════════════════════════════════════════════════════════
// import { Fragment, useEffect, useMemo, useState } from "react";
// import { SECTION_MAP, GYM_PRESETS, RESTAURANT_PRESETS, BUSINESS_PRESETS } from "./sectionsConfig";

// ════════════════════════════════════════════════════════════════════════════
// 2) امسحي HeaderPreview القديمة (من سطر 291 لحد قبل export default)
//    وحطي بداله كل اللي تحت ده
// ════════════════════════════════════════════════════════════════════════════

const HEADER_KEYFRAMES = `
@keyframes hdrDrop  { from { opacity:0; transform:translateY(-14px) } to { opacity:1; transform:translateY(0) } }
@keyframes hdrPop   { 0% { opacity:0; transform:scale(.6) } 70% { transform:scale(1.1) } 100% { opacity:1; transform:scale(1) } }
@keyframes hdrFloat { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-4px) } }
@keyframes hdrShine { from { transform:translateX(-150%) skewX(-20deg) } to { transform:translateX(450%) skewX(-20deg) } }
@keyframes hdrBlob  { 0%,100% { border-radius:60% 40% 55% 45% / 55% 45% 60% 40% } 50% { border-radius:40% 60% 45% 55% / 45% 55% 40% 60% } }
@keyframes hdrFade  { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:none } }
`;

// ─── Restaurant header: شعار دايري في النص + الروابط مقسومة يمين وشمال ───────
function RestaurantHeader({ brandName, logoPreview, links, isRtl }) {
  const [active, setActive] = useState(0);
  const accent = "#9b1c1c";
  const items = links.slice(0, 6);
  const half = Math.ceil(items.length / 2);
  const groups = [items.slice(0, half), items.slice(half)];

  const renderGroup = (group, offset) =>
    group.map((l, k) => {
      const i = offset + k;
      return (
        <Fragment key={i}>
          <button
            type="button"
            onClick={() => setActive(i)}
            className="group relative shrink-0 text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-300"
            style={{ color: active === i ? accent : "#2b2b2b" }}
          >
            {l.label || `Link ${i + 1}`}
            <span
              className="absolute -bottom-1 start-0 h-[2px] rounded-full transition-all duration-300 group-hover:w-full"
              style={{ backgroundColor: accent, width: active === i ? "100%" : 0 }}
            />
          </button>
          {k < group.length - 1 && (
            <span
              className="h-1 w-1 shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
            />
          )}
        </Fragment>
      );
    });

  return (
    <div
      key="restaurant"
      className="relative overflow-hidden px-4 pb-8 pt-8"
      style={{ backgroundColor: "#fff6df" }}
    >
      {/* زخرفة خفيفة */}
      <span className="absolute -start-4 top-6 h-14 w-14 rounded-full bg-[#9b1c1c]/10 blur-[1px] animate-[hdrFloat_5s_ease-in-out_infinite]" />
      <span className="absolute -end-3 top-16 h-10 w-10 rounded-full bg-[#9b1c1c]/10 animate-[hdrFloat_6s_ease-in-out_infinite]" />

      <div
        className="relative mx-auto flex max-w-full items-center justify-center gap-4 rounded-md bg-white px-4 py-5 shadow-[0_10px_30px_-10px_rgba(155,28,28,0.35)] animate-[hdrDrop_0.6s_ease-out_both]"
      >
        <nav className="flex min-w-0 flex-1 items-center justify-end gap-3">
          {renderGroup(groups[0], 0)}
        </nav>

        {/* الشعار الدايري اللي بيطلع برا الهيدر */}
        <div className="group relative -my-9 shrink-0 animate-[hdrPop_0.7s_0.2s_ease-out_both]">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] animate-[hdrFloat_4s_1s_ease-in-out_infinite]">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt=""
                className="h-12 w-12 object-contain transition-transform duration-700 group-hover:rotate-[360deg]"
              />
            ) : (
              <div className="text-center leading-tight transition-transform duration-700 group-hover:rotate-[360deg]">
                <UtensilsCrossed className="mx-auto h-4 w-4" style={{ color: accent }} />
                <p
                  className="mt-0.5 max-w-[56px] truncate text-[8px] font-black uppercase tracking-wider"
                  style={{ color: accent }}
                >
                  {brandName}
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex min-w-0 flex-1 items-center justify-start gap-3">
          {renderGroup(groups[1], half)}
        </nav>
      </div>

      <div className="relative mt-10 text-center animate-[hdrFade_0.8s_0.5s_ease-out_both]">
        <p
          className="text-2xl font-bold italic leading-snug"
          style={{ color: accent, fontFamily: "'Brush Script MT','Segoe Script',cursive" }}
        >
          {isRtl ? "الأكل الحلو بيحسّن المزاج" : "Good food makes great mood"}
        </p>
      </div>
    </div>
  );
}

// ─── Business header: كبسولة بيضا + CTA متدرّج + blob متحرك ────────────────
function BusinessHeader({ brandName, logoPreview, links, isRtl }) {
  const [active, setActive] = useState(0);
  const items = links.slice(0, 5);

  return (
    <div key="business" className="relative overflow-hidden bg-white px-4 pb-6 pt-5">
      {/* blob خلفية متحرك */}
      <div className="absolute -end-10 top-10 h-44 w-52 bg-gradient-to-br from-emerald-100 to-teal-200 opacity-80 animate-[hdrBlob_8s_ease-in-out_infinite]" />

      <div className="relative mx-auto flex items-center justify-between gap-3 rounded-full bg-white px-4 py-2.5 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.28)] ring-1 ring-slate-100 animate-[hdrDrop_0.6s_ease-out_both]">
        <div className="group flex shrink-0 items-center gap-2">
          {logoPreview ? (
            <img src={logoPreview} alt="" className="h-8 w-8 object-contain transition-transform duration-500 group-hover:scale-110" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-xs font-black text-white transition-transform duration-500 group-hover:rotate-12">
              {brandName?.[0]?.toUpperCase() || "B"}
            </div>
          )}
          <span className="text-sm font-black tracking-tight text-slate-900">{brandName}</span>
        </div>

        <nav className="hidden min-w-0 items-center gap-1 sm:flex">
          {items.map((l, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                active === i
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {l.label || `Link ${i + 1}`}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="group relative shrink-0 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-[11px] font-bold text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <span className="pointer-events-none absolute inset-y-0 start-0 w-1/4 bg-white/30 opacity-0 group-hover:animate-[hdrShine_0.9s_ease] group-hover:opacity-100" />
          <span className="relative">{isRtl ? "استشارة مجانية" : "Free Consultation"}</span>
        </button>
      </div>

      <div className="relative mt-8 max-w-[60%] space-y-2 animate-[hdrFade_0.8s_0.4s_ease-out_both]">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">
          {isRtl ? "فريق خبراء" : "We are expert team"}
        </p>
        <p className="text-lg font-black leading-snug text-slate-900">
          {isRtl ? "بنصنع منتجات بتخلّي الحياة أسهل وأحسن" : "We create products that make lives easier & better."}
        </p>
        <span className="inline-block rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-teal-700 shadow-md">
          {isRtl ? "إزاي بنشتغل؟" : "How it works?"}
        </span>
      </div>
    </div>
  );
}

// ─── الهيدر القديم (Gym / Default) زي ما هو ─────────────────────────────────
function ClassicHeader({ form, logoPreview, links, isRtl, isGymHeader }) {
  const [rotatingLink, setRotatingLink] = useState(null);
  const bgColor = form?.bgColor || "#111312";
  const textColor = form?.textColor || "#f5f6f2";
  const brandName = form?.brandName || "GYM";

  return (
    <div
      className="flex items-center justify-between px-5 py-3.5 transition-all duration-300"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="group flex items-center gap-2">
        {logoPreview ? (
          <img
            src={logoPreview}
            alt=""
            className={`h-8 w-8 rounded-lg object-contain ${isGymHeader ? "transition-transform duration-700 group-hover:rotate-[360deg]" : ""}`}
          />
        ) : (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black"
            style={{ backgroundColor: textColor + "18", color: textColor }}
          >
            {isGymHeader ? (
              <Dumbbell className="h-5 w-5 transition-transform duration-700 group-hover:rotate-[360deg]" />
            ) : (
              brandName[0]?.toUpperCase() || "B"
            )}
          </div>
        )}
        <span className="text-sm font-extrabold tracking-tight">{brandName}</span>
      </div>

      <div className={`${isGymHeader ? "flex" : "hidden sm:flex"} min-w-0 items-center gap-4 text-[11px] font-semibold opacity-85 ${isGymHeader ? "ms-8 max-w-[48%] overflow-x-auto whitespace-nowrap scrollbar-none" : ""}`}>
        {links.length > 0 ? (
          links.slice(0, isGymHeader ? 7 : 4).map((l, i) =>
            isGymHeader ? (
              <button
                key={i}
                type="button"
                onClick={() => setRotatingLink(i)}
                onAnimationEnd={() => setRotatingLink(null)}
                className={`shrink-0 transition-colors hover:text-[#c8f169] ${rotatingLink === i ? "animate-[spin_0.55s_ease-in-out]" : ""}`}
              >
                {l.label || `Link ${i + 1}`}
              </button>
            ) : (
              <span key={i}>{l.label || `Link ${i + 1}`}</span>
            )
          )
        ) : (
          <>
            <span>{isRtl ? "الرئيسية" : "Home"}</span>
            <span>{isRtl ? "الحصص" : "Classes"}</span>
            <span>{isRtl ? "المدربون" : "Coaches"}</span>
          </>
        )}
      </div>

      <span
        className="rounded-lg px-3 py-1 text-[11px] font-bold shadow-sm"
        style={{ backgroundColor: "#c8f169", color: "#111312" }}
      >
        {isGymHeader
          ? isRtl ? "احصل على تذكرتك" : "Get Your Free Pass"
          : isRtl ? "ابدأ" : "Get Started"}
      </span>
    </div>
  );
}

// ─── Dispatcher ──────────────────────────────────────────────────────────────
function HeaderPreview({ form, files, isRtl }) {
  const logoPreview = useMemo(() => {
    if (files?.logo) return URL.createObjectURL(files.logo);
    if (!form?.logo) return null;
    return /^(https?:|blob:)/.test(form.logo)
      ? form.logo
      : `${import.meta.env.VITE_API_URL || ""}${form.logo}`;
  }, [files?.logo, form?.logo]);

  const isGymHeader = form?.brandName === GYM_PRESETS.header.match.brandName;
  const isRestaurantHeader = form?.brandName === RESTAURANT_PRESETS.header.match.brandName;
  const isBusinessHeader = form?.brandName === BUSINESS_PRESETS.header.match.brandName;

  const brandName = form?.brandName || (isRtl ? "اسم البراند" : "Brand");
  const links = (form?.links || []).filter((l) => l.isActive !== false);

  // لو مفيش لينكات، نعرض لينكات افتراضية عشان الشكل يبان
  const fallbackLinks = isRestaurantHeader
    ? ["Home", "Menus", "Order", "About", "Reserve", "More"]
    : ["Home", "About", "Services", "Blog", "Contact"];
  const safeLinks = links.length ? links : fallbackLinks.map((label) => ({ label }));

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
      <style>{HEADER_KEYFRAMES}</style>
      <BrowserChrome />

      {isRestaurantHeader ? (
        <RestaurantHeader brandName={brandName} logoPreview={logoPreview} links={safeLinks} isRtl={isRtl} />
      ) : isBusinessHeader ? (
        <BusinessHeader brandName={brandName} logoPreview={logoPreview} links={safeLinks} isRtl={isRtl} />
      ) : (
        <>
          <ClassicHeader form={form} logoPreview={logoPreview} links={links} isRtl={isRtl} isGymHeader={isGymHeader} />
          <div className="space-y-3 bg-slate-50 px-5 py-6">
            <div className="h-3 w-2/3 rounded-full bg-slate-200" />
            <div className="h-2.5 w-full rounded-full bg-slate-100" />
            <div className="h-2.5 w-5/6 rounded-full bg-slate-100" />
          </div>
        </>
      )}
    </div>
  );
}
