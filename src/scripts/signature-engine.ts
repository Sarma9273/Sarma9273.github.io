const initSignatureEngine = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.querySelector('[data-atmosphere]');
  if (!(canvas instanceof HTMLCanvasElement) || reduce || window.matchMedia('(max-width:760px)').matches) return;
  const ctx = canvas.getContext('2d', { alpha:true });
  if (!ctx) return;
  let raf=0, dpr=Math.min(window.devicePixelRatio||1,2), w=0,h=0;
  const nodes=Array.from({length:55},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.00012,vy:(Math.random()-.5)*.00012,r:Math.random()*1.3+.25,p:Math.random()*Math.PI*2}));
  const resize=()=>{w=window.innerWidth;h=window.innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);};
  const draw=(t)=>{
    ctx.clearRect(0,0,w,h);
    const accent=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#ff8d5d';
    for(let i=0;i<nodes.length;i++){
      const n=nodes[i]; n.x+=n.vx;n.y+=n.vy;n.p+=.006;
      if(n.x<0||n.x>1)n.vx*=-1;if(n.y<0||n.y>1)n.vy*=-1;
      const x=n.x*w,y=n.y*h;
      ctx.beginPath();ctx.arc(x,y,n.r*(1+Math.sin(n.p)*.25),0,Math.PI*2);ctx.fillStyle=accent;ctx.globalAlpha=.12;ctx.fill();
      for(let j=i+1;j<nodes.length;j++){
        const m=nodes[j],dx=(m.x-n.x)*w,dy=(m.y-n.y)*h,dist=Math.hypot(dx,dy);
        if(dist<135){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(m.x*w,m.y*h);ctx.strokeStyle=accent;ctx.globalAlpha=(1-dist/135)*.035;ctx.lineWidth=.6;ctx.stroke();}
      }
    }
    ctx.globalAlpha=1;raf=requestAnimationFrame(draw);
  };
  resize();window.addEventListener('resize',resize,{passive:true});raf=requestAnimationFrame(draw);
};
const initSound=()=>{
  const button=document.querySelector('[data-sound-toggle]'); if(!(button instanceof HTMLButtonElement)) return;
  let audio=null,enabled=false;
  const beep=(frequency=520,duration=.045)=>{
    if(!enabled)return;
    audio ||= new AudioContext();
    const o=audio.createOscillator(),g=audio.createGain();
    o.type='sine';o.frequency.value=frequency;g.gain.setValueAtTime(.0001,audio.currentTime);g.gain.exponentialRampToValueAtTime(.018,audio.currentTime+.008);g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+duration);
    o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+duration);
  };
  button.addEventListener('click',async()=>{enabled=!enabled;button.setAttribute('aria-pressed',String(enabled));button.classList.toggle('is-on',enabled);if(enabled&&audio?.state==='suspended')await audio.resume();beep(620,.06);});
  document.querySelectorAll('a,button').forEach(el=>el.addEventListener('mouseenter',()=>beep(420,.025),{passive:true}));
};
document.addEventListener('astro:page-load',()=>{initSignatureEngine();initSound();});
if(document.readyState!=='loading'){initSignatureEngine();initSound();}else document.addEventListener('DOMContentLoaded',()=>{initSignatureEngine();initSound();});
