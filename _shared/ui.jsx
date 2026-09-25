// _shared/ui.jsx — shared primitives: Card, Btn, Tag, Stat, Field, Tabs, EmptyMap.
// Depends on window.Icon (from chrome.jsx).

const Card = ({ children, className = "", style }) => (
  <div className={`bg-white border border-[#E5E7EB] rounded-lg ${className}`} style={style}>{children}</div>
);

const CardHead = ({ title, sub, action, icon: Ico }) => (
  <div className="flex items-center px-4 py-3 border-b border-[#F1F5F9]">
    {Ico && <Ico s={16} stroke="#475569" />}
    <div className={Ico ? "ml-2 flex-1" : "flex-1"}>
      <div className="text-[13px] font-semibold text-[#0F172A]">{title}</div>
      {sub && <div className="text-[11px] text-[#94A3B8] mt-[1px]">{sub}</div>}
    </div>
    {action}
  </div>
);

const Btn = ({ children, kind = "ghost", size = "md", icon: Ico, iconRight, full, onClick, style }) => {
  const sz = { sm: "h-7 px-2.5 text-[12px]", md: "h-9 px-3.5 text-[13px]", lg: "h-11 px-5 text-[14px]" }[size];
  const kinds = {
    primary: "bg-[#0F172A] text-white hover:bg-[#1F2937]",
    accent:  "bg-[#F59E0B] text-[#0F172A] hover:bg-[#D97706] hover:text-white font-semibold",
    ghost:   "bg-white text-[#0F172A] border border-[#E5E7EB] hover:bg-[#F7F8FA]",
    subtle:  "bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]",
    danger:  "bg-[#DC2626] text-white hover:bg-[#991B1B]",
    link:    "text-[#0F172A] hover:underline",
  }[kind];
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 rounded-md font-medium whitespace-nowrap shrink-0 ${sz} ${kinds} ${full ? "w-full justify-center" : ""}`} style={style}>
      {Ico && <Ico s={14} />} {children} {iconRight && <span className="ml-1">{iconRight}</span>}
    </button>
  );
};

const Tag = ({ children, tone = "neutral", size = "sm", icon: Ico }) => {
  const tones = {
    neutral: { bg: "#F1F5F9", fg: "#475569", bd: "#E2E8F0" },
    ok:      { bg: "#DCFCE7", fg: "#15803D", bd: "#BBF7D0" },
    warn:    { bg: "#FEF3C7", fg: "#92400E", bd: "#FDE68A" },
    danger:  { bg: "#FEE2E2", fg: "#991B1B", bd: "#FECACA" },
    accent:  { bg: "#FEF3C7", fg: "#92400E", bd: "#FDE68A" },
    dark:    { bg: "#0F172A", fg: "#FFFFFF", bd: "#0F172A" },
    outline: { bg: "transparent", fg: "#475569", bd: "#CBD5E1" },
  };
  const t = tones[tone] || tones.neutral;
  const sz = { sm: "text-[10.5px] px-1.5 py-[2px]", md: "text-[11.5px] px-2 py-[3px]" }[size];
  return (
    <span className={`inline-flex items-center gap-1 rounded font-medium whitespace-nowrap ${sz}`}
          style={{ background: t.bg, color: t.fg, border: `1px solid ${t.bd}` }}>
      {Ico && <Ico s={11} />} {children}
    </span>
  );
};

const Field = ({ label, hint, error, required, children, full }) => (
  <label className={`block ${full ? "w-full" : ""}`}>
    <div className="flex items-baseline justify-between mb-1">
      <span className="text-[11px] font-semibold text-[#475569]">
        {label} {required && <span className="text-[#DC2626] ml-[2px]">*</span>}
      </span>
      {hint && <span className="text-[10px] text-[#94A3B8]">{hint}</span>}
    </div>
    {children}
    {error && <div className="text-[11px] text-[#DC2626] mt-1 flex items-center gap-1"><window.Icon.AlertCircle s={11}/> {error}</div>}
  </label>
);

const Input = ({ value, placeholder, prefix, suffix, error, ...rest }) => (
  <div className={`flex items-center bg-white border rounded-md ${error ? "border-[#DC2626]" : "border-[#CBD5E1]"} h-9 px-2.5 focus-within:border-[#0F172A] w-full min-w-0`}>
    {prefix && <span className="text-[12px] text-[#94A3B8] mr-1.5 shrink-0">{prefix}</span>}
    <input value={value} placeholder={placeholder} className="bg-transparent outline-none text-[13px] flex-1 min-w-0 text-[#0F172A] placeholder:text-[#94A3B8]" readOnly {...rest} />
    {suffix && <span className="text-[12px] text-[#94A3B8] ml-1.5 shrink-0">{suffix}</span>}
  </div>
);

const Select = ({ value, options = [], placeholder = "—" }) => (
  <div className="flex items-center bg-white border border-[#CBD5E1] rounded-md h-9 px-2.5 text-[13px] text-[#0F172A] w-full min-w-[80px]">
    <span className="flex-1 truncate min-w-0">{value || placeholder}</span>
    <window.Icon.ChevronDown s={14} stroke="#94A3B8"/>
  </div>
);

const Stat = ({ label, value, sub, tone, icon: Ico }) => (
  <Card className="p-4">
    <div className="flex items-start justify-between">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">{label}</div>
      {Ico && <Ico s={14} stroke="#94A3B8" />}
    </div>
    <div className="text-[26px] font-bold text-[#0F172A] mt-2 leading-none tabnum">{value}</div>
    {sub && <div className={`text-[11px] mt-1.5 ${tone === "up" ? "text-[#15803D]" : tone === "down" ? "text-[#991B1B]" : "text-[#64748B]"}`}>{sub}</div>}
  </Card>
);

const Tabs = ({ tabs, active }) => (
  <div className="flex items-center gap-1 border-b border-[#E5E7EB]">
    {tabs.map((t, i) => (
      <div key={i} className={`px-4 py-2 text-[13px] cursor-pointer ${
        (active === i || active === t) ? "text-[#0F172A] font-semibold border-b-2 border-[#0F172A] -mb-px"
                                       : "text-[#64748B] hover:text-[#0F172A]"
      }`}>
        {typeof t === "string" ? t : t.label}
        {typeof t === "object" && t.count != null && (
          <span className="ml-1.5 text-[10px] text-[#94A3B8]">({t.count})</span>
        )}
      </div>
    ))}
  </div>
);

// Decorative "map" placeholder — vector-only, no images
const MapPlaceholder = ({ height = 400, pins = [] }) => (
  <div className="relative overflow-hidden" style={{ height, background: "linear-gradient(135deg,#F1F5F9 0%,#E2E8F0 100%)" }}>
    {/* grid */}
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <defs>
        <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      {/* roads */}
      <path d="M0 60 L1200 80" stroke="#fff" strokeWidth="6" opacity="0.9"/>
      <path d="M0 60 L1200 80" stroke="#CBD5E1" strokeWidth="1"/>
      <path d="M180 0 L260 700" stroke="#fff" strokeWidth="8" opacity="0.9"/>
      <path d="M180 0 L260 700" stroke="#CBD5E1" strokeWidth="1"/>
      <path d="M600 0 L580 700" stroke="#fff" strokeWidth="5" opacity="0.9"/>
      <path d="M900 100 C700 240, 800 400, 1200 380" stroke="#fff" strokeWidth="10" opacity="0.9" fill="none"/>
      <path d="M900 100 C700 240, 800 400, 1200 380" stroke="#CBD5E1" strokeWidth="1" fill="none"/>
      {/* park */}
      <ellipse cx="380" cy="320" rx="120" ry="70" fill="#D1FAE5" opacity="0.9"/>
      {/* water */}
      <path d="M0 500 Q300 450 600 500 T1200 480 L1200 700 L0 700 Z" fill="#DBEAFE" opacity="0.6"/>
    </svg>
    {pins.map((p, i) => (
      <div key={i} className="absolute" style={{ left: p.x, top: p.y, transform: "translate(-50%,-100%)" }}>
        <div className={`px-2 py-1 rounded-md text-[11px] font-semibold shadow-md ${p.active ? "bg-[#F59E0B] text-[#0F172A]" : "bg-[#0F172A] text-white"}`}>
          {p.label}
        </div>
        <div className={`mx-auto ${p.active ? "border-t-[#F59E0B]" : "border-t-[#0F172A]"}`}
             style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTopWidth: 6, borderTopStyle: "solid" }}/>
      </div>
    ))}
  </div>
);

// Property photo placeholder — pure SVG architecture sketch (no external images)
const PhotoPh = ({ w = "100%", h = 160, label, tone = 0, kind = "room" }) => {
  const palettes = [
    ["#E5E7EB","#94A3B8","#CBD5E1"],
    ["#FDE68A","#92400E","#FEF3C7"],
    ["#DBEAFE","#1E40AF","#BFDBFE"],
    ["#DCFCE7","#166534","#BBF7D0"],
    ["#FEE2E2","#991B1B","#FECACA"],
  ];
  const [bg, ink, mid] = palettes[tone % palettes.length];
  return (
    <div className="relative overflow-hidden rounded-md" style={{ width: w, height: h, background: bg }}>
      <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        {kind === "exterior" ? (
          <g stroke={ink} strokeWidth="0.8" fill="none">
            <rect x="40" y="20" width="120" height="90" fill={mid} opacity="0.6"/>
            <path d="M40 20 L100 5 L160 20" fill={mid}/>
            <rect x="60" y="40" width="12" height="14"/>
            <rect x="80" y="40" width="12" height="14"/>
            <rect x="100" y="40" width="12" height="14"/>
            <rect x="120" y="40" width="12" height="14"/>
            <rect x="60" y="64" width="12" height="14"/>
            <rect x="80" y="64" width="12" height="14"/>
            <rect x="100" y="64" width="12" height="14"/>
            <rect x="120" y="64" width="12" height="14"/>
            <rect x="92" y="88" width="20" height="22" fill={bg}/>
          </g>
        ) : kind === "floorplan" ? (
          <g stroke={ink} strokeWidth="1.2" fill="none">
            <rect x="20" y="20" width="160" height="80" fill="#fff" opacity="0.6"/>
            <path d="M20 60 H120 M120 20 V100 M80 60 V100"/>
            <text x="60" y="44" fontSize="6" fill={ink}>LDK</text>
            <text x="140" y="64" fontSize="6" fill={ink}>BR</text>
            <text x="40" y="84" fontSize="6" fill={ink}>BATH</text>
            <text x="90" y="84" fontSize="6" fill={ink}>WC</text>
          </g>
        ) : (
          <g stroke={ink} strokeWidth="0.8" fill="none">
            <path d="M0 80 L60 60 L200 60 L200 120 L0 120 Z" fill={mid} opacity="0.6"/>
            <rect x="20" y="30" width="160" height="50" fill="#fff" opacity="0.6"/>
            <rect x="30" y="40" width="40" height="30"/>
            <rect x="120" y="40" width="50" height="30"/>
            <path d="M0 60 L200 60"/>
          </g>
        )}
      </svg>
      {label && (
        <div className="absolute bottom-1.5 left-1.5 text-[10px] px-1.5 py-[1px] bg-white/85 rounded text-[#0F172A]">{label}</div>
      )}
    </div>
  );
};

// Person initial avatar
const Avatar = ({ name = "A", tone = "neutral", size = 32 }) => {
  const tones = { neutral:"#0F172A", accent:"#F59E0B", red:"#DC2626", green:"#16A34A", blue:"#2563EB" };
  return (
    <div className="rounded-full flex items-center justify-center text-white font-semibold"
         style={{ width: size, height: size, background: tones[tone] || tones.neutral, fontSize: size * 0.4 }}>
      {name.slice(0,1)}
    </div>
  );
};

// Layout shell — full app shell (TopBar + Sidebar + content).
// role: "management" | "broker" — forwards to TopBar + Sidebar so the chrome
// reflects the correct role (FIX-S1).
const AppShell = ({ active, crumbs, title, subtitle, actions, children, padded = true, role = "management" }) => (
  <div className="flex flex-col" style={{ minHeight: "100vh" }}>
    <window.TopBar role={role} />
    <div className="flex flex-1 min-h-0" style={{ minHeight: "calc(100vh - 56px)" }}>
      <window.Sidebar active={active} role={role} />
      <main className="flex-1 min-w-0 flex flex-col">
        <div className="px-8 py-4 border-b border-[#E5E7EB] bg-white">
          <window.Breadcrumbs items={crumbs}/>
          <div className="mt-2 flex items-end gap-4 flex-wrap">
            <div className="min-w-0" style={{ flex: "1 1 auto" }}>
              <h1 className="text-[22px] font-semibold text-[#0F172A]">{title}</h1>
              {subtitle && <div className="text-[12px] text-[#64748B] mt-1">{subtitle}</div>}
            </div>
            {actions && <div className="flex items-center gap-2 flex-nowrap shrink-0 ml-auto">{actions}</div>}
          </div>
        </div>
        <div className={`flex-1 ${padded ? "p-6" : ""}`}>{children}</div>
      </main>
    </div>
  </div>
);

// Convenience wrapper — broker-side screens render via <BrokerShell .../> which
// forces role="broker" so the chrome (sidebar + topbar + role badge) is correct.
const BrokerShell = (props) => <AppShell role="broker" {...props}/>;

// Full-bleed splash shell (for login/MFA/errors)
const SplashShell = ({ children, accent }) => (
  <div className="min-h-screen flex" style={{ background: "#0F172A" }}>
    <div className="flex-1 relative overflow-hidden hidden lg:flex flex-col justify-between p-10 text-white">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
            <span className="font-bold">L</span>
          </div>
          <div>
            <div className="text-[15px] font-semibold tracking-wide">LENZ Connect</div>
            <div className="text-[11px] opacity-70">{window.L("管理会社向け統合プラットフォーム","Integrated platform for management companies")}</div>
          </div>
        </div>
      </div>
      {/* decorative skyline */}
      <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 600 800">
        <g stroke="#F59E0B" strokeWidth="0.6" fill="none">
          {Array.from({length:30}).map((_,i)=>(
            <rect key={i} x={20+i*20} y={400 + (i%5)*30} width="14" height={400 - (i%5)*30}/>
          ))}
          {Array.from({length:200}).map((_,i)=>{
            const x = 20 + (i%30)*20 + (Math.floor(i/30)%2)*4;
            const y = 420 + Math.floor(i/30)*22;
            return <rect key={"w"+i} x={x} y={y} width="3" height="6" fill={i%3===0?"#F59E0B":"none"} opacity="0.5"/>;
          })}
        </g>
      </svg>
      <div className="relative">
        <div className="text-[34px] leading-tight font-semibold max-w-md hl">
          {accent || window.L("物件情報を一元管理。出稿の手間を、価値ある時間に。",
                              "One workspace for every listing. Reclaim your hours from the publishing grind.")}
        </div>
        <div className="text-[12px] opacity-60 mt-4">© 2026 LENZ DX Co., Ltd.</div>
      </div>
    </div>
    <div className="flex-1 bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md">{children}</div>
    </div>
  </div>
);

Object.assign(window, { Card, CardHead, Btn, Tag, Field, Input, Select, Stat, Tabs, MapPlaceholder, PhotoPh, Avatar, AppShell, BrokerShell, SplashShell });
