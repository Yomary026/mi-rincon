document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const searchContainer = document.getElementById('search-container');
    const resultsDiv = document.getElementById('results');
    const allResultsDiv = document.getElementById('all-vitamins');
    const objectionsDiv = document.getElementById('objections');
    const diseasesDiv = document.getElementById('diseases');
    const searchForm = document.getElementById('search-form'); // Asegúrate de que este elemento exista

    let users = JSON.parse(localStorage.getItem('users')) || {};

    // Alternar a la vista de registro
    document.getElementById('show-register').addEventListener('click', function() {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('register-container').style.display = 'block';
    });

    // Alternar a la vista de inicio de sesión
    document.getElementById('show-login').addEventListener('click', function() {
        document.getElementById('register-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    });

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
            users[newUsername] = newPassword; // Guardar nuevo usuario
            localStorage.setItem('users', JSON.stringify(users)); // Actualizar en localStorage
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            document.getElementById('register-container').style.display = 'none'; // Ocultar registro
            document.getElementById('login-container').style.display = 'block'; // Mostrar login
        }
        registerForm.reset(); // Limpiar el formulario
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (users[username] && users[username] === password) {
            alert('Inicio de sesión exitoso');
            searchContainer.style.display = 'block';
            document.getElementById('login-container').style.display = 'none'; // Ocultar login
        } else {
            alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
        }
        loginForm.reset(); // Limpiar el formulario
    });

    const vitaminData = {
        'Bajar de peso': { 
            name: 'Divi Her', 
            description: 'Suplemento para bajar de peso.', 
            quantity: '60 cápsulas',
            ingredients: 'Te verde, Berenjena, Linaza, Cromo, Konjac, Vitamina B1, Vitamina B6',
            usage: '1 o 2 cápsulas diarias en ayunas, esperar 30 minutos para comer.'
        },
        'African mango': { 
            name: 'African Mango', 
            description: 'Suplemento para bajar de peso.', 
            quantity: '60 cápsulas',
            ingredients: 'Maltodextrina, Celulosa Microcristalina, Estearato de Magnesio, Dióxido de Silício y Hidroxipropilmeticelulosa (envoltura). Sin edulcorantes, azúcares añadidos, conservantes ni colorantes.',
            usage: '1 cápsula antes de cada comida.'
        },
        'Lipo xtreme burner': { 
            name: 'Lipo Xtreme Burner', 
            description: 'Suplemento para bajar de peso.', 
            quantity: '60 cápsulas',
            ingredients: 'Cafeína, Té verde, Garcinia Cambogia',
            usage: '2 cápsulas al día con agua.'
        },
        'Colágeno hidrolizado (pelo, uñas, piel, etc)': { 
            name: 'Hydrolized Collagen', 
            description: 'Ayuda a la salud del cabello, uñas y piel.', 
            quantity: '60 cápsulas',
            ingredients: 'Colágeno hidrolizado, Ácido hialurónico',
            usage: '2 cápsula diaria en ayunas.'
        },
        'Natural boster sexo': { 
            name: 'Testo Max', 
            description: 'Aumenta la libido y la energía.', 
            quantity: '60 cápsulas',
            ingredients: 'Maca, Ginseng, Tribulus Terrestris',
            usage: '1 antes de cada actividad sexual.'
        },
        'Veneno de abeja para el dolor': { 
            name: 'Bee Wisdom Plus', 
            description: 'Alivia el dolor de manera natural.', 
            quantity: '60 cápsulas',
            ingredients: 'Veneno de abeja, Cúrcuma, Jengibre,Glucosamina 500mg, Condoitrina 400mg, MSM 200mg, Mezcla de polvo de veneno de abeja',
            usage: '2 cápsulas diarias con agua.'
        },
        'Ayuda a las defensas': { 
            name: 'Shark Cartilage', 
            description: 'Fortalece el sistema inmunológico.', 
            quantity: '60 cápsulas',
            ingredients: 'Cartílago de tiburón, Vitamina C',
            usage: '1 cápsula dos veces al día.'
        },
        'Celulas madre': { 
            name: 'Células Madre Stem Cell', 
            description: 'Mejora la regeneración celular.', 
            quantity: '60 cápsulas',
            ingredients: 'Células madre vegetales',
            usage: '1 cápsula diaria en ayunas.'
        },
        'Celulas madre en crema': { 
            name: 'Células Madres Crema', 
            description: 'Crema regeneradora para la piel.', 
            quantity: '4oz',
            ingredients: 'Células madre, Extractos botánicos',
            usage: 'Aplicar sobre la piel limpia.'
        },
        'Natural para sexo': { 
            name: 'Maca', 
            description: 'Mejora la función sexual.', 
            quantity: '60 cápsulas',
            ingredients: 'Maca',
            usage: '1 antes de la actividad sexual.'
        },
        'Probiótico': { 
            name: 'Colvital', 
            description: 'Apoya la salud digestiva.', 
            quantity: '60 cápsulas',
            ingredients: 'Probióticos, Prebióticos',
            usage: '1 cápsula diaria con comida.'
        },
        'Espirulina bajar de peso': { 
            name: 'Alga Maya', 
            description: 'Ayuda en la pérdida de peso.', 
            quantity: '60 cápsulas',
            ingredients: 'Espirulina, Clorella',
            usage: '2 cápsulas antes de las comidas.'
        },
        'Quema grasa': { 
            name: 'Gel Reductor Naranja', 
            description: 'Gel para reducción de grasa.', 
            quantity: '8oz',
            ingredients: 'Cafeína, Extractos de naranja',
            usage: 'Aplicar sobre la piel y masajear.'
        },
        'Quema grasa piña': { 
            name: 'Gel Reductor Piña', 
            description: 'Gel para reducción de grasa de piña.', 
            quantity: '8oz',
            ingredients: 'Cafeína, Extracto de piña',
            usage: 'Aplicar sobre la piel y masajear.'
        },
        'Ayuda al sistema inmune': { 
            name: 'Inmunovid', 
            description: 'Fortalece el sistema inmune.', 
            quantity: '60 cápsulas',
            ingredients: 'Echinacea, Vitamina C',
            usage: '1 cápsula dos veces al día.'
        },
        'Crema de veneno de abeja para el dolor': { 
            name: 'Bee Cream', 
            description: 'Alivio para el dolor.', 
            quantity: '4oz',
            ingredients: 'Veneno de abeja, Extractos naturales',
            usage: 'Aplicar sobre el área afectada.'
        },
        'Detox': { 
            name: 'Super Desintoxicador', 
            description: 'Ayuda a desintoxicar el organismo.', 
            quantity: '60 cápsulas',
            ingredients: 'Clorella, Espirulina',
            usage: '2 cápsulas al día con agua.'
        },
        'Diabetes formula': { 
            name: 'Regemax', 
            description: 'Apoya el control de la diabetes.', 
            quantity: '60 cápsulas',
            ingredients: 'Cromo, Canela, Ácido alfa-lipoico',
            usage: '1 cápsula antes de cada comida.'
        },
        'Natural booste sexo': { 
            name: 'Ultraerexplus', 
            description: 'Mejora la función sexual.', 
            quantity: '60 cápsulas',
            ingredients: 'Maca, Ginseng',
            usage: '1 antes de la actividad sexual.'
        },
        'Glucosamina/condróitina dolor': { 
            name: 'Top Ligament', 
            description: 'Ayuda en el dolor de articulaciones.', 
            quantity: '100 tabletas',
            ingredients: 'Glucosamina, Condroitina',
            usage: '2 tabletas diarias con agua.'
        },
        'Sistema inmunológico': { 
            name: 'Noni', 
            description: 'Apoya la salud inmunológica.', 
            quantity: '60 cápsulas',
            ingredients: 'Noni, Vitamina C',
            usage: '1 cápsula dos veces al día.'
        },
        'Articulaciones glucosamina': { 
            name: 'Arti Solution', 
            description: 'Mejora la salud articular.', 
            quantity: '60 cápsulas',
            ingredients: 'Glucosamina, Condroitina',
            usage: '2 cápsulas diarias con agua.'
        },
        'Sistema inmune': { 
            name: 'Vitamina C', 
            description: 'Fortalece el sistema inmunológico.', 
            quantity: '100 cápsulas',
            ingredients: 'Vitamina C',
            usage: '1 cápsula diaria.'
        },
        'Para la próstata': { 
            name: 'Ultra Prost', 
            description: 'Apoya la salud prostática.', 
            quantity: '60 cápsulas',
            ingredients: 'Saw Palmetto, Pygeum',
            usage: '1 cápsula diaria.'
        },
        'Varios': { 
            name: 'Moringa Triple Plus', 
            description: 'Suplemento nutritivo.', 
            quantity: '60 cápsulas',
            ingredients: 'Moringa, Vitamina A, Vitamina C',
            usage: '1 cápsula diaria.'
        },
        'Sexo efecto inmediato': { 
            name: 'Super X Pro', 
            description: 'Aumenta la libido rápidamente.', 
            quantity: '8 cápsulas',
            ingredients: 'Maca, Ginseng, Tribulus',
            usage: '1 cápsula antes de la actividad sexual.'
        },
        'Para el dolor': { 
            name: 'Megadol', 
            description: 'Alivio del dolor rápido.', 
            quantity: '60 cápsulas',
            ingredients: 'Ibuprofeno, Extracto de jengibre',
            usage: '1 cápsula cada 8 horas.'
        },
        'Super x natural': { 
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

const diseaseData = {
    'diabetes': {
        name: 'Diabetes',
        definition: 'La diabetes es una enfermedad crónica que se produce cuando el cuerpo no puede producir suficiente insulina o no puede usarla eficazmente.',
        symptoms: 'Sed excesiva, aumento de la frecuencia urinaria, fatiga.',
        damage: 'Puede causar daño a los nervios, riñones, ojos y corazón.'
    },
    'altapresion': {
        name: 'Hipertensión (Alta presión)',
        definition: 'La hipertensión es una condición médica donde la presión arterial se eleva a niveles peligrosos.',
        symptoms: 'Dolores de cabeza, fatiga, visión borrosa.',
        damage: 'Aumenta el riesgo de enfermedades cardíacas y accidentes cerebrovasculares.'
    },
    'colesterol': {
        name: 'Colesterol alto',
        definition: 'El colesterol alto se refiere a niveles excesivos de colesterol en la sangre.',
        symptoms: 'Generalmente no presenta síntomas, pero puede causar problemas cardíacos.',
        damage: 'Aumenta el riesgo de enfermedad coronaria y ataques cardíacos.'
    },
    'artritis': {
        name: 'Artritis',
        definition: 'La artritis es una inflamación de las articulaciones que causa dolor y rigidez.',
        symptoms: 'Dolor en las articulaciones, hinchazón y rigidez.',
        damage: 'Puede llevar a la degeneración articular y discapacidad.'
    },
    'sobrepeso': {
        name: 'Sobrepeso',
        definition: 'El sobrepeso se refiere a tener un exceso de peso en relación con la altura.',
        symptoms: 'Fatiga, dificultad para respirar, problemas articulares.',
        damage: 'Aumenta el riesgo de enfermedades como diabetes y enfermedades cardíacas.'
    }
  };

    // Manejo de búsqueda
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('disease').value.trim().toLowerCase();

        // Limpiar resultados anteriores
        resultsDiv.innerHTML = '';

        // Manejo de búsqueda de vitaminas
        const vitaminResults = Object.entries(vitaminData)
            .filter(([key]) => key.toLowerCase().includes(query) || vitaminData[key].name.toLowerCase().includes(query))
            .map(([key, value]) => `
                <div class="result-item">
                    <h3>${key}</h3>
                    <p><strong>Nombre:</strong> ${value.name}</p>
                    <p><strong>Descripción:</strong> ${value.description}</p>
                    <p><strong>Cantidad:</strong> ${value.quantity}</p>
                    <p><strong>Ingredientes:</strong> ${value.ingredients}</p>
                    <p><strong>Método de uso:</strong> ${value.usage}</p>
                </div>
            `).join('');

        // Manejo de búsqueda de enfermedades
        const disease = diseaseData[query];
        const diseaseResults = disease ? `
            <div class="result-item">
                <h3>${disease.name}</h3>
                <p><strong>Definición:</strong> ${disease.definition}</p>
                <p><strong>Síntomas:</strong> ${disease.symptoms}</p>
                <p><strong>Daño Potencial:</strong> ${disease.damage}</p>
            </div>
        ` : '';

        // Combina resultados de vitaminas y enfermedades
        resultsDiv.innerHTML = (vitaminResults + diseaseResults) || '<p>No se encontraron resultados.</p>';
        
        // Mostrar contenedor de resultados
        resultsDiv.style.display = 'block';
        allResultsDiv.style.display = 'none';
        objectionsDiv.style.display = 'none';
        diseasesDiv.style.display = 'none'; 
    });

    // Mostrar todas las vitaminas
    document.getElementById('show-all-vitamins').addEventListener('click', function() {
        allResultsDiv.innerHTML = Object.entries(vitaminData).map(([key, value]) => `
            <div class="result-item">
                <h3>${key}</h3>
                <p><strong>Nombre:</strong> ${value.name}</p>
                <p><strong>Descripción:</strong> ${value.description}</p>
                <p><strong>Cantidad:</strong> ${value.quantity}</p>
                <p><strong>Ingredientes:</strong> ${value.ingredients}</p>
                <p><strong>Método de uso:</strong> ${value.usage}</p>
            </div>
        `).join('');
        allResultsDiv.style.display = 'block';
        resultsDiv.style.display = 'none';
        objectionsDiv.style.display = 'none';
        diseasesDiv.style.display = 'none'; 
    });

    // Mostrar objeciones
    document.getElementById('show-objections').addEventListener('click', function() {
        objectionsDiv.innerHTML = Object.entries(objeciones).map(([key, value]) => `
            <div class="result-item">
                <h3>Objeción: ${key}</h3>
                <p><strong>Respuesta:</strong> ${value}</p>
            </div>
        `).join('');
        objectionsDiv.style.display = 'block';
        resultsDiv.style.display = 'none';
        allResultsDiv.style.display = 'none';
        diseasesDiv.style.display = 'none'; 
    });

    // Mostrar enfermedades
    document.getElementById('show-diseases').addEventListener('click', function() {
        diseasesDiv.innerHTML = Object.entries(diseaseData).map(([key, value]) => `
            <div class="result-item">
                <h3>${value.name}</h3>
                <p><strong>Definición:</strong> ${value.definition}</p>
                <p><strong>Síntomas:</strong> ${value.symptoms}</p>
                <p><strong>Daño Potencial:</strong> ${value.damage}</p>
            </div>
        `).join('');
        diseasesDiv.style.display = 'block';
        resultsDiv.style.display = 'none';
        allResultsDiv.style.display = 'none';
        objectionsDiv.style.display = 'none'; 
    });
});