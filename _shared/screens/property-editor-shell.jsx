// _shared/screens/property-editor-shell.jsx — shared chrome for the property-edit tabs
// (M4 概要 / M5 建物 / M5b 部屋 / M6 取引情報 / M7 掲載情報等 / M8 画像 / M9 パノラマ・動画).
// Owns: breadcrumb, property header (name + 状態 pill + M-16 free-tag editor + system chips),
// header actions (状態 dropdown / 履歴 / 複製 / 削除), the tab strip, the sticky bottom toolbar
// (出稿 orange-outline + 保存 + プレビュー + 印刷) and the エラードロワー above it.

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, AppShell } = window;
const L = window.L;

const PE_TABS = () => [
  [L("標準編集","Standard edit"),        null],
  [L("概要","Overview"),                 "04-property-edit-overview.html"],
  [L("建物","Building"),                 "05-property-edit-building.html"],
  [L("部屋","Room"),                     "05b-property-edit-room.html"],
  [L("取引情報","Transaction"),           "06-property-edit-transaction.html"],
  [L("掲載情報等","Listing info"),        "07-property-edit-listing-info.html"],
  [L("画像","Images"),                   "08-property-edit-images.html"],
  [L("パノラマ・動画","Panorama & video"), "09-property-edit-panorama.html"],
];

const PE_TAG_MASTER = ["ZOOMシリーズ", "ZOOM RENT", "ZOOM SELECTION", "駅近5分", "新築", "リノベ済", "ペット可", "法人契約可", "学生向け"];

// Radio-chip group — used instead of a dropdown wherever options ≤ 5
window.PEChips = ({ label, options, value, onChange, hint }) => (
  <div>
    {label && (
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-[11px] font-semibold text-[#475569]">{label}</span>
        {hint && <span className="text-[10px] text-[#94A3B8]">{hint}</span>}
      </div>
    )}
    <div className="flex flex-wrap gap-1">
      {options.map((o, i) => (
        <button key={i} onClick={onChange ? () => onChange(i) : undefined}
          className={`px-2.5 py-[5px] rounded-full border text-[11.5px] whitespace-nowrap ${
            (typeof value === "number" ? i === value : o === value)
              ? "bg-[#0F172A] text-white border-[#0F172A]"
              : "bg-white border-[#E5E7EB] text-[#475569] hover:border-[#CBD5E1]"}`}>{o}</button>
      ))}
    </div>
  </div>
);

window.PECheck = ({ label, on, onChange }) => (
  <label onClick={onChange} className="flex items-center gap-2 text-[12.5px] text-[#0F172A] cursor-pointer">
    <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${on ? "bg-[#0F172A]" : "border border-[#CBD5E1] bg-white"}`}>
      {on && <Icon.Check s={11} stroke="#fff"/>}
    </span>
    {label}
  </label>
);

window.PETextarea = ({ value, rows = 3, placeholder }) => (
  <textarea readOnly rows={rows} placeholder={placeholder} value={value}
    className="w-full bg-white border border-[#CBD5E1] rounded-md p-2.5 text-[12.5px] text-[#0F172A] leading-relaxed outline-none focus:border-[#0F172A] resize-none"/>
);

window.PESection = ({ title, sub, action, children }) => (
  <Card>
    <CardHead title={title} sub={sub} action={action}/>
    <div className="p-4">{children}</div>
  </Card>
);

window.PEEraToggle = ({ ce = true }) => (
  <div className="flex items-center bg-white border border-[#E5E7EB] rounded-md p-[2px] shrink-0">
    <button className={`px-2 py-1 rounded text-[10.5px] ${ce ? "bg-[#0F172A] text-white" : "text-[#475569]"}`}>{L("西暦","CE")}</button>
    <button className={`px-2 py-1 rounded text-[10.5px] ${ce ? "text-[#475569]" : "bg-[#0F172A] text-white"}`}>{L("和暦","Wareki")}</button>
  </div>
);

// errors: [[field, message], …] — non-empty opens the エラードロワー and blocks 保存
window.PropEditorShell = function ({ active, errors = [], children }) {
  const [tags, setTags]   = React.useState(["ZOOMシリーズ", "ZOOM RENT"]);
  const [adding, setAdding] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  const [errOpen, setErrOpen] = React.useState(errors.length > 0);
  const [saving, setSaving] = React.useState(false);
  const [savedAt, setSavedAt] = React.useState("14:32");

  const suggestions = PE_TAG_MASTER.filter(t => !tags.includes(t) && (draft === "" || t.toLowerCase().includes(draft.toLowerCase()))).slice(0, 5);
  const addTag = (t) => { const v = (t || draft).trim(); if (v && !tags.includes(v)) setTags(tags.concat([v])); setDraft(""); setAdding(false); };
  const blocked = errOpen && errors.length > 0;
  const onSave = () => {
    if (blocked) return;
    setSaving(true);
    window.setTimeout(() => { setSaving(false); setSavedAt("14:41"); }, 900);
  };

  return (
    <AppShell active="properties"
      crumbs={[L("物件管理","Properties"), "ZOOM本郷", L("701号室","Room 701")]}
      title={
        <span className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
          <span className="w-7 h-7 rounded-md bg-[#0F172A] text-white flex items-center justify-center shrink-0"><Icon.Building s={16}/></span>
          <span className="text-[24px] font-semibold leading-none">ZOOM本郷 701</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] text-[11.5px] font-semibold text-[#15803D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"/>{L("募集中","Listed")}
          </span>
        </span>
      }
      subtitle={
        <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
          {tags.map(t => (
            <span key={t} className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-[4px] rounded-full bg-[#0F172A] text-white text-[11.5px] font-medium">
              {t}
              <button onClick={() => setTags(tags.filter(x => x !== t))} className="opacity-60 hover:opacity-100" title={L("タグを外す","Remove tag")}><Icon.X s={11} stroke="#fff"/></button>
            </span>
          ))}
          {adding ? (
            <span className="relative">
              <span className="inline-flex items-center h-[26px] px-2 rounded-full border border-[#0F172A] bg-white">
                <input autoFocus value={draft} onChange={e => setDraft(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") addTag(); if (e.key === "Escape") { setAdding(false); setDraft(""); } }}
                  placeholder={L("タグ名を入力","Tag name")}
                  className="w-[128px] bg-transparent outline-none text-[11.5px] text-[#0F172A] placeholder:text-[#94A3B8]"/>
                <button onClick={() => { setAdding(false); setDraft(""); }} className="text-[#94A3B8] hover:text-[#0F172A]"><Icon.X s={11}/></button>
              </span>
              {suggestions.length > 0 && (
                <span className="absolute left-0 top-[30px] z-20 w-[220px] bg-white border border-[#E5E7EB] rounded-md py-1 block" style={{ boxShadow: "0 12px 28px rgba(15,23,42,0.12)" }}>
                  <span className="block px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#94A3B8]">{L("既存のタグ","Existing tags")}</span>
                  {suggestions.map(s => (
                    <button key={s} onClick={() => addTag(s)} className="w-full text-left px-2.5 py-1.5 text-[12px] text-[#0F172A] hover:bg-[#F1F5F9] flex items-center gap-1.5">
                      <Icon.Tag s={11} stroke="#94A3B8"/>{s}
                    </button>
                  ))}
                </span>
              )}
            </span>
          ) : (
            <button onClick={() => setAdding(true)} className="inline-flex items-center gap-1 px-2.5 py-[4px] rounded-full border border-dashed border-[#CBD5E1] text-[11.5px] text-[#475569] hover:border-[#0F172A] hover:text-[#0F172A]">
              <Icon.Plus s={11}/>{L("タグ追加","Add tag")}
            </button>
          )}
          <span className="w-px h-4 bg-[#E5E7EB] mx-1"/>
          <Tag tone="warn" size="md"><Icon.FileText s={11}/> {L("申込あり","Application")}</Tag>
          <Tag tone="outline" size="md"><Icon.Star s={11}/> {L("画像品質スコア 40点 ✓","Image quality score 40 ✓")}</Tag>
        </div>
      }
      actions={<div className="flex items-center gap-2 flex-nowrap whitespace-nowrap">
        <div className="flex items-center gap-2 h-9 px-3 rounded-md bg-[#DCFCE7] border border-[#BBF7D0] cursor-pointer shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#16A34A]"/>
          <span className="text-[13px] font-semibold text-[#15803D]">{L("募集中","Listed")}</span>
          <Icon.ChevronDown s={13} stroke="#15803D"/>
        </div>
        <span className="w-px h-5 bg-[#E5E7EB] shrink-0"/>
        <button className="inline-flex items-center gap-1.5 text-[12.5px] text-[#475569] hover:text-[#0F172A] px-1.5 py-1 shrink-0"><Icon.History s={13}/> {L("履歴","History")}</button>
        <button className="inline-flex items-center gap-1.5 text-[12.5px] text-[#475569] hover:text-[#0F172A] px-1.5 py-1 shrink-0"><Icon.Copy s={13}/> {L("複製","Duplicate")}</button>
        <a href="04-property-edit-delete-modal.html" className="inline-flex items-center gap-1.5 text-[12.5px] text-[#475569] hover:text-[#DC2626] px-1.5 py-1 shrink-0"><Icon.Trash s={13}/> {L("削除","Delete")}</a>
      </div>}>

      <div className="flex items-center gap-1 border-b border-[#E5E7EB] mb-5 -mt-1">
        {PE_TABS().map(([label, href], i) => {
          const on = i === active;
          const cls = `px-3.5 py-2 text-[13px] whitespace-nowrap ${on
            ? "text-[#0F172A] font-semibold border-b-2 border-[#0F172A] -mb-px"
            : "text-[#64748B] hover:text-[#0F172A] cursor-pointer"}`;
          return href && !on ? <a key={i} href={href} className={cls}>{label}</a> : <div key={i} className={cls}>{label}</div>;
        })}
      </div>

      {children}

      {/* エラードロワー — opens above the toolbar when save fails validation */}
      {blocked && (
        <div className="fixed bottom-[57px] left-[240px] right-0 z-30 border-t border-[#FECACA] bg-[#FEF2F2]">
          <div className="px-6 py-2.5 flex items-start gap-3">
            <Icon.AlertCircle s={15} stroke="#DC2626"/>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold text-[#991B1B]">
                {L(`入力エラーが${errors.length}件あります。修正するまで保存できません。`, `${errors.length} validation error(s). Save is blocked until fixed.`)}
              </div>
              <ul className="mt-1 space-y-[3px]">
                {errors.map(([field, msg], i) => (
                  <li key={i} className="text-[12px] text-[#991B1B] flex items-center gap-2">
                    <span className="font-semibold">{field}：</span><span>{msg}</span>
                    <button className="underline decoration-[#FCA5A5] hover:decoration-[#991B1B] text-[11.5px]">{L("該当項目へ","Go to field")}</button>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setErrOpen(false)} className="text-[#991B1B] opacity-60 hover:opacity-100 shrink-0" title={L("閉じる","Close")}><Icon.X s={14} stroke="#991B1B"/></button>
          </div>
        </div>
      )}

      {/* sticky bottom toolbar */}
      <div className="fixed bottom-0 left-[240px] right-0 bg-white border-t border-[#E5E7EB] px-6 h-[57px] flex items-center gap-3 z-30"
           style={{ boxShadow: "0 -4px 16px rgba(15,23,42,0.06)" }}>
        <div className="flex items-center gap-2 text-[11.5px] text-[#94A3B8]">
          {saving
            ? <><svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#CBD5E1" strokeWidth="3"/><path d="M21 12a9 9 0 0 0-9-9" stroke="#0F172A" strokeWidth="3" strokeLinecap="round"/></svg>
               <span className="text-[#475569]">{L("保存中…","Saving…")}</span></>
            : <span className="tabnum">{L(`最終保存: ${savedAt} (大久保 ゆか)`, `Last saved ${savedAt} (Okubo Yuka)`)}</span>}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative group">
            <button className="inline-flex items-center gap-1.5 rounded-md font-semibold h-9 px-4 text-[13px] bg-white text-[#D97706] border-2 border-[#F59E0B] hover:bg-[#FEF3C7]">
              <Icon.Upload s={14} stroke="#D97706"/>{L("出稿","Publish")}
            </button>
            <div className="absolute bottom-[46px] right-0 w-[280px] px-3 py-2 rounded-md bg-[#0F172A] text-white text-[11.5px] leading-snug opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              {L("状態が「募集中」かつ媒体が「掲載」の時のみデータが配信されます",
                 "Data is distributed only when the status is 募集中 and the site is set to 掲載")}
            </div>
          </div>
          <button onClick={onSave} disabled={blocked}
            title={blocked ? L("エラーを修正してください","Fix the errors first") : undefined}
            className={`inline-flex items-center gap-1.5 rounded-md font-semibold h-9 px-5 text-[13px] ${blocked
              ? "bg-[#FDE68A] text-[#92400E]/50 cursor-not-allowed"
              : "bg-[#F59E0B] text-[#0F172A] hover:bg-[#D97706] hover:text-white"}`}>
            <Icon.Save s={14}/>{L("保存","Save")}
          </button>
          <Btn kind="ghost" icon={Icon.Eye}>{L("プレビュー","Preview")}</Btn>
          <button className="inline-flex items-center gap-1.5 h-9 px-2.5 text-[13px] text-[#475569] hover:text-[#0F172A]">
            <Icon.Print s={14}/>{L("印刷","Print")}<Icon.ChevronDown s={13}/>
          </button>
        </div>
      </div>
    </AppShell>
  );
};
