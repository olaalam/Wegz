import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";

import { useMutation } from "../../hooks/useMutation";
import AddPage from "../../components/AddPage";
import { usePost } from "../../hooks/usePost";



import Loader from "../../components/common/Loader";
import { useGet } from "../../hooks/useGet";
import { API_ENDPOINTS } from "../../utils/constants";
import EmptyState from "../../components/ui/EmptyState";

const getThemes = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.themes)) return response.themes;
  if (Array.isArray(response?.data?.themes)) return response.data.themes;
  return null;
};

const themeUrl = (endpoint, id) => endpoint.replace("{id}", encodeURIComponent(id));

export default function ThemeAdd() {
  const lang = useSelector((state) => state.ui.lang);
  const isRTL = lang === "ar";
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { data, loading: themesLoading, error: themesError } = useGet(API_ENDPOINTS.THEME.GET);
  const { execute, loading: creating } = usePost();
  const { mutate, loading: updating } = useMutation();
  const themes = useMemo(() => getThemes(data), [data]);
  const themeFromList = themes?.find((item) => String(item._id) === String(id));
  const initialData = id ? (location.state?.theme ?? themeFromList) : null;
  const isEdit = Boolean(id);

  const labels = useMemo(() => isRTL
    ? { addTitle: "إضافة قالب", editTitle: "تعديل القالب", name: "اسم القالب", description: "الوصف", requiredName: "اسم القالب مطلوب.", loadError: "تعذر تحميل بيانات القالب.", notFound: "القالب المطلوب غير موجود.", createError: "تعذرت إضافة القالب.", updateError: "تعذر حفظ التعديلات.", createSuccess: "تمت إضافة القالب بنجاح.", updateSuccess: "تم تحديث القالب بنجاح." }
    : { addTitle: "Add theme", editTitle: "Edit theme", name: "Theme name", description: "Description", requiredName: "Theme name is required.", loadError: "Failed to load theme details.", notFound: "The requested theme was not found.", createError: "Could not create the theme.", updateError: "Could not save the changes.", createSuccess: "Theme created successfully.", updateSuccess: "Theme updated successfully." }, [isRTL]);
  const fields = useMemo(() => [
    { name: "name", label: labels.name, required: true },
    { name: "description", label: labels.description, type: "textarea" },
  ], [labels]);

  const handleSubmit = async (values) => {
    const name = values.name.trim();
    if (!name) {
      toast.error(labels.requiredName);
      return;
    }
    const payload = { name, description: values.description.trim() };
    const result = isEdit
      ? await mutate(themeUrl(API_ENDPOINTS.THEME.UPDATE, id), "PATCH", payload)
      : await execute(API_ENDPOINTS.THEME.CREATE, payload);

    if (!result.success) {
      toast.error(result.error || (isEdit ? labels.updateError : labels.createError));
      return;
    }
    toast.success(isEdit ? labels.updateSuccess : labels.createSuccess);
    navigate("/themes");
  };

  if (isEdit && themesLoading && !initialData) return <Loader text={labels.loadError} />;
  if (isEdit && !initialData && (themesError || !themesLoading)) {
    return <EmptyState title={labels.loadError} description={themesError || labels.notFound} action={<button type="button" onClick={() => navigate("/themes")} className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">{isRTL ? "العودة للقوالب" : "Back to themes"}</button>} />;
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <AddPage
        key={isEdit ? `${id}:${initialData?._id ?? "loading"}` : "new-theme"}
        title={isEdit ? labels.editTitle : labels.addTitle}
        fields={fields}
        initialData={initialData ?? {}}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/themes")}
        isLoading={creating || updating}
        lang={lang}
      />
    </div>
  );
}
