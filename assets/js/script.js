// ===== CARRUSEL DE GALERÍA =====
const slides = document.querySelectorAll('.gallery-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;
let slideInterval;

// Función para mostrar un slide específico
function showSlide(n) {
    // Ocultar todos los slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Quitar clase active de todos los dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Asegurar que el índice esté dentro de los límites
    if (n >= slides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = n;
    }
    
    // Mostrar slide actual y activar dot correspondiente
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

// Función para iniciar auto-carrusel
function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000); // Cambia cada 5 segundos
}

// Inicializar carrusel
if (slides.length > 0) {
    // Event listeners para botones de navegación
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            showSlide(currentSlide - 1);
            startAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            showSlide(currentSlide + 1);
            startAutoSlide();
        });
    }
    
    // Event listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            clearInterval(slideInterval);
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // Pausar auto-carrusel al interactuar con controles
    const galleryControls = document.querySelector('.gallery-controls');
    if (galleryControls) {
        galleryControls.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        galleryControls.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
    }
    
    // Iniciar carrusel
    showSlide(0);
    startAutoSlide();
    console.log('Carrusel de galería inicializado');
}


// Script para menú móvil y efectos
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Script principal cargado');
    
    // Menú móvil
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Cerrar menú al hacer clic en enlace (móvil)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && mainNav && menuToggle) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Efecto header al scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.backgroundColor = 'var(--white)';
            }
        });
    }
    
    console.log('✨ Todas las funciones inicializadas');
});