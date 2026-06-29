/* DISCV4 Storage Layer
   所有暫存資料統一使用 DISCV4 前綴，避免與舊版互相污染。
   M3 起新增 settings / analysis 統一資料結構，報告版本與施測版本不再依賴網址參數。
*/
const DISC_STORAGE_PREFIX = 'DISCV4';
const DISC_SETTINGS_KEY = `${DISC_STORAGE_PREFIX}_settings`;
const DISC_ANALYSIS_KEY = `${DISC_STORAGE_PREFIX}_analysis`;
const DISC_REPORT_KEY = `${DISC_STORAGE_PREFIX}_report`; // 相容舊版 M2

const DISC_DEFAULT_SETTINGS = { reportType:'student', testVersion:'quick' };

function quizKey(form='quick'){
  return `${DISC_STORAGE_PREFIX}_quiz_${normalizeForm(form)}`;
}
function safeParseJSON(value, fallback){
  try { return JSON.parse(value || ''); }
  catch(e){ return fallback; }
}
function loadSettings(){
  const saved = safeParseJSON(localStorage.getItem(DISC_SETTINGS_KEY), {}) || {};
  return {
    reportType: normalizeMode(saved.reportType || saved.type || getMode()),
    testVersion: normalizeForm(saved.testVersion || saved.form || getForm())
  };
}
function saveSettings(settings={}){
  const current = loadSettings();
  const next = {
    reportType: normalizeMode(settings.reportType || settings.type || current.reportType || DISC_DEFAULT_SETTINGS.reportType),
    testVersion: normalizeForm(settings.testVersion || settings.form || current.testVersion || DISC_DEFAULT_SETTINGS.testVersion)
  };
  localStorage.setItem(DISC_SETTINGS_KEY, JSON.stringify(next));
  return next;
}
function loadQuizState(form){
  const selectedForm = normalizeForm(form || loadSettings().testVersion);
  return safeParseJSON(localStorage.getItem(quizKey(selectedForm)), {}) || {};
}
function saveQuizState(state, form){
  const selectedForm = normalizeForm(form || state?.form || loadSettings().testVersion);
  localStorage.setItem(quizKey(selectedForm), JSON.stringify(state || {}));
}
function clearQuizState(form){
  localStorage.removeItem(quizKey(form || loadSettings().testVersion));
}
function saveReportData(data){
  const report = data || {};
  const analysisPackage = {
    schemaVersion: 'DISCV4-analysis-package-v1',
    createdAt: new Date().toISOString(),
    reportType: normalizeMode(report.reportType || report.type || loadSettings().reportType),
    testVersion: normalizeForm(report.testVersion || report.form || loadSettings().testVersion),
    data: report
  };
  localStorage.setItem(DISC_ANALYSIS_KEY, JSON.stringify(analysisPackage));
  localStorage.setItem(DISC_REPORT_KEY, JSON.stringify(report)); // 舊版相容
  return analysisPackage;
}
function loadAnalysisPackage(){
  return safeParseJSON(localStorage.getItem(DISC_ANALYSIS_KEY), null);
}
function loadReportData(){
  const packaged = loadAnalysisPackage();
  if (packaged && packaged.data) {
    return {
      ...packaged.data,
      type: normalizeMode(packaged.reportType || packaged.data.type),
      form: normalizeForm(packaged.testVersion || packaged.data.form),
      reportType: normalizeMode(packaged.reportType || packaged.data.reportType || packaged.data.type),
      testVersion: normalizeForm(packaged.testVersion || packaged.data.testVersion || packaged.data.form)
    };
  }
  return safeParseJSON(localStorage.getItem(DISC_REPORT_KEY), null);
}
function clearReportData(){
  localStorage.removeItem(DISC_ANALYSIS_KEY);
  localStorage.removeItem(DISC_REPORT_KEY);
}
