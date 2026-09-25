// _shared/screens/management-1-m5b.jsx — M5b 物件編集 部屋 (rebuilt 2026-08-20)
// Chrome from property-editor-shell.jsx. Delivers: #7 間取り整合チェック (save blocked, red inline
// alert + error drawer) · #2 募集備考 の媒体連動項目確認 panel (M6/M10 pattern) · parking variant
// (reduced field set, reached from the 駐車場区画 list on M5).

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, PhotoPh } = window;
const { PropEditorShell, PESection, PEChips, PETextarea, PECheck, PEEraToggle } = window;
const L = window.L;

const M5B_EQUIP = [
  [L("システムキッチン","Fitted kitchen"), true], [L("IH コンロ","IH hob"), true], [L("ガスコンロ","Gas hob"), false],
  [L("食器洗浄機","Dishwasher"), true], [L("浴室乾燥機","Bath dryer"), true], [L("追い焚き","Reheating bath"), true],
  [L("温水洗浄便座","Washlet"), true], [L("独立洗面台","Separate vanity"), true], [L("ウォークインクローゼット","Walk-in closet"), true],
  [L("エアコン（リビング）","A/C (living)"), true], [L("エアコン（寝室）","A/C (bedroom)"), false], [L("オートロック","Auto-lock"), true],
  [L("TVモニタ付インターホン","Video intercom"), true], [L("床暖房","Floor heating"), false],
];

window.ScreenM5bRoom = function () {
  const parking = typeof window !== "undefined" && window.location.search.indexOf("type=parking") >= 0;

  const [rooms, setRooms] = React.useState([
    [L("洋室","Western"), "5.10", L("フローリング","Flooring"), L("北側洋室","North room")],
    [L("洋室","Western"), "7.00", L("フローリング","Flooring"), L("南側洋室","South room")],
    [L("LDK","LDK"),      "13.50", L("フローリング","Flooring"), "—"],
    [L("和室","Japanese"), "",     "",                            ""],
  ]);
  const [equip, setEquip] = React.useState(M5B_EQUIP.map(e => e[1]));
  const [panel, setPanel] = React.useState(false);
  const [override, setOverride] = React.useState(true);

  // #7 — the LDK row is present but incomplete → 居室数・帖数 mismatch against 2LDK
  const detailErr = L("間取り詳細が不足しています（居室数・帖数）", "Layout detail is incomplete (room count / size)");

  if (parking) {
    return (
      <PropEditorShell active={3}>
        <div className="pb-40 max-w-[720px]">
          <div className="mb-4 flex items-center gap-2 text-[12px] text-[#475569]">
            <a href="05-property-edit-building.html" className="inline-flex items-center gap-1 hover:text-[#0F172A]"><Icon.ChevronLeft s={12}/>{L("駐車場区画一覧に戻る","Back to parking spaces")}</a>
            <span className="text-[#CBD5E1]">/</span>
            <span className="font-semibold text-[#0F172A]">{L("駐車場 No.2","Parking No.2")}</span>
            <Tag tone="neutral" size="sm">{L("駐車場区画（項目を限定表示）","Parking space — reduced field set")}</Tag>
          </div>
          <PESection title={L("駐車場区画","Parking space")} sub={L("部屋と同じ方法で登録・募集します","Registered and listed exactly like a room")}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              <Field label={L("区画番号","Space no.")} required><Input value="No.2"/></Field>
              <Field label={L("料金","Fee")} required><Input value="16,500" prefix="¥" suffix={L("/月","/mo")}/></Field>
              <Field label={L("サイズ / タイプ","Size / type")}><Select value={L("軽自動車","Compact")}/></Field>
              <PEChips label={L("状態","State")} value={L("空き","Vacant")} options={[L("空き","Vacant"), L("契約中","Contracted")]}/>
              <PEChips label={L("募集可否","Listing")} value={L("募集中","Listing")} options={[L("募集中","Listing"), L("募集停止","Paused")]}/>
              <Field label={L("掲載先","Published to")} hint={L("駐車場は自社HPのみ","own site only")}>
                <div className="flex items-center gap-1.5 h-9">
                  <span className="inline-flex items-center h-[20px] px-1.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">{L("自社HP","OWN")}</span>
                  {["SUUMO","AT","HM","RZ","B2B"].map(s => (
                    <span key={s} className="inline-flex items-center h-[20px] px-1.5 rounded text-[10px] font-bold bg-[#F8FAFC] text-[#CBD5E1] border border-[#F1F5F9] line-through">{s}</span>
                  ))}
                </div>
              </Field>
            </div>
          </PESection>
          <div className="mt-3 text-[11.5px] text-[#94A3B8]">
            <a href="05b-property-edit-room.html" className="underline hover:text-[#0F172A]">{L("← 通常の部屋編集を表示","← Show the standard room editor")}</a>
          </div>
        </div>
      </PropEditorShell>
    );
  }

  return (
    <PropEditorShell active={3} errors={[[L("間取り詳細","Layout detail"), L("間取り詳細が不足しています（居室数・帖数）","Layout detail is incomplete (room count / size)")]]}>
      <div className="grid gap-4 pb-40" style={{ gridTemplateColumns: panel ? "minmax(360px,1fr) minmax(240px,300px)" : "minmax(0,1fr)" }}>
        <div className="space-y-4 min-w-0">

          <PESection title={L("部屋基本情報","Room basics")}>
            <div className="grid grid-cols-4 gap-x-4 gap-y-3.5">
              <Field label={L("部屋番号","Room no.")} required><Input value="701"/></Field>
              <Field label={L("階数","Floor")}><Input value="7" suffix={L("階","F")}/></Field>
              <Field label={L("専有面積（壁芯）","Area (wall-center)")}><Input value="41.74" suffix="㎡"/></Field>
              <Field label={L("専有面積（登記）","Area (registry)")}><Input value="41.80" suffix="㎡"/></Field>
              <Field label={L("間取り","Layout")} required><Select value="2LDK"/></Field>
              <div className="col-span-3">
                <Field label={L("間取り詳細","Layout detail")} error={detailErr}>
                  <textarea readOnly rows={2}
                    className="w-full bg-white border border-[#DC2626] rounded-md p-2.5 text-[12.5px] text-[#0F172A] leading-relaxed outline-none resize-none"
                    value={L("洋室 5.10畳 / 洋室 7.00畳","Western 5.10 jo / Western 7.00 jo")}/>
                </Field>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 mt-3.5">
              <PEChips label={L("主たる開口部の方位","Main aspect")} value={L("南東","SE")}
                options={[L("北","N"), L("北東","NE"), L("東","E"), L("南東","SE"), L("南","S"), L("南西","SW"), L("西","W"), L("北西","NW")]}/>
              <div className="grid grid-cols-2 gap-x-4">
                <PEChips label={L("バルコニー","Balcony")} value={L("有","Yes")} options={[L("有","Yes"), L("無","No")]}/>
                <Field label={L("バルコニー面積","Balcony area")}><Input value="6.20" suffix="㎡"/></Field>
              </div>
            </div>
          </PESection>

          {/* #7 — 間取り詳細 rows; the missing LDK entry blocks save */}
          <Card style={{ borderColor: "#FECACA" }}>
            <CardHead title={L("間取り詳細（部屋ごと）","Layout detail (per room)")}
              sub={L("間取り（2LDK）と居室数・帖数が一致している必要があります","Must match the stated 間取り (2LDK) in room count and size")}
              action={<Tag tone="danger" size="sm"><Icon.AlertCircle s={11}/>{L("整合エラー","Mismatch")}</Tag>}/>
            <div className="p-4">
              <div className="border border-[#E5E7EB] rounded-md overflow-x-auto">
                <table className="w-full min-w-[620px] text-[12px]">
                  <thead className="bg-[#F7F8FA] text-[#64748B] text-[10px] uppercase tracking-wider">
                    <tr>
                      <th className="px-2.5 py-1.5 text-left font-semibold w-[130px]">{L("部屋種別","Room type")}</th>
                      <th className="px-2 py-1.5 text-left font-semibold w-[110px]">{L("畳数（帖）","Size (jo)")}</th>
                      <th className="px-2 py-1.5 text-left font-semibold w-[150px]">{L("床材","Flooring")}</th>
                      <th className="px-2 py-1.5 text-left font-semibold">{L("備考","Notes")}</th>
                      <th className="w-10"/>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((r, i) => {
                      const incomplete = !r[1] || !r[2];
                      return (
                        <tr key={i} className="border-t border-[#F1F5F9]">
                          <td className="px-2.5 py-1.5"><Select value={r[0] || L("種別を選択","Select type")}/></td>
                          <td className="px-2 py-1.5"><Input value={r[1]} placeholder="0.00" error={incomplete}/></td>
                          <td className="px-2 py-1.5"><Select value={r[2] || "—"}/></td>
                          <td className="px-2 py-1.5"><Input value={r[3]}/></td>
                          <td className="px-2 py-1.5 text-center">
                            <button onClick={() => setRooms(rs => rs.filter((_, j) => j !== i))} className="text-[#94A3B8] hover:text-[#DC2626]"><Icon.Trash s={13}/></button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-2.5 flex items-center gap-3">
                <button onClick={() => setRooms(rs => rs.concat([["", "", "", ""]]))}
                  className="inline-flex items-center gap-1 text-[12px] text-[#0F172A] hover:underline"><Icon.Plus s={12}/>{L("部屋を追加","Add room")}</button>
                <span className="flex items-center gap-1.5 text-[11.5px] text-[#DC2626]">
                  <Icon.AlertCircle s={12} stroke="#DC2626"/>{detailErr}
                </span>
              </div>
            </div>
          </Card>

          <PESection title={L("室内設備","Room equipment")} sub={L("要約表示（全項目は設備編集モーダル）","Summary — full list in the equipment modal")}
            action={<a href="10-equipment-modal.html"><Btn kind="ghost" size="sm" icon={Icon.Settings}>{L("全設備を編集","Edit all equipment")}</Btn></a>}>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2">
              {M5B_EQUIP.map(([label], i) => (
                <PECheck key={i} label={label} on={equip[i]} onChange={() => setEquip(e => e.map((v, j) => j === i ? !v : v))}/>
              ))}
            </div>
          </PESection>

          <PESection title={L("部屋の状況","Room status")}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              <PEChips label={L("現況","Occupancy")} value={L("空室","Vacant")}
                options={[L("入居中","Occupied"), L("空室","Vacant"), L("建築中","Under constr."), L("退去予定","Move-out due"), L("改装中","Renovating"), L("完成済","Completed")]}/>
              <div className="grid grid-cols-2 gap-x-4">
                <Field label={L("退去日","Move-out date")}>
                  <div className="flex items-center gap-1.5 min-w-0"><Input value="2026/06/20"/><PEEraToggle/></div>
                </Field>
                <Field label={L("入居可能日","Available from")}><Input value="2026/07/01"/></Field>
              </div>
              <Field label={L("鍵の場所","Key location")} required hint={L("現地集合の内見時は必須","required for on-site viewings")}>
                <PETextarea rows={2} value={L("現地1Fエントランス右手のキーボックス（暗証番号はチャットにて連絡）","Keybox to the right of the 1F entrance (code sent via chat)")}/>
              </Field>
              <Field label={L("鍵番号","Key no.")}><Input value="KB-701-04"/></Field>
            </div>
          </PESection>

          <PESection title={L("部屋固有の備考","Room-specific notes")}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[11px] font-semibold text-[#475569]">{L("募集備考","Listing notes (broker-facing)")}</span>
                  <button onClick={() => setPanel(o => !o)} className="text-[10.5px] font-semibold text-[#0F172A] hover:underline flex items-center gap-1">
                    {L("媒体連動項目確認","Channel mapping")}<Icon.ChevronRight s={10}/>
                  </button>
                </div>
                <PETextarea rows={4} value={L("角部屋・南東向きで日当たり良好。24時間ゴミ出し可。ネット無料（光配線）。内見は事前連絡でいつでも可。",
                  "Corner unit facing south-east with good light. 24h refuse disposal. Free fibre internet. Viewings anytime with prior notice.")}/>
                <div className="mt-1.5 flex items-start gap-1.5 text-[11px] text-[#B45309]">
                  <Icon.Alert s={11} stroke="#B45309"/>
                  <span>{L("要確認：募集備考の反映先媒体・掲載欄の詳細はFINDERS（上松様）回答待ち",
                           "To confirm: which sites and fields the 募集備考 text feeds — awaiting FINDERS (Mr. Uematsu)")}</span>
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[11px] font-semibold text-[#475569]">{L("内部メモ","Internal memo")}</span>
                  <span className="text-[10px] text-[#94A3B8]">{L("媒体には出力されません","Never published")}</span>
                </div>
                <PETextarea rows={4} value={L("オーナー様は賃料交渉に応じる可能性あり（〜5,000円まで）。前入居者は騒音クレーム歴あり。",
                  "Owner may negotiate rent (up to ¥5,000). Previous tenant had a noise complaint on record.")}/>
              </div>
            </div>
          </PESection>

          <PESection title={L("部屋写真（簡易プレビュー）","Room photos (preview)")} sub={L("この部屋に割り当てられた画像","Images assigned to this room")}
            action={<a href="08-property-edit-images.html" className="text-[11.5px] text-[#0F172A] hover:underline flex items-center gap-1"><Icon.Camera s={12}/>{L("写真タブで編集 →","Edit in Images →")}</a>}>
            <div className="grid grid-cols-6 gap-2.5">
              {[[L("リビング","Living"), "room"], [L("キッチン","Kitchen"), "room"], [L("寝室","Bedroom"), "room"],
                [L("浴室","Bath"), "room"], [L("玄関","Entrance"), "room"], [L("バルコニー","Balcony"), "exterior"]].map(([label, kind], i) => (
                <div key={i}>
                  <PhotoPh h={78} tone={i} kind={kind}/>
                  <div className="text-[10.5px] text-[#64748B] mt-1">{label}</div>
                </div>
              ))}
            </div>
          </PESection>

          <PESection title={L("部屋ごとの賃料設定（この部屋の場合）","Per-room rent settings")}>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3.5">
              <Field label={L("賃料","Rent")} required><Input value="262,000" prefix="¥"/></Field>
              <Field label={L("管理費","Mgmt fee")}><Input value="20,000" prefix="¥"/></Field>
              <Field label={L("共益費","Common fee")}><Input value="0" prefix="¥"/></Field>
              <Field label={L("敷金","Deposit")}><Input value="1.00" suffix={L("ヶ月","mo")}/></Field>
              <Field label={L("礼金","Key money")}><Input value="1.00" suffix={L("ヶ月","mo")}/></Field>
              <Field label={L("保証金","Security deposit")}><Input value="0" prefix="¥"/></Field>
            </div>
            <div className="mt-3.5">
              <PECheck on={override} onChange={() => setOverride(v => !v)}
                label={L("建物全体の賃料設定から上書きする","Override the building-level rent settings")}/>
              <div className="text-[11px] text-[#94A3B8] mt-1 ml-6">
                {L("オフにすると建物タブの設定（賃料 ¥255,000 / 管理費 ¥18,000）が適用されます。",
                   "When off, the building-tab values apply (rent ¥255,000 / mgmt fee ¥18,000).")}
              </div>
            </div>
          </PESection>

          <div className="text-[11.5px] text-[#94A3B8]">
            {L("駐車場区画としてこの編集画面を開いた場合の表示：","Parking-space variant of this editor: ")}
            <a href="05b-property-edit-room.html?type=parking" className="underline hover:text-[#0F172A]">{L("駐車場向けの限定項目を表示 →","show the reduced parking field set →")}</a>
          </div>
        </div>

        {/* #2 — channel-mapping panel (M6 / M10 pattern) */}
        {panel && (
          <div className="self-start sticky top-4">
            <Card>
              <CardHead title={L("媒体連動項目確認","Channel mapping")} sub={L("募集備考の反映先","Where 募集備考 is published")}
                action={<button onClick={() => setPanel(false)} className="text-[#94A3B8] hover:text-[#0F172A]"><Icon.X s={13}/></button>}/>
              <div className="p-4 space-y-3">
                <div>
                  <div className="text-[11px] font-semibold text-[#475569] mb-1.5">{L("募集備考","Listing notes")}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {[["SUUMO", true], ["HOMES", true], [L("アットホーム","at home"), true], [L("レインズ","REINS"), true], [L("自社HP","Own site"), false]].map(([n, on], i) => (
                      <span key={i} className={`px-2 py-[3px] rounded text-[11px] font-semibold border ${on
                        ? "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]"
                        : "bg-[#F8FAFC] text-[#CBD5E1] border-[#F1F5F9]"}`}>{n}</span>
                    ))}
                  </div>
                  <div className="text-[10.5px] text-[#94A3B8] mt-1.5">{L("点灯＝掲載される媒体。掲載欄は媒体ごとに異なります。","Lit = published there. The target field differs per site.")}</div>
                </div>
                <div className="pt-3 border-t border-[#F1F5F9]">
                  <div className="text-[11px] font-semibold text-[#475569] mb-1.5">{L("内部メモ","Internal memo")}</div>
                  <div className="text-[11.5px] text-[#94A3B8]">{L("連動なし（媒体には一切出力されません）","No channels — never published anywhere")}</div>
                </div>
                <div className="pt-3 border-t border-[#F1F5F9] text-[11px] text-[#B45309] flex items-start gap-1.5">
                  <Icon.Alert s={11} stroke="#B45309"/>
                  <span>{L("要確認：掲載欄の対応表はFINDERS回答待ち","To confirm: the field-mapping table is awaiting FINDERS")}</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </PropEditorShell>
  );
};
