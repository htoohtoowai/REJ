// _shared/screens/management-2-m6.jsx — M6 物件編集 取引情報 (rebuilt 2026-08-20)
// D2 — 広告料（AD）is an EDITABLE numeric % input, valid range 0〜500 (AD200% / AD300% are
// normal in practice). Any accompanying bar is indicative only and never caps the value.

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select } = window;
const { PropEditorShell, PESection, PEChips, PETextarea, PECheck } = window;
const L = window.L;

window.ScreenM6Transaction = function () {
  const [apply, setApply]   = React.useState(0);
  const [online, setOnline] = React.useState([true, true, false]);
  const [baikai, setBaikai] = React.useState(0);
  const [naiken, setNaiken] = React.useState(0);
  const [yoyaku, setYoyaku] = React.useState(0);
  const [kyaku, setKyaku]   = React.useState(true);
  const [tensai, setTensai] = React.useState(0);
  const [motoOpen, setMotoOpen] = React.useState(false);

  // 手数料負担 / 手数料配分 — each pair must sum to 100
  const [burden, setBurden] = React.useState([50, 50]);   // 貸主 / 借主
  const [split, setSplit]   = React.useState([50, 50]);   // 元付 / 客付
  const [ad, setAd]         = React.useState(200);        // 広告料 (%) — 0〜500

  const burdenSum = burden[0] + burden[1];
  const splitSum  = split[0] + split[1];

  const NumPct = ({ value, onChange, label, bad }) => (
    <div>
      <div className="text-[11px] font-semibold text-[#475569] mb-1">{label}</div>
      <div className={`flex items-center bg-white border rounded-md h-9 px-2.5 ${bad ? "border-[#DC2626]" : "border-[#CBD5E1]"} focus-within:border-[#0F172A]`}>
        <input value={value} onChange={e => onChange(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)}
          className="bg-transparent outline-none text-[13px] text-[#0F172A] w-full min-w-0 tabnum text-right"/>
        <span className="text-[12px] text-[#94A3B8] ml-1.5">%</span>
      </div>
    </div>
  );

  return (
    <PropEditorShell active={4}>
      <div className="grid gap-4 pb-40" style={{ gridTemplateColumns: "minmax(360px,1fr) minmax(240px,320px)" }}>

        {/* ══ main column ══ */}
        <div className="space-y-4 min-w-0">

          <PESection title={L("申込方法","How to apply")}>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
              <PEChips label={L("入居申込方法","Application method")} value={apply} onChange={setApply}
                options={["Web", L("紙","Paper"), "FAX", L("電話","Phone")]}/>
              <div>
                <div className="text-[11px] font-semibold text-[#475569] mb-1.5">{L("Online対応","Online support")}</div>
                <div className="flex items-center gap-4 flex-wrap h-9">
                  {[L("オンライン相談","Online consultation"), L("オンライン内見","Online viewing"), L("IT重説","IT briefing")].map((n, i) => (
                    <PECheck key={i} label={n} on={online[i]} onChange={() => setOnline(o => o.map((v, j) => j === i ? !v : v))}/>
                  ))}
                </div>
              </div>
            </div>
          </PESection>

          <PESection title={L("取引条件","Transaction terms")}>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3.5">
              <Field label={L("取引態様","Transaction type")} required>
                <div className="flex items-center bg-white border border-[#CBD5E1] rounded-md h-9 px-2.5 w-full">
                  <select defaultValue="0" className="bg-transparent outline-none text-[13px] text-[#0F172A] flex-1 min-w-0 cursor-pointer">
                    {[L("仲介元付（専任）","Agency — exclusive"), L("仲介元付（一般）","Agency — general"), L("仲介客付","Co-broking"), L("売主","Seller"), L("代理","Agent")].map((o, i) => <option key={i} value={String(i)}>{o}</option>)}
                  </select>
                </div>
              </Field>
              <Field label={L("取引条件の有効期限","Terms expiry")}><Input value="2026/08/25" prefix={<Icon.Calendar s={12}/>}/></Field>
              <Field label={L("報酬形態","Commission form")}><Input value={L("当方不払","Not payable by us")}/></Field>
            </div>
            <div className="mt-3.5">
              <PEChips label={L("仲介手数料","Brokerage fee")} value={baikai} onChange={setBaikai}
                options={[L("賃料の1ヶ月分","1 month's rent"), L("賃料の0.5ヶ月分","0.5 month's rent"), L("賃料の50%","50% of rent"), L("その他金額","Other amount")]}/>
            </div>
          </PESection>

          <PESection title={L("手数料配分","Fee allocation")} sub={L("負担・配分はそれぞれ合計100%","Each pair must total 100%")}>
            <div className="grid grid-cols-2 gap-5">
              {/* 手数料負担 */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-[12px] font-semibold text-[#0F172A]">{L("手数料負担","Fee borne by")}</span>
                  {burdenSum === 100
                    ? <span className="text-[11px] text-[#15803D] flex items-center gap-1"><Icon.Check s={11} stroke="#16A34A"/>{L("合計 100%","Total 100%")}</span>
                    : <span className="text-[11px] text-[#DC2626] flex items-center gap-1 tabnum"><Icon.AlertCircle s={11} stroke="#DC2626"/>{L(`合計 ${burdenSum}% — 100%にしてください`, `Total ${burdenSum}% — must be 100%`)}</span>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <NumPct label={L("貸主","Landlord")} value={burden[0]} bad={burdenSum !== 100} onChange={v => setBurden([v, burden[1]])}/>
                  <NumPct label={L("借主","Tenant")}   value={burden[1]} bad={burdenSum !== 100} onChange={v => setBurden([burden[0], v])}/>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden bg-[#E5E7EB] mt-2.5">
                  <div style={{ width: Math.min(burden[0], 100) + "%" }} className="bg-[#0F172A]"/>
                  <div style={{ width: Math.min(burden[1], 100 - Math.min(burden[0], 100)) + "%" }} className="bg-[#94A3B8]"/>
                </div>
              </div>

              {/* 手数料配分 */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-[12px] font-semibold text-[#0F172A]">{L("手数料配分","Fee split")}</span>
                  {splitSum === 100
                    ? <span className="text-[11px] text-[#15803D] flex items-center gap-1"><Icon.Check s={11} stroke="#16A34A"/>{L("合計 100%","Total 100%")}</span>
                    : <span className="text-[11px] text-[#B45309] flex items-center gap-1 tabnum"><Icon.Alert s={11} stroke="#B45309"/>{L(`AD 合計 ${splitSum}%`, `AD total ${splitSum}%`)}</span>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <NumPct label={L("元付","Listing side")} value={split[0]} onChange={v => setSplit([v, split[1]])}/>
                  <NumPct label={L("客付","Co-broke side")} value={split[1]} onChange={v => setSplit([split[0], v])}/>
                </div>
                {splitSum > 100 && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <Tag tone="warn" size="md"><Icon.Alert s={11}/> {L(`AD ${splitSum}%`, `AD ${splitSum}%`)}</Tag>
                    <span className="text-[11px] text-[#B45309]">{L("元付＋客付が100%を超えています（広告料として扱われます）","元付 + 客付 exceeds 100% — treated as ad fee")}</span>
                  </div>
                )}
              </div>
            </div>

            {/* D2 — editable AD %, 0〜500. The bar is indicative only and never clamps the value. */}
            <div className="mt-4 pt-4 border-t border-[#F1F5F9]">
              <div className="flex items-start gap-4">
                <div className="w-[150px] shrink-0">
                  <div className="text-[11px] font-semibold text-[#475569] mb-1">{L("広告料（AD）","Ad fee (AD)")}</div>
                  <div className={`flex items-center bg-white border rounded-md h-9 px-2.5 ${ad > 500 ? "border-[#DC2626]" : "border-[#CBD5E1]"} focus-within:border-[#0F172A]`}>
                    <input value={ad} onChange={e => setAd(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)}
                      className="bg-transparent outline-none text-[14px] font-semibold text-[#0F172A] w-full min-w-0 tabnum text-right"/>
                    <span className="text-[12px] text-[#94A3B8] ml-1.5">%</span>
                  </div>
                  <div className={`text-[10.5px] mt-1 ${ad > 500 ? "text-[#DC2626]" : "text-[#94A3B8]"}`}>
                    {ad > 500 ? L("入力可能な範囲は 0〜500% です","Allowed range is 0–500%") : L("入力範囲 0〜500%（AD200%・AD300% も可）","Range 0–500% (AD200%, AD300% are valid)")}
                  </div>
                </div>
                <div className="flex-1 min-w-0 pt-[18px]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex-1 h-2.5 rounded-full bg-[#F1F5F9] relative overflow-hidden">
                      <div className="h-full rounded-full bg-[#F59E0B]" style={{ width: Math.min(ad / 500 * 100, 100) + "%" }}/>
                    </div>
                    <span className="text-[13px] font-bold text-[#0F172A] tabnum w-[64px] text-right">{ad}%</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#94A3B8] tabnum mt-1">
                    {["0", "100", "200", "300", "400", "500"].map(t => <span key={t}>{t}%</span>)}
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-1.5">
                    {L("目盛りは目安表示です。入力値がそのまま各媒体・図面に反映されます（上限で丸めません）。",
                       "The scale is indicative. The entered value is what publishes to every site and printed sheet — it is never clamped.")}
                  </div>
                </div>
              </div>
            </div>
          </PESection>

          <PESection title={L("内見・申込","Viewing & applications")}>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
              <PEChips label={L("内見方法","Viewing method")} value={naiken} onChange={setNaiken}
                options={[L("現地集合","Meet on site"), L("担当立会い","Staff attends"), L("鍵渡し","Key handover")]}/>
              <PEChips label={L("内見予約方法","Booking method")} value={yoyaku} onChange={setYoyaku}
                options={["Web", L("電話","Phone"), "FAX", L("メール","Email")]}/>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3.5 mt-3.5">
              <Field label={L("鍵の場所","Key location")} required={naiken === 0}
                hint={L("現地集合の場合は必須","Required when meeting on site")}>
                <PETextarea rows={3} value={L("現地1Fエントランス右手のキーボックス（暗証番号はチャットにて連絡）。返却は同じキーボックスへ。",
                  "Keybox to the right of the 1F entrance (code sent via chat). Return the key to the same box.")}/>
              </Field>
              <Field label={L("内見連絡事項","Viewing notes")}>
                <PETextarea rows={3} value={L("平日10:00〜18:00は事前連絡不要。土日は前日までにご連絡ください。入居中のため室内土足厳禁。",
                  "No prior notice needed weekdays 10:00–18:00. For weekends, contact us by the previous day. No shoes indoors — currently occupied.")}/>
              </Field>
            </div>
          </PESection>

          <PESection title={L("客付可","Co-broking")}>
            <div className="mb-3"><PECheck on={kyaku} onChange={() => setKyaku(v => !v)}
              label={L("客付可（他社仲介による客付を受け付ける）","Accept co-broking from other agencies")}/></div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
              <Field label={L("客付会社へのメッセージ","Message to co-broking agencies")}>
                <PETextarea rows={3} value={L("AD200%。申込は本システムよりお願いいたします。審査は最短即日、書類はチャットに添付ください。",
                  "AD 200%. Please submit applications through this system. Screening can complete same-day; attach documents in chat.")}/>
              </Field>
              <PEChips label={L("転載可否設定","Repost permission")} value={tensai} onChange={setTensai}
                options={[L("転載可","Repost allowed"), L("不可","Not allowed")]}/>
            </div>
          </PESection>
        </div>

        {/* ══ side column ══ */}
        <div className="space-y-4 self-start sticky top-4">
          {/* 元付情報 — read from the 概要 tab, collapsed by default */}
          <Card>
            <CardHead title={L("元付情報","Source agency")} sub={L("概要タブの内容を参照","Read from the 概要 tab")}
              action={<a href="04-property-edit-overview.html" className="text-[11px] text-[#475569] hover:text-[#0F172A]">{L("概要で編集 →","Edit in 概要 →")}</a>}/>
            <div className="p-4 space-y-1.5">
              <div className="text-[13px] font-semibold text-[#0F172A]">{L("株式会社 LENZ DX 本店","LENZ DX Co., Head office")}</div>
              <div className="text-[12px] text-[#475569]">{L("担当者：大久保 ゆか","Contact: Okubo Yuka")}</div>
              <div className="text-[12px] text-[#475569] tabnum">TEL 03-5842-1120</div>
              <button onClick={() => setMotoOpen(o => !o)} className="text-[11.5px] text-[#0F172A] underline decoration-[#CBD5E1] hover:decoration-[#0F172A] mt-1">
                {motoOpen ? L("詳細を隠す","Hide details") : L("詳細を表示","Show details")}
              </button>
              {motoOpen && (
                <div className="pt-2 mt-1 border-t border-[#F1F5F9] space-y-1 text-[12px] text-[#475569]">
                  <div className="tabnum">{L("〒113-0033","113-0033")}</div>
                  <div>{L("東京都文京区本郷2-26-13","2-26-13 Hongo, Bunkyo-ku, Tokyo")}</div>
                  <div className="tabnum">FAX 03-5842-1121</div>
                  <div>{L("免許番号：東京都知事(3)第00000号","Licence: Tokyo Gov. (3) No.00000")}</div>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <CardHead title={L("この項目の媒体連動","Channel mapping")} sub={L("取引情報の配信先","Where transaction data goes")}/>
            <div className="p-4 space-y-2">
              {[
                [L("業者間（B2B・レインズ）","B2B & REINS"), L("AD・手数料配分・客付可を配信","AD, fee split, co-broking")],
                [L("自社HP","Own site"), L("申込方法・内見方法のみ","Application & viewing method only")],
                [L("ポータル（SUUMO・HOMES 他）","Portals"), L("取引態様のみ","Transaction type only")],
              ].map(([t, d], i) => (
                <div key={i} className="rounded-md border border-[#E5E7EB] p-2.5">
                  <div className="text-[12px] font-semibold text-[#0F172A]">{t}</div>
                  <div className="text-[11px] text-[#64748B] mt-[2px]">{d}</div>
                </div>
              ))}
              <a href="07-property-edit-listing-info.html" className="block text-[11.5px] text-[#475569] hover:text-[#0F172A] pt-1">{L("掲載情報等タブへ →","Go to listing info →")}</a>
            </div>
          </Card>
        </div>
      </div>
    </PropEditorShell>
  );
};
