function hList(items){ return `<ul class="clean-list">${items.map(x => `<li>${x}</li>`).join('')}</ul>`; }
function tags(items){ return items.map(x => `<span class="tag">${x}</span>`).join(''); }
function section(chapter, title, body, extra=''){
  return `<section class="report-section ${extra}"><div class="chapter">${chapter}</div><h2>${title}</h2>${body}</section>`;
}
function formatScore(r){ return `${r.score}/${r.max}｜${r.pct}%`; }
function scoreBars(info){
  return info.ranked.map(r => `<div class="score-row">
    <div class="score-key" style="color:${r.color}">${r.key}</div>
    <div><strong>${r.label}｜${r.animal}</strong><div class="track"><div class="fill" style="width:${r.pct}%;background:${r.color}"></div></div></div>
    <div class="score-num">${r.pct}%</div>
  </div>`).join('');
}
function subDimensionBlock(analysis){
  if (!shouldRenderSubDimension(analysis)) return '';
  const blocks = DISC_DIMENSIONS.map(key => {
    const rows = getSubDimensionRows(analysis, key).slice(0, 4);
    if (!rows.length) return '';
    return `<div class="paper"><h3>${key} 細項向度</h3>${rows.map(s => `<div class="sub-row"><span>${typeof subDimensionLabel === 'function' ? subDimensionLabel(s.key) : s.key}</span><b>${s.pct}%</b></div>`).join('')}</div>`;
  }).join('');
  return section('共同分析 7', '細項向度分析', `<p>這一區會在 96 題專業版自動顯示，用來觀察每一個 DISC 向度底下更細的行為傾向。</p><div class="two-col">${blocks}</div>`);
}
function commonReport(data, analysis){
  const p = data.profile || {};
  const info = analysis.profile;
  const m = info.main, s = info.second;
  const formLabel = data.formLabel || getFormLabel(analysis.form);
  const subDimensionSection = subDimensionBlock(analysis);
  return `
  <section class="cover">
    <div class="cover-meta">DISC Professional AI｜${DISC_TYPE_LABEL[data.type || 'student']}｜${formLabel}</div>
    <div class="cover-grid">
      <div>
        <h1>${p.name || '未填姓名'} 的DISC行為模式報告</h1>
        <p class="cover-sub">${[p.className, p.seat ? '座號 ' + p.seat : '', p.date].filter(Boolean).join('　')}</p>
        <div class="type-card">
          <span class="tag">主要 ${m.key} ${m.animal}：${formatScore(m)}</span>
          <span class="tag">次要 ${s.key} ${s.animal}：${formatScore(s)}</span>
          <span class="tag">${info.name}</span>
        </div>
        <p class="warn">DISC不是人格標籤，而是行為模式。它適合用來理解自己、調整學習方式與練習人際互動，不作心理診斷。</p>
      </div>
      <div class="animal-portrait"><img src="${m.img}" alt="${m.animal}"><h2>${m.animal}</h2><p>${m.gift}</p></div>
    </div>
  </section>

  ${section('共同分析 1', 'DISC 是什麼？', `<p>DISC測的不是「你是什麼人」，而是「你比較習慣怎麼行動、怎麼表達、怎麼與人相處」。</p><div class="four-grid">
    ${Object.values(DISC_META).map(x => `<div class="mini"><img src="${x.img}"><b>${x.key} ${x.label}｜${x.animal}</b><span>${x.summary}</span></div>`).join('')}
  </div>`)}

  ${section('共同分析 2', '我的DISC分布', `<div class="analysis-grid"><div>${scoreBars(info)}${tags([`主要：${m.key} ${m.animal}`, `次要：${s.key} ${s.animal}`, `類型：${info.name}`])}</div><div class="chart-box"><canvas id="radar"></canvas></div></div><p class="insight">${analysis.balance.text}</p>`)}

  ${section('共同分析 3', '我的行為故事', `<div class="story">${combinedStory(info).replace(/\n/g,'<br>')}</div>`)}

  ${section('共同分析 4', '我的四個向度', `<div class="dimension-list">${info.ranked.map(r => `<div class="dimension"><div><b style="color:${r.color}">${r.key}｜${r.label}</b><span>${r.level}能量｜${formatScore(r)}</span></div><p>${fourDimensionLine(r)}</p></div>`).join('')}</div>`)}

  ${section('共同分析 5', '我的優勢與可能卡住的地方', `<div class="two-col"><div class="paper"><h3>我的優勢</h3>${hList(m.strengths)}</div><div class="paper"><h3>可能遇到的挑戰</h3>${hList(m.challenge)}</div></div><p>這些挑戰不是缺點，而是壓力變大或情境不適合時，可能比較容易出現的反應。</p>`)}

  ${section('共同分析 6', '我的壓力模式', `<p>${m.stress}</p><div class="path"><span>覺察壓力</span><span>先暫停</span><span>拆小步驟</span><span>重新開始</span></div>`)}

  ${subDimensionSection}
  `;
}
