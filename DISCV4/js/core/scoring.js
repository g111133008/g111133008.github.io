function emptyDimensionScore(key){
  return { key, raw:0, min:0, max:0, pct:0, average:0, count:0 };
}
function scoreDISC(answers, questions){
  const qs = questions || getActiveQuestions(getForm());
  const dimensions = { D:emptyDimensionScore('D'), I:emptyDimensionScore('I'), S:emptyDimensionScore('S'), C:emptyDimensionScore('C') };
  const subDimensions = { D:{}, I:{}, S:{}, C:{} };
  qs.forEach(q => {
    const dim = q.dimension;
    if (!dimensions[dim]) dimensions[dim] = emptyDimensionScore(dim);
    const raw = getQuestionRawScore(q, answers[q.id]);
    const max = getQuestionMaxScore(q);
    const min = getQuestionMinScore(q);
    dimensions[dim].raw += raw;
    dimensions[dim].max += max;
    dimensions[dim].min += min;
    dimensions[dim].count += 1;

    const sub = q.subDimension || 'General';
    if (!subDimensions[dim][sub]) subDimensions[dim][sub] = { key:sub, raw:0, max:0, min:0, count:0, pct:0 };
    subDimensions[dim][sub].raw += raw;
    subDimensions[dim][sub].max += max;
    subDimensions[dim][sub].min += min;
    subDimensions[dim][sub].count += 1;
  });
  Object.values(dimensions).forEach(d => {
    d.pct = d.max ? Math.round(d.raw / d.max * 100) : 0;
    d.average = d.count ? Number((d.raw / d.count).toFixed(2)) : 0;
  });
  Object.values(subDimensions).forEach(group => Object.values(group).forEach(s => {
    s.pct = s.max ? Math.round(s.raw / s.max * 100) : 0;
  }));
  return {
    schemaVersion: 'disc-engine-v1',
    scale: DISC_SCORE_SCALE,
    itemCount: qs.length,
    dimensions,
    subDimensions,
    legacy: Object.fromEntries(Object.entries(dimensions).map(([k,v]) => [k, v.raw]))
  };
}
function dimensionLevelByPct(pct){
  if (pct >= 80) return '高';
  if (pct >= 60) return '中高';
  if (pct >= 42) return '中';
  return '低';
}
function normalizeScoresForProfile(scores){
  if (scores && scores.dimensions) return scores;
  const legacy = scores || {D:0,I:0,S:0,C:0};
  const dimensions = {};
  Object.keys(DISC_META).forEach(k => {
    const raw = Number(legacy[k] || 0);
    dimensions[k] = {key:k, raw, max:60, pct:Math.round(raw / 60 * 100), average:0, count:12};
  });
  return { schemaVersion:'legacy', dimensions, legacy };
}
function profileDISC(scores){
  const normalized = normalizeScoresForProfile(scores);
  const ranked = Object.keys(DISC_META).map(k => {
    const d = normalized.dimensions[k] || emptyDimensionScore(k);
    return {
      ...DISC_META[k],
      score: Number(d.raw.toFixed ? d.raw.toFixed(1) : d.raw),
      max: d.max,
      pct: d.pct,
      average: d.average,
      count: d.count,
      level: dimensionLevelByPct(d.pct)
    };
  }).sort((a,b) => b.pct - a.pct || b.score - a.score);
  const main = ranked[0];
  const second = ranked[1];
  const code = main.pct - second.pct <= 8 ? main.key + second.key : main.key;
  const name = code.length === 1 ? main.title : (DISC_COMBO_NAMES[code] || `${main.key}${second.key}混合型`);
  return { ranked, main, second, code, name, scoring: normalized };
}
function balanceInsight(info){
  const high = info.ranked.filter(x => x.pct >= 75).map(x => x.key);
  const low = info.ranked.filter(x => x.pct <= 45).map(x => x.key);
  if (high.length >= 3) return '你的四個向度都有一定能量，代表你能在不同情境中切換方式。提醒自己：不是每個場合都需要同時用力，選擇最適合當下的回應就好。';
  if (low.length >= 2) return '你的行為模式相對集中，這會讓優勢很清楚，但也可能在某些情境中感到吃力。成長的方向不是改變自己，而是練習補上一點彈性。';
  return `你的主要能量集中在 ${info.main.key}，次要能量是 ${info.second.key}。這代表你有清楚的核心風格，同時也保留另一種輔助力量。`;
}
function getSubDimensionSummary(scoring, dimensionKey){
  if (!scoring || !scoring.subDimensions || !scoring.subDimensions[dimensionKey]) return [];
  return Object.values(scoring.subDimensions[dimensionKey]).sort((a,b) => b.pct - a.pct);
}
