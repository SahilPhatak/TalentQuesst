const nav=document.getElementById('main-nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>10),{passive:true});
nav.classList.toggle('scrolled',scrollY>10);

const hb=document.getElementById('hamburger');
const nl=document.getElementById('nav-links');
hb.addEventListener('click',()=>nl.classList.toggle('open'));
nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nl.classList.remove('open')));


const ro=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

document.getElementById('contact-form').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('contact-form').style.display='none';
  document.getElementById('form-done').style.display='block';
});

(function(){
  var pages = ['home','services','about'];
  // Active nav highlight helper
  function setActiveNav(pageId){
    document.querySelectorAll('.nav-page-link').forEach(function(a){
      a.classList.toggle('active-page', a.dataset.page===pageId);
    });
  }
  function showPage(id){
    pages.forEach(function(p){
      var el = document.getElementById('page-'+p);
      if(el) el.classList.toggle('active', p===id);
    });
    document.querySelectorAll('.nav-page-link').forEach(function(a){
      a.classList.toggle('active-page', a.dataset.page===id);
    });
    window.scrollTo(0,0);
    setActiveNav(id);
    // re-trigger reveal for newly visible page
    setTimeout(function(){
      document.querySelectorAll('#page-'+id+' .reveal').forEach(function(el){
        el.classList.add('visible');
      });
    },50);
  }
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.nav-page-link').forEach(function(a){
      a.addEventListener('click', function(e){
        e.preventDefault();
        if(this.dataset.page){
          showPage(this.dataset.page);
        }
        // close mobile menu
        var menu = document.getElementById('nav-links');
        if(menu) menu.classList.remove('open');
      });
    });
    // Services nav → scroll to #services (What We Do) on home page
    var svcLink = document.getElementById('nav-services-link');
    if(svcLink){
      svcLink.addEventListener('click', function(e){
        e.preventDefault();
        showPage('home');
        setActiveNav('services');
        setTimeout(function(){
          var el = document.getElementById('services');
          if(el) el.scrollIntoView({behavior:'smooth'});
        }, 50);
        var menu = document.getElementById('nav-links');
        if(menu) menu.classList.remove('open');
      });
    }
    // Logo → home page
    var logoLink = document.getElementById('nav-logo-link');
    if(logoLink){
      logoLink.addEventListener('click', function(e){
        e.preventDefault();
        showPage('home');
        window.scrollTo({top:0,behavior:'smooth'});
      });
    }
    // Footer section links: data-goto-section="page:sectionId"
    document.querySelectorAll('[data-goto-section]').forEach(function(a){
      a.addEventListener('click', function(e){
        e.preventDefault();
        var parts = this.dataset.gotoSection.split(':');
        var page = parts[0], sectionId = parts[1];
        showPage(page);
        setTimeout(function(){
          var el = document.getElementById(sectionId);
          if(el) el.scrollIntoView({behavior:'smooth'});
        }, 60);
        var menu = document.getElementById('nav-links');
        if(menu) menu.classList.remove('open');
      });
    });
    // CTA contact buttons
    document.querySelectorAll('[data-goto-contact]').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        showPage('about');
      });
    });
    // CTA band "Get in Touch" button
    var ctaBandBtn = document.getElementById('ctaband-btn');
    if(ctaBandBtn){
      ctaBandBtn.addEventListener('click', function(e){
        e.preventDefault();
        showPage('about');
        setTimeout(function(){
          var el = document.getElementById('contact');
          if(el) el.scrollIntoView({behavior:'smooth'});
        }, 60);
      });
    }
    // "Get in Touch" nav button → about page, scroll to contact
    var gitBtn = document.getElementById('nav-get-in-touch');
    if(gitBtn){
      gitBtn.addEventListener('click', function(e){
        e.preventDefault();
        showPage('about');
        setTimeout(function(){
          var el = document.getElementById('contact');
          if(el) el.scrollIntoView({behavior:'smooth'});
        }, 60);
        var menu = document.getElementById('nav-links');
        if(menu) menu.classList.remove('open');
      });
    }
    // Hero "Start a Search" button → about page, scroll to contact
    var heroSearch = document.getElementById('hero-start-search');
    if(heroSearch){
      heroSearch.addEventListener('click', function(e){
        e.preventDefault();
        showPage('about');
        setTimeout(function(){
          var el = document.getElementById('contact');
          if(el) el.scrollIntoView({behavior:'smooth'});
        }, 60);
      });
    }
    showPage('home');
    // Hero "How We Work" button → scroll to #process section
    var heroHowWork = document.getElementById('hero-how-work');
    if(heroHowWork){
      heroHowWork.addEventListener('click', function(e){
        e.preventDefault();
        var el = document.getElementById('process');
        if(el) el.scrollIntoView({behavior:'smooth'});
      });
    }
  });
})();

// Legal modal helpers — modals are injected above the scripts
function openLegal(id){
  var el=document.getElementById('modal-'+id);
  if(el){el.classList.add('open');document.body.style.overflow='hidden';}
}
function closeLegal(id){
  var el=document.getElementById('modal-'+id);
  if(el){el.classList.remove('open');document.body.style.overflow='';}
}
// Close on overlay click
document.addEventListener('click',function(e){
  if(e.target.classList.contains('legal-modal-overlay')){
    e.target.classList.remove('open');document.body.style.overflow='';
  }
});
// Close on Escape
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    document.querySelectorAll('.legal-modal-overlay.open').forEach(function(m){
      m.classList.remove('open');document.body.style.overflow='';
    });
  }
});





// Seamless ticker — CSS animation with exact pixel distance, measured after full page load
// Ticker animation handled via pure CSS (translateX -50%)