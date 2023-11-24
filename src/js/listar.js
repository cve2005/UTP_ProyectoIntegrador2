import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-invoice-template';
import 'jspdf-autotable';
import jsPDFInvoiceTemplate from "jspdf-invoice-template";
//import jsPDF from "jspdf"


//ultima version 2345 21112023
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

const roles = {
    ["9682d972-c050-482b-bf1e-5b3db6653f12"]: 'Administrador',
    ["140de75d-8d7c-47e3-8ba9-f7e60cdb3ba4"]: 'Vendedor',
    ["55f783e6-5f39-4966-bec6-8b71d3631075"]: 'Operativo',
    ["afdc94bb-c280-400c-b3b7-85a6158a0201"]: 'Contador',
    ["dbb74e25-bea2-4a87-a337-1c971307c3bf"]: 'Cliente'
};

//listar todos los usuarios
async function cargarUsuariosAdmin(table) {
    conexApi.get(`users?filter[role][_neq]=dbb74e25-bea2-4a87-a337-1c971307c3bf`).then((res) => {
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
async function cargarOperacionesVendedor(id, filtro, table) {

    // `documento?filter[est_id]=2&fields=*.*.*`
    const consulta =
        filtro === 'cliente'
            ? `items/documento?filter[est_id][_eq]=2&filter[usu_dir][_eq]=${id}&fields=*.*.*`
            : filtro === 'vendedor'
                ? `items/documento?filter[est_id][_eq]=2&filter[vendedor_id_dir][_eq]=${id}&fields=*.*.*`
                : `items/documento?filter[est_id]=2&fields=*.*.*`;

    conexApi.get(consulta).then((res) => {
        const data = res.data.data;
        const dataTable = [];
        console.log(data)
        data.forEach((element) => {
            const row = [];
            row.push(element.doc_id);
            row.push(element.doc_fecha);
            row.push(element.usu_dir.emp_id.emp_razon_social);
            row.push(element.esr_id.esr_nombre);
            row.push(element.age_id.age_razon_social);
            row.push(element.shipp_id.age_razon_social);
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
async function cargarAgentes(table) {
    conexApi.get(`items/agente?filter[tag_id]=1&fields=*.*`).then((res) => {

        const data = res.data.data;
        const dataTable = [];
        console.log(data);
        data.forEach((element) => {
            const row = [];
            row.push(element.age_id);
            row.push(element.age_razon_social);
            row.push(element.age_telefono);
            row.push(element.age_correo);
            row.push(element.age_nombre);
            row.push(element.tag_id.tag_nombre);
            dataTable.push(row);
        });
        table.rows.add(dataTable).draw();

        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        // });
        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        // });
    });
}

//listar shippers tag_id=1
async function cargarShippers(table) {
    conexApi.get(`items/agente?filter[tag_id]=2&fields=*.*`).then((res) => {
        const data = res.data.data;
        const dataTable = [];
        console.log(data);
        data.forEach((element) => {
            const row = [];
            row.push(element.age_id);
            row.push(element.age_razon_social);
            row.push(element.age_telefono);
            row.push(element.age_correo);
            row.push(element.age_nombre);
            row.push(element.tag_id.tag_nombre);
            dataTable.push(row);
        });
        table.rows.add(dataTable).draw();

        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        // });
    });
}



//tableCotizaciones id, filtro,
//listar cotizaciones vendedor
async function cargarCotizacionesVendedor(id, filtro, table) {
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
            //deberia salir el total solo de la columna de servicios cotizados
            // row.push('-');
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

async function cargarLiquidaciones(id, table) {
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
            row.push(element.liq_banco);
            row.push(element.liq_operacion);
            row.push(element.liq_rhe);
            row.push(element.liq_fecha);
            row.push(element.liq_pago_vendedor);
            row.push('element.usu_correo');
            dataTable.push(row);
        });
        table.rows.add(dataTable).draw();

    });

}



//total cotizado=suma de los servicios
$(document).ready(function () {
    if (window.location.href.includes('cotizaciones-ven.html')) {

        var table = $("#tableCotizaciones").DataTable({
            "data": [],
            "columns": [
                { "title": "Nro Doc" },
                { "title": "Fechas" },
                { "title": "Cliente" },
                { "title": "Monto Cotizado" },
                { "title": "Empresa" },
                { "title": "Estado" },
                { "title": "Acciones" }
            ],
            "columnDefs": [
                {
                    "targets": -1,
                    "data": null,
                    "render": function (data, type, row, meta) {
                        // Verificar el rol y mostrar el botón correspondiente
                        var buttonsHtml = '';

                        if (rolSesion === 'Cliente') {
                            buttonsHtml += "<button class='ver-btn'><i class='nav-icon fas fa-eye'></i></button>";
                        } else {
                            buttonsHtml += "<button class='edit-btn'><i class='nav-icon fas fa-solid fa-pen'></i></button>";
                        }

                        // Agregar botón de PDF para ambos roles
                        buttonsHtml += "<button class='pdf-btn'><i class='nav-icon fas fa-file-pdf'></i></button>";

                        return buttonsHtml;
                    }
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

        $('#tableCotizaciones tbody').on('click', '.ver-btn', function () {
            var data = table.row($(this).parents('tr')).data();
            window.location.href = 'editar_cot' + `.html?id=${data[0]}`;
            // $('.content').find("input, select").prop("disabled", true);
            console.log(data);
        });
        // Agregar lógica para el botón PDF independientemente del rol
        $('#tableCotizaciones tbody').on('click', '.pdf-btn', function () {
            var data = table.row($(this).parents('tr')).data();
            // Lógica para generar el PDF, si es necesario
            // const consulta =
            // filtro === 'cliente'
            //     ? `items/documento?filter[usu_dir]=${id}&fields=*.*.*`
            //     : filtro === 'vendedor'
            //         ? `items/documento?filter[vendedor_id_dir]=${id}&fields=*.*.*`
            //         : 'items/documento?fields=*.*.*';
            // 'items/documento?fields=*.*.*'
            conexApi.get(`items/documento?filter[doc_id]=${data[0]}&fields=*.*.*`).then((res) => {
                const datas = res.data.data[0];
                console.log(datas)
                console.log(datas.doc_id)

                //var pdf = new jsPDF();

                // Datos de ejemplo
                var data = {
                    business: {
                        name: 'Hola',
                        address: "Dirección de la empresa",
                        // ...otros detalles de la empresa
                    },
                    logo: {
                        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
                        type: 'PNG', //optional, when src= data:uri (nodejs case)
                        width: 53.33, //aspect ratio = width/height
                        height: 26.66,
                        margin: {
                            top: 0, //negative or positive num, from the current position
                            left: 0 //negative or positive num, from the current position
                        }
                    },
                    stamp: {
                        inAllPages: true, //by default = false, just in the last page
                        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
                        type: 'JPG', //optional, when src= data:uri (nodejs case)
                        width: 20, //aspect ratio = width/height
                        height: 20,
                        margin: {
                            top: 0, //negative or positive num, from the current position
                            left: 0 //negative or positive num, from the current position
                        }
                    },
                    business: {
                        name: "Hola"+datas.doc_id,
                        address: "Albania, Tirane ish-Dogana, Durres 2001",
                        phone: "(+355) 069 11 11 111",
                        email: "email@example.com",
                        email_1: "info@example.al",
                        website: `${datas.doc_id}`,
                    },
                    contact: {
                        label: "Invoice issued for:",
                        name: "Client Name",
                        address: "Albania, Tirane, Astir",
                        phone: "(+355) 069 22 22 222",
                        email: "client@website.al",
                        otherInfo: "www.website.al",
                    },
                    invoice: {
                                label: "Invoice #: ",
                                num: 19,
                                invDate: "Payment Date: 01/01/2021 18:12",
                                invGenDate: "Invoice Date: 02/02/2021 10:17",
                                headerBorder: false,
                                tableBodyBorder: false,
                                header: [
                                    {
                                        title: "#",
                                        style: {
                                            width: 10
                                        }
                                    },
                                    {
                                        title: "Title",
                                        style: {
                                            width: 30
                                        }
                                    },
                                    {
                                        title: "Description",
                                        style: {
                                            width: 80
                                        }
                                    },
                                    { title: "Price" },
                                    { title: "Quantity" },
                                    { title: "Unit" },
                                    { title: "Total" }
                                ],
                                table: Array.from(Array(10), (item, index) => ([
                                    index + 1,
                                    "There are many variations ",
                                    "Lorem Ipsum is simply dummy text dummy text ",
                                    200.5,
                                    4.5,
                                    "m2",
                                    400.5
                                ])),
                                additionalRows: [{
                                    col1: 'Total:',
                                    col2: '145,250.50',
                                    col3: 'ALL',
                                    style: {
                                        fontSize: 14 //optional, default 12
                                    }
                                },
                                {
                                    col1: 'VAT:',
                                    col2: '20',
                                    col3: '%',
                                    style: {
                                        fontSize: 10 //optional, default 12
                                    }
                                },
                                {
                                    col1: 'SubTotal:',
                                    col2: '116,199.90',
                                    col3: 'ALL',
                                    style: {
                                        fontSize: 10 //optional, default 12
                                    }
                                }],
                                invDescLabel: "Invoice Note",
                                invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
                            },
                            footer: {
                                text: "The invoice is created on a computer and is valid without the signature and stamp.",
                            },
                            pageEnable: true,
                            pageLabel: "Page ",
                    // ...otros datos
                };

                // Crear el documento PDF
                const pdf = new jsPDFInvoiceTemplate({
                    outputType: "Save", // Cambiado de jsPDFInvoiceTemplate.OutputType.Save a "Save"
                    returnJsPDFDocObject: true,
                    fileName: "Prueba",
                    orientationLandscape: false,
                    compress: true,
                });

                // Agregar datos a la plantilla
                jsPDFInvoiceTemplate({
                    jsPDFDoc: pdf,
                    ...data,
                });

                // Guardar o mostrar el PDF
                //pdf.save();
                // Guardar o mostrar el PDF
                const pdfData = pdf.output(); // Obtener los datos del PDF

                // Crear un Blob desde los datos del PDF
                const blob = new Blob([pdfData], { type: 'application/pdf' });

                // Crear una URL de objeto para el Blob
                const blobUrl = URL.createObjectURL(blob);

                // Abrir una nueva pestaña con el PDF
                window.open(blobUrl);

            });
            // var props = {
            //     outputType: OutputType.Save,
            //     returnJsPDFDocObject: true,
            //     fileName: "Invoice 2021",
            //     orientationLandscape: false,
            //     compress: true,
            //     logo: {
            //         src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
            //         type: 'PNG', //optional, when src= data:uri (nodejs case)
            //         width: 53.33, //aspect ratio = width/height
            //         height: 26.66,
            //         margin: {
            //             top: 0, //negative or positive num, from the current position
            //             left: 0 //negative or positive num, from the current position
            //         }
            //     },
            //     stamp: {
            //         inAllPages: true, //by default = false, just in the last page
            //         src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
            //         type: 'JPG', //optional, when src= data:uri (nodejs case)
            //         width: 20, //aspect ratio = width/height
            //         height: 20,
            //         margin: {
            //             top: 0, //negative or positive num, from the current position
            //             left: 0 //negative or positive num, from the current position
            //         }
            //     },
            //     business: {
            //         name: "Business Name",
            //         address: "Albania, Tirane ish-Dogana, Durres 2001",
            //         phone: "(+355) 069 11 11 111",
            //         email: "email@example.com",
            //         email_1: "info@example.al",
            //         website: "www.example.al",
            //     },
            //     contact: {
            //         label: "Invoice issued for:",
            //         name: "Client Name",
            //         address: "Albania, Tirane, Astir",
            //         phone: "(+355) 069 22 22 222",
            //         email: "client@website.al",
            //         otherInfo: "www.website.al",
            //     },
            //     invoice: {
            //         label: "Invoice #: ",
            //         num: 19,
            //         invDate: "Payment Date: 01/01/2021 18:12",
            //         invGenDate: "Invoice Date: 02/02/2021 10:17",
            //         headerBorder: false,
            //         tableBodyBorder: false,
            //         header: [
            //             {
            //                 title: "#",
            //                 style: {
            //                     width: 10
            //                 }
            //             },
            //             {
            //                 title: "Title",
            //                 style: {
            //                     width: 30
            //                 }
            //             },
            //             {
            //                 title: "Description",
            //                 style: {
            //                     width: 80
            //                 }
            //             },
            //             { title: "Price" },
            //             { title: "Quantity" },
            //             { title: "Unit" },
            //             { title: "Total" }
            //         ],
            //         table: Array.from(Array(10), (item, index) => ([
            //             index + 1,
            //             "There are many variations ",
            //             "Lorem Ipsum is simply dummy text dummy text ",
            //             200.5,
            //             4.5,
            //             "m2",
            //             400.5
            //         ])),
            //         additionalRows: [{
            //             col1: 'Total:',
            //             col2: '145,250.50',
            //             col3: 'ALL',
            //             style: {
            //                 fontSize: 14 //optional, default 12
            //             }
            //         },
            //         {
            //             col1: 'VAT:',
            //             col2: '20',
            //             col3: '%',
            //             style: {
            //                 fontSize: 10 //optional, default 12
            //             }
            //         },
            //         {
            //             col1: 'SubTotal:',
            //             col2: '116,199.90',
            //             col3: 'ALL',
            //             style: {
            //                 fontSize: 10 //optional, default 12
            //             }
            //         }],
            //         invDescLabel: "Invoice Note",
            //         invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
            //     },
            //     footer: {
            //         text: "The invoice is created on a computer and is valid without the signature and stamp.",
            //     },
            //     pageEnable: true,
            //     pageLabel: "Page ",
            // };

        });

        if (rolSesion === 'Administrator') {
            cargarCotizacionesVendedor(null, null, table);
        } else if (rolSesion === 'Cliente') {
            cargarCotizacionesVendedor(idSesion, 'cliente', table);
        } else if (rolSesion === 'Vendedor') {
            cargarCotizacionesVendedor(idSesion, 'vendedor', table);
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
                { "title": "Agente" },
                { "title": "Shipper" },
                { "title": "Acciones" }

            ],
            "columnDefs": [
                {
                    "targets": -1, // Esto significa la última columna de la tabla
                    "data": null,
                    "render": function (data, type, row, meta) {
                        // Verificar el rol y mostrar el botón correspondiente
                        if (rolSesion === 'Cliente' || rolSesion === 'Vendedor') {
                            return "<button class='ver-btn'><i class='nav-icon fas fa-eye'/></button>";
                        } else {
                            return "<button class='edit-btn'><i class='nav-icon fas fa-solid fa-pen'/></button>";
                        }
                    }
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

        $('#tblOperaciones tbody').on('click', '.ver-btn', function () {
            var data = table.row($(this).parents('tr')).data();
            window.location.href = 'routing' + `.html?id=${data[0]}`;
            // $('.content').find("input, select").prop("disabled", true);
            console.log(data);
        });


        if (rolSesion === 'Administrator' || rolSesion === 'Operativo') {
            cargarOperacionesVendedor(null, null, table);
        } else if (rolSesion === 'Cliente') {
            cargarOperacionesVendedor(idSesion, 'cliente', table);
        } else if (rolSesion === 'Vendedor') {
            cargarOperacionesVendedor(idSesion, 'vendedor', table);
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
        var table = $("#tblAgentes").DataTable({
            "data": [],
            "columns": [
                { "title": "Cod Agente" },
                { "title": "Agente" },
                { "title": "Teléfono" },
                { "title": "Correo" },
                { "title": "Contacto" },
                { "title": "Tipo" },
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

        $('#tblAgentes tbody').on('click', '.edit-btn', function () {
            var data = table.row($(this).parents('tr')).data();
            window.location.href = 'editar-agente' + `.html?id=${data[0]}`;
            console.log(data);
        });

        cargarAgentes(table);
    }
    if (window.location.href.includes("listarshippers.html")) {
        var table = $("#tblShippers").DataTable({
            "data": [],
            "columns": [
                { "title": "Cod Shipper" },
                { "title": "Agente" },
                { "title": "Teléfono" },
                { "title": "Correo" },
                { "title": "Contacto" },
                { "title": "Tipo" },
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

        $('#tblShippers tbody').on('click', '.edit-btn', function () {
            var data = table.row($(this).parents('tr')).data();
            window.location.href = 'editar-shipper' + `.html?id=${data[0]}`;
            console.log(data);
        });

        cargarShippers(table);
    }
    if (window.location.href.includes("liquidaciones-ven.html")) {
        var table = $("#tblLiquidaciones").DataTable({
            "data": [],
            "columns": [
                { "title": "Nro Doc" },
                { "title": "Nro Liquidacion" },
                { "title": "Cliente" },
                { "title": "Banco" },
                { "title": "Operación" },
                { "title": "RHE" },
                { "title": "Fecha de pago" },
                { "title": "Comisión Vendedor" },
                { "title": "Acciones" }
            ],
            "columnDefs": [
                {
                    "targets": -1, // Esto significa la última columna de la tabla
                    "data": null,
                    "render": function (data, type, row, meta) {
                        // Verificar el rol y mostrar el botón correspondiente
                        if (rolSesion === 'Vendedor') {
                            return "<button class='ver-btn'><i class='nav-icon fas fa-eye'/></button>";
                        } else {
                            return "<button class='edit-btn'><i class='nav-icon fas fa-solid fa-pen'/></button>";
                        }
                    }
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

        $('#tblLiquidaciones tbody').on('click', '.ver-btn', function () {
            var data = table.row($(this).parents('tr')).data();
            window.location.href = 'liq-routing' + `.html?id=${data[0]}`;
            // $('.content').find("input, select").prop("disabled", true);
            console.log(data);
        });

        if (rolSesion === 'Administrator' || rolSesion === 'Contador') {
            cargarLiquidaciones(null, table);
        } else if (rolSesion === 'Vendedor') {
            cargarLiquidaciones(idSesion, table);
        }
    }
});

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


