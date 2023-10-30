import axios from "axios";

const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/items/'
});

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
    console.log(res.data.data)
    console.log(res.data)
    console.log(res)


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
  const fusu_rol =5;

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
