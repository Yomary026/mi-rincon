document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const searchContainer = document.getElementById('search-container');
    const resultsDiv = document.getElementById('results');
    const allResultsDiv = document.getElementById('all-vitamins');
    const objectionsDiv = document.getElementById('objections');

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
        'bajar de peso': { 
            name: 'Divi Her', 
            description: 'Suplemento para bajar de peso.', 
            quantity: '60 cápsulas',
            ingredients: 'Te verde, Berenjena, Linaza, Cromo, Konjac, Vitamina B1, Vitamina B6',
            usage: '1 o 2 cápsulas diarias en ayunas, esperar 30 minutos para comer.'
        },
        'african mango': { 
            name: 'African Mango', 
            description: 'Suplemento para bajar de peso.', 
            quantity: '60 cápsulas',
            ingredients: 'Maltodextrina, Celulosa Microcristalina, Estearato de Magnesio, Dióxido de Silício y Hidroxipropilmeticelulosa (envoltura). Sin edulcorantes, azúcares añadidos, conservantes ni colorantes.',
            usage: '1 cápsula antes de cada comida.'
        },
        'lipo xtreme burner': { 
            name: 'Lipo Xtreme Burner', 
            description: 'Suplemento para bajar de peso.', 
            quantity: '60 cápsulas',
            ingredients: 'Cafeína, Té verde, Garcinia Cambogia',
            usage: '2 cápsulas al día con agua.'
        },
        'colágeno hidrolizado (pelo, uñas, piel, etc)': { 
            name: 'Hydrolized Collagen', 
            description: 'Ayuda a la salud del cabello, uñas y piel.', 
            quantity: '60 cápsulas',
            ingredients: 'Colágeno hidrolizado, Ácido hialurónico',
            usage: '2 cápsula diaria en ayunas.'
        },
        'natural boster sexo': { 
            name: 'Testo Max', 
            description: 'Aumenta la libido y la energía.', 
            quantity: '60 cápsulas',
            ingredients: 'Maca, Ginseng, Tribulus Terrestris',
            usage: '1 antes de cada actividad sexual.'
        },
        'veneno de abeja para el dolor': { 
            name: 'Bee Wisdom Plus', 
            description: 'Alivia el dolor de manera natural.', 
            quantity: '60 cápsulas',
            ingredients: 'Veneno de abeja, Cúrcuma, Jengibre,Glucosamina 500mg, Condoitrina 400mg, MSM 200mg, Mezcla de polvo de veneno de abeja',
            usage: '2 cápsulas diarias con agua.'
        },
        'ayuda a las defensas': { 
            name: 'Shark Cartilage', 
            description: 'Fortalece el sistema inmunológico.', 
            quantity: '60 cápsulas',
            ingredients: 'Cartílago de tiburón, Vitamina C',
            usage: '1 cápsula dos veces al día.'
        },
        'células madre': { 
            name: 'Células Madre Stem Cell', 
            description: 'Mejora la regeneración celular.', 
            quantity: '60 cápsulas',
            ingredients: 'Células madre vegetales',
            usage: '1 cápsula diaria en ayunas.'
        },
        'células madre en crema': { 
            name: 'Células Madres Crema', 
            description: 'Crema regeneradora para la piel.', 
            quantity: '4oz',
            ingredients: 'Células madre, Extractos botánicos',
            usage: 'Aplicar sobre la piel limpia.'
        },
        'natural para sexo': { 
            name: 'Maca', 
            description: 'Mejora la función sexual.', 
            quantity: '60 cápsulas',
            ingredients: 'Maca',
            usage: '1 antes de la actividad sexual.'
        },
        'probiótico': { 
            name: 'Colvital', 
            description: 'Apoya la salud digestiva.', 
            quantity: '60 cápsulas',
            ingredients: 'Probióticos, Prebióticos',
            usage: '1 cápsula diaria con comida.'
        },
        'espirulina bajar de peso': { 
            name: 'Alga Maya', 
            description: 'Ayuda en la pérdida de peso.', 
            quantity: '60 cápsulas',
            ingredients: 'Espirulina, Clorella',
            usage: '2 cápsulas antes de las comidas.'
        },
        'quema grasa': { 
            name: 'Gel Reductor Naranja', 
            description: 'Gel para reducción de grasa.', 
            quantity: '8oz',
            ingredients: 'Cafeína, Extractos de naranja',
            usage: 'Aplicar sobre la piel y masajear.'
        },
        'quema grasa piña': { 
            name: 'Gel Reductor Piña', 
            description: 'Gel para reducción de grasa de piña.', 
            quantity: '8oz',
            ingredients: 'Cafeína, Extracto de piña',
            usage: 'Aplicar sobre la piel y masajear.'
        },
        'ayuda al sistema inmune': { 
            name: 'Inmunovid', 
            description: 'Fortalece el sistema inmune.', 
            quantity: '60 cápsulas',
            ingredients: 'Echinacea, Vitamina C',
            usage: '1 cápsula dos veces al día.'
        },
        'crema de veneno de abeja para el dolor': { 
            name: 'Bee Cream', 
            description: 'Alivio para el dolor.', 
            quantity: '4oz',
            ingredients: 'Veneno de abeja, Extractos naturales',
            usage: 'Aplicar sobre el área afectada.'
        },
        'detox': { 
            name: 'Super Desintoxicador', 
            description: 'Ayuda a desintoxicar el organismo.', 
            quantity: '60 cápsulas',
            ingredients: 'Clorella, Espirulina',
            usage: '2 cápsulas al día con agua.'
        },
        'diabetes formula': { 
            name: 'Regemax', 
            description: 'Apoya el control de la diabetes.', 
            quantity: '60 cápsulas',
            ingredients: 'Cromo, Canela, Ácido alfa-lipoico',
            usage: '1 cápsula antes de cada comida.'
        },
        'natural booste sexo': { 
            name: 'Ultraerexplus', 
            description: 'Mejora la función sexual.', 
            quantity: '60 cápsulas',
            ingredients: 'Maca, Ginseng',
            usage: '1 antes de la actividad sexual.'
        },
        'glucosamina/condróitina dolor': { 
            name: 'Top Ligament', 
            description: 'Ayuda en el dolor de articulaciones.', 
            quantity: '100 tabletas',
            ingredients: 'Glucosamina, Condroitina',
            usage: '2 tabletas diarias con agua.'
        },
        'sistema inmunológico': { 
            name: 'Noni', 
            description: 'Apoya la salud inmunológica.', 
            quantity: '60 cápsulas',
            ingredients: 'Noni, Vitamina C',
            usage: '1 cápsula dos veces al día.'
        },
        'articulaciones glucosamina': { 
            name: 'Arti Solution', 
            description: 'Mejora la salud articular.', 
            quantity: '60 cápsulas',
            ingredients: 'Glucosamina, Condroitina',
            usage: '2 cápsulas diarias con agua.'
        },
        'sistema inmune': { 
            name: 'Vitamina C', 
            description: 'Fortalece el sistema inmunológico.', 
            quantity: '100 cápsulas',
            ingredients: 'Vitamina C',
            usage: '1 cápsula diaria.'
        },
        'para la próstata': { 
            name: 'Ultra Prost', 
            description: 'Apoya la salud prostática.', 
            quantity: '60 cápsulas',
            ingredients: 'Saw Palmetto, Pygeum',
            usage: '1 cápsula diaria.'
        },
        'varios': { 
            name: 'Moringa Triple Plus', 
            description: 'Suplemento nutritivo.', 
            quantity: '60 cápsulas',
            ingredients: 'Moringa, Vitamina A, Vitamina C',
            usage: '1 cápsula diaria.'
        },
        'sexo efecto inmediato': { 
            name: 'Super X Pro', 
            description: 'Aumenta la libido rápidamente.', 
            quantity: '8 cápsulas',
            ingredients: 'Maca, Ginseng, Tribulus',
            usage: '1 cápsula antes de la actividad sexual.'
        },
        'para el dolor': { 
            name: 'Megadol', 
            description: 'Alivio del dolor rápido.', 
            quantity: '60 cápsulas',
            ingredients: 'Ibuprofeno, Extracto de jengibre',
            usage: '1 cápsula cada 8 horas.'
        },
        'super x natural': { 
            name: 'Super X Natural', 
            description: 'Mejora el rendimiento sexual.', 
            quantity: '60 cápsulas',
            ingredients: 'Maca, Ginseng, L-arginina',
            usage: '2 cápsulas diarias con agua.'
        },
    };

    const objeciones = {
        "Solo llamé para saber el costo": "Entiendo perfectamente, el costo es importante. Sin embargo, para poder darle el precio exacto, necesito hacerle una pequeña evaluación y hacerle algunas preguntas básicas. Esto me permitirá identificar si este es el tratamiento adecuado para usted y por cuánto tiempo se lo voy a recomendar. Así podremos asegurarnos de que obtiene los mejores resultados con nuestros tratamientos naturales. ¿Le parece si comenzamos con las preguntas?",
        "Es muy caro": "Entiendo que el precio puede parecer un poco elevado inicialmente, pero tenga en cuenta que nuestros productos son 100% naturales, elaborados con ingredientes orgánicos que brindan resultados seguros y efectivos. Además, al pagar con tarjeta de crédito, el envío es completamente gratis y recibirá un frasco adicional sin costo. Esto le permitirá probar más de nuestros tratamientos naturales y ver resultados duraderos. ¿Le gustaría aprovechar esta oferta?",
        "Necesito pensarlo": "Es totalmente comprensible que quiera tomarse su tiempo para decidir. Nuestros tratamientos son 100% naturales y están diseñados para cuidar su bienestar de manera segura. Además, si decide pagar con tarjeta de crédito, le enviaremos su tratamiento sin costo de envío y recibirá un frasco adicional gratis. ¿Hay algo más que le gustaría saber sobre los ingredientes naturales o cómo funcionan nuestros productos?",
        "No estoy seguro de si realmente lo necesito": "Entiendo su duda. Nuestros tratamientos naturales están diseñados específicamente para ofrecer una solución segura y efectiva a problemas comunes, sin el uso de químicos agresivos. Y lo mejor es que si paga con tarjeta de crédito, obtendrá el envío gratuito y un frasco adicional, lo que le permitirá experimentar los beneficios de nuestros productos sin ningún riesgo adicional. ¿Le gustaría que le explicara cómo nuestros tratamientos pueden ayudarle con [problema específico]?",
        "He escuchado malas opiniones sobre productos similares": "Es excelente que esté bien informado antes de tomar una decisión. Sin embargo, nuestros tratamientos naturales son diferentes porque están elaborados con ingredientes orgánicos, lo que asegura que sean seguros para su piel y cuerpo. Además, si paga con tarjeta de crédito, no solo obtendrá el envío gratuito, sino que también recibirá un frasco adicional para que pueda probarlo y ver los resultados usted mismo. Contamos con testimonios de clientes que han notado mejoras significativas usando nuestros productos.",
        "No puedo permitírmelo ahora": "Entiendo su preocupación con el presupuesto, y por eso queremos facilitarle las cosas. Nuestros tratamientos son completamente naturales, lo que significa que está invirtiendo en productos seguros y saludables. Si decide pagar con tarjeta de crédito, obtendrá el envío gratuito y un frasco adicional gratis, lo que le permitirá recibir más producto sin costo adicional. También ofrecemos opciones de pago flexibles. ¿Le gustaría que le explique más sobre las opciones de crédito?",
        "Prefiero seguir usando el producto que ya tengo": "Es genial que ya tenga un producto que le funciona, pero nuestros tratamientos naturales son una opción superior porque no contienen químicos dañinos y están formulados para ofrecer resultados sin efectos secundarios. Además, si paga con tarjeta de crédito, le enviaremos el tratamiento sin costo de envío y le regalaremos un frasco adicional, lo que le permitirá probarlo sin riesgos. ¿Le gustaría experimentar los beneficios de un tratamiento natural?",
        "No tengo tiempo para hablar en este momento": "Entiendo que está ocupado/a. Solo quería mencionarle rápidamente que nuestros tratamientos son 100% naturales, diseñados para cuidar su bienestar de manera segura. Y si decide pagar con tarjeta de crédito, recibirá el envío completamente gratis y un frasco adicional sin costo. ¿Qué le parece si acordamos un momento que sea más conveniente para hablar?"
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
                        <p><strong>Ingredientes:</strong> ${vitaminData[key].ingredients}</p>
                        <p><strong>Método de uso:</strong> ${vitaminData[key].usage}</p>
                    </div>
                `);
            }
        }

        if (results.length > 0) {
            resultsDiv.innerHTML = results.join('');
            resultsDiv.style.display = 'block';
        } else {
            resultsDiv.innerHTML = '<p>No se encontraron resultados.</p>';
            resultsDiv.style.display = 'block';
        }

        allResultsDiv.style.display = 'none';
        objectionsDiv.style.display = 'none';
    });

    document.getElementById('show-all-vitamins').addEventListener('click', function() {
        allResultsDiv.innerHTML = Object.keys(vitaminData).map(key => `
            <div class="result-item">
                <h3>${key}</h3>
                <p><strong>Nombre:</strong> ${vitaminData[key].name}</p>
                <p><strong>Descripción:</strong> ${vitaminData[key].description}</p>
                <p><strong>Cantidad:</strong> ${vitaminData[key].quantity}</p>
                <p><strong>Ingredientes:</strong> ${vitaminData[key].ingredients}</p>
                <p><strong>Método de uso:</strong> ${vitaminData[key].usage}</p>
            </div>
        `).join('');
        allResultsDiv.style.display = 'block';
        resultsDiv.style.display = 'none';
        objectionsDiv.style.display = 'none';
    });

    document.getElementById('show-objections').addEventListener('click', function() {
        objectionsDiv.innerHTML = Object.keys(objeciones).map(key => `
            <div class="objection-item">
                <h4>${key}</h4>
                <p>${objeciones[key]}</p>
            </div>
        `).join('');
        objectionsDiv.style.display = 'block';
        resultsDiv.style.display = 'none';
        allResultsDiv.style.display = 'none';
    });
});
