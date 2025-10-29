// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll spy
const navLinks = document.querySelectorAll('.nav-link');
const sections = ['home','team','join','contact'].map(id => document.getElementById(id));
function onScroll(){
  const y = window.scrollY + 120;
  let current = sections[0].id;
  for(const sec of sections){ if(sec.offsetTop <= y) current = sec.id; }
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

// Navigation click
navLinks.forEach(a => {
  a.addEventListener('click', () => {
    navLinks.forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  });
});

// Join form
function handleJoin(e){
  e.preventDefault();
  const data = new FormData(e.target);
  alert(`Application received!\nName: ${data.get('name')}\nRole: ${data.get('role')}\nThanks — TEAM LGMSC`);
  e.target.reset();
}

// Contact form
function handleContact(e){
  e.preventDefault();
  const data = new FormData(e.target);
  alert(`Message sent!\nThanks, ${data.get('name')}!\nWe'll contact you soon.`);
  e.target.reset();
}
