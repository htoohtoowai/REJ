// _shared/screens/broker-1.jsx — B1 Home, B2 Filter, B3 Map, B4 Results, B5 Property detail

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, Stat, Tabs, MapPlaceholder, PhotoPh, Avatar, AppShell } = window;
const L = window.L;

// Broker shell — forces role="broker" so the chrome (sidebar + top-bar + role badge)
// reflects the broker IA (FIX-S1). Verified against live いい生活Square.
const BrokerShell = (props) => <AppShell role="broker" {...props}/>;

// ══════════════════════════════ B1 — BROKER HOME ══════════════════════════════
// Structure verified against live LENZ DX dashboard (doc/broker-walkthrough Round 2):
// search shortcuts + ★新築★ cards + クローズアップ物件 cards + 最新ニュース rail + 営業時間.
// SPEC-STRICT: per B1 §8 the KPI strip, 顧客CRM activity panel, 本日の予定 and
// 追加情報待ち lists have been REMOVED — listed as 🔔 Proposed additions at the
// bottom of this function (NOT rendered).
window.ScreenB1Home = function () {
  return (
    <BrokerShell active=""
      crumbs={[L("ホーム","Home")]}
      title={L("おかえりなさい、中村さん","Welcome back, Nakamura-san")}
      subtitle={L("FINDERS 吉祥寺店","FINDERS Kichijoji")}
      actions={<>
        <Btn kind="ghost" icon={Icon.Map}>{L("地図で検索","Search on map")}</Btn>
        <Btn kind="accent" icon={Icon.Search}>{L("物件を探す →","Find property →")}</Btn>
      </>}>

      {/* Hero search — flex-wrap so the dark bar gracefully reflows when the
          preview width is below the meta-spec 1440 (e.g. 1160px iframe). */}
      <Card className="mb-5 overflow-hidden">
        <div className="p-5 flex flex-wrap gap-2 items-end"
             style={{ background: "linear-gradient(135deg,#0F172A 0%,#1F2937 100%)" }}>
          <div className="min-w-[220px]" style={{ flex: "1 1 220px" }}>
            <Field label={<span className="text-white/80 whitespace-nowrap">{L("エリア・路線・駅","Area / Line / Station")}</span>}>
              <Input value={L("文京区 + 武蔵野市 + 渋谷区","Bunkyo + Musashino + Shibuya")} prefix={<Icon.MapPin s={13}/>}/>
            </Field>
          </div>
          <div className="w-[110px]"><Field label={<span className="text-white/80 whitespace-nowrap">{L("間取り","Layout")}</span>}><Select value="1LDK+"/></Field></div>
          <div className="w-[130px]"><Field label={<span className="text-white/80 whitespace-nowrap">{L("家賃","Rent")}</span>}><Select value={L("〜¥250,000","≤¥250k")}/></Field></div>
          <div className="w-[110px]"><Field label={<span className="text-white/80 whitespace-nowrap">{L("築年数","Age")}</span>}><Select value={L("〜10年","≤10y")}/></Field></div>
          <div className="w-[100px]"><Field label={<span className="text-white/80 whitespace-nowrap">{L("駅徒歩","Walk")}</span>}><Select value={L("〜10分","≤10m")}/></Field></div>
          <Btn kind="accent" size="lg" icon={Icon.Search}>{L("検索","Search")}</Btn>
        </div>
        <div className="px-5 py-3 flex items-center gap-3 border-t border-[#F1F5F9] text-[12px] text-[#475569] flex-wrap">
          <span className="font-semibold whitespace-nowrap">{L("クイックフィルタ","Quick filters")}</span>
          {[
            L("ペット可","Pet OK"),
            L("駅徒歩5分以内","≤5min walk"),
            L("即入居可","Move-in ready"),
            L("礼金なし","No key money"),
            L("敷金なし","No deposit"),
          ].map((s, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] cursor-pointer whitespace-nowrap">{s}</span>
          ))}
        </div>
      </Card>

      {/* §10 evidence fold-in: 物件検索ショートカット — LENZ DX category shortcuts */}
      <Card className="mb-5">
        <CardHead title={L("物件検索ショートカット","Search by category")} sub={L("カテゴリから探す","Browse by category")}/>
        <div className="p-4 grid grid-cols-5 gap-2 text-[12.5px]">
          {[
            [Icon.Train,    L("沿線で探す","By line")],
            [Icon.MapPin,   L("エリアで探す","By area")],
            [Icon.Award,    L("ZOOMシリーズ","ZOOM series")],
            [Icon.Sparkle,  L("新着物件","New listings")],
            [Icon.Key,      L("即入居可","Move-in ready")],
            [Icon.Building, L("新築1棟図面","New build (whole)")],
            [Icon.Star,     L("築浅","Recent build")],
            [Icon.User,     L("担当者オススメ","Agent picks")],
            [Icon.Wallet,   L("駐車場あり","With parking")],
            [Icon.Smile,    L("ペット可","Pet OK")],
          ].map(([Ico, label], i) => (
            <button key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-[#E5E7EB] hover:bg-[#F7F8FA] text-left">
              <Ico s={15} stroke="#475569"/>
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-[1fr_360px] gap-5">
        {/* LEFT 2/3: クローズアップ物件 + ★新築★ cards (per §10 LENZ DX) */}
        <div className="space-y-5">
          <Card>
            <CardHead title={L("クローズアップ物件","Closeup listings")} action={<Btn kind="link" size="sm">{L("すべて →","See all →")}</Btn>}/>
            <div className="p-4 grid grid-cols-3 gap-3">
              {[
                ["ZOOM本郷 701",    "1LDK", "42.5㎡", "¥262,000", L("本郷三丁目 5分","Hongo-sanchome 5min"), 1],
                ["カーサ恵比寿 203", "1LDK", "38.8㎡", "¥218,000", L("恵比寿 7分","Ebisu 7min"),           2],
                ["青葉マンション 305","1LDK", "44.1㎡", "¥184,000", L("武蔵小山 4分","Musashi-koyama 4min"),3],
              ].map((c, i) => {
                const [n, lay, area, rent, stn, t] = c;
                return (
                  <div key={i} className="rounded-md border border-[#E5E7EB] overflow-hidden hover:shadow-md">
                    <div className="relative">
                      <PhotoPh h={130} kind="exterior" tone={t}/>
                      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center"><Icon.Heart s={14} stroke="#94A3B8"/></div>
                    </div>
                    <div className="p-3">
                      <div className="text-[12.5px] font-semibold truncate">{n}</div>
                      <div className="text-[11px] text-[#64748B]">{lay} · {area}</div>
                      <div className="text-[11px] text-[#475569] mt-[2px]">{stn}</div>
                      <div className="text-[14px] font-bold text-[#0F172A] mt-2 tabnum">{rent}</div>
                      {/* §10 LENZ DX: お申込みボタン on クローズアップ物件 cards */}
                      <Btn kind="accent" size="sm" full style={{ marginTop: 8 }} icon={Icon.FileText}>{L("お申込み","Apply")}</Btn>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* §10 fold-in: ★新築★建物カード row (LENZ DX) */}
          <Card>
            <CardHead title={L("★新築★建物カード","★ New-build listings")} action={<Btn kind="link" size="sm">{L("すべて →","See all →")}</Btn>}/>
            <div className="p-4 grid grid-cols-3 gap-3">
              {[
                [L("ザ・パーク本郷","The Park Hongo"),     "1LDK〜3LDK", L("2026年6月竣工","Jun 2026"), L("本郷三丁目 4分","Hongo-sanchome 4min"), 0],
                [L("ブリリア武蔵野","Brillia Musashino"), "1K〜2LDK",   L("2026年7月竣工","Jul 2026"), L("吉祥寺 6分","Kichijoji 6min"),         4],
                [L("プラウド白金","Proud Shirokane"),     "2LDK〜3LDK", L("2026年9月竣工","Sep 2026"), L("白金台 3分","Shirokane 3min"),         2],
              ].map(([n, lay, complete, stn, t], i) => (
                <div key={i} className="rounded-md border border-[#E5E7EB] overflow-hidden hover:shadow-md">
                  <div className="relative">
                    <PhotoPh h={120} kind="exterior" tone={t}/>
                    <div className="absolute top-2 left-2 px-2 py-[2px] bg-[#0F172A] text-white text-[10px] font-bold rounded">★ {L("新築","NEW")}</div>
                  </div>
                  <div className="p-3">
                    <div className="text-[12.5px] font-semibold truncate">{n}</div>
                    <div className="text-[10.5px] text-[#94A3B8]">{lay} · {stn}</div>
                    <div className="text-[11px] text-[#475569] mt-1">{complete}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT 1/3: 管理会社からのお知らせ (§8 ADD, §10 verified) + コスト計算機 + 営業時間 */}
        <div className="space-y-5">
          <Card>
            <CardHead title={L("管理会社からのお知らせ","Notices from mgmt cos.")} sub={L("最新ニュース","Latest news")}/>
            <div className="divide-y divide-[#F1F5F9]">
              {[
                [L("ZOOM吉祥寺 502","ZOOM Kichijoji 502"),
                 L("募集開始 — 1LDK / ¥218,000","Now listed — 1LDK / ¥218,000"),
                 L("株式会社 LENZ DX","LENZ DX Co."), "2h"],
                [L("青葉マンション 305","Aoba Mansion 305"),
                 L("内見受付時間を変更しました","Viewing hours updated"),
                 L("青葉不動産","Aoba Estate"), "5h"],
                [L("ZOOMシリーズ 春の特集","ZOOM Spring feature"),
                 L("敷金1ヶ月キャンペーン (5/31まで)","1mo deposit promo (until 5/31)"),
                 L("株式会社 LENZ DX","LENZ DX Co."), "1d"],
              ].map(([title, body, from, time], i) => (
                <div key={i} className="px-4 py-3 hover:bg-[#F7F8FA] cursor-pointer">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[12.5px] font-semibold truncate">{title}</span>
                    <span className="text-[10.5px] text-[#94A3B8] tabnum shrink-0">{time}</span>
                  </div>
                  <div className="text-[11.5px] text-[#475569] mt-[2px] leading-snug">{body}</div>
                  <div className="text-[10.5px] text-[#94A3B8] mt-1">{from}</div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-[#F1F5F9] text-center">
              <Btn kind="link" size="sm">{L("すべてのお知らせ →","See all notices →")}</Btn>
            </div>
          </Card>

          {/* コスト計算機 — kept (§8 lists this as acceptable as a Proposed shortcut) */}
          <Card>
            <CardHead title={L("コスト計算機","Cost calculator")} action={<Tag tone="outline">{L("ショートカット","Shortcut")}</Tag>}/>
            <div className="p-4 text-[12px] text-[#475569]">
              <p>{L("お客様の希望物件で初期費用を5秒で見積もり。共有用URLも自動生成。","Estimate move-in costs in 5 seconds, with a shareable URL for the customer.")}</p>
              <Btn kind="ghost" size="sm" full style={{ marginTop:10 }} icon={Icon.Wallet} iconRight={<Icon.ArrowRight s={11}/>}>{L("開く","Open")}</Btn>
            </div>
          </Card>

          {/* §10 fold-in: 営業時間 (LENZ DX) */}
          <Card>
            <CardHead title={L("営業時間","Business hours")} icon={Icon.Clock}/>
            <div className="p-4 text-[12.5px] text-[#475569] space-y-1.5">
              <div className="flex justify-between"><span>{L("平日","Weekdays")}</span><span className="tabnum">9:30 – 19:00</span></div>
              <div className="flex justify-between"><span>{L("土日祝","Weekends/Holidays")}</span><span className="tabnum">10:00 – 18:00</span></div>
              <div className="text-[10.5px] text-[#94A3B8] mt-2">{L("お問い合わせ: support@lenz-dx.jp","Contact: support@lenz-dx.jp")}</div>
            </div>
          </Card>
        </div>
      </div>

      {/*
        🔔 Proposed additions (NOT rendered) — pending customer approval per B1 §8:
          • KPI strip ×5 (お気に入り / 本日の内見 / 申込中 / 成約 / お客様)
              — design-system §0 bans mini-dashboard / KPI cards.
          • 本日の予定 list (today's schedule)
              — unspecced; activity feed pattern banned by design-system §0.
          • 追加情報待ち list (awaiting info)
              — unspecced; suggested-next-steps panel banned by design-system §0.
        Removed outright per §8 (no 🔔 — out of MVP scope):
          • 顧客CRM "お客様の活動" activity panel
              — out of MVP per ui-ux-inventory §3.5.
      */}
    </BrokerShell>
  );
};

// B2 条件検索 → moved to _shared/screens/broker-1-b2.jsx (rebuild 2026-08-20)

// ══════════════════════════════ B3 — SEARCH (MAP MODE) ══════════════════════════════
window.ScreenB3Map = function () {
  return (
    <BrokerShell active="properties" padded={false}
      crumbs={[L("ホーム","Home"), L("物件検索","Search"), L("地図","Map")]}
      title={L("物件検索 — 地図","Property search — map")}
      subtitle={L("142件 · 文京区エリア","142 in Bunkyo area")}>

      <div className="grid grid-cols-[400px_1fr]" style={{ height: "calc(100vh - 152px)" }}>
        {/* Card list */}
        <div className="border-r border-[#E5E7EB] bg-white overflow-y-auto">
          <div className="sticky top-0 bg-white p-3 border-b border-[#F1F5F9] flex items-center gap-2 z-10">
            <Input value={L("文京区 + 1LDK + 〜¥280,000","Bunkyo + 1LDK + ≤¥280k")} prefix={<Icon.Filter s={13}/>}/>
            <Btn kind="ghost" size="sm" icon={Icon.Settings}/>
          </div>
          <div className="p-2 space-y-2">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className={`flex gap-3 p-2 rounded-md cursor-pointer ${i===1?"ring-2 ring-[#F59E0B] bg-[#FEF3C7]/40":"hover:bg-[#F7F8FA]"}`}>
                <PhotoPh w={90} h={70} kind="exterior" tone={i}/>
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-semibold truncate">{["ZOOM本郷 701","カーサ恵比寿 203","青葉マンション 305","パークサイド 401","メゾン白金 102","ヒルズ青山 805"][i-1]}</div>
                  <div className="text-[11px] text-[#64748B]">1LDK · 42.5㎡</div>
                  <div className="text-[13px] font-bold tabnum mt-1">{["¥262,000","¥218,000","¥184,000","¥412,000","¥348,000","¥118,000"][i-1]}</div>
                </div>
                <Icon.Heart s={14} stroke="#94A3B8"/>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="relative overflow-hidden">
          <MapPlaceholder height={"100%"} pins={[
            { x: 250, y: 200, label: "¥262,000", active:true },
            { x: 380, y: 280, label: "¥218,000" },
            { x: 520, y: 180, label: "¥184,000" },
            { x: 680, y: 320, label: "¥412,000" },
            { x: 780, y: 220, label: "¥348,000" },
            { x: 600, y: 420, label: "¥118,000" },
            { x: 340, y: 380, label: "¥208,000" },
            { x: 700, y: 480, label: "¥148,000" },
            { x: 480, y: 500, label: "¥298,000" },
            { x: 850, y: 380, label: "¥168,000" },
          ]}/>
          {/* Map controls */}
          <div className="absolute top-4 right-4 bg-white rounded-md shadow border border-[#E5E7EB] flex flex-col text-[#475569]">
            <button className="p-2 border-b border-[#F1F5F9]"><Icon.Plus s={14}/></button>
            <button className="p-2"><Icon.Minus s={14}/></button>
          </div>
          <div className="absolute top-4 left-4 right-20 flex flex-wrap gap-2">
            {[L("駅徒歩 10分以内","≤10min walk"), L("築10年以内","≤10y"), L("ペット可","Pet OK"), L("駐車場","Parking")].map((c, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-white shadow-sm border border-[#E5E7EB] text-[11.5px] flex items-center gap-1.5 cursor-pointer">
                {c} <Icon.X s={10} stroke="#94A3B8"/>
              </span>
            ))}
          </div>
          {/* Selected card popover */}
          <div className="absolute bottom-6 left-6 w-80 bg-white rounded-lg overflow-hidden shadow-xl border border-[#E5E7EB]">
            <div className="relative">
              <PhotoPh h={140} kind="exterior" tone={1}/>
              <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center"><Icon.Heart s={14} stroke="#DC2626"/></div>
            </div>
            <div className="p-3">
              <div className="text-[14px] font-semibold">ZOOM本郷 701</div>
              <div className="text-[11.5px] text-[#64748B]">{L("文京区本郷 · 本郷三丁目 5分","Bunkyo · Hongo-sanchome 5min")}</div>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-[15px] font-bold tabnum">¥262,000</span>
                <span className="text-[11px] text-[#94A3B8]">1LDK · 42.5㎡</span>
              </div>
              <div className="flex gap-2 mt-3">
                <Btn kind="ghost" size="sm" full>{L("詳細","Detail")}</Btn>
                <Btn kind="accent" size="sm" full>{L("内見","Book")}</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrokerShell>
  );
};

// B4 検索結果 → moved to _shared/screens/broker-1-b4.jsx (rebuild 2026-08-20)

// B5 物件詳細 → moved to _shared/screens/broker-1-b5.jsx (rebuild 2026-08-20)
