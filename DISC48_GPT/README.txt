DISC v1 48題合併精簡版

單一目錄，只有一組：
- index.html
- report.html
- assets/
- manifest.json

網址：
- index.html?type=student
- index.html?type=teacher
- index.html?type=personal

產生報告後會自動帶到：
- report.html?type=student
- report.html?type=teacher
- report.html?type=personal

report.html 會依 type 顯示不同資料。
如果沒有帶 type，預設 student。


修正版說明：
- student / teacher / personal 三種版本共用同一份答案暫存。
- type 只決定 report.html 顯示哪些分析內容。
- 因為分數來源相同，所以三種版本的 DISC 排序與代表動物會一致。
- 產生報告後可直接切換：
  report.html?type=student
  report.html?type=teacher
  report.html?type=personal


本版修正：
- teacher 報告前半段完整保留 student 報告內容。
- teacher 報告只是在 student 內容後方追加「教師參考資料」。


本版再修正：
- 答案暫存鍵固定為 disc48_shared_answers_v2。
- 報告資料鍵固定為 disc48_shared_report_v2。
- student / teacher / personal 不再有各自分數資料。
- type 只控制 report.html 顯示哪些內容，不控制計分。
- 載入時會清除舊版分開儲存的資料，避免舊暫存造成三版分數不同。
