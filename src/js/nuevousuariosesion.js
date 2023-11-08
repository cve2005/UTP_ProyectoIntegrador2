import axios from "axios";

const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/'
});



// "id": "9682d972-c050-482b-bf1e-5b3db6653f12",
// "name": "Administrator",

// "id": "140de75d-8d7c-47e3-8ba9-f7e60cdb3ba4",
// "name": "Vendedor",

// "id": "55f783e6-5f39-4966-bec6-8b71d3631075",
// "name": "Operativo",

// "id": "afdc94bb-c280-400c-b3b7-85a6158a0201",
// "name": "Contador",

// "id": "dbb74e25-bea2-4a87-a337-1c971307c3bf",
// "name": "Cliente",


//Actualizar cliente
const agregarUsuarioSButton = document.getElementById('btnRegistrarUsuarioSesion')
agregarUsuarioSButton.addEventListener('click', () => {
  const fusu_nombre = document.getElementById('fusu_nombre').value;
  const fusu_apellido = document.getElementById('fusu_apellido').value;
  const fusu_email = document.getElementById('fusu_email').value;
  const fusu_telefono = document.getElementById('fusu_telefono').value;
  const fusu_rol = document.getElementById('selectRolUsuario').value;
  const fusu_dni =document.getElementById('fusu_dni').value;
  const fusu_contrasena =document.getElementById('fusu_contrasena').value;
  const fusu_contrasena2 =document.getElementById('fusu_contrasena2').value;
  const fusu_comision =document.getElementById('fusu_comision').value;
  

  const data = {
    first_name: fusu_nombre,
    last_name: fusu_apellido,
    email: fusu_email,
    password:fusu_contrasena,
    usu_telefono: fusu_telefono,
    status: "active",
    role:fusu_rol,
    dni:fusu_dni,
    comision:fusu_comision
   

    
// "first_name": "Yarango",
// "last_name": null,
// "email": "correo@prueba.com",
// "password": "**********",
// "status": "active",
// "role": "140de75d-8d7c-47e3-8ba9-f7e60cdb3ba4",
// "dni": null
// comision:fusu_comision
  }

  if(fusu_contrasena==fusu_contrasena2){
    console.log(data)
  conexApi.post(`users`, data).then((res) => {
    console.log(res)
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
  }else{
    alert('las contraseñas no coinciden')
  }


});
