import axios from 'axios';

const EDITAR = 'editar';
const VER = 'ver';
const DESCARGAR = 'descargar';

const conexApi = axios.create({
    baseURL: 'https://cna-cms.onrender.com/items/',
});


//listar todos los usuarios
async function cargarUsuariosAdmin() {
    conexApi.get(`usuario`).then((res) => {
        const data = res.data.data;
        const tableBody = document.getElementById('listarUsuariosAdmin');
        tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar contenido
        console.log(data);
        data.forEach((element) => {
            const row = document.createElement('tr');

              row.appendChild(createItem(element.usu_id));
              row.appendChild(createItem(element.usu_nombre));
              row.appendChild(createItem(element.usu_apellido));
              const rol =element.usu_rol
              let nrol
              if(rol==1){
                nrol="ADMINISTRADOR"
              }
              if(rol==2){
                nrol="VENDEDOR"
              }
              if(rol==3){
                nrol= "OPERATIVO"
              }
              if(rol==4){
                nrol="CONTADOR"
              }
              if(rol==5){
                nrol="CLIENTE"
              }

              row.appendChild(createItem(nrol));
                //columna acciones
            const url="adm-editar-usuario"

                const acciones = document.createElement('td');
                acciones.appendChild(createItemAcction(element.usu_id, VER,url));
                acciones.appendChild(createItemAcction(element.usu_id, DESCARGAR,url));
                acciones.appendChild(createItemAcction(element.usu_id, EDITAR,url));
                row.appendChild(acciones);
         
            tableBody.appendChild(row);
        });
        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        // });
    });
}
//listar usuarios clientes = 5
async function cargarUsuarios() {
    conexApi.get(`usuario?filter[usu_rol]=5`).then((res) => {
        const data = res.data.data;
        const tableBody = document.getElementById('listarUsuariosAdmin');
        tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar contenido
        console.log(data);
        data.forEach((element) => {
            const row = document.createElement('tr');
            row.appendChild(createItem(element.usu_id));
              row.appendChild(createItem(element.usu_nombre));
              row.appendChild(createItem(element.usu_apellido));
             
                //columna acciones
            const url="editar-usuario"
            const rol =element.usu_rol
            let nrol
            if(rol==1){
              nrol="ADMINISTRADOR"
            }
            if(rol==2){
              nrol="VENDEDOR"
            }
            if(rol==3){
              nrol= "OPERATIVO"
            }
            if(rol==4){
              nrol="CONTADOR"
            }
            if(rol==5){
              nrol="CLIENTE"
            }
            row.appendChild(createItem(nrol));
            const acciones = document.createElement('td');
            acciones.appendChild(createItemAcction(element.usu_id, VER,url));
            acciones.appendChild(createItemAcction(element.usu_id, DESCARGAR,url));
            acciones.appendChild(createItemAcction(element.usu_id, EDITAR,url));
            row.appendChild(acciones);
            tableBody.appendChild(row);
        });
 

        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        // });
    });
}

//listar cotizaciones vendedor
async function cargarCotizacionesVendedor() {
    conexApi.get(`documento?fields=*.*.*`).then((res) => {
        const data = res.data.data;
        const tableBody = document.getElementById('listarCotizacionesVendedor');
        tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar contenido
        console.log(data);
        data.forEach((element) => {
            const row = document.createElement('tr');
            row.appendChild(createItem(element.doc_id));
            row.appendChild(createItem(element.doc_fecha));
            row.appendChild(createItem(element.cliente_id.usu_nombre +" "+ element.cliente_id.usu_apellido));
            row.appendChild(createItem(element.cliente_id.emp_id.emp_razon_social));
            row.appendChild(createItem(element.est_id.est_nombre));
            //columena acciones
            const url="editar_cot"

            const acciones = document.createElement('td');
            acciones.appendChild(createItemAcction(element.doc_id, VER,url));
            acciones.appendChild(createItemAcction(element.doc_id, DESCARGAR,url));
            acciones.appendChild(createItemAcction(element.doc_id, EDITAR,url));
            row.appendChild(acciones);
            tableBody.appendChild(row);
        });
        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        // });
    });
}


//listar operaciones del vendedor
async function cargarOperacionesVendedor() {
    conexApi.get(`documento?filter[est_id]=2&fields=*.*.*`).then((res) => {
        const data = res.data.data;
        const tableBody = document.getElementById('listarOperacionesVendedor');
        tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar contenido
        console.log(data);
        data.forEach((element) => {
            const row = document.createElement('tr');
            row.appendChild(createItem(element.doc_id));
            row.appendChild(createItem(element.doc_fecha));
            row.appendChild(createItem(element.cliente_id.emp_id.emp_razon_social));
            row.appendChild(createItem(element.esr_id.esr_nombre));
            row.appendChild(createItem("-"));
            row.appendChild(createItem("-"));
            row.appendChild(createItem("-"));
            //columena acciones
            const url="routing"
            const acciones = document.createElement('td');
            acciones.appendChild(createItemAcction(element.doc_id, VER,url));
            acciones.appendChild(createItemAcction(element.doc_id, DESCARGAR,url));
            acciones.appendChild(createItemAcction(element.doc_id, EDITAR,url));
            row.appendChild(acciones);
            tableBody.appendChild(row);
        });
        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        // });
    });
}

//listar agentes tag_id=1
async function cargarAgentes() {
    conexApi.get(`agente?filter[tag_id]=1&fields=*.*`).then((res) => {
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
            const url="editar-agente"
            const acciones = document.createElement('td');
            acciones.appendChild(createItemAcction(element.age_id, VER,url));
            acciones.appendChild(createItemAcction(element.age_id, DESCARGAR,url));
            acciones.appendChild(createItemAcction(element.age_id, EDITAR,url));
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
    conexApi.get(`agente?filter[tag_id]=2&fields=*.*`).then((res) => {
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
            const url="editar-shipper"
            const acciones = document.createElement('td');
            acciones.appendChild(createItemAcction(element.age_id, VER,url));
            acciones.appendChild(createItemAcction(element.age_id, DESCARGAR,url));
            acciones.appendChild(createItemAcction(element.age_id, EDITAR,url));
            row.appendChild(acciones);
            tableBody.appendChild(row);
        });
        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        // });
    });
}

async function cargarLiquidaciones(){
    conexApi.get(`liquidacion?fields=*.*.*.*`).then((res) => {
        const data = res.data.data;
        console.log(data);

        const tableBody = document.getElementById('listarLiquidaciones');
        tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar contenido
        data.forEach((element) => {

            const row = document.createElement('tr');
            row.appendChild(createItem(element.liq_id));
            row.appendChild(createItem(element.doc_id.doc_id));
            row.appendChild(createItem(element.doc_id.cliente_id.emp_id.emp_razon_social));
            row.appendChild(createItem("-"));
            row.appendChild(createItem(element.liq_rhe));
            row.appendChild(createItem(element.liq_fecha));
            //columena acciones
            const url="liq-routing"
            const acciones = document.createElement('td');
            acciones.appendChild(createItemAcction(element.doc_id.doc_id, VER,url));
            acciones.appendChild(createItemAcction(element.doc_id.doc_id, DESCARGAR,url));
            acciones.appendChild(createItemAcction(element.doc_id.doc_id, EDITAR,url));
            row.appendChild(acciones);
            tableBody.appendChild(row);
        
        });
        // .catch((error) => {
        //   console.error('Hubo un error:', error);
        });
    
}


const createItem = (value) => {
    const td = document.createElement('td');
    td.innerText = value;
    return td;
};

const createItemAcction = (doc_id, type,url) => {
    
    const icon = document.createElement('i');
    const button = document.createElement('button');
    if (type === EDITAR) {
        button.addEventListener('click', () => {
          //alert('editar'  + doc_id);  
          window.location.href = url+`.html?id=${doc_id}`;
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
     if (window.location.href.includes("operaciones-ven.html")) {
        cargarOperacionesVendedor();
    }
    if (window.location.href.includes('listarusuariosadm.html')) {
        cargarUsuariosAdmin();
    }
    if (window.location.href.includes("listarusuarios.html")) {
        cargarUsuarios();
    }
    if (window.location.href.includes("listaragentes.html")) {
        cargarAgentes();
    }
    if (window.location.href.includes("listarshippers.html")) {
        cargarShippers();
    }
    if (window.location.href.includes("liquidaciones-ven.html")) {
        cargarLiquidaciones();
    }
});



