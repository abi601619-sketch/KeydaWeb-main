// Funcionalidad para Catálogo y Comunes
document.addEventListener('DOMContentLoaded', () => {
    
    // Filtrado de Catálogo
    const filterButtons = document.querySelectorAll('.filter-btn');
    const catalogItems = document.querySelectorAll('.catalog-item');

    if (filterButtons.length > 0 && catalogItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Remover clase active de todos
                filterButtons.forEach(b => b.classList.remove('active'));
                // Agregar clase active al clickeado
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                catalogItems.forEach(item => {
                    if (filterValue === 'todos' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Validación de formulario de Contacto / Cotizaciones
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        
        // Validación personalizada para correos y descripciones
        const emailInputs = form.querySelectorAll('input[type="email"]');
        const descInputs = form.querySelectorAll('textarea[name="descripcion"]');
        
        emailInputs.forEach(input => {
            input.addEventListener('input', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    this.setCustomValidity('Por favor ingrese un correo válido.');
                    const feedback = this.nextElementSibling;
                    if (feedback && feedback.classList.contains('invalid-feedback')) {
                        feedback.textContent = 'Debe ser un correo electrónico válido (ej: nombre@dominio.com).';
                    }
                } else {
                    this.setCustomValidity('');
                }
            });
        });

        descInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim().length < 15) {
                    this.setCustomValidity('Descripción muy corta.');
                    const feedback = this.nextElementSibling;
                    if (feedback && feedback.classList.contains('invalid-feedback')) {
                        feedback.textContent = 'Bríndanos un poco más de detalles (mínimo 15 caracteres) para ayudarte mejor.';
                    }
                } else {
                    this.setCustomValidity('');
                }
            });
        });


       form.addEventListener('submit', function (event) {
const nameInputs = form.querySelectorAll('input[name="nombre"]');
const subjectInputs = form.querySelectorAll('input[name="asunto"]');

nameInputs.forEach(input => {
    input.addEventListener('input', function () {
        const nombre = this.value.trim();
        const feedback = this.nextElementSibling;

        if (nombre.length < 8) {
            this.setCustomValidity('El nombre debe tener al menos 8 caracteres.');

            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.textContent = 'El nombre debe tener al menos 8 caracteres.';
            }
        } 
        else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
            this.setCustomValidity('El nombre solo debe contener letras.');

            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.textContent = 'El nombre solo debe contener letras y espacios.';
            }
        } 
        else {
            this.setCustomValidity('');
        }
    });
});


subjectInputs.forEach(input => {
    input.addEventListener('input', function () {
        const asunto = this.value.trim();
        const feedback = this.nextElementSibling;

        if (asunto.length < 15) {
            this.setCustomValidity('El asunto debe tener al menos 15 caracteres.');

            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.textContent = 'El asunto debe tener al menos 15 caracteres.';
            }
        } 
        else {
            this.setCustomValidity('');
        }
    });
});
    nameInputs.forEach(i => i.dispatchEvent(new Event('input')));
    subjectInputs.forEach(i => i.dispatchEvent(new Event('input')));
    emailInputs.forEach(i => i.dispatchEvent(new Event('input')));
    descInputs.forEach(i => i.dispatchEvent(new Event('input')));

    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } 
    else {
        if (form.id === 'contactForm' || form.id === 'cotizacionForm') {
            event.preventDefault();

            const formData = new FormData(form);
            let bodyText = '';

            let subject = form.querySelector('[name="asunto"]')
                ? form.querySelector('[name="asunto"]').value
                : (form.id === 'cotizacionForm'
                    ? 'Nueva solicitud de cotización'
                    : 'Solicitud desde sitio web');

            for (let [key, value] of formData.entries()) {
                bodyText += key.toUpperCase() + ': ' + value + '\n';
            }

            const mailtoLink =
                'mailto:muebleskeydasv@gmail.com?subject=' +
                encodeURIComponent(subject) +
                '&body=' +
                encodeURIComponent(bodyText);

            window.location.href = mailtoLink;

            alert('Se abrirá su cliente de correo para enviar el mensaje.');
        }
    }

    form.classList.add('was-validated');
}, false);
    });

});
