// _shared/screens/management-2.jsx — M6 Transaction, M7 Listing-info, M8 Images(36-point), M9 Panorama, M10 Equipment modal

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, Stat, Tabs, PhotoPh, Avatar, AppShell } = window;
const L = window.L;

const propTabs = () => [L("概要","Overview"), L("建物","Building"), L("部屋","Room"), L("取引","Transaction"), L("掲載情報","Listing info"), L("画像","Images"), L("パノラマ","Panorama"), L("設備","Equipment")];

// M6 取引情報 → moved to _shared/screens/management-2-m6.jsx (rebuild 2026-08-20)

// M7 掲載情報等 → moved to _shared/screens/management-2-m7.jsx (rebuild 2026-08-20)

// M8 画像 → moved to _shared/screens/management-2-m8.jsx (rebuild 2026-08-20)

// ══════════════════════════════ M9 — PANORAMA / VIDEO ══════════════════════════════
window.ScreenM9Panorama = function () {
  // §M9 ADD: パノラマ掲載媒体 channels (large checkboxes + per-channel counts)
  const channels = [
    [L("自社HP","Own HP"), 157, true],
    ["SUUMO", 99, true],
    [L("独自","Own portal"), 129, true],
    [L("独自 TypeII","Own TypeII"), 152, false],
  ];
  // §M9 ADD: panorama images split into 建物 / 部屋
  const buildingPanos = [
    [L("外観","Exterior"), L("正面外観","Front exterior"), 1],
    [L("エントランス","Entrance"), L("オートロックエントランス","Auto-lock entrance"), 2],
    [L("共用部","Common area"), L("メールコーナー","Mail corner"), 3],
  ];
  const roomPanos = [
    [L("ダイニング","Dining"), L("ダイニング全景","Dining overview"), 1],
    [L("キッチン","Kitchen"), L("システムキッチン","System kitchen"), 2],
    [L("風呂画像","Bath"), L("浴室","Bathroom"), 3],
    [L("洗面所","Washroom"), L("洗面・脱衣所","Washroom"), 4],
  ];
  const panoTypes = [L("外観","Exterior"), L("エントランス","Entrance"), L("共用部","Common"), L("リビング","Living"), L("洋室","Bedroom"), L("キッチン","Kitchen"), L("バルコニー","Balcony")];

  const PanoRow = ({ typeLabel, heading, tone, kind }) => (
    <div className="flex items-center gap-3 p-2.5 rounded-md border border-[#E5E7EB]">
      <div className="relative shrink-0">
        <PhotoPh w={96} h={60} kind={kind} tone={tone}/>
        <span className="absolute top-1 left-1 px-1.5 py-[1px] rounded bg-black/55 text-white text-[9px] font-semibold">360°</span>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2.5">
        <Field label={L("種別","Type")}><Select value={typeLabel}/></Field>
        <Field label={L("見出し","Heading")}><Input value={heading}/></Field>
      </div>
      <button className="w-8 h-8 rounded-md border border-[#E5E7EB] bg-white flex items-center justify-center text-[#94A3B8] hover:text-[#DC2626] hover:border-[#FECACA] shrink-0"><Icon.Trash s={13}/></button>
    </div>
  );

  return (
    <AppShell active="properties"
      crumbs={[L("ホーム","Home"), L("物件","Properties"), "ZOOM本郷 701"]}
      title={L("パノラマ / 動画","Panorama / Video")}
      subtitle={L("360°パノラマ・動画・VRの登録と掲載媒体の設定","Register 360° panoramas, video & VR and set publishing channels")}
      actions={<><Btn kind="ghost" icon={Icon.Eye}>{L("プレビュー","Preview")}</Btn><Btn kind="accent" icon={Icon.Save}>{L("保存","Save")}</Btn></>}>
      <div className="mb-5"><Tabs tabs={propTabs()} active={6}/></div>

      <div className="grid grid-cols-[1fr_340px] gap-5 pb-20">
        <div className="space-y-5">
          {/* §M9 ADD: 動画・VR (ウェブサイトFlex専用) */}
          <Card>
            <CardHead title={L("動画・VR","Video & VR")}
              action={<Tag tone="dark" size="md">{L("ウェブサイトFlex専用","Website Flex only")}</Tag>}/>
            <div className="p-5 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Field label={L("YouTube URL","YouTube URL")}>
                  <Input value="https://www.youtube.com/embed/U4cwG9B-P3c" prefix={<Icon.Play s={12} stroke="#94A3B8"/>}/>
                </Field>
              </div>
              <div className="col-span-2 rounded-md overflow-hidden border border-[#E5E7EB]">
                <div className="relative bg-[#0F172A] flex items-center justify-center" style={{ aspectRatio: "16/9" }}>
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"><Icon.Play s={24} stroke="#0F172A"/></div>
                  <span className="absolute bottom-2 left-2 text-[10.5px] text-white/80">{L("YouTube 埋め込みプレビュー","YouTube embed preview")}</span>
                </div>
              </div>
              <Field label={L("パノラマVR URL","Panorama VR URL")}><Input value="https://my.matterport.com/show/?m=zoom701" prefix={<Icon.Globe s={12} stroke="#94A3B8"/>}/></Field>
              <Field label={L("動画タイトル","Video title")}><Input value={L("ZOOM本郷701 ルームツアー","ZOOM Hongo 701 room tour")}/></Field>
              <div className="col-span-2">
                <Field label={L("動画説明","Video description")}>
                  <textarea className="w-full border border-[#CBD5E1] rounded-md p-2.5 text-[13px] leading-relaxed min-h-[72px] resize-none outline-none focus:border-[#0F172A]"
                    defaultValue={L("南東角部屋のルームツアー。LDK→洋室→バルコニーの順にご案内します。","Room tour of the SE corner unit: LDK → bedroom → balcony.")}/>
                </Field>
              </div>
            </div>
          </Card>

          {/* §M9 ADD: 建物パノラマ */}
          <Card>
            <CardHead title={L("建物パノラマ","Building panoramas")} action={<span className="text-[11px] text-[#94A3B8] tabnum">3 {L("枚","items")}</span>}/>
            <div className="p-4 space-y-2.5">
              {buildingPanos.map(([t, h, tone], i) => <PanoRow key={i} typeLabel={t} heading={h} tone={tone} kind="exterior"/>)}
            </div>
          </Card>

          {/* §M9 ADD: 部屋パノラマ */}
          <Card>
            <CardHead title={L("部屋パノラマ","Room panoramas")} action={<span className="text-[11px] text-[#94A3B8] tabnum">4 {L("枚","items")}</span>}/>
            <div className="p-4 space-y-2.5">
              {roomPanos.map(([t, h, tone], i) => <PanoRow key={i} typeLabel={t} heading={h} tone={tone} kind="room"/>)}
            </div>
          </Card>

          {/* §M9 ADD: drag-and-drop zone */}
          <div className="border-2 border-dashed border-[#CBD5E1] rounded-lg p-8 flex flex-col items-center justify-center text-center gap-2 text-[#94A3B8] bg-[#F8FAFC]">
            <Icon.Upload s={26} stroke="#94A3B8"/>
            <div className="text-[13px] font-medium text-[#475569]">{L("ここにパノラマファイルをドロップ","Drop panorama files here")}</div>
            <div className="text-[11.5px]">{L("対応形式: .jpg / .insp / .insv","Supported: .jpg / .insp / .insv")}</div>
            <Btn kind="ghost" size="sm" icon={Icon.Plus} style={{ marginTop: 4 }}>{L("ファイルを選択","Choose files")}</Btn>
          </div>
        </div>

        {/* ── Right rail ── */}
        <div className="space-y-5">
          {/* §M9 ADD: パノラマ掲載媒体 */}
          <Card>
            <CardHead title={L("パノラマ掲載媒体","Panorama channels")}/>
            <div className="p-4 space-y-2.5">
              {channels.map(([n, count, on], i) => (
                <label key={i} className={"flex items-center gap-3 p-3 rounded-md border cursor-pointer " + (on ? "border-[#0F172A] bg-[#F7F8FA]" : "border-[#E5E7EB] hover:bg-[#F8FAFC]")}>
                  <span className={"w-5 h-5 rounded flex items-center justify-center shrink-0 " + (on ? "bg-[#0F172A]" : "border border-[#CBD5E1]")}>{on && <Icon.Check s={13} stroke="#fff"/>}</span>
                  <span className="flex-1 text-[13px] font-medium text-[#0F172A]">{n}</span>
                  <span className="text-[11px] text-[#94A3B8] tabnum">{count} {L("件掲載中","listed")}</span>
                </label>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-[#F1F5F9] text-[11px] text-[#94A3B8] leading-snug">
              {L("媒体ごとに掲載可能なパノラマ枚数・形式が異なります。自社HPは全形式対応、ポータルは360° JPEGのみ対応です。","Each channel supports different panorama counts/formats. Own HP supports all; portals support 360° JPEG only.")}
            </div>
          </Card>
        </div>
      </div>

      {/* §M9 ADD: STICKY BOTTOM TOOLBAR */}
      <div className="fixed bottom-0 left-[240px] right-0 bg-white border-t border-[#E5E7EB] px-6 py-3 flex items-center gap-3 z-30"
           style={{ boxShadow: "0 -4px 16px rgba(15,23,42,0.06)" }}>
        <div className="flex items-center gap-2 text-[11.5px] text-[#475569]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"/>
          <span>{L("パノラマ 7枚 · 動画 1本 · VR 1件","7 panoramas · 1 video · 1 VR")}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Btn kind="ghost" size="md" icon={Icon.Print}>{L("印刷","Print")}</Btn>
          <Btn kind="ghost" size="md" icon={Icon.Eye}>{L("プレビュー","Preview")}</Btn>
          <Btn kind="accent" size="md" icon={Icon.Save}>{L("保存","Save")}</Btn>
          <a href="11-publish-controls.html">
            <button className="inline-flex items-center gap-1.5 rounded-md font-semibold h-9 px-4 text-[13px] bg-white text-[#D97706] border-2 border-[#F59E0B] hover:bg-[#FEF3C7]">
              <Icon.Upload s={14} stroke="#D97706"/>
              {L("出稿","Publish")}
            </button>
          </a>
        </div>
      </div>

      {/*
        🔔 Proposed addition (GATED — not rendered):
          • 360° interactive viewer (equirectangular grid, draggable hotspots, HUD, playback
            scrubber, Matterport sync chip). Heavy interactive surface — proposed for a
            dedicated full-screen viewer (M9b) rather than the editor. Restore the live
            viewer here if customers want inline 360° preview while editing.
      */}
    </AppShell>
  );
};

// M10 設備編集モーダル → moved to _shared/screens/management-2-m10.jsx (rebuild 2026-08-20)
