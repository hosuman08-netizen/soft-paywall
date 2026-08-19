
/* LEGION_WAVE_74_today_counter */
try{var _dk=new Date().toDateString();var _o=JSON.parse(localStorage.getItem('lw_p35_soft_pay_today_counter')||'{}');if(_o.d!==_dk)_o={d:_dk,n:0};_o.n=(_o.n||0)+1;localStorage.setItem('lw_p35_soft_pay_today_counter',JSON.stringify(_o));}catch(e){}
try{localStorage.setItem('sp_views',(+(localStorage.getItem('sp_views')||0)+1));}catch(e){}
(function(){
  var unlocked=localStorage.getItem('spw_on')==='1';
  var unlockCount=+(localStorage.getItem('spw_n')||0);
  var credits=+(localStorage.getItem('soft-paywall_cr')||10);
  var chapter=+(localStorage.getItem('spw_ch')||0);
  /* GOLD50 TOP3: Substack/Ghost 가치 증거 — 챕터 본문 3배(로컬 카피). 실결제 0 · 외부 CMS 0 */
  var chapters=[
    '도시의 밤, 문이 반쯤 열린다. 복도 끝 전구가 한 번 깜빡이고, 신발 한 짝이 문턱에 걸쳐 있다. 누가 먼저 이름을 불렀는지는 기억나지 않는다. 다만 그 목소리는 분명했다. 너는 그 문을 밀고 들어간다. 안쪽은 아직 따뜻하다. 코트 걸이에 낯선 향이 남아 있고, 탁자 위 잔은 아직 김이 돈다. 창밖 네온이 한 박자 늦게 깜빡일 때마다 방 안 그림자가 한 칸씩 옮겨 앉는다. 너는 이름을 다시 부르지 않는다. 문이 닫히기 전에, 복도에서 두 번째 발소리가 따라온다.',
    '챕터1: 암호 한 줄이 벽 너머 목소리로 바뀐다. 종이에 적힌 숫자는 방 번호가 아니라 박자였다. 세 번 두드리면 벽이 숨 쉬고, 네 번째는 대답이다. 너는 귀를 벽에 댄다. 반대편에서 같은 문장을 거꾸로 읽는다. 손끝이 차다. 암호는 이미 네 목소리로 바뀌어 있다.',
    '챕터2: 거울 속 얼굴이 먼저 웃는다. 김이 서린 유리에 입술이 네 것보다 반 박자 빠르다. 네가 아직 질문하지 않은 이름을 거울이 먼저 발음한다. 세면대 물이 멈추지 않는다. 배수구에서 작은 반지 하나가 떠오른다. 안쪽에 새긴 글자는 네 이니셜이 아니다.',
    '챕터3: 네가 남긴 발자국이 역으로 따라온다. 젖은 바닥의 무늬가 문을 향해 되감긴다. 복도 조명이 하나씩 꺼질 때마다 발자국은 한 칸 더 가까워진다. 너는 구두 뒤축을 확인한다. 진흙은 오늘 신지 않은 흙이다. 창밖에는 같은 신발이 비에 서 있다.',
    '챕터4: 빗소리가 이름을 부른다. 창틀을 두드리는 리듬이 성과 이름 사이를 끊는다. 너는 따라 말하지 않는다. 빗줄기가 유리에 쓰는 글자는 지워지기 전에만 읽을 수 있다. 마지막 음절에서 엘리베이터가 멈춘다. 문은 열리지 않는다. 층수는 네가 누른 숫자가 아니다.',
    '챕터5: 마지막 불빛 아래 문이 다시 잠긴다. 열쇠는 처음부터 안쪽에 있었다. 너는 손잡이를 돌리지 않는다. 잠금이 스스로 맞물리는 소리가 하루의 끝과 같다. 내일 같은 복도가 다시 열릴 것이다. 그때의 너는 오늘의 문장을 절반만 기억한다. 허구의 장. 결제 없음.'
  ];
  var root=document.getElementById('app');
  var SHARE_BASE='https://hosuman08-netizen.github.io/soft-paywall/';
  function save(){localStorage.setItem('soft-paywall_cr',credits);localStorage.setItem('spw_on',unlocked?'1':'0');localStorage.setItem('spw_ch',chapter);}
  function dayKey(off){
    var d=new Date(); d.setDate(d.getDate()+(off||0));
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }
  function kId(){
    try{
      var id=localStorage.getItem('spw_k_id');
      if(!id){id='w'+Math.random().toString(36).slice(2,8);localStorage.setItem('spw_k_id',id);}
      return id;
    }catch(e){return 'share';}
  }
  function shareUrl(){return SHARE_BASE+'?utm_source=share&utm_medium=app&ref='+encodeURIComponent(kId());}
  function views(){try{return +(localStorage.getItem('sp_views')||0);}catch(e){return 0;}}
  function unlockHist(){try{return JSON.parse(localStorage.getItem('spw_hist')||'[]');}catch(e){return[];}}
  function pushUnlock(){
    try{
      var h=unlockHist(); h.unshift({d:dayKey(0),ts:Date.now()});
      localStorage.setItem('spw_hist',JSON.stringify(h.slice(0,12)));
    }catch(e){}
  }
  // daily soft re-lock for return loop (fictional)
  try{
    var lockDay=localStorage.getItem('spw_lockday');
    if(unlocked && lockDay && lockDay!==dayKey(0)){
      unlocked=false; localStorage.setItem('spw_on','0');
      chapter=0; localStorage.setItem('spw_ch','0');
      /* GOLD50 TOP5: Piano/NYT return-loop copy */
      localStorage.setItem('spw_relock_why', dayKey(0));
      /* WAVE50: stamp when daily expiry actually fired */
      if(!localStorage.getItem('spw_relock_at')||localStorage.getItem('spw_relock_day')!==dayKey(0)){
        localStorage.setItem('spw_relock_at', String(Date.now()));
        localStorage.setItem('spw_relock_day', dayKey(0));
      }
    }
  }catch(e){}
  function relockWhyOn(){try{return localStorage.getItem('spw_relock_why')===dayKey(0);}catch(e){return false;}}
  function relockWhenLine(){
    try{
      var ts=+(localStorage.getItem('spw_relock_at')||0);
      if(!ts) return '';
      var d=new Date(ts);
      var hh=String(d.getHours()).padStart(2,'0');
      var mm=String(d.getMinutes()).padStart(2,'0');
      return '재잠금 '+hh+':'+mm+' · 자정에 새 장 · 실결제 0';
    }catch(e){return '';}
  }
  function bumpStreak(){
    try{
      var st=JSON.parse(localStorage.getItem('spw_streak')||'{}');
      if(!st||typeof st!=='object')st={last:null,count:0};
      var t=dayKey(0);
      if(st.last===t) return st;
      var y=dayKey(-1),y2=dayKey(-2),froze=false;
      if(st.last && st.last!==y && st.last===y2 && (st.count||0)>=3){
        var ready=!st.shieldLast||((new Date(t)-new Date(st.shieldLast))/86400000)>=7;
        if(ready){st.shieldLast=t;st.last=y;froze=true;try{legionTrack('streak_freeze',{count:st.count})}catch(e){}}
      }
      st.count=(st.last===y)?(st.count||0)+1:1;
      st.last=t;
      localStorage.setItem('spw_streak',JSON.stringify(st));
      try{legionTrack('streak',{count:st.count,froze:froze})}catch(e){}
      return st;
    }catch(e){return {count:0};}
  }
  function fomoLeft(){
    var end=new Date(); end.setHours(24,0,0,0);
    var ms=Math.max(0,end-Date.now());
    return Math.floor(ms/3600000)+'h '+Math.floor((ms%3600000)/60000)+'m';
  }
  /* GOLD50 TOP2: Piano/Admiral 다이나믹 오퍼. 첫언락 1회 −1, 이후 −3. 실결제 0 */
  function onrampOpen(){try{return localStorage.getItem('spw_onramp')!=='1';}catch(e){return true;}}
  function unlockCost(){return onrampOpen()?1:3;}
  function laterCtaText(){
    try{
      var stored=localStorage.getItem('spw_later_cta');
      if(localStorage.getItem('spw_later')==='1' && stored) return stored;
    }catch(e){}
    return '나머지 언락 (-'+unlockCost()+')';
  }
  /* WAVE78: later CTA shows remaining time. Same midnight clock. No payment. */
  function laterCtaWithLeft(){
    return laterCtaText()+' · 자정 '+fomoLeft();
  }
  /* WAVE86: later chip also ticks remaining time. Same midnight clock. No payment. */
  function laterChipText(){
    return '나중에 유지 · '+fomoLeft();
  }
  /* WAVE69: later expires at local midnight. Display 1-line. No payment. */
  function laterExpireIfStale(){
    try{
      if(localStorage.getItem('spw_later')!=='1') return;
      var day=localStorage.getItem('spw_later_day');
      if(!day){ localStorage.setItem('spw_later_day', dayKey(0)); return; }
      if(day!==dayKey(0)){
        localStorage.removeItem('spw_later');
        localStorage.removeItem('spw_later_cta');
        localStorage.removeItem('spw_later_day');
      }
    }catch(e){}
  }
  function laterExpLine(){
    return '나중에 만료 자정 · '+fomoLeft()+' · 실결제 0';
  }
  /* WAVE74: header expire chip. Same midnight clock as #laterExp. No payment. */
  function clearLater(){
    try{
      localStorage.removeItem('spw_later');
      localStorage.removeItem('spw_later_cta');
      localStorage.removeItem('spw_later_day');
    }catch(e){}
  }
  function markOnramp(){try{localStorage.setItem('spw_onramp','1');}catch(e){}}
  /* GOLD50 TOP4: Admiral/Pelcro 레지월 감각 — 오늘 무료 언락 1. 실결제 0 */
  function free1Used(){try{return localStorage.getItem('spw_free1_'+dayKey(0))==='1';}catch(e){return true;}}
  function markFree1(){try{localStorage.setItem('spw_free1_'+dayKey(0),'1');}catch(e){}}
  function grantFree1(){
    if(free1Used()){alert('오늘 무료 언락 사용됨');return;}
    if(!unlocked){
      markFree1(); markOnramp(); unlocked=true; unlockCount++; chapter=1;
      localStorage.setItem('spw_n',unlockCount);
      localStorage.setItem('spw_lockday',dayKey(0));
      try{clearLater(); localStorage.removeItem('spw_relock_why'); localStorage.removeItem('spw_relock_at'); localStorage.removeItem('spw_relock_day');}catch(e){}
      pushUnlock(); save(); bumpStreak(); render();
      try{legionTrack('activate',{free1:1})}catch(e){}
      return;
    }
    if(chapter>=chapters.length-1){ alert('오늘 스토리 끝 · 내일 재잠금 후 새 루프'); return; }
    markFree1(); chapter++; save(); bumpStreak(); render();
    try{legionTrack('activate',{free1:1,ch:chapter})}catch(e){}
  }
  function render(){
    laterExpireIfStale();
    var st=JSON.parse(localStorage.getItem('spw_streak')||'{}');
    var sc=st.count||0;
    var ready=!st.shieldLast||((new Date(dayKey(0))-new Date(st.shieldLast))/86400000)>=7;
    var showCh=unlocked?chapters[Math.min(Math.max(chapter,1), chapters.length-1)]:chapters[0];
    var cutAt=chapters[0].indexOf('다. ');
    if(cutAt<12) cutAt=48; else cutAt+=2;
    var head=chapters[0].slice(0,cutAt+1);
    var tail=chapters[0].slice(cutAt+1);
    var laterOn=false; try{laterOn=localStorage.getItem('spw_later')==='1';}catch(e){}
    var h=unlockHist();
    root.innerHTML='<div class="card" style="border-color:#f472b6"><b>18+</b> Fictional · 실결제 아님 · 가상 크레딧 · 일일 재잠금 · 숨김취소 없음</div>'
      +(!unlocked&&relockWhyOn()?'<div class="card" id="relockWhy" style="border-color:#e0b552"><b>어제 언락 만료 · 오늘 새 장</b><p class="sub" id="relockWhen" style="margin:6px 0 0">'+(relockWhenLine()||'일일 재잠금 · 실결제 0 · 크레딧/무료1로 다시')+'</p></div>':'')
      +'<div class="card"><span class="chip">🔥 '+sc+'일'+(sc>=3&&ready?' · 🛡️':'')+'</span> <span class="chip">창 '+fomoLeft()+'</span> <span class="chip">조회 '+views()+'</span> <span class="chip">언락 '+unlockCount+'</span>'+(unlocked?'':' <span class="chip">첫장 일부</span>')+(!unlocked&&onrampOpen()?' <span class="chip" id="onrampChip">첫언락 <b>−1</b></span>':'')+(free1Used()?' <span class="chip" id="free1Chip">오늘 무료 언락 사용</span>':' <span class="chip" id="free1Chip">오늘 무료 언락 <b>1</b></span>')+(laterOn&&!unlocked?' <span class="chip" id="laterChip">'+laterChipText()+'</span> <span class="chip" id="laterExpChip">자정 만료 '+fomoLeft()+'</span>':'')+'</div>'
      +'<div class="card">'+(unlocked
        ? '<p style="font-size:15px;line-height:1.5">'+showCh+'</p><div class="sub" style="margin-top:8px">챕터 '+(Math.max(chapter,1)+1)+'/'+chapters.length+'</div>'
        : '<p style="font-size:15px;line-height:1.5">'+head+'</p>'
          +'<p style="filter:blur(5px);user-select:none;font-size:15px;line-height:1.5;margin-top:8px">'+(tail||chapters[1])+'</p>'
          +'<p class="sub" style="margin-top:10px">첫장 일부 · 이어서는 로컬 소프트월 · 실결제 0</p>')
      +'</div>'
      +'<div class="card">크레딧 <b style="color:var(--gold)">'+credits+'</b>'
      +(laterOn&&!unlocked?'<p class="sub" id="laterCta" style="margin:6px 0 0">'+laterCtaWithLeft()+' · 미리보기 유지 · 실결제 0</p><p class="sub" id="laterExp" style="margin:4px 0 0">'+laterExpLine()+'</p>':'')
      +'<div class="row" style="margin-top:8px"><button id="un">'+(unlocked?'다음 챕터 (-1)':(laterOn?laterCtaWithLeft():laterCtaText()))+'</button>'
      +(unlocked?'':'<button class="sec" id="later">나중에</button>')
      +'<button class="sec" id="fr">일일 +3</button>'
      +(free1Used()?'':'<button class="sec" id="free1">오늘 무료 언락 1</button>')+'</div>'
      +(unlocked?'<button class="sec" id="shareBtn" style="margin-top:8px">📤 언락 공유</button><button class="sec" id="relock" style="margin-top:8px">🔒 다시 잠그기(체험)</button>':'')
      +(h.length?'<div class="sub" style="margin-top:8px">최근 언락: '+h.slice(0,3).map(function(x){return x.d;}).join(' · ')+'</div>':'')
      +'<div id="moneyPipe" style="margin-top:12px;padding:10px;border:1px solid #c5a46e44;border-radius:12px;background:#16121c;text-align:center;font-size:12px">'
      +'<div style="color:#e0b552;font-weight:700;margin-bottom:4px">💎 크레딧 · 후원 (엔터 18+)</div>'
      +'<a style="color:#ece8f1;margin:0 6px" href="mailto:hoyashi95@gmail.com?subject=%5BSoftPaywall%5D%20support">☕ 후원 문의</a>'
      +'<a style="color:#ece8f1;margin:0 6px" href="https://hosuman08-netizen.github.io/ai-companion/?utm_source=spw&utm_medium=pipe">💋 Companion</a>'
      +'<a style="color:#e0b552;margin:0 6px" href="https://hosuman08-netizen.github.io/legion-hub/?utm_source=spw&utm_medium=pipe">🎮 Arcade</a>'
      +'</div></div>';
    document.getElementById('un').onclick=function(){
      if(!unlocked){
        var cost=unlockCost();
        if(credits<cost){
          try{legionTrack('money_pipe_shown',{app:'soft-paywall',empty:1})}catch(e){}
          alert('크레딧 부족 · 일일 +3 또는 후원 문의');
          return;
        }
        credits-=cost; markOnramp(); unlocked=true; unlockCount++; chapter=1;
        localStorage.setItem('spw_n',unlockCount);
        localStorage.setItem('spw_lockday',dayKey(0));
        try{clearLater(); localStorage.removeItem('spw_relock_why'); localStorage.removeItem('spw_relock_at'); localStorage.removeItem('spw_relock_day');}catch(e){}
        pushUnlock(); save(); bumpStreak(); render();
        try{legionTrack('activate',{unlock:1})}catch(e){}
        try{legionTrack('share_peak_shown',{unlock:1})}catch(e){}
        try{legionTrack('money_pipe_shown',{app:'soft-paywall'})}catch(e){}
        return;
      }
      // next chapter
      if(chapter>=chapters.length-1){ alert('오늘 스토리 끝 · 내일 재잠금 후 새 루프'); return; }
      if(credits<1){ alert('크레딧 부족'); return; }
      credits--; chapter++; save(); bumpStreak(); render();
      try{legionTrack('activate',{ch:chapter})}catch(e){}
    };
    document.getElementById('fr').onclick=function(){
      var k='spw_d_'+dayKey(0); if(localStorage.getItem(k)){alert('오늘 충전 완료');return;}
      localStorage.setItem(k,'1'); credits+=3; save(); render();
      try{legionTrack('activate',{free:1})}catch(e){}
    };
    var f1=document.getElementById('free1');
    if(f1) f1.onclick=grantFree1;
    var f1c=document.getElementById('free1Chip');
    if(f1c && !free1Used()) f1c.onclick=grantFree1;
    var sb=document.getElementById('shareBtn');
    var rl=document.getElementById('relock');
    var laterBtn=document.getElementById('later');
    if(laterBtn) laterBtn.onclick=function(){
      try{
        var copy=laterCtaText();
        localStorage.setItem('spw_later','1');
        localStorage.setItem('spw_later_cta', copy);
        localStorage.setItem('spw_later_day', dayKey(0));
      }catch(e){}
      render();
      try{legionTrack('later',{})}catch(e){}
    };
    var laterChip=document.getElementById('laterChip');
    if(laterChip) laterChip.onclick=function(){
      /* WAVE94: chip tap jumps to expire line. No payment. laterExpChip still clears. */
      /* WAVE102: after jump highlight expire line. Gold flash — no stripe. */
      /* WAVE112: during highlight remaining-time 1-line. Same midnight clock. No stripe. */
      /* WAVE120: during highlight CTA also remaining. Same midnight. No stripe. */
      /* WAVE127: during highlight chips also remaining. Same midnight. No stripe. */
      /* WAVE133: chip tap during highlight = instant restore. No stripe. */
      var exp=document.getElementById('laterExp');
      if(exp && exp._hiT){
        try{clearTimeout(exp._hiT);}catch(e0){}
        exp._hiT=null;
        try{
          exp.style.color='';
          exp.style.background='';
          exp.style.outline='';
          exp.style.borderRadius='';
          exp.style.padding='';
          exp.textContent=laterExpLine();
          var cta=document.getElementById('laterCta');
          var unBtn=document.getElementById('un');
          var expChip=document.getElementById('laterExpChip');
          if(cta) cta.textContent=laterCtaWithLeft()+' · 미리보기 유지 · 실결제 0';
          if(unBtn) unBtn.textContent=laterCtaWithLeft();
          laterChip.textContent=laterChipText();
          if(expChip) expChip.textContent='자정 만료 '+fomoLeft();
        }catch(e1){}
        return;
      }
      if(exp){
        try{exp.scrollIntoView({behavior:'smooth',block:'center'});}catch(e){try{exp.scrollIntoView();}catch(e2){}}
        var leftLine='남은 '+fomoLeft()+' · 자정 · 실결제 0';
        exp.textContent=leftLine;
        exp.style.color='#e0b552';
        exp.style.background='#e0b55222';
        exp.style.outline='1px solid #e0b55288';
        exp.style.borderRadius='6px';
        exp.style.padding='4px 6px';
        var cta=document.getElementById('laterCta');
        var unBtn=document.getElementById('un');
        var expChip=document.getElementById('laterExpChip');
        if(cta) cta.textContent=leftLine;
        if(unBtn) unBtn.textContent=leftLine;
        laterChip.textContent=leftLine;
        if(expChip) expChip.textContent=leftLine;
        try{clearTimeout(exp._hiT);}catch(e3){}
        exp._hiT=setTimeout(function(){
          try{
            exp.style.color='';
            exp.style.background='';
            exp.style.outline='';
            exp.style.borderRadius='';
            exp.style.padding='';
            exp.textContent=laterExpLine();
            if(cta) cta.textContent=laterCtaWithLeft()+' · 미리보기 유지 · 실결제 0';
            if(unBtn) unBtn.textContent=laterCtaWithLeft();
            laterChip.textContent=laterChipText();
            if(expChip) expChip.textContent='자정 만료 '+fomoLeft();
          }catch(e4){}
        },1600);
      }
      try{legionTrack('later_jump_left',{})}catch(e){}
    };
    var laterExpChip=document.getElementById('laterExpChip');
    if(laterExpChip) laterExpChip.onclick=function(){
      /* WAVE133: expire-chip tap during highlight = instant restore. Clear still 2nd tap. */
      var exp=document.getElementById('laterExp');
      if(exp && exp._hiT){
        if(laterChip) laterChip.onclick();
        return;
      }
      clearLater();
      render();
      try{legionTrack('later_off',{chip:'exp'})}catch(e){}
    };
    if(rl) rl.onclick=function(){
      unlocked=false; chapter=0;
      try{
        clearLater();
        localStorage.setItem('spw_relock_why', dayKey(0));
        localStorage.setItem('spw_relock_at', String(Date.now()));
        localStorage.setItem('spw_relock_day', dayKey(0));
      }catch(e){}
      save(); render(); try{legionTrack('relock',{})}catch(e){}
    };

    if(sb) sb.onclick=function(){
      var text='Soft Paywall ch'+(chapter+1)+' unlock (fictional 18+)\n'+shareUrl();
      if(navigator.share) navigator.share({text:text,url:shareUrl()}).catch(function(){});
      else if(navigator.clipboard) navigator.clipboard.writeText(text);
      try{legionTrack('share_peak',{})}catch(e){}
    };
  }
  try{
    var q=new URLSearchParams(location.search||'');
    var ref=q.get('ref');
    if(ref && ref!=='share' && ref!==kId() && !localStorage.getItem('spw_k_from')){
      localStorage.setItem('spw_k_from',ref);
      try{legionTrack('k_link',{from:ref})}catch(e){}
    }
  }catch(e){}
  try{legionTrack('session_start',{})}catch(e){}
  /* WAVE86: tick later chip remaining time. Midnight clock only. No stripe. */
  setInterval(function(){
    try{
      var chip=document.getElementById('laterChip');
      if(chip) chip.textContent=laterChipText();
      var exp=document.getElementById('laterExpChip');
      if(exp) exp.textContent='자정 만료 '+fomoLeft();
    }catch(e){}
  }, 30000);
  render();
})();

setTimeout(function(){try{var v=+(localStorage.getItem('sp_views')||0);var a=document.getElementById('app');if(a&&!document.getElementById('spv')){var d=document.createElement('div');d.id='spv';d.style.cssText='font-size:12px;opacity:.7;margin:8px 0';d.textContent='조회 '+v;a.insertBefore(d,a.firstChild);}}catch(e){}},30);

/* LEGION_WAVE_29_fomo_chip */
setTimeout(function(){try{if(document.getElementById('lw_fomo_29'))return;var end=new Date(); end.setHours(24,0,0,0);var ms=Math.max(0,end-Date.now());var h=Math.floor(ms/3600000), m=Math.floor((ms%3600000)/60000);var d=document.createElement('div'); d.id='lw_fomo_29';d.style.cssText='font-size:11px;opacity:.75;margin:6px 0;color:#e0b552';d.textContent='window '+h+'h '+m+'m · W29';var app=document.getElementById('app')||document.body; app.insertBefore(d, app.firstChild);}catch(e){}},40);
