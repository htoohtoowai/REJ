// _shared/screens/broker-2.jsx — B6 Customer-service mode, B7 Viewing booking, B8 My viewings, B9 App form, B10 App confirm

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, Stat, Tabs, PhotoPh, Avatar, AppShell } = window;
const L = window.L;

// Broker shell — forces role="broker" so all chrome reflects the broker IA (FIX-S1).
const BrokerShell = (props) => <AppShell role="broker" {...props}/>;

// ══════════════════════════════ B6 — CUSTOMER-SERVICE MODE (TABLET) ══════════════════════════════
window.ScreenB6Customer = function () {
  return (
    <div className="min-h-screen" style={{ background:"#0F172A" }}>
      {/* Banner */}
      <div className="px-6 py-3 flex items-center gap-3 text-white" style={{ background:"linear-gradient(90deg,#0F172A,#1F2937)" }}>
        <Tag tone="accent" icon={Icon.Tv}>{L("接客モード","Customer-Service Mode")}</Tag>
        <span className="text-[12.5px] opacity-90">{L("お客様: 山田 太郎 様 (33歳・単身)","Customer: Mr. Yamada Taro (33, single)")}</span>
        <span className="text-[12.5px] opacity-60">|</span>
        <span className="text-[12.5px] opacity-90">{L("管理会社情報は非表示","Mgmt-side info hidden")}</span>
        <div className="ml-auto flex items-center gap-2">
          <Btn kind="ghost" size="sm" icon={Icon.History}>{L("履歴","History")}</Btn>
          <Btn kind="ghost" size="sm" icon={Icon.X} style={{ background:"rgba(255,255,255,0.1)", color:"#fff", borderColor:"transparent" }}>{L("接客モード終了","Exit mode")}</Btn>
        </div>
      </div>

      <div className="p-8 max-w-[1280px] mx-auto">
        <div className="text-white mb-6">
          <div className="text-[11px] uppercase tracking-[0.25em] opacity-70">{L("ご提案中の物件","Suggested for you")}</div>
          <h1 className="text-[36px] font-semibold mt-2 hl">{L("3 件のお部屋を比較中","Comparing 3 homes")}</h1>
          <div className="text-[13px] opacity-70 mt-1">{L("画面はお客様のタブレットに同期されます","This screen is mirrored to the customer's tablet")}</div>
        </div>

        {/* Compare 3-up */}
        <div className="grid grid-cols-3 gap-4">
          {[
            ["ZOOM本郷 701",    "1LDK", "42.5㎡", "¥262,000", L("文京区本郷","Bunkyo · Hongo"),     L("徒歩5分","5min"), L("築6年","6y built"), 1, "fav"],
            ["カーサ恵比寿 203","1LDK","38.8㎡", "¥218,000", L("渋谷区恵比寿","Shibuya · Ebisu"), L("徒歩7分","7min"), L("築8年","8y"),     2, ""],
            ["青葉マンション 305","1LDK","44.1㎡","¥184,000", L("品川区青葉台","Shinagawa · Aobadai"), L("徒歩4分","4min"), L("築12年","12y"), 3, ""],
          ].map((c, i) => {
            const [n, lay, area, rent, addr, walk, age, t, badge] = c;
            return (
              <div key={i} className="bg-white rounded-xl overflow-hidden">
                <div className="relative">
                  <PhotoPh h={220} kind="exterior" tone={t}/>
                  {badge==="fav" && <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#F59E0B] text-[#0F172A] text-[11px] font-bold flex items-center gap-1"><Icon.Heart s={11} fill="#0F172A"/> {L("お気に入り済","Favorite")}</div>}
                  <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur text-white text-[10px]">{L(`Photo 1 / 27`,`Photo 1 / 27`)}</div>
                </div>
                <div className="p-5">
                  <div className="text-[18px] font-semibold">{n}</div>
                  <div className="text-[12px] text-[#64748B]">{addr}</div>
                  <div className="text-[28px] font-bold tabnum mt-3">{rent}</div>
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#F1F5F9] text-center text-[11px]">
                    <div><div className="text-[#94A3B8]">{L("間取り","Layout")}</div><div className="font-semibold mt-1">{lay}</div></div>
                    <div><div className="text-[#94A3B8]">{L("面積","Area")}</div><div className="font-semibold mt-1 tabnum">{area}</div></div>
                    <div><div className="text-[#94A3B8]">{L("駅徒歩","Walk")}</div><div className="font-semibold mt-1">{walk}</div></div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Btn kind="ghost" size="sm" full icon={Icon.Globe}>{L("360°","360°")}</Btn>
                    <Btn kind="accent" size="sm" full icon={Icon.Calendar}>{L("内見","Book")}</Btn>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <div className="bg-white rounded-xl mt-5 overflow-hidden">
          <div className="px-5 py-3 border-b border-[#F1F5F9] flex items-center">
            <span className="text-[13px] font-semibold">{L("3 件を一目で比較","At-a-glance comparison")}</span>
            <Btn kind="ghost" size="sm" style={{ marginLeft:"auto" }} icon={Icon.Plus}>{L("項目を追加","Add criterion")}</Btn>
          </div>
          <table className="w-full text-[13px]">
            <tbody>
              {[
                [L("月額合計","Total monthly"),     ["¥282,000","¥232,000","¥200,000"], "tabnum"],
                [L("初期費用 (目安)","Move-in cost"),["¥792,000","¥620,000","¥520,000"], "tabnum"],
                [L("入居可能日","Move-in date"),    ["2026/06/01","2026/07/15","2026/06/15"]],
                [L("ペット","Pets"),                [L("相談","Negotiable"), L("不可","No"), L("可","OK")]],
                [L("オートロック","Auto-lock"),     [L("◯","Yes"), L("◯","Yes"), L("△","Common only")]],
                [L("バルコニー","Balcony"),         [L("◯ 6.2㎡","◯ 6.2㎡"), L("◯ 4.0㎡","◯ 4.0㎡"), L("× なし","×")]],
              ].map(([k, vals, mono], i) => (
                <tr key={i} className="border-t border-[#F1F5F9]">
                  <td className="px-5 py-3 bg-[#F8FAFC] text-[#475569] w-48 text-[12px] uppercase tracking-wider font-semibold">{k}</td>
                  {vals.map((v, j) => (
                    <td key={j} className={`px-5 py-3 font-semibold ${mono?"tabnum":""} ${j===0?"bg-[#FEF3C7]/40":""}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// B7 内見予約 → moved to _shared/screens/broker-2-b7.jsx (rebuild 2026-08-20)

// ══════════════════════════════ B8 — MY VIEWINGS ══════════════════════════════
window.ScreenB8MyViewings = function () {
  return (
    <BrokerShell active="viewings"
      crumbs={[L("ホーム","Home"), L("My 内見","My viewings")]}
      title={L("My 内見","My viewings")}
      subtitle={L("予定3件 · 完了8件 · 直近の予約: 本日 18:00","3 upcoming · 8 completed · next: today 18:00")}
      actions={<><Btn kind="ghost" icon={Icon.Calendar}>{L("カレンダーに同期","Sync to calendar")}</Btn><Btn kind="accent" icon={Icon.Plus}>{L("新規予約","New")}</Btn></>}>

      <div className="mb-5"><Tabs tabs={[L("予定 (3)","Upcoming (3)"), L("本日 (1)","Today (1)"), L("完了 (8)","Completed (8)"), L("キャンセル","Cancelled")]} active={0}/></div>

      <div className="space-y-3">
        {[
          { date: L("本日 5/26 (火)","Today · Tue 5/26"), time: "18:00–19:00", prop:"ZOOM本郷 701",       cust:"山田 太郎", phone:"090-1234-5678", tone:1, st:"today",     mgmt:"LENZ DX 本店" },
          { date: L("明日 5/27 (水)","Tomorrow · Wed 5/27"), time:"10:30–11:30", prop:"カーサ恵比寿 203", cust:"佐藤 花子", phone:"080-2345-6789", tone:2, st:"confirmed", mgmt:"恵比寿ホーム" },
          { date: L("5/30 (土)","Sat 5/30"), time:"14:00–16:00 (オープン)", prop:"パークサイド 401", cust:L("複数 (3組)","Multi (3 parties)"), phone:"—", tone:3, st:"open",   mgmt:"パークマネジメント" },
        ].map((v, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="grid grid-cols-[160px_140px_1fr_200px]">
              <div className="bg-[#0F172A] text-white p-4">
                <div className="text-[10px] uppercase tracking-wider opacity-70">{v.date}</div>
                <div className="text-[20px] font-bold tabnum mt-1">{v.time.split("–")[0]}</div>
                <div className="text-[11px] opacity-70 tabnum">→ {v.time.split("–")[1] || ""}</div>
                {v.st==="today" && <Tag tone="accent" size="sm" style={{ marginTop:10 }}>{L("本日","Today")}</Tag>}
                {v.st==="open"  && <Tag tone="dark" size="sm" style={{ marginTop:10, background:"#F59E0B", color:"#0F172A", border:"none" }}>{L("オープンルーム","Open room")}</Tag>}
              </div>
              <div><PhotoPh h={"100%"} kind="exterior" tone={v.tone}/></div>
              <div className="p-4">
                <div className="text-[15px] font-semibold">{v.prop}</div>
                <div className="text-[11.5px] text-[#64748B] mb-3">{L("管理: ","Managed by: ")} {v.mgmt}</div>
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  <div className="flex items-center gap-2"><Icon.User s={13} stroke="#64748B"/>{v.cust}</div>
                  <div className="flex items-center gap-2"><Icon.Phone s={13} stroke="#64748B"/>{v.phone}</div>
                  <div className="flex items-center gap-2"><Icon.MapPin s={13} stroke="#64748B"/>{L("現地集合","On-site meet")}</div>
                  <div className="flex items-center gap-2"><Icon.Key s={13} stroke="#64748B"/>{L("管理会社受領","From mgmt")}</div>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2 justify-center border-l border-[#F1F5F9]">
                <Btn kind="accent" size="sm" icon={Icon.MapPin}>{L("ナビ起動","Navigate")}</Btn>
                <Btn kind="ghost" size="sm" icon={Icon.Chat}>{L("管理会社にチャット","Chat mgmt")}</Btn>
                <Btn kind="ghost" size="sm" icon={Icon.Phone}>{L("お客様に電話","Call customer")}</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </BrokerShell>
  );
};

// ══════════════════════════════ B9 — APPLICATION FORM (5 STEPS — Square verified) ═══════════
// Step structure realigned to live いい生活Square 申込フォーム (5 steps), per B9 §10
// (supersedes §8's older 6-step plan): ①貴社情報 → ②申込種別 → ③契約情報 → ④保証 → ⑤申込者情報.
// The old step6 component is preserved as a thin "merged into Step 5" notice so the existing
// 09-application-form-step6-documents.html slug still loads cleanly (no file deletion).
const B9_STEPS = () => [
  [L("貴社情報","Your firm"),        L("いい生活アカウントから自動反映","Auto-filled from your account")],
  [L("申込種別","Application type"), L("個人/法人・連帯保証人・担当者","Personal/Corp · co-signer · agent")],
  [L("契約情報","Contract info"),    L("契約形態 / 期間 / 入居予定日 / 同居人","Lease / term / move-in / occupants")],
  [L("保証","Guarantor"),            L("保証会社プランの選択","Guarantor-company plan")],
  [L("申込者情報","Applicant info"), L("申込者・勤務先・緊急連絡先・書類・誓約","Applicant / work / emerg. / docs / pledges")],
];

const B9_SLUGS = [
  "09-application-form-step1-applicant",
  "09-application-form-step2-work",
  "09-application-form-step3-emergency",
  "09-application-form-step4-guarantor",
  "09-application-form-step5-tenants",
];

const B9Shell = ({ active, children, prevLabel, nextLabel, prevSkip, nextSkip, nextIsSubmit, completion }) => {
  const STEPS = B9_STEPS();
  return (
    <BrokerShell active="applications"
      crumbs={[L("ホーム","Home"), L("入居申込","Apply"), "ZOOM本郷 701", STEPS[active] ? STEPS[active][0] : ""]}
      title={L("入居申込 — ZOOM本郷 701","Apply — ZOOM Hongo 701")}
      subtitle={L(`ステップ ${active+1} / 5 · ¥262,000 · 入居希望 2026/07/01`, `Step ${active+1} of 5 · ¥262,000 · move-in 2026/07/01`)}
      actions={<>
        <Btn kind="ghost" icon={Icon.Save}>{L("下書きに保存","Save draft")}</Btn>
        {/* §8 ADD: visible 下書きを破棄 entry — opens existing B9DiscardModal HTML */}
        <a href="09-application-form-discard-modal.html"><Btn kind="ghost" icon={Icon.Trash}>{L("下書きを破棄","Discard draft")}</Btn></a>
      </>}>

      <div className="grid grid-cols-[240px_minmax(0,1fr)] gap-5">
        {/* Stepper */}
        <Card className="p-4 h-fit">
          <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-3">{L("進捗","Progress")}</div>
          <div className="space-y-1">
            {STEPS.map(([n, sub], i) => (
              <a key={i} href={`${B9_SLUGS[i]}.html`} className={`flex items-center gap-3 p-2.5 rounded-md cursor-pointer no-underline ${
                i === active ? "bg-[#F1F5F9]" : "hover:bg-[#F7F8FA]"
              }`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  i < active ? "bg-[#16A34A] text-white" : i === active ? "bg-[#F59E0B] text-[#0F172A]" : "bg-white border border-[#E5E7EB] text-[#94A3B8]"
                }`}>{i < active ? <Icon.Check s={12}/> : i+1}</div>
                <div className="flex-1 min-w-0">
                  <div className={`text-[12.5px] truncate ${i === active ? "font-semibold" : i < active ? "text-[#475569]" : "text-[#94A3B8]"}`}>{n}</div>
                  <div className="text-[10px] text-[#94A3B8] truncate">{sub}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#F1F5F9]">
            <div className="flex items-baseline justify-between text-[11px] text-[#475569]">
              <span>{L("自動保存済","Autosaved")}</span>
              <span className="tabnum">14:38</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-[#F1F5F9] overflow-hidden">
              <div className="h-full bg-[#0F172A]" style={{ width: `${completion}%` }}/>
            </div>
            <div className="text-[10.5px] text-[#94A3B8] mt-1 tabnum">{completion}% {L("完了","complete")}</div>
          </div>

          <div className="mt-5 pt-5 border-t border-[#F1F5F9]">
            <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("入力プレビュー","Live preview")}</div>
            <div className="rounded-md border border-dashed border-[#CBD5E1] p-3 bg-[#F8FAFC] text-[12px]">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("申込書 #001","Application #001")}</div>
              <div className="space-y-1">
                <div className="flex justify-between"><span className="text-[#94A3B8]">{L("貴社","Firm")}</span><span className="font-semibold">{L("FINDERS 吉祥寺店","FINDERS Kichijoji")}</span></div>
                <div className="flex justify-between"><span className="text-[#94A3B8]">{L("申込区分","Type")}</span><span>{active >= 1 ? L("個人 · 連帯保証人なし","Personal · no co-signer") : "—"}</span></div>
                <div className="flex justify-between"><span className="text-[#94A3B8]">{L("契約","Contract")}</span><span>{active >= 2 ? L("普通借家 2年","Standard 2y") : "—"}</span></div>
                <div className="flex justify-between"><span className="text-[#94A3B8]">{L("保証","Guarantor")}</span><span>{active >= 3 ? L("日本セーフティー","Nippon Safety") : "—"}</span></div>
                <div className="flex justify-between"><span className="text-[#94A3B8]">{L("申込者","Applicant")}</span><span className="font-semibold">{active >= 4 ? "山田 太郎" : "—"}</span></div>
                <div className="flex justify-between"><span className="text-[#94A3B8]">{L("書類","Docs")}</span><span className="tabnum">{active >= 4 ? "5 / 6" : "0 / 6"}</span></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Step body */}
        <div className="space-y-5 min-w-0">
          {children}
          <div className="flex items-center gap-3 flex-wrap">
            {prevLabel
              ? <a href={`${B9_SLUGS[active-1]}.html`}><Btn kind="ghost" icon={Icon.ArrowLeft}>{prevLabel}</Btn></a>
              : <span/>}
            <span className="ml-auto text-[11px] text-[#94A3B8]">Step {active+1} / 5</span>
            {prevSkip && <Btn kind="ghost">{L("スキップ","Skip")}</Btn>}
            {nextIsSubmit
              ? <Btn kind="accent" icon={Icon.Send}>{nextLabel}</Btn>
              : nextLabel
                ? <a href={`${B9_SLUGS[active+1]}.html`}><Btn kind="accent" iconRight={<Icon.ArrowRight s={12}/>}>{nextLabel}</Btn></a>
                : null}
          </div>
        </div>
      </div>
    </BrokerShell>
  );
};

// ── Step 1: ① 貴社情報 (Your firm — auto-populated from いい生活 organization)
window.ScreenB9Step1 = function () {
  return <B9Shell active={0} completion={10}
    nextLabel={L("申込種別へ","Next: Application type")}>
    <div className="px-3 py-2 bg-[#F1F5F9] rounded-md text-[12px] text-[#475569] flex items-center gap-2">
      <Icon.Info s={14} stroke="#475569"/>
      {L("いい生活アカウントの組織情報から自動反映されました。変更がある場合は設定画面で修正してください。",
         "Auto-filled from your いい生活 organization. Update via Settings if any field has changed.")}
    </div>
    <Card>
      <CardHead title={L("貴社情報","Your firm")} action={<Tag tone="outline">{L("自動反映","Auto-filled")}</Tag>}/>
      <div className="p-5 grid grid-cols-2 gap-4">
        <Field label={L("会社名","Company name")} required><Input value={L("株式会社 FINDERS","FINDERS Co., Ltd.")}/></Field>
        <Field label={L("店舗名","Branch")} required><Input value={L("吉祥寺店","Kichijoji Branch")}/></Field>
        <Field label={L("代表者","Representative")}><Input value={L("高橋 健太郎","Takahashi Kentaro")}/></Field>
        <Field label={L("業者免許番号","Real-estate licence")}><Input value={L("東京都知事免許 (1) 第12345号","Tokyo Gov. Licence (1) #12345")}/></Field>
        <Field label={L("郵便番号","Postal")}><Input value="180-0004" prefix="〒"/></Field>
        <Field label={L("住所","Address")}><Input value={L("武蔵野市吉祥寺本町 1-2-3","1-2-3 Kichijoji-honcho, Musashino")}/></Field>
        <Field label={L("電話","Phone")}><Input value="0422-22-0044"/></Field>
        <Field label={L("メール","Email")}><Input value="info@finders-kichijoji.jp"/></Field>
      </div>
    </Card>
    <Card>
      <CardHead title={L("申込担当者","Application agent")}/>
      <div className="p-5 grid grid-cols-3 gap-4">
        <Field label={L("担当者氏名","Agent name")} required><Input value={L("中村 一郎","Nakamura Ichiro")}/></Field>
        <Field label={L("メール","Email")} required><Input value="nakamura@finders-kichijoji.jp"/></Field>
        <Field label={L("電話","Phone")} required><Input value="090-1234-5678"/></Field>
      </div>
    </Card>
  </B9Shell>;
};

// ── Step 2: ② 申込種別 (Application type — Square verified)
window.ScreenB9Step2 = function () {
  return <B9Shell active={1} completion={25}
    prevLabel={L("貴社情報に戻る","Back: Your firm")} nextLabel={L("契約情報へ","Next: Contract info")}>
    <Card>
      <CardHead title={L("申込物件","Property")} action={<Tag tone="dark">{L("ZOOM本郷 701","ZOOM Hongo 701")}</Tag>}/>
      <div className="p-5 grid grid-cols-3 gap-4">
        <Field label={L("物件名","Property")}><Input value="ZOOM本郷 701"/></Field>
        <Field label={L("賃料","Rent")}><Input value="262,000" prefix="¥" suffix={L("/月","/mo")}/></Field>
        <Field label={L("入居希望日","Preferred move-in")}><Input value="2026-07-01"/></Field>
      </div>
    </Card>
    <Card>
      <CardHead title={L("申込区分","Application type")}/>
      <div className="p-5 grid grid-cols-2 gap-3">
        {[[L("個人","Personal"), L("入居者ご本人による申込","Tenant applies"), true],
          [L("法人","Corporate"), L("法人契約 (社宅・寮など)","Corporate (company housing, etc.)"), false]].map(([n, sub, on], i) => (
          <label key={i} className={`p-4 rounded-md border cursor-pointer ${on?"border-[#0F172A] bg-[#F7F8FA]":"border-[#E5E7EB] hover:bg-[#F7F8FA]"}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center ${on?"border-[5px] border-[#0F172A]":"border border-[#CBD5E1]"}`}/>
              <span className="text-[13px] font-semibold">{n}</span>
            </div>
            <div className="text-[11.5px] text-[#64748B] pl-6">{sub}</div>
          </label>
        ))}
      </div>
    </Card>
    <Card>
      <CardHead title={L("連帯保証人の利用","Use a co-signer?")} sub={L("管理会社により必須・任意が異なります","Required vs. optional depends on the mgmt company")}/>
      <div className="p-5 grid grid-cols-2 gap-3">
        {[[L("利用なし (保証会社のみ)","No — guarantor co. only"), true],
          [L("利用あり (連帯保証人を立てる)","Yes — co-signer"), false]].map(([n, on], i) => (
          <label key={i} className={`p-3 rounded-md border cursor-pointer flex items-center gap-2 ${on?"border-[#0F172A] bg-[#F7F8FA]":"border-[#E5E7EB] hover:bg-[#F7F8FA]"}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center ${on?"border-[5px] border-[#0F172A]":"border border-[#CBD5E1]"}`}/>
            <span className="text-[13px]">{n}</span>
          </label>
        ))}
      </div>
    </Card>
    {/* §9 ITANDI: model choice — agent-completes vs. send applicant a self-service URL */}
    <Card>
      <CardHead title={L("お客様の入力方法","How will the applicant complete the form?")} sub={L("ITANDIモデル参考。顧客と確認のうえ選択","Per ITANDI reference — confirm with customer")}/>
      <div className="p-5 grid grid-cols-2 gap-3">
        {[[L("担当者代行入力","Agent enters on behalf"), L("仲介担当者が全てのフィールドを入力","Agent fills the entire form"), true],
          [L("お客様自己入力 (URL送信)","Self-input (email URL)"), L("申込者宛にWeb申込URLをメール送信","Send the applicant a Web URL by email"), false]].map(([n, sub, on], i) => (
          <label key={i} className={`p-4 rounded-md border cursor-pointer ${on?"border-[#0F172A] bg-[#F7F8FA]":"border-[#E5E7EB] hover:bg-[#F7F8FA]"}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center ${on?"border-[5px] border-[#0F172A]":"border border-[#CBD5E1]"}`}/>
              <span className="text-[13px] font-semibold">{n}</span>
            </div>
            <div className="text-[11.5px] text-[#64748B] pl-6">{sub}</div>
          </label>
        ))}
      </div>
    </Card>
  </B9Shell>;
};

// ── Step 3: ③ 契約情報 (Contract info — incl. §8 ADD 同居人 repeating rows + §8 ADD 引越予定日/理由)
window.ScreenB9Step3 = function () {
  return <B9Shell active={2} completion={45}
    prevLabel={L("申込種別に戻る","Back: Application type")} nextLabel={L("保証へ","Next: Guarantor")}>
    <Card>
      <CardHead title={L("契約条件","Contract terms")}/>
      <div className="p-5 grid grid-cols-3 gap-4">
        <Field label={L("契約形態","Lease type")} required><Select value={L("普通借家","Standard lease")}/></Field>
        <Field label={L("契約期間","Term")} required><Select value={L("2年","2 years")}/></Field>
        <Field label={L("入居予定日","Move-in date")} required><Input value="2026-07-01"/></Field>
        {/* §8 ADD: 引越予定日 / 引越理由 (Med) */}
        <Field label={L("引越予定日","Moving date")}><Input value="2026-06-28"/></Field>
        <Field label={L("引越し理由","Reason for moving")}><Input value={L("結婚 (現住居から退去)","Marriage (vacating current)")}/></Field>
        <Field label={L("引越業者","Mover")}><Select value={L("未定","TBD")}/></Field>
      </div>
    </Card>
    <Card>
      <CardHead title={L("入居者","Occupants")} sub={L("申込者本人を含む全員","Including the applicant")}/>
      <div className="p-5 grid grid-cols-3 gap-4">
        <Field label={L("入居予定人数 (合計)","Total occupants")} required><Select value={L("2名","2")}/></Field>
        <Field label={L("大人","Adults")}><Input value="2"/></Field>
        <Field label={L("子供","Children")}><Input value="0"/></Field>
      </div>
      {/* §8 ADD: 同居人 repeating rows (was completely missing in old design) */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8]">{L("同居人 (申込者以外)","Co-residents (excl. applicant)")}</span>
          <Btn kind="ghost" size="sm" icon={Icon.Plus}>{L("行を追加","Add row")}</Btn>
        </div>
        <Card className="overflow-hidden">
          <table className="w-full text-[12px]">
            <thead className="bg-[#F7F8FA] text-[#64748B] text-[10.5px] uppercase tracking-wider">
              <tr>
                <th className="px-2 py-2 text-left">{L("氏名","Name")}</th>
                <th className="px-2 py-2 text-left">{L("続柄","Relation")}</th>
                <th className="px-2 py-2 text-left">{L("生年月日","DOB")}</th>
                <th className="px-2 py-2 text-left">{L("性別","Gender")}</th>
                <th className="px-2 py-2 text-left">{L("職業","Occupation")}</th>
                <th className="px-2 py-2 text-right">{L("年収","Income")}</th>
                <th className="w-8"/>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#F1F5F9]">
                <td className="px-2 py-1.5"><Input value={L("山田 美咲","Yamada Misaki")}/></td>
                <td className="px-2 py-1.5"><Select value={L("配偶者","Spouse")}/></td>
                <td className="px-2 py-1.5"><Input value="1994-02-08"/></td>
                <td className="px-2 py-1.5"><Select value={L("女性","Female")}/></td>
                <td className="px-2 py-1.5"><Input value={L("会社員","Salaried")}/></td>
                <td className="px-2 py-1.5"><Input value="4,800,000" prefix="¥"/></td>
                <td className="px-2 py-1.5 text-center"><Icon.Trash s={13} stroke="#94A3B8"/></td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </Card>
    <Card>
      <CardHead title={L("入居時の希望条件","Move-in preferences")}/>
      <div className="p-5 grid grid-cols-3 gap-4">
        <Field label={L("駐車場","Parking")}><Select value={L("不要","Not needed")}/></Field>
        <Field label={L("バイク・自転車","Bike")}><Select value={L("自転車 1台","Bicycle × 1")}/></Field>
        <Field label={L("ペット","Pets")}><Select value={L("なし","None")}/></Field>
        <Field label={L("楽器演奏","Musical instruments")}><Select value={L("なし","None")}/></Field>
        <Field label={L("喫煙","Smoking")}><Select value={L("禁煙","Non-smoker")}/></Field>
        <Field label={L("インターネット","Internet")}><Select value={L("無料Wi-Fi利用","Use free Wi-Fi")}/></Field>
      </div>
    </Card>
  </B9Shell>;
};

// ── Step 4: ④ 保証 (Guarantor company plan)
window.ScreenB9Step4 = function () {
  const plans = [
    [L("シングル50%","Single 50%"),       L("単身者向け","For single tenants"), "¥131,000", L("月収 ¥517,000 で承認可能性 高","Likely approved at ¥517k income"), true],
    [L("ファミリー60%","Family 60%"),      L("ご家族・連名向け","For families / co-tenants"), "¥157,200", L("収入合算可","Combined income allowed"), false],
    [L("外国籍プラン","Foreign nationals"),L("在留資格対応","Visa-status aware"), "¥186,400", L("英語サポートあり","English support"), false],
  ];
  return <B9Shell active={3} completion={70}
    prevLabel={L("契約情報に戻る","Back: Contract info")} nextLabel={L("申込者情報へ","Next: Applicant info")}>
    <Card>
      <CardHead title={L("保証会社の選択","Choose a guarantor company")} action={<Tag tone="outline">{L("管理会社推奨","Recommended by mgmt")}</Tag>}/>
      <div className="p-5 grid grid-cols-3 gap-3">
        {plans.map(([n, sub, fee, note, sel], i) => (
          <label key={i} className={`p-4 rounded-md border cursor-pointer ${sel?"border-[#0F172A] bg-[#F7F8FA]":"border-[#E5E7EB] hover:bg-[#F7F8FA]"}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center ${sel?"border-[5px] border-[#0F172A]":"border border-[#CBD5E1]"}`}/>
              <span className="text-[13px] font-semibold">{n}</span>
            </div>
            <div className="text-[11px] text-[#64748B]">{sub}</div>
            <div className="text-[18px] font-bold tabnum mt-3">{fee}</div>
            <div className="text-[10.5px] text-[#94A3B8]">{L("初回保証料","Initial fee")}</div>
            <div className="text-[10.5px] text-[#15803D] mt-2 flex items-center gap-1"><Icon.CheckCircle s={11} stroke="#15803D"/> {note}</div>
          </label>
        ))}
      </div>
      <div className="px-5 pb-5 grid grid-cols-2 gap-4">
        <Field label={L("保証会社","Company")}><Select value={L("日本セーフティー","Nippon Safety")}/></Field>
        <Field label={L("プラン","Plan")}><Select value={L("シングル50%","Single 50%")}/></Field>
        <Field label={L("初回保証料","Initial fee")}><Input value="131,000" prefix="¥"/></Field>
        <Field label={L("月額保証料","Monthly fee")}><Input value="1,200" prefix="¥" suffix={L("/月","/mo")}/></Field>
      </div>
    </Card>
    {/* 連帯保証人 details — conditional on Step 2 = 連帯保証人あり. Sample state = NOT shown. */}
    <div className="px-3 py-2 bg-[#F1F5F9] rounded-md text-[12px] text-[#475569] flex items-center gap-2">
      <Icon.Info s={14} stroke="#475569"/>
      {L("申込種別で「連帯保証人なし」を選択しているため、連帯保証人の入力は不要です。「あり」に変更すると Step5 申込者情報 内に保証人セクションが表示されます。",
         "Step 2 chose 「no co-signer」, so co-signer details are skipped. Switching to 「あり」 reveals the 保証人 section inside Step 5.")}
    </div>
  </B9Shell>;
};

// ── Step 5: ⑤ 申込者情報 (Applicant info — Square's 10 sub-sections per §10 + §8 ADD docs)
window.ScreenB9Step5 = function () {
  const docs = [
    [L("身分証 (表面)","ID (front)"),                       "license_front.jpg", "1.8MB", "ok"],
    [L("身分証 (裏面)","ID (back)"),                        "license_back.jpg",  "1.6MB", "ok"],
    [L("住民票","Resident card"),                            "juminhyo.pdf",      "412KB", "ok"],
    [L("源泉徴収票 (前年度)","Withholding"),                "gensen_2025.pdf",   "256KB", "ok"],
    [L("在職証明書","Employment cert"),                     "—",                 "—",     "pending"],
    [L("通帳コピー","Bank book"),                            "bank.pdf",          "604KB", "ok"],
    [L("在留カード (外国籍時のみ)","Residence card (foreign)"), "—",            "—",     "na"],
    [L("課税証明書","Tax cert"),                             "tax_2025.pdf",      "184KB", "ok"],
    [L("印鑑証明書","Seal-reg. cert"),                      "inkan.pdf",         "92KB",  "ok"],
  ];
  return <B9Shell active={4} completion={95}
    prevLabel={L("保証に戻る","Back: Guarantor")} nextLabel={L("確認画面へ →","Review & submit →")}>

    {/* ① 申込者情報 */}
    <Card>
      <CardHead title={L("① 申込者情報","① Applicant")} sub={L("基本情報・連絡先・現住所","Basic info, contacts, current address")}/>
      <div className="p-5 grid grid-cols-2 gap-4">
        <Field label={L("姓 (漢字)","Last name")} required><Input value={L("山田","Yamada")}/></Field>
        <Field label={L("名 (漢字)","First name")} required><Input value={L("太郎","Taro")}/></Field>
        <Field label={L("姓 (フリガナ)","Last (reading)")} required><Input value={L("ヤマダ","Yamada")}/></Field>
        <Field label={L("名 (フリガナ)","First (reading)")} required><Input value={L("タロウ","Taro")}/></Field>
        <Field label={L("生年月日","DOB")} required><Input value="1992-08-14" suffix="(33)"/></Field>
        <Field label={L("性別","Gender")}><Select value={L("男性","Male")}/></Field>
        <Field label={L("国籍","Nationality")}><Select value={L("日本","Japan")}/></Field>
        <Field label={L("配偶者","Marital status")}><Select value={L("既婚","Married")}/></Field>
        {/* §8 ADD: 続柄 (申込者本人) + 居住区分 */}
        <Field label={L("続柄","Relation to applicant")}><Input value={L("本人","Self")}/></Field>
        <Field label={L("居住区分","Tenure type")}><Select value={L("賃貸","Renting")}/></Field>
        <Field label={L("電話","Phone")} required><Input value="090-1234-5678"/></Field>
        <Field label={L("メール","Email")} required><Input value="yamada@example.com"/></Field>
      </div>
      <div className="px-5 pb-5 space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <Field label={L("郵便番号","Postal")} required><Input value="170-0014" prefix="〒"/></Field>
          <Field label={L("居住期間","Years at address")}><Input value="3.2" suffix={L("年","yrs")}/></Field>
          <Field label={L("住居形態","Tenure")}><Select value={L("賃貸 (家賃 ¥185,000)","Renting (¥185k)")}/></Field>
        </div>
        <Field label={L("現住所","Current address")} required>
          <Input value={L("東京都豊島区池袋 2-30-1 池袋ハイツ 201","2-30-1 Ikebukuro Heights 201, Toshima, Tokyo")}/>
        </Field>
      </div>
      {/* §8 ADD: 国籍=外国籍 conditional. Sample state shows the hidden-fields notice. */}
      <div className="mx-5 mb-5 px-3 py-2 bg-[#F1F5F9] rounded-md text-[11.5px] text-[#475569] flex items-center gap-2">
        <Icon.Info s={13} stroke="#475569"/>
        {L("国籍 ≠ 日本 の場合: 在留資格 + 在留期限 のフィールドを表示 (現在は非表示)",
           "If nationality ≠ Japan: 在留資格 + 在留期限 fields appear (hidden now)")}
      </div>
    </Card>

    {/* ② 入居者概要 / ③ 入居者情報 — pulled from Step 3 同居人 */}
    <Card>
      <CardHead title={L("② 入居者概要 / ③ 入居者情報","② Occupants summary / ③ Occupant details")} sub={L("契約情報ステップで入力された同居人の要約","Summary of co-residents from Step 3")}/>
      <div className="p-5 text-[12.5px] text-[#475569]">
        {L("合計 2名 (大人 2 / 子供 0) — 申込者 山田太郎 様 + 同居人 山田美咲 様 (配偶者)",
           "Total 2 (2 adults / 0 children) — applicant Yamada Taro + co-resident Yamada Misaki (spouse)")}
      </div>
    </Card>

    {/* ④ 緊急連絡先 */}
    <Card>
      <CardHead title={L("④ 緊急連絡先","④ Emergency contact")} sub={L("入居者と連絡が取れない場合の連絡先","Reachable if the tenant cannot be contacted")}/>
      <div className="p-5 grid grid-cols-2 gap-4">
        <Field label={L("お名前","Name")} required><Input value={L("山田 茂雄","Yamada Shigeo")}/></Field>
        <Field label={L("続柄","Relation")} required><Select value={L("父","Father")}/></Field>
        <Field label={L("生年月日","DOB")}><Input value="1965-03-22 (60)"/></Field>
        <Field label={L("電話","Phone")} required><Input value="090-9876-5432"/></Field>
        <Field label={L("メール","Email")}><Input value="yamada.dad@example.com"/></Field>
        <Field label={L("勤務先 (任意)","Employer")}><Input value={L("自営業","Self-employed")}/></Field>
        <Field label={L("郵便番号","Postal")}><Input value="350-1107" prefix="〒"/></Field>
        <Field label={L("住所","Address")}><Input value={L("埼玉県川越市的場 1-2-3","1-2-3 Matoba, Kawagoe, Saitama")}/></Field>
      </div>
    </Card>

    {/* ⑤ 保証人 — conditional (Step 2 = 連帯保証人あり) */}
    <Card>
      <CardHead title={L("⑤ 保証人 (連帯保証人)","⑤ Guarantor (co-signer)")} action={<Tag tone="outline">{L("申込種別=なし のため省略","Skipped — Step 2 = no co-signer")}</Tag>}/>
      <div className="p-5 text-[12px] text-[#475569]">
        {L("申込種別ステップで「連帯保証人なし」を選択したため、本セクションは入力不要です。連帯保証人を立てる場合は Step 2 で「あり」に変更してください (Step1相当のフィールド + 申込者との関係)。",
           "Step 2 selected 「no co-signer」, so this section is skipped. Change Step 2 to「あり」to enter co-signer details (Step1-equivalent fields + 続柄).")}
      </div>
    </Card>

    {/* ⑥ 勤務先・収入 (was Step 2 in old design; relocated as a Square 申込者 sub-section) */}
    <Card>
      <CardHead title={L("⑥ 勤務先・収入","⑥ Employer & income")} action={<Tag tone="warn" size="sm">{L("家賃比 35.6%","Rent ratio 35.6%")}</Tag>}/>
      <div className="p-5 grid grid-cols-2 gap-4">
        <Field label={L("勤務先名","Employer name")} required><Input value={L("株式会社サイバー","Cyber Co., Ltd.")}/></Field>
        <Field label={L("業種","Industry")}><Select value={L("情報通信業","ICT")}/></Field>
        <Field label={L("従業員数","Employees")}><Select value={L("1,000名以上","1,000+")}/></Field>
        <Field label={L("資本金","Capital")}><Input value="800,000,000" prefix="¥"/></Field>
        <Field label={L("勤務地","Office location")}><Input value={L("東京都港区六本木 6-10-1","6-10-1 Roppongi, Minato")}/></Field>
        <Field label={L("勤務先電話","Office phone")}><Input value="03-1234-5678"/></Field>
        <Field label={L("役職","Title")}><Input value={L("シニアエンジニア","Senior Engineer")}/></Field>
        <Field label={L("雇用形態","Employment")}><Select value={L("正社員","Full-time")}/></Field>
        <Field label={L("入社日","Hire date")}><Input value="2021-03-01" suffix="(5.2y)"/></Field>
        <Field label={L("年収 (税込)","Annual income (gross)")} required><Input value="6,200,000" prefix="¥"/></Field>
        <Field label={L("月収 (額面)","Monthly gross")}><Input value="517,000" prefix="¥"/></Field>
        <Field label={L("月収 (手取り)","Monthly net")}><Input value="392,000" prefix="¥"/></Field>
      </div>
      <div className="mx-5 mb-5 p-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-md text-[12px] text-[#92400E] flex items-start gap-2">
        <Icon.AlertCircle s={14} stroke="#92400E"/>
        <div>{L("家賃 ¥262,000 は月収 ¥517,000 の 35.6%。基準 (30%) を超えるため、保証会社の利用が必要です。",
              "Rent ¥262,000 is 35.6% of monthly gross ¥517,000. Above the 30% guideline — a guarantor company is required.")}</div>
      </div>
    </Card>

    {/* ⑦ 付帯サービス */}
    <Card>
      <CardHead title={L("⑦ 付帯サービス","⑦ Optional services")}/>
      <div className="p-5 space-y-2 text-[12.5px]">
        {[
          [L("家財保険 (¥1,735/月) — 必須加入","Contents insurance (¥1,735/mo) — required"), true, true],
          [L("引越サービス — サカイ引越センター割引","Move service — Sakai discount"), false, false],
          [L("家電レンタル","Appliance rental"), false, false],
          [L("ハウスクリーニング (退去時)","Move-out cleaning"), false, false],
        ].map(([n, on, locked], i) => (
          <label key={i} className={`flex items-center gap-2.5 cursor-pointer ${locked?"opacity-80":""}`}>
            <span className={`w-4 h-4 rounded ${on?"bg-[#0F172A]":"border border-[#CBD5E1]"} flex items-center justify-center`}>{on && <Icon.Check s={11} stroke="#fff"/>}</span>
            <span>{n}</span>
            {locked && <Tag tone="outline" size="sm">{L("必須","Required")}</Tag>}
          </label>
        ))}
      </div>
    </Card>

    {/* ⑧ 誓約・承諾事項 */}
    <Card>
      <CardHead title={L("⑧ 誓約・承諾事項","⑧ Pledges & consents")}/>
      <div className="p-5 space-y-2 text-[12.5px]">
        {[
          L("反社会的勢力でないことを確認します","I confirm I am not affiliated with anti-social forces"),
          L("過去の家賃滞納の有無を申告しました","I have disclosed any past rent arrears"),
          L("入居後のルール (騒音・ゴミ等) に同意します","I agree to building rules (noise, waste, etc.)"),
          L("個人情報の取扱い (審査・契約・管理目的) に同意します","I consent to personal-data handling (review / lease / management)"),
        ].map((n, i) => (
          <label key={i} className="flex items-center gap-2.5 cursor-pointer">
            <span className="w-4 h-4 rounded bg-[#0F172A] flex items-center justify-center"><Icon.Check s={11} stroke="#fff"/></span>
            <span>{n}</span>
          </label>
        ))}
      </div>
    </Card>

    {/* ⑨ その他確認事項 */}
    <Card>
      <CardHead title={L("⑨ その他確認事項","⑨ Other confirmations")}/>
      <div className="p-5 grid grid-cols-2 gap-4">
        <Field label={L("審査結果の連絡方法","How to receive review result")}><Select value={L("メール + 電話","Email + phone")}/></Field>
        <Field label={L("内見の済否","Have you viewed the unit?")}><Select value={L("済 (2026/05/24)","Yes (2026/05/24)")}/></Field>
        <Field label={L("併願物件の有無","Other applications in progress?")}><Select value={L("なし","None")}/></Field>
        <Field label={L("管理会社へのご質問","Question for mgmt co.")}><Input value="—"/></Field>
      </div>
    </Card>

    {/* ⑩ アンケート */}
    <Card>
      <CardHead title={L("⑩ アンケート","⑩ Quick survey")} sub={L("任意 — サービス改善のため","Optional — helps us improve")}/>
      <div className="p-5 grid grid-cols-2 gap-4">
        <Field label={L("どこで物件を知りましたか","How did you find this property?")}><Select value={L("仲介担当者の紹介","Agent referral")}/></Field>
        <Field label={L("ご感想・要望","Comments / requests")}><Input value="—"/></Field>
      </div>
    </Card>

    {/* 書類アップロード — §8 ADD: 在留カード / 課税証明書 / 印鑑証明書 (was missing) */}
    <Card>
      <CardHead title={L("書類アップロード","Document upload")}
        action={<Tag tone="warn"><Icon.AlertCircle s={11}/> {L("在職証明書が未アップロード","Employment cert missing")}</Tag>}/>
      <div className="p-3">
        <div className="grid grid-cols-3 gap-3">
          {docs.map(([n, fn, sz, st], i) => (
            <div key={i} className={`border rounded-md p-3 ${
              st==="pending"?"border-[#FDE68A] bg-[#FEF3C7]/40":
              st==="na"     ?"border-[#E5E7EB] bg-[#F7F8FA] opacity-60":
                             "border-[#E5E7EB]"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon.FileText s={15} stroke="#475569"/>
                <span className="text-[12.5px] font-semibold flex-1">{n}</span>
                {st==="ok"      && <Tag tone="ok"      size="sm"><Icon.Check s={10}/></Tag>}
                {st==="pending" && <Tag tone="warn"    size="sm">{L("未提出","Missing")}</Tag>}
                {st==="na"      && <Tag tone="outline" size="sm">{L("該当なし","N/A")}</Tag>}
              </div>
              {st === "ok" ? (
                <div className="flex items-center gap-2 p-2 rounded bg-[#F7F8FA] text-[11px]">
                  <Icon.Paperclip s={12} stroke="#94A3B8"/>
                  <span className="font-medium truncate flex-1">{fn}</span>
                  <span className="text-[#94A3B8]">{sz}</span>
                  <Icon.Trash s={12} stroke="#94A3B8"/>
                </div>
              ) : st === "pending" ? (
                <div className="border-2 border-dashed border-[#FDE68A] rounded-md p-3 text-center text-[11.5px] text-[#92400E]">
                  <Icon.Upload s={18} stroke="#92400E" style={{ display:"block", margin:"0 auto 4px" }}/>
                  {L("ドラッグ&ドロップまたはクリック","Drag & drop or click")}
                </div>
              ) : (
                <div className="rounded-md p-3 text-center text-[11px] text-[#94A3B8]">
                  {L("国籍=日本 のため不要","Not required (nationality = Japan)")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 pb-5 pt-2 text-[11px] text-[#94A3B8] leading-snug">
        {L("受け入れ形式: JPG / PNG / PDF · 1ファイル 10MB まで",
           "Accepted: JPG/PNG/PDF · 10MB per file")}
      </div>
    </Card>

    <div className="px-3 py-2 bg-[#F1F5F9] rounded-md text-[12px] text-[#475569] flex items-center gap-2">
      <Icon.Info s={14} stroke="#475569"/>
      {L("「確認画面へ →」 で B10 申込内容確認に進みます。送信前にすべての項目を再確認してください。",
         "「Review & submit →」 moves to B10 (application confirm). Re-check every field before submitting.")}
    </div>
  </B9Shell>;
};

// ── Step 6: DEPRECATED route. Square has 5 steps (§10); documents now live in Step 5.
//   This renders a thin "merged into Step 5" notice so the stale slug
//   09-application-form-step6-documents.html still loads cleanly without a 404.
window.ScreenB9Step6 = function () {
  return <B9Shell active={4} completion={95}
    prevLabel={L("申込者情報に戻る","Back: Applicant info")}
    nextLabel={L("確認画面へ →","Review & submit →")}>
    <Card>
      <CardHead title={L("このステップは Step 5「申込者情報」に統合されました","Merged into Step 5: Applicant info")}/>
      <div className="p-5 text-[12.5px] text-[#475569] space-y-3">
        <p>{L("実 いい生活Square 申込フォームは 5 ステップ (① 貴社情報 → ② 申込種別 → ③ 契約情報 → ④ 保証 → ⑤ 申込者情報) で構成されており、書類アップロードは ⑤ 申込者情報 内で完結します。",
              "The live いい生活Square form is 5 steps (① firm → ② type → ③ contract → ④ guarantor → ⑤ applicant). Documents are uploaded within ⑤ Applicant info.")}</p>
        <a href="09-application-form-step5-tenants.html" className="inline-block">
          <Btn kind="accent" icon={Icon.ArrowLeft}>{L("Step 5 申込者情報 へ","Go to Step 5: Applicant info")}</Btn>
        </a>
      </div>
    </Card>
  </B9Shell>;
};

// Legacy alias preserved (now points at the new applicant-info step)
window.ScreenB9AppForm = window.ScreenB9Step5;
// ══════════════════════════════ B10 — APPLICATION CONFIRM ══════════════════════════════
window.ScreenB10Confirm = function () {
  return (
    <BrokerShell active="applications"
      crumbs={[L("ホーム","Home"), L("入居申込","Apply"), L("確認","Confirm")]}
      title={L("申込内容のご確認","Confirm application")}
      subtitle={L("内容に誤りがなければ「送信して提出」を押してください","Press 'Submit' if everything is correct")}
      actions={<><Btn kind="ghost" icon={Icon.Print}>{L("印刷","Print")}</Btn><Btn kind="ghost" icon={Icon.Download}>{L("PDFで保存","Save as PDF")}</Btn></>}>

      <div className="grid grid-cols-[1fr_320px] gap-5">
        <div className="space-y-4">
          {/* Property summary card */}
          <Card>
            <div className="p-5 flex gap-4 items-center">
              <PhotoPh w={120} h={80} kind="exterior" tone={1}/>
              <div className="flex-1">
                <div className="text-[16px] font-semibold">ZOOM本郷 701</div>
                <div className="text-[11.5px] text-[#64748B]">{L("文京区本郷 5-24-5 · 1LDK · 42.5㎡","5-24-5 Hongo, Bunkyo · 1LDK · 42.5㎡")}</div>
              </div>
              <div className="text-right">
                <div className="text-[20px] font-bold tabnum">¥262,000</div>
                <div className="text-[11px] text-[#94A3B8]">{L("月額賃料","Monthly rent")}</div>
              </div>
            </div>
          </Card>

          {/* Sections */}
          {[
            [L("お客様情報","Applicant"), [
              [L("お名前","Name"),"山田 太郎"], [L("フリガナ","Reading"),"ヤマダ タロウ"],
              [L("生年月日 / 年齢","DOB / Age"),"1992-08-14 (33)"], [L("国籍","Nationality"),L("日本","Japan")],
              [L("電話","Phone"),"090-1234-5678"], [L("メール","Email"),"yamada@example.com"],
              [L("現住所","Current"),L("豊島区池袋 2-30-1 池袋ハイツ 201","2-30-1 Ikebukuro Heights 201, Toshima")]
            ]],
            [L("勤務先・収入","Work & income"), [
              [L("勤務先","Employer"),L("株式会社サイバー","Cyber Co., Ltd.")], [L("業種","Industry"),L("情報通信業","ICT")],
              [L("勤続","Tenure"),L("5年2ヶ月","5y 2mo")], [L("年収","Annual income"),"¥6,200,000"],
              [L("月収 (額面)","Monthly gross"),"¥517,000"], [L("雇用形態","Employment"),L("正社員","Full-time")],
            ]],
            [L("緊急連絡先","Emergency contact"), [
              [L("お名前","Name"),"山田 太郎 (父)"], [L("続柄","Relationship"),L("父","Father")],
              [L("電話","Phone"),"090-9876-5432"], [L("住所","Address"),L("埼玉県川越市的場 1-2-3","1-2-3 Matoba, Kawagoe, Saitama")]
            ]],
            [L("入居者・希望条件","Tenants & terms"), [
              [L("入居予定人数","Tenant count"),L("1名","1 person")], [L("入居予定日","Move-in date"),"2026/07/01"],
              [L("駐車場","Parking"),L("不要","Not needed")], [L("ペット","Pets"),L("なし","None")],
            ]],
            [L("保証会社","Guarantor company"), [
              [L("会社","Company"),"日本セーフティー"], [L("プラン","Plan"),L("シングル50%","Single 50%")],
              [L("初回保証料","Initial fee"),"¥131,000"], [L("審査結果","Result"),L("事前承認 (5/25)","Pre-approved (5/25)")]
            ]],
          ].map(([title, rows], i) => (
            <Card key={i}>
              <CardHead title={title} action={<Btn kind="link" size="sm" icon={Icon.Edit}>{L("編集","Edit")}</Btn>}/>
              <div className="grid grid-cols-2 gap-px bg-[#F1F5F9]">
                {rows.map(([k, v], j) => (
                  <div key={j} className="bg-white p-3.5">
                    <div className="text-[10.5px] uppercase tracking-wider text-[#94A3B8] font-semibold">{k}</div>
                    <div className="text-[12.5px] font-semibold mt-[2px]">{v}</div>
                  </div>
                ))}
              </div>
            </Card>
          ))}

          {/* Documents */}
          <Card>
            <CardHead title={L("提出書類","Documents")}/>
            <div className="grid grid-cols-3 gap-px bg-[#F1F5F9]">
              {[
                [L("運転免許 (表)","License front"),"OK"], [L("運転免許 (裏)","License back"),"OK"],
                [L("住民票","Resident card"),"OK"], [L("源泉徴収票 2025","2025 withholding"),"OK"],
                [L("在職証明書","Employment cert"),L("再アップロード","Re-upload")],[L("通帳コピー","Bank book copy"),"OK"]
              ].map(([n, st], i) => (
                <div key={i} className="bg-white p-3.5 flex items-center gap-2">
                  <Icon.FileText s={14} stroke="#475569"/>
                  <span className="text-[12px] flex-1">{n}</span>
                  {st==="OK" ? <Tag tone="ok" size="sm"><Icon.Check s={10}/></Tag> : <Tag tone="warn" size="sm">{st}</Tag>}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Summary + submit */}
        <div className="space-y-4 sticky" style={{ top: 16, alignSelf:"flex-start" }}>
          <Card>
            <CardHead title={L("送信前の確認","Pre-submit checks")}/>
            <div className="divide-y divide-[#F1F5F9]">
              {[
                [L("必須項目すべて入力","All required filled"), "ok"],
                [L("身分証 OCR 一致","ID OCR match"), "ok"],
                [L("家賃 / 月収比","Rent/income ratio"), "warn", "35.6%"],
                [L("保証会社 承認済","Guarantor pre-approved"), "ok"],
                [L("書類 6 / 6","Docs 6 / 6"), "warn"],
              ].map(([n, st, v], i) => (
                <div key={i} className="px-4 py-3 flex items-center gap-2 text-[12.5px]">
                  {st==="ok" ? <Icon.CheckCircle s={15} stroke="#16A34A"/> : <Icon.AlertCircle s={15} stroke="#F59E0B"/>}
                  <span className="flex-1">{n}</span>
                  {v && <span className="text-[11.5px] tabnum">{v}</span>}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-[#F1F5F9]">
              <label className="flex items-start gap-2 text-[12px] mb-3 cursor-pointer">
                <span className="w-4 h-4 mt-[2px] bg-[#0F172A] rounded flex items-center justify-center"><Icon.Check s={11} stroke="#fff"/></span>
                <span>{L("申込内容と書類に誤りがないことを確認しました。送信後の修正はチャットからのみ可能です。","I confirm the application and documents are correct. Edits after submission require a chat request.")}</span>
              </label>
              <Btn kind="accent" full size="lg" icon={Icon.Send}>{L("送信して提出","Submit application")}</Btn>
              <Btn kind="ghost" full size="sm" style={{ marginTop:6 }}>{L("修正に戻る","Back to edit")}</Btn>
            </div>
          </Card>
        </div>
      </div>
    </BrokerShell>
  );
};
