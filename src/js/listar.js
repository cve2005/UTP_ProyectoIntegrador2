import axios from 'axios';

const EDITAR = 'editar';
const VER = 'ver';
const DESCARGAR = 'descargar';

const conexApi = axios.create({
    baseURL: 'https://cna-cms.onrender.com/',
});

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));


const idSesion = userInfo.id
const rolSesion = userInfo.role.name
console.log(rolSesion)
console.log(idSesion)
// "id": "9682d972-c050-482b-bf1e-5b3db6653f12",
// "name": "Administrator",

// "id": "140de75d-8d7c-47e3-8ba9-f7e60cdb3ba4",
// "name": "Vendedor",Listar

// "id": "55f783e6-5f39-4966-bec6-8b71d3631075",
// "name": "Operativo",

// "id": "afdc94bb-c280-400c-b3b7-85a6158a0201",
// "name": "Contador",

// "id": "dbb74e25-bea2-4a87-a337-1c971307c3bf",
// "name": "Cliente",
const roles = {
    ["9682d972-c050-482b-bf1e-5b3db6653f12"]: 'Administrador',
    ["140de75d-8d7c-47e3-8ba9-f7e60cdb3ba4"]: 'Vendedor',
    ["55f783e6-5f39-4966-bec6-8b71d3631075"]: 'Operativo',
    ["afdc94bb-c280-400c-b3b7-85a6158a0201"]: 'Contador',
    ["dbb74e25-bea2-4a87-a337-1c971307c3bf"]: 'Cliente'
};

//listar todos los usuarios
async function cargarUsuariosAdmin(table) {
    conexApi.get(`users`).then((res) => {
        const data = res.data.data;
        console.log(data);

        const dataTable = [];
        data.forEach((element) => {
            const row = [];
            row.push(element.id);
            row.push(element.dni)
            row.push(element.first_name + ' ' + element.last_name);
            row.push(element.email);
            row.push(element.tel_usu_dir);
            row.push(roles[element.role]);
            row.push('element.usu_correo');

            dataTable.push(row);

        });
        table.rows.add(dataTable).draw();


        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        // });
    });
}



//listar operaciones del vendedor
async function cargarOperacionesVendedor(id, filtro,table) {

    // `documento?filter[est_id]=2&fields=*.*.*`
    const consulta =
        filtro === 'cliente'
            ? `items/documento?filter[est_id][_eq]=2&filter[usu_dir][_eq]=${id}&fields=*.*.*`
            : filtro === 'vendedor'
                ? `items/documento?filter[est_id][_eq]=2&filter[vendedor_id_dir][_eq]=${id}&fields=*.*.*`
                : `items/documento?filter[est_id]=2&fields=*.*.*`;

    conexApi.get(consulta).then((res) => {

            // row.appendChild(createItem(element.doc_id));
            // row.appendChild(createItem(element.doc_fecha));
            // row.appendChild(createItem(element.usu_dir.emp_id.emp_razon_social));
            // row.appendChild(createItem(element.esr_id.esr_nombre));
            // row.appendChild(createItem("-"));
            // row.appendChild(createItem("-"));
            // row.appendChild(createItem("-"));
            // //columena acciones
            // const url = "routing"


        const data = res.data.data;
        const dataTable = [];
        data.forEach((element) => {
            const row = [];
            row.push(element.doc_id);
            row.push(element.doc_fecha);
            row.push(element.usu_dir.emp_id.emp_razon_social);
            row.push(element.esr_id.esr_nombre);
            row.push("-");
            row.push("-");
            row.push("-");
            row.push('element.usu_correo');
            dataTable.push(row);
        });
        table.rows.add(dataTable).draw();
        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        // });
    });
}

//listar agentes tag_id=1
async function cargarAgentes() {
    conexApi.get(`items/agente?filter[tag_id]=1&fields=*.*`).then((res) => {
        const data = res.data.data;
        const tableBody = document.getElementById('listarAgentes');
        tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar contenido
        console.log(data);
        data.forEach((element) => {
            const row = document.createElement('tr');
            row.appendChild(createItem(element.age_id));
            row.appendChild(createItem(element.age_razon_social));
            row.appendChild(createItem(element.age_telefono));
            row.appendChild(createItem(element.age_correo));
            row.appendChild(createItem(element.age_nombre));
            row.appendChild(createItem(element.tag_id.tag_nombre));
            //columena acciones
            const url = "editar-agente"
            const acciones = document.createElement('td');
            // acciones.appendChild(createItemAcction(element.age_id, VER,url));
            // acciones.appendChild(createItemAcction(element.age_id, DESCARGAR,url));
            acciones.appendChild(createItemAcction(element.age_id, EDITAR, url));
            row.appendChild(acciones);
            tableBody.appendChild(row);
        });
        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        // });
    });
}

//listar shippers tag_id=1
async function cargarShippers() {
    conexApi.get(`items/agente?filter[tag_id]=2&fields=*.*`).then((res) => {
        const data = res.data.data;
        const tableBody = document.getElementById('listarShippers');
        tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar contenido
        console.log(data);
        data.forEach((element) => {
            const row = document.createElement('tr');
            row.appendChild(createItem(element.age_id));
            row.appendChild(createItem(element.age_razon_social));
            row.appendChild(createItem(element.age_telefono));
            row.appendChild(createItem(element.age_correo));
            row.appendChild(createItem(element.age_nombre));
            row.appendChild(createItem(element.tag_id.tag_nombre));
            //columena acciones
            const url = "editar-shipper"
            const acciones = document.createElement('td');
            // acciones.appendChild(createItemAcction(element.age_id, VER,url));
            // acciones.appendChild(createItemAcction(element.age_id, DESCARGAR,url));
            acciones.appendChild(createItemAcction(element.age_id, EDITAR, url));
            row.appendChild(acciones);
            tableBody.appendChild(row);
        });
        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        // });
    });
}



//tableCotizaciones id, filtro,
//listar cotizaciones vendedor
async function cargarCotizacionesVendedor( id,filtro,table) {
    // const url =id?`documento?filter[usu_dir]=${id}&fields=*.*.*`:`documento?fields=*.*.*`;
    const consulta =
        filtro === 'cliente'
            ? `items/documento?filter[usu_dir]=${id}&fields=*.*.*`
            : filtro === 'vendedor'
                ? `items/documento?filter[vendedor_id_dir]=${id}&fields=*.*.*`
                : 'items/documento?fields=*.*.*';
       // 'items/documento?fields=*.*.*'
    conexApi.get(consulta).then((res) => {
        const data = res.data.data;
        console.log(data)
        const dataTable = [];
        data.forEach((element) => {
            const row = [];
            row.push(element.doc_id);
            row.push(element.doc_fecha);
            row.push(element.usu_dir.first_name);
            row.push(element.doc_total_venta);
            row.push(element.usu_dir.emp_id.emp_razon_social);
             row.push(element.est_id.est_nombre);
            row.push('element.usu_correo');
            dataTable.push(row);
        });
        table.rows.add(dataTable).draw();


    });

}

//listar usuarios clientes = 5
async function cargarUsuarios(table) {
    conexApi.get(`users?filter[role]=dbb74e25-bea2-4a87-a337-1c971307c3bf`).then((res) => {
        const data = res.data.data;
        const dataTable = [];
        data.forEach((element) => {
            const row = [];
            row.push(element.id);
            row.push(element.dni);
            row.push(element.first_name);
            row.push(element.last_name);
            row.push(roles[element.role]);
            row.push('element.usu_correo');
            dataTable.push(row);
        });
        table.rows.add(dataTable).draw();
    });
}

async function cargarLiquidaciones(id,table) {
    // `liquidacion?fields=*.*.*.*`
    const consulta = id ? `items/liquidacion?filter[vendedor_id_dir]=${id}&fields=*.*.*.*` : `items/liquidacion?fields=*.*.*.*`;

    conexApi.get(consulta).then((res) => {
         const data = res.data.data;
        console.log(data);

        const dataTable = [];
        data.forEach((element) => {
            const row = [];
            row.push(element.doc_id.doc_id)
            row.push(element.liq_id);
            row.push(element.doc_id.usu_dir.emp_id.emp_razon_social);
            row.push("-");
            row.push(element.liq_rhe);
            row.push(element.liq_fecha);
            row.push('element.usu_correo');
            dataTable.push(row);
        });
        table.rows.add(dataTable).draw();


      
            // row.appendChild(createItem(element.liq_id));
            // row.appendChild(createItem(element.doc_id.doc_id));
            // //aqui nuevo
            // row.appendChild(createItem(element.doc_id.usu_dir.emp_id.emp_razon_social));
            // row.appendChild(createItem("-"));
            // row.appendChild(createItem(element.liq_rhe));
            // row.appendChild(createItem(element.liq_fecha));
            // //columena acciones
         

      
        // .catch((error) => {
        //   console.error('Hubo un error:', error);
    });

}

const createItem = (value) => {
    const td = document.createElement('td');
    td.innerText = value;
    return td;
};

const createItemAcction = (doc_id, type, url) => {

    const icon = document.createElement('i');
    const button = document.createElement('button');
    if (type === EDITAR) {
        button.addEventListener('click', () => {
            //alert('editar'  + doc_id);  
            window.location.href = url + `.html?id=${doc_id}`;
        });
        icon.classList.add('nav-icon', 'fas', 'fa-solid', 'fa-pen');
    }
    if (type === VER) {
        button.addEventListener('click', () => {
            alert('ver' + doc_id);
            //window.location.href = `editar_cot.html?id=${doc_id}`;
        });
        icon.classList.add('nav-icon', 'fas', 'fa-solid', 'fa-file-invoice');
    }
    if (type === DESCARGAR) {
        button.addEventListener('click', () => {

            alert('descargar' + doc_id);
            //window.location.href = `editar_cot.html?id=${doc_id}`;
        });
        icon.classList.add('nav-icon', 'fas', 'fa-solid', 'fa-file-pdf');
    }

    button.appendChild(icon);

    return button;
};

//total cotizado=suma de los servicios
$(document).ready(function () {
    if (window.location.href.includes('cotizaciones-ven.html')) {
        var table = $("#tableCotizaciones").DataTable({
            "data": [],
            "columns": [
                { "title": "Código" },
                { "title": "Fechas" },
                { "title": "Cliente" },
                { "title": "Total Cotizado" },
                { "title": "Empresa" },
                { "title": "Estado" },
                { "title": "Acciones" }
            ],
            "columnDefs": [
                {
                    "targets": -1, // Esto significa la última columna de la tabla
                    "data": null,
                    "defaultContent": "<button class='edit-btn'><i class='nav-icon fas fa-solid fa-pen'/></button>"
                }
            ],
            "responsive": true,
            "lengthChange": false,
            "autoWidth": false,
            "dom": 'Bfrtip',
            "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
        });


        $('#tableCotizaciones tbody').on('click', '.edit-btn', function () {
            var data = table.row($(this).parents('tr')).data();
            window.location.href = 'editar_cot' + `.html?id=${data[0]}`;
            console.log(data);
        });
        
        if (rolSesion === 'Administrator') {
            cargarCotizacionesVendedor(null,null,table);
        } else if (rolSesion === 'Cliente') {
            cargarCotizacionesVendedor(idSesion, 'cliente',table);
        } else if (rolSesion === 'Vendedor') {
            cargarCotizacionesVendedor(idSesion, 'vendedor',table);
        }
    }

    if (window.location.href.includes("operaciones-ven.html")) {
        var table = $("#tblOperaciones").DataTable({
            "data": [],
            "columns": [
                { "title": "Nro Doc" },
                { "title": "Fecha" },
                { "title": "Cliente" },
                { "title": "Estado" },
                { "title": "Detalle" },
                { "title": "Booking" },
                { "title": "Tracking" },
                { "title": "Acciones" }
                
            ],
            "columnDefs": [
                {
                    "targets": -1, // Esto significa la última columna de la tabla
                    "data": null,
                    "defaultContent": "<button class='edit-btn'><i class='nav-icon fas fa-solid fa-pen'/></button>"
                }
            ],
            "responsive": true,
            "lengthChange": false,
            "autoWidth": false,
            "dom": 'Bfrtip',
            "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
        });

        $('#tblOperaciones tbody').on('click', '.edit-btn', function () {
            var data = table.row($(this).parents('tr')).data();
            window.location.href = 'routing' + `.html?id=${data[0]}`;
            console.log(data);
        });


        if (rolSesion === 'Administrator' || rolSesion === 'Operativo') {
            cargarOperacionesVendedor(null,null,table);
        } else if (rolSesion === 'Cliente') {
            cargarOperacionesVendedor(idSesion, 'cliente',table);
        } else if (rolSesion === 'Vendedor') {
            cargarOperacionesVendedor(idSesion, 'vendedor',table);
        }
    }
    if (window.location.href.includes('listarusuariosadm.html')) {

        var table = $("#tablaUsuariosAdm").DataTable({
            "data": [],
            "columns": [
                { "title": "Código", visible: false },
                { "title": "Dni" },
                { "title": "Nombre" },
                { "title": "Correo" },
                { "title": "Teléfono" },
                { "title": "Rol" },
                { "title": "Acciones" }
            ],
            "columnDefs": [
                {
                    "targets": -1, // Esto significa la última columna de la tabla
                    "data": null,
                    "defaultContent": "<button class='edit-btn'><i class='nav-icon fas fa-solid fa-pen'/></button>"
                }
            ],
            "responsive": true,
            "lengthChange": false,
            "autoWidth": false,
            "dom": 'Bfrtip',
            "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
        });


        $('#tablaUsuariosAdm tbody').on('click', '.edit-btn', function () {
            var data = table.row($(this).parents('tr')).data();
            window.location.href = 'adm-editar-usuario' + `.html?id=${data[0]}`;
            console.log(data);
        });

        cargarUsuariosAdmin(table);
    }



    if (window.location.href.includes("listarusuarios.html")) {
        var table = $("#tblClientes").DataTable({
            "data": [],
            "columns": [
                { "title": "Código", visible: false },
                { "title": "DNI" },
                { "title": "Nombre" },
                { "title": "Apellido" },
                { "title": "Rol" },
                { "title": "Acciones" }
            ],
            "columnDefs": [
                {
                    "targets": -1, // Esto significa la última columna de la tabla
                    "data": null,
                    "defaultContent": "<button class='edit-btn'><i class='nav-icon fas fa-solid fa-pen'/></button>"
                }
            ],
            "responsive": true,
            "lengthChange": false,
            "autoWidth": false,
            "dom": 'Bfrtip',
            "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
        });

        $('#tblClientes tbody').on('click', '.edit-btn', function () {
            var data = table.row($(this).parents('tr')).data();
            window.location.href = 'editar-usuario' + `.html?id=${data[0]}`;
            console.log(data);
        });

        cargarUsuarios(table);
    }
    if (window.location.href.includes("listaragentes.html")) {
        cargarAgentes();
    }
    if (window.location.href.includes("listarshippers.html")) {
        cargarShippers();
    }
    if (window.location.href.includes("liquidaciones-ven.html")) {
        var table = $("#tblLiquidaciones").DataTable({
            "data": [],
            "columns": [
                { "title": "Nro Doc" },
                { "title": "Nro Liquidacion" },
                { "title": "Cliente" },
                { "title": "Documentos Drive" },
                { "title": "RHE" },
                { "title": "Fecha de pago" },
                { "title": "Acciones" }
            ],
            "columnDefs": [
                {
                    "targets": -1, // Esto significa la última columna de la tabla
                    "data": null,
                    "defaultContent": "<button class='edit-btn'><i class='nav-icon fas fa-solid fa-pen'/></button>"
                }
            ],
            "responsive": true,
            "lengthChange": false,
            "autoWidth": false,
            "dom": 'Bfrtip',
            "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
        });

        $('#tblLiquidaciones tbody').on('click', '.edit-btn', function () {
            var data = table.row($(this).parents('tr')).data();
            window.location.href = 'liq-routing' + `.html?id=${data[0]}`;
            console.log(data);
        });


        if (rolSesion === 'Administrator' || rolSesion === 'Contador') {
            cargarLiquidaciones(null,table);
        } else if (rolSesion === 'Vendedor') {
            cargarLiquidaciones(idSesion,table);
        }
    }
});
window.addEventListener('load', function () {
    // if (window.location.href.includes('cotizaciones-ven.html')) {
    //     if(rolSesion=="Cliente"){
    //         cargarCotizacionesVendedor(idSesion);
    //     }
    //     if(rolSesion=="Administrator"){
    //         cargarCotizacionesVendedor();
    //     }
    // }

});



