function combinedStory(info){
  const m = info.main, s = info.second;
  if (info.code.length === 1) return m.story;
  return `${m.story}\n\n同時，你也帶著 ${s.animal} 的能量。這讓你不只是「${m.label}」，而是同時擁有「${m.summary}」與「${s.summary}」兩種力量。當這兩種力量合作時，你會更能在不同情境中找到自己的方式。`;
}
function fourDimensionLine(item){
  const lines = {
    D: `你的D能量代表推動與目標感。分數越高，越容易在需要決定和行動時站出來。`,
    I: `你的I能量代表表達與連結。分數越高，越容易透過互動、分享與鼓勵影響他人。`,
    S: `你的S能量代表穩定與支持。分數越高，越重視安全感、合作與關係中的信任。`,
    C: `你的C能量代表分析與品質。分數越高，越重視正確性、規則與完整度。`
  };
  return lines[item.key];
}
function actionLetter(profile, info){
  const name = profile.name || '你';
  const m = info.main;
  return `親愛的${name}：\n\n你不是被一個類型限制住的人。\n${m.animal}只是提醒你，你身上有一種很珍貴的力量：${m.gift}\n\n當你願意理解自己的節奏，也願意慢慢練習新的方法，原本讓你卡住的地方，也可能成為你長出能力的地方。\n\n請記得：你不需要變得完美，才值得被肯定。你只需要一步一步，成為更理解自己的你。`;
}
