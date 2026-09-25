// _shared/screens/management-3-m12.jsx — M12 内見予約 一覧＋カレンダー (rebuilt 2026-08-20)
// Delivers: B-5② 同時予約枠数 — per-building (棟ごと) capacity for 新築 (2〜3件/同一時間帯,
// admin-adjustable; default 1 = 重複予約不可), stacked slots with a count badge, and the
// 予約済み blocked state for non-新築 slots.

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, AppShell } = window;
const L = window.L;

const M12_SLOTS = Array.from({ length: 20 }, (_, i) => `${10 + Math.floor(i / 2)}:${i % 2 ? "30" : "00"}`);
const M12_ROW_H = 28;
const M12_DAYS = () => [
  ["5/25", L("月","Mon"), false], ["5/26", L("火","Tue"), true], ["5/27", L("水","Wed"), false],
  ["5/28", L("木","Thu"), false], ["5/29", L("金","Fri"), false], ["5/30", L("土","Sat"), false], ["5/31", L("日","Sun"), false],
];

// [day, slot, span, property, room, broker, agent, customer, method, status, group]
const M12_BOOKINGS = () => [
  [0, 2,  2, "ZOOM本郷",            "701", L("FINDERS 吉祥寺店","FINDERS Kichijoji"), L("上松","Uematsu"), L("山田 太郎","Mr. Yamada"), L("担当立会い","Staff attends"), "fixed",     null],
  [1, 4,  2, "青葉マンション",        "305", L("エイブル 品川店","Able Shinagawa"),     L("斎藤","Saito"),   L("佐々木 花子","Ms. Sasaki"), L("現地集合","Meet on site"),   "tentative", null],
  [1, 10, 2, "ZOOM本郷",            "305", L("ミニミニ 本郷店","MiniMini Hongo"),     L("大西","Onishi"),  L("鈴木 一郎","Mr. Suzuki"),  L("鍵渡し","Key handover"),     "fixed",     null],
  [2, 6,  2, L("中野グリーンハイツ","Nakano Green Heights"), "201", L("アパマン 中野店","Apaman Nakano"), L("森","Mori"), L("高橋 実","Mr. Takahashi"), L("現地集合","Meet on site"), "cancelled", null],
  [3, 8,  2, L("吉祥寺パークレジデンス","Kichijoji Park Residence"), "501", L("FINDERS 吉祥寺店","FINDERS Kichijoji"), L("上松","Uematsu"), L("中村 桃子","Ms. Nakamura"), L("担当立会い","Staff attends"), "fixed", "shinchiku"],
  [5, 4,  2, L("パークサイド代沢","Parkside Daizawa"), "401", L("ハウスコム 三軒茶屋店","Housecom Sangenjaya"), L("藤原","Fujiwara"), L("井上 剛","Mr. Inoue"), L("現地集合","Meet on site"), "tentative", null],
  [5, 12, 2, L("メゾン白金","Maison Shirokane"), "102", L("三井のリハウス 白金台","Mitsui Rehouse"), L("岡田","Okada"), L("渡辺 由美","Ms. Watanabe"), L("担当立会い","Staff attends"), "fixed", null],
];

// 新築 slot with a configured capacity of 3 → two bookings stacked in one slot
const M12_SHINCHIKU = { day: 3, slot: 8, count: 2, capacity: 3 };

const M12_STATUS = {
  fixed:     ["#DCFCE7", "#BBF7D0", "#15803D", L("確定","Confirmed")],
  tentative: ["#FEF3C7", "#FDE68A", "#92400E", L("仮予約","Tentative")],
  cancelled: ["#F1F5F9", "#E5E7EB", "#94A3B8", L("キャンセル","Cancelled")],
};

window.ScreenM12Viewings = function () {
  const [view, setView] = React.useState("calendar");
  const [range, setRange] = React.useState("week");
  const [cap, setCap] = React.useState(false);
  const [sel, setSel] = React.useState(null);
  const [caps, setCaps] = React.useState({ kichijoji: 3, aoba: 2 });
  const days = M12_DAYS();
  const bookings = M12_BOOKINGS();

  return (
    <AppShell active="viewings"
      crumbs={[L("内見予約","Viewings"), L("予約管理","Booking management")]}
      title={L("内見予約","Viewing bookings")}
      subtitle={L("2026年5月 · 確定18件 · 仮予約5件 · 本日12件","May 2026 · 18 confirmed · 5 tentative · 12 today")}
      actions={<>
        <div className="flex items-center bg-white border border-[#E5E7EB] rounded-md p-[2px]">
          {[["list", Icon.List, L("一覧","List")], ["calendar", Icon.Calendar, L("カレンダー","Calendar")]].map(([k, Ico, label]) => (
            <button key={k} onClick={() => setView(k)}
              className={`inline-flex items-center gap-1.5 h-7 px-3 rounded text-[12.5px] ${view === k ? "bg-[#0F172A] text-white" : "text-[#475569] hover:bg-[#F7F8FA]"}`}>
              <Ico s={13} stroke={view === k ? "#fff" : "#475569"}/>{label}
            </button>
          ))}
        </div>
        <Btn kind="ghost" icon={Icon.Download}>{L("CSV出力","Export CSV")}</Btn>
      </>}>

      {view === "calendar" ? (
        <div className="flex gap-4 items-start">
          <div className="flex-1 min-w-0">
            <Card>
              {/* calendar toolbar */}
              <div className="px-3 py-2.5 border-b border-[#F1F5F9] flex items-center gap-2 flex-wrap">
                <div className="flex items-center bg-white border border-[#E5E7EB] rounded-md p-[2px]">
                  {[["month", L("月","Month")], ["week", L("週","Week")], ["day", L("日","Day")]].map(([k, label]) => (
                    <button key={k} onClick={() => setRange(k)}
                      className={`h-7 px-2.5 rounded text-[12px] ${range === k ? "bg-[#0F172A] text-white" : "text-[#475569] hover:bg-[#F7F8FA]"}`}>{label}</button>
                  ))}
                </div>
                <Btn kind="ghost" size="sm">{L("今日","Today")}</Btn>
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 rounded-md border border-[#E5E7EB] flex items-center justify-center text-[#475569] hover:bg-[#F7F8FA]"><Icon.ChevronLeft s={13}/></button>
                  <button className="w-7 h-7 rounded-md border border-[#E5E7EB] flex items-center justify-center text-[#475569] hover:bg-[#F7F8FA]"><Icon.ChevronRight s={13}/></button>
                </div>
                <span className="text-[14px] font-semibold text-[#0F172A] ml-1 tabnum">{L("2026年5月","May 2026")}</span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-[140px]"><Select value={L("すべての物件","All properties")}/></div>
                  <div className="w-[120px]"><Select value={L("担当者：全員","Assignee: all")}/></div>
                  <Btn kind={cap ? "subtle" : "ghost"} size="sm" icon={Icon.Settings} onClick={() => setCap(o => !o)}>{L("同時予約枠数","Slot capacity")}</Btn>
                </div>
              </div>

              {/* B-5② capacity settings — per building */}
              {cap && (
                <div className="px-3 py-3 bg-[#F8FAFC] border-b border-[#E5E7EB]">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-[12px] font-semibold text-[#0F172A]">{L("同時予約枠数（棟ごと）","Simultaneous bookings per slot (by building)")}</span>
                    <span className="text-[11px] text-[#94A3B8]">{L("既定は1件＝重複予約不可。新築は同一時間帯に2〜3件まで設定できます。","Default 1 = no double-booking. New builds can accept 2–3 per slot.")}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      ["kichijoji", L("吉祥寺パークレジデンス","Kichijoji Park Residence"), true],
                      ["aoba",      L("青葉マンション（新築棟）","Aoba (new wing)"),        true],
                      ["hongo",     L("ZOOM本郷","ZOOM Hongo"),                            false],
                    ].map(([k, name, isNew]) => (
                      <div key={k} className="rounded-md border border-[#E5E7EB] bg-white p-2.5">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-[12px] font-semibold text-[#0F172A] truncate">{name}</span>
                          {isNew && <Tag tone="accent" size="sm">{L("新築","New build")}</Tag>}
                        </div>
                        {isNew ? (
                          <div className="flex items-center gap-1">
                            {[1, 2, 3].map(n => (
                              <button key={n} onClick={() => setCaps(c => ({ ...c, [k]: n }))}
                                className={`h-7 px-2.5 rounded border text-[11.5px] tabnum ${caps[k] === n ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white border-[#E5E7EB] text-[#475569]"}`}>{L(`${n}件`, `${n}`)}</button>
                            ))}
                          </div>
                        ) : (
                          <div className="text-[11.5px] text-[#94A3B8]">{L("1件（重複予約不可）","1 (no double-booking)")}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* legend */}
              <div className="px-3 py-2 border-b border-[#F1F5F9] flex items-center gap-3 text-[10.5px] text-[#64748B] flex-wrap">
                {Object.keys(M12_STATUS).map(k => {
                  const [bg, bd, fg, label] = M12_STATUS[k];
                  return <span key={k} className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded" style={{ background: bg, border: `1px solid ${bd}` }}/>{label}</span>;
                })}
                <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[repeating-linear-gradient(45deg,#E5E7EB_0_3px,#F8FAFC_3px_6px)] border border-[#E5E7EB]"/>{L("予約済み（重複不可）","Taken — no double-booking")}</span>
                <span className="inline-flex items-center gap-1"><span className="px-1 rounded bg-[#0F172A] text-white text-[9px] font-bold tabnum">2/3</span>{L("新築：同一時間帯の枠数","New build — slot capacity")}</span>
              </div>

              {/* week grid */}
              <div className="p-3 overflow-x-auto">
                <div className="flex min-w-[720px]">
                  {/* time gutter */}
                  <div className="w-[52px] shrink-0">
                    <div className="h-7"/>
                    {M12_SLOTS.map((t, i) => (
                      <div key={i} className="text-[10px] text-[#94A3B8] tabnum text-right pr-2" style={{ height: M12_ROW_H, lineHeight: "12px" }}>
                        {i % 2 === 0 ? t : ""}
                      </div>
                    ))}
                  </div>
                  {/* day columns */}
                  {days.map(([date, dow, today], d) => (
                    <div key={d} className="flex-1 min-w-0 border-l border-[#F1F5F9]" style={today ? { background: "rgba(15,23,42,0.02)" } : undefined}>
                      <div className={`h-7 flex items-center justify-center gap-1 text-[11px] border-b ${today ? "border-[#0F172A] border-b-2 font-semibold text-[#0F172A]" : "border-[#F1F5F9] text-[#64748B]"}`}>
                        <span className="tabnum">{date}</span><span>({dow})</span>
                      </div>
                      <div className="relative" style={{ height: M12_SLOTS.length * M12_ROW_H }}>
                        {M12_SLOTS.map((_, i) => (
                          <div key={i} className="border-b border-[#F8FAFC]" style={{ height: M12_ROW_H }}/>
                        ))}
                        {/* blocked (taken) slot — double-booking prevented */}
                        {d === 0 && (
                          <div className="absolute left-[2px] right-[2px] rounded border border-[#E5E7EB] flex items-center justify-center text-[9.5px] text-[#94A3B8]"
                            title={L("この時間帯は予約済みです（重複予約不可）","This slot is already taken — double-booking is not allowed")}
                            style={{ top: 4 * M12_ROW_H + 1, height: M12_ROW_H * 2 - 3, background: "repeating-linear-gradient(45deg,#EEF1F5 0 4px,#F8FAFC 4px 8px)" }}>
                            {L("予約済み","Taken")}
                          </div>
                        )}
                        {bookings.filter(b => b[0] === d).map((b, k) => {
                          const [, slot, span, prop, room, broker, , , , status, group] = b;
                          const [bg, bd, fg] = M12_STATUS[status];
                          const stacked = group === "shinchiku";
                          return (
                            <div key={k} onClick={() => setSel(b)}
                              title={`${prop} ${room} / ${broker} / ${M12_SLOTS[slot]}`}
                              className="absolute left-[2px] right-[2px] rounded px-1.5 py-1 cursor-pointer overflow-hidden hover:brightness-95"
                              style={{ top: slot * M12_ROW_H + 1, height: M12_ROW_H * span - 3, background: bg, border: `1px solid ${bd}`,
                                       boxShadow: stacked ? `2px 2px 0 0 ${bd}` : undefined }}>
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] font-semibold tabnum" style={{ color: fg }}>{M12_SLOTS[slot]}</span>
                                {stacked && <span className="px-1 rounded bg-[#0F172A] text-white text-[8.5px] font-bold tabnum">{M12_SHINCHIKU.count}/{caps.kichijoji}</span>}
                              </div>
                              <div className={`text-[10px] font-semibold truncate ${status === "cancelled" ? "line-through" : ""}`} style={{ color: fg }}>{prop} {room}</div>
                              <div className="text-[9.5px] truncate" style={{ color: fg, opacity: 0.8 }}>{broker}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* detail drawer */}
          {sel && (
            <div className="w-[320px] shrink-0 self-start sticky top-4">
              <Card>
                <div className="px-4 py-3 border-b border-[#F1F5F9] flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-[#0F172A]">{sel[3]} {sel[4]}</div>
                    <div className="text-[11.5px] text-[#64748B] tabnum">{L(`5/${25 + sel[0]}（${M12_DAYS()[sel[0]][1]}）${M12_SLOTS[sel[1]]}〜${M12_SLOTS[sel[1] + sel[2]] || "20:00"}`,
                      `5/${25 + sel[0]} ${M12_SLOTS[sel[1]]}–${M12_SLOTS[sel[1] + sel[2]] || "20:00"}`)}</div>
                  </div>
                  <button onClick={() => setSel(null)} className="text-[#94A3B8] hover:text-[#0F172A]"><Icon.X s={14}/></button>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-1">{L("仲介会社","Broker")}</div>
                    <div className="text-[12.5px] text-[#0F172A]">{sel[5]}</div>
                    <div className="text-[11.5px] text-[#64748B]">{L(`担当：${sel[6]}`, `Agent: ${sel[6]}`)} · <span className="tabnum">03-6812-4410</span></div>
                  </div>
                  <div className="pt-3 border-t border-[#F1F5F9]">
                    <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-1">{L("お客様情報","Customer")}</div>
                    <div className="text-[12.5px] text-[#0F172A]">{sel[7]}</div>
                    <div className="text-[11.5px] text-[#64748B] tabnum">090-3344-1207</div>
                  </div>
                  <div className="pt-3 border-t border-[#F1F5F9]">
                    <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-1.5">{L("内見方法","Viewing method")}</div>
                    <div className="flex flex-wrap gap-1">
                      {[L("現地集合","Meet on site"), L("担当立会い","Staff attends"), L("鍵渡し","Key handover")].map(o => (
                        <span key={o} className={`px-2 py-[4px] rounded-full border text-[11px] ${o === sel[8] ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white border-[#E5E7EB] text-[#475569]"}`}>{o}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-md border border-[#FDE68A] bg-[#FEF3C7] p-2.5">
                    <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#92400E] mb-1 flex items-center gap-1"><Icon.Key s={11} stroke="#92400E"/>{L("鍵の場所","Key location")}</div>
                    <div className="text-[11.5px] text-[#92400E] leading-snug">{L("現地1Fエントランス右手のキーボックス（暗証番号はチャットにて連絡）","Keybox to the right of the 1F entrance — code sent via chat")}</div>
                  </div>
                  <Field label={L("連絡事項","Notes")}>
                    <textarea readOnly rows={3} className="w-full bg-white border border-[#CBD5E1] rounded-md p-2.5 text-[12px] text-[#0F172A] leading-relaxed outline-none resize-none"
                      value={L("お客様は当日15分前に現地到着予定。ペット可否について質問あり。","Customer plans to arrive 15 min early. Has questions about the pet policy.")}/>
                  </Field>
                </div>
                <div className="px-4 py-3 border-t border-[#F1F5F9] bg-[#F8FAFC] flex items-center gap-2">
                  <Btn kind="primary" size="sm" icon={Icon.Check}>{L("確定する","Confirm")}</Btn>
                  <Btn kind="ghost" size="sm" icon={Icon.X}>{L("キャンセル","Cancel")}</Btn>
                  <a href="15-chat.html" className="ml-auto"><Btn kind="ghost" size="sm" icon={Icon.Chat}>{L("チャット","Chat")}</Btn></a>
                </div>
              </Card>
            </div>
          )}
        </div>
      ) : (
        /* ══ list view ══ */
        <div className="space-y-4">
          <Card>
            <div className="p-3 grid grid-cols-4 gap-3">
              <Field label={L("日付範囲","Date range")}><Input value="2026/05/25 〜 2026/05/31" prefix={<Icon.Calendar s={12}/>}/></Field>
              <Field label={L("物件","Property")}><Select value={L("すべて","All")}/></Field>
              <Field label={L("ステータス","Status")}><Select value={L("すべて","All")}/></Field>
              <Field label={L("仲介会社","Broker")}><Select value={L("すべて","All")}/></Field>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-[12px]">
              <thead className="bg-[#F7F8FA] text-[#475569] text-[10.5px] uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">{L("日時","Date & time")}</th>
                  <th className="px-2 py-2 text-left font-semibold">{L("物件名","Property")}</th>
                  <th className="px-2 py-2 text-left font-semibold">{L("部屋番号","Room")}</th>
                  <th className="px-2 py-2 text-left font-semibold">{L("仲介会社","Broker")}</th>
                  <th className="px-2 py-2 text-left font-semibold">{L("担当者","Agent")}</th>
                  <th className="px-2 py-2 text-left font-semibold">{L("お客様","Customer")}</th>
                  <th className="px-2 py-2 text-left font-semibold">{L("内見方法","Method")}</th>
                  <th className="px-2 py-2 text-left font-semibold">{L("ステータス","Status")}</th>
                  <th className="px-2 py-2 text-left font-semibold">{L("操作","Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => {
                  const [day, slot, span, prop, room, broker, agent, customer, method, status] = b;
                  const [, , , label] = M12_STATUS[status];
                  return (
                    <tr key={i} className="border-t border-[#F1F5F9] hover:bg-[#F8FAFC]">
                      <td className="px-3 py-1.5 tabnum whitespace-nowrap">{L(`5/${25 + day} ${M12_SLOTS[slot]}`, `5/${25 + day} ${M12_SLOTS[slot]}`)}</td>
                      <td className="px-2 py-1.5 font-semibold text-[#0F172A]">{prop}</td>
                      <td className="px-2 py-1.5 text-[#475569]">{room}</td>
                      <td className="px-2 py-1.5 text-[#475569]">{broker}</td>
                      <td className="px-2 py-1.5 text-[#475569]">{agent}</td>
                      <td className="px-2 py-1.5 text-[#475569]">{customer}</td>
                      <td className="px-2 py-1.5 text-[#475569]">{method}</td>
                      <td className="px-2 py-1.5">
                        <Tag tone={status === "fixed" ? "ok" : status === "tentative" ? "warn" : "neutral"}>{label}</Tag>
                      </td>
                      <td className="px-2 py-1.5">
                        <div className="flex items-center gap-1">
                          <button onClick={() => { setSel(b); setView("calendar"); }} className="h-6 px-2 rounded border border-[#E5E7EB] text-[10.5px] text-[#475569] hover:bg-[#F1F5F9]">{L("詳細","Detail")}</button>
                          {status === "tentative" && <button className="h-6 px-2 rounded bg-[#0F172A] text-white text-[10.5px]">{L("確定","Confirm")}</button>}
                          <a href="15-chat.html" className="w-6 h-6 rounded border border-[#E5E7EB] flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9]"><Icon.Chat s={11}/></a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
            <div className="px-3 py-2.5 border-t border-[#F1F5F9] text-[11.5px] text-[#64748B] tabnum">{L("7件中 1–7件表示","1–7 of 7")}</div>
          </Card>
        </div>
      )}
    </AppShell>
  );
};
