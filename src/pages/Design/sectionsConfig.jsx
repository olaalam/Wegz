import { 
  Home, 
  Info, 
  Sparkles, 
  PhoneCall, 
  Megaphone, 
  Layout, 
  MessageSquare, 
  Footprints 
} from "lucide-react";

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
    title: { ar: "من نحن", en: "About Us" },
    desc: { ar: "قدمي المكان وقصته وخدماته", en: "Introduce your brand, story and services" },
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
    title: { ar: "آراء الزوار", en: "Testimonials" },
    desc: { ar: "اعرضي تجارب وآراء العملاء", en: "Show customer stories and reviews" },
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
      { name: "heading", type: "text", label: { ar: "عنوان الدعوة للانضمام", en: "Membership Heading" } },
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
      { name: "links", type: "links", label: { ar: "روابط الفوتر", en: "Footer Navigation Links" } },
      { name: "bgColor", type: "color", label: { ar: "لون الخلفية", en: "Background Color" } },
      { name: "textColor", type: "color", label: { ar: "لون النص", en: "Text Color" } },
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  }
};

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

export const GYM_PRESETS = {
  announcement: { match: { text: "MOVE. BREATH. WORKOUT. LIVE. LOVE. REPEAT." } },
  header: { match: { brandName: "GYM" } },
  hero: { match: { title: "Results Driven Fitness Trainings." } },
  info: { match: { heading: "Feel good, look gorgeous." } },
  info2: { match: { heading: "Unlimited Training" } },
  testimonials: { match: { heading: "Enjoyed The Experience" } },
  contact: { match: { heading: "Join The Club" } },
  footer: { match: { copyright: "Copyright 2026 XTRA GYM. All Rights Reserved." } },
};

export const RESTAURANT_PRESETS = {
  announcement: {
    match: { text: "GOOD FOOD MAKES GREAT MOOD" },
    values: {
      text: "GOOD FOOD MAKES GREAT MOOD",
      bgColor: "#242522",
      textColor: "#f6f1e8",
      isVisible: false,
    },
  },
  header: {
    match: { brandName: "Restaurant" },
    values: {
      brandName: "Restaurant",
      bgColor: "#242522",
      textColor: "#f6f1e8",
      links: [
        { label: "Home", url: "/", isActive: true, order: 1 },
        { label: "Menus", url: "/our-menu", isActive: true, order: 2 },
        { label: "Order", url: "/shop", isActive: true, order: 3 },
        { label: "About", url: "/about-us", isActive: true, order: 4 },
        { label: "Reserve", url: "/reserve-contact-2", isActive: true, order: 5 },
        { label: "Contact", url: "/reserve-contact-2", isActive: true, order: 6 },
      ],
      isVisible: false,
    },
  },
  hero: {
    match: { title: "Good food makes great mood" },
    values: {
      title: "Good food makes great mood",
      subtitle: "Not fast food, but good food fast.",
      ctaText: "Reserve Your Table",
      ctaUrl: "/reserve-contact-2",
      bgColor: "#242522",
      textColor: "#f6f1e8",
      isVisible: false,
    },
  },
  info: {
    match: { heading: "Traditional & Family Recipes" },
    values: {
      heading: "Traditional & Family Recipes",
      subheading: "A welcoming neighborhood table, serving familiar favorites and fresh flavors made for sharing.",
      bgColor: "#f6f1e8",
      textColor: "#242522",
      isVisible: false,
    },
  },
  info2: {
    match: { heading: "Foods Menu" },
    values: {
      heading: "Foods Menu",
      paragraph: "Browse seasonal starters, fresh salads, soups, and satisfying main dishes.",
      imagePosition: "right",
      image: "",
      bgColor: "#242522",
      textColor: "#f6f1e8",
      isVisible: false,
    },
  },
  testimonials: {
    match: { heading: "Happy Visitors" },
    values: {
      heading: "Happy Visitors",
      subheading: "Good meals and warm hospitality, remembered by our guests.",
      bgColor: "#f6f1e8",
      textColor: "#242522",
      isVisible: false,
    },
  },
  contact: {
    match: { heading: "Reserve Your Table" },
    values: {
      heading: "Reserve Your Table",
      subheading: "Planning a visit? Send us a reservation request and our team will be in touch.",
      phone: "",
      email: "",
      address: "",
      submitText: "Request a Table",
      bgColor: "#242522",
      textColor: "#f6f1e8",
      isVisible: false,
    },
  },
  footer: {
    match: { copyright: "Copyright 2026 Restaurant. All Rights Reserved." },
    values: {
      brandName: "Restaurant",
      copyright: "Copyright 2026 Restaurant. All Rights Reserved.",
      description: "Good food makes great mood.",
      links: [
        { label: "Home", url: "/", isActive: true, order: 1 },
        { label: "Menus", url: "/our-menu", isActive: true, order: 2 },
        { label: "Reserve", url: "/reserve-contact-2", isActive: true, order: 3 },
        { label: "Contact", url: "/reserve-contact-2", isActive: true, order: 4 },
      ],
      bgColor: "#171815",
      textColor: "#f6f1e8",
      isVisible: false,
    },
  },
};