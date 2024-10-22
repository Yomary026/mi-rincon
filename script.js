document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const searchContainer = document.getElementById('search-container');
    const resultsDiv = document.getElementById('results');

    // Almacenar usuarios en un objeto
    const users = {};

    // Lógica de registro
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;

        if (users[newUsername]) {
            alert('Este usuario ya existe. Por favor, elige otro.');
        } else {
            users[newUsername] = newPassword; // Guardar usuario y contraseña
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            document.getElementById('register-container').style.display = 'none'; // Ocultar registro
            document.getElementById('login-container').style.display = 'block'; // Mostrar inicio de sesión
        }
    });

    // Lógica de inicio de sesión
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (users[username] && users[username] === password) {
            alert('Inicio de sesión exitoso');
            searchContainer.style.display = 'block'; // Mostrar formulario de búsqueda
            document.getElementById('login-container').style.display = 'none'; // Ocultar formulario de inicio de sesión
        } else {
            alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
        }
    });

    const searchForm = document.getElementById('search-form');

    // Datos personalizados
    const vitaminData = {
        'bajar de peso': { name: 'divi her', description: 'Suplemento para bajar de peso.' },
        'colagen hidrolizado (pelo, uñas, piel, etc)': { name: 'hidrolized collagen', description: 'Ayuda a la salud del cabello, uñas y piel.' },
        'natural boster sexo': { name: 'testo max', description: 'Aumenta la libido y la energía.' },
        'veneno de abeja para el dolor': { name: 'bee wisdom plus', description: 'Alivia el dolor de manera natural.' },
        'ayuda a las defensas': { name: 'shark cartilage', description: 'Fortalece el sistema inmunológico.' },
        'celulas madres': { name: 'celulas madres stem cell', description: 'Mejora la regeneración celular.' },
        'celulas madre en crema': { name: 'celulas madres crema', description: 'Crema regeneradora para la piel.' },
        'natural para sexo': { name: 'maca', description: 'Mejora la función sexual.' },
        'probiotico': { name: 'colvital', description: 'Apoya la salud digestiva.' },
        'espirulina bajar de peso': { name: 'alga maya', description: 'Ayuda en la pérdida de peso.' },
        'quema grasa': { name: 'gel reductor naranja', description: 'Gel para reducción de grasa.' },
        'ayuda al sistema inmune': { name: 'inmunovid', description: 'Fortalece el sistema inmune.' },
        'crema de veneno de abeja para el dolor': { name: 'bee cream', description: 'Alivio para el dolor.' },
        'detox': { name: 'super desintoxicador', description: 'Ayuda a desintoxicar el organismo.' },
        'diabetes formula': { name: 'regemax', description: 'Apoya el control de la diabetes.' },
        'natural booste sexo': { name: 'ultraerexplus', description: 'Mejora la función sexual.' },
        'glucosamine/coinditrina dolor': { name: 'top ligament', description: 'Ayuda en el dolor de articulaciones.' },
        'sistema inmunologico': { name: 'noni', description: 'Apoya la salud inmunológica.' },
        'darticulaciones glucosamina': { name: 'arti solution', description: 'Mejora la salud articular.' },
        'natural para sexo': { name: 'super x natural', description: 'Mejora la función sexual.' },
        'sistema inmune': { name: 'vitamina c', description: 'Fortalece el sistema inmunológico.' },
        'para la prostata': { name: 'ultra prost', description: 'Apoya la salud prostática.' },
        'varios': { name: 'moringa triple plus', description: 'Suplemento nutritivo.' },
        'sexo efecto inmediato': { name: 'super x pro', description: 'Aumenta la libido rápidamente.' },
        'para el dolor': { name: 'megadol', description: 'Alivio del dolor rápido.' },
    };

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('disease').value.trim().toLowerCase();
        
        let results = [];
        for (let key in vitaminData) {
            if (key.includes(query) || vitaminData[key].name.toLowerCase().includes(query)) {
                results.push(`${key}: ${vitaminData[key].name} - ${vitaminData[key].description}`);
            }
        }

        if (results.length > 0) {
            resultsDiv.innerHTML = `<h2>Resultados:</h2><p>${results.join('<br>')}</p>`;
        } else {
            resultsDiv.innerHTML = `<h2>Resultados:</h2><p>No se encontraron vitaminas para esta búsqueda.</p>`;
        }
        
        searchForm.reset();
    });
});
