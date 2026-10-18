import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, ChevronRight, ChevronLeft, LayoutTemplate, SlidersHorizontal, Sparkles, PlusCircle } from "lucide-react";

export default function SectionModal({ item, lang, onClose }) {
  const navigate = useNavigate();
  const isRtl = lang === "ar";
  const Arrow = isRtl ? ChevronLeft : ChevronRight;
  const Icon = item.icon;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const options = [
    {
      icon: PlusCircle,
      label: isRtl ? `إضافة ${item.title.ar} جديد` : `Add New ${item.title.en}`,
      hint: isRtl ? "إنشاء نسخة جديدة وإضافتها إلى الموقع" : "Create and configure a new record",
      path: `/admin/website/${item.key}/add`,
      badge: isRtl ? "جديد" : "New",
    },
    {
      icon: LayoutTemplate,
      label: isRtl ? `اختيار ${item.title.ar}` : `Select ${item.title.en}`,
      hint: isRtl ? "اختاري التصميم المعروض في الموقع" : "Choose which design is shown on your site",
      path: `/admin/website/${item.key}/select`,
      badge: isRtl ? "تصاميم جاهزة" : "Templates",
    },
    {
      icon: SlidersHorizontal,
      label: isRtl ? `إعدادات ${item.title.ar}` : `${item.title.en} Settings`,
      hint: isRtl ? "عدّلي المحتوى والألوان والإعدادات" : "Edit content, colors and options",
      path: `/admin/website/${item.key}/settings`,
      badge: isRtl ? "تخصيص" : "Customize",
    },
  ];

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md transition-all duration-300 animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white/95 p-6 shadow-2xl shadow-slate-900/20 backdrop-blur-xl transition-all duration-300 animate-in zoom-in-95 slide-in-from-bottom-4 sm:p-7"
      >
        {/* Background Subtle Gradient Glow */}
        <div 
          className="pointer-events-none absolute -top-24 -end-24 h-48 w-48 rounded-full opacity-20 blur-3xl"
          style={{ background: item.color }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 end-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/80 text-slate-400 transition-all duration-200 hover:bg-slate-200 hover:text-slate-700 active:scale-90"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-inner transition-transform duration-300 hover:scale-105"
            style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
          >
            <Icon className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">{item.title[lang]}</h3>
              <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
            </div>
            <p className="mt-0.5 text-xs font-medium text-slate-500">{item.desc[lang]}</p>
          </div>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {options.map((o) => {
            const OIcon = o.icon;
            return (
              <button
                key={o.path}
                onClick={() => navigate(o.path)}
                className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 text-start transition-all duration-200 hover:border-blue-400 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 active:scale-[0.99]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-500/30">
                  <OIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                </span>
                
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="block text-sm font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                      {o.label}
                    </span>
                    <span className="rounded-full bg-slate-200/60 px-2 py-0.5 text-[10px] font-semibold text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600">
                      {o.badge}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-slate-500">{o.hint}</span>
                </span>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent transition-all duration-200 group-hover:bg-blue-50">
                  <Arrow className="h-4 w-4 text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-blue-600" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}