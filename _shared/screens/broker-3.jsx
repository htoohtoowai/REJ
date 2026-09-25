// _shared/screens/broker-3.jsx — B11 My applications, B12 Broker chat, B13 Cost calculator

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, Stat, Tabs, PhotoPh, Avatar, AppShell } = window;
const L = window.L;

// Broker shell — forces role="broker" so all chrome reflects the broker IA (FIX-S1).
const BrokerShell = (props) => <AppShell role="broker" {...props}/>;

// ══════════════════════════════ B11 — MY APPLICATIONS ══════════════════════════════
window.ScreenB11MyApps = function () {
  const apps = [
    { id:"A-2026-0526-001", cust:"山田 太郎", prop:"青葉マンション 305", rent:"¥184,000", step:3, of:5, st:L("管理会社 審査中","Mgmt review"),       tone:"warn", age:"36h", urgent:true,  tone2:1 },
    { id:"A-2026-0525-019", cust:"佐藤 花子", prop:"ZOOM本郷 701",       rent:"¥262,000", step:4, of:5, st:L("オーナー判定","Owner review"),       tone:"warn", age:"18h", urgent:true,  tone2:2 },
    { id:"A-2026-0524-014", cust:"鈴木 一郎", prop:"ZOOM吉祥寺 501",     rent:"¥208,000", step:2, of:5, st:L("書類差し戻し","Docs returned"),     tone:"danger", age:"4h",  urgent:true,  tone2:3 },
    { id:"A-2026-0523-008", cust:"高橋 麗子", prop:"メゾン白金 102",     rent:"¥348,000", step:5, of:5, st:L("承認 → 契約準備","Approved · contract"), tone:"ok",    age:"—",   tone2:4 },
    { id:"A-2026-0522-022", cust:"渡辺 健太", prop:"カーサ恵比寿 203",   rent:"¥218,000", step:5, of:5, st:L("承認 → 契約準備","Approved · contract"), tone:"ok",    age:"—",   tone2:0 },
  ];
  return (
    <BrokerShell active="applications"
      crumbs={[L("ホーム","Home"), L("My 申込","My apps")]}
      title={L("My 申込","My applications")}
      subtitle={L("5件 進行中 · 2件 承認済 · 平均応答 14.2時間","5 in progress · 2 approved · avg response 14.2h")}
      actions={<><Btn kind="ghost" icon={Icon.Download}>{L("CSV","CSV")}</Btn></>}>

      <div className="grid grid-cols-4 gap-3 mb-5">
        <Stat label={L("審査中","Under review")} value="3" sub={L("最古 36h","Oldest 36h")} tone="down" icon={Icon.Clock}/>
        <Stat label={L("差し戻し","Sent back")} value="1" tone="down" icon={Icon.AlertCircle}/>
        <Stat label={L("承認・契約準備","Approved")} value="2" tone="up" icon={Icon.CheckCircle}/>
        <Stat label={L("月内成約見込","Closing this month")} value="4" sub={L("総額 ¥1.21M","Total ¥1.21M")} icon={Icon.Award}/>
      </div>

      <div className="mb-4"><Tabs tabs={[L("全て (8)","All (8)"), L("要対応 (3)","Action (3)"), L("審査中","Review"), L("承認済","Approved"), L("否認","Rejected")]} active={0}/></div>

      <div className="space-y-3">
        {apps.map((a, i) => (
          <Card key={i} className={`overflow-hidden ${a.urgent ? "ring-1 ring-[#F59E0B]/50" : ""}`}>
            <div className="grid grid-cols-[120px_1fr_220px_140px_120px]">
              <PhotoPh h={"100%"} kind="exterior" tone={a.tone2}/>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="mono text-[10px] text-[#94A3B8]">{a.id}</span>
                  {a.urgent && <Tag tone="warn" size="sm"><Icon.Activity s={10}/> {L("要対応","Action")}</Tag>}
                </div>
                <div className="text-[14.5px] font-semibold">{a.cust} <span className="text-[#94A3B8] font-normal">· {a.prop}</span></div>
                <div className="text-[11.5px] text-[#64748B] mt-1">{L("提出 5/24 09:14 · 入居希望 2026/07/01","Submitted 5/24 09:14 · move-in 2026/07/01")}</div>
                {/* Step bar */}
                <div className="mt-3 flex items-center gap-1">
                  {Array.from({length:a.of}).map((_, s) => (
                    <span key={s} className={`flex-1 h-1.5 rounded-full ${s < a.step ? "bg-[#0F172A]" : "bg-[#E5E7EB]"}`}/>
                  ))}
                  <span className="text-[10.5px] text-[#94A3B8] ml-2 tabnum">{a.step} / {a.of}</span>
                </div>
              </div>
              <div className="p-4 border-l border-[#F1F5F9] flex flex-col justify-center">
                <Tag tone={a.tone}>{a.st}</Tag>
                <div className="text-[11px] text-[#64748B] mt-2">{L("最終更新 14:32","Updated 14:32")}</div>
              </div>
              <div className="p-4 border-l border-[#F1F5F9] flex flex-col justify-center text-center">
                <div className="text-[10.5px] uppercase tracking-wider text-[#94A3B8]">{L("経過","Aging")}</div>
                <div className={`text-[20px] font-bold tabnum mt-1 ${a.tone==="danger"?"text-[#DC2626]":a.tone==="warn"?"text-[#B45309]":""}`}>{a.age}</div>
                <div className="text-[10.5px] text-[#94A3B8] mt-1">{L("家賃","Rent")} {a.rent}</div>
              </div>
              <div className="p-4 border-l border-[#F1F5F9] flex flex-col gap-2 justify-center">
                <Btn kind="ghost" size="sm" icon={Icon.Chat}>{L("チャット","Chat")}</Btn>
                <Btn kind="ghost" size="sm" iconRight={<Icon.ArrowRight s={11}/>}>{L("詳細","Detail")}</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
        <div className="text-[12px] text-[#475569] flex items-center gap-3">
          <span>{L("8件中 1〜5件を表示","Showing 1–5 of 8")}</span>
          <span className="w-px h-4 bg-[#E5E7EB]"/>
          <span className="flex items-center gap-2">
            {L("1ページあたり","Per page")}
            <div className="w-16"><Select value="5" /></div>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Btn kind="ghost" size="sm" icon={Icon.ChevronLeft}>{L("前","Prev")}</Btn>
          {["1","2"].map((p, i) => (
            <span key={i} className={`w-7 h-7 inline-flex items-center justify-center rounded-md text-[12px] cursor-pointer font-medium border ${
              p === "1" ? "bg-[#0F172A] text-white border-[#0F172A]" : "text-[#475569] border-[#E5E7EB] hover:bg-[#F1F5F9]"
            }`}>{p}</span>
          ))}
          <Btn kind="ghost" size="sm" iconRight={<Icon.ChevronRight s={11}/>}>{L("次","Next")}</Btn>
        </div>
      </div>
    </BrokerShell>
  );
};

// ══════════════════════════════ B12 — CHAT (BROKER SIDE) ══════════════════════════════
window.ScreenB12Chat = function () {
  const channels = [
    [L("LENZ DX 本店 — ZOOM本郷 701","LENZ DX HQ — ZOOM Hongo 701"), L("田中: 18時、お待ちしております。","Tanaka: See you at 18:00."), "14:32", 0, true,  "mgmt"],
    [L("恵比寿ホーム — カーサ恵比寿 203","Ebisu Home — Casa Ebisu 203"), L("内見の時間を変更したいのですが…","Could we change the viewing time…"), "13:48", 2, false, "mgmt"],
    [L("オーナーズパーク — メゾン白金 102","Owners Park — Maison Shirokane 102"), L("[ファイル] approval.pdf","[file] approval.pdf"), "11:20", 0, false, "mgmt"],
    [L("お客様 — 山田 太郎","Customer — Mr. Yamada Taro"), L("18時 大丈夫です。よろしくお願いします。","18:00 works for me, thank you."), L("12:08","12:08"), 0, false, "cust"],
    [L("お客様 — 佐藤 花子","Customer — Ms. Sato Hanako"), L("候補物件を3件 拝見しました…","Reviewed the 3 options…"), L("10:14","10:14"), 0, false, "cust"],
    [L("社内 — 営業会議","Internal — Sales sync"), L("中山: 月次会議は明日 9:00","Nakayama: monthly sync 9:00 tmrw"), L("昨日","yest"), 1, false, "team"],
  ];
  const messages = [
    { who:"them", t:"14:08", name:"LENZ DX 田中", body: L("お疲れ様です。ZOOM本郷 701、本日18:00 で確定でよろしいでしょうか？","Hi! Confirming the 18:00 viewing for ZOOM Hongo 701 today.") },
    { who:"them", t:"14:08", name:"LENZ DX 田中", body: L("駐車場が必要であれば来客スペース #3 をお使いください。","If parking is needed, please use visitor spot #3.") },
    { who:"me",   t:"14:15", name:"中村", body: L("お世話になります。18:00 で確定です。お客様もご快諾されています。","Thank you. 18:00 confirmed — customer has agreed.") },
    { who:"me",   t:"14:15", name:"中村", attach:{ name:"yamada_id.pdf", size:"1.2MB" }, body: L("当日の身分証も添付します。","Attaching ID for the day too.") },
    { who:"them", t:"14:32", name:"LENZ DX 田中", body: L("ありがとうございます。お待ちしております。","Thank you, see you then.") },
  ];
  return (
    <BrokerShell active="chat" padded={false}
      crumbs={[L("ホーム","Home"), L("チャット","Chat")]}
      title={L("チャット","Chat")}>
      <div className="grid grid-cols-[300px_1fr_300px]" style={{ height:"calc(100vh - 152px)" }}>
        {/* Channels */}
        <div className="border-r border-[#E5E7EB] bg-white overflow-y-auto">
          <div className="p-3 border-b border-[#F1F5F9] flex items-center gap-2">
            <Tabs tabs={[L("管理","Mgmt"), L("お客様","Cust"), L("社内","Team")]} active={0}/>
          </div>
          <div className="p-2">
            {channels.map((c, i) => {
              const [name, last, time, unread, active, kind] = c;
              const tone = kind==="cust" ? "blue" : kind==="team" ? "neutral" : "accent";
              return (
                <div key={i} className={`flex items-start gap-3 p-2.5 rounded-md cursor-pointer ${active?"bg-[#F1F5F9]":"hover:bg-[#F7F8FA]"}`}>
                  <Avatar name={name[0]} tone={tone} size={36}/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between">
                      <span className={`text-[12.5px] truncate ${active?"font-semibold":""}`}>{name}</span>
                      <span className="text-[10.5px] text-[#94A3B8] tabnum ml-2">{time}</span>
                    </div>
                    <div className="text-[11.5px] text-[#64748B] truncate">{last}</div>
                  </div>
                  {unread > 0 && <span className="w-5 h-5 bg-[#F59E0B] text-[#0F172A] rounded-full text-[10px] font-bold flex items-center justify-center">{unread}</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Conversation */}
        <div className="flex flex-col bg-[#F7F8FA]">
          <div className="px-5 py-3 border-b border-[#E5E7EB] bg-white flex items-center gap-3">
            <Avatar name="L" tone="accent" size={36}/>
            <div>
              <div className="text-[13.5px] font-semibold">LENZ DX 本店</div>
              <div className="text-[11px] text-[#64748B] flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"/> {L("田中 健一 · オンライン","Tanaka Kenichi · online")}</div>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <Tag tone="outline">ZOOM本郷 701</Tag>
              <Btn kind="ghost" size="sm" icon={Icon.Eye}/>
              <Btn kind="ghost" size="sm" icon={Icon.MoreH}/>
            </div>
          </div>

          {/* Quick chips */}
          <div className="px-5 py-2 bg-white border-b border-[#F1F5F9] flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8]">{L("クイック返信","Quick replies")}</span>
            {[
              L("内見を予約","Book a viewing"),
              L("空室状況を確認","Check vacancy"),
              L("初期費用を教えてください","Request move-in cost"),
              L("申込みします","I'd like to apply"),
            ].map((q, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[11.5px] cursor-pointer whitespace-nowrap">{q}</span>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            <div className="text-center text-[10.5px] text-[#94A3B8] my-3">{L("2026/05/26 (火)","Tue · May 26, 2026")}</div>
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2.5 ${m.who==="me"?"flex-row-reverse":""}`}>
                {m.who==="them" && <Avatar name={m.name[0]} tone="accent" size={26}/>}
                <div className={`max-w-[60%] flex flex-col ${m.who==="me"?"items-end":""}`}>
                  <div className={`px-3.5 py-2 rounded-2xl text-[13px] leading-relaxed ${
                    m.who==="me" ? "bg-[#0F172A] text-white rounded-tr-sm" : "bg-white border border-[#E5E7EB] rounded-tl-sm"
                  }`}>{m.body}</div>
                  {m.attach && (
                    <div className="mt-1.5 flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-[#E5E7EB] text-[12px]">
                      <Icon.FileText s={14} stroke="#475569"/>
                      <span className="font-medium">{m.attach.name}</span>
                      <span className="text-[10.5px] text-[#94A3B8]">{m.attach.size}</span>
                      <Icon.Download s={13} stroke="#94A3B8"/>
                    </div>
                  )}
                  <div className="text-[10px] text-[#94A3B8] mt-1 tabnum">{m.t} {m.who==="me" && <Icon.Check s={10} stroke="#16A34A" style={{ display:"inline-block", verticalAlign:"middle", marginLeft:2 }}/>}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E5E7EB] bg-white p-3">
            <div className="flex items-center gap-1 mb-2">
              {[Icon.Paperclip, Icon.Image, Icon.Calendar, Icon.Wallet, Icon.Emoji].map((I, i) => <Btn key={i} kind="ghost" size="sm" icon={I}/>)}
              <span className="text-[10.5px] text-[#94A3B8] ml-2">{L("お客様情報を含めずに送信","Customer info excluded by default")}</span>
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1 border border-[#CBD5E1] rounded-md p-2.5 text-[13px] min-h-[60px]">
                <span className="text-[#94A3B8]">{L("メッセージを入力…","Type a message…")}</span>
              </div>
              <Btn kind="primary" icon={Icon.Send}>{L("送信","Send")}</Btn>
            </div>
          </div>
        </div>

        {/* Customer panel */}
        <div className="border-l border-[#E5E7EB] bg-white overflow-y-auto">
          <div className="p-4">
            <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("関連お客様","Related customer")}</div>
            <div className="rounded-md border border-[#E5E7EB] p-3 flex items-center gap-3">
              <Avatar name="山" tone="blue" size={40}/>
              <div>
                <div className="text-[13px] font-semibold">山田 太郎 様</div>
                <div className="text-[11px] text-[#64748B]">33 · {L("単身","Single")} · {L("年収 ¥6.2M","Income ¥6.2M")}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-[11.5px] text-[#475569]">
              <div className="p-2 rounded bg-[#F1F5F9]">
                <div className="text-[#94A3B8]">{L("お気に入り","Faves")}</div>
                <div className="font-semibold tabnum text-[#0F172A] mt-[2px]">8</div>
              </div>
              <div className="p-2 rounded bg-[#F1F5F9]">
                <div className="text-[#94A3B8]">{L("内見","Viewings")}</div>
                <div className="font-semibold tabnum text-[#0F172A] mt-[2px]">3</div>
              </div>
              <div className="p-2 rounded bg-[#F1F5F9]">
                <div className="text-[#94A3B8]">{L("申込","Apps")}</div>
                <div className="font-semibold tabnum text-[#0F172A] mt-[2px]">1</div>
              </div>
              <div className="p-2 rounded bg-[#F1F5F9]">
                <div className="text-[#94A3B8]">{L("信用","Score")}</div>
                <div className="font-semibold tabnum text-[#0F172A] mt-[2px]">812</div>
              </div>
            </div>
            <Btn kind="ghost" size="sm" full style={{ marginTop:10 }} iconRight={<Icon.ArrowRight s={11}/>}>{L("顧客カードを開く","Open customer card")}</Btn>
          </div>
          <div className="px-4 pb-4">
            <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("予定の内見","Scheduled viewings")}</div>
            <div className="rounded-md border border-[#E5E7EB] p-3">
              <div className="text-[10.5px] text-[#94A3B8] tabnum">{L("本日 18:00","Today 18:00")}</div>
              <div className="text-[12.5px] font-semibold">ZOOM本郷 701</div>
              <Btn kind="ghost" size="sm" full style={{ marginTop:8 }} icon={Icon.MapPin}>{L("ナビ起動","Navigate")}</Btn>
            </div>
          </div>
        </div>
      </div>
    </BrokerShell>
  );
};

// ══════════════════════════════ B13 — INITIAL COST CALCULATOR ══════════════════════════════
window.ScreenB13Calc = function () {
  return (
    <BrokerShell active="dashboard"
      crumbs={[L("ホーム","Home"), L("初期費用シミュレーター","Move-in cost calculator")]}
      title={L("初期費用シミュレーター","Initial-cost calculator")}
      subtitle={L("お客様にすぐ共有できるURLを生成 · 月額・初期・年間まで一望","Generate a customer-ready URL · monthly, initial and yearly at a glance")}
      actions={<><Btn kind="ghost" icon={Icon.Send}>{L("URLをコピー","Copy URL")}</Btn><Btn kind="accent" icon={Icon.Download}>{L("PDFで保存","Save PDF")}</Btn></>}>

      <div className="grid grid-cols-[1fr_380px] gap-5">
        <div className="space-y-5">
          {/* Property pick */}
          <Card>
            <CardHead title={L("対象物件","Property")}/>
            <div className="p-4 flex items-center gap-4">
              <PhotoPh w={120} h={88} kind="exterior" tone={1}/>
              <div className="flex-1">
                <div className="text-[14px] font-semibold">ZOOM本郷 701</div>
                <div className="text-[11.5px] text-[#64748B]">{L("文京区本郷 5-24-5 · 1LDK · 42.5㎡","5-24-5 Hongo, Bunkyo · 1LDK · 42.5㎡")}</div>
                <div className="text-[18px] font-bold tabnum mt-1">¥262,000 <span className="text-[11px] text-[#94A3B8] font-normal">/ {L("月","mo")}</span></div>
              </div>
              <Btn kind="ghost" size="sm" iconRight={<Icon.ChevronDown s={12}/>}>{L("変更","Change")}</Btn>
            </div>
          </Card>

          {/* Monthly cost */}
          <Card>
            <CardHead title={L("月額費用","Monthly cost")}/>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4">
                <Field label={L("賃料","Rent")}><Input value="262,000" prefix="¥"/></Field>
                <Field label={L("管理費・共益費","Common fee")}><Input value="20,000" prefix="¥"/></Field>
                <Field label={L("駐車場","Parking")}><Input value="0" prefix="¥"/></Field>
                <Field label={L("その他","Other")}><Input value="0" prefix="¥"/></Field>
              </div>
            </div>
          </Card>

          {/* Initial */}
          <Card>
            <CardHead title={L("初期費用の内訳","Move-in cost breakdown")} action={<Btn kind="ghost" size="sm" icon={Icon.Plus}>{L("項目を追加","Add item")}</Btn>}/>
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#F7F8FA] text-[11px] uppercase tracking-wider text-[#475569]">
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left px-4 py-2.5">{L("項目","Item")}</th>
                  <th className="text-left px-2 py-2.5">{L("単位","Unit")}</th>
                  <th className="text-right px-2 py-2.5">{L("金額","Amount")}</th>
                  <th className="px-2 py-2.5 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {[
                  [L("敷金","Deposit"),       L("1ヶ月","1mo"),    "262,000"],
                  [L("礼金","Key money"),     L("1ヶ月","1mo"),    "262,000"],
                  [L("仲介手数料","Brokerage fee"), L("1ヶ月+税","1mo+tax"), "288,200"],
                  [L("保証会社初回","Guarantor initial"), L("50% (賃料)","50% rent"), "131,000"],
                  [L("鍵交換費","Key change"), "—", "22,000"],
                  [L("クリーニング費","Cleaning"), "—", "44,000"],
                  [L("火災保険","Fire insurance"), L("2年","2y"), "20,000"],
                  [L("前家賃 (日割)","Prorated rent"), L("6日分","6d"), "55,800"],
                ].map((r, i) => (
                  <tr key={i} className="border-b last:border-0 border-[#F1F5F9]">
                    <td className="px-4 py-2.5">{r[0]}</td>
                    <td className="px-2 py-2.5 text-[#64748B]">{r[1]}</td>
                    <td className="px-2 py-2.5 text-right font-semibold tabnum">¥{r[2]}</td>
                    <td className="px-2 py-2.5 text-right"><Icon.Edit s={12} stroke="#94A3B8"/></td>
                  </tr>
                ))}
                <tr className="bg-[#FEF3C7] font-bold">
                  <td className="px-4 py-3" colSpan={2}>{L("初期費用 合計","Move-in total")}</td>
                  <td className="px-2 py-3 text-right tabnum">¥1,085,000</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </Card>

          {/* Year total chart */}
          <Card>
            <CardHead title={L("年間支払額の推移","Yearly outlay")}/>
            <div className="p-5">
              <svg viewBox="0 0 600 160" className="w-full h-32">
                {[1085000, 304000*12, 304000*12, 304000*12+262000, 304000*12].map((v, i) => {
                  const h = (v/1500000)*110;
                  return (
                    <g key={i}>
                      <rect x={50+i*110} y={130-h} width="60" height={h} fill={i===0?"#F59E0B":"#0F172A"} opacity={i===0?1:0.85}/>
                      <text x={80+i*110} y={150} textAnchor="middle" fontSize="11" fill="#94A3B8">Y{i+1}</text>
                      <text x={80+i*110} y={125-h} textAnchor="middle" fontSize="11" fill="#0F172A" fontWeight="600">¥{(v/10000).toFixed(0)}万</text>
                    </g>
                  );
                })}
              </svg>
              <div className="text-[11.5px] text-[#475569] mt-2">
                {L("1年目は初期費用 ¥1.085M を含めて約 ¥4.74M。更新月 (4年目) は更新料 ¥262,000 を加算。","Year 1 totals ~¥4.74M incl. move-in. Year 4 adds renewal fee ¥262,000.")}
              </div>
            </div>
          </Card>
        </div>

        {/* Totals summary */}
        <div className="space-y-4 sticky" style={{ top: 16, alignSelf:"flex-start" }}>
          <Card style={{ background:"linear-gradient(135deg,#0F172A,#1F2937)" }} className="text-white">
            <div className="p-5">
              <div className="text-[10.5px] uppercase tracking-[0.2em] opacity-70 font-semibold">{L("月額合計","Monthly total")}</div>
              <div className="text-[32px] font-bold tabnum mt-1">¥304,000</div>
              <div className="text-[11.5px] opacity-70">{L("管理費・共益費 ¥20,000 込","Includes mgmt ¥20,000")}</div>

              <div className="mt-5 pt-5 border-t border-white/15">
                <div className="text-[10.5px] uppercase tracking-[0.2em] opacity-70 font-semibold">{L("初期費用 (税込)","Initial (incl. tax)")}</div>
                <div className="text-[28px] font-bold tabnum mt-1" style={{ color:"#F59E0B" }}>¥1,085,000</div>
                <div className="text-[11.5px] opacity-70">{L("月収 ¥517,000 の 約2.1ヶ月分","≈2.1× monthly gross income")}</div>
              </div>
              <div className="mt-5 pt-5 border-t border-white/15 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10.5px] opacity-70">{L("家賃 / 月収比","Rent / income")}</div>
                  <div className="text-[18px] font-semibold mt-1 tabnum">35.6%</div>
                </div>
                <div>
                  <div className="text-[10.5px] opacity-70">{L("年間総額","Year 1 total")}</div>
                  <div className="text-[18px] font-semibold mt-1 tabnum">¥4,733,000</div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHead title={L("お客様への共有","Share with customer")}/>
            <div className="p-4">
              <div className="bg-[#F1F5F9] rounded-md p-3 mono text-[11px] text-[#475569] mb-3 truncate">
                lenz-connect.jp/quote/zhg-701?c=yamada-37b1
              </div>
              <Btn kind="primary" full icon={Icon.Send}>{L("URLをコピー","Copy URL")}</Btn>
              <Btn kind="ghost" full size="sm" style={{ marginTop:6 }} icon={Icon.Mail}>{L("メールで送る","Send via email")}</Btn>
              <Btn kind="ghost" full size="sm" style={{ marginTop:6 }} icon={Icon.Chat}>{L("チャットに添付","Attach to chat")}</Btn>
            </div>
          </Card>

          <Card>
            <CardHead title={L("交渉ヒント (AI)","Negotiation hints (AI)")} action={<Tag tone="outline">{L("実験","Beta")}</Tag>}/>
            <div className="p-4 text-[12px] text-[#475569] leading-relaxed">
              {L("近隣相場と比較してフリーレント0.5ヶ月の交渉余地あり (▼ ¥131k 初期費用)。礼金は据置が想定されます。","Comp data suggests room to negotiate 0.5mo free rent (saves ~¥131k initial). Key money likely fixed.")}
            </div>
          </Card>
        </div>
      </div>
    </BrokerShell>
  );
};
