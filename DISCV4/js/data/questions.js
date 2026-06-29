/*
  DISC Professional AI Question Bank
  ------------------------------------------------------------
  第一階段重構重點：題庫不再綁死 48 題或 96 題。

  每一題都是一筆資料，未來新增 96 題時，只要繼續往 DISC_QUESTION_BANK
  增加題目，並把 forms 設為 ['professional'] 或 ['quick','professional']。

  欄位說明：
  id            題目唯一代碼，不要重複。作答資料會用 id 儲存。
  dimension     D / I / S / C
  subDimension  細項向度。96 題版可以用它產生更細緻分析。
  text          題目文字。
  reverse       是否反向題。true 時會自動用 6 - 作答分數計算。
  weight        權重。一般為 1。未來可用 1.2、0.8 調整題目比重。
  forms         題目屬於哪些施測版本：quick、professional。
  tags          題目標籤，未來可支援學生、教師、生涯、情緒等分析。
*/


const DISC_SUBDIMENSION_LABELS = {
  // D 支配型
  Assertiveness: '主動積極',
  Decisiveness: '決策果斷',
  Leadership: '領導影響',
  Challenge: '挑戰企圖',

  // I 影響型
  Sociability: '社交互動',
  Communication: '表達溝通',
  Influence: '人際影響',
  OptimismCreativity: '樂觀創意',

  // S 穩定型
  PatienceStability: '耐心穩定',
  CooperationSupport: '合作支持',
  EmpathyCare: '同理關懷',
  HarmonyTrust: '和諧信任',

  // C 謹慎型
  AnalysisThinking: '分析思考',
  AccuracyQuality: '精確品質',
  OrganizationPlanning: '組織規劃',
  Conscientiousness: '自我要求',

  General: '一般傾向'
};
function subDimensionLabel(key){
  return DISC_SUBDIMENSION_LABELS[key] || key;
}

const DISC_FORM_CONFIG = {
  quick: {
    key: 'quick',
    label: '48題快速版',
    expectedItems: 48,
    description: '適合班級、團體與大量施測。',
    features: { subDimensionReport:false, multiPointRadar:false },
    featureMinimumItems: { subDimensionReport:96, multiPointRadar:96 }
  },
  professional: {
    key: 'professional',
    label: '96題專業版',
    expectedItems: 96,
    description: '96題完整量表，提供更穩定的四型分數與細項向度分析。',
    features: { subDimensionReport:true, multiPointRadar:true },
    featureMinimumItems: { subDimensionReport:96, multiPointRadar:96 }
  }
};

const DISC_QUESTION_BANK = [
  {id:'Q001', dimension:'D', subDimension:'Assertiveness', text:'我喜歡在團體中主動提出方向。', reverse:false, weight:1, forms:['quick','professional'], tags:['leadership','goal','decision']},
  {id:'Q002', dimension:'D', subDimension:'Decisiveness', text:'遇到問題時，我傾向快速做決定。', reverse:false, weight:1, forms:['quick','professional'], tags:['leadership','goal','decision']},
  {id:'Q003', dimension:'D', subDimension:'Challenge', text:'我喜歡有挑戰性的任務。', reverse:false, weight:1, forms:['quick','professional'], tags:['leadership','goal','decision']},
  {id:'Q004', dimension:'D', subDimension:'Decisiveness', text:'我不喜歡事情拖太久。', reverse:false, weight:1, forms:['quick','professional'], tags:['leadership','goal','decision']},
  {id:'Q005', dimension:'D', subDimension:'Leadership', text:'需要有人負責時，我可以站出來。', reverse:false, weight:1, forms:['quick','professional'], tags:['leadership','goal','decision']},
  {id:'Q006', dimension:'D', subDimension:'Challenge', text:'我重視效率與結果。', reverse:false, weight:1, forms:['quick','professional'], tags:['leadership','goal','decision']},
  {id:'Q007', dimension:'D', subDimension:'Assertiveness', text:'我能直接說出自己的意見。', reverse:false, weight:1, forms:['quick','professional'], tags:['leadership','goal','decision']},
  {id:'Q008', dimension:'D', subDimension:'Leadership', text:'我喜歡掌握事情的進度。', reverse:false, weight:1, forms:['quick','professional'], tags:['leadership','goal','decision']},
  {id:'Q009', dimension:'D', subDimension:'Challenge', text:'我不怕面對困難或競爭。', reverse:false, weight:1, forms:['quick','professional'], tags:['leadership','goal','decision']},
  {id:'Q010', dimension:'D', subDimension:'Leadership', text:'我希望自己能影響事情的走向。', reverse:false, weight:1, forms:['quick','professional'], tags:['leadership','goal','decision']},
  {id:'Q011', dimension:'D', subDimension:'Leadership', text:'我做事常先看目標是什麼。', reverse:false, weight:1, forms:['quick','professional'], tags:['leadership','goal','decision']},
  {id:'Q012', dimension:'D', subDimension:'Assertiveness', text:'我不太喜歡被過度限制。', reverse:false, weight:1, forms:['quick','professional'], tags:['leadership','goal','decision']},
  {id:'Q013', dimension:'D', subDimension:'Decisiveness', text:'我遇到卡關時會想立刻找方法突破。', reverse:false, weight:1, forms:['professional'], tags:['leadership','goal','decision']},
  {id:'Q014', dimension:'D', subDimension:'Leadership', text:'我可以承擔決定後的結果。', reverse:false, weight:1, forms:['professional'], tags:['leadership','goal','decision']},
  {id:'Q015', dimension:'D', subDimension:'Challenge', text:'我喜歡設定高一點的標準挑戰自己。', reverse:false, weight:1, forms:['professional'], tags:['leadership','goal','decision']},
  {id:'Q016', dimension:'D', subDimension:'Assertiveness', text:'我不喜歡一直等待別人安排。', reverse:false, weight:1, forms:['professional'], tags:['leadership','goal','decision']},
  {id:'Q017', dimension:'D', subDimension:'Challenge', text:'我常希望事情能更快完成。', reverse:false, weight:1, forms:['professional'], tags:['leadership','goal','decision']},
  {id:'Q018', dimension:'D', subDimension:'Decisiveness', text:'我在討論中會想抓住重點和結論。', reverse:false, weight:1, forms:['professional'], tags:['leadership','goal','decision']},
  {id:'Q019', dimension:'D', subDimension:'Decisiveness', text:'我覺得行動比一直想更重要。', reverse:false, weight:1, forms:['professional'], tags:['leadership','goal','decision']},
  {id:'Q020', dimension:'D', subDimension:'Leadership', text:'我面對壓力時會想掌控局面。', reverse:false, weight:1, forms:['professional'], tags:['leadership','goal','decision']},
  {id:'Q021', dimension:'D', subDimension:'Challenge', text:'我喜歡競賽或有勝負的任務。', reverse:false, weight:1, forms:['professional'], tags:['leadership','goal','decision']},
  {id:'Q022', dimension:'D', subDimension:'Decisiveness', text:'我能在別人猶豫時做出決定。', reverse:false, weight:1, forms:['professional'], tags:['leadership','goal','decision']},
  {id:'Q023', dimension:'D', subDimension:'Assertiveness', text:'我會主動爭取自己想要的機會。', reverse:false, weight:1, forms:['professional'], tags:['leadership','goal','decision']},
  {id:'Q024', dimension:'D', subDimension:'Assertiveness', text:'我希望自己在團體中有影響力。', reverse:false, weight:1, forms:['professional'], tags:['leadership','goal','decision']},

  {id:'Q025', dimension:'I', subDimension:'Sociability', text:'我喜歡和人聊天互動。', reverse:false, weight:1, forms:['quick','professional'], tags:['social','communication','creativity']},
  {id:'Q026', dimension:'I', subDimension:'Influence', text:'我容易帶動氣氛。', reverse:false, weight:1, forms:['quick','professional'], tags:['social','communication','creativity']},
  {id:'Q027', dimension:'I', subDimension:'Communication', text:'我喜歡表達自己的想法。', reverse:false, weight:1, forms:['quick','professional'], tags:['social','communication','creativity']},
  {id:'Q028', dimension:'I', subDimension:'OptimismCreativity', text:'我喜歡有趣、活潑的學習方式。', reverse:false, weight:1, forms:['quick','professional'], tags:['social','communication','creativity']},
  {id:'Q029', dimension:'I', subDimension:'Influence', text:'我常能讓身邊的人笑或放鬆。', reverse:false, weight:1, forms:['quick','professional'], tags:['social','communication','creativity']},
  {id:'Q030', dimension:'I', subDimension:'Sociability', text:'我喜歡參加活動或認識新朋友。', reverse:false, weight:1, forms:['quick','professional'], tags:['social','communication','creativity']},
  {id:'Q031', dimension:'I', subDimension:'OptimismCreativity', text:'我對創意點子很有興趣。', reverse:false, weight:1, forms:['quick','professional'], tags:['social','communication','creativity']},
  {id:'Q032', dimension:'I', subDimension:'Communication', text:'我比較容易用說的方式整理想法。', reverse:false, weight:1, forms:['quick','professional'], tags:['social','communication','creativity']},
  {id:'Q033', dimension:'I', subDimension:'Sociability', text:'我喜歡被鼓勵或被看見。', reverse:false, weight:1, forms:['quick','professional'], tags:['social','communication','creativity']},
  {id:'Q034', dimension:'I', subDimension:'Communication', text:'我願意在團體中分享自己的經驗。', reverse:false, weight:1, forms:['quick','professional'], tags:['social','communication','creativity']},
  {id:'Q035', dimension:'I', subDimension:'Sociability', text:'我常被別人的情緒或氣氛影響。', reverse:false, weight:1, forms:['quick','professional'], tags:['social','communication','creativity']},
  {id:'Q036', dimension:'I', subDimension:'OptimismCreativity', text:'我喜歡自由、有變化的任務。', reverse:false, weight:1, forms:['quick','professional'], tags:['social','communication','creativity']},
  {id:'Q037', dimension:'I', subDimension:'OptimismCreativity', text:'我喜歡嘗試新鮮、有趣的活動。', reverse:false, weight:1, forms:['professional'], tags:['social','communication','creativity']},
  {id:'Q038', dimension:'I', subDimension:'OptimismCreativity', text:'我常會想到一些讓事情更好玩的點子。', reverse:false, weight:1, forms:['professional'], tags:['social','communication','creativity']},
  {id:'Q039', dimension:'I', subDimension:'Communication', text:'我喜歡透過互動來學習。', reverse:false, weight:1, forms:['professional'], tags:['social','communication','creativity']},
  {id:'Q040', dimension:'I', subDimension:'Influence', text:'我容易注意到團體氣氛是否活絡。', reverse:false, weight:1, forms:['professional'], tags:['social','communication','creativity']},
  {id:'Q041', dimension:'I', subDimension:'Communication', text:'我喜歡用故事或例子說明事情。', reverse:false, weight:1, forms:['professional'], tags:['social','communication','creativity']},
  {id:'Q042', dimension:'I', subDimension:'Influence', text:'我常能鼓勵別人一起參與。', reverse:false, weight:1, forms:['professional'], tags:['social','communication','creativity']},
  {id:'Q043', dimension:'I', subDimension:'Sociability', text:'我在輕鬆的氣氛中表現比較好。', reverse:false, weight:1, forms:['professional'], tags:['social','communication','creativity']},
  {id:'Q044', dimension:'I', subDimension:'Influence', text:'我喜歡被肯定與正向回饋。', reverse:false, weight:1, forms:['professional'], tags:['social','communication','creativity']},
  {id:'Q045', dimension:'I', subDimension:'Sociability', text:'我覺得人際互動能帶給我能量。', reverse:false, weight:1, forms:['professional'], tags:['social','communication','creativity']},
  {id:'Q046', dimension:'I', subDimension:'Communication', text:'我願意在大家面前分享或表演。', reverse:false, weight:1, forms:['professional'], tags:['social','communication','creativity']},
  {id:'Q047', dimension:'I', subDimension:'Influence', text:'我喜歡用創意方式完成作業。', reverse:false, weight:1, forms:['professional'], tags:['social','communication','creativity']},
  {id:'Q048', dimension:'I', subDimension:'OptimismCreativity', text:'我不喜歡太沉悶、太制式的活動。', reverse:false, weight:1, forms:['professional'], tags:['social','communication','creativity']},

  {id:'Q049', dimension:'S', subDimension:'PatienceStability', text:'我喜歡穩定、有安全感的環境。', reverse:false, weight:1, forms:['quick','professional'], tags:['relationship','support','stability']},
  {id:'Q050', dimension:'S', subDimension:'EmpathyCare', text:'我願意傾聽別人的心情。', reverse:false, weight:1, forms:['quick','professional'], tags:['relationship','support','stability']},
  {id:'Q051', dimension:'S', subDimension:'HarmonyTrust', text:'我不喜歡衝突或吵架。', reverse:false, weight:1, forms:['quick','professional'], tags:['relationship','support','stability']},
  {id:'Q052', dimension:'S', subDimension:'CooperationSupport', text:'我做事通常會配合團體節奏。', reverse:false, weight:1, forms:['quick','professional'], tags:['relationship','support','stability']},
  {id:'Q053', dimension:'S', subDimension:'PatienceStability', text:'我喜歡清楚而穩定的安排。', reverse:false, weight:1, forms:['quick','professional'], tags:['relationship','support','stability']},
  {id:'Q054', dimension:'S', subDimension:'EmpathyCare', text:'我常會顧慮別人的感受。', reverse:false, weight:1, forms:['quick','professional'], tags:['relationship','support','stability']},
  {id:'Q055', dimension:'S', subDimension:'CooperationSupport', text:'我願意在背後支持別人。', reverse:false, weight:1, forms:['quick','professional'], tags:['relationship','support','stability']},
  {id:'Q056', dimension:'S', subDimension:'HarmonyTrust', text:'我面對突然改變時會需要時間適應。', reverse:false, weight:1, forms:['quick','professional'], tags:['relationship','support','stability']},
  {id:'Q057', dimension:'S', subDimension:'PatienceStability', text:'我不太喜歡被催促。', reverse:false, weight:1, forms:['quick','professional'], tags:['relationship','support','stability']},
  {id:'Q058', dimension:'S', subDimension:'HarmonyTrust', text:'我重視承諾與信任。', reverse:false, weight:1, forms:['quick','professional'], tags:['relationship','support','stability']},
  {id:'Q059', dimension:'S', subDimension:'CooperationSupport', text:'我喜歡和熟悉的人一起合作。', reverse:false, weight:1, forms:['quick','professional'], tags:['relationship','support','stability']},
  {id:'Q060', dimension:'S', subDimension:'HarmonyTrust', text:'我常希望大家相處和諧。', reverse:false, weight:1, forms:['quick','professional'], tags:['relationship','support','stability']},
  {id:'Q061', dimension:'S', subDimension:'CooperationSupport', text:'我在團體中通常不想製造麻煩。', reverse:false, weight:1, forms:['professional'], tags:['relationship','support','stability']},
  {id:'Q062', dimension:'S', subDimension:'PatienceStability', text:'我願意慢慢陪伴別人完成事情。', reverse:false, weight:1, forms:['professional'], tags:['relationship','support','stability']},
  {id:'Q063', dimension:'S', subDimension:'PatienceStability', text:'我喜歡有固定流程的任務。', reverse:false, weight:1, forms:['professional'], tags:['relationship','support','stability']},
  {id:'Q064', dimension:'S', subDimension:'EmpathyCare', text:'我覺得關係穩定比表現突出更重要。', reverse:false, weight:1, forms:['professional'], tags:['relationship','support','stability']},
  {id:'Q065', dimension:'S', subDimension:'EmpathyCare', text:'我會在意別人是否感到舒服。', reverse:false, weight:1, forms:['professional'], tags:['relationship','support','stability']},
  {id:'Q066', dimension:'S', subDimension:'PatienceStability', text:'我不喜歡太突然的要求或變動。', reverse:false, weight:1, forms:['professional'], tags:['relationship','support','stability']},
  {id:'Q067', dimension:'S', subDimension:'HarmonyTrust', text:'我需要一點時間才會信任新環境。', reverse:false, weight:1, forms:['professional'], tags:['relationship','support','stability']},
  {id:'Q068', dimension:'S', subDimension:'CooperationSupport', text:'我願意為團隊默默付出。', reverse:false, weight:1, forms:['professional'], tags:['relationship','support','stability']},
  {id:'Q069', dimension:'S', subDimension:'EmpathyCare', text:'我常把別人的需求放在心上。', reverse:false, weight:1, forms:['professional'], tags:['relationship','support','stability']},
  {id:'Q070', dimension:'S', subDimension:'EmpathyCare', text:'我比較喜歡溫和的溝通方式。', reverse:false, weight:1, forms:['professional'], tags:['relationship','support','stability']},
  {id:'Q071', dimension:'S', subDimension:'HarmonyTrust', text:'我不喜歡被迫立刻表態。', reverse:false, weight:1, forms:['professional'], tags:['relationship','support','stability']},
  {id:'Q072', dimension:'S', subDimension:'CooperationSupport', text:'我希望自己是可靠、值得信任的人。', reverse:false, weight:1, forms:['professional'], tags:['relationship','support','stability']},

  {id:'Q073', dimension:'C', subDimension:'AccuracyQuality', text:'我做事會注意細節。', reverse:false, weight:1, forms:['quick','professional'], tags:['analysis','quality','detail']},
  {id:'Q074', dimension:'C', subDimension:'OrganizationPlanning', text:'我喜歡有規則、有標準的任務。', reverse:false, weight:1, forms:['quick','professional'], tags:['analysis','quality','detail']},
  {id:'Q075', dimension:'C', subDimension:'AnalysisThinking', text:'我會在行動前先想清楚。', reverse:false, weight:1, forms:['quick','professional'], tags:['analysis','quality','detail']},
  {id:'Q076', dimension:'C', subDimension:'AccuracyQuality', text:'我不喜歡草率完成事情。', reverse:false, weight:1, forms:['quick','professional'], tags:['analysis','quality','detail']},
  {id:'Q077', dimension:'C', subDimension:'AccuracyQuality', text:'我重視正確性與品質。', reverse:false, weight:1, forms:['quick','professional'], tags:['analysis','quality','detail']},
  {id:'Q078', dimension:'C', subDimension:'AccuracyQuality', text:'我會檢查自己的錯誤。', reverse:false, weight:1, forms:['quick','professional'], tags:['analysis','quality','detail']},
  {id:'Q079', dimension:'C', subDimension:'AnalysisThinking', text:'我喜歡分析原因與資料。', reverse:false, weight:1, forms:['quick','professional'], tags:['analysis','quality','detail']},
  {id:'Q080', dimension:'C', subDimension:'OrganizationPlanning', text:'我對不清楚的要求會感到不安。', reverse:false, weight:1, forms:['quick','professional'], tags:['analysis','quality','detail']},
  {id:'Q081', dimension:'C', subDimension:'Conscientiousness', text:'我常希望事情可以更完整。', reverse:false, weight:1, forms:['quick','professional'], tags:['analysis','quality','detail']},
  {id:'Q082', dimension:'C', subDimension:'Conscientiousness', text:'我比較喜歡有準備後再發表。', reverse:false, weight:1, forms:['quick','professional'], tags:['analysis','quality','detail']},
  {id:'Q083', dimension:'C', subDimension:'AccuracyQuality', text:'我會注意別人沒注意到的小地方。', reverse:false, weight:1, forms:['quick','professional'], tags:['analysis','quality','detail']},
  {id:'Q084', dimension:'C', subDimension:'AnalysisThinking', text:'我做選擇時會考慮風險。', reverse:false, weight:1, forms:['quick','professional'], tags:['analysis','quality','detail']},
  {id:'Q085', dimension:'C', subDimension:'OrganizationPlanning', text:'我喜歡有明確評分標準的作業。', reverse:false, weight:1, forms:['professional'], tags:['analysis','quality','detail']},
  {id:'Q086', dimension:'C', subDimension:'OrganizationPlanning', text:'我會先理解規則再開始行動。', reverse:false, weight:1, forms:['professional'], tags:['analysis','quality','detail']},
  {id:'Q087', dimension:'C', subDimension:'Conscientiousness', text:'我常擔心自己做得不夠好。', reverse:false, weight:1, forms:['professional'], tags:['analysis','quality','detail']},
  {id:'Q088', dimension:'C', subDimension:'OrganizationPlanning', text:'我喜歡把資料整理得有條理。', reverse:false, weight:1, forms:['professional'], tags:['analysis','quality','detail']},
  {id:'Q089', dimension:'C', subDimension:'AnalysisThinking', text:'我重視邏輯與證據。', reverse:false, weight:1, forms:['professional'], tags:['analysis','quality','detail']},
  {id:'Q090', dimension:'C', subDimension:'AnalysisThinking', text:'我不喜歡只靠感覺做決定。', reverse:false, weight:1, forms:['professional'], tags:['analysis','quality','detail']},
  {id:'Q091', dimension:'C', subDimension:'AnalysisThinking', text:'我會想知道事情背後的原理。', reverse:false, weight:1, forms:['professional'], tags:['analysis','quality','detail']},
  {id:'Q092', dimension:'C', subDimension:'Conscientiousness', text:'我常會修改作品直到比較滿意。', reverse:false, weight:1, forms:['professional'], tags:['analysis','quality','detail']},
  {id:'Q093', dimension:'C', subDimension:'AccuracyQuality', text:'我喜歡清楚、精準的說明。', reverse:false, weight:1, forms:['professional'], tags:['analysis','quality','detail']},
  {id:'Q094', dimension:'C', subDimension:'OrganizationPlanning', text:'我會預先想可能出錯的地方。', reverse:false, weight:1, forms:['professional'], tags:['analysis','quality','detail']},
  {id:'Q095', dimension:'C', subDimension:'Conscientiousness', text:'我比較相信經過驗證的資訊。', reverse:false, weight:1, forms:['professional'], tags:['analysis','quality','detail']},
  {id:'Q096', dimension:'C', subDimension:'Conscientiousness', text:'我希望自己的表現能達到一定品質。', reverse:false, weight:1, forms:['professional'], tags:['analysis','quality','detail']}
];

// 相容舊程式命名：快速版為 48 題，專業版為 96 題。新程式會優先使用 getActiveQuestions(form)。
const DISC_QUESTIONS = DISC_QUESTION_BANK;
