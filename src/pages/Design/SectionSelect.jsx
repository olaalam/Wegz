import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  SlidersHorizontal,
  Layers,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useGet } from "../../hooks/useGet";
import { useMutation } from "../../hooks/useMutation";
import { SECTION_MAP, DESIGNS, DESIGN_KEYS, resolveVariant } from "./sectionsConfig";
import SectionDesignPreview from "./DesignPreview";

export default function SectionSelect() {
  const { section } = useParams();
  const lang = useSelector((s) => s.ui.lang) === "ar" ? "ar" : "en";
  const isRtl = lang === "ar";
  const cfg = SECTION_MAP[section];

  const { data, loading, error, refetch } = useGet(`/api/admin/sections/${section}`);
  const { mutate, loading: activating } = useMutation();

  const records = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.sections)) return data.sections;
    if (data.data && typeof data.data === "object") return [data.data];
    return [];
  }, [data]);

  // ترتيب ثابت: business → corporate → corporate-red → construction
  const sorted = useMemo(
    () =>
      [...records].sort(
        (a, b) =>
          DESIGN_KEYS.indexOf(resolveVariant(section, a)) -
          DESIGN_KEYS.indexOf(resolveVariant(section, b))
      ),
    [records, section]
  );

  const handleSetActive = async (record) => {
    if (record.isVisible) return;
    const res = await mutate(`/api/admin/sections/${section}/${record._id}`, "PATCH", {
      isVisible: true,
    });
    if (res.success) {
      toast.success(isRtl ? "تم تفعيل هذا التصميم في الموقع بنجاح" : "Design activated successfully");
      refetch();
    } else {
      toast.error(res.error || (isRtl ? "فشل التفعيل" : "Activation failed"));
    }
  };

  if (!cfg) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-bold text-slate-500">Section not found</p>
      </div>
    );
  }

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
          <Link
            to="/admin/website/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 transition hover:bg-slate-50"
          >
            {isRtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Link>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: `${cfg.color}15`, color: cfg.color }}
          >
            <cfg.icon className="h-4 w-4" />
          </span>
          <div>
            <h1 className="text-base font-bold text-slate-900">
              {isRtl ? `تصاميم ${cfg.title.ar}` : `${cfg.title.en} Designs`}
            </h1>
            <p className="text-xs text-slate-500">
              {isRtl ? "اختاري التصميم المعروض في الموقع" : "Pick the design shown on your site"}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {loading ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 animate-pulse rounded-3xl border border-slate-200 bg-slate-100" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50/50 p-8 text-center text-sm font-semibold text-rose-600">
            {error}
          </div>
        ) : sorted.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <Layers className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-base font-bold text-slate-800">
              {isRtl ? "مفيش تصاميم لسه" : "No designs yet"}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {isRtl
                ? "من استوديو التصميم اضغطي «إعادة ضبط التصاميم» عشان تتعمل الـ 4 تصاميم"
                : "Use “Reset designs” in Design Studio to create the 4 designs"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {sorted.map((item) => {
              const d = DESIGNS[resolveVariant(section, item)];
              const isActive = item.isVisible;
              return (
                <div
                  key={item._id}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${
                    isActive
                      ? "border-emerald-500/80 ring-2 ring-emerald-500/20"
                      : "border-slate-200/90 hover:border-blue-400"
                  }`}
                >
                  {isActive && (
                    <div className="absolute start-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold text-white shadow-md">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                      {isRtl ? "المفعل حالياً" : "Currently Live"}
                    </div>
                  )}

                  <div className="border-b border-slate-100 bg-slate-50/70 p-5">
                    <SectionDesignPreview section={section} form={item} isRtl={isRtl} />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-slate-900">{d.name[lang]}</h3>
                      <span className="flex gap-1">
                        {[d.bg, d.accent, d.alt].map((c, i) => (
                          <span key={i} className="h-3 w-3 rounded-full border border-slate-200" style={{ background: c }} />
                        ))}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{d.desc[lang]}</p>

                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <Link
                        to={`/admin/website/${section}/settings?id=${item._id}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-blue-600 active:scale-95"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                        {isRtl ? "تخصيص" : "Customize"}
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleSetActive(item)}
                        disabled={isActive || activating}
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition active:scale-95 ${
                          isActive
                            ? "cursor-default border border-emerald-200/60 bg-emerald-50 text-emerald-700"
                            : "bg-slate-900 text-white shadow-md hover:bg-blue-600"
                        }`}
                      >
                        {isActive ? (
                          <>
                            <Check className="h-4 w-4" />
                            {isRtl ? "التصميم المعتمد" : "Current Active"}
                          </>
                        ) : (
                          <>
                            {isRtl ? "اختيار هذا التصميم" : "Select & Activate"}
                            {isRtl ? <ArrowLeft className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}