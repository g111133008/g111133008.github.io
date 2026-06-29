/* DISCV4 Phase 4 Personal Report
   個人版定位：人生導航。保留共同分析，延伸到工作、領導、親密關係、壓力、生涯與未來五年成長。
*/
function personalReport(data, analysis){
  const info = analysis.profile;
  const p = data.profile || {};
  const m = info.main;
  const s = info.second;
  const pack = personalContext(m.key, s.key, info);
  return `
  ${section('個人專區 1', '我真正的性格', `
    <div class="personal-hero-card">
      <div>
        <h3>${m.key} ${m.label}｜${m.animal} 的核心人格樣貌</h3>
        <p>${pack.core.portrait}</p>
        <div class="personal-tag-row">${tags(pack.core.tags)}</div>
      </div>
      <img src="${m.img}" alt="${m.animal}">
    </div>
    <div class="personal-card-grid three">
      <div class="personal-card"><b>核心動機</b><p>${pack.core.motive}</p></div>
      <div class="personal-card"><b>最大天賦</b><p>${pack.core.gift}</p></div>
      <div class="personal-card"><b>容易誤會自己</b><p>${pack.core.misread}</p></div>
    </div>
    <div class="script-box"><b>AI 人格總結：</b><br>${pack.core.aiSummary}</div>
  `, 'personal')}

  ${section('個人專區 2', '我的工作模式', `
    <p>${pack.work.intro}</p>
    <div class="student-map personal-map">
      <div class="map-card good"><h3>適合的工作環境</h3>${hList(pack.work.fit)}</div>
      <div class="map-card warning"><h3>容易消耗的環境</h3>${hList(pack.work.drain)}</div>
      <div class="map-card action"><h3>讓自己發揮的方法</h3>${hList(pack.work.actions)}</div>
    </div>
    <div class="two-col personal-two">
      <div class="paper"><h3>最佳主管 / 合作者</h3><p>${pack.work.bestPartner}</p></div>
      <div class="paper"><h3>最需要避免</h3><p>${pack.work.avoid}</p></div>
    </div>
  `, 'personal')}

  ${section('個人專區 3', '我的領導風格', `
    <p>${pack.leadership.intro}</p>
    <div class="role-grid personal-role-grid">
      ${pack.leadership.roles.map(r => `<div class="role-card"><b>${r.role}</b><span>${r.keyword}</span><p>${r.text}</p></div>`).join('')}
    </div>
    <div class="feedback-example"><b>成熟提醒：</b>${pack.leadership.growth}</div>
  `, 'personal')}

  ${section('個人專區 4', '我的親密關係', `
    <p>${pack.relationship.intro}</p>
    <div class="two-col">
      <div class="paper success"><h3>我在關係中需要</h3>${hList(pack.relationship.needs)}</div>
      <div class="paper danger"><h3>我容易受傷的地方</h3>${hList(pack.relationship.wounds)}</div>
    </div>
    <h3 class="sub-title">與不同類型相處</h3>
    <div class="four-grid small">
      ${Object.values(DISC_META).map(x => `<div class="mini"><b>和 ${x.animal} 型</b><span>${relationshipAdvice(m.key, x.key)}</span></div>`).join('')}
    </div>
  `, 'personal')}

  ${section('個人專區 5', '我的壓力與情緒管理', `
    <p>${pack.stress.intro}</p>
    <div class="warning-path personal-stress-path">
      ${pack.stress.path.map((x,i)=>`<div><b>${i+1}</b><span>${x}</span></div>`).join('')}
    </div>
    <div class="two-col">
      <div class="paper"><h3>壓力訊號</h3>${hList(pack.stress.signs)}</div>
      <div class="paper"><h3>恢復策略</h3>${hList(pack.stress.recovery)}</div>
    </div>
  `, 'personal')}

  ${section('個人專區 6', '我的生涯導航', `
    <p>${pack.career.intro}</p>
    <div class="career-grid">
      ${pack.career.fields.map(f => `<div class="career-card"><b>${f.name}</b><span>${f.fit}</span><p>${f.note}</p></div>`).join('')}
    </div>
    <div class="script-box"><b>工作價值觀推估：</b>${pack.career.values.join(' ＞ ')}</div>
  `, 'personal')}

  ${section('個人專區 7', '我的成長藍圖', `
    <div class="timeline-grid">
      <div><b>現在</b><span>${pack.growth.now}</span></div>
      <div><b>一年內</b><span>${pack.growth.oneYear}</span></div>
      <div><b>三年內</b><span>${pack.growth.threeYears}</span></div>
      <div><b>五年內</b><span>${pack.growth.fiveYears}</span></div>
    </div>
    <div class="two-col personal-two">
      <div class="paper"><h3>需要發展的能力</h3>${hList(pack.growth.skills)}</div>
      <div class="paper"><h3>容易踩的坑</h3>${hList(pack.growth.traps)}</div>
    </div>
  `, 'personal')}

  ${section('個人專區 8', 'AI 人生導航', `
    <div class="letter personal-letter">${personalLifeLetter(p, info, pack).replace(/\n/g,'<br>')}</div>
  `, 'personal')}
  `;
}

function relationshipAdvice(main, other){
  const table = {
    D:{D:'彼此都重視主導與效率，要先約定決策權與衝突規則，避免把親密變成競爭。',I:'對方需要互動與回應，你可以給肯定；對方也能幫你放鬆與打開感受。',S:'對方需要穩定與安全感，你的直接要搭配溫度，少用命令，多說原因。',C:'對方重視邏輯與細節，重大決定前先給資料與時間，避免只憑速度推進。'},
    I:{D:'對方重視重點與行動，你可以先說結論，再分享感受；對方也能幫你做決定。',I:'熱情容易升溫，也容易失焦。要練習把承諾落實，不只享受當下氣氛。',S:'對方溫和穩定，適合接住你的情緒；你也要尊重對方慢慢來的節奏。',C:'對方需要清楚與可信度。表達感受時，也給具體事實，關係會更穩。'},
    S:{D:'對方直接快速，你要練習說出需要，不要只配合；對方也能幫你更有行動力。',I:'對方熱情外放，你可以被帶動，但要保留界線，不必為了和諧一直陪演。',S:'彼此都重視安穩，但要避免都不說真話。固定溝通比默默忍耐重要。',C:'對方謹慎理性，你的穩定能讓對方安心；但也要主動說需求，不要讓對方猜。'},
    C:{D:'對方快而直接，你可以提醒風險，但不要只潑冷水；請把擔心轉成建議。',I:'對方重視感受與互動，你可以練習多一點回應；對方也能幫你放鬆。',S:'對方溫和穩定，能讓你安心；你要避免太多標準，讓關係變成考試。',C:'彼此都重視正確與品質，要練習表達情感，不要只討論問題與責任。'}
  };
  return table[main]?.[other] || '先理解彼此節奏，再把需求說清楚。';
}

function personalContext(main, second, info){
  const data = {
    D:{
      core:{portrait:'你傾向以目標、成果與掌控感來理解世界。當事情有方向、有挑戰、能看見影響力時，你的能量會被啟動。',tags:['目標感','行動力','決斷','挑戰','主導'],motive:'想讓事情有效率地往前走，並確認自己不是被環境推著走，而是能主動創造結果。',gift:'你能在混亂中抓到重點，快速做決定，帶動他人進入行動。',misread:'你可能以為自己只是急或強勢，其實背後常是高度責任感與對無效耗損的不耐。',aiSummary:'你的人格力量像一個推進器。成熟時，你能把目標變成路線；壓力大時，可能把關係也當成任務。你的成長關鍵，是讓力量有溫度。'},
      work:{intro:'你適合有目標、有權責、有挑戰感的工作。你不怕責任，怕的是無效、拖延與模糊。',fit:['權責清楚，可自主決策。','能處理問題、帶動改變或創造成果。','工作目標明確，有衡量成果的標準。'],drain:['流程繁瑣但沒有實質成果。','上層決策模糊，卻要求你承擔結果。','長時間只能配合，不能提出做法。'],actions:['把大目標拆成短期里程碑。','決策前加入一次風險檢核。','刻意安排聽取他人意見的時間。'],bestPartner:'能給你清楚授權、尊重效率，也願意直接溝通的人。',avoid:'避免長期處在權責不清、無法推進、只能等待批准的環境。'},
      leadership:{intro:'你的領導傾向是目標型與推進型。你能帶方向，但要練習讓人跟得上。',roles:[{role:'主管',keyword:'決斷',text:'適合危機處理、目標管理與改革推進。'},{role:'父母',keyword:'要求',text:'容易期待孩子獨立有責任感，需多留意情緒承接。'},{role:'老師',keyword:'清楚',text:'能設定標準與方向，但要保留學生嘗試空間。'},{role:'同事',keyword:'效率',text:'能快速解決問題，但要避免替別人決定太多。'}],growth:'真正成熟的D型領導，不是每次都贏，而是讓團隊願意一起贏。'},
      relationship:{intro:'在親密關係裡，你需要被尊重、被信任，也需要感覺關係不是拖累，而是彼此成就。',needs:['清楚直接的溝通。','被尊重自主與決策能力。','伴侶願意一起面對問題。'],wounds:['被否定能力或被控制。','對方長期逃避問題。','你的努力被視為理所當然。']},
      stress:{intro:'你的壓力通常來自事情失控、進度太慢、責任落在你身上但權限不足。',path:['感覺卡住','加速控制','語氣變硬','關係緊繃'],signs:['變得不耐煩。','想立刻糾正別人。','很難休息，腦中一直想下一步。'],recovery:['先把控制範圍分成能控與不能控。','用運動或短時間行動釋放壓力。','在重要對話前先說明你的擔心，而不是直接命令。']},
      career:{intro:'你適合需要推進、決策、管理、開創或問題解決的方向。',fields:[{name:'管理 / 專案',fit:'高適配',note:'能整合資源並推進結果。'},{name:'創業 / 業務',fit:'高適配',note:'適合有挑戰與自主性的場域。'},{name:'教育 / 訓練',fit:'中高適配',note:'適合目標導向、成果明確的教學。'},{name:'研究 / 行政',fit:'需篩選',note:'若過度瑣碎且缺少決策權，容易消耗。'}],values:['成就','自主','影響力','效率','收入','穩定']},
      growth:{now:'把力量用在真正重要的目標上。',oneYear:'練習在推進前先建立共識。',threeYears:'發展授權、協調與情緒承接能力。',fiveYears:'成為既能決策也能培育他人的成熟領導者。',skills:['傾聽與提問。','風險評估。','授權與陪伴。'],traps:['把所有事都扛起來。','把速度誤認為品質。','在壓力下忽略關係。']}
    },
    I:{
      core:{portrait:'你傾向用連結、表達與可能性來理解世界。當環境有互動、創意、回應與彈性時，你會自然發光。',tags:['表達力','創意','連結','熱情','感染力'],motive:'想被看見、被理解，也想讓生活有趣、有溫度、有新的可能。',gift:'你能帶動氣氛、打開話題、創造靈感，讓人願意靠近與參與。',misread:'你可能以為自己只是容易分心，其實你的大腦很擅長捕捉人與情境中的可能性。',aiSummary:'你的人格力量像一盞會移動的燈。成熟時，你能照亮人群、創造希望；壓力大時，可能太依賴外界回應。你的成長關鍵，是讓熱情能落地。'},
      work:{intro:'你適合有互動、有創意、能表達與接觸人的工作。你需要變化，也需要有人協助你收斂。',fit:['能與人互動、分享、企劃或創作。','有彈性與新鮮感。','重視溝通、故事與影響力。'],drain:['長期重複、安靜、細節導向。','沒有回饋或人際冷漠。','只要求規範，不允許創意。'],actions:['把點子寫成三個可執行步驟。','每個任務設定完成標準。','找一位能提醒收尾的夥伴。'],bestPartner:'能欣賞你的創意，也會幫你整理優先順序的人。',avoid:'避免長期處在完全沒有互動、回饋與創作空間的環境。'},
      leadership:{intro:'你的領導傾向是感召型與帶氣氛型。你能讓人願意加入，但要練習把熱情轉成流程。',roles:[{role:'主管',keyword:'激勵',text:'適合願景溝通、團隊氣氛與創意企劃。'},{role:'父母',keyword:'陪伴',text:'容易給孩子溫度與鼓勵，但需穩定規則。'},{role:'老師',keyword:'互動',text:'能讓課堂有生命力，但要注意收斂與秩序。'},{role:'同事',keyword:'連結',text:'能促進合作，但需把承諾落實。'}],growth:'成熟的I型領導，不只讓大家喜歡開始，也能陪大家穩定完成。'},
      relationship:{intro:'在親密關係裡，你需要被回應、被喜歡、被聽見，也需要關係保持新鮮與情感交流。',needs:['情緒有回應。','日常有互動與分享。','被欣賞你的熱情與創意。'],wounds:['冷漠、不回應或忽略。','被批評太誇張或不實際。','承諾落空後被指責不可靠。']},
      stress:{intro:'你的壓力通常來自孤單、無聊、不被看見，或一堆細節讓你失去熱情。',path:['感覺無聊或失落','尋找刺激與回應','分心或過度表達','任務收尾困難'],signs:['情緒起伏變大。','一直換任務或滑手機。','需要很多人安慰或肯定。'],recovery:['先說出真正情緒。','把任務縮成15分鐘一段。','用視覺清單追蹤完成度。']},
      career:{intro:'你適合溝通、教育、行銷、創意、服務與需要人際感染力的方向。',fields:[{name:'教育 / 輔導',fit:'高適配',note:'適合互動式、故事式與啟發式工作。'},{name:'行銷 / 企劃',fit:'高適配',note:'能把想法包裝成吸引人的訊息。'},{name:'表演 / 創作',fit:'高適配',note:'能用表達力創造影響。'},{name:'行政 / 數據',fit:'需搭配',note:'若有清楚流程與夥伴支援較適合。'}],values:['創意','連結','被看見','自由','影響力','收入']},
      growth:{now:'把熱情變成可完成的小作品。',oneYear:'練習穩定收尾與承諾管理。',threeYears:'發展個人品牌、溝通影響力與專業深度。',fiveYears:'成為能啟發他人，也能穩定交付成果的人。',skills:['時間管理。','重點整理。','承諾追蹤。'],traps:['一直開始新點子。','太依賴外界肯定。','忽略細節與收尾。']}
    },
    S:{
      core:{portrait:'你傾向用穩定、關係與安全感來理解世界。你不一定急著表現，但你常是讓團體能持續下去的重要力量。',tags:['穩定','陪伴','耐心','和諧','支持'],motive:'想讓關係安全、事情穩定，也希望自己不要造成別人的麻煩。',gift:'你能持續、可靠、體貼地陪伴他人，讓混亂的環境慢慢安定。',misread:'你可能以為自己不夠突出，其實你提供的是很多人最需要、但最容易被忽略的穩定感。',aiSummary:'你的人格力量像一片安定的土地。成熟時，你能承接、支持、讓人恢復；壓力大時，可能把自己放到太後面。你的成長關鍵，是讓善良有界線。'},
      work:{intro:'你適合穩定、有清楚流程、重視合作與信任的工作。你能長期累積，但不適合過度混亂與高衝突。',fit:['流程清楚、節奏穩定。','重視團隊支持與長期關係。','可以累積專業與服務品質。'],drain:['臨時變動頻繁。','高壓競爭或公開衝突。','一直被要求拒絕或強勢推銷。'],actions:['建立固定工作流程。','練習在過度負荷前說出需求。','把協助別人與自己的任務分開排程。'],bestPartner:'穩定、可信任、願意提前說明變動的人。',avoid:'避免長期處在情緒勒索、分工不清或一直要求你配合的環境。'},
      leadership:{intro:'你的領導傾向是支持型與照顧型。你能讓人安心，但要練習清楚表達標準與界線。',roles:[{role:'主管',keyword:'支持',text:'適合帶穩定團隊、培養新人與維持合作。'},{role:'父母',keyword:'包容',text:'容易給孩子安全感，但需避免過度代勞。'},{role:'老師',keyword:'陪伴',text:'能營造安全氛圍，但要練習明確要求。'},{role:'同事',keyword:'可靠',text:'常被信任與依賴，但要避免承擔過多。'}],growth:'成熟的S型領導，不是永遠配合，而是溫和但清楚地守住界線。'},
      relationship:{intro:'在親密關係裡，你需要穩定、安全、可預期，也需要感覺自己被珍惜，而不是只被需要。',needs:['穩定承諾與陪伴。','溫和尊重的溝通。','你的付出被看見。'],wounds:['突然冷淡或失聯。','衝突太激烈。','長期只有你在配合。']},
      stress:{intro:'你的壓力通常來自關係緊張、變動太快、被迫衝突，或長期壓抑自己的需要。',path:['感覺不安全','先忍耐配合','累積委屈','突然退縮或爆發'],signs:['說「都可以」但心裡不舒服。','身體疲累、想逃避。','不想麻煩別人所以不求助。'],recovery:['先承認自己的需要。','用一句話表達界線。','找穩定可信任的人討論。']},
      career:{intro:'你適合服務、教育、照護、行政支援、長期陪伴與需要穩定品質的方向。',fields:[{name:'教育 / 輔導',fit:'高適配',note:'適合安全陪伴、支持與長期引導。'},{name:'照護 / 服務',fit:'高適配',note:'能以耐心建立信任。'},{name:'行政 / 協調',fit:'中高適配',note:'適合穩定流程與團隊支援。'},{name:'創業 / 業務',fit:'需篩選',note:'若高壓競爭太強，容易消耗。'}],values:['穩定','關係','安全感','助人','生活平衡','收入']},
      growth:{now:'看見自己的穩定是一種力量。',oneYear:'練習說出需要與拒絕不合理負荷。',threeYears:'發展溫和領導與界線溝通。',fiveYears:'成為既能支持他人，也不犧牲自己的成熟陪伴者。',skills:['界線表達。','衝突溝通。','自我照顧。'],traps:['把別人的需求放在自己前面。','害怕衝突而不說真話。','過度承擔導致耗竭。']}
    },
    C:{
      core:{portrait:'你傾向用邏輯、標準與準確度來理解世界。你重視品質、證據與可預測性，也常在心裡默默完成很多分析。',tags:['分析','精準','品質','標準','謹慎'],motive:'想把事情做對、做完整，並避免因草率造成錯誤或風險。',gift:'你能看見細節、辨識問題、建立標準，讓成果更穩、更可靠。',misread:'你可能以為自己只是想太多，其實那是高度敏銳的風險辨識與品質意識。',aiSummary:'你的人格力量像一座精密的導航儀。成熟時，你能讓方向更準確；壓力大時，可能因追求完美而停在原地。你的成長關鍵，是允許第一版存在。'},
      work:{intro:'你適合標準清楚、重視專業、品質與深度思考的工作。你不怕複雜，怕的是標準模糊卻要求快速。',fit:['有清楚規範、品質標準與資料依據。','需要分析、研究、檢查、規劃。','允許專注與深度工作。'],drain:['長期臨時決策、規則反覆改。','只看速度，不看品質。','情緒化管理或不合理要求。'],actions:['先確認完成標準。','把任務分成第一版、修正版、定稿。','設定停止點，避免無限修改。'],bestPartner:'理性、尊重專業、能提供清楚資訊與時間的人。',avoid:'避免長期處在混亂、模糊、高情緒壓迫且沒有品質標準的環境。'},
      leadership:{intro:'你的領導傾向是專業型與品質型。你能建立制度與標準，但要練習不要用完美壓垮自己與別人。',roles:[{role:'主管',keyword:'標準',text:'適合制度、流程、品質控管與風險管理。'},{role:'父母',keyword:'規範',text:'容易重視正確與安全，但需增加情感回應。'},{role:'老師',keyword:'架構',text:'能教得清楚有系統，但要允許學生探索。'},{role:'同事',keyword:'可靠',text:'能把關細節與品質，但要避免所有事都重檢。'}],growth:'成熟的C型領導，不是把每件事做到完美，而是知道哪些事值得完美，哪些事可以先前進。'},
      relationship:{intro:'在親密關係裡，你需要可信任、講道理、尊重界線，也需要對方理解你不是冷淡，而是慢熱與謹慎。',needs:['清楚、可信任的承諾。','尊重個人空間與思考時間。','理性溝通，不用情緒逼迫。'],wounds:['被說太冷、太挑剔。','對方反覆失信或不講邏輯。','被催促立即表態。']},
      stress:{intro:'你的壓力通常來自標準不清、風險太高、時間不足，或需要在沒準備好時公開表現。',path:['發現不確定','增加檢查','延後交付','焦慮或自責'],signs:['一直確認與修改。','很難開始，怕做錯。','情緒收起來，但身體緊繃。'],recovery:['把擔心寫成清單。','圈出真正需要處理的風險。','允許先完成70分第一版。']},
      career:{intro:'你適合研究、分析、工程、財務、設計規劃、品質管理與需要專業精準度的方向。',fields:[{name:'研究 / 分析',fit:'高適配',note:'能深度整理資料與建立判斷。'},{name:'工程 / 技術',fit:'高適配',note:'適合標準、系統與解決問題。'},{name:'財務 / 法務',fit:'中高適配',note:'重視規範與風險控管。'},{name:'業務 / 表演',fit:'需篩選',note:'若需大量即興社交，容易消耗。'}],values:['專業','品質','穩定','安全感','自主','收入']},
      growth:{now:'把標準用來支持行動，而不是阻止開始。',oneYear:'練習用第一版推進，不等完美。',threeYears:'發展溝通表達與決策彈性。',fiveYears:'成為能建立高品質系統，也能帶人前進的專業者。',skills:['快速決策。','彈性溝通。','情感表達。'],traps:['一直修改不交付。','把擔心當成事實。','用標準要求所有人。']}
    }
  }[main];
  if(second && second !== main){
    data.core.portrait += ` 你的次要特質是 ${second}，所以你的人格呈現不是單一線條；在不同情境中，可能會混合出更細緻的行為風格。`;
    data.core.tags.push(`次要${second}`);
  }
  return data;
}

function personalLifeLetter(profile, info, pack){
  const name = profile.name || '你';
  const m = info.main;
  return `親愛的${name}：\n\n這份個人版報告，不是要告訴你「你只能是這樣的人」。\n它比較像一面鏡子，讓你看見自己怎麼行動、怎麼受傷、怎麼保護自己，也怎麼發光。\n\n你的主要風格是 ${m.key} ${m.label}｜${m.animal}。\n這代表你身上有一種很明顯的力量：${pack.core.gift}\n\n但每一種力量，如果長期在壓力裡，也可能變成卡住自己的方式。\n所以你未來真正要練習的，不是把自己改成別人，而是讓自己的特質更成熟。\n\n接下來的一年，請先記得：${pack.growth.oneYear}\n接下來的三年，請慢慢發展：${pack.growth.threeYears}\n如果你願意持續理解自己，五年後的你會更接近這個樣子：${pack.growth.fiveYears}\n\n送給未來自己的話：\n我不需要否定原本的自己，才能成長。\n我可以保留自己的核心，也可以學會更自由、更溫柔、更有方向地使用它。`;
}
