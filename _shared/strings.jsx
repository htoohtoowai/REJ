// _shared/strings.jsx — defines window.STRINGS (jp + en), useT(), isJP(), L().
// Set window.LANG = "jp" or "en" BEFORE this script loads.

(function () {
  const jp = {
    code: "jp",
    brand: {
      product: "LENZ Connect",
      // Role badge is role-aware (FIX-S1 / S2). Read as t.brand.role_badge[role].
      role_badge: { management: "管理会社", broker: "仲介会社" },
      search_placeholder: "物件・申込者・仲介会社を検索…",
    },
    nav: {
      // Management sidebar
      dashboard: "ダッシュボード",
      properties: "物件",
      viewings: "内見予約",
      applications: "入居申込",
      chat: "チャット",
      publishing: "出稿管理",
      exports: "CSV / レポート",
      settings: "設定",
      external_links: "外部リンク",
      ext_square: "Square (基幹)",
      ext_viewings: "内見予約サイト",
      ext_rainz: "RAINZ",
      ext_itandi: "ITANDI",
      // Broker sidebar (FIX-S1, verified against live いい生活Square)
      search: "エリア/沿線検索",
      mapSearch: "地図から検索",
      savedSearches: "保存した検索条件",
      ownProperties: "自社物件",
      listingCos: "掲載会社",
      partners: "取引先管理",
      // Broker top-bar items (FIX-S1)
      topbar_viewings: "内見一覧",
      topbar_applications: "申込一覧",
      topbar_app_switcher: "アプリ一覧",
      topbar_customer_view: "接客用表示",
      system_running: "システム正常",
      version: "v1.2.4 · 2026/05/26",
    },
    breadcrumbs: ["ホーム", "ダッシュボード"],
    common: {
      save: "保存", cancel: "キャンセル", confirm: "確定", close: "閉じる",
      next: "次へ", prev: "戻る", back: "戻る", search: "検索", filter: "絞り込み",
      add: "追加", edit: "編集", delete: "削除", duplicate: "複製",
      upload: "アップロード", download: "ダウンロード", reset: "リセット",
      yes: "はい", no: "いいえ", required: "必須", optional: "任意",
      loading: "読み込み中…", empty: "データがありません",
      published: "公開中", draft: "下書き", paused: "停止中", error: "エラー",
      review: "審査中", approved: "承認済", rejected: "否認", pending: "保留",
    },
  };
  const en = {
    code: "en",
    brand: {
      product: "LENZ Connect",
      role_badge: { management: "Mgmt", broker: "Broker" },
      search_placeholder: "Search properties, applicants, brokers…",
    },
    nav: {
      // Management sidebar
      dashboard: "Dashboard",
      properties: "Properties",
      viewings: "Viewings",
      applications: "Applications",
      chat: "Chat",
      publishing: "Publishing",
      exports: "CSV / Reports",
      settings: "Settings",
      external_links: "External links",
      ext_square: "Square (core)",
      ext_viewings: "Viewing site",
      ext_rainz: "RAINZ",
      ext_itandi: "ITANDI",
      // Broker sidebar
      search: "Area / Line Search",
      mapSearch: "Map Search",
      savedSearches: "Saved Searches",
      ownProperties: "My Listings",
      listingCos: "Listing Companies",
      partners: "Partners",
      // Broker top-bar items
      topbar_viewings: "Viewings",
      topbar_applications: "Applications",
      topbar_app_switcher: "Apps",
      topbar_customer_view: "Customer view",
      system_running: "All systems normal",
      version: "v1.2.4 · 2026/05/26",
    },
    breadcrumbs: ["Home", "Dashboard"],
    common: {
      save: "Save", cancel: "Cancel", confirm: "Confirm", close: "Close",
      next: "Next", prev: "Previous", back: "Back", search: "Search", filter: "Filter",
      add: "Add", edit: "Edit", delete: "Delete", duplicate: "Duplicate",
      upload: "Upload", download: "Download", reset: "Reset",
      yes: "Yes", no: "No", required: "Required", optional: "Optional",
      loading: "Loading…", empty: "No data",
      published: "Live", draft: "Draft", paused: "Paused", error: "Error",
      review: "Under review", approved: "Approved", rejected: "Rejected", pending: "Pending",
    },
  };
  window.STRINGS = { jp, en };
  window.LANG = window.LANG || "jp";
  window.isJP = () => window.LANG === "jp";
  window.useT = () => window.STRINGS[window.LANG] || window.STRINGS.jp;
  window.L = (j, e) => (window.isJP() ? j : e);
})();
