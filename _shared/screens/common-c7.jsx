// _shared/screens/common-c7.jsx — C7 招待受諾・初回パスワード設定 (NEW · 2 states, 2026-09-08)
// A staff account created by an admin in M17; the invited person opens the email link and lands
// here to set their password. Default render shows the checklist mid-fill (2/3 ticked) and the
// mismatch error together, since only 2 files are in scope — this demonstrates both live-validation
// behaviors in the one static deliverable. No social sign-in, no "後で設定する", no username field.

const { Icon, Btn } = window;
const L = window.L;

const C7Shell = ({ children }) => (
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
          {L("チームに招待されました。アカウントを設定しましょう。","You've been invited to the team. Let's set up your account.")}
        </div>
        <div className="text-[12px] opacity-60 mt-4">© 2026 LENZ DX Co., Ltd.</div>
      </div>
    </div>
    <div className="flex-1 bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md">{children}</div>
    </div>
  </div>
);

// ──────────────────────────────────────────────────────── 初期設定（既定）
window.ScreenC7Invite = function () {
  const [show, setShow] = React.useState(false);
  const [agree, setAgree] = React.useState(false);
  const reqs = [
    [L("12文字以上","12+ characters"), true],
    [L("英大文字・小文字・数字・記号のうち3種類以上","3+ of upper, lower, number, symbol"), true],
    [L("メールアドレス・氏名を含まない","Doesn't contain your email or name"), false],
  ];
  return (
    <C7Shell>
      <h1 className="text-[22px] font-semibold text-[#0F172A] mb-5 hl">{L("アカウントの初期設定","Set up your account")}</h1>

      <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-md p-3.5 mb-6 space-y-1.5">
        {[
          [L("招待元","Invited by"), L("株式会社 LENZ DX 本店","LENZ DX Co., Head Office")],
          [L("ロール","Role"), L("営業","Sales")],
          [L("メールアドレス","Email"), "sato@lenz-dx.jp"],
          [L("招待者","Invited by (person)"), L("大久保 ゆか","Okubo Yuka")],
        ].map(([k, v], i) => (
          <div key={i} className="flex items-baseline justify-between text-[12.5px]">
            <span className="text-[#94A3B8]">{k}</span><span className="text-[#0F172A] font-medium">{v}</span>
          </div>
        ))}
      </div>

      <div className="mb-3.5">
        <label className="block text-[12px] font-medium text-[#475569] mb-1">{L("パスワード","Password")}</label>
        <div className="flex items-center bg-white border border-[#CBD5E1] rounded-md h-10 px-3 focus-within:border-[#0F172A]">
          <input type={show ? "text" : "password"} value="Sato@Renta2026" readOnly
            className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-[#0F172A]"/>
          <button onClick={() => setShow(v => !v)} className="text-[#94A3B8] hover:text-[#0F172A] shrink-0">
            <Icon.Eye s={15}/>
          </button>
        </div>
      </div>

      <div className="mb-2">
        <label className="block text-[12px] font-medium text-[#475569] mb-1">{L("パスワード（確認）","Confirm password")}</label>
        <div className="flex items-center bg-white border border-[#DC2626] rounded-md h-10 px-3">
          <input type="password" value="Sato@Renta2027" readOnly
            className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-[#0F172A]"/>
        </div>
        <div className="text-[11.5px] text-[#DC2626] mt-1">{L("パスワードが一致しません","The passwords don't match")}</div>
      </div>

      <div className="mt-4 mb-5 space-y-1.5">
        {reqs.map(([label, ok], i) => (
          <div key={i} className="flex items-start gap-2 text-[12px] w-full">
            <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-[1px] ${ok ? "bg-[#16A34A]" : "border border-[#CBD5E1] bg-white"}`}>
              {ok && <Icon.Check s={10} stroke="#fff"/>}
            </span>
            <span className={`flex-1 min-w-0 leading-snug ${ok ? "text-[#0F172A]" : "text-[#94A3B8]"}`}>{label}</span>
          </div>
        ))}
      </div>

      <label onClick={() => setAgree(v => !v)} className="flex items-start gap-2.5 text-[12.5px] text-[#0F172A] cursor-pointer mb-6">
        <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-[1px] ${agree ? "bg-[#0F172A]" : "border border-[#CBD5E1] bg-white"}`}>
          {agree && <Icon.Check s={11} stroke="#fff"/>}
        </span>
        <span>
          <a className="underline">{L("利用規約","Terms of Service")}</a>
          {L("と","and ")}
          <a className="underline">{L("プライバシーポリシー","Privacy Policy")}</a>
          {L("に同意します","I agree to")}
        </span>
      </label>

      <button disabled className="w-full h-11 rounded-md font-semibold text-[14px] bg-[#CBD5E1] text-white cursor-not-allowed">
        {L("設定して次へ — 二段階認証","Continue — two-factor setup")}
      </button>

      <div className="text-[11px] text-[#94A3B8] mt-4 text-center leading-relaxed">
        {L("このリンクの有効期限は7日間です。期限が切れた場合は管理者に再送を依頼してください。",
           "This link expires in 7 days. If it has expired, ask an administrator to resend the invitation.")}
      </div>
    </C7Shell>
  );
};

// ──────────────────────────────────────────────────────── 招待リンク期限切れ
window.ScreenC7Expired = function () {
  return (
    <C7Shell>
      <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-lg p-6 text-center">
        <div className="w-11 h-11 rounded-full bg-[#F59E0B] flex items-center justify-center mx-auto mb-4">
          <Icon.Alert s={20} stroke="#fff"/>
        </div>
        <div className="text-[16px] font-semibold text-[#92400E] mb-1.5">{L("この招待リンクは有効期限が切れています","This invitation link has expired")}</div>
        <div className="text-[13px] text-[#92400E]/85 leading-relaxed mb-5">
          {L("管理者に招待メールの再送を依頼してください。","Please ask an administrator to resend the invitation email.")}
        </div>
        <a href="01-login.html"><Btn kind="ghost" full>{L("ログイン画面へ","Go to sign in")}</Btn></a>
      </div>
    </C7Shell>
  );
};
