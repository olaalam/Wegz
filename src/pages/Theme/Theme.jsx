import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useGet } from "../../hooks/useGet";

import { useMutation } from "../../hooks/useMutation";

 import { useDelete } from "../../hooks/useDelete";
import { API_ENDPOINTS } from "../../utils/constants";
import GenericDataTable from "../../components/GenericDataTable";
import EmptyState from "../../components/ui/EmptyState";
import DeleteDialog from "../../components/DeleteDialog";

const getThemes = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.themes)) return response.themes;
  if (Array.isArray(response?.data?.themes)) return response.data.themes;
  return null;
};

const themeUrl = (endpoint, id) => endpoint.replace("{id}", encodeURIComponent(id));
const isThemeActive = (theme) =>
  theme.isActive === true ||
  theme.isActive === 1 ||
  theme.isActive === "true" ||
  theme.is_active === true ||
  theme.is_active === 1 ||
  theme.active === true ||
  theme.active === 1 ||
  String(theme.status).toLowerCase() === "active";

function ThemeStatusSwitch({ theme, lang, disabled, onChange }) {
  const isActive = theme.is_active;
  const label = lang === "ar"
    ? `${isActive ? "إيقاف" : "تفعيل"} ${theme.name}`
    : `${isActive ? "Deactivate" : "Activate"} ${theme.name}`;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isActive}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(theme, !isActive)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 ${isActive ? "bg-red-600" : "bg-slate-300"}`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${isActive ? (lang === "ar" ? "-translate-x-6" : "translate-x-6") : "translate-x-1"}`}
      />
    </button>
  );
}

export default function Theme() {
  const lang = useSelector((state) => state.ui.lang);
  const isRTL = lang === "ar";
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useGet(API_ENDPOINTS.THEME.GET);
  const { mutate } = useMutation();
  const { remove } = useDelete();
  const [pendingActionId, setPendingActionId] = useState(null);
  const [themeToDelete, setThemeToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const themes = useMemo(() => {
    const items = getThemes(data);
    return items?.map((theme) => ({ ...theme, is_active: isThemeActive(theme) })) ?? items;
  }, [data]);

  const labels = isRTL
    ? { title: "القوالب", name: "اسم القالب", description: "الوصف", status: "الحالة", active: "نشط", inactive: "غير نشط", loadError: "تعذر تحميل القوالب", invalidResponse: "استجابة القوالب من الخادم غير صالحة.", retry: "إعادة المحاولة", deleteTitle: "تأكيد حذف القالب", deleteConfirm: "هل أنتِ متأكدة من حذف هذا القالب؟", cancel: "إلغاء", confirmDelete: "حذف", deleting: "جاري الحذف...", deleteError: "تعذر حذف القالب.", deleteSuccess: "تم حذف القالب بنجاح." }
    : { title: "Themes", name: "Name", description: "Description", status: "Status", active: "Active", inactive: "Inactive", loadError: "Failed to load themes", invalidResponse: "The themes API returned an invalid response.", retry: "Try again", deleteTitle: "Delete theme", deleteConfirm: "Are you sure you want to delete this theme?", cancel: "Cancel", confirmDelete: "Delete", deleting: "Deleting...", deleteError: "Could not delete the theme.", deleteSuccess: "Theme deleted successfully." };

  const handleStatusChange = async (theme, isActive) => {
    setPendingActionId(theme._id);
    const result = isActive
      ? await mutate(themeUrl(API_ENDPOINTS.THEME.ACTIVATE, theme._id), "PATCH")
      : await mutate(
        themeUrl(API_ENDPOINTS.THEME.UPDATE, theme._id),
        "PATCH",
        { isActive: false }
      );
    setPendingActionId(null);
    if (!result.success) {
      toast.error(result.error || (isRTL ? "تعذر تغيير حالة القالب." : "Could not update the theme status."));
      return;
    }
    toast.success(isRTL ? "تم تحديث حالة القالب." : "Theme status updated.");
    await refetch();
  };

  const handleDelete = async (theme) => {
    setThemeToDelete(theme);
    setDeleteError("");
  };

  const confirmDelete = async () => {
    if (!themeToDelete) return;
    setPendingActionId(themeToDelete._id);
    setDeleteError("");
    try {
      const result = await remove(themeUrl(API_ENDPOINTS.THEME.DELETE, themeToDelete._id));
      if (!result.success) {
        setDeleteError(result.error || labels.deleteError);
        return;
      }
      toast.success(labels.deleteSuccess);
      setThemeToDelete(null);
      await refetch();
    } finally {
      setPendingActionId(null);
    }
  };

  if (error) {
    return (
      <EmptyState
        title={labels.loadError}
        description={error}
        action={<button type="button" onClick={refetch} className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">{labels.retry}</button>}
      />
    );
  }

  if (!loading && themes === null) {
    return <EmptyState title={labels.loadError} description={labels.invalidResponse} />;
  }

  const columns = [
    { key: "name", header: labels.name },
    { key: "description", header: labels.description },
    {
      key: "status",
      header: labels.status,
      value: (theme) => theme.is_active ? labels.active : labels.inactive,
      render: (theme) => (
        <ThemeStatusSwitch
          theme={theme}
          lang={lang}
          disabled={pendingActionId === theme._id}
          onChange={handleStatusChange}
        />
      ),
    },
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <GenericDataTable
        columns={columns}
        data={themes ?? []}
        title={labels.title}
        isLoading={loading}
        lang={lang}
        onAdd={() => navigate("/themes/add")}
        onEdit={(theme) => navigate(`/themes/edit/${encodeURIComponent(theme._id)}`, { state: { theme } })}
        onDelete={handleDelete}
      />
      <DeleteDialog
        isOpen={Boolean(themeToDelete)}
        onClose={() => {
          setThemeToDelete(null);
          setDeleteError("");
        }}
        onConfirm={confirmDelete}
        isLoading={pendingActionId !== null}
        error={deleteError}
        title={labels.deleteTitle}
        description={themeToDelete
          ? <>{labels.deleteConfirm} <span className="font-semibold text-[var(--foreground)]">{themeToDelete.name}</span></>
          : ""}
        cancelLabel={labels.cancel}
        confirmLabel={labels.confirmDelete}
        loadingLabel={labels.deleting}
      />
    </div>
  );
}
