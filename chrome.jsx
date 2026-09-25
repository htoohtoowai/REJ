// chrome.jsx — Browser frame, top bar, sidebar, icons, helpers shared across all dashboard states.
// Loaded as a Babel script. Exposes its components onto window for dashboard.jsx to consume.

// ─────────────────────────── ICONS ───────────────────────────
// Tiny inline SVG icons (lucide-style, 1.75 stroke). We keep a focused set.
const I = ({ d, s = 16, sw = 1.75, fill = "none", stroke = "currentColor", style }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw}
       strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
    {d}
  </svg>
);

const Icon = {
  Home: (p) => <I {...p} d={<><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/></>} />,
  Building: (p) => <I {...p} d={<><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2"/></>} />,
  Calendar: (p) => <I {...p} d={<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></>} />,
  FileText: (p) => <I {...p} d={<><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/></>} />,
  Chat: (p) => <I {...p} d={<><path d="M21 12a8 8 0 1 1-3.6-6.7L21 4l-1 4.4A8 8 0 0 1 21 12Z"/></>} />,
  Upload: (p) => <I {...p} d={<><path d="M12 16V4M6 10l6-6 6 6"/><path d="M4 20h16"/></>} />,
  Download: (p) => <I {...p} d={<><path d="M12 4v12M6 14l6 6 6-6"/><path d="M4 4h16"/></>} />,
  Chart: (p) => <I {...p} d={<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>} />,
  Settings: (p) => <I {...p} d={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 4.7 15a1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></>} />,
  Search: (p) => <I {...p} d={<><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>} />,
  Bell: (p) => <I {...p} d={<><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 21a2 2 0 0 0 4 0"/></>} />,
  ArrowUp: (p) => <I {...p} d={<><path d="M12 19V5M5 12l7-7 7 7"/></>} />,
  ArrowDown: (p) => <I {...p} d={<><path d="M12 5v14M5 12l7 7 7-7"/></>} />,
  ArrowRight: (p) => <I {...p} d={<><path d="M5 12h14M13 5l7 7-7 7"/></>} />,
  ChevronRight: (p) => <I {...p} d={<path d="M9 6l6 6-6 6"/>} />,
  ChevronDown: (p) => <I {...p} d={<path d="M6 9l6 6 6-6"/>} />,
  ChevronLeft: (p) => <I {...p} d={<path d="M15 6l-6 6 6 6"/>} />,
  Refresh: (p) => <I {...p} d={<><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></>} />,
  External: (p) => <I {...p} d={<><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></>} />,
  Lock: (p) => <I {...p} d={<><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>} />,
  Plus: (p) => <I {...p} d={<><path d="M12 5v14M5 12h14"/></>} />,
  Check: (p) => <I {...p} d={<path d="M4 12l5 5L20 6"/>} />,
  X: (p) => <I {...p} d={<><path d="M6 6l12 12M18 6 6 18"/></>} />,
  Alert: (p) => <I {...p} d={<><path d="M12 2 2 21h20Z"/><path d="M12 9v5M12 18v.5"/></>} />,
  Info: (p) => <I {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M12 8v.5M12 11v6"/></>} />,
  AlertCircle: (p) => <I {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16v.5"/></>} />,
  CheckCircle: (p) => <I {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></>} />,
  XCircle: (p) => <I {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></>} />,
  Sync: (p) => <I {...p} d={<><path d="M17 3a9 9 0 0 1 4 7"/><path d="M3 14a9 9 0 0 0 14 4"/><path d="M21 3v5h-5M3 21v-5h5"/></>} />,
  User: (p) => <I {...p} d={<><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>} />,
  Logout: (p) => <I {...p} d={<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></>} />,
  Eye: (p) => <I {...p} d={<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>} />,
  Menu: (p) => <I {...p} d={<><path d="M3 6h18M3 12h18M3 18h18"/></>} />,
  CalendarPlus: (p) => <I {...p} d={<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4M12 13v6M9 16h6"/></>} />,
  PieChart: (p) => <I {...p} d={<><path d="M21 12A9 9 0 1 1 12 3v9z"/></>} />,
  Filter: (p) => <I {...p} d={<path d="M3 5h18l-7 9v6l-4-2v-4z"/>} />,
  Activity: (p) => <I {...p} d={<path d="M3 12h4l3-9 4 18 3-9h4"/>} />,
};

// ─────────────────────────── BROWSER CHROME ───────────────────────────
function BrowserFrame({ url, width = 1440, children, caption }) {
  return (
    <div style={{ width }} className="mx-auto">
      <div className="rounded-lg overflow-hidden bg-white" style={{ boxShadow: "0 10px 30px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.05)" }}>
        {/* Chrome bar */}
        <div className="flex items-center px-3 border-b border-[#E5E7EB]" style={{ height: 40, background: "#E5E7EB" }}>
          <div className="flex items-center gap-2">
            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#FF5F57" }} />
            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#FEBC2E" }} />
            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#28C840" }} />
          </div>
          <div className="flex items-center gap-1 ml-4 text-[#64748B]">
            <Icon.ChevronLeft s={16} />
            <Icon.ChevronRight s={16} />
            <Icon.Refresh s={14} />
          </div>
          <div className="flex-1 mx-4">
            <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 mx-auto" style={{ maxWidth: 680 }}>
              <Icon.Lock s={12} stroke="#475569" />
              <span className="text-[12px] text-[#475569] truncate">{url}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#64748B]">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold text-white" style={{ background: "#0F172A" }}>田</div>
          </div>
        </div>
        {/* Viewport — auto-height, no scroll */}
        <div className="bg-[#F7F8FA]" style={{ minHeight: 100 }}>
          {children}
        </div>
      </div>
      {caption && (
        <div className="text-center text-[12px] text-[#94A3B8] mt-2 mb-1 tracking-wide">
          {caption}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────── TOP BAR ───────────────────────────
function TopBar({ searchFocused = false, searchEmpty = false, userMenuOpen = false, notifPanelOpen = false }) {
  const t = window.useT();
  // Search suggestions per language
  const sugg = t === window.STRINGS.jp ? [
    ["物件",     "ZOOM本郷 701号室 — 文京区本郷"],
    ["物件",     "ZOOM本郷 305号室 — 文京区本郷"],
    ["物件",     "ZOOM吉祥寺 501号室 — 武蔵野市吉祥寺本町"],
    ["申込者",   "山田 太郎 様 — 青葉マンション 305"],
    ["仲介会社", "FINDERS 吉祥寺店"],
  ] : [
    ["Property", "ZOOM Hongo Room 701 — Hongo, Bunkyo-ku"],
    ["Property", "ZOOM Hongo Room 305 — Hongo, Bunkyo-ku"],
    ["Property", "ZOOM Kichijoji Room 501 — Kichijojihoncho, Musashino-shi"],
    ["Applicant", "Mr. Yamada Taro — Aoba Mansion 305"],
    ["Broker",   "FINDERS Kichijoji"],
  ];
  const isJP = t === window.STRINGS.jp;
  const suggHeader = isJP ? "検索候補" : "Suggestions";
  const suggOpen   = isJP ? "開く"     : "open";
  const suggClose  = isJP ? "閉じる"   : "close";
  const notifHeader = isJP ? "通知"   : "Notifications";
  const notifUnread = isJP ? "(8件未読)" : "(8 unread)";
  const notifMarkAll = isJP ? "すべて既読にする" : "Mark all as read";
  const notifSeeAll = isJP ? "すべての通知を見る →" : "See all notifications →";
  const notifItems = isJP ? [
    { tone: "red",   title: "SUUMO 出稿失敗",     body: "ZOOM本郷 305 の SUUMO 出稿に失敗しました。画像が36ポイントルール違反です。", time: "14:38" },
    { tone: "blue",  title: "新規入居申込",     body: "山田 太郎 様 から 青葉マンション 305 への申込",                                  time: "14:15" },
    { tone: "blue",  title: "内見予約",         body: "FINDERS 吉祥寺店 が ZOOM本郷 701 を 18:00 に予約",                              time: "14:32" },
    { tone: "green", title: "SUUMO 出稿完了",   body: "5物件の出稿が完了しました",                                                       time: "13:50" },
  ] : [
    { tone: "red",   title: "SUUMO publish failed", body: "ZOOM Hongo 305 failed to publish on SUUMO — image violates the 36-point rule.", time: "14:38" },
    { tone: "blue",  title: "New application",     body: "Mr. Yamada Taro applied to Aoba Mansion 305",                                  time: "14:15" },
    { tone: "blue",  title: "Viewing booked",      body: "FINDERS Kichijoji booked ZOOM Hongo 701 at 18:00",                              time: "14:32" },
    { tone: "green", title: "SUUMO publish done",  body: "5 properties were published successfully",                                     time: "13:50" },
  ];
  const userName = isJP ? "田中 健一" : "Tanaka Kenichi";
  const userEmail = "tanaka.kenichi@lenz-dx.jp";
  const userOrgRole = isJP ? "株式会社 LENZ DX 本店 / 管理者" : "LENZ DX Co., Ltd. — Head Office / Administrator";
  const userOrgShort = isJP ? "LENZ DX 本店" : "LENZ DX Head Office";
  const userInitial = isJP ? "田" : "T";
  const menuItems = isJP
    ? [["プロフィール", Icon.User], ["アカウント設定", Icon.Settings], ["通知設定", Icon.Bell], ["ヘルプ・サポート", Icon.Info]]
    : [["Profile", Icon.User],     ["Account settings", Icon.Settings], ["Notification settings", Icon.Bell], ["Help & support", Icon.Info]];
  const logoutLabel = isJP ? "ログアウト" : "Log out";
  return (
    <div className="flex items-center px-5 border-b border-black/10 relative" style={{ height: 56, background: "#0F172A" }}>
      <div className="flex items-center gap-2 text-white">
        <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
          <span className="text-[13px] font-bold">L</span>
        </div>
        <span className="text-[15px] font-semibold tracking-wide">{t.brand.product}</span>
        <span className="text-[11px] px-1.5 py-[2px] rounded ml-1" style={{ background: "rgba(255,255,255,0.16)", color: "#E2E8F0" }}>{t.brand.role_badge}</span>
      </div>
      <div className="flex-1 mx-8 max-w-[560px] relative">
        <div className={`flex items-center gap-2 rounded-md px-3 ${searchFocused ? "bg-white" : "bg-white/12 hover:bg-white/20"}`}
             style={{ height: 36, boxShadow: searchFocused ? "0 0 0 2px rgba(245,158,11,0.55)" : "none" }}>
          <Icon.Search s={15} stroke={searchFocused ? "#475569" : "#E2E8F0"} />
          <input
            readOnly
            value={searchEmpty ? "" : (searchFocused ? "ZOOM本郷" : "")}
            placeholder={t.brand.search_placeholder}
            className={`bg-transparent outline-none text-[13px] flex-1 ${searchFocused ? "text-[#0F172A] placeholder:text-[#94A3B8]" : "text-white placeholder:text-white/70"}`}
          />
          <span className={`text-[11px] px-1.5 py-[2px] rounded border ${searchFocused ? "border-[#CBD5E1] text-[#64748B]" : "border-white/30 text-white/70"}`}>⌘K</span>
        </div>
        {/* Search suggestions when focused */}
        {searchFocused && (
          <div className="absolute left-0 right-0 top-[42px] bg-white rounded-md border border-[#E5E7EB] z-20" style={{ boxShadow: "0 10px 28px rgba(15,23,42,0.18)" }}>
            <div className="px-3 py-2 text-[11px] text-[#94A3B8] border-b border-[#F1F5F9]">{suggHeader}</div>
            {sugg.map(([kind, label], i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 hover:bg-[#F7F8FA] cursor-pointer border-b border-[#F1F5F9] last:border-0">
                <span className="text-[10px] text-[#64748B] w-12">{kind}</span>
                <span className="text-[13px] text-[#0F172A]">{label}</span>
              </div>
            ))}
            <div className="px-3 py-2 text-[11px] text-[#64748B] bg-[#F7F8FA] flex justify-between">
              <span><kbd className="px-1 py-[1px] bg-white border border-[#E5E7EB] rounded text-[10px]">↵</kbd> {suggOpen}</span>
              <span><kbd className="px-1 py-[1px] bg-white border border-[#E5E7EB] rounded text-[10px]">esc</kbd> {suggClose}</span>
            </div>
          </div>
        )}
      </div>
      <div className="ml-auto flex items-center gap-1 text-white relative">
        <button className="w-9 h-9 rounded-md hover:bg-white/10 flex items-center justify-center relative">
          <Icon.Bell s={17} stroke="#fff" />
          <span className="absolute top-[6px] right-[8px] w-[8px] h-[8px] rounded-full" style={{ background: "#DC2626", boxShadow: "0 0 0 2px #0F172A" }} />
        </button>
        {notifPanelOpen && (
          <div className="absolute right-12 top-[44px] bg-white rounded-md border border-[#E5E7EB] z-30" style={{ width: 360, boxShadow: "0 14px 36px rgba(15,23,42,0.18)" }}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9]">
              <span className="text-[13px] font-semibold text-[#0F172A]">{notifHeader} <span className="text-[#94A3B8] font-normal">{notifUnread}</span></span>
              <span className="text-[11px] text-[#0F172A] cursor-pointer">{notifMarkAll}</span>
            </div>
            <div>
              {notifItems.map((n, i) => (
                <div key={i} className="flex gap-3 px-4 py-3 border-b border-[#F1F5F9] last:border-0 hover:bg-[#F7F8FA] cursor-pointer">
                  <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{
                    background: n.tone === "red" ? "#DC2626" : n.tone === "green" ? "#16A34A" : "#0F172A"
                  }} />
                  <div className="flex-1">
                    <div className="text-[13px] font-medium text-[#0F172A]">{n.title}</div>
                    <div className="text-[12px] text-[#475569] mt-[2px] leading-snug">{n.body}</div>
                  </div>
                  <span className="text-[11px] text-[#94A3B8]">{n.time}</span>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-[#F1F5F9] text-center">
              <span className="text-[12px] text-[#0F172A] cursor-pointer">{notifSeeAll}</span>
            </div>
          </div>
        )}
        <div className="w-px h-5 bg-white/20 mx-1" />
        <button className="flex items-center gap-2 px-2 h-9 rounded-md hover:bg-white/10">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold" style={{ background: "#F59E0B", color: "#0F172A" }}>{userInitial}</div>
          <div className="text-left leading-tight">
            <div className="text-[12px] font-medium">{userName}</div>
            <div className="text-[10px] text-white/70">{userOrgShort}</div>
          </div>
          <Icon.ChevronDown s={14} stroke="#fff" />
        </button>
        {userMenuOpen && (
          <div className="absolute right-0 top-[44px] bg-white rounded-md border border-[#E5E7EB] z-30" style={{ width: 260, boxShadow: "0 14px 36px rgba(15,23,42,0.18)" }}>
            <div className="px-4 py-3 border-b border-[#F1F5F9]">
              <div className="text-[13px] font-semibold text-[#0F172A]">{userName}</div>
              <div className="text-[11px] text-[#64748B]">{userEmail}</div>
              <div className="text-[11px] text-[#475569] mt-1">{userOrgRole}</div>
            </div>
            {menuItems.map(([label, Ico], i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2 text-[13px] text-[#0F172A] hover:bg-[#F7F8FA] cursor-pointer">
                <Ico s={15} stroke="#475569" />
                <span>{label}</span>
              </div>
            ))}
            <div className="border-t border-[#F1F5F9] py-1">
              <div className="flex items-center gap-3 px-4 py-2 text-[13px] text-[#DC2626] hover:bg-[#FEF2F2] cursor-pointer">
                <Icon.Logout s={15} stroke="#DC2626" />
                <span>{logoutLabel}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────── SIDEBAR ───────────────────────────
const NAV_KEYS = [
  ["dashboard",   "Home"],
  ["properties",  "Building",  "157"],
  ["viewings",    "Calendar",  "12"],
  ["applications","FileText",  "5"],
  ["chat",        "Chat",      "8"],
  ["publishing",  "Upload"],
  ["exports",     "Download"],
  ["settings",    "Settings"],
];

function Sidebar({ active = "dashboard" }) {
  const t = window.useT();
  const extLinks = [
    [t.nav.ext_square],
    [t.nav.ext_viewings],
    [t.nav.ext_rainz],
    [t.nav.ext_itandi],
  ];
  return (
    <aside className="border-r border-[#E5E7EB] bg-white shrink-0 flex flex-col" style={{ width: 240 }}>
      <nav className="px-2 py-3 flex-1">
        {NAV_KEYS.map(([key, iconName, badge]) => {
          const Ico = Icon[iconName];
          const isActive = key === active;
          const label = t.nav[key];
          return (
            <div key={key}
                 className={`flex items-center gap-3 px-3 py-2 rounded-md mb-[2px] text-[13px] cursor-pointer ${
                   isActive ? "bg-[#F1F5F9] text-[#0F172A] font-semibold" : "text-[#0F172A] hover:bg-[#F7F8FA]"
                 }`}>
              <Ico s={16} stroke={isActive ? "#0F172A" : "#475569"} />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="text-[10px] font-semibold px-1.5 py-[2px] rounded"
                      style={{ background: isActive ? "#0F172A" : "#E2E8F0", color: isActive ? "#fff" : "#475569" }}>
                  {badge}
                </span>
              )}
              {isActive && <span className="w-[3px] h-5 rounded -mr-3" style={{ background: "#0F172A" }} />}
            </div>
          );
        })}
        <div className="mt-6 mb-1 px-3 text-[10px] font-semibold tracking-wider uppercase text-[#94A3B8]">{t.nav.external_links}</div>
        {extLinks.map(([label]) => (
          <div key={label} className="flex items-center gap-2 px-3 py-1.5 text-[12px] text-[#475569] hover:text-[#0F172A] cursor-pointer">
            <span className="flex-1 truncate">{label}</span>
            <Icon.External s={12} stroke="#94A3B8" />
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-[#E5E7EB] text-[11px] text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
          <span>{t.nav.system_running}</span>
        </div>
        <div className="mt-1 text-[10px]">{t.nav.version}</div>
      </div>
    </aside>
  );
}

// ─────────────────────────── BREADCRUMBS + PAGE HEADER ───────────────────────────
function Breadcrumbs({ items }) {
  const t = window.useT();
  const list = items || t.breadcrumbs;
  return (
    <div className="flex items-center gap-1.5 text-[12px] text-[#64748B]">
      {list.map((s, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon.ChevronRight s={12} stroke="#CBD5E1" />}
          <span className={i === list.length - 1 ? "text-[#0F172A] font-medium" : "hover:text-[#0F172A] cursor-pointer"}>{s}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

// ─────────────────────────── SECTION HEADER (state label) ───────────────────────────
function StateLabel({ idx, title, note }) {
  const circled = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮";
  return (
    <div className="mx-auto" style={{ width: 1440 }}>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-[20px] text-[#0F172A] font-bold">{circled[idx - 1] || idx}</span>
        <span className="text-[13px] font-semibold text-[#0F172A]">{title}</span>
        {note && <span className="text-[12px] text-[#94A3B8]">— {note}</span>}
      </div>
    </div>
  );
}

// Expose
Object.assign(window, { Icon, BrowserFrame, TopBar, Sidebar, Breadcrumbs, StateLabel });
