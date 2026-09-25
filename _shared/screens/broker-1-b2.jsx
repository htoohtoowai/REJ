// _shared/screens/broker-1-b2.jsx — B2 物件検索（条件検索）(rebuilt 2026-08-20)
// Delivers: M-16 tag search (free tags created management-side) · B-1 募集項目 chips rendered
// from the company-defined master (M17), not a hardcoded set.

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, PhotoPh, BrokerShell } = window;
const L = window.L;

// B-1 — company-defined 募集項目 master (M17). Dynamic list, per company.
const B2_ATTRS = () => [L("敷金ゼロ","No deposit"), L("礼金ゼロ","No key money"), L("ペット可","Pets OK"),
  L("二人入居可","Two tenants OK"), L("即入居可","Move-in ready"), L("楽器相談可","Instruments negotiable"), L("事務所利用可","Office use OK")];
// M-16 — free tags created on the management side
const B2_TAGS = () => ["ZOOM RENT", "ZOOM SELECTION", L("ZOOMシリーズ","ZOOM series"), L("武蔵野エリア","Musashino area"), L("新築","New build"), L("リノベ済","Renovated")];

const B2_CARDS = () => [
  ["ZOOM本郷 701",              "262,000", "20,000", "2LDK", "41.74", L("丸ノ内線 本郷三丁目 徒歩3分","Hongo-sanchome 3 min"),   L("株式会社LENZ DX","LENZ DX Co."),        ["view", "apply"], "exterior"],
  ["ZOOM本郷 305",              "138,000", "12,000", "1K",   "26.00", L("丸ノ内線 本郷三丁目 徒歩3分","Hongo-sanchome 3 min"),   L("株式会社LENZ DX","LENZ DX Co."),        ["view"],          "room"],
  [L("青葉マンション 305","Aoba Mansion 305"), "184,000", "10,000", "1LDK", "44.10", L("池上線 洗足池 徒歩6分","Senzokuike 6 min"), L("青葉管理サービス","Aoba Management"), ["view", "apply"], "exterior"],
  [L("吉祥寺パークレジデンス 501","Kichijoji Park Residence 501"), "208,000", "15,000", "2DK", "48.20", L("中央線 吉祥寺 徒歩8分","Kichijoji 8 min"), L("株式会社LENZ DX","LENZ DX Co."), ["view", "apply"], "room"],
  [L("中野グリーンハイツ 305","Nakano Green Heights 305"), "148,000", "8,000", "1DK", "32.50", L("中央線 中野 徒歩11分","Nakano 11 min"), L("グリーン住宅管理","Green Housing"), ["view"], "exterior"],
  [L("メゾン白金 102","Maison Shirokane 102"), "348,000", "22,000", "2LDK", "65.00", L("南北線 白金台 徒歩4分","Shirokanedai 4 min"), L("三田管理","Mita Management"), ["apply"], "room"],
  [L("パークサイド代沢 401","Parkside Daizawa 401"), "412,000", "25,000", "3LDK", "78.50", L("井の頭線 池ノ上 徒歩5分","Ikenoue 5 min"), L("株式会社LENZ DX","LENZ DX Co."), ["view", "apply"], "exterior"],
  [L("カーサ恵比寿 203","Casa Ebisu 203"), "218,000", "14,000", "1LDK", "38.80", L("日比谷線 恵比寿 徒歩7分","Ebisu 7 min"), L("恵比寿ハウジング","Ebisu Housing"), ["view"], "room"],
  [L("ヒルズ青山 805","Hills Aoyama 805"), "118,000", "9,000", "1R", "22.00", L("銀座線 外苑前 徒歩9分","Gaienmae 9 min"), L("青山レジデンス","Aoyama Residence"), ["view", "apply"], "room"],
];

const B2Chips = ({ label, options, value, onToggle, sub }) => (
  <div>
    <div className="flex items-baseline justify-between mb-1.5">
      <span className="text-[11.5px] font-semibold text-[#0F172A]">{label}</span>
      {sub && <span className="text-[10px] text-[#94A3B8]">{sub}</span>}
    </div>
    <div className="flex flex-wrap gap-1">
      {options.map((o, i) => {
        const on = value.indexOf(o) >= 0;
        return (
          <button key={i} onClick={() => onToggle(o)}
            className={`px-2 py-[4px] rounded-full border text-[11px] whitespace-nowrap ${on
              ? "bg-[#0F172A] text-white border-[#0F172A]"
              : "bg-white border-[#E5E7EB] text-[#475569] hover:border-[#CBD5E1]"}`}>{o}</button>
        );
      })}
    </div>
  </div>
);

const B2Group = ({ title, children, action }) => (
  <div className="px-3.5 py-3 border-b border-[#F1F5F9]">
    {title && (
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8]">{title}</span>
        {action}
      </div>
    )}
    <div className="space-y-2.5">{children}</div>
  </div>
);

window.ScreenB2Filter = function () {
  const attrs = B2_ATTRS(), tagMaster = B2_TAGS();
  const [wards, setWards] = React.useState([L("文京区","Bunkyo"), L("武蔵野市","Musashino")]);
  const [stations, setStations] = React.useState([L("本郷三丁目","Hongo-sanchome")]);
  const [walk, setWalk] = React.useState(10);
  const [layouts, setLayouts] = React.useState(["1LDK", "2LDK"]);
  const [attrSel, setAttrSel] = React.useState([L("ペット可","Pets OK")]);
  const [tagSel, setTagSel] = React.useState(["ZOOM RENT"]);
  const [tagQ, setTagQ] = React.useState("");
  const [companies, setCompanies] = React.useState([L("株式会社LENZ DX","LENZ DX Co.")]);
  const [posted, setPosted] = React.useState(L("1週間以内","Within a week"));
  const [genkyo, setGenkyo] = React.useState(L("即入居可","Move-in ready"));
  const [equipOpen, setEquipOpen] = React.useState(true);
  const [equip, setEquip] = React.useState([L("オートロック","Auto-lock"), L("宅配ボックス","Parcel box")]);
  const [areaUnit, setAreaUnit] = React.useState("sqm");
  const [grid, setGrid] = React.useState(true);
  const [fav, setFav] = React.useState([0]);
  const [cmp, setCmp] = React.useState([]);

  const tog = (set, val) => set(v => v.indexOf(val) >= 0 ? v.filter(x => x !== val) : v.concat([val]));
  const tagHits = tagMaster.filter(t => tagSel.indexOf(t) < 0 && (tagQ === "" || t.toLowerCase().indexOf(tagQ.toLowerCase()) >= 0));

  return (
    <BrokerShell active="search"
      crumbs={[L("物件検索","Search"), L("条件検索","Filters")]}
      title={L("物件検索","Property search")}
      subtitle={L("127件 · 保存した検索条件 3件","127 results · 3 saved searches")}
      actions={
        <div className="flex items-center bg-white border border-[#E5E7EB] rounded-md p-[2px]">
          <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded text-[12.5px] bg-[#0F172A] text-white"><Icon.Search s={13} stroke="#fff"/>{L("条件検索","Filters")}</span>
          <a href="03-search-map.html" className="inline-flex items-center gap-1.5 h-7 px-3 rounded text-[12.5px] text-[#475569] hover:bg-[#F7F8FA]"><Icon.Map s={13} stroke="#475569"/>{L("地図検索","Map")}</a>
        </div>
      }>

      <div className="grid gap-4 items-start" style={{ gridTemplateColumns: "minmax(260px,320px) minmax(360px,1fr)" }}>

        {/* ══ filter rail ══ */}
        <div className="self-start sticky top-4">
          <Card className="overflow-hidden">
            <div className="px-3.5 py-2.5 bg-[#F8FAFC] border-b border-[#E5E7EB] flex items-center gap-2">
              <Icon.Filter s={13} stroke="#0F172A"/>
              <span className="text-[12.5px] font-semibold text-[#0F172A]">{L("検索条件","Filters")}</span>
              <span className="ml-auto text-[10.5px] text-[#94A3B8] tabnum">{L("8条件","8 active")}</span>
            </div>

            <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
              <B2Group title={L("エリア","Area")}>
                <Field label={L("都道府県","Prefecture")}><Select value={L("東京都","Tokyo")}/></Field>
                <B2Chips label={L("市区町村","City / ward")} options={[L("文京区","Bunkyo"), L("武蔵野市","Musashino"), L("中野区","Nakano"), L("港区","Minato"), L("世田谷区","Setagaya"), L("品川区","Shinagawa")]}
                  value={wards} onToggle={v => tog(setWards, v)}/>
              </B2Group>

              <B2Group title={L("沿線・駅","Line & station")}>
                <Field label={L("路線","Line")}><Select value={L("東京メトロ丸ノ内線","Tokyo Metro Marunouchi")}/></Field>
                <B2Chips label={L("駅","Station")} options={[L("本郷三丁目","Hongo-sanchome"), L("後楽園","Korakuen"), L("池袋","Ikebukuro"), L("吉祥寺","Kichijoji")]}
                  value={stations} onToggle={v => tog(setStations, v)}/>
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[11.5px] font-semibold text-[#0F172A]">{L("徒歩","Walking time")}</span>
                    <span className="text-[11px] text-[#475569] tabnum">{L(`${walk}分以内`, `within ${walk} min`)}</span>
                  </div>
                  <input type="range" min="1" max="20" value={walk} onChange={e => setWalk(Number(e.target.value))} className="w-full accent-[#0F172A]"/>
                </div>
              </B2Group>

              <B2Group title={L("賃料","Rent")}>
                <div className="flex items-center gap-1.5">
                  <Input value="50,000" prefix="¥"/>
                  <span className="text-[#94A3B8] shrink-0">〜</span>
                  <Input value="150,000" prefix="¥"/>
                </div>
                <input type="range" min="0" max="100" defaultValue="45" className="w-full accent-[#0F172A]"/>
                <div className="flex items-center gap-2 flex-wrap">
                  <label className="flex items-center gap-1.5 text-[11.5px] text-[#475569] cursor-pointer">
                    <span className="w-4 h-4 rounded bg-[#0F172A] flex items-center justify-center"><Icon.Check s={10} stroke="#fff"/></span>
                    {L("管理費込","Incl. mgmt fee")}
                  </label>
                  {[L("敷金なし","No deposit"), L("礼金なし","No key money")].map((o, i) => (
                    <span key={i} className="px-2 py-[3px] rounded-full border border-[#E5E7EB] text-[11px] text-[#475569] cursor-pointer hover:border-[#CBD5E1]">{o}</span>
                  ))}
                </div>
              </B2Group>

              <B2Group title={L("間取り","Layout")}>
                <B2Chips label={L("タイプ","Type")} options={["1R", "1K", "1DK", "1LDK", "2K", "2LDK", "3LDK", "4LDK+"]}
                  value={layouts} onToggle={v => tog(setLayouts, v)}/>
              </B2Group>

              <B2Group title={L("面積・築年数","Area & age")}>
                <div>
                  <div className="flex items-center gap-1.5">
                    <Input value="25"/>
                    <span className="text-[#94A3B8] shrink-0">〜</span>
                    <Input value="70"/>
                    <div className="flex items-center bg-white border border-[#CBD5E1] rounded-md p-[2px] shrink-0">
                      <button onClick={() => setAreaUnit("sqm")} className={`px-2 py-1 rounded text-[10.5px] ${areaUnit === "sqm" ? "bg-[#0F172A] text-white" : "text-[#475569]"}`}>㎡</button>
                      <button onClick={() => setAreaUnit("tsubo")} className={`px-2 py-1 rounded text-[10.5px] ${areaUnit === "tsubo" ? "bg-[#0F172A] text-white" : "text-[#475569]"}`}>{L("坪","tsubo")}</button>
                    </div>
                  </div>
                </div>
                <Field label={L("築年数","Building age")}><Select value={L("10年以内","Within 10 years")}/></Field>
              </B2Group>

              <B2Group title={L("現況","Availability")}>
                <div className="flex flex-wrap gap-1">
                  {[L("即入居可","Move-in ready"), L("空室","Vacant"), L("退去予定","Move-out due"), L("すべて","All")].map((o, i) => (
                    <button key={i} onClick={() => setGenkyo(o)}
                      className={`px-2 py-[4px] rounded-full border text-[11px] ${o === genkyo ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white border-[#E5E7EB] text-[#475569]"}`}>{o}</button>
                  ))}
                </div>
              </B2Group>

              <div className="px-3.5 py-3 border-b border-[#F1F5F9]">
                <button onClick={() => setEquipOpen(o => !o)} className="w-full flex items-center gap-1.5 mb-2">
                  {equipOpen ? <Icon.ChevronDown s={12} stroke="#475569"/> : <Icon.ChevronRight s={12} stroke="#475569"/>}
                  <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8]">{L("設備","Equipment")}</span>
                  <span className="ml-auto text-[10.5px] text-[#94A3B8] tabnum">{equip.length}</span>
                </button>
                {equipOpen && (
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {[L("オートロック","Auto-lock"), L("ペット可","Pets OK"), L("駐車場","Parking"), L("宅配ボックス","Parcel box"),
                      L("バス・トイレ別","Separate bath/WC"), L("追い焚き","Reheating bath"), L("浴室乾燥機","Bath dryer"), L("室内洗濯機置場","Indoor laundry"),
                      L("エレベーター","Elevator"), L("2階以上","2F or above")].map((o, i) => {
                      const on = equip.indexOf(o) >= 0;
                      return (
                        <label key={i} onClick={() => tog(setEquip, o)} className="flex items-center gap-1.5 text-[11px] text-[#475569] cursor-pointer py-[2px]">
                          <span className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${on ? "bg-[#0F172A]" : "border border-[#CBD5E1]"}`}>
                            {on && <Icon.Check s={9} stroke="#fff"/>}
                          </span>
                          <span className="truncate">{o}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* B-1 — company-defined 募集項目 */}
              <B2Group title={L("募集項目","Listing attributes")}>
                <B2Chips label={L("条件","Attributes")} sub={L("管理会社が設定（M17）","set by the management company")}
                  options={attrs} value={attrSel} onToggle={v => tog(setAttrSel, v)}/>
              </B2Group>

              {/* M-16 — free-tag search */}
              <B2Group title={L("タグ","Tags")}>
                <div>
                  <div className="flex items-center bg-white border border-[#CBD5E1] rounded-md h-8 px-2.5 focus-within:border-[#0F172A]">
                    <Icon.Tag s={12} stroke="#94A3B8"/>
                    <input value={tagQ} onChange={e => setTagQ(e.target.value)} placeholder={L("タグ名で検索（例: ZOOM RENT）","Search tags (e.g. ZOOM RENT)")}
                      className="bg-transparent outline-none text-[11.5px] flex-1 min-w-0 ml-1.5 text-[#0F172A] placeholder:text-[#94A3B8]"/>
                  </div>
                  {tagSel.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tagSel.map(t => (
                        <span key={t} className="inline-flex items-center gap-1 pl-2 pr-1 py-[3px] rounded-full bg-[#0F172A] text-white text-[11px]">
                          {t}<button onClick={() => tog(setTagSel, t)} className="opacity-60 hover:opacity-100"><Icon.X s={10} stroke="#fff"/></button>
                        </span>
                      ))}
                    </div>
                  )}
                  {tagHits.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {tagHits.map(t => (
                        <button key={t} onClick={() => { tog(setTagSel, t); setTagQ(""); }}
                          className="inline-flex items-center gap-1 px-2 py-[3px] rounded-full border border-dashed border-[#CBD5E1] text-[11px] text-[#475569] hover:border-[#0F172A] hover:text-[#0F172A]">
                          <Icon.Plus s={9}/>{t}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="text-[10px] text-[#94A3B8] mt-1.5">{L("タグは管理会社側で自由に作成されます","Tags are created freely on the management side")}</div>
                </div>
              </B2Group>

              <B2Group title={L("管理会社・掲載日","Company & posted")}>
                <B2Chips label={L("管理会社","Management company")}
                  options={[L("株式会社LENZ DX","LENZ DX Co."), L("青葉管理サービス","Aoba Management"), L("グリーン住宅管理","Green Housing"), L("三田管理","Mita Management")]}
                  value={companies} onToggle={v => tog(setCompanies, v)}/>
                <div>
                  <div className="text-[11.5px] font-semibold text-[#0F172A] mb-1">{L("掲載日","Posted")}</div>
                  <div className="flex flex-wrap gap-1">
                    {[L("1日以内","Within a day"), L("1週間以内","Within a week"), L("1ヶ月以内","Within a month")].map((o, i) => (
                      <button key={i} onClick={() => setPosted(o)}
                        className={`px-2 py-[4px] rounded-full border text-[11px] ${o === posted ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white border-[#E5E7EB] text-[#475569]"}`}>{o}</button>
                    ))}
                  </div>
                </div>
              </B2Group>
            </div>

            <div className="px-3.5 py-3 bg-[#F8FAFC] border-t border-[#E5E7EB] flex items-center gap-2">
              <Btn kind="ghost" size="sm" icon={Icon.Save}>{L("検索条件を保存","Save search")}</Btn>
              <Btn kind="link" size="sm">{L("リセット","Reset")}</Btn>
            </div>
          </Card>
          <div className="text-[10.5px] text-[#94A3B8] mt-2 px-1 leading-snug">
            {L("タブレットでは検索条件はボトムシートに格納されます","On tablet the filters collapse into a bottom sheet")}
          </div>
        </div>

        {/* ══ results ══ */}
        <div className="min-w-0 space-y-3">
          <Card className="px-3.5 py-2.5 flex items-center gap-3 flex-wrap">
            <span className="text-[13px] text-[#0F172A]">
              <b className="text-[16px] tabnum">127</b> {L("件の物件が見つかりました","properties found")}
            </span>
            <label className="flex items-center gap-1.5 text-[11.5px] text-[#475569] cursor-pointer">
              <span className="w-4 h-4 rounded border border-[#CBD5E1]"/>{L("内見可のみ表示","Viewable only")}
            </label>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-[150px]"><Select value={L("新着順","Newest first")}/></div>
              <div className="flex items-center bg-white border border-[#E5E7EB] rounded-md p-[2px]">
                <button onClick={() => setGrid(true)} className={`w-7 h-7 rounded flex items-center justify-center ${grid ? "bg-[#0F172A]" : ""}`}><Icon.Grid s={13} stroke={grid ? "#fff" : "#475569"}/></button>
                <button onClick={() => setGrid(false)} className={`w-7 h-7 rounded flex items-center justify-center ${!grid ? "bg-[#0F172A]" : ""}`}><Icon.List s={13} stroke={!grid ? "#fff" : "#475569"}/></button>
              </div>
            </div>
          </Card>

          {grid ? (
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
              {B2_CARDS().map(([name, rent, fee, layout, area, station, company, chips, kind], i) => (
                <Card key={i} className="overflow-hidden flex flex-col">
                  <div className="relative">
                    <PhotoPh h={112} tone={i} kind={kind}/>
                    <button onClick={() => tog(setFav, i)}
                      className={`absolute top-1.5 right-1.5 w-7 h-7 rounded-full flex items-center justify-center ${fav.indexOf(i) >= 0 ? "bg-[#F59E0B]" : "bg-white/90"}`}>
                      <Icon.Star s={13} stroke={fav.indexOf(i) >= 0 ? "#fff" : "#475569"}/>
                    </button>
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <div className="text-[12.5px] font-semibold text-[#0F172A] leading-snug">{name}</div>
                    <div className="mt-1.5 flex items-baseline gap-1.5">
                      <span className="text-[15px] font-bold text-[#0F172A] tabnum">¥{rent}</span>
                      <span className="text-[10.5px] text-[#64748B] tabnum">{L(`管理費 ¥${fee}`, `+¥${fee} fee`)}</span>
                    </div>
                    <div className="text-[11.5px] text-[#475569] tabnum mt-1">{layout} · {area}㎡</div>
                    <div className="text-[11px] text-[#64748B] mt-0.5 leading-snug">{station}</div>
                    <div className="text-[10.5px] text-[#94A3B8] mt-1">{company}</div>
                    <div className="flex items-center gap-1 mt-2">
                      {chips.indexOf("view") >= 0 && <Tag tone="ok" size="sm">{L("内見可","Viewable")}</Tag>}
                      {chips.indexOf("apply") >= 0 && <Tag tone="neutral" size="sm">{L("申込可","Applicable")}</Tag>}
                    </div>
                    <div className="flex items-center gap-1 mt-2.5 pt-2.5 border-t border-[#F1F5F9]">
                      <button onClick={() => tog(setCmp, i)}
                        className={`h-6 px-2 rounded border text-[10.5px] inline-flex items-center gap-1 ${cmp.indexOf(i) >= 0 ? "bg-[#0F172A] text-white border-[#0F172A]" : "border-[#E5E7EB] text-[#475569] hover:bg-[#F1F5F9]"}`}>
                        <Icon.Chart s={10} stroke={cmp.indexOf(i) >= 0 ? "#fff" : "#475569"}/>{L("比較","Compare")}
                      </button>
                      <a href="05-property-detail.html" className="ml-auto h-6 px-2.5 rounded bg-[#0F172A] text-white text-[10.5px] inline-flex items-center">{L("詳細","Detail")}</a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="overflow-x-auto"><div className="divide-y divide-[#F1F5F9] min-w-[560px]">
              {B2_CARDS().map(([name, rent, fee, layout, area, station, company, chips, kind], i) => (
                <div key={i} className="p-3 flex items-center gap-3">
                  <PhotoPh w={104} h={72} tone={i} kind={kind}/>
                  <div className="flex-1" style={{ minWidth: 180 }}>
                    <div className="text-[12.5px] font-semibold text-[#0F172A]">{name}</div>
                    <div className="text-[11.5px] text-[#475569] tabnum">{layout} · {area}㎡ · {station}</div>
                    <div className="text-[10.5px] text-[#94A3B8]">{company}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[15px] font-bold text-[#0F172A] tabnum">¥{rent}</div>
                    <div className="text-[10.5px] text-[#64748B] tabnum">{L(`管理費 ¥${fee}`, `+¥${fee}`)}</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {chips.indexOf("view") >= 0 && <Tag tone="ok" size="sm">{L("内見可","Viewable")}</Tag>}
                    <a href="05-property-detail.html" className="h-6 px-2.5 rounded bg-[#0F172A] text-white text-[10.5px] inline-flex items-center">{L("詳細","Detail")}</a>
                  </div>
                </div>
              ))}
            </div></Card>
          )}

          {cmp.length > 0 && (
            <div className="fixed bottom-0 left-[240px] right-0 z-30 bg-[#0F172A] text-white px-6 h-[52px] flex items-center gap-3">
              <span className="text-[12.5px] font-semibold tabnum">{L(`${cmp.length}件を比較リストに追加`, `${cmp.length} in compare list`)}</span>
              <button onClick={() => setCmp([])} className="text-[11px] text-white/60 hover:text-white underline whitespace-nowrap">{L("クリア","Clear")}</button>
              <button className="ml-auto h-8 px-3.5 rounded-md text-[12.5px] font-semibold bg-[#F59E0B] text-[#0F172A]">{L("比較する","Compare")}</button>
            </div>
          )}
        </div>
      </div>
    </BrokerShell>
  );
};
