/* DISCV4 Phase 2 Report Assembler
   report.html 只負責載入資料與啟動組裝器；章節由 Registry + Config 決定。
*/
const DISCV4_SECTION_REGISTRY = {};

function registerReportSection(id, renderer){
  if (!id || typeof renderer !== 'function') return;
  DISCV4_SECTION_REGISTRY[id] = renderer;
}

function getReportSection(id){
  return DISCV4_SECTION_REGISTRY[id];
}

function renderConfiguredSections(sectionIds, context){
  return (sectionIds || []).map(id => {
    const renderer = getReportSection(id);
    if (!renderer) {
      return `<section class="report-section warning"><div class="chapter">系統提醒</div><h2>找不到章節：${id}</h2><p>這個章節尚未註冊，請檢查 reports/sections.js 與 reports/config.js。</p></section>`;
    }
    return renderer(context) || '';
  }).join('\n');
}

function renderReport(data, analysis){
  const mode = normalizeMode(data.type || data.reportType || getMode());
  const config = getReportConfig(mode);
  const context = { data, analysis, mode, form: normalizeForm(data.form || data.testVersion || getForm()) };
  return renderConfiguredSections(config.sections, context);
}
