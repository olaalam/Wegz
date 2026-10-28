import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import AddPage from "../../components/AddPage";
import { useMutation } from "../../hooks/useMutation";
import { SECTION_MAP } from "./sectionsConfig";

export default function SectionAdd() {
  const { section } = useParams();
  const navigate = useNavigate();
  const lang = useSelector((state) => state.ui.lang) === "ar" ? "ar" : "en";
  const isRtl = lang === "ar";
  const config = SECTION_MAP[section];
  const { mutate, loading } = useMutation();

  const fields = useMemo(() => config?.fields.map((field) => ({
    ...field,
    label: field.label[lang],
    defaultValue: field.name === "isVisible" ? true : field.defaultValue,
  })) ?? [], [config, lang]);

  if (!config) return <Navigate to="/admin/website/dashboard" replace />;

  const handleSubmit = async (values) => {
    const hasImage = fields.some((field) => field.type === "image" && values[field.name] instanceof File);
    let payload = values;
    let requestConfig = {};

    if (hasImage) {
      payload = new FormData();
      fields.forEach((field) => {
        const value = values[field.name];
        if (value === undefined || value === "") return;
        if (field.type === "image" && value instanceof File) {
          payload.append(field.name, value);
        } else if (Array.isArray(value) || (value && typeof value === "object")) {
          payload.append(field.name, JSON.stringify(value));
        } else {
          payload.append(field.name, String(value));
        }
      });
      requestConfig = { headers: { "Content-Type": "multipart/form-data" } };
    }

    const result = await mutate(
      `/api/admin/sections/${section}`,
      "POST",
      payload,
      requestConfig
    );

    if (!result.success) {
      toast.error(result.error || (isRtl ? "تعذرت إضافة العنصر." : "Could not add this item."));
      return;
    }

    toast.success(isRtl ? "تمت إضافة العنصر بنجاح." : "Item added successfully.");
    const newId = result.data?.data?._id || result.data?._id;
    navigate(`/admin/website/${section}/settings${newId ? `?id=${newId}` : ""}`);
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6">
      <AddPage
        key={section}
        title={isRtl ? `إضافة إلى ${config.title.ar}` : `Add to ${config.title.en}`}
        fields={fields}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/admin/website/${section}/settings`)}
        isLoading={loading}
        lang={lang}
        saveLabel={isRtl ? "إضافة" : "Add"}
        savingLabel={isRtl ? "جاري الإضافة..." : "Adding..."}
      />
    </div>
  );
}
