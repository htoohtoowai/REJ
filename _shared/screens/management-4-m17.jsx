// _shared/screens/management-4-m17.jsx — M17 マスタデータ設定 (rebuilt 2026-08-20)
// Delivers: M-20 媒体別写真ルール master (feeds the M8 image tab) · B-1 募集項目セット master
// (company-defined chips used by B2B search). Admin tooling — dense, powerful, not consumer-y.

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, Avatar, AppShell } = window;
const L = window.L;

const M17_NAV = () => [
  ["companies", Icon.Building, L("会社マスタ","Companies")],
  ["users",     Icon.User,     L("ユーザー管理","Users & roles")],
  ["channels",  Icon.Globe,    L("媒体設定","Ad-site connections")],
  ["photo",     Icon.Camera,   L("媒体別写真ルール","Per-portal photo rules")],
  ["attrs",     Icon.Tag,      L("募集項目セット","Listing attribute sets")],
  ["appform",   Icon.FileText, L("申込項目カスタマイズ","Application form fields")],
  ["templates", Icon.Chat,     L("定型文テンプレート","Chat templates")],
  ["tags",      Icon.Tag,      L("物件タグ","Property tags")],
  ["categories",Icon.Grid,     L("カテゴリ管理","Image & equipment categories")],
  ["audit",     Icon.History,  L("監査ログ","Audit log")],
  ["system",    Icon.Settings, L("システム設定","System settings")],
];

const M17_ROLE = { admin: ["dark", L("管理者","Admin")], sales: ["neutral", L("営業","Sales")], acct: ["neutral", L("経理","Accounting")], ro: ["outline", L("閲覧のみ","Read-only")] };

window.ScreenM17Master = function () {
  const nav = M17_NAV();
  const [page, setPage] = React.useState("users");
  const [chan, setChan] = React.useState(null);
  const [attrs, setAttrs] = React.useState([
    [L("敷金ゼロ","No deposit"), true], [L("ペット可","Pets OK"), true], [L("二人入居可","Two tenants OK"), true],
    [L("即入居可","Move-in ready"), true], [L("楽器相談可","Instruments negotiable"), false],
  ]);
  const [adding, setAdding] = React.useState(false);
  const [mfaResetTarget, setMfaResetTarget] = React.useState(null); // #1.3 — name of user pending MFA reset confirm
  const current = nav.find(n => n[0] === page);

  const users = [
    [L("大久保 ゆか","Okubo Yuka"), "okubo@lenz-dx.jp", "admin", L("本店 管理部","HQ — Management"), "05/26 14:32", true, true],
    [L("田中 健一","Tanaka Kenichi"), "tanaka@lenz-dx.jp", "admin", L("本店 管理部","HQ — Management"), "05/26 13:58", true, true],
    [L("佐藤 美咲","Sato Misaki"), "sato@lenz-dx.jp", "sales", L("吉祥寺営業所","Kichijoji branch"), "05/26 11:20", true, true],
    [L("鈴木 亮","Suzuki Ryo"), "suzuki@lenz-dx.jp", "sales", L("中野営業所","Nakano branch"), "05/25 18:04", false, true],
    [L("森 千夏","Mori Chinatsu"), "mori@lenz-dx.jp", "acct", L("本店 経理部","HQ — Accounting"), "05/26 09:41", true, true],
    [L("岡田 拓也","Okada Takuya"), "okada@lenz-dx.jp", "sales", L("白金台営業所","Shirokanedai branch"), "05/22 16:12", true, false],
    [L("藤原 恵","Fujiwara Megumi"), "fujiwara@lenz-dx.jp", "ro", L("オーナー窓口","Owner desk"), "05/20 10:33", false, true],
    [L("上松 誠","Uematsu Makoto"), "uematsu@finders.jp", "ro", L("FINDERS（外部）","FINDERS (external)"), "05/26 08:15", true, true],
  ];

  const channels = [
    ["SUUMO",                       true,  "05/26 14:05", L("契約中（年間）","Active (annual)")],
    [L("アットホーム","at home"),     true,  "05/26 14:05", L("契約中（年間）","Active (annual)")],
    ["HOMES",                       false, "05/24 03:10", L("契約中（要再認証）","Active — reauth needed")],
    [L("レインズ","REINS"),          true,  "05/26 13:40", L("会員（東日本）","Member (East Japan)")],
    ["B2B",                         true,  "05/26 14:05", L("自社運用","In-house")],
    [L("業者間","Broker network"),    true,  "05/26 12:00", L("自社運用","In-house")],
    [L("独自サイト1（ZOOM RENT）","Own site 1 (ZOOM RENT)"), true,  "05/26 14:05", L("アダプタ接続","Adapter")],
    [L("独自サイト2（ZOOM SELECTION）","Own site 2 (ZOOM SELECTION)"), false, "—", L("受け口確認中","Intake being confirmed")],
  ];

  const photoRules = [
    ["SUUMO",                     "30", [L("間取り","Floorplan"), L("外観","Exterior")], [L("リビング","Living"), L("キッチン","Kitchen"), L("風呂","Bath"), L("周辺","Neighbourhood")]],
    ["HOMES",                     "15", [L("間取り","Floorplan"), L("周辺","Neighbourhood")], [L("外観","Exterior"), L("リビング","Living"), L("収納","Storage")]],
    [L("アットホーム","at home"),   "20", [L("間取り","Floorplan")], [L("外観","Exterior"), L("キッチン","Kitchen"), L("洗面所","Washroom")]],
    [L("レインズ","REINS"),        "10", [L("間取り","Floorplan")], [L("外観","Exterior")]],
    [L("自社HP","Own site"),       "60", [], [L("全カテゴリ","All categories")]],
    [L("ZOOM RENT（独自サイト）","ZOOM RENT (own site)"), "40", [L("外観","Exterior")], [L("全カテゴリ","All categories")]],
  ];

  return (
    <AppShell active="settings"
      crumbs={[L("設定","Settings"), L("マスタデータ","Master data"), current[2]]}
      title={L("マスタデータ設定","Master data settings")}
      subtitle={L("システム管理者のみ・変更はすべて監査ログに記録されます","Administrators only — every change is audit-logged")}>

      <div className="grid gap-4 items-start" style={{ gridTemplateColumns: "minmax(180px,232px) minmax(320px,1fr)" }}>

        {/* sub-nav rail */}
        <Card className="overflow-hidden self-start sticky top-4">
          <div className="px-3 py-2 bg-[#F8FAFC] border-b border-[#E5E7EB] text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8]">
            {L("マスタ一覧","Masters")}
          </div>
          <div className="py-1">
            {nav.map(([k, Ico, label]) => (
              <button key={k} onClick={() => { setPage(k); setChan(null); }}
                className={`w-full px-3 py-[7px] flex items-center gap-2 text-left text-[12.5px] ${page === k
                  ? "bg-[#F1F5F9] text-[#0F172A] font-semibold border-l-2 border-[#0F172A]"
                  : "text-[#475569] hover:bg-[#F8FAFC] border-l-2 border-transparent"}`}>
                <Ico s={13} stroke={page === k ? "#0F172A" : "#94A3B8"}/>
                <span className="truncate">{label}</span>
                {k === "audit" && <Tag tone="outline" size="sm">{L("読取","RO")}</Tag>}
              </button>
            ))}
          </div>
        </Card>

        {/* detail pane */}
        <div className="min-w-0 space-y-4">

          {/* ── ユーザー管理 ── */}
          {page === "users" && (
            <Card className="overflow-hidden">
              <CardHead title={L("ユーザー管理","Users & roles")} sub={L("8名 · 管理者2名","8 users · 2 admins")}
                action={<Btn kind="primary" size="sm" icon={Icon.Plus}>{L("ユーザーを追加","Add user")}</Btn>}/>
              <div className="p-3 grid gap-3 border-b border-[#F1F5F9]" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))" }}>
                <Field label={L("役割","Role")}><Select value={L("すべて","All")}/></Field>
                <Field label={L("状態","State")}><Select value={L("すべて","All")}/></Field>
                <Field label={L("検索","Search")}><Input value="" placeholder={L("氏名・メール","Name or email")} prefix={<Icon.Search s={12}/>}/></Field>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] text-[12px]">
                  <thead className="bg-[#F7F8FA] text-[#475569] text-[10.5px] uppercase tracking-wider">
                    <tr>
                      {[L("氏名","Name"), L("メール","Email"), L("役割","Role"), L("所属","Team"), L("最終ログイン","Last login"), "MFA", L("状態","State"), L("操作","Actions")].map((h, i) => (
                        <th key={i} className="px-2.5 py-2 text-left font-semibold whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(([name, mail, role, team, login, mfa, active], i) => {
                      const [tone, label] = M17_ROLE[role];
                      return (
                        <tr key={i} className="border-t border-[#F1F5F9] hover:bg-[#F8FAFC]">
                          <td className="px-2.5 py-1.5 whitespace-nowrap">
                            <span className="flex items-center gap-2">
                              <Avatar name={name} size={22} tone={role === "admin" ? "neutral" : "accent"}/>
                              <span className="font-semibold text-[#0F172A]">{name}</span>
                            </span>
                          </td>
                          <td className="px-2.5 py-1.5 text-[#475569] whitespace-nowrap">{mail}</td>
                          <td className="px-2.5 py-1.5"><Tag tone={tone}>{label}</Tag></td>
                          <td className="px-2.5 py-1.5 text-[#475569] whitespace-nowrap">{team}</td>
                          <td className="px-2.5 py-1.5 text-[#475569] tabnum whitespace-nowrap">{login}</td>
                          <td className="px-2.5 py-1.5">
                            {mfa ? <Icon.Check s={13} stroke="#16A34A"/> : <Icon.X s={13} stroke="#DC2626"/>}
                          </td>
                          <td className="px-2.5 py-1.5">{active ? <Tag tone="ok">{L("有効","Active")}</Tag> : <Tag tone="neutral">{L("無効","Disabled")}</Tag>}</td>
                          <td className="px-2.5 py-1.5">
                            <div className="flex items-center gap-1 whitespace-nowrap">
                              <button className="h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#475569] hover:bg-[#F1F5F9]">{L("編集","Edit")}</button>
                              <button className="h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#475569] hover:bg-[#F1F5F9]">{L("権限","Perms")}</button>
                              <button className="h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#475569] hover:bg-[#F1F5F9]">{active ? L("無効化","Disable") : L("有効化","Enable")}</button>
                              {mfa ? (
                                <button onClick={() => setMfaResetTarget(name)}
                                  className="h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#475569] hover:bg-[#F1F5F9]">{L("MFAリセット","Reset MFA")}</button>
                              ) : (
                                <button disabled title={L("このユーザーは二段階認証が未登録です","This user hasn't set up two-factor authentication")}
                                  className="h-6 px-2 rounded border border-[#F1F5F9] text-[10.5px] text-[#CBD5E1] cursor-not-allowed">{L("MFAリセット","Reset MFA")}</button>
                              )}
                              {!mfa && (
                                <button className="h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#475569] hover:bg-[#F1F5F9]">{L("招待メールを再送","Resend invite")}</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* ── 媒体設定 ── */}
          {page === "channels" && (
            <>
              <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))" }}>
                {channels.map(([name, on, sync, contract], i) => (
                  <Card key={i} className={`p-3.5 ${chan === i ? "border-[#0F172A]" : ""}`}>
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: on ? "#16A34A" : "#DC2626" }}/>
                      <div className="min-w-0 flex-1">
                        <div className="text-[12.5px] font-semibold text-[#0F172A] leading-snug">{name}</div>
                        <div className="text-[10.5px] text-[#94A3B8] tabnum mt-0.5">{L(`最終同期 ${sync}`, `Last sync ${sync}`)}</div>
                        <div className="text-[10.5px] text-[#64748B] mt-1">{contract}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2.5">
                      <Tag tone={on ? "ok" : "danger"} size="sm">{on ? L("接続中","Connected") : L("未接続","Disconnected")}</Tag>
                      <button onClick={() => setChan(chan === i ? null : i)}
                        className="ml-auto h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#475569] hover:bg-[#F1F5F9]">{L("設定","Configure")}</button>
                    </div>
                  </Card>
                ))}
              </div>

              {chan != null && (
                <Card>
                  <CardHead title={L(`${channels[chan][0]} の接続設定`, `${channels[chan][0]} connection`)}
                    sub={L("変更は監査ログに記録されます","Changes are audit-logged")}
                    action={<button onClick={() => setChan(null)} className="text-[#94A3B8] hover:text-[#0F172A]"><Icon.X s={13}/></button>}/>
                  <div className="p-4 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))" }}>
                    <Field label="API key" hint={L("マスク表示","masked")}><Input value="sk_live_••••••••••••4f2a"/></Field>
                    <Field label="API secret" hint={L("マスク表示","masked")}><Input value="••••••••••••••••"/></Field>
                    <Field label={L("エンドポイントURL","Endpoint URL")}><Input value="https://api.example-portal.jp/v2/listings"/></Field>
                    <Field label={L("リトライ回数","Retry count")}><Input value="3" suffix={L("回","×")}/></Field>
                    <Field label={L("リトライ間隔","Retry interval")}><Input value="300" suffix={L("秒","s")}/></Field>
                    <Field label={L("レート制限","Rate limit")}><Input value="60" suffix={L("req/分","req/min")}/></Field>
                    <Field label={L("同期スケジュール","Sync schedule")}><Select value={L("1日4回（06/11/15/19時）","4×/day (06/11/15/19)")}/></Field>
                    <Field label={L("エラー通知先","Error notifications")}><Input value="ops@lenz-dx.jp"/></Field>
                  </div>
                  <div className="px-4 py-3 border-t border-[#F1F5F9] bg-[#F8FAFC] flex items-center gap-2">
                    <Btn kind="ghost" size="sm" icon={Icon.Sync}>{L("接続テスト","Test connection")}</Btn>
                    <span className="ml-auto flex items-center gap-2">
                      <Btn kind="ghost" size="sm">{L("キャンセル","Cancel")}</Btn>
                      <Btn kind="primary" size="sm" icon={Icon.Save}>{L("保存","Save")}</Btn>
                    </span>
                  </div>
                </Card>
              )}
            </>
          )}

          {/* ── M-20 媒体別写真ルール ── */}
          {page === "photo" && (
            <Card className="overflow-hidden">
              <CardHead title={L("媒体別写真ルール","Per-portal photo rules")}
                sub={L("物件編集の画像タブ（M8）の登録枠・チェックに反映されます","Feeds the slot count and checks on the image tab (M8)")}
                action={<Btn kind="primary" size="sm" icon={Icon.Plus}>{L("媒体を追加","Add medium")}</Btn>}/>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-[12px]">
                  <thead className="bg-[#F7F8FA] text-[#475569] text-[10.5px] uppercase tracking-wider">
                    <tr>
                      {[L("媒体","Medium"), L("最大枚数","Max photos"), L("必須カテゴリ","Required categories"), L("任意カテゴリ","Optional categories"), L("操作","Actions")].map((h, i) => (
                        <th key={i} className="px-2.5 py-2 text-left font-semibold whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {photoRules.map(([name, max, req, opt], i) => (
                      <tr key={i} className="border-t border-[#F1F5F9] hover:bg-[#F8FAFC]">
                        <td className="px-2.5 py-2 font-semibold text-[#0F172A] whitespace-nowrap">{name}</td>
                        <td className="px-2.5 py-2 w-[110px]">
                          <div className="flex items-center bg-white border border-[#CBD5E1] rounded h-7 px-2 focus-within:border-[#0F172A]">
                            <input defaultValue={max} className="bg-transparent outline-none text-[12px] text-[#0F172A] w-full min-w-0 tabnum text-right"/>
                            <span className="text-[10.5px] text-[#94A3B8] ml-1">{L("枚","pcs")}</span>
                          </div>
                        </td>
                        <td className="px-2.5 py-2">
                          <div className="flex flex-wrap gap-1">
                            {req.length === 0 ? <span className="text-[#CBD5E1]">—</span>
                              : req.map(c => <span key={c} className="px-1.5 py-[2px] rounded bg-[#0F172A] text-white text-[10.5px]">{c}</span>)}
                          </div>
                        </td>
                        <td className="px-2.5 py-2">
                          <div className="flex flex-wrap gap-1">
                            {opt.map(c => <span key={c} className="px-1.5 py-[2px] rounded bg-[#F1F5F9] border border-[#E5E7EB] text-[10.5px] text-[#475569]">{c}</span>)}
                          </div>
                        </td>
                        <td className="px-2.5 py-2">
                          <button className="h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#475569] hover:bg-[#F1F5F9] whitespace-nowrap">{L("編集","Edit")}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 border-t border-[#F1F5F9] bg-[#F8FAFC] text-[11px] text-[#64748B] leading-relaxed">
                <div>{L("ポータル側の枚数増加に備え、上限は余裕を持って設定してください。変更は物件編集の画像タブ（M8）の登録枠・チェックに反映されます",
                        "Set ceilings generously — portals keep raising their limits. Changes feed the slots and checks on the image tab (M8).")}</div>
                <div className="flex items-center gap-1.5 mt-1 text-[#94A3B8]"><Icon.History s={11} stroke="#94A3B8"/>{L("他のマスタ変更と同様に監査ログへ記録されます","Logged in the audit log like every other master change")}</div>
              </div>
            </Card>
          )}

          {/* ── B-1 募集項目セット ── */}
          {page === "attrs" && (
            <Card>
              <CardHead title={L("募集項目セット","Listing attribute sets")} sub={L("会社ごとに作成した募集項目","Attributes defined per company")}
                action={<Btn kind="primary" size="sm" icon={Icon.Plus} onClick={() => setAdding(a => !a)}>{L("項目を追加","Add attribute")}</Btn>}/>
              <div className="p-4">
                {adding && (
                  <div className="mb-3 p-3 rounded-md border border-[#E5E7EB] bg-[#F8FAFC] flex items-end gap-2">
                    <div className="flex-1"><Field label={L("ラベル","Label")}><Input value="" placeholder={L("例: 駐車場あり","e.g. Parking available")}/></Field></div>
                    <Btn kind="primary" size="sm">{L("追加","Add")}</Btn>
                    <Btn kind="ghost" size="sm" onClick={() => setAdding(false)}>{L("キャンセル","Cancel")}</Btn>
                  </div>
                )}
                <div className="space-y-1.5">
                  {attrs.map(([label, on], i) => (
                    <div key={i} className="flex items-center gap-2 rounded-md border border-[#E5E7EB] px-2.5 py-2">
                      <span className="px-2 py-[3px] rounded-full bg-[#0F172A] text-white text-[11.5px]">{label}</span>
                      <button onClick={() => setAttrs(a => a.map((x, j) => j === i ? [x[0], !x[1]] : x))}
                        className={`ml-auto inline-flex items-center gap-1.5 text-[11px] ${on ? "text-[#15803D]" : "text-[#94A3B8]"}`}>
                        <span className={`w-8 h-[18px] rounded-full relative transition-colors ${on ? "bg-[#16A34A]" : "bg-[#CBD5E1]"}`}>
                          <span className="absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white transition-all" style={{ left: on ? 16 : 2 }}/>
                        </span>
                        {on ? L("表示ON","Shown") : L("表示OFF","Hidden")}
                      </button>
                      <button className="h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#475569] hover:bg-[#F1F5F9]">{L("編集","Edit")}</button>
                      <button className="h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#DC2626] hover:bg-[#FEF2F2]">{L("削除","Delete")}</button>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-[#64748B] mt-3 leading-relaxed">
                  {L("会社ごとに募集項目を作成できます。作成した項目はB2Bサイトの物件表示・絞り込みに使われます",
                     "Each company can define its own listing attributes. They are used for display and filtering on the B2B site.")}
                </div>
              </div>
            </Card>
          )}

          {/* ── 申込項目カスタマイズ ── */}
          {page === "appform" && (
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
              <Card className="overflow-hidden">
                <CardHead title={L("申込項目カスタマイズ","Application form fields")} sub={L("ドラッグで並び替え","Drag to reorder")}
                  action={<span className="text-[11px] text-[#94A3B8] tabnum">{L("8項目","8 fields")}</span>}/>
                <div className="divide-y divide-[#F1F5F9]">
                  {[
                    [L("氏名","Full name"), L("テキスト","Text"), true],
                    [L("フリガナ","Reading"), L("テキスト","Text"), true],
                    [L("生年月日","Date of birth"), L("日付","Date"), true],
                    [L("年収","Annual income"), L("数値","Number"), true],
                    [L("勤務先","Employer"), L("テキスト","Text"), true],
                    [L("在留カード","Residence card"), L("ファイル","File upload"), false],
                    [L("ペット飼育","Pets"), L("ラジオ","Radio"), false],
                    [L("引越理由","Reason for moving"), L("プルダウン","Dropdown"), false],
                  ].map(([label, kind, req], i) => (
                    <div key={i} className="px-3 py-2 flex items-center gap-2">
                      <button className="text-[#CBD5E1] hover:text-[#475569] cursor-grab shrink-0"><Icon.MoreV s={13}/></button>
                      <span className="text-[10px] text-[#94A3B8] tabnum w-4 shrink-0">{i + 1}</span>
                      <span className="text-[12.5px] text-[#0F172A] flex-1 min-w-0 truncate">{label}</span>
                      <Tag tone="neutral" size="sm">{kind}</Tag>
                      {req ? <Tag tone="danger" size="sm">{L("必須","Required")}</Tag> : <Tag tone="outline" size="sm">{L("任意","Optional")}</Tag>}
                      <button className="text-[#94A3B8] hover:text-[#DC2626] shrink-0"><Icon.Trash s={12}/></button>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-[#F1F5F9] bg-[#F8FAFC] text-[11px] text-[#64748B]">
                  {L("管理会社ごとに項目をカスタマイズできます","Each management company can customise these fields")}
                </div>
              </Card>
              <Card className="self-start">
                <CardHead title={L("項目タイプ","Field types")} sub={L("ドラッグして追加","Drag to add")}/>
                <div className="p-3 space-y-1.5">
                  {[
                    [Icon.Edit,      L("テキスト","Text")],
                    [Icon.Chart,     L("数値","Number")],
                    [Icon.List,      L("プルダウン","Dropdown")],
                    [Icon.CheckCircle, L("ラジオ","Radio")],
                    [Icon.Check,     L("チェックボックス","Checkbox")],
                    [Icon.Upload,    L("ファイルアップロード","File upload")],
                    [Icon.Calendar,  L("日付","Date")],
                  ].map(([Ico, label], i) => (
                    <div key={i} className="flex items-center gap-2 rounded-md border border-dashed border-[#CBD5E1] px-2.5 py-[7px] text-[12px] text-[#475569] cursor-grab hover:border-[#0F172A] hover:text-[#0F172A]">
                      <Ico s={12} stroke="#94A3B8"/>{label}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* ── remaining masters: consistent CRUD stub ── */}
          {["companies", "templates", "tags", "categories", "audit", "system"].indexOf(page) >= 0 && (
            <Card>
              <CardHead title={current[2]}
                sub={page === "audit" ? L("読取専用 — すべてのマスタ変更・出稿操作を記録","Read-only — records every master change and publish action")
                                      : L("CRUD管理画面","CRUD management")}
                action={page === "audit"
                  ? <Btn kind="ghost" size="sm" icon={Icon.Download}>{L("CSV出力","Export CSV")}</Btn>
                  : <Btn kind="primary" size="sm" icon={Icon.Plus}>{L("新規追加","Add new")}</Btn>}/>
              {page === "audit" ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-[12px]">
                    <thead className="bg-[#F7F8FA] text-[#475569] text-[10.5px] uppercase tracking-wider">
                      <tr>
                        {[L("日時","Timestamp"), L("操作者","User"), L("対象","Target"), L("操作","Action"), L("変更内容","Change")].map((h, i) => (
                          <th key={i} className="px-2.5 py-2 text-left font-semibold whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["05/26 14:32", L("大久保 ゆか","Okubo Yuka"), L("媒体別写真ルール / SUUMO","Photo rules / SUUMO"), L("更新","Update"), L("最大枚数 20 → 30","Max photos 20 → 30")],
                        ["05/26 11:20", L("田中 健一","Tanaka Kenichi"), L("募集項目セット","Attribute sets"), L("追加","Create"), L("「即入居可」を追加","Added 即入居可")],
                        ["05/25 18:04", L("大久保 ゆか","Okubo Yuka"), L("ユーザー管理 / 岡田 拓也","Users / Okada"), L("無効化","Disable"), L("状態 有効 → 無効","State active → disabled")],
                        ["05/25 09:14", L("システム","System"), L("媒体設定 / HOMES","Channels / HOMES"), L("同期エラー","Sync error"), L("認証トークン期限切れ","Auth token expired")],
                      ].map((r, i) => (
                        <tr key={i} className="border-t border-[#F1F5F9]">
                          {r.map((c, j) => <td key={j} className={`px-2.5 py-1.5 ${j === 0 ? "tabnum whitespace-nowrap" : "text-[#475569]"}`}>{c}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-4">
                  <div className="rounded-md border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-5 text-center">
                    <div className="text-[12.5px] font-semibold text-[#475569]">{current[2]}</div>
                    <div className="text-[11.5px] text-[#94A3B8] mt-1">
                      {L("一覧・追加・編集・削除の標準CRUD画面（この階層のレイアウトを共通利用）",
                         "Standard list / create / edit / delete CRUD screen sharing this layout")}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>

      {/* #1.3 — MFA reset confirm */}
      {mfaResetTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(15,23,42,0.45)" }} onClick={() => setMfaResetTarget(null)}>
          <Card onClick={e => e.stopPropagation()} className="w-full max-w-[440px] overflow-hidden" style={{ boxShadow: "0 18px 50px rgba(15,23,42,0.30)" }}>
            <div className="p-5">
              <div className="text-[15px] font-semibold text-[#0F172A] mb-1.5">{L("二段階認証をリセットしますか？","Reset two-factor authentication?")}</div>
              <div className="text-[12.5px] text-[#475569] leading-relaxed mb-1">
                {L(`対象: ${mfaResetTarget}`, `User: ${mfaResetTarget}`)}
              </div>
              <div className="text-[12.5px] text-[#475569] leading-relaxed">
                {L("リセットすると、このユーザーは次回ログイン時に二段階認証の再設定（C6）が必要になります。操作は監査ログに記録されます。",
                   "After resetting, this user must set up two-factor authentication again (C6) at their next sign-in. This action is recorded in the audit log.")}
              </div>
            </div>
            <div className="px-5 py-3.5 border-t border-[#F1F5F9] flex items-center gap-2 justify-end">
              <Btn kind="ghost" onClick={() => setMfaResetTarget(null)}>{L("キャンセル","Cancel")}</Btn>
              <button onClick={() => setMfaResetTarget(null)} className="inline-flex items-center gap-1.5 rounded-md font-medium h-9 px-4 text-[13px] bg-[#DC2626] text-white hover:bg-[#991B1B]">
                {L("リセットする","Reset")}
              </button>
            </div>
          </Card>
        </div>
      )}
    </AppShell>
  );
};
