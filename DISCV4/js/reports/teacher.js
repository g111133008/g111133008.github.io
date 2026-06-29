/* DISCV4 Teacher Report
   第三階段：教師版專區。原則：不重複學生版內容，只提供教師可以直接使用的教學觀察與介入策略。
*/
function teacherReport(data, analysis){
  const info = analysis.profile;
  const m = info.main;
  const s = info.second;
  const context = teacherContext(m.key, s.key, info);
  return `
  ${section('教師專區 1', '一眼看懂這位學生', `
    <div class="teacher-summary">
      <div>
        <h3>${m.key} ${m.label}｜${m.animal}為主，${s.key} ${s.label}為輔</h3>
        <p>${context.snapshot}</p>
      </div>
      <div class="teacher-meter">
        <span>課堂可見度</span><b>${stars(context.visibility)}</b>
        <span>需要結構感</span><b>${stars(context.structureNeed)}</b>
        <span>互動需求</span><b>${stars(context.interactionNeed)}</b>
        <span>壓力敏感度</span><b>${stars(context.stressSensitivity)}</b>
      </div>
    </div>
    <p class="teacher-tip"><b>教師提醒：</b>${context.firstReminder}</p>
  `, 'teacher')}

  ${section('教師專區 2', '常見課堂情境判讀', `
    <div class="scenario-grid">
      ${teacherScenarioCards(m.key).map(card => `
        <div class="scenario-card">
          <h3>${card.title}</h3>
          <p><b>可能代表：</b>${card.meaning}</p>
          <p><b>老師可以：</b>${card.action}</p>
        </div>
      `).join('')}
    </div>
    <p class="teacher-tip">這些判讀不是診斷，而是協助老師避免把行為直接解讀成「不認真」或「故意」。</p>
  `, 'teacher')}

  ${section('教師專區 3', '最佳教學策略', `
    <div class="two-col">
      <div class="paper"><h3>適合的教學安排</h3>${hList(context.teachingGood)}</div>
      <div class="paper"><h3>需要避免的安排</h3>${hList(context.teachingAvoid)}</div>
    </div>
    <div class="strategy-table">
      ${teacherStrategyRows(m.key).map(r => `<div><b>${r.label}</b><span>${stars(r.score)}</span><p>${r.note}</p></div>`).join('')}
    </div>
  `, 'teacher')}

  ${section('教師專區 4', '提問與點名方式', `
    <div class="two-col">
      <div class="paper danger"><h3>不建議</h3>${hList(context.questionBad)}</div>
      <div class="paper success"><h3>可以改成</h3>${hList(context.questionGood)}</div>
    </div>
    <p class="teacher-tip"><b>30秒規則：</b>多數學生在被點名之前，若能先有 30 秒思考時間，回答品質與安全感都會提升。</p>
  `, 'teacher')}

  ${section('教師專區 5', '合作分組與角色安排', `
    <p>${context.groupingIntro}</p>
    <div class="role-grid">
      ${teacherRoles(m.key).map(r => `<div class="role-card"><b>${r.role}</b><span>${stars(r.fit)}</span><p>${r.note}</p></div>`).join('')}
    </div>
    <p class="teacher-tip"><b>分組提醒：</b>${context.groupingReminder}</p>
  `, 'teacher')}

  ${section('教師專區 6', '激勵與回饋方式', `
    <div class="two-col">
      <div class="paper"><h3>有效回饋</h3>${hList(context.feedbackGood)}</div>
      <div class="paper"><h3>容易失效的回饋</h3>${hList(context.feedbackBad)}</div>
    </div>
    <div class="feedback-example">
      <b>回饋句型範例</b>
      <p>${context.feedbackExample}</p>
    </div>
  `, 'teacher')}

  ${section('教師專區 7', '壓力警訊與早期介入', `
    <div class="warning-path">
      ${context.warningPath.map((x,i) => `<div><b>${i+1}</b><span>${x}</span></div>`).join('')}
    </div>
    <p>${context.intervention}</p>
  `, 'teacher')}

  ${section('教師專區 8', '作業與評量調整', `
    <div class="two-col">
      <div class="paper"><h3>作業設計</h3>${hList(context.assignment)}</div>
      <div class="paper"><h3>評量提醒</h3>${hList(context.assessment)}</div>
    </div>
  `, 'teacher')}

  ${section('教師專區 9', '家長溝通提醒', `
    <p>${context.parentNote}</p>
    <div class="paper"><h3>可提供給家長的說法</h3><p>${context.parentScript}</p></div>
  `, 'teacher')}
  `;
}

function stars(n){
  const v = Math.max(0, Math.min(5, Number(n)||0));
  return '★★★★★'.slice(0,v) + '☆☆☆☆☆'.slice(0,5-v);
}

function teacherContext(main, second, info){
  const base = {
    D:{
      visibility:5, structureNeed:3, interactionNeed:3, stressSensitivity:3,
      snapshot:'這類學生在有目標、有責任、有挑戰的情境中，較容易展現行動力。若感覺任務沒有意義或進度太慢，可能會出現不耐、插話、想主導或直接跳到結論。',
      firstReminder:'給他清楚目標與可負責的任務，同時提醒他練習聽見同伴的節奏。',
      teachingGood:['先說明目標與完成標準。','讓學生知道這件事為什麼重要。','給可負責的小任務，例如小組推進、時間管理。','用挑戰性問題引發投入。'],
      teachingAvoid:['只要求照做卻不說明目的。','長時間等待、流程不清或反覆拖延。','公開用權威壓制，容易引發對抗。','完全不給選擇與自主空間。'],
      questionBad:['「你不要一直搶著講。」','「照我說的做就對了。」','在全班面前直接否定他的主導。'],
      questionGood:['「你的方向很清楚，先聽兩位同學補充後再統整。」','「請你幫小組抓出今天最重要的一個目標。」','「你有兩分鐘整理，等等請你說結論。」'],
      groupingIntro:'適合給明確責任，但不一定每次都安排隊長，避免強化過度主導。',
      groupingReminder:'若擔任隊長，要搭配「聽取每位組員意見」的具體任務。',
      feedbackGood:['肯定具體行動與承擔。','回饋時聚焦目標、成果與下一步。','給挑戰任務，讓能力有出口。'],
      feedbackBad:['只說「你很棒」但沒有具體指出行為。','用羞辱或壓制讓他服從。','只提醒不要太強勢，卻沒有給替代做法。'],
      feedbackExample:'「你剛剛很快抓到目標，這是優勢。下一步請你把兩位同學的想法也放進計畫裡，這樣會更完整。」',
      warningPath:['急著主導','不耐煩或插話','和同學或老師拉扯','放棄合作或直接衝突'],
      intervention:'看到第二步時，先不要公開對抗。可私下說：「我看見你很想把事情做好，我們先把目標和分工確認清楚。」',
      assignment:['給明確任務、時限與成果格式。','可設計進階挑戰題。','允許用口頭、圖表或行動方案呈現。'],
      assessment:['競賽或限時任務可提高投入。','也要評量聆聽、合作與修正能力。','避免只看速度，需加入品質標準。'],
      parentNote:'家長若只用命令或控制，容易讓孩子更想反抗或證明自己。溝通時宜用目標與選擇取代單向要求。',
      parentScript:'孩子有推進事情的能量，我們會協助他把行動力用在合適的位置，也練習在團體中聽見別人的想法。'
    },
    I:{
      visibility:5, structureNeed:2, interactionNeed:5, stressSensitivity:3,
      snapshot:'這類學生在有互動、有表達、有變化的課堂中較容易投入。若課程太單調或長時間沒有回應，可能分心、聊天、想引起注意或熱情快速下降。',
      firstReminder:'把他的表達力變成學習資源，同時協助他把想法收斂成可完成的步驟。',
      teachingGood:['加入討論、分享、角色扮演或故事情境。','讓學生有機會說明想法。','把任務切成短段，搭配即時回饋。','使用圖像、例子與生活連結。'],
      teachingAvoid:['長時間單向講述且沒有互動。','只糾正秩序，沒有給參與出口。','要求一次完成大量細節。','完全否定創意或情緒反應。'],
      questionBad:['「不要那麼愛講話。」','「你每次都不專心。」','在學生分享時只抓錯字或細節。'],
      questionGood:['「你的想法很有畫面，請用一句話說重點。」','「你先分享例子，等等請小組幫忙整理步驟。」','「這個點子不錯，我們把它變成三個可以做的步驟。」'],
      groupingIntro:'適合擔任發表、氣氛帶動、創意發想等角色，但需要搭配紀錄或收斂角色。',
      groupingReminder:'與C型或S型搭配時，請先分工清楚，避免只有聊天沒有完成。',
      feedbackGood:['肯定創意、表達與帶動氣氛。','給即時、具體且有溫度的回應。','協助他把熱情轉成行動清單。'],
      feedbackBad:['完全忽略他的分享。','只說太吵或太浮誇。','給太長、太細、缺乏互動的回饋。'],
      feedbackExample:'「你剛剛的例子讓大家更容易懂，這是很好的表達力。接下來請你把重點整理成三句話。」',
      warningPath:['開始分心或聊天','誇大反應或插話','情緒化覺得不被看見','逃避細節或收尾'],
      intervention:'看到第二步時，給他明確參與角色：「我需要你幫大家把剛剛的例子講清楚，但請控制在一分鐘。」',
      assignment:['可加入口頭報告、海報、短影片或創意呈現。','長作業需拆成小段檢核。','給明確完成標準，避免只停在想法。'],
      assessment:['可用發表、討論參與與創意表達作為部分評量。','也要評估是否能整理重點與按時完成。','避免只用安靜書寫評估全部能力。'],
      parentNote:'家長若只說「安靜、不要講話」，可能讓孩子覺得自己被否定。需要把表達力引導成具體產出。',
      parentScript:'孩子有很好的表達與連結能力，我們會協助他把想法整理成步驟，讓熱情可以真正完成事情。'
    },
    S:{
      visibility:2, structureNeed:4, interactionNeed:4, stressSensitivity:4,
      snapshot:'這類學生在安全、穩定、關係清楚的環境中較容易發揮。表面配合不代表沒有壓力，若長期被催促或放在衝突位置，可能沉默、退縮或被動拖延。',
      firstReminder:'先建立安全感，再邀請表達；不要把沉默直接解讀成沒有想法。',
      teachingGood:['維持穩定流程與清楚步驟。','提早說明變動與任務要求。','以小組或同儕支持增加安全感。','用溫和且具體的方式邀請回答。'],
      teachingAvoid:['突然改規則或臨時要求上台。','公開比較、公開責備或強烈競爭。','讓他長期承擔和事佬角色。','只因為配合就一直加派任務。'],
      questionBad:['「你都沒有意見嗎？」','「你不要什麼都說可以。」','突然點名要求立刻回答。'],
      questionGood:['「你可以先想一下，等一下用一句話說就好。」','「你剛剛有點點頭，我想聽聽你同意哪一部分。」','「你可以選擇用寫的或口頭說。」'],
      groupingIntro:'適合擔任協調、紀錄、支持、進度穩定等角色，但要避免長期只做配合者。',
      groupingReminder:'分組時需確認他的界線與任務量，不要讓他因為好說話而承擔過多。',
      feedbackGood:['肯定穩定、配合、傾聽與支持。','用私下、溫和、具體的方式提醒。','給足準備時間後再邀請表達。'],
      feedbackBad:['公開催促或公開比較。','把安靜視為不努力。','只稱讚乖，忽略他的想法與需求。'],
      feedbackExample:'「我注意到你一直穩定完成自己的部分，這對小組很重要。下一次我想邀請你多說一句自己的想法。」',
      warningPath:['表面說沒關係','越來越少表達','作業或任務被動拖延','完全退縮或情緒爆發'],
      intervention:'看到第二步時，可私下詢問：「你是不是有點壓力？我們先找一個你可以完成的小步驟。」',
      assignment:['提供明確步驟與範例。','大型任務要拆段並固定檢核。','可安排同儕合作，但分工要清楚。'],
      assessment:['避免只用臨場表現判斷能力。','可允許先書寫再口頭表達。','評量穩定完成與合作品質。'],
      parentNote:'家長若一直催快，孩子可能更焦慮或更沉默。穩定型孩子需要可預期的節奏與被允許說不。',
      parentScript:'孩子有穩定與支持他人的力量，我們會鼓勵他保留這份溫和，也練習更清楚說出自己的需要。'
    },
    C:{
      visibility:2, structureNeed:5, interactionNeed:2, stressSensitivity:5,
      snapshot:'這類學生在標準清楚、範例明確、可先準備的情境中較容易發揮。安靜不一定是不會，拖延也不一定是不想做，常可能與確認標準、怕出錯或追求品質有關。',
      firstReminder:'給清楚標準與第一步，避免突然點名或只用速度評價。',
      teachingGood:['提供範例、步驟與評分標準。','允許先思考、先寫下來再回答。','任務拆成第一版、修正版、完成版。','肯定分析、品質與檢查能力。'],
      teachingAvoid:['要求模糊卻要立刻完成。','突然公開點名或臨時上台。','只催速度，沒有說明標準。','用「想太多」否定他的謹慎。'],
      questionBad:['「不要想那麼多。」','「快一點，隨便寫就好。」','突然點名：「你現在馬上回答。」'],
      questionGood:['「你可以先看範例，等等選一題回答。」','「你先說目前最有把握的一點就好。」','「我們先完成第一版，之後再修正。」'],
      groupingIntro:'適合擔任資料整理、檢查、規劃、品質把關等角色，但要避免所有細節都壓在他身上。',
      groupingReminder:'若搭配I型可補足表達，但必須先明確分工與完成時間。',
      feedbackGood:['具體指出哪裡分析完整、哪裡品質好。','把任務標準寫清楚。','肯定開始與修正，而不只肯定完美結果。'],
      feedbackBad:['只說很好或加油，沒有具體內容。','用速度壓迫。','公開挑錯，讓他更害怕表達。'],
      feedbackExample:'「你這裡的分析很完整，證據也清楚。下一步不用全部重寫，先修正第二段的例子就好。」',
      warningPath:['反覆確認標準','一直修改不敢交','拖延開始或避免發表','完全放棄或自我否定'],
      intervention:'看到第二步時，請協助設定停止點：「這份作業先做到70分就交，我會看方向，不是只看完美。」',
      assignment:['提供明確範例與格式。','允許先交草稿或第一版。','把大型作業拆成可檢核的小任務。'],
      assessment:['避免只用限時搶答判斷能力。','可設計開卷分析、資料整理或修正型任務。','評分標準越清楚，越能發揮。'],
      parentNote:'家長若一直要求完美或一直催快，容易讓孩子更焦慮。需要協助孩子先開始，而不是等完全準備好。',
      parentScript:'孩子有細心與分析的能力，我們會協助他把品質感保留下來，也練習先完成第一版，再逐步修正。'
    }
  }[main];
  if(second && second !== main){
    base.snapshot += ` 次要的 ${second} 特質會影響他的表現，因此同一位學生可能在熟悉情境與壓力情境中呈現不同樣貌。`;
  }
  return base;
}

function teacherScenarioCards(key){
  const common = {
    D:[
      ['一直想主導','他可能正在尋找目標與控制感，不一定是故意不尊重同學。','給他明確任務，並要求他先收集兩位同學意見。'],
      ['和老師頂嘴','可能是覺得規則不合理或目標不清楚。','先說明目的，再給有限選擇。'],
      ['快速做完但粗糙','可能重視完成速度勝過細節。','增加品質檢核點。'],
      ['不想做重複練習','可能缺乏挑戰感。','提供進階題或限時目標。']
    ],
    I:[
      ['上課聊天','可能是需要互動與回應，不一定是不想學。','安排短暫討論，並給明確分享任務。'],
      ['作業開頭很精彩但沒收尾','可能創意足夠，但缺少結構。','要求列三步驟與最後檢核。'],
      ['情緒反應大','可能很在意被看見與被回應。','先接住情緒，再回到任務。'],
      ['容易分心','可能任務時間太長或缺少變化。','拆成短段，搭配視覺提示。']
    ],
    S:[
      ['不主動表達','可能需要安全感與準備時間。','先給書寫，再邀請一句話分享。'],
      ['總說都可以','可能害怕衝突或不想麻煩別人。','提供選項，協助練習表達偏好。'],
      ['變動時明顯焦慮','可能需要可預期的流程。','提前說明改變原因與下一步。'],
      ['被同學影響而配合過度','可能重視關係勝過自己需求。','私下確認界線與分工。']
    ],
    C:[
      ['不舉手','可能還在確認答案是否正確。','先給思考時間或讓他選擇回答方式。'],
      ['作業拖延','可能卡在標準不清或怕做不好。','協助定義第一步與停止點。'],
      ['一直問細節','可能需要確認規則與品質要求。','提供範例與評分標準。'],
      ['考試時想太久','可能過度檢查或害怕犯錯。','練習先完成會寫的題目。']
    ]
  }[key];
  return common.map(x => ({title:x[0], meaning:x[1], action:x[2]}));
}

function teacherStrategyRows(key){
  const map = {
    D:[['講述',3,'講述要短，先給目標與重點。'],['合作',4,'可負責推進，但需設定聆聽任務。'],['競賽',5,'競賽能提升動機，但需加入合作規則。'],['自由探索',4,'適合有目標的探索，不適合完全無邊界。']],
    I:[['講述',2,'需要穿插提問、例子與互動。'],['合作',5,'合作能提升參與，但需明確收斂。'],['競賽',3,'可用趣味競賽，但避免只看輸贏。'],['自由探索',4,'可激發創意，但需檢核完成度。']],
    S:[['講述',4,'穩定講解與清楚步驟有幫助。'],['合作',5,'合作適合，但分工與安全感要明確。'],['競賽',2,'過度競爭可能造成壓力。'],['自由探索',3,'需要方向與時間適應。']],
    C:[['講述',5,'架構清楚的講述與範例很適合。'],['合作',3,'合作可行，但需明確分工。'],['競賽',2,'限時競賽可能增加焦慮。'],['自由探索',3,'若標準不清，容易卡住。']]
  }[key];
  return map.map(x => ({label:x[0], score:x[1], note:x[2]}));
}

function teacherRoles(key){
  const map = {
    D:[['隊長',5,'適合推進目標，但要練習聽取意見。'],['紀錄',2,'若只做紀錄可能覺得受限。'],['發表',4,'能說結論，但需加入小組共識。'],['品質檢查',3,'可檢查目標是否完成。']],
    I:[['隊長',3,'可帶動氣氛，但需搭配時間管理。'],['紀錄',2,'不宜長時間只做細節紀錄。'],['發表',5,'很適合用表達力呈現成果。'],['創意發想',5,'可激發點子，但要有人協助收斂。']],
    S:[['隊長',3,'熟悉安全時可嘗試溫和領導。'],['紀錄',4,'能穩定整理，但避免負擔過重。'],['協調',5,'適合維持合作與照顧氣氛。'],['發表',2,'若要發表需先準備與支持。']],
    C:[['隊長',3,'適合規劃型隊長，不宜臨場混亂指揮。'],['紀錄',5,'能整理重點與資料。'],['品質檢查',5,'適合把關標準與細節。'],['發表',2,'若要發表需先有稿與準備時間。']]
  }[key];
  return map.map(x => ({role:x[0], fit:x[1], note:x[2]}));
}
