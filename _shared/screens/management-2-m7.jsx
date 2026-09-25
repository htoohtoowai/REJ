// _shared/screens/management-2-m7.jsx — M7 物件編集 掲載情報等 (rebuilt 2026-08-20)
// Chrome from property-editor-shell.jsx. Delivers: H-6 ZOOM RENT / ZOOM SELECTION as 独自サイト
// sub-tabs following the same per-site copy pattern as いい生活ウェブサイト / 独自サイト1・2.

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select } = window;
const { PropEditorShell, PESection, PEChips, PETextarea, PECheck } = window;
const L = window.L;

// [label, live?, kind]
const M7_SITES = () => [
  [L("業者間","B2B"),                       true,  "b2b"],
  [L("レインズ","REINS"),                   true,  "reins"],
  ["SUUMO",                                 true,  "suumo"],
  [L("アットホーム","at home"),              true,  "athome"],
  ["HOMES",                                 false, "homes"],
  [L("いい生活ウェブサイト","ii-Seikatsu web"), true,  "own"],
  [L("独自サイト1","Own site 1"),            true,  "own"],
  [L("独自サイト2","Own site 2"),            false, "own"],
  ["ZOOM RENT",                             true,  "own"],
  ["ZOOM SELECTION",                        false, "own"],
];

const M7Copy = ({ children }) => (
  <button className="inline-flex items-center gap-1 h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#475569] hover:bg-[#F1F5F9] whitespace-nowrap">
    <Icon.Copy s={10}/>{children}
  </button>
);

const M7Field = ({ label, hint, rows = 3, value, action }) => (
  <div>
    <div className="flex items-baseline justify-between mb-1 gap-2">
      <span className="text-[11px] font-semibold text-[#475569]">{label}</span>
      {action || (hint && <span className="text-[10px] text-[#94A3B8]">{hint}</span>)}
    </div>
    <PETextarea rows={rows} value={value}/>
  </div>
);

window.ScreenM7Listing = function () {
  const sites = M7_SITES();
  const [tab, setTab] = React.useState(0);
  const [previews, setPreviews] = React.useState(null);
  const kind = sites[tab][2];
  const siteName = sites[tab][0];

  const common = [
    [L("セールスポイント","Selling points"), L("角部屋・南東向き／オートロック・宅配ボックス／インターネット無料","Corner unit facing SE / auto-lock & parcel box / free internet"), 2],
    [L("特徴コメント","Feature comment"), L("本郷三丁目駅徒歩3分。2013年築のRCマンション、7階角部屋。","3 min walk from Hongo-sanchome. RC building (2013), 7F corner unit."), 2],
    [L("チラシ用コメント","Flyer comment"), L("【即入居可】人気のZOOMシリーズ／初期費用カード決済OK","Move-in ready. Popular ZOOM series. Card payment accepted."), 2],
    [L("設備コメント","Equipment comment"), L("2口ガス　バス・トイレ別　浴室換気乾燥機　追焚　エアコン　フローリング　室内洗濯機置場　角部屋",
      "2-burner gas / separate bath & WC / bath dryer / reheating / A/C / flooring / indoor laundry space / corner unit"), 3],
    [L("広告備考","Ad notes"), L("■外国籍相談可（申込条件: 在留カード必須…）　■一部法人保証会社未加入時・敷金・礼金を1ヶ月追加",
      "Non-Japanese residents considered (residence card required). Deposit and key money +1 month if the corporate guarantor is not enrolled."), 3],
  ];

  return (
    <PropEditorShell active={5}>
      <div className="space-y-4 pb-40">

        {/* ══ common comments — apply to every medium ══ */}
        <Card>
          <CardHead title={L("共通コメント","Common comments")} sub={L("全媒体に適用されます（媒体別の上書きは下のサブタブ）","Applies to every medium — per-site overrides are below")}/>
          <div className="p-4 grid grid-cols-2 gap-x-4 gap-y-3.5">
            {common.map(([label, value, rows], i) => (
              <div key={i} className={i === 4 ? "" : ""}>
                <div className="flex items-baseline justify-between mb-1 gap-2">
                  <span className="text-[11px] font-semibold text-[#475569] flex items-center gap-1.5">
                    <Icon.Edit s={11} stroke="#94A3B8"/>{label}
                  </span>
                  <button className="text-[10.5px] font-semibold text-[#0F172A] hover:underline flex items-center gap-1 whitespace-nowrap">
                    {L("自動生成","Auto-fill")}<Icon.ChevronRight s={10}/>
                  </button>
                </div>
                <PETextarea rows={rows} value={value}/>
              </div>
            ))}
          </div>
          <div className="px-4 pb-4 text-[11px] text-[#94A3B8]">
            {L("「自動生成」は共通コメントを媒体別項目へ上書きコピーします。媒体別に手を入れた項目は上書き前に確認が入ります。",
               "Auto-fill copies the common comment into the per-site fields. Fields you edited per site ask for confirmation first.")}
          </div>
        </Card>

        {/* ══ per-site sub-tabs — the "advanced" override zone ══ */}
        <div className="rounded-lg border border-[#E5E7EB] bg-[#F8FAFC]">
          <div className="px-3 pt-3 pb-2 flex items-center gap-1.5 flex-wrap">
            {sites.map(([label, live], i) => (
              <button key={i} onClick={() => setTab(i)}
                className={`inline-flex items-center gap-1.5 h-7 px-3 rounded-full text-[12px] border whitespace-nowrap ${
                  i === tab ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white border-[#E5E7EB] text-[#475569] hover:border-[#CBD5E1]"}`}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: live ? "#16A34A" : "#94A3B8" }}/>{label}
              </button>
            ))}
            <span className="ml-auto text-[11px] text-[#94A3B8] pr-1">{L("媒体別の上書き項目","Per-site overrides")}</span>
          </div>

          <div className="bg-white border-t border-[#E5E7EB] rounded-b-lg">
            {/* header strip */}
            <div className="px-4 py-2.5 border-b border-[#F1F5F9] flex items-center gap-2 flex-wrap">
              <span className="text-[12.5px] font-semibold text-[#0F172A]">
                {kind === "b2b"    ? L("賃貸クラウド 業者間専用項目","Rental cloud — B2B-only fields")
                : kind === "reins" ? L("レインズ 専用項目","REINS-only fields")
                : kind === "suumo" ? L("SUUMO 専用項目","SUUMO-only fields")
                : kind === "athome"? L("アットホーム 専用項目","at home-only fields")
                : kind === "homes" ? L("HOMES 専用項目","HOMES-only fields")
                : L(`${siteName} 専用項目（独自サイト共通パターン）`, `${siteName} fields (own-site pattern)`)}
              </span>
              <Tag tone={sites[tab][1] ? "ok" : "neutral"} size="sm">{sites[tab][1] ? L("掲載中","Live") : L("未掲載","Not published")}</Tag>
              <span className="ml-auto"><M7Copy>{L("セールスポイントをコピー","Copy selling points")}</M7Copy></span>
            </div>

            <div className="p-4">
              {kind === "b2b" && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-4 gap-x-4 gap-y-3.5">
                    <PEChips label={L("広告","Advertising")} value={L("可","Allowed")} options={[L("可","Allowed"), L("不可","Not allowed")]}/>
                    <PEChips label={L("転載可否","Repost")} value={L("可","Allowed")} options={[L("可","Allowed"), L("不可","Not allowed")]}/>
                    <div className="col-span-2 flex items-end gap-4 pb-1">
                      <PECheck on label={L("クローズアップ物件掲載","Feature as close-up listing")}/>
                      <PECheck on={false} label={L("転載する","Repost to partners")}/>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                    <M7Field label={L("PDF用 セールスポイント","Selling points (PDF)")} rows={2}
                      value={L("ＴＶモニタ付オートロック 宅配ボックス インターネット無料 ＣＡＴＶ導入","Video auto-lock / parcel box / free internet / CATV")}/>
                    <M7Field label={L("カスタムテキスト","Custom text")} rows={2}
                      value={L("【ペット可】【デザイナーズマンション】","[Pets OK] [Designer apartment]")}/>
                    <M7Field label={L("備考","Notes")} rows={4}
                      value={L("鍵は現地キーボックス（暗証番号はチャットにて）。AD200%。申込は本システムより。審査は最短即日。",
                               "Key in the on-site keybox (code via chat). AD 200%. Apply through this system; screening can complete same-day.")}/>
                    <M7Field label={L("キャンペーン情報","Campaign")} rows={4}
                      value={L("6/30までのご契約でフリーレント1ヶ月。仲介手数料は賃料1ヶ月分（税別）。","Free rent for 1 month on contracts by 6/30. Brokerage fee: 1 month's rent + tax.")}/>
                  </div>
                </div>
              )}

              {kind === "reins" && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                    {[1, 2, 3, 4].map(n => (
                      <M7Field key={n} label={L(`備考${n}`, `Notes ${n}`)} rows={2}
                        value={n === 1 ? L("角部屋・南東向き。オートロック・宅配ボックス・インターネット無料。","Corner unit facing SE. Auto-lock, parcel box, free internet.")
                             : n === 2 ? L("鍵は現地キーボックス。内見は事前連絡でいつでも可。","Key in on-site keybox. Viewings anytime with prior notice.")
                             : n === 3 ? L("AD200%（元付100%＋客付100%）。","AD 200% (listing 100% + co-broke 100%).") : ""}/>
                    ))}
                    <M7Field label={L("設備コメント","Equipment comment")} rows={2}
                      value={L("2口ガス　バス・トイレ別　浴室換気乾燥機　追焚　エアコン","2-burner gas / separate bath & WC / bath dryer / reheating / A/C")}/>
                    <M7Field label={L("条件コメント","Conditions comment")} rows={2}
                      value={L("外国籍相談可（在留カード必須）。ペット相談可。","Non-Japanese residents considered (residence card required). Pets negotiable.")}/>
                  </div>
                  <div className="grid grid-cols-3 gap-x-4 gap-y-3.5">
                    <PEChips label={L("不動産ID","Real-estate ID")} value={L("表示する","Show")} options={[L("表示する","Show"), L("表示しない","Hide")]}/>
                    <Field label={L("レインズ物件番号","REINS listing no.")} hint={L("自動","auto")}><Input value="RZ-2026-0518-0071"/></Field>
                    <Field label={L("広告転載区分（掲載先専用項目）","Ad repost class (site-only)")}><Select value={L("広告可","Advertising allowed")}/></Field>
                  </div>
                  <div className="text-[11px] text-[#94A3B8]">
                    {L("レインズの一部項目は『自動生成』ボタンで共通フィールドから上書きできます",
                       "Some REINS fields can be overwritten from the common fields using the Auto-fill button")}
                  </div>
                </div>
              )}

              {kind === "suumo" && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                    <M7Field label={L("ネット用キャッチ","Web catch copy")} rows={2}
                      value={L("【管理物件】管理会社である当社にお任せください！","Managed in-house — leave it to us, the management company!")}/>
                    <M7Field label={L("外観パースコメント","Exterior render comment")} rows={2}
                      value={L("2013年築・RC造9階建。1階エントランスはオートロック。","Built 2013, RC, 9 floors. Auto-lock entrance on the ground floor.")}/>
                    <M7Field label={L("ネット用フリーコメント","Web free comment")} rows={5}
                      value={L("本郷三丁目駅徒歩3分の好立地。角部屋・南東向きで日当たり良好、室内は2024年に水回りを一新。24時間ゴミ出し可、宅配ボックス・インターネット無料。",
                               "3 min from Hongo-sanchome. SE-facing corner unit with good light; wet areas fully renewed in 2024. 24h refuse disposal, parcel box, free internet.")}/>
                    <M7Field label={L("備考","Notes")} rows={5}
                      value={L("初期費用のカード決済に対応。保証会社利用必須（初回50%・月額1%）。","Card payment accepted for move-in costs. Guarantor company required (50% initial, 1% monthly).")}/>
                  </div>
                  <a href="#" className="text-[11px] text-[#94A3B8] underline hover:text-[#475569]">{L("SUUMOに関するFAQ","SUUMO FAQ")}</a>
                </div>
              )}

              {kind === "athome" && (
                <div className="space-y-3.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <M7Copy>{L("費用関連項目をコピー","Copy cost fields")}</M7Copy>
                    <M7Copy>{L("セールスポイントをコピー","Copy selling points")}</M7Copy>
                    <M7Copy>{L("担当者コメントをコピー","Copy staff comment")}</M7Copy>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                    <M7Field label={L("備考","Notes")} rows={3} value={L("角部屋・南東向き。オートロック・宅配ボックス。","SE-facing corner unit. Auto-lock and parcel box.")}/>
                    <M7Field label={L("備考2","Notes 2")} rows={3} value={L("鍵は現地キーボックス（暗証番号はチャットにて）。","Key in the on-site keybox (code via chat).")}/>
                    <M7Field label={L("おすすめコメント","Recommendation")} rows={3} value={L("水回り一新済み。ネット無料でテレワークにも最適。","Wet areas renewed. Free internet — ideal for remote work.")}/>
                    <M7Field label={L("エンド向けアピール","Appeal to end customers")} rows={3} value={L("即入居可。初期費用はカード決済OK。","Move-in ready. Move-in costs payable by card.")}/>
                  </div>
                </div>
              )}

              {kind === "homes" && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                    <M7Field label={L("ネットキャッチ","Web catch copy")} rows={2} value={L("駅徒歩3分・角部屋・ネット無料","3 min to station / corner unit / free internet")}/>
                    <Field label={L("HOMES物件番号","HOMES listing no.")} hint={L("自動","auto")}><Input value="HM-0021229-701"/></Field>
                    <M7Field label={L("フリーコメント","Free comment")} rows={4} value={L("2013年築のRCマンション7階、南東向き角部屋。室内は2024年リノベーション済み。","7F SE-facing corner unit in a 2013 RC building. Renovated in 2024.")}/>
                    <M7Field label={L("周辺情報","Neighbourhood")} rows={4} value={L("徒歩2分にローソン、5分にマルエツプチ。元町公園まで徒歩5分。","Lawson 2 min, Maruetsu Petit 5 min, Motomachi Park 5 min.")}/>
                  </div>
                  <div className="text-[11px] text-[#B45309] flex items-center gap-1.5">
                    <Icon.Alert s={11} stroke="#B45309"/>{L("この媒体は現在「未掲載」です。出稿すると上記内容が配信されます。","This site is currently not published. Publishing will distribute the copy above.")}
                  </div>
                </div>
              )}

              {kind === "own" && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                    <M7Field label={L("キャッチコピー","Catch copy")} rows={2} value={L("本郷三丁目 徒歩3分／南東角部屋／ネット無料","Hongo-sanchome 3 min / SE corner unit / free internet")}/>
                    <M7Field label={L("紹介文","Description")} rows={2} value={L("ZOOMシリーズの7階角部屋。2024年に水回りを一新しました。","7F corner unit in the ZOOM series. Wet areas renewed in 2024.")}/>
                    <M7Field label={L("設備コメント","Equipment comment")} rows={3} value={L("オートロック／宅配ボックス／浴室乾燥機／追焚／インターネット無料","Auto-lock / parcel box / bath dryer / reheating / free internet")}/>
                    <M7Field label={L("備考","Notes")} rows={3} value={L("お問い合わせは自社サイトのフォームから受け付けます。","Enquiries are received through the site's own form.")}/>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <PECheck on label={L("この物件をサイトに掲載する","Publish this property to the site")}/>
                    <PECheck on={false} label={L("トップページのおすすめ枠に表示","Feature on the homepage")}/>
                  </div>
                  <div className="text-[11px] text-[#94A3B8]">
                    {L("独自サイト（いい生活ウェブサイト・独自サイト1・2・ZOOM RENT・ZOOM SELECTION）は同じ項目構成です。掲載対象はタグで振り分けられます。",
                       "All own sites (ii-Seikatsu web, own sites 1–2, ZOOM RENT, ZOOM SELECTION) share this field set. Which properties go where is routed by tag.")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ══ collapsed previews of the other sites' field sets ══ */}
        <Card>
          <CardHead title={L("他媒体の項目プレビュー","Other sites — field-set preview")} sub={L("媒体ごとの上書き項目の並びを確認できます","Shows how each site's override fields are laid out")}/>
          <div className="divide-y divide-[#F1F5F9]">
            {[
              [L("レインズ","REINS"), [L("備考1〜4","Notes 1–4"), L("設備コメント","Equipment"), L("条件コメント","Conditions"), L("不動産ID","Real-estate ID"), L("レインズ物件番号","REINS no."), L("広告転載区分","Ad repost class")]],
              ["SUUMO", [L("ネット用キャッチ","Web catch"), L("ネット用フリーコメント","Web free comment"), L("外観パースコメント","Exterior render"), L("備考","Notes")]],
              [L("アットホーム","at home"), [L("備考 / 備考2","Notes / Notes 2"), L("おすすめコメント","Recommendation"), L("エンド向けアピール","End-customer appeal")]],
              ["HOMES", [L("ネットキャッチ","Web catch"), L("フリーコメント","Free comment"), L("周辺情報","Neighbourhood"), L("HOMES物件番号","HOMES no.")]],
            ].map(([name, fields], i) => (
              <div key={i}>
                <button onClick={() => setPreviews(previews === i ? null : i)} className="w-full px-4 py-2.5 flex items-center gap-2 text-left hover:bg-[#F8FAFC]">
                  {previews === i ? <Icon.ChevronDown s={13} stroke="#475569"/> : <Icon.ChevronRight s={13} stroke="#475569"/>}
                  <span className="text-[12.5px] font-semibold text-[#0F172A]">{name}</span>
                  <span className="text-[11px] text-[#94A3B8] tabnum">{L(`${fields.length}項目`, `${fields.length} fields`)}</span>
                </button>
                {previews === i && (
                  <div className="px-4 pb-3.5 pl-9 grid grid-cols-3 gap-2">
                    {fields.map((f, j) => (
                      <div key={j} className="rounded-md border border-[#E5E7EB] bg-[#F8FAFC] px-2.5 py-1.5">
                        <div className="text-[11px] font-semibold text-[#475569]">{f}</div>
                        <div className="h-4 mt-1 rounded bg-white border border-[#E5E7EB]"/>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PropEditorShell>
  );
};
