// Inicializa el mapa centrado en la Universidad Nacional de General Sarmiento
var map = L.map('map').setView([-34.5226, -58.7006], 15);

// Añade el mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Centros de salud cercanos con preguntas específicas
var centros = [
  {
    nombre: "Centro de Salud Los Polvorines",
    coords: [-34.5226, -58.7006],
    preguntas: [
      "¿Cómo calificaría el tiempo de espera?",
      "¿Está satisfecho con la atención recibida?",
      "¿El personal fue amable?",
      "¿Recibió la atención que esperaba?",
      "¿El lugar estaba limpio?",
      "¿Se sintió cómodo durante la consulta?",
      "¿La explicación fue clara?",
      "¿El trato fue respetuoso?",
      "¿El personal fue profesional?",
      "¿Recomendaría el centro?"
    ]
  },
  {
    nombre: "Centro de Salud Tortuguitas",
    coords: [-34.527, -58.705],
    preguntas: [
      "¿El personal fue amable?",
      "¿Recibió la atención que esperaba?",
      "¿El lugar estaba limpio?",
      "¿Se sintió cómodo durante la consulta?",
      "¿El tiempo de espera fue adecuado?",
      "¿La información fue clara?",
      "¿La atención fue profesional?",
      "¿Hubo una solución a su problema?",
      "¿Se sintió seguro?",
      "¿Recomendaría el centro?"
    ]
  },
  {
    nombre: "Centro de Salud Pablo Nogués",
    coords: [-34.516, -58.694],
    preguntas: [
      "¿El lugar estaba limpio?",
      "¿Se sintió cómodo durante la consulta?",
      "¿La atención fue oportuna?",
      "¿Recibió información clara?",
      "¿El trato fue cortés?",
      "¿El personal fue profesional?",
      "¿Hubo seguimiento adecuado?",
      "¿Se sintió escuchado?",
      "¿Le brindaron opciones de tratamiento?",
      "¿Recomendaría el centro?"
    ]
  }
];

// Crea marcadores y añade eventos de clic para cada centro
centros.forEach(function(centro) {
  var marker = L.marker(centro.coords).addTo(map).bindPopup(centro.nombre);
  
  marker.on('click', function() {
    mostrarPreguntas(centro.preguntas);
  });
});

// Función para mostrar preguntas con opciones de puntuación
function mostrarPreguntas(preguntas) {
    var preguntasContainer = document.getElementById('preguntasContainer');
    preguntasContainer.innerHTML = '';
  
    preguntas.forEach(function(pregunta, index) {
      var preguntaElem = document.createElement('div');
      preguntaElem.className = 'pregunta';
      preguntaElem.textContent = `${index + 1}. ${pregunta}`;
  
      var opcionesPuntuacion = document.createElement('div');
      opcionesPuntuacion.className = 'opciones-puntuacion';
  
      for (let i = 1; i <= 10; i++) {
        let opcion = document.createElement('div');
        opcion.className = 'opcion';
        opcion.textContent = i;
        opcion.addEventListener('click', function() {
          Array.from(opcionesPuntuacion.children).forEach(op => op.classList.remove('activa'));
          opcion.classList.add('activa');
        });
        opcionesPuntuacion.appendChild(opcion);
      }
  
      preguntasContainer.appendChild(preguntaElem);
      preguntasContainer.appendChild(opcionesPuntuacion);
    });
  
    // Agregar un campo de comentario libre
    var comentarioElem = document.createElement('textarea');
    comentarioElem.className = 'comentario-libre';
    comentarioElem.placeholder = 'Ingrese aquí cualquier comentario adicional...';
    preguntasContainer.appendChild(comentarioElem);
  
    // Agregar botón de enviar
    var enviarBtn = document.createElement('button');
    enviarBtn.className = 'boton-enviar';
    enviarBtn.textContent = 'Enviar';
    enviarBtn.onclick = function() {
      alert('Encuesta enviada. ¡Gracias por su tiempo!');
    };
    
    preguntasContainer.appendChild(enviarBtn);
    preguntasContainer.style.display = 'block';
  }
  

