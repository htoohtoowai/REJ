// _shared/screens/management-4-m16.jsx — M16 CSV出力・レポート (rebuilt 2026-08-20)
// Delivers: M-23 図面 Excel 出力 + 未募集物件も選択可 (差し込み枠 template model).

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, AppShell } = window;
const L = window.L;

const M16_FIELDS = () => [
  [L("物件名","Property name"), true], [L("部屋番号","Room no."), true], [L("自社管理番号","Mgmt no."), true],
  [L("賃料","Rent"), true], [L("管理費","Mgmt fee"), true], [L("間取り","Layout"), true],
  [L("専有面積","Floor area"), true], [L("現況","Occupancy"), true], [L("タグ","Tags"), true],
  [L("媒体掲載状況","Publishing status"), false], [L("担当者","Assignee"), true], [L("更新日","Updated"), true],
  [L("住所","Address"), false], [L("築年月","Built"), false], [L("敷金・礼金","Deposit / key money"), false],
  [L("広告料（AD）","Ad fee"), false],
];

window.ScreenM16CSV = function () {
  const [tab, setTab] = React.useState(0);
  const [step, setStep] = React.useState(0);
  const [target, setTarget] = React.useState(0);
  const [fields, setFields] = React.useState(() => M16_FIELDS().map(f => f[1]));
  const F = M16_FIELDS();
  const tabs = [L("クイック出力","Quick export"), L("カスタム出力","Custom export"), L("レポート","Reports"), L("スケジュール出力","Scheduled exports")];
  const steps = [L("データ選択","Choose data"), L("フィールド選択","Choose fields"), L("フィルター","Filters"), L("プレビュー","Preview")];
  const picked = fields.filter(Boolean).length;

  const Spark = ({ points, tone = "#0F172A" }) => (
    <svg viewBox="0 0 100 28" className="w-full h-7" preserveAspectRatio="none">
      <polyline fill="none" stroke={tone} strokeWidth="1.6" points={points.map((p, i) => `${i * (100 / (points.length - 1))},${28 - p * 26}`).join(" ")}/>
    </svg>
  );

  return (
    <AppShell active="reports"
      crumbs={[L("CSV / レポート","CSV & reports"), tabs[tab]]}
      title={L("CSV出力・レポート","CSV export & reports")}
      subtitle={L("定型出力・カスタム出力・帳票・定期配信","Presets, custom exports, reports and scheduled delivery")}>

      <div className="flex items-center gap-1 border-b border-[#E5E7EB] mb-5 -mt-1">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className={`px-3.5 py-2 text-[13px] whitespace-nowrap ${i === tab
              ? "text-[#0F172A] font-semibold border-b-2 border-[#0F172A] -mb-px"
              : "text-[#64748B] hover:text-[#0F172A]"}`}>{t}</button>
        ))}
      </div>

      {/* ══ Tab 1 — quick export ══ */}
      {tab === 0 && (
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))" }}>
          {[
            [Icon.Building, L("物件一覧","Property list"), L("募集中の物件一覧をCSVで出力","Export the currently-listed properties as CSV"),
              <Field label={L("対象","Scope")}><Select value={L("募集中のみ（132件）","Listing only (132)")}/></Field>, "csv", "05/26 09:12", "412 KB"],
            [Icon.Calendar, L("内見予約一覧","Viewing bookings"), L("期間内の内見予約をCSVで出力","Export viewings in a date range as CSV"),
              <Field label={L("期間","Date range")}><Input value="2026/05/01 〜 2026/05/31" prefix={<Icon.Calendar s={12}/>}/></Field>, "csv", "05/25 18:40", "88 KB"],
            [Icon.FileText, L("入居申込一覧","Applications"), L("ステータスを絞って申込をCSVで出力","Export applications filtered by status"),
              <Field label={L("ステータス","Status")}><Select value={L("審査中・承認（33件）","Review & approved (33)")}/></Field>, "csv", "05/24 11:05", "156 KB"],
            [Icon.Chart, L("オーナー向け報告書","Owner report"), L("物件と期間を指定してPDFで出力","Pick a property and period, export as PDF"),
              <div className="grid grid-cols-2 gap-2">
                <Field label={L("物件","Property")}><Select value="ZOOM本郷"/></Field>
                <Field label={L("期間","Period")}><Select value={L("2026年4月","Apr 2026")}/></Field>
              </div>, "pdf", "05/01 08:00", "2.1 MB"],
          ].map(([Ico, title, desc, control, kind, ts, size], i) => (
            <Card key={i} className="flex flex-col">
              <div className="p-4 flex items-start gap-3 flex-1">
                <span className="w-10 h-10 rounded-md bg-[#0F172A] text-white flex items-center justify-center shrink-0"><Ico s={18}/></span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-semibold text-[#0F172A]">{title}</div>
                  <div className="text-[11.5px] text-[#64748B] mt-0.5 leading-snug">{desc}</div>
                  <div className="mt-3">{control}</div>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-[#F1F5F9] bg-[#F8FAFC] flex items-center gap-2">
                <span className="text-[10.5px] text-[#94A3B8] tabnum leading-snug">
                  {L(`前回 ${ts} · ${size}`, `Last run ${ts} · ${size}`)}
                </span>
                <span className="ml-auto">
                  {kind === "pdf"
                    ? <Btn kind="primary" size="sm" icon={Icon.FileText}>{L("PDF出力","Export PDF")}</Btn>
                    : <Btn kind="primary" size="sm" icon={Icon.Download}>{L("出力","Export")}</Btn>}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ══ Tab 2 — custom export ══ */}
      {tab === 1 && (
        <Card>
          <div className="px-4 py-3 border-b border-[#F1F5F9] flex items-center gap-2 flex-wrap">
            {steps.map((s, i) => (
              <button key={i} onClick={() => setStep(i)} className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  i < step ? "bg-[#16A34A] text-white" : i === step ? "bg-[#0F172A] text-white" : "bg-white border border-[#E5E7EB] text-[#94A3B8]"}`}>
                  {i < step ? <Icon.Check s={11} stroke="#fff"/> : i + 1}
                </span>
                <span className={`text-[12px] ${i === step ? "font-semibold text-[#0F172A]" : "text-[#64748B]"}`}>{s}</span>
                {i < steps.length - 1 && <span className="w-6 h-px bg-[#E5E7EB] mx-1"/>}
              </button>
            ))}
          </div>

          <div className="p-4">
            {step === 0 && (
              <div>
                <div className="text-[11px] font-semibold text-[#475569] mb-1.5">{L("出力対象","Data to export")}</div>
                <div className="flex flex-wrap gap-1.5">
                  {[L("物件","Properties"), L("内見予約","Viewings"), L("入居申込","Applications"), L("チャット履歴","Chat history")].map((o, i) => (
                    <button key={i} onClick={() => setTarget(i)}
                      className={`px-3 py-[6px] rounded-full border text-[12px] ${i === target ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white border-[#E5E7EB] text-[#475569] hover:border-[#CBD5E1]"}`}>{o}</button>
                  ))}
                </div>
                <div className="text-[11.5px] text-[#94A3B8] mt-3">{L("対象を変えるとフィールド候補も切り替わります。","Changing the target switches the available fields.")}</div>
              </div>
            )}

            {step === 1 && (
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-[#475569]">{L("出力するフィールド","Fields to export")}</span>
                  <span className="text-[11px] text-[#94A3B8] tabnum">{L(`${picked} / ${F.length} 項目`, `${picked} / ${F.length} fields`)}</span>
                </div>
                <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))" }}>
                  {F.map(([label], i) => (
                    <div key={i} className={`flex items-center gap-2 rounded px-2 py-[6px] border ${fields[i] ? "bg-[#F8FAFC] border-[#E5E7EB]" : "bg-white border-[#F1F5F9]"}`}>
                      <button className="text-[#CBD5E1] hover:text-[#475569] cursor-grab" title={L("ドラッグで並び替え","Drag to reorder")}><Icon.MoreV s={12}/></button>
                      <label onClick={() => setFields(f => f.map((v, j) => j === i ? !v : v))} className="flex items-center gap-2 text-[12px] cursor-pointer flex-1 min-w-0">
                        <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${fields[i] ? "bg-[#0F172A]" : "border border-[#CBD5E1]"}`}>
                          {fields[i] && <Icon.Check s={11} stroke="#fff"/>}
                        </span>
                        <span className="truncate text-[#0F172A]">{label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-[#475569] mb-1">{L("フィルター条件","Filter conditions")}</div>
                {[
                  [L("現況","Occupancy"), L("＝","is"), L("空室","Vacant")],
                  [L("賃料","Rent"), L("≧","≥"), "150,000"],
                  [L("タグ","Tag"), L("を含む","contains"), "ZOOM RENT"],
                ].map((r, i) => (
                  <div key={i} className="grid gap-2 items-end" style={{ gridTemplateColumns: "minmax(0,1.2fr) 110px minmax(0,1.4fr) 32px" }}>
                    <Select value={r[0]}/>
                    <Select value={r[1]}/>
                    <Input value={r[2]}/>
                    <button className="h-9 text-[#94A3B8] hover:text-[#DC2626] flex items-center justify-center"><Icon.Trash s={13}/></button>
                  </div>
                ))}
                <button className="inline-flex items-center gap-1 text-[12px] text-[#0F172A] hover:underline mt-1"><Icon.Plus s={12}/>{L("条件を追加","Add condition")}</button>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-[#475569]">{L("プレビュー（先頭10行）","Preview (first 10 rows)")}</span>
                  <span className="text-[11px] text-[#94A3B8] tabnum">{L("該当 132件","132 matching rows")}</span>
                </div>
                <div className="border border-[#E5E7EB] rounded-md overflow-x-auto">
                  <table className="w-full min-w-[720px] text-[11.5px]">
                    <thead className="bg-[#F7F8FA] text-[#64748B] text-[10px] uppercase tracking-wider">
                      <tr>
                        {[L("物件名","Property"), L("部屋","Room"), L("自社管理番号","Mgmt no."), L("賃料","Rent"), L("間取り","Layout"), L("現況","Occupancy"), L("タグ","Tags")].map((h, i) => (
                          <th key={i} className="px-2.5 py-1.5 text-left font-semibold whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["ZOOM本郷", "701", "t0021229", "262,000", "2LDK", L("空室","Vacant"), "ZOOMシリーズ / ZOOM RENT"],
                        ["ZOOM本郷", "305", "t0021230", "138,000", "1K", L("入居中","Occupied"), "ZOOMシリーズ"],
                        [L("青葉マンション","Aoba"), "305", "a0030305", "184,000", "1LDK", L("退去予定","Move-out due"), L("武蔵野エリア","Musashino")],
                        [L("中野グリーンハイツ","Nakano GH"), "305", "n0140305", "148,000", "1DK", L("空室","Vacant"), L("ペット可 / ZOOM RENT","Pets OK / ZOOM RENT")],
                        [L("吉祥寺パークレジデンス","Kichijoji PR"), "501", "k0090501", "208,000", "2DK", L("空室","Vacant"), L("武蔵野エリア","Musashino")],
                      ].map((r, i) => (
                        <tr key={i} className="border-t border-[#F1F5F9]">
                          {r.map((c, j) => <td key={j} className={`px-2.5 py-1.5 whitespace-nowrap ${j === 3 ? "tabnum text-right" : "text-[#475569]"}`}>{c}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-[#F1F5F9] bg-[#F8FAFC] flex items-center gap-2 flex-wrap">
            <Btn kind="ghost" size="sm" icon={Icon.Save}>{L("テンプレートとして保存","Save as template")}</Btn>
            <div className="ml-auto flex items-center gap-2">
              {step > 0 && <Btn kind="ghost" size="sm" icon={Icon.ArrowLeft} onClick={() => setStep(s => s - 1)}>{L("戻る","Back")}</Btn>}
              {step < 3
                ? <Btn kind="primary" size="sm" iconRight={<Icon.ArrowRight s={12}/>} onClick={() => setStep(s => s + 1)}>{L("次へ","Next")}</Btn>
                : <>
                    <Btn kind="ghost" size="sm" icon={Icon.Download}>{L("Excel出力","Export Excel")}</Btn>
                    <Btn kind="primary" size="sm" icon={Icon.Download}>{L("CSV出力","Export CSV")}</Btn>
                  </>}
            </div>
          </div>
        </Card>
      )}

      {/* ══ Tab 3 — reports ══ */}
      {tab === 2 && (
        <div className="space-y-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))" }}>
            {[
              [L("月次物件募集状況","Monthly listing status"), [0.4, 0.5, 0.45, 0.62, 0.7, 0.68], "#0F172A"],
              [L("媒体別掲載数推移","Listings by medium"),      [0.3, 0.42, 0.5, 0.48, 0.6, 0.72], "#0F172A"],
              [L("内見成約率","Viewing conversion"),           [0.6, 0.55, 0.5, 0.58, 0.52, 0.62], "#16A34A"],
              [L("申込ファネル分析","Application funnel"),      [0.8, 0.6, 0.45, 0.35, 0.3, 0.28], "#F59E0B"],
              [L("担当者別パフォーマンス","Performance by staff"), [0.35, 0.5, 0.55, 0.5, 0.66, 0.7], "#0F172A"],
            ].map(([title, pts, tone], i) => (
              <Card key={i} className="p-4">
                <div className="text-[12.5px] font-semibold text-[#0F172A] leading-snug">{title}</div>
                <div className="mt-2.5"><Spark points={pts} tone={tone}/></div>
                <div className="flex items-baseline justify-between mt-1.5">
                  <span className="text-[10.5px] text-[#94A3B8] tabnum">{L("直近6ヶ月","Last 6 months")}</span>
                  <a href="#" className="text-[11.5px] font-semibold text-[#0F172A] hover:underline">{L("詳細を見る →","View →")}</a>
                </div>
              </Card>
            ))}
          </div>

          {/* M-23 図面出力 */}
          <Card>
            <CardHead title={L("図面出力","Property sheet (図面) export")}
              sub={L("募集状態を問わず選択できます（未募集物件も含む）","Any property can be selected, including ones not currently listed")}/>
            <div className="p-4">
              <div className="grid gap-4" style={{ gridTemplateColumns: "minmax(280px,1fr) minmax(240px,320px)" }}>
                <div className="space-y-3">
                  <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))" }}>
                    <Field label={L("物件","Property")}><Select value="ZOOM本郷 701"/></Field>
                    <Field label={L("テンプレート","Template")}><Select value={L("標準図面（A4横）","Standard sheet (A4 landscape)")}/></Field>
                    <Field label={L("対象範囲","Scope")}><Select value={L("すべての物件（未募集を含む）","All properties (incl. unlisted)")}/></Field>
                  </div>
                  <div className="text-[11.5px] text-[#64748B] leading-relaxed">
                    {L("システム側の項目・写真をExcelテンプレートの差し込み枠へ流し込んで生成します",
                       "Generated by pouring the system's fields and photos into the placeholder frames of an Excel template")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Btn kind="primary" size="sm" icon={Icon.Download}>{L("Excel出力","Export Excel")}</Btn>
                    <Btn kind="ghost" size="sm" icon={Icon.FileText}>{L("PDF出力","Export PDF")}</Btn>
                    <span className="text-[10.5px] text-[#94A3B8] tabnum ml-1">{L("前回 05/22 16:30 · 1.4 MB","Last run 05/22 16:30 · 1.4 MB")}</span>
                  </div>
                </div>
                {/* template placeholder-frame diagram */}
                <div className="rounded-md border border-[#E5E7EB] bg-[#F8FAFC] p-3">
                  <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("差し込み枠","Placeholder frames")}</div>
                  <div className="rounded border border-dashed border-[#CBD5E1] bg-white p-2 space-y-1.5">
                    <div className="h-3 rounded bg-[#F1F5F9] w-3/5"/>
                    <div className="grid grid-cols-3 gap-1.5">
                      {["写真1", "写真2", "間取り"].map((t, i) => (
                        <div key={i} className="h-10 rounded border border-dashed border-[#CBD5E1] flex items-center justify-center text-[9px] text-[#94A3B8]">{t}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {["賃料", "間取り", "面積", "住所"].map((t, i) => (
                        <div key={i} className="h-4 rounded bg-[#F1F5F9] flex items-center px-1.5 text-[9px] text-[#94A3B8]">{t}</div>
                      ))}
                    </div>
                  </div>
                  <div className="text-[10px] text-[#94A3B8] mt-2 leading-snug">{L("テンプレートはマスタデータ設定で管理します","Templates are managed in master data settings")}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ══ Tab 4 — scheduled ══ */}
      {tab === 3 && (
        <Card className="overflow-hidden">
          <CardHead title={L("スケジュール出力","Scheduled exports")} sub={L("定期実行してメールで配信します","Runs on a schedule and delivers by email")}
            action={<Btn kind="primary" size="sm" icon={Icon.Plus}>{L("新規スケジュール","New schedule")}</Btn>}/>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-[12px]">
              <thead className="bg-[#F7F8FA] text-[#475569] text-[10.5px] uppercase tracking-wider">
                <tr>
                  {[L("名前","Name"), L("種類","Type"), L("頻度","Frequency"), L("配信先メール","Recipients"), L("次回実行","Next run"), L("状態","State"), L("操作","Actions")].map((h, i) => (
                    <th key={i} className="px-2.5 py-2 text-left font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  [L("月初 物件一覧","Monthly property list"), L("物件CSV","Property CSV"), L("毎月1日 08:00","1st of month 08:00"), "ops@lenz-dx.jp", "06/01 08:00", "on"],
                  [L("週次 内見レポート","Weekly viewing report"), L("内見CSV","Viewing CSV"), L("毎週月曜 09:00","Mondays 09:00"), "sales@lenz-dx.jp", "06/01 09:00", "on"],
                  [L("オーナー報告（青葉HD）","Owner report (Aoba HD)"), "PDF", L("毎月5日 10:00","5th of month 10:00"), "owner-aoba@example.com", "06/05 10:00", "on"],
                  [L("申込ファネル","Application funnel"), "Excel", L("毎月末 18:00","Month end 18:00"), "mgmt@lenz-dx.jp", "05/31 18:00", "off"],
                ].map(([name, kind, freq, mail, next, state], i) => (
                  <tr key={i} className="border-t border-[#F1F5F9] hover:bg-[#F8FAFC]">
                    <td className="px-2.5 py-1.5 font-semibold text-[#0F172A] whitespace-nowrap">{name}</td>
                    <td className="px-2.5 py-1.5 text-[#475569] whitespace-nowrap">{kind}</td>
                    <td className="px-2.5 py-1.5 text-[#475569] whitespace-nowrap">{freq}</td>
                    <td className="px-2.5 py-1.5 text-[#475569] whitespace-nowrap">{mail}</td>
                    <td className="px-2.5 py-1.5 text-[#475569] tabnum whitespace-nowrap">{next}</td>
                    <td className="px-2.5 py-1.5">
                      {state === "on" ? <Tag tone="ok">{L("有効","Active")}</Tag> : <Tag tone="neutral">{L("停止中","Paused")}</Tag>}
                    </td>
                    <td className="px-2.5 py-1.5">
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <button className="h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#475569] hover:bg-[#F1F5F9]">{L("編集","Edit")}</button>
                        <button className="h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#475569] hover:bg-[#F1F5F9]">{state === "on" ? L("停止","Pause") : L("再開","Resume")}</button>
                        <button className="w-6 h-6 rounded border border-[#E5E7EB] flex items-center justify-center text-[#94A3B8] hover:text-[#DC2626]"><Icon.Trash s={11}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </AppShell>
  );
};
