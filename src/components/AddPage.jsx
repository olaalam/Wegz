import { useState } from "react";
import { ArrowLeft, ArrowRight, LoaderCircle, Save } from "lucide-react";

export default function AddPage({
  title,
  fields = [],
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
  lang = "en",
  saveLabel,
  savingLabel,
}) {
  const isRTL = lang === "ar";
  const [values, setValues] = useState(() => Object.fromEntries(
    fields.map((field) => [
      field.name,
      initialData[field.name] ?? field.defaultValue ?? (field.type === "links" ? [] : field.type === "toggle" ? false : ""),
    ])
  ));

  const labels = isRTL
    ? { back: "رجوع", save: "حفظ", saving: "جاري الحفظ..." }
    : { back: "Back", save: "Save theme", saving: "Saving..." };

  const updateValue = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const updateLink = (fieldName, index, patch) => {
    updateValue(
      fieldName,
      values[fieldName].map((link, linkIndex) => linkIndex === index ? { ...link, ...patch } : link)
    );
  };

  return (
    <section className="mx-auto w-full max-w-3xl space-y-5">
      <button type="button" onClick={onCancel} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
        {isRTL ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : <ArrowLeft className="h-4 w-4" aria-hidden="true" />}
        {labels.back}
      </button>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm sm:p-7">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{title}</h1>
        <form
          className="mt-6 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(values);
          }}
        >
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label htmlFor={field.name} className="block text-sm font-medium text-[var(--foreground)]">
                {field.label}
                {field.required && <span className="ms-1 text-red-600" aria-hidden="true">*</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  rows={4}
                  value={values[field.name] ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--ring)]"
                />
              ) : field.type === "toggle" ? (
                <button
                  id={field.name}
                  type="button"
                  role="switch"
                  aria-checked={Boolean(values[field.name])}
                  onClick={() => updateValue(field.name, !values[field.name])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${values[field.name] ? "bg-emerald-600" : "bg-slate-300"}`}
                >
                  <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${values[field.name] ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              ) : field.type === "image" ? (
                <input
                  id={field.name}
                  name={field.name}
                  type="file"
                  accept="image/*"
                  required={field.required}
                  onChange={(event) => updateValue(field.name, event.target.files?.[0] ?? "")}
                  className="block w-full text-sm text-[var(--muted-foreground)] file:me-3 file:rounded-lg file:border-0 file:bg-[var(--muted)] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[var(--foreground)]"
                />
              ) : field.type === "links" ? (
                <div className="space-y-3">
                  {(values[field.name] ?? []).map((link, index) => (
                    <div key={`${field.name}-${index}`} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto_auto]">
                      <input
                        aria-label={isRTL ? `اسم الرابط ${index + 1}` : `Link ${index + 1} label`}
                        value={link.label ?? ""}
                        onChange={(event) => updateLink(field.name, index, { label: event.target.value })}
                        placeholder={isRTL ? "اسم الرابط" : "Link label"}
                        className="h-11 min-w-0 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--ring)]"
                      />
                      <input
                        aria-label={isRTL ? `عنوان الرابط ${index + 1}` : `Link ${index + 1} URL`}
                        value={link.url ?? ""}
                        onChange={(event) => updateLink(field.name, index, { url: event.target.value })}
                        placeholder="/url"
                        className="h-11 min-w-0 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--ring)]"
                      />
                      <label className="inline-flex items-center gap-2 text-sm text-[var(--foreground)]">
                        <input
                          type="checkbox"
                          checked={link.isActive !== false}
                          onChange={(event) => updateLink(field.name, index, { isActive: event.target.checked })}
                        />
                        {isRTL ? "نشط" : "Active"}
                      </label>
                      <button
                        type="button"
                        onClick={() => updateValue(field.name, values[field.name].filter((_, linkIndex) => linkIndex !== index).map((item, itemIndex) => ({ ...item, order: itemIndex + 1 })))}
                        className="min-h-10 rounded-xl border border-[var(--border)] px-3 text-sm text-red-600 hover:bg-red-50"
                      >
                        {isRTL ? "حذف" : "Remove"}
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => updateValue(field.name, [...(values[field.name] ?? []), { label: "", url: "", isActive: true, order: (values[field.name]?.length ?? 0) + 1 }])}
                    className="rounded-xl bg-[var(--muted)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:opacity-80"
                  >
                    {isRTL ? "إضافة رابط" : "Add link"}
                  </button>
                </div>
              ) : field.type === "color" ? (
                <div className="space-y-2">
                  <div className="flex max-w-xs items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-2 shadow-xs">
                    <label className="relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-[var(--border)]">
                      <span className="absolute inset-0" style={{ backgroundColor: values[field.name] || "#ffffff" }} />
                      <input
                        type="color"
                        value={values[field.name] || "#000000"}
                        onChange={(e) => updateValue(field.name, e.target.value)}
                        className="absolute inset-0 cursor-pointer opacity-0"
                      />
                    </label>
                    <input
                      type="text"
                      value={values[field.name] || ""}
                      onChange={(e) => updateValue(field.name, e.target.value)}
                      placeholder="#000000"
                      className="w-full bg-transparent font-mono text-xs font-bold uppercase text-[var(--foreground)] outline-none"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["#ffffff", "#000000", "#3b82f6", "#2563eb", "#8b5cf6", "#10b981", "#ef4444", "#f59e0b", "#1e293b"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => updateValue(field.name, c)}
                        className="h-5 w-5 rounded-md border border-[var(--border)] transition hover:scale-110 active:scale-95"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type ?? "text"}
                  required={field.required}
                  value={values[field.name] ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                  className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--ring)]"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end border-t border-[var(--border)] pt-5">
            <button type="submit" disabled={isLoading} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
              {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
              {isLoading ? savingLabel ?? labels.saving : saveLabel ?? labels.save}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
