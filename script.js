// theme + back-to-top + project code toggles

// THEME HANDLING
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.body.classList.toggle('light-theme', theme === 'light');
  document.body.classList.toggle('dark-theme', theme !== 'light');
  localStorage.setItem('site-theme', theme);
}

const savedTheme = localStorage.getItem('site-theme');
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
}

// BACK TO TOP
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (!backBtn) return;
  if (window.scrollY > 300) backBtn.style.display = 'flex';
  else backBtn.style.display = 'none';
});
if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// PROJECT CODE VIEW HELPERS

function toggleProject(projectId) {
  const block = document.getElementById(projectId);
  if (!block) return;
  const isVisible = block.style.display === 'block';
  document.querySelectorAll('.project-code').forEach(b => b.style.display = 'none');
  block.style.display = isVisible ? 'none' : 'block';
}

function showFile(projectId, fileId, event) {
  const proj = document.getElementById(projectId);
  if (!proj) return;

  proj.querySelectorAll('pre').forEach(p => p.style.display = 'none');
  proj.querySelectorAll('.file-tab').forEach(t => t.classList.remove('active'));

  const fileElem = proj.querySelector('#' + fileId);
  if (fileElem) fileElem.style.display = 'block';
  if (event?.target) event.target.classList.add('active');

  if (window.Prism) Prism.highlightAll();
}


// expose these globally so inline onclicks can call them
window.toggleProject = toggleProject;
window.showFile = showFile;


// CONTACT FORM FEEDBACK
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // отменяем стандартное поведение

    const formData = new FormData(contactForm);
    const action = contactForm.getAttribute('action');

    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        formFeedback.textContent = "✅ Message sent successfully!";
        formFeedback.className = "form-feedback success";
        contactForm.reset();
      } else {
        formFeedback.textContent = "❌ Something went wrong. Try again.";
        formFeedback.className = "form-feedback error";
      }
    }).catch(() => {
      formFeedback.textContent = "❌ Something went wrong. Try again.";
      formFeedback.className = "form-feedback error";
    });
  });
}
