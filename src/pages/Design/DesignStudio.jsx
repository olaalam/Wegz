import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { ArrowUpRight, Layers, Eye, Palette, Sparkles } from "lucide-react";
import { useGet } from "../../hooks/useGet";

import { GROUPS } from "./sectionsConfig";
import SectionModal from "./SectionModal";


const tint = (hex, a = "15") => `${hex}${a}`;

function Stat({ icon: Icon, label, value, color }) {
  return (
    <div className="group relative flex items-center gap-3.5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100/80 text-slate-700 transition-colors duration-300 group-hover:bg-slate-900 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="text-xl font-bold tracking-tight text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function SectionCard({ item, records, lang, onClick }) {
  const Icon = item.icon;
  const total = records.length;
  const visible = records.filter((r) => r.isVisible).length;
  const isRtl = lang === "ar";

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 text-start shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {/* Background Hover Glow Effect */}
      <div 
        className="pointer-events-none absolute -end-12 -top-12 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: item.color }}
      />

      <div>
        <div className="flex items-start justify-between">
          <span
            className="flex h-13 w-13 items-center justify-center rounded-2xl shadow-inner transition-transform duration-300 group-hover:scale-110"
            style={{ background: tint(item.color), color: item.color }}
          >
            <Icon className="h-6.5 w-6.5" />
          </span>
          
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
            <ArrowUpRight
              className={`h-4 w-4 text-slate-400 transition-transform duration-300 group-hover:text-white ${
                isRtl ? "group-hover:-translate-x-0.5 -scale-x-100" : "group-hover:translate-x-0.5"
              } group-hover:-translate-y-0.5`}
            />
          </div>
        </div>

        <h3 className="mt-5 text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600">
          {item.title[lang]}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">{item.desc[lang]}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
        <span className="font-semibold text-slate-600">
          {total} {lang === "ar" ? "عناصر" : total === 1 ? "item" : "items"}
        </span>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            visible ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${visible ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
          {visible
            ? lang === "ar" ? "نشط" : "Live"
            : lang === "ar" ? "غير نشط" : "Inactive"}
        </span>
      </div>
    </button>
  );
}

function Skeleton() {
  return <div className="h-[210px] animate-pulse rounded-3xl border border-slate-200/60 bg-slate-100/80" />;
}

export default function DesignStudio() {
  const lang = useSelector((s) => s.ui.lang) === "ar" ? "ar" : "en";
  const isRtl = lang === "ar";
  const [active, setActive] = useState(null);

  const { data, loading, error, refetch } = useGet("/api/admin/dashboard/sections");
  const sections = data?.sections || {};

  const stats = useMemo(() => {
    const all = Object.values(sections).flat();
    return {
      sections: GROUPS.reduce((n, g) => n + g.items.length, 0),
      items: all.length,
      live: all.filter((r) => r.isVisible).length,
    };
  }, [sections]);

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#F8FAFC]">
      {/* Header Bar */}
      <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                {isRtl ? "استوديو التصميم" : "Design Studio"}
              </h1>
              <Sparkles className="h-5 w-5 text-blue-600" />
            </div>
            <p className="mt-1 text-xs font-medium text-slate-500">
              {isRtl ? "تحكمي بكل مرونة في شكل الموقع وتصميم أقسامه ومحتواه" : "Manage your site's look, layout and content"}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Stat icon={Layers} label={isRtl ? "الأقسام" : "Sections"} value={loading ? "–" : stats.sections} />
            <Stat icon={Palette} label={isRtl ? "العناصر" : "Items"} value={loading ? "–" : stats.items} />
            <Stat icon={Eye} label={isRtl ? "النشطة" : "Live"} value={loading ? "–" : stats.live} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-20">
        {error && !loading && (
          <div className="mt-8 flex items-center justify-between rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-xs font-semibold text-rose-700">
            <span>{error}</span>
            <button onClick={() => refetch()} className="rounded-lg bg-rose-600 px-3 py-1.5 text-white shadow hover:bg-rose-700">
              {isRtl ? "إعادة المحاولة" : "Retry"}
            </button>
          </div>
        )}

        {GROUPS.map((group) => (
          <section key={group.title.en} className="mt-12">
            <div className="mb-5 flex items-center gap-3">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                {group.title[lang]}
              </h2>
              <span className="h-px flex-1 bg-slate-200/80" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {group.items.map((item) =>
                loading ? (
                  <Skeleton key={item.key} />
                ) : (
                  <SectionCard
                    key={item.key}
                    item={item}
                    lang={lang}
                    records={sections[item.key] || []}
                    onClick={() => setActive(item)}
                  />
                )
              )}
            </div>
          </section>
        ))}
      </div>

      {active && <SectionModal item={active} lang={lang} onClose={() => setActive(null)} />}
    </div>
  );
}