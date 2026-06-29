# DISCV4 Phase 2

本階段完成重點：

1. 專案資料夾統一命名為 `DISCV4`。
2. localStorage / 暫存區統一使用 `DISCV4` 前綴：
   - `DISCV4_quiz_quick`
   - `DISCV4_quiz_professional`
   - `DISCV4_report`
3. 新增 `analysisEngine.js`，報告統一讀取 Analysis Object。
4. 新增 `reports/config.js`，後續教師版、個人版採組裝式擴充。
5. `report.html` 不再直接判斷 48 / 96 題；改用 feature detection。
6. 48 題快速版會自動隱藏「細項向度分析」區塊。
7. 96 題專業版未來題庫補齊後，若符合條件會自動顯示細項向度分析與多點雷達圖。

## 細項向度顯示規則

目前設定於 `js/data/questions.js` 的 `DISC_FORM_CONFIG`：

- quick：`subDimensionReport:false`
- professional：`subDimensionReport:true`，且至少需達 96 題

因此目前 48 題版本不會顯示細項向度預留區，避免使用者看到尚未完成的內容。

