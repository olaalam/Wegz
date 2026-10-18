import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

export default function GenericDataTable({
  columns,
  data = [],
  title,
  onAdd,
  onEdit,
  onDelete,
  isLoading = false,
  lang = "en",
}) {
  const [search, setSearch] = useState("");
  const isRTL = lang === "ar";
  const visibleRows = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return data;
    return data.filter((row) =>
      columns.some((column) =>
        String(column.value ? column.value(row) : row[column.key] ?? "")
          .toLocaleLowerCase()
          .includes(query)
      )
    );
  }, [columns, data, search]);

  const labels = isRTL
    ? { search: "بحث...", add: "إضافة قالب", empty: "لا توجد قوالب", loading: "جاري التحميل...", edit: "تعديل", delete: "حذف", activate: "تفعيل", actions: "الإجراءات" }
    : { search: "Search themes...", add: "Add theme", empty: "No themes found", loading: "Loading themes...", edit: "Edit", delete: "Delete", activate: "Activate", actions: "Actions" };

  return (
    <section className="mx-auto w-full max-w-5xl space-y-5">
      <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">{title}</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{isRTL ? "إدارة قوالب المتجر" : "Manage your store themes"}</p>
        </div>
        {onAdd && (
          <button type="button" onClick={onAdd} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
            <Plus className="h-4 w-4" aria-hidden="true" />
            {labels.add}
          </button>
        )}
      </div>

      <label className="relative block max-w-sm">
        <Search className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)] ${isRTL ? "right-3" : "left-3"}`} aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={labels.search}
          aria-label={labels.search}
          className={`h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--ring)] ${isRTL ? "pr-9 pl-3" : "pl-9 pr-3"}`}
        />
      </label>

      <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-[var(--muted)]/50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" className={`px-5 py-3 font-semibold text-[var(--muted-foreground)] ${isRTL ? "text-right" : "text-left"}`}>
                  {column.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th scope="col" className={`px-5 py-3 font-semibold text-[var(--muted-foreground)] ${isRTL ? "text-left" : "text-right"}`}>
                  {labels.actions}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {isLoading ? (
              <tr><td colSpan={columns.length + 1} className="px-5 py-12 text-center text-[var(--muted-foreground)]">{labels.loading}</td></tr>
            ) : visibleRows.length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="px-5 py-12 text-center text-[var(--muted-foreground)]">{labels.empty}</td></tr>
            ) : visibleRows.map((row) => (
              <tr key={row.id ?? row._id} className="hover:bg-[var(--muted)]/30">
                {columns.map((column) => (
                  <td key={column.key} className="px-5 py-4 text-[var(--foreground)]">
                    {column.render ? column.render(row) : (column.value ? column.value(row) : row[column.key]) || "—"}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-5 py-4">
                    <div className={`flex items-center gap-1 ${isRTL ? "justify-start" : "justify-end"}`}>
                      {onEdit && (
                        <button type="button" onClick={() => onEdit(row)} aria-label={`${labels.edit}: ${row.name}`} title={labels.edit} className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--primary)]">
                          <Pencil className="h-4 w-4" aria-hidden="true" />
                        </button>
                      )}
                      {onDelete && (
                        <button type="button" onClick={() => onDelete(row)} aria-label={`${labels.delete}: ${row.name}`} title={labels.delete} className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
