// _shared/screens/management-3.jsx — M11 Publish controls, M12 Viewing list+calendar, M13 App list, M14/14a/14b App detail+approve+reject

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, Stat, Tabs, PhotoPh, Avatar, AppShell } = window;
const L = window.L;

// M11 出稿確認モーダル → moved to _shared/screens/management-3-m11.jsx (rebuild 2026-08-20)

// M12 内見予約 → moved to _shared/screens/management-3-m12.jsx (rebuild 2026-08-20)

// M13 入居申込一覧 → moved to _shared/screens/management-3-m13.jsx (rebuild 2026-08-20)

// M14 入居申込詳細 → moved to _shared/screens/management-3-m14.jsx (rebuild 2026-08-20)

// ══════════════════════════════ M14a — APPROVE MODAL ══════════════════════════════
// Highest-risk terminal action (T-M-203, "6 test cases required" per transition list).
// Per M14a §8 the safety controls (承認内容を確認 checkbox + 契約予定日 + green DISABLED
// approve button) and the missing auto-actions (GMO Sign / Obic ERP / 監査ログ) are
// rebuilt here. Default state: confirm UNCHECKED → publish button DISABLED.
window.ScreenM14aApprove = function () {
  const today = "2026-05-27";
  const wareki = L("令和8年5月27日","Reiwa 8 / May 27 2026");
  const confirmChecked = false;
  const contractDateSet = true;       // sample state: 契約予定日 picker has a default
  const canApprove = confirmChecked && contractDateSet;

  return (
    <AppShell active="applications"
      crumbs={[L("ホーム","Home"), L("入居申込","Applications"), "A-2026-0526-001"]}
      title={L("入居申込の承認","Approve application")}
      subtitle={L("承認は取り消し困難な終端アクションです。確認のうえ実行してください。",
                  "Approval is a hard-to-undo terminal action. Confirm before executing.")}>
      <div className="relative -m-6 p-6 min-h-[760px]" style={{ background: "rgba(15,23,42,0.55)" }}>
        <Card className="max-w-[680px] mx-auto overflow-hidden">

          {/* Header */}
          <div className="px-6 py-5 border-b border-[#F1F5F9] flex items-center gap-3 bg-[#DCFCE7]">
            <div className="w-12 h-12 rounded-full bg-[#16A34A] text-white flex items-center justify-center"><Icon.CheckCircle s={22}/></div>
            <div className="flex-1">
              <div className="text-[16px] font-semibold text-[#15803D]">{L("入居申込の承認","Approve application")}</div>
              <div className="text-[12px] text-[#15803D]/85">{L("承認すると以下の処理が自動実行されます。","On approval, the following actions are executed automatically.")}</div>
            </div>
            <Btn kind="ghost" size="sm" icon={Icon.X}/>
          </div>

          {/* §8 ADD: yellow ⚠ warning callout — 「承認は取り消せません」 */}
          <div className="mx-6 mt-5 mb-3 p-3 rounded-md bg-[#FEF3C7] border border-[#FDE68A] flex items-start gap-2 text-[12.5px] text-[#92400E]">
            <Icon.Alert s={16} stroke="#92400E"/>
            <div>
              <div className="font-semibold">{L("承認は取り消せません","Approval cannot be undone")}</div>
              <div className="mt-[2px]">{L("Obic ERP への書き戻しと GMO Sign エンベロープ生成は即時実行されます。差し戻しが必要な場合は『キャンセル』を選択してください。",
                                            "Obic ERP write-back and GMO Sign envelope generation execute immediately. Click Cancel if you need to send back instead.")}</div>
            </div>
          </div>

          <div className="px-6 pb-5 space-y-4">

            {/* §8 ADD: complete summary card to 8 items */}
            <div className="p-4 rounded-md bg-[#F7F8FA] grid grid-cols-2 gap-3 text-[12.5px]">
              {[
                [L("申込者","Applicant"),       "山田 太郎 (33)"],
                [L("物件","Property"),          L("青葉マンション 305 (1LDK / 44.1㎡)","Aoba Mansion 305 (1LDK / 44.1㎡)")],
                [L("月額賃料","Monthly rent"),  "¥184,000"],
                [L("入居予定日","Move-in"),     "2026/07/01"],
                [L("申込番号","Application no."), "A-2026-0526-001"],
                [L("申込日時","Submitted at"),  "2026/05/26 09:14"],
                [L("仲介会社","Broker"),        L("FINDERS 吉祥寺店 (中村 一郎)","FINDERS Kichijoji (Nakamura Ichiro)")],
                [L("契約期間","Lease term"),    L("普通借家 2年 (2026/07/01〜2028/06/30)","Standard 2y (2026/07/01–2028/06/30)")],
              ].map(([k, v], i) => (
                <div key={i}>
                  <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8]">{k}</div>
                  <div className="font-semibold mt-[2px] tabnum">{v}</div>
                </div>
              ))}
            </div>

            {/* §8 ADD: 担当者 dropdown */}
            <Field label={L("担当者 (承認操作者)","Reviewer (approver)")}>
              <Select value={L("田中 健一 (LENZ DX 本店 / 管理者)","Tanaka Kenichi (LENZ DX HQ / Admin)")}/>
            </Field>

            {/* §8 CRITICAL ADD: 契約予定日 picker with 西暦 / 和暦 toggle */}
            <Field label={L("契約予定日","Planned contract date")} required>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <Input value={today} prefix={<Icon.Calendar s={13}/>}/>
                <div className="flex items-center bg-white border border-[#E5E7EB] rounded-md p-[2px]">
                  <button className="px-2.5 py-1 rounded text-[11.5px] bg-[#0F172A] text-white">{L("西暦","CE")}</button>
                  <button className="px-2.5 py-1 rounded text-[11.5px] text-[#475569]">{L("和暦","Wareki")}</button>
                </div>
              </div>
              <div className="text-[10.5px] text-[#94A3B8] mt-1 tabnum">{wareki}</div>
            </Field>

            {/* §8 CHANGE: comment → 承認コメント (任意 200字, addressed to applicant/broker) */}
            <Field label={L("承認コメント (任意・200字)","Approval comment (optional, ≤200 chars)")} hint={L("申込者・仲介へ通知に同封されます","Sent to applicant & broker")}>
              <div className="border border-[#CBD5E1] rounded-md p-3 text-[13px] min-h-[80px]">
                {L("ご申込ありがとうございました。本日付で承認とさせていただきます。後日 GMO Sign より電子契約書をお送りいたします。",
                   "Thank you for applying. Approved today. A GMO Sign electronic contract will be sent shortly.")}
              </div>
              <div className="text-[10.5px] text-[#94A3B8] mt-1 text-right tabnum">86 / 200</div>
            </Field>

            {/* §8 CHANGE + ADD: 自動アクション — GMO Sign / Obic ERP / 監査ログ; 募集中→募集終了 */}
            <Field label={L("自動アクション (承認時に実行)","Automated actions (on approval)")}>
              <div className="space-y-1.5 text-[12.5px]">
                {[
                  [Icon.Mail,       L("申込者・仲介・管理会社の3者へ承認メールを送信","Send approval emails to applicant, broker, and mgmt"),  true],
                  [Icon.Building,   L("青葉マンション 305 を「募集中」→「募集終了」に変更","Set Aoba Mansion 305: 募集中 → 募集終了"),         true],
                  [Icon.Pause,      L("全6媒体の掲載を一時停止","Pause publishing on all 6 media"),                                              true],
                  [Icon.FileText,   L("GMO Sign 電子契約エンベロープを生成 (申込者・連帯保証人宛)","Generate GMO Sign envelope (applicant + co-signer)"), true],
                  [Icon.Sync,       L("Obic ERP へ書き戻し (申込 → 契約データ)","Write back to Obic ERP (application → contract data)"),       true],
                  [Icon.History,    L("監査ログに記録 (操作者: 田中 健一)","Append to audit log (by Tanaka Kenichi)"),                          true],
                ].map(([Ico, n, on], i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2.5 rounded border border-[#E5E7EB]">
                    <span className={`w-4 h-4 rounded ${on?"bg-[#0F172A]":"border border-[#CBD5E1]"} flex items-center justify-center shrink-0`}>{on && <Icon.Check s={11} stroke="#fff"/>}</span>
                    <Ico s={14} stroke="#475569"/>
                    <span>{n}</span>
                  </div>
                ))}
              </div>
            </Field>

            {/* §8 CRITICAL ADD: required confirmation checkbox */}
            <div className="p-4 bg-[#F1F5F9] rounded-md">
              <label className="flex items-start gap-3 cursor-pointer">
                <span className={`w-5 h-5 rounded mt-[2px] flex items-center justify-center shrink-0 ${confirmChecked ? "bg-[#16A34A]" : "border border-[#CBD5E1] bg-white"}`}>
                  {confirmChecked && <Icon.Check s={13} stroke="#fff"/>}
                </span>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold">{L("承認内容を確認しました","I have reviewed the approval content")}</div>
                  <div className="text-[11.5px] text-[#475569] mt-1">{L("上記の自動アクションが即時実行されることを理解し、承認を確定します。",
                                                                       "I understand the actions above will execute immediately, and I confirm the approval.")}</div>
                </div>
              </label>
            </div>
          </div>

          {/* Footer — green DISABLED approve button (T-M-203 gated) */}
          <div className="px-6 py-4 border-t border-[#F1F5F9] flex items-center gap-2 bg-[#F8FAFC]">
            <span className="text-[10.5px] text-[#94A3B8]">{L("Horizon job が即時実行されます","Horizon job runs immediately")}</span>
            <a href="14-application-detail-step4-owner.html" style={{ marginLeft:"auto" }}><Btn kind="ghost">{L("キャンセル","Cancel")}</Btn></a>
            {canApprove ? (
              <a href="14-application-detail-step5-approved.html" className="no-underline">
                <button
                  className="inline-flex items-center gap-1.5 rounded-md font-semibold h-9 px-4 text-[13px] bg-[#16A34A] text-white hover:bg-[#15803D]">
                  <Icon.Check s={14} stroke="#fff"/>
                  {L("承認する","Approve")}
                </button>
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-1.5 rounded-md font-semibold h-9 px-4 text-[13px] bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed">
                <Icon.Check s={14} stroke="#94A3B8"/>
                {L("承認する","Approve")}
              </button>
            )}
          </div>
          {!canApprove && (
            <div className="px-6 py-2 bg-[#FEE2E2]/40 border-t border-[#FECACA] flex items-center gap-2 text-[11.5px] text-[#991B1B]">
              <Icon.AlertCircle s={13} stroke="#991B1B"/>
              {L("承認ボタンは無効です — 「承認内容を確認しました」にチェックし、契約予定日を設定してください。",
                 "Approve disabled — tick 「承認内容を確認しました」 and set the planned contract date.")}
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
};

// ══════════════════════════════ M14b — REJECT / SEND-BACK MODAL ══════════════════════════════
window.ScreenM14bReject = function () {
  const reasons = [
    [L("家賃支払能力に懸念","Affordability concern"), false],
    [L("勤続年数が短い","Insufficient tenure"), false],
    [L("オーナー判断","Owner declined"), true],
    [L("書類不備","Missing documents"), false],
    [L("入居希望日が合わない","Move-in date mismatch"), false],
    [L("その他","Other"), false],
  ];
  return (
    <AppShell active="applications"
      crumbs={[L("ホーム","Home"), L("入居申込","Applications"), "A-2026-0526-001"]}
      title={L("申込を否認 / 差し戻し","Reject / send-back")}>
      <div className="relative -m-6 p-6 min-h-[760px]" style={{ background: "rgba(15,23,42,0.55)" }}>
        <Card className="max-w-[680px] mx-auto overflow-hidden">
          <div className="px-6 py-5 border-b border-[#F1F5F9] flex items-center gap-3 bg-[#FEE2E2]">
            <div className="w-12 h-12 rounded-full bg-[#DC2626] text-white flex items-center justify-center"><Icon.X s={22}/></div>
            <div>
              <div className="text-[16px] font-semibold text-[#991B1B]">{L("否認または差し戻しを行います","Reject or send back")}</div>
              <div className="text-[12px] text-[#991B1B]/85">{L("理由とコメントは仲介・申込者に通知されます","Reason and comment will be sent to broker and applicant.")}</div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center gap-1.5 bg-[#F1F5F9] p-1 rounded-lg">
              <button className="flex-1 px-3 py-2 rounded-md bg-white text-[#0F172A] text-[13px] font-semibold shadow-sm">{L("否認 (Reject)","Reject")}</button>
              <button className="flex-1 px-3 py-2 rounded-md text-[#475569] text-[13px]">{L("差し戻し (要修正)","Send back (revise)")}</button>
            </div>

            <Field label={L("否認理由 (主要)","Primary reason")} required>
              <div className="grid grid-cols-2 gap-2 text-[12.5px]">
                {reasons.map(([n, sel], i) => (
                  <label key={i} className={`flex items-center gap-2.5 p-2.5 rounded-md border cursor-pointer ${sel ? "border-[#0F172A] bg-[#F7F8FA] font-semibold":"border-[#E5E7EB]"}`}>
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center ${sel?"border-[5px] border-[#0F172A]":"border border-[#CBD5E1]"}`}/>
                    {n}
                  </label>
                ))}
              </div>
            </Field>

            <Field label={L("申込者向けメッセージ","Message to applicant")} hint={L("丁寧な表現になっているか確認","Check tone — sent verbatim")} required>
              <div className="border border-[#CBD5E1] rounded-md p-3 text-[13px] min-h-[96px]">
                {L("このたびはご応募いただき誠にありがとうございました。慎重に検討させていただきましたが、オーナー様のご判断により、今回は別の方とご契約の運びとなりました。引き続き他のお部屋もぜひご検討ください。",
                   "Thank you very much for applying. After careful review, the owner has decided to proceed with another applicant. We'd love to help you find another home — please reach out.")}
              </div>
            </Field>

            <Field label={L("内部メモ (申込者には表示されません)","Internal note (not shown to applicant)")}>
              <div className="border border-[#CBD5E1] rounded-md p-3 text-[13px] min-h-[64px] text-[#475569]">
                {L("オーナーが連帯保証人として親族が必要と回答。仲介に再提案を依頼予定。","Owner wants a co-signer (relative). Will ask broker to re-propose with co-signer.")}
              </div>
            </Field>
          </div>

          <div className="px-6 py-4 border-t border-[#F1F5F9] bg-[#F8FAFC] flex items-center gap-2">
            <Tag tone="danger"><Icon.AlertCircle s={11}/> {L("この操作は取り消せません","This action cannot be undone")}</Tag>
            <Btn kind="ghost" style={{ marginLeft:"auto" }}>{L("キャンセル","Cancel")}</Btn>
            <Btn kind="danger" icon={Icon.X}>{L("否認を確定","Confirm reject")}</Btn>
          </div>
        </Card>
      </div>
    </AppShell>
  );
};
