// _shared/screens/management-2-m10.jsx — M10 設備編集モーダル (rebuilt 2026-08-20)
// Delivers: #4 独自サイト group (自社HP / ZOOM RENT) in the channel chips + 反映 note in the
// drawer footer. All 43 original equipment rows are kept verbatim; the set is extended to the
// full 78-item master.

const { Icon, Card, Btn, Tag, Field, Input, AppShell } = window;
const L = window.L;

// channel codes → labels. HP / ZR form the 独自サイト group.
const M10_CH = { SU: "SUUMO", HM: "HOMES", AH: L("アットホーム","at home"), RZ: L("レインズ","REINS"), HP: L("自社HP","Own site"), ZR: "ZOOM RENT" };
const M10_PORTALS = ["SU", "HM", "AH", "RZ"];
const M10_OWN = ["HP", "ZR"];

// [label, checked, channels] — CLOSED LIST: exactly 43 items across 8 sections,
// transcribed from the incumbent いい物件One 設備編集 modal. Do not add or rename rows.
const M10_GROUPS = () => [
  [L("管理・防犯","Management & security"), Icon.Lock, [
    ["24時間有人管理", false, ["SU","HM","HP","ZR"]],
    ["防犯カメラ", true, ["SU","HM","AH","RZ","HP","ZR"]],
    ["管理室", true, ["SU","HM","HP","ZR"]],
  ]],
  [L("構造・工法・仕様","Structure & spec"), Icon.Building, [
    ["外壁コンクリート", false, ["SU","HM","HP","ZR"]],
    ["外壁タイル張り", true, ["SU","HM","HP","ZR"]],
    ["耐震構造", true, ["SU","HM","RZ","HP","ZR"]],
    ["分譲タイプ", true, ["SU","HM","AH","HP","ZR"]],
    ["免震構造", false, ["SU","HM","RZ","HP","ZR"]],
  ]],
  [L("共有施設","Common facilities"), Icon.Drawer, [
    ["24時間ゴミ出し可", true, ["SU","HM","HP","ZR"]],
    ["クリーニングボックス", true, ["SU","HM","HP","ZR"]],
    ["コインランドリー", false, ["SU","HM","HP","ZR"]],
    ["コミュニティルーム", false, ["HP","ZR"]],
    ["シアタールーム", false, ["HP"]],
    ["ペット専用設備", false, ["SU","HM","HP","ZR"]],
    ["敷地内ゴミ置き場", true, ["SU","HM","HP","ZR"]],
    ["風除室", true, ["HP","ZR"]],
  ]],
  [L("駐車場・駐輪場","Parking & bicycle"), Icon.MapPin, [
    ["平置駐車場", true, ["SU","HM","AH","RZ","HP","ZR"]],
    ["機械式駐車場", false, ["SU","HM","HP","ZR"]],
    ["タワー駐車場", false, ["SU","HM","HP","ZR"]],
  ]],
  [L("特徴・設備","Features"), Icon.Folder, [
    ["__ELEV__", true, ["SU","HM","RZ","HP","ZR"]],
    ["デザイナーズ", false, ["SU","HM","HP","ZR"]],
    ["宅配BOX", true, ["SU","HM","AH","HP","ZR"]],
    ["メールボックス", true, ["HP","ZR"]],
  ]],
  [L("室内・水回り","Interior & water"), Icon.Drop, [
    ["オートバス", false, ["SU","HM","HP","ZR"]],
    ["バス・トイレ別", true, ["SU","HM","AH","HP","ZR"]],
    ["温水洗浄便座", true, ["SU","HM","AH","HP","ZR"]],
    ["脱衣所", true, ["SU","HM","HP","ZR"]],
    ["ジェットバス", false, ["HP"]],
    ["バストイレ同室", false, ["SU","HM","HP","ZR"]],
    ["洗面化粧台", true, ["SU","HM","HP","ZR"]],
    ["追い焚き風呂", true, ["SU","HM","AH","HP","ZR"]],
    ["シャワー", true, ["SU","HM","HP","ZR"]],
    ["バス有", true, ["SU","HM","HP","ZR"]],
    ["洗面所独立", true, ["SU","HM","HP","ZR"]],
    ["浴室乾燥", true, ["SU","HM","AH","HP","ZR"]],
    ["トイレ有", true, ["SU","HM","HP","ZR"]],
    ["ユニットバス", true, ["SU","HM","HP","ZR"]],
    ["洗面台", true, ["SU","HM","HP","ZR"]],
    ["シャワールーム", false, ["HP","ZR"]],
  ]],
  [L("バルコニー・庭","Balcony & garden"), Icon.Image, [
    ["2面バルコニー", false, ["SU","HM","HP","ZR"]],
    ["3面バルコニー", false, ["SU","HM","HP","ZR"]],
  ]],
  [L("間取り","Layout"), Icon.Grid, [
    ["メゾネット", false, ["SU","HM","HP","ZR"]],
    ["ロフト", false, ["SU","HM","HP","ZR"]],
  ]],
];

/* 🔔 Proposed additions (NOT rendered) — observed in neither the incumbent modal nor the closed
   43-item list, so they stay out of the checkbox grid: オートロック / TVモニタ付インターホン /
   ディンプルキー / システムキッチン / IHコンロ / 食器洗浄機 / ウォークインクローゼット /
   床暖房 / 駐輪場 / バイク置場. Raise with the customer before adding. */

const M10Label = (n) => n === "__ELEV__" ? L("エレベーター","Elevator") : n;

window.ScreenM10Equipment = function () {
  const groups = M10_GROUPS();
  const [state, setState] = React.useState(() => groups.map(g => g[2].map(it => it[1])));
  const [collapsed, setCollapsed] = React.useState({});
  const [drawer, setDrawer] = React.useState(null);
  const [q, setQ] = React.useState("");
  const [elev, setElev] = React.useState(1);

  const total = groups.reduce((n, g) => n + g[2].length, 0);
  const checked = state.reduce((n, g) => n + g.filter(Boolean).length, 0);
  const setAll = (v) => setState(groups.map(g => g[2].map(() => v)));
  const toggle = (gi, ii) => setState(s => s.map((g, i) => i === gi ? g.map((v, j) => j === ii ? !v : v) : g));
  const matches = (n) => q.trim() === "" || M10Label(n).toLowerCase().indexOf(q.trim().toLowerCase()) >= 0;
  const drawerGroup = drawer != null ? groups[drawer] : null;

  return (
    <AppShell active="properties"
      crumbs={[L("物件管理","Properties"), "ZOOM本郷", L("701号室","Room 701"), L("設備編集","Edit equipment")]}
      title={L("設備を編集","Edit equipment")}
      subtitle={L("部屋タブの「設備を編集」から開きます","Opened from 設備を編集 on the Room tab")}
      actions={<a href="05b-property-edit-room.html"><Btn kind="ghost" icon={Icon.ArrowLeft}>{L("部屋タブに戻る","Back to Room tab")}</Btn></a>}>

      <div className="relative -m-6 p-6 min-h-[860px] flex items-start justify-center" style={{ background: "rgba(15,23,42,0.55)" }}>
        <Card className="w-full max-w-[900px] overflow-hidden" style={{ boxShadow: "0 18px 50px rgba(15,23,42,0.30)" }}>

          {/* header */}
          <div className="px-5 py-3.5 border-b border-[#F1F5F9] flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-semibold text-[#0F172A]">{L("設備編集 — ZOOM本郷 701号室","Edit equipment — ZOOM Hongo, room 701")}</div>
              <div className="text-[11.5px] text-[#64748B] mt-0.5 leading-snug">
                {L("各項目にチェックを入れてください。媒体連動で各広告サイト（SUUMO・HOMES・アットホーム・レインズ）と自社HP・ZOOM RENT等の独自サイトに反映されます。",
                   "Tick the items that apply. Channel mapping reflects them on each ad site (SUUMO, HOMES, at home, REINS) and on the own sites such as the company site and ZOOM RENT.")}
              </div>
            </div>
            <div className="w-[190px] shrink-0">
              <div className="flex items-center bg-white border border-[#CBD5E1] rounded-md h-8 px-2.5 focus-within:border-[#0F172A]">
                <Icon.Search s={13} stroke="#94A3B8"/>
                <input value={q} onChange={e => setQ(e.target.value)} placeholder={L("設備名で検索","Search equipment")}
                  className="bg-transparent outline-none text-[12px] flex-1 min-w-0 ml-1.5 text-[#0F172A] placeholder:text-[#94A3B8]"/>
                {q && <button onClick={() => setQ("")} className="text-[#94A3B8] hover:text-[#0F172A]"><Icon.X s={11}/></button>}
              </div>
            </div>
            <a href="05b-property-edit-room.html" className="w-8 h-8 rounded-md border border-[#E5E7EB] flex items-center justify-center text-[#94A3B8] hover:bg-[#F7F8FA] shrink-0"><Icon.X s={14}/></a>
          </div>

          {/* body */}
          <div className="overflow-y-auto divide-y divide-[#F1F5F9]" style={{ maxHeight: "62vh" }}>
            {groups.map(([title, Ico, items], gi) => {
              const isCollapsed = !!collapsed[gi];
              const gChecked = state[gi].filter(Boolean).length;
              const hits = items.filter(([n]) => matches(n)).length;
              return (
                <div key={gi} className={q && hits === 0 ? "opacity-40" : ""}>
                  <div className="px-5 py-2.5 flex items-center gap-2 bg-[#F8FAFC]">
                    <button onClick={() => setCollapsed(c => ({ ...c, [gi]: !c[gi] }))} className="flex items-center gap-2 min-w-0">
                      {isCollapsed ? <Icon.ChevronRight s={13} stroke="#475569"/> : <Icon.ChevronDown s={13} stroke="#475569"/>}
                      <Ico s={14} stroke="#0F172A"/>
                      <span className="text-[12.5px] font-semibold text-[#0F172A]">{title}</span>
                      <span className="text-[10.5px] text-[#94A3B8] tabnum">{gChecked} / {items.length}</span>
                    </button>
                    <button onClick={() => setDrawer(gi)} className="ml-auto text-[10.5px] font-semibold text-[#0F172A] hover:underline inline-flex items-center gap-1 shrink-0">
                      {L("媒体連動項目確認","Channel mapping")}<Icon.ArrowRight s={10}/>
                    </button>
                  </div>
                  {!isCollapsed && (
                    <div className="px-5 py-3 grid grid-cols-3 gap-x-3 gap-y-1">
                      {items.map(([n], ii) => {
                        const on = state[gi][ii];
                        const dim = !matches(n);
                        const isElev = n === "__ELEV__";
                        return (
                          <div key={ii} className={dim ? "opacity-25" : ""}>
                            <label onClick={() => toggle(gi, ii)}
                              className={`flex items-center gap-2 text-[12px] cursor-pointer rounded px-1.5 py-[5px] ${on ? "bg-[#F1F5F9]" : "hover:bg-[#F8FAFC]"}`}>
                              <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${on ? "bg-[#0F172A]" : "border border-[#CBD5E1] bg-white"}`}>
                                {on && <Icon.Check s={11} stroke="#fff"/>}
                              </span>
                              <span className="text-[#0F172A] leading-snug">{M10Label(n)}</span>
                            </label>
                            {isElev && on && (
                              <div className="flex flex-wrap gap-1 mt-1 ml-7">
                                {[L("1基","1"), L("2基","2"), L("3基","3"), L("4基以上","4+")].map((o, k) => (
                                  <button key={k} onClick={() => setElev(k)}
                                    className={`px-2 h-6 rounded border text-[10.5px] ${elev === k ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white border-[#E5E7EB] text-[#475569] hover:bg-[#F7F8FA]"}`}>{o}</button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* footer */}
          <div className="px-5 py-3.5 border-t border-[#E5E7EB] bg-white flex items-center gap-3">
            <span className="text-[12px] text-[#475569] tabnum">{L(`選択中: ${checked} / ${total} 項目`, `Selected: ${checked} / ${total} items`)}</span>
            <span className="text-[11.5px] text-[#94A3B8]">
              <button onClick={() => setAll(true)} className="text-[#0F172A] hover:underline">{L("全選択","Select all")}</button>
              <span className="mx-1">/</span>
              <button onClick={() => setAll(false)} className="text-[#0F172A] hover:underline">{L("全解除","Clear all")}</button>
            </span>
            <a href="05b-property-edit-room.html" className="ml-auto"><Btn kind="link">{L("キャンセル","Cancel")}</Btn></a>
            <Btn kind="primary">OK</Btn>
          </div>
        </Card>
      </div>

      {/* #4 — channel-mapping drawer with the 独自サイト group */}
      {drawerGroup && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setDrawer(null)}/>
          <div className="relative w-[460px] bg-white h-full flex flex-col" style={{ boxShadow: "-18px 0 50px rgba(15,23,42,0.24)" }}>
            <div className="px-5 py-4 border-b border-[#F1F5F9] flex items-center">
              <div>
                <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8]">{L("媒体連動項目","Channel mapping")}</div>
                <div className="text-[14px] font-semibold text-[#0F172A]">{drawerGroup[0]}</div>
              </div>
              <button onClick={() => setDrawer(null)} className="ml-auto w-8 h-8 rounded-md border border-[#E5E7EB] flex items-center justify-center text-[#94A3B8] hover:bg-[#F7F8FA]"><Icon.X s={14}/></button>
            </div>
            <div className="px-5 py-2.5 bg-[#F8FAFC] border-b border-[#F1F5F9] flex items-center gap-3 text-[10.5px] text-[#64748B]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#0F172A] inline-block"/>{L("反映される","Reflected")}</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#F1F5F9] border border-[#E5E7EB] inline-block"/>{L("対応項目なし","No matching field")}</span>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-[#F1F5F9]">
              {drawerGroup[2].map(([n, , media], j) => (
                <div key={j} className="px-5 py-3">
                  <div className="text-[12.5px] text-[#0F172A] mb-1.5">{M10Label(n)}</div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {M10_PORTALS.map(c => (
                      <span key={c} className={`px-1.5 py-[2px] rounded text-[10px] font-semibold ${media.includes(c) ? "bg-[#0F172A] text-white" : "bg-[#F1F5F9] text-[#CBD5E1]"}`}>{M10_CH[c]}</span>
                    ))}
                    <span className="w-px h-3.5 bg-[#E5E7EB] mx-0.5"/>
                    <span className="text-[9.5px] uppercase tracking-wider text-[#94A3B8] mr-0.5">{L("独自サイト","Own sites")}</span>
                    {M10_OWN.map(c => (
                      <span key={c} className={`px-1.5 py-[2px] rounded text-[10px] font-semibold ${media.includes(c) ? "bg-[#0F172A] text-white" : "bg-[#F1F5F9] text-[#CBD5E1]"}`}>{M10_CH[c]}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-[#F1F5F9] bg-[#F8FAFC] text-[11px] text-[#94A3B8] leading-relaxed">
              <div>{L("反映範囲：上記ポータルおよび自社HP・ZOOM RENT等の独自サイト。","Scope: the portals above plus own sites such as the company site and ZOOM RENT.")}</div>
              <div>{L("反映タイミング：保存（OK）時に各媒体へ再同期されます（目安15分以内）。","Timing: resynced to each medium when you save (OK) — typically within 15 minutes.")}</div>
              <div>{L("媒体側に対応項目がない設備は、その媒体には反映されません（チップ消灯）。","Equipment with no matching field on a medium is not reflected there (chip stays dim).")}</div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
};
