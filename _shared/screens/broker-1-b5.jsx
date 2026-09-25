// _shared/screens/broker-1-b5.jsx — B5 物件詳細（ハブ）(rebuilt 2026-08-20)
// Delivers: B-3 図面ダウンロード + 帯情報 selector (元付 / 自社) as a centred dialog.
// This screen is the hub — 内見予約 / 入居申込 / 初期費用見積 all start here.

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, PhotoPh, MapPlaceholder, Avatar, BrokerShell } = window;
const L = window.L;

const B5_TABS = () => [L("概要","Overview"), L("設備","Equipment"), L("周辺情報","Neighbourhood"), L("写真","Photos"), L("パノラマ","Panorama"), L("動画","Video"), L("募集条件","Terms")];

const B5_EQUIP = () => [
  [L("管理・防犯","Management & security"), [L("オートロック","Auto-lock"), L("TVモニタ付インターホン","Video intercom"), L("防犯カメラ","CCTV"), L("日勤管理員","Day-shift staff"), L("宅配BOX","Parcel box")]],
  [L("共有施設","Common facilities"), [L("24時間ゴミ出し可","24h refuse"), L("敷地内ゴミ置き場","On-site refuse room"), L("クリーニングボックス","Cleaning box"), L("エレベーター","Elevator"), L("駐輪場","Bicycle parking")]],
  [L("室内・水回り","Interior & water"), [L("システムキッチン","Fitted kitchen"), L("IHコンロ","IH hob"), L("食器洗浄機","Dishwasher"), L("バス・トイレ別","Separate bath/WC"), L("追い焚き","Reheating bath"), L("浴室乾燥機","Bath dryer"), L("温水洗浄便座","Washlet"), L("独立洗面台","Separate vanity"), L("室内洗濯機置場","Indoor laundry")]],
  [L("バルコニー・庭","Balcony & garden"), [L("ベランダ","Veranda"), L("角部屋","Corner unit"), L("南東向き","South-east facing")]],
];

window.ScreenB5Detail = function () {
  const [tab, setTab] = React.useState(0);
  const [fav, setFav] = React.useState(true);
  const [shot, setShot] = React.useState(0);
  const [obi, setObi] = React.useState(false);
  const [obiPick, setObiPick] = React.useState("moto");
  const tabs = B5_TABS();

  const spec = [
    [L("構造","Structure"), L("RC造","RC")],
    [L("総戸数","Total units"), L("48戸","48")],
    [L("築年月","Built"), "2013/03"],
    [L("階数","Floor"), L("9階建 / 7階","9F building / 7F")],
    [L("方位","Aspect"), L("南東","South-east")],
    [L("駐車場","Parking"), L("空有 ¥16,500/月","Available ¥16,500/mo")],
  ];
  const deal = [
    [L("取引態様","Transaction type"), L("仲介元付（専任）","Agency (exclusive)")],
    [L("仲介手数料","Brokerage fee"), L("賃料の1ヶ月分（税別）","1 month's rent + tax")],
    [L("報酬形態","Commission form"), L("当方不払","Not payable by us")],
    [L("広告料（AD）","Ad fee (AD)"), "200%"],
  ];

  return (
    <BrokerShell active="search"
      crumbs={[L("物件検索","Search"), "ZOOM本郷 701"]}
      title="ZOOM本郷 701"
      subtitle={L("東京都文京区本郷2-26-13 · 2LDK · 54.30㎡","2-26-13 Hongo, Bunkyo · 2LDK · 54.30㎡")}
      actions={<>
        <button onClick={() => setFav(v => !v)}
          className={`h-9 px-3 rounded-md border text-[12.5px] inline-flex items-center gap-1.5 ${fav ? "bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]" : "bg-white border-[#E5E7EB] text-[#475569]"}`}>
          <Icon.Star s={13} stroke={fav ? "#B45309" : "#475569"}/>{L("お気に入り","Favourite")}
        </button>
        <Btn kind="ghost" icon={Icon.Chart}>{L("比較に追加","Add to compare")}</Btn>
        <a href="06-customer-mode.html"><Btn kind="primary" icon={Icon.Eye}>{L("接客モードに切替","Customer-service mode")}</Btn></a>
      </>}>

      {/* status chips */}
      <div className="flex items-center gap-1.5 flex-wrap mb-3">
        <Tag tone="ok" size="md"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"/> {L("募集中","Listing")}</Tag>
        <Tag tone="neutral" size="md">{L("内見可","Viewable")}</Tag>
        <Tag tone="neutral" size="md">{L("申込可","Applicable")}</Tag>
        <Tag tone="outline" size="md">{L("即入居可","Move-in ready")}</Tag>
        <span className="ml-auto text-[11px] text-[#94A3B8] tabnum">{L("掲載 2026/05/01 · 最終更新 05/26","Posted 2026/05/01 · updated 05/26")}</span>
      </div>

      {/* hero */}
      <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}>
        <div>
          <div className="rounded-lg overflow-hidden border border-[#E5E7EB] bg-white">
            <PhotoPh h={280} tone={shot} kind={shot === 0 ? "room" : shot === 1 ? "exterior" : shot === 2 ? "floorplan" : "room"}/>
          </div>
          <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
            {[L("リビング","Living"), L("外観","Exterior"), L("間取り","Floorplan"), L("キッチン","Kitchen"), L("寝室","Bedroom"), L("浴室","Bath")].map((label, i) => (
              <button key={i} onClick={() => setShot(i)} className={`shrink-0 rounded overflow-hidden border-2 ${i === shot ? "border-[#0F172A]" : "border-transparent"}`}>
                <PhotoPh w={64} h={46} tone={i} kind={i === 1 ? "exterior" : i === 2 ? "floorplan" : "room"}/>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Btn kind="ghost" size="sm" icon={Icon.Search}>{L("すべての写真 (24)","All photos (24)")}</Btn>
            <Btn kind="ghost" size="sm" icon={Icon.Camera}>{L("動画","Video")}</Btn>
            <Btn kind="ghost" size="sm" icon={Icon.Globe}>{L("パノラマ","Panorama")}</Btn>
          </div>
        </div>

        <Card className="p-4 self-start">
          <div className="text-[15px] font-semibold text-[#0F172A]">ZOOM本郷 701</div>
          <div className="flex items-baseline gap-2 mt-2 pb-3 border-b border-[#F1F5F9]">
            <span className="text-[26px] font-bold text-[#0F172A] tabnum leading-none">¥262,000</span>
            <span className="text-[12px] text-[#64748B]">/ {L("月","mo")}</span>
            <span className="text-[11.5px] text-[#64748B] tabnum ml-auto">{L("管理費 ¥20,000","Mgmt fee ¥20,000")}</span>
          </div>
          <div className="divide-y divide-[#F1F5F9] text-[12px]">
            {[
              [L("間取り / 専有面積","Layout / area"), L("2LDK / 54.30㎡","2LDK / 54.30㎡")],
              [L("所在地","Address"), L("東京都文京区本郷2-26-13","2-26-13 Hongo, Bunkyo, Tokyo"), "map"],
              [L("駅徒歩","Nearest station"), L("東京メトロ有楽町線 江戸川橋 徒歩3分","Yurakucho line, Edogawabashi, 3 min")],
              [L("入居可能日","Available from"), L("2026年6月1日","1 June 2026")],
              [L("敷金 / 礼金","Deposit / key money"), L("1ヶ月 / 1ヶ月","1 mo / 1 mo")],
              [L("管理会社","Management company"), L("株式会社 LENZ DX 本店","LENZ DX Co., Head office")],
            ].map(([k, v, extra], i) => (
              <div key={i} className="py-2 flex items-start gap-3">
                <span className="text-[#94A3B8] w-[104px] shrink-0">{k}</span>
                <span className="text-[#0F172A] flex-1 min-w-0">
                  {v}
                  {extra === "map" && <a href="03-search-map.html" className="ml-1.5 text-[11px] text-[#0F172A] underline whitespace-nowrap">{L("地図を見る →","Map →")}</a>}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* action row — the hub */}
      <Card className="p-3 mb-4 sticky top-4 z-20 overflow-x-auto">
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(5,minmax(150px,1fr))", minWidth: 790 }}>
          <a href="07-viewing-booking.html" className="h-11 rounded-md bg-[#0F172A] text-white text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-[#1F2937]">
            <Icon.Calendar s={15} stroke="#fff"/>{L("内見予約する","Book a viewing")}
          </a>
          <a href="09-application-form-step1-applicant.html" className="h-11 rounded-md bg-[#F59E0B] text-[#0F172A] text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-[#D97706] hover:text-white">
            <Icon.FileText s={15}/>{L("入居申込する","Apply to rent")}
          </a>
          <a href="13-cost-calculator.html" className="h-11 rounded-md bg-white border border-[#CBD5E1] text-[#0F172A] text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-[#F7F8FA]">
            <Icon.Chart s={15} stroke="#0F172A"/>{L("初期費用見積","Cost estimate")}
          </a>
          <button onClick={() => setObi(true)} className="h-11 rounded-md bg-white border border-[#CBD5E1] text-[#0F172A] text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-[#F7F8FA]">
            <Icon.Download s={15} stroke="#0F172A"/>{L("図面ダウンロード","Download sheet")}
          </button>
          <a href="12-chat.html" className="h-11 rounded-md bg-white border border-[#CBD5E1] text-[#0F172A] text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-[#F7F8FA]">
            <Icon.Chat s={15} stroke="#0F172A"/>{L("管理会社へ問合せ","Contact company")}
          </a>
        </div>
      </Card>

      <div className="grid gap-4 items-start" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}>
        <div className="min-w-0 space-y-4" style={{ gridColumn: "1 / -1" }}>
          <div className="grid gap-4 items-start" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}>
            <div className="min-w-0 space-y-4">
              {/* tabs */}
              <Card className="overflow-hidden">
                <div className="flex items-center gap-1 border-b border-[#E5E7EB] px-2 overflow-x-auto">
                  {tabs.map((t, i) => (
                    <button key={i} onClick={() => setTab(i)}
                      className={`px-3 py-2 text-[12.5px] whitespace-nowrap ${i === tab
                        ? "text-[#0F172A] font-semibold border-b-2 border-[#0F172A] -mb-px"
                        : "text-[#64748B] hover:text-[#0F172A]"}`}>{t}</button>
                  ))}
                </div>

                <div className="p-4">
                  {tab === 0 && (
                    <div className="space-y-4">
                      <div className="rounded-md border border-[#FDE68A] bg-[#FEF3C7] p-3">
                        <div className="text-[11px] uppercase tracking-wider font-semibold text-[#92400E] mb-1.5">{L("セールスポイント","Selling points")}</div>
                        <ul className="space-y-1 text-[12.5px] text-[#92400E]">
                          {[L("南東向き角部屋・日当たり良好","South-east corner unit with excellent light"),
                            L("2024年に水回り一新（キッチン・浴室・洗面）","Wet areas fully renewed in 2024"),
                            L("インターネット無料（光配線）・24時間ゴミ出し可","Free fibre internet · 24h refuse disposal"),
                            L("本郷三丁目駅 徒歩3分・丸ノ内線／大江戸線利用可","3 min to Hongo-sanchome — Marunouchi & Oedo lines")].map((n, i) => (
                            <li key={i} className="flex items-start gap-1.5"><Icon.Check s={12} stroke="#92400E"/><span>{n}</span></li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-1.5">{L("物件特徴","Property description")}</div>
                        <div className="text-[12.5px] text-[#475569] leading-relaxed">
                          {L("2013年築のRC造マンション7階、南東向きの角部屋です。LDKは14畳超で二面採光。オートロック・宅配ボックス・防犯カメラを備え、単身から二人入居まで対応できます。管理は当社直接管理のため、内見・申込のご連絡は本システムから直接お願いいたします。",
                             "A south-east corner unit on the 7th floor of a 2013 RC building. The LDK exceeds 14 jo with light from two sides. Auto-lock, parcel box and CCTV; suitable for singles or couples. Managed directly by us — please arrange viewings and applications through this system.")}
                        </div>
                      </div>

                      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
                        {[[L("物件概要","Property specification"), spec], [L("取引情報","Transaction"), deal]].map(([title, list], k) => (
                          <div key={k}>
                            <div className="text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-1.5">{title}</div>
                            <div className="rounded-md border border-[#E5E7EB] divide-y divide-[#F1F5F9]">
                              {list.map(([a, b], i) => (
                                <div key={i} className="px-2.5 py-1.5 flex items-start gap-2 text-[12px]">
                                  <span className="text-[#94A3B8] w-[92px] shrink-0">{a}</span>
                                  <span className="text-[#0F172A] flex-1 min-w-0">{b}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === 1 && (
                    <div className="space-y-3.5">
                      {B5_EQUIP().map(([group, items], i) => (
                        <div key={i}>
                          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-1.5">{group}</div>
                          <div className="flex flex-wrap gap-1">
                            {items.map(n => (
                              <span key={n} className="px-2 py-[4px] rounded-full bg-[#DCFCE7] border border-[#BBF7D0] text-[11.5px] text-[#15803D] inline-flex items-center gap-1">
                                <Icon.Check s={10} stroke="#15803D"/>{n}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="text-[11px] text-[#94A3B8]">{L("表示は管理会社が登録した設備情報です。","Equipment as registered by the management company.")}</div>
                    </div>
                  )}

                  {tab === 2 && (
                    <div className="space-y-3">
                      <div className="rounded-md overflow-hidden border border-[#E5E7EB]">
                        <MapPlaceholder height={240} pins={[
                          { x: "42%", y: "44%", label: "ZOOM本郷 701", active: true },
                          { x: "24%", y: "62%", label: L("コンビニ","Convenience") },
                          { x: "66%", y: "34%", label: L("小学校","Primary school") },
                          { x: "72%", y: "66%", label: L("病院","Clinic") },
                          { x: "30%", y: "26%", label: L("公園","Park") },
                        ]}/>
                      </div>
                      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
                        <div className="rounded-md border border-[#E5E7EB] p-3">
                          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-1.5">{L("周辺施設","Nearby")}</div>
                          <div className="space-y-1 text-[12px]">
                            {[[L("ローソン 本郷三丁目店","Lawson"), "180m"], [L("マルエツプチ 本郷店","Maruetsu Petit"), "260m"],
                              [L("本郷内科クリニック","Hongo Clinic"), "340m"], [L("元町公園","Motomachi Park"), "410m"]].map(([n, d], i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Icon.MapPin s={11} stroke="#94A3B8"/><span className="text-[#475569] flex-1 min-w-0 truncate">{n}</span>
                                <span className="tabnum text-[#94A3B8]">{d}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-md border border-[#E5E7EB] p-3">
                          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-1.5">{L("学区","School district")}</div>
                          <div className="space-y-1 text-[12px] text-[#475569]">
                            <div>{L("小学校：文京区立本郷小学校（徒歩7分）","Primary: Hongo Primary School (7 min)")}</div>
                            <div>{L("中学校：文京区立第三中学校（徒歩11分）","Junior high: No.3 Junior High (11 min)")}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === 3 && (
                    <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))" }}>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i}><PhotoPh h={84} tone={i} kind={i % 4 === 1 ? "exterior" : i % 4 === 2 ? "floorplan" : "room"}/></div>
                      ))}
                    </div>
                  )}

                  {(tab === 4 || tab === 5) && (
                    <div className="rounded-md border border-[#E5E7EB] overflow-hidden">
                      <div className="relative bg-[#0F172A] flex items-center justify-center" style={{ aspectRatio: "16/9" }}>
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center"><Icon.ChevronRight s={22} stroke="#0F172A"/></div>
                        <span className="absolute bottom-2 left-2 text-[10.5px] text-white/80">
                          {tab === 4 ? L("360°パノラマ（リビング）","360° panorama (living room)") : L("ルームツアー動画 2:14","Room tour video 2:14")}
                        </span>
                      </div>
                    </div>
                  )}

                  {tab === 6 && (
                    <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
                      {[[L("費用","Costs"), [[L("賃料","Rent"), "¥262,000"], [L("管理費","Mgmt fee"), "¥20,000"], [L("敷金","Deposit"), L("1.00ヶ月","1.00 mo")], [L("礼金","Key money"), L("1.00ヶ月","1.00 mo")], [L("鍵交換費用","Key replacement"), "¥27,500"], [L("家財保険","Contents insurance"), L("¥1,735/月","¥1,735/mo")]]],
                        [L("条件","Conditions"), [[L("契約期間","Term"), L("2年（普通借家）","2 years (standard)")], [L("保証会社","Guarantor"), L("利用必須（初回50%・月額1%）","Required (50% / 1%)")], [L("ペット","Pets"), L("相談可","Negotiable")], [L("二人入居","Two tenants"), L("可","Allowed")], [L("楽器","Instruments"), L("不可","Not allowed")], [L("フリーレント","Free rent"), L("1ヶ月","1 month")]]]].map(([title, list], k) => (
                        <div key={k}>
                          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-1.5">{title}</div>
                          <div className="rounded-md border border-[#E5E7EB] divide-y divide-[#F1F5F9]">
                            {list.map(([a, b], i) => (
                              <div key={i} className="px-2.5 py-1.5 flex items-center gap-2 text-[12px]">
                                <span className="text-[#94A3B8] flex-1 min-w-0">{a}</span>
                                <span className="text-[#0F172A] tabnum">{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>

              {/* similar properties */}
              <Card>
                <CardHead title={L("この物件に似た物件","Similar properties")} action={<a href="04-search-results.html" className="text-[11px] text-[#475569] hover:text-[#0F172A]">{L("もっと見る →","See more →")}</a>}/>
                <div className="p-3 flex items-stretch gap-3 overflow-x-auto">
                  {[["ZOOM本郷 702", "258,000", "2LDK"], [L("青葉マンション 305","Aoba 305"), "184,000", "1LDK"],
                    [L("吉祥寺パークレジデンス 501","Kichijoji PR 501"), "208,000", "2DK"], [L("カーサ恵比寿 203","Casa Ebisu 203"), "218,000", "1LDK"]].map(([n, rent, layout], i) => (
                    <a key={i} href="05-property-detail.html" className="shrink-0 w-[150px] rounded-md border border-[#E5E7EB] overflow-hidden hover:border-[#CBD5E1]">
                      <PhotoPh h={78} tone={i + 1} kind={i % 2 ? "exterior" : "room"}/>
                      <div className="p-2">
                        <div className="text-[11.5px] font-semibold text-[#0F172A] truncate">{n}</div>
                        <div className="text-[12.5px] font-bold text-[#0F172A] tabnum">¥{rent}</div>
                        <div className="text-[10.5px] text-[#94A3B8]">{layout}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>

              {/* broker activity */}
              <Card>
                <CardHead title={L("この物件での活動履歴","Recent activity on this property")}/>
                <div className="divide-y divide-[#F1F5F9] text-[12px]">
                  {[
                    ["5/22", L("内見実施（FINDERS 吉祥寺店）","Viewing conducted (FINDERS Kichijoji)")],
                    ["5/20", L("図面ダウンロード（自社帯）","Sheet downloaded (own band)")],
                    ["5/18", L("管理会社へ問合せ（ペット可否）","Enquiry sent (pet policy)")],
                  ].map(([d, n], i) => (
                    <div key={i} className="px-4 py-2 flex items-center gap-2.5">
                      <span className="tabnum text-[#94A3B8] w-9 shrink-0">{d}</span>
                      <span className="text-[#475569]">{n}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* floating contact panel */}
            <div className="self-start sticky top-[104px]" style={{ maxWidth: 320 }}>
              <Card>
                <CardHead title={L("担当者","Your contact")} sub={L("株式会社 LENZ DX 本店","LENZ DX Co., Head office")}/>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={L("飯沼","Iinuma")} size={40}/>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-[#0F172A]">{L("飯沼 直樹","Iinuma Naoki")}</div>
                      <div className="text-[11px] text-[#64748B]">{L("賃貸管理部","Rental management")}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 text-[12px]">
                    <div className="flex items-center gap-2"><Icon.Phone s={12} stroke="#94A3B8"/><span className="tabnum text-[#475569]">03-5842-1120</span></div>
                    <div className="flex items-center gap-2"><Icon.Mail s={12} stroke="#94A3B8"/><span className="text-[#475569] truncate">iinuma@lenz-dx.jp</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <a href="12-chat.html"><Btn kind="primary" size="sm" full icon={Icon.Chat}>{L("チャット","Chat")}</Btn></a>
                    <Btn kind="ghost" size="sm" full icon={Icon.Phone}>{L("通話","Call")}</Btn>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#F1F5F9] text-[11.5px] text-[#475569] space-y-1">
                    <div className="flex justify-between gap-2"><span className="text-[#94A3B8]">{L("営業時間","Office hours")}</span><span className="tabnum">{L("平日 9:30〜18:30","Weekdays 9:30–18:30")}</span></div>
                    <div className="flex justify-between gap-2"><span className="text-[#94A3B8]">{L("内見可能","Viewing hours")}</span><span className="tabnum">{L("10:00〜19:00（水休）","10:00–19:00 (closed Wed)")}</span></div>
                    <div className="flex justify-between gap-2"><span className="text-[#94A3B8]">{L("鍵","Key")}</span><span>{L("現地キーボックス","On-site keybox")}</span></div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* B-3 — 帯情報 dialog before the 図面 download */}
      {obi && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-6" style={{ background: "rgba(15,23,42,0.45)" }} onClick={() => setObi(false)}>
          <div onClick={e => e.stopPropagation()} className="w-[320px] max-w-full bg-white border border-[#E5E7EB] rounded-md p-4" style={{ boxShadow: "0 18px 50px rgba(15,23,42,0.30)" }}>
            <div className="text-[10.5px] text-[#94A3B8] mb-0.5">ZOOM本郷 701</div>
            <div className="text-[13px] font-semibold text-[#0F172A] mb-2.5">{L("帯情報を選択して図面を出力","Choose the footer band, then export")}</div>
            <div className="space-y-2">
              {[["moto", L("元付会社の帯","Listing agency band"), L("管理会社（LENZ DX）の連絡先を印字","prints the management company's details")],
                ["own",  L("自社（仲介会社）の帯","Our own band"), L("貴社名・担当者・連絡先を印字","prints your firm, agent and contact")]].map(([k, label, sub]) => (
                <label key={k} onClick={() => setObiPick(k)}
                  className={`flex items-start gap-2 p-2.5 rounded-md border cursor-pointer ${obiPick === k ? "border-[#0F172A] bg-[#F8FAFC]" : "border-[#E5E7EB]"}`}>
                  <span className={`w-4 h-4 rounded-full border mt-[1px] flex items-center justify-center shrink-0 ${obiPick === k ? "border-[#0F172A]" : "border-[#CBD5E1]"}`}>
                    {obiPick === k && <span className="w-2 h-2 rounded-full bg-[#0F172A]"/>}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] font-medium text-[#0F172A]">{label}</span>
                    <span className="block text-[10.5px] text-[#94A3B8] leading-snug">{sub}</span>
                  </span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#F1F5F9]">
              <button onClick={() => setObi(false)} className="text-[12px] text-[#475569] hover:text-[#0F172A]">{L("キャンセル","Cancel")}</button>
              <button onClick={() => setObi(false)} className="ml-auto h-8 px-3 rounded-md bg-[#0F172A] text-white text-[12px] font-semibold inline-flex items-center gap-1.5">
                <Icon.Download s={12} stroke="#fff"/>{L("PDFをダウンロード","Download PDF")}
              </button>
            </div>
          </div>
        </div>
      )}
    </BrokerShell>
  );
};
