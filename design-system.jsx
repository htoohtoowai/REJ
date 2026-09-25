// design-system.jsx — LENZ Connect design system reference.
// Standalone showcase: foundations + components, JP/EN via window.LANG.

const { Icon } = window;
const L = (jp, en) => (window.isJP() ? jp : en);

// ─────────────────────────── PRIMITIVES ───────────────────────────
const Section = ({ id, eyebrow, title, sub, children }) => (
  <section id={id} className="mb-20 scroll-mt-24">
    <div className="flex items-baseline gap-3 mb-6 pb-3 border-b border-[#E5E7EB]">
      <span className="text-[11px] tracking-[0.18em] font-semibold uppercase text-[#94A3B8]">{eyebrow}</span>
      <h2 className="text-[22px] font-semibold text-[#0F172A]">{title}</h2>
      {sub && <span className="text-[12px] text-[#64748B] ml-auto">{sub}</span>}
    </div>
    {children}
  </section>
);

const SubHead = ({ children, hint }) => (
  <div className="flex items-baseline justify-between mb-3 mt-8 first:mt-0">
    <h3 className="text-[14px] font-semibold text-[#0F172A]">{children}</h3>
    {hint && <span className="text-[11px] text-[#94A3B8]">{hint}</span>}
  </div>
);

const Tile = ({ children, className = "" }) => (
  <div className={`border border-[#E5E7EB] rounded-lg bg-white ${className}`}>{children}</div>
);

const Mono = ({ children }) => (
  <code className="text-[11px] text-[#475569] bg-[#F1F5F9] px-1.5 py-[1px] rounded">{children}</code>
);

// ─────────────────────────── COLORS ───────────────────────────
const COLOR_GROUPS = [
  {
    title: L("ブランド", "Brand"),
    swatches: [
      { name: "Primary",        token: "primary",    hex: "#0F172A", note: L("ボタン・ナビ・主要テキスト", "Buttons, nav, primary text") },
      { name: "Primary Hover",  token: "primary-700", hex: "#1F2937", note: L("ボタンホバー", "Button hover") },
      { name: "Accent",         token: "accent",     hex: "#F59E0B", note: L("主要 CTA (保存・作成)", "Primary CTA (save / create)") },
      { name: "Accent Hover",   token: "accent-700", hex: "#D97706", note: L("CTA ホバー", "CTA hover") },
    ],
  },
  {
    title: L("テキスト", "Text"),
    swatches: [
      { name: "Text Primary",   token: "text",       hex: "#0F172A", note: L("見出し・本文", "Headings, body") },
      { name: "Text Secondary", token: "text-2",     hex: "#475569", note: L("補助テキスト", "Secondary copy") },
      { name: "Text Muted",     token: "text-muted", hex: "#94A3B8", note: L("ラベル・キャプション", "Labels, captions") },
      { name: "Text Faint",     token: "text-faint", hex: "#CBD5E1", note: L("区切り・薄字", "Dividers, faint text") },
    ],
  },
  {
    title: L("サーフェス", "Surface"),
    swatches: [
      { name: "Page",           token: "bg-page",   hex: "#F7F8FA", note: L("ページ背景", "Page background") },
      { name: "Card",           token: "bg-card",   hex: "#FFFFFF", note: L("カード背景", "Card background") },
      { name: "Subtle",         token: "bg-subtle", hex: "#F1F5F9", note: L("ハイライト・ホバー", "Highlights, hover") },
      { name: "Border Subtle",  token: "border",    hex: "#E5E7EB", note: L("カード境界線", "Card border") },
      { name: "Border Strong",  token: "border-2",  hex: "#CBD5E1", note: L("入力欄境界線", "Input border") },
    ],
  },
  {
    title: L("ステータス", "Status"),
    swatches: [
      { name: "Success",  token: "success", hex: "#16A34A", note: L("承認・公開中・成功", "Approved, live, success") },
      { name: "Warning",  token: "warning", hex: "#B45309", note: L("審査中・要確認", "Review, attention") },
      { name: "Danger",   token: "danger",  hex: "#DC2626", note: L("エラー・否認・削除", "Errors, rejected, delete") },
      { name: "Info",     token: "info",    hex: "#2563EB", note: L("案内・情報 (限定使用)", "Informational (limited)") },
    ],
  },
  {
    title: L("ステータスティント", "Status Tints"),
    swatches: [
      { name: "Success Tint", token: "success-50", hex: "#DCFCE7", note: L("チップ背景", "Chip bg") },
      { name: "Warning Tint", token: "warning-50", hex: "#FEF3C7", note: L("チップ背景", "Chip bg") },
      { name: "Danger Tint",  token: "danger-50",  hex: "#FEE2E2", note: L("チップ・バナー背景", "Chip / banner bg") },
      { name: "Neutral Tint", token: "neutral-50", hex: "#F1F5F9", note: L("汎用 (青の代替)", "Generic (replaces blue)") },
    ],
  },
];

function Swatch({ s }) {
  return (
    <Tile className="overflow-hidden">
      <div style={{ background: s.hex, height: 72 }} className="border-b border-black/5" />
      <div className="px-3 py-2.5">
        <div className="text-[12px] font-semibold text-[#0F172A]">{s.name}</div>
        <div className="mt-1 flex items-center justify-between">
          <Mono>{s.hex}</Mono>
          <span className="text-[10px] text-[#94A3B8]">{s.token}</span>
        </div>
        <div className="text-[10px] text-[#64748B] mt-1 leading-snug">{s.note}</div>
      </div>
    </Tile>
  );
}

function ColorsBlock() {
  return (
    <div className="space-y-8">
      {COLOR_GROUPS.map((g) => (
        <div key={g.title}>
          <SubHead>{g.title}</SubHead>
          <div className="grid grid-cols-4 gap-3">
            {g.swatches.map((s) => <Swatch key={s.token} s={s} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────── TYPOGRAPHY ───────────────────────────
const TYPE_SCALE = [
  { name: "Display",  size: 32, weight: 600, lh: 1.2,  use: L("ページタイトル (Hero)", "Page hero title"),    sample: L("LENZ Connect デザインシステム", "LENZ Connect Design System") },
  { name: "H1",       size: 22, weight: 600, lh: 1.3,  use: L("画面タイトル",         "Screen title"),       sample: L("管理会社 ダッシュボード",            "Management Dashboard") },
  { name: "H2",       size: 18, weight: 600, lh: 1.35, use: L("セクション見出し",     "Section heading"),    sample: L("最近のアクティビティ",              "Recent Activity") },
  { name: "H3",       size: 15, weight: 600, lh: 1.4,  use: L("カード見出し",         "Card heading"),       sample: L("本日の内見予約",                    "Today's Viewings") },
  { name: "Body L",   size: 14, weight: 400, lh: 1.55, use: L("本文 (デフォルト)",    "Body (default)"),     sample: L("ZOOM本郷 701号室の内見が本日18:00に予定されています。", "ZOOM Hongo 701's viewing is scheduled for 18:00 today.") },
  { name: "Body M",   size: 13, weight: 400, lh: 1.5,  use: L("テーブル・密度高UI",   "Tables, dense UI"),   sample: L("¥262,000 / 管理費 ¥20,000",         "¥262,000 / Mgmt fee ¥20,000") },
  { name: "Label",    size: 12, weight: 500, lh: 1.4,  use: L("フォームラベル",       "Form labels"),        sample: L("申込者名 / Applicant Name",          "Applicant Name") },
  { name: "Caption",  size: 11, weight: 400, lh: 1.4,  use: L("補助・キャプション",   "Captions, metadata"), sample: L("最終更新: 2026/05/26 14:38",         "Updated: 2026/05/26 14:38") },
  { name: "Micro",    size: 10, weight: 500, lh: 1.4,  use: L("極小ラベル・チップ",   "Micro labels / chips"), sample: L("STEP 01 · ¥262,000",               "STEP 01 · ¥262,000") },
];

function TypographyBlock() {
  return (
    <div className="space-y-6">
      <SubHead hint={L("プライマリフォント: ", "Primary font: ") + L("Noto Sans JP", "Inter")}>{L("フォントファミリー", "Font Family")}</SubHead>
      <div className="grid grid-cols-2 gap-4">
        <Tile className="p-5">
          <div className="text-[10px] tracking-wider font-semibold text-[#94A3B8] uppercase mb-1">Primary · {L("日本語", "Japanese")}</div>
          <div className="text-[13px] text-[#0F172A] font-medium mb-2">Noto Sans JP</div>
          <div style={{ fontFamily: '"Noto Sans JP", sans-serif' }} className="text-[#0F172A]">
            <div className="text-[20px] font-semibold">物件情報を一元管理</div>
            <div className="text-[14px] mt-1">ZOOM本郷 701号室 · 文京区本郷 · ¥262,000</div>
            <div className="text-[12px] text-[#64748B] mt-1">仲介会社・申込者・内見予約をすべて1画面で。</div>
          </div>
        </Tile>
        <Tile className="p-5">
          <div className="text-[10px] tracking-wider font-semibold text-[#94A3B8] uppercase mb-1">Primary · {L("欧文", "Latin")}</div>
          <div className="text-[13px] text-[#0F172A] font-medium mb-2">Inter</div>
          <div style={{ fontFamily: 'Inter, sans-serif' }} className="text-[#0F172A]">
            <div className="text-[20px] font-semibold">One workspace for every listing</div>
            <div className="text-[14px] mt-1">ZOOM Hongo 701 · Bunkyo-ku · ¥262,000</div>
            <div className="text-[12px] text-[#64748B] mt-1">Brokers, applicants and viewings on a single screen.</div>
          </div>
        </Tile>
        <Tile className="p-5">
          <div className="text-[10px] tracking-wider font-semibold text-[#94A3B8] uppercase mb-1">{L("数字 (tabular)", "Numerals (tabular)")}</div>
          <div className="text-[13px] text-[#0F172A] font-medium mb-2">tabular-nums</div>
          <div className="tabular-nums text-[#0F172A]">
            <div className="text-[24px] font-semibold">¥262,000</div>
            <div className="text-[14px] mt-1">2026/05/26 14:38:12</div>
            <div className="text-[12px] text-[#64748B] mt-1">157 · 1,234,567 · 0.08% · 99.95%</div>
          </div>
        </Tile>
        <Tile className="p-5">
          <div className="text-[10px] tracking-wider font-semibold text-[#94A3B8] uppercase mb-1">Mono</div>
          <div className="text-[13px] text-[#0F172A] font-medium mb-2">JetBrains Mono</div>
          <div style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }} className="text-[#0F172A]">
            <div className="text-[16px]">JOB-78422</div>
            <div className="text-[13px] mt-1">connect.lenz-dx.jp/admin</div>
            <div className="text-[12px] text-[#64748B] mt-1">ECONNRESET · activity.list</div>
          </div>
        </Tile>
      </div>

      <SubHead hint={L("9段階のタイプスケール", "9-step type scale")}>{L("タイプスケール", "Type Scale")}</SubHead>
      <Tile className="divide-y divide-[#F1F5F9]">
        {TYPE_SCALE.map((t) => (
          <div key={t.name} className="flex items-center gap-6 px-5 py-3">
            <div className="w-24 shrink-0">
              <div className="text-[12px] font-semibold text-[#0F172A]">{t.name}</div>
              <div className="text-[10px] text-[#94A3B8] tabular-nums">{t.size}px · {t.weight} · {t.lh}</div>
            </div>
            <div className="text-[#0F172A] flex-1 min-w-0 truncate" style={{ fontSize: t.size, fontWeight: t.weight, lineHeight: t.lh }}>
              {t.sample}
            </div>
            <div className="w-44 shrink-0 text-right text-[11px] text-[#64748B]">{t.use}</div>
          </div>
        ))}
      </Tile>

      <SubHead>{L("ウェイト", "Weights")}</SubHead>
      <div className="grid grid-cols-4 gap-3">
        {[
          { w: 400, name: "Regular" },
          { w: 500, name: "Medium" },
          { w: 600, name: "Semibold" },
          { w: 700, name: "Bold" },
        ].map((w) => (
          <Tile key={w.w} className="p-4">
            <div className="text-[10px] text-[#94A3B8] tracking-wider uppercase">{w.w}</div>
            <div className="text-[20px] text-[#0F172A] mt-1" style={{ fontWeight: w.w }}>{w.name}</div>
            <div className="text-[13px] text-[#475569] mt-1" style={{ fontWeight: w.w }}>{L("物件管理", "Properties")}</div>
          </Tile>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────── SPACING / RADIUS / SHADOWS ───────────────────────────
const SPACES = [4, 8, 12, 16, 20, 24, 32, 40, 48];
const RADII = [
  { name: "sm", v: 2 }, { name: "default", v: 4 }, { name: "md", v: 6 }, { name: "lg", v: 8 }, { name: "xl", v: 12 }, { name: "full", v: 999 },
];
const SHADOWS = [
  { name: "xs", v: "0 1px 0 rgba(15,23,42,0.04)" },
  { name: "sm", v: "0 1px 2px rgba(15,23,42,0.06), 0 1px 1px rgba(15,23,42,0.04)" },
  { name: "md", v: "0 4px 12px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.05)" },
  { name: "lg", v: "0 10px 30px rgba(15,23,42,0.10), 0 2px 6px rgba(15,23,42,0.05)" },
  { name: "xl", v: "0 20px 60px rgba(15,23,42,0.18)" },
];

function FoundationsBlock() {
  return (
    <div className="space-y-8">
      <div>
        <SubHead hint={L("4pxベース", "4px base unit")}>{L("スペーシング", "Spacing")}</SubHead>
        <Tile className="p-5">
          <div className="flex items-end gap-6 flex-wrap">
            {SPACES.map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div className="bg-[#0F172A]" style={{ width: s, height: s }} />
                <div className="text-[11px] font-semibold text-[#0F172A] mt-2 tabular-nums">{s}</div>
                <div className="text-[10px] text-[#94A3B8] tabular-nums">{s / 4}</div>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-[#64748B] mt-4">
            {L("使い分け: 4/8 はアイコン・チップ間。12/16 はカード内。20/24 はカード間。32/40/48 はセクション間。",
               "Usage: 4/8 between icons/chips. 12/16 inside cards. 20/24 between cards. 32/40/48 between sections.")}
          </div>
        </Tile>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <SubHead>{L("角丸", "Border Radius")}</SubHead>
          <Tile className="p-5">
            <div className="flex items-end gap-5 flex-wrap">
              {RADII.map((r) => (
                <div key={r.name} className="flex flex-col items-center">
                  <div className="bg-[#0F172A]" style={{ width: 56, height: 56, borderRadius: r.v }} />
                  <div className="text-[11px] font-semibold text-[#0F172A] mt-2">{r.name}</div>
                  <div className="text-[10px] text-[#94A3B8] tabular-nums">{r.v}px</div>
                </div>
              ))}
            </div>
          </Tile>
        </div>
        <div>
          <SubHead>{L("シャドウ", "Shadows")}</SubHead>
          <Tile className="p-5">
            <div className="flex items-center gap-5 flex-wrap">
              {SHADOWS.map((sh) => (
                <div key={sh.name} className="flex flex-col items-center">
                  <div className="bg-white rounded-md" style={{ width: 56, height: 56, boxShadow: sh.v, border: "1px solid #F1F5F9" }} />
                  <div className="text-[11px] font-semibold text-[#0F172A] mt-2">{sh.name}</div>
                </div>
              ))}
            </div>
          </Tile>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── ICON INVENTORY ───────────────────────────
function IconsBlock() {
  const names = Object.keys(Icon);
  return (
    <div>
      <SubHead hint={`${names.length} ${L("個", "icons")} · lucide style · stroke 1.75`}>{L("アイコンセット", "Icon Set")}</SubHead>
      <Tile className="p-5">
        <div className="grid grid-cols-6 gap-3">
          {names.map((n) => {
            const Ico = Icon[n];
            return (
              <div key={n} className="flex items-center gap-3 px-3 py-2 rounded-md border border-[#F1F5F9] hover:bg-[#F7F8FA]">
                <Ico s={18} stroke="#0F172A" />
                <span className="text-[12px] text-[#0F172A]">{n}</span>
              </div>
            );
          })}
        </div>
      </Tile>
    </div>
  );
}

// ─────────────────────────── BUTTONS ───────────────────────────
const baseBtn = "inline-flex items-center justify-center gap-1.5 font-medium rounded-md transition-colors disabled:cursor-not-allowed";
const sizeCls = { sm: "h-7 px-2.5 text-[12px]", md: "h-9 px-3.5 text-[13px]", lg: "h-11 px-5 text-[14px]" };

const Btn = ({ variant = "primary", size = "md", children, icon, iconRight, disabled, hover, loading, className = "" }) => {
  const variants = {
    primary:   { base: "text-white",         bg: "#0F172A", bgHover: "#1F2937", border: "transparent" },
    accent:    { base: "text-[#0F172A]",     bg: "#F59E0B", bgHover: "#D97706", border: "transparent" },
    secondary: { base: "text-[#0F172A]",     bg: "#FFFFFF", bgHover: "#F7F8FA", border: "#CBD5E1" },
    ghost:     { base: "text-[#0F172A]",     bg: "transparent", bgHover: "#F1F5F9", border: "transparent" },
    danger:    { base: "text-white",         bg: "#DC2626", bgHover: "#B91C1C", border: "transparent" },
    link:      { base: "text-[#0F172A] underline underline-offset-4 decoration-[#CBD5E1] hover:decoration-[#0F172A]", bg: "transparent", bgHover: "transparent", border: "transparent" },
  };
  const v = variants[variant];
  const bg = disabled ? "#E5E7EB" : (hover ? v.bgHover : v.bg);
  const color = disabled ? "#94A3B8" : undefined;
  return (
    <button disabled={disabled}
            className={`${baseBtn} ${sizeCls[size]} ${v.base} ${className}`}
            style={{ background: bg, border: `1px solid ${disabled ? "#E5E7EB" : v.border}`, color }}>
      {loading && <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />}
      {icon && !loading && <span className="-ml-0.5">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="-mr-0.5">{iconRight}</span>}
    </button>
  );
};

function ButtonsBlock() {
  return (
    <div className="space-y-6">
      <SubHead hint={L("優先順位: Accent > Primary > Secondary > Ghost", "Priority: Accent > Primary > Secondary > Ghost")}>{L("バリアント", "Variants")}</SubHead>
      <Tile className="p-5">
        <div className="flex flex-wrap gap-3">
          <Btn variant="accent"  icon={<Icon.Plus s={14} stroke="#0F172A" />}>{L("新規物件作成", "Create property")}</Btn>
          <Btn variant="primary" icon={<Icon.Check s={14} stroke="#fff" />}>{L("確定する", "Confirm")}</Btn>
          <Btn variant="secondary" icon={<Icon.Download s={14} stroke="#0F172A" />}>{L("CSV ダウンロード", "Export CSV")}</Btn>
          <Btn variant="ghost">{L("キャンセル", "Cancel")}</Btn>
          <Btn variant="danger" icon={<Icon.X s={14} stroke="#fff" />}>{L("削除", "Delete")}</Btn>
          <Btn variant="link">{L("詳細を見る", "View details")}</Btn>
        </div>
      </Tile>

      <SubHead>{L("サイズ", "Sizes")}</SubHead>
      <Tile className="p-5">
        <div className="flex items-center gap-3 flex-wrap">
          <Btn variant="primary" size="sm">{L("小 (sm)", "Small (sm)")}</Btn>
          <Btn variant="primary" size="md">{L("中 (md · 既定)", "Medium (md · default)")}</Btn>
          <Btn variant="primary" size="lg">{L("大 (lg)", "Large (lg)")}</Btn>
        </div>
      </Tile>

      <SubHead>{L("状態", "States")}</SubHead>
      <Tile className="p-5">
        <div className="grid grid-cols-5 gap-3 items-center">
          <div className="text-[11px] text-[#94A3B8]">{L("デフォルト", "Default")}</div>
          <div className="text-[11px] text-[#94A3B8]">{L("ホバー", "Hover")}</div>
          <div className="text-[11px] text-[#94A3B8]">{L("フォーカス", "Focus")}</div>
          <div className="text-[11px] text-[#94A3B8]">{L("ローディング", "Loading")}</div>
          <div className="text-[11px] text-[#94A3B8]">{L("無効", "Disabled")}</div>
          {/* Accent */}
          <Btn variant="accent">{L("保存", "Save")}</Btn>
          <Btn variant="accent" hover>{L("保存", "Save")}</Btn>
          <button className={`${baseBtn} ${sizeCls.md} text-[#0F172A]`}
            style={{ background: "#F59E0B", border: "1px solid transparent", boxShadow: "0 0 0 3px rgba(245,158,11,0.35)" }}>{L("保存", "Save")}</button>
          <Btn variant="accent" loading>{L("保存中…", "Saving…")}</Btn>
          <Btn variant="accent" disabled>{L("保存", "Save")}</Btn>
          {/* Primary */}
          <Btn variant="primary">{L("確認", "Confirm")}</Btn>
          <Btn variant="primary" hover>{L("確認", "Confirm")}</Btn>
          <button className={`${baseBtn} ${sizeCls.md} text-white`}
            style={{ background: "#0F172A", border: "1px solid transparent", boxShadow: "0 0 0 3px rgba(15,23,42,0.25)" }}>{L("確認", "Confirm")}</button>
          <Btn variant="primary" loading>{L("送信中…", "Sending…")}</Btn>
          <Btn variant="primary" disabled>{L("確認", "Confirm")}</Btn>
          {/* Secondary */}
          <Btn variant="secondary">{L("キャンセル", "Cancel")}</Btn>
          <Btn variant="secondary" hover>{L("キャンセル", "Cancel")}</Btn>
          <button className={`${baseBtn} ${sizeCls.md} text-[#0F172A]`}
            style={{ background: "#fff", border: "1px solid #0F172A", boxShadow: "0 0 0 3px rgba(15,23,42,0.15)" }}>{L("キャンセル", "Cancel")}</button>
          <Btn variant="secondary" loading>{L("読み込み中", "Loading")}</Btn>
          <Btn variant="secondary" disabled>{L("キャンセル", "Cancel")}</Btn>
        </div>
      </Tile>

      <SubHead>{L("アイコンボタン", "Icon Button")}</SubHead>
      <Tile className="p-5">
        <div className="flex items-center gap-3">
          {[
            ["primary", "#0F172A", "#fff"],
            ["secondary", "#fff", "#0F172A"],
            ["ghost", "transparent", "#0F172A"],
            ["danger", "#DC2626", "#fff"],
          ].map(([v, bg, fg]) => (
            <button key={v} className="w-9 h-9 rounded-md inline-flex items-center justify-center"
                    style={{ background: bg, border: v === "secondary" ? "1px solid #CBD5E1" : "1px solid transparent" }}>
              <Icon.Settings s={16} stroke={fg} />
            </button>
          ))}
          <div className="w-px h-6 bg-[#E5E7EB] mx-1" />
          <div className="inline-flex rounded-md border border-[#CBD5E1] overflow-hidden">
            {[Icon.Menu, Icon.Filter, Icon.Eye].map((Ico, i) => (
              <button key={i} className="w-9 h-9 inline-flex items-center justify-center bg-white hover:bg-[#F7F8FA] border-l border-[#CBD5E1] first:border-l-0">
                <Ico s={15} stroke="#0F172A" />
              </button>
            ))}
          </div>
        </div>
      </Tile>
    </div>
  );
}

// ─────────────────────────── INPUTS ───────────────────────────
function inputCls(state) {
  const base = "w-full h-9 px-3 text-[13px] bg-white rounded-md outline-none transition-shadow";
  if (state === "focus") return `${base} border border-[#0F172A]`;
  if (state === "error") return `${base} border border-[#DC2626]`;
  if (state === "disabled") return `${base} border border-[#E5E7EB] bg-[#F7F8FA] text-[#94A3B8] cursor-not-allowed`;
  return `${base} border border-[#CBD5E1] hover:border-[#94A3B8]`;
}

const Field = ({ label, hint, error, children, required }) => (
  <div>
    <div className="flex items-baseline justify-between mb-1">
      <label className="text-[12px] font-medium text-[#0F172A]">
        {label}
        {required && <span className="text-[#DC2626] ml-1">*</span>}
      </label>
      {hint && <span className="text-[11px] text-[#94A3B8]">{hint}</span>}
    </div>
    {children}
    {error && <div className="text-[11px] text-[#DC2626] mt-1 flex items-center gap-1"><Icon.AlertCircle s={11} stroke="#DC2626" />{error}</div>}
  </div>
);

function InputsBlock() {
  return (
    <div className="space-y-6">
      <SubHead>{L("テキスト入力 — 状態", "Text Input — States")}</SubHead>
      <Tile className="p-5">
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          <Field label={L("物件名", "Property Name")}>
            <input className={inputCls()} defaultValue="ZOOM本郷 701号室" />
          </Field>
          <Field label={L("物件名", "Property Name")} hint={L("フォーカス中", "Focused")}>
            <div style={{ boxShadow: "0 0 0 3px rgba(15,23,42,0.18)" }} className="rounded-md">
              <input className={inputCls("focus")} defaultValue="ZOOM本郷 701号室" />
            </div>
          </Field>
          <Field label={L("賃料", "Rent")} error={L("半角数字で入力してください", "Please enter half-width digits")}>
            <input className={inputCls("error")} defaultValue="二十六万二千円" />
          </Field>
          <Field label={L("物件 ID", "Property ID")} hint={L("自動採番", "Auto-generated")}>
            <input disabled className={inputCls("disabled")} defaultValue="ZOOM-001-701" />
          </Field>
        </div>
      </Tile>

      <SubHead>{L("プレフィックス・サフィックス", "Prefix / Suffix")}</SubHead>
      <Tile className="p-5">
        <div className="grid grid-cols-3 gap-4">
          <Field label={L("賃料", "Rent")}>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-[13px] text-[#475569] bg-[#F1F5F9] border border-[#CBD5E1] border-r-0 rounded-l-md">¥</span>
              <input className="flex-1 h-9 px-3 text-[13px] bg-white border border-[#CBD5E1] rounded-r-md outline-none tabular-nums" defaultValue="262,000" />
            </div>
          </Field>
          <Field label={L("専有面積", "Floor Area")}>
            <div className="flex">
              <input className="flex-1 h-9 px-3 text-[13px] bg-white border border-[#CBD5E1] border-r-0 rounded-l-md outline-none tabular-nums" defaultValue="42.30" />
              <span className="inline-flex items-center px-3 text-[13px] text-[#475569] bg-[#F1F5F9] border border-[#CBD5E1] rounded-r-md">m²</span>
            </div>
          </Field>
          <Field label={L("検索", "Search")}>
            <div className="relative">
              <Icon.Search s={14} stroke="#94A3B8" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
              <input className={inputCls() + " pl-9"} placeholder={L("物件名・申込者…", "Property, applicant…")} />
            </div>
          </Field>
        </div>
      </Tile>

      <SubHead>{L("テキストエリア / セレクト / 日付", "Textarea / Select / Date")}</SubHead>
      <Tile className="p-5">
        <div className="grid grid-cols-3 gap-4">
          <Field label={L("備考", "Notes")} hint="0 / 500">
            <textarea className="w-full px-3 py-2 text-[13px] bg-white border border-[#CBD5E1] rounded-md outline-none resize-none" rows="3"
              defaultValue={L("ペット可。家具家電付き。礼金1ヶ月。", "Pets allowed. Furnished. 1 mo. key money.")} />
          </Field>
          <Field label={L("ステータス", "Status")}>
            <div className="relative">
              <select className="w-full h-9 px-3 pr-9 text-[13px] bg-white border border-[#CBD5E1] rounded-md outline-none appearance-none">
                <option>{L("募集中", "Active")}</option>
                <option>{L("作成中", "Draft")}</option>
                <option>{L("掲載停止", "Paused")}</option>
              </select>
              <Icon.ChevronDown s={14} stroke="#475569" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>
          </Field>
          <Field label={L("入居可能日", "Available From")}>
            <div className="relative">
              <input className={inputCls() + " pr-9"} defaultValue="2026/06/01" />
              <Icon.Calendar s={14} stroke="#475569" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </Field>
        </div>
      </Tile>

      <SubHead>{L("チェック・ラジオ・トグル", "Checkbox / Radio / Toggle")}</SubHead>
      <Tile className="p-5">
        <div className="grid grid-cols-3 gap-6">
          {/* Checkbox */}
          <div>
            <div className="text-[12px] font-medium text-[#0F172A] mb-2">{L("設備", "Equipment")}</div>
            <div className="space-y-2">
              {[
                { label: L("バス・トイレ別", "Separate bath / toilet"), checked: true },
                { label: L("オートロック", "Auto-lock entry"), checked: true },
                { label: L("宅配ボックス", "Delivery box"), checked: false },
                { label: L("ペット可", "Pets allowed"), checked: false },
              ].map((c, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer">
                  <span className="inline-flex w-4 h-4 rounded items-center justify-center"
                        style={{ background: c.checked ? "#0F172A" : "#fff", border: `1px solid ${c.checked ? "#0F172A" : "#CBD5E1"}` }}>
                    {c.checked && <Icon.Check s={11} stroke="#fff" sw={3} />}
                  </span>
                  <span className="text-[13px] text-[#0F172A]">{c.label}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Radio */}
          <div>
            <div className="text-[12px] font-medium text-[#0F172A] mb-2">{L("取引態様", "Transaction Type")}</div>
            <div className="space-y-2">
              {[
                { label: L("仲介", "Brokerage"), checked: true },
                { label: L("代理", "Agency"), checked: false },
                { label: L("貸主", "Owner direct"), checked: false },
              ].map((c, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer">
                  <span className="inline-flex w-4 h-4 rounded-full items-center justify-center"
                        style={{ background: "#fff", border: `1px solid ${c.checked ? "#0F172A" : "#CBD5E1"}` }}>
                    {c.checked && <span className="w-2 h-2 rounded-full" style={{ background: "#0F172A" }} />}
                  </span>
                  <span className="text-[13px] text-[#0F172A]">{c.label}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Toggle */}
          <div>
            <div className="text-[12px] font-medium text-[#0F172A] mb-2">{L("出稿サイト", "Publishing Channels")}</div>
            <div className="space-y-2.5">
              {[
                ["SUUMO", true],
                ["AtHome", true],
                ["HOME'S", true],
                ["Rainz", false],
              ].map(([name, on], i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[13px] text-[#0F172A]">{name}</span>
                  <span className="relative inline-block w-9 h-5 rounded-full transition-colors cursor-pointer"
                        style={{ background: on ? "#0F172A" : "#CBD5E1" }}>
                    <span className="absolute top-[2px] w-4 h-4 rounded-full bg-white transition-all"
                          style={{ left: on ? 18 : 2, boxShadow: "0 1px 2px rgba(0,0,0,0.18)" }} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Tile>
    </div>
  );
}

// ─────────────────────────── BADGES / CHIPS ───────────────────────────
const STATUS_CHIPS = [
  { label: L("募集中", "Active"),     tone: "success" },
  { label: L("作成中", "Draft"),      tone: "gray" },
  { label: L("申込あり", "Applied"),  tone: "neutral" },
  { label: L("審査中", "Reviewing"),  tone: "warning" },
  { label: L("承認", "Approved"),     tone: "success-solid" },
  { label: L("否認", "Rejected"),     tone: "danger" },
  { label: L("出稿失敗", "Failed"),   tone: "danger-solid" },
  { label: L("掲載停止", "Paused"),   tone: "neutral" },
];

const chipPalette = {
  success:        { bg: "#DCFCE7", fg: "#166534" },
  "success-solid":{ bg: "#16A34A", fg: "#FFFFFF" },
  warning:        { bg: "#FEF3C7", fg: "#92400E" },
  danger:         { bg: "#FEE2E2", fg: "#991B1B" },
  "danger-solid": { bg: "#DC2626", fg: "#FFFFFF" },
  gray:           { bg: "#E2E8F0", fg: "#334155" },
  neutral:        { bg: "#F1F5F9", fg: "#475569" },
  dark:           { bg: "#0F172A", fg: "#FFFFFF" },
};

function StatusChip({ tone, dot, children, size = "md" }) {
  const p = chipPalette[tone];
  const sz = size === "sm" ? "text-[10px] px-1.5 py-[1px]" : "text-[11px] px-2 py-[2px]";
  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded ${sz}`} style={{ background: p.bg, color: p.fg }}>
      {dot && <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.fg }} />}
      {children}
    </span>
  );
}

function BadgesBlock() {
  return (
    <div className="space-y-6">
      <SubHead>{L("ステータスチップ", "Status Chips")}</SubHead>
      <Tile className="p-5">
        <div className="flex flex-wrap gap-2">
          {STATUS_CHIPS.map((s, i) => <StatusChip key={i} tone={s.tone}>{s.label}</StatusChip>)}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {STATUS_CHIPS.map((s, i) => <StatusChip key={i} tone={s.tone} dot>{s.label}</StatusChip>)}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {STATUS_CHIPS.map((s, i) => <StatusChip key={i} tone={s.tone} size="sm">{s.label}</StatusChip>)}
        </div>
      </Tile>

      <SubHead>{L("カウントバッジ", "Count Badges")}</SubHead>
      <Tile className="p-5">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Icon.Bell s={22} stroke="#0F172A" />
            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-semibold text-white inline-flex items-center justify-center" style={{ background: "#DC2626" }}>8</span>
          </div>
          <div className="relative">
            <Icon.Chat s={22} stroke="#0F172A" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ background: "#DC2626" }} />
          </div>
          <button className="relative h-9 px-3 bg-[#0F172A] text-white rounded-md inline-flex items-center gap-2 text-[13px]">
            {L("申込一覧", "Applications")}
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold" style={{ background: "rgba(255,255,255,0.18)" }}>12</span>
          </button>
          <div className="inline-flex items-center gap-2 text-[12px] text-[#0F172A]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#16A34A]" />{L("オンライン", "Online")}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#94A3B8] ml-3" />{L("離席中", "Away")}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#DC2626] ml-3" />{L("緊急", "Urgent")}
          </div>
        </div>
      </Tile>
    </div>
  );
}

// ─────────────────────────── TABS / BREADCRUMBS / PAGINATION ───────────────────────────
function NavBlock() {
  return (
    <div className="space-y-6">
      <SubHead>{L("タブ (アンダーライン)", "Tabs (Underline)")}</SubHead>
      <Tile className="p-5">
        <div className="border-b border-[#E5E7EB] flex gap-6">
          {[L("概要", "Overview"), L("建物", "Building"), L("取引条件", "Transaction"), L("掲載情報", "Listing"), L("画像", "Images")].map((tab, i) => (
            <div key={i} className={`pb-3 -mb-px text-[13px] cursor-pointer ${i === 0 ? "font-semibold text-[#0F172A] border-b-2 border-[#0F172A]" : "text-[#64748B] hover:text-[#0F172A]"}`}>
              {tab}
            </div>
          ))}
        </div>
      </Tile>

      <SubHead>{L("パンくず", "Breadcrumbs")}</SubHead>
      <Tile className="p-5">
        <div className="flex items-center gap-1.5 text-[12px] text-[#64748B]">
          {[L("ホーム", "Home"), L("物件管理", "Properties"), "ZOOM本郷 701"].map((s, i, arr) => (
            <React.Fragment key={i}>
              {i > 0 && <Icon.ChevronRight s={12} stroke="#CBD5E1" />}
              <span className={i === arr.length - 1 ? "text-[#0F172A] font-medium" : "hover:text-[#0F172A] cursor-pointer"}>{s}</span>
            </React.Fragment>
          ))}
        </div>
      </Tile>

      <SubHead>{L("ページネーション", "Pagination")}</SubHead>
      <Tile className="p-5">
        <div className="flex items-center gap-1">
          <button className="h-8 px-2 rounded border border-[#CBD5E1] text-[#64748B] disabled:opacity-40" disabled>
            <Icon.ChevronLeft s={14} />
          </button>
          {["1", "2", "3", "…", "8"].map((p, i) => (
            <button key={i} className={`h-8 min-w-[32px] px-2 rounded text-[12px] ${p === "3" ? "bg-[#0F172A] text-white font-semibold" : p === "…" ? "text-[#94A3B8] cursor-default" : "text-[#0F172A] hover:bg-[#F1F5F9]"}`}>{p}</button>
          ))}
          <button className="h-8 px-2 rounded border border-[#CBD5E1] text-[#0F172A]"><Icon.ChevronRight s={14} /></button>
          <div className="ml-4 text-[11px] text-[#64748B] tabular-nums">21 – 30 / 157 {L("件", "items")}</div>
        </div>
      </Tile>
    </div>
  );
}

// ─────────────────────────── CARDS ───────────────────────────
function CardsBlock() {
  return (
    <div className="space-y-6">
      <SubHead>{L("基本カード", "Basic Card")}</SubHead>
      <div className="grid grid-cols-3 gap-4">
        <Tile className="p-5">
          <div className="text-[12px] font-semibold text-[#475569]">{L("募集中物件", "Active Listings")}</div>
          <div className="mt-2 text-[32px] font-semibold tabular-nums text-[#0F172A] leading-none">157</div>
          <div className="mt-2 text-[11px] text-[#64748B]">{L("うち新規 8 件", "8 new this week")}</div>
        </Tile>
        <Tile className="overflow-hidden">
          <div className="px-5 py-3 border-b border-[#F1F5F9] flex items-center justify-between">
            <h4 className="text-[13px] font-semibold text-[#0F172A]">{L("カード見出し", "Card Header")}</h4>
            <Icon.Settings s={14} stroke="#475569" />
          </div>
          <div className="p-5 text-[12px] text-[#475569] leading-relaxed">
            {L("ヘッダー付きカード。区切り線でセクションを明確にします。",
               "Card with header. The divider line clearly separates the sections.")}
          </div>
          <div className="px-5 py-3 border-t border-[#F1F5F9] bg-[#F7F8FA] flex items-center justify-between">
            <span className="text-[11px] text-[#94A3B8]">{L("最終更新 14:38", "Updated 14:38")}</span>
            <Btn variant="link" size="sm">{L("詳細 →", "Details →")}</Btn>
          </div>
        </Tile>
        <Tile className="p-5 border-[#FECACA]" style={{ background: "#FEF2F2" }}>
          <div className="flex items-center gap-2 mb-2">
            <Icon.Alert s={15} stroke="#DC2626" />
            <h4 className="text-[13px] font-semibold text-[#991B1B]">{L("注意カード", "Attention Card")}</h4>
          </div>
          <div className="text-[12px] text-[#0F172A] leading-relaxed">
            {L("カードはステータス色でトーンを変更できます。アラート・警告のみ用途を限定します。",
               "Cards can be tinted by status. Reserve this for alerts and warnings only.")}
          </div>
        </Tile>
      </div>
    </div>
  );
}

// ─────────────────────────── TABLES ───────────────────────────
const TABLE_ROWS = [
  { id: "ZOOM-001-701", name: "ZOOM本郷 701",       rent: 262000, status: "success",   broker: "FINDERS 吉祥寺店",     date: "2026/05/01" },
  { id: "ZOOM-001-305", name: "ZOOM本郷 305",       rent: 218000, status: "danger",    broker: "ハウスメイト 新宿店",  date: "2026/05/03" },
  { id: "ZOOM-002-501", name: "ZOOM吉祥寺 501",     rent: 189000, status: "success",   broker: "FINDERS 吉祥寺店",     date: "2026/05/08" },
  { id: "AOBA-305",     name: "青葉マンション 305", rent: 248000, status: "warning",   broker: "アパマンショップ",     date: "2026/05/10" },
  { id: "ZOOM-002-401", name: "ZOOM吉祥寺 401",     rent: 175000, status: "gray",      broker: "—",                    date: "2026/05/12" },
];

function TablesBlock() {
  return (
    <div className="space-y-6">
      <SubHead>{L("テーブル (デフォルト)", "Table (Default)")}</SubHead>
      <Tile className="overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-[#F7F8FA] text-[11px] text-[#475569] font-semibold uppercase tracking-wider">
              <th className="text-left py-2 px-4 w-8">
                <span className="inline-flex w-4 h-4 rounded items-center justify-center" style={{ border: "1px solid #CBD5E1" }} />
              </th>
              <th className="text-left py-2 px-4">{L("物件 ID", "ID")}</th>
              <th className="text-left py-2 px-4">{L("物件名", "Property")}</th>
              <th className="text-right py-2 px-4">{L("賃料", "Rent")}</th>
              <th className="text-left py-2 px-4">{L("状態", "Status")}</th>
              <th className="text-left py-2 px-4">{L("仲介会社", "Broker")}</th>
              <th className="text-left py-2 px-4">{L("更新", "Updated")}</th>
              <th className="text-right py-2 px-4 w-12">{L("操作", "Action")}</th>
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((r, i) => {
              const STATUS_LABEL = { success: L("募集中", "Active"), danger: L("出稿失敗", "Failed"), warning: L("審査中", "Reviewing"), gray: L("作成中", "Draft") };
              return (
                <tr key={r.id} className="border-t border-[#F1F5F9] hover:bg-[#F7F8FA]">
                  <td className="py-2 px-4">
                    <span className="inline-flex w-4 h-4 rounded items-center justify-center" style={{ border: "1px solid #CBD5E1" }} />
                  </td>
                  <td className="py-2 px-4 tabular-nums text-[#475569]">{r.id}</td>
                  <td className="py-2 px-4 text-[#0F172A] font-medium">{r.name}</td>
                  <td className="py-2 px-4 tabular-nums text-[#0F172A] text-right">¥{r.rent.toLocaleString()}</td>
                  <td className="py-2 px-4"><StatusChip tone={r.status}>{STATUS_LABEL[r.status]}</StatusChip></td>
                  <td className="py-2 px-4 text-[#475569]">{r.broker}</td>
                  <td className="py-2 px-4 tabular-nums text-[#475569]">{r.date}</td>
                  <td className="py-2 px-4 text-right"><Icon.ChevronRight s={14} stroke="#94A3B8" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Tile>
    </div>
  );
}

// ─────────────────────────── FEEDBACK (modals, toasts, banners) ───────────────────────────
function FeedbackBlock() {
  return (
    <div className="space-y-6">
      <SubHead>{L("バナー", "Banners")}</SubHead>
      <Tile className="p-5 space-y-2">
        {[
          { tone: "info",    icon: "Info",        bg: "#F1F5F9", bd: "#E2E8F0", fg: "#0F172A", title: L("メンテナンス予告", "Maintenance notice"),    body: L("5月30日(土) 02:00–04:00 にメンテナンスを実施します。", "Scheduled maintenance on Sat, May 30, 02:00–04:00.") },
          { tone: "success", icon: "CheckCircle", bg: "#F0FDF4", bd: "#BBF7D0", fg: "#166534", title: L("出稿完了",         "Publish complete"),     body: L("11物件の SUUMO 出稿が完了しました。",                "11 properties were successfully published on SUUMO.") },
          { tone: "warning", icon: "Alert",       bg: "#FFFBEB", bd: "#FDE68A", fg: "#B45309", title: L("Obic 同期に注意",  "Obic sync attention"),  body: L("3物件で LENZ と Obic の賃料が一致していません。",      "3 properties have rent mismatches between LENZ and Obic.") },
          { tone: "error",   icon: "AlertCircle", bg: "#FEF2F2", bd: "#FECACA", fg: "#991B1B", title: L("出稿失敗",         "Publish failed"),       body: L("ZOOM本郷 305 の SUUMO 出稿に失敗しました。",          "ZOOM Hongo 305 failed to publish on SUUMO.") },
        ].map((b, i) => {
          const Ico = Icon[b.icon];
          return (
            <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-md border" style={{ background: b.bg, borderColor: b.bd }}>
              <Ico s={16} stroke={b.fg} />
              <div className="flex-1">
                <div className="text-[13px] font-semibold" style={{ color: b.fg }}>{b.title}</div>
                <div className="text-[12px] text-[#0F172A] mt-[2px] leading-snug">{b.body}</div>
              </div>
              <button className="text-[11px] font-medium" style={{ color: b.fg }}>{L("詳細", "Details")}</button>
              <button><Icon.X s={14} stroke={b.fg} /></button>
            </div>
          );
        })}
      </Tile>

      <SubHead>{L("トースト (右下)", "Toasts (bottom-right)")}</SubHead>
      <Tile className="p-5">
        <div className="grid grid-cols-2 gap-4">
          {[
            { kind: "success", icon: <Icon.Check s={16} stroke="#166534" />, bg: "#DCFCE7", bd: "#BBF7D0", title: L("出稿リクエストを送信しました", "Publish request sent"), body: L("11物件を SUUMO・AtHome に出稿中です。", "11 properties are being published to SUUMO/AtHome.") },
            { kind: "error",   icon: <Icon.X s={16} stroke="#991B1B" />,    bg: "#FEE2E2", bd: "#FECACA", title: L("SUUMO 出稿に失敗しました",    "SUUMO publish failed"), body: L("ZOOM本郷 305 — 画像36ポイントルール違反",  "ZOOM Hongo 305 — image 36-point rule violation") },
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-md bg-white border" style={{ borderColor: t.bd, boxShadow: "0 14px 36px rgba(15,23,42,0.18)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: t.bg }}>{t.icon}</div>
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-[#0F172A]">{t.title}</div>
                <div className="text-[12px] text-[#475569] mt-[2px] leading-snug">{t.body}</div>
              </div>
              <button><Icon.X s={14} stroke="#94A3B8" /></button>
            </div>
          ))}
        </div>
      </Tile>

      <SubHead>{L("モーダル", "Modal")}</SubHead>
      <Tile className="p-5" style={{ background: "rgba(15,23,42,0.5)" }}>
        <div className="bg-white rounded-lg max-w-[480px] mx-auto overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(15,23,42,0.4)" }}>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "#FEF3C7" }}>
                <Icon.Alert s={20} stroke="#B45309" />
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-semibold text-[#0F172A]">{L("物件を削除しますか?", "Delete this property?")}</div>
                <div className="text-[12px] text-[#475569] mt-1.5 leading-relaxed">
                  {L("ZOOM本郷 701 を削除します。掲載中の出稿先からも自動で取り下げられます。この操作は取り消せません。",
                     "ZOOM Hongo 701 will be deleted. It will also be retracted from all ad sites automatically. This action cannot be undone.")}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-[#E5E7EB] bg-[#F7F8FA]">
            <Btn variant="secondary" size="sm">{L("キャンセル", "Cancel")}</Btn>
            <Btn variant="danger" size="sm">{L("削除する", "Delete")}</Btn>
          </div>
        </div>
      </Tile>

      <SubHead>{L("ツールチップ・スケルトン", "Tooltip & Skeleton")}</SubHead>
      <div className="grid grid-cols-2 gap-4">
        <Tile className="p-8 flex items-center justify-center">
          <div className="relative inline-block">
            <button className="w-9 h-9 rounded-md inline-flex items-center justify-center bg-[#0F172A]">
              <Icon.Settings s={16} stroke="#fff" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 -top-9 text-[11px] text-white px-2 py-1 rounded whitespace-nowrap" style={{ background: "#0F172A" }}>
              {L("設定を開く", "Open settings")}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" style={{ background: "#0F172A" }} />
            </div>
          </div>
        </Tile>
        <Tile className="p-5 space-y-3">
          {[64, 80, 56].map((w, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-md bg-[#F1F5F9] animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-[#F1F5F9] rounded animate-pulse" style={{ width: `${w}%` }} />
                <div className="h-3 bg-[#F1F5F9] rounded animate-pulse" style={{ width: "60%" }} />
              </div>
            </div>
          ))}
        </Tile>
      </div>
    </div>
  );
}

// ─────────────────────────── APP ───────────────────────────
const TOC = [
  { id: "colors",     eyebrow: "01", title: L("カラー",         "Colors"),       Block: ColorsBlock,    sub: L("ブランド・テキスト・サーフェス・ステータス", "Brand, text, surface, status") },
  { id: "type",       eyebrow: "02", title: L("タイポグラフィ", "Typography"),   Block: TypographyBlock, sub: L("Noto Sans JP / Inter / JetBrains Mono",       "Noto Sans JP / Inter / JetBrains Mono") },
  { id: "foundations",eyebrow: "03", title: L("基礎",           "Foundations"), Block: FoundationsBlock, sub: L("スペース・角丸・シャドウ",                  "Spacing, radius, shadow") },
  { id: "icons",      eyebrow: "04", title: L("アイコン",       "Icons"),        Block: IconsBlock,     sub: "lucide · 1.75 stroke" },
  { id: "buttons",    eyebrow: "05", title: L("ボタン",         "Buttons"),      Block: ButtonsBlock,   sub: L("6種類 · 3サイズ · 全状態",                  "6 variants · 3 sizes · all states") },
  { id: "inputs",     eyebrow: "06", title: L("入力フォーム",   "Inputs"),       Block: InputsBlock,    sub: L("テキスト・選択・チェック・トグル",            "Text, select, check, toggle") },
  { id: "badges",     eyebrow: "07", title: L("バッジ",         "Badges"),       Block: BadgesBlock,    sub: L("ステータス・カウント",                       "Status, count") },
  { id: "nav",        eyebrow: "08", title: L("ナビゲーション", "Navigation"),  Block: NavBlock,       sub: L("タブ・パンくず・ページネーション",            "Tabs, breadcrumbs, pagination") },
  { id: "cards",      eyebrow: "09", title: L("カード",         "Cards"),        Block: CardsBlock,     sub: L("基本・ヘッダー付き・ステータス",            "Basic, with header, status") },
  { id: "tables",     eyebrow: "10", title: L("テーブル",       "Tables"),       Block: TablesBlock,    sub: L("チェックボックス + ソート + 操作列",         "Checkbox + sortable + action column") },
  { id: "feedback",   eyebrow: "11", title: L("フィードバック", "Feedback"),    Block: FeedbackBlock,  sub: L("バナー・トースト・モーダル・スケルトン",      "Banners, toasts, modals, skeletons") },
];

function App() {
  return (
    <div style={{ background: "#F7F8FA", minHeight: "100vh" }}>
      {/* Header */}
      <header className="border-b border-[#E5E7EB] bg-white sticky top-0 z-30">
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center bg-[#0F172A]">
              <span className="text-[13px] font-bold text-white">L</span>
            </div>
            <div className="leading-tight">
              <div className="text-[14px] font-semibold text-[#0F172A]">LENZ Connect</div>
              <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider">{L("デザインシステム v0.1", "Design System v0.1")}</div>
            </div>
          </div>
          <nav className="ml-auto hidden md:flex items-center gap-1 text-[12px] overflow-x-auto">
            {TOC.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="px-2.5 py-1.5 rounded text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] whitespace-nowrap">
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-[1280px] mx-auto px-8 py-14">
        <div className="text-[11px] tracking-[0.2em] font-semibold text-[#94A3B8] uppercase">{L("デザインシステム", "Design System")}</div>
        <h1 className="text-[40px] font-bold text-[#0F172A] mt-2 leading-tight">
          {L("LENZ Connect の見た目と使い心地", "How LENZ Connect looks and feels")}
        </h1>
        <p className="text-[14px] text-[#475569] mt-3 max-w-2xl leading-relaxed">
          {L("モノクロームを基調とした、情報密度の高い日本のB2B不動産プラットフォーム。配色はステータス色とアクセントの黄色 (主要 CTA) のみに限定し、データを際立たせます。",
             "Monochrome at its core. A dense, information-rich Japanese B2B real estate platform. Color is reserved for status and a single yellow accent (primary CTA) so data stays in the foreground.")}
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <span className="text-[11px] tracking-wider uppercase font-semibold text-[#94A3B8]">{L("ベース", "Base")}</span>
          <Mono>#0F172A</Mono>
          <Mono>#F59E0B</Mono>
          <Mono>#16A34A</Mono>
          <Mono>#DC2626</Mono>
          <Mono>Noto Sans JP</Mono>
          <Mono>Inter</Mono>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-[1280px] mx-auto px-8 pb-24">
        {TOC.map(({ id, eyebrow, title, sub, Block }) => (
          <Section key={id} id={id} eyebrow={eyebrow} title={title} sub={sub}>
            <Block />
          </Section>
        ))}
        <div className="text-center text-[11px] text-[#94A3B8] pt-6 border-t border-[#E5E7EB]">
          {L("設計: LENZ Connect デザインチーム · 2026年5月26日 · v0.1",
             "Design: LENZ Connect design team · May 26, 2026 · v0.1")}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
