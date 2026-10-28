(function () {
  const path = location.pathname.replace(/\/$/, '') || '/index.html';
  const isHome=path.endsWith('index.html')||path==='', isCV=path.endsWith('cv.html');
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  nav.innerHTML = `
    <a class="nav-logo" href="/index.html">llamas</a>
    <div class="nav-links">
      <a href="/index.html" ${isHome?'class="active"':''}>Home</a>
      <a href="/cv.html" ${isCV?'class="active"':''}>CV</a>
      <a class="nav-icon" href="https://github.com/pepc84" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
        GitHub
      </a>
      <a class="nav-icon" href="https://linkedin.com/in/llamas" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
        LinkedIn
      </a>
      <button class="nav-contact-btn" id="nav-contact-btn">Contact</button>
    </div>
  `;
  const modal = document.createElement('div');
  modal.id = 'contact-modal';
  modal.innerHTML = `
    <div class="contact-overlay" id="contact-overlay"></div>
    <div class="contact-box">
      <button class="contact-close" id="contact-close">&#x2715;</button>
      <h2>Get in touch</h2>
      <p class="contact-sub">I'll get back to you at jose@llamasj.com</p>
      <form id="contact-form">
        <input name="name" type="text" placeholder="Your name" required />
        <input name="email" type="email" placeholder="Your email (optional)" />
        <textarea name="message" rows="5" placeholder="Message" required></textarea>
        <button type="submit" class="btn-yellow" id="contact-submit">Send</button>
        <p class="contact-status" id="contact-status"></p>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  const s = document.createElement('style');
  s.textContent = `
    #contact-modal{display:none;position:fixed;inset:0;z-index:1000;align-items:center;justify-content:center;}
    #contact-modal.open{display:flex;}
    .contact-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.35);backdrop-filter:blur(2px);}
    .contact-box{position:relative;background:#fff;border-radius:14px;padding:2rem 2.5rem;width:min(480px,90vw);box-shadow:0 8px 40px rgba(0,0,0,0.15);z-index:1;}
    .contact-box h2{margin:0 0 0.25rem;font-size:1.4rem;}
    .contact-sub{margin:0 0 1.25rem;color:#777;font-size:0.88rem;}
    .contact-close{position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:1.1rem;cursor:pointer;color:#999;}
    .contact-close:hover{color:#333;}
    .contact-box input,.contact-box textarea{display:block;width:100%;box-sizing:border-box;margin-bottom:0.75rem;padding:0.6rem 0.85rem;border:1px solid #e0e0e0;border-radius:8px;font-family:inherit;font-size:0.9rem;resize:vertical;}
    .contact-box input:focus,.contact-box textarea:focus{outline:none;border-color:#7ed68a;}
    .contact-box .btn-yellow{width:100%;text-align:center;cursor:pointer;border:none;font-family:inherit;font-size:0.9rem;}
    .contact-status{margin-top:0.75rem;font-size:0.85rem;text-align:center;min-height:1.2em;}
    .nav-contact-btn{background:#7ed68a;color:#111;border:none;border-radius:7px;padding:0.35rem 0.85rem;font-family:inherit;font-size:0.85rem;font-weight:600;cursor:pointer;}
    .nav-contact-btn:hover{background:#62c06f;} @media(max-width:600px){.nav-logo{display:none;}}
  `;
  document.head.appendChild(s);
  document.getElementById('nav-contact-btn').addEventListener('click',()=>modal.classList.add('open'));
  document.getElementById('contact-close').addEventListener('click',()=>modal.classList.remove('open'));
  document.getElementById('contact-overlay').addEventListener('click',()=>modal.classList.remove('open'));
  document.getElementById('contact-form').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const btn=document.getElementById('contact-submit'),status=document.getElementById('contact-status'),data=new FormData(e.target);
    btn.disabled=true;btn.textContent='Sending...';
    try {
      const res=await fetch('https://formspree.io/f/xeaodpab',{method:'POST',body:data,headers:{Accept:'application/json'}});
      if(res.ok){status.textContent="Sent! I'll get back to you soon.";status.style.color='#2a7a2a';e.target.reset();}
      else throw new Error();
    } catch{status.textContent='Something went wrong. Email me at jose@llamasj.com';status.style.color='#c00';}
    btn.disabled=false;btn.textContent='Send';
  });
})();
