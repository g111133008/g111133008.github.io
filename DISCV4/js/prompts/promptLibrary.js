/* DISCV4 Prompt Library Interface
   瀏覽器純前端版暫不讀取 markdown 檔案；此檔作為日後接 AI API 的統一介面。
*/
const DISCV4_PROMPT_LIBRARY = {
  commonStory: 'prompts/common/story.md',
  studentLetter: 'prompts/student/letter.md',
  teacherClassroom: 'prompts/teacher/classroom.md',
  personalCareer: 'prompts/personal/career.md'
};

function getPromptPath(key){
  return DISCV4_PROMPT_LIBRARY[key] || null;
}

function buildPromptContext(data, analysis){
  return {
    profile: data.profile || {},
    main: analysis.profile.main,
    second: analysis.profile.second,
    scores: analysis.profile.ranked.map(r => `${r.key}:${r.pct}%`).join(', '),
    strengths: analysis.profile.main.strengths || [],
    challenges: analysis.profile.main.challenge || []
  };
}
