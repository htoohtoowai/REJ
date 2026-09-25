// _shared/screens/management-1-m5.jsx — M5 物件編集 建物 (rebuilt 2026-08-20)
// Chrome from property-editor-shell.jsx. Delivers: #8 周辺施設 自動候補 (採用/却下 per candidate)
// + master-refresh note · M-24 駐車場区画 registered and listed per space, like rooms.

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select } = window;
const { PropEditorShell, PESection, PEChips, PETextarea, PECheck, PEEraToggle } = window;
const L = window.L;

window.ScreenM5Building = function () {
  const [transit, setTransit] = React.useState([
    [L("東京メトロ有楽町線","Tokyo Metro Yurakucho"), L("江戸川橋","Edogawabashi"), "3", "walk"],
    [L("東京メトロ東西線","Tokyo Metro Tozai"),     L("神楽坂","Kagurazaka"),   "7", "walk"],
  ]);
  const [parkOpen, setParkOpen] = React.useState(true);
  const [energyOpen, setEnergyOpen] = React.useState(false);

  // #8 — nearby-facility candidates derived from the building's lat/lng
  const [cands, setCands] = React.useState([
    [L("コンビニ","Convenience"), L("セブンイレブン 本郷2丁目店","7-Eleven Hongo 2-chome"), "120m", null],
    [L("スーパー","Supermarket"), L("マルエツプチ 本郷店","Maruetsu Petit Hongo"),         "260m", null],
    [L("病院","Clinic"),          L("本郷内科クリニック","Hongo Internal Medicine"),       "340m", null],
    [L("公園","Park"),            L("元町公園","Motomachi Park"),                          "410m", null],
    [L("駅","Station"),           L("春日駅","Kasuga Station"),                            "650m", null],
  ]);
  const [poi, setPoi] = React.useState([
    [L("コンビニ","Convenience"), L("ローソン 本郷三丁目店","Lawson Hongo 3-chome"), "180m"],
    [L("小学校","Primary school"), L("文京区立本郷小学校","Hongo Primary School"),   "520m"],
  ]);
  const decide = (i, verdict) => {
    setCands(cs => cs.map((c, j) => j === i ? [c[0], c[1], c[2], verdict] : c));
    if (verdict === "in") setPoi(p => p.concat([[cands[i][0], cands[i][1], cands[i][2]]]));
  };

  const spaces = [
    ["No.1", "16,500", L("普通車","Standard"), "taken", "—"],
    ["No.2", "16,500", L("軽自動車","Compact"), "free",  L("募集中","Listing")],
    ["No.3", "22,000", L("ハイルーフ","High-roof"), "free", L("募集中","Listing")],
  ];

  return (
    <PropEditorShell active={2}>
      <div className="space-y-4 pb-40">

        <div className="grid gap-4" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}>
          <PESection title={L("交通情報","Transit")} sub={L("最寄駅は上から順に掲載されます","Published in listed order")}>
            <div className="space-y-2">
              {transit.map(([line, station, min, mode], i) => (
                <div key={i} className="grid gap-2 items-end" style={{ gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr) 92px 96px 28px" }}>
                  <Field label={i === 0 ? L("路線","Line") : null}><Select value={line}/></Field>
                  <Field label={i === 0 ? L("駅","Station") : null}><Input value={station}/></Field>
                  <Field label={i === 0 ? L("徒歩","Walk") : null}><Input value={min} suffix={L("分","min")}/></Field>
                  <div>
                    {i === 0 && <div className="text-[11px] font-semibold text-[#475569] mb-1">{L("手段","Mode")}</div>}
                    <div className="flex items-center bg-white border border-[#E5E7EB] rounded-md p-[2px] h-9">
                      <button className={`flex-1 h-full rounded text-[11px] ${mode === "walk" ? "bg-[#0F172A] text-white" : "text-[#475569]"}`}>{L("徒歩","Walk")}</button>
                      <button className={`flex-1 h-full rounded text-[11px] ${mode === "bus" ? "bg-[#0F172A] text-white" : "text-[#475569]"}`}>{L("バス","Bus")}</button>
                    </div>
                  </div>
                  <button onClick={() => setTransit(t => t.filter((_, j) => j !== i))}
                    className="h-9 text-[#94A3B8] hover:text-[#DC2626] flex items-center justify-center" title={L("削除","Remove")}><Icon.Trash s={13}/></button>
                </div>
              ))}
            </div>
            <button onClick={() => setTransit(t => t.concat([[L("路線を選択","Select line"), "", "", "walk"]]))}
              className="mt-2.5 inline-flex items-center gap-1 text-[12px] text-[#0F172A] hover:underline"><Icon.Plus s={12}/>{L("路線を追加","Add line")}</button>
          </PESection>

          <PESection title={L("住所","Address")}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              <Field label={L("郵便番号","Postcode")}>
                <div className="flex items-center gap-2 min-w-0">
                  <Input value="113-0033"/>
                  <Btn kind="ghost" size="sm">{L("住所を取得","Look up")}</Btn>
                </div>
              </Field>
              <Field label={L("都道府県","Prefecture")}><Select value={L("東京都","Tokyo")}/></Field>
              <Field label={L("市区町村","City / ward")}><Input value={L("文京区","Bunkyo-ku")}/></Field>
              <Field label={L("番地","Street address")}><Input value={L("本郷2-26-13","2-26-13 Hongo")}/></Field>
              <Field label={L("緯度","Latitude")} hint={L("自動・読取専用","auto · read-only")}><Input value="35.70281"/></Field>
              <Field label={L("経度","Longitude")} hint={L("自動・読取専用","auto · read-only")}><Input value="139.75534"/></Field>
            </div>
            <a href="#" className="mt-2.5 inline-flex items-center gap-1 text-[12px] text-[#0F172A] hover:underline"><Icon.MapPin s={12}/>{L("地図で確認","Check on map")}</a>
          </PESection>
        </div>

        <PESection title={L("建物基本","Building basics")}>
          <div className="grid grid-cols-4 gap-x-4 gap-y-3.5">
            <Field label={L("物件種別","Property type")}><Select value={L("マンション","Apartment (RC)")}/></Field>
            <Field label={L("構造","Structure")}><Select value={L("RC造","RC")}/></Field>
            <Field label={L("築年月","Built")}>
              <div className="flex items-center gap-1.5 min-w-0"><Input value="2013/03"/><PEEraToggle/></div>
            </Field>
            <Field label={L("主たる開口部の方位","Main aspect")}><Select value={L("南東","South-east")}/></Field>
            <Field label={L("総戸数","Total units")}><Input value="48" suffix={L("戸","units")}/></Field>
            <Field label={L("地上階数","Floors above")}><Input value="9" suffix={L("階","F")}/></Field>
            <Field label={L("地下階数","Floors below")}><Input value="1" suffix={L("階","F")}/></Field>
            <span/>
            <Field label={L("延床面積（壁芯）","Total floor area (wall-center)")}><Input value="2,140.55" suffix="㎡"/></Field>
            <Field label={L("延床面積（登記）","Total floor area (registry)")}><Input value="2,138.10" suffix="㎡"/></Field>
            <div className="col-span-2">
              <Field label={L("構造備考","Structure notes")}>
                <PETextarea rows={2} value={L("鉄筋コンクリート造・地上9階地下1階／耐震基準：新耐震（2013年施工）","RC, 9F above / 1F below. Seismic: post-1981 standard (built 2013)")}/>
              </Field>
            </div>
          </div>
        </PESection>

        <div className="grid gap-4" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}>
          <PESection title={L("管理・防犯","Management & security")}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              <Field label={L("管理形態","Management form")}>
                <div className="flex items-center bg-white border border-[#CBD5E1] rounded-md h-9 px-2.5 w-full">
                  <select defaultValue="1" className="bg-transparent outline-none text-[13px] text-[#0F172A] flex-1 min-w-0 cursor-pointer">
                    {[L("自主管理","Self-managed"), L("委託管理","Outsourced"), L("一部委託","Partially outsourced")].map((o, i) => <option key={i} value={String(i)}>{o}</option>)}
                  </select>
                </div>
              </Field>
              <Field label={L("管理会社名","Management company")}><Input value={L("株式会社 LENZ DX 管理部","LENZ DX Co., Management div.")}/></Field>
              <PEChips label={L("管理人形態","On-site staff")} value={L("日勤","Day shift")}
                options={[L("常駐","Resident"), L("日勤","Day shift"), L("巡回","Patrol"), L("なし","None")]}/>
              <PEChips label={L("管理組合","Management association")} value={L("有","Yes")} options={[L("有","Yes"), L("無","No")]}/>
            </div>
          </PESection>

          <PESection title={L("公共設備","Utilities")}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              <PEChips label={L("電気","Electricity")} value={L("有","Yes")} options={[L("有","Yes"), L("無","No")]}/>
              <Field label={L("アンペア","Amperage")}><Input value="30" suffix="A"/></Field>
              <PEChips label={L("ガス区分","Gas")} value={L("都市ガス","City gas")} options={[L("都市ガス","City gas"), L("プロパン","LPG"), L("なし","None")]}/>
              <PEChips label={L("上水区分","Water supply")} value={L("公営","Public")} options={[L("公営","Public"), L("私営","Private"), L("井戸","Well")]}/>
              <div className="col-span-2">
                <PEChips label={L("下水区分","Sewage")} value={L("公共下水","Public sewer")} options={[L("公共下水","Public sewer"), L("浄化槽","Septic tank"), L("汲み取り","Collection")]}/>
              </div>
            </div>
          </PESection>
        </div>

        <PESection title={L("駐車場・駐輪場","Parking & bicycle")}>
          <div className="grid grid-cols-4 gap-x-4 gap-y-3.5 items-start">
            <PEChips label={L("駐車場","Car parking")} value={L("有","Yes")} options={[L("有","Yes"), L("無","No"), L("その他","Other")]}/>
            <Field label={L("駐車台数","Spaces")}><Input value="12" suffix={L("台","spaces")}/></Field>
            <Field label={L("駐車場料金","Monthly fee")}><Input value="16,500" prefix="¥" suffix={L("/月","/mo")}/></Field>
            <span/>
            <div className="pt-1"><PECheck on label={L("バイク置場","Motorcycle parking")}/></div>
            <Field label={L("バイク置場料金","Motorcycle fee")}><Input value="3,300" prefix="¥" suffix={L("/月","/mo")}/></Field>
            <div className="pt-1"><PECheck on label={L("駐輪場","Bicycle parking")}/></div>
            <Field label={L("駐輪場料金","Bicycle fee")}><Input value="550" prefix="¥" suffix={L("/月","/mo")}/></Field>
          </div>
        </PESection>

        {/* M-24 — parking spaces are registered and listed per space, exactly like rooms */}
        <Card>
          <CardHead title={L("駐車場区画","Parking spaces")}
            sub={L("区画ごとに部屋と同じ方法で登録・募集します（掲載先＝自社HPのみ）","Registered and listed per space like rooms — published to the own site only")}
            action={<Btn kind="ghost" size="sm" icon={Icon.Plus}>{L("区画を追加","Add space")}</Btn>}/>
          <table className="w-full text-[12px]">
            <thead className="bg-[#F7F8FA] text-[#64748B] text-[10.5px] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">{L("区画番号","Space no.")}</th>
                <th className="px-2 py-2 text-right font-semibold">{L("料金","Fee")}</th>
                <th className="px-2 py-2 text-left font-semibold">{L("サイズ / タイプ","Size / type")}</th>
                <th className="px-2 py-2 text-left font-semibold">{L("状態","State")}</th>
                <th className="px-2 py-2 text-left font-semibold">{L("募集可否","Listing")}</th>
                <th className="px-2 py-2 text-left font-semibold">{L("掲載先","Published to")}</th>
                <th className="px-2 py-2 w-8"/>
              </tr>
            </thead>
            <tbody>
              {spaces.map(([no, fee, type, state, listing], i) => (
                <tr key={i} className="border-t border-[#F1F5F9] hover:bg-[#F8FAFC]">
                  <td className="px-4 py-1.5">
                    <a href="05b-property-edit-room.html" className="font-semibold text-[#0F172A] hover:underline flex items-center gap-1.5">
                      <Icon.Key s={11} stroke="#94A3B8"/>{L(`駐車場 ${no}`, `Parking ${no}`)}
                    </a>
                  </td>
                  <td className="px-2 py-1.5 text-right tabnum font-semibold">¥{fee}</td>
                  <td className="px-2 py-1.5 text-[#475569]">{type}</td>
                  <td className="px-2 py-1.5">
                    {state === "free" ? <Tag tone="ok">{L("空き","Vacant")}</Tag> : <Tag tone="neutral">{L("契約中","Contracted")}</Tag>}
                  </td>
                  <td className="px-2 py-1.5 text-[#475569]">{listing}</td>
                  <td className="px-2 py-1.5">
                    <span className="inline-flex items-center h-[18px] px-1.5 rounded text-[9.5px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">{L("自社HP","OWN")}</span>
                    <span className="text-[10.5px] text-[#94A3B8] ml-1.5">{L("他5媒体は対象外","5 other sites n/a")}</span>
                  </td>
                  <td className="px-2 py-1.5">
                    <a href="05b-property-edit-room.html" className="text-[#94A3B8] hover:text-[#0F172A] inline-flex" title={L("区画を編集","Edit space")}><Icon.Edit s={13}/></a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2.5 border-t border-[#F1F5F9] text-[11px] text-[#94A3B8]">
            {L("行をクリックすると部屋と同じ編集画面（駐車場向けの項目のみ）が開きます。",
               "Clicking a row opens the same editor used for rooms, with the reduced parking field set.")}
          </div>
        </Card>

        <PESection title={L("リフォーム・リノベーション","Refurbishment & renovation")}>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
            <div className="grid grid-cols-[140px_minmax(0,1fr)] gap-3 items-start">
              <Field label={L("リフォーム終了日","Refurbished on")}><Input value="2025/11/20"/></Field>
              <Field label={L("内容","Details")}><PETextarea rows={2} value={L("室内クロス全面張替え・ハウスクリーニング","All wallpaper replaced, professional cleaning")}/></Field>
            </div>
            <div className="grid grid-cols-[140px_minmax(0,1fr)] gap-3 items-start">
              <Field label={L("リノベーション終了日","Renovated on")}><Input value="2024/03/15"/></Field>
              <Field label={L("内容","Details")}><PETextarea rows={2} value={L("水回り一式交換（キッチン・浴室・洗面）／2階共用部改装","Kitchen, bath and washroom replaced; 2F common area refit")}/></Field>
            </div>
          </div>
        </PESection>

        <Card>
          <CardHead title={L("周辺施設・学区","Nearby facilities & school district")}
            sub={L("周辺施設マスタは定期更新されます（店舗の入替あり）","The facility master is refreshed periodically (stores change hands)")}
            action={<div className="flex items-center gap-2">
              <Btn kind="ghost" size="sm" icon={Icon.Search}>{L("緯度経度から検索","Search by lat/lng")}</Btn>
              <Btn kind="ghost" size="sm" icon={Icon.Map}>{L("地図で確認","Check on map")}</Btn>
            </div>}/>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 mb-4">
              <Field label={L("学区 — 小学校","School district — primary")}><Input value={L("文京区立本郷小学校","Hongo Primary School")}/></Field>
              <Field label={L("学区 — 中学校","School district — junior high")}><Input value={L("文京区立第三中学校","No.3 Junior High School")}/></Field>
            </div>

            <div className="grid gap-4" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}>
              {/* registered facilities */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-[#475569]">{L("周辺施設","Registered facilities")}</span>
                  <Btn kind="ghost" size="sm" icon={Icon.Plus}>{L("行を追加","Add row")}</Btn>
                </div>
                <div className="border border-[#E5E7EB] rounded-md overflow-hidden">
                  <table className="w-full text-[12px]">
                    <thead className="bg-[#F7F8FA] text-[#64748B] text-[10px] uppercase tracking-wider">
                      <tr>
                        <th className="px-2.5 py-1.5 text-left font-semibold w-[92px]">{L("種別","Type")}</th>
                        <th className="px-2 py-1.5 text-left font-semibold">{L("名称","Name")}</th>
                        <th className="px-2 py-1.5 text-right font-semibold w-[72px]">{L("距離","Dist.")}</th>
                        <th className="w-8"/>
                      </tr>
                    </thead>
                    <tbody>
                      {poi.map(([type, name, dist], i) => (
                        <tr key={i} className="border-t border-[#F1F5F9]">
                          <td className="px-2.5 py-1.5 text-[#475569]">{type}</td>
                          <td className="px-2 py-1.5 text-[#0F172A]">{name}</td>
                          <td className="px-2 py-1.5 text-right tabnum text-[#475569]">{dist}</td>
                          <td className="px-2 py-1.5 text-center">
                            <button onClick={() => setPoi(p => p.filter((_, j) => j !== i))} className="text-[#94A3B8] hover:text-[#DC2626]"><Icon.Trash s={12}/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* #8 — 自動候補 with per-candidate 採用 / 却下 */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-[#475569]">{L("自動候補","Auto-suggested")}</span>
                  <Btn kind="ghost" size="sm" icon={Icon.Sparkle} onClick={() => setCands(cs => cs.map(c => [c[0], c[1], c[2], null]))}>{L("自動候補","Suggest")}</Btn>
                </div>
                <div className="border border-[#E5E7EB] rounded-md divide-y divide-[#F1F5F9]">
                  {cands.map(([type, name, dist, verdict], i) => (
                    <div key={i} className={`px-2.5 py-1.5 flex items-center gap-2 ${verdict ? "bg-[#F8FAFC]" : ""}`}>
                      <span className="text-[10.5px] text-[#64748B] w-[62px] shrink-0">{type}</span>
                      <span className={`text-[12px] flex-1 min-w-0 truncate ${verdict === "out" ? "text-[#94A3B8] line-through" : "text-[#0F172A]"}`}>{name}</span>
                      <span className="text-[11px] text-[#475569] tabnum shrink-0">{dist}</span>
                      {verdict === "in" ? <Tag tone="ok" size="sm"><Icon.Check s={10}/>{L("採用","Added")}</Tag>
                        : verdict === "out" ? <Tag tone="neutral" size="sm">{L("却下","Rejected")}</Tag>
                        : <span className="flex items-center gap-1 shrink-0">
                            <button onClick={() => decide(i, "in")} className="h-6 px-2 rounded border border-[#0F172A] text-[10.5px] font-semibold text-[#0F172A] hover:bg-[#0F172A] hover:text-white">{L("採用","Accept")}</button>
                            <button onClick={() => decide(i, "out")} className="h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#475569] hover:bg-[#F1F5F9]">{L("却下","Reject")}</button>
                          </span>}
                    </div>
                  ))}
                </div>
                <div className="text-[10.5px] text-[#94A3B8] mt-1.5 tabnum">{L("データ最終更新日: 2026/04","Data last refreshed: 2026/04")}</div>
                <div className="mt-1.5 flex items-start gap-1.5 text-[11px] text-[#B45309]">
                  <Icon.Alert s={11} stroke="#B45309"/>
                  <span>{L("要確認：POI提供元・更新頻度は調査中","To confirm: POI data source and refresh interval are still being investigated")}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <button onClick={() => setEnergyOpen(o => !o)} className="w-full px-4 py-3 flex items-center gap-2 text-left">
            {energyOpen ? <Icon.ChevronDown s={14} stroke="#475569"/> : <Icon.ChevronRight s={14} stroke="#475569"/>}
            <span className="text-[13px] font-semibold text-[#0F172A]">{L("エネルギー消費量・省エネ性能","Energy consumption & efficiency")}</span>
            <span className="text-[11px] text-[#94A3B8]">{L("2024年4月以降の広告表示義務項目","Mandatory in ads from Apr 2024")}</span>
          </button>
          {energyOpen && (
            <div className="px-4 pb-4 grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-[#F1F5F9] pt-3.5">
              <Field label={L("省エネ性能","Energy efficiency")}><Input value={L("断熱等性能等級4 / 一次エネルギー消費量等級4","Insulation grade 4 / primary energy grade 4")}/></Field>
              <Field label={L("一次エネルギー消費量","Primary energy consumption")}><Input value="72" suffix={L("GJ/年","GJ/yr")}/></Field>
            </div>
          )}
        </Card>
      </div>
    </PropEditorShell>
  );
};
