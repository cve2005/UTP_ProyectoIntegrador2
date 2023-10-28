import axios from "axios";

const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/items/'
});

//listar empresa
// conexApi.get(`empresa`).then((res) => {
//   const data = res.data.data;
//   const tableBody = document.getElementById("listarCotizacionesCliente");
//   tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar contenido

//   data.forEach((element) => {
//     const row = document.createElement("tr");

//     row.innerHTML = `
//             <td>${element.emp_id}</td>
//             <td>${element.emp_razon_social}</td>
//             <td>${element.emp_direccion}</td>
//             <td>${element.emp_telefono}</td>
//             <td>${element.emp_ruc}</td>
//             <td>
//             <i class="nav-icon fas fa-solid fa-file-invoice"></i>
//             <i class="nav-icon fas fa-solid fa-pen"></i>
//             <i class="nav-icon fas fa-solid fa-file-pdf"></i>
//             </td>
//         `;
//     tableBody.appendChild(row);

//   })
//     .catch((error) => {
//       console.error('Hubo un error:', error);
//     });
// });




//listar usuarios
async function cargarUsuariosAdmin() {
  conexApi.get(`usuario`).then((res) => {
    const data = res.data.data;
    const tableBody = document.getElementById("listarUsuariosAdmin");
    tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar contenido
    console.log(data)
    data.forEach((element) => {
      const row = document.createElement("tr");

      row.innerHTML = `
              <td>${element.usu_id}</td>
              <td>${element.usu_nombre}</td>
              <td>${element.usu_apellido}</td>
              <td>${element.usu_rol}</td>
              <td>
                          <i class="nav-icon fas fa-solid fa-file-invoice"></i>
                          <i class="nav-icon fas fa-solid fa-pen"></i>
                          <i class="nav-icon fas fa-solid fa-file-pdf"></i>
                          </td>
          `;
      tableBody.appendChild(row);

    })
    // .catch((error) => {
    //   console.error('Hubo un error:', error);
    // });
  });
}

window.addEventListener('load', function () {
  if (window.location.href.includes("listarusuariosadm.html")) {
    cargarUsuariosAdmin();
  }
  //else if (window.location.href.includes("2.html")) {
  //     onPageLoad2();
  // }
});