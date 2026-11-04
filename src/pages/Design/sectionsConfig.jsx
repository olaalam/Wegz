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
    desc: { ar: "تحكمي في شعار الجيم وروابط القائمة وزر الاشتراك", en: "Manage the gym logo, navigation and membership button" },
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
    desc: { ar: "عدّلي واجهة الجيم الرئيسية والعنوان وصورة التدريب", en: "Edit the gym's main banner, heading and training image" },
    icon: Home,
    color: "#8b5cf6",
    fields: [
      { name: "title", type: "text", label: { ar: "العنوان الرئيسي", en: "Main Title" } },
      { name: "subtitle", type: "text", label: { ar: "العنوان الفرعي", en: "Subtitle" } },
      { name: "image", type: "image", label: { ar: "صورة الغلاف", en: "Cover Image" } },
      { name: "ctaText", type: "text", label: { ar: "نص الزر", en: "CTA Text" } },
      { name: "ctaUrl", type: "text", label: { ar: "رابط الزر", en: "CTA URL" } },
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  info: {
    key: "info",
    title: { ar: "عن الجيم", en: "About the Gym" },
    desc: { ar: "قدمي الجيم ومميزاته وخدماته", en: "Introduce the gym, its benefits and services" },
    icon: Info,
    color: "#10b981",
    fields: [
      { name: "heading", type: "text", label: { ar: "العنوان الرئيسي", en: "Main Heading" } },
      { name: "subheading", type: "textarea", label: { ar: "الوصف والمحتوى", en: "Description / Content" } },
      { name: "image", type: "image", label: { ar: "الصورة التوضيحية", en: "Cover Image" } },
      { name: "ctaText", type: "text", label: { ar: "نص زر الإجراء", en: "CTA Button Text" } },
      { name: "ctaUrl", type: "text", label: { ar: "رابط زر الإجراء", en: "CTA Button URL" } },
      { name: "bgColor", type: "color", label: { ar: "لون الخلفية", en: "Background Color" } },
      { name: "textColor", type: "color", label: { ar: "لون النص", en: "Text Color" } },
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  info2: {
    key: "info2",
    title: { ar: "البرامج والتدريب", en: "Programs & Training" },
    desc: { ar: "اعرضي أنواع التدريب والبرامج المتاحة", en: "Show the available training styles and programs" },
    icon: Sparkles,
    color: "#06b6d4",
    fields: [
      { name: "heading", type: "text", label: { ar: "العنوان الرئيسي", en: "Main Heading" } },
      { name: "subheading", type: "textarea", label: { ar: "الوصف والمحتوى", en: "Description / Content" } },
      { name: "image", type: "image", label: { ar: "الصورة التوضيحية", en: "Cover Image" } },
      { name: "ctaText", type: "text", label: { ar: "نص زر الإجراء", en: "CTA Button Text" } },
      { name: "ctaUrl", type: "text", label: { ar: "رابط زر الإجراء", en: "CTA Button URL" } },
      { name: "bgColor", type: "color", label: { ar: "لون الخلفية", en: "Background Color" } },
      { name: "textColor", type: "color", label: { ar: "لون النص", en: "Text Color" } },
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  testimonials: {
    key: "testimonials",
    title: { ar: "آراء العملاء", en: "Testimonials" },
    desc: { ar: "اعرضي تجارب وآراء أعضاء الجيم", en: "Show gym members' stories and reviews" },
    icon: MessageSquare,
    color: "#f59e0b",
    fields: [
      { name: "heading", type: "text", label: { ar: "عنوان القسم", en: "Section Heading" } },
      { name: "subheading", type: "text", label: { ar: "العنوان الفرعي", en: "Subheading" } },
      { name: "clientName", type: "text", label: { ar: "اسم العميل", en: "Client Name" } },
      { name: "clientRole", type: "text", label: { ar: "الصفة / الوظيفة (مثال: عميل موثق)", en: "Client Role / Badge" } },
      { name: "feedback", type: "textarea", label: { ar: "نص رأي العميل / التقييم", en: "Review / Testimonial Text" } },
      { name: "rating", type: "text", label: { ar: "التقييم بالنجوم (1-5)", en: "Rating (1 to 5)" } },
      { name: "bgColor", type: "color", label: { ar: "لون الخلفية", en: "Background Color" } },
      { name: "textColor", type: "color", label: { ar: "لون النص", en: "Text Color" } },
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  contact: {
    key: "contact",
    title: { ar: "انضمي إلى النادي", en: "Join the Club" },
    desc: { ar: "بيانات الجيم ومعلومات التواصل والانضمام", en: "Gym details, contact information and membership inquiries" },
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
    desc: { ar: "عدّلي روابط الجيم وبيانات الحقوق في نهاية الصفحة", en: "Manage gym links and copyright details" },
    icon: Footprints,
    color: "#64748b",
    fields: [
      { name: "copyright", type: "text", label: { ar: "حقوق النشر والملكية", en: "Copyright Text" } },
      { name: "text", type: "textarea", label: { ar: "نبذة الفوتر / الشعار", en: "Footer Description / Tagline" } },
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
    title: { ar: "الرئيسية ومحتوى الجيم", en: "Home & Gym Content" },
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