
const userInfo =  JSON.parse(sessionStorage.getItem('userInfo'));

const nombreSesion = document.getElementById('nombreSesion');
nombreSesion.textContent = userInfo.first_name

const tipoRol = document.getElementById('estadoSesion');
tipoRol.textContent = userInfo.role.name ;


