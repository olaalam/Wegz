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
} from "lucide-react";
import { useGet } from "../../hooks/useGet";
import { useMutation } from "../../hooks/useMutation";
import { toast } from "sonner";
import { SECTION_MAP } from "./sectionsConfig";

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
  "#ffffff", "#000000", "#3b82f6", "#2563eb",
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

// ─── Live Preview Components ────────────────────────────────────────────────    
function BrowserChrome() {
  return (
    <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-100/80 px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      <span className="ms-2 flex-1 rounded bg-white/70 px-2 py-0.5 text-[9px] font-mono text-slate-400">
        wegostores.com
      </span>
    </div>
  );
}

function HeaderPreview({ form, files, isRtl }) {
  const logoPreview = useMemo(() => {
    if (files?.logo) return URL.createObjectURL(files.logo);
    if (!form?.logo) return null;
    return /^(https?:|blob:)/.test(form.logo)
      ? form.logo
      : `${import.meta.env.VITE_API_URL || ""}${form.logo}`;
  }, [files?.logo, form?.logo]);

  const bgColor = form?.bgColor || "#ffffff";
  const textColor = form?.textColor || "#0f172a";
  const brandName = form?.brandName || (isRtl ? "براند" : "Brand");
  const links = (form?.links || []).filter((l) => l.isActive !== false);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
      <BrowserChrome />
      <div
        className="flex items-center justify-between px-5 py-3.5 transition-all duration-300"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div className="flex items-center gap-2">
          {logoPreview ? (
            <img src={logoPreview} alt="" className="h-8 w-8 rounded-lg object-contain" />
          ) : (
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black"
              style={{ backgroundColor: textColor + "18", color: textColor }}
            >
              {brandName[0]?.toUpperCase() || "B"}
            </div>
          )}
          <span className="text-sm font-extrabold tracking-tight transition-all duration-200">
            {brandName}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] font-semibold opacity-85">
          {links.length > 0 ? (
            links.slice(0, 4).map((l, i) => (
              <span key={i} className="transition-all duration-200">
                {l.label || `Link ${i + 1}`}
              </span>
            ))
          ) : (
            <>
              <span>{isRtl ? "الرئيسية" : "Home"}</span>
              <span>{isRtl ? "المتجر" : "Store"}</span>
              <span>{isRtl ? "عنا" : "About"}</span>
            </>
          )}
        </div>

        <span
          className="rounded-lg px-3 py-1 text-[11px] font-bold shadow-sm transition-all duration-200"
          style={{ backgroundColor: textColor, color: bgColor }}
        >
          {isRtl ? "ابدأ" : "Get Started"}
        </span>
      </div>

      <div className="bg-slate-50 px-5 py-6 space-y-3">
        <div className="h-3 w-2/3 rounded-full bg-slate-200" />
        <div className="h-2.5 w-full rounded-full bg-slate-100" />
        <div className="h-2.5 w-5/6 rounded-full bg-slate-100" />
        <div className="mt-4 flex gap-2">
          <div className="h-7 w-24 rounded-xl bg-blue-500/20" />
          <div className="h-7 w-20 rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

function AnnouncementPreview({ form, isRtl }) {
  const bgColor = form?.bgColor || "#ef4444";
  const textColor = form?.textColor || "#ffffff";
  const text =
    form?.text ||
    (isRtl
      ? "عروض حصرية لفترة محدودة لجميع العملاء!"
      : "Limited Time Offer! 20% off all new collections");

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
      <BrowserChrome />
      <div
        className="flex items-center justify-between px-5 py-2.5 transition-all duration-300"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div className="flex items-center gap-2 text-xs font-bold">
          <Megaphone className="h-3.5 w-3.5 shrink-0 animate-bounce" />
          <span className="transition-all duration-200">{text}</span>
        </div>
        <span
          className="rounded px-2.5 py-0.5 text-[10px] font-bold shrink-0"
          style={{ backgroundColor: textColor + "28", color: textColor }}
        >
          {isRtl ? "تسوق الآن" : "Shop Now"}
        </span>
      </div>

      <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-black text-blue-600">
          W
        </div>
        <div className="flex gap-3 text-[11px] text-slate-500">
          <span>{isRtl ? "الرئيسية" : "Home"}</span>
          <span>{isRtl ? "المتجر" : "Store"}</span>
          <span>{isRtl ? "عنا" : "About"}</span>
        </div>
        <div className="h-6 w-16 rounded-lg bg-slate-900" />
      </div>

      <div className="bg-slate-50 px-5 py-6 space-y-3">
        <div className="h-3 w-2/3 rounded-full bg-slate-200" />
        <div className="h-2.5 w-full rounded-full bg-slate-100" />
        <div className="h-2.5 w-5/6 rounded-full bg-slate-100" />
      </div>
    </div>
  );
}

function HeroPreview({ form, files, isRtl }) {
  const imgPreview = useMemo(() => {
    if (files?.image) return URL.createObjectURL(files.image);
    if (!form?.image) return null;
    return /^(https?:|blob:)/.test(form.image)
      ? form.image
      : `${import.meta.env.VITE_API_URL || ""}${form.image}`;
  }, [files?.image, form?.image]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-md">
      <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-800/80 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        <span className="ms-2 flex-1 rounded bg-slate-700/60 px-2 py-0.5 text-[9px] font-mono text-slate-400">
          wegostores.com
        </span>
      </div>

      <div className="grid grid-cols-2 items-center gap-4 p-6 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-300 border border-blue-500/30">
            <Sparkles className="h-2.5 w-2.5" />
            {isRtl ? "جديد" : "New Release"}
          </span>
          <h4 className="text-sm font-extrabold leading-tight text-white transition-all duration-200">
            {form?.title || (isRtl ? "عنوان الصفحة الرئيسية" : "Your Hero Title Here")}
          </h4>
          <p className="text-xs text-slate-300 line-clamp-2 transition-all duration-200">
            {form?.subtitle || (isRtl ? "وصف مختصر لمتجرك أو خدمتك" : "A short subtitle describing your store")}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="rounded-xl bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white shadow-md transition-all duration-200">
              {form?.ctaText || (isRtl ? "ابدأ الآن" : "Get Started")}
            </span>
            <span className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-[11px] font-bold text-slate-300">
              <Play className="h-3 w-3 fill-slate-300" />
              {isRtl ? "شرح" : "Demo"}
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-slate-700/60 shadow-lg aspect-video bg-slate-800">
          {imgPreview ? (
            <img src={imgPreview} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-600">
              <ImagePlus className="h-8 w-8" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GenericSectionPreview({ section, form, isRtl }) {
  const cfg = SECTION_MAP[section];
  const Icon = cfg?.icon;
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
      <BrowserChrome />
      <div className="p-8 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-50 to-white text-center min-h-[180px]">
        {Icon && (
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-inner"
            style={{ background: `${cfg.color}15`, color: cfg.color }}
          >
            <Icon className="h-7 w-7" />
          </div>
        )}
        <div>
          <h4 className="text-sm font-extrabold text-slate-900">
            {cfg?.title[isRtl ? "ar" : "en"]}
          </h4>
          <p className="mt-1 text-xs text-slate-400">{cfg?.desc[isRtl ? "ar" : "en"]}</p>
        </div>
        <div
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all duration-300 ${
            form?.isVisible
              ? "bg-emerald-50 text-emerald-600"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              form?.isVisible ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
            }`}
          />
          {form?.isVisible
            ? isRtl
              ? "نشط في الموقع"
              : "Live on site"
            : isRtl
              ? "غير نشط"
              : "Not active"}
        </div>
      </div>
    </div>
  );
}

function InfoPreview({ form, files, isRtl, isSecondary }) {
  const imgPreview = useMemo(() => {
    if (files?.image) return URL.createObjectURL(files.image);
    if (!form?.image) return null;
    return /^(https?:|blob:)/.test(form.image)
      ? form.image
      : `${import.meta.env.VITE_API_URL || ""}${form.image}`;
  }, [files?.image, form?.image]);

  const bgColor = form?.bgColor || "#ffffff";
  const textColor = form?.textColor || "#0f172a";
  const heading =
    form?.heading ||
    form?.title ||
    (isRtl
      ? isSecondary
        ? "مميزاتنا وخدماتنا المتقدمة"
        : "عن متجرنا ورؤيتنا"
      : isSecondary
      ? "Premium Features & Quality"
      : "About Our Story & Mission");
  const subheading =
    form?.subheading ||
    form?.description ||
    (isRtl
      ? "نقدم تجربة تسوق مبتكرة وسلسة تجمع بين أعلى درجات الجودة وأفضل الأسعار لجميع عملائنا."
      : "We provide an exceptional shopping experience combining top-tier quality and competitive value.");
  const ctaText = form?.ctaText || (isRtl ? "اكتشف المزيد" : "Learn More");

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
      <BrowserChrome />
      <div
        className="p-5 sm:p-6 transition-all duration-300"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div
          className={`grid grid-cols-1 sm:grid-cols-12 gap-5 items-center ${
            isSecondary && !isRtl ? "sm:flex-row-reverse" : ""
          }`}
        >
          <div className="sm:col-span-7 space-y-2.5">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold"
              style={{ backgroundColor: textColor + "15", color: textColor }}
            >
              <Sparkles className="h-3 w-3" />
              {isSecondary
                ? isRtl
                  ? "مميزات حصرية"
                  : "Key Highlights"
                : isRtl
                ? "من نحن"
                : "Our Mission"}
            </span>
            <h4 className="text-sm sm:text-base font-extrabold leading-tight">
              {heading}
            </h4>
            <p className="text-xs opacity-80 leading-relaxed line-clamp-3">
              {subheading}
            </p>
            {ctaText && (
              <div className="pt-1">
                <span
                  className="inline-block rounded-xl px-3.5 py-1.5 text-[11px] font-bold shadow-sm"
                  style={{
                    backgroundColor: textColor,
                    color: bgColor === "#ffffff" ? "#ffffff" : bgColor,
                  }}
                >
                  {ctaText}
                </span>
              </div>
            )}
          </div>

          <div className="sm:col-span-5">
            <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 aspect-video flex items-center justify-center">
              {imgPreview ? (
                <img
                  src={imgPreview}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 gap-1">
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-[10px] font-bold">
                    {isRtl ? "صورة القسم" : "Section Image"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsPreview({ form, isRtl }) {
  const bgColor = form?.bgColor || "#f8fafc";
  const textColor = form?.textColor || "#0f172a";
  const heading =
    form?.heading ||
    form?.title ||
    (isRtl ? "آراء وتقييمات العملاء" : "Customer Testimonials");
  const subheading =
    form?.subheading ||
    form?.subtitle ||
    (isRtl
      ? "تجارب حقيقية لعملاء وثقوا بمنتجاتنا وخدماتنا"
      : "Real reviews and ratings from our verified customers");
  const clientName = form?.clientName || (isRtl ? "سارة أحمد" : "Sarah Jenkins");
  const clientRole =
    form?.clientRole || (isRtl ? "عميل موثق" : "Verified Customer");
  const feedback =
    form?.feedback ||
    (isRtl
      ? "أفضل متجر تعاملت معه على الإطلاق! جودة المنتجات ممتازة، والتوصيل سريع جداً والدعم متعاون للغاية."
      : "Outstanding experience! The product quality exceeded expectations and fast shipping.");
  const ratingNum = Math.max(1, Math.min(5, parseInt(form?.rating, 10) || 5));

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
      <BrowserChrome />
      <div
        className="p-5 sm:p-6 transition-all duration-300"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div className="text-center space-y-1 mb-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-600">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            {isRtl ? "آراء حقيقية" : "Verified Reviews"}
          </span>
          <h4 className="text-base font-extrabold tracking-tight">{heading}</h4>
          <p className="text-xs opacity-75 max-w-sm mx-auto line-clamp-1">
            {subheading}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: ratingNum }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
              <CheckCircle2 className="h-3 w-3" />
              {clientRole}
            </span>
          </div>

          <p className="text-xs text-slate-700 italic leading-relaxed line-clamp-3">
            "{feedback}"
          </p>

          <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-xs font-bold text-white">
              {clientName[0]?.toUpperCase() || "C"}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{clientName}</p>
              <p className="text-[10px] text-slate-400">{clientRole}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPreview({ form, isRtl }) {
  const bgColor = form?.bgColor || "#ffffff";
  const textColor = form?.textColor || "#0f172a";
  const heading = form?.heading || (isRtl ? "تواصل معنا" : "Get In Touch");
  const subheading =
    form?.subheading ||
    (isRtl
      ? "نسعد بالإجابة على جميع استفساراتكم واقتراحاتكم في أي وقت."
      : "Have questions? We are here to help you anytime.");
  const phone = form?.phone || "+20 123 456 7890";
  const email = form?.email || "support@wegz.org";
  const address = form?.address || (isRtl ? "القاهرة، مصر" : "Cairo, Egypt");
  const submitText = form?.submitText || (isRtl ? "إرسال الرسالة" : "Send Message");

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
      <BrowserChrome />
      <div
        className="p-5 sm:p-6 transition-all duration-300"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div className="text-center space-y-1 mb-5">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-blue-600">
            <Mail className="h-3 w-3" />
            {isRtl ? "خدمة العملاء" : "24/7 Support"}
          </span>
          <h4 className="text-base font-extrabold tracking-tight">{heading}</h4>
          <p className="text-xs opacity-75 max-w-sm mx-auto line-clamp-2">
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-5 space-y-2">
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 text-xs text-slate-800">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 shrink-0">
                <Phone className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-slate-400">{isRtl ? "الهاتف" : "Phone"}</p>
                <p className="truncate font-bold text-[11px]">{phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 text-xs text-slate-800">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500/10 text-pink-600 shrink-0">
                <Mail className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-slate-400">{isRtl ? "البريد" : "Email"}</p>
                <p className="truncate font-bold text-[11px]">{email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 text-xs text-slate-800">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
                <MapPin className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-slate-400">{isRtl ? "العنوان" : "Location"}</p>
                <p className="truncate font-bold text-[11px]">{address}</p>
              </div>
            </div>
          </div>

          <div className="sm:col-span-7 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm space-y-2">
            <div className="h-7 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 flex items-center text-[10px] text-slate-400">
              {isRtl ? "الاسم الكريم..." : "Your name..."}
            </div>
            <div className="h-7 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 flex items-center text-[10px] text-slate-400">
              {isRtl ? "البريد الإلكتروني..." : "Your email..."}
            </div>
            <div className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 p-2 flex items-start text-[10px] text-slate-400">
              {isRtl ? "اكتب رسالتك هنا..." : "Your message..."}
            </div>
            <button
              type="button"
              className="w-full rounded-xl bg-blue-600 py-1.5 text-center text-xs font-bold text-white shadow-sm"
            >
              {submitText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterPreview({ form, isRtl }) {
  const bgColor = form?.bgColor || "#0f172a";
  const textColor = form?.textColor || "#f8fafc";
  const copyright =
    form?.copyright ||
    (isRtl
      ? `© ${new Date().getFullYear()} متجرك. جميع الحقوق محفوظة.`
      : `© ${new Date().getFullYear()} Your Store. All rights reserved.`);
  const text =
    form?.text ||
    (isRtl
      ? "المتجر العصري الأول لتسوق أفضل المنتجات بأعلى معايير الجودة."
      : "The premier modern storefront for high quality curated products.");
  const links = (form?.links || []).filter((l) => l.isActive !== false);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
      <BrowserChrome />
      <div className="bg-slate-50 px-5 py-6 space-y-2 opacity-50">
        <div className="h-2.5 w-1/3 rounded-full bg-slate-300" />
        <div className="h-2 w-2/3 rounded-full bg-slate-200" />
      </div>

      <footer
        className="px-5 py-6 transition-all duration-300"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div className="max-w-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-black"
                  style={{ backgroundColor: textColor + "20", color: textColor }}
                >
                  W
                </div>
                <span className="text-xs font-black tracking-tight">Wegz Store</span>
              </div>
              <p className="text-[11px] opacity-75 leading-relaxed line-clamp-2">
                {text}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-medium opacity-90">
              {links.length > 0 ? (
                links.slice(0, 6).map((l, i) => (
                  <span
                    key={i}
                    className="hover:underline transition-opacity cursor-default"
                  >
                    {l.label || `Link ${i + 1}`}
                  </span>
                ))
              ) : (
                <>
                  <span>{isRtl ? "الرئيسية" : "Home"}</span>
                  <span>{isRtl ? "المنتجات" : "Products"}</span>
                  <span>{isRtl ? "سياسة الخصوصية" : "Privacy"}</span>
                  <span>{isRtl ? "الشروط والأحكام" : "Terms"}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] opacity-70">
            <span>{copyright}</span>
            <span className="inline-flex items-center gap-1">
              <span>{isRtl ? "مدعوم من" : "Powered by"}</span>
              <span className="font-bold">Wegz Platform</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LivePreview({ section, form, files, isRtl }) {
  if (section === "header")
    return <HeaderPreview form={form} files={files} isRtl={isRtl} />;
  if (section === "announcement")
    return <AnnouncementPreview form={form} isRtl={isRtl} />;
  if (section === "hero")
    return <HeroPreview form={form} files={files} isRtl={isRtl} />;
  if (section === "info")
    return <InfoPreview form={form} files={files} isRtl={isRtl} isSecondary={false} />;
  if (section === "info2")
    return <InfoPreview form={form} files={files} isRtl={isRtl} isSecondary={true} />;
  if (section === "testimonials")
    return <TestimonialsPreview form={form} isRtl={isRtl} />;
  if (section === "contact")
    return <ContactPreview form={form} isRtl={isRtl} />;
  if (section === "footer")
    return <FooterPreview form={form} isRtl={isRtl} />;
  return <GenericSectionPreview section={section} form={form} isRtl={isRtl} />;
}

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function SectionSettings() {
  const { section } = useParams();
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get("id");

  const lang = useSelector((s) => s.ui.lang) === "ar" ? "ar" : "en";
  const isRtl = lang === "ar";
  const cfg = SECTION_MAP[section];

  const { data, loading, error, refetch } = useGet(`/api/admin/sections/${section}`);
  const { mutate, loading: saving } = useMutation();

  const records = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.sections)) return data.sections;
    if (data.data && typeof data.data === "object") return [data.data];
    return [];
  }, [data]);
  const [selectedId, setSelectedId] = useState(null);

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
    () =>
      Object.keys(files).length > 0 ||
      JSON.stringify(form) !== JSON.stringify(record || {}),
    [form, files, record]
  );

  if (!cfg) return <div className="p-8 text-slate-600">Section not found</div>;

  const discard = () => {
    setForm(record || {});
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
      refetch();
    } else {
      toast.error(res.error || (isRtl ? "فشل التفعيل" : "Activation failed"));
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
      refetch();
    } else {
      toast.error(res.error || (isRtl ? "فشل الحذف" : "Deletion failed"));
    }
  };

  const save = async () => {
    const names = cfg.fields.map((f) => f.name);
    let payload = Object.fromEntries(
      names.filter((n) => !(n in files)).map((n) => [n, form[n]])
    );
    let config = {};

    if (Object.keys(files).length) {
      const fd = new FormData();
      names.forEach((n) => {
        if (files[n]) fd.append(n, files[n]);
        else if (form[n] !== undefined)
          fd.append(
            n,
            typeof form[n] === "object" ? JSON.stringify(form[n]) : form[n]
          );
      });
      payload = fd;
      config = { headers: { "Content-Type": "multipart/form-data" } };
    }

    const url = record
      ? `/api/admin/sections/${section}/${record._id}`
      : `/api/admin/sections/${section}`;
    const res = await mutate(url, record ? "PATCH" : "POST", payload, config);

    if (res.success) {
      toast.success(
        lang === "ar" ? "تم حفظ التغييرات بنجاح" : "Changes saved successfully"
      );
      refetch();
    } else {
      toast.error(res.error);
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

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 sm:px-8 py-6 bg-slate-50/50">
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

              {/* Preset Selector Bar */}
              {!loading && records.length > 0 && (
                <div className="border-b border-slate-100 bg-slate-50/60 px-6 sm:px-8 py-3.5">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {isRtl
                        ? `النسخ المتاحة (${records.length})`
                        : `Presets (${records.length})`}
                    </span>

                    {record && (
                      <div className="flex items-center gap-2">
                        {record.isVisible ? (
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
                            {isRtl ? "تفعيل كـ أساسي" : "Set as Live"}
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
                        r.heading ||
                        r.title ||
                        r.clientName ||
                        r.copyright ||
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
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          )}
                          <span className="truncate max-w-[120px]">{name}</span>
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
                  {cfg.fields.map((f) => (
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
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-6 sm:px-8 py-5">
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

          {/* Sticky Live Preview Column */}
          <div className="lg:col-span-6 xl:col-span-6 sticky top-6 space-y-4">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
              
              {/* Preview Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
                    <Monitor className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900">
                      {isRtl ? "معاينة مباشرة" : "Live Preview"}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {isRtl
                        ? "يتحدث فوراً مع كل تعديل"
                        : "Updates instantly as you type"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      dirty ? "bg-amber-400 animate-pulse" : "bg-emerald-500"
                    }`}
                  />
                  <span className="text-[10px] font-bold text-slate-500">
                    {dirty
                      ? isRtl
                        ? "تغييرات معلقة"
                        : "Pending"
                      : isRtl
                        ? "محفوظ"
                        : "Saved"}
                  </span>
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-5 bg-[#F8FAFC]">
                {loading ? (
                  <div className="h-48 animate-pulse rounded-2xl bg-slate-200" />
                ) : (
                  <div className="space-y-4">
                    <LivePreview
                      section={section}
                      form={form}
                      files={files}
                      isRtl={isRtl}
                    />

                    {/* Info hint */}
                    <div className="flex items-start gap-2.5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                      <Eye className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                      <div>
                        <p className="text-xs font-bold text-blue-800">
                          {isRtl ? "معاينة الموقع" : "Site Preview"}
                        </p>
                        <p className="mt-0.5 text-[11px] text-blue-600/80 leading-relaxed">
                          {isRtl
                            ? "هذه المعاينة تعكس التغييرات فوراً. اضغط «حفظ» لتطبيقها على الموقع الفعلي."
                            : "This preview reflects your edits in real time. Press «Save» to publish changes to the live site."}
                        </p>
                      </div>
                    </div>

                    {/* Open live site */}
                    <a
                      href="https://wegz.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 shadow-sm transition hover:border-blue-400 hover:text-blue-600 hover:shadow-md"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {isRtl ? "فتح الموقع الفعلي" : "Open Live Site"}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}