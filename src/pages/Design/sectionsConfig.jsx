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
    desc: { ar: "تحكم في الشعار وروابط القائمة العلوية", en: "Manage logo and navigation links" },
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
    desc: { ar: "تحكم في الواجهة الرئيسية والعنوان الرئيسي وزر الإجراء", en: "Manage main banner, heading and CTA" },
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
    title: { ar: "معلومات عنا (1)", en: "Information 1" },
    desc: { ar: "قسم المعلومات والتعريف الأول", en: "First info and description section" },
    icon: Info,
    color: "#10b981",
    fields: [
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  info2: {
    key: "info2",
    title: { ar: "معلومات عنا (2)", en: "Information 2" },
    desc: { ar: "قسم المعلومات والتعريف الثاني", en: "Second info and description section" },
    icon: Sparkles,
    color: "#06b6d4",
    fields: [
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  testimonials: {
    key: "testimonials",
    title: { ar: "آراء العملاء", en: "Testimonials" },
    desc: { ar: "عرض تقييمات وآراء العملاء والزوار", en: "Showcase customer reviews and feedback" },
    icon: MessageSquare,
    color: "#f59e0b",
    fields: [
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  contact: {
    key: "contact",
    title: { ar: "تواصل معنا", en: "Contact Us" },
    desc: { ar: "معلومات التواصل، العنوان، وأرقام الهواتف", en: "Contact details, address and phones" },
    icon: PhoneCall,
    color: "#ec4899",
    fields: [
      { name: "isVisible", type: "toggle", label: { ar: "تفعيل القسم", en: "Is Active" } }
    ]
  },
  footer: {
    key: "footer",
    title: { ar: "الفوتر (تذييل الصفحة)", en: "Footer" },
    desc: { ar: "روابط الحقوق والنهاية في الموقع", en: "Manage footer links and copyrights" },
    icon: Footprints,
    color: "#64748b",
    fields: [
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
    title: { ar: "الصفحة الرئيسية والمحتوى", en: "Home & Content" },
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