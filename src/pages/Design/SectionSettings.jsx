import { useEffect, useMemo, useState } from "react";
import { NavLink, useParams, Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Plus, Trash2, ImagePlus, ChevronLeft, ChevronRight, Loader2, Save, RotateCcw, Check, Sparkles } from "lucide-react";
import { useGet } from "../../hooks/useGet";

import { useMutation } from "../../hooks/useMutation";

import { toast } from "sonner";

import { GROUPS} from "./sectionsConfig";
import { SECTION_MAP } from "./sectionsConfig";

const inputCls =
  "w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

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
    return /^(https?:|blob:)/.test(value) ? value : `${import.meta.env.VITE_API_URL || ""}${value}`;
  }, [file, value]);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="group relative flex h-28 w-44 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-blue-400">
        {preview ? (
          <img src={preview} alt="" className="h-full w-full object-cover p-1 transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <ImagePlus className="h-8 w-8 text-slate-400 transition-transform group-hover:scale-110" />
        )}
      </div>
      <label className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-blue-600 active:scale-95">
        {preview ? (lang === "ar" ? "تغيير الصورة" : "Change image") : lang === "ar" ? "رفع صورة" : "Upload image"}
        <input type="file" accept="image/*" hidden onChange={(e) => e.target.files[0] && onFile(e.target.files[0])} />
      </label>
    </div>
  );
}

function ColorField({ value, onChange }) {
  return (
    <div className="flex max-w-xs items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-2 pe-4 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
      <label className="relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-slate-200 shadow-inner">
        <span className="absolute inset-0" style={{ background: value || "#ffffff" }} />
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </label>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
        className="w-full bg-transparent font-mono text-xs font-bold uppercase text-slate-800 outline-none"
      />
    </div>
  );
}

function LinksField({ value, onChange, lang }) {
  const links = value || [];
  const set = (i, patch) => onChange(links.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));

  return (
    <div className="space-y-3 w-full">
      {links.map((l, i) => (
        <div key={i} className="flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md">
          <input className={inputCls} placeholder={lang === "ar" ? "الاسم" : "Label"} value={l.label || ""} onChange={(e) => set(i, { label: e.target.value })} />
          <input className={inputCls} placeholder="/url" value={l.url || ""} onChange={(e) => set(i, { url: e.target.value })} />
          <div className="flex items-center justify-between w-full sm:w-auto gap-4 px-2">
            <Toggle checked={l.isActive !== false} onChange={(v) => set(i, { isActive: v })} />
            <button
              type="button"
              onClick={() => onChange(links.filter((_, idx) => idx !== i).map((x, n) => ({ ...x, order: n + 1 })))}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 active:scale-90"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...links, { label: "", url: "", isActive: true, order: links.length + 1 }])}
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
      return <ImageField value={value} file={file} onFile={onFile} lang={lang} />;
    case "links":
      return <LinksField value={value} onChange={onChange} lang={lang} />;
    default:
      return <input className={inputCls} value={value || ""} onChange={(e) => onChange(e.target.value)} />;
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
  const Arrow = isRtl ? ChevronLeft : ChevronRight;
  const cfg = SECTION_MAP[section];

  const { data, loading, error, refetch } = useGet(`/api/admin/sections/${section}`);
  const { mutate, loading: saving } = useMutation();

  const records = data?.data || [];
  const [selectedId, setSelectedId] = useState(null);

  // Sync selectedId with query param id, active, or first record
  useEffect(() => {
    if (records.length > 0) {
      if (queryId && records.some((r) => r._id === queryId)) {
        setSelectedId(queryId);
      } else {
        const activeRecord = records.find((r) => r.isVisible);
        const exists = records.some((r) => r._id === selectedId);
        if (!exists) {
          setSelectedId(activeRecord ? activeRecord._id : records[0]._id);
        }
      }
    } else {
      setSelectedId(null);
    }
  }, [records, section, selectedId, queryId]);

  const record = records.find((r) => r._id === selectedId) || records[0];

  const [form, setForm] = useState({});
  const [files, setFiles] = useState({});

  useEffect(() => {
    setForm(record || {});
    setFiles({});
  }, [record?._id, section]);

  const dirty = useMemo(
    () => Object.keys(files).length > 0 || JSON.stringify(form) !== JSON.stringify(record || {}),
    [form, files, record]
  );

  if (!cfg) return <div className="p-8 text-slate-600">Section not found</div>;

  const discard = () => {
    setForm(record || {});
    setFiles({});
  };

  const handleSetActive = async (targetRecord) => {
    const res = await mutate(`/api/admin/sections/${section}/${targetRecord._id}`, "PATCH", {
      isVisible: true,
    });
    if (res.success) {
      toast.success(isRtl ? "تم تفعيل هذا التصميم في الموقع بنجاح" : "Preset activated successfully");
      refetch();
    } else {
      toast.error(res.error || (isRtl ? "فشل التفعيل" : "Activation failed"));
    }
  };

  const handleDelete = async (targetRecord) => {
    const confirmMsg = isRtl
      ? `هل أنتِ متأكدة من حذف "${targetRecord.brandName || targetRecord.title || "هذه النسخة"}"؟`
      : `Are you sure you want to delete this preset?`;
    if (!window.confirm(confirmMsg)) return;

    const res = await mutate(`/api/admin/sections/${section}/${targetRecord._id}`, "DELETE");
    if (res.success) {
      toast.success(isRtl ? "تم الحذف بنجاح" : "Deleted successfully");
      refetch();
    } else {
      toast.error(res.error || (isRtl ? "فشل الحذف" : "Deletion failed"));
    }
  };

  const save = async () => {
    const names = cfg.fields.map((f) => f.name);
    let payload = Object.fromEntries(names.filter((n) => !(n in files)).map((n) => [n, form[n]]));
    let config = {};

    if (Object.keys(files).length) {
      const fd = new FormData();
      names.forEach((n) => {
        if (files[n]) fd.append(n, files[n]);
        else if (form[n] !== undefined)
          fd.append(n, typeof form[n] === "object" ? JSON.stringify(form[n]) : form[n]);
      });
      payload = fd;
      config = { headers: { "Content-Type": "multipart/form-data" } };
    }

    const url = record ? `/api/admin/sections/${section}/${record._id}` : `/api/admin/sections/${section}`;
    const res = await mutate(url, record ? "PATCH" : "POST", payload, config);

    if (res.success) {
      toast.success(lang === "ar" ? "تم حفظ التغييرات بنجاح" : "Changes saved successfully");
      refetch();
    } else {
      toast.error(res.error);
    }
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-e border-slate-200/80 bg-white p-5 md:block">
        <Link
          to="/admin/website/dashboard"
          className="mb-6 flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-slate-900"
        >
          {isRtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {isRtl ? "استوديو التصميم" : "Design Studio"}
        </Link>

        {GROUPS.map((g) => (
          <div key={g.title.en} className="mb-6">
            <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              {g.title[lang]}
            </p>
            <nav className="space-y-1">
              {g.items.map((s) => {
                const Icon = s.icon;
                return (
                  <NavLink
                    key={s.key}
                    to={`/admin/website/${s.key}/settings`}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-blue-50 text-blue-600 shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    <Icon className="h-4 w-4" style={{ color: s.color }} />
                    {s.title[lang]}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-3xl px-6 py-8 pb-16">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link to="/admin/website/dashboard" className="hover:text-slate-900">
              {isRtl ? "استوديو التصميم" : "Design Studio"}
            </Link>
            <Arrow className="h-3.5 w-3.5" />
            <span className="font-bold text-slate-900">{cfg.title[lang]}</span>
          </div>

          {/* Main Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
            <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6 bg-slate-50/50">
              <div className="flex items-center gap-4">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-inner"
                  style={{ background: `${cfg.color}15`, color: cfg.color }}
                >
                  <cfg.icon className="h-6 w-6" />
                </span>
                <div>
                  <h1 className="text-lg font-extrabold text-slate-900">
                    {cfg.title[lang]} {isRtl ? "- الإعدادات" : "Settings"}
                  </h1>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">{cfg.desc[lang]}</p>
                </div>
              </div>

              <Link
                to={`/admin/website/${section}/add`}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/30 active:scale-95"
              >
                <Plus className="h-4 w-4" />
                <span>{isRtl ? "إضافة جديد" : "Add New"}</span>
              </Link>
            </div>

            {/* Preset Selector Bar */}
            {!loading && records.length > 0 && (
              <div className="border-b border-slate-100 bg-slate-50/60 px-8 py-3.5">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {isRtl ? `النسخ والتصاميم المتاحة (${records.length})` : `Available Presets (${records.length})`}
                  </span>
                  
                  {record && (
                    <div className="flex items-center gap-2">
                      {record.isVisible ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          {isRtl ? "المعروض حالياً في الموقع" : "Currently Live"}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSetActive(record)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/80 px-2.5 py-1 text-xs font-bold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
                        >
                          <Check className="h-3.5 w-3.5" />
                          {isRtl ? "تفعيل كـ تصميم أساسي" : "Set as Live"}
                        </button>
                      )}

                      {records.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDelete(record)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                          title={isRtl ? "حذف هذه النسخة" : "Delete preset"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {records.map((r, idx) => {
                    const isSelected = r._id === selectedId;
                    const name =
                      r.brandName ||
                      r.title ||
                      r.text ||
                      (isRtl ? `نسخة ${idx + 1}` : `Variation ${idx + 1}`);

                    return (
                      <button
                        key={r._id || idx}
                        type="button"
                        onClick={() => setSelectedId(r._id)}
                        className={`group relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shrink-0 ${
                          isSelected
                            ? "bg-white text-blue-600 shadow-sm border border-blue-500/30 ring-2 ring-blue-500/10"
                            : "bg-white/60 text-slate-600 border border-slate-200/70 hover:bg-white hover:text-slate-900"
                        }`}
                      >
                        {r.isVisible && (
                          <span className="h-2 w-2 rounded-full bg-emerald-500" title="Active" />
                        )}
                        <span className="truncate max-w-[140px]">{name}</span>
                        {r.isVisible && (
                          <span className="rounded bg-emerald-100/70 px-1 py-0.5 text-[9px] font-bold text-emerald-700">
                            LIVE
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {loading ? (
              <FormSkeleton />
            ) : error ? (
              <div className="p-8 text-xs text-rose-600 font-semibold">
                {error}{" "}
                <button onClick={() => refetch()} className="underline font-bold">
                  {isRtl ? "إعادة المحاولة" : "Retry"}
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {cfg.fields.map((f) => (
                  <div key={f.name} className="flex flex-col gap-2.5 px-8 py-6 transition-colors hover:bg-slate-50/40">
                    <label className="text-xs font-extrabold text-slate-700">{f.label[lang]}</label>
                    <Field
                      field={f}
                      lang={lang}
                      value={form[f.name]}
                      file={files[f.name]}
                      onFile={(file) => setFiles((p) => ({ ...p, [f.name]: file }))}
                      onChange={(v) => setForm((p) => ({ ...p, [f.name]: v }))}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* In-Card Footer (Save / Discard Bar) */}
            {!loading && !error && (
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-8 py-5">
                <span className={`text-xs font-semibold ${dirty ? "text-amber-600" : "text-slate-400"}`}>
                  {dirty
                    ? isRtl ? "لديكِ تغييرات غير محفوظة" : "You have unsaved changes"
                    : isRtl ? "جميع التغييرات محفوظة" : "All changes saved"}
                </span>

                <div className="flex items-center gap-3">
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
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {isRtl ? "حفظ التغييرات" : "Save changes"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}