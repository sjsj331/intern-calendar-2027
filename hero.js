const DL=[{n:"남부발전 체험형",t:"2026-11-11T11:00:00+09:00"},{n:"IBK기업은행 체험형",t:"2026-11-16T10:00:00+09:00"},{n:"JPT 접수",t:"2026-11-17T12:00:00+09:00"},{n:"JPT 시험",t:"2026-11-22T09:00:00+09:00"},{n:"JLPT",t:"2026-12-06T13:00:00+09:00"}];
const dd=document.getElementById("dday");
function next(){const now=Date.now();return DL.find(d=>Date.parse(d.t)>now)}
function tick(){const d=next();if(!d){dd.textContent="화이팅! 🎉";return}const ms=Date.parse(d.t)-Date.now(),D=Math.floor(ms/864e5),H=Math.floor(ms%864e5/36e5),M=Math.floor(ms%36e5/6e4);dd.textContent=`${d.n} 마감까지 D-${D} ${H}시간 ${M}분`;}
tick();setInterval(tick,30000);
const cv=document.getElementById("c3d");
function fallback(){cv.style.display="none";document.getElementById("hero").style.height="110px";document.querySelector("#hero .hint").textContent="(3D를 지원하지 않는 기기라 카운트다운만 표시)";}
try{if(!cv.getContext("webgl2")&&!cv.getContext("webgl"))throw 0}catch(e){fallback()}
if(cv.style.display!=="none"){
import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js").then(T=>{
 const r=new T.WebGLRenderer({canvas:cv,antialias:true});r.setPixelRatio(Math.min(devicePixelRatio,1.5));
 const sc=new T.Scene(),cam=new T.PerspectiveCamera(45,1,.1,100);cam.position.set(0,0,6);
 const months=["11월","12월","1월","2월","3월","4월"];
 const mats=months.map((m,i)=>{const c=document.createElement("canvas");c.width=c.height=256;const g=c.getContext("2d");
  g.fillStyle=["#E5484D","#F76B15","#3E63DD","#8E4EC6","#12A594","#E2A336"][i];g.fillRect(0,0,256,256);g.fillStyle="#fff";g.fillRect(16,60,224,180);
  g.fillStyle="#fff";g.font="bold 44px sans-serif";g.textAlign="center";g.fillText((i<2?"2026 ":"2027 ")+m,128,46);
  g.fillStyle="#222";g.font="bold 30px sans-serif";g.fillText(i==0?"남부발전 11/11":i==1?"IBK 최종·JLPT":"인턴 시작?",128,120);g.font="64px sans-serif";g.fillText(["📮","✈️","💼","📚","🌸","🏢"][i],128,205);
  const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return new T.MeshBasicMaterial({map:t})});
 const cube=new T.Mesh(new T.BoxGeometry(2.2,2.2,2.2),mats);sc.add(cube);
 const stars=new T.Points(new T.BufferGeometry().setAttribute("position",new T.Float32BufferAttribute(Array.from({length:600},()=>(Math.random()-.5)*30),3)),new T.PointsMaterial({color:0xffffff,size:.06}));sc.add(stars);
 function size(){const w=cv.clientWidth,h=cv.clientHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}size();addEventListener("resize",size);
 let vx=.006,vy=.01,drag=null;
 cv.addEventListener("pointerdown",e=>{drag=[e.clientX,e.clientY];cv.setPointerCapture(e.pointerId)});
 cv.addEventListener("pointermove",e=>{if(!drag)return;vy=(e.clientX-drag[0])*.005;vx=(e.clientY-drag[1])*.005;drag=[e.clientX,e.clientY]});
 cv.addEventListener("pointerup",()=>drag=null);cv.addEventListener("pointercancel",()=>drag=null);
 let vis=true,raf=0;new IntersectionObserver(([en])=>{vis=en.isIntersecting;if(vis&&!raf)loop()}).observe(cv);
 document.addEventListener("visibilitychange",()=>{if(!document.hidden&&vis&&!raf)loop()});
 function loop(){if(!vis||document.hidden){raf=0;return}cube.rotation.x+=vx;cube.rotation.y+=vy;if(!drag){vx+=(.006-vx)*.02;vy+=(.01-vy)*.02}stars.rotation.y+=.0005;cube.position.y=Math.sin(performance.now()/900)*.15;r.render(sc,cam);raf=requestAnimationFrame(loop)}loop();
}).catch(fallback);}
