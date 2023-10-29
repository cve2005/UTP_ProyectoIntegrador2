import axios from "axios";

const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/items/'
});

let url = new URL(window.location.href);

// Usar URLSearchParams para obtener el valor de 'miVariable'
let id = url.searchParams.get("id");

//conseguir datos de la empresa
// function buscarUsuarioId(id){
//     id = document.getElementById('fcliente_id').value;
//     conexApi.get(`usuario?filter[usu_id]=${id}`).then((res) => {
//       const cliente = res.data.data[0]
//       document.getElementById('fcliente_id').value = cliente.usu_id;
//       document.getElementById('fusu_nombre_apellido').value = cliente.usu_nombre + " " + cliente.usu_apellido;
//       document.getElementById('fusu_dni').value = cliente.usu_dni;
//       document.getElementById('fusu_email').value = cliente.usu_email;
//       document.getElementById('fusu_telefono').value = cliente.usu_telefono;
//       document.getElementById('fidEmpresa').value = cliente.emp_id;
//       const idEmpresa = cliente.emp_id;
//       buscarEmpresaId(idEmpresa)

//     })
//       .catch((error) => {
//         console.error('Hubo un error:', error);
//       });
// }



// //buscar empresa por id
// function buscarEmpresaId(id) {
//   conexApi.get(`empresa?filter[emp_id]=${id}`).then((res) => {
//     const empresa = res.data.data[0]
//     console.log(empresa)
//     document.getElementById('frazonSocial').value = empresa.emp_razon_social
//     document.getElementById('fruc').value = empresa.emp_ruc
//     //document.getElementById('fidEmpresa').value = empresa.emp_id
//   })
//     .catch((error) => {
//       console.error('Hubo un error en la empresa:', error);
//     });
// }







async function cargarEditarCotizacion() {

  conexApi.get(`documento/?filter[doc_id]=${id}&fields=*.*.*`).then((res) => {
    const documento = res.data.data[0]
    console.log(documento)
    //primera parte razon social
    document.getElementById('fusu_nombre_apellido').value = documento.cliente_id.usu_nombre + " " + documento.cliente_id.usu_apellido;
    document.getElementById('fusu_dni').value = documento.cliente_id.usu_dni;
    document.getElementById('fusu_email').value = documento.cliente_id.usu_email;
    document.getElementById('fusu_telefono').value = documento.cliente_id.usu_telefono;
    document.getElementById('frazonSocial').value = documento.cliente_id.emp_id.emp_razon_social
    document.getElementById('fruc').value = documento.cliente_id.emp_id.emp_ruc

    //resto
    document.getElementById('fdoc_fecha').value = documento.doc_fecha
    document.getElementById('fcliente_id').value = documento.cliente_id
    // buscarUsuarioId(documento.cliente_id)
    document.getElementById('fvendedor_id').value = documento.vendedor_id
    document.getElementById('ftop_id').value = documento.top_id.top_id
    document.getElementById('fmtx_id').value = documento.mtx_id.mtx_id
    document.getElementById('fdoc_incoterm').value = documento.doc_incoterm
    document.getElementById('fdoc_tcarga').value = documento.doc_tcarga

    document.getElementById('fpais_origen_id').value = documento.pais_origen_id.pais_id
    document.getElementById('fdoc_puerto_ori').value = documento.doc_puerto_ori
    document.getElementById('fdoc_recojo').value = documento.doc_recojo

    document.getElementById('fpais_destino_id').value = documento.pais_destino_id.pais_id
    document.getElementById('fdoc_puerto_dest').value = documento.doc_puerto_dest
    document.getElementById('fdoc_entrega').value = documento.doc_entrega

    document.getElementById('fdoc_producto').value = documento.doc_producto
    document.getElementById('fdoc_bultos').value = documento.doc_bultos
    document.getElementById('fdoc_medidas').value = documento.doc_medidas
    document.getElementById('fdoc_peso').value = documento.doc_peso
    document.getElementById('fdoc_volumen').value = documento.doc_volumen
    document.getElementById('fdoc_pago').value = documento.doc_pago
    document.getElementById('fdoc_moneda').value = documento.doc_moneda
    document.getElementById('fdoc_validez').value = documento.doc_validez
    document.getElementById('fdoc_cotizacion_notas').value = documento.doc_cotizacion_notas
    document.getElementById('fest_id').value = documento.est_id

    //aduanas
    document.getElementById('fdoc_daValorFOB').value = documento.doc_daValorFlete
    document.getElementById('fdoc_daValorFlete').value = documento.doc_daSeguro
    document.getElementById('fdoc_daSeguro').value = documento.doc_daValorCIF
    document.getElementById('fdoc_daValorCIF').value = documento.doc_daAdValorem
    document.getElementById('fdoc_daAdValorem').value = documento.doc_daISC
    document.getElementById('fdoc_daISC').value = documento.doc_daIPM
    document.getElementById('fdoc_daIPM').value = documento.doc_daIGV
    document.getElementById('fdoc_daIGV').value = documento.doc_daPercepcion
    document.getElementById('fdoc_daPercepcion').value = documento.doc_daPercepcion

  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });

 //cargar derechos_aduanas
 conexApi.get(`derechos_aduanas?filter[doc_id]=${id}`).then((res) => {
  const daduanas = res.data.data

  console.log(daduanas)
 
  document.getElementById('fdoc_daValorFOB').value = daduanas[0].dad_precio
  document.getElementById('fdoc_daValorFlete').value = daduanas[1].dad_precio
  document.getElementById('fdoc_daSeguro').value = daduanas[2].dad_precio
  document.getElementById('fdoc_daValorCIF').value = daduanas[3].dad_precio
  document.getElementById('fdoc_daAdValorem').value = daduanas[4].dad_precio
  document.getElementById('fdoc_daISC').value = daduanas[5].dad_precio
  document.getElementById('fdoc_daIPM').value = daduanas[6].dad_precio
  document.getElementById('fdoc_daIGV').value = daduanas[7].dad_precio
  document.getElementById('fdoc_daPercepcion').value = daduanas[8].dad_precio

})
  .catch((error) => {
    console.error('Hubo un error:', error);
  });



  //cargar detalle_servicio
  conexApi.get(`detalle_servicio?filter[doc_id]=${id}`).then((res) => {
    const servicios = res.data.data
  
    console.log(servicios)
    //servicios
    document.getElementById('fdoc_dsFlete').value = servicios[0].dse_precio
    document.getElementById('fdoc_dsGasExt').value = servicios[1].dse_precio
    document.getElementById('fdoc_dsBLAWB').value = servicios[2].dse_precio
    document.getElementById('fdoc_dsHandling').value = servicios[3].dse_precio
    document.getElementById('fdoc_dsSeguro').value = servicios[4].dse_precio
    document.getElementById('fdoc_dsAgAduanas').value = servicios[5].dse_precio
    document.getElementById('fdoc_dsGasOpe').value = servicios[6].dse_precio
    document.getElementById('fdoc_dsVistoBueno').value = servicios[7].dse_precio
    document.getElementById('fdoc_dsGateIn').value = servicios[8].dse_precio
    document.getElementById('fdoc_dsDescon').value = servicios[9].dse_precio
    document.getElementById('fdoc_dsAlmacen').value = servicios[10].dse_precio
    document.getElementById('fdoc_dsTransInt').value = servicios[11].dse_precio
    document.getElementById('fdoc_dsOtros').value = servicios[12].dse_precio
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });

 
}

window.addEventListener('load', function () {
  if (window.location.href.includes(`editar_cot.html`)) {
    cargarEditarCotizacion();
  }
  //else if (window.location.href.includes("2.html")) {
  //     onPageLoad2();
  // }
});



//Editar cotizacion

// const fdoc_dsFlete = document.getElementById('fdoc_dsFlete').value;
// const fdoc_dsGasExt = document.getElementById('fdoc_dsGasExt').value;
// const fdoc_dsBLAWB = document.getElementById('fdoc_dsBLAWB').value;
// const fdoc_dsHandling = document.getElementById('fdoc_dsHandling').value;
// const fdoc_dsSeguro = document.getElementById('fdoc_dsSeguro').value;
// const fdoc_dsAgAduanas = document.getElementById('fdoc_dsAgAduanas').value;
// const fdoc_dsGasOpe = document.getElementById('fdoc_dsGasOpe').value;
// const fdoc_dsVistoBueno = document.getElementById('fdoc_dsVistoBueno').value;
// const fdoc_dsGateIn = document.getElementById('fdoc_dsGateIn').value;
// const fdoc_dsDescon = document.getElementById('fdoc_dsDescon').value;
// const fdoc_dsAlmacen = document.getElementById('fdoc_dsAlmacen').value;
// const fdoc_dsTransInt = document.getElementById('fdoc_dsTransInt').value;
// const fdoc_dsOtros = document.getElementById('fdoc_dsOtros').value;


// serviciosG.forEach((item, i) => {
//   console.log(`Index: ${i}, ID: ${item.dse_id}, Name: ${item.dse_precio}`);
// });

// const servicios = [
//   {
//     dse_id: serviciosG[0].dse_id,
//     dse_precio: fdoc_dsFlete,
//   },
//   {
//     dse_id: serviciosG[1].dse_id,
//     dse_precio: fdoc_dsGasExt,
//   },
//   {
//     dse_id: serviciosG[2].dse_id,
//     dse_precio: fdoc_dsBLAWB,
//   },
//   {
//     dse_id: serviciosG[3].dse_id,
//     dse_precio: fdoc_dsHandling,
//   },
//   {
//     dse_id: serviciosG[4].dse_id,
//     dse_precio: fdoc_dsSeguro,
//   },
//   {
//     dse_id: serviciosG[5].dse_id,
//     dse_precio: fdoc_dsAgAduanas,
//   },
//   {
//     dse_id: serviciosG[6].dse_id,
//     dse_precio: fdoc_dsGasOpe,
//   },
//   {
//     dse_id: serviciosG[7].dse_id,
//     dse_precio: fdoc_dsVistoBueno,
//   },
//   {
//     dse_id: serviciosG[8].dse_id,
//     dse_precio: fdoc_dsGateIn,
//   },
//   {
//     dse_id: serviciosG[9].dse_id,
//     dse_precio: fdoc_dsDescon,
//   },
//   {
//     dse_id: serviciosG[10].dse_id,
//     dse_precio: fdoc_dsAlmacen,
//   },
//   {
//     dse_id: serviciosG[11].dse_id,
//     dse_precio: fdoc_dsTransInt,
//   },
//   {
//     dse_id: serviciosG[12].dse_id,
//     dse_precio: fdoc_dsOtros,
//   }
// ]

// console.log(servicios)




// //Buscar cliente y empresa
// const actualizarDocumentoButton = document.getElementById('btnActualizarDocumento')
// actualizarDocumentoButton.addEventListener('click', () => {

//   console.log(serviciosG[0].dse_id)
//   console.log(serviciosG[0].dse_precio)


//   //    servicios.forEach(servicio => {
//   //     const { dse_id, dse_precio } = servicio;

//   //     const data = {
//   //       dse_precio: dse_precio,
//   //     };
//   //     conexApi.patch(`servicios/${dse_id}`, data)
//   //     .then(response => {
//   //       console.log('Registro editado con éxito:', response.data);
//   //     })
//   //     .catch(error => {
//   //       console.error('Error al editar el registro:', error);
//   //     });
//   //});
// });
