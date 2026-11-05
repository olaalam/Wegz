import {
  Home,
  Info,
  Sparkles,
  PhoneCall,
  Megaphone,
  Layout,
  MessageSquare,
  Footprints,
} from "lucide-react";

export const DESIGNS = {
  business: {
    key: "business",
    name: { ar: "بيزنس", en: "Business" },
    desc: { ar: "هيدر كبسولة بيضا وزرار أخضر متدرّج", en: "White pill header with a green gradient CTA" },
    radius: "rounded-3xl", serif: true,
    bg: "#ffffff", text: "#0f172a", alt: "#effaf6", altText: "#0f172a",
    accent: "#34b78f", accentText: "#ffffff",
    headerBg: "#ffffff", headerText: "#0f172a", footerBg: "#0f172a",
    headerCta: { ar: "استشارة مجانية", en: "Free Consultation" },
  },
  corporate: {
    key: "corporate",
    name: { ar: "كوربوريت", en: "Corporate" },
    desc: { ar: "أزرق غامق مع شريط علوي وعنوان في النص", en: "Deep blue with top bar and centered hero" },
    radius: "rounded-none", serif: false,
    bg: "#0b2a6b", text: "#ffffff", alt: "#ffffff", altText: "#0f172a",
    accent: "#4f8df7", accentText: "#ffffff",
    headerBg: "#0b2a6b", headerText: "#ffffff", footerBg: "#071c4a",
    headerCta: null,
  },
  "corporate-red": {
    key: "corporate-red",
    name: { ar: "كوربوريت أحمر", en: "Corporate Red" },
    desc: { ar: "كحلي مع بلوكات تنقل وزرار أحمر ملاصق", en: "Navy with block navigation and a red CTA block" },
    radius: "rounded-md", serif: false,
    bg: "#1b2470", text: "#ffffff", alt: "#f4f5fa", altText: "#1b2470",
    accent: "#d9082b", accentText: "#ffffff",
    headerBg: "#1b2470", headerText: "#ffffff", footerBg: "#121a55",
    headerCta: { ar: "اطلبي عرض سعر", en: "Get A Free Quote" },
  },
  construction: {
    key: "construction",
    name: { ar: "إنشاءات", en: "Construction" },
    desc: { ar: "كحلي وأصفر مع صندوق عنوان بارز وسلايدر مدمج", en: "Navy and yellow with bold title and interactive slider" },
    radius: "rounded-none", serif: true,
    bg: "#1f2d45", text: "#ffffff", alt: "#ffffff", altText: "#1f2d45",
    accent: "#f2b933", accentText: "#1f2d45",
    headerBg: "#1f2d45", headerText: "#ffffff", footerBg: "#17233a",
    headerCta: { ar: "استشارة مجانية", en: "Free Consultation" },
  },
};

export const DESIGN_KEYS = Object.keys(DESIGNS);

export const DESIGN_CONTENT = {
  business: {
    brand: "XTRA Business",
    links: ["Home", "About", "Services", "Blog", "Contact"],
    announcement: "Limited time offer — book your free consultation today",
    eyebrow: "We are expert team",
    heroTitle: "We create products that make people's lives easier & better.",
    heroSubtitle: "A team of designers and engineers building products people love.",
    heroCta: "How it works?",
    infoHeading: "Built around your business",
    infoSubheading: "We combine strategy, design and technology to help teams ship faster and grow with confidence.",
    info2Heading: "Everything you need to grow",
    info2Paragraph: "From the first idea to the final launch, we stay with you at every step of the journey.",
    testiHeading: "Loved by our clients",
    testiSubheading: "Real stories from teams we have worked with.",
    contactHeading: "Let's talk about your project",
    contactSubheading: "Tell us what you need and we will get back to you within one business day.",
    contactCta: "Free Consultation",
    footerDescription: "Products that make life easier & better.",
  },
  corporate: {
    brand: "XTRA Corporation",
    links: ["Home", "About", "Services", "FAQ's", "Blog", "Portfolio", "Contact"],
    announcement: "Have questions? Call now +1 (818) 23 45 678",
    eyebrow: "Our services",
    heroTitle: "We Plan, We Execute, You Celebrate",
    heroSubtitle: "We Are Advertising Technology Experts That Drive Business Results.",
    heroCta: "Start Your New Project",
    infoHeading: "What we can do?",
    infoSubheading: "Financial functions, materials distribution and purchasing services handled end to end by one team.",
    info2Heading: "Accounting & purchasing services",
    info2Paragraph: "Streamlined processes and clear reporting so you can focus on what matters most.",
    testiHeading: "What our clients say",
    testiSubheading: "Trusted by companies across industries.",
    contactHeading: "Start your new project",
    contactSubheading: "Need help? Contact us and we will reach out shortly.",
    contactCta: "Send Message",
    footerDescription: "Advertising technology experts that drive business results.",
  },
  "corporate-red": {
    brand: "XTRA Corporate",
    links: ["Home", "Services", "FAQ's", "Blog", "Portfolio", "About Us", "Contact"],
    announcement: "Hotline 24/7 — +1 (800) 345 678",
    eyebrow: "Hotline 24/7",
    heroTitle: "We Bring Experimental",
    heroSubtitle: "Tackle your most significant business challenges with behavioral science, anthropology and strategic foresight to create powerful solutions.",
    heroCta: "Find Out How?",
    infoHeading: "Numbers that speak",
    infoSubheading: "Happy clients, long partnerships and projects delivered successfully.",
    info2Heading: "Strategy that delivers",
    info2Paragraph: "Practical, measurable solutions designed around the challenges your business faces today.",
    testiHeading: "Client success stories",
    testiSubheading: "Partners who grew with us.",
    contactHeading: "Get a free quote",
    contactSubheading: "Share your requirements and our team will prepare a tailored offer.",
    contactCta: "Get A Free Quote",
    footerDescription: "Experimental thinking for real business results.",
  },
  construction: {
    brand: "XTRA Construction",
    links: ["Home", "About", "Services", "FAQ", "Blog", "Contact"],
    announcement: "Have any questions? Call +1 (818) 23 45 678",
    eyebrow: "Since 1998",
    heroTitle: "START NEW PROJECTS",
    heroSubtitle: "Don’t get framed by the competition, trust our solid reputation.",
    heroCta: "Free Consultation",
    infoHeading: "Building Engineering & Safety Services",
    infoSubheading: "Explore our wide range of professional construction and road building services.",
    info2Heading: "Quality materials, skilled crew",
    info2Paragraph: "Our experienced team and carefully selected materials make sure every build lasts.",
    testiHeading: "Happy customers",
    testiSubheading: "What our clients say about working with us.",
    contactHeading: "Request a free consultation",
    contactSubheading: "Tell us about your project and we will schedule a site visit.",
    contactCta: "Free Consultation",
    footerDescription: "Quality construction you can rely on.",
  },
};

const IDENTITY = {
  announcement: ["text", (c) => c.announcement],
  header: ["brandName", (c) => c.brand],
  hero: ["title", (c) => c.heroTitle],
  info: ["heading", (c) => c.infoHeading],
  info2: ["heading", (c) => c.info2Heading],
  testimonials: ["heading", (c) => c.testiHeading],
  contact: ["heading", (c) => c.contactHeading],
  footer: ["copyright", (c) => `Copyright 2026 ${c.brand}. All Rights Reserved.`],
};

export function resolveVariant(section, item) {
  if (item?.variant && DESIGNS[item.variant]) return item.variant;
  const rule = IDENTITY[section];
  if (rule && item) {
    const [field, getValue] = rule;
    const found = DESIGN_KEYS.find((k) => item[field] === getValue(DESIGN_CONTENT[k]));
    if (found) return found;
  }
  return "business";
}

export const designColors = (key, section) => {
  const d = DESIGNS[key] || DESIGNS.business;
  return {
    announcement: [d.accent, d.accentText],
    header: [d.headerBg, d.headerText],
    hero: [d.bg, d.text],
    info: [d.alt, d.altText],
    info2: [d.bg, d.text],
    testimonials: [d.alt, d.altText],
    contact: [d.bg, d.text],
    footer: [d.footerBg, "#ffffff"],
  }[section] || [d.bg, d.text];
};

export function buildSeed(key, isLive = false) {
  const c = DESIGN_CONTENT[key];
  const mk = (section, extra) => {
    const [bgColor, textColor] = designColors(key, section);
    return { variant: key, bgColor, textColor, isVisible: isLive, ...extra };
  };
  const toLinks = (arr) =>
    arr.map((label, i) => ({
      label,
      url: i === 0 ? "/" : "/" + label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      isActive: true,
      order: i + 1,
    }));
  return {
    announcement: mk("announcement", { text: c.announcement }),
    header: mk("header", { brandName: c.brand, links: toLinks(c.links) }),
    hero: mk("hero", { title: c.heroTitle, subtitle: c.heroSubtitle, ctaText: c.heroCta, ctaUrl: "/contact" }),
    info: mk("info", { heading: c.infoHeading, subheading: c.infoSubheading }),
    info2: mk("info2", { heading: c.info2Heading, paragraph: c.info2Paragraph, imagePosition: "right" }),
    testimonials: mk("testimonials", { heading: c.testiHeading, subheading: c.testiSubheading }),
    contact: mk("contact", {
      heading: c.contactHeading, subheading: c.contactSubheading,
      phone: "+1 (818) 23 45 678", email: "hello@example.com", address: "New York, USA",
      submitText: c.contactCta,
    }),
    footer: mk("footer", {
      brandName: c.brand,
      copyright: `Copyright 2026 ${c.brand}. All Rights Reserved.`,
      description: c.footerDescription,
      links: toLinks(c.links.slice(0, 4)),
    }),
  };
}

export const SECTION_MAP = {
  announcement: {
    key: "announcement",
    title: { ar: "شريط الإعلانات", en: "Announcement Bar" },
    desc: { ar: "شريط التنبيهات العلوي في الموقع", en: "Top notification banner" },
    icon: Megaphone,
    color: "#ef4444",
    fields: [
      { name: "text", type: "text", label: { ar: "نص الإعلان", en: "Announcement Text" } },
      { name: "bgColor", type: "color", label: { ar: "لون الخلفية", en: "Background Color" } },
      { name: "textColor", type: "color", label: { ar: "لون النص", en: "Text Color" } },
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  header: {
    key: "header",
    title: { ar: "الهيدر (الرأس)", en: "Header" },
    desc: { ar: "تحكمي في الشعار وروابط التنقل والزر الرئيسي", en: "Manage the brand logo, navigation and primary action" },
    icon: Layout,
    color: "#3b82f6",
    fields: [
      { name: "brandName", type: "text", label: { ar: "اسم العلامة التجارية", en: "Brand Name" } },
      { name: "logo", type: "image", label: { ar: "الشعار", en: "Logo" } },
      { name: "bgColor", type: "color", label: { ar: "لون الخلفية", en: "Background Color" } },
      { name: "textColor", type: "color", label: { ar: "لون النص", en: "Text Color" } },
      { name: "links", type: "links", label: { ar: "روابط القائمة", en: "Navigation Links" } },
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  hero: {
    key: "hero",
    title: { ar: "القسم الرئيسي (الهيرو)", en: "Hero Section" },
    desc: { ar: "عدّلي الواجهة الرئيسية والعنوان والصورة", en: "Edit the main banner, heading and image" },
    icon: Home,
    color: "#8b5cf6",
    fields: [
      { name: "title", type: "text", label: { ar: "العنوان الرئيسي", en: "Main Title" } },
      { name: "subtitle", type: "text", label: { ar: "العنوان الفرعي", en: "Subtitle" } },
      { name: "image", type: "image", label: { ar: "صورة الغلاف", en: "Cover Image" } },
      { name: "ctaText", type: "text", label: { ar: "نص الزر", en: "CTA Text" } },
      { name: "ctaUrl", type: "text", label: { ar: "رابط الزر", en: "CTA URL" } },
      { name: "bgColor", type: "color", label: { ar: "لون الخلفية", en: "Background Color" } },
      { name: "textColor", type: "color", label: { ar: "لون النص", en: "Text Color" } },
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  info: {
    key: "info",
    title: { ar: "من نحن / الخدمات (مع سلايدر)", en: "About Us & Services (Slider)" },
    desc: { ar: "عرض الخدمات والميزات في سلايدر تفاعلي", en: "Introduce your brand with an interactive slider" },
    icon: Info,
    color: "#10b981",
    fields: [
      { name: "heading", type: "text", label: { ar: "العنوان الرئيسي", en: "Main Heading" } },
      { name: "subheading", type: "textarea", label: { ar: "الوصف والمحتوى", en: "Description / Content" } },
      { name: "bgColor", type: "color", label: { ar: "لون الخلفية", en: "Background Color" } },
      { name: "textColor", type: "color", label: { ar: "لون النص", en: "Text Color" } },
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  info2: {
    key: "info2",
    title: { ar: "المحتوى المميز", en: "Featured Content" },
    desc: { ar: "اعرضي محتوى إضافيًا ورسائل مهمة", en: "Highlight supporting content and key messages" },
    icon: Sparkles,
    color: "#06b6d4",
    fields: [
      { name: "heading", type: "text", label: { ar: "العنوان الرئيسي", en: "Main Heading" } },
      { name: "paragraph", type: "textarea", label: { ar: "الوصف والمحتوى", en: "Description / Content" } },
      { name: "image", type: "image", label: { ar: "الصورة التوضيحية", en: "Cover Image" } },
      { name: "imagePosition", type: "text", label: { ar: "موضع الصورة", en: "Image Position" } },
      { name: "bgColor", type: "color", label: { ar: "لون الخلفية", en: "Background Color" } },
      { name: "textColor", type: "color", label: { ar: "لون النص", en: "Text Color" } },
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  testimonials: {
    key: "testimonials",
    title: { ar: "آراء الزوار (سلايدر)", en: "Testimonials Slider" },
    desc: { ar: "اعرضي تجارب وآراء العملاء بسلايدر", en: "Show customer reviews with a smooth slider" },
    icon: MessageSquare,
    color: "#f59e0b",
    fields: [
      { name: "heading", type: "text", label: { ar: "عنوان القسم", en: "Section Heading" } },
      { name: "subheading", type: "text", label: { ar: "العنوان الفرعي", en: "Subheading" } },
      { name: "bgColor", type: "color", label: { ar: "لون الخلفية", en: "Background Color" } },
      { name: "textColor", type: "color", label: { ar: "لون النص", en: "Text Color" } },
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  contact: {
    key: "contact",
    title: { ar: "الحجز والتواصل", en: "Reservations & Contact" },
    desc: { ar: "بيانات التواصل والحجوزات والاستفسارات", en: "Contact details, reservations and inquiries" },
    icon: PhoneCall,
    color: "#ec4899",
    fields: [
      { name: "heading", type: "text", label: { ar: "عنوان التواصل", en: "Membership Heading" } },
      { name: "subheading", type: "textarea", label: { ar: "رسالة الترحيب", en: "Welcome Message" } },
      { name: "phone", type: "text", label: { ar: "رقم الهاتف / الواتساب", en: "Phone Number" } },
      { name: "email", type: "text", label: { ar: "البريد الإلكتروني", en: "Email Address" } },
      { name: "address", type: "text", label: { ar: "العنوان أو المدينة", en: "Address" } },
      { name: "submitText", type: "text", label: { ar: "نص زر الحجز", en: "Booking Button Text" } },
      { name: "bgColor", type: "color", label: { ar: "لون الخلفية", en: "Background Color" } },
      { name: "textColor", type: "color", label: { ar: "لون النص", en: "Text Color" } },
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  footer: {
    key: "footer",
    title: { ar: "الفوتر (تذييل الصفحة)", en: "Footer" },
    desc: { ar: "عدّلي الروابط وبيانات الحقوق في نهاية الصفحة", en: "Manage footer links and copyright details" },
    icon: Footprints,
    color: "#64748b",
    fields: [
      { name: "brandName", type: "text", label: { ar: "اسم المكان", en: "Brand Name" } },
      { name: "copyright", type: "text", label: { ar: "حقوق النشر والملكية", en: "Copyright Text" } },
      { name: "description", type: "textarea", label: { ar: "نبذة الفوتر / الشعار", en: "Footer Description / Tagline" } },
      { name: "bgColor", type: "color", label: { ar: "لون الخلفية", en: "Background Color" } },
      { name: "textColor", type: "color", label: { ar: "لون النص", en: "Text Color" } },
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  }
};

const VARIANT_FIELD = {
  name: "variant",
  type: "variant",
  label: { ar: "التصميم", en: "Design" },
};
Object.values(SECTION_MAP).forEach((s) => s.fields.unshift(VARIANT_FIELD));

export const GROUPS = [
  {
    title: { ar: "الهيدر والإعلانات", en: "Header & Announcements" },
    items: [
      SECTION_MAP.announcement,
      SECTION_MAP.header,
    ]
  },
  {
    title: { ar: "الرئيسية والمحتوى", en: "Home & Content" },
    items: [
      SECTION_MAP.hero,
      SECTION_MAP.info,
      SECTION_MAP.info2,
      SECTION_MAP.testimonials,
    ]
  },
  {
    title: { ar: "التواصل والفوتر", en: "Contact & Footer" },
    items: [
      SECTION_MAP.contact,
      SECTION_MAP.footer,
    ]
  }
];