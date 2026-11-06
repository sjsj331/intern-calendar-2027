const D=window.DATA,TODAY=new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Seoul"}),MONTHS=["2026-11","2026-12","2027-01","2027-02","2027-03","2027-04","2027-05","2027-06"];
const CONCL={busan:"남부발전(11/11 11시)·청소년상담원(11/10) 지금 지원! HUG·주금공은 11월 말~12월 예상",seoul:"1순위 IBK기업은행 체험형 — 11/16 오전 10시 마감, 어학·한국사 무관"};
let tab="busan",mi=0,list=false,sel=null;const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const mark=(d,o)=>d.JRMAP?(d.JRMARK[d.JRMAP[o]||"없음"]||""):"";
function render(){const d=D[tab],m=MONTHS[mi];$("concl").textContent=CONCL[tab];
document.querySelectorAll(".tabs button").forEach(b=>b.classList.toggle("on",b.dataset.t==tab));
$("jrwrap").style.display=d.JRMAP?"":"none";const only=d.JRMAP&&$("onlyjr").checked;
$("legend").innerHTML=Object.keys(d.COLOR).map(k=>`<span><i style="background:${d.COLOR[k]}"></i>${esc(d.KNAME[k])}</span>`).join("");
const [y,mo]=m.split("-").map(Number);$("mtitle").textContent=`${y}년 ${mo}월`;$("vbtn").textContent=list?"달력 보기":"목록 보기";
const evs=d.EVS.map((e,i)=>({...e,i})).filter(e=>e.d.startsWith(m)&&(!only||d.JRMAP[e.org]==="의무"));
const chip=e=>`<span class="chip${e.kind=="est"?" est":""}" data-i="${e.i}" style="border-color:${d.COLOR[e.kind]}">${mark(d,e.org)}${esc(e.label.split(" ")[0])}</span>`;
if(list){$("cal").innerHTML=evs.length?evs.map(e=>`<div class="row${e.kind=="est"?" est":""}" data-i="${e.i}"><span class="dt">${+e.d.slice(8)}일</span><span class="sw" style="background:${d.COLOR[e.kind]}"></span><span>${mark(d,e.org)}${esc(e.label)}</span></div>`).join(""):"<p>이 달은 일정이 없습니다.</p>";}
else{const f=new Date(y,mo-1,1).getDay(),n=new Date(y,mo,0).getDate();let h="日月火水木金土".split("").map((_,i)=>`<div class="h"${i==0?' style="color:#E5484D"':""}>${"일월화수목금토"[i]}</div>`).join("");
const cells=[];for(let i=0;i<f;i++)cells.push(0);for(let i=1;i<=n;i++)cells.push(i);while(cells.length%7)cells.push(0);
h+=cells.map(c=>{if(!c)return '<div class="d"></div>';const ds=`${m}-${String(c).padStart(2,"0")}`;return `<div class="d${ds==TODAY?" today":""}"><div class="n">${c}</div>${evs.filter(e=>e.d==ds).map(chip).join("")}</div>`}).join("");
$("cal").innerHTML=`<div class="grid">${h}</div>`;}
$("prev").disabled=mi==0;$("next").disabled=mi==MONTHS.length-1;showDetail();}
function showDetail(){const el=$("detail");if(sel==null){el.hidden=true;return}const d=D[tab],e=d.EVS[sel],o=d.ORGS[e.org];el.hidden=false;
if(e.org=="me"){el.innerHTML=`<button class="close" onclick="sel=null;showDetail()">닫기</button><h2>${e.d.slice(5).replace("-","/")} ${esc(e.label)}</h2><p>내 개인 일정입니다. JPT 접수 11/17 12:00(특별 11/19), 시험 11/22, 성적 11/27 · JLPT 12/6 · 일본 여행 12/14~28.</p>`;return}
const rows=[["기관",o.name],["지원 가능",`<span class="pill ${o.tone}">${esc(o.ok)}</span>`,1],["일정 종류",d.KNAME[e.kind]],["직무·분야",o.field],["인턴 유형",o.type]];
if(d.JRMAP)rows.push(["지역인재",`${esc(d.JRTEXT[d.JRMAP[e.org]||"확인"])}`,1],["지역인재 근거",o.region]);
rows.push(["요건",o.req],["확정/예상",o.conf]);
el.innerHTML=`<button class="close" onclick="sel=null;showDetail()">닫기</button><h2>${e.d.slice(5).replace("-","/")} ${mark(d,e.org)}${esc(e.label)}</h2><dl>${rows.map(r=>`<dt>${r[0]}</dt><dd>${r[2]?r[1]:esc(r[1])}</dd>`).join("")}</dl>`+(o.src&&o.src.startsWith("http")?`<a class="open" href="${esc(o.src)}" target="_blank" rel="noopener">공고 원문 열기 ↗</a>`:"");
el.scrollIntoView({behavior:"smooth",block:"nearest"});}
document.querySelector(".tabs").onclick=e=>{const t=e.target.dataset.t;if(t){tab=t;sel=null;render()}};
$("cal").onclick=e=>{const x=e.target.closest("[data-i]");if(x){sel=+x.dataset.i;showDetail()}};
$("prev").onclick=()=>{mi--;render()};$("next").onclick=()=>{mi++;render()};$("vbtn").onclick=()=>{list=!list;render()};$("onlyjr").onchange=render;
if(innerWidth<380)list=true;render();
