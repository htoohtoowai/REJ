// _shared/screens/management-1-m2.jsx — M2 物件一覧 (rebuilt 2026-08-20)
// Delivers: M-16 タグ column + multi-select tag filter · M-24 駐車場 rows listed like rooms +
// 種別 filter (parking publishes to 自社HP only — the other 5 site cells are not applicable) ·
// bulk-action bar → D1 delete modals.

const { Icon, Card, Btn, Tag, Field, Input, Select, AppShell } = window;
const L = window.L;

const M2_SITES = ["SUUMO", "AT", "HM", "RZ", "B2B"];
const M2_TAGS  = ["ZOOMシリーズ", "ZOOM RENT", "ZOOM SELECTION", "武蔵野エリア", "ペット可", "新築", "駐車場"];

const M2_GENKYO = {
  vacant:    ["ok",      L("空室","Vacant")],
  occupied:  ["neutral", L("入居中","Occupied")],
  leaving:   ["warn",    L("退去予定","Move-out due")],
  reno:      ["accent",  L("改装中","Renovating")],
  building:  ["outline", L("建築中","Under constr.")],
  done:      ["outline", L("完成済","Completed")],
};

// [name, room, mgmtNo, rent, layout, genkyo, tags, sites(5), updated, tanto, kind, apps]
const M2_ROWS = [
  ["ZOOM本郷",            "701",                        "t0021229", "262,000", "2LDK", "vacant",   ["ZOOMシリーズ","ZOOM RENT"],     [1,1,1,1,1], "05/26", L("大久保","Okubo"), "room",    1],
  ["ZOOM本郷",            "305",                        "t0021230", "138,000", "1K",   "occupied", ["ZOOMシリーズ"],                 [1,1,0,1,1], "05/24", L("大久保","Okubo"), "room",    0],
  ["ZOOM本郷",            L("駐車場No.3","Parking #3"),  "t0021288", "22,000",  "—",    "vacant",   ["ZOOMシリーズ","駐車場"],         [0,0,0,0,0], "05/22", L("大久保","Okubo"), "parking", 0],
  ["青葉マンション",        "305",                        "a0030305", "184,000", "1LDK", "leaving",  ["武蔵野エリア"],                 [1,1,1,0,1], "05/26", L("佐藤","Sato"),    "room",    2],
  ["青葉マンション",        "402",                        "a0030402", "179,000", "1LDK", "occupied", [],                              [1,0,0,1,1], "05/20", L("佐藤","Sato"),    "room",    0],
  ["中野グリーンハイツ",    "201",                        "n0140201", "152,000", "1DK",  "reno",     ["ペット可"],                     [0,0,0,1,1], "05/19", L("鈴木","Suzuki"),  "room",    0],
  ["中野グリーンハイツ",    "305",                        "n0140305", "148,000", "1DK",  "vacant",   ["ペット可","ZOOM RENT"],         [1,1,1,1,1], "05/18", L("鈴木","Suzuki"),  "room",    0],
  ["吉祥寺パークレジデンス", "501",                        "k0090501", "208,000", "2DK",  "vacant",   ["武蔵野エリア","ZOOM RENT"],     [1,1,1,1,1], "05/26", L("佐藤","Sato"),    "room",    1],
  ["吉祥寺パークレジデンス", L("駐車場No.1","Parking #1"),  "k0090281", "18,000",  "—",    "vacant",   ["武蔵野エリア","駐車場"],         [0,0,0,0,0], "05/17", L("佐藤","Sato"),    "parking", 0],
  ["メゾン白金",           "102",                        "s0110102", "348,000", "2LDK", "occupied", [],                              [1,1,1,1,1], "05/15", L("田中","Tanaka"),  "room",    0],
  ["パークサイド代沢",      "401",                        "p0170401", "412,000", "3LDK", "building", ["新築"],                         [0,0,0,1,1], "05/14", L("田中","Tanaka"),  "room",    0],
  ["カーサ恵比寿",         "203",                        "e0190203", "218,000", "1LDK", "done",     ["ZOOM SELECTION"],              [1,1,0,1,1], "05/13", L("鈴木","Suzuki"),  "room",    0],
];

const M2SiteChips = ({ on, parking }) => (
  <div className="flex items-center gap-[3px]">
    {parking && (
      <span className="h-[18px] px-1.5 rounded text-[9.5px] font-bold flex items-center bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">{L("自社HP","OWN")}</span>
    )}
    {M2_SITES.map((s, j) => (
      <span key={j} title={parking ? L("駐車場は対象外","Not applicable to parking") : undefined}
        className={`h-[18px] px-1.5 rounded text-[9.5px] font-bold flex items-center border ${
          parking ? "bg-[#F8FAFC] text-[#CBD5E1] border-[#F1F5F9] line-through"
                  : on[j] ? "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]"
                          : "bg-[#F1F5F9] text-[#94A3B8] border-[#E5E7EB]"}`}>{s}</span>
    ))}
  </div>
);

window.ScreenM2List = function () {
  const [advOpen, setAdvOpen]   = React.useState(true);
  const [kind, setKind]         = React.useState("all");          // M-24 種別 filter
  const [tagSel, setTagSel]     = React.useState([]);             // M-16 tag filter
  const [tagOpen, setTagOpen]   = React.useState(false);
  const [sel, setSel]           = React.useState([0, 3, 7]);      // 3件 選択中 by default
  const [menu, setMenu]         = React.useState(null);

  const shown = M2_ROWS.map((r, i) => [r, i])
    .filter(([r]) => kind === "all" || r[10] === kind)
    .filter(([r]) => tagSel.length === 0 || tagSel.some(t => r[6].includes(t)));

  const toggle = (i) => setSel(s => s.includes(i) ? s.filter(x => x !== i) : s.concat([i]));
  const allShown = shown.length > 0 && shown.every(([, i]) => sel.includes(i));

  return (
    <AppShell active="properties"
      crumbs={[L("物件管理","Properties"), L("物件一覧","Property list")]}
      title={L("物件一覧","Property list")}
      subtitle={L("157件 · 募集中132 · 作成中15 · 募集終了10","157 total · 132 listing · 15 drafting · 10 closed")}
      actions={<>
        <Btn kind="ghost" icon={Icon.Settings}>{L("一括操作","Bulk actions")}</Btn>
        <a href="03-property-create-step1-basics.html"><Btn kind="primary" icon={Icon.Plus}>{L("新規物件作成","New property")}</Btn></a>
      </>}>

      {/* ══ filter bar ══ */}
      <Card className="mb-4">
        <div className="p-3">
          <div className="flex items-end gap-2.5 flex-wrap">
            <div className="w-[260px]"><Field label={L("物件名","Property name")}><Input value="" placeholder={L("例: ZOOM本郷","e.g. ZOOM Hongo")} prefix={<Icon.Search s={13}/>}/></Field></div>
            <div className="w-[130px]"><Field label={L("部屋番号","Room no.")}><Input value="" placeholder="701"/></Field></div>
            <div className="w-[170px]"><Field label={L("自社管理番号","Internal mgmt no.")}><Input value="" placeholder="t0021229" prefix="#"/></Field></div>
            <Btn kind="primary" icon={Icon.Search}>{L("検索","Search")}</Btn>
            <Btn kind={advOpen ? "subtle" : "ghost"} icon={Icon.Filter} onClick={() => setAdvOpen(o => !o)}
              iconRight={<Icon.ChevronDown s={11}/>}>{L("詳細検索","Detailed search")}</Btn>
          </div>
          <div className="text-[11.5px] text-[#94A3B8] mt-2">
            {L("物件名 または 部屋番号 または 自社管理番号 — どちらでも検索できます",
               "Search by property name, room number or internal management number — any one works")}
          </div>
        </div>

        {advOpen && (
          <div className="px-3 py-3.5 border-t border-[#F1F5F9] bg-[#F8FAFC] grid grid-cols-4 gap-x-4 gap-y-3.5">
            <Field label={L("賃料","Rent")}>
              <div className="flex items-center gap-1.5">
                <Input value="" placeholder="100,000" prefix="¥"/>
                <span className="text-[#94A3B8] shrink-0">〜</span>
                <Input value="" placeholder="300,000" prefix="¥"/>
              </div>
            </Field>
            <Field label={L("面積","Floor area")}>
              <div className="flex items-center gap-1.5">
                <Input value="" placeholder="20" suffix="㎡"/>
                <span className="text-[#94A3B8] shrink-0">〜</span>
                <Input value="" placeholder="80" suffix="㎡"/>
              </div>
            </Field>
            <Field label={L("現況","Occupancy")}>
              <div className="flex items-center bg-white border border-[#CBD5E1] rounded-md h-9 px-2.5 w-full">
                <select defaultValue="all" className="bg-transparent outline-none text-[13px] text-[#0F172A] flex-1 min-w-0 cursor-pointer">
                  <option value="all">{L("すべて","All")}</option>
                  {[L("入居中","Occupied"), L("空室","Vacant"), L("建築中","Under construction"), L("退去予定","Move-out scheduled"), L("改装中","Renovating"), L("完成済","Completed")].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </Field>
            <Field label={L("媒体掲載状況","Publishing status")}>
              <div className="flex items-center bg-white border border-[#CBD5E1] rounded-md h-9 px-2.5 w-full">
                <select defaultValue="all" className="bg-transparent outline-none text-[13px] text-[#0F172A] flex-1 min-w-0 cursor-pointer">
                  <option value="all">{L("すべて","All")}</option>
                  {[L("全媒体掲載","All sites live"), L("一部掲載","Partially live"), L("未掲載","Not published")].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </Field>
            <Field label={L("担当者","Assignee")}>
              <div className="flex items-center bg-white border border-[#CBD5E1] rounded-md h-9 px-2.5 w-full">
                <select defaultValue="all" className="bg-transparent outline-none text-[13px] text-[#0F172A] flex-1 min-w-0 cursor-pointer">
                  <option value="all">{L("すべて","All")}</option>
                  {[L("大久保 ゆか","Okubo Yuka"), L("佐藤","Sato"), L("鈴木","Suzuki"), L("田中","Tanaka")].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </Field>
            {/* M-24 種別 filter — 部屋 / 駐車場 */}
            <Field label={L("種別","Type")}>
              <div className="flex items-center bg-white border border-[#CBD5E1] rounded-md h-9 px-2.5 w-full">
                <select value={kind} onChange={e => setKind(e.target.value)}
                  className="bg-transparent outline-none text-[13px] text-[#0F172A] flex-1 min-w-0 cursor-pointer">
                  <option value="all">{L("すべて","All")}</option>
                  <option value="room">{L("部屋","Room")}</option>
                  <option value="parking">{L("駐車場","Parking")}</option>
                </select>
              </div>
            </Field>
            {/* M-16 タグ multi-select chips */}
            <div className="col-span-2">
              <div className="text-[11px] font-semibold text-[#475569] mb-1">{L("タグ（複数選択）","Tags (multi-select)")}</div>
              <div className="relative">
                <div onClick={() => setTagOpen(o => !o)}
                  className="min-h-9 bg-white border border-[#CBD5E1] rounded-md px-2 py-1.5 flex items-center gap-1.5 flex-wrap cursor-pointer">
                  {tagSel.length === 0 && <span className="text-[12.5px] text-[#94A3B8]">{L("タグで絞り込む","Filter by tag")}</span>}
                  {tagSel.map(t => (
                    <span key={t} className="inline-flex items-center gap-1 pl-2 pr-1 py-[2px] rounded-full bg-[#0F172A] text-white text-[11px]">
                      {t}
                      <button onClick={e => { e.stopPropagation(); setTagSel(tagSel.filter(x => x !== t)); }} className="opacity-60 hover:opacity-100"><Icon.X s={10} stroke="#fff"/></button>
                    </span>
                  ))}
                  <Icon.ChevronDown s={13} stroke="#94A3B8"/>
                </div>
                {tagOpen && (
                  <div className="absolute left-0 top-[42px] z-20 w-full bg-white border border-[#E5E7EB] rounded-md py-1 flex flex-wrap gap-1.5 p-2" style={{ boxShadow: "0 12px 28px rgba(15,23,42,0.12)" }}>
                    {M2_TAGS.map(t => {
                      const on = tagSel.includes(t);
                      return (
                        <button key={t} onClick={() => setTagSel(on ? tagSel.filter(x => x !== t) : tagSel.concat([t]))}
                          className={`inline-flex items-center gap-1 px-2 py-[3px] rounded-full text-[11.5px] border ${on ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white text-[#475569] border-[#E5E7EB] hover:border-[#CBD5E1]"}`}>
                          <Icon.Tag s={10} stroke={on ? "#fff" : "#94A3B8"}/>{t}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* status tabs */}
        <div className="px-3 py-2.5 border-t border-[#F1F5F9] flex items-center gap-1.5 flex-wrap">
          {[[L("全て","All"), 157, true], [L("募集中","Listing"), 132], [L("作成中","Drafting"), 15], [L("募集終了","Closed"), 10]].map(([n, c, act], i) => (
            <span key={i} className={`inline-flex items-center gap-1.5 h-7 px-3 rounded-full text-[12px] cursor-pointer border ${
              act ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white border-[#E5E7EB] text-[#475569] hover:bg-[#F7F8FA]"}`}>
              {n}<span className="text-[10px] opacity-70 tabnum">{c}</span>
            </span>
          ))}
          <span className="ml-auto text-[11.5px] text-[#94A3B8]">
            {kind === "parking" ? L("駐車場のみ表示中","Showing parking only") : kind === "room" ? L("部屋のみ表示中","Showing rooms only") : null}
          </span>
        </div>
      </Card>

      {/* ══ table ══ */}
      <Card className="overflow-visible">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[1040px] text-[12px]">
          <thead className="bg-[#F7F8FA] text-[#475569] text-[10.5px] uppercase tracking-wider">
            <tr className="border-b border-[#E5E7EB]">
              <th className="px-3 py-2 w-8 text-left">
                <button onClick={() => setSel(allShown ? [] : shown.map(([, i]) => i))}
                  className={`w-[15px] h-[15px] rounded border inline-flex items-center justify-center align-middle ${allShown ? "bg-[#0F172A] border-[#0F172A]" : "bg-white border-[#CBD5E1]"}`}>
                  {allShown && <Icon.Check s={10} stroke="#fff"/>}
                </button>
              </th>
              <th className="px-2 py-2 text-left font-semibold">{L("物件名","Property")}</th>
              <th className="px-2 py-2 text-left font-semibold">{L("部屋番号","Room")}</th>
              <th className="px-2 py-2 text-left font-semibold">{L("自社管理番号","Mgmt no.")}</th>
              <th className="px-2 py-2 text-right font-semibold">{L("賃料","Rent")}</th>
              <th className="px-2 py-2 text-right font-semibold">{L("間取り","Layout")}</th>
              <th className="px-2 py-2 text-left font-semibold">{L("現況","Occupancy")}</th>
              <th className="px-2 py-2 text-left font-semibold">{L("タグ","Tags")}</th>
              <th className="px-2 py-2 text-left font-semibold">{L("媒体掲載状況","Publishing")}</th>
              <th className="px-2 py-2 text-right font-semibold">{L("更新日","Updated")}</th>
              <th className="px-2 py-2 text-left font-semibold">{L("担当者","Assignee")}</th>
              <th className="px-2 py-2 w-8"/>
            </tr>
          </thead>
          <tbody>
            {shown.map(([r, idx]) => {
              const [name, room, mgmtNo, rent, layout, genkyo, tags, sites, updated, tanto, rkind] = r;
              const [tone, label] = M2_GENKYO[genkyo];
              const on = sel.includes(idx);
              return (
                <tr key={idx} className={`border-b last:border-0 border-[#F1F5F9] cursor-pointer ${on ? "bg-[#F1F5F9]" : "hover:bg-[#F8FAFC]"}`}>
                  <td className="px-3 py-1.5">
                    <button onClick={() => toggle(idx)}
                      className={`w-[15px] h-[15px] rounded border inline-flex items-center justify-center align-middle ${on ? "bg-[#0F172A] border-[#0F172A]" : "bg-white border-[#CBD5E1]"}`}>
                      {on && <Icon.Check s={10} stroke="#fff"/>}
                    </button>
                  </td>
                  <td className="px-2 py-1.5">
                    <a href="04-property-edit-overview.html" className="font-semibold text-[#0F172A] hover:underline flex items-center gap-1.5">
                      {rkind === "parking" && <Icon.Key s={11} stroke="#94A3B8"/>}{name}
                    </a>
                  </td>
                  <td className="px-2 py-1.5 text-[#475569]">{room}</td>
                  <td className="px-2 py-1.5 mono text-[11px] text-[#64748B]">{mgmtNo}</td>
                  <td className="px-2 py-1.5 text-right font-semibold text-[#0F172A] tabnum">¥{rent}</td>
                  <td className="px-2 py-1.5 text-right text-[#475569]">{layout}</td>
                  <td className="px-2 py-1.5"><Tag tone={tone}>{label}</Tag></td>
                  <td className="px-2 py-1.5">
                    {tags.length === 0 ? <span className="text-[#CBD5E1]">—</span> : (
                      <div className="flex items-center gap-1 flex-wrap">
                        {tags.map(t => <span key={t} className="px-1.5 py-[1px] rounded bg-[#F1F5F9] border border-[#E5E7EB] text-[10.5px] text-[#475569] whitespace-nowrap">{t}</span>)}
                      </div>
                    )}
                  </td>
                  <td className="px-2 py-1.5"><M2SiteChips on={sites} parking={rkind === "parking"}/></td>
                  <td className="px-2 py-1.5 text-right text-[11.5px] text-[#64748B] tabnum">{updated}</td>
                  <td className="px-2 py-1.5 text-[#475569]">{tanto}</td>
                  <td className="px-2 py-1.5 relative">
                    <button onClick={() => setMenu(menu === idx ? null : idx)} className="text-[#94A3B8] hover:text-[#0F172A] px-1"><Icon.MoreH s={14}/></button>
                    {menu === idx && (
                      <div className="absolute right-2 top-8 z-30 w-[150px] bg-white border border-[#E5E7EB] rounded-md py-1 text-[12px]" style={{ boxShadow: "0 12px 28px rgba(15,23,42,0.14)" }}>
                        {[
                          [Icon.Edit,    L("編集","Edit"),      "04-property-edit-overview.html"],
                          [Icon.Copy,    L("複製","Duplicate"),  null],
                          [Icon.Upload,  L("出稿","Publish"),    "11-publish-controls.html"],
                          [Icon.History, L("履歴","History"),    null],
                        ].map(([Ico, label2, href], k) => (
                          href
                            ? <a key={k} href={href} className="px-3 py-1.5 flex items-center gap-2 text-[#0F172A] hover:bg-[#F1F5F9]"><Ico s={12} stroke="#475569"/>{label2}</a>
                            : <button key={k} className="w-full px-3 py-1.5 flex items-center gap-2 text-[#0F172A] hover:bg-[#F1F5F9]"><Ico s={12} stroke="#475569"/>{label2}</button>
                        ))}
                        <div className="my-1 border-t border-[#F1F5F9]"/>
                        <a href="02-property-list-delete-modal.html" className="px-3 py-1.5 flex items-center gap-2 text-[#DC2626] hover:bg-[#FEF2F2]"><Icon.Trash s={12} stroke="#DC2626"/>{L("削除","Delete")}</a>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>

        <div className="px-3 py-2.5 flex items-center justify-between text-[12px] text-[#64748B] border-t border-[#F1F5F9]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>{L("表示件数","Per page")}</span>
              <div className="flex items-center bg-white border border-[#CBD5E1] rounded-md h-7 px-2">
                <select defaultValue="20" className="bg-transparent outline-none text-[12px] text-[#0F172A] cursor-pointer">
                  <option value="20">20</option><option value="50">50</option><option value="100">100</option>
                </select>
              </div>
            </div>
            <span className="tabnum">{L("157件中 1–20件表示","1–20 of 157")}</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-md inline-flex items-center justify-center text-[#CBD5E1]"><Icon.ChevronLeft s={13}/></button>
            {["1","2","3","…","8"].map((p, i) => (
              <span key={i} className={`min-w-7 h-7 px-1.5 inline-flex items-center justify-center rounded-md text-[12px] cursor-pointer tabnum ${p === "1" ? "bg-[#0F172A] text-white" : "text-[#475569] hover:bg-[#F1F5F9]"}`}>{p}</span>
            ))}
            <button className="w-7 h-7 rounded-md inline-flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9]"><Icon.ChevronRight s={13}/></button>
          </div>
        </div>
      </Card>

      {/* ══ bulk-action bar ══ */}
      {sel.length > 0 && (
        <div className="fixed bottom-0 left-[240px] right-0 z-30 bg-[#0F172A] text-white px-6 h-[56px] flex items-center gap-3"
             style={{ boxShadow: "0 -8px 24px rgba(15,23,42,0.20)" }}>
          <span className="text-[13px] font-semibold tabnum">{L(`${sel.length}件 選択中`, `${sel.length} selected`)}</span>
          <button onClick={() => setSel([])} className="text-[11.5px] text-white/60 hover:text-white underline">{L("選択解除","Clear")}</button>
          <div className="ml-auto flex items-center gap-2">
            <button className="h-9 px-3.5 rounded-md text-[12.5px] font-medium bg-white/10 hover:bg-white/20 inline-flex items-center gap-1.5"><Icon.Upload s={13} stroke="#fff"/>{L("一括出稿","Bulk publish")}</button>
            <button className="h-9 px-3.5 rounded-md text-[12.5px] font-medium bg-white/10 hover:bg-white/20 inline-flex items-center gap-1.5"><Icon.Sync s={13} stroke="#fff"/>{L("一括ステータス変更","Bulk status change")}</button>
            <button className="h-9 px-3.5 rounded-md text-[12.5px] font-medium bg-white/10 hover:bg-white/20 inline-flex items-center gap-1.5"><Icon.Download s={13} stroke="#fff"/>{L("CSV出力","Export CSV")}</button>
            <a href="02-property-list-bulk-delete-modal.html" className="h-9 px-3.5 rounded-md text-[12.5px] font-semibold bg-[#DC2626] hover:bg-[#991B1B] inline-flex items-center gap-1.5"><Icon.Trash s={13} stroke="#fff"/>{L("削除","Delete")}</a>
          </div>
        </div>
      )}
      <div className="h-16"/>
    </AppShell>
  );
};
