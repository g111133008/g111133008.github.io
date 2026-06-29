# DISCV4 Phase 2 Framework 完成紀錄

本階段目標：讓 DISCV4 從「一份 report.html」進化成可以長期擴充的報告框架。

## 已完成

1. 恢復網址入口
   - `index.html?type=student&form=quick`
   - `index.html?type=teacher&form=quick`
   - `index.html?type=personal&form=quick`
   - 學生看不到其他版本的選擇。

2. 新增捷徑入口
   - `student.html`
   - `teacher.html`
   - `personal.html`

3. Report Assembler
   - 新增 `js/core/reportAssembler.js`
   - `report.html` 不再直接判斷 student / teacher / personal。
   - 報告內容由 Config + Section Registry 組裝。

4. Section Registry
   - 新增 `js/reports/sections.js`
   - 目前先包裝既有共同報告、學生報告、教師報告。
   - 後續可逐章拆成獨立 section 檔。

5. Report Config
   - 重寫 `js/reports/config.js`
   - 每個版本只定義要組裝哪些 section。

6. Prompt Library
   - 新增 `prompts/` 資料夾。
   - 已建立 common、student、teacher、personal 的提示詞範本。
   - 新增 `js/prompts/promptLibrary.js` 作為日後 AI Engine 讀取提示詞的介面。

## 下一步建議

1. 完成 Personal Report。
2. 將共同報告拆成更細的 section：cover、intro、distribution、story、dimensions、stress。
3. 建立更完整的 Print CSS 與頁碼。
4. 之後再進入 Prompt Library 正式整理與規格書撰寫。
