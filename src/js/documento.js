import axios from "axios";

const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/items/'
});


//Buscar cliente y empresa
const buscarClienteButton = document.getElementById('btnBuscarCliente')
buscarClienteButton.addEventListener('click', () => {
  const dni = document.getElementById('fusu_dni').value;
  conexApi.get(`usuario?filter[usu_dni]=${dni}`).then((res) => {
    const cliente = res.data.data[0]
    document.getElementById('fcliente_id').value = cliente.usu_id;
    document.getElementById('fusu_nombre_apellido').value = cliente.usu_nombre + " " + cliente.usu_apellido;
    document.getElementById('fusu_dni').value = cliente.usu_dni;
    document.getElementById('fusu_email').value = cliente.usu_email;
    document.getElementById('fusu_telefono').value = cliente.usu_telefono;
    document.getElementById('fidEmpresa').value = cliente.emp_id;
    const idEmpresa = cliente.emp_id;
    buscarEmpresaId(idEmpresa)

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
    //document.getElementById('fidEmpresa').value = empresa.emp_id
  })
    .catch((error) => {
      console.error('Hubo un error en la empresa:', error);
    });
}


//Agregar documento
const agregarDocumentoButton = document.getElementById('btnAgregarDocumento')
agregarDocumentoButton.addEventListener('click', () => {

  //const fdoc_fecha = document.getElementById('fdoc_fecha').value;
  const fcliente_id = document.getElementById('fcliente_id').value;
  //const fvendedor_id = document.getElementById('fvendedor_id').value;
  const ftop_id = document.getElementById('ftop_id').value;
  const fmtx_id = document.getElementById('fmtx_id').value;
  const fdoc_incoterm = document.getElementById('fdoc_incoterm').value;
  const fdoc_tcarga = document.getElementById('fdoc_tcarga').value;

  //const fpais_origen_id = document.getElementById('fpais_origen_id').value;
  const fpais_origen_id = "4";
  const fdoc_puerto_ori = document.getElementById('fdoc_puerto_ori').value;
  const fdoc_recojo = document.getElementById('fdoc_recojo').value;

  //const fpais_destino_id = document.getElementById('fpais_destino_id').value;
  const fpais_destino_id = "7";
  const fdoc_puerto_dest = document.getElementById('fdoc_puerto_dest').value;
  const fdoc_entrega = document.getElementById('fdoc_entrega').value;

  const fdoc_producto = document.getElementById('fdoc_producto').value;
  const fdoc_bultos = document.getElementById('fdoc_bultos').value;
  const fdoc_medidas = document.getElementById('fdoc_medidas').value;
  const fdoc_peso = document.getElementById('fdoc_peso').value;
  const fdoc_volumen = document.getElementById('fdoc_volumen').value;

  const fdoc_pago = document.getElementById('fdoc_pago').value;
  const fdoc_moneda = document.getElementById('fdoc_moneda').value;
  const fdoc_validez = document.getElementById('fdoc_validez').value;
  const fdoc_cotizacion_notas = document.getElementById('fdoc_cotizacion_notas').value;
  //const fest_id = document.getElementById('fest_id').value;
  const fest_id = 1;


  //data para documento
  const data = {
    doc_fecha: "2023-10-26",
    cliente_id: fcliente_id,
    vendedor_id: 2,
    top_id: ftop_id,
    mtx_id: fmtx_id,
    doc_incoterm: fdoc_incoterm,
    doc_tcarga: fdoc_tcarga,

    pais_origen_id: fpais_origen_id,
    doc_puerto_ori: fdoc_puerto_ori,
    doc_recojo: fdoc_recojo,

    pais_destino_id: fpais_destino_id,
    doc_puerto_dest: fdoc_puerto_dest,
    doc_entrega: fdoc_entrega,

    doc_producto: fdoc_producto,
    doc_bultos: fdoc_bultos,
    doc_medidas: fdoc_medidas,
    doc_peso: fdoc_peso,
    doc_volumen: fdoc_volumen,

    doc_pago: fdoc_pago,
    doc_moneda: fdoc_moneda,
    doc_validez: fdoc_validez,
    doc_cotizacion_notas: fdoc_cotizacion_notas,
    est_id: fest_id,


    age_id: null,
    ship_id: null,
    esr_id: null,
    doc_routing_id: null,
    doc_total_venta: null,
    doc_total_costo: null



  }
  console.log(data)



  //detalle_servicio
  // fdoc_dsFlete
  // fdoc_dsGasExt
  // fdoc_dsBLAWB
  // fdoc_dsHandling
  // fdoc_dsSeguro
  // fdoc_dsAgAduanas
  // fdoc_dsGasOpe
  // fdoc_dsVistoBueno
  // fdoc_dsGateIn
  // fdoc_dsDescon
  // fdoc_dsAlmacen
  // fdoc_dsTransInt
  // fdoc_dsOtros

  //id del documento
  //const doc_id = document.getElementById('fdoc_id').value;
  //para los datos del servicio
  const fdoc_dsFlete = document.getElementById('fdoc_dsFlete').value;
  const fdoc_dsGasExt = document.getElementById('fdoc_dsGasExt').value;


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



  const servicios = [
    {
      // dse_id:,
      dse_nombre: "Flete",
      dse_precio: fdoc_dsFlete,
      dse_igv: 0,
    },
    {
      // dse_id:,
      dse_nombre: "GastosExternos",
      dse_precio: fdoc_dsGasExt,
      dse_igv: 0,

    }
  ]

  const dato = {
    servicios: servicios
  }
  console.log(dato)

  //Api post para el documento

  conexApi.post(`documento`, data).then((res) => {
    console.log(res)
    document.getElementById('fdoc_id').value = res.data.data.doc_id
    console.log('Se agrego correctamente los datos')
    const docId = res.data.data.doc_id
    //Manejo de la respuesta para los servicios
    const serviciosData = servicios.map(servicio => ({
      ...servicio,
      doc_id: docId
    }));


    //Api post detalle servicio
    console.log("de nuevo estoy imprimiendo dato")
    console.log(dato)

    conexApi.post(`detalle_servicio`,  serviciosData )
      .then((res) => {
        console.log(res);
        console.log('Se agregaron correctamente los datos de los servicios');
      })
      .catch((error) => {
        console.error('Hubo un error al agregar los servicios:', error);
      });
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });




  //esta bien esteeee
  // conexApi.post(`documento`, data).then((res) => {
  //   console.log(res)
  //   document.getElementById('fdoc_id').value = res.data.data.doc_id
  //   console.log('Se agrego correctamente los datos')
  //   const docId =document.getElementById('fdoc_id').value
  // })
  //   .catch((error) => {
  //     console.error('Hubo un error:', error);
  //   });



  //fin click   
});



// //esta bien esteeee
//   conexApi.post(`documento`, data).then((res) => {
//     console.log(res)
//     document.getElementById('fdoc_id').value = res.data.data.doc_id
//     console.log('Se agrego correctamente los datos')
//     const docId =document.getElementById('fdoc_id').value
//   })
//     .catch((error) => {
//       console.error('Hubo un error:', error);
//     });