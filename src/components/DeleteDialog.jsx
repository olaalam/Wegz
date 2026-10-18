export default function DeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  error = "",
  title,
  description,
  cancelLabel,
  confirmLabel,
  loadingLabel,
}) {
  if (!isOpen) return null;

  const close = () => {
    if (!isLoading) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        className="w-full max-w-md space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl"
      >
        <div className="space-y-2">
          <h2 id="delete-dialog-title" className="text-lg font-bold text-[var(--foreground)]">
            {title}
          </h2>
          <p id="delete-dialog-description" className="text-sm text-[var(--muted-foreground)]">
            {description}
          </p>
          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={close}
            className="min-h-10 rounded-xl border border-[var(--border)] px-4 text-sm font-medium text-[var(--foreground)] disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="min-h-10 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-wait disabled:opacity-60"
          >
            {isLoading ? loadingLabel : confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
