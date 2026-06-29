/* DISCV4 Phase 2 Section Registry
   目前先把既有共同報告、學生版、教師版包裝成可組裝章節。
   後續可以逐章拆成 cover.js、story.js、learning.js 等獨立檔案。
*/
registerReportSection('commonPackage', ({data, analysis}) => commonReport(data, analysis));
registerReportSection('studentPackage', ({data, analysis}) => studentReport(data, analysis.profile));
registerReportSection('teacherPackage', ({data, analysis}) => teacherReport(data, analysis));
registerReportSection('personalPackage', ({data, analysis}) => personalReport(data, analysis));
