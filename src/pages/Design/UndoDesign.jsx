import { useState } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "../../hooks/useMutation";
import { DESIGN_KEYS, DESIGNS, buildSeed } from "./sectionsConfig";

const SECTION_KEYS = [
  "announcement", "header", "hero", "info",
  "info2", "testimonials", "contact", "footer",
];

/**
 * ⚠️ بيمسح كل التصاميم الموجودة في كل السكاشن ويعمل 4 تصاميم جديدة لكل سكشن.
 * `sections` = اللي راجع من /api/admin/dashboard/sections  ({ header: [...], hero: [...], ... })
 *
 * ترتيب الأمان:
 *  1) يعمل سجل تجريبي واحد ويتأكد إن الباك إند رجّع حقل `variant`. لو لأ → يلغي ومايمسحش حاجة.
 *  2) يعمل باقي التصاميم الجديدة.
 *  3) بعدها بس يمسح القديم.
 *  4) يفعّل أول تصميم (business) في كل سكشن.
 */
export default function ResetDesignsButton({ sections = {}, onDone, isRtl }) {
  const { mutate } = useMutation();
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState("");

  const run = async () => {
    const oldCount = SECTION_KEYS.reduce((n, s) => n + (sections[s]?.length || 0), 0);
    const msg = isRtl
      ? `هيتم مسح ${oldCount} تصميم موجود في كل السكاشن وإنشاء ${DESIGN_KEYS.length * SECTION_KEYS.length} تصميم جديد (${DESIGN_KEYS.length} لكل سكشن). مفيش رجوع. متأكدة؟`
      : `This deletes ${oldCount} existing records across all sections and creates ${DESIGN_KEYS.length * SECTION_KEYS.length} new ones (${DESIGN_KEYS.length} per section). This cannot be undone. Continue?`;
    if (!window.confirm(msg)) return;

    setBusy(true);
    const seeds = Object.fromEntries(
      DESIGN_KEYS.map((k, i) => [k, buildSeed(k, i === 0)])
    );
    const created = {}; // section -> [{ key, id }]

    try {
      // 1) probe: سجل واحد للتأكد إن variant بيتحفظ
      setStep(isRtl ? "فحص الباك إند..." : "Checking backend...");
      const probe = await mutate("/api/admin/sections/header", "POST", seeds[DESIGN_KEYS[0]].header);
      if (!probe.success) throw new Error(probe.error || "Probe failed");
      const probeDoc = probe.data?.data || probe.data;
      const variantStored = probeDoc?.variant === DESIGN_KEYS[0];
      created.header = [{ key: DESIGN_KEYS[0], id: probeDoc._id }];

      // 2) إنشاء الباقي
      for (const section of SECTION_KEYS) {
        created[section] = created[section] || [];
        for (const key of DESIGN_KEYS) {
          if (section === "header" && key === DESIGN_KEYS[0]) continue; // اتعمل في الـ probe
          setStep(`${isRtl ? "إنشاء" : "Creating"} ${section} · ${DESIGNS[key].name.en}`);
          const res = await mutate(`/api/admin/sections/${section}`, "POST", seeds[key][section]);
          if (!res.success) throw new Error(`${section}/${key}: ${res.error || "create failed"}`);
          const doc = res.data?.data || res.data;
          created[section].push({ key, id: doc?._id });
        }
      }

      // 3) مسح القديم
      for (const section of SECTION_KEYS) {
        for (const rec of sections[section] || []) {
          setStep(`${isRtl ? "مسح" : "Deleting"} ${section}`);
          await mutate(`/api/admin/sections/${section}/${rec._id}`, "DELETE");
        }
      }

      // 4) تفعيل التصميم الأول
      for (const section of SECTION_KEYS) {
        const first = created[section].find((c) => c.key === DESIGN_KEYS[0]);
        if (first?.id) {
          await mutate(`/api/admin/sections/${section}/${first.id}`, "PATCH", { isVisible: true });
        }
      }

      toast.success(isRtl ? "تم إنشاء الـ 4 تصاميم في كل السكاشن" : "4 designs created in every section");
      if (!variantStored) {
        toast.info(
          isRtl
            ? "الباك إند مش بيحفظ variant، فالتصميم بيتعرف من النصوص (الاسم/العنوان). لو غيرتي العنوان الأساسي هيتغير التصميم."
            : "Backend doesn't store `variant`; designs are detected from their texts. Editing a section's main title changes the detected design."
        );
      }
      onDone?.();
    } catch (e) {
      toast.error(e.message || "Reset failed");
      onDone?.();
    } finally {
      setBusy(false);
      setStep("");
    }
  };

  return (
    <button
      type="button"
      onClick={run}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 transition hover:bg-rose-600 hover:text-white disabled:opacity-60"
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
      {busy ? step : isRtl ? "إعادة ضبط التصاميم" : "Reset designs"}
    </button>
  );
}