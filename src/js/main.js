
const userInfo =  JSON.parse(sessionStorage.getItem('userInfo'));

const nombreSesion = document.getElementById('nombreSesion');
nombreSesion.textContent = userInfo.cna_user.usu_nombre

const tipoRol = document.getElementById('estadoSesion');
tipoRol.textContent = userInfo.cna_user.usu_rol ;


