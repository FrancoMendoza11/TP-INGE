const modal = document.querySelector(".modal");
const modalInstrucciones = document.querySelector(".modal-instrucciones");

let encuestasHardcodeadas = [{
  encuestaNumero : 1,
  "¿Cómo calificaría el tiempo de espera?" : 10,
  "¿Está satisfecho con la atención recibida?" : 5,
  "¿El personal fue amable?" : 2,
  "¿Recibió la atención que esperaba?" : 3,
  "¿El lugar estaba limpio?" : 4,
  "¿Se sintió cómodo durante la consulta?" : 5,
  "¿La explicación fue clara?" : 6,
  "¿El trato fue respetuoso?" : 7,
  "¿El personal fue profesional?" : 8,
  "¿Recomendaría el centro?" : 10
  },
  {
      encuestaNumero : 2,
    "¿Cómo calificaría el tiempo de espera?" : 1,
    "¿Está satisfecho con la atención recibida?" : 5,
    "¿El personal fue amable?" : 2,
    "¿Recibió la atención que esperaba?" : 2,
    "¿El lugar estaba limpio?" : 4,
    "¿Se sintió cómodo durante la consulta?" : 5,
    "¿La explicación fue clara?" : 6,
    "¿El trato fue respetuoso?" : 7,
    "¿El personal fue profesional?" : 8,
    "¿Recomendaría el centro?" : 4
    },
    {
      encuestaNumero : 3,
    "¿Cómo calificaría el tiempo de espera?" : 1,
    "¿Está satisfecho con la atención recibida?" : 5,
    "¿El personal fue amable?" : 2,
    "¿Recibió la atención que esperaba?" : 2,
    "¿El lugar estaba limpio?" : 1,
    "¿Se sintió cómodo durante la consulta?" : 5,
    "¿La explicación fue clara?" : 6,
    "¿El trato fue respetuoso?" : 10,
    "¿El personal fue profesional?" : 8,
    "¿Recomendaría el centro?" : 2
    },
];

// Inicializa el mapa centrado en la Universidad Nacional de General Sarmiento
let map = L.map('map').setView([-34.5226, -58.7006], 15);

// Añade el mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

//Traigo los datos del usuario del localstorage
const rol = localStorage.getItem("rol");
const zonasAsignadas = JSON.parse(localStorage.getItem("zonasAsignadas"));
// Centros de salud cercanos con preguntas específicas
let zonas = [
  {
    nombre: "Malvinas Argentinas",
    centros: [
      {
        nombre: "Centro de Salud Los Polvorines",
        coords: [-34.5226, -58.7006]
      },
      {
        nombre: "Centro de Salud Tortuguitas",
        coords: [-34.527, -58.705]
      },
      {
        nombre: "Centro de Salud Pablo Nogués",
        coords: [-34.516, -58.694]
      }
    ]
  }, {
    nombre: "Tigre",
    centros: [
      {
        nombre: "Centro de Salud Ricardo Rojas",
        coords: [-34.4560136133868, -58.68332321656856]
      }
    ]
  }
];

// Crea marcadores y añade eventos de clic para cada centro
zonas.forEach(zona => {
  
  zona.centros.forEach(centro => {
    
    let marker = L.marker(centro.coords).addTo(map).bindPopup(centro.nombre);

    marker.on('click', function () {

      modalInstrucciones.innerHTML = `<p>2. Presione el boton "Ver Encuestas" para consultar las encuestas completadas.</p>`
      for(zona of zonasAsignadas){
        if(centro.nombre==zona){
          
          contenedorModal.classList.remove("ocultar");
          contenedorModal.classList.add("mostrar");
        }
      }

    });
  });
})

let botonSalir = document.querySelector(".btn-salir");
let contenedorModal = document.querySelector(".cont-modal")

botonSalir.addEventListener("click", ()=>{
  contenedorModal.classList.add("ocultar");
})

// Encuestas

let botonVerEncuestas = document.querySelector(".btn-verEncuestas");
let contenedorModalEncuestas = document.querySelector(".cont-modal-encuestas");
let botonVolver = document.querySelector(".btn-volver");
let botonVer = document.querySelectorAll(".btn-ver");
let numeroEncuestaIngresada = 0;
const divEncuesta = document.querySelector(".boxEncuesta");
const contenedorPreguntas = document.querySelector(".contenedorPreguntas");

botonVerEncuestas.addEventListener("click",()=>{
   modalInstrucciones.innerHTML = `3. Si quiere ver las respuestas de una encuesta en particular, presione en "Ver".`
  contenedorModal.classList.remove("mostrar");
  contenedorModalEncuestas.classList.add("mostrar");
})

botonVolver.addEventListener("click",()=>{
  contenedorModal.classList.add("mostrar");
  contenedorModalEncuestas.classList.remove("mostrar");
})

botonVer.forEach( (boton) => {
  boton.addEventListener("click",(event)=>{

  modalInstrucciones.classList.add('ocultar');
  numeroEncuestaIngresada = event.currentTarget.dataset.idEncuesta;
  let contador = 0;
  
 
  for(encuesta of encuestasHardcodeadas){ //Se usa para iterar y obtener el valor de la coleccion, no hace falta colocar el indice.

    if(encuesta.encuestaNumero == numeroEncuestaIngresada) {
      contenedorPreguntas.innerHTML = "";
      divEncuesta.classList.remove("ocultar");
      divEncuesta.classList.add("mostrar");

      for(pregunta in encuesta){
            if(pregunta != "encuestaNumero") {
                contador++;
             contenedorPreguntas.innerHTML += `<p>${contador}.${pregunta} <small>${encuesta[pregunta]}</small></p>`;
            }else{
              contenedorPreguntas.innerHTML = "";
              contenedorPreguntas.innerHTML += `<h1>Encuesta número ${numeroEncuestaIngresada}</h1>`
            }
        }
    }
    contador = 0;
  };
  
  const botonX= document.querySelector(".btn-x");
  botonX.addEventListener("click",()=>{
    divEncuesta.classList.remove("mostrar");
    divEncuesta.classList.add("ocultar");
  }
  );
});
}
);

function calcularPromedios(encuestas) {
  const totalRespuestas = {};
  const cantidadEncuestas = encuestas.length;

  encuestas.forEach(encuesta => {
      for (let pregunta in encuesta) {
          if (pregunta !== 'encuestaNumero') {
              totalRespuestas[pregunta] = (totalRespuestas[pregunta] || 0) + encuesta[pregunta];
          }
      }
  });

  for (let pregunta in totalRespuestas) {
      totalRespuestas[pregunta] = totalRespuestas[pregunta] / cantidadEncuestas;
  }

  return totalRespuestas;
}


const promedios = calcularPromedios(encuestasHardcodeadas);

const ctx = document.getElementById('myPieChart').getContext('2d');
const myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
      labels: Object.keys(promedios),
      datasets: [{
          label: 'Calificaciones Promedio',
          data: Object.values(promedios),
          backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0'
          ],
          hoverOffset: 4
      }]
  },
  options: {
      responsive: true,
      plugins: {
          legend: {
              position: 'top',
          },
          title: {
              display: true,
              text: 'Calificaciones Promedio de Encuestas'
          }
      }
  }
});

const botonXReportes = document.getElementById("botonX-reportes");
const reportes = document.querySelector(".reportes");

const contenedorReportes = document.querySelector(".contenedor-reportes");


reportes.addEventListener("click",()=>{
  contenedorReportes.classList.remove("ocultar");
  contenedorReportes.classList.add("mostrar");
});
botonXReportes.addEventListener("click",()=>{
  contenedorReportes.classList.add("ocultar");
});