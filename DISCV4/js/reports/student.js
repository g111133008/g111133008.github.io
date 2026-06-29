/* DISCV4 Phase 3 Student Report
   目標：完成學生版專區。原則：不重複共同分析內容，而是把結果轉成學生可理解、可行動的學習、人際、情緒與成長工具。
*/
function studentReport(data, info){
  const p = data.profile || {};
  const m = info.main;
  const s = info.second;
  const pack = studentContext(m.key, s.key, info);
  return `
  ${section('學生專區 1', '我在班上的樣子', `
    <div class="student-hero-card">
      <div>
        <h3>${m.key} ${m.label}｜${m.animal} 的班級樣貌</h3>
        <p>${pack.classPortrait}</p>
        <p class="student-note"><b>重要提醒：</b>這不是要你變成別人，而是幫你知道：什麼情境會讓你發揮，什麼情境容易讓你卡住。</p>
      </div>
      <img src="${m.img}" alt="${m.animal}">
    </div>
    <div class="student-card-grid three">
      ${pack.classCards.map(c => `<div class="student-card"><b>${c.title}</b><p>${c.text}</p></div>`).join('')}
    </div>
  `, 'student')}

  ${section('學生專區 2', '我的學習地圖', `
    <p>學習不是只有「更努力」，更重要的是找到適合自己的方法。下面是依照你的主要行為模式整理出的學習地圖。</p>
    <div class="student-map">
      <div class="map-card good"><h3>我適合</h3>${hList(pack.learning.good)}</div>
      <div class="map-card warning"><h3>我容易卡住</h3>${hList(pack.learning.stuck)}</div>
      <div class="map-card action"><h3>我可以這樣做</h3>${hList(pack.learning.actions)}</div>
    </div>
  `, 'student')}

  ${section('學生專區 3', '我的任務啟動法', `
    <p>${pack.startIntro}</p>
    <div class="start-steps">
      ${pack.startSteps.map((x,i)=>`<div><span>${i+1}</span><b>${x.title}</b><p>${x.text}</p></div>`).join('')}
    </div>
    <div class="script-box"><b>我可以對自己說：</b><br>${pack.selfTalk}</div>
  `, 'student')}

  ${section('學生專區 4', '我的人際互動', `
    <p>${pack.friendshipIntro}</p>
    <div class="four-grid small">
      ${Object.values(DISC_META).map(x => `<div class="mini friend-mini"><b>遇到 ${x.animal} 型朋友</b><span>${friendAdviceForStudent(m.key, x.key)}</span></div>`).join('')}
    </div>
    <div class="two-col student-two">
      <div class="paper"><h3>我可以多練習</h3>${hList(pack.friendshipPractice)}</div>
      <div class="paper"><h3>我可以保留自己</h3><p>${pack.friendshipBoundary}</p></div>
    </div>
  `, 'student')}

  ${section('學生專區 5', '我的情緒使用說明書', `
    <p>${pack.emotionIntro}</p>
    <div class="emotion-grid">
      ${pack.emotionCards.map(c => `<div class="emotion-card"><b>${c.when}</b><p>${c.sign}</p><span>${c.help}</span></div>`).join('')}
    </div>
    <div class="script-box"><b>當我壓力很大時，我可以先做：</b>${hList(pack.emotionFirstAid)}</div>
  `, 'student')}

  ${section('學生專區 6', '我的成長路徑', `
    <div class="growth-path rich">
      <div><b>現在</b><span>${pack.growth.now}</span></div>
      <div><b>下一步</b><span>${pack.growth.next}</span></div>
      <div><b>成熟後</b><span>${pack.growth.mature}</span></div>
    </div>
    <p class="student-note">成長不是把自己的特質消掉，而是讓自己的力量更成熟、更能被自己掌握。</p>
  `, 'student')}

  ${section('學生專區 7', '我的一週微行動', `
    <p>選一個最容易做到的就好。小小的練習，比一次想改很多更有效。</p>
    <div class="micro-grid">
      ${pack.microActions.map(a => `<div class="micro-card"><b>${a.title}</b><p>${a.text}</p></div>`).join('')}
    </div>
  `, 'student')}

  ${section('學生專區 8', '給未來自己的話', `
    <div class="letter student-letter">${studentFutureLetter(p, info, pack).replace(/\n/g,'<br>')}</div>
  `, 'student')}
  `;
}

function friendAdviceForStudent(main, friend){
  const table = {
    D:{D:'你們都很有方向，記得先講好誰負責什麼，避免互相搶主導。',I:'對方很有點子，你可以幫忙把想法變成行動步驟。',S:'對方需要安全感，放慢語氣會讓合作更順。',C:'對方重視細節，先說明標準與目標會更好合作。'},
    I:{D:'對方重視效率，先講重點，再補充故事。',I:'你們互動會很熱鬧，記得一起把任務收尾。',S:'對方喜歡穩定，你可以多給一點耐心與安全感。',C:'對方重視正確，你可以給他時間整理，也請他幫忙檢查。'},
    S:{D:'對方速度較快，你可以清楚說出自己需要的時間。',I:'對方很熱情，你可以被帶動，也要保留自己的界線。',S:'你們都重視和諧，記得不要都把想法藏起來。',C:'對方重視標準，你可以先確認分工，再穩定完成。'},
    C:{D:'對方想快速推進，你可以提醒品質與風險，但不要只停在擔心。',I:'對方有創意，你可以幫忙整理重點與步驟。',S:'對方溫和穩定，適合一起慢慢完成任務。',C:'你們都重視品質，記得設定停止點，避免一直修改。'}
  };
  return table[main]?.[friend] || '先理解對方的節奏，再用清楚、尊重的方式互動。';
}

function studentContext(main, second, info){
  const data = {
    D:{
      classPortrait:'你在班上可能是比較有方向感、願意把事情往前推的人。當任務有目標、有挑戰，你會更容易投入；如果事情太慢或規則不清，你可能會變得急。',
      classCards:[
        {title:'容易發揮的時候',text:'有明確目標、可以負責、能看見成果。'},
        {title:'容易卡住的時候',text:'被限制太多、等待太久、或覺得任務沒有意義。'},
        {title:'我可以練習',text:'先聽完別人的想法，再決定下一步。'}
      ],
      learning:{
        good:['先知道目標與完成標準。','用挑戰題、任務卡或計時練習提高投入。','把學習連到實際成果，例如完成一份作品或解決一個問題。'],
        stuck:['覺得太慢、太重複、沒有挑戰。','只想趕快完成，可能忽略細節。','被命令時容易反彈。'],
        actions:['每次開始前先寫下「我要完成什麼」。','做完後用3分鐘檢查品質。','遇到不耐煩時，先問：「我現在能推進哪一步？」']
      },
      startIntro:'你的啟動力通常不弱，真正需要練習的是：不要只靠衝勁，也要讓成果更穩。',
      startSteps:[{title:'定目標',text:'一句話寫出今天要完成什麼。'},{title:'抓時間',text:'設定一個短時間，例如15分鐘先做第一段。'},{title:'做檢查',text:'完成後檢查一次，不只看速度，也看品質。'}],
      selfTalk:'我可以很快開始，也可以慢下來把事情做完整。',
      friendshipIntro:'你在人際中可能直接、有想法。這是力量，但如果太快下結論，別人可能會跟不上。',
      friendshipPractice:['多問一句：「你怎麼想？」','說目標時，也說明原因。','讓每個人都有一個任務，而不是自己全包。'],
      friendshipBoundary:'你可以保留自己的方向感，但不需要每一次都贏。真正成熟的主導，是能讓大家一起往前走。',
      emotionIntro:'壓力大時，你可能會更想掌控或更急。情緒不是錯，它是在提醒你：事情卡住了。',
      emotionCards:[
        {when:'生氣時',sign:'可能語氣變直接，想立刻解決。',help:'先暫停10秒，再說你真正需要的是什麼。'},
        {when:'緊張時',sign:'可能更想控制進度。',help:'把任務拆成第一步，先完成一小段。'},
        {when:'失望時',sign:'可能表面沒事，但心裡覺得煩。',help:'找一個可信任的人說：「我其實有點在意。」'}
      ],
      emotionFirstAid:['先深呼吸三次。','把「快一點」改成「先做第一步」。','如果語氣太急，練習補一句：「我剛剛有點急。」'],
      growth:{now:'我有推動事情的力量。',next:'練習讓別人也參與決定。',mature:'能帶著目標前進，也能照顧關係與品質。'},
      microActions:[{title:'一天一次聽完',text:'今天至少一次，先聽完別人的話再回應。'},{title:'完成後檢查',text:'交出前檢查一個細節。'},{title:'說明原因',text:'提出意見時加一句：「因為我覺得……」。'}]
    },
    I:{
      classPortrait:'你在班上可能是讓氣氛變活潑、讓想法流動的人。你喜歡互動、分享與變化；如果課程太單調，可能比較容易分心。',
      classCards:[
        {title:'容易發揮的時候',text:'可以討論、分享、創作、用例子表達。'},
        {title:'容易卡住的時候',text:'太單調、太安靜、一直做細節，沒有回應。'},
        {title:'我可以練習',text:'讓熱情有收尾，把點子整理成步驟。'}
      ],
      learning:{
        good:['用故事、圖像、討論幫助理解。','把學習內容講給別人聽。','用短時間、多變化的方式讀書。'],
        stuck:['一開始很有興趣，但後面忘記收尾。','太在意別人反應，影響專注。','細節太多時覺得無聊。'],
        actions:['每個想法後面加上「下一步」。','讀完一段後，用三句話講重點。','把大任務拆成小任務，完成一個就打勾。']
      },
      startIntro:'你的點子和熱情是入口，啟動任務時最重要的是把想法變成簡單步驟。',
      startSteps:[{title:'說出點子',text:'先用一句話說你想做什麼。'},{title:'列三步驟',text:'把點子變成三個可以完成的小動作。'},{title:'設收尾',text:'決定什麼時候算完成，避免一直換新點子。'}],
      selfTalk:'我可以有很多想法，也可以把其中一個想法好好完成。',
      friendshipIntro:'你在人際中通常有溫度、有表達力，也容易帶動氣氛。你的練習是：不只被看見，也看見別人。',
      friendshipPractice:['分享後問：「你呢？」','把聊天變成合作時，先確認分工。','情緒很強時，先停一下再回應。'],
      friendshipBoundary:'你可以保留自己的活力，不需要為了讓每個人開心而一直表演。真正喜歡你的人，也會接住安靜的你。',
      emotionIntro:'壓力大時，你可能會很需要回應，也可能因為不被看見而失落。情緒是在提醒你：我需要連結。',
      emotionCards:[
        {when:'生氣時',sign:'可能想立刻說清楚。',help:'先寫下最重要的一句話，再說。'},
        {when:'緊張時',sign:'可能需要別人鼓勵或回應。',help:'找一個人確認：「我可以先做哪一步？」'},
        {when:'難過時',sign:'可能覺得自己不被在乎。',help:'說出需求：「我現在想被聽一下。」'}
      ],
      emotionFirstAid:['把情緒用一句話說出來。','先完成一個小步驟，讓自己回到行動。','找一個安全的人說，而不是對所有人爆開。'],
      growth:{now:'我有表達與連結人的力量。',next:'練習整理重點與穩定收尾。',mature:'能保有熱情，也能把想法變成成果。'},
      microActions:[{title:'三句重點',text:'今天把一件事用三句話講清楚。'},{title:'完成一件',text:'先完成一個小任務，再開始新點子。'},{title:'聽完再接',text:'聊天時練習聽完對方再分享自己。'}]
    },
    S:{
      classPortrait:'你在班上可能是溫和、穩定、願意配合與支持的人。你不一定最常發言，但你的存在常讓人安心。',
      classCards:[
        {title:'容易發揮的時候',text:'環境安全、步驟清楚、關係穩定。'},
        {title:'容易卡住的時候',text:'突然改變、被催促、公開衝突或被迫選邊站。'},
        {title:'我可以練習',text:'把自己的需要說出來，不只照顧別人。'}
      ],
      learning:{
        good:['穩定的讀書時間與固定流程。','有範例、有步驟、有足夠適應時間。','可以和熟悉的人一起討論。'],
        stuck:['突然被要求改方式。','怕麻煩別人，所以不問問題。','太顧慮別人，自己的進度被影響。'],
        actions:['每天固定一個小時段開始。','不懂時先寫下問題，再找人問。','答應別人前先確認自己是否真的可以。']
      },
      startIntro:'你的穩定是力量。啟動任務時，不一定要很快，但需要一個安全、清楚的小開始。',
      startSteps:[{title:'找固定點',text:'固定時間、固定位置，讓開始變容易。'},{title:'先做小段',text:'不用一次完成，先做10分鐘。'},{title:'確認支持',text:'需要時找同學、老師或家人問第一步。'}],
      selfTalk:'我可以慢慢來，但我也可以開始。我的需要也值得被聽見。',
      friendshipIntro:'你在人際中通常溫和、願意陪伴。你的練習是：不要為了和諧，把自己放到最後。',
      friendshipPractice:['說出一個自己的偏好。','不想答應時，可以說：「我想一下。」','遇到不舒服，不要等到忍不住才說。'],
      friendshipBoundary:'你可以善良，也可以有界線。拒絕別人不代表你不好，而是你正在照顧自己。',
      emotionIntro:'壓力大時，你可能會先沉默或假裝沒事。情緒是在提醒你：我也需要被照顧。',
      emotionCards:[
        {when:'生氣時',sign:'可能不想吵，但心裡悶著。',help:'用一句話說：「我剛剛其實不太舒服。」'},
        {when:'緊張時',sign:'可能希望有人陪或確認步驟。',help:'先找一個最小、最安全的開始。'},
        {when:'難過時',sign:'可能安靜退開。',help:'允許自己找人說，不用一個人撐。'}
      ],
      emotionFirstAid:['先承認：「我其實有壓力。」','寫下一句自己的需要。','找一個安全的人說出來。'],
      growth:{now:'我有穩定與支持人的力量。',next:'練習說出自己的需要與界線。',mature:'能照顧別人，也能照顧自己。'},
      microActions:[{title:'說一個需要',text:'今天說出一個小小的需要。'},{title:'先想再答應',text:'別人請你幫忙時，先說：「我想一下。」'},{title:'固定開始',text:'用同一個時間開始一件小任務。'}]
    },
    C:{
      classPortrait:'你在班上可能是安靜觀察、重視細節、希望做得有品質的人。你不一定馬上回答，但常常已經在心裡想很多。',
      classCards:[
        {title:'容易發揮的時候',text:'標準清楚、有範例、有時間思考與修正。'},
        {title:'容易卡住的時候',text:'要求模糊、突然被點名、被一直催快。'},
        {title:'我可以練習',text:'先完成第一版，不等到完美才開始。'}
      ],
      learning:{
        good:['有範例、步驟與評分標準。','安靜思考與整理筆記的時間。','可以檢查、修正、把內容做完整。'],
        stuck:['因為怕錯，遲遲不敢開始。','太想完整，花很多時間在細節。','標準不清楚時感到焦慮。'],
        actions:['先問清楚標準。','把作業分成第一版、修正版、完成版。','設定停止點：做到70分先交出來。']
      },
      startIntro:'你的思考力很強。啟動任務時，最重要的是不要被「一定要完美」卡住。',
      startSteps:[{title:'確認標準',text:'先知道最重要的要求是什麼。'},{title:'做第一版',text:'先完成可以修改的版本，不求一次完美。'},{title:'設定停止點',text:'到時間就先交出來，再依回饋修正。'}],
      selfTalk:'我不需要準備到100分才開始。先完成第一版，也是認真的一種。',
      friendshipIntro:'你在人際中可能比較慢熟、謹慎，但這不代表你沒有想法。你的練習是：在還沒完全準備好時，也先表達一點點。',
      friendshipPractice:['先說一個你最有把握的想法。','不懂時直接問：「你的意思是……嗎？」','給自己一個安全表達的最低標準：一句話就好。'],
      friendshipBoundary:'你可以保留自己的謹慎，不需要勉強自己一直熱鬧。但也可以讓別人知道，你其實有在聽、有在想。',
      emotionIntro:'壓力大時，你可能會一直檢查、想很多，甚至不敢交出來。情緒是在提醒你：我需要清楚與安全。',
      emotionCards:[
        {when:'生氣時',sign:'可能變沉默或開始挑錯。',help:'先說：「我需要把問題整理一下。」'},
        {when:'緊張時',sign:'可能一直確認、一直修改。',help:'設定停止點，先完成第一版。'},
        {when:'難過時',sign:'可能假裝沒事，把情緒藏起來。',help:'用文字寫下來，或找可信任的人說一點點。'}
      ],
      emotionFirstAid:['把腦中的擔心寫成清單。','圈出現在真的需要處理的一件事。','提醒自己：第一版可以修改。'],
      growth:{now:'我有觀察、分析與做出品質的力量。',next:'練習先開始、先交出第一版。',mature:'能保持細心，也能允許自己邊做邊修正。'},
      microActions:[{title:'70分開始',text:'今天選一件事，做到70分就先交出第一版。'},{title:'問清標準',text:'不清楚時練習直接問：「標準是什麼？」'},{title:'說一句想法',text:'討論時至少說一句自己有把握的想法。'}]
    }
  }[main];
  if (second && second !== main) {
    data.classPortrait += ` 你的次要特質是 ${second}，所以你不一定只有一種樣子；在熟悉、安全或壓力情境中，可能會展現另一種行為能量。`;
  }
  return data;
}

function studentFutureLetter(profile, info, pack){
  const name = profile.name || '你';
  const m = info.main;
  return `親愛的${name}：\n\n這份報告不是要把你放進一個固定的格子裡。\n它只是想溫柔地提醒你：你身上有一種特別的力量。\n\n${m.animal}代表的不是標籤，而是一種你和世界互動的方式。\n有時候，這份力量會讓你做得很好；有時候，當壓力變大，它也可能讓你卡住。\n\n請記得，卡住不代表你不好。\n那只是代表你需要換一個比較適合自己的方法。\n\n接下來，你不用一次改變很多。\n只要先做一個小小的練習：\n${pack.microActions[0].text}\n\n慢慢來，也沒有關係。\n你不需要變成別人，才值得被肯定。\n你只需要更理解自己，然後一步一步，把自己的力量用得更成熟。\n\n未來的你，會謝謝現在願意開始的自己。`;
}
