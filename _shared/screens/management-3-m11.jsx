// _shared/screens/management-3-m11.jsx — M11 出稿（出稿確認モーダル）(rebuilt 2026-08-20)
// Delivers: H-6 ZOOM RENT / ZOOM SELECTION as own-site adapter rows with the same anatomy as
// いい生活ウェブサイト / 独自サイト · M-16 tag-based routing note (tags are edited on M2/M4/M5b).

const { Icon, Card, Btn, Tag, Field, Input, PhotoPh, AppShell } = window;
const L = window.L;

const M11_ACTIONS = () => [L("新規掲載","Publish new"), L("再掲載","Re-publish"), L("非掲載","Unpublish"), L("掲載しない","Do not publish")];

window.ScreenM11Publish = function () {
  const isTest = typeof window !== "undefined" && window.location.search.indexOf("test=1") >= 0;
  const A = M11_ACTIONS();

  // [media, live?, action index, expiry, note]
  const [rows, setRows] = React.useState([
    ["SUUMO",                          true,  1, "6/15", L("1日4〜5回更新","refreshed 4–5×/day")],
    [L("アットホーム","at home"),        true,  1, "—",    L("リアルタイム","real-time")],
    ["HOMES",                          false, 0, "—",    "—"],
    [L("レインズ","REINS"),             true,  1, "—",    "—"],
    [L("業者間B2B","B2B"),              true,  1, "—",    "—"],
    [L("いい生活ウェブサイト","ii-Seikatsu web"), false, 3, "—", L("独自サイトアダプタ","own-site adapter")],
    ["ZOOM RENT",                      false, 3, "—",    L("独自サイトアダプタ（LENZ DX）","own-site adapter (LENZ DX)")],
    ["ZOOM SELECTION",                 true,  1, "—",    L("独自サイトアダプタ（FINDERS）","own-site adapter (FINDERS)")],
  ]);
  const [confirmed, setConfirmed] = React.useState(false);

  const gates = [
    [true, L("状態が「募集中」になっています","Status is set to 募集中")],
    [true, L("画像品質スコア 40点（基準 36点をクリア）","Image quality score 40 pts (clears the 36-pt standard)")],
    [true, L("必須項目がすべて入力されています","All required fields are filled in")],
    [true, L("1つ以上の媒体が「掲載」に設定されています","At least one medium is set to 掲載")],
  ];
  const gatesPass = gates.every(([ok]) => ok);
  const changes = rows.filter(r => r[2] !== 3).length;
  const canPublish = gatesPass && confirmed && changes > 0;
  const setAction = (i, v) => setRows(rs => rs.map((r, j) => j === i ? [r[0], r[1], v, r[3], r[4]] : r));

  return (
    <AppShell active="publishing"
      crumbs={[L("物件管理","Properties"), "ZOOM本郷", L("701号室","Room 701"), L("出稿","Publish")]}
      title={L("出稿","Publish")}
      subtitle={L("物件編集画面の「出稿」から開きます","Opened from the 出稿 button on the property editor")}
      actions={<a href="04-property-edit-overview.html"><Btn kind="ghost" icon={Icon.ArrowLeft}>{L("物件編集に戻る","Back to editor")}</Btn></a>}>

      <div className="relative -m-6 p-6 min-h-[860px] flex items-start justify-center" style={{ background: "rgba(15,23,42,0.55)" }}>
        <Card className="w-full max-w-[720px] overflow-hidden" style={{ boxShadow: "0 18px 50px rgba(15,23,42,0.30)" }}>

          {/* header */}
          <div className="px-5 py-4 flex items-start gap-3" style={{ background: "#FEF3C7", borderBottom: "1px solid #FDE68A" }}>
            <div className="w-11 h-11 rounded-lg shrink-0 flex items-center justify-center bg-[#F59E0B]"><Icon.Alert s={20} stroke="#fff"/></div>
            <div className="flex-1">
              <div className="text-[18px] font-semibold text-[#92400E] leading-tight">{L("出稿の確認","Confirm publishing")}</div>
              <div className="text-[12.5px] text-[#92400E]/85 mt-1">{L("この操作で物件情報が各広告サイトに配信されます。","This distributes the property data to the ad sites.")}</div>
            </div>
            <a href="04-property-edit-overview.html"><Btn kind="ghost" size="sm" icon={Icon.X}/></a>
          </div>

          <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
            {isTest && (
              <div className="px-5 py-2.5 bg-[#FEF3C7] border-b border-[#FDE68A] text-[12px] text-[#92400E] flex items-start gap-2">
                <Icon.Alert s={13} stroke="#92400E"/>
                {L("これはテスト物件です。媒体を『掲載しない』のままにしてください。","This is a test property. Leave every medium set to 掲載しない.")}
              </div>
            )}

            {/* Section 1 — 対象物件 */}
            <div className="px-5 py-4 border-b border-[#F1F5F9]">
              <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("対象物件","Target property")}</div>
              <div className="flex items-center gap-3 p-3 rounded-md border border-[#E5E7EB] bg-[#F8FAFC]">
                <PhotoPh w={64} h={48} kind="exterior" tone={1}/>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-[#0F172A]">ZOOM本郷 701</div>
                  <div className="text-[11.5px] text-[#64748B] tabnum">{L("最終更新 2026/05/26 14:32（大久保 ゆか）","Last updated 2026/05/26 14:32 (Okubo Yuka)")}</div>
                </div>
                <Tag tone="ok" size="md"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"/> {L("募集中","Listed")}</Tag>
              </div>
            </div>

            {/* Section 2 — safety gates */}
            <div className="px-5 py-4 border-b border-[#F1F5F9]">
              <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("配信前チェック","Pre-flight checks")}</div>
              <div className="space-y-1.5">
                {gates.map(([ok, label], i) => (
                  <div key={i} className="flex items-center gap-2 text-[12.5px]">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${ok ? "bg-[#DCFCE7]" : "bg-[#FEE2E2]"}`}>
                      {ok ? <Icon.Check s={11} stroke="#15803D"/> : <Icon.X s={11} stroke="#DC2626"/>}
                    </span>
                    <span className={ok ? "text-[#0F172A]" : "text-[#991B1B] font-medium"}>{label}</span>
                    {!ok && <a href="04-property-edit-overview.html" className="text-[11.5px] text-[#DC2626] underline">{L("修正する","Fix it")}</a>}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 — destinations + mini preview */}
            <div className="px-5 py-4 border-b border-[#F1F5F9]">
              <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("出稿先媒体","Destinations")}</div>
              <div className="grid gap-3" style={{ gridTemplateColumns: "minmax(0,1fr) 150px" }}>
                <div className="border border-[#E5E7EB] rounded-md overflow-hidden">
                  <table className="w-full text-[11.5px]">
                    <thead className="bg-[#F7F8FA] text-[#64748B] text-[10px] uppercase tracking-wider">
                      <tr>
                        <th className="px-2.5 py-1.5 text-left font-semibold">{L("媒体","Medium")}</th>
                        <th className="px-1.5 py-1.5 text-left font-semibold">{L("現在の状態","Current")}</th>
                        <th className="px-1.5 py-1.5 text-left font-semibold w-[110px]">{L("配信アクション","Action")}</th>
                        <th className="px-1.5 py-1.5 text-left font-semibold w-[54px]">{L("掲載期限","Expiry")}</th>
                        <th className="px-2 py-1.5 text-left font-semibold">{L("備考","Note")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map(([media, live, action, expiry, note], i) => (
                        <tr key={i} className="border-t border-[#F1F5F9]">
                          <td className="px-2.5 py-1.5 font-semibold text-[#0F172A] whitespace-nowrap">{media}</td>
                          <td className="px-1.5 py-1.5">
                            <span className="inline-flex items-center gap-1 whitespace-nowrap">
                              <span className="w-1.5 h-1.5 rounded-full" style={{ background: live ? "#16A34A" : "#94A3B8" }}/>
                              <span className={live ? "text-[#15803D]" : "text-[#94A3B8]"}>{live ? L("掲載中","Live") : L("未掲載","Off")}</span>
                            </span>
                          </td>
                          <td className="px-1.5 py-1.5">
                            <div className={`flex items-center bg-white border rounded h-7 px-1.5 ${action === 3 ? "border-[#E5E7EB]" : "border-[#CBD5E1]"}`}>
                              <select value={action} onChange={e => setAction(i, Number(e.target.value))}
                                className={`bg-transparent outline-none text-[11px] flex-1 min-w-0 cursor-pointer ${action === 3 ? "text-[#94A3B8]" : "text-[#0F172A]"}`}>
                                {A.map((o, k) => <option key={k} value={k}>{o}</option>)}
                              </select>
                            </div>
                          </td>
                          <td className="px-1.5 py-1.5 text-[#475569] tabnum">{expiry}</td>
                          <td className="px-2 py-1.5 text-[10.5px] text-[#64748B] leading-snug">{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* mini preview */}
                <div className="self-start">
                  <div className="rounded-md border border-[#E5E7EB] overflow-hidden">
                    <div className="px-2 py-1.5 bg-[#F8FAFC] border-b border-[#E5E7EB] text-[10px] font-semibold text-[#475569]">SUUMO</div>
                    <PhotoPh h={80} kind="exterior" tone={2}/>
                    <div className="p-2 space-y-1">
                      <div className="h-2 rounded bg-[#E5E7EB] w-4/5"/>
                      <div className="h-2 rounded bg-[#F1F5F9] w-3/5"/>
                      <div className="text-[10.5px] font-bold text-[#0F172A] tabnum">¥262,000</div>
                    </div>
                  </div>
                  <a href="#" className="block text-[11px] font-semibold text-[#0F172A] hover:underline mt-1.5">{L("プレビュー →","Preview →")}</a>
                  <div className="text-[10px] text-[#94A3B8] mt-1 leading-snug">{L("掲載イメージ（媒体ごとに表示は異なります）","Indicative — each medium renders differently")}</div>
                </div>
              </div>

              <div className="text-[10.5px] text-[#94A3B8] mt-2 leading-snug">
                {L("タグによる振り分け: 物件・部屋のタグで掲載先を振り分け（例: 「ZOOM RENT」タグの付いた物件のみ ZOOM RENT へ掲載）。タグの編集は物件一覧・概要・部屋タブで行います。",
                   "Tag-based routing: property and room tags decide the destinations (e.g. only properties tagged ZOOM RENT go to ZOOM RENT). Tags are edited on the property list, 概要 and 部屋 tabs.")}
              </div>
            </div>

            {/* Section 4 — final confirmation */}
            <div className="px-5 py-4">
              <label onClick={() => setConfirmed(v => !v)} className="flex items-center gap-2.5 text-[13px] cursor-pointer">
                <span className={`w-[18px] h-[18px] rounded flex items-center justify-center shrink-0 ${confirmed ? "bg-[#0F172A]" : "border border-[#CBD5E1] bg-white"}`}>
                  {confirmed && <Icon.Check s={12} stroke="#fff"/>}
                </span>
                <span className="font-medium text-[#0F172A]">{L("内容を確認しました — 配信します","I have reviewed the above — distribute")}</span>
              </label>
              <div className="mt-2 text-[12.5px] text-[#475569] tabnum">
                <b className="text-[#0F172A]">{L(`${changes} 媒体に変更が反映されます`, `${changes} media will be updated`)}</b>
                <span className="text-[11.5px] text-[#94A3B8] ml-2">{L("「掲載しない」の媒体は変更されません","Media set to 掲載しない are left untouched")}</span>
              </div>
            </div>
          </div>

          {/* footer */}
          <div className="px-5 py-3.5 border-t border-[#E5E7EB] bg-white flex items-center gap-3">
            <span className="text-[11px] text-[#94A3B8] leading-snug max-w-[300px]">
              {L("テスト物件（ZOOM吉祥寺テストマンション）の場合は、媒体を『掲載しない』のままにしてください",
                 "For test properties (ZOOM Kichijoji test building) leave every medium set to 掲載しない")}
            </span>
            <div className="ml-auto flex items-center gap-2">
              <a href="04-property-edit-overview.html"><Btn kind="link">{L("キャンセル","Cancel")}</Btn></a>
              <button disabled={!canPublish}
                className={`inline-flex items-center gap-1.5 rounded-md font-semibold h-9 px-5 text-[13px] ${canPublish
                  ? "bg-[#F59E0B] text-[#0F172A] hover:bg-[#D97706] hover:text-white"
                  : "bg-[#FDE68A] text-[#92400E]/50 cursor-not-allowed"}`}>
                <Icon.Upload s={14}/>{L("出稿する","Publish")}
              </button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
};

// the 出稿停止 modal keeps its own screen (11-publish-unpublish-modal.html)
window.ScreenM11Controls = window.ScreenM11Publish;
