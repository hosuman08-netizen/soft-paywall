(function(){
  var unlocked=localStorage.getItem('spw_on')==='1'; var unlockCount=+(localStorage.getItem('spw_n')||0);
  var credits=+(localStorage.getItem('soft-paywall_cr')||10);
  var root=document.getElementById('app');
  function save(){localStorage.setItem('soft-paywall_cr',credits);localStorage.setItem('spw_on',unlocked?'1':'0');}
  function render(){
    var feed='프리뷰 피드 문단. '+(unlocked?'전체 해제됨 — 깊은 로그 공개.':'🔒 더 보려면 언락.');
    root.innerHTML='<div class="card" style="border-color:#f472b6"><b>18+</b> Fictional · 실결제 아님</div>'
      +'<div class="card" style="'+(unlocked?'':'filter:blur(3px)')+'">'+feed+'</div>'
      +'<div class="card">크레딧 '+credits+' · 언락 '+unlockCount+'회
      +'<button id="un" style="margin-top:8px">언락 (-3)</button><button class="sec" id="fr">일일 +3</button></div>';
    document.getElementById('un').onclick=function(){
      if(unlocked){return;} if(credits<3){alert('크레딧 부족');return;} credits-=3;unlocked=true; unlockCount++; localStorage.setItem('spw_n',unlockCount);save();render();try{legionTrack('activate',{unlock:1})}catch(e){}
    };
    document.getElementById('fr').onclick=function(){
      var k='spw_d_'+new Date().toDateString(); if(localStorage.getItem(k))return; localStorage.setItem(k,'1');credits+=3;save();render();
    };
  }
  try{legionTrack('session_start',{})}catch(e){}
  render();
})();
