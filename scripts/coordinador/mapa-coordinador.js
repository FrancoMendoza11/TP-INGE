const modal = document.querySelector(".modal");

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
const zonasAsignadas = localStorage.getItem("zonasAsignadas");

console.log(rol);
console.log(zonasAsignadas);

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
  console.log(zona.nombre);
  
  zona.centros.forEach(centro => {
    console.log(centro.nombre);
    
    let marker = L.marker(centro.coords).addTo(map).bindPopup(centro.nombre);

    marker.on('click', function () {

      /* ACOMODAR CUANDO ESTEN LAS ZONAS ASIGNADAS */
      // Valida que el centro esté en la zona asignada al coordinador
     /* if (zona.nombre !== zonasAsignadas) {
        alert("Centro de salud perteneciente a una zona no asignada.");
      }*/
      // Carga el modal con los datos
      if(centro.nombre=="Centro de Salud Los Polvorines"){
        contenedorModal.classList.remove("ocultar");
        contenedorModal.classList.add("mostrar");
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

console.log(numeroEncuestaIngresada);

botonVerEncuestas.addEventListener("click",()=>{
  contenedorModal.classList.remove("mostrar");
  contenedorModalEncuestas.classList.add("mostrar");
})

botonVolver.addEventListener("click",()=>{
  contenedorModal.classList.add("mostrar");
  contenedorModalEncuestas.classList.remove("mostrar");
})

botonVer.forEach( (boton) => {
  boton.addEventListener("click",(event)=>{

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
    console.log("hola");
    divEncuesta.classList.remove("mostrar");
    divEncuesta.classList.add("ocultar");
  }
  );
});
}
);

  