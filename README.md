# 中美 1,181 家 AI 開發企業全名單

單文件靜態頁面，可檢索、可按國家與行業篩選。名單取自 RAND 報告 RR-A5043-1 的附件（美國 743 家、中國 438 家）；行業分組與公司簡介為人工整理，非 RAND 原始標籤。

## 部署

GitHub Pages，根目錄直出 `index.html`，無構建步驟。

## 統計埋點

`index.html` 頂部有一層 `T(name, props)` 上報函式，會自動適配已掛載的統計服務（Plausible / Umami / GA4 / 自建端點）。換服務只需改 `<head>` 裡那段註釋中對應的一行，頁面邏輯不用動；未掛載任何服務時事件靜默丟棄。

已埋事件：

| 事件 | 屬性 |
| --- | --- |
| `company_open` | `company`、`country`、`industry`、`from_search` |
| `search` | `q`（截 60 字）、`hits` |
| `filter_industry` | `industry` |
| `filter_country` | `country` |

搜索事件做了 1.2 秒 debounce，且只在輸入 ≥2 字時上報。
