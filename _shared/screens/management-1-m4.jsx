// _shared/screens/management-1-m4.jsx — M4 物件編集 概要 (rebuilt 2026-08-20)
// Chrome (header, M-16 tag editor, tab strip, sticky toolbar, エラードロワー) comes from
// property-editor-shell.jsx. This file owns the 概要 rail + form only.
// Delivers: #7 間取り↔間取り詳細 整合チェック (save blocked, red inline error) · D2-consistent
// editable 広告料 (0〜500%).

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select } = window;
const { PropEditorShell, PESection, PEChips, PEEraToggle, PETextarea, PECheck } = window;
const L = window.L;

window.ScreenM4Overview = function () {
  const layoutErr = L("LDKの記載がありません（間取り 2LDK と不一致）", "LDK entry missing — does not match 間取り 2LDK");
  const media = [
    ["ES", L("自社","Own site"),  "live", "5/01", "6/30"],
    ["B",  "B2B",                 "live", "5/01", "6/30"],
    ["B2B", "",                   "live", "5/01", "—"],
    ["レ", "Rainz",               "live", "5/01", "—"],
    ["s.suumo", "SUUMO",          "live", "5/01", "6/15"],
    ["at", "AtHome",              "live", "5/01", "—"],
    ["s",  "HOMES",               "off",  "—",    "—"],
  ];

  return (
    <PropEditorShell active={1} errors={[[L("間取り詳細","Layout detail"), L("LDKの記載がありません","LDK entry missing")]]}>
      <div className="grid gap-5 pb-40" style={{ gridTemplateColumns: "minmax(230px,280px) minmax(360px,1fr)" }}>

        {/* ══ LEFT RAIL (sticky) ══ */}
        <div className="space-y-4 self-start sticky top-4">
          <Card className="overflow-hidden">
            <CardHead title={L("媒体ハイライト","Media highlights")} action={<a href="11-publish-controls.html" className="text-[11px] text-[#475569] hover:text-[#0F172A]">{L("出稿管理 →","Publishing →")}</a>}/>
            <table className="w-full text-[11.5px]">
              <thead className="bg-[#F7F8FA] text-[#64748B] text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="px-2.5 py-1.5 text-left font-semibold">{L("媒体","Site")}</th>
                  <th className="px-1 py-1.5 text-left font-semibold">{L("状態","State")}</th>
                  <th className="px-1 py-1.5 text-left font-semibold">{L("開始","Start")}</th>
                  <th className="px-2 py-1.5 text-left font-semibold">{L("掲載期限","Expiry")}</th>
                </tr>
              </thead>
              <tbody>
                {media.map(([n, note, st, s, e], i) => (
                  <tr key={i} className="border-t border-[#F1F5F9]">
                    <td className="px-2.5 py-[7px]">
                      <span className="font-semibold text-[#0F172A]">{n}</span>
                      {note && <span className="text-[10px] text-[#94A3B8] ml-1">{note}</span>}
                    </td>
                    <td className="px-1 py-[7px]">
                      <span className="inline-flex items-center gap-1 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: st === "live" ? "#16A34A" : "#94A3B8" }}/>
                        <span className={st === "live" ? "text-[#15803D]" : "text-[#94A3B8]"}>{st === "live" ? L("掲載","Live") : L("未","Off")}</span>
                      </span>
                    </td>
                    <td className="px-1 py-[7px] text-[#475569] tabnum">{s}</td>
                    <td className="px-2 py-[7px] text-[#475569] tabnum">{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card>
            <CardHead title={L("画像品質スコア","Image quality score")} sub={L("掲載基準スコア","Listing standard score")}/>
            <div className="p-4 flex items-center gap-3.5">
              <div className="relative w-[68px] h-[68px] shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F1F5F9" strokeWidth="3.2"/>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#16A34A" strokeWidth="3.2"
                          strokeDasharray="100 100" strokeDashoffset="0" transform="rotate(-90 18 18)" strokeLinecap="round"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[17px] font-bold tabnum leading-none text-[#15803D]">40</span>
                  <span className="text-[9.5px] text-[#94A3B8] tabnum">/ 40</span>
                </div>
              </div>
              <div className="min-w-0">
                <Tag tone="ok" size="md"><Icon.CheckCircle s={11}/> {L("基準クリア！","Standard cleared!")}</Tag>
                <a href="08-property-edit-images.html" className="block text-[11.5px] text-[#475569] hover:text-[#0F172A] mt-2">{L("画像タブで内訳を見る →","See breakdown →")}</a>
              </div>
            </div>
          </Card>

          <Card>
            <CardHead title={L("最近の変更","Recent changes")} action={<button className="text-[11px] text-[#475569] hover:text-[#0F172A]">{L("すべて","All")}</button>}/>
            <div className="divide-y divide-[#F1F5F9]">
              {[
                [L("賃料を更新","Rent updated"), "¥258,000 → ¥262,000", L("大久保 ゆか","Okubo Yuka"), "14:32"],
                [L("画像を3枚追加","3 images added"), L("リビング・洋室・玄関","Living, room, entrance"), L("大久保 ゆか","Okubo Yuka"), "11:07"],
                [L("SUUMO 出稿開始","Published to SUUMO"), L("掲載期限 6/15","Expires 6/15"), L("システム","System"), L("昨日","Yest")],
              ].map(([t, d, who, when], i) => (
                <div key={i} className="px-4 py-2.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[12px] font-semibold text-[#0F172A] flex-1">{t}</span>
                    <span className="text-[10.5px] text-[#94A3B8] tabnum">{when}</span>
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-[2px] tabnum">{d}</div>
                  <div className="text-[10.5px] text-[#94A3B8]">{who}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ══ RIGHT PANE — the form ══ */}
        <div className="space-y-4 min-w-0">

          <PESection title={L("基本情報","Basics")}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              <Field label={L("物件名","Property name")} required hint={L("建物マスタと連動","linked to building")}>
                <div className="flex items-center gap-2 min-w-0">
                  <Input value="ZOOM本郷"/>
                  <a href="05-property-edit-building.html" className="text-[11px] text-[#475569] hover:text-[#0F172A] whitespace-nowrap flex items-center gap-1"><Icon.External s={11}/>{L("建物","Building")}</a>
                </div>
              </Field>
              <Field label={L("部屋番号","Room no.")} required><Input value="701"/></Field>
              <Field label={L("募集条件更新日","Listing-terms updated")} hint={L("自動","auto")}>
                <Input value={L("2026/05/26　大久保 ゆか","2026/05/26 — Okubo Yuka")}/>
              </Field>
              <Field label={L("広告用更新日","Ad-refresh date")}><Input value="2026/05/01"/></Field>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 mt-3.5">
              <PEChips label={L("現況","Occupancy")} value={L("空室","Vacant")}
                options={[L("入居中","Occupied"), L("空室","Vacant"), L("建築中","Under construction"), L("退去予定","Move-out due"), L("改装中","Renovating"), L("完成済","Completed")]}/>
              <div className="grid grid-cols-2 gap-x-4">
                <Field label={L("退去日","Move-out date")}>
                  <div className="flex items-center gap-1.5 min-w-0"><Input value="2026/06/20"/><PEEraToggle/></div>
                </Field>
                <Field label={L("入居可能日","Available from")}><Input value="2026/07/01"/></Field>
              </div>
            </div>
          </PESection>

          <PESection title={L("賃料・費用","Rent & fees")}>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3.5">
              <Field label={L("賃料","Rent")} required><Input value="262,000" prefix="¥"/></Field>
              <Field label={L("管理費","Mgmt fee")}><Input value="20,000" prefix="¥"/></Field>
              <Field label={L("間取り","Layout")} required><Select value="2LDK"/></Field>
            </div>
            <div className="mt-3.5">
              <Field label={L("間取り詳細","Layout detail")} error={layoutErr}
                hint={L("居室数・帖数は間取りと一致させてください","room count & size must match 間取り")}>
                <Input value={L("洋室 5.10畳／洋室 7畳","Western 5.10 jo / Western 7 jo")} error/>
              </Field>
            </div>
            <div className="grid grid-cols-4 gap-x-4 gap-y-3.5 mt-3.5">
              <Field label={L("専有面積（壁芯）","Area (wall-center)")}><Input value="41.74" suffix="㎡"/></Field>
              <Field label={L("専有面積（登記）","Area (registry)")}><Input value="41.80" suffix="㎡"/></Field>
              <Field label={L("敷金","Deposit")}><Input value="1.00" suffix={L("ヶ月","mo")}/></Field>
              <Field label={L("礼金","Key money")}><Input value="1.00" suffix={L("ヶ月","mo")}/></Field>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-[#475569]">{L("その他費用","Other fees")}</span>
                <Btn kind="ghost" size="sm" icon={Icon.Plus}>{L("行を追加","Add row")}</Btn>
              </div>
              <div className="border border-[#E5E7EB] rounded-md overflow-x-auto">
                <table className="w-full min-w-[520px] text-[12px]">
                  <thead className="bg-[#F7F8FA] text-[#64748B] text-[10px] uppercase tracking-wider">
                    <tr>
                      <th className="px-2.5 py-1.5 text-left font-semibold">{L("名称","Name")}</th>
                      <th className="px-2 py-1.5 text-left font-semibold w-[130px]">{L("金額","Amount")}</th>
                      <th className="px-2 py-1.5 text-left font-semibold w-[110px]">{L("発生時期","When")}</th>
                      <th className="w-10"/>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [L("鍵交換費用（税込）","Key replacement (incl. tax)"), "27,500", L("契約時","On contract")],
                      [L("家財保険＋付帯サービス","Contents insurance + services"), "1,735", L("毎月","Monthly")],
                    ].map((r, i) => (
                      <tr key={i} className="border-t border-[#F1F5F9]">
                        <td className="px-2.5 py-1.5"><Input value={r[0]}/></td>
                        <td className="px-2 py-1.5"><Input value={r[1]} prefix="¥"/></td>
                        <td className="px-2 py-1.5"><Select value={r[2]}/></td>
                        <td className="px-2 py-1.5 text-center">
                          <button className="text-[#94A3B8] hover:text-[#DC2626]" title={L("削除","Delete")}><Icon.Trash s={13}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </PESection>

          <PESection title={L("契約条件","Contract terms")}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              <div className="grid grid-cols-2 gap-x-4">
                <Field label={L("契約期間","Term")}><Input value="2.00" suffix={L("年","yr")}/></Field>
                <Field label={L("用途","Use")}><Input value={L("居住用","Residential")}/></Field>
              </div>
              <PEChips label={L("賃貸契約区分","Lease type")} value={L("普通借家契約","Standard lease")}
                options={[L("普通借家契約","Standard lease"), L("定期借家","Fixed-term")]}/>
              <div>
                <div className="text-[11px] font-semibold text-[#475569] mb-1">{L("保証会社（複数選択）","Guarantee companies (multi)")}</div>
                <div className="flex flex-wrap gap-1">
                  {[[L("トーシンライフ","Toshin Life"), true], [L("オリコフォレントインシュア","Orico Forent"), true], [L("全保連","Zenhoren"), true], [L("日本セーフティー","Nihon Safety"), false]].map(([n, on], i) => (
                    <span key={i} className={`inline-flex items-center gap-1 px-2.5 py-[5px] rounded-full border text-[11.5px] cursor-pointer ${on ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white border-dashed border-[#CBD5E1] text-[#475569]"}`}>
                      {on ? <Icon.Check s={10} stroke="#fff"/> : <Icon.Plus s={10}/>}{n}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4">
                <Field label={L("フリーレント期間","Free-rent period")}><Select value={L("1ヶ月","1 month")}/></Field>
                <Field label={L("フリーレント詳細","Free-rent detail")}><Input value={L("入居月の賃料無料","Move-in month free")}/></Field>
              </div>
            </div>
          </PESection>

          <PESection title={L("入居諸条件","Occupancy conditions")} sub={L("可 / 不可 / 相談","Allowed / not allowed / negotiable")}>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3.5">
              {[
                [L("ペット","Pets"),           [L("可","Yes"), L("不可","No"), L("相談","Ask")],  L("相談","Ask")],
                [L("二人入居","Two tenants"),   [L("可","Yes"), L("不可","No")],                  L("可","Yes")],
                [L("喫煙者","Smokers"),         [L("可","Yes"), L("不可","No")],                  L("不可","No")],
                [L("法人","Corporate"),         [L("可","Yes"), L("不可","No")],                  L("可","Yes")],
                [L("楽器","Instruments"),       [L("可","Yes"), L("不可","No"), L("相談","Ask")],  L("不可","No")],
                [L("事務所","Office use"),      [L("可","Yes"), L("不可","No")],                  L("不可","No")],
                [L("ルームシェア","Room share"), [L("可","Yes"), L("不可","No"), L("相談","Ask")],  L("相談","Ask")],
                [L("外国人入居","Non-Japanese"), [L("可","Yes"), L("不可","No")],                  L("可","Yes")],
                [L("学生専用","Students only"),  [L("可","Yes"), L("不可","No")],                  L("不可","No")],
                [L("高齢者","Seniors"),         [L("可","Yes"), L("不可","No"), L("相談","Ask")],  L("相談","Ask")],
                [L("性別","Gender"),            [L("指定なし","Any"), L("男性","Male"), L("女性","Female")], L("指定なし","Any")],
                [L("子供","Children"),          [L("可","Yes"), L("不可","No"), L("相談","Ask")],  L("可","Yes")],
              ].map(([label, options, value], i) => <PEChips key={i} label={label} options={options} value={value}/>)}
            </div>
          </PESection>

          <PESection title={L("物件概要","Building overview")}>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3.5">
              <Field label={L("総戸数","Total units")}><Input value="48" suffix={L("戸","units")}/></Field>
              <Field label={L("地上階数","Floors above ground")}><Input value="9" suffix={L("階","F")}/></Field>
              <Field label={L("主たる開口部の方位","Main aspect")}><Select value={L("南東","South-east")}/></Field>
              <Field label={L("築年月","Built")}>
                <div className="flex items-center gap-1.5 min-w-0"><Input value="2013/03"/><PEEraToggle/></div>
              </Field>
              <PEChips label={L("中古・新築","New / used")} value={L("中古","Used")} options={[L("新築","New"), L("中古","Used")]}/>
              <Field label={L("構造","Structure")}><Select value={L("RC造","RC")}/></Field>
            </div>
          </PESection>

          <PESection title={L("仲介業者様へ","For broker partners")} sub={L("客付・広告条件と元付情報","Co-broking terms & source agency")}>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3.5">
              {/* D2 — 広告料 is an editable numeric % input (0〜500), never a fixed bar */}
              <Field label={L("広告料（AD）","Ad fee (AD)")} hint={L("0〜500%","0–500%")}><Input value="200" suffix="%"/></Field>
              <Field label={L("取引態様","Transaction type")}><Select value={L("仲介元付（専任）","Agency (exclusive)")}/></Field>
              <PEChips label={L("転載可否","Repost allowed")} value={L("可","Yes")} options={[L("可","Yes"), L("不可","No")]}/>
            </div>

            <details open className="mt-4 border border-[#E5E7EB] rounded-md">
              <summary className="px-3 py-2 text-[12px] font-semibold text-[#0F172A] cursor-pointer bg-[#F8FAFC] flex items-center gap-1.5">
                <Icon.ChevronDown s={13} stroke="#475569"/>{L("元付情報","Source agency")}
              </summary>
              <div className="p-3 grid grid-cols-3 gap-x-4 gap-y-3.5">
                <Field label={L("会社名","Company")}><Input value={L("株式会社レンズDX 本郷営業所","LENZ DX Co., Hongo branch")}/></Field>
                <Field label={L("担当者","Contact")}><Input value={L("大久保 ゆか","Okubo Yuka")}/></Field>
                <Field label={L("郵便番号","Postcode")}><Input value="113-0033"/></Field>
                <Field label={L("住所","Address")} full><Input value={L("東京都文京区本郷2-26-13","2-26-13 Hongo, Bunkyo-ku, Tokyo")}/></Field>
                <Field label="TEL"><Input value="03-5842-1120"/></Field>
                <Field label="FAX"><Input value="03-5842-1121"/></Field>
              </div>
            </details>

            <div className="mt-3.5">
              <div className="mb-2"><PECheck on label={L("客付可（他社仲介による客付を受け付ける）","Accept co-broking from other agencies")}/></div>
              <Field label={L("客付会社へのメッセージ","Message to co-broking agencies")}>
                <PETextarea rows={3} value={L("内見の際は事前にチャットでご連絡ください。鍵は現地キーボックス（暗証番号はチャットにて）。AD200%、申込は本システムよりお願いいたします。",
                  "Please message us in chat before viewing. Key is in the on-site keybox (code via chat). AD 200%. Please submit applications through this system.")}/>
              </Field>
            </div>
          </PESection>
        </div>
      </div>
    </PropEditorShell>
  );
};
