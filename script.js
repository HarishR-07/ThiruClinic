/* ===== EDIT HERE ===== */
const CONFIG={
  name:"Thiru Physiotherapy Clinic",
  waNumber:"918608541110", /* country code 91 + 10 digits. Verify with the owner */
  mapUrl:"https://www.google.com/maps/search/?api=1&query=Thiru+Physiotherapy+Clinic+Ganapathy+Coimbatore",
  greeting:"Hello, I would like to book a visit."
};
/* ===================== */
const wa=(t)=>`https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(t)}`;
document.querySelectorAll('[data-name]').forEach(e=>e.textContent=CONFIG.name);
document.querySelectorAll('[data-wa]').forEach(a=>{a.href=wa(CONFIG.greeting);a.target='_blank';a.rel='noopener'});
document.getElementById('map').href=CONFIG.mapUrl;
const f=document.getElementById('f');
f.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f),err=f.querySelector('.err');
 const n=(d.get('n')||'').trim(),p=(d.get('p')||'').trim(),m=(d.get('m')||'').trim();
 if(!n||!p||!m){err.textContent='Please fill in your name, phone number and the problem.';return}
 err.textContent='';
 window.open(wa(`Hello, I would like to book a visit.\nName: ${n}\nPhone: ${p}\nProblem: ${m}\nPreferred time: ${(d.get('t')||'').trim()||'Any'}`),'_blank','noopener')});

const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* cursor */
if(matchMedia('(hover:hover) and (pointer:fine)').matches){const c=document.querySelector('.cur');let x=0,y=0,cx=0,cy=0;
 addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY});
 (function l(){cx+=(x-cx)*.2;cy+=(y-cy)*.2;c.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(l)})();
 document.querySelectorAll('a,button').forEach(a=>{a.onmouseenter=()=>c.classList.add('big');a.onmouseleave=()=>c.classList.remove('big')})}
/* scroll animation */
let prog=0;
if(window.gsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);
 ScrollTrigger.create({trigger:'#stage',start:'top top',end:'bottom bottom',onUpdate:s=>prog=s.progress});
 if(!rm){
  gsap.utils.toArray('.rv,.rev blockquote,dl,form').forEach(el=>gsap.from(el,{y:36,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}}));
  document.querySelectorAll('.steps li').forEach(li=>{
   gsap.from(li.querySelector('.ln'),{scaleX:0,ease:'none',scrollTrigger:{trigger:li,start:'top 85%',end:'top 45%',scrub:true}});
   gsap.from(li.querySelectorAll('b,h3,p'),{y:30,opacity:0,stagger:.1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:li,start:'top 80%'}})});
  gsap.from('.hero > *',{y:40,opacity:0,stagger:.12,duration:1.3,ease:'power3.out',delay:.2});
 }}
/* 3D spine */
(function(){
 const cv=document.getElementById('c');let R;
 try{if(!window.THREE)throw 0;R=new THREE.WebGLRenderer({canvas:cv,antialias:false,alpha:true})}catch(e){document.body.classList.add('nogl');return}
 const mob=innerWidth<768,V=26,N=mob?3200:9000;
 R.setPixelRatio(Math.min(devicePixelRatio,2));
 const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(38,1,.1,50),grp=new THREE.Group();scene.add(grp);
 const A=new Float32Array(N*3),B=new Float32Array(N*3),S=new Float32Array(N);
 const sp=(t,fl)=>fl?[Math.sin(t*6.28)*.35,(.5-t)*6.2,Math.sin(t*6.28+1.2)*.5]:[Math.sin(t*3)*.15,(.5-t)*4.6,-t*t*1.5+.5];
 for(let i=0;i<N;i++){
  const v=Math.floor(Math.random()*V),t=v/(V-1),s=.28+.3*t,a=Math.random()*6.283;let lx,ly,lz;
  if(Math.random()<.72){const r=s*Math.sqrt(Math.random());lx=Math.cos(a)*r*1.3;lz=Math.sin(a)*r;ly=(Math.random()-.5)*.13}
  else{lx=(Math.random()-.5)*.14;lz=-s-Math.random()*.55;ly=(Math.random()-.5)*.16}
  const p0=sp(t,0),p1=sp(t,1);
  A.set([p0[0]+lx,p0[1]+ly,p0[2]+lz],i*3);B.set([p1[0]+lx,p1[1]+ly,p1[2]+lz],i*3);S[i]=Math.random()}
 const g=new THREE.BufferGeometry();
 g.setAttribute('position',new THREE.BufferAttribute(A,3));g.setAttribute('pb',new THREE.BufferAttribute(B,3));g.setAttribute('sd',new THREE.BufferAttribute(S,1));
 const U={uF:{value:0},uT:{value:0},uPR:{value:R.getPixelRatio()}};
 const m=new THREE.ShaderMaterial({uniforms:U,transparent:true,depthWrite:false,
 vertexShader:`attribute vec3 pb;attribute float sd;uniform float uF,uT,uPR;varying float vF,vS;
 void main(){vec3 p=mix(position,pb,uF);p.x+=sin(uT*.7+sd*6.28+p.y*.8)*.07*uF;p.z+=cos(uT*.5+sd*6.28+p.y*.6)*.07*uF;
 p.x+=sin(uT*4.+sd*50.)*.006*(1.-uF);p.y+=cos(uT*3.+sd*40.)*.004*(1.-uF);
 vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=uPR*(1.8+sd*2.2+uF*1.2)*(9./-mv.z);gl_Position=projectionMatrix*mv;vF=uF;vS=sd}`,
 fragmentShader:`varying float vF,vS;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;
 vec3 dim=vec3(.45,.42,.39),glow=vec3(.96,.5,.32);vec3 c=mix(dim,glow,vF*(.6+.4*vS));
 gl_FragColor=vec4(c,(1.-smoothstep(.15,.5,d))*mix(.4,.95,vF))}`});
 grp.add(new THREE.Points(g,m));
 const rings=[];
 [[2.0,.5,0,.5],[2.5,1.4,1.1,-.35],[3.0,2.3,2.2,.25]].forEach(([r,rx,ry,sp],i)=>{
  const tilt=new THREE.Group(),spin=new THREE.Group();tilt.rotation.set(rx,ry,0);
  const tm=new THREE.MeshBasicMaterial({color:0xC4623F,transparent:true,opacity:0});
  spin.add(new THREE.Mesh(new THREE.TorusGeometry(r,.008,6,140),tm));
  const dm=new THREE.MeshBasicMaterial({color:0xF2A27E,transparent:true,opacity:0}),d=new THREE.Mesh(new THREE.SphereGeometry(.07,12,12),dm);d.position.set(r,0,0);spin.add(d);
  tilt.add(spin);grp.add(tilt);rings.push({spin,sp,tm,dm})});
 const core=new THREE.Mesh(new THREE.IcosahedronGeometry(.32,1),new THREE.MeshBasicMaterial({color:0xC4623F,wireframe:true,transparent:true,opacity:0}));grp.add(core);
 let mx=0,my=0,tmx=0,tmy=0,vis=true,tick=0;
 const pt=e=>{const q=e.touches?e.touches[0]:e;tmx=q.clientX/innerWidth-.5;tmy=q.clientY/innerHeight-.5};
 addEventListener('mousemove',pt);addEventListener('touchmove',pt,{passive:true});
 function size(){const w=innerWidth,h=innerHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();
  const d=w>=800;grp.position.x=d?2.3:0;grp.position.y=d?0:1.2;grp.scale.setScalar(d?1:.75)}
 size();addEventListener('resize',size);
 const io=new IntersectionObserver(e=>{vis=e[0].isIntersecting});io.observe(document.getElementById('stage'));
 const clk=new THREE.Clock();let fl=0;
 function frame(){requestAnimationFrame(frame);if(!vis||document.hidden)return;
  const dt=Math.min(clk.getDelta(),.05);U.uT.value+=dt;
  const tgt=Math.min(1,Math.max(0,(prog-.04)/.6));fl+=(tgt-fl)*Math.min(1,dt*2.5);U.uF.value=fl;
  mx+=(tmx-mx)*.05;my+=(tmy-my)*.05;
  if(!rm)tick+=dt*.12;
  grp.rotation.y=tick+mx*.9+prog*2.4;grp.rotation.x=my*.25;
  cam.position.set(0,-prog*.8,9.5-prog*3);cam.lookAt(grp.position.x*.2,-prog*.6,0);
  const op=.25+fl*.6;rings.forEach(o=>{o.spin.rotation.z+=dt*o.sp*(.4+fl*1.2);o.tm.opacity=op*.7;o.dm.opacity=op});
  core.rotation.x+=dt*.3;core.rotation.y+=dt*.5;core.material.opacity=.15+fl*.7;core.scale.setScalar(1+Math.sin(U.uT.value*1.2)*.08*fl);
  R.render(scene,cam)}
 clk.start();frame();
})();
