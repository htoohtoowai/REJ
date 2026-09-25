// _shared/screens/broker-2-b7.jsx — B7 内見予約フォーム (rebuilt 2026-08-20)
// Delivers: B-5① same-slot double-booking prevention (taken slots disabled with 予約済み) and
// 残り◯枠 badges for 新築 buildings, where one slot accepts up to the per-building capacity.

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, PhotoPh, BrokerShell } = window;
const L = window.L;

const B7_SLOTS = Array.from({ length: 20 }, (_, i) => `${10 + Math.floor(i / 2)}:${i % 2 ? "30" : "00"}`);
const B7_DAYS = () => Array.from({ length: 14 }, (_, i) => {
  const d = 27 + i;
  const month = d > 31 ? 6 : 5;
  const day = d > 31 ? d - 31 : d;
  const dow = [L("水","Wed"), L("木","Thu"), L("金","Fri"), L("土","Sat"), L("日","Sun"), L("月","Mon"), L("火","Tue")][i % 7];
  return [`${month}/${day}`, dow, i % 7 === 4];   // closed on Sundays
});

// slot state per day index: taken slots (double-booking blocked) and 新築 capacity slots
const B7_TAKEN = { 0: [2, 3, 10], 1: [6, 7], 3: [12, 13], 5: [4, 5] };
const B7_NEWBUILD = { 2: { slots: [8, 9], capacity: 3, booked: 1 }, 4: { slots: [14, 15], capacity: 2, booked: 1 } };

window.ScreenB7Booking = function () {
  const days = B7_DAYS();
  const [day, setDay] = React.useState(0);
  const [picks, setPicks] = React.useState([[0, 4]]);   // [dayIndex, slotIndex] in preference order
  const [method, setMethod] = React.useState(0);
  const [companions, setCompanions] = React.useState(L("夫婦","Couple"));
  const [checks, setChecks] = React.useState([false, false]);
  const [sent, setSent] = React.useState(false);

  const taken = (d, s) => (B7_TAKEN[d] || []).indexOf(s) >= 0;
  const newbuild = (d, s) => { const nb = B7_NEWBUILD[d]; return nb && nb.slots.indexOf(s) >= 0 ? nb : null; };
  const isPicked = (d, s) => picks.findIndex(p => p[0] === d && p[1] === s);
  const togglePick = (d, s) => {
    if (taken(d, s) || days[d][2]) return;
    const at = isPicked(d, s);
    if (at >= 0) setPicks(p => p.filter((_, i) => i !== at));
    else if (picks.length < 3) setPicks(p => p.concat([[d, s]]));
  };
  const ready = picks.length > 0 && checks[0] && checks[1];
  const PREF = [L("第1希望","1st choice"), L("第2希望","2nd choice"), L("第3希望","3rd choice")];

  if (sent) {
    return (
      <BrokerShell active="viewings" crumbs={[L("物件検索","Search"), "ZOOM本郷 701", L("内見予約","Book a viewing")]}
        title={L("内見予約を送信しました","Viewing request sent")}>
        <div className="flex justify-center pt-6">
          <Card className="w-full max-w-[520px] overflow-hidden">
            <div className="px-5 py-5 flex items-start gap-3" style={{ background: "#DCFCE7", borderBottom: "1px solid #BBF7D0" }}>
              <div className="w-11 h-11 rounded-lg bg-[#16A34A] flex items-center justify-center shrink-0"><Icon.Check s={20} stroke="#fff"/></div>
              <div>
                <div className="text-[15px] font-semibold text-[#15803D]">{L("内見予約を送信しました","Your viewing request has been sent")}</div>
                <div className="text-[12.5px] text-[#15803D]/85 mt-1">{L("管理会社の確定連絡をお待ちください（通常1営業日以内）","The management company will confirm — usually within one business day")}</div>
              </div>
            </div>
            <div className="p-5 space-y-2.5 text-[12.5px]">
              <div className="flex justify-between"><span className="text-[#94A3B8]">{L("予約番号","Reservation no.")}</span><span className="tabnum font-semibold text-[#0F172A]">V-2026-0526-018</span></div>
              <div className="flex justify-between"><span className="text-[#94A3B8]">{L("物件","Property")}</span><span className="text-[#0F172A]">ZOOM本郷 701</span></div>
              <div className="flex justify-between"><span className="text-[#94A3B8]">{L("第1希望","1st choice")}</span><span className="tabnum text-[#0F172A]">{days[picks[0][0]][0]} {B7_SLOTS[picks[0][1]]}</span></div>
              <div className="flex justify-between"><span className="text-[#94A3B8]">{L("内見方法","Method")}</span><span className="text-[#0F172A]">{[L("担当立会い","Staff attends"), L("鍵渡し","Key handover"), L("現地集合","Meet on site")][method]}</span></div>
            </div>
            <div className="px-5 py-3.5 border-t border-[#F1F5F9] bg-[#F8FAFC] flex items-center gap-2">
              <button onClick={() => setSent(false)} className="text-[12px] text-[#475569] hover:text-[#0F172A]">{L("入力内容に戻る","Back to form")}</button>
              <a href="08-my-viewings.html" className="ml-auto"><Btn kind="primary" size="sm" iconRight={<Icon.ArrowRight s={12}/>}>{L("予約一覧へ","My viewings")}</Btn></a>
            </div>
          </Card>
        </div>
      </BrokerShell>
    );
  }

  return (
    <BrokerShell active="viewings"
      crumbs={[L("物件検索","Search"), "ZOOM本郷 701", L("内見予約","Book a viewing")]}
      title={L("内見予約 — ZOOM本郷 701","Book a viewing — ZOOM Hongo 701")}
      subtitle={L("希望日時は3件まで選択できます","You can pick up to three preferred slots")}>

      <div className="flex justify-center pb-24">
        <div className="w-full max-w-[800px] space-y-4">

          {/* 1 — 希望日時 */}
          <Card>
            <CardHead title={L("① 希望日時","① Preferred date & time")} sub={L("第1〜第3希望まで選択","Pick up to three")}
              action={<span className="text-[11px] text-[#94A3B8] tabnum">{L(`${picks.length} / 3 選択`, `${picks.length} / 3 selected`)}</span>}/>
            <div className="p-4">
              {/* 14-day strip */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5">
                {days.map(([date, dow, closed], i) => (
                  <button key={i} onClick={() => !closed && setDay(i)} disabled={closed}
                    className={`shrink-0 w-[52px] py-1.5 rounded-md border text-center ${closed
                      ? "bg-[#F8FAFC] border-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed"
                      : i === day ? "bg-[#0F172A] border-[#0F172A] text-white"
                      : "bg-white border-[#E5E7EB] text-[#475569] hover:border-[#CBD5E1]"}`}>
                    <div className="text-[10px] opacity-80">{dow}</div>
                    <div className="text-[12.5px] font-semibold tabnum">{date}</div>
                    {closed && <div className="text-[8.5px]">{L("休","Closed")}</div>}
                  </button>
                ))}
              </div>

              {/* slots */}
              <div className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(88px,1fr))" }}>
                {B7_SLOTS.map((t, s) => {
                  const isTaken = taken(day, s);
                  const nb = newbuild(day, s);
                  const picked = isPicked(day, s);
                  const left = nb ? nb.capacity - nb.booked : null;
                  return (
                    <button key={s} onClick={() => togglePick(day, s)} disabled={isTaken}
                      className={`h-[42px] rounded-md border text-[11.5px] flex flex-col items-center justify-center ${
                        isTaken ? "bg-[#F8FAFC] border-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed"
                        : picked >= 0 ? "bg-[#0F172A] border-[#0F172A] text-white"
                        : "bg-white border-[#0F172A]/30 text-[#0F172A] hover:border-[#0F172A]"}`}>
                      <span className="tabnum font-medium">{t}</span>
                      {isTaken && <span className="text-[9px]">{L("予約済み","Taken")}</span>}
                      {!isTaken && nb && picked < 0 && <span className="text-[9px] text-[#B45309]">{L(`残り${left}枠`, `${left} left`)}</span>}
                      {picked >= 0 && <span className="text-[9px]">{PREF[picked]}</span>}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 mt-2.5 text-[10.5px] text-[#64748B] flex-wrap">
                <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded border border-[#0F172A]/30 bg-white"/>{L("予約可","Available")}</span>
                <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#0F172A]"/>{L("選択中","Selected")}</span>
                <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#F8FAFC] border border-[#F1F5F9]"/>{L("予約済み（同一時間帯の重複予約はできません）","Taken — the same slot cannot be booked twice")}</span>
                <span className="inline-flex items-center gap-1 text-[#B45309]"><Icon.Alert s={10} stroke="#B45309"/>{L("新築棟は同一時間帯に複数枠（残り枠を表示）","New builds accept several bookings per slot — remaining shown")}</span>
              </div>

              {picks.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#F1F5F9]">
                  {picks.map(([d, s], i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 pl-2 pr-1 py-[4px] rounded-full bg-[#0F172A] text-white text-[11.5px]">
                      <span className="opacity-70">{PREF[i]}</span><span className="tabnum">{days[d][0]} {B7_SLOTS[s]}</span>
                      <button onClick={() => setPicks(p => p.filter((_, k) => k !== i))} className="opacity-60 hover:opacity-100"><Icon.X s={10} stroke="#fff"/></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* 2 — 内見方法 */}
          <Card>
            <CardHead title={L("② 内見方法","② Viewing method")}/>
            <div className="p-4 space-y-2">
              {[
                [L("担当立会い","Staff attends"), L("管理会社が立ち会います","The management company attends"), L("最も一般的","Most common")],
                [L("鍵渡し","Key handover"), L("管理会社で鍵を受け取り、自社で内見します","Collect the key from us and show the room yourself"), null],
                [L("現地集合","Meet on site"), L("現地で待ち合わせます","Meet the agent at the property"), null],
              ].map(([label, sub, badge], i) => (
                <label key={i} onClick={() => setMethod(i)}
                  className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer ${i === method ? "border-[#0F172A] bg-[#F8FAFC]" : "border-[#E5E7EB] hover:border-[#CBD5E1]"}`}>
                  <span className={`w-[18px] h-[18px] rounded-full border mt-[1px] flex items-center justify-center shrink-0 ${i === method ? "border-[#0F172A]" : "border-[#CBD5E1]"}`}>
                    {i === method && <span className="w-2.5 h-2.5 rounded-full bg-[#0F172A]"/>}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-[#0F172A]">{label}</span>
                      {badge && <Tag tone="neutral" size="sm">{badge}</Tag>}
                    </span>
                    <span className="block text-[11.5px] text-[#64748B] mt-0.5">{sub}</span>
                  </span>
                </label>
              ))}
              <div className="rounded-md border border-[#FDE68A] bg-[#FEF3C7] p-2.5 flex items-start gap-2">
                <Icon.Key s={13} stroke="#92400E"/>
                <div className="text-[12px] text-[#92400E]">
                  <b>{L("鍵の場所","Key location")}: </b>{L("管理事務所（1F）","Management office (1F)")}
                  <div className="text-[10.5px] text-[#92400E]/85 mt-0.5">{L("鍵渡しの場合は営業時間内にお立ち寄りください。","For key handover, please visit during office hours.")}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* 3 — 顧客情報 */}
          <Card>
            <CardHead title={L("③ 顧客情報","③ Customer details")}/>
            <div className="p-4 grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))" }}>
              <Field label={L("お客様氏名","Customer name")} required><Input value={L("山田 太郎","Yamada Taro")}/></Field>
              <Field label={L("カナ","Reading")}><Input value="ヤマダ タロウ"/></Field>
              <Field label="TEL" required><Input value="090-1234-5678"/></Field>
              <Field label={L("メール","Email")}><Input value="yamada@example.com"/></Field>
              <Field label={L("同行者人数","Companions")}><Input value="1" suffix={L("名","people")}/></Field>
              <div>
                <div className="text-[11px] font-semibold text-[#475569] mb-1">{L("同行者の関係性","Relationship")}</div>
                <div className="flex flex-wrap gap-1">
                  {[L("夫婦","Couple"), L("家族","Family"), L("友人","Friend"), L("一人","Alone"), L("その他","Other")].map(o => (
                    <button key={o} onClick={() => setCompanions(o)}
                      className={`px-2.5 py-[5px] rounded-full border text-[11.5px] ${o === companions ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white border-[#E5E7EB] text-[#475569]"}`}>{o}</button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* 4 + 5 */}
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
            <Card>
              <CardHead title={L("④ 営業担当","④ Agent")} sub={L("ログイン情報から自動入力","Auto-filled from your login")}/>
              <div className="p-4 grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))" }}>
                <Field label={L("担当者名","Agent name")}><Input value={L("上松 誠","Uematsu Makoto")}/></Field>
                <Field label={L("携帯番号","Mobile")}><Input value="080-2244-6688"/></Field>
                <Field label={L("会社名","Company")} full><Input value={L("FINDERS 吉祥寺店","FINDERS Kichijoji")}/></Field>
              </div>
            </Card>
            <Card>
              <CardHead title={L("⑤ 連絡事項","⑤ Notes")}/>
              <div className="p-4">
                <textarea readOnly rows={5}
                  placeholder={L("例: 雨天の場合は中止希望 / 他物件と合わせて回ります","e.g. Cancel if it rains / visiting other properties the same day")}
                  className="w-full bg-white border border-[#CBD5E1] rounded-md p-2.5 text-[12.5px] text-[#0F172A] leading-relaxed outline-none focus:border-[#0F172A] resize-none"
                  value={L("他物件と合わせて回ります。14時台の枠が第1希望です。","Visiting other properties the same day. The 14:00 slot is our first choice.")}/>
              </div>
            </Card>
          </div>

          {/* 6 — 確認 */}
          <Card>
            <CardHead title={L("⑥ 確認","⑥ Review")}/>
            <div className="p-4">
              <div className="rounded-md border border-[#E5E7EB] divide-y divide-[#F1F5F9] text-[12px]">
                {[
                  [L("物件","Property"), "ZOOM本郷 701 · ¥262,000"],
                  [L("希望日時","Preferred slots"), picks.length ? picks.map(([d, s], i) => `${PREF[i]} ${days[d][0]} ${B7_SLOTS[s]}`).join(" / ") : L("未選択","Not selected")],
                  [L("内見方法","Method"), [L("担当立会い","Staff attends"), L("鍵渡し","Key handover"), L("現地集合","Meet on site")][method]],
                  [L("お客様","Customer"), L("山田 太郎 様 · 090-1234-5678","Mr. Yamada · 090-1234-5678")],
                  [L("同行","Companions"), L(`1名（${companions}）`, `1 (${companions})`)],
                  [L("担当","Agent"), L("FINDERS 吉祥寺店 上松 誠","FINDERS Kichijoji — Uematsu")],
                ].map(([k, v], i) => (
                  <div key={i} className="px-3 py-2 flex items-start gap-3">
                    <span className="text-[#94A3B8] w-[92px] shrink-0">{k}</span>
                    <span className="text-[#0F172A] flex-1 min-w-0">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-2">
                {[L("内見方法を確認しました","I have confirmed the viewing method"), L("管理会社の連絡事項に同意します","I agree to the management company's notes")].map((label, i) => (
                  <label key={i} onClick={() => setChecks(c => c.map((v, j) => j === i ? !v : v))} className="flex items-center gap-2.5 text-[12.5px] cursor-pointer">
                    <span className={`w-[18px] h-[18px] rounded flex items-center justify-center shrink-0 ${checks[i] ? "bg-[#0F172A]" : "border border-[#CBD5E1] bg-white"}`}>
                      {checks[i] && <Icon.Check s={12} stroke="#fff"/>}
                    </span>
                    <span className="text-[#0F172A]">{label} <span className="text-[#DC2626]">*</span></span>
                  </label>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* sticky footer */}
      <div className="fixed bottom-0 left-[240px] right-0 bg-white border-t border-[#E5E7EB] px-6 h-[57px] flex items-center gap-3 z-30"
           style={{ boxShadow: "0 -4px 16px rgba(15,23,42,0.06)" }}>
        <div className="flex items-center gap-2.5 min-w-0">
          <PhotoPh w={40} h={30} tone={1} kind="exterior"/>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-[#0F172A] truncate">ZOOM本郷 701</div>
            <div className="text-[10.5px] text-[#64748B] tabnum">¥262,000 / {L("月","mo")}</div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <a href="05-property-detail.html"><Btn kind="link">{L("キャンセル","Cancel")}</Btn></a>
          <button onClick={() => ready && setSent(true)} disabled={!ready}
            title={ready ? undefined : L("希望日時と確認チェックが必要です","Pick a slot and tick both confirmations")}
            className={`inline-flex items-center gap-1.5 rounded-md font-semibold h-9 px-5 text-[13px] ${ready
              ? "bg-[#0F172A] text-white hover:bg-[#1F2937]" : "bg-[#CBD5E1] text-white cursor-not-allowed"}`}>
            <Icon.Send s={14} stroke="#fff"/>{L("予約を送信","Send request")}
          </button>
        </div>
      </div>
    </BrokerShell>
  );
};
