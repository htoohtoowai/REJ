// _shared/screens/common.jsx — Login, MFA, Account Settings, Notifications, Error pages

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, Stat, Tabs, Avatar, AppShell, SplashShell } = window;
const L = window.L;

// ──────────────────────────────────────────────────────── C1 — LOGIN
window.ScreenC1Login = function () {
  return (
    <SplashShell accent={L("物件情報を一元管理。", "One workspace for every listing.")}>
      <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#94A3B8]">{L("管理会社向け", "For management companies")}</div>
      <h2 className="text-[28px] font-semibold mt-2 mb-1 hl">{L("ログイン", "Sign in")}</h2>
      <div className="text-[13px] text-[#64748B] mb-7">{L("LENZ Connect にようこそ。", "Welcome back to LENZ Connect.")}</div>

      <div className="space-y-4">
        <Field label={L("メールアドレス", "Email")} required>
          <Input value="tanaka.kenichi@lenz-dx.jp" />
        </Field>
        <Field label={L("パスワード", "Password")} required hint={<a className="text-[#0F172A] underline">{L("お忘れですか？", "Forgot?")}</a>}>
          <Input value="••••••••••••" suffix={<Icon.Eye s={14} stroke="#94A3B8"/>}/>
        </Field>
        <Btn kind="primary" size="lg" full>{L("ログイン →", "Sign in →")}</Btn>
      </div>

      <div className="mt-10 text-[11px] text-[#94A3B8] flex justify-between">
        <span>© 2026 LENZ DX</span>
        <div className="flex gap-3">
          <a className="hover:text-[#0F172A]">{L("利用規約", "Terms")}</a>
          <a className="hover:text-[#0F172A]">{L("プライバシー", "Privacy")}</a>
        </div>
      </div>
    </SplashShell>
  );
};

// ──────────────────────────────────────────────────────── C2 — MFA
window.ScreenC2MFA = function () {
  const digits = ["8","3","2","9","",""];
  return (
    <SplashShell>
      <div className="flex items-center gap-2 mb-6">
        <button className="w-8 h-8 rounded-md border border-[#E5E7EB] flex items-center justify-center"><Icon.ArrowLeft s={14}/></button>
        <span className="text-[12px] text-[#64748B]">{L("ログイン画面に戻る", "Back to sign-in")}</span>
      </div>
      <div className="w-14 h-14 rounded-xl bg-[#0F172A] text-white flex items-center justify-center mb-5">
        <Icon.Lock s={22} stroke="#F59E0B"/>
      </div>
      <h2 className="text-[26px] font-semibold mb-1 hl">{L("認証コードを入力", "Enter verification code")}</h2>
      <div className="text-[13px] text-[#64748B] mb-8">
        {L("認証アプリに表示されている6桁のコードを入力してください。", "Enter the 6-digit code shown in your authenticator app.")}
      </div>

      <div className="flex gap-2 mb-4">
        {digits.map((d, i) => (
          <div key={i} className={`flex-1 h-14 rounded-md border-2 flex items-center justify-center text-[22px] font-semibold tabnum
            ${d ? "border-[#0F172A] bg-white text-[#0F172A]" : i === 4 ? "border-[#F59E0B] bg-[#FEF3C7] text-[#92400E]" : "border-[#E5E7EB] bg-white text-[#CBD5E1]"}`}>
            {d || (i === 4 ? "_" : "")}
          </div>
        ))}
      </div>
      <div className="text-[12px] text-[#64748B] mb-6 flex items-center gap-2">
        <Icon.Clock s={13} stroke="#64748B"/>
        <span>{L("コードの有効期限: ", "Code expires in: ")}<b className="text-[#0F172A] tabnum">00:47</b></span>
        <span className="ml-auto text-[#0F172A] underline cursor-pointer">{L("コードを再送する", "Resend code")}</span>
      </div>

      <Btn kind="primary" size="lg" full>{L("認証する →", "Verify →")}</Btn>

      <div className="mt-8 border-t border-[#E5E7EB] pt-5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">{L("他の認証方法", "Other methods")}</div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2.5 rounded-md border border-[#E5E7EB] hover:bg-[#F7F8FA] cursor-pointer">
            <Icon.Key s={15} stroke="#475569"/>
            <span className="text-[13px]">{L("バックアップコードを使う", "Use a backup code")}</span>
          </div>
        </div>
      </div>
    </SplashShell>
  );
};

// ──────────────────────────────────────────────────────── C3 — ACCOUNT SETTINGS
window.ScreenC3Account = function () {
  const sections = [
    { key:"profile",  label: L("プロフィール","Profile"),         icon: Icon.User, active: true },
    { key:"security", label: L("セキュリティ","Security"),        icon: Icon.Lock },
    { key:"notif",    label: L("通知設定","Notifications"),       icon: Icon.Bell },
    { key:"display",  label: L("表示設定 (言語・時間)","Display & Language"), icon: Icon.Globe },
    { key:"connect",  label: L("連携アプリ","Connected apps"),    icon: Icon.Layers },
    { key:"team",     label: L("チーム・権限","Team & roles"),    icon: Icon.Briefcase },
  ];
  return (
    <AppShell active="settings"
      crumbs={[L("ホーム","Home"), L("設定","Settings"), L("アカウント","Account")]}
      title={L("アカウント設定", "Account settings")}
      subtitle={L("田中 健一 さん · LENZ DX 本店 / 管理者", "Tanaka Kenichi · LENZ DX Head Office / Admin")}
      actions={<Btn kind="ghost" icon={Icon.Logout}>{L("ログアウト","Log out")}</Btn>}>
      <div className="grid grid-cols-[240px_1fr] gap-6">
        <Card className="p-2 h-fit">
          {sections.map(s => (
            <div key={s.key} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md mb-[2px] cursor-pointer ${s.active ? "bg-[#F1F5F9] font-semibold" : "hover:bg-[#F7F8FA]"}`}>
              <s.icon s={15} stroke={s.active ? "#0F172A" : "#64748B"}/>
              <span className="text-[13px]">{s.label}</span>
            </div>
          ))}
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHead title={L("プロフィール","Profile")} sub={L("公開されるユーザー情報","User info visible to colleagues")}/>
            <div className="p-5 grid grid-cols-[120px_1fr] gap-5 items-start">
              <div className="text-center">
                <Avatar name={L("田","T")} tone="accent" size={96}/>
                <div className="text-[11px] text-[#0F172A] underline mt-2 cursor-pointer">{L("画像を変更","Change photo")}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label={L("姓","Last name")} required><Input value={L("田中","Tanaka")}/></Field>
                <Field label={L("名","First name")} required><Input value={L("健一","Kenichi")}/></Field>
                <Field label={L("メール","Email")} required><Input value="tanaka.kenichi@lenz-dx.jp"/></Field>
                <Field label={L("電話番号","Phone")}><Input value="090-1234-5678"/></Field>
                <Field label={L("役職","Role")}><Input value={L("管理者","Administrator")}/></Field>
                <Field label={L("拠点","Office")}><Select value={L("本店 (東京)","Head office (Tokyo)")}/></Field>
              </div>
            </div>
            <div className="px-5 py-3 border-t border-[#F1F5F9] flex justify-end gap-2">
              <Btn kind="ghost">{L("キャンセル","Cancel")}</Btn>
              <Btn kind="accent">{L("変更を保存","Save changes")}</Btn>
            </div>
          </Card>

          <Card>
            <CardHead title={L("セキュリティ","Security")} action={<Tag tone="ok" icon={Icon.CheckCircle}>{L("MFA 有効","MFA on")}</Tag>}/>
            <div className="divide-y divide-[#F1F5F9]">
              {[
                [L("パスワード","Password"), L("最終更新 2026/03/12","Last changed 2026/03/12"), L("変更","Change")],
                [L("二要素認証","Two-factor authentication"), L("認証アプリ (Authenticator) — •••• 7841","Authenticator app — •••• 7841"), L("管理","Manage")],
                [L("アクティブセッション","Active sessions"), L("3端末でログイン中","Signed in on 3 devices"), L("確認","View")],
                [L("APIトークン","API tokens"), L("2件のトークンが有効","2 tokens active"), L("管理","Manage")],
              ].map(([t, sub, btn], i) => (
                <div key={i} className="px-5 py-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-semibold">{t}</div>
                    <div className="text-[11.5px] text-[#64748B] mt-[2px]">{sub}</div>
                  </div>
                  <Btn kind="ghost" size="sm">{btn}</Btn>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHead title={L("ログイン中のセッション","Active sessions")} sub={L("3件中 3件使用中","3 of 3 in use")}/>
            <div className="divide-y divide-[#F1F5F9]">
              {[
                [L("MacBook Pro · Chrome","MacBook Pro · Chrome"), L("東京","Tokyo"), L("たった今","Just now"), true],
                [L("iPad · Safari","iPad · Safari"), L("東京","Tokyo"), L("2時間前","2 hours ago"), false],
                [L("Windows · Edge","Windows · Edge"), L("東京","Tokyo"), "5/25 18:04", false],
              ].map(([dev, loc, when, isThis], i) => (
                <div key={i} className="px-5 py-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-semibold text-[#0F172A] flex items-center gap-2">
                      {dev}
                      {isThis && <Tag size="sm" tone="neutral">{L("このデバイス","This device")}</Tag>}
                    </div>
                    <div className="text-[11.5px] text-[#64748B] mt-[2px] tabnum">{loc} · {when}</div>
                  </div>
                  {!isThis && <Btn kind="ghost" size="sm">{L("このセッションを終了","End session")}</Btn>}
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-[#F1F5F9] text-[11px] text-[#94A3B8] leading-relaxed">
              {L("30分間操作がないと自動ログアウトします。連続利用は最大12時間です。管理者は1時間ごとに再認証が必要です。",
                 "You're logged out automatically after 30 minutes idle. Sessions expire after 12 hours regardless. Administrators must re-authenticate every hour.")}
            </div>
            <div className="px-5 py-3 border-t border-[#F1F5F9]">
              <a href="17-master-data.html" className="text-[11.5px] text-[#0F172A] underline">{L("他のユーザーのセッションを終了","End other users' sessions")}</a>
            </div>
          </Card>

          <Card>
            <CardHead title={L("危険な操作","Danger zone")}/>
            <div className="p-5 bg-[#FEF2F2] border-t border-[#FECACA] flex items-center justify-between">
              <div>
                <div className="text-[13px] font-semibold text-[#991B1B]">{L("アカウントを停止する","Deactivate account")}</div>
                <div className="text-[11.5px] text-[#991B1B]/80 mt-[2px]">{L("管理者に依頼してアカウントを停止することができます。データは90日間保持されます。", "Ask an administrator to deactivate this account. Data is retained for 90 days.")}</div>
              </div>
              <Btn kind="danger">{L("停止を依頼","Request deactivation")}</Btn>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

// ──────────────────────────────────────────────────────── C4 — NOTIFICATIONS
window.ScreenC4Notifications = function () {
  const groups = [
    { day: L("今日 · 2026年5月26日 (火)", "Today · Tue, May 26 2026"), items: [
      { tone:"danger",  ico: Icon.AlertCircle, t: L("SUUMO 出稿失敗","SUUMO publish failed"), b: L("ZOOM本郷 305 の画像が36ポイントルール違反です。要再撮影。","ZOOM Hongo 305 image violates the 36-point rule. Re-shoot required."), time:"14:38", new:true, tag: L("出稿","Publish")},
      { tone:"accent",  ico: Icon.Calendar,    t: L("新規 内見予約","New viewing booked"), b: L("FINDERS 吉祥寺店 が ZOOM本郷 701 を 18:00 に予約","FINDERS Kichijoji booked ZOOM Hongo 701 at 18:00"), time:"14:32", new:true, tag: L("内見","Viewing")},
      { tone:"accent",  ico: Icon.FileText,    t: L("新規 入居申込","New application"), b: L("山田 太郎 様 から 青葉マンション 305 への申込","Mr. Yamada Taro applied to Aoba Mansion 305"), time:"14:15", new:true, tag: L("申込","Application")},
      { tone:"ok",      ico: Icon.CheckCircle, t: L("出稿完了","Publish complete"), b: L("5物件が SUUMO・HOMES・at home へ出稿完了","5 properties published to SUUMO, HOMES, at home"), time:"13:50", new:true, tag: L("出稿","Publish")},
      { tone:"neutral", ico: Icon.Chat,        t: L("メッセージ","New message"), b: L("FINDERS 池袋: 内見の鍵の受け渡し場所について…","FINDERS Ikebukuro: about the key pickup location for viewing…"), time:"11:22", tag: L("チャット","Chat")},
    ]},
    { day: L("昨日 · 5月25日 (月)", "Yesterday · Mon, May 25"), items: [
      { tone:"neutral", ico: Icon.Sync,        t: L("RAINZ 同期完了","RAINZ sync complete"), b: L("142件の物件情報を同期しました","Synced 142 listings"), time:"22:01", tag: L("システム","System")},
      { tone:"warn",    ico: Icon.Alert,       t: L("空室期間の延長","Vacancy extended"), b: L("ZOOM吉祥寺 305 が空室30日を超過","ZOOM Kichijoji 305 vacant for 30+ days"), time:"09:14", tag: L("物件","Property")},
    ]},
  ];
  return (
    <AppShell active="dashboard"
      crumbs={[L("ホーム","Home"), L("通知","Notifications")]}
      title={L("通知センター","Notification center")}
      subtitle={L("8件の未読 · 過去30日間で 247件","8 unread · 247 in the last 30 days")}
      actions={<>
        <Btn kind="ghost" icon={Icon.Settings}>{L("通知設定","Settings")}</Btn>
        <Btn kind="ghost" icon={Icon.Check}>{L("すべて既読","Mark all read")}</Btn>
      </>}>
      <div className="grid grid-cols-[260px_1fr] gap-6">
        <Card className="p-2 h-fit">
          {[
            [L("すべて","All"),       247, true],
            [L("未読","Unread"),       8,  false],
            [L("出稿","Publish"),     31,  false],
            [L("内見","Viewings"),    44,  false],
            [L("申込","Applications"),18,  false],
            [L("チャット","Chat"),    52,  false],
            [L("システム","System"),  94,  false],
          ].map(([n, c, act], i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-md text-[13px] cursor-pointer ${act ? "bg-[#0F172A] text-white" : "hover:bg-[#F7F8FA]"}`}>
              <span className="flex-1">{n}</span>
              <span className={`text-[10px] tabnum ${act ? "text-white/80" : "text-[#94A3B8]"}`}>{c}</span>
            </div>
          ))}
          <div className="mt-4 px-3 py-3 rounded-md bg-[#F7F8FA] text-[11.5px] text-[#475569]">
            <div className="font-semibold text-[#0F172A] mb-1">{L("通知の届け方","Delivery")}</div>
            <div className="flex justify-between mb-[3px]">{L("アプリ内","In-app")}<span className="text-[#0F172A]">●</span></div>
            <div className="flex justify-between mb-[3px]">{L("メール","Email")}<span className="text-[#0F172A]">●</span></div>
            <div className="flex justify-between">{L("Slack","Slack")}<span className="text-[#CBD5E1]">○</span></div>
          </div>
        </Card>

        <div>
          {groups.map((g, gi) => (
            <div key={gi} className="mb-6">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-3 sticky top-0">{g.day}</div>
              <Card>
                {g.items.map((n, i) => {
                  const tones = {danger:"#DC2626", accent:"#F59E0B", ok:"#16A34A", warn:"#B45309", neutral:"#475569"};
                  return (
                    <div key={i} className={`flex gap-3 px-5 py-4 border-b last:border-0 border-[#F1F5F9] ${n.new ? "bg-[#F8FAFC]" : ""} hover:bg-[#F1F5F9] cursor-pointer`}>
                      <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0" style={{ background: tones[n.tone]+"15", color: tones[n.tone] }}>
                        <n.ico s={17} stroke={tones[n.tone]}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-[2px]">
                          {n.new && <span className="w-2 h-2 rounded-full bg-[#F59E0B]"/>}
                          <span className="text-[13px] font-semibold text-[#0F172A]">{n.t}</span>
                          <Tag size="sm" tone="outline">{n.tag}</Tag>
                        </div>
                        <div className="text-[12px] text-[#475569] leading-snug">{n.b}</div>
                      </div>
                      <div className="text-[11px] text-[#94A3B8] shrink-0">{n.time}</div>
                    </div>
                  );
                })}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};

// ──────────────────────────────────────────────────────── C5 — ERROR PAGES (3 SEPARATE SCREENS)

const ErrorShell = ({ code, color, ico: Ico, accent, title, body, helpId, primary, secondary, extra, prev, next }) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg,#F7F8FA,#EEF1F5)" }}>
      {/* Top chrome — minimal */}
      <div className="px-8 py-4 flex items-center bg-white border-b border-[#E5E7EB]">
        <a href="../management/01-dashboard.html" className="flex items-center gap-3 no-underline">
          <div className="w-9 h-9 rounded-md bg-[#0F172A] text-white flex items-center justify-center font-bold">L</div>
          <div>
            <div className="text-[14px] font-semibold text-[#0F172A]">LENZ Connect</div>
            <div className="text-[10.5px] text-[#94A3B8] uppercase tracking-wider">{L("エラー","Error")}</div>
          </div>
        </a>
      </div>

      <main className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-[560px] w-full">
          {/* Hero illustration */}
          <div className="relative mb-8 mx-auto" style={{ width: 220, height: 220 }}>
            {/* Concentric rings */}
            <svg viewBox="0 0 220 220" className="absolute inset-0">
              <g stroke={color} fill="none" opacity="0.15">
                <circle cx="110" cy="110" r="100" strokeWidth="1"/>
                <circle cx="110" cy="110" r="78" strokeWidth="1"/>
                <circle cx="110" cy="110" r="56" strokeWidth="1"/>
              </g>
              <g stroke={color} fill="none" opacity="0.4">
                {Array.from({length:12}).map((_,i)=>{
                  const a = (i/12)*Math.PI*2;
                  return <line key={i} x1={110+Math.cos(a)*100} y1={110+Math.sin(a)*100} x2={110+Math.cos(a)*108} y2={110+Math.sin(a)*108} strokeWidth="1.5"/>;
                })}
              </g>
            </svg>
            {/* Center disc */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[100px] h-[100px] rounded-2xl flex items-center justify-center" style={{ background: color }}>
                <Ico s={48} stroke="#fff" sw={1.2}/>
              </div>
            </div>
            {/* Code badge */}
            <div className="absolute" style={{ right: -8, top: 8 }}>
              <div className="px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-[12px] font-semibold tabnum shadow-md" style={{ color }}>
                {code}
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-[10.5px] uppercase tracking-[0.25em] font-semibold" style={{ color }}>{accent}</div>
            <h1 className="text-[28px] font-semibold mt-3 hl">{title}</h1>
            <p className="text-[13.5px] text-[#64748B] mt-3 leading-relaxed max-w-md mx-auto">{body}</p>
          </div>

          {extra && <div className="mt-6">{extra}</div>}

          <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
            {primary}
            {secondary}
          </div>

          {helpId && (
            <div className="mt-8 rounded-md border border-[#E5E7EB] bg-white p-4 max-w-md mx-auto">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8]">{L("エラーID","Error ID")}</span>
                <Btn kind="link" size="sm" icon={Icon.Copy}>{L("コピー","Copy")}</Btn>
              </div>
              <div className="mono text-[12px] text-[#0F172A]">{helpId}</div>
              <div className="text-[10.5px] text-[#94A3B8] mt-2">{L("サポート問い合わせ時にこのIDをお伝えください","Share this ID when contacting support")}</div>
            </div>
          )}

          {/* Gallery footer to step between error states */}
          <div className="mt-10 flex items-center justify-center gap-2 text-[11.5px] text-[#94A3B8]">
            {prev && <a href={prev.href} className="text-[#0F172A] hover:underline">← {prev.label}</a>}
            {prev && next && <span>·</span>}
            {next && <a href={next.href} className="text-[#0F172A] hover:underline">{next.label} →</a>}
          </div>
        </div>
      </main>

      <footer className="px-8 py-3 border-t border-[#E5E7EB] bg-white flex items-center justify-between text-[11px] text-[#94A3B8]">
        <span>© 2026 LENZ DX Co., Ltd.</span>
        <div className="flex items-center gap-4">
          <a className="hover:text-[#0F172A] cursor-pointer">{L("利用規約","Terms")}</a>
          <a className="hover:text-[#0F172A] cursor-pointer">{L("プライバシー","Privacy")}</a>
          <a className="hover:text-[#0F172A] cursor-pointer">{L("ヘルプ","Help")}</a>
        </div>
      </footer>
    </div>
  );
};

// 404 — Not found
window.ScreenC5_404 = function () {
  return (
    <ErrorShell
      code="404" color="#0F172A" ico={Icon.Search}
      accent={L("ページが見つかりません","Page not found")}
      title={L("お探しのページが見つかりませんでした","We can't find that page")}
      body={L("URLが変更されたか、削除された可能性があります。下のリンクからホームへ戻るか、物件を検索してください。",
              "The URL may have changed, or the page may have been removed. Try going home or searching for a property.")}
      extra={
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {[
            [Icon.Building, L("物件一覧","Properties"),  "../management/02-property-list.html"],
            [Icon.Calendar, L("内見予約","Viewings"),    "../management/12-viewing-list-calendar.html"],
            [Icon.FileText, L("申込一覧","Applications"),"../management/13-application-list.html"],
          ].map(([Ico, n, href], i) => (
            <a key={i} href={href} className="p-3 rounded-md bg-white border border-[#E5E7EB] hover:border-[#0F172A] hover:shadow-sm transition no-underline text-center">
              <Ico s={16} stroke="#0F172A" style={{ display:"inline-block" }}/>
              <div className="text-[11.5px] font-medium mt-1.5">{n}</div>
            </a>
          ))}
        </div>
      }
      primary={<a href="../management/01-dashboard.html"><Btn kind="primary" icon={Icon.Home}>{L("ホームへ戻る","Go home")}</Btn></a>}
      secondary={<Btn kind="ghost" icon={Icon.ArrowLeft}>{L("前のページへ","Go back")}</Btn>}
      next={{ label: L("500 サーバーエラー","500 Server error"), href: "05-error-500.html" }}/>
  );
};

// 500 — Server error
window.ScreenC5_500 = function () {
  return (
    <ErrorShell
      code="500" color="#DC2626" ico={Icon.Alert}
      accent={L("サーバーエラー","Server error")}
      title={L("予期しないエラーが発生しました","Something went wrong on our side")}
      body={L("システム側で問題が発生しました。エンジニアリングチームに自動通知済みです。数分後に再度お試しください。",
              "An unexpected error occurred on our side. The engineering team has been notified — please try again in a few minutes.")}
      helpId="ERR-2026-0526-A7F3-B215"
      extra={
        <div className="rounded-md border border-[#FECACA] bg-[#FEF2F2] p-3.5 max-w-md mx-auto text-[12.5px] text-[#991B1B]">
          <div className="flex items-center gap-2 mb-1.5"><Icon.Activity s={13} stroke="#991B1B"/> <span className="font-semibold">{L("システムステータス","System status")}</span></div>
          <div className="grid grid-cols-3 gap-2 text-[11px]">
            {[
              [L("ダッシュボード","Dashboard"), "ok"],
              [L("出稿API","Publish API"), "down"],
              [L("チャット","Chat"), "ok"],
            ].map(([n, st], i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${st==="ok"?"bg-[#16A34A]":"bg-[#DC2626]"}`}/>{n}
              </div>
            ))}
          </div>
        </div>
      }
      primary={<Btn kind="primary" icon={Icon.Refresh}>{L("再試行","Retry")}</Btn>}
      secondary={<Btn kind="ghost" icon={Icon.Mail}>{L("サポートに連絡","Contact support")}</Btn>}
      prev={{ label: L("404 ページが見つかりません","404 Not found"), href: "05-error-404.html" }}
      next={{ label: L("403 アクセス権限なし","403 Access denied"),    href: "05-error-403.html" }}/>
  );
};

// 403 — Forbidden
window.ScreenC5_403 = function () {
  return (
    <ErrorShell
      code="403" color="#F59E0B" ico={Icon.Lock}
      accent={L("アクセス権限がありません","Access denied")}
      title={L("このリソースを閲覧する権限がありません","You don't have permission to view this")}
      body={L("お使いのアカウントには表示権限がありません。必要な場合は管理者にロール変更を依頼してください。",
              "Your account doesn't have permission to view this resource. Ask your administrator to grant the required role.")}
      extra={
        <div className="rounded-md border border-[#FDE68A] bg-[#FEF3C7] p-3.5 max-w-md mx-auto text-[12px] text-[#92400E]">
          <div className="flex items-center gap-2 mb-2"><Icon.User s={13} stroke="#92400E"/> <span className="font-semibold">{L("現在のロール","Your current role")}</span></div>
          <div className="space-y-1">
            <div className="flex justify-between"><span>{L("ユーザー","User")}</span><b>田中 健一</b></div>
            <div className="flex justify-between"><span>{L("ロール","Role")}</span><b>{L("運用 (Ops)","Operations")}</b></div>
            <div className="flex justify-between"><span>{L("必要なロール","Required role")}</span><b>{L("管理者 (Admin)","Administrator")}</b></div>
          </div>
        </div>
      }
      primary={<a href="../management/01-dashboard.html"><Btn kind="primary" icon={Icon.Home}>{L("ホームへ戻る","Go home")}</Btn></a>}
      secondary={<Btn kind="ghost" icon={Icon.User}>{L("管理者に依頼","Request access")}</Btn>}
      prev={{ label: L("500 サーバーエラー","500 Server error"), href: "05-error-500.html" }}/>
  );
};

// Legacy alias — render 404 by default for the old C5 slug
window.ScreenC5Errors = window.ScreenC5_404;
