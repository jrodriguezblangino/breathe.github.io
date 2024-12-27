// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');

// Toggle del menú hamburguesa
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Cambiar estilo de la nav al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// Scroll suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Modificamos las opciones del observer para las cards
const cardObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

// Observer específico para las cards en móvil
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, cardObserverOptions);

// Aplicamos el observer solo si estamos en móvil
function initMobileAnimations() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.benefit-card').forEach((card) => {
            cardObserver.observe(card);
        });
    }
}

// Inicializamos las animaciones
initMobileAnimations();

// Reinicar las animaciones si cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    initMobileAnimations();
});

// Observador para las animaciones de planes y promociones
const plansObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const plansObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animar el contenedor
            entry.target.classList.add('visible');
            
            // Animar cada elemento de la lista
            const items = entry.target.querySelectorAll('li');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, 200 * index); // Retraso progresivo para cada elemento
            });
        }
    });
}, plansObserverOptions);

// Aplicar el observer a los contenedores
document.querySelectorAll('.plans-box, .promos-box').forEach(box => {
    plansObserver.observe(box);
});