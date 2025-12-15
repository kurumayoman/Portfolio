// Small interactive bits for the portfolio demo

// Typing effect for the role/education
const typedEl = document.getElementById('typed');
const texts = ['btech cse aiml', 'problem solver', 'life-long learner'];
let idx = 0, char = 0, forward = true;

function tick(){
  const t = texts[idx];
  if(forward){
    char++;
    if(char > t.length){
      forward = false;
      setTimeout(tick, 900);
      return;
    }
  } else {
    char--;
    if(char === 0){
      forward = true;
      idx = (idx + 1) % texts.length;
    }
  }
  typedEl.textContent = t.slice(0, char);
  setTimeout(tick, forward ? 90 : 40);
}
if(typedEl) tick();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const targ = document.querySelector(href);
      if(targ) targ.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// Mobile menu toggle for new header
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', ()=>{
  mainNav?.classList.toggle('open');
  menuToggle.classList.toggle('open');
});
document.querySelectorAll('.main-nav a').forEach(a=>{
  a.addEventListener('click', ()=>{
    mainNav?.classList.remove('open');
    menuToggle?.classList.remove('open');
  });
});

// Reveal on scroll using IntersectionObserver
const revealItems = document.querySelectorAll('.card, .project');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.animationDelay = (entry.target.dataset.delay || '0s');
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.12});
revealItems.forEach((el,i)=>{el.dataset.delay = (i*0.06)+'s';observer.observe(el)});

// Simple scroll-spy that toggles .active on header links
const sections = document.querySelectorAll('section[id]');
function onScroll(){
  const scrollPos = window.scrollY + 160;
  sections.forEach(sec=>{
    const top = sec.offsetTop;
    const h = sec.offsetHeight;
    const id = sec.id;
    const link = document.querySelector('.main-nav a[href="#'+id+'"]');
    if(link){
      if(scrollPos >= top && scrollPos < top + h){
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}
window.addEventListener('scroll', onScroll);
onScroll();
