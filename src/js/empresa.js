import axios from "axios";

const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/items/'
});

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

let url = new URL(window.location.href);

// Usar URLSearchParams para obtener el valor de 'miVariable'
let id = url.searchParams.get("id");




  const nombreSesion = document.getElementById('nombreSesion');
  nombreSesion.textContent = userInfo.cna_user.usu_nombre;



//Buscar empresa por ruc
const buscarButton = document.getElementById('btnBuscarEmpresa')
buscarButton.addEventListener('click', () => {
  const ruc = document.querySelector('#fruc').value;
  //axios.get(`https://cna-cms.onrender.com/items/empresa?filter[emp_ruc]=${ruc}`).then((res) => {
  conexApi.get(`empresa?filter[emp_ruc]=${ruc}`).then((res) => {
    const empresa = res.data.data[0]
    console.log(empresa.emp_ruc)
    //console.log(emp_ruc)
    document.getElementById('frazonSocial').value = empresa.emp_razon_social
    document.getElementById('fruc').value = empresa.emp_ruc
    document.getElementById('ftelefonoEmpresa').value = empresa.emp_telefono
    document.getElementById('fusu_direccion').value = empresa.emp_direccion
    document.getElementById('fidEmpresa').value = empresa.emp_id
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
});





//1 administrador
//2 vendedor
//3 Operativo
//4 contador
//5 cliente

//Agregar usuario
const agregarUsuarioButton = document.getElementById('btnRegistrarUsuario')
agregarUsuarioButton.addEventListener('click', () => {
  const fusu_nombre = document.getElementById('fusu_nombre').value;
  const fid_empresa = document.getElementById('fidEmpresa').value;
  const fusu_apellido = document.getElementById('fusu_apellido').value;
  const fusu_dni = document.getElementById('fusu_dni').value;
  const fusu_email = document.getElementById('fusu_email').value;
  const fusu_contrasena = document.getElementById('fusu_dni').value;
  //const fusu_contrasena = document.getElementById('fusu_contrasena').value;
  const fusu_telefono = document.getElementById('fusu_telefono').value;
  const fusu_direccion = document.getElementById('fusu_direccion').value;
  //const fusu_rol =5;
  const fusu_rol = document.getElementById('selectRolUsuario').value;
  //const fusu_comision =document.getElementById('fusu_comision').value;
  const fusu_comision = 0;


  const data = {
    usu_nombre: fusu_nombre,
    emp_id: fid_empresa,
    usu_apellido: fusu_apellido,
    usu_dni: fusu_dni,
    usu_email: fusu_email,
    usu_contrasena: fusu_contrasena,
    usu_telefono: fusu_telefono,
    usu_direccion: fusu_direccion,
    usu_rol: fusu_rol,
    usu_comision: fusu_comision
  }
  console.log(data)

  conexApi.post(`usuario`, data).then((res) => {
    console.log('Se agrego correctamente los datos')
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
});

//Buscar usuario

const buscarUsuarioButton = document.getElementById('btnBuscarUsuario')
buscarUsuarioButton.addEventListener('click', () => {
  const dni = document.getElementById('fusu_dni').value;
  conexApi.get(`usuario?filter[usu_dni]=${dni}`).then((res) => {
    const cliente = res.data.data[0]
    document.getElementById('fusu_nombre').value = cliente.usu_nombre;
    document.getElementById('fusu_apellido').value = cliente.usu_apellido;
    document.getElementById('fusu_dni').value = cliente.usu_dni;
    document.getElementById('fusu_email').value = cliente.usu_email;
    document.getElementById('fusu_telefono').value = cliente.usu_telefono;
    document.querySelector('#fusu_contrasena').value = cliente.usu_contrasena;
    document.querySelector('#fusu_direccion').value = cliente.usu_direccion;
    document.querySelector('#selectRolUsuario').value = cliente.usu_rol;
    document.querySelector('#fusu_comision').value = cliente.usu_comision
    document.getElementById('fidEmpresa').value = cliente.emp_id;
    document.getElementById('fidCliente').value = cliente.usu_id


  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
});

//Buscar cliente y empresa
const buscarClienteButton = document.getElementById('btnBuscarCliente')
buscarClienteButton.addEventListener('click', () => {
  const dni = document.getElementById('fusu_dni').value;
  conexApi.get(`usuario?filter[usu_dni]=${dni}`).then((res) => {
    const cliente = res.data.data[0]
    document.getElementById('fusu_nombre').value = cliente.usu_nombre;
    document.getElementById('fusu_apellido').value = cliente.usu_apellido;
    document.getElementById('fusu_dni').value = cliente.usu_dni;
    document.getElementById('fusu_email').value = cliente.usu_email;
    document.getElementById('fusu_telefono').value = cliente.usu_telefono;
    document.getElementById('fidEmpresa').value = cliente.emp_id;
    const idEmpresa = cliente.emp_id;
    buscarEmpresaId(idEmpresa)
    document.getElementById('fidcliente').value = cliente.usu_id
    console.log(document.getElementById('fidcliente').value)

  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
});

//buscar empresa por id
function buscarEmpresaId(id) {
  conexApi.get(`empresa?filter[emp_id]=${id}`).then((res) => {
    const empresa = res.data.data[0]
    console.log(empresa)
    document.getElementById('frazonSocial').value = empresa.emp_razon_social
    document.getElementById('fruc').value = empresa.emp_ruc
    document.getElementById('fusu_telefono').value = empresa.emp_telefono
    document.getElementById('fusu_direccion').value = empresa.emp_direccion
    document.getElementById('fidEmpresa').value = empresa.emp_id
  })
    .catch((error) => {
      console.error('Hubo un error en la empresa:', error);
    });
}

//Actualizar cliente
const actualizarClienteButton = document.getElementById('btnAgregarCliente')
actualizarClienteButton.addEventListener('click', () => {
  const idCliente = document.getElementById('fidcliente').value
  const fusu_nombre = document.getElementById('fusu_nombre').value;
  const fusu_apellido = document.getElementById('fusu_apellido').value;
  const fusu_email = document.getElementById('fusu_email').value;
  const fusu_telefono = document.getElementById('fusu_telefono').value;

  const data = {
    usu_nombre: fusu_nombre,
    usu_apellido: fusu_apellido,
    usu_email: fusu_email,
    usu_telefono: fusu_telefono,
  }

  console.log(data)

  conexApi.patch(`usuario/${idCliente}`, data).then((res) => {
    console.log(res)
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
});



//Actualiza Usuario

const actualizarUsuarioButton = document.getElementById('btnActualizarUsuario')
actualizarUsuarioButton.addEventListener('click', () => {
  const idCliente = document.getElementById('fidCliente').value
  const fusu_dni = document.getElementById('fusu_dni').value
  const fusu_nombre = document.getElementById('fusu_nombre').value;
  const fusu_apellido = document.getElementById('fusu_apellido').value;
  const fusu_email = document.getElementById('fusu_email').value;
  const fusu_contrasena = document.getElementById('fusu_contrasena').value;
  const fusu_telefono = document.getElementById('fusu_telefono').value;
  const fusu_direccion = document.getElementById('fusu_direccion').value;
  const fusu_rol = document.getElementById('selectRolUsuario').value;
  const fusu_comision = document.getElementById('fusu_comision').value;

  const data = {
    usu_nombre: fusu_nombre,
    usu_dni:fusu_dni,
    usu_apellido: fusu_apellido,
    usu_email: fusu_email,
    usu_contrasena: fusu_contrasena,
    usu_telefono: fusu_telefono,
    usu_direccion: fusu_direccion,
    usu_rol: fusu_rol,
    usu_comision: fusu_comision
  }

  console.log(data)

  conexApi.patch(`usuario/${idCliente}`, data).then((res) => {
    console.log(res)
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
});


async function cargarEditarUsuario() {
  conexApi.get(`usuario?filter[usu_id]=${id}`).then((res) => {
    console.log(res)
    const usuario = res.data.data[0]
    console.log(usuario)
    

    document.getElementById('fidCliente').value = usuario.usu_id
    document.getElementById('fusu_dni').value = usuario.usu_dni
    document.getElementById('fusu_nombre').value = usuario.usu_nombre
    document.getElementById('fusu_apellido').value = usuario.usu_apellido
    document.getElementById('fusu_email').value = usuario.usu_email
    document.getElementById('fusu_contrasena').value = usuario.usu_contrasena
    document.getElementById('fusu_telefono').value = usuario.usu_telefono
    document.getElementById('fusu_direccion').value = usuario.usu_direccion
    document.getElementById('selectRolUsuario').value = usuario.usu_rol
    document.getElementById('fusu_comision').value = usuario.usu_comision

  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
}


window.addEventListener('load', function () {
  if (window.location.href.includes('nuevo-usuario.html')) {
    //cargarNombre();
  } if (window.location.href.includes('adm-editar-usuario.html')) {
    cargarEditarUsuario();
  }
});







