document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const searchContainer = document.getElementById('search-container');
    const resultsDiv = document.getElementById('results');
    const allResultsDiv = document.getElementById('all-vitamins');

    let users = JSON.parse(localStorage.getItem('users')) || {};

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newUsername = document.getElementById('new-username').value.trim();
        const newPassword = document.getElementById('new-password').value.trim();

        if (!newUsername || !newPassword) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (users[newUsername]) {
            alert('Este usuario ya existe. Por favor, elige otro.');
        } else {
            users[newUsername] = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            document.getElementById('register-container').style.display = 'none';
            document.getElementById('login-container').style.display = 'block';
        }
        registerForm.reset();
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (users[username] && users[username] === password) {
            alert('Inicio de sesión exitoso');
            searchContainer.style.display = 'block';
            document.getElementById('login-container').style.display = 'none';
        } else {
            alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
        }
        loginForm.reset();
    });

    const searchForm = document.getElementById('search-form');

    const vitaminData = {
        'bajar de peso': { name: 'Divi Her', description: 'Suplemento para bajar de peso.', quantity: '60 cápsulas' },
        'african mango': { name: 'African Mango', description: 'Suplemento para bajar de peso.', quantity: '60 cápsulas' },
        'lipo xtreme burner': { name: 'Lipo Xtreme Burner', description: 'Suplemento para bajar de peso.', quantity: '60 cápsulas' },
        'colágeno hidrolizado (pelo, uñas, piel, etc)': { name: 'Hydrolized Collagen', description: 'Ayuda a la salud del cabello, uñas y piel.', quantity: '60 cápsulas' },
        'natural boster sexo': { name: 'Testo Max', description: 'Aumenta la libido y la energía.', quantity: '60 cápsulas' },
        'veneno de abeja para el dolor': { name: 'Bee Wisdom Plus', description: 'Alivia el dolor de manera natural.', quantity: '60 cápsulas' },
        'ayuda a las defensas': { name: 'Shark Cartilage', description: 'Fortalece el sistema inmunológico.', quantity: '60 cápsulas' },
        'células madre': { name: 'Células Madre Stem Cell', description: 'Mejora la regeneración celular.', quantity: '60 cápsulas' },
        'células madre en crema': { name: 'Células Madres Crema', description: 'Crema regeneradora para la piel.', quantity: '4oz' },
        'natural para sexo': { name: 'Maca', description: 'Mejora la función sexual.', quantity: '60 cápsulas' },
        'probiótico': { name: 'Colvital', description: 'Apoya la salud digestiva.', quantity: '60 cápsulas' },
        'espirulina bajar de peso': { name: 'Alga Maya', description: 'Ayuda en la pérdida de peso.', quantity: '60 cápsulas' },
        'quema grasa': { name: 'Gel Reductor Naranja', description: 'Gel para reducción de grasa.', quantity: '8oz' },
        'quema grasa piña': { name: 'Gel Reductor Piña', description: 'Gel para reducción de grasa de piña.', quantity: '8oz' },
        'ayuda al sistema inmune': { name: 'Inmunovid', description: 'Fortalece el sistema inmune.', quantity: '60 cápsulas' },
        'crema de veneno de abeja para el dolor': { name: 'Bee Cream', description: 'Alivio para el dolor.', quantity: '4oz' },
        'detox': { name: 'Super Desintoxicador', description: 'Ayuda a desintoxicar el organismo.', quantity: '60 cápsulas' },
        'diabetes formula': { name: 'Regemax', description: 'Apoya el control de la diabetes.', quantity: '60 cápsulas' },
        'natural booste sexo': { name: 'Ultraerexplus', description: 'Mejora la función sexual.', quantity: '60 cápsulas' },
        'glucosamina/condróitina dolor': { name: 'Top Ligament', description: 'Ayuda en el dolor de articulaciones.', quantity: '100 tabletas' },
        'sistema inmunológico': { name: 'Noni', description: 'Apoya la salud inmunológica.', quantity: '60 cápsulas' },
        'articulaciones glucosamina': { name: 'Arti Solution', description: 'Mejora la salud articular.', quantity: '60 cápsulas' },
        'sistema inmune': { name: 'Vitamina C', description: 'Fortalece el sistema inmunológico.', quantity: '100 cápsulas' },
        'para la próstata': { name: 'Ultra Prost', description: 'Apoya la salud prostática.', quantity: '60 cápsulas' },
        'varios': { name: 'Moringa Triple Plus', description: 'Suplemento nutritivo.', quantity: '60 cápsulas' },
        'sexo efecto inmediato': { name: 'Super X Pro', description: 'Aumenta la libido rápidamente.', quantity: '8 cápsulas' },
        'para el dolor': { name: 'Megadol', description: 'Alivio del dolor rápido.', quantity: '60 cápsulas' },
        'super x natural': { name: 'Super X Natural', description: 'Mejora el rendimiento sexual.', quantity: '60 cápsulas' }, // Nueva vitamina añadida
    };

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('disease').value.trim().toLowerCase();
        
        let results = [];
        for (let key in vitaminData) {
            if (key.toLowerCase().includes(query) || vitaminData[key].name.toLowerCase().includes(query)) {
                results.push(`
                    <div class="result-item">
                        <h3>${key}</h3>
                        <p><strong>Nombre:</strong> ${vitaminData[key].name}</p>
                        <p><strong>Descripción:</strong> ${vitaminData[key].description}</p>
                        <p><strong>Cantidad:</strong> ${vitaminData[key].quantity}</p>
                    </div>
                `);
            }
        }

        resultsDiv.innerHTML = results.length > 0 
            ? `<h2>Resultados:</h2>${results.join('')}` 
            : `<h2>Resultados:</h2><p>No se encontraron vitaminas para esta búsqueda.</p>`;
        
        resultsDiv.style.display = 'block'; // Muestra resultados de búsqueda
        allResultsDiv.style.display = 'none'; // Asegúrate de ocultar todas las vitaminas
        searchForm.reset();
    });

    document.getElementById('show-all-vitamins').addEventListener('click', function() {
        let allResults = [];
        let index = 1; // Inicializa el índice para enumerar

        for (let key in vitaminData) {
            allResults.push(`
                <div class="result-item">
                    <h3>${index++}. ${key}</h3> <!-- Añade el índice aquí -->
                    <p><strong>Nombre:</strong> ${vitaminData[key].name}</p>
                    <p><strong>Descripción:</strong> ${vitaminData[key].description}</p>
                    <p><strong>Cantidad:</strong> ${vitaminData[key].quantity}</p>
                </div>
            `);
        }

        allResultsDiv.innerHTML = `<h2>Todas las Vitaminas:</h2>${allResults.join('')}`;
        allResultsDiv.style.display = 'block'; // Muestra todas las vitaminas
        resultsDiv.style.display = 'none'; // Oculta resultados de búsqueda
    });

    document.getElementById('show-register').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('register-container').style.display = 'block';
    });

    document.getElementById('show-login').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('register-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    });
});

