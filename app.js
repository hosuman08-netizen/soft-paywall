try{localStorage.setItem('sp_views',(+(localStorage.getItem('sp_views')||0)+1));}catch(e){}
(function(){
  var unlocked=localStorage.getItem('spw_on')==='1';
  var unlockCount=+(localStorage.getItem('spw_n')||0);
  var credits=+(localStorage.getItem('soft-paywall_cr')||10);
  var chapter=+(localStorage.getItem('spw_ch')||0);
  var chapters=[
    '프리뷰: 도시의 밤, 문이 반쯤 열린다.',
    '챕터1: 암호 한 줄이 벽 너머 목소리로 바뀐다.',
    '챕터2: 거울 속 얼굴이 먼저 웃는다.',
    '챕터3: 네가 남긴 발자국이 역으로 따라온다.'
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
    }
  }catch(e){}
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
  function render(){
    var st=JSON.parse(localStorage.getItem('spw_streak')||'{}');
    var sc=st.count||0;
    var ready=!st.shieldLast||((new Date(dayKey(0))-new Date(st.shieldLast))/86400000)>=7;
    var feed=unlocked ? chapters[Math.min(chapter, chapters.length-1)] : chapters[0]+' 🔒 더 보려면 언락.';
    var h=unlockHist();
    root.innerHTML='<div class="card" style="border-color:#f472b6"><b>18+</b> Fictional · 실결제 아님 · 가상 크레딧 · 일일 재잠금</div>'
      +'<div class="card"><span class="chip">🔥 '+sc+'일'+(sc>=3&&ready?' · 🛡️':'')+'</span> <span class="chip">창 '+fomoLeft()+'</span> <span class="chip">조회 '+views()+'</span> <span class="chip">언락 '+unlockCount+'</span></div>'
      +'<div class="card" style="'+(unlocked?'':'filter:blur(3px)')+'"><p style="font-size:15px;line-height:1.5">'+feed+'</p>'
      +(unlocked?'<div class="sub" style="margin-top:8px">챕터 '+(chapter+1)+'/'+chapters.length+'</div>':'')
      +'</div>'
      +'<div class="card">크레딧 <b style="color:var(--gold)">'+credits+'</b>'
      +'<div class="row" style="margin-top:8px"><button id="un">'+(unlocked?'다음 챕터 (-1)':'언락 (-3)')+'</button><button class="sec" id="fr">일일 +3</button></div>'
      +(unlocked?'<button class="sec" id="shareBtn" style="margin-top:8px">📤 언락 공유</button>':'')
      +(h.length?'<div class="sub" style="margin-top:8px">최근 언락: '+h.slice(0,3).map(function(x){return x.d;}).join(' · ')+'</div>':'')
      +'<div id="moneyPipe" style="margin-top:12px;padding:10px;border:1px solid #c5a46e44;border-radius:12px;background:#16121c;text-align:center;font-size:12px">'
      +'<div style="color:#e0b552;font-weight:700;margin-bottom:4px">💎 크레딧 · 후원 (엔터 18+)</div>'
      +'<a style="color:#ece8f1;margin:0 6px" href="mailto:hoyashi95@gmail.com?subject=%5BSoftPaywall%5D%20support">☕ 후원 문의</a>'
      +'<a style="color:#ece8f1;margin:0 6px" href="https://hosuman08-netizen.github.io/ai-companion/?utm_source=spw&utm_medium=pipe">💋 Companion</a>'
      +'<a style="color:#e0b552;margin:0 6px" href="https://hosuman08-netizen.github.io/legion-hub/?utm_source=spw&utm_medium=pipe">🎮 Arcade</a>'
      +'</div></div>';
    document.getElementById('un').onclick=function(){
      if(!unlocked){
        if(credits<3){
          try{legionTrack('money_pipe_shown',{app:'soft-paywall',empty:1})}catch(e){}
          alert('크레딧 부족 · 일일 +3 또는 후원 문의');
          return;
        }
        credits-=3; unlocked=true; unlockCount++; chapter=1;
        localStorage.setItem('spw_n',unlockCount);
        localStorage.setItem('spw_lockday',dayKey(0));
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
    var sb=document.getElementById('shareBtn');
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
  render();
})();
