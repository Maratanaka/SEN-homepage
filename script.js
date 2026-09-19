const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const menu=document.querySelector('.menu'),nav=document.querySelector('.nav');menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');nav.style.display=open?'flex':'';if(open){Object.assign(nav.style,{position:'absolute',top:'74px',right:'20px',flexDirection:'column',alignItems:'stretch',background:'rgba(244,242,236,.98)',padding:'18px',border:'1px solid #D8D4CA',borderRadius:'18px',boxShadow:'0 15px 40px rgba(30,28,24,.08)'})}});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');if(innerWidth<=1000)nav.style.display=''}));

const artStyle=document.createElement('style');
artStyle.textContent=`
  .hero-art{
    --mx:0px;
    --my:0px;
    --rx:0deg;
    --ry:0deg;
    --glow-x:50%;
    --glow-y:35%;
    transform:translate3d(var(--mx),var(--my),0) rotateX(var(--rx)) rotateY(var(--ry));
    transition:transform .22s ease-out;
    box-shadow:0 40px 90px rgba(33,31,26,.12), inset 0 1px 0 rgba(255,255,255,.9);
    border-radius:42px;
    overflow:hidden;
  }
  .hero-art::before{
    content:"";
    position:absolute;
    inset:10% 8% 12%;
    border-radius:48% 52% 46% 54% / 42% 58% 42% 58%;
    background:radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(255,255,255,.9), rgba(255,255,255,.18) 24%, rgba(255,255,255,0) 52%);
    filter:blur(12px);
    pointer-events:none;
    z-index:0;
  }
  .hero-art .zen{
    --shift-x:0px;
    --shift-y:0px;
    --tilt:0deg;
    --halo:0deg;
    animation:zenFloat 12s ease-in-out infinite alternate;
    transform:translate(var(--shift-x),var(--shift-y)) rotate(var(--tilt));
    box-shadow:inset 0 20px 26px rgba(255,255,255,.76), inset 0 -24px 30px rgba(25,24,21,.04), 0 26px 35px rgba(40,36,30,.08);
  }
  .hero-art .zen::before{
    content:"";
    position:absolute;
    inset:8%;
    border-radius:50%;
    background:radial-gradient(circle at 50% 35%, rgba(255,255,255,.98), rgba(255,255,255,0) 60%);
    opacity:.9;
  }
  .hero-art .stone{
    --orb-x:0px;
    --orb-y:0px;
    animation:stoneFloat 7s ease-in-out infinite;
    transform:translate(var(--orb-x),var(--orb-y));
    box-shadow:inset -18px -18px 30px rgba(0,0,0,.18), inset 16px 18px 28px rgba(255,255,255,.05), 0 18px 24px rgba(36,32,28,.12);
    border:1px solid rgba(255,255,255,.06);
  }
  .hero-art .sand{
    --sand-x:0px;
    --sand-rot:0deg;
    animation:sandWave 9s ease-in-out infinite alternate;
    transform:translateX(var(--sand-x)) rotate(var(--sand-rot));
    filter:blur(.2px);
    box-shadow:0 0 12px rgba(149,127,101,.18);
  }
  @keyframes zenFloat{
    0%{transform:translate(0,0) rotate(0deg)}
    50%{transform:translate(calc(var(--shift-x) * .52), calc(var(--shift-y) * .58)) rotate(calc(var(--tilt) * .55))}
    100%{transform:translate(var(--shift-x), var(--shift-y)) rotate(var(--tilt))}
  }
  @keyframes stoneFloat{
    0%,100%{transform:translate(var(--orb-x), calc(var(--orb-y) - 12px))}
    50%{transform:translate(calc(var(--orb-x) * .8), calc(var(--orb-y) + 14px))}
  }
  @keyframes sandWave{
    0%{transform:translateX(var(--sand-x)) rotate(var(--sand-rot))}
    50%{transform:translateX(calc(var(--sand-x) * -.8)) rotate(calc(var(--sand-rot) * -1.35))}
    100%{transform:translateX(var(--sand-x)) rotate(var(--sand-rot))}
  }
`;
document.head.appendChild(artStyle);

const heroArt=document.querySelector('.hero-art');
const zen=document.querySelector('.zen');
const stone=document.querySelector('.stone');
const sands=document.querySelectorAll('.sand');

if(heroArt&&zen&&stone){
  const applyMotion=(event)=>{
    const rect=heroArt.getBoundingClientRect();
    const x=(event.clientX-rect.left-rect.width/2)/(rect.width/2);
    const y=(event.clientY-rect.top-rect.height/2)/(rect.height/2);

    const glowX=50 + (x * 22);
    const glowY=35 + (y * 16);

    heroArt.style.setProperty('--mx',`${(x*12).toFixed(2)}px`);
    heroArt.style.setProperty('--my',`${(y*14).toFixed(2)}px`);
    heroArt.style.setProperty('--rx',`${(-y*10).toFixed(2)}deg`);
    heroArt.style.setProperty('--ry',`${(x*10).toFixed(2)}deg`);
    heroArt.style.setProperty('--glow-x',`${glowX.toFixed(2)}%`);
    heroArt.style.setProperty('--glow-y',`${glowY.toFixed(2)}%`);

    zen.style.setProperty('--shift-x',`${(x*18).toFixed(2)}px`);
    zen.style.setProperty('--shift-y',`${(y*16).toFixed(2)}px`);
    zen.style.setProperty('--tilt',`${(x*12).toFixed(2)}deg`);
    zen.style.setProperty('--halo',`${(x*18).toFixed(2)}deg`);

    stone.style.setProperty('--orb-x',`${(x*20).toFixed(2)}px`);
    stone.style.setProperty('--orb-y',`${(y*14).toFixed(2)}px`);

    sands.forEach((sand,index)=>{
      const offset=(index===0?-1:1)*(x*22);
      sand.style.setProperty('--sand-x',`${offset.toFixed(2)}px`);
      sand.style.setProperty('--sand-rot',`${(x*14).toFixed(2)}deg`);
    });
  };

  heroArt.addEventListener('pointermove',applyMotion);
  heroArt.addEventListener('pointerleave',()=>{
    heroArt.style.setProperty('--mx','0px');
    heroArt.style.setProperty('--my','0px');
    heroArt.style.setProperty('--rx','0deg');
    heroArt.style.setProperty('--ry','0deg');
    heroArt.style.setProperty('--glow-x','50%');
    heroArt.style.setProperty('--glow-y','35%');
    zen.style.setProperty('--shift-x','0px');
    zen.style.setProperty('--shift-y','0px');
    zen.style.setProperty('--tilt','0deg');
    zen.style.setProperty('--halo','0deg');
    stone.style.setProperty('--orb-x','0px');
    stone.style.setProperty('--orb-y','0px');
    sands.forEach(sand=>{
      sand.style.setProperty('--sand-x','0px');
      sand.style.setProperty('--sand-rot','0deg');
    });
  });
}
