// _shared/screens/management-3-m13.jsx — M13 入居申込 一覧 (rebuilt 2026-08-20)
// Delivers: #6 入力中 tab + per-row fill progress (例: 20/50項目) with a thin progress bar.

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, AppShell } = window;
const L = window.L;

const M13_STATUS = {
  draft:    ["outline", L("入力中","In progress")],
  received: ["neutral", L("受付済","Received")],
  review:   ["warn",    L("審査中","Under review")],
  approved: ["ok",      L("承認","Approved")],
  rejected: ["danger",  L("否認","Rejected")],
  withdraw: ["neutral", L("取り下げ","Withdrawn")],
};

// [datetime, property, room, applicant, broker, kind, status, assignee, fill]
const M13_ROWS = () => [
  ["05/26 14:02", "ZOOM本郷",              "701", L("山田 太郎","Mr. Yamada"),      L("FINDERS 吉祥寺店","FINDERS Kichijoji"), "person", "review",   L("大久保","Okubo"),  null],
  ["05/26 11:37", L("吉祥寺パークレジデンス","Kichijoji Park Residence"), "501", L("株式会社ミライ商会","Mirai Shokai Inc."), L("エイブル 品川店","Able Shinagawa"), "corp", "received", L("佐藤","Sato"), null],
  ["05/26 09:14", "ZOOM本郷",              "305", L("鈴木 一郎","Mr. Suzuki"),      L("ミニミニ 本郷店","MiniMini Hongo"),    "person", "draft",    L("大久保","Okubo"),  [20, 50]],
  ["05/25 19:48", L("青葉マンション","Aoba Mansion"), "305", L("佐々木 花子","Ms. Sasaki"), L("アパマン 中野店","Apaman Nakano"), "person", "approved", L("佐藤","Sato"), null],
  ["05/25 16:05", L("中野グリーンハイツ","Nakano Green Heights"), "201", L("高橋 実","Mr. Takahashi"), L("ハウスコム 三軒茶屋店","Housecom"), "person", "draft", L("鈴木","Suzuki"), [34, 50]],
  ["05/25 13:22", L("メゾン白金","Maison Shirokane"), "102", L("渡辺 由美","Ms. Watanabe"), L("三井のリハウス 白金台","Mitsui Rehouse"), "person", "review", L("田中","Tanaka"), null],
  ["05/24 18:30", L("パークサイド代沢","Parkside Daizawa"), "401", L("井上 剛","Mr. Inoue"), L("FINDERS 吉祥寺店","FINDERS Kichijoji"), "person", "approved", L("田中","Tanaka"), null],
  ["05/24 15:11", "ZOOM本郷",              "702", L("合同会社ノース","North LLC"),  L("エイブル 品川店","Able Shinagawa"),    "corp",   "rejected", L("大久保","Okubo"),  null],
  ["05/24 10:02", L("カーサ恵比寿","Casa Ebisu"), "203", L("中村 桃子","Ms. Nakamura"), L("ミニミニ 本郷店","MiniMini Hongo"), "person", "received", L("鈴木","Suzuki"), null],
  ["05/23 17:44", L("青葉マンション","Aoba Mansion"), "402", L("木村 拓","Mr. Kimura"), L("アパマン 中野店","Apaman Nakano"), "person", "withdraw", L("佐藤","Sato"), null],
  ["05/23 14:20", L("吉祥寺パークレジデンス","Kichijoji Park Residence"), "302", L("藤田 沙織","Ms. Fujita"), L("ハウスコム 三軒茶屋店","Housecom"), "person", "review", L("鈴木","Suzuki"), null],
  ["05/23 09:58", L("中野グリーンハイツ","Nakano Green Heights"), "305", L("小林 健","Mr. Kobayashi"), L("FINDERS 吉祥寺店","FINDERS Kichijoji"), "person", "approved", L("田中","Tanaka"), null],
];

window.ScreenM13AppList = function () {
  const rows = M13_ROWS();
  const [tab, setTab] = React.useState(0);
  const [sel, setSel] = React.useState([0, 2, 4, 5, 8]);
  const [panel, setPanel] = React.useState(true);
  const [sort, setSort] = React.useState("date");

  const tabs = [
    [L("全て","All"), 52, null],
    [L("入力中","In progress"), 5, "draft"],
    [L("受付済","Received"), 8, "received"],
    [L("審査中","Under review"), 15, "review"],
    [L("承認","Approved"), 18, "approved"],
    [L("否認","Rejected"), 4, "rejected"],
    [L("取り下げ","Withdrawn"), 2, "withdraw"],
  ];
  const filter = tabs[tab][2];
  const shown = rows.map((r, i) => [r, i]).filter(([r]) => !filter || r[6] === filter);
  const toggle = (i) => setSel(s => s.includes(i) ? s.filter(x => x !== i) : s.concat([i]));
  const allShown = shown.length > 0 && shown.every(([, i]) => sel.includes(i));
  const Th = ({ label, k, right }) => (
    <th className={`px-2 py-2 font-semibold whitespace-nowrap ${right ? "text-right" : "text-left"}`}>
      <button onClick={() => setSort(k)} className={`inline-flex items-center gap-1 ${sort === k ? "text-[#0F172A]" : ""}`}>
        {label}{k && <Icon.ChevronDown s={9} stroke={sort === k ? "#0F172A" : "#CBD5E1"}/>}
      </button>
    </th>
  );

  return (
    <AppShell active="applications"
      crumbs={[L("入居申込","Applications"), L("申込一覧","Application list")]}
      title={L("入居申込一覧","Rental applications")}
      subtitle={L("52件 · 対応待ち9件 · 平均審査時間 18時間","52 total · 9 awaiting action · 18h average review time")}
      actions={<>
        <Btn kind="ghost" icon={Icon.Download}>{L("CSV出力","Export CSV")}</Btn>
        <Btn kind="ghost" icon={Icon.Chart}>{L("レポート","Report")}</Btn>
      </>}>

      <div className="flex gap-4 items-start flex-wrap">
        <div className="flex-1 space-y-4" style={{ minWidth: 520 }}>

          {/* filter bar */}
          <Card>
            <div className="px-3 pt-3 flex items-center gap-1.5 flex-wrap">
              {tabs.map(([label, count], i) => (
                <button key={i} onClick={() => setTab(i)}
                  className={`inline-flex items-center gap-1.5 h-7 px-3 rounded-full text-[12px] border whitespace-nowrap ${
                    i === tab ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white border-[#E5E7EB] text-[#475569] hover:bg-[#F7F8FA]"}`}>
                  {label}<span className="text-[10px] opacity-70 tabnum">{count}</span>
                </button>
              ))}
            </div>
            <div className="p-3 grid grid-cols-4 gap-3">
              <Field label={L("日付範囲","Date range")}><Input value="2026/05/20 〜 2026/05/26" prefix={<Icon.Calendar s={12}/>}/></Field>
              <Field label={L("物件","Property")}><Select value={L("すべて","All")}/></Field>
              <Field label={L("仲介会社","Broker")}><Select value={L("すべて","All")}/></Field>
              <Field label={L("申込者名","Applicant name")}><Input value="" placeholder={L("氏名・法人名で検索","Search by name")} prefix={<Icon.Search s={12}/>}/></Field>
            </div>
          </Card>

          {/* table */}
          <Card className="overflow-visible">
            <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-[12px]">
              <thead className="bg-[#F7F8FA] text-[#475569] text-[10.5px] uppercase tracking-wider">
                <tr className="border-b border-[#E5E7EB]">
                  <th className="px-3 py-2 w-8 text-left">
                    <button onClick={() => setSel(allShown ? [] : shown.map(([, i]) => i))}
                      className={`w-[15px] h-[15px] rounded border inline-flex items-center justify-center align-middle ${allShown ? "bg-[#0F172A] border-[#0F172A]" : "bg-white border-[#CBD5E1]"}`}>
                      {allShown && <Icon.Check s={10} stroke="#fff"/>}
                    </button>
                  </th>
                  <Th label={L("申込日時","Submitted")} k="date"/>
                  <Th label={L("物件名","Property")} k="prop"/>
                  <Th label={L("部屋","Room")} k="room"/>
                  <Th label={L("申込者氏名","Applicant")} k="name"/>
                  <Th label={L("仲介会社","Broker")} k="broker"/>
                  <Th label={L("申込種別","Type")} k="kind"/>
                  <Th label={L("ステータス","Status")} k="status"/>
                  <Th label={L("担当者","Assignee")} k="assignee"/>
                  <th className="px-2 py-2 text-left font-semibold whitespace-nowrap">{L("アクション","Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {shown.map(([r, idx]) => {
                  const [dt, prop, room, applicant, broker, kind, status, assignee, fill] = r;
                  const [tone, label] = M13_STATUS[status];
                  const on = sel.includes(idx);
                  return (
                    <tr key={idx} className={`border-b last:border-0 border-[#F1F5F9] ${on ? "bg-[#F1F5F9]" : "hover:bg-[#F8FAFC]"}`}>
                      <td className="px-3 py-1.5">
                        <button onClick={() => toggle(idx)}
                          className={`w-[15px] h-[15px] rounded border inline-flex items-center justify-center align-middle ${on ? "bg-[#0F172A] border-[#0F172A]" : "bg-white border-[#CBD5E1]"}`}>
                          {on && <Icon.Check s={10} stroke="#fff"/>}
                        </button>
                      </td>
                      <td className="px-2 py-1.5 tabnum whitespace-nowrap text-[#475569]">{dt}</td>
                      <td className="px-2 py-1.5">
                        <a href="14-application-detail-step1-received.html" className="font-semibold text-[#0F172A] hover:underline">{prop}</a>
                      </td>
                      <td className="px-2 py-1.5 text-[#475569] tabnum">{room}</td>
                      <td className="px-2 py-1.5 text-[#0F172A]">{applicant}</td>
                      <td className="px-2 py-1.5 text-[#475569]">{broker}</td>
                      <td className="px-2 py-1.5">
                        <Tag tone={kind === "corp" ? "dark" : "neutral"}>{kind === "corp" ? L("法人","Corporate") : L("個人","Individual")}</Tag>
                      </td>
                      <td className="px-2 py-1.5 w-[132px]">
                        {/* #6 — 入力中 rows carry the fill progress */}
                        {fill ? (
                          <div>
                            <Tag tone="outline">{L(`入力中 ${fill[0]}/${fill[1]}項目`, `In progress ${fill[0]}/${fill[1]}`)}</Tag>
                            <div className="h-1 rounded-full bg-[#F1F5F9] mt-1 overflow-hidden">
                              <div className="h-full rounded-full bg-[#94A3B8]" style={{ width: (fill[0] / fill[1] * 100) + "%" }}/>
                            </div>
                          </div>
                        ) : <Tag tone={tone}>{label}</Tag>}
                      </td>
                      <td className="px-2 py-1.5 text-[#475569]">{assignee}</td>
                      <td className="px-2 py-1.5">
                        <div className="flex items-center gap-1 whitespace-nowrap">
                          <a href="14-application-detail-step1-received.html" className="h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#475569] hover:bg-[#F1F5F9] inline-flex items-center">{L("詳細","Detail")}</a>
                          {(status === "review" || status === "received") && <>
                            <a href="14a-application-approve-modal.html" className="h-6 px-2 rounded bg-[#0F172A] text-white text-[10.5px] inline-flex items-center">{L("承認","Approve")}</a>
                            <a href="14b-application-reject-modal.html" className="h-6 px-2 rounded border border-[#FECACA] text-[#DC2626] text-[10.5px] hover:bg-[#FEF2F2] inline-flex items-center">{L("否認","Reject")}</a>
                          </>}
                          <a href="15-chat.html" className="w-6 h-6 rounded border border-[#E5E7EB] flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9]"><Icon.Chat s={11}/></a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
            <div className="px-3 py-2.5 flex items-center justify-between text-[12px] text-[#64748B] border-t border-[#F1F5F9]">
              <span className="tabnum">{L(`52件中 1–${shown.length}件表示`, `1–${shown.length} of 52`)}</span>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 rounded-md inline-flex items-center justify-center text-[#CBD5E1]"><Icon.ChevronLeft s={13}/></button>
                {["1", "2", "3"].map(p => (
                  <span key={p} className={`min-w-7 h-7 px-1.5 inline-flex items-center justify-center rounded-md text-[12px] cursor-pointer tabnum ${p === "1" ? "bg-[#0F172A] text-white" : "text-[#475569] hover:bg-[#F1F5F9]"}`}>{p}</span>
                ))}
                <button className="w-7 h-7 rounded-md inline-flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9]"><Icon.ChevronRight s={13}/></button>
              </div>
            </div>
          </Card>
        </div>

        {/* summary mini-panel */}
        <div className="w-[240px] shrink-0 self-start sticky top-4">
          <Card>
            <div className="px-4 py-3 border-b border-[#F1F5F9] flex items-center gap-2">
              <span className="text-[12.5px] font-semibold text-[#0F172A]">{L("サマリ","Summary")}</span>
              <button onClick={() => setPanel(o => !o)} className="ml-auto text-[#94A3B8] hover:text-[#0F172A]">
                {panel ? <Icon.ChevronUp s={13}/> : <Icon.ChevronDown s={13}/>}
              </button>
            </div>
            {panel && (
              <div className="p-4 space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-md bg-[#FEF3C7] flex items-center justify-center shrink-0"><Icon.Clock s={16} stroke="#92400E"/></span>
                  <div>
                    <div className="text-[11px] text-[#94A3B8]">{L("対応待ち","Awaiting action")}</div>
                    <div className="text-[18px] font-bold text-[#0F172A] tabnum leading-none">9</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#F1F5F9]">
                  <div className="text-[11px] text-[#94A3B8]">{L("平均審査時間","Average review time")}</div>
                  <div className="text-[16px] font-bold text-[#0F172A] tabnum">18{L("時間","h")}</div>
                </div>
                <div className="pt-3 border-t border-[#F1F5F9]">
                  <div className="text-[11px] font-semibold text-[#475569] mb-2">{L("媒体別申込数","Applications by medium")}</div>
                  <div className="space-y-1.5">
                    {[["SUUMO", 21], [L("自社HP","Own site"), 12], [L("業者間B2B","B2B"), 9], ["HOMES", 6], [L("アットホーム","at home"), 4]].map(([n, v], i) => (
                      <div key={i}>
                        <div className="flex items-baseline justify-between text-[11px]">
                          <span className="text-[#475569]">{n}</span><span className="tabnum text-[#0F172A] font-semibold">{v}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[#F1F5F9] mt-[2px] overflow-hidden">
                          <div className="h-full rounded-full bg-[#0F172A]" style={{ width: (v / 21 * 100) + "%" }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* bulk action bar */}
      {sel.length > 0 && (
        <div className="fixed bottom-0 left-[240px] right-0 z-30 bg-[#0F172A] text-white px-6 h-[56px] flex items-center gap-3"
             style={{ boxShadow: "0 -8px 24px rgba(15,23,42,0.20)" }}>
          <span className="text-[13px] font-semibold tabnum">{L(`${sel.length}件 選択中`, `${sel.length} selected`)}</span>
          <button onClick={() => setSel([])} className="text-[11.5px] text-white/60 hover:text-white underline">{L("選択解除","Clear")}</button>
          <div className="ml-auto flex items-center gap-2">
            <button className="h-9 px-3.5 rounded-md text-[12.5px] font-medium bg-white/10 hover:bg-white/20 inline-flex items-center gap-1.5"><Icon.Sync s={13} stroke="#fff"/>{L("一括ステータス変更","Bulk status change")}</button>
            <button className="h-9 px-3.5 rounded-md text-[12.5px] font-medium bg-white/10 hover:bg-white/20 inline-flex items-center gap-1.5"><Icon.User s={13} stroke="#fff"/>{L("担当者変更","Reassign")}</button>
            <button className="h-9 px-3.5 rounded-md text-[12.5px] font-medium bg-white/10 hover:bg-white/20 inline-flex items-center gap-1.5"><Icon.Download s={13} stroke="#fff"/>{L("CSV出力","Export CSV")}</button>
          </div>
        </div>
      )}
      <div className="h-16"/>
    </AppShell>
  );
};
