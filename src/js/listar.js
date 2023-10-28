import axios from 'axios';

const EDITAR = 'editar';
const VER = 'ver';
const DESCARGAR = 'descargar';

const conexApi = axios.create({
    baseURL: 'https://cna-cms.onrender.com/items/',
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
        const tableBody = document.getElementById('listarUsuariosAdmin');
        tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar contenido
        console.log(data);
        data.forEach((element) => {
            const row = document.createElement('tr');

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
        });
        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        // });
    });
}

window.addEventListener('load', function () {
    if (window.location.href.includes('listarusuariosadm.html')) {
        cargarUsuariosAdmin();
    }
    //else if (window.location.href.includes("2.html")) {
    //     onPageLoad2();
    // }
});

//listar cotizaciones
async function cargarCotizacionesVendedor() {
    conexApi.get(`documento`).then((res) => {
        const data = res.data.data;
        const tableBody = document.getElementById('listarCotizacionesVendedor');
        tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar contenido
        console.log(data);
        data.forEach((element) => {
            const row = document.createElement('tr');
            row.appendChild(createItem(element.doc_id));
            row.appendChild(createItem(element.doc_fecha));
            row.appendChild(createItem(element.cliente_id));
            row.appendChild(createItem(element.cliente_id));
            row.appendChild(createItem(element.est_id));
            //columena acciones
            const acciones = document.createElement('td');
            acciones.appendChild(createItemAcction(element.doc_id, VER));
            acciones.appendChild(createItemAcction(element.doc_id, DESCARGAR));
            acciones.appendChild(createItemAcction(element.doc_id, EDITAR));
            row.appendChild(acciones);
    

            /* row.innerHTML = `
              <td>${element.doc_id}</td>
              <td>${element.doc_fecha}</td>
              <td>${element.cliente_id}</td>
              <td>${element.cliente_id}</td>
              <td>${element.est_id}</td>
              <td>
                          <i class="nav-icon fas fa-solid fa-file-invoice"></i>
                          
                          <i class="nav-icon fas fa-solid fa-file-pdf"></i>
                          </td>
          `;*/
            tableBody.appendChild(row);
        });
        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        // });
    });
}

const createItem = (value) => {
    const td = document.createElement('td');
    td.innerText = value;
    return td;
};

const createItemAcction = (doc_id, type) => {
    
    const icon = document.createElement('i');
    const button = document.createElement('button');
    if (type === EDITAR) {
        button.addEventListener('click', () => {
          //alert('editar'  + doc_id);  
          window.location.href = `editar_cot.html?id=${doc_id}`;
        });
        icon.classList.add('nav-icon', 'fas', 'fa-solid', 'fa-pen');
    }
    if (type === VER) {
        button.addEventListener('click', () => {
          alert('ver'  + doc_id);
            //window.location.href = `editar_cot.html?id=${doc_id}`;
        });
        icon.classList.add('nav-icon', 'fas', 'fa-solid', 'fa-file-invoice');
    }
    if (type === DESCARGAR) {
        button.addEventListener('click', () => {

          alert('descargar'  + doc_id);
            //window.location.href = `editar_cot.html?id=${doc_id}`;
        });
        icon.classList.add('nav-icon', 'fas', 'fa-solid', 'fa-file-pdf');
    }

    button.appendChild(icon);
  
    return button;
};

//total cotizado=suma de los servicios

window.addEventListener('load', function () {
    if (window.location.href.includes('cotizaciones-ven.html')) {
        cargarCotizacionesVendedor();
    }
    //else if (window.location.href.includes("2.html")) {
    //     onPageLoad2();
    // }
});


