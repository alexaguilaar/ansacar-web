/* Archivo: js/main.js */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// 1. Abrir/Cerrar menú al hacer clic en el icono
if(hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");

        // Cambiar icono de barras a X
        const icon = hamburger.querySelector("i");
        if (navMenu.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });
}

// 2. Cerrar menú automáticamente al hacer clic en un enlace
document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");

    // Devolver el icono a estado original
    const icon = hamburger.querySelector("i");
    if(icon){
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
    }
}));

/* =========================================
   BOTÓN DE WHATSAPP (Inyectado dinámicamente)
   ========================================= */
document.addEventListener("DOMContentLoaded", function() {
    // 1. Configura aquí tu número (con el código de país, ej: 34 para España)
    const telefono = "34603353300";
    const mensaje = "Hola, me gustaría pedir información."; // Mensaje opcional predefinido

    // 2. Creamos el enlace
    const whatsappBtn = document.createElement("a");
    whatsappBtn.href = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    whatsappBtn.className = "whatsapp-float";
    whatsappBtn.target = "_blank"; // Abrir en pestaña nueva

    // 3. Añadimos el icono (usando FontAwesome)
    whatsappBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';

    // 4. Lo insertamos en el cuerpo de la página
    document.body.appendChild(whatsappBtn);
});

/* =========================================
   AVISO DE COOKIES (Lógica RGPD)
   ========================================= */
document.addEventListener("DOMContentLoaded", function() {

    // 1. Comprobamos si ya aceptó las cookies antes
    if (!localStorage.getItem("cookiesAccepted")) {

        // 2. Si no las ha aceptado, creamos el banner HTML
        const banner = document.createElement("div");
        banner.className = "cookie-banner";
        banner.innerHTML = `
            <div class="cookie-content">
                <p class="cookie-text">
                    Utilizamos cookies propias y de terceros para mejorar su experiencia y analizar nuestros servicios. 
                    Puede consultar nuestra <a href="legal.html">Política de Privacidad</a> para más información.
                </p>
                <div class="cookie-buttons">
                    <button id="acceptCookies" class="btn-cookie-accept">Aceptar todas</button>
                </div>
            </div>
        `;

        // 3. Lo añadimos al cuerpo del documento
        document.body.appendChild(banner);

        // 4. Hacemos que aparezca suavemente (con un pequeño retraso)
        setTimeout(() => {
            banner.classList.add("show");
        }, 500);

        // 5. Escuchamos el clic en "Aceptar"
        document.getElementById("acceptCookies").addEventListener("click", () => {
            // Guardamos la decisión en el navegador
            localStorage.setItem("cookiesAccepted", "true");

            // Ocultamos el banner
            banner.classList.remove("show");

            // Lo eliminamos del código tras la animación
            setTimeout(() => {
                banner.remove();
            }, 500);
        });
    }
});

/* =========================================
   INICIALIZAR ANIMACIONES (AOS)
   ========================================= */
// Esperamos a que la librería cargue
window.addEventListener('load', function() {
    AOS.init({
        duration: 1000,   // Duración de la animación en milisegundos (1 segundo)
        once: true,       // Si es true, la animación solo pasa una vez (no se repite al subir)
        offset: 100,      // Empieza la animación 100px antes de llegar al elemento
    });
});