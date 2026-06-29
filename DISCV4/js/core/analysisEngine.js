/* DISCV4 Analysis Engine
   第二階段重點：所有報告只讀 analysis object，不直接綁死 48 / 96 題。
*/
function buildAnalysis(data){
  const form = normalizeForm(data.form || 'quick');
  const questions = getActiveQuestions(form);
  const scoring = normalizeScoresForProfile(data.scores);
  const profile = profileDISC(data.scores);
  const formConfig = DISC_FORM_CONFIG[form] || DISC_FORM_CONFIG.quick;
  const subGroups = scoring.subDimensions || {};
  const subCount = Object.values(subGroups).reduce((sum, group) => sum + Object.keys(group || {}).length, 0);
  const featureRules = {
    subDimensionReport: !!formConfig.features?.subDimensionReport && scoring.itemCount >= (formConfig.featureMinimumItems?.subDimensionReport || 80) && subCount >= 8,
    subDimensionDataAvailable: subCount > 0,
    multiPointRadar: !!formConfig.features?.multiPointRadar && scoring.itemCount >= (formConfig.featureMinimumItems?.multiPointRadar || 80)
  };
  return {
    version: 'DISCV4-analysis-v2',
    form,
    formConfig,
    itemCount: scoring.itemCount || questions.length,
    profile,
    scoring,
    dimensions: scoring.dimensions || {},
    subDimensions: subGroups,
    features: featureRules,
    balance: {
      text: balanceInsight(profile),
      highest: profile.ranked[0],
      lowest: profile.ranked[profile.ranked.length-1]
    },
    combination: {
      code: profile.code,
      name: profile.name,
      main: profile.main,
      second: profile.second
    }
  };
}
function shouldRenderSubDimension(analysis){
  return !!analysis?.features?.subDimensionReport;
}
function getSubDimensionRows(analysis, dimensionKey){
  if (!analysis || !analysis.subDimensions || !analysis.subDimensions[dimensionKey]) return [];
  return Object.values(analysis.subDimensions[dimensionKey]).sort((a,b) => b.pct - a.pct || b.raw - a.raw);
}
