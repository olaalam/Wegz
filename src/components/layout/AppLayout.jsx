import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Palette,
} from "lucide-react";
import Navbar from "./Navbar";
import { GROUPS } from "../../pages/Design/sectionsConfig";

export default function AppLayout({ children }) {
  const lang = useSelector((state) => state.ui.lang);
  const location = useLocation();

  const [isExpanded, setIsExpanded] = useState(true);
  const [sectionsOpen, setSectionsOpen] = useState(true);
  const isRTL = lang === "ar";

  const isDesignStudioActive = location.pathname.startsWith("/admin/website");

  const ToggleIcon = isExpanded
    ? isRTL
      ? ChevronRight
      : ChevronLeft
    : isRTL
    ? ChevronLeft
    : ChevronRight;

  const toggleLabel = isExpanded
    ? isRTL
      ? "إغلاق القائمة الجانبية"
      : "Collapse sidebar"
    : isRTL
    ? "فتح القائمة الجانبية"
    : "Expand sidebar";

  return (
    <div className="flex min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      {/* Mobile overlay */}
      {isExpanded && (
        <button
          type="button"
          aria-label={isRTL ? "إغلاق القائمة الجانبية" : "Close sidebar"}
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sticky top-0 z-50 flex h-screen shrink-0 flex-col border-e border-[var(--border)] bg-[var(--card)] py-4 transition-[width] duration-200 ${
          isExpanded
            ? "w-56 px-3 max-lg:fixed max-lg:inset-y-0 max-lg:start-0 max-lg:shadow-xl"
            : "w-14 px-2"
        }`}
      >
        {/* Logo + Toggle */}
        <div
          className={`mb-6 flex items-center gap-2 ${
            isExpanded ? "justify-between" : "flex-col"
          }`}
        >
          <div className="flex h-9 min-w-0 items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-sm font-black text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-500/10">
              W
            </span>
            {isExpanded && (
              <div className="flex flex-col leading-tight">
                <span className="truncate text-sm font-black tracking-tight text-[var(--foreground)]">
                  Wegz
                </span>
                <span className="text-[9px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  Admin Studio
                </span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            aria-label={toggleLabel}
            title={toggleLabel}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            <ToggleIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          aria-label={isRTL ? "التنقل الرئيسي" : "Main navigation"}
          className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain"
        >
          {/* ── Design Studio ── */}
          <div>
            {/* Main item row */}
            <div
              className={`flex min-h-10 items-center gap-3 rounded-lg text-sm transition-colors ${
                isExpanded ? "justify-start px-3" : "justify-center px-2"
              } ${
                isDesignStudioActive
                  ? "bg-[var(--accent)] font-semibold text-[var(--primary)]"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <NavLink
                to="/admin/website/dashboard"
                title={isRTL ? "استوديو التصميم" : "Design Studio"}
                className="flex flex-1 items-center gap-3 min-w-0"
                aria-current={isDesignStudioActive ? "page" : undefined}
              >
                <LayoutDashboard className="h-4 w-4 shrink-0" aria-hidden="true" />
                {isExpanded && (
                  <span className="flex-1 truncate">
                    {isRTL ? "استوديو التصميم" : "Design Studio"}
                  </span>
                )}
              </NavLink>

              {/* Chevron toggle (only when expanded) */}
              {isExpanded && (
                <button
                  type="button"
                  onClick={() => setSectionsOpen((o) => !o)}
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      sectionsOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              )}
            </div>

            {/* Sections sub-menu */}
            {isExpanded && sectionsOpen && (
              <div className="ms-3 mt-1 border-s-2 border-[var(--border)] ps-2.5 space-y-0.5">
                {GROUPS.map((group) => (
                  <div key={group.title.en}>
                    {/* Group heading */}
                    <p className="mt-2 mb-1 px-1 text-[9px] font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                      {group.title[lang] ?? group.title.en}
                    </p>

                    {/* Section items */}
                    {group.items.map((s) => {
                      const Icon = s.icon;
                      const sActive = location.pathname.startsWith(
                        `/admin/website/${s.key}`
                      );
                      return (
                        <NavLink
                          key={s.key}
                          to={`/admin/website/${s.key}/settings`}
                          className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
                            sActive
                              ? "bg-[var(--accent)] font-semibold text-[var(--primary)]"
                              : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                          }`}
                        >
                          <Icon
                            className="h-3.5 w-3.5 shrink-0"
                            style={{ color: sActive ? undefined : s.color }}
                          />
                          <span className="truncate">
                            {s.title[lang] ?? s.title.en}
                          </span>
                          {sActive && (
                            <span className="ms-auto h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Themes ── */}
          <NavLink
            to="/themes"
            title={isRTL ? "القوالب والثيمات" : "Themes"}
            className={`flex min-h-10 items-center gap-3 rounded-lg text-sm transition-colors ${
              isExpanded ? "justify-start px-3" : "justify-center px-2"
            } ${
              location.pathname.startsWith("/themes")
                ? "bg-[var(--accent)] font-semibold text-[var(--primary)]"
                : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <Palette className="h-4 w-4 shrink-0" aria-hidden="true" />
            {isExpanded && (
              <span className="truncate">
                {isRTL ? "القوالب والثيمات" : "Themes"}
              </span>
            )}
          </NavLink>
        </nav>
      </aside>

      {/* Page content */}
      <div className="min-w-0 flex-1">
        <Navbar />
        {children}
      </div>
    </div>
  );
}