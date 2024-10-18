// Inicializa el mapa centrado en la Universidad Nacional de General Sarmiento
var map = L.map('map').setView([-34.5226, -58.7006], 15);

// Añade el mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

//Traigo los datos del usuario del localstorage
const rol = localStorage.getItem("rol");

console.log(rol);

// Centros de salud cercanos con preguntas específicas
var centros = [
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
];

// Crea marcadores y añade eventos de clic para cada centro
centros.forEach(function (centro) {
  var marker = L.marker(centro.coords).addTo(map).bindPopup(centro.nombre);

  marker.on('click', function () {
    console.log(rol == "cliente");
    console.log(completoEncuesta == false);
    if (centroAtencion == centro.nombre && completoEncuesta == "false" && rol == "cliente") {
      mostrarPreguntas(centro.preguntas);
    } else if (completoEncuesta == "true") {
      alert("Ya completo la encuesta.");
    } else {
      alert("No se atendio en este centro de salud");
    }

  });
});