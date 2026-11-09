import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Plus,
  Trash2,
  ImagePlus,
  Loader2,
  Save,
  RotateCcw,
  Check,
  Eye,
  Monitor,
  Megaphone,
  ExternalLink,
  Play,
  Sparkles,
  ChevronRight,
  Star,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Quote,
  Tablet,
  Smartphone,
  Layers,
  SlidersHorizontal,
} from "lucide-react";
import { useGet } from "../../hooks/useGet";
import { useMutation } from "../../hooks/useMutation";
import { toast } from "sonner";
import { SECTION_MAP, DESIGNS, DESIGN_KEYS, buildSeed, resolveVariant } from "./sectionsConfig";
import { VariantField, SiteDesignPreview } from "./DesignPreview";

// ─── Shared Styles ─────────────────────────────────────────────────────────────
const inputCls =
  "w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

// ─── Form Components ────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ease-in-out ${
        checked ? "bg-emerald-500" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-200 ease-in-out ${
          checked ? "start-[22px]" : "start-0.5"
        }`}
      />
    </button>
  );
}

function ImageField({ value, file, onFile, lang }) {
  const preview = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    if (!value) return null;
    return /^(https?:|blob:)/.test(value)
      ? value
      : `${import.meta.env.VITE_API_URL || ""}${value}`;
  }, [file, value]);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="group relative flex h-28 w-44 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-blue-400">
        {preview ? (
          <img
            src={preview}
            alt=""
            className="h-full w-full object-cover p-1 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <ImagePlus className="h-8 w-8 text-slate-400 transition-transform group-hover:scale-110" />
        )}
      </div>
      <label className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-blue-600 active:scale-95">
        {preview
          ? lang === "ar"
            ? "تغيير الصورة"
            : "Change image"
          : lang === "ar"
            ? "رفع صورة"
            : "Upload image"}
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => e.target.files[0] && onFile(e.target.files[0])}
        />
      </label>
    </div>
  );
}

const CURATED_PALETTE = [
  "#ffffff", "#000000", "#c8f169", "#3b82f6",
  "#8b5cf6", "#10b981", "#ef4444", "#f59e0b",
  "#06b6d4", "#ec4899", "#1e293b", "#f8fafc",
];

function ColorField({ value, onChange }) {
  const currentColor = value || "#ffffff";
  return (
    <div className="space-y-2.5">
      <div className="flex max-w-sm items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-xs transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
        <label className="group relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 shadow-inner transition hover:scale-105 active:scale-95">
          <span
            className="absolute inset-0 transition-transform group-hover:scale-110"
            style={{ backgroundColor: currentColor }}
          />
          <input
            type="color"
            value={currentColor.startsWith("#") ? currentColor : "#000000"}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </label>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400">HEX</span>
            <input
              value={currentColor}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#FFFFFF"
              className="w-full bg-transparent font-mono text-xs font-bold uppercase text-slate-800 outline-none"
            />
          </div>
        </div>
        <span
          className="rounded-lg px-2 py-1 text-[10px] font-bold border border-slate-200/60 shadow-xs"
          style={{
            backgroundColor: currentColor,
            color:
              currentColor === "#ffffff" ||
              currentColor.toLowerCase() === "#fff" ||
              currentColor === "#f8fafc"
                ? "#0f172a"
                : "#ffffff",
          }}
        >
          Aa
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {CURATED_PALETTE.map((c) => {
          const isSelected = currentColor.toLowerCase() === c.toLowerCase();
          return (
            <button
              key={c}
              type="button"
              onClick={() => onChange(c)}
              className={`h-6 w-6 rounded-lg border transition-all hover:scale-110 active:scale-90 ${
                isSelected
                  ? "border-blue-600 ring-2 ring-blue-500/30 scale-105"
                  : "border-slate-200/80 hover:border-slate-400"
              }`}
              style={{ backgroundColor: c }}
              title={c}
            />
          );
        })}
      </div>
    </div>
  );
}

function LinksField({ value, onChange, lang }) {
  const links = value || [];
  const set = (i, patch) =>
    onChange(links.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  return (
    <div className="space-y-3 w-full">
      {links.map((l, i) => (
        <div
          key={i}
          className="flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
        >
          <input
            className={inputCls}
            placeholder={lang === "ar" ? "الاسم" : "Label"}
            value={l.label || ""}
            onChange={(e) => set(i, { label: e.target.value })}
          />
          <input
            className={inputCls}
            placeholder="/url"
            value={l.url || ""}
            onChange={(e) => set(i, { url: e.target.value })}
          />
          <div className="flex items-center justify-between w-full sm:w-auto gap-4 px-2">
            <Toggle
              checked={l.isActive !== false}
              onChange={(v) => set(i, { isActive: v })}
            />
            <button
              type="button"
              onClick={() =>
                onChange(
                  links
                    .filter((_, idx) => idx !== i)
                    .map((x, n) => ({ ...x, order: n + 1 }))
                )
              }
              className="rounded-xl p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 active:scale-90"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([
            ...links,
            { label: "", url: "", isActive: true, order: links.length + 1 },
          ])
        }
        className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-600 transition hover:bg-blue-100 active:scale-95"
      >
        <Plus className="h-4 w-4" />
        {lang === "ar" ? "إضافة رابط" : "Add link"}
      </button>
    </div>
  );
}

function Field({ field, value, onChange, lang, file, onFile }) {
  switch (field.type) {
    case "toggle":
      return <Toggle checked={!!value} onChange={onChange} />;
    case "color":
      return <ColorField value={value} onChange={onChange} />;
    case "image":
      return (
        <ImageField value={value} file={file} onFile={onFile} lang={lang} />
      );
    case "links":
      return <LinksField value={value} onChange={onChange} lang={lang} />;
    case "variant":
      return <VariantField value={value} onChange={onChange} lang={lang} />;
    case "textarea":
      return (
        <textarea
          rows={3}
          className={`${inputCls} min-h-[90px] resize-y`}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    default:
      return (
        <input
          className={inputCls}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}

function FormSkeleton() {
  return (
    <div className="space-y-6 p-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded-md bg-slate-200" />
          <div className="h-12 w-full animate-pulse rounded-2xl bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default function SectionSettings() {
  const { section } = useParams();
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get("id");

  const lang = useSelector((s) => s.ui.lang) === "ar" ? "ar" : "en";
  const isRtl = lang === "ar";
  const cfg = SECTION_MAP[section];

  const { data, loading, error, refetch } = useGet(`/api/admin/sections/${section}`);
  const { mutate, loading: saving } = useMutation();

  // كل السكاشن (عشان المعاينة تعرض الموقع كامل بنفس الثيم)
  const { data: allData, refetch: refetchAll } = useGet("/api/admin/dashboard/sections");
  const allSections = useMemo(() => {
    const s = allData?.sections || allData?.data?.sections || allData?.data || {};
    return s && typeof s === "object" && !Array.isArray(s) ? s : {};
  }, [allData]);
  const refresh = () => {
    refetch();
    refetchAll();
  };

  const [device, setDevice] = useState("desktop"); // desktop | tablet | mobile
  const [focus, setFocus] = useState(false); // false = الموقع كامل، true = القسم بس
  const [mobileTab, setMobileTab] = useState("form"); // form | preview (على الموبايل بس)

  const records = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.sections)) return data.sections;
    if (data.data && typeof data.data === "object") return [data.data];
    return [];
  }, [data]);
  const [selectedId, setSelectedId] = useState(null);
  const [pendingId, setPendingId] = useState(null);

  useEffect(() => {
    if (records.length === 0) {
      setSelectedId(null);
      return;
    }
    if (pendingId) {
      if (records.some((r) => r._id === pendingId)) {
        setSelectedId(pendingId);
        setPendingId(null);
      }
      return;
    }
    if (!selectedId || !records.some((r) => r._id === selectedId)) {
      const fromQuery = queryId && records.find((r) => r._id === queryId);
      const active = records.find((r) => r.isVisible);
      setSelectedId((fromQuery || active || records[0])._id);
    }
  }, [records, section, selectedId, queryId, pendingId]);

  const record = records.find((r) => r._id === selectedId) || records[0];

  const normRecord = useMemo(
    () => (record ? { ...record, variant: resolveVariant(section, record) } : {}),
    [record, section]
  );

  const [form, setForm] = useState({});
  const [baseline, setBaseline] = useState({}); // آخر نسخة محفوظة
  const [files, setFiles] = useState({});

  useEffect(() => {
    setForm(normRecord);
    setBaseline(normRecord);
    setFiles({});
  }, [record?._id, section]);

  // ✅ تم تحديث التحقق من التغييرات ليقوم بمقارنة الحقول الفعلية فقط بدقة وتجنب الإنذارات الكاذبة
  const dirty = useMemo(() => {
    if (Object.keys(files).length > 0) return true;
    if (!cfg || !cfg.fields) return false;

    // isVisible بيتغيّر من "تفعيل في الموقع" فقط، فمش بنحسبه كتغيير في الفورم
    const names = cfg.fields.map((f) => f.name).filter((n) => n !== "isVisible");
    return names.some((n) => JSON.stringify(form[n] ?? "") !== JSON.stringify(baseline[n] ?? ""));
  }, [form, files, baseline, cfg]);

  // الثيم الحالي = تصميم السجل المختار، والفورم الحي بس للسكشن اللي بيتعدّل
  const previewVariant = normRecord.variant || "business";
  const previewForm = form && form._id === record?._id ? form : normRecord;

  if (!cfg) return <div className="p-8 text-slate-600">Section not found</div>;

  const discard = () => {
    setForm(baseline);
    setFiles({});
  };

  const handleSetActive = async (targetRecord) => {
    const res = await mutate(
      `/api/admin/sections/${section}/${targetRecord._id}`,
      "PATCH",
      { isVisible: true }
    );
    if (res.success) {
      toast.success(
        isRtl ? "تم تفعيل هذا التصميم في الموقع بنجاح" : "Preset activated successfully"
      );
      refresh();
    } else {
      const errorMsg =
        typeof res.error === "object"
          ? res.error?.message || res.error?.error || JSON.stringify(res.error)
          : res.error;
      toast.error(errorMsg || (isRtl ? "فشل التفعيل" : "Activation failed"));
    }
  };

  const handleCreateDesign = async (key) => {
    const seed = buildSeed(key, false)[section];
    const res = await mutate(`/api/admin/sections/${section}`, "POST", seed);
    if (res.success) {
      const doc = res.data?.data || res.data;
      toast.success(isRtl ? "تم إنشاء التصميم" : "Design created");
      if (doc?._id) setPendingId(doc._id);
      refresh();
    } else {
      const errorMsg =
        typeof res.error === "object"
          ? res.error?.message || res.error?.error || JSON.stringify(res.error)
          : res.error;
      toast.error(errorMsg || (isRtl ? "فشل الإنشاء" : "Could not create design"));
    }
  };

  const handleDelete = async (targetRecord) => {
    const confirmMsg = isRtl
      ? `هل أنتِ متأكدة من حذف "${targetRecord.brandName || targetRecord.heading || targetRecord.title || targetRecord.copyright || "هذه النسخة"}"؟`
      : `Are you sure you want to delete this preset?`;
    if (!window.confirm(confirmMsg)) return;

    const res = await mutate(
      `/api/admin/sections/${section}/${targetRecord._id}`,
      "DELETE"
    );
    if (res.success) {
      toast.success(isRtl ? "تم الحذف بنجاح" : "Deleted successfully");
      refresh();
    } else {
      const errorMsg =
        typeof res.error === "object"
          ? res.error?.message || res.error?.error || JSON.stringify(res.error)
          : res.error;
      toast.error(errorMsg || (isRtl ? "فشل الحذف" : "Deletion failed"));
    }
  };

  const save = async () => {
    const excludedKeys = ["_id", "__v", "isVisible", "createdAt", "updatedAt", "section", "user", "__t"];
    const formKeys = Object.keys(form).filter((k) => !excludedKeys.includes(k));

    let payload;
    let config = {};

    if (Object.keys(files).length > 0) {
      const fd = new FormData();
      formKeys.forEach((n) => {
        if (files[n]) {
          fd.append(n, files[n]);
        } else if (form[n] !== undefined && form[n] !== null) {
          fd.append(
            n,
            typeof form[n] === "object" ? JSON.stringify(form[n]) : form[n]
          );
        }
      });
      Object.keys(files).forEach((n) => {
        if (!formKeys.includes(n) && files[n]) {
          fd.append(n, files[n]);
        }
      });
      payload = fd;
      config = { headers: { "Content-Type": "multipart/form-data" } };
    } else {
      payload = Object.fromEntries(
        formKeys.map((n) => [n, form[n]])
      );
    }

    const url = record
      ? `/api/admin/sections/${section}/${record._id}`
      : `/api/admin/sections/${section}`;
    const res = await mutate(url, record ? "PATCH" : "POST", payload, config);

    if (res.success) {
      toast.success(
        lang === "ar" ? "تم حفظ التغييرات بنجاح" : "Changes saved successfully"
      );
      // لازم نصفّر files ونحدّث النسخة المحفوظة، وإلا الزرار يفضل "فيه تغييرات"
      const doc = res.data?.data || res.data;
      const saved = doc && typeof doc === "object" && doc._id ? doc : {};
      const next = { ...form, ...saved };
      next.variant = resolveVariant(section, next);
      setForm(next);
      setBaseline(next);
      setFiles({});
      refresh();
    } else {
      const errorMsg =
        typeof res.error === "object"
          ? res.error?.message || res.error?.error || JSON.stringify(res.error)
          : res.error;
      toast.error(errorMsg || (isRtl ? "فشل حفظ التغييرات" : "Failed to save changes"));
    }
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link
            to="/admin/website/dashboard"
            className="hover:text-slate-900"
          >
            {isRtl ? "استوديو التصميم" : "Design Studio"}
          </Link>
          <ChevronRight className={`h-3.5 w-3.5 ${isRtl ? "rotate-180" : ""}`} />
          <span className="font-bold text-slate-900">{cfg.title[lang]}</span>
        </div>

        {/* Mobile: تبديل بين الإعدادات والمعاينة */}
        <div className="sticky top-0 z-30 -mx-4 mb-5 border-b border-slate-200/80 bg-[#F8FAFC]/90 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6 lg:hidden">
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-200/60 p-1">
            {[
              { id: "form", icon: SlidersHorizontal, label: isRtl ? "الإعدادات" : "Settings" },
              { id: "preview", icon: Monitor, label: isRtl ? "المعاينة" : "Preview" },
            ].map(({ id, icon: TabIcon, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMobileTab(id)}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition ${
                  mobileTab === id ? "bg-white text-blue-700 shadow-sm" : "text-slate-500"
                }`}
              >
                <TabIcon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column */}
          <div className={`space-y-6 lg:col-span-5 xl:col-span-4 ${mobileTab === "preview" ? "hidden lg:block" : ""}`}>
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
              
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-6 sm:px-8">
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-inner shrink-0"
                    style={{ background: `${cfg.color}15`, color: cfg.color }}
                  >
                    <cfg.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h1 className="text-lg font-extrabold text-slate-900">
                      {cfg.title[lang]}{" "}
                      {isRtl ? "- الإعدادات" : "Settings"}
                    </h1>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                      {cfg.desc[lang]}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/admin/website/${section}/add`}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95 shrink-0"
                >
                  <Plus className="h-4 w-4" />
                  <span>{isRtl ? "إضافة جديد" : "Add New"}</span>
                </Link>
              </div>

              {/* Design Selector */}
              {!loading && records.length > 0 && (
                <div className="border-b border-slate-100 bg-slate-50/60 px-6 sm:px-8 py-4">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {isRtl ? "التصميم" : "Design"}
                    </span>
                    {record &&
                      (record.isVisible ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          {isRtl ? "المعروض حالياً" : "Currently Live"}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSetActive(record)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/80 px-2.5 py-1 text-xs font-bold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
                        >
                          <Check className="h-3.5 w-3.5" />
                          {isRtl ? "تفعيل في الموقع" : "Set as Live"}
                        </button>
                      ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {DESIGN_KEYS.map((k) => {
                      const d = DESIGNS[k];
                      const r = records.find((x) => resolveVariant(section, x) === k);
                      const isSelected = !!r && r._id === selectedId;
                      return (
                        <button
                          key={k}
                          type="button"
                          disabled={saving}
                          onClick={() => {
                            if (r && r._id === selectedId) return;

                            if (r) setSelectedId(r._id);
                            else handleCreateDesign(k);
                          }}
                          className={`relative flex flex-col items-start gap-2 rounded-2xl border p-3 text-start transition-all disabled:cursor-wait disabled:opacity-60 ${
                            isSelected
                              ? "border-blue-500 bg-white shadow-sm ring-2 ring-blue-500/15"
                              : r
                                ? "border-slate-200/80 bg-white/60 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                                : "border-dashed border-slate-300 bg-white/40 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-white"
                          }`}
                        >
                          <span className="flex gap-1">
                            {[d.bg, d.accent, d.alt].map((col, i) => (
                              <span
                                key={i}
                                className="h-3.5 w-3.5 rounded-full border border-slate-200"
                                style={{ background: col }}
                              />
                            ))}
                          </span>
                          <span
                            className={`text-xs font-extrabold ${
                              isSelected ? "text-blue-700" : "text-slate-700"
                            }`}
                          >
                            {d.name[lang]}
                          </span>
                          {!r && (
                            <span className="text-[10px] font-semibold text-blue-600">
                              + {isRtl ? "إنشاء التصميم" : "Create design"}
                            </span>
                          )}
                          {r?.isVisible && (
                            <span className="absolute end-2 top-2 flex items-center gap-1 rounded bg-emerald-100/80 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              LIVE
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Form Fields */}
              {loading ? (
                <FormSkeleton />
              ) : error ? (
                <div className="p-8 text-xs text-rose-600 font-semibold">
                  {error}{" "}
                  <button
                    onClick={() => refetch()}
                    className="underline font-bold"
                  >
                    {isRtl ? "إعادة المحاولة" : "Retry"}
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {cfg.fields.filter((f) => f.name !== "variant" && f.name !== "isVisible").map((f) => (
                    <div
                      key={f.name}
                      className="flex flex-col gap-2.5 px-6 sm:px-8 py-6 transition-colors hover:bg-slate-50/40"
                    >
                      <label className="text-xs font-extrabold text-slate-700">
                        {f.label[lang]}
                      </label>
                      <Field
                        field={f}
                        lang={lang}
                        value={form[f.name]}
                        file={files[f.name]}
                        onFile={(file) =>
                          setFiles((p) => ({ ...p, [f.name]: file }))
                        }
                        onChange={(v) =>
                          setForm((p) => ({ ...p, [f.name]: v }))
                        }
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Save / Discard Bar */}
              {!loading && !error && (
                <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                  <span
                    className={`text-xs font-semibold ${
                      dirty ? "text-amber-600" : "text-slate-400"
                    }`}
                  >
                    {dirty
                      ? isRtl
                        ? "لديكِ تغييرات غير محفوظة"
                        : "You have unsaved changes"
                      : isRtl
                        ? "جميع التغييرات محفوظة"
                        : "All changes saved"}
                  </span>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={discard}
                      disabled={!dirty || saving}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {isRtl ? "تراجع" : "Discard"}
                    </button>
                    <button
                      onClick={save}
                      disabled={!dirty || saving}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      {isRtl ? "حفظ التغييرات" : "Save changes"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live Preview Column */}
          <div
            className={`space-y-3 lg:sticky lg:top-6 lg:col-span-7 xl:col-span-8 ${
              mobileTab === "form" ? "hidden lg:block" : ""
            }`}
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
              {/* Preview Header */}
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3 sm:px-6">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
                    <Monitor className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-extrabold text-slate-900">
                      {isRtl ? "معاينة مباشرة" : "Live Preview"}
                    </p>
                    <p className="truncate text-[10px] text-slate-400">
                      {isRtl
                        ? "الموقع كامل بنفس الثيم، والقسم اللي بتعدّليه بس هو اللي بيتغيّر"
                        : "Full site in this theme — only the section you edit changes"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* الموقع كامل / القسم فقط */}
                  <div className="inline-flex rounded-xl border border-slate-200 bg-white p-0.5 shadow-sm">
                    {[
                      { val: false, icon: Layers, label: isRtl ? "الموقع كامل" : "Full site" },
                      { val: true, icon: Eye, label: isRtl ? "القسم فقط" : "Section only" },
                    ].map(({ val, icon: ModeIcon, label }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setFocus(val)}
                        aria-pressed={focus === val}
                        className={`inline-flex items-center gap-1.5 rounded-[10px] px-2.5 py-1.5 text-[11px] font-bold transition ${
                          focus === val ? "bg-blue-600 text-white shadow" : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        <ModeIcon className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">{label}</span>
                      </button>
                    ))}
                  </div>

                  {/* حجم الشاشة */}
                  <div className="hidden rounded-xl border border-slate-200 bg-white p-0.5 shadow-sm sm:inline-flex">
                    {[
                      { id: "desktop", icon: Monitor, label: isRtl ? "كمبيوتر" : "Desktop" },
                      { id: "tablet", icon: Tablet, label: isRtl ? "تابلت" : "Tablet" },
                      { id: "mobile", icon: Smartphone, label: isRtl ? "موبايل" : "Mobile" },
                    ].map(({ id, icon: DevIcon, label }) => (
                      <button
                        key={id}
                        type="button"
                        title={label}
                        aria-label={label}
                        aria-pressed={device === id}
                        onClick={() => setDevice(id)}
                        className={`flex h-7 w-8 items-center justify-center rounded-[10px] transition ${
                          device === id ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        <DevIcon className="h-3.5 w-3.5" />
                      </button>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${dirty ? "animate-pulse bg-amber-400" : "bg-emerald-500"}`} />
                    <span className="hidden text-[10px] font-bold text-slate-500 md:inline">
                      {dirty ? (isRtl ? "تغييرات معلقة" : "Pending") : isRtl ? "محفوظ" : "Saved"}
                    </span>
                  </span>

                  <a
                    href="https://wegz.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={isRtl ? "فتح الموقع الفعلي" : "Open Live Site"}
                    className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 text-[11px] font-bold text-slate-700 shadow-sm transition hover:border-blue-400 hover:text-blue-600"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span className="hidden xl:inline">{isRtl ? "فتح الموقع" : "Open Live Site"}</span>
                  </a>
                </div>
              </div>

              {/* Preview Content */}
              <div className="bg-[#F8FAFC] p-3 sm:p-5">
                {loading ? (
                  <div className="h-[60vh] animate-pulse rounded-2xl bg-slate-200" />
                ) : (
                  <SiteDesignPreview
                    variant={previewVariant}
                    editing={section}
                    form={previewForm}
                    files={files}
                    allSections={allSections}
                    isRtl={isRtl}
                    lang={lang}
                    device={device}
                    focus={focus}
                  />
                )}

                <p className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-slate-500">
                  <Eye className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                  <span>
                    {isRtl
                      ? `المعاينة بتتحدّث فوراً مع كل تعديل في «${cfg.title.ar}». مرّري الماوس على أي قسم تاني عشان تنقلي لتعديله، واضغطي «حفظ» لنشر التغييرات على الموقع.`
                      : `The preview updates instantly as you edit “${cfg.title.en}”. Hover any other section to jump to it, and press “Save” to publish.`}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}