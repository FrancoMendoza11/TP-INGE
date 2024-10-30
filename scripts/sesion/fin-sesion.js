const finSesion = document.querySelector('#fin-sesion');

finSesion.addEventListener('click', () => {
  localStorage.clear();
  window.location.href = "./index.html"
})