(function(){
  var unlocked=localStorage.getItem('spw_on')==='1';
  var unlockCount=+(localStorage.getItem('spw_n')||0);
  var credits=+(localStorage.getItem('soft-paywall_cr')||10);
  var root=document.getElementById('app');
  var SHARE_BASE='https://hosuman08-netizen.github.io/soft-paywall/';
  function save(){localStorage.setItem('soft-paywall_cr',credits);localStorage.setItem('spw_on',unlocked?'1':'0');}
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
    var feed=unlocked
      ? '전체 해제됨 — 깊은 로그 공개. 픽션 피드 문단이 선명합니다.'
      : '프리뷰 피드 문단. 🔒 더 보려면 언락.';
    root.innerHTML='<div class="card" style="border-color:#f472b6"><b>18+</b> Fictional · 실결제 아님 · 가상 크레딧</div>'
      +'<div class="card"><span class="chip">🔥 '+sc+'일'+(sc>=3&&ready?' · 🛡️':'')+'</span> <span class="chip">창 '+fomoLeft()+'</span></div>'
      +'<div class="card" style="'+(unlocked?'':'filter:blur(3px)')+'">'+feed+'</div>'
      +'<div class="card">크레딧 <b style="color:var(--gold)">'+credits+'</b> · 언락 '+unlockCount+'회'
      +'<button id="un" style="margin-top:8px">언락 (-3)</button><button class="sec" id="fr">일일 +3</button>'
      +(unlocked?'<button class="sec" id="shareBtn" style="margin-top:8px">📤 언락 공유</button>':'')
      +'<div id="moneyPipe" style="margin-top:12px;padding:10px;border:1px solid #c5a46e44;border-radius:12px;background:#16121c;text-align:center;font-size:12px">'
      +'<div style="color:#e0b552;font-weight:700;margin-bottom:4px">💎 크레딧 · 후원 (엔터 18+)</div>'
      +'<a style="color:#ece8f1;margin:0 6px" href="mailto:hoyashi95@gmail.com?subject=%5BSoftPaywall%5D%20support">☕ 후원 문의</a>'
      +'<a style="color:#ece8f1;margin:0 6px" href="https://hosuman08-netizen.github.io/ai-companion/?utm_source=spw&utm_medium=pipe">💋 Companion</a>'
      +'<a style="color:#e0b552;margin:0 6px" href="https://hosuman08-netizen.github.io/legion-hub/?utm_source=spw&utm_medium=pipe">🎮 Arcade</a>'
      +'</div></div>';
    document.getElementById('un').onclick=function(){
      if(unlocked){return;}
      if(credits<3){
        try{legionTrack('money_pipe_shown',{app:'soft-paywall',empty:1})}catch(e){}
        alert('크레딧 부족 · 일일 +3 또는 후원 문의');
        return;
      }
      credits-=3;unlocked=true; unlockCount++; localStorage.setItem('spw_n',unlockCount);save();
      bumpStreak();
      render();
      try{legionTrack('activate',{unlock:1})}catch(e){}
      try{legionTrack('share_peak_shown',{unlock:1})}catch(e){}
      try{legionTrack('money_pipe_shown',{app:'soft-paywall'})}catch(e){}
    };
    document.getElementById('fr').onclick=function(){
      var k='spw_d_'+new Date().toDateString(); if(localStorage.getItem(k))return; localStorage.setItem(k,'1');credits+=3;save();render();
    };
    var sb=document.getElementById('shareBtn');
    if(sb) sb.onclick=function(){
      var text='Soft Paywall unlock (fictional 18+)\n'+shareUrl();
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
