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
  // Map page id → URL path
  var pageUrls = {home:'/', services:'/services', about:'/contact'};
  var urlPages = {'/':'home', '/services':'services', '/contact':'about'};

  // Per-page SEO meta
  var pageMeta = {
    home: {
      title: 'TalentQuesst | Non-Tech Talent Recruitment Partner in India',
      desc:  'Specialist search for business-critical Marketing, Sales, HR, Finance, Operations and Legal roles.'
    },
    services: {
      title: 'Recruitment & Talent Search Services | TalentQuesst',
      desc:  'From targeted talent search to curated shortlists, TalentQuesst delivers end-to-end recruitment support for business-critical roles across key business functions.'
    },
    about: {
      title: 'Contact TalentQuesst | Let\'s Build Better Teams',
      desc:  'Connect with TalentQuesst to discuss your hiring requirements and discover a more focused approach to finding the right talent.'
    }
  };
  function updateMeta(id){
    var m = pageMeta[id];
    if(!m) return;
    document.title = m.title;
    var tag = document.querySelector('meta[name="description"]');
    if(tag) tag.setAttribute('content', m.desc);
  }

  function showPage(id, pushState){
    pages.forEach(function(p){
      var el = document.getElementById('page-'+p);
      if(el) el.classList.toggle('active', p===id);
    });
    document.querySelectorAll('.nav-page-link').forEach(function(a){
      a.classList.toggle('active-page', a.dataset.page===id);
    });
    window.scrollTo(0,0);
    setActiveNav(id);
    // Update URL and meta
    updateMeta(id);
    if(pushState !== false && pageUrls[id]){
      history.pushState({page:id}, '', pageUrls[id]);
    }
    // re-trigger reveal for newly visible page
    setTimeout(function(){
      document.querySelectorAll('#page-'+id+' .reveal').forEach(function(el){
        el.classList.add('visible');
      });
    },50);
  }

  // Handle browser back/forward
  window.addEventListener('popstate', function(e){
    var id = (e.state && e.state.page) || urlPages[location.pathname] || 'home';
    if(id === 'services'){
      showPage('home', false);
      setActiveNav('services');
      updateMeta('services');
    } else {
      showPage(id, false);
    }
  });
  function init(){
    document.querySelectorAll('.nav-page-link').forEach(function(a){
      a.addEventListener('click', function(e){
        e.preventDefault();
        var pg = this.dataset.page;
        if(pg && pg !== 'services'){
          showPage(pg);
          var menu = document.getElementById('nav-links');
          if(menu) menu.classList.remove('open');
        }
      });
    });
    // Services nav → URL /services, scroll to #services section on home page
    var svcLink = document.getElementById('nav-services-link');
    if(svcLink){
      svcLink.addEventListener('click', function(e){
        e.preventDefault();
        showPage('home', false);
        setActiveNav('services');
        updateMeta('services');
        history.pushState({page:'services'}, '', '/services');
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
        history.pushState({page:'about'}, '', '/contact');
      });
    });
    // CTA band "Get in Touch" button
    var ctaBandBtn = document.getElementById('ctaband-btn');
    if(ctaBandBtn){
      ctaBandBtn.addEventListener('click', function(e){
        e.preventDefault();
        showPage('about', false);
        history.pushState({page:'about'}, '', '/contact');
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
        showPage('about', false);
        history.pushState({page:'about'}, '', '/contact');
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
        showPage('about', false);
        history.pushState({page:'about'}, '', '/contact');
        setTimeout(function(){
          var el = document.getElementById('contact');
          if(el) el.scrollIntoView({behavior:'smooth'});
        }, 60);
      });
    }
    // Load correct page based on current URL
    var initPage = urlPages[location.pathname] || 'home';
    showPage(initPage, false);
    // Hero "How We Work" button → scroll to #process section
    var heroHowWork = document.getElementById('hero-how-work');
    if(heroHowWork){
      heroHowWork.addEventListener('click', function(e){
        e.preventDefault();
        var el = document.getElementById('process');
        if(el) el.scrollIntoView({behavior:'smooth'});
      });
    }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
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