// _shared/screens/management-4.jsx — M15 Chat, M16 CSV, M17 Master data

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, Stat, Tabs, PhotoPh, Avatar, AppShell } = window;
const L = window.L;

// ══════════════════════════════ M15 — CHAT ══════════════════════════════
window.ScreenM15Chat = function () {
  // §M15 ADD: 取引先 / 社内 channel scope (miro: 取引先チャット / 社内チャット as separate pillars)
  const [chTab, setChTab] = React.useState(0); // 0 = 取引先, 1 = 社内
  // §M15 ADD: テンプレ ▾ reply-template dropdown (miro: テンプレート返信)
  const [tplOpen, setTplOpen] = React.useState(false);

  const channels = [
    // 取引先 (external partners — brokers & owners)
    [L("FINDERS 吉祥寺店","FINDERS Kichijoji"), L("中村: 鍵の受け渡しは…","Nakamura: For the key…"), "14:32", 3, true, "accent", "partner"],
    [L("アパマン 池袋","Apaman Ikebukuro"), L("佐藤: 内見の時間…","Sato: About the viewing time…"), "13:50", 1, false, "neutral", "partner"],
    [L("ミニミニ 渋谷","MINIMINI Shibuya"), L("[ファイル] application.pdf","[file] application.pdf"), "12:18", 0, false, "neutral", "partner"],
    [L("FINDERS 銀座","FINDERS Ginza"), L("高橋: ありがとうございました","Takahashi: Thank you very much"), L("昨日","Yest"), 0, false, "neutral", "partner"],
    [L("オーナー — 青葉ホールディングス","Owner — Aoba Holdings"), L("田中: 6月の更新について","Tanaka: re renewal in June"), L("5/24","5/24"), 0, false, "owner", "partner"],
    // 社内 (internal staff)
    [L("オープンルーム調整","Open-room sync"), L("田中: 土曜の集合場所は…","Tanaka: Saturday meet…"), L("5/22","5/22"), 0, false, "neutral", "internal"],
    [L("運用チーム — 吉祥寺","Ops team — Kichijoji"), L("小林: 内見対応ありがとうございました","Kobayashi: thanks for covering the viewing"), L("5/22","5/22"), 2, false, "neutral", "internal"],
    [L("審査・経理","Review & Finance"), L("大島: 申込 #1024 の確認をお願いします","Oshima: please review application #1024"), L("5/21","5/21"), 0, false, "neutral", "internal"],
  ];
  const scope = chTab === 0 ? "partner" : "internal";
  // §M15 ADD: reply templates (composer テンプレ ▾)
  const templates = [
    L("内見受付確認","Viewing-receipt confirmation"),
    L("申込書送付","Send application form"),
    L("鍵渡し案内","Key handover guide"),
    L("営業時間外","Out-of-hours notice"),
  ];
  const messages = [
    { who:"them", t:"14:08", body: L("お疲れ様です。ZOOM本郷 701 の内見ですが、本日18:00で確定でよろしいでしょうか？お客様 (山田様) は是非とのお話でした。",
                                     "Hi, confirming the viewing for ZOOM Hongo 701 at 18:00 today. Customer Mr. Yamada is very keen."), name:"FINDERS 中村"},
    { who:"them", t:"14:09", body: L("鍵の受け渡しは現地集合で大丈夫ですか？", "Will we meet on-site for the keys?"), name:"FINDERS 中村"},
    // §M15 ADD: system message (status-change banner)
    { who:"system", body: L("田中 健一 が内見ステータスを「確定」に変更しました","Tanaka Kenichi changed the viewing status to \u201cConfirmed\u201d") },
    { who:"me",   t:"14:14", body: L("お世話になります。18:00、現地で問題ありません。私が直接ご案内します。", "Thanks. 18:00 on-site works — I'll guide you in person."), name:"田中 健一", read:"2/2"},
    { who:"me",   t:"14:15", body: L("駐車場ご利用の場合は来客スペース3番にお願いします。", "If you drive, please use visitor space #3."), name:"田中 健一", read:"2/2"},
    { who:"them", t:"14:30", body: L("承知しました。山田様、添付の物件資料を改めてご確認いただけますでしょうか。", "Got it. Yamada-san, please review the attached property packet."), name:"FINDERS 中村", attach: { name: "ZOOM_Hongo_701_packet.pdf", size: "4.2MB" } },
    { who:"them", t:"14:32", body: L("当日は申込書もお持ちします。即日提出を希望されています。", "I'll bring the application too — customer wants to submit same-day."), name:"FINDERS 中村"},
  ];
  return (
    <AppShell active="chat" padded={false}
      crumbs={[L("ホーム","Home"), L("チャット","Chat")]}
      title={L("チャット","Chat")}>
      <div className="grid grid-cols-[300px_1fr_300px] gap-0" style={{ height: "calc(100vh - 152px)" }}>
        {/* Channels list */}
        <div className="border-r border-[#E5E7EB] bg-white overflow-y-auto">
          {/* §M15 ADD: 取引先 / 社内 scope tabs */}
          <div className="flex border-b border-[#E5E7EB]">
            {[L("取引先","Partners"), L("社内","Internal")].map((t, i) => (
              <button key={i} onClick={() => setChTab(i)}
                className={"flex-1 py-2.5 text-[12.5px] cursor-pointer border-b-2 -mb-px " + (chTab === i ? "border-[#0F172A] font-semibold text-[#0F172A]" : "border-transparent text-[#64748B] hover:text-[#0F172A]")}>
                {t}
              </button>
            ))}
          </div>
          <div className="p-3 border-b border-[#F1F5F9]">
            <Input value="" placeholder={L("チャットを検索","Search chats")} prefix={<Icon.Search s={13}/>}/>
          </div>
          <div className="p-2">
            {channels.filter(c => c[6] === scope).map(([name, last, time, unread, active, kind], i) => (
              <div key={i} className={`flex items-start gap-3 p-2.5 rounded-md cursor-pointer ${active ? "bg-[#F1F5F9]" : "hover:bg-[#F7F8FA]"}`}>
                <Avatar name={name[0]} tone={kind==="accent"?"accent":kind==="owner"?"blue":"neutral"} size={36}/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between">
                    <span className={`text-[12.5px] truncate ${active?"font-semibold":""}`}>{name}</span>
                    <span className="text-[10.5px] text-[#94A3B8] tabnum ml-2">{time}</span>
                  </div>
                  <div className="text-[11.5px] text-[#64748B] truncate">{last}</div>
                </div>
                {unread > 0 && <span className="w-5 h-5 bg-[#F59E0B] text-[#0F172A] rounded-full text-[10px] font-bold flex items-center justify-center">{unread}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Conversation */}
        <div className="flex flex-col bg-[#F7F8FA]">
          <div className="px-5 py-3 border-b border-[#E5E7EB] bg-white flex items-center gap-3">
            <Avatar name="F" tone="accent" size={36}/>
            <div>
              <div className="text-[13.5px] font-semibold">FINDERS 吉祥寺店</div>
              <div className="text-[11px] text-[#64748B] flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"/>{L("中村 健太郎 ・ オンライン","Nakamura Kentaro · online")}</div>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Btn kind="ghost" size="sm" icon={Icon.Search}/>
              <Btn kind="ghost" size="sm" icon={Icon.Phone}/>
              <Btn kind="ghost" size="sm" icon={Icon.MoreH}/>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            <div className="text-center text-[10.5px] text-[#94A3B8] my-3">{L("2026年 5月 26日 (火)","Tue · May 26, 2026")}</div>
            {messages.map((m, i) => (
              m.who === "system" ? (
                /* §M15 ADD: system status-change banner */
                <div key={i} className="flex justify-center my-1.5">
                  <span className="px-3 py-1 rounded-full bg-[#EEF1F4] text-[#64748B] text-[10.5px]">{m.body}</span>
                </div>
              ) : (
              <div key={i} className={`flex gap-2.5 ${m.who==="me"?"flex-row-reverse":""}`}>
                {m.who === "them" && <Avatar name={m.name[0]} tone="accent" size={26}/>}
                <div className={`max-w-[60%] ${m.who==="me"?"items-end":"items-start"} flex flex-col`}>
                  <div className={`px-3.5 py-2 rounded-2xl text-[13px] leading-relaxed ${
                    m.who==="me" ? "bg-[#0F172A] text-white rounded-tr-sm" : "bg-white border border-[#E5E7EB] text-[#0F172A] rounded-tl-sm"
                  }`}>{m.body}</div>
                  {m.attach && (
                    <div className="mt-1.5 flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-[#E5E7EB] text-[12px]">
                      <Icon.FileText s={14} stroke="#475569"/>
                      <span className="font-medium">{m.attach.name}</span>
                      <span className="text-[10.5px] text-[#94A3B8]">{m.attach.size}</span>
                      <Icon.Download s={13} stroke="#94A3B8"/>
                    </div>
                  )}
                  {/* §M15 ADD: read receipts under own messages */}
                  <div className="text-[10px] text-[#94A3B8] mt-1 tabnum flex items-center gap-1">
                    <span>{m.t}</span>
                    {m.who==="me" && m.read && (
                      <span className="inline-flex items-center gap-0.5 text-[#16A34A]">
                        <Icon.Check s={10} stroke="#16A34A"/>{L("既読","Read")} {m.read}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              )
            ))}
            {/*
              🔔 Proposed addition (GATED — not rendered):
                • Typing indicator (3-dot animation). Conventional for chat but not in the
                  M15 prompt/miro. Restore here if the customer approves a presence/typing signal.
              <div className="flex gap-2.5">
                <Avatar name="F" tone="accent" size={26}/>
                <div className="px-3 py-2 rounded-2xl bg-white border border-[#E5E7EB] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-pulse"/>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-pulse" style={{ animationDelay: "150ms" }}/>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-pulse" style={{ animationDelay: "300ms" }}/>
                </div>
              </div>
            */}
          </div>

          <div className="border-t border-[#E5E7EB] bg-white p-3">
            <div className="flex items-center gap-1 mb-2 text-[#475569]">
              <Btn kind="ghost" size="sm" icon={Icon.Paperclip}/>
              <Btn kind="ghost" size="sm" icon={Icon.Image}/>
              {/* §M15 RESTORE: 📝 テンプレ ▾ template-reply dropdown (was カレンダー) */}
              <div className="relative">
                <button onClick={() => setTplOpen(o => !o)}
                  className={"inline-flex items-center gap-1 h-8 px-2 rounded-md text-[12px] " + (tplOpen ? "bg-[#F1F5F9] text-[#0F172A]" : "text-[#475569] hover:bg-[#F7F8FA]")}>
                  <Icon.FileText s={15}/>{L("テンプレ","Templates")}<Icon.ChevronDown s={13}/>
                </button>
                {tplOpen && (
                  <div className="absolute bottom-full left-0 mb-1 w-56 bg-white border border-[#E5E7EB] rounded-md shadow-lg py-1 z-10">
                    <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#94A3B8]">{L("定型文を挿入","Insert template")}</div>
                    {templates.map((t, i) => (
                      <button key={i} className="w-full text-left px-3 py-2 text-[12.5px] hover:bg-[#F7F8FA]">{t}</button>
                    ))}
                    <div className="border-t border-[#F1F5F9] mt-1 pt-1">
                      <a href="17-master-data.html" className="flex items-center gap-2 px-3 py-2 text-[12px] text-[#0F172A] font-medium hover:bg-[#F7F8FA]">
                        <Icon.Settings s={13} stroke="#475569"/>{L("テンプレを管理","Manage templates")}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <Btn kind="ghost" size="sm" icon={Icon.Emoji}/>
              <span className="text-[10.5px] text-[#94A3B8] ml-2">{L("Shift+Enter で改行","Shift+Enter for newline")}</span>
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1 border border-[#CBD5E1] rounded-md p-2.5 text-[13px] min-h-[60px] text-[#0F172A]">
                {L("18時、お待ちしております。山田様によろしくお伝えください。","See you at 18:00. Please give my regards to Mr. Yamada.")}
                <span className="inline-block w-[1.5px] h-[14px] bg-[#0F172A] ml-[1px] animate-pulse"/>
              </div>
              <Btn kind="primary" icon={Icon.Send}>{L("送信","Send")}</Btn>
            </div>
          </div>
        </div>

        {/* Right context panel */}
        <div className="border-l border-[#E5E7EB] bg-white overflow-y-auto">
          <div className="p-4">
            <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("関連物件","Related property")}</div>
            <div className="rounded-md border border-[#E5E7EB] overflow-hidden">
              <PhotoPh h={100} kind="exterior" tone={1}/>
              <div className="p-3">
                <div className="text-[12.5px] font-semibold">ZOOM本郷 701</div>
                <div className="text-[11px] text-[#64748B]">1LDK · 42.5㎡ · ¥262,000</div>
                <div className="flex gap-2 mt-2">
                  <Btn kind="ghost" size="sm" full icon={Icon.Eye}>{L("詳細","Detail")}</Btn>
                  <Btn kind="ghost" size="sm" full icon={Icon.Calendar}>{L("内見","Viewing")}</Btn>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 pb-4">
            {/* §M15 ADD: 関連申込 (application status) */}
            <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("関連申込","Related application")}</div>
            <a href="14-application-detail-step2-doccheck.html" className="block rounded-md border border-[#E5E7EB] p-3 hover:bg-[#F8FAFC]">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold mono text-[#0F172A]">#2026-05-1024</span>
                <Tag tone="accent">{L("書類確認中","Document check")}</Tag>
              </div>
              <div className="text-[11.5px] text-[#64748B] mt-1">{L("申込者: 山田 太郎 様","Applicant: Mr. Taro Yamada")}</div>
              <div className="text-[11px] text-[#94A3B8] mt-0.5">ZOOM本郷 701 · {L("受付 5/20","Received 5/20")}</div>
              <div className="mt-2 flex items-center gap-1 text-[11.5px] font-semibold text-[#0F172A]">
                {L("申込を開く","Open application")} <Icon.ArrowRight s={11}/>
              </div>
            </a>
          </div>
          <div className="px-4 pb-4">
            <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("共有ファイル","Shared files")}</div>
            <div className="space-y-2">
              {[
                ["ZOOM_Hongo_701_packet.pdf", "4.2MB", "14:32"],
                ["floorplan_701.png",          "880KB", "5/22 11:14"],
                ["application_yamada.pdf",     "1.1MB", "5/20 16:08"],
              ].map(([n, s, t], i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded border border-[#E5E7EB] text-[11.5px]">
                  <Icon.FileText s={14} stroke="#475569"/>
                  <div className="flex-1 min-w-0 truncate">{n}</div>
                  <span className="text-[#94A3B8]">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

// M16 CSV出力・レポート → moved to _shared/screens/management-4-m16.jsx (rebuild 2026-08-20)

// M17 マスタデータ設定 → moved to _shared/screens/management-4-m17.jsx (rebuild 2026-08-20)
