(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};

/* year */
$('#year').textContent=new Date().getFullYear();

/* theme */
const root=document.documentElement;
const saved=store.get('theme'); if(saved) root.dataset.theme=saved;
$('#theme').onclick=()=>{
  const dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme=dark?'light':'dark'; store.set('theme',root.dataset.theme);
};

/* reading progress */
const bar=$('#progress');
addEventListener('scroll',()=>{
  const h=document.documentElement; const max=h.scrollHeight-h.clientHeight;
  bar.style.width=(max>0?h.scrollTop/max*100:0)+'%';
},{passive:true});

/* share */
$('#share').onclick=async()=>{
  const data={title:document.title,url:location.href};
  try{ if(navigator.share){await navigator.share(data);return;} await navigator.clipboard.writeText(location.href); $('#share').textContent='Link copied ✓'; }
  catch(e){}
};

/* map stops */
const stops=[
 {n:'Kannauj',y:'Ancient roots',t:'The royal capital on the Ganga where Kalidas Mitra lived among the Kayastha administrative elite, before answering King Adisura’s invitation to Bengal.'},
 {n:'Ula-Birnagar',y:'1657',t:'Mohan Mitra, the Gurumahashay of Teka, settles on the eastern bank of the Bhagirathi-Hooghly. His son Rameshwar earns the title Mustauphi in 1704.'},
 {n:'Sripur-Balagarh',y:'1708',t:'Raghunandan Mitra Mustafi founds a boat-building enterprise for European merchants and raises the 1707 wooden Chandi Mandap, still home to the family Durga Puja.'},
 {n:'Sukharia-Somra',y:'1712',t:'Anantaram Mitra Mustafi crosses the river; the branch later buys the zamindari in 1757 and builds the great terracotta temples.'},
 {n:'Calcutta (Kolkata)',y:'20th century',t:'Education, law, medicine and civil service draw younger generations from the rural estates to the colonial capital.'},
 {n:'United States, Canada & beyond',y:'Mid-to-late 20th century onward',t:'The fourth and farthest migration: physicians, engineers, professors, entrepreneurs and artists across the oceans.'}
];
const stopsEl=$('.stops'), card=$('#stopCard');
function showStop(i){
  $$('.chip',stopsEl).forEach((c,j)=>c.classList.toggle('active',i===j));
  card.innerHTML=`<h4>${stops[i].n} <small style="font-weight:400;color:var(--muted)">· ${stops[i].y}</small></h4><p>${stops[i].t}</p>`;
}
stops.forEach((s,i)=>{const b=document.createElement('button');b.className='chip';b.textContent=s.n;b.onclick=()=>showStop(i);stopsEl.append(b);});
showStop(0);

/* timeline */
const events=[
 ['Early medieval','Kalidas Mitra leaves Kannauj for Bengal at King Adisura’s invitation.'],
 ['1657','Mohan Mitra moves from Teka to Ula (Birnagar).'],
 ['1694','The Jor-Bangla Temple, with terracotta scenes of the Ramayana, Krishna Lila and river life.'],
 ['1704','Emperor Aurangzeb grants Rameshwar the title Mustauphi and the Golden Panja.'],
 ['1707','Chandi Mandap built at Sripur; the first 51 lamps lit.'],
 ['1708','Raghunandan founds the Sripur-Balagarh branch.'],
 ['1712','Anantaram founds the Sukharia-Somra branch.'],
 ['1757','Tilakram buys the zamindari of Sukharia, Punui and Gopinagar for 1,001 rupees.'],
 ['1813 – 1847','Ananda Bhairavi (1813), Harasundari (1814) and Nistarini (1847) temples rise.'],
 ['1857','Burdwan Fever empties Ula; survivors cross the river or head to Calcutta.'],
 ['1947 & 1950s','Independence, then the Zamindari Abolition Acts end the estates.'],
 ['Mid-to-late 20th c.','The global diaspora begins.'],
 ['Every autumn','The annual return at Durga Puja.']
];
const tl=$('#timeline');
events.forEach(([y,t])=>{const li=document.createElement('li');li.innerHTML=`<b>${y}</b>${t}`;tl.append(li);});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.2});
$$('li',tl).forEach(li=>io.observe(li));

/* facts */
[['1,001','rupees paid for the zamindari of Sukharia, Punui and Gopinagar in 1757.'],
 ['51','earthen lamps lit at Durga Puja, as Raghunandan did in 1707.'],
 ['25','pinnacles on the Ananda Bhairavi Temple, flanked by twelve Shiva temples.'],
 ['10 + 1','Rameshwar left ten sons and a daughter.'],
 ['300','years of Durga Puja at the Chandi Mandap of Sripur.'],
 ['1','film: Mrinal Sen’s Akaler Sandhane, set among the ruins.']
].forEach(([b,t])=>{const d=document.createElement('div');d.className='fact';d.innerHTML=`<big>${b}</big><span>${t}</span>`;$('#facts').append(d);});

/* quiz */
const Q=[
 {q:'Which city on the Ganga did the family originally come from?',o:['Delhi','Kannauj','Murshidabad','Patna'],a:1,w:'Kalidas Mitra lived in Kannauj, in present-day Uttar Pradesh.'},
 {q:'Who invited five Brahmins and five Kayasthas to Bengal?',o:['King Adisura','Murshid Quli Khan','Shaista Khan','The Maharaja of Burdwan'],a:0,w:'King Adisura of Bengal sent the invitation to Kannauj.'},
 {q:'In which year did Mohan Mitra settle at Ula?',o:['1594','1657','1704','1757'],a:1,w:'Mohan Mitra left Teka for Ula (Birnagar) in 1657.'},
 {q:'What does the title “Mustauphi” mean?',o:['Royal Archer','Chief Priest','Auditor-General / Comptroller of Accounts','Master of Boats'],a:2,w:'It is an Arabic-Persian rank, later anglicized to Mustafi.'},
 {q:'Who granted Rameshwar the title, and in what year?',o:['Akbar, 1580','Aurangzeb, 1704','Shah Jahan, 1657','Murshid Quli Khan, 1757'],a:1,w:'Emperor Aurangzeb granted it in 1704 CE.'},
 {q:'What is the family crest called?',o:['The Silver Lotus','The Royal Fish','The Golden Palm (Panja)','The Twin Boats'],a:2,w:'The Golden Palm (Panja) was presented alongside the title.'},
 {q:'What business made Raghunandan wealthy at Sripur?',o:['Indigo','Boat-building and shipbuilding','Salt','Silk weaving'],a:1,w:'He built sturdy river vessels for the European merchants.'},
 {q:'How much did Tilakram pay for the Sukharia zamindari in 1757?',o:['1 rupee','101 rupees','1,001 rupees','100,001 rupees'],a:2,w:'A token sum of 1,001 rupees, paid to the Maharaja of Burdwan.'}
];
const quiz=$('#quiz'); let qi=0,score=0;
function renderQ(){
  if(qi>=Q.length) return renderResult();
  const q=Q[qi];
  quiz.innerHTML=`<div class="q-meta"><span>Question ${qi+1} of ${Q.length}</span><span>Score ${score}</span></div>
   <div class="q-bar"><i style="width:${qi/Q.length*100}%"></i></div><h4></h4><div class="opts"></div><div class="fb"></div>`;
  $('h4',quiz).textContent=q.q;
  q.o.forEach((t,i)=>{
    const b=document.createElement('button');b.className='opt';b.textContent=t;
    b.onclick=()=>{
      $$('.opt',quiz).forEach((x,j)=>{x.disabled=true;if(j===q.a)x.classList.add('right');});
      if(i===q.a)score++; else b.classList.add('wrong');
      $('.fb',quiz).innerHTML=`<div class="why">${q.w}</div><button class="btn">${qi===Q.length-1?'See result':'Next'}</button>`;
      $('.btn',quiz).onclick=()=>{qi++;renderQ();};
    };
    $('.opts',quiz).append(b);
  });
}
function renderResult(){
  const t=score>=7?'Golden Panja Scholar':score>=5?'Keeper of the Ledger':score>=3?'River Traveller':'Newcomer to the Story';
  const msg=`I scored ${score}/${Q.length} on the Mitra Mustaphy family quiz — ${t}!`;
  quiz.innerHTML=`<div class="result"><div class="score">${score} / ${Q.length}</div><div class="title">${t}</div>
   <p>${msg}</p><button class="btn" id="qshare">Share my result</button> <button class="chip" id="qagain">Try again</button></div>`;
  $('#qagain').onclick=()=>{qi=0;score=0;renderQ();};
  $('#qshare').onclick=async()=>{try{if(navigator.share)await navigator.share({text:msg,url:location.href});else{await navigator.clipboard.writeText(msg+' '+location.href);$('#qshare').textContent='Copied ✓';}}catch(e){}};
}
renderQ();

/* ---------- Dynamic family album ----------
   Sources, in order:
   1. gallery/gallery.json  (written by update-gallery.py / update-gallery.sh)
   2. the gallery/ directory listing (works on hosts that expose one)
   Captions come from the file name: "Sripur_Durga_Puja_1998.jpg" -> "Sripur Durga Puja 1998".
   A gallery.json entry may also be {"src":"...","caption":"..."} to override it. */
const IMG=/\.(jpe?g|png|gif|webp|avif|svg)$/i;
const pretty=f=>decodeURIComponent(f.split('/').pop()).replace(/\.[^.]+$/,'').replace(/[_\-]+/g,' ').replace(/^\d+\s+(?=\D)/,'').trim();
async function loadList(){
  try{
    const r=await fetch('gallery/gallery.json',{cache:'no-cache'});
    if(r.ok){const j=await r.json();const arr=Array.isArray(j)?j:(j.images||[]);
      return arr.map(x=>typeof x==='string'?{src:x.includes('/')?x:'gallery/'+x}:{src:x.src.includes('/')?x.src:'gallery/'+x.src,caption:x.caption});}
  }catch(e){}
  try{
    const r=await fetch('gallery/',{cache:'no-cache'});
    if(r.ok){const html=await r.text();const d=new DOMParser().parseFromString(html,'text/html');
      return $$('a',d).map(a=>a.getAttribute('href')).filter(h=>h&&IMG.test(h.split('?')[0])).map(h=>({src:'gallery/'+decodeURIComponent(h.split('/').pop())}));}
  }catch(e){}
  return [];
}
const grid=$('#album-grid'); let album=[]; let cur=0;
loadList().then(list=>{
  const seen=new Set(); album=list.filter(x=>x.src&&IMG.test(x.src)&&!seen.has(x.src)&&seen.add(x.src));
  if(!album.length){$('#album-empty').hidden=false;return;}
  album.forEach((it,i)=>{
    const cap=it.caption||pretty(it.src);
    const f=document.createElement('figure');
    f.innerHTML=`<img loading="lazy" decoding="async" alt=""><figcaption></figcaption>`;
    $('img',f).src=encodeURI(decodeURI(it.src)); $('img',f).alt=cap; $('figcaption',f).textContent=cap;
    $('img',f).onerror=()=>f.remove();
    f.onclick=()=>openLb(i); grid.append(f);
    it.cap=cap;
  });
});

/* lightbox */
const lb=$('#lightbox');
function openLb(i){cur=(i+album.length)%album.length;$('img',lb).src=encodeURI(decodeURI(album[cur].src));$('figcaption',lb).textContent=album[cur].cap||'';lb.hidden=false;document.body.style.overflow='hidden';}
function closeLb(){lb.hidden=true;document.body.style.overflow='';}
$('.lb-close',lb).onclick=closeLb;
$('.prev',lb).onclick=e=>{e.stopPropagation();openLb(cur-1)};
$('.next',lb).onclick=e=>{e.stopPropagation();openLb(cur+1)};
lb.onclick=e=>{if(e.target===lb)closeLb();};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')openLb(cur-1);if(e.key==='ArrowRight')openLb(cur+1);});
})();
