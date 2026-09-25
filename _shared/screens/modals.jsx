// _shared/screens/modals.jsx — Confirmation modal screens attached to parent contexts.
// Each renders the parent screen vibe (breadcrumbs, sidebar active state) with a modal card centred on a dim backdrop.

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, PhotoPh, Avatar, AppShell } = window;
const L = window.L;

// Shared modal frame
const ModalScreen = ({ active, crumbs, title, subtitle, backHref, modal }) => (
  <AppShell active={active} crumbs={crumbs} title={title} subtitle={subtitle}
    actions={backHref && <a href={backHref}><Btn kind="ghost" icon={Icon.ArrowLeft}>{L("元の画面に戻る","Back")}</Btn></a>}>
    <div className="relative -m-6 p-6 min-h-[760px] flex items-start justify-center" style={{ background: "rgba(15,23,42,0.55)" }}>
      <div className="w-full max-w-[640px] mt-12">{modal}</div>
    </div>
  </AppShell>
);

const ModalCard = ({ tone, icon: Ico, title, body, badge, fields, foot, secondary = L("キャンセル","Cancel"), primary, primaryKind = "primary", backHref }) => {
  const tones = {
    danger: { bg: "#FEE2E2", bd: "#FECACA", fg: "#991B1B", icoBg: "#DC2626" },
    warn:   { bg: "#FEF3C7", bd: "#FDE68A", fg: "#92400E", icoBg: "#F59E0B" },
    info:   { bg: "#F1F5F9", bd: "#E2E8F0", fg: "#0F172A", icoBg: "#0F172A" },
    ok:     { bg: "#DCFCE7", bd: "#BBF7D0", fg: "#15803D", icoBg: "#16A34A" },
  }[tone];
  return (
    <Card className="overflow-hidden" style={{ boxShadow: "0 18px 50px rgba(15,23,42,0.30)" }}>
      <div className="px-5 py-4 flex items-start gap-3" style={{ background: tones.bg, borderBottom: `1px solid ${tones.bd}` }}>
        <div className="w-11 h-11 rounded-lg shrink-0 flex items-center justify-center" style={{ background: tones.icoBg }}>
          <Ico s={20} stroke="#fff"/>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-[15px] font-semibold" style={{ color: tones.fg }}>{title}</div>
            {badge && <Tag tone={tone === "danger" ? "danger" : tone === "warn" ? "warn" : "outline"} size="sm">{badge}</Tag>}
          </div>
          <div className="text-[12.5px] leading-snug mt-1" style={{ color: tones.fg + "cc" }}>{body}</div>
        </div>
        <a href={backHref}><Btn kind="ghost" size="sm" icon={Icon.X}/></a>
      </div>
      {fields && <div className="p-5 space-y-3">{fields}</div>}
      {foot && <div className="px-5 py-3 bg-[#F8FAFC] border-t border-[#F1F5F9] text-[11.5px] text-[#475569] flex items-center gap-2">{foot}</div>}
      <div className="px-5 py-3.5 border-t border-[#F1F5F9] flex items-center gap-2 bg-white">
        <a href={backHref}><Btn kind="ghost">{secondary}</Btn></a>
        <span className="ml-auto"/>
        <Btn kind={primaryKind} size="md">{primary}</Btn>
      </div>
    </Card>
  );
};

// ══════════════════════════════ MGMT — SAVE & SYNC (M4 context) ══════════════════════════════
window.ScreenM4SaveModal = function () {
  return <ModalScreen
    active="properties"
    crumbs={[L("ホーム","Home"), L("物件","Properties"), "ZOOM本郷 701", L("変更を保存","Save changes")]}
    title="ZOOM本郷 701"
    subtitle={L("変更を保存して出稿中のすべての媒体に同期します","Save changes and sync to every medium currently publishing")}
    backHref="04-property-edit-overview.html"
    modal={
      <ModalCard tone="info" icon={Icon.Save}
        title={L("変更を保存して反映しますか？","Save changes and sync?")}
        body={L("更新内容を保存します。出稿中のすべての媒体の出稿情報は最大15分以内に同期されます。",
                "Saves edits to the property. Listings on all 6 sites will resync within 15 minutes.")}
        primary={L("保存して反映","Save & sync")} primaryKind="accent"
        backHref="04-property-edit-overview.html"
        fields={
          <>
            <Field label={L("変更内容のサマリ","Summary of changes")}>
              <div className="border border-[#E5E7EB] rounded-md p-3 text-[12.5px] space-y-1.5">
                <div className="flex justify-between"><span className="text-[#64748B]">{L("賃料","Rent")}</span><span className="tabnum">¥258,000 → <b>¥262,000</b></span></div>
                <div className="flex justify-between"><span className="text-[#64748B]">{L("募集状態","Availability")}</span><span>{L("空室","Vacant")} → <b>{L("予約済","Reserved")}</b></span></div>
                <div className="flex justify-between"><span className="text-[#64748B]">{L("キャッチコピー","Catch copy")}</span><span className="text-[10.5px] text-[#94A3B8]">{L("36文字 → 32文字","36 → 32 chars")}</span></div>
                <div className="flex justify-between"><span className="text-[#64748B]">{L("画像","Images")}</span><span>+ 2 ({L("並び替え","Reordered")})</span></div>
              </div>
            </Field>
            <label className="flex items-center gap-2.5 text-[12.5px] cursor-pointer">
              <span className="w-4 h-4 rounded bg-[#0F172A] flex items-center justify-center"><Icon.Check s={11} stroke="#fff"/></span>
              {L("出稿中のすべての媒体に自動反映 (SUUMO・HOMES・at home ほか)","Auto-push to every medium currently publishing (SUUMO, HOMES, at home, …)")}
            </label>
            <label className="flex items-center gap-2.5 text-[12.5px] cursor-pointer">
              <span className="w-4 h-4 rounded border border-[#CBD5E1]"/>
              {L("関連する申込者・仲介に通知メールを送信","Email applicants and brokers tracking this listing")}
            </label>
          </>
        }
        foot={<><Icon.Info s={12}/> {L("価格変更は履歴に記録されます","Price changes are logged in the activity feed")}</>}
      />
    }/>;
};

// ══════════════════════════════ MGMT — DELETE PROPERTY (M4 context) ══════════════════════════════
// D1 — archive-and-retain wording only (never 完全に削除 / 永久に削除) + delete guard:
// blocked while a non-archivable 申込 (審査中/受付) is still attached.
window.ScreenM4DeleteModal = function () {
  const NAME = "ZOOM本郷 701";
  const [typed, setTyped] = React.useState("");
  const guarded = true; // 申込 1件 (審査中) attached → delete blocked
  const nameOk = typed.trim() === NAME;
  return <ModalScreen
    active="properties"
    crumbs={[L("物件管理","Properties"), "ZOOM本郷", L("701号室","Room 701"), L("削除","Delete")]}
    title={NAME}
    subtitle={L("物件を削除します（申込・チャット・内見はアーカイブされ保管されます）",
                "Delete this property — applications, chats and viewings are archived and retained")}
    backHref="04-property-edit-overview.html"
    modal={
      <Card className="overflow-hidden" style={{ boxShadow: "0 18px 50px rgba(15,23,42,0.30)" }}>
        <div className="px-5 py-4 flex items-start gap-3" style={{ background: "#FEE2E2", borderBottom: "1px solid #FECACA" }}>
          <div className="w-11 h-11 rounded-lg shrink-0 flex items-center justify-center bg-[#DC2626]"><Icon.Trash s={20} stroke="#fff"/></div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-[15px] font-semibold text-[#991B1B]">{L(`${NAME} を削除しますか？`, `Delete ${NAME}?`)}</div>
              <Tag tone="neutral" size="sm"><Icon.Layers s={11}/> {L("申込・チャットは保管","Applications & chats retained")}</Tag>
            </div>
            <div className="text-[12.5px] leading-snug mt-1 text-[#991B1B]/85">
              {L("内見3件・申込1件・チャット履歴はアーカイブされて保管され（検索・月次レポートに残る）、出稿中のすべての媒体で掲載を即時停止します。",
                 "3 viewings, 1 application and the chat history are archived and retained (still searchable and counted in monthly reports). Publishing to all 5 sites stops immediately.")}
            </div>
          </div>
          <a href="04-property-edit-overview.html"><Btn kind="ghost" size="sm" icon={Icon.X}/></a>
        </div>

        <div className="p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-md p-3">
              <div className="text-[12px] font-semibold text-[#0F172A] flex items-center gap-1.5 mb-1.5">
                <Icon.Layers s={12} stroke="#475569"/>{L("アーカイブされ保管されるデータ","Archived and retained")}
              </div>
              <ul className="space-y-[3px] text-[12px] text-[#475569]">
                {[L("入居申込 1件","1 application"), L("チャット履歴 48件","48 chat messages"), L("内見予約 3件","3 viewings")].map((t, i) => (
                  <li key={i} className="flex items-center gap-1.5"><Icon.Check s={11} stroke="#475569"/>{t}</li>
                ))}
              </ul>
              <div className="text-[10.5px] text-[#94A3B8] mt-2 leading-snug">{L("検索・月次レポートから引き続き参照できます","Still available in search and monthly reports")}</div>
            </div>
            <div className="border border-[#FECACA] bg-[#FEF2F2] rounded-md p-3">
              <div className="text-[12px] font-semibold text-[#991B1B] flex items-center gap-1.5 mb-1.5">
                <Icon.Trash s={12} stroke="#991B1B"/>{L("削除されるデータ","Deleted")}
              </div>
              <ul className="space-y-[3px] text-[12px] text-[#991B1B]/90">
                {[L("物件詳細","Property details"), L("画像 27枚","27 images"), L("出稿情報（出稿中のすべての媒体）","Publishing settings (every publishing medium)")].map((t, i) => (
                  <li key={i} className="flex items-center gap-1.5"><Icon.X s={11} stroke="#991B1B"/>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          <Field label={L("確認のため物件名を入力してください","Type the property name to confirm")} hint={NAME}>
            <div className={`flex items-center bg-white border rounded-md h-9 px-2.5 ${nameOk ? "border-[#16A34A]" : "border-[#CBD5E1]"} focus-within:border-[#0F172A]`}>
              <input value={typed} onChange={e => setTyped(e.target.value)} placeholder={NAME}
                className="bg-transparent outline-none text-[13px] flex-1 min-w-0 text-[#0F172A] placeholder:text-[#94A3B8]"/>
              {nameOk && <Icon.Check s={13} stroke="#16A34A"/>}
            </div>
          </Field>
        </div>

        <div className="px-5 py-3.5 border-t border-[#F1F5F9] bg-white">
          <div className="flex items-center gap-2">
            <a href="04-property-edit-overview.html"><Btn kind="ghost">{L("キャンセル","Cancel")}</Btn></a>
            <span className="ml-auto"/>
            <button disabled={guarded || !nameOk}
              className={`inline-flex items-center gap-1.5 rounded-md font-medium h-9 px-4 text-[13px] ${
                guarded || !nameOk ? "bg-[#FCA5A5] text-white cursor-not-allowed" : "bg-[#DC2626] text-white hover:bg-[#991B1B]"}`}>
              <Icon.Trash s={14} stroke="#fff"/>{L("削除する（申込はアーカイブ）","Delete (applications archived)")}
            </button>
          </div>
          {guarded && (
            <div className="mt-2.5 flex items-start gap-2 text-[12px] text-[#991B1B]">
              <Icon.AlertCircle s={13} stroke="#991B1B"/>
              <div>
                {L("申込情報が残っているため削除できません。申込をアーカイブしてから実行してください。",
                   "Cannot delete while an application is still open. Archive the application first.")}
                <a href="14-application-detail-archive-modal.html" className="ml-1.5 underline">{L("申込をアーカイブする →","Archive the application →")}</a>
              </div>
            </div>
          )}
        </div>
      </Card>
    }/>;
};

// ══════════════════════════════ MGMT — DISCARD CHANGES (M4 context) ══════════════════════════════
window.ScreenM4DiscardModal = function () {
  return <ModalScreen
    active="properties"
    crumbs={[L("ホーム","Home"), L("物件","Properties"), "ZOOM本郷 701", L("変更を破棄","Discard changes")]}
    title="ZOOM本郷 701"
    subtitle={L("未保存の変更があります","You have unsaved changes")}
    backHref="04-property-edit-overview.html"
    modal={
      <ModalCard tone="warn" icon={Icon.AlertCircle}
        title={L("未保存の変更を破棄しますか？","Discard unsaved changes?")}
        body={L("このページを離れると、保存されていない変更は失われます。",
                "Leaving this page will lose your unsaved changes.")}
        secondary={L("編集に戻る","Keep editing")}
        primary={L("変更を破棄して離れる","Discard & leave")} primaryKind="danger"
        backHref="04-property-edit-overview.html"
        fields={
          <div className="border border-[#FDE68A] bg-[#FEF3C7] rounded-md p-3 text-[12px] text-[#92400E]">
            <div className="font-semibold mb-1">{L("4 つの未保存の変更","4 unsaved changes")}</div>
            <ul className="list-disc list-inside space-y-[2px]">
              <li>{L("賃料: ¥258,000 → ¥262,000","Rent: ¥258,000 → ¥262,000")}</li>
              <li>{L("募集状態: 空室 → 予約済","Availability: Vacant → Reserved")}</li>
              <li>{L("キャッチコピーの修正","Edited catch copy")}</li>
              <li>{L("画像の並び替え (新規 2 枚追加)","Image reorder (+2 new)")}</li>
            </ul>
          </div>
        }
        foot={<><Icon.Save s={12}/> {L("「下書きに保存」で後で再開することもできます","You can save as draft to resume later")}</>}
      />
    }/>;
};

// ══════════════════════════════ MGMT — DELETE PROPERTY (M2 list context, single row) ═══════
// D1 — archive-and-retain wording only. Guard text lives with the guarded cases (M4 modal,
// bulk modal); this row has no open application, so the confirm path is enabled.
window.ScreenM2DeleteModal = function () {
  const NAME = "ZOOM本郷 305";
  const [typed, setTyped] = React.useState("");
  const [stopAds, setStopAds] = React.useState(true);
  const guarded = true; // 申込 1件 (審査中) attached → delete blocked, same guard as M4/bulk
  const nameOk = typed.trim() === NAME;
  return <ModalScreen
    active="properties"
    crumbs={[L("物件管理","Properties"), L("物件一覧","Property list"), L("削除","Delete")]}
    title={L("物件を削除 — ZOOM本郷 305","Delete property — ZOOM Hongo 305")}
    subtitle={L("一覧の操作メニュー（⋯）→ 削除","From the row's ⋯ menu → Delete")}
    backHref="02-property-list.html"
    modal={
      <Card className="overflow-hidden" style={{ boxShadow: "0 18px 50px rgba(15,23,42,0.30)" }}>
        <div className="px-5 py-4 flex items-start gap-3" style={{ background: "#FEE2E2", borderBottom: "1px solid #FECACA" }}>
          <div className="w-11 h-11 rounded-lg shrink-0 flex items-center justify-center bg-[#DC2626]"><Icon.Trash s={20} stroke="#fff"/></div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-[15px] font-semibold text-[#991B1B]">{L("ZOOM本郷 305 を削除しますか？","Delete ZOOM Hongo 305?")}</div>
              <Tag tone="neutral" size="sm"><Icon.Layers s={11}/> {L("申込・チャットは保管","Applications & chats retained")}</Tag>
            </div>
            <div className="text-[12.5px] leading-snug mt-1 text-[#991B1B]/85">
              {L("この物件に紐づく内見・申込・チャット履歴はアーカイブされて保管され（検索・月次レポートに残る）、出稿中のすべての媒体で掲載が停止します。",
                 "Viewings, applications and chat history for this property are archived and retained (still searchable and counted in monthly reports). Publishing stops on all 5 sites.")}
            </div>
          </div>
          <a href="02-property-list.html"><Btn kind="ghost" size="sm" icon={Icon.X}/></a>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-md border border-[#E5E7EB] bg-[#F8FAFC]">
            <PhotoPh w={64} h={48} kind="exterior" tone={2}/>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-[#0F172A]">ZOOM本郷 305</div>
              <div className="text-[11.5px] text-[#64748B] tabnum">{L("文京区本郷2-26-13 · 1K · 26.0㎡ · ¥138,000","Hongo 2-26-13, Bunkyo · 1K · 26.0㎡ · ¥138,000")}</div>
              <div className="flex items-center gap-2 mt-1 text-[10.5px] text-[#94A3B8]">
                <span className="flex items-center gap-1"><Icon.Calendar s={10}/>{L("内見 1件","1 viewing")}</span><span>·</span>
                <span className="flex items-center gap-1"><Icon.FileText s={10}/>{L("申込 1件（審査中）","1 application (under review)")}</span><span>·</span>
                <span className="flex items-center gap-1"><Icon.Upload s={10}/>{L("出稿 5サイト","5 sites live")}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-md p-3">
              <div className="text-[12px] font-semibold text-[#0F172A] flex items-center gap-1.5 mb-1.5"><Icon.Layers s={12} stroke="#475569"/>{L("アーカイブされ保管されるデータ","Archived and retained")}</div>
              <ul className="space-y-[3px] text-[12px] text-[#475569]">
                {[L("入居申込・チャット","Applications & chats"), L("内見予約 1件","1 viewing"), L("検索・月次レポートに残る","Kept in search & reports")].map((t, i) => (
                  <li key={i} className="flex items-center gap-1.5"><Icon.Check s={11} stroke="#475569"/>{t}</li>
                ))}
              </ul>
            </div>
            <div className="border border-[#FECACA] bg-[#FEF2F2] rounded-md p-3">
              <div className="text-[12px] font-semibold text-[#991B1B] flex items-center gap-1.5 mb-1.5"><Icon.Trash s={12} stroke="#991B1B"/>{L("削除されるデータ","Deleted")}</div>
              <ul className="space-y-[3px] text-[12px] text-[#991B1B]/90">
                {[L("物件詳細","Property details"), L("画像 18枚","18 images"), L("出稿情報（出稿中のすべての媒体）","Publishing settings (every publishing medium)")].map((t, i) => (
                  <li key={i} className="flex items-center gap-1.5"><Icon.X s={11} stroke="#991B1B"/>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          <Field label={L("確認のため物件名を入力してください","Type the property name to confirm")} hint={NAME}>
            <div className={`flex items-center bg-white border rounded-md h-9 px-2.5 ${nameOk ? "border-[#16A34A]" : "border-[#CBD5E1]"} focus-within:border-[#0F172A]`}>
              <input value={typed} onChange={e => setTyped(e.target.value)} placeholder={NAME}
                className="bg-transparent outline-none text-[13px] flex-1 min-w-0 text-[#0F172A] placeholder:text-[#94A3B8]"/>
              {nameOk && <Icon.Check s={13} stroke="#16A34A"/>}
            </div>
          </Field>

          <label onClick={() => setStopAds(v => !v)} className="flex items-center gap-2.5 text-[12.5px] cursor-pointer">
            <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${stopAds ? "bg-[#0F172A]" : "border border-[#CBD5E1]"}`}>{stopAds && <Icon.Check s={11} stroke="#fff"/>}</span>
            {L("全サイトの出稿も停止する","Also stop publishing on all sites")}
          </label>
        </div>

        <div className="px-5 py-3.5 border-t border-[#F1F5F9] bg-white">
          <div className="flex items-center gap-2">
            <a href="02-property-list.html"><Btn kind="ghost">{L("キャンセル","Cancel")}</Btn></a>
            <span className="ml-auto"/>
            <button disabled={guarded || !nameOk}
              className={`inline-flex items-center gap-1.5 rounded-md font-medium h-9 px-4 text-[13px] ${
                guarded || !nameOk ? "bg-[#FCA5A5] text-white cursor-not-allowed" : "bg-[#DC2626] text-white hover:bg-[#991B1B]"}`}>
              <Icon.Trash s={14} stroke="#fff"/>{L("削除する（申込はアーカイブ）","Delete (applications archived)")}
            </button>
          </div>
          {guarded && (
            <div className="mt-2.5 flex items-start gap-2 text-[12px] text-[#991B1B]">
              <Icon.AlertCircle s={13} stroke="#991B1B"/>
              <div>
                {L("申込情報が残っているため削除できません。申込をアーカイブしてから実行してください。",
                   "Cannot delete while an application is still open. Archive the application first.")}
                <a href="14-application-detail-archive-modal.html" className="ml-1.5 underline">{L("申込をアーカイブする →","Archive the application →")}</a>
              </div>
            </div>
          )}
        </div>
      </Card>
    }/>;
};

// ══════════════════════════════ MGMT — BULK DELETE (M2 context) ══════════════════════════════
// D1 — 12 selected, 1 excluded by the delete guard → 11 deletable.
window.ScreenM2BulkDeleteModal = function () {
  const [typed, setTyped] = React.useState("");
  const [stopAds, setStopAds] = React.useState(true);
  const [notify, setNotify] = React.useState(false);
  const targets = ["ZOOM本郷 305","ZOOM本郷 702","青葉マンション 402","中野グリーンハイツ 201","中野グリーンハイツ 305",
                   "吉祥寺パークレジデンス 駐車場No.1","メゾン白金 102","パークサイド代沢 401","カーサ恵比寿 203","ヴェルディ吉祥寺 401","シャインヒルズ 302"];
  const excluded = [["ZOOM本郷 701", L("申込1件（審査中）","1 application (under review)")]];
  const countOk = typed.trim() === "11";
  return <ModalScreen
    active="properties"
    crumbs={[L("物件管理","Properties"), L("物件一覧","Property list"), L("一括削除","Bulk delete")]}
    title={L("12件を一括削除","Bulk delete 12 properties")}
    subtitle={L("申込が残る1件は対象から除外されます","1 property with an open application is excluded")}
    backHref="02-property-list.html"
    modal={
      <Card className="overflow-hidden" style={{ boxShadow: "0 18px 50px rgba(15,23,42,0.30)" }}>
        <div className="px-5 py-4 flex items-start gap-3" style={{ background: "#FEE2E2", borderBottom: "1px solid #FECACA" }}>
          <div className="w-11 h-11 rounded-lg shrink-0 flex items-center justify-center bg-[#DC2626]"><Icon.Trash s={20} stroke="#fff"/></div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-[15px] font-semibold text-[#991B1B]">{L("12件中 11件を一括で削除しますか？","Delete 11 of the 12 selected properties?")}</div>
              <Tag tone="neutral" size="sm">{L("12件選択中","12 selected")}</Tag>
            </div>
            <div className="text-[12.5px] leading-snug mt-1 text-[#991B1B]/85">
              {L("選択中の物件を削除します。入居申込・チャット・内見はアーカイブされて保管され（検索・月次レポートに残る）、全サイトの出稿が停止し、関連する申込者・仲介に通知が送られます。",
                 "The selected properties are deleted. Applications, chats and viewings are archived and retained (still searchable and counted in monthly reports); publishing stops on all sites and related applicants and brokers are notified.")}
            </div>
          </div>
          <a href="02-property-list.html"><Btn kind="ghost" size="sm" icon={Icon.X}/></a>
        </div>

        <div className="p-5 space-y-3">
          <div className="p-3 rounded-md bg-[#F8FAFC] border border-[#E5E7EB]">
            <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#94A3B8] mb-2">{L("削除対象（11件）","Will be deleted (11)")}</div>
            <div className="grid grid-cols-2 gap-1.5 text-[11.5px] text-[#475569]">
              {targets.map((n, i) => <div key={i} className="flex items-center gap-1.5"><Icon.Building s={11} stroke="#94A3B8"/>{n}</div>)}
            </div>
          </div>

          {/* delete guard — non-archivable applications keep their property out of the batch */}
          <div className="p-3 rounded-md bg-[#FEF2F2] border border-[#FECACA]">
            <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#991B1B] mb-2">{L("対象外（1件）","Excluded (1)")}</div>
            {excluded.map(([n, reason], i) => (
              <div key={i} className="flex items-start gap-2 text-[12px] text-[#991B1B]">
                <Icon.AlertCircle s={13} stroke="#991B1B"/>
                <div>
                  <span className="font-semibold">{n}</span>
                  <span className="text-[11px] ml-1.5 opacity-80">{reason}</span>
                  <div className="text-[11.5px] mt-[2px]">
                    {L("申込情報が残っているため削除できません。申込をアーカイブしてから実行してください。",
                       "Cannot delete while an application is still open. Archive the application first.")}
                    <a href="14-application-detail-archive-modal.html" className="ml-1.5 underline">{L("申込をアーカイブする →","Archive the application →")}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label onClick={() => setStopAds(v => !v)} className="flex items-center gap-2.5 text-[12.5px] cursor-pointer">
              <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${stopAds ? "bg-[#0F172A]" : "border border-[#CBD5E1]"}`}>{stopAds && <Icon.Check s={11} stroke="#fff"/>}</span>
              {L("出稿も停止する（SUUMO・HOMES ほか）","Also stop publishing (SUUMO, HOMES, …)")}
            </label>
            <label onClick={() => setNotify(v => !v)} className="flex items-center gap-2.5 text-[12.5px] cursor-pointer">
              <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${notify ? "bg-[#0F172A]" : "border border-[#CBD5E1]"}`}>{notify && <Icon.Check s={11} stroke="#fff"/>}</span>
              {L("通知メールを送信（申込者・仲介会社）","Send notification email (applicants & brokers)")}
            </label>
          </div>

          <Field label={L("確認のため削除件数を入力してください","Type the number of properties to confirm")} hint="11">
            <div className={`flex items-center bg-white border rounded-md h-9 px-2.5 w-[120px] ${countOk ? "border-[#16A34A]" : "border-[#CBD5E1]"} focus-within:border-[#0F172A]`}>
              <input value={typed} onChange={e => setTyped(e.target.value)} placeholder="11"
                className="bg-transparent outline-none text-[13px] flex-1 min-w-0 text-[#0F172A] placeholder:text-[#94A3B8] tabnum"/>
              {countOk && <Icon.Check s={13} stroke="#16A34A"/>}
            </div>
          </Field>
        </div>

        <div className="px-5 py-3.5 border-t border-[#F1F5F9] bg-white flex items-center gap-2">
          <a href="02-property-list.html"><Btn kind="ghost">{L("キャンセル","Cancel")}</Btn></a>
          <span className="ml-auto"/>
          <button disabled={!countOk}
            className={`inline-flex items-center gap-1.5 rounded-md font-medium h-9 px-4 text-[13px] ${countOk ? "bg-[#DC2626] text-white hover:bg-[#991B1B]" : "bg-[#FCA5A5] text-white cursor-not-allowed"}`}>
            <Icon.Trash s={14} stroke="#fff"/>{L("11件を削除（申込はアーカイブ）","Delete 11 items (applications archived)")}
          </button>
        </div>
      </Card>
    }/>;
};

// ══════════════════════════════ MGMT — UNPUBLISH (M11 context) ══════════════════════════════
window.ScreenM11UnpublishModal = function () {
  return <ModalScreen
    active="publishing"
    crumbs={[L("ホーム","Home"), L("物件","Properties"), "ZOOM本郷 701", L("出稿","Publish"), L("停止","Pause")]}
    title={L("出稿を停止 — ZOOM本郷 701","Pause publishing — ZOOM Hongo 701")}
    subtitle={L("選択したサイトで掲載を停止します","Stop showing this listing on selected sites")}
    backHref="11-publish-controls.html"
    modal={
      <ModalCard tone="warn" icon={Icon.Pause}
        title={L("ZOOM本郷 701 の出稿を停止しますか？","Stop publishing ZOOM Hongo 701?")}
        body={L("選択中の4サイトで公開が停止されます。再公開はいつでも可能です。",
                "Currently 4 sites are selected. They will stop displaying this listing. You can re-publish anytime.")}
        primary={L("4 サイトで停止","Pause on 4 sites")} primaryKind="primary"
        backHref="11-publish-controls.html"
        fields={
          <>
            <Field label={L("停止するサイト","Pause on these sites")}>
              <div className="grid grid-cols-3 gap-px bg-[#F1F5F9] rounded overflow-hidden">
                {[["SUUMO",true],["HOMES",true],["at home",true],["athome 賃貸",true],["RAINZ",false],["ITANDI",false]].map(([n, on], i) => (
                  <label key={i} className="bg-white p-2.5 flex items-center gap-2 text-[12px] cursor-pointer">
                    <span className={`w-4 h-4 rounded ${on ? "bg-[#0F172A]" : "border border-[#CBD5E1]"} flex items-center justify-center`}>{on && <Icon.Check s={11} stroke="#fff"/>}</span>
                    {n}
                  </label>
                ))}
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={L("停止理由 (社内メモ)","Reason (internal)")}>
                <Select value={L("オーナー要請","Owner requested")}/>
              </Field>
              <Field label={L("自動再公開","Auto re-publish")}>
                <Select value={L("手動","Manual")}/>
              </Field>
            </div>
          </>
        }
        foot={<><Icon.Info s={12}/> {L("変更は最大15分以内に各サイトに反映されます","Changes propagate to each site within 15 minutes")}</>}
      />
    }/>;
};

// ══════════════════════════════ BROKER — CANCEL VIEWING (B8 context) ══════════════════════════════
window.ScreenB8CancelModal = function () {
  return <ModalScreen
    active="viewings"
    crumbs={[L("ホーム","Home"), L("My 内見","My viewings"), L("キャンセル","Cancel")]}
    title={L("内見をキャンセル — ZOOM本郷 701","Cancel viewing — ZOOM Hongo 701")}
    subtitle={L("本日 18:00–19:00 · 山田 太郎 様","Today 18:00–19:00 · Mr. Yamada Taro")}
    backHref="08-my-viewings.html"
    modal={
      <ModalCard tone="danger" icon={Icon.X}
        title={L("この内見をキャンセルしますか？","Cancel this viewing?")}
        badge={L("予定の 3 時間前","3h before scheduled time")}
        body={L("管理会社・お客様にキャンセル通知が自動送信されます。直前のキャンセルは管理会社のNPSに影響します。",
                "Cancellation notifications go out to the mgmt company and the customer. Last-minute cancels affect your NPS with the mgmt company.")}
        primary={L("内見をキャンセル","Cancel viewing")} primaryKind="danger"
        secondary={L("やめる","Keep")}
        backHref="08-my-viewings.html"
        fields={
          <>
            <div className="grid grid-cols-[80px_1fr] gap-3 p-3 rounded-md border border-[#FECACA] bg-[#FEF2F2]">
              <PhotoPh w={80} h={68} kind="exterior" tone={1}/>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold">ZOOM本郷 701</div>
                <div className="text-[11px] text-[#475569] mt-[2px]">{L("文京区本郷 5-24-5 · 1LDK · ¥262,000","5-24-5 Hongo, Bunkyo · 1LDK · ¥262,000")}</div>
                <div className="flex items-center gap-2 mt-1 text-[11.5px] text-[#475569]">
                  <Icon.Calendar s={11}/> <span className="tabnum">{L("2026/05/26 18:00–19:00","2026/05/26 18:00–19:00")}</span>
                </div>
                <div className="flex items-center gap-2 text-[11.5px] text-[#475569]">
                  <Icon.User s={11}/> {L("山田 太郎 様 (090-1234-5678)","Mr. Yamada Taro (090-1234-5678)")}
                </div>
              </div>
            </div>
            <Field label={L("キャンセル理由","Cancellation reason")} required>
              <Select value={L("お客様の都合","Customer's schedule")}/>
            </Field>
            <Field label={L("お客様へのメッセージ","Message to customer")}>
              <div className="border border-[#CBD5E1] rounded-md p-3 text-[13px] min-h-[72px]">
                {L("申し訳ございません。ご都合により本日の内見をキャンセルさせていただきます。改めて日程をご案内します。",
                   "We regret to inform you that today's viewing has been cancelled at the customer's request. We will propose new dates shortly.")}
              </div>
            </Field>
            <label className="flex items-center gap-2.5 text-[12.5px] cursor-pointer">
              <span className="w-4 h-4 rounded bg-[#0F172A] flex items-center justify-center"><Icon.Check s={11} stroke="#fff"/></span>
              {L("代替日程をご提案するためチャットを開く","Open chat to suggest new dates")}
            </label>
          </>
        }
      />
    }/>;
};

// ══════════════════════════════ BROKER — WITHDRAW APPLICATION (B11 context, 3 STEPS) ═══════
const B11_WD_STEPS = () => [
  [L("理由を選択","Choose reason"),         L("取り下げの主な理由","Why are you withdrawing?")],
  [L("詳細を入力","Add details"),           L("管理会社への伝言と書類","Message to mgmt & docs")],
  [L("最終確認","Final confirmation"),       L("内容を確認して取り下げ","Review and withdraw")],
];
const B11_WD_SLUGS = [
  "11-my-applications-withdraw-step1-reason",
  "11-my-applications-withdraw-step2-details",
  "11-my-applications-withdraw-step3-confirm",
];

const B11WdShell = ({ active, modal }) => {
  const STEPS = B11_WD_STEPS();
  const stepper = (
    <Card className="overflow-hidden mb-5">
      <div className="px-5 py-4 flex items-center gap-2 bg-white">
        {STEPS.map(([n, sub], i) => (
          <React.Fragment key={i}>
            <a href={`${B11_WD_SLUGS[i]}.html`} className="flex items-center gap-2.5 group cursor-pointer no-underline">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold transition ${
                i === active ? "bg-[#DC2626] text-white" :
                i < active  ? "bg-[#0F172A] text-white" :
                              "bg-white border border-[#E5E7EB] text-[#94A3B8]"
              }`}>{i < active ? <Icon.Check s={12}/> : i+1}</div>
              <div>
                <div className={`text-[10px] uppercase tracking-wider font-semibold ${i === active ? "text-[#991B1B]" : "text-[#94A3B8]"}`}>STEP {i+1}</div>
                <div className={`text-[12px] ${i === active ? "font-semibold text-[#0F172A]" : i < active ? "text-[#475569]" : "text-[#94A3B8]"}`}>{n}</div>
              </div>
            </a>
            {i < STEPS.length-1 && <div className={`flex-1 h-px ${i < active ? "bg-[#0F172A]" : "bg-[#E5E7EB]"}`}/>}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
  return (
    <ModalScreen
      active="applications"
      crumbs={[L("ホーム","Home"), L("My 申込","My applications"), "A-2026-0526-001", L("取り下げ","Withdraw"), STEPS[active][0]]}
      title={L("申込を取り下げ — A-2026-0526-001","Withdraw application — A-2026-0526-001")}
      subtitle={L(`ステップ ${active+1} / 3 · 山田 太郎 様 · 青葉マンション 305`, `Step ${active+1} of 3 · Mr. Yamada Taro · Aoba Mansion 305`)}
      backHref="11-my-applications.html"
      modal={
        <div>
          {stepper}
          {modal}
        </div>
      }/>
  );
};

// Reusable card frame for each step (no backdrop wrapper — provided by ModalScreen)
const B11WdCard = ({ icon: Ico, title, body, badge, fields, foot, secondary, primary, primaryKind = "danger", secondaryHref, primaryHref }) => (
  <Card className="overflow-hidden" style={{ boxShadow: "0 18px 50px rgba(15,23,42,0.20)" }}>
    <div className="px-5 py-4 flex items-start gap-3" style={{ background: "#FEE2E2", borderBottom: "1px solid #FECACA" }}>
      <div className="w-11 h-11 rounded-lg shrink-0 flex items-center justify-center bg-[#DC2626]">
        <Ico s={20} stroke="#fff"/>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-[15px] font-semibold text-[#991B1B]">{title}</div>
          {badge && <Tag tone="danger" size="sm">{badge}</Tag>}
        </div>
        <div className="text-[12.5px] leading-snug mt-1 text-[#991B1B]/85">{body}</div>
      </div>
    </div>
    {fields && <div className="p-5 space-y-3">{fields}</div>}
    {foot && <div className="px-5 py-3 bg-[#F8FAFC] border-t border-[#F1F5F9] text-[11.5px] text-[#475569] flex items-center gap-2">{foot}</div>}
    <div className="px-5 py-3.5 border-t border-[#F1F5F9] flex items-center gap-2 bg-white">
      {secondary && <a href={secondaryHref}><Btn kind="ghost" icon={secondary.icon}>{secondary.label}</Btn></a>}
      <span className="ml-auto"/>
      {primary && (primaryHref
        ? <a href={primaryHref}><Btn kind={primaryKind} iconRight={primary.iconRight}>{primary.label}</Btn></a>
        : <Btn kind={primaryKind}>{primary.label}</Btn>
      )}
    </div>
  </Card>
);

// Step 1 — Reason
window.ScreenB11Wd1 = function () {
  const reasons = [
    [L("お客様が別物件で契約","Customer signed elsewhere"),                L("最も多い理由 (約45%)","Most common (~45%)"), true],
    [L("お客様のご都合 (転勤など)","Customer's circumstances (relocation, etc.)"), L("入居予定日が変更","Move-in date changed"), false],
    [L("家賃・初期費用の見直し","Rent or move-in cost reconsidered"),    L("予算オーバーが判明","Budget didn't fit"), false],
    [L("内見後の判断","Decision after viewing"),                           L("実物を見て決め直し","Reconsidered after seeing the unit"), false],
    [L("審査結果が長すぎる","Review taking too long"),                      L("36 時間以上経過","Over 36 hours elapsed"), false],
    [L("その他","Other"),                                                   L("自由入力で詳細を記述","Free-form details on next step"), false],
  ];
  return <B11WdShell active={0} modal={
    <B11WdCard icon={Icon.Trash}
      title={L("取り下げの理由を選択してください","Why are you withdrawing this application?")}
      badge={L("Step 1 / 3","Step 1 / 3")}
      body={L("選択した理由は管理会社に通知され、社内分析にも使用されます。","The reason is sent to the mgmt company and used for internal analysis.")}
      fields={
        <>
          {/* Application summary */}
          <div className="grid grid-cols-[64px_1fr] gap-3 p-3 rounded-md bg-[#F8FAFC] border border-[#E5E7EB]">
            <PhotoPh w={64} h={56} kind="exterior" tone={3}/>
            <div className="min-w-0">
              <div className="text-[12.5px] font-semibold">青葉マンション 305</div>
              <div className="text-[11px] text-[#64748B]">{L("¥184,000 · 入居希望 2026/07/01","¥184,000 · move-in 2026/07/01")}</div>
              <div className="text-[10.5px] text-[#94A3B8] mt-[2px] tabnum">{L("管理会社 審査中 (3/5) · 経過 36h","Mgmt reviewing · 3 of 5 · 36h elapsed")}</div>
            </div>
          </div>
          {/* Reason picker */}
          <div className="space-y-2">
            {reasons.map(([n, sub, sel], i) => (
              <label key={i} className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer ${
                sel ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#E5E7EB] hover:bg-[#F7F8FA]"
              }`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-[2px] ${
                  sel ? "border-[5px] border-[#DC2626]" : "border border-[#CBD5E1]"
                }`}/>
                <div className="flex-1">
                  <div className="text-[12.5px] font-semibold">{n}</div>
                  <div className="text-[10.5px] text-[#94A3B8]">{sub}</div>
                </div>
              </label>
            ))}
          </div>
        </>
      }
      secondary={{ label: L("キャンセル","Cancel") }} secondaryHref="11-my-applications.html"
      primary={{ label: L("詳細入力へ →","Next: details →"), iconRight: <Icon.ArrowRight s={12}/> }}
      primaryHref="11-my-applications-withdraw-step2-details.html" primaryKind="primary"/>
  }/>;
};

// Step 2 — Details
window.ScreenB11Wd2 = function () {
  return <B11WdShell active={1} modal={
    <B11WdCard icon={Icon.Edit}
      title={L("管理会社への伝言を入力","Message to the management company")}
      badge={L("Step 2 / 3","Step 2 / 3")}
      body={L("丁寧な表現を心がけてください。文面はそのまま管理会社に届きます。","Aim for professional tone — your wording is sent verbatim.")}
      fields={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Field label={L("選択した理由","Selected reason")}>
              <Input value={L("お客様が別物件で契約","Customer signed elsewhere")} suffix={<Icon.CheckCircle s={13} stroke="#16A34A"/>}/>
            </Field>
            <Field label={L("代替提案","Alternative proposal")}>
              <Select value={L("なし","None")}/>
            </Field>
          </div>
          <Field label={L("管理会社向けメッセージ","Message to mgmt company")} required>
            <div className="border border-[#CBD5E1] rounded-md p-3 text-[13px] min-h-[120px]">
              {L("お世話になっております。お客様より別物件での契約が確定したとのご連絡をいただき、本件は取り下げさせていただきます。",
                 "Thank you for your time on this application. Our customer has confirmed they will sign at a different property, so we are formally withdrawing this submission. ")}<br/><br/>
              {L("審査いただきありがとうございました。引き続き別物件でのご紹介をよろしくお願い申し上げます。",
                 "We appreciate the review and look forward to working with you on future referrals.")}
            </div>
          </Field>
          <Field label={L("関連書類 (任意)","Supporting document (optional)")}>
            <div className="border-2 border-dashed border-[#CBD5E1] rounded-md p-3 text-center text-[#94A3B8] text-[11.5px]">
              <Icon.Paperclip s={16} stroke="#94A3B8" style={{ display:"block", margin:"0 auto 4px" }}/>
              {L("ドラッグ&ドロップまたはクリックして添付 (JPG / PDF · 最大10MB)","Drag & drop or click to attach · JPG/PDF · 10MB max")}
            </div>
          </Field>
          <label className="flex items-center gap-2.5 text-[12.5px] cursor-pointer">
            <span className="w-4 h-4 rounded bg-[#0F172A] flex items-center justify-center"><Icon.Check s={11} stroke="#fff"/></span>
            {L("お客様にも取り下げ完了の通知メールを送信","Email the customer about the withdrawal too")}
          </label>
        </>
      }
      secondary={{ label: L("理由に戻る","Back"), icon: Icon.ArrowLeft }} secondaryHref="11-my-applications-withdraw-step1-reason.html"
      primary={{ label: L("最終確認へ →","Next: review →"), iconRight: <Icon.ArrowRight s={12}/> }}
      primaryHref="11-my-applications-withdraw-step3-confirm.html" primaryKind="primary"/>
  }/>;
};

// Step 3 — Final confirm
window.ScreenB11Wd3 = function () {
  return <B11WdShell active={2} modal={
    <B11WdCard icon={Icon.AlertCircle}
      title={L("この内容で申込を取り下げますか？","Withdraw the application with these details?")}
      badge={L("取り消せません","Cannot be undone")}
      body={L("「取り下げる」を押すと管理会社への通知が即座に送信され、ステータスは「取り下げ済」になります。",
             "Clicking 'Withdraw' sends the notification immediately and the status becomes 'Withdrawn'.")}
      fields={
        <>
          {/* Review summary */}
          <div className="border border-[#E5E7EB] rounded-md overflow-hidden">
            <div className="px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E5E7EB] flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider">{L("送信内容のサマリ","Sent content")}</span>
              <a href="11-my-applications-withdraw-step1-reason.html"><Btn kind="link" size="sm" icon={Icon.Edit}>{L("編集","Edit")}</Btn></a>
            </div>
            <div className="grid grid-cols-2 gap-px bg-[#F1F5F9]">
              {[
                [L("申込","Application"), "A-2026-0526-001"],
                [L("申込者","Applicant"), L("山田 太郎 様","Mr. Yamada Taro")],
                [L("物件","Property"), L("青葉マンション 305","Aoba Mansion 305")],
                [L("審査状況","Review state"), L("管理会社 審査中 (3/5)","Mgmt review (3 of 5)")],
                [L("理由","Reason"), L("お客様が別物件で契約","Customer signed elsewhere")],
                [L("代替提案","Alternative"), L("なし","None")],
                [L("通知","Notifications"), L("管理会社 + お客様","Mgmt + customer")],
                [L("書類添付","Attachment"), L("なし","None")],
              ].map(([k, v], i) => (
                <div key={i} className="bg-white px-4 py-2.5">
                  <div className="text-[10.5px] uppercase tracking-wider text-[#94A3B8] font-semibold">{k}</div>
                  <div className="text-[12.5px] font-semibold mt-[2px]">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-actions */}
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8]">{L("自動アクション","Automated actions")}</div>
          <div className="space-y-1.5 text-[12.5px]">
            {[
              [L("管理会社 LENZ DX 本店 へ通知メールを送信","Email mgmt company LENZ DX HQ"), true],
              [L("お客様 山田 太郎 様 へ取り下げ通知を送信","Email Mr. Yamada about the withdrawal"), true],
              [L("申込ステータスを「取り下げ済」に変更","Set application status to 'Withdrawn'"), true],
              [L("内見予約 (今後) は維持","Keep upcoming viewings as-is"), true],
              [L("チャット履歴をアーカイブ","Archive chat history"), false],
            ].map(([n, on], i) => (
              <label key={i} className="flex items-center gap-2.5">
                <span className={`w-4 h-4 rounded ${on ? "bg-[#0F172A]" : "border border-[#CBD5E1]"} flex items-center justify-center`}>{on && <Icon.Check s={11} stroke="#fff"/>}</span>
                {n}
              </label>
            ))}
          </div>

          {/* Type-to-confirm */}
          <Field label={L("確認のため「取り下げ」と入力","Type 'withdraw' to confirm")}>
            <Input value={window.isJP() ? "取り下げ" : "withdraw"} placeholder={window.isJP() ? "取り下げ" : "withdraw"}/>
          </Field>
        </>
      }
      foot={<><Icon.Info s={12}/> {L("審査中の場合、管理会社の評価 (NPS) に影響する可能性があります","If review was in progress, this may impact your NPS with the mgmt company")}</>}
      secondary={{ label: L("詳細に戻る","Back"), icon: Icon.ArrowLeft }} secondaryHref="11-my-applications-withdraw-step2-details.html"
      primary={{ label: L("取り下げる","Withdraw application") }}
      primaryKind="danger"/>
  }/>;
};

// Legacy alias — the original B11.a slug now redirects to the first step
window.ScreenB11WithdrawModal = window.ScreenB11Wd1;

// ══════════════════════════════ BROKER — DISCARD APPLICATION DRAFT (B9 context) ══════════════════════════════
window.ScreenB9DiscardModal = function () {
  return <ModalScreen
    active="applications"
    crumbs={[L("ホーム","Home"), L("入居申込","Apply"), L("下書きを破棄","Discard draft")]}
    title={L("申込下書きを破棄","Discard application draft")}
    subtitle={L("ZOOM本郷 701 · Step 3 / 5 入力中","ZOOM Hongo 701 · drafting Step 3 of 5")}
    backHref="09-application-form-step3-emergency.html"
    modal={
      <ModalCard tone="warn" icon={Icon.AlertCircle}
        title={L("入力中の申込を破棄しますか？","Discard this application draft?")}
        body={L("入力済みの内容はすべて失われます。下書きは7日間自動保存されますが、破棄するとすぐに削除されます。",
                "All entered values will be lost. Drafts auto-save for 7 days; discarding removes them right away.")}
        primary={L("下書きを破棄","Discard draft")} primaryKind="danger"
        secondary={L("入力に戻る","Keep editing")}
        backHref="09-application-form-step3-emergency.html"
        fields={
          <>
            <div className="border border-[#FDE68A] bg-[#FEF3C7] rounded-md p-3 text-[12px] text-[#92400E]">
              <div className="font-semibold mb-2">{L("入力済みの内容","Already entered")}</div>
              <div className="grid grid-cols-3 gap-1.5 text-[11.5px]">
                {[
                  [L("Step 1 貴社情報","Step 1 Your firm"), true],
                  [L("Step 2 申込種別","Step 2 Application type"), true],
                  [L("Step 3 契約情報 (入力中)","Step 3 Contract info (drafting)"), "partial"],
                  [L("Step 4 保証","Step 4 Guarantor"),  false],
                  [L("Step 5 申込者情報","Step 5 Applicant info"), false],
                ].map(([n, st], i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    {st === true     && <Icon.CheckCircle s={11} stroke="#92400E"/>}
                    {st === "partial"&& <Icon.Clock s={11} stroke="#92400E"/>}
                    {st === false    && <span className="w-[11px] h-[11px] rounded-full border border-[#92400E]/40 inline-block"/>}
                    <span className={st ? "" : "opacity-60"}>{n}</span>
                  </div>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2.5 text-[12.5px] cursor-pointer">
              <span className="w-4 h-4 rounded border border-[#CBD5E1]"/>
              {L("お客様に下書きを取り消したことをチャットで連絡する","Notify the customer via chat that the draft was discarded")}
            </label>
          </>
        }
        foot={<><Icon.Save s={12}/> {L("代わりに「下書きに保存」を選ぶこともできます","You can save as a draft instead to resume later")}</>}
      />
    }/>;
};
window.ScreenM14ArchiveModal = function () {
  return <ModalScreen
    active="applications"
    crumbs={[L("ホーム","Home"), L("入居申込","Applications"), "A-2026-0526-001", L("アーカイブ","Archive")]}
    title={L("申込をアーカイブ — 山田 太郎 様","Archive application — Mr. Yamada Taro")}
    subtitle={L("青葉マンション 305 · 承認済 (5/26)","Aoba Mansion 305 · approved 5/26")}
    backHref="14-application-detail-step5-approved.html"
    modal={
      <ModalCard tone="ok" icon={Icon.Folder}
        title={L("この申込をアーカイブしますか？","Archive this application?")}
        body={L("申込は読み取り専用となり、ステータスの変更・編集ができなくなります。検索や月次レポートには引き続き含まれます。",
                "The application becomes read-only. Status changes and edits are disabled. It still appears in search and monthly reports.")}
        primary={L("アーカイブする","Archive")} primaryKind="primary"
        backHref="14-application-detail-step5-approved.html"
        fields={
          <>
            <Field label={L("アーカイブ理由","Archive reason")}>
              <Select value={L("成約 (契約締結済)","Closed (contract signed)")}/>
            </Field>
            <Field label={L("社内メモ (任意)","Internal note (optional)")}>
              <div className="border border-[#CBD5E1] rounded-md p-3 text-[13px] text-[#475569] min-h-[72px]">
                {L("契約締結 (6/15 予定)。鍵渡しは 6/28。","Contract signing scheduled 6/15. Key handover 6/28.")}
              </div>
            </Field>
            <label className="flex items-center gap-2.5 text-[12.5px] cursor-pointer">
              <span className="w-4 h-4 rounded bg-[#0F172A] flex items-center justify-center"><Icon.Check s={11} stroke="#fff"/></span>
              {L("申込者・仲介にアーカイブ完了の通知を送信","Notify applicant and broker of archival")}
            </label>
          </>
        }
      />
    }/>;
};
