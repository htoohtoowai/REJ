// _shared/screens/management-2-m8.jsx — M8 物件編集 画像 (rebuilt 2026-08-20)
// Chrome from property-editor-shell.jsx.
// Delivers: M-20 媒体別写真ルール strip (M17-driven, amber chip when unmet, ＋枠を追加 tile) ·
// M-22 SUUMO・HOME'S 基準スコア card as a SEPARATE card in the notice stack (un-cleared +
// cleared states both visible). The 36点/40点 score widget layout is unchanged.

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, PhotoPh } = window;
const { PropEditorShell, PECheck } = window;
const L = window.L;

const M8_MEDIA = ["ES", "B", "B2B", L("レ","RZ"), "s.suumo", "at", "s", "g", "AOS", L("独自1","Own1"), L("独自2","Own2")];

const M8MediaChips = ({ on }) => (
  <div className="flex items-center gap-[3px] flex-wrap">
    {M8_MEDIA.slice(0, 6).map((m, i) => (
      <span key={i} className={`h-[17px] px-1.5 rounded text-[9.5px] font-bold flex items-center border cursor-pointer ${
        on[i] ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-[#F8FAFC] text-[#CBD5E1] border-[#F1F5F9]"}`}>{m}</span>
    ))}
  </div>
);

window.ScreenM8Images = function () {
  const [auto, setAuto] = React.useState(true);
  const [mode, setMode] = React.useState("category");
  const [drag, setDrag] = React.useState(false);

  const base = [
    [L("外観","Exterior"), "exterior"], [L("間取り","Floorplan"), "floorplan"], [L("玄関","Entrance"), "room"],
    [L("リビング","Living"), "room"], [L("キッチン","Kitchen"), "room"], [L("ベッドルーム","Bedroom"), "room"],
    [L("風呂","Bath"), "room"], [L("ベランダ","Balcony"), null], [L("トイレ","WC"), null], [L("洗面","Washroom"), null],
  ];
  const core = [L("間取り","Floorplan"), L("外観","Exterior"), L("リビング","Living"), L("キッチン","Kitchen"), L("風呂","Bath")];
  const extra = [
    [L("エントランス","Entrance hall"), true], [L("ロビー","Lobby"), true], [L("駐車場","Parking"), true],
    [L("その他共有部分","Other common"), false], [L("その他部屋・スペース","Other rooms"), false], [L("トイレ","WC"), true],
    [L("洗面所","Washroom"), true], [L("収納","Storage"), false], [L("ベランダ","Balcony"), true],
    [L("庭","Garden"), false], [L("玄関","Entrance"), true], [L("セキュリティ","Security"), false],
    [L("その他設備","Other equipment"), false], [L("眺望","View"), false], [L("その他","Other"), false],
  ];

  const rules = [
    ["SUUMO",                      L("最大30枚・間取り必須","max 30 · floorplan required"), null],
    [L("アットホーム","at home"),   L("最大20枚","max 20"), L("必須カテゴリ不足（間取り）","missing required category (floorplan)")],
    ["HOME'S",                     L("最大15枚・周辺画像1枚必須","max 15 · 1 neighbourhood photo required"), L("周辺画像なし","no neighbourhood photo")],
    [L("レインズ","REINS"),         L("最大10枚","max 10"), null],
    [L("業者間（B2B）","B2B"),      L("上限なし","no limit"), null],
  ];

  const bldg = [
    [L("エントランス","Entrance hall"), L("オートロックのエントランス","Auto-lock entrance"), [1,1,1,1,1,0]],
    [L("駐車場","Parking"), L("敷地内平置き駐車場","On-site parking"), [1,1,1,0,0,0]],
    [L("外観","Exterior"), L("南東から見た外観","Exterior from the south-east"), [1,1,1,1,1,1]],
    [L("共用廊下","Common corridor"), L("内廊下・防犯カメラ付","Internal corridor with CCTV"), [1,1,0,0,1,0]],
  ];
  const roomsImgs = [
    [L("リビング","Living"), L("明るい南向きリビング","Bright south-facing living room"), [1,1,1,1,1,1]],
    [L("キッチン","Kitchen"), L("食洗機付システムキッチン","Fitted kitchen with dishwasher"), [1,1,1,1,1,0]],
    [L("寝室","Bedroom"), L("洋室7.0畳","Western room 7.0 jo"), [1,1,1,0,1,0]],
    [L("浴室","Bath"), L("浴室乾燥機・追焚付","Bath dryer and reheating"), [1,1,0,0,1,0]],
  ];

  const ImgRow = ({ items }) => (
    <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))" }}>
      {items.map(([cat, caption, media], i) => (
        <div key={i} className="rounded-md border border-[#E5E7EB]">
          <div className="relative overflow-hidden rounded-t-md">
            <PhotoPh h={120} tone={i + 1} kind={cat === L("外観","Exterior") ? "exterior" : "room"}/>
            <div className="absolute top-1.5 right-1.5 flex items-center gap-1">
              <button className="w-6 h-6 rounded bg-white/90 flex items-center justify-center text-[#475569] hover:text-[#0F172A]"><Icon.Search s={12}/></button>
              <button className="w-6 h-6 rounded bg-white/90 flex items-center justify-center text-[#475569] hover:text-[#DC2626]"><Icon.Trash s={12}/></button>
            </div>
          </div>
          <div className="p-2 space-y-1.5">
            <Select value={cat}/>
            <Input value={caption} placeholder={L("見出し","Caption")}/>
            <M8MediaChips on={media}/>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <PropEditorShell active={6}>
      <div className="grid gap-4 pb-40" style={{ gridTemplateColumns: "minmax(320px,1fr) minmax(240px,320px)" }}>

        {/* ══ MAIN CANVAS ══ */}
        <div className="space-y-4 min-w-0">

          {/* notice stack */}
          <Card>
            <div className="p-3 flex items-center gap-3 flex-wrap border-b border-[#F1F5F9]">
              <PECheck on={auto} onChange={() => setAuto(v => !v)} label={L("自動生成（媒体別の画像を既存枠から生成）","Auto-generate per-site renders from existing slots")}/>
              <div className="ml-auto flex items-center gap-2">
                <Btn kind="ghost" size="sm" icon={Icon.Grid} onClick={() => setMode(m => m === "category" ? "free" : "category")}>
                  {L("編集モード変更","Change edit mode")}
                  <span className="ml-1 text-[10.5px] text-[#94A3B8]">{mode === "category" ? L("カテゴリ別","By category") : L("フリーレイアウト","Free layout")}</span>
                </Btn>
                <Btn kind="primary" size="sm" icon={Icon.Upload}>{L("画像登録","Upload images")}</Btn>
              </div>
            </div>

            {/* media targeting legend */}
            <div className="px-3 py-2.5 flex items-center gap-2 flex-wrap border-b border-[#F1F5F9]">
              <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8]">{L("媒体ターゲット","Media targets")}</span>
              {M8_MEDIA.map((m, i) => (
                <span key={i} className="h-[18px] px-1.5 rounded text-[9.5px] font-bold flex items-center bg-[#F1F5F9] text-[#475569] border border-[#E5E7EB]">{m}</span>
              ))}
            </div>

            {/* M-20 媒体別写真ルール (from the M17 master) */}
            <div className="px-3 py-2.5 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8]">{L("媒体別写真ルール","Per-site photo rules")}</span>
                <a href="17-master-data.html" className="text-[10.5px] font-semibold text-[#0F172A] hover:underline">{L("ルールを編集（M17）→","Edit rules (M17) →")}</a>
              </div>
              <div className="space-y-1">
                {rules.map(([site, rule, warn], i) => (
                  <div key={i} className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-[110px] shrink-0 font-semibold text-[#0F172A]">{site}</span>
                    <span className="text-[#64748B]">{rule}</span>
                    {warn && <Tag tone="warn" size="sm"><Icon.Alert s={10}/>{warn}</Tag>}
                  </div>
                ))}
              </div>
              <div className="text-[10.5px] text-[#94A3B8] mt-1.5">
                {L("カテゴリの枠数は固定ではありません。マスタの上限まで「＋枠を追加」で増やせます。",
                   "Slot counts per category are not fixed — add slots up to the master's ceiling with ＋枠を追加.")}
              </div>
            </div>

            {/* 36点 advisory (unchanged) */}
            <div className="px-3 py-2.5 bg-[#FEF3C7] border-b border-[#FDE68A] text-[12px] text-[#92400E] flex items-center gap-2">
              <Icon.Alert s={13} stroke="#92400E"/>
              {L("計36点以上になるように、画像を添付してください。","Attach images so the total reaches at least 36 points.")}
            </div>

            {/* M-22 — separate 媒体別 基準スコア card content */}
            <div className="p-3">
              <div className="rounded-md border border-[#E5E7EB] overflow-hidden">
                <div className="px-3 py-2 bg-[#F8FAFC] border-b border-[#E5E7EB] flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-[#0F172A]">{L("媒体別 基準スコア","Per-site standard score")}</span>
                  <span className="text-[10.5px] text-[#94A3B8]">{L("2026/08/03 受領の基準表","From the standards table received 2026/08/03")}</span>
                </div>

                <div className="px-3 py-2.5 border-b border-[#F1F5F9]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[12px] font-semibold text-[#0F172A] w-[70px]">SUUMO</span>
                    <span className="text-[13px] font-bold tabnum text-[#B45309]">31 / 34 {L("点","pts")}</span>
                    <span className="ml-auto text-[11px] text-[#B45309]">{L("不足: その他画像3点・周辺画像1点","Short by: 3 other-photo pts, 1 neighbourhood pt")}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#F1F5F9] mt-1.5 overflow-hidden">
                    <div className="h-full rounded-full bg-[#F59E0B]" style={{ width: (31 / 34 * 100) + "%" }}/>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <Tag tone="ok" size="sm"><Icon.Check s={10}/>{L("基本5カテゴリ 25/25","Core 5 categories 25/25")}</Tag>
                    <Tag tone="neutral" size="sm">{L("その他画像 6/9","Other photos 6/9")}</Tag>
                    <Tag tone="neutral" size="sm">{L("周辺画像 0/1","Neighbourhood 0/1")}</Tag>
                  </div>
                </div>

                <div className="px-3 py-2.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[12px] font-semibold text-[#0F172A] w-[70px]">HOME'S</span>
                    <span className="text-[13px] font-bold tabnum text-[#15803D]">13 / 15 {L("枚","photos")}</span>
                    <span className="ml-auto"><Tag tone="ok" size="md"><Icon.CheckCircle s={11}/>{L("クリア","Cleared")}</Tag></span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#F1F5F9] mt-1.5 overflow-hidden">
                    <div className="h-full rounded-full bg-[#16A34A]" style={{ width: (13 / 15 * 100) + "%" }}/>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <Tag tone="ok" size="sm"><Icon.Check s={10}/>{L("基本 5枚（最大9）","Core 5 (max 9)")}</Tag>
                    <Tag tone="ok" size="sm"><Icon.Check s={10}/>{L("その他 1枚（最大1）","Other 1 (max 1)")}</Tag>
                    <Tag tone="neutral" size="sm">{L("周辺 0枚（1枚必要）","Neighbourhood 0 (1 required)")}</Tag>
                  </div>
                </div>

                <div className="px-3 py-2 border-t border-[#F1F5F9] bg-[#F8FAFC]">
                  <a href="17-master-data.html" className="text-[11px] font-semibold text-[#0F172A] hover:underline">
                    {L("カテゴリ対応表を見る（ES / SUUMO / HOME'S）→","See the category mapping (ES / SUUMO / HOME'S) →")}
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* 基本画像 grid */}
          <Card>
            <CardHead title={L("基本画像","Base images")} sub={L("カテゴリ別（5×2）","By category (5×2)")}
              action={<span className="text-[11px] text-[#94A3B8] tabnum">{L("7 / 10 枠","7 of 10 slots")}</span>}/>
            <div className="p-4 grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(88px,1fr))" }}>
              {base.map(([label, kind], i) => (
                <div key={i} className="group">
                  <div className="relative rounded-md overflow-hidden border border-[#E5E7EB]">
                    {kind ? <PhotoPh h={96} tone={i} kind={kind}/> : (
                      <div className="h-[96px] flex flex-col items-center justify-center bg-[#F8FAFC] opacity-70">
                        <Icon.Plus s={16} stroke="#CBD5E1"/>
                        <span className="text-[10px] text-[#CBD5E1] mt-1">NO IMAGE</span>
                      </div>
                    )}
                    {kind && (
                      <div className="absolute inset-0 bg-[#0F172A]/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {[Icon.Edit, Icon.MoreV, Icon.Trash].map((Ico, k) => (
                          <button key={k} className="w-7 h-7 rounded bg-white/90 flex items-center justify-center text-[#0F172A]"><Ico s={13}/></button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] text-[#475569] mt-1 flex items-center gap-1">
                    {label}{!kind && <span className="text-[10px] text-[#CBD5E1]">{L("未登録","empty")}</span>}
                  </div>
                  {/* M-20 — category slots are expandable up to the master ceiling */}
                  {label === L("リビング","Living") && (
                    <button className="mt-1.5 w-full h-[26px] px-1 rounded border border-dashed border-[#CBD5E1] text-[10.5px] text-[#475569] hover:border-[#0F172A] hover:text-[#0F172A] flex items-center justify-center gap-1 whitespace-nowrap overflow-hidden">
                      <Icon.Plus s={10}/>{L("枠を追加","Add slot")}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* 追加画像 (建物・土地) */}
          <Card>
            <CardHead title={L("追加画像（建物・土地）","Additional images (building & land)")} sub={L("媒体ごとの掲載可否をチップで指定","Chips choose which media each image goes to")}/>
            <div className="p-4">
              <div onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={() => setDrag(false)}
                className={`h-[76px] rounded-md flex flex-col items-center justify-center mb-3 ${drag
                  ? "border-2 border-solid border-[#0F172A] bg-[#F1F5F9]"
                  : "border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC]"}`}>
                <Icon.Upload s={16} stroke={drag ? "#0F172A" : "#94A3B8"}/>
                <span className={`text-[11.5px] mt-1 ${drag ? "text-[#0F172A] font-semibold" : "text-[#94A3B8]"}`}>
                  {L("ここに画像をドラッグ＆ドロップ","Drag and drop images here")}
                </span>
              </div>
              <ImgRow items={bldg}/>
            </div>
          </Card>

          {/* 追加画像 (部屋) */}
          <Card>
            <CardHead title={L("追加画像（部屋）","Additional images (room)")} sub={L("701号室に紐づく画像","Images attached to room 701")}/>
            <div className="p-4">
              <div className="h-[76px] rounded-md border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] flex flex-col items-center justify-center mb-3">
                <Icon.Upload s={16} stroke="#94A3B8"/>
                <span className="text-[11.5px] text-[#94A3B8] mt-1">{L("ここに画像をドラッグ＆ドロップ","Drag and drop images here")}</span>
              </div>
              <ImgRow items={roomsImgs}/>
            </div>
          </Card>
        </div>

        {/* ══ RIGHT RAIL — score widget (unchanged) ══ */}
        <div className="space-y-3 self-start sticky top-4">
          <Card className="overflow-hidden">
            <div className="px-4 py-3.5" style={{ background: "linear-gradient(180deg,#DCFCE7 0%,#F0FDF4 100%)", borderBottom: "1px solid #BBF7D0" }}>
              <div className="flex items-center gap-2.5">
                <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#16A34A] shrink-0">
                  <span className="absolute inset-0 rounded-full bg-[#16A34A] opacity-30 animate-ping"/>
                  <Icon.Check s={18} stroke="#fff"/>
                </span>
                <div>
                  <div className="text-[17px] font-bold text-[#15803D] tabnum leading-none">40 {L("点","pts")}</div>
                  <div className="text-[12px] font-semibold text-[#15803D] mt-1">{L("基準スコア クリア！","Standard score cleared!")}</div>
                </div>
              </div>
              <div className="text-[11px] text-[#15803D]/80 mt-2">{L("計36点以上の画像を添付してください","Attach images totalling at least 36 points")}</div>
            </div>

            <div className="p-4 space-y-3.5">
              <div>
                <div className="text-[11px] font-semibold text-[#475569] mb-1.5">{L("①写真","① Photos")}</div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-[11.5px] text-[#475569]">{L("5カテゴリ","Core 5 categories")}</span>
                  <span className="text-[12px] font-bold tabnum text-[#15803D]">25 / 25 {L("点","pts")}</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {core.map((c, i) => (
                    <div key={i}>
                      <div className="relative rounded overflow-hidden border border-[#BBF7D0]">
                        <PhotoPh h={34} tone={i} kind={i === 0 ? "floorplan" : i === 1 ? "exterior" : "room"}/>
                        <span className="absolute top-[2px] right-[2px] w-3.5 h-3.5 rounded-full bg-[#16A34A] flex items-center justify-center"><Icon.Check s={8} stroke="#fff"/></span>
                      </div>
                      <div className="text-[9px] text-[#475569] mt-[2px] text-center truncate">{c}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#F1F5F9]">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-[11.5px] text-[#475569]">{L("5カテゴリ以外の物件画像","Other property images")}</span>
                  <span className="text-[12px] font-bold tabnum text-[#15803D]">15 / 15 {L("点","pts")}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {extra.map(([label, on], i) => (
                    <span key={i} className={`inline-flex items-center gap-1 px-1.5 py-[2px] rounded text-[10.5px] border ${
                      on ? "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]" : "bg-white text-[#94A3B8] border-[#E5E7EB]"}`}>
                      {on && <Icon.Check s={9} stroke="#15803D"/>}{label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          <div className="text-[11px] text-[#94A3B8] px-1 leading-snug">
            {L("↑ 計36点以上になるように、画像を添付してください。","↑ Attach images so the total reaches at least 36 points.")}
          </div>
        </div>
      </div>
    </PropEditorShell>
  );
};
