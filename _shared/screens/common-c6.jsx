// _shared/screens/common-c6.jsx — C6 二段階認証の初期設定 (NEW · 4 states, 2026-09-08)
// One-time TOTP enrollment before C2 verification can ever be used. Phase 1 is TOTP-only for
// every role — no SMS, no "あとで設定する" skip, no FIDO2/hardware-key option (that arrives as a
// method tab at GA per decision 1.2, not here).

const { Icon, Btn } = window;
const L = window.L;

// Wider variant of SplashShell (560px content) — same navy/white split, same brand panel.
const C6Shell = ({ children, banner }) => (
  <div className="min-h-screen flex" style={{ background: "#0F172A" }}>
    <div className="flex-1 relative overflow-hidden hidden lg:flex flex-col justify-between p-10 text-white">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
          <span className="font-bold">L</span>
        </div>
        <div>
          <div className="text-[15px] font-semibold tracking-wide">LENZ Connect</div>
          <div className="text-[11px] opacity-70">{L("管理会社向け統合プラットフォーム","Integrated platform for management companies")}</div>
        </div>
      </div>
      <div className="relative">
        <div className="text-[30px] leading-tight font-semibold max-w-md hl">
          {L("アカウントを二段階認証で保護します。","Protect your account with two-factor authentication.")}
        </div>
        <div className="text-[12px] opacity-60 mt-4">© 2026 LENZ DX Co., Ltd.</div>
      </div>
    </div>
    <div className="flex-1 bg-white flex flex-col">
      {banner && (
        <div className="px-6 py-3 bg-[#0F172A] text-white text-[12.5px] leading-snug flex items-start gap-2.5">
          <Icon.Lock s={14} stroke="#F59E0B"/>
          <span>{banner}</span>
        </div>
      )}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full" style={{ maxWidth: 560 }}>{children}</div>
      </div>
    </div>
  </div>
);

const C6_STEPS = () => [L("アプリを登録","Register app"), L("コードで確認","Confirm code"), L("バックアップコード","Backup codes")];

const C6Stepper = ({ active }) => (
  <div className="flex items-center gap-2 mb-8">
    {C6_STEPS().map((s, i) => (
      <React.Fragment key={i}>
        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
            i < active ? "bg-[#16A34A] text-white" : i === active ? "bg-[#0F172A] text-white" : "bg-white border border-[#E5E7EB] text-[#94A3B8]"}`}>
            {i < active ? <Icon.Check s={11} stroke="#fff"/> : i + 1}
          </span>
          <span className={`text-[12px] whitespace-nowrap ${i === active ? "font-semibold text-[#0F172A]" : "text-[#94A3B8]"}`}>{s}</span>
        </div>
        {i < 2 && <span className="flex-1 h-px bg-[#E5E7EB]"/>}
      </React.Fragment>
    ))}
  </div>
);

const C6QR = () => (
  <div className="w-[176px] h-[176px] rounded-md border border-[#E5E7EB] bg-white flex items-center justify-center shrink-0" style={{
    backgroundImage: "repeating-linear-gradient(45deg, #F1F5F9 0 6px, #ffffff 6px 12px)" }}>
    <span className="text-[10px] mono text-[#94A3B8] text-center leading-relaxed">{L("QRコード\n（プレースホルダー）","QR code\n(placeholder)")}</span>
  </div>
);

// ──────────────────────────────────────────────────────── Step ① アプリを登録
window.ScreenC6Step1 = function () {
  const [showKey, setShowKey] = React.useState(false);
  return (
    <C6Shell>
      <C6Stepper active={0}/>
      <h1 className="text-[22px] font-semibold text-[#0F172A] mb-2 hl">{L("認証アプリを登録","Register your authenticator app")}</h1>
      <div className="text-[13px] text-[#64748B] leading-relaxed mb-6">
        {L("スマートフォンの認証アプリで下のQRコードを読み取ってください。30秒ごとに新しい6桁のコードが表示されます。",
           "Scan the QR code below with your authenticator app. It will show a new 6-digit code every 30 seconds.")}
      </div>
      <div className="flex justify-center mb-5"><C6QR/></div>

      <button onClick={() => setShowKey(v => !v)} className="w-full flex items-center justify-between text-[12.5px] text-[#0F172A] py-2 border-t border-[#F1F5F9]">
        {L("QRコードを読み取れない場合","Can't scan the QR code?")}
        <Icon.ChevronDown s={13} stroke="#64748B" style={showKey ? { transform: "rotate(180deg)" } : undefined}/>
      </button>
      {showKey && (
        <div className="flex items-center justify-between gap-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md px-3 py-2.5 mb-2">
          <span className="mono text-[13px] tracking-wider text-[#0F172A]">JBSW Y3DP EHPK 3PXP</span>
          <button className="inline-flex items-center gap-1 text-[11.5px] text-[#475569] hover:text-[#0F172A] shrink-0"><Icon.Copy s={12}/>{L("コピー","Copy")}</button>
        </div>
      )}

      <div className="text-[11px] text-[#94A3B8] mt-3 mb-6">{L("対応アプリ例: Google Authenticator / Microsoft Authenticator / 1Password など","e.g. Google Authenticator, Microsoft Authenticator, 1Password")}</div>

      <a href="06-mfa-enrollment-step2-code.html"><Btn kind="primary" size="lg" full>{L("次へ — コードで確認","Next — confirm code")}</Btn></a>
    </C6Shell>
  );
};

// shared 6-box code row used by both the plain and error states of Step ②
const C6CodeBoxes = ({ digits, error }) => (
  <div className="flex gap-2 mb-3">
    {digits.map((d, i) => (
      <div key={i} className={`flex-1 h-14 rounded-md border-2 flex items-center justify-center text-[22px] font-semibold tabnum mono
        ${error ? "border-[#DC2626] bg-[#FEF2F2] text-[#991B1B]"
        : d ? "border-[#0F172A] bg-white text-[#0F172A]"
        : "border-[#E5E7EB] bg-white text-[#CBD5E1]"}`}>
        {d}
      </div>
    ))}
  </div>
);

// ──────────────────────────────────────────────────────── Step ② コードで確認
window.ScreenC6Step2 = function () {
  const digits = ["8", "3", "2", "9", "", ""];
  return (
    <C6Shell>
      <C6Stepper active={1}/>
      <h1 className="text-[22px] font-semibold text-[#0F172A] mb-2 hl">{L("認証アプリのコードを入力","Enter the code from your app")}</h1>
      <div className="text-[13px] text-[#64748B] leading-relaxed mb-6">
        {L("認証アプリに表示されている6桁のコードを入力して、登録を完了してください。",
           "Enter the 6-digit code shown in your authenticator app to finish registration.")}
      </div>

      <C6CodeBoxes digits={digits}/>
      <div className="text-[12px] text-[#64748B] mb-8 flex items-center gap-2">
        <Icon.Clock s={13} stroke="#64748B"/>
        <span>{L("00:27 後に新しいコードに変わります","New code in 00:27")}</span>
      </div>

      <div className="flex items-center gap-2">
        <a href="06-mfa-enrollment-step1-app.html" className="flex-1"><Btn kind="ghost" size="lg" full>{L("← アプリの登録に戻る","← Back to app setup")}</Btn></a>
        <a href="06-mfa-enrollment-step3-backup.html" className="flex-1"><Btn kind="primary" size="lg" full>{L("確認する","Confirm")}</Btn></a>
      </div>
    </C6Shell>
  );
};

// Error variant kept in the same file (not a separate deliverable file — shown via ?err=1 for reviewers)
window.ScreenC6Step2Error = function () {
  const digits = ["8", "3", "2", "9", "1", "5"];
  return (
    <C6Shell>
      <C6Stepper active={1}/>
      <h1 className="text-[22px] font-semibold text-[#0F172A] mb-2 hl">{L("認証アプリのコードを入力","Enter the code from your app")}</h1>
      <div className="text-[13px] text-[#64748B] leading-relaxed mb-6">
        {L("認証アプリに表示されている6桁のコードを入力して、登録を完了してください。",
           "Enter the 6-digit code shown in your authenticator app to finish registration.")}
      </div>
      <C6CodeBoxes digits={digits} error/>
      <div className="text-[12px] text-[#DC2626] mb-1 flex items-center gap-1.5">
        <Icon.AlertCircle s={13} stroke="#DC2626"/>
        <span>{L("コードが正しくありません。認証アプリの最新のコードを入力してください。","That code isn't right. Enter the latest code from your authenticator app.")}</span>
      </div>
      <div className="text-[12px] text-[#64748B] mb-8 flex items-center gap-2">
        <Icon.Clock s={13} stroke="#64748B"/>
        <span>{L("00:12 後に新しいコードに変わります","New code in 00:12")}</span>
      </div>
      <div className="flex items-center gap-2">
        <a href="06-mfa-enrollment-step1-app.html" className="flex-1"><Btn kind="ghost" size="lg" full>{L("← アプリの登録に戻る","← Back to app setup")}</Btn></a>
        <a href="06-mfa-enrollment-step3-backup.html" className="flex-1"><Btn kind="primary" size="lg" full>{L("確認する","Confirm")}</Btn></a>
      </div>
    </C6Shell>
  );
};

// ──────────────────────────────────────────────────────── Step ③ バックアップコード
window.ScreenC6Step3 = function () {
  const [saved, setSaved] = React.useState(false);
  const codes = ["k3Jq7Xr2Bd-9Vt4Ns8Wp1","f6Hm2Ct9Lx-3Rb7Yq5Ez0","p8Wn4Vs1Jc-6Kd9Xt2Fh3","d1Tz5Rq8Nm-4Bv7Lp3Ys6",
                 "j9Yc3Fw6Kt-8Hn1Zq4Rd7","m2Xb7Vd4Gt-5Wc9Lp1Nq8","r4Kf1Sp8Bh-3Tm6Yd2Jc5","w7Nq5Ct2Vx-9Rb4Lh6Ds3"];
  return (
    <C6Shell>
      <C6Stepper active={2}/>
      <h1 className="text-[22px] font-semibold text-[#0F172A] mb-2 hl">{L("バックアップコードを保存","Save your backup codes")}</h1>
      <div className="flex items-start gap-2.5 bg-[#FEF3C7] border border-[#FDE68A] rounded-md px-3.5 py-3 mb-5">
        <Icon.Alert s={14} stroke="#92400E" className="shrink-0 mt-[1px]"/>
        <div className="text-[12.5px] text-[#92400E] leading-relaxed">
          {L("スマートフォンを紛失したときは、このコードでログインします。1つのコードは1回だけ使えます。安全な場所に保管してください。",
             "Use these codes to sign in if you lose your phone. Each code works once. Store them somewhere safe.")}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {codes.map((c, i) => (
          <div key={i} className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-md px-3 py-2 text-center mono text-[12.5px] text-[#0F172A] tracking-wide">{c}</div>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Btn kind="ghost" size="sm" icon={Icon.Download}>{L("コードをダウンロード","Download codes")}</Btn>
        <Btn kind="ghost" size="sm" icon={Icon.Print}>{L("コードを印刷","Print codes")}</Btn>
        <button className="text-[11.5px] text-[#0F172A] underline ml-1">{L("再発行","Regenerate")}</button>
      </div>

      <label onClick={() => setSaved(v => !v)} className="flex items-center gap-2.5 text-[12.5px] text-[#0F172A] cursor-pointer mt-5 mb-5">
        <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${saved ? "bg-[#0F172A]" : "border border-[#CBD5E1] bg-white"}`}>
          {saved && <Icon.Check s={11} stroke="#fff"/>}
        </span>
        {L("バックアップコードを保存しました","I have saved my backup codes")} <span className="text-[#DC2626]">*</span>
      </label>

      <button disabled={!saved}
        className={`w-full h-11 rounded-md font-semibold text-[14px] ${saved ? "bg-[#F59E0B] text-[#0F172A] hover:bg-[#D97706] hover:text-white" : "bg-[#FDE68A] text-[#92400E]/50 cursor-not-allowed"}`}>
        {L("設定を完了する","Finish setup")}
      </button>

      <div className="text-[11px] text-[#94A3B8] mt-4 text-center">
        {L("設定はアカウント設定（C3）の「二要素認証」からいつでも見直せます。","You can review this anytime from Account Settings → Two-factor authentication.")}
      </div>
    </C6Shell>
  );
};

// ──────────────────────────────────────────────────────── 強制設定 (未登録者の初回ログイン)
window.ScreenC6Forced = function () {
  return (
    <C6Shell banner={L("セキュリティのため、二段階認証の設定が必要です。設定を完了するまで他の画面は利用できません。",
                        "For security, two-factor authentication setup is required. You cannot use other screens until setup is complete.")}>
      <C6Stepper active={0}/>
      <h1 className="text-[22px] font-semibold text-[#0F172A] mb-2 hl">{L("認証アプリを登録","Register your authenticator app")}</h1>
      <div className="text-[13px] text-[#64748B] leading-relaxed mb-6">
        {L("スマートフォンの認証アプリで下のQRコードを読み取ってください。30秒ごとに新しい6桁のコードが表示されます。",
           "Scan the QR code below with your authenticator app. It will show a new 6-digit code every 30 seconds.")}
      </div>
      <div className="flex justify-center mb-5"><C6QR/></div>

      <div className="flex items-center justify-between gap-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md px-3 py-2.5 mb-2">
        <span className="mono text-[13px] tracking-wider text-[#0F172A]">JBSW Y3DP EHPK 3PXP</span>
        <button className="inline-flex items-center gap-1 text-[11.5px] text-[#475569] hover:text-[#0F172A] shrink-0"><Icon.Copy s={12}/>{L("コピー","Copy")}</button>
      </div>
      <div className="text-[11px] text-[#94A3B8] mt-3 mb-6">{L("対応アプリ例: Google Authenticator / Microsoft Authenticator / 1Password など","e.g. Google Authenticator, Microsoft Authenticator, 1Password")}</div>

      <Btn kind="primary" size="lg" full>{L("次へ — コードで確認","Next — confirm code")}</Btn>
    </C6Shell>
  );
};
