const DISC_DIMENSIONS = ['D','I','S','C'];
const DISC_SCORE_SCALE = { min: 1, max: 5 };

function getForm(){
  const params = new URLSearchParams(location.search);
  return normalizeForm(params.get('form') || params.get('version') || 'quick');
}
function normalizeForm(form){
  return DISC_FORM_CONFIG[form] ? form : 'quick';
}
function getFormLabel(form){
  const cfg = DISC_FORM_CONFIG[normalizeForm(form)];
  const count = getActiveQuestions(form).length;
  const expected = cfg.expectedItems || count;
  return `${cfg.label}｜目前 ${count} 題${expected !== count ? `（目標 ${expected} 題）` : ''}`;
}
function normalizeQuestion(q, index){
  return {
    id: q.id || `Q${String(index+1).padStart(3,'0')}`,
    dimension: q.dimension || q.dim,
    subDimension: q.subDimension || 'General',
    text: q.text || q.t || '',
    reverse: !!q.reverse,
    weight: Number(q.weight || 1),
    forms: Array.isArray(q.forms) && q.forms.length ? q.forms : ['quick','professional'],
    tags: Array.isArray(q.tags) ? q.tags : []
  };
}
function getQuestionBank(){
  return (DISC_QUESTION_BANK || []).map(normalizeQuestion);
}
function getActiveQuestions(form='quick'){
  const f = normalizeForm(form);
  return getQuestionBank().filter(q => q.forms.includes(f));
}
function getQuestionRawScore(q, answer){
  const value = Number(answer || 0);
  if (!value) return 0;
  const scored = q.reverse ? (DISC_SCORE_SCALE.max + DISC_SCORE_SCALE.min - value) : value;
  return scored * q.weight;
}
function getQuestionMaxScore(q){
  return DISC_SCORE_SCALE.max * Number(q.weight || 1);
}
function getQuestionMinScore(q){
  return DISC_SCORE_SCALE.min * Number(q.weight || 1);
}
function isQuestionAnswered(answers, q){
  return answers && Number(answers[q.id]) >= DISC_SCORE_SCALE.min && Number(answers[q.id]) <= DISC_SCORE_SCALE.max;
}
function countAnswered(answers, questions){
  return questions.filter(q => isQuestionAnswered(answers, q)).length;
}
