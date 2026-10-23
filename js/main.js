/* PWA manifest */
const manifest = {
  name:'TalentQuesst',short_name:'TalentQuesst',
  start_url:'/',display:'standalone',
  theme_color:'#F26B1C',background_color:'#FFFFFF',
  icons:[{src:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" rx="32" fill="%23F26B1C"/><text x="96" y="130" text-anchor="middle" font-family="system-ui" font-size="100" font-weight="bold" fill="white">TQ</text></svg>',sizes:'192x192',type:'image/svg+xml'}]
};
const blob=new Blob([JSON.stringify(manifest)],{type:'application/json'});
document.getElementById('manifest-link').href=URL.createObjectURL(blob);

/* Nav scroll */
const nav=document.getElementById('main-nav');
const handleScroll=()=>nav.classList.toggle('scrolled',scrollY>10);
window.addEventListener('scroll',handleScroll,{passive:true});
handleScroll();

/* Hamburger */
const hb=document.getElementById('hamburger');
const nl=document.getElementById('nav-links');
hb.addEventListener('click',()=>nl.classList.toggle('open'));
nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nl.classList.remove('open')));

/* Theme */
let theme=null;
try{theme=localStorage.getItem('tq-theme')}catch(e){}
if(theme)document.documentElement.setAttribute('data-theme',theme);


/* Ticker — client logos as styled text */
const clients=[
  {name:'KUKU FM',color:'#E8173D'},
  {name:'meesho',color:'#9F1895'},
  {name:'DigitalOcean',color:'#0080FF'},
  {name:'AiPrise',color:'#2563EB'},
  {name:'mediamelon',color:'#E85C19'},
  {name:'thumpN',color:'#0D0D0D'},
  {name:'e3Group',color:'#003087'},
  {name:'Zeroto1',color:'#D4A017'},
  {name:'BusinessOnBot',color:'#00A884'},
  {name:'Converse Now',color:'#6B21A8'},
  {name:'orvera ai',color:'#1A56DB'},
];
const doubled=[...clients,...clients];
const t=document.getElementById('ticker');
t.innerHTML=doubled.map((c,i)=>`<span class="ticker-item" style="color:${c.color}">${c.name}</span><span class="tick-sep"></span>`).join('');

/* Reveal */
const reveals=document.querySelectorAll('.reveal');
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible')}});
},{threshold:.15});
reveals.forEach(el=>ro.observe(el));

/* Contact form */
document.getElementById('contact-form').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('contact-form').style.display='none';
  document.getElementById('form-done').style.display='block';
});
