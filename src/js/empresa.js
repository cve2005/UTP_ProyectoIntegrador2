import axios from "axios";
//Buscar empresa por ruc
const buscarButton =document.getElementById('btnBuscarEmpresa')
buscarButton.addEventListener('click', () => {
    const ruc = document.querySelector('#fruc').value;
    axios.get(`https://cna-cms.onrender.com/items/empresa?filter[emp_ruc]=${ruc}`).then((res) => {
       const empresa=res.data.data[0]
       console.log(empresa.emp_ruc)
       //console.log(emp_ruc)
        document.getElementById('frazonSocial').value=empresa.emp_razon_social
        document.getElementById('fruc').value=empresa.emp_ruc
        document.getElementById('ftelefonoEmpresa').value=empresa.emp_telefono
        document.getElementById('fdireccionEmpresa').value=empresa.emp_direccion
        document.getElementById('fidEmpresa').value=empresa.emp_id

    })
    .catch((error) => {
        console.error('Hubo un error:', error);
    });
  });


//Agregar empresa
  const agregarButton =document.getElementById('btnAgregarEmpresa')
  agregarButton.addEventListener('click', () => {
    const ruc = document.querySelector('#fruc').value;
    const razonSocial = document.querySelector('#frazonSocial').value;
    const telefono = document.querySelector('#ftelefonoEmpresa').value;
    const direccion = document.querySelector('#fdireccionEmpresa').value;

    const data={
        emp_ruc:ruc,
        emp_razon_social: razonSocial,
        emp_direccion:direccion,
        emp_telefono:telefono
    }

    axios.post(`https://cna-cms.onrender.com/items/empresa`,data).then((res) => {
      console.log('Se agrego correctamente los datos')
      console.log(res.data.data)
      console.log(res.data)
      console.log(res)


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
  const agregarUsuarioButton =document.getElementById('btnRegistrarUsuario')
  agregarUsuarioButton.addEventListener('click', () => {
    const fusu_nombre = document.querySelector('#fusu_nombre').value;
    const fid_empresa = document.querySelector('#fidEmpresa').value;
    const fusu_apellido = document.querySelector('#fusu_apellido').value;
    const fusu_dni = document.querySelector('#fusu_dni').value;
    const fusu_email = document.querySelector('#fusu_email').value;
    const fusu_contrasena = document.querySelector('#fusu_dni').value;
    const fusu_telefono = document.querySelector('#fusu_telefono').value;
    const fusu_direccion = document.querySelector('#fdireccionEmpresa').value;
    const fusu_rol = 5;
    const fusu_comision = 0;


    const data={
        usu_nombre:fusu_nombre,
        emp_id: fid_empresa,
        usu_apellido:fusu_apellido,
        usu_dni:fusu_dni,
        usu_email:fusu_email,
        usu_contrasena:fusu_contrasena,
        usu_telefono:fusu_telefono,
        usu_direccion:fusu_direccion,
        usu_rol:fusu_rol,
        usu_comision:fusu_comision
    }
    console.log(data)

    axios.post(`https://cna-cms.onrender.com/items/usuario`,data).then((res) => {
      console.log('Se agrego correctamente los datos')
      console.log(res.data.data)
      console.log(res.data)
      console.log(res)

    })
    .catch((error) => {
        console.error('Hubo un error:', error);
    });
  });



