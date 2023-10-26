import axios from "axios";

const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/items/'
});

//listar empresa
conexApi.get(`empresa`).then((res) => {
  const data = res.data.data;
  const tableBody = document.getElementById("listarCotizacionesCliente");
  tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar contenido

  data.forEach((element) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${element.emp_id}</td>
            <td>${element.emp_razon_social}</td>
            <td>${element.emp_direccion}</td>
            <td>${element.emp_telefono}</td>
            <td>${element.emp_ruc}</td>
            <td>
            <i class="nav-icon fas fa-solid fa-file-invoice"></i>
            <i class="nav-icon fas fa-solid fa-pen"></i>
            <i class="nav-icon fas fa-solid fa-file-pdf"></i>
            </td>
        `;
    tableBody.appendChild(row);

  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
});