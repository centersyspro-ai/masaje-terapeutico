// Sistema de traducción para Masajes ReaVital
class LanguageManager {
    constructor() {
        this.currentLang = 'es';
        this.elements = [];
        this.langButtons = [];
        this.init();
    }
    
    init() {
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        console.log('LanguageManager: Inicializando sistema de traducción...');
        
        // Encontrar todos los elementos traducibles
        this.elements = document.querySelectorAll('[data-lang-es], [data-lang-en]');
        this.langButtons = document.querySelectorAll('.lang-btn');
        
        console.log(`LanguageManager: ${this.elements.length} elementos traducibles encontrados`);
        
        // Configurar botones de idioma
        this.setupLanguageButtons();
        
        // Cargar idioma guardado o detectar del navegador
        this.loadLanguage();
        
        // Configurar observador para elementos dinámicos
        this.setupMutationObserver();
    }
    
    setupLanguageButtons() {
        this.langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                this.changeLanguage(lang);
            });
        });
    }
    
    changeLanguage(lang) {
        if (this.currentLang === lang) {
            console.log(`LanguageManager: Ya está en ${lang}`);
            return;
        }
        
        console.log(`LanguageManager: Cambiando idioma a ${lang}`);
        
        // Actualizar botones activos
        this.langButtons.forEach(btn => {
            const isActive = btn.getAttribute('data-lang') === lang;
            btn.classList.toggle('active', isActive);
            
            // Añadir atributo aria-pressed para accesibilidad
            btn.setAttribute('aria-pressed', isActive);
        });
        
        // Traducir todos los elementos
        this.translateAllElements(lang);
        
        // Actualizar atributo lang del HTML
        document.documentElement.lang = lang;
        
        // Guardar preferencia
        localStorage.setItem('preferredLanguage', lang);
        
        // Actualizar estado actual
        this.currentLang = lang;
        
        // Pequeña animación de feedback
        this.showLanguageFeedback(lang);
        
        console.log(`LanguageManager: Idioma cambiado a ${lang}`);
    }
    
    translateAllElements(lang) {
        // Buscar elementos nuevamente por si hay elementos dinámicos
        const currentElements = document.querySelectorAll('[data-lang-es], [data-lang-en]');
        
        currentElements.forEach(element => {
            this.translateElement(element, lang);
        });
        
        // Traducir título de la página
        this.translatePageTitle(lang);
        
        // Traducir meta descripciones
        this.translateMetaTags(lang);
        
        // Traducir atributos alt de imágenes
        this.translateImageAlts(lang);
        
        // Traducir atributos aria-label
        this.translateAriaLabels(lang);
    }
    
    translateElement(element, lang) {
        const translation = element.getAttribute(`data-lang-${lang}`);
        if (translation) {
            // Preservar HTML si es necesario
            const hasHTML = element.innerHTML.includes('<') && element.innerHTML.includes('>');
            if (hasHTML) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
            
            // Para elementos que contienen placeholders con imágenes
            if (element.classList.contains('image-placeholder')) {
                const span = element.querySelector('span');
                if (span && span.hasAttribute(`data-lang-${lang}`)) {
                    const spanTranslation = span.getAttribute(`data-lang-${lang}`);
                    const img = span.querySelector('img');
                    if (img && img.hasAttribute(`data-lang-${lang}`)) {
                        const altTranslation = img.getAttribute(`data-lang-${lang}`);
                        img.alt = altTranslation;
                    }
                    span.textContent = spanTranslation;
                }
            }
        }
    }
    
    translatePageTitle(lang) {
        const title = document.querySelector('title');
        if (title) {
            const titleTranslation = title.getAttribute(`data-lang-${lang}`);
            if (titleTranslation) {
                title.textContent = titleTranslation;
            }
        }
    }
    
    translateMetaTags(lang) {
        // Meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            const descTranslation = metaDesc.getAttribute(`data-lang-${lang}`);
            if (descTranslation) {
                metaDesc.content = descTranslation;
            }
        }
        
        // Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            const ogTitleTranslation = ogTitle.getAttribute(`data-lang-${lang}`);
            if (ogTitleTranslation) {
                ogTitle.content = ogTitleTranslation;
            }
        }
        
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            const ogDescTranslation = ogDesc.getAttribute(`data-lang-${lang}`);
            if (ogDescTranslation) {
                ogDesc.content = ogDescTranslation;
            }
        }
    }
    
    translateImageAlts(lang) {
        const images = document.querySelectorAll('img[data-lang-es], img[data-lang-en]');
        images.forEach(img => {
            const altTranslation = img.getAttribute(`data-lang-${lang}`);
            if (altTranslation) {
                img.alt = altTranslation;
            }
        });
    }
    
    translateAriaLabels(lang) {
        const ariaElements = document.querySelectorAll('[aria-label][data-lang-es], [aria-label][data-lang-en]');
        ariaElements.forEach(element => {
            const ariaTranslation = element.getAttribute(`data-lang-${lang}`);
            if (ariaTranslation) {
                element.setAttribute('aria-label', ariaTranslation);
            }
        });
    }
    
    loadLanguage() {
        // 1. Intentar cargar idioma guardado
        const savedLang = localStorage.getItem('preferredLanguage');
        
        // 2. Detectar idioma del navegador
        const browserLang = navigator.language.startsWith('en') ? 'en' : 'es';
        
        // 3. Usar idioma guardado, o del navegador, o español por defecto
        const langToUse = savedLang || browserLang || 'es';
        
        console.log(`LanguageManager: Cargando idioma - Guardado: ${savedLang}, Navegador: ${browserLang}, Usando: ${langToUse}`);
        
        this.changeLanguage(langToUse);
    }
    
    showLanguageFeedback(lang) {
        // Efecto visual sutil con transición
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0.8';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        }, 150);
        
        // Notificación en consola
        const langName = lang === 'es' ? 'Español' : 'English';
        console.log(`🌐 Idioma cambiado a: ${langName}`);
    }
    
    setupMutationObserver() {
        // Observar cambios en el DOM para elementos dinámicos
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            const newElements = node.querySelectorAll ? 
                                node.querySelectorAll('[data-lang-es], [data-lang-en]') : 
                                [];
                            
                            if (node.hasAttribute && 
                               (node.hasAttribute('data-lang-es') || node.hasAttribute('data-lang-en'))) {
                                this.translateElement(node, this.currentLang);
                            }
                            
                            newElements.forEach(element => {
                                this.translateElement(element, this.currentLang);
                            });
                        }
                    });
                }
            });
        });
        
        // Observar todo el documento
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Métodos públicos para uso externo
    setLanguage(lang) {
        this.changeLanguage(lang);
    }
    
    getCurrentLanguage() {
        return this.currentLang;
    }
    
    // Método para añadir textos dinámicamente
    addTranslation(element, spanishText, englishText) {
        if (element) {
            element.setAttribute('data-lang-es', spanishText);
            element.setAttribute('data-lang-en', englishText);
            this.translateElement(element, this.currentLang);
        }
    }
}

// Crear instancia global cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
    
    // Exponer función global para cambiar idioma desde otros lugares
    window.changeLanguage = (lang) => {
        if (window.languageManager) {
            window.languageManager.setLanguage(lang);
        }
    };
    
    // Exponer función para obtener idioma actual
    window.getCurrentLanguage = () => {
        if (window.languageManager) {
            return window.languageManager.getCurrentLanguage();
        }
        return 'es';
    };
    
    console.log('✅ Sistema de traducción listo. Usa window.changeLanguage("es") o window.changeLanguage("en")');
});
