function drawRadar(canvas, scores){
  if (!canvas) return;
  const scoring = normalizeScoresForProfile(scores);
  const parentWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 520;
  const size = Math.max(280, Math.min(parentWidth, 520));
  const dpr = window.devicePixelRatio || 1;
  canvas.style.width = size + 'px'; canvas.style.height = size + 'px';
  canvas.width = size * dpr; canvas.height = size * dpr;
  const ctx = canvas.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,size,size);
  const keys = ['D','I','S','C'];
  const cx = size/2, cy = size/2 + 6, radius = size * .32;
  for (let lv=1; lv<=5; lv++){
    const r = radius * lv / 5;
    ctx.beginPath();
    keys.forEach((k,i)=>{
      const a = -Math.PI/2 + i * Math.PI*2/keys.length;
      const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.closePath(); ctx.strokeStyle = '#dfe7ef'; ctx.stroke();
  }
  keys.forEach((k,i)=>{
    const a = -Math.PI/2 + i * Math.PI*2/keys.length;
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx + radius*Math.cos(a), cy + radius*Math.sin(a));
    ctx.strokeStyle = '#edf2f7'; ctx.stroke();
    const d = scoring.dimensions[k];
    ctx.fillStyle = DISC_META[k].color; ctx.font = '800 20px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(k, cx + (radius+42)*Math.cos(a), cy + (radius+42)*Math.sin(a));
    ctx.fillStyle = '#697586'; ctx.font = '13px sans-serif';
    ctx.fillText(`${d.pct}%`, cx + (radius+42)*Math.cos(a), cy + (radius+42)*Math.sin(a) + 22);
  });
  const pts = keys.map((k,i)=>{
    const a = -Math.PI/2 + i * Math.PI*2/keys.length;
    const pct = scoring.dimensions[k].pct || 0;
    const r = radius * pct / 100;
    return [cx + r*Math.cos(a), cy + r*Math.sin(a)];
  });
  ctx.beginPath(); pts.forEach((p,i)=> i ? ctx.lineTo(p[0],p[1]) : ctx.moveTo(p[0],p[1])); ctx.closePath();
  ctx.fillStyle = 'rgba(78, 111, 145, .22)'; ctx.fill();
  ctx.strokeStyle = '#4e6f91'; ctx.lineWidth = 3; ctx.stroke();
  pts.forEach(p => { ctx.beginPath(); ctx.arc(p[0],p[1],5,0,Math.PI*2); ctx.fillStyle = '#4e6f91'; ctx.fill(); });
}

function drawAdaptiveRadar(canvas, analysis){
  if (!canvas) return;
  if (!analysis || !analysis.features || !analysis.features.multiPointRadar) {
    drawRadar(canvas, analysis?.scoring || analysis);
    return;
  }
  const points = [];
  // 96題版的細項雷達圖：每個 DISC 向度取前 4 個細項，避免只顯示單一向度。
  DISC_DIMENSIONS.forEach(dim => {
    getSubDimensionRows(analysis, dim).slice(0, 4).forEach(row => points.push({
      key: row.key,
      label: `${dim}-${typeof subDimensionLabel === 'function' ? subDimensionLabel(row.key) : row.key}`,
      pct: row.pct,
      color: DISC_META[dim].color
    }));
  });
  if (points.length < 5) return drawRadar(canvas, analysis.scoring);
  drawPolygonRadar(canvas, points);
}
function drawPolygonRadar(canvas, points){
  const parentWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 560;
  const size = Math.max(320, Math.min(parentWidth, 620));
  const dpr = window.devicePixelRatio || 1;
  canvas.style.width = size + 'px'; canvas.style.height = size + 'px';
  canvas.width = size * dpr; canvas.height = size * dpr;
  const ctx = canvas.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,size,size);
  const cx = size/2, cy = size/2 + 8, radius = size * .30;
  const n = points.length;
  for (let lv=1; lv<=5; lv++){
    const r = radius * lv / 5;
    ctx.beginPath();
    points.forEach((p,i)=>{
      const a = -Math.PI/2 + i * Math.PI*2/n;
      const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.closePath(); ctx.strokeStyle = '#dfe7ef'; ctx.stroke();
  }
  const pts = points.map((p,i)=>{
    const a = -Math.PI/2 + i * Math.PI*2/n;
    const r = radius * (p.pct || 0) / 100;
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+radius*Math.cos(a), cy+radius*Math.sin(a));
    ctx.strokeStyle = '#edf2f7'; ctx.stroke();
    ctx.fillStyle = p.color || '#4e6f91'; ctx.font = '700 11px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const lx = cx + (radius+38)*Math.cos(a), ly = cy + (radius+38)*Math.sin(a);
    ctx.fillText(p.label, lx, ly);
    return [cx+r*Math.cos(a), cy+r*Math.sin(a)];
  });
  ctx.beginPath(); pts.forEach((p,i)=> i ? ctx.lineTo(p[0],p[1]) : ctx.moveTo(p[0],p[1])); ctx.closePath();
  ctx.fillStyle = 'rgba(78, 111, 145, .20)'; ctx.fill();
  ctx.strokeStyle = '#4e6f91'; ctx.lineWidth = 2.5; ctx.stroke();
}
