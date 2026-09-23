# 中美 1,181 家 AI 开发企业全名单

单文件静态页面，可检索、可按国家与行业筛选。名单取自 RAND 报告 RR-A5043-1 的附件（美国 743 家、中国 438 家）；行业分组与公司简介为人工整理，非 RAND 原始标签。

## 部署

GitHub Pages，根目录直出 `index.html`，无构建步骤。

## 统计埋点

`index.html` 顶部有一层 `T(name, props)` 上报函式，会自动适配已挂载的统计服务（Plausible / Umami / GA4 / 自建端点）。换服务只需改 `<head>` 里那段注释中对应的一行，页面逻辑不用动；未挂载任何服务时事件静默丢弃。

已埋事件：

| 事件 | 属性 |
| --- | --- |
| `company_open` | `company`、`country`、`industry`、`from_search` |
| `search` | `q`（截 60 字）、`hits` |
| `outbound` | `company`、`engine` |
| `filter_industry` | `industry` |
| `filter_country` | `country` |

搜索事件做了 1.2 秒 debounce，且只在输入 ≥2 字时上报。
