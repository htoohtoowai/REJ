# LENZ Connect (tp-goodlife) — 画面一覧 / Screen Inventory

> 見積もりベース用ドキュメント。`index.html`（スクリーンライブラリ）の画面レジストリから書き出し。
> 各画面は日本語 / 英語の2言語で提供（同一レイアウト）。
> **状態** 列の ✦ は今回のデザインレビューで更新済みの画面。**工数** 列は見積もり記入用（空欄）。

---

## サマリー / Summary

> **正典スコープ：38画面／63画面状態**（画面仕様ブック「機能一覧」シート＋各画面シート63枚と一致）
> 「画面」＝独立した画面ID、「状態」＝モーダル・ウィザード各ステップを含む描画単位

| 区分 | 画面ID数 | 描画状態数 |
|------|------:|--------:|
| 共通 (Common) C1〜C5 | 5 | 7 |
| 管理会社 (Management) M1〜M17 | 20 | 33 |
| 仲介会社 (Broker) B1〜B13 | 13 | 23 |
| **合計** | **38** | **63** |

以下の一覧は**描画状態単位**（実装単位）で展開しています。

> フェーズ分割は8/3合意により**優先度ベース**（高＝Phase 1／低＝Phase 2）。表内の MVP/P2/P3 は旧表記で、優先度シート確定後に高／低で置き換えます。
> 工数は2言語分（JP/EN）を前提に記入してください。

**優先度凡例:** MVP = 初期リリース必須 / P2 = 第2フェーズ / P3 = 将来
**区分凡例:** 画面 = 独立ページ / モーダル = ダイアログ / ステップ = ウィザードの1段階

---

## 1. 共通画面 / Common  (プレフィックス: C)

| ID | 画面名 (JP) | Screen (EN) | 区分 | 優先度 | パス (jp/common/) | 状態 | 工数(人日) |
|----|------------|-------------|------|:-----:|------------------|:---:|:--------:|
| C1 | ログイン | Login | 画面 | MVP | 01-login.html | | |
| C2 | MFA 認証 | MFA Verification | 画面 | MVP | 02-mfa.html | | |
| C3 | アカウント設定 | Account Settings | 画面 | MVP | 03-account-settings.html | | |
| C4 | 通知センター | Notification Center | 画面 | P2 | 04-notifications.html | | |
| C5.1 | 404 ページが見つかりません | 404 Not Found | 画面 | MVP | 05-error-404.html | | |
| C5.2 | 500 サーバーエラー | 500 Server Error | 画面 | MVP | 05-error-500.html | | |
| C5.3 | 403 アクセス権限なし | 403 Access Denied | 画面 | MVP | 05-error-403.html | | |

---

## 2. 管理会社 / Management Company  (プレフィックス: M)

| ID | 画面名 (JP) | Screen (EN) | 区分 | 優先度 | パス (jp/management/) | 状態 | 工数(人日) |
|----|------------|-------------|------|:-----:|----------------------|:---:|:--------:|
| M1 | ダッシュボード | Dashboard | 画面 | MVP | 01-dashboard.html | | |
| M2 | 物件一覧 | Property List | 画面 | MVP | 02-property-list.html | | |
| M2.a | 物件削除モーダル (1件) | Delete Property Modal (single) | モーダル | MVP | 02-property-list-delete-modal.html | | |
| M2.b | 一括削除モーダル | Bulk Delete Modal | モーダル | MVP | 02-property-list-bulk-delete-modal.html | | |
| M3.1 | 物件新規 — 基本情報 | New Property — Basics | ステップ | MVP | 03-property-create-step1-basics.html | | |
| M3.2 | 物件新規 — 住所・交通 | New Property — Address | ステップ | MVP | 03-property-create-step2-address.html | | |
| M3.3 | 物件新規 — 確認・登録 | New Property — Confirm | ステップ | MVP | 03-property-create-step3-confirm.html | | |
| M4 | 物件編集 – 概要 | Edit Property – Overview | 画面 | MVP | 04-property-edit-overview.html | ✦ | |
| M4.a | 編集 – 変更を保存モーダル | Edit – Save Modal | モーダル | MVP | 04-property-edit-save-modal.html | | |
| M4.b | 編集 – 物件削除モーダル | Edit – Delete Modal | モーダル | MVP | 04-property-edit-delete-modal.html | | |
| M4.c | 編集 – 変更破棄モーダル | Edit – Discard Modal | モーダル | MVP | 04-property-edit-discard-modal.html | | |
| M5 | 物件編集 – 建物 | Edit Property – Building | 画面 | MVP | 05-property-edit-building.html | | |
| M5b | 物件編集 – 部屋 | Edit Property – Room | 画面 | MVP | 05b-property-edit-room.html | | |
| M6 | 物件編集 – 取引 | Edit Property – Transaction | 画面 | MVP | 06-property-edit-transaction.html | | |
| M7 | 物件編集 – 掲載情報 | Edit Property – Listing Info | 画面 | MVP | 07-property-edit-listing-info.html | | |
| M8 | 物件編集 – 画像 (36ポイント) | Edit Property – Images | 画面 | MVP | 08-property-edit-images.html | | |
| M9 | 物件編集 – パノラマ / 動画 | Edit Property – Panorama | 画面 | P2 | 09-property-edit-panorama.html | | |
| M10 | 設備編集モーダル | Equipment Modal | モーダル | MVP | 10-equipment-modal.html | | |
| M11 | 出稿コントロール | Publish Controls | 画面 | MVP | 11-publish-controls.html | ✦ | |
| M11.b | 出稿停止モーダル | Unpublish Modal | モーダル | MVP | 11-publish-unpublish-modal.html | | |
| M12 | 内見予約 一覧+カレンダー | Viewing List + Calendar | 画面 | MVP | 12-viewing-list-calendar.html | | |
| M13 | 入居申込 一覧 | Application List | 画面 | P2 | 13-application-list.html | | |
| M14.1 | 入居申込 — 受信 | Application — Received | ステップ | P2 | 14-application-detail-step1-received.html | | |
| M14.2 | 入居申込 — 書類確認 | Application — Doc check | ステップ | P2 | 14-application-detail-step2-doccheck.html | | |
| M14.3 | 入居申込 — 社内審査 | Application — Internal review | ステップ | P2 | 14-application-detail-step3-review.html | | |
| M14.4 | 入居申込 — オーナー判定 | Application — Owner review | ステップ | P2 | 14-application-detail-step4-owner.html | | |
| M14.5 | 入居申込 — 承認・契約 | Application — Approved | ステップ | P2 | 14-application-detail-step5-approved.html | | |
| M14.c | 申込 アーカイブモーダル | Archive Application Modal | モーダル | P2 | 14-application-detail-archive-modal.html | | |
| M14a | 入居申込 承認モーダル | Approve Modal | モーダル | P2 | 14a-application-approve-modal.html | ✦ | |
| M14b | 入居申込 否認モーダル | Reject Modal | モーダル | P2 | 14b-application-reject-modal.html | | |
| M15 | チャット | Chat | 画面 | P2 | 15-chat.html | | |
| M16 | CSV エクスポート | CSV Export | 画面 | P2 | 16-csv-export.html | | |
| M17 | マスタデータ設定 | Master Data | 画面 | P3 | 17-master-data.html | | |

---

## 3. 仲介会社 / Broker Company  (プレフィックス: B)

| ID | 画面名 (JP) | Screen (EN) | 区分 | 優先度 | パス (jp/broker/) | 状態 | 工数(人日) |
|----|------------|-------------|------|:-----:|------------------|:---:|:--------:|
| B1 | ホーム | Home | 画面 | P2 | 01-home.html | ✦ | |
| B2 | 物件検索 (絞り込み) | Search – Filters | 画面 | P2 | 02-search-filter.html | | |
| B3 | 物件検索 (地図) | Search – Map | 画面 | P2 | 03-search-map.html | | |
| B4 | 検索結果 | Search Results | 画面 | P2 | 04-search-results.html | ✦ | |
| B5 | 物件詳細 | Property Detail | 画面 | P2 | 05-property-detail.html | ✦ | |
| B6 | 接客モード | Customer-Service Mode | 画面 | P2 | 06-customer-mode.html | | |
| B7 | 内見予約 (申込フォーム) | Viewing Booking | 画面 | P2 | 07-viewing-booking.html | | |
| B8 | My 内見 | My Viewings | 画面 | P2 | 08-my-viewings.html | | |
| B8.a | 内見キャンセルモーダル | Cancel Viewing Modal | モーダル | P2 | 08-my-viewings-cancel-modal.html | | |
| B9.1 | 入居申込 — ①貴社情報 | Apply — Your firm | ステップ | P2 | 09-application-form-step1-applicant.html | ✦ | |
| B9.2 | 入居申込 — ②申込種別 | Apply — Application type | ステップ | P2 | 09-application-form-step2-work.html | ✦ | |
| B9.3 | 入居申込 — ③契約情報 | Apply — Contract info | ステップ | P2 | 09-application-form-step3-emergency.html | ✦ | |
| B9.4 | 入居申込 — ④保証 | Apply — Guarantor | ステップ | P2 | 09-application-form-step4-guarantor.html | ✦ | |
| B9.5 | 入居申込 — ⑤申込者情報 | Apply — Applicant info | ステップ | P2 | 09-application-form-step5-tenants.html | ✦ | |
| B9.6 | 入居申込 — (廃止/Step5へ統合) | Apply — (Deprecated) | ステップ | P2 | 09-application-form-step6-documents.html | ✦ | |
| B9.d | 申込 下書き破棄モーダル | Discard Draft Modal | モーダル | P2 | 09-application-form-discard-modal.html | | |
| B10 | 入居申込 確認 / 送信 | Application Confirm | 画面 | P2 | 10-application-confirm.html | | |
| B11 | My 申込 | My Applications | 画面 | P2 | 11-my-applications.html | | |
| B11.a.1 | 取り下げ — 理由 | Withdraw — Reason | ステップ | P2 | 11-my-applications-withdraw-step1-reason.html | | |
| B11.a.2 | 取り下げ — 詳細 | Withdraw — Details | ステップ | P2 | 11-my-applications-withdraw-step2-details.html | | |
| B11.a.3 | 取り下げ — 最終確認 | Withdraw — Confirm | ステップ | P2 | 11-my-applications-withdraw-step3-confirm.html | | |
| B12 | チャット (仲介側) | Chat (Broker side) | 画面 | P2 | 12-chat.html | | |
| B13 | 初期費用シミュレーター | Initial Cost Calculator | 画面 | P2 | 13-cost-calculator.html | | |

---

## 4. 今回更新分（デザインレビュー 2026/06） / Recently updated

> 下記はデザインレビュー＋ライブシステム調査の所見を反映済み。見積もりでは「改修」扱い。

| ID | 画面 | 主な変更概要 |
|----|------|------------|
| FIX-S1 | 共通クローム（仲介サイドバー/トップバー） | 役割別ナビ刷新。全仲介画面に波及（B1–B13） |
| B1 | ホーム | KPI/CRM削除、お知らせ欄・検索ショートカット・★新築★追加 |
| B4 | 検索結果 | カード→高密度テーブル、比較パネル・一括操作・各種出力 |
| B5 | 物件詳細 | 接客モード起点復活、Square3タブ構成、概要/取引/設備拡張 |
| B9 | 入居申込 | 5ステップ構成へ再編（①貴社情報→②申込種別→③契約→④保証→⑤申込者） |
| M11 | 出稿コントロール | 3条件 安全ゲート新設、出稿ボタン無効化、36点ルール統一 |
| M14a | 承認モーダル | 確認チェック＋契約予定日ゲート、GMO Sign/Obic ERP自動処理 |
| M4 | 物件編集 概要 | 状態制御・固定ツールバー、編集フォーム化、画像スコア |

---

## 5. 見積もり用メモ / Estimation notes

- **2言語対応:** 各画面はJP/ENの2言語。共通コンポーネント（`L()` ヘルパー）で文言切替のため、言語追加コストは画面単位ではなく文言定義に集約。
- **共有コンポーネント:** トップバー / サイドバー / カード / ボタン / フォーム部品 / タブ等は共通化済み（`_shared/`）。個別画面工数は共有部品を除いた差分で見積もり可能。
- **外部連携（実装重）:** SUUMO / HOMES / AtHome / REINS(RAINZ) / 業者間B2B 出稿、GMO Sign 電子契約、Obic ERP 書き戻し、いい生活Square 連携。
- **高リスク操作:** M11 出稿、M14a 承認（終端処理）は安全ゲート・確認フロー・監査ログを含むため工数加算を推奨。
- **区分別の目安列（工数(人日)）** は空欄。画面=新規実装、モーダル/ステップ=本体画面に付随、改修(✦)=既存からの差分、で記入してください。

---

*出典: `index.html` スクリーンレジストリ / `pm/05-screen-specs/`*
*LENZ DX Co., Ltd. · tp-goodlife · v1.2.4 · 2026/05/26*
