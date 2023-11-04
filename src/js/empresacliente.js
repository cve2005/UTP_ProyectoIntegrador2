import axios from "axios";

const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/items/'
});

let url = new URL(window.location.href);

// Usar URLSearchParams para obtener el valor de 'miVariable'
let id = url.searchParams.get("id");

//Agregar empresa
const agregarButton = document.getElementById('btnAgregarEmpresa')
agregarButton.addEventListener('click', () => {
  const ruc = document.getElementById('fruc').value;
  const razonSocial = document.getElementById('frazonSocial').value;
  const telefono = document.getElementById('fusu_telefono').value;
  const direccion = document.getElementById('fusu_direccion').value;

  const data = {
    emp_ruc: ruc,
    emp_razon_social: razonSocial,
    emp_direccion: direccion,
    emp_telefono: telefono
  }

  conexApi.post(`empresa`, data).then((res) => {
    console.log('Se agrego correctamente los datos')
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
});

//Buscar empresa por ruc
const buscarButton = document.getElementById('btnBuscarEmpresa')
buscarButton.addEventListener('click', () => {
  const ruc = document.querySelector('#fruc').value;
  //axios.get(`https://cna-cms.onrender.com/items/empresa?filter[emp_ruc]=${ruc}`).then((res) => {
  conexApi.get(`empresa?filter[emp_ruc]=${ruc}`).then((res) => {
    const empresa = res.data.data[0]
    console.log(empresa)
    console.log(empresa.emp_ruc)
    //console.log(emp_ruc)
    document.getElementById('frazonSocial').value = empresa.emp_razon_social
    document.getElementById('fruc').value = empresa.emp_ruc
    document.getElementById('fusu_telefono').value = empresa.emp_telefono
    document.getElementById('fusu_direccion').value = empresa.emp_direccion
    document.getElementById('fidEmpresa').value = empresa.emp_id
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
});


//Agregar cliente
const agregarUsuarioButton = document.getElementById('btnRegistrarUsuario')
agregarUsuarioButton.addEventListener('click', () => {
  const fusu_nombre = document.getElementById('fusu_nombre').value;
  //const fid_empresa = document.getElementById('fidEmpresa').value;
  const fusu_apellido = document.getElementById('fusu_apellido').value;
  const fusu_dni = document.getElementById('fusu_dni').value;
  const fusu_email = document.getElementById('fusu_email').value;

  //contraseña el dni
  const fusu_contrasena = document.getElementById('fusu_dni').value;
  //const fusu_contrasena = document.getElementById('fusu_contrasena').value;
  const fusu_telefono = document.getElementById('fusu_telefono').value;
  const fusu_direccion = document.getElementById('fusu_direccion').value;
  const femp_id =document.getElementById('fidEmpresa').value

  const fusu_rol =5;

  //const fusu_comision =document.getElementById('fusu_comision').value;
  //const fusu_comision = 0;


  const data = {
    usu_nombre: fusu_nombre,
    usu_apellido: fusu_apellido,
    usu_dni: fusu_dni,
    usu_email: fusu_email,
    usu_contrasena: fusu_contrasena,
    usu_telefono: fusu_telefono,
    usu_direccion: fusu_direccion,
    usu_rol: fusu_rol,
    emp_id:femp_id
    //usu_comision: fusu_comision
  }
  console.log(data)

  conexApi.post(`usuario`, data).then((res) => {
    console.log(res)
    console.log('Se agrego correctamente los datos')
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
});

async function cargarEditarUsuarios() {
  conexApi.get(`usuario?filter[usu_id]=${id}&fields=*.*`).then((res) => {
    const usuario = res.data.data[0]
    console.log(usuario)
    
    document.getElementById('frazonSocial').value = usuario.emp_id.emp_razon_social
    document.getElementById('fruc').value = usuario.emp_id.emp_ruc
    document.getElementById('fusu_telefono').value = usuario.emp_id.emp_telefono
    document.getElementById('fusu_direccion').value = usuario.emp_id.emp_direccion
    document.getElementById('fidEmpresa').value = usuario.emp_id.emp_id
   // document.getElementById('fidCliente').value = usuario.usu_id
    document.getElementById('fusu_dni').value = usuario.usu_dni
    document.getElementById('fusu_nombre').value = usuario.usu_nombre
    document.getElementById('fusu_apellido').value = usuario.usu_apellido
    document.getElementById('fusu_email').value = usuario.usu_email
    //document.getElementById('fusu_contrasena').value = usuario.usu_contrasena
    document.getElementById('fusu_celular').value = usuario.usu_telefono
    document.getElementById('fusu_direccion').value = usuario.usu_direccion
   // document.getElementById('selectRolUsuario').value = usuario.usu_rol
   // document.getElementById('fusu_comision').value = usuario.usu_comision

  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
}


//Editar cliente
const editarClienteButton = document.getElementById('btnActualizarUsuario')
editarClienteButton.addEventListener('click', () => {
  const fusu_nombre = document.getElementById('fusu_nombre').value;
  //const fid_empresa = document.getElementById('fidEmpresa').value;
  const fusu_apellido = document.getElementById('fusu_apellido').value;
  const fusu_dni = document.getElementById('fusu_dni').value;
  const fusu_email = document.getElementById('fusu_email').value;
  const femp_id =document.getElementById('fidEmpresa').value
  const fusu_telefono = document.getElementById('fusu_telefono').value;

  //contraseña el dni
  // const fusu_contrasena = document.getElementById('fusu_dni').value;
  // //const fusu_contrasena = document.getElementById('fusu_contrasena').value;
  // const fusu_direccion = document.getElementById('fusu_direccion').value;
  // const fusu_rol =5;
  // const fusu_comision =document.getElementById('fusu_comision').value;
  // //const fusu_comision = 0;


  const data = {
    usu_nombre: fusu_nombre,
    usu_apellido: fusu_apellido,
    usu_dni: fusu_dni,
    usu_email: fusu_email,
    // usu_contrasena: fusu_contrasena,
    usu_telefono: fusu_telefono,
    // usu_direccion: fusu_direccion,
    // usu_rol: fusu_rol,
    emp_id:femp_id
    //usu_comision: fusu_comision
  }
  console.log(data)

  conexApi.patch(`usuario/${id}`, data).then((res) => {
    console.log(res)
    console.log('Se agrego correctamente los datos')
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
});

window.addEventListener('load', function () {
  if (window.location.href.includes('editar-usuario.html')) {
    cargarEditarUsuarios();
  }
});

