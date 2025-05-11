// Gestion du menu mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileNav.classList.contains('active')) {
        icon.classList.remove('lucide-menu');
        icon.classList.add('lucide-x');
    } else {
        icon.classList.remove('lucide-x');
        icon.classList.add('lucide-menu');
    }
});

// Fermer le menu mobile lors du clic sur un lien
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('lucide-x');
        icon.classList.add('lucide-menu');
    });
});

// Animation au défilement
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observer les sections pour l'animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Animation des cartes de statistiques
const statsCards = document.querySelectorAll('.stat-card');
statsCards.forEach(card => {
    const number = card.querySelector('.stat-number');
    const target = parseInt(number.textContent);
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const interval = duration / 50;

    const updateNumber = () => {
        if (current < target) {
            current += increment;
            number.textContent = Math.round(current) + (number.textContent.includes('+') ? '+' : '');
            setTimeout(updateNumber, interval);
        } else {
            number.textContent = target + (number.textContent.includes('+') ? '+' : '');
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateNumber();
                observer.unobserve(card);
            }
        });
    });

    observer.observe(card);
});

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 