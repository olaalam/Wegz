import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  SlidersHorizontal, 
  Plus, 
  Layers,
  ArrowRight,
  ArrowLeft,
  Moon,
  Sun,
  Globe,
  Megaphone,
  Search,
  ShoppingCart,
  Sparkles,
  ExternalLink,
  Star,
  Quote,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Play
} from "lucide-react";
import { useGet } from "../../hooks/useGet";
import { useMutation } from "../../hooks/useMutation";
import { SECTION_MAP } from "./sectionsConfig";
import { toast } from "sonner";

// Distinct visual presets and configurations for EVERY section
const SECTION_TEMPLATES = {
  header: [
    {
      id: "announcement-bar",
      titleEn: "Header with Announcement Bar",
      titleAr: "هيدر مع شريط إعلانات علوي",
      descEn: "Top promotional banner with discounts & announcements above navigation",
      descAr: "شريط ترويجي وتنبيهات علوي لعرض الخصومات والأخبار المهمة",
      badge: "Promo & Sales",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-200",
      features: ["Top Announcement Banner", "Standard Navigation", "Action Button"],
      type: "announcement"
    },
    {
      id: "lang-and-theme",
      titleEn: "Multilingual & Dark/Light Switcher",
      titleAr: "هيدر بدعم اللغات (AR / EN) ووضع ليلي/نهاري",
      descEn: "Equipped with Dark/Light toggle and language switch for international stores",
      descAr: "مزود بمحول الوضع الليلي/النهاري ومبدل اللغة للتطبيقات والمتاجر متعددة اللغات",
      badge: "Multilingual & Themes",
      badgeColor: "bg-purple-50 text-purple-600 border-purple-200",
      features: ["Language Toggle (AR/EN)", "Dark / Light Switch", "Clean Links"],
      type: "lang-theme"
    },
    {
      id: "ecommerce-full",
      titleEn: "E-Commerce Header with Search & Cart",
      titleAr: "هيدر متجر إلكتروني مع بحث وسلة وتغيير اللغة",
      descEn: "Search bar, user actions, cart indicator, and announcement bar",
      descAr: "شريط بحث تفاعلي مع أيقونة السلة وحساب المستخدم وشريط عروض علوي",
      badge: "Full E-Commerce",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
      features: ["Search Input", "Cart & Account", "Language Switch", "Top Bar"],
      type: "ecommerce"
    },
    {
      id: "modern-minimal",
      titleEn: "Modern Minimalist Header",
      titleAr: "هيدر عصري مبسط (Minimalist)",
      descEn: "Clean floating layout focusing on brand, essential links and CTA",
      descAr: "تصميم نظيف ومبسط يركز على هوية البراند والروابط الأساسية وزر التحويل",
      badge: "SaaS & Minimal",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
      features: ["Minimalist Layout", "Floating Glass Effect", "High Conversion CTA"],
      type: "minimal"
    }
  ],

  hero: [
    {
      id: "hero-split-image",
      titleEn: "Split Hero with Product Mockup",
      titleAr: "واجهة رئيسية مقسمة مع صورة المنتج",
      descEn: "Bold title, subtitle, dual CTA buttons, and high-impact product imagery",
      descAr: "عنوان جذاب مع زرين إجراء وصورة استعراضية بارزة للمنتج على الجانب",
      badge: "High Conversion",
      badgeColor: "bg-violet-50 text-violet-600 border-violet-200",
      features: ["Dual Action Buttons", "Side Image Showcase", "Trust Badges"],
      type: "split"
    },
    {
      id: "hero-centered-banner",
      titleEn: "Centered Bold Banner with Video CTA",
      titleAr: "عنوان في المنتصف مع فيديو توضيحي",
      descEn: "Centered impactful typography with video preview button and newsletter input",
      descAr: "تركيز كامل على العنوان في المنتصف مع زر تشغيل فيديو ومعاينة سريعة",
      badge: "Storytelling",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-200",
      features: ["Centered Typography", "Watch Demo Button", "Customer Avatars"],
      type: "centered"
    },
    {
      id: "hero-gradient-overlay",
      titleEn: "Full Background Cover with Floating Card",
      titleAr: "خلفية غلاف كاملة مع بطاقة تفاعلية عائمة",
      descEn: "Full-width background image with stylish dark gradient and floating feature cards",
      descAr: "خلفية كاملة مع تدرج لوني وبطاقات عائمة لمميزات المتجر",
      badge: "Modern Showcase",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
      features: ["Full Height Cover", "Floating Stats", "Newsletter Subscription"],
      type: "overlay"
    }
  ],

  announcement: [
    {
      id: "announcement-ticker",
      titleEn: "Animated Marquee / Scrolling Ticker",
      titleAr: "شريط متحرك مستمر (Ticker / Marquee)",
      descEn: "Smooth scrolling news and promotions ticker across top screen",
      descAr: "نص متحرك سلس ومستمر لشد انتباه الزائر للخصومات العاجلة",
      badge: "Dynamic Ticker",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-200",
      features: ["Marquee Animation", "Clickable Promo Code", "Urgency Badge"],
      type: "ticker"
    },
    {
      id: "announcement-countdown",
      titleEn: "Countdown Timer Banner",
      titleAr: "شريط بعداد تنازلي للعروض المؤقتة",
      descEn: "Promotional banner featuring live countdown timer for flash sales",
      descAr: "شريط مزود بعداد تنازلي للساعات والدقائق لتحفيز الشراء السريع",
      badge: "Flash Sale",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-200",
      features: ["Countdown Clock", "Urgency CTA", "Discount Voucher"],
      type: "countdown"
    }
  ],

  testimonials: [
    {
      id: "testi-cards-grid",
      titleEn: "Modern 3-Column Review Cards",
      titleAr: "بطاقات تقييمات ثلاثية الأعمدة",
      descEn: "Star ratings, client avatars, verified buyer badges, and glowing testimonials",
      descAr: "بطاقات أنيقة تحتوي على النجوم الخمسة، صورة العميل، وشارة عميل موثق",
      badge: "Social Proof",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-200",
      features: ["5-Star Ratings", "Verified Buyer Tag", "Avatar & Role"],
      type: "cards"
    },
    {
      id: "testi-slider-quote",
      titleEn: "Featured Large Quote Slider",
      titleAr: "اقتباس عريض فاخر مع مؤشر تمرير",
      descEn: "Large prominent client endorsement with company logo and metrics",
      descAr: "اقتباس عريض وبارز مع شعار الشركة وإحصائية النتائج المحققة",
      badge: "Executive Endorsement",
      badgeColor: "bg-indigo-50 text-indigo-600 border-indigo-200",
      features: ["Prominent Quote Icon", "Company Logo", "Metric Highlight"],
      type: "quote"
    }
  ],

  contact: [
    {
      id: "contact-split-map",
      titleEn: "Interactive Form with Direct Contacts",
      titleAr: "نموذج اتصال مع معلومات الاتصال المباشرة",
      descEn: "Clean contact form alongside phone, email, WhatsApp, and location cards",
      descAr: "نموذج إرسال رسالة مع بطاقات مباشرة للواتساب والهاتف وساعات العمل",
      badge: "Direct Connect",
      badgeColor: "bg-pink-50 text-pink-600 border-pink-200",
      features: ["Quick Inquiry Form", "WhatsApp Link", "Google Maps Ready"],
      type: "form"
    }
  ],

  footer: [
    {
      id: "footer-multi-col",
      titleEn: "Multi-Column E-Commerce Footer",
      titleAr: "فوتر متعدد الأعمدة مع نشرة بريدية وروابط دفع",
      descEn: "Categorized links, newsletter input, payment badges, and social links",
      descAr: "روابط مصنفة، اشتراك بالنشرة البريدية، أيقونات الدفع، وشبكات التواصل",
      badge: "Complete Footer",
      badgeColor: "bg-slate-100 text-slate-700 border-slate-300",
      features: ["Newsletter Form", "Payment Provider Icons", "Copyright & Socials"],
      type: "multi"
    }
  ]
};

// Sub-component to render interactive preview of different section types
function SectionPreviewCanvas({ section, item, variant, isRtl }) {
  if (section === "header") {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-100/70 px-3.5 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="ms-2 text-[9px] font-mono text-slate-400">wegostores.com/nav</span>
          </div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{variant.badge}</span>
        </div>

        {/* Top Banner if variant has it */}
        {(variant.type === "announcement" || variant.type === "ecommerce") && (
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-center text-[10px] font-bold text-white">
            <Megaphone className="h-3 w-3 shrink-0 text-amber-300 animate-bounce" />
            <span>{isRtl ? "🎉 خصم 25% على جميع المنتجات! كود: WEGO25" : "🎉 Flash Sale: 25% OFF with code WEGO25"}</span>
          </div>
        )}

        {/* Header Bar */}
        <div
          className="flex items-center justify-between px-4 py-3.5 transition-all"
          style={{ backgroundColor: item.bgColor || "#ffffff", color: item.textColor || "#0f172a" }}
        >
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            {item.logo ? (
              <img
                src={/^(https?:|blob:)/.test(item.logo) ? item.logo : `${import.meta.env.VITE_API_URL || ""}${item.logo}`}
                alt=""
                className="h-7 w-7 rounded-lg object-contain"
              />
            ) : (
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-black"
                style={{ color: item.textColor || "#3b82f6" }}
              >
                {(item.brandName || "W")[0].toUpperCase()}
              </div>
            )}
            <span className="text-sm font-extrabold tracking-tight">{item.brandName || "Brand"}</span>
          </div>

          {/* Center Links or Search */}
          {variant.type === "ecommerce" ? (
            <div className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-100/90 px-3 py-1.5 text-xs text-slate-400">
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[11px] font-medium">{isRtl ? "ابحث عن المنتجات..." : "Search items..."}</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3.5 text-[11px] font-semibold opacity-85">
              {item.links && item.links.length > 0 ? (
                item.links.slice(0, 3).map((l, i) => <span key={i}>{l.label}</span>)
              ) : (
                <><span>Home</span><span>Store</span><span>About</span></>
              )}
            </div>
          )}

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {variant.type === "lang-theme" && (
              <>
                <div className="flex items-center gap-1 rounded-lg border border-slate-200/80 bg-white/80 px-2 py-1 text-[10px] font-bold text-slate-700 shadow-xs">
                  <Globe className="h-3 w-3 text-slate-500" />
                  <span>{isRtl ? "AR" : "EN"}</span>
                </div>
                <div className="flex items-center justify-center rounded-lg border border-slate-200/80 bg-white/80 p-1.5 text-slate-700 shadow-xs">
                  <Moon className="h-3 w-3 text-indigo-500" />
                </div>
              </>
            )}

            {variant.type === "ecommerce" && (
              <div className="relative flex items-center justify-center rounded-lg border border-slate-200/80 bg-white/80 p-1.5 text-slate-700">
                <ShoppingCart className="h-3 w-3" />
                <span className="absolute -top-1 -end-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white">2</span>
              </div>
            )}

            <span
              className="rounded-lg px-2.5 py-1 text-[10px] font-bold shadow-xs"
              style={{ background: item.textColor || "#0f172a", color: item.bgColor || "#ffffff" }}
            >
              {isRtl ? "ابدأ" : "Start"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (section === "hero") {
    const heroImg = item.image
      ? /^(https?:|blob:)/.test(item.image) ? item.image : `${import.meta.env.VITE_API_URL || ""}${item.image}`
      : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80";

    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900 text-white shadow-sm">
        {variant.type === "split" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 p-6 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-500/30">
                <Sparkles className="h-2.5 w-2.5" />
                {isRtl ? "نسخة احترافية جديدة" : "Next Gen Experience"}
              </span>
              <h4 className="text-sm sm:text-base font-extrabold leading-tight text-white line-clamp-2">
                {item.title || (isRtl ? "ارتقِ بمتجرك إلى المستوى التالي" : "Supercharge Your Modern Online Store")}
              </h4>
              <p className="text-xs text-slate-300 line-clamp-2">
                {item.subtitle || (isRtl ? "منصة متكاملة لتصميم وإدارة متجرك بأعلى كفاءة وسرعة" : "The complete all-in-one storefront solution built for conversion")}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="rounded-xl bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white shadow-md">
                  {item.ctaText || (isRtl ? "ابدأ الآن مجاناً" : "Get Started Free")}
                </span>
                <span className="rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-[11px] font-bold text-slate-300">
                  {isRtl ? "استكشف العرض" : "Live Demo"}
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-slate-700/60 shadow-lg">
              <img src={heroImg} alt="" className="h-32 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-2.5">
                <span className="text-[10px] font-bold text-slate-200">✨ Live Storefront Mockup</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-900">
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/20 px-3 py-1 text-[10px] font-bold text-purple-300 border border-purple-500/30 mb-3">
              🚀 {isRtl ? "إطلاق جديد وحصري" : "Exclusive New Release"}
            </span>
            <h4 className="text-base sm:text-lg font-black text-white max-w-md mx-auto leading-snug">
              {item.title || (isRtl ? "التصميم الأقوى لتحقيق أعلى مبيعات" : "Build Fast, Convert Better & Grow Faster")}
            </h4>
            <p className="mt-2 text-xs text-slate-300 max-w-sm mx-auto line-clamp-2">
              {item.subtitle || (isRtl ? "تجربة تسوق فريدة ومريحة لعملائك تزيد معدل التحويل" : "Deliver seamless shopping experiences designed to convert")}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg">
                {item.ctaText || (isRtl ? "ابدأ تجربتك المجانية" : "Start Free Trial")}
              </span>
              <span className="inline-flex items-center gap-1 rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs font-bold text-slate-300">
                <Play className="h-3 w-3 fill-slate-300" />
                {isRtl ? "فيديو الشرح" : "Watch Demo"}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (section === "announcement") {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <div
          className="flex items-center justify-between rounded-xl px-4 py-3 shadow-inner"
          style={{
            backgroundColor: item.bgColor || "#ef4444",
            color: item.textColor || "#ffffff"
          }}
        >
          <div className="flex items-center gap-2 font-bold text-xs">
            <Megaphone className="h-4 w-4 shrink-0 animate-bounce" />
            <span>{item.text || (isRtl ? "عروض حصرية لفترة محدودة لجميع العملاء الجدد!" : "Limited Time Offer! 20% off all new collections")}</span>
          </div>

          {variant.type === "countdown" ? (
            <div className="flex items-center gap-1.5 text-[10px] font-mono bg-black/20 px-2 py-1 rounded-md">
              <span className="font-bold">02:14:45</span>
            </div>
          ) : (
            <span className="rounded bg-white/25 px-2 py-0.5 text-[10px] font-bold">
              {isRtl ? "تسوق الآن" : "Shop Now"}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (section === "testimonials") {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-sm">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="h-2.5 w-2.5" />
              {isRtl ? "مشتري موثق" : "Verified Buyer"}
            </span>
          </div>
          <p className="text-xs italic text-slate-700 leading-relaxed">
            "{isRtl ? "أفضل متجر تعاملت معه على الإطلاق، سرعة في التوصيل وجودة فاخرة للمنتجات!" : "Outstanding shopping experience, ultra-fast shipping and supreme product quality!"}"
          </p>
          <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-100">
            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-[10px]">
              SA
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{isRtl ? "سارة أحمد" : "Sarah Anderson"}</p>
              <p className="text-[10px] text-slate-400">{isRtl ? "الرياض، المملكة العربية السعودية" : "Verified Customer"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback visual simulation for any other sections (Info, Contact, Footer)
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-xs font-extrabold text-slate-900">{item.brandName || item.title || "Custom Preset"}</h4>
          <p className="text-[11px] text-slate-400">Active layout configured with responsive options</p>
        </div>
      </div>
    </div>
  );
}

export default function SectionSelect() {
  const { section } = useParams();
  const navigate = useNavigate();
  const lang = useSelector((s) => s.ui.lang) === "ar" ? "ar" : "en";
  const isRtl = lang === "ar";
  const cfg = SECTION_MAP[section];

  const { data, loading, error, refetch } = useGet(`/api/admin/sections/${section}`);
  const { mutate, loading: activating } = useMutation();

  const records = data?.data || [];
  const templates = SECTION_TEMPLATES[section] || SECTION_TEMPLATES.header;

  const handleSetActive = async (record) => {
    if (record.isVisible) return;
    const res = await mutate(`/api/admin/sections/${section}/${record._id}`, "PATCH", {
      isVisible: true,
    });
    if (res.success) {
      toast.success(isRtl ? "تم تفعيل هذا التصميم في الموقع بنجاح" : "Preset selected and activated successfully");
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
      {/* Top Navbar Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/website/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              {isRtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg shadow-sm"
                  style={{ background: `${cfg.color}15`, color: cfg.color }}
                >
                  <cfg.icon className="h-4 w-4" />
                </span>
                <h1 className="text-base font-bold text-slate-900">
                  {isRtl ? `نماذج وتصاميم ${cfg.title.ar}` : `${cfg.title.en} Templates & Styles`}
                </h1>
              </div>
              <p className="text-xs text-slate-500">
                {isRtl
                  ? `اختاري الشكل والتصميم المفضل لقسم ${cfg.title.ar}، أو قومي بتعديل إعداداته`
                  : `Select preferred layout style for ${cfg.title.en}, or customize settings`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/admin/website/${section}/add`}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-blue-500/20 transition hover:bg-blue-700 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>{isRtl ? "إضافة نسخة جديدة" : "Add New Preset"}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
        ) : records.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <Layers className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-base font-bold text-slate-800">
              {isRtl ? "لا توجد نسخ مضافة حتى الآن" : "No presets found"}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {isRtl ? "ابدأي بإنشاء أول نسخة لهذا السكشن" : "Start by creating the first design for this section"}
            </p>
            <Link
              to={`/admin/website/${section}/add`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              {isRtl ? "إنشاء نسخة جديدة" : "Create New Preset"}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-600">
                  {isRtl ? `التصاميم والأنماط المعروضة (${records.length})` : `Available Layouts & Designs (${records.length})`}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isRtl
                    ? "يمكنك تفعيل أي تصميم بنقرة واحدة، أو الضغط على تخصيص لفتح التاب الخاص به"
                    : "Activate any layout with one click, or customize its specific settings tab"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {records.map((item, idx) => {
                const isActive = item.isVisible;
                const variant = templates[idx % templates.length] || templates[0];

                return (
                  <div
                    key={item._id}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${
                      isActive
                        ? "border-emerald-500/80 ring-2 ring-emerald-500/20 shadow-emerald-500/5"
                        : "border-slate-200/90 hover:border-blue-400"
                    }`}
                  >
                    {/* Active Live Badge */}
                    {isActive && (
                      <div className="absolute top-4 start-4 z-20 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold text-white shadow-md">
                        <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                        <span>{isRtl ? "المفعل حالياً في الموقع" : "Currently Live"}</span>
                      </div>
                    )}

                    {/* Preview Mock Canvas */}
                    <div className="relative border-b border-slate-100 bg-slate-50/70 p-5 sm:p-6">
                      <SectionPreviewCanvas
                        section={section}
                        item={item}
                        variant={variant}
                        isRtl={isRtl}
                      />
                    </div>

                    {/* Template Card Details */}
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-extrabold text-slate-900">
                              {item.brandName || item.title || (isRtl ? variant.titleAr : variant.titleEn)}
                            </h3>
                            <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${variant.badgeColor}`}>
                              {variant.badge}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">
                            {isRtl ? variant.descAr : variant.descEn}
                          </p>
                        </div>
                      </div>

                      {/* Feature Pills */}
                      <div className="mt-4 flex flex-wrap items-center gap-1.5">
                        {variant.features.map((feat, fidx) => (
                          <span
                            key={fidx}
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-50 border border-slate-200/70 px-2 py-1 text-[10px] font-semibold text-slate-600"
                          >
                            <span className="h-1 w-1 rounded-full bg-blue-500" />
                            {feat}
                          </span>
                        ))}
                      </div>

                      {/* Card Action Buttons */}
                      <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                        {/* Direct Customize Button (Navigates directly to this preset's tab) */}
                        <Link
                          to={`/admin/website/${section}/settings?id=${item._id}`}
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-blue-600 active:scale-95"
                        >
                          <SlidersHorizontal className="h-4 w-4" />
                          <span>{isRtl ? "تخصيص وإعدادات" : "Customize"}</span>
                        </Link>

                        {/* Set Active Button */}
                        <button
                          type="button"
                          onClick={() => handleSetActive(item)}
                          disabled={isActive || activating}
                          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition active:scale-95 ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60 cursor-default"
                              : "bg-slate-900 text-white shadow-md shadow-slate-900/10 hover:bg-blue-600"
                          }`}
                        >
                          {isActive ? (
                            <>
                              <Check className="h-4 w-4 text-emerald-600" />
                              <span>{isRtl ? "التصميم المعتمد" : "Current Active"}</span>
                            </>
                          ) : (
                            <>
                              <span>{isRtl ? "اختيار هذا التصميم" : "Select & Activate"}</span>
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
          </div>
        )}
      </main>
    </div>
  );
}
