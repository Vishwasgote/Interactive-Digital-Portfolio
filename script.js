// small interactions: smooth scroll, modal project viewer, contact form mailto, copy email

document.getElementById('year').textContent = new Date().getFullYear();

// smooth internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// Project data (customize these entries)
const projects = {
  p1: {
    title: 'Project One',
    img: 'assets/project1.jpg',
    desc: 'Short description of Project One. Tech: HTML, CSS, JS.',
    link: '#'
  },
  p2: {
    title: 'Project Two',
    img: 'assets/project2.jpg',
    desc: 'Short description of Project Two. Tech: HTML, CSS, JS.',
    link: '#'
  },
  p3: {
    title: 'Project Three',
    img: 'assets/project3.jpg',
    desc: 'Short description of Project Three. Tech: HTML, CSS, JS.',
    link: '#'
  }
};

// open modal when clicking a project 'View' button
document.querySelectorAll('.project-card .view-btn').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const card = e.target.closest('.project-card');
    const idx = Array.from(document.querySelectorAll('.project-card')).indexOf(card);
    // map index -> project id (p1,p2,p3)
    const pid = Object.keys(projects)[idx];
    openProjectModal(projects[pid]);
  });
});

function openProjectModal(p){
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <h3 style="margin-top:6px">${p.title}</h3>
    <img src="${p.img}" alt="${p.title}" style="width:100%; max-height:420px; object-fit:cover; border-radius:8px; margin:12px 0">
    <p style="color:var(--muted)">${p.desc}</p>
    <div style="margin-top:12px; display:flex; gap:10px">
      <a class="btn" href="${p.link}" target="_blank" rel="noopener">Open Project</a>
      <button id="closeFromInside" class="btn-outline">Close</button>
    </div>
  `;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');

  document.getElementById('closeFromInside').addEventListener('click', closeModal);
}

function closeModal(){
  const modal = document.getElementById('modal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
}
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', (e)=>{
  if(e.target.id === 'modal') closeModal();
});
window.addEventListener('keydown', (e)=> { if(e.key==='Escape') closeModal(); });

// Contact form: open mail client via mailto (simple)
const contactForm = document.getElementById('contactForm');
const formInfo = document.getElementById('formInfo');
contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  if(!name || !email || !msg){ formInfo.textContent = 'Please fill all fields.'; return; }
  const to = 'youremail@example.com'; // replace
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(msg + '\n\nContact: ' + email);
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});

// copy email button
document.getElementById('copyEmail').addEventListener('click', async ()=>{
  try{
    await navigator.clipboard.writeText('youremail@example.com'); // replace
    formInfo.textContent = 'Email copied to clipboard';
    setTimeout(()=> formInfo.textContent = '', 2000);
  }catch(e){
    formInfo.textContent = 'Copy failed — copy manually.';
  }
});
