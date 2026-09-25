// _shared/screens/broker-1-b4.jsx — B4 検索結果（リスト）(rebuilt 2026-08-20)
// Delivers: B-3 図面ダウンロード button with the 帯情報 (元付 / 自社) popover before output.

const { Icon, Card, CardHead, Btn, Tag, Field, Input, Select, PhotoPh, BrokerShell } = window;
const L = window.L;

// [name, room, company, rent, fee, layout, area, station, walk, built, canView, canApply]
const B4_ROWS = () => [
  ["ZOOM本郷", "701", L("株式会社LENZ DX","LENZ DX Co."), "262,000", "20,000", "2LDK", "41.74", L("本郷三丁目","Hongo-sanchome"), "3", "2013", true,  true],
  ["ZOOM本郷", "305", L("株式会社LENZ DX","LENZ DX Co."), "138,000", "12,000", "1K",   "26.00", L("本郷三丁目","Hongo-sanchome"), "3", "2013", true,  false],
  [L("青葉マンション","Aoba Mansion"), "305", L("青葉管理サービス","Aoba Management"), "184,000", "10,000", "1LDK", "44.10", L("洗足池","Senzokuike"), "6", "2020", true, true],
  [L("吉祥寺パークレジデンス","Kichijoji Park Residence"), "501", L("株式会社LENZ DX","LENZ DX Co."), "208,000", "15,000", "2DK", "48.20", L("吉祥寺","Kichijoji"), "8", "2018", true, true],
  [L("中野グリーンハイツ","Nakano Green Heights"), "305", L("グリーン住宅管理","Green Housing"), "148,000", "8,000", "1DK", "32.50", L("中野","Nakano"), "11", "2009", false, false],
  [L("メゾン白金","Maison Shirokane"), "102", L("三田管理","Mita Management"), "348,000", "22,000", "2LDK", "65.00", L("白金台","Shirokanedai"), "4", "2021", false, true],
  [L("パークサイド代沢","Parkside Daizawa"), "401", L("株式会社LENZ DX","LENZ DX Co."), "412,000", "25,000", "3LDK", "78.50", L("池ノ上","Ikenoue"), "5", "2017", true, true],
  [L("カーサ恵比寿","Casa Ebisu"), "203", L("恵比寿ハウジング","Ebisu Housing"), "218,000", "14,000", "1LDK", "38.80", L("恵比寿","Ebisu"), "7", "2019", true, false],
  [L("ヒルズ青山","Hills Aoyama"), "805", L("青山レジデンス","Aoyama Residence"), "118,000", "9,000", "1R", "22.00", L("外苑前","Gaienmae"), "9", "2016", true, true],
  [L("青葉マンション","Aoba Mansion"), "402", L("青葉管理サービス","Aoba Management"), "179,000", "10,000", "1LDK", "44.10", L("洗足池","Senzokuike"), "6", "2020", true, true],
];

const B4_FILTERS = () => [L("東京都","Tokyo"), L("文京区","Bunkyo"), L("徒歩10分以内","Within 10 min"), "1LDK / 2LDK", L("¥50,000〜150,000","¥50k–150k"), L("ペット可","Pets OK"), "ZOOM RENT"];

window.ScreenB4Results = function () {
  const rows = B4_ROWS();
  const [sel, setSel] = React.useState([0, 3, 6]);
  const [fav, setFav] = React.useState([0]);
  const [obi, setObi] = React.useState(null);     // B-3 帯情報 popover (row index)
  const [obiPick, setObiPick] = React.useState("moto");
  const [filters, setFilters] = React.useState(B4_FILTERS());

  const tog = (set, v) => set(x => x.indexOf(v) >= 0 ? x.filter(y => y !== v) : x.concat([v]));
  const compare = sel.slice(0, 3).map(i => rows[i]);
  const showCompare = sel.length >= 2;

  return (
    <BrokerShell active="search"
      crumbs={[L("物件検索","Search"), L("検索結果","Results")]}
      title={L("検索結果","Search results")}
      subtitle={L("条件検索から127件・リスト表示","127 matches from the filter search · list view")}
      actions={<>
        <div className="flex items-center bg-white border border-[#E5E7EB] rounded-md p-[2px]">
          <a href="02-search-filter.html" className="w-7 h-7 rounded flex items-center justify-center text-[#475569] hover:bg-[#F7F8FA]"><Icon.Grid s={13}/></a>
          <span className="w-7 h-7 rounded flex items-center justify-center bg-[#0F172A]"><Icon.List s={13} stroke="#fff"/></span>
          <a href="03-search-map.html" className="w-7 h-7 rounded flex items-center justify-center text-[#475569] hover:bg-[#F7F8FA]"><Icon.Map s={13}/></a>
        </div>
        <div className="w-[150px]"><Select value={L("賃料安い順","Rent: low to high")}/></div>
        <Btn kind={sel.length >= 2 ? "primary" : "ghost"} icon={Icon.Chart}>{L(`比較する (${sel.length})`, `Compare (${sel.length})`)}</Btn>
      </>}>

      <div className="grid gap-4 items-start" style={{ gridTemplateColumns: showCompare ? "repeat(auto-fit,minmax(300px,1fr))" : "minmax(0,1fr)" }}>

        <div className="min-w-0 space-y-3">
          {/* applied filters */}
          <Card className="px-3.5 py-2.5 flex items-center gap-2 flex-wrap">
            <span className="text-[13px] text-[#0F172A] whitespace-nowrap"><b className="text-[16px] tabnum">127</b> {L("件の物件","properties")}</span>
            <span className="w-px h-4 bg-[#E5E7EB] mx-1"/>
            {filters.map(f => (
              <span key={f} className="inline-flex items-center gap-1 pl-2 pr-1 py-[3px] rounded-full bg-[#F1F5F9] border border-[#E5E7EB] text-[11px] text-[#475569] whitespace-nowrap">
                {f}<button onClick={() => setFilters(fs => fs.filter(x => x !== f))} className="text-[#94A3B8] hover:text-[#0F172A]"><Icon.X s={10}/></button>
              </span>
            ))}
            <a href="02-search-filter.html" className="text-[11px] text-[#0F172A] underline whitespace-nowrap ml-1">{L("条件を変更","Edit filters")}</a>
          </Card>

          {/* dense rows */}
          <Card className="overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="px-3 py-1.5 bg-[#F7F8FA] border-b border-[#E5E7EB] flex items-center gap-3 text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                <span className="w-4"/>
                <span className="w-[72px]">{L("写真","Photo")}</span>
                <span className="flex-1 min-w-[150px]">{L("物件名・管理会社","Property & company")}</span>
                <span className="w-[104px] text-right">{L("賃料 / 管理費","Rent / fee")}</span>
                <span className="w-[86px]">{L("間取り / 面積","Layout / area")}</span>
                <span className="w-[104px]">{L("駅 / 徒歩","Station / walk")}</span>
                <span className="w-[44px] text-right">{L("築年","Built")}</span>
                <span className="w-[112px]">{L("状態","Status")}</span>
                <span className="w-[168px]">{L("操作","Actions")}</span>
              </div>
              {rows.map(([name, room, company, rent, fee, layout, area, station, walk, built, canView, canApply], i) => {
                const on = sel.indexOf(i) >= 0;
                return (
                  <div key={i} className={`px-3 py-2 flex items-center gap-3 border-b last:border-0 border-[#F1F5F9] relative ${on ? "bg-[#F1F5F9]" : "hover:bg-[#F8FAFC]"}`}>
                    <button onClick={() => tog(setSel, i)}
                      className={`w-4 h-4 rounded border inline-flex items-center justify-center shrink-0 ${on ? "bg-[#0F172A] border-[#0F172A]" : "bg-white border-[#CBD5E1]"}`}>
                      {on && <Icon.Check s={10} stroke="#fff"/>}
                    </button>
                    <div className="w-[72px] shrink-0"><PhotoPh w={72} h={54} tone={i} kind={i % 3 === 0 ? "exterior" : "room"}/></div>
                    <div className="flex-1" style={{ minWidth: 150 }}>
                      <a href="05-property-detail.html" className="text-[12.5px] font-semibold text-[#0F172A] hover:underline">{name} {room}</a>
                      <div className="text-[10.5px] text-[#94A3B8] truncate">{company}</div>
                    </div>
                    <div className="w-[104px] shrink-0 text-right">
                      <div className="text-[13.5px] font-bold text-[#0F172A] tabnum">¥{rent}</div>
                      <div className="text-[10px] text-[#64748B] tabnum">{L(`管理費 ¥${fee}`, `+¥${fee}`)}</div>
                    </div>
                    <div className="w-[86px] shrink-0 text-[11.5px] text-[#475569] tabnum">
                      <div className="font-medium text-[#0F172A]">{layout}</div>
                      <div>{area}㎡</div>
                    </div>
                    <div className="w-[104px] shrink-0 text-[11.5px] text-[#475569]">
                      <div className="truncate">{station}</div>
                      <div className="tabnum text-[10.5px] text-[#64748B]">{L(`徒歩${walk}分`, `${walk} min`)}</div>
                    </div>
                    <div className="w-[44px] shrink-0 text-right text-[11.5px] text-[#475569] tabnum">{built}</div>
                    <div className="w-[112px] shrink-0 flex flex-col gap-1">
                      {canView ? <Tag tone="ok" size="sm">{L("内見可","Viewable")}</Tag> : <Tag tone="neutral" size="sm">{L("内見不可","No viewing")}</Tag>}
                      {canApply ? <Tag tone="neutral" size="sm">{L("申込可","Applicable")}</Tag> : <Tag tone="outline" size="sm">{L("申込不可","No apply")}</Tag>}
                    </div>
                    <div className="w-[168px] shrink-0 flex items-center gap-1 flex-wrap">
                      <a href="12-chat.html" className="h-6 px-1.5 rounded border border-[#E5E7EB] text-[10px] text-[#475569] hover:bg-[#F1F5F9] inline-flex items-center gap-1"><Icon.Chat s={10}/>{L("メッセージ","Message")}</a>
                      {canView
                        ? <a href="07-viewing-booking.html" className="h-6 px-1.5 rounded border border-[#E5E7EB] text-[10px] text-[#475569] hover:bg-[#F1F5F9] inline-flex items-center gap-1"><Icon.Calendar s={10}/>{L("内見","Viewing")}</a>
                        : <span title={L("管理会社が内見を許可していません","Viewings not permitted by the management company")} className="h-6 px-1.5 rounded border border-[#F1F5F9] text-[10px] text-[#CBD5E1] inline-flex items-center gap-1 cursor-not-allowed"><Icon.Calendar s={10} stroke="#CBD5E1"/>{L("内見","Viewing")}</span>}
                      {canApply
                        ? <a href="09-application-form-step1-applicant.html" className="h-6 px-1.5 rounded border border-[#E5E7EB] text-[10px] text-[#475569] hover:bg-[#F1F5F9] inline-flex items-center gap-1"><Icon.FileText s={10}/>{L("申込","Apply")}</a>
                        : <span title={L("管理会社が申込を許可していません","Applications not permitted by the management company")} className="h-6 px-1.5 rounded border border-[#F1F5F9] text-[10px] text-[#CBD5E1] inline-flex items-center gap-1 cursor-not-allowed"><Icon.FileText s={10} stroke="#CBD5E1"/>{L("申込","Apply")}</span>}
                      {/* B-3 — 図面 download with the 帯情報 choice */}
                      <button onClick={() => setObi(obi === i ? null : i)}
                        className={`h-6 px-1.5 rounded border text-[10px] inline-flex items-center gap-1 ${obi === i ? "bg-[#0F172A] text-white border-[#0F172A]" : "border-[#E5E7EB] text-[#475569] hover:bg-[#F1F5F9]"}`}>
                        <Icon.Download s={10} stroke={obi === i ? "#fff" : "#475569"}/>{L("図面","Sheet")}
                      </button>
                      <button onClick={() => tog(setFav, i)} className="w-6 h-6 rounded flex items-center justify-center">
                        <Icon.Star s={13} stroke={fav.indexOf(i) >= 0 ? "#F59E0B" : "#CBD5E1"}/>
                      </button>
                      <a href="05-property-detail.html" className="h-6 px-2 rounded bg-[#0F172A] text-white text-[10px] inline-flex items-center">{L("詳細","Detail")}</a>
                    </div>

                    {obi === i && (
                      <div className="fixed inset-0 z-40 flex items-center justify-center p-6" style={{ background: "rgba(15,23,42,0.45)" }} onClick={() => setObi(null)}>
                      <div onClick={e => e.stopPropagation()} className="w-[280px] max-w-full bg-white border border-[#E5E7EB] rounded-md p-3.5" style={{ boxShadow: "0 18px 50px rgba(15,23,42,0.30)" }}>
                        <div className="text-[10.5px] text-[#94A3B8] mb-1 truncate">{name} {room}</div>
                        <div className="text-[11.5px] font-semibold text-[#0F172A] mb-1.5">{L("帯情報を選択","Choose the footer band")}</div>
                        <div className="space-y-1.5">
                          {[["moto", L("元付会社の帯","Listing agency band"), L("管理会社の連絡先を印字","prints the management company")],
                            ["own",  L("自社（仲介会社）の帯","Our own band"), L("貴社名・連絡先を印字","prints your firm's details")]].map(([k, label, sub]) => (
                            <label key={k} onClick={() => setObiPick(k)} className="flex items-start gap-2 cursor-pointer">
                              <span className={`w-3.5 h-3.5 rounded-full border mt-[2px] flex items-center justify-center shrink-0 ${obiPick === k ? "border-[#0F172A]" : "border-[#CBD5E1]"}`}>
                                {obiPick === k && <span className="w-2 h-2 rounded-full bg-[#0F172A]"/>}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[11.5px] text-[#0F172A]">{label}</span>
                                <span className="block text-[10px] text-[#94A3B8]">{sub}</span>
                              </span>
                            </label>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-[#F1F5F9]">
                          <button onClick={() => setObi(null)} className="text-[11px] text-[#475569] hover:text-[#0F172A]">{L("キャンセル","Cancel")}</button>
                          <button onClick={() => setObi(null)} className="ml-auto h-7 px-2.5 rounded-md bg-[#0F172A] text-white text-[11px] font-semibold inline-flex items-center gap-1">
                            <Icon.Download s={11} stroke="#fff"/>{L("図面をダウンロード","Download sheet")}
                          </button>
                        </div>
                      </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
          <div className="text-[11.5px] text-[#64748B] tabnum px-1">{L("127件中 1–10件表示","1–10 of 127")}</div>
        </div>

        {/* ══ compare rail ══ */}
        {showCompare && (
          <div className="self-start sticky top-4">
            <Card className="overflow-hidden">
              <CardHead title={L("比較","Compare")} sub={L(`${compare.length}件を比較中`, `${compare.length} properties`)}
                action={<button onClick={() => setSel([])} className="text-[11px] text-[#475569] hover:text-[#0F172A]">{L("クリア","Clear")}</button>}/>
              <div className="overflow-x-auto">
                <table className="w-full text-[11.5px]">
                  <thead>
                    <tr className="bg-[#F8FAFC]">
                      <th className="px-2 py-2 text-left font-semibold text-[10px] uppercase tracking-wider text-[#94A3B8] w-[70px]">{L("項目","Field")}</th>
                      {compare.map((r, i) => (
                        <th key={i} className="px-2 py-2 text-left">
                          <div className="text-[11px] font-semibold text-[#0F172A] leading-snug">{r[0]}</div>
                          <div className="text-[10px] text-[#94A3B8] tabnum">{r[1]}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [L("賃料","Rent"),        (r) => "¥" + r[3]],
                      [L("間取り","Layout"),     (r) => r[5]],
                      [L("面積","Area"),         (r) => r[6] + "㎡"],
                      [L("駅徒歩","Walk"),       (r) => L(`${r[7]} ${r[8]}分`, `${r[7]} ${r[8]}m`)],
                      [L("築年","Built"),        (r) => r[9]],
                      [L("敷金","Deposit"),      () => L("1.00ヶ月","1.00 mo")],
                      [L("礼金","Key money"),    () => L("1.00ヶ月","1.00 mo")],
                      [L("設備一致度","Equipment match"), (r, i) => [92, 78, 85][i] + "%"],
                    ].map(([label, fn], k) => (
                      <tr key={k} className="border-t border-[#F1F5F9]">
                        <td className="px-2 py-1.5 text-[10.5px] text-[#64748B] whitespace-nowrap">{label}</td>
                        {compare.map((r, i) => (
                          <td key={i} className="px-2 py-1.5 text-[#0F172A] tabnum whitespace-nowrap">{fn(r, i)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-3 py-3 border-t border-[#F1F5F9] bg-[#F8FAFC] flex flex-col gap-2">
                <Btn kind="ghost" size="sm" full icon={Icon.Print}>{L("比較レポートを印刷","Print comparison")}</Btn>
                <Btn kind="primary" size="sm" full icon={Icon.Send}>{L("顧客へ送信","Send to customer")}</Btn>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* sticky bottom bar */}
      {sel.length > 0 && (
        <div className="fixed bottom-0 left-[240px] right-0 z-30 bg-[#0F172A] text-white px-6 h-[56px] flex items-center gap-3"
             style={{ boxShadow: "0 -8px 24px rgba(15,23,42,0.20)" }}>
          <span className="text-[13px] font-semibold tabnum whitespace-nowrap">{L(`${sel.length}件 選択中`, `${sel.length} selected`)}</span>
          <button onClick={() => setSel([])} className="text-[11.5px] text-white/60 hover:text-white underline whitespace-nowrap">{L("選択解除","Clear")}</button>
          <div className="ml-auto flex items-center gap-2 flex-wrap justify-end">
            <button className="h-9 px-3 rounded-md text-[12.5px] font-medium bg-white/10 hover:bg-white/20 inline-flex items-center gap-1.5 whitespace-nowrap"><Icon.Chart s={13} stroke="#fff"/>{L("比較","Compare")}</button>
            <button className="h-9 px-3 rounded-md text-[12.5px] font-medium bg-white/10 hover:bg-white/20 inline-flex items-center gap-1.5 whitespace-nowrap"><Icon.Star s={13} stroke="#fff"/>{L("お気に入り","Favourite")}</button>
            <button className="h-9 px-3 rounded-md text-[12.5px] font-medium bg-white/10 hover:bg-white/20 inline-flex items-center gap-1.5 whitespace-nowrap"><Icon.Send s={13} stroke="#fff"/>{L("顧客へ送信","Send to customer")}</button>
            <a href="07-viewing-booking.html" className="h-9 px-3 rounded-md text-[12.5px] font-semibold bg-[#F59E0B] text-[#0F172A] inline-flex items-center gap-1.5 whitespace-nowrap"><Icon.Calendar s={13}/>{L("内見予約（一括）","Book viewings")}</a>
          </div>
        </div>
      )}
      <div className="h-16"/>
    </BrokerShell>
  );
};
