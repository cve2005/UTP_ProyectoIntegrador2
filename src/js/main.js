
const userInfo =  JSON.parse(sessionStorage.getItem('userInfo'));
console.log(userInfo);


async function cargarSesion(){
    alert(userInfo.cna_user.usu_id)
}


window.addEventListener('load', function () {
    if (window.location.href.includes('nuevo-usuario.html')) {
        cargarSesion();
    }
});
