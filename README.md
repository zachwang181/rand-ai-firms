# 中美 1,181 家 AI 開發企業全名單

單檔靜態頁面，可檢索、可按國家與行業篩選。名單取自 RAND 報告
[RR-A5043-1](https://www.rand.org/pubs/research_reports/RRA5043-1.html)
的附件（美國 743 家、中國 438 家）；行業分組、公司簡介、對標群組皆為額外整理，非 RAND 原始標籤。

線上版本：<https://zachwang181.github.io/rand-ai-firms/>

## 建置

```
node build.js
```

`data/firms.json` + `src/page.html` → `index.html`。無其他相依套件，產出仍是單檔靜態頁，GitHub Pages 由根目錄直出。**不要直接改 `index.html`，它會被覆蓋。**

## 資料

`data/firms.json` 的欄位：

| 鍵 | 內容 |
| --- | --- |
| `cats` | 14 個行業分類 |
| `firms` | `us` / `cn` 兩份名單，每筆為 `[公司名, 行業代號, id]` |
| `profiles` | 870 家的簡介：`w` 主營業務、`b` 詳述、`p` 產品、`pd` 產品說明、`g` 進展、`l` 地點、`y` 成立年 |
| `market` | 199 家上市公司：`t` 代碼、`x` 交易所、`mc` 市值、`em` 員工數、`rv` 年營收、`ni` 年淨利、`qcur` 報價幣別、`cur` 財報幣別 |
| `marketAsOf` | 財務資料查核日期 |
| `groups` | 48 個對標群組 |
| `peers` | 894 家的群組歸屬，對標由此推導 |

市值用報價幣別、營收淨利用財報幣別 —— 43 家港股與中概股兩者不同，混用會標錯。

財務資料以 yfinance 抓取，重跑即可更新，記得同步更新 `marketAsOf`。

## 統計埋點

`index.html` 頂部有一層 `T(name, props)` 上報函式，自動適配已掛載的統計服務（Plausible / Umami / GA4 / 自建端點）。換服務只需改 `<head>` 裡對應的一行；未掛載時事件靜默丟棄。

| 事件 | 屬性 |
| --- | --- |
| `company_open` | `company`、`country`、`industry`、`from_search` |
| `search` | `q`（截 60 字）、`hits` |
| `peer_jump` | `from`、`to` |
| `filter_industry` | `industry` |
| `filter_country` | `country` |

搜尋事件做了 1.2 秒 debounce，且只在輸入 ≥2 字時上報。

## 資料品質原則

查不到的一律留白，不編造。870 家有簡介、389 家有產品說明、894 家有對標群組，其餘是公開資訊不足或信心不足而刻意留空的。
