const modal = document.querySelector(".modal");

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