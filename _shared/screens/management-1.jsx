// _shared/screens/management-1.jsx — M1 Dashboard, M2 List, M3 Create modal, M4 Overview, M5 Building, M5b Room

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, Stat, Tabs, MapPlaceholder, PhotoPh, Avatar, AppShell } = window;
const L = window.L;

// ══════════════════════════════ M1 — DASHBOARD ══════════════════════════════
window.ScreenM1Dashboard = function () {
  const today = L("2026年 5月 26日 (火)", "Tue, May 26 2026");
  return (
    <AppShell active="dashboard"
      crumbs={[L("ホーム","Home"), L("ダッシュボード","Dashboard")]}
      title={L("おはようございます、田中さん", "Good morning, Tanaka-san")}
      subtitle={today + " · " + L("3件の出稿エラーがあります", "3 publishing errors need attention")}
      actions={<>
        <Btn kind="ghost" icon={Icon.Download}>{L("週次レポート","Weekly report")}</Btn>
        <Btn kind="accent" icon={Icon.Plus}>{L("物件を登録","New property")}</Btn>
      </>}>

      {/* Alert banner */}
      <Card className="mb-5 p-4 flex items-center gap-4" style={{ background:"#FEF2F2", borderColor:"#FECACA" }}>
        <div className="w-10 h-10 rounded-md bg-[#DC2626] text-white flex items-center justify-center"><Icon.Alert s={18}/></div>
        <div className="flex-1">
          <div className="text-[13px] font-semibold text-[#991B1B]">{L("3件の出稿でエラーが発生しています", "3 listings failed to publish")}</div>
          <div className="text-[12px] text-[#991B1B]/85">ZOOM本郷 305 · ZOOM吉祥寺 502 · 青葉マンション 305 — {L("36ポイント画像ルール違反 · RAINZ同期失敗 · 価格欠落", "36-point image rule · RAINZ sync · price missing")}</div>
        </div>
        <Btn kind="danger" size="sm">{L("対応する →","Resolve →")}</Btn>
      </Card>

      {/* §M1 ADD: Quick Actions row — 4 entry-point cards */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          [Icon.Plus,     L("新規物件作成","New property"),   L("1件ずつ登録","Register one"),          null],
          [Icon.Upload,   L("一括CSVインポート","Bulk CSV import"), L("複数物件を一括入稿","Bulk-register via CSV"), "16-csv-export.html"], // C5 一括入稿 entry point
          [Icon.Calendar, L("内見カレンダー","Viewing calendar"), L("予約状況を確認","Check bookings"),    null],
          [Icon.Download, L("レポート出力","Export report"),   L("CSV・帳票","CSV & reports"),           null],
        ].map(([Ico, title, sub, href], i) => {
          const inner = (
            <Card className="p-4 flex items-start gap-3 hover:bg-[#F7F8FA] cursor-pointer h-full">
              <div className="w-10 h-10 rounded-md bg-[#0F172A] text-white flex items-center justify-center shrink-0"><Ico s={18}/></div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-[#0F172A] leading-snug">{title}</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">{sub}</div>
              </div>
            </Card>
          );
          return href
            ? <a key={i} href={href} className="no-underline">{inner}</a>
            : <div key={i}>{inner}</div>;
        })}
      </div>

      {/* §M1 CHANGE: KPI strip 5 → 4 tiles */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <Stat label={L("募集中物件","Listings recruiting")} value="132" sub={L("先週比 +4","+4 vs last week")} tone="up" icon={Icon.Building}/>
        <Stat label={L("本日の内見","Today's viewings")} value="12" sub={L("仲介18社から","From 18 brokers")} icon={Icon.Calendar}/>
        <Stat label={L("申込 (要対応)","Apps to review")} value="5" sub={L("最古 36時間前","Oldest 36h ago")} tone="down" icon={Icon.FileText}/>
        <Stat label={L("未読チャット","Unread chats")} value="8" sub={L("仲介・社内 合計","Partners + internal")} icon={Icon.Chat}/>
        {/*
          🔔 Proposed addition (GATED — not rendered):
            • 公開中 / Live tile (value 142, 90.4% 公開率)
            • 空室 / Vacant tile (value 38, 平均空室期間 22日)
            Held pending customer approval; restore here if the strip should surface
            publish-rate and vacancy KPIs.
        */}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left col — Publishing health (occupies 2 cols) */}
        <div className="col-span-2 space-y-5">
          <Card>
            <CardHead title={L("出稿の健康状態 (全媒体合計)", "Publishing health (across every medium)")} sub={L("最終更新 14:38","Updated 14:38")} action={<Btn kind="link" size="sm">{L("詳細を見る →","View detail →")}</Btn>}/>
            <div className="p-5">
              {/* Sankey-like flow */}
              <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))" }}>
                {[
                  ["SUUMO", 142, 138, 4],
                  [L("アットホーム","at home"), 142, 140, 2],
                  ["HOMES", 142, 142, 0],
                  [L("レインズ","REINS"), 142, 141, 1],
                  ["B2B", 142, 142, 0],
                  [L("業者間","Broker network"), 142, 140, 2],
                  ["ZOOM RENT", 142, 139, 3],
                  ["ZOOM SELECTION", 142, 142, 0],
                ].map(([name, total, ok, err], i) => {
                  const okPct = (ok/total)*100;
                  return (
                    <div key={i} className="p-3 rounded-md border border-[#E5E7EB]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[12px] font-semibold">{name}</span>
                        {err > 0 ? <Tag tone="danger">{err}</Tag> : <Tag tone="ok"><Icon.Check s={10}/></Tag>}
                      </div>
                      <div className="h-1.5 rounded-full bg-[#F1F5F9] overflow-hidden">
                        <div className="h-full bg-[#0F172A]" style={{ width: `${okPct}%` }}/>
                      </div>
                      <div className="flex justify-between mt-2 text-[10px] text-[#64748B] tabnum">
                        <span>{ok}/{total}</span>
                        <span>{okPct.toFixed(1)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">{L("出稿エラー内訳 (過去7日)","Error breakdown (last 7d)")}</div>
              <div className="space-y-2">
                {[
                  [L("画像が36ポイントルール違反","Image violates 36-point rule"), 8, "danger"],
                  [L("価格情報の欠落","Missing price"), 3, "warn"],
                  [L("RAINZ 同期失敗","RAINZ sync failed"), 2, "warn"],
                  [L("掲載写真が10枚未満","Less than 10 photos"), 4, "warn"],
                ].map(([n, c, t], i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Tag tone={t}>{c}</Tag>
                    <div className="flex-1 h-1 rounded-full bg-[#F1F5F9]">
                      <div className={`h-full rounded-full`} style={{ width: `${c*8}%`, background: t==="danger"?"#DC2626":"#F59E0B" }}/>
                    </div>
                    <span className="text-[12px] text-[#475569] w-72">{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <CardHead title={L("本日のスケジュール","Today's schedule")} action={<Tabs tabs={[L("内見","Viewings"), L("申込","Apps"), L("チャット","Chat")]} active={0}/>}/>
            <div className="p-2">
              {[
                ["09:00", "ZOOM本郷 701", "FINDERS 吉祥寺店 / FINDERS Kichijoji", "山田 太郎", "ok"],
                ["10:30", "青葉マンション 305", "アパマンショップ 池袋 / Apaman Ikebukuro", "佐藤 花子", "ok"],
                ["13:00", "ZOOM吉祥寺 501", "ミニミニ 渋谷 / MINIMINI Shibuya", "鈴木 一郎", "warn"],
                ["15:00", "メゾン白金 102", "FINDERS 銀座 / FINDERS Ginza", "高橋 麗子", "ok"],
                ["18:00", "ZOOM本郷 701", "FINDERS 吉祥寺店 / FINDERS Kichijoji", "渡辺 健太", "new"],
              ].map(([t, prop, brk, who, st], i) => (
                <div key={i} className="flex items-center gap-4 px-3 py-3 rounded-md hover:bg-[#F7F8FA]">
                  <div className="text-[14px] font-semibold tabnum text-[#0F172A] w-12">{t}</div>
                  <div className="w-px h-8 bg-[#E5E7EB]"/>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold">{prop}</div>
                    <div className="text-[11.5px] text-[#64748B]">{brk}</div>
                  </div>
                  <Avatar name={who[0]} tone={st==="warn"?"red":"neutral"} size={24}/>
                  <div className="text-[12px] text-[#0F172A] w-24">{who}</div>
                  {st==="new" && <Tag tone="accent">NEW</Tag>}
                  {st==="warn" && <Tag tone="warn">{L("再確認","Reconfirm")}</Tag>}
                  {st==="ok" && <Tag tone="ok"><Icon.Check s={10}/></Tag>}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right col */}
        <div className="space-y-5">
          {/* §M1 ADD: 最近のアクティビティ timeline */}
          <Card>
            <CardHead title={L("最近のアクティビティ","Recent activity")} action={<Btn kind="link" size="sm">{L("すべて見る →","See all →")}</Btn>}/>
            <div className="p-4 space-y-3.5">
              {[
                [L("出稿同期","Listing sync"),  L("出稿中のすべての媒体へ配信完了","Synced to every publishing medium"), "14:38", "#16A34A"],
                [L("価格更新","Price update"),  L("ZOOM本郷 701 ¥258,000 → ¥262,000","ZOOM Hongo 701 ¥258,000 → ¥262,000"), "13:50", "#2563EB"],
                [L("申込受付","Application"),   L("山田 太郎 — 青葉マンション 305","Mr. Yamada — Aoba Mansion 305"), "11:24", "#F59E0B"],
                [L("内見予約","Viewing booked"),L("FINDERS 吉祥寺店 — 本日 18:00","FINDERS Kichijoji — today 18:00"), "10:02", "#0F172A"],
                [L("画像追加","Image added"),   L("メゾン白金 102 に4枚アップロード","4 photos added to Maison Shirokane 102"), L("昨日","Yest"), "#94A3B8"],
              ].map(([title, body, time, dot], i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: dot }}/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[12.5px] font-semibold text-[#0F172A]">{title}</span>
                      <span className="text-[10.5px] text-[#94A3B8] tabnum shrink-0">{time}</span>
                    </div>
                    <div className="text-[11.5px] text-[#64748B] truncate">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/*
            §M1 REMOVE: マーケットインサイト (Beta) / Market Insight card — deleted outright.
              Design-system §0 bans AI insight boxes (H1). Do NOT restore.

            🔔 Proposed addition (GATED — not rendered) pending customer approval:
              • 要対応 (待ち時間) / Awaiting you — list of items awaiting the user
                (申込 36h / 申込 18h / 質問 4h / 更新依頼 2h).
              • 空室上位 (要注力) / Longest vacancies — top vacant rooms with days + rent
                (ZOOM吉祥寺 502 87d / メゾン白金 305 62d / 青葉マンション 102 54d / パークサイド 401 41d).
              Restore these two cards here if the customer approves them.
          */}
        </div>
      </div>
    </AppShell>
  );
};

// M2 物件一覧 → moved to _shared/screens/management-1-m2.jsx (rebuild 2026-08-20)

// ══════════════════════════════ M3 — CREATE PROPERTY (3 SEPARATE STEPS) ══════════════════════════════
const M3_STEPS = () => [
  L("基本情報","Basics"),
  L("住所・交通","Address & transit"),
  L("確認・登録","Confirm & create"),
];

const M3_SLUGS = ["03-property-create-step1-basics","03-property-create-step2-address","03-property-create-step3-confirm"];

const M3Shell = ({ active, prevLabel, nextLabel, nextKind = "accent", children, lastActions }) => {
  const STEPS = M3_STEPS();
  const langDir = window.isJP() ? "jp" : "en";
  const titleJP = ["基本情報","住所・交通","確認・登録"];
  const titleEN = ["Basics","Address & transit","Confirm & create"];
  return (
    <AppShell active="properties"
      crumbs={[L("ホーム","Home"), L("物件","Properties"), L("新規登録","New"), L(titleJP[active], titleEN[active])]}
      title={L(`物件を新規登録 — ${titleJP[active]}`, `Create new property — ${titleEN[active]}`)}
      subtitle={L(`ステップ ${active+1} / 3`, `Step ${active+1} of 3`)}
      actions={<Btn kind="ghost" size="sm" icon={Icon.X}>{L("閉じる","Close")}</Btn>}>

      <div className="max-w-[840px] mx-auto">
        {/* Stepper */}
        <Card className="overflow-hidden mb-5">
          <div className="px-6 py-5 flex items-center gap-2 bg-white">
            {STEPS.map((n, i) => (
              <React.Fragment key={i}>
                <a href={`../${langDir}/management/${M3_SLUGS[i]}.html`.replace("../"+langDir, langDir==="jp"?"./..":"./..")}
                   className="flex items-center gap-2.5 group cursor-pointer no-underline"
                   onClick={(e)=>{ e.preventDefault(); window.location.href = M3_SLUGS[i] + ".html"; }}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold transition ${
                    i === active ? "bg-[#F59E0B] text-[#0F172A]" :
                    i < active   ? "bg-[#0F172A] text-white"     :
                                   "bg-white border border-[#E5E7EB] text-[#94A3B8]"
                  }`}>{i < active ? <Icon.Check s={13}/> : i+1}</div>
                  <div>
                    <div className={`text-[10.5px] uppercase tracking-wider font-semibold ${i === active ? "text-[#92400E]" : "text-[#94A3B8]"}`}>STEP {i+1}</div>
                    <div className={`text-[12.5px] ${i === active ? "font-semibold text-[#0F172A]" : i < active ? "text-[#475569]" : "text-[#94A3B8]"}`}>{n}</div>
                  </div>
                </a>
                {i < STEPS.length-1 && <div className={`flex-1 h-px ${i < active ? "bg-[#0F172A]" : "bg-[#E5E7EB]"}`}/>}
              </React.Fragment>
            ))}
          </div>
        </Card>

        {/* Step body card */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-[#F1F5F9] bg-[#F8FAFC]">
            <div className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-[#94A3B8]">STEP {active+1} / 3</div>
            <div className="text-[15px] font-semibold mt-1">{L(titleJP[active], titleEN[active])}</div>
          </div>
          {children}
          <div className="px-6 py-4 border-t border-[#F1F5F9] flex items-center gap-3 bg-[#F8FAFC]">
            {prevLabel ? <a href={`${M3_SLUGS[active-1]}.html`}><Btn kind="ghost" icon={Icon.ArrowLeft}>{prevLabel}</Btn></a> : <span/>}
            {/* 🔔 GATED: 自動保存 indicator — <span className="ml-auto text-[11px] text-[#94A3B8]">{L("自動保存済 · 14:38","Autosaved · 14:38")}</span> (removed pending approval) */}
            <span className="ml-auto"/>
            {lastActions || (
              <>
                <Btn kind="ghost">{L("下書きに保存","Save draft")}</Btn>
                {nextLabel && <a href={`${M3_SLUGS[active+1]}.html`}><Btn kind={nextKind} iconRight={<Icon.ArrowRight s={12}/>}>{nextLabel}</Btn></a>}
              </>
            )}
          </div>
        </Card>

        <div className="text-center text-[11px] text-[#94A3B8] mt-4">
          {L("ステップヘッダーをクリックして任意のステップに移動できます。","Click any step header above to jump to that step.")}
        </div>
      </div>
    </AppShell>
  );
};

// ── Step 1: Basics
window.ScreenM3Step1 = function () {
  // §M3 ADD: 西暦/和暦 toggle on 築年月 (moved here from Step 2)
  const [wareki, setWareki] = React.useState(false);
  return (
    <M3Shell active={0} nextLabel={L("住所・交通へ","Next: Address")}>
      <div className="p-6 space-y-4">
        {/*
          🔔 GATED (removed pending approval):
            • 登録タイプ radio (新規建物+1室 / 既存建物に追加) and its explanatory info box.
            • オーナー会社, 社内担当, 管理開始日 fields.
          These belong to the management/contract setup, not basic property identity.
          Original markup preserved here for restore:

          <div className="p-3 bg-[#F1F5F9] rounded-md flex items-start gap-3 text-[12px]">
            <Icon.Info s={14} stroke="#475569"/>
            <div className="text-[#475569]">{L("既存の建物から部屋を追加する場合は…","To add a room to an existing building…")}</div>
          </div>
          <Field label={L("登録タイプ","Registration type")} required> … radio cards … </Field>
          <Field label={L("オーナー会社","Owner company")} required><Select value={L("青葉ホールディングス","Aoba Holdings")}/></Field>
          <Field label={L("社内担当","Internal owner")}><Select value={L("田中 健一 (本店)","Tanaka Kenichi (HQ)")}/></Field>
          <Field label={L("管理開始日","Mgmt start date")}><Input value="2026-06-01"/></Field>
        */}

        {/* §M3 ADD: identity block — 自社管理番号 (primary key, H6) + 物件名 + カナ */}
        <div className="grid grid-cols-2 gap-3">
          <Field label={L("自社管理番号","Internal mgmt no.")} required hint={L("業者間の主キー","Inter-broker key")}>
            <Input value="HG-2019-0701" prefix="#"/>
          </Field>
          <Field label={L("物件種別","Property type")} required><Select value={L("マンション (RC・SRC)","Apartment (RC/SRC)")}/></Field>
          <Field label={L("物件名","Property name")} required><Input value="ZOOM本郷"/></Field>
          <Field label={L("物件名カナ","Property name (kana)")}><Input value={L("ズームホンゴウ","Zoom Hongo")}/></Field>
        </div>

        {/* 管理形態 retained */}
        <Field label={L("管理形態","Mgmt type")} required><Select value={L("一般管理","Standard")}/></Field>

        {/* §M3 CHANGE: 構造 / 築年月 / 総戸数 moved back here from Step 2 + 西暦/和暦 toggle */}
        <div className="grid grid-cols-3 gap-3">
          <Field label={L("構造","Structure")} required><Select value={L("RC造","RC")}/></Field>
          <Field label={L("築年月","Built")} required>
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <Input value={wareki ? L("令和元年 4月","Reiwa 1 / Apr") : "2019-04"}/>
              <div className="flex items-center bg-white border border-[#E5E7EB] rounded-md p-[2px] shrink-0">
                <button onClick={() => setWareki(false)} className={`px-2 py-1 rounded text-[10.5px] ${!wareki ? "bg-[#0F172A] text-white" : "text-[#475569]"}`}>{L("西暦","CE")}</button>
                <button onClick={() => setWareki(true)} className={`px-2 py-1 rounded text-[10.5px] ${wareki ? "bg-[#0F172A] text-white" : "text-[#475569]"}`}>{L("和暦","和")}</button>
              </div>
            </div>
          </Field>
          <Field label={L("総戸数","Total units")} required><Input value="48" suffix={L("戸","units")}/></Field>
        </div>

        {/* §M3 ADD: 地上階数 / 地下階数 */}
        <div className="grid grid-cols-2 gap-3">
          <Field label={L("地上階数","Floors above ground")}><Input value="12" suffix={L("階","F")}/></Field>
          <Field label={L("地下階数","Basement floors")}><Input value="1" suffix={L("階","F")}/></Field>
        </div>
      </div>
    </M3Shell>
  );
};

// ── Step 2: Address & Transit
window.ScreenM3Step2 = function () {
  // §M3 ADD: 交通情報 — repeating 路線 / 駅 / 徒歩X分 rows
  const transit = [
    [L("東京メトロ丸ノ内線","Tokyo Metro Marunouchi"), L("本郷三丁目","Hongo-sanchome"), L("徒歩5分","5 min walk")],
    [L("都営大江戸線","Toei Oedo"), L("本郷三丁目","Hongo-sanchome"), L("徒歩6分","6 min walk")],
  ];
  return (
    <M3Shell active={1} prevLabel={L("基本情報に戻る","Back: Basics")} nextLabel={L("確認画面へ","Next: Confirm")}>
      <div className="p-6 space-y-4">
        <Field label={L("郵便番号","Postal code")} hint={L("入力すると住所が自動入力されます","Address auto-fills on input")} required>
          <div className="flex items-center gap-2">
            <Input value="113-0033" prefix="〒"/>
            <Btn kind="ghost" size="sm" icon={Icon.Search}>{L("住所を取得","Lookup")}</Btn>
          </div>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={L("都道府県","Prefecture")} required><Select value={L("東京都","Tokyo")}/></Field>
          <Field label={L("市区町村","City / Ward")} required><Select value={L("文京区","Bunkyo-ku")}/></Field>
        </div>
        <Field label={L("町名・番地","Street address")} required>
          <Input value={L("本郷 5-24-5","Hongo 5-24-5")}/>
        </Field>

        {/* §M3 CHANGE: 建物名 / 構造 / 築年月 / 総戸数 moved to Step 1 (basic property identity). */}

        {/* §M3 ADD: 交通情報 (路線 / 駅 / 徒歩X分) repeating rows */}
        <div className="border-t border-[#F1F5F9] pt-4">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("交通情報","Transit access")}</div>
          <div className="grid grid-cols-[1.4fr_1fr_1fr_auto] gap-2 px-1 mb-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-[#94A3B8]">
            <span>{L("路線","Line")}</span>
            <span>{L("駅","Station")}</span>
            <span>{L("徒歩","Time")}</span>
            <span/>
          </div>
          <div className="space-y-2">
            {transit.map(([line, sta, time], i) => (
              <div key={i} className="grid grid-cols-[1.4fr_1fr_1fr_auto] gap-2 items-center">
                <Select value={line}/>
                <Input value={sta}/>
                <Input value={time}/>
                <button className="w-9 h-9 rounded-md border border-[#E5E7EB] bg-white flex items-center justify-center text-[#94A3B8] hover:text-[#DC2626] hover:border-[#FECACA] shrink-0">
                  <Icon.Trash s={14}/>
                </button>
              </div>
            ))}
          </div>
          <Btn kind="ghost" size="sm" icon={Icon.Plus} style={{ marginTop: 10 }}>{L("路線を追加","Add line")}</Btn>
        </div>

        {/*
          🔔 GATED (removed pending approval):
            • Square 取り込みバナー (building data auto-import).
              Auto-import is owned by the sync layer, not this wizard step.
          <div className="p-3 bg-[#F1F5F9] rounded-md flex items-center gap-3 text-[12px] text-[#475569]">
            <Icon.Sparkle s={14} stroke="#0F172A"/>
            <span>{L("Square から建物データを取り込み済み (最終同期 14:32)","Building data imported from Square (last sync 14:32)")}</span>
            <Tag tone="ok" size="sm">{L("自動入力","Auto-filled")}</Tag>
          </div>
        */}
      </div>
    </M3Shell>
  );
};

// ── Step 3: Confirm
// ── Step 4: Confirm
window.ScreenM3Step4 = function () {
  return (
    <M3Shell active={2} prevLabel={L("住所・交通に戻る","Back: Address")}
      lastActions={<>
        <Btn kind="ghost">{L("下書きで保存","Save as draft")}</Btn>
        <Btn kind="accent" icon={Icon.CheckCircle}>{L("登録して詳細を編集","Create & open detail")}</Btn>
      </>}>
      <div className="p-6 space-y-4">
        <div className="p-4 bg-[#DCFCE7] border border-[#BBF7D0] rounded-md flex items-center gap-3">
          <Icon.CheckCircle s={20} stroke="#15803D"/>
          <div className="text-[12.5px] text-[#15803D]">{L("入力内容に問題はありません。下記の内容で物件を登録します。",
                                                            "All inputs look good. The property will be created with the values below.")}</div>
        </div>
        {[
          [L("① 基本情報","① Basics"), [
            [L("自社管理番号","Mgmt no."), "HG-2019-0701"],
            [L("物件名 / カナ","Name / kana"), L("ZOOM本郷 / ズームホンゴウ","ZOOM Hongo")],
            [L("物件種別","Type"), L("マンション (RC・SRC)","Apartment (RC/SRC)")],
            [L("管理形態","Mgmt type"), L("一般管理","Standard")],
            [L("構造 / 築年月","Structure / built"), L("RC造 / 2019年4月","RC / Apr 2019")],
            [L("総戸数 / 階数","Units / floors"), L("48戸 / 地上12・地下1","48 / 12F+B1")],
          ], M3_SLUGS[0]],
          [L("② 住所・交通","② Address & transit"), [
            [L("住所","Address"), L("東京都 文京区 本郷 5-24-5","5-24-5 Hongo, Bunkyo, Tokyo")],
            [L("交通①","Transit 1"), L("丸ノ内線 本郷三丁目 徒歩5分","Marunouchi · Hongo-sanchome · 5 min")],
            [L("交通②","Transit 2"), L("大江戸線 本郷三丁目 徒歩6分","Oedo · Hongo-sanchome · 6 min")],
          ], M3_SLUGS[1]],
          /* 🔔 GATED: ③ 部屋 summary card removed — Step 3 (部屋情報) is proposed for removal. */
        ].map(([title, rows, link], i) => (
          <div key={i} className="border border-[#E5E7EB] rounded-md overflow-hidden">
            <div className="px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E5E7EB] flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#0F172A]">{title}</span>
              <a href={`${link}.html`}><Btn kind="link" size="sm" icon={Icon.Edit}>{L("編集","Edit")}</Btn></a>
            </div>
            <div className="grid grid-cols-2 gap-px bg-[#F1F5F9]">
              {rows.map(([k, v], j) => (
                <div key={j} className="bg-white px-4 py-2.5">
                  <div className="text-[10.5px] uppercase tracking-wider text-[#94A3B8] font-semibold">{k}</div>
                  <div className="text-[12.5px] font-semibold mt-[2px] tabnum">{v}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="border-t border-[#F1F5F9] pt-4">
          {/*
            🔔 GATED (removed pending approval):
              登録後の自動アクション (4 post-registration auto-action checkboxes:
              Square 同期 / RAINZ 登録 / 詳細ページを開く / 出稿は手動).
              These describe sync-layer side effects, not user input; held for approval.

            <div className="text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("登録後の自動アクション","Automated actions after creation")}</div>
            <div className="space-y-1.5 text-[12.5px]">
              {[
                [L("Square (基幹) に物件IDを同期","Sync to Square (core system)"), true],
                [L("RAINZ に基本情報を登録","Register basics in RAINZ"), true],
                [L("物件詳細ページを開いて掲載情報を編集","Open detail page to edit listing info"), true],
                [L("出稿は手動で開始 (各サイト未公開)","Publishing remains manual (off by default)"), false],
              ].map(([n, on], i) => ( … ))}
            </div>
          */}
          {/* §M3: post-creation editing note (room details / photos / monthly costs live in M4·M5b) */}
          <div className="text-[12px] text-[#64748B] leading-relaxed">{L("登録後は物件詳細ページ (M4) が開きます。部屋情報・写真・月額費用は、登録後に物件編集 (M4 / 部屋編集 M5b) で入力・編集します。","After creation the property detail page (M4) opens. Room details, photos and monthly costs are entered later in the property editor (M4 / room editor M5b).")}</div>
        </div>
      </div>
    </M3Shell>
  );
};

// Legacy alias kept for any existing wrapper that still loads the old slug
window.ScreenM3Create = window.ScreenM3Step1;


// M4 物件編集 概要 → moved to _shared/screens/management-1-m4.jsx (rebuild 2026-08-20)

// M5 建物 → moved to _shared/screens/management-1-m5.jsx (rebuild 2026-08-20)

// M5b 部屋 → moved to _shared/screens/management-1-m5b.jsx (rebuild 2026-08-20)
