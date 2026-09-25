// _shared/screens/management-3-m14.jsx — M14 入居申込詳細 (rebuilt 2026-08-20)
// 5 workflow states + the #6 入力中 variant of stage ① (fill progress + auto-update note),
// reachable at 14-application-detail-step1-received.html?draft=1

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, PhotoPh, Avatar, AppShell } = window;
const L = window.L;

// ══════════════════════════════ M14 — APPLICATION DETAIL (5 WORKFLOW STATES) ══════════════════════════════
const M14_STEPS = () => [
  [L("仲介から受信","Received"),        L("仲介会社から申込書が届きました","Application received from broker")],
  [L("書類確認","Document check"),       L("提出書類の不備チェック中","Verifying submitted documents")],
  [L("社内審査","Internal review"),      L("収入比率・信用情報・保証会社","Income ratio, credit, guarantor")],
  [L("オーナー判定","Owner review"),     L("オーナー様の判定待ち","Awaiting owner decision")],
  [L("承認・契約準備","Approved · contract"), L("承認済 — 契約手続きへ","Approved — proceeding to contract")],
];

const M14_SLUGS = [
  "14-application-detail-step1-received",
  "14-application-detail-step2-doccheck",
  "14-application-detail-step3-review",
  "14-application-detail-step4-owner",
  "14-application-detail-step5-approved",
];

const M14Shell = ({ active, badge, statusTone, statusLabel, actions, rightPanel }) => {
  const STEPS = M14_STEPS();
  const draft = typeof window !== "undefined" && window.location.search.indexOf("draft=1") >= 0 && active === 0;
  const FILL = [20, 50];
  return (
    <AppShell active="applications"
      crumbs={[L("入居申込","Applications"), L("#2026-05-1024 山田 太郎 様","#2026-05-1024 Mr. Yamada Taro"), draft ? L("入力中","In progress") : STEPS[active][0]]}
      title={L("申込 — 山田 太郎 様","Application — Mr. Yamada Taro")}
      subtitle={L("青葉マンション 305 · ¥184,000 · 入居希望 2026/07/01","Aoba Mansion 305 · ¥184,000 · move-in 2026/07/01")}
      actions={actions}>

      {/* Workflow stepper — clickable */}
      {/*
        🔔 DESIGN-ALIGNMENT — needs customer/architect decision (do NOT silently change):
          This screen renders a 5-STATE wizard (受信 / 書類確認 / 社内審査 / オーナー判定 / 承認),
          but the transition-list specs a 4-STAGE stepper. Resolve before launch:
          (a) collapse to 4 stages, or (b) ratify the 5-state wizard and update the spec.
      */}
      <Card className="p-5 mb-5">
        <div className="grid grid-cols-5 gap-0">
          {STEPS.map(([n, sub], i) => {
            const state = i < active ? "ok" : i === active ? "current" : "pending";
            return (
              <a key={i} href={`${M14_SLUGS[i]}.html`} className="relative no-underline">
                <div className="flex items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold ${
                    state==="ok" ? "bg-[#16A34A] text-white" : state==="current" ? "bg-[#F59E0B] text-[#0F172A]" : "bg-white border border-[#E5E7EB] text-[#94A3B8]"
                  }`}>{state==="ok" ? <Icon.Check s={14}/> : i+1}</div>
                  {i < STEPS.length-1 && <div className={`flex-1 h-[3px] mx-2 rounded-full ${state==="ok" ? "bg-[#16A34A]" : "bg-[#E5E7EB]"}`}/>}
                </div>
                <div className="mt-3 pr-3">
                  <div className={`text-[12.5px] font-semibold ${state==="current"?"text-[#92400E]":""}`}>{n}</div>
                  <div className="text-[10.5px] text-[#94A3B8]">{sub}</div>
                </div>
              </a>
            );
          })}
        </div>
      </Card>

      {/* Status banner — #6: 入力中 variant carries the fill progress + auto-update note */}
      {draft ? (
        <Card className="mb-5 p-4" style={{ background:"#F8FAFC", borderColor:"#E5E7EB" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-[#F1F5F9]"><Icon.Edit s={18} stroke="#475569"/></div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-[#0F172A]">{L("申込者が入力中です","The applicant is still filling this in")}</div>
              <div className="text-[11.5px] text-[#64748B]">{L("申込者の入力に応じて内容は自動更新されます","The content updates automatically as the applicant fills it in")}</div>
            </div>
            <Tag tone="outline">{L("入力中","In progress")}</Tag>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between text-[11.5px] mb-1">
              <span className="text-[#475569]">{L(`進捗 ${FILL[0]}/${FILL[1]}項目入力済`, `Progress ${FILL[0]}/${FILL[1]} fields`)}</span>
              <span className="tabnum text-[#94A3B8]">{Math.round(FILL[0] / FILL[1] * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
              <div className="h-full rounded-full bg-[#0F172A]" style={{ width: (FILL[0] / FILL[1] * 100) + "%" }}/>
            </div>
          </div>
        </Card>
      ) : (
      <Card className="mb-5 p-4 flex items-center gap-3" style={badge.bannerStyle}>
        <div className={`w-10 h-10 rounded-md flex items-center justify-center`} style={{ background: badge.icoBg, color: badge.icoFg }}>
          <badge.icon s={18} stroke={badge.icoFg}/>
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-semibold" style={{ color: badge.text }}>{badge.title}</div>
          <div className="text-[11.5px]" style={{ color: badge.text + "cc" }}>{badge.body}</div>
        </div>
        <Tag tone={statusTone}>{statusLabel}</Tag>
      </Card>
      )}

      <div className="grid gap-5 pb-20" style={{ gridTemplateColumns: "minmax(520px,1fr) minmax(280px,360px)" }}>
        <div className="space-y-5">
          {/* Applicant info — shared across states */}
          <Card>
            {/*
              🔔 Proposed addition (GATED — not rendered): 本人確認済 (eKYC) header Tag.
              eKYC verification is not yet part of the MVP review surface. Restore by adding:
              action={<Tag tone="ok" icon={Icon.CheckCircle}>{L("本人確認済 (eKYC)","ID verified (eKYC)")}</Tag>}
            */}
            <CardHead title={L("申込者情報","Applicant")}/>
            <div className="p-5 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))" }}>
              <Field label={L("氏名","Full name")}><Input value="山田 太郎"/></Field>
              <Field label={L("フリガナ","Reading")}><Input value="ヤマダ タロウ"/></Field>
              <Field label={L("生年月日","DOB")}><Input value="1992-08-14 (33)"/></Field>
              <Field label={L("電話","Phone")}><Input value="090-1234-5678"/></Field>
              <Field label={L("メール","Email")}><Input value="yamada@example.com"/></Field>
              <Field label={L("性別","Gender")}><Input value={L("男性","Male")}/></Field>
              <Field label={L("国籍","Nationality")}><Input value={L("日本","Japan")}/></Field>
              <Field label={L("在留資格","Residence status")} hint={L("外国籍の場合","if non-Japanese")}><Input value="—"/></Field>
              <Field label={L("現住所","Current address")}><Input value={L("豊島区池袋 2-30-1 池袋ハイツ 201","2-30-1 Ikebukuro Heights 201, Toshima")}/></Field>
              <Field label={L("勤務先","Employer")}><Input value={L("株式会社サイバー (情報通信)","Cyber Co., Ltd. (ICT)")}/></Field>
              <Field label={L("業種","Industry")}><Input value={L("情報通信","ICT")}/></Field>
              <Field label={L("役職","Job title")}><Input value={L("係長","Section chief")}/></Field>
              <Field label={L("勤続年数","Years employed")}><Input value={L("6年2ヶ月","6 yrs 2 mo")}/></Field>
              <Field label={L("年収","Annual income")}><Input value="¥6,200,000"/></Field>
            </div>
          </Card>

          {/* §M14 ADD: 物件情報 */}
          <Card>
            <CardHead title={L("物件情報","Property")}/>
            <div className="p-5 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))" }}>
              <Field label={L("物件名","Property")}><Input value={L("青葉マンション","Aoba Mansion")}/></Field>
              <Field label={L("部屋番号","Room")}><Input value="305"/></Field>
              <Field label={L("賃料","Rent")}><Input value="184,000" prefix="¥"/></Field>
              <Field label={L("入居希望日","Desired move-in")}><Input value="2026-07-01" prefix={<Icon.Calendar s={12}/>}/></Field>
              <Field label={L("契約期間","Term")}><Input value={L("2年","2 years")}/></Field>
              <Field label={L("契約形態","Contract type")}><Input value={L("普通借家","Standard lease")}/></Field>
            </div>
          </Card>

          {/*
            🔔 Proposed additions (GATED — not rendered):
              • Income KPI block (家賃/月収比 35.6% · 勤続年数 · 信用スコア) — affordability
                scoring is not approved for the MVP review surface (overlaps banned
                analytics). Year-income remains as a plain field under 申込者情報.
              • 保証会社 card (日本セーフティー 審査結果) — guarantor-company result is shown
                on the broker/guarantor flow; removed here pending approval.
              Restore the original 「収入と保証」 card if customers want them back.
          */}

          {/* §M14 ADD: 連帯保証人 (same pattern as 申込者情報) */}
          <Card>
            <CardHead title={L("連帯保証人","Joint guarantor")}/>
            <div className="p-5 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))" }}>
              <Field label={L("氏名","Full name")}><Input value="山田 一郎"/></Field>
              <Field label={L("フリガナ","Reading")}><Input value="ヤマダ イチロウ"/></Field>
              <Field label={L("続柄","Relationship")}><Input value={L("父","Father")}/></Field>
              <Field label={L("電話","Phone")}><Input value="090-2222-3333"/></Field>
              <Field label={L("年収","Annual income")}><Input value="¥7,800,000"/></Field>
              <Field label={L("勤務先","Employer")}><Input value={L("山田工業 (代表取締役)","Yamada Industry (CEO)")}/></Field>
              <Field label={L("現住所","Current address")} full><Input value={L("さいたま市浦和区高砂 1-2-3","1-2-3 Takasago, Urawa, Saitama")}/></Field>
            </div>
          </Card>

          {/* §M14 ADD: 緊急連絡先 */}
          <Card>
            <CardHead title={L("緊急連絡先","Emergency contact")}/>
            <div className="p-5 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))" }}>
              <Field label={L("氏名","Full name")}><Input value="山田 花子"/></Field>
              <Field label={L("続柄","Relationship")}><Input value={L("母","Mother")}/></Field>
              <Field label={L("電話","Phone")}><Input value="090-4444-5555"/></Field>
              <Field label={L("現住所","Current address")} full><Input value={L("さいたま市浦和区高砂 1-2-3","1-2-3 Takasago, Urawa, Saitama")}/></Field>
            </div>
          </Card>

          {/* §M14 ADD: 同居人 table */}
          <Card>
            <CardHead title={L("同居人","Co-residents")} action={<span className="text-[11px] text-[#94A3B8] tabnum">2 {L("名","people")}</span>}/>
            <div className="p-5">
              <div className="border border-[#E5E7EB] rounded-md overflow-hidden">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-[#94A3B8] text-[10.5px] uppercase tracking-wider">
                      <th className="text-left font-semibold px-3 py-2">{L("氏名","Name")}</th>
                      <th className="text-left font-semibold px-3 py-2">{L("続柄","Relationship")}</th>
                      <th className="text-right font-semibold px-3 py-2 w-16">{L("年齢","Age")}</th>
                      <th className="text-left font-semibold px-3 py-2">{L("備考","Notes")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["山田 美咲", L("配偶者","Spouse"), "31", L("会社員","Employed")],
                      ["山田 蒼",   L("子","Child"), "3", L("未就学","Pre-school")],
                    ].map(([name, rel, age, note], i) => (
                      <tr key={i} className="border-t border-[#F1F5F9]">
                        <td className="px-3 py-2.5 text-[#0F172A] font-medium">{name}</td>
                        <td className="px-3 py-2.5 text-[#475569]">{rel}</td>
                        <td className="px-3 py-2.5 text-right tabnum text-[#475569]">{age}</td>
                        <td className="px-3 py-2.5 text-[#64748B]">{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* Documents */}
          <Card>
            <CardHead title={L("提出書類","Documents")}/>
            <div className="grid gap-px bg-[#F1F5F9]" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
              {[
                [L("身分証明書 (運転免許)","ID (Driver's license)"), "license.pdf",      "1.2MB", "5/25 09:12", active >= 1 ? "ok" : "pending"],
                [L("住民票","Resident card"),                        "juminhyo.pdf",     "0.8MB", "5/25 09:12", active >= 1 ? "ok" : "pending"],
                [L("源泉徴収票","Withholding statement"),            "gensen_2025.pdf",  "0.6MB", "5/25 09:13", active >= 1 ? "ok" : "pending"],
                [L("在職証明書","Employment certificate"),           "zaishoku.pdf",     "0.5MB", "5/25 18:40", active >= 2 ? "ok" : active === 1 ? "warn" : "pending"],
                [L("連帯保証人 同意書","Co-signer consent"),          "hosho_doui.pdf",   "0.7MB", "5/26 10:05", active >= 4 ? "ok" : "pending"],
                [L("ペット同意書","Pet consent"),                     "pet_doui.pdf",     "0.4MB", "5/25 09:14", active >= 1 ? "ok" : "pending"],
              ].map(([n, file, size, ts, st], i) => (
                <div key={i} className="bg-white p-3.5">
                  <div className="flex items-center gap-3">
                    <Icon.FileText s={18} stroke="#475569"/>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] font-medium truncate">{n}</div>
                      {/* §M14 ADD: file-tile metadata */}
                      <div className="text-[10.5px] text-[#94A3B8] tabnum truncate">{file} · {size} · {ts}</div>
                    </div>
                    {st === "ok" && <Tag tone="ok" size="sm"><Icon.Check s={10}/></Tag>}
                    {st === "warn" && <Tag tone="warn" size="sm">{L("再提出","Resubmit")}</Tag>}
                    {st === "pending" && <Tag tone="neutral" size="sm">{L("未着","Pending")}</Tag>}
                  </div>
                  {/* §M14 ADD: 表示 / ダウンロード */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2.5">
                    <button className="inline-flex items-center gap-1 text-[11px] text-[#475569] hover:text-[#0F172A]"><Icon.Eye s={11}/>{L("表示","View")}</button>
                    <button className="inline-flex items-center gap-1 text-[11px] text-[#475569] hover:text-[#0F172A]"><Icon.Download s={11}/>{L("ダウンロード","Download")}</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* §M14 ADD: 申込備考 */}
          <Card>
            <CardHead title={L("申込備考","Application notes")}/>
            <div className="p-5">
              <textarea className="w-full border border-[#CBD5E1] rounded-md p-3 text-[13px] leading-relaxed min-h-[80px] resize-none outline-none focus:border-[#0F172A]"
                defaultValue={L("入居後すぐに在宅勤務を予定。来客用駐車場の利用可否について確認希望。ペット (小型犬1匹) 同意書提出済。","Plans to work from home immediately. Wants to confirm visitor-parking availability. Pet (1 small dog) consent submitted.")}/>
            </div>
          </Card>

          {/* §M14 ADD: 審査メモ (internal review notes + add/send) */}
          <Card>
            <CardHead title={L("審査メモ (社内のみ)","Review notes (staff only)")}/>
            <div className="divide-y divide-[#F1F5F9]">
              {[
                ["5/25 11:40", L("田中","Tanaka"), L("保証会社の事前承認を確認。年収比はやや高めだが連帯保証人の属性は良好。","Guarantor pre-approval confirmed. Rent-to-income a bit high but co-signer profile is strong.")],
                ["5/26 14:10", L("佐藤","Sato"), L("在職証明書の再提出を確認。問題なし。","Re-submitted employment certificate checked — OK.")],
              ].map(([ts, who, note], i) => (
                <div key={i} className="px-5 py-3">
                  <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] mb-1"><span className="font-semibold text-[#475569]">{who}</span><span className="tabnum">{ts}</span></div>
                  <div className="text-[12.5px] text-[#0F172A] leading-snug">{note}</div>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-[#F1F5F9] flex items-center gap-2">
              <div className="flex-1"><Input value="" placeholder={L("メモを追加…","Add a note…")}/></div>
              <Btn kind="accent" icon={Icon.ArrowRight}>{L("送信","Send")}</Btn>
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          {/* Broker info — always shown */}
          <Card>
            <CardHead title={L("仲介情報","Broker")}/>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar name="F" tone="accent" size={36}/>
                <div>
                  <div className="text-[13px] font-semibold">FINDERS 吉祥寺店</div>
                  <div className="text-[11px] text-[#64748B]">{L("担当: 中村 健太郎","In charge: Nakamura Kentaro")}</div>
                </div>
              </div>
              <div className="text-[11.5px] text-[#475569] space-y-1">
                <div className="flex justify-between"><span>{L("電話","Phone")}</span><span className="tabnum">0422-12-3456</span></div>
                <div className="flex justify-between"><span>{L("メール","Email")}</span><span>nakamura@finders.jp</span></div>
                <div className="flex justify-between"><span>{L("過去成約","Past deals")}</span><span className="tabnum">14</span></div>
              </div>
              {/* §M14 WIRE (T-M-208): チャットを開く → M15 */}
              <a href="15-chat.html" className="no-underline block" style={{ marginTop: 10 }}>
                <Btn kind="ghost" size="sm" full icon={Icon.Chat}>{L("チャットを開く","Open chat")}</Btn>
              </a>
            </div>
          </Card>

          {/* 内見履歴 */}
          <Card>
            <CardHead title={L("内見履歴","Viewing history")}/>
            <div className="divide-y divide-[#F1F5F9]">
              {[
                ["5/23 15:00", L("担当立会い","Staff attended"), L("南向きの明るさに好感触。ペット可否を確認。","Liked the south-facing light. Asked about the pet policy.")],
                ["5/20 11:30", L("現地集合","Met on site"), L("2件目の内見。奥様同伴で再確認。","Second viewing, revisited with spouse.")],
              ].map(([ts, method, memo], i) => (
                <div key={i} className="px-4 py-3">
                  <div className="flex items-center gap-2 text-[11px] mb-1">
                    <span className="tabnum text-[#0F172A] font-semibold">{ts}</span>
                    <Tag tone="neutral" size="sm">{method}</Tag>
                  </div>
                  <div className="text-[11.5px] text-[#475569] leading-snug">{memo}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Right panel — per-state */}
          {rightPanel}

          {/* Activity log */}
          <Card>
            <CardHead title={L("アクティビティ","Activity log")}/>
            <div className="divide-y divide-[#F1F5F9] text-[11.5px]">
              {[
                ["5/25 09:14", L("申込書受信 (FINDERS 吉祥寺)","Application received (FINDERS Kichijoji)"), "ok",       0],
                ["5/25 09:50", L("書類のOCR検証完了","Document OCR verified"),                            "ok",       1],
                ["5/25 11:32", L("保証会社 (日本セーフティー) 事前承認","Guarantor pre-approved"),         "ok",       2],
                ["5/26 14:08", L("社内審査ステータスを変更","Internal review marked active"),              "neutral",  2],
                ["5/26 14:38", L("オーナーへ判定依頼を送信","Owner review requested"),                     "neutral",  3],
                ["—",          L("承認 → 契約準備に移行","Moved to approved & contract"),                  "ok",       4],
              ].filter(r => r[3] <= active).map(([t, n, tone], i) => (
                <div key={i} className="px-4 py-2.5 flex items-start gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${tone==="ok"?"bg-[#16A34A]":"bg-[#0F172A]"}`}/>
                  <div className="flex-1">{n}</div>
                  <span className="text-[#94A3B8] tabnum">{t}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* §M14 ADD: STICKY BOTTOM TOOLBAR — 印刷 / CSV出力 / Obic ERP linkage (T-M-203 side effect) */}
      <div className="fixed bottom-0 left-[240px] right-0 bg-white border-t border-[#E5E7EB] px-6 py-3 flex items-center gap-3 z-30"
           style={{ boxShadow: "0 -4px 16px rgba(15,23,42,0.06)" }}>
        <div className="flex items-center gap-2 text-[11.5px] text-[#475569]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"/>
          <span>{L("申込 A-2026-0526-001 · 操作は監査ログに記録されます","A-2026-0526-001 · all actions are audit-logged")}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Btn kind="ghost" size="md" icon={Icon.Print}>{L("印刷","Print")}</Btn>
          <Btn kind="ghost" size="md" icon={Icon.Download}>{L("CSV出力","Export CSV")}</Btn>
          <button className="inline-flex items-center gap-1.5 rounded-md font-semibold h-9 px-4 text-[13px] bg-[#0F172A] text-white hover:bg-[#1F2937]">
            <Icon.Sync s={14} stroke="#fff"/>
            {L("🔗 賃貸管理システムへ連携 (Obic)","🔗 Sync to ERP (Obic)")}
          </button>
        </div>
      </div>
    </AppShell>
  );
};

// ── Step 1: Received
window.ScreenM14Step1 = function () {
  return <M14Shell active={0}
    badge={{
      icon: Icon.Mail, icoBg:"#F1F5F9", icoFg:"#0F172A", text:"#0F172A",
      bannerStyle:{ background:"#F8FAFC", borderColor:"#E5E7EB" },
      title: L("FINDERS 吉祥寺店 から新規申込を受信しました","Application received from FINDERS Kichijoji"),
      body:  L("受信時刻: 2026/05/25 09:14 · 受領後36時間以内にステータスを返信してください","Received 2026/05/25 09:14 · respond within 36h to keep broker NPS high")
    }}
    statusTone="neutral" statusLabel={L("新規受信","New")}
    actions={<>
      <Btn kind="ghost" icon={Icon.Print}>{L("印刷","Print")}</Btn>
      <Btn kind="ghost">{L("既読にする","Mark read")}</Btn>
      <a href="14-application-detail-step1-received.html?draft=1"><Btn kind="ghost" icon={Icon.Edit}>{L("入力中の表示","In-progress view")}</Btn></a>
      <Btn kind="accent" iconRight={<Icon.ArrowRight s={12}/>}><a href="14-application-detail-step2-doccheck.html" className="text-inherit no-underline">{L("書類確認を開始 →","Begin doc check →")}</a></Btn>
    </>}
    rightPanel={
      <Card>
        <CardHead title={L("チェックリスト","Checklist")}/>
        <div className="p-4 text-[12px] space-y-2">
          {[
            L("内容を確認 (必須項目に欠落がないか)","Skim the submission for missing required fields"),
            L("緊急連絡先と保証人を分けて記入されているか","Confirm emergency contact ≠ guarantor"),
            L("内見記録と申込内容が一致するか","Cross-check with viewing logs"),
          ].map((n, i) => (
            <label key={i} className="flex items-start gap-2">
              <span className="w-4 h-4 mt-[1px] rounded border border-[#CBD5E1]"/>
              {n}
            </label>
          ))}
        </div>
      </Card>
    }/>;
};

// ── Step 2: Document check
window.ScreenM14Step2 = function () {
  return <M14Shell active={1}
    badge={{
      icon: Icon.FileText, icoBg:"#FEF3C7", icoFg:"#92400E", text:"#92400E",
      bannerStyle:{ background:"#FEF3C7", borderColor:"#FDE68A" },
      title: L("書類確認中 — 在職証明書の再提出を依頼しました","Document check — re-submitted employment cert is required"),
      body:  L("仲介経由で再アップロードを依頼済。完了後に社内審査に進めます。","Asked broker to reupload via chat — internal review starts after this is resolved.")
    }}
    statusTone="warn" statusLabel={L("書類待ち","Awaiting docs")}
    actions={<>
      <Btn kind="ghost" icon={Icon.Chat}>{L("仲介にメッセージ","Message broker")}</Btn>
      <Btn kind="ghost" icon={Icon.ArrowLeft}><a href="14-application-detail-step1-received.html" className="text-inherit no-underline">{L("受信に戻る","Back")}</a></Btn>
      <Btn kind="accent" iconRight={<Icon.ArrowRight s={12}/>}><a href="14-application-detail-step3-review.html" className="text-inherit no-underline">{L("社内審査へ →","Internal review →")}</a></Btn>
    </>}
    rightPanel={
      <Card>
        <CardHead title={L("不足書類","Missing documents")}/>
        <div className="p-4 space-y-2.5 text-[12px]">
          <div className="flex items-start gap-2.5 p-2.5 rounded border border-[#FDE68A] bg-[#FEF3C7]">
            <Icon.AlertCircle s={14} stroke="#92400E"/>
            <div>
              <div className="font-semibold text-[#92400E]">{L("在職証明書","Employment certificate")}</div>
              <div className="text-[10.5px] text-[#92400E]/85 mt-[2px]">{L("発行日が3ヶ月以内のものを希望","Issued within last 3 months")}</div>
            </div>
          </div>
          <Btn kind="ghost" size="sm" full icon={Icon.Send}>{L("再依頼を送信","Send re-request")}</Btn>
        </div>
      </Card>
    }/>;
};

// ── Step 3: Internal review (was the original M14)
window.ScreenM14Step3 = function () {
  return <M14Shell active={2}
    badge={{
      icon: Icon.Activity, icoBg:"#FEF3C7", icoFg:"#92400E", text:"#92400E",
      bannerStyle:{ background:"#FEF3C7", borderColor:"#FDE68A" },
      title: L("社内審査中 — 家賃比率が基準を超過しています","Internal review — rent ratio above threshold"),
      body:  L("家賃 / 月収比 35.6% (基準 30%)。保証会社承認済のため、承認方針で検討中。","Rent/income 35.6% (vs 30% guideline). Guarantor pre-approved — leaning towards approval.")
    }}
    statusTone="warn" statusLabel={L("審査中","Under review")}
    actions={<>
      <Btn kind="ghost" icon={Icon.Print}>{L("印刷","Print")}</Btn>
      {/* §M14 ADD: 差し戻し (send back) — outline, wired to M14b */}
      <a href="14b-application-reject-modal.html"><Btn kind="ghost" icon={Icon.ArrowLeft}>{L("↩ 差し戻し","↩ Send back")}</Btn></a>
      <a href="14b-application-reject-modal.html"><Btn kind="danger" icon={Icon.X}>{L("否認","Reject")}</Btn></a>
      <Btn kind="accent" iconRight={<Icon.ArrowRight s={12}/>}><a href="14-application-detail-step4-owner.html" className="text-inherit no-underline">{L("オーナー判定へ →","Send to owner →")}</a></Btn>
    </>}
    rightPanel={
      <Card>
        <CardHead title={L("社内判断メモ","Internal decision note")}/>
        <div className="p-4">
          <div className="border border-[#CBD5E1] rounded-md p-3 text-[12.5px] text-[#475569] min-h-[80px]">
            {L("家賃比率は超過だが、保証会社承認済 + 信用スコア812 + 内見でのお客様の反応も良好。オーナーへ推薦予定。",
               "Rent ratio above threshold, but guarantor approved + credit 812 + strong viewing feedback. Plan to recommend to owner.")}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Btn kind="ghost" size="sm" icon={Icon.User}>{L("田中 健一","Tanaka")}</Btn>
            <Tag tone="outline" style={{ alignSelf:"center" }}>{L("レビュアー","Reviewer")}</Tag>
          </div>
        </div>
      </Card>
    }/>;
};

// ── Step 4: Owner review
window.ScreenM14Step4 = function () {
  return <M14Shell active={3}
    badge={{
      icon: Icon.Clock, icoBg:"#F1F5F9", icoFg:"#0F172A", text:"#0F172A",
      bannerStyle:{ background:"#F8FAFC", borderColor:"#E5E7EB" },
      title: L("オーナー判定待ち — 青葉ホールディングス","Awaiting owner review — Aoba Holdings"),
      body:  L("5/26 14:38 に判定依頼を送信。通常24時間以内に回答。","Sent for owner decision 5/26 14:38 · usually replies within 24h.")
    }}
    statusTone="neutral" statusLabel={L("オーナー判定中","Owner reviewing")}
    actions={<>
      <Btn kind="ghost" icon={Icon.Mail}>{L("オーナーに催促","Nudge owner")}</Btn>
      <Btn kind="ghost" icon={Icon.ArrowLeft}><a href="14-application-detail-step3-review.html" className="text-inherit no-underline">{L("審査に戻る","Back")}</a></Btn>
      <Btn kind="accent" iconRight={<Icon.ArrowRight s={12}/>}><a href="14a-application-approve-modal.html" className="text-inherit no-underline">{L("承認する…","Approve…")}</a></Btn>
    </>}
    rightPanel={
      <Card>
        <CardHead title={L("オーナー判定の依頼","Owner request")}/>
        <div className="p-4 text-[12.5px]">
          <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("送信内容","Sent content")}</div>
          <div className="border border-[#E5E7EB] rounded p-3 bg-[#F7F8FA] mb-3">
            <div className="text-[#0F172A] font-semibold">{L("管理会社からの推薦","Recommended by mgmt")}</div>
            <div className="text-[11px] text-[#475569] mt-1">{L("家賃比35.6%・信用スコア812・保証会社承認済。推薦します。",
                                                              "Rent ratio 35.6%, credit 812, guarantor approved. Recommended.")}</div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]">
            <Icon.Clock s={12}/>
            <span className="tabnum">{L("送信から 1h 47m","Sent 1h 47m ago")}</span>
          </div>
        </div>
      </Card>
    }/>;
};

// ── Step 5: Approved & contract
window.ScreenM14Step5 = function () {
  return <M14Shell active={4}
    badge={{
      icon: Icon.CheckCircle, icoBg:"#DCFCE7", icoFg:"#15803D", text:"#15803D",
      bannerStyle:{ background:"#DCFCE7", borderColor:"#BBF7D0" },
      title: L("承認しました — 契約手続きに進みます","Approved — moving to contract"),
      body:  L("申込者・仲介に承認通知を送信。物件は「予約済」に変更され、出稿中のすべての媒体で掲載を停止しました。",
                "Approval emails sent. Property set to 'Reserved' and publishing paused on every medium that was publishing.")
    }}
    statusTone="ok" statusLabel={L("承認済","Approved")}
    actions={<>
      <Btn kind="ghost" icon={Icon.Print}>{L("印刷","Print")}</Btn>
      <Btn kind="ghost" icon={Icon.Download}>{L("申込書PDF","Application PDF")}</Btn>
      <Btn kind="accent" icon={Icon.FileText}>{L("契約書を作成 (GMO Sign)","Generate contract (GMO Sign)")}</Btn>
    </>}
    rightPanel={
      <Card>
        <CardHead title={L("次のアクション","Next actions")}/>
        <div className="divide-y divide-[#F1F5F9]">
          {[
            [Icon.FileText, L("契約書ドラフトを生成","Generate contract draft"),  L("GMO Sign 連携で雛形作成 (3分)","Auto-template via GMO Sign (3 min)")],
            [Icon.Mail,     L("入居者に案内メールを送付","Send move-in info"),     L("鍵受け渡し・初回支払いの案内","Key handover & first payment")],
            [Icon.Wallet,   L("初期費用の請求書発行","Issue invoice for move-in"), L("仲介経由で送付 — 期日 7日後","Send via broker — due in 7 days")],
            [Icon.Calendar, L("契約日時の調整","Schedule contract signing"),       L("オーナーと入居者の予定確認","Coordinate owner & tenant")],
          ].map(([Ico, n, sub], i) => (
            <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-[#F7F8FA] cursor-pointer">
              <Ico s={15} stroke="#475569" style={{ marginTop: 2 }}/>
              <div className="flex-1">
                <div className="text-[12.5px] font-semibold">{n}</div>
                <div className="text-[10.5px] text-[#94A3B8]">{sub}</div>
              </div>
              <Icon.ChevronRight s={13} stroke="#94A3B8"/>
            </div>
          ))}
        </div>
      </Card>
    }/>;
};

// Legacy alias — the original M14 slug renders the most-used state (internal review)
window.ScreenM14AppDetail = window.ScreenM14Step3;

