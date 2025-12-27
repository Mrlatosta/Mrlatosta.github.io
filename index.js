// ====================================
// Configuración de ScrollReveal
// ====================================
if (typeof ScrollReveal !== 'undefined') {
  window.sr = ScrollReveal();

  // Configuración general
  sr.reveal('.animate-on-scroll', {
    duration: 1000,
    distance: '50px',
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    origin: 'bottom',
    interval: 200,
    reset: false,
    mobile: true,
    scale: 0.9
  });

  // Animaciones específicas
  sr.reveal('#ray', {
    duration: 1200,
    scale: 0.85,
    distance: '0px'
  });

  sr.reveal('.subtitle', {
    duration: 1000,
    delay: 300,
    origin: 'top'
  });

  sr.reveal('.project-card', {
    duration: 800,
    interval: 150,
    distance: '30px',
    origin: 'bottom',
    scale: 0.95
  });

  sr.reveal('.skill-section .row', {
    duration: 800,
    interval: 100,
    origin: 'left'
  });
}

// ====================================
// Navbar scroll effect
// ====================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Agregar sombra al hacer scroll
    if (currentScroll > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      navbar.style.backdropFilter = 'blur(15px)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      navbar.style.backdropFilter = 'blur(10px)';
    }
    
    lastScroll = currentScroll;
  });
}

// ====================================
// Progress bars animation
// ====================================
const animateProgressBars = () => {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const targetWidth = progressBar.style.width;
        
        // Reset y animar
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.width = targetWidth;
        }, 100);
        
        observer.unobserve(progressBar);
      }
    });
  }, { threshold: 0.5 });
  
  progressBars.forEach(bar => observer.observe(bar));
};

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateProgressBars);
} else {
  animateProgressBars();
}

// ====================================
// Smooth scroll para enlaces internos
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#navbarNavAltMarkup') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ====================================
// Form validation enhancement
// ====================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (this.checkValidity()) {
      const formData = new FormData(this);
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      // Mostrar loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
      
      // Aquí puedes agregar la lógica de envío real
      // Por ahora solo simularemos el envío
      setTimeout(() => {
        const messageDiv = document.getElementById('form-message');
        messageDiv.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i>
            ¡Mensaje enviado con éxito! Te responderé pronto.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
        
        this.reset();
        this.classList.remove('was-validated');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 2000);
    }
    
    this.classList.add('was-validated');
  });
}

// ====================================
// Animación de entrada para la página
// ====================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    document.body.style.opacity = '1';
  }, 100);
});

// ====================================
// Lazy loading de imágenes
// ====================================
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.src;
  });
} else {
  // Fallback para navegadores que no soportan lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ====================================
// Project cards hover effect enhancement
// ====================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ====================================
// Console message
// ====================================
console.log('%c¡Hola! 👋', 'color: #846565; font-size: 24px; font-weight: bold;');
console.log('%c¿Te interesa el código? Visita mi GitHub: https://github.com/Mrlatosta/', 'color: #846565; font-size: 14px;');

// ====================================
// Performance monitoring (opcional)
// ====================================
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Tiempo de carga:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
    }, 0);
  });
}
