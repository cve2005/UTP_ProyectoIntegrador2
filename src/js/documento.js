import axios from "axios";

const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/items/'
});

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

const nombreSesion = document.getElementById('nombreSesion');
nombreSesion.textContent = userInfo.cna_user.usu_nombre;


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
    vendedor_id: userInfo.cna_user.usu_id,
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
    age_id: 1,
    shipp_id: 2,
    esr_id: 1,
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
  const fdoc_dsBLAWB = document.getElementById('fdoc_dsBLAWB').value;
  const fdoc_dsHandling = document.getElementById('fdoc_dsHandling').value;
  const fdoc_dsSeguro = document.getElementById('fdoc_dsSeguro').value;
  const fdoc_dsAgAduanas = document.getElementById('fdoc_dsAgAduanas').value;
  const fdoc_dsGasOpe = document.getElementById('fdoc_dsGasOpe').value;
  const fdoc_dsVistoBueno = document.getElementById('fdoc_dsVistoBueno').value;
  const fdoc_dsGateIn = document.getElementById('fdoc_dsGateIn').value;
  const fdoc_dsDescon = document.getElementById('fdoc_dsDescon').value;
  const fdoc_dsAlmacen = document.getElementById('fdoc_dsAlmacen').value;
  const fdoc_dsTransInt = document.getElementById('fdoc_dsTransInt').value;
  const fdoc_dsOtros = document.getElementById('fdoc_dsOtros').value;


  //para el derecho aduanas
  const fdoc_daValorFOB = document.getElementById('fdoc_daValorFOB').value;
  const fdoc_daValorFlete = document.getElementById('fdoc_daValorFlete').value;
  const fdoc_daSeguro = document.getElementById('fdoc_daSeguro').value;
  const fdoc_daValorCIF = document.getElementById('fdoc_daValorCIF').value;
  const fdoc_daAdValorem = document.getElementById('fdoc_daAdValorem').value;
  const fdoc_daISC = document.getElementById('fdoc_daISC').value;
  const fdoc_daIPM = document.getElementById('fdoc_daIPM').value;
  const fdoc_daIGV = document.getElementById('fdoc_daIGV').value;
  const fdoc_daPercepcion = document.getElementById('fdoc_daPercepcion').value;


  // //para detalle operacion
  // const frou_doETD = document.getElementById('frou_doETD').value
  // const frou_doETA = document.getElementById('frou_doETA').value
  // const frou_doBooking = document.getElementById('frou_doBooking').value
  // const frou_doContenedor = document.getElementById('frou_doContenedor').value
  // const frou_doBL = document.getElementById('frou_doBL').value
  // const frou_doNave = document.getElementById('frou_doNave').value
  // const frou_doTracking = document.getElementById('frou_doTracking').value
  // const frou_doGDrive = document.getElementById('frou_doGDrive').value

  //para detalle operacion
  const frou_doETD = 0
  const frou_doETA = 0
  const frou_doBooking = 0
  const frou_doContenedor = 0
  const frou_doBL = 0
  const frou_doNave = 0
  const frou_doTracking = 0
  const frou_doGDrive = 0



  //para detalle pagado
  const fdpa_dpFlete = 0
  const fdpa_dpGasExt = 0
  const fdpa_dpBLAWB = 0
  const fdpa_dpHandling = 0
  const fdpa_dpSeguro = 0
  const fdpa_dpAgAduanas = 0
  const fdpa_dpGasOpe = 0
  const fdpa_dpVistoBueno = 0
  const fdpa_dpGateIn = 0
  const fdpa_dpDescon = 0
  const fdpa_dpAlmacen = 0
  const fdpa_dpTransInt = 0
  const fdpa_dpOtros = 0




  const servicios = [
    {
      // dse_id:,
      dse_nombre: "Flete",
      dse_precio: fdoc_dsFlete,
      dse_igv: 0,
    },
    {
      // dse_id:,
      dse_nombre: "GastosExtranjero",
      dse_precio: fdoc_dsGasExt,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "BL-AWB-CPORTE",
      dse_precio: fdoc_dsBLAWB,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "Handling",
      dse_precio: fdoc_dsHandling,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "Seguro",
      dse_precio: fdoc_dsSeguro,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "AdAduanas",
      dse_precio: fdoc_dsAgAduanas,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "GastosOperativos",
      dse_precio: fdoc_dsGasOpe,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "VistoBueno",
      dse_precio: fdoc_dsVistoBueno,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "GateIN",
      dse_precio: fdoc_dsGateIn,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "Desconsolidacion",
      dse_precio: fdoc_dsDescon,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "Almacen-DAntici",
      dse_precio: fdoc_dsAlmacen,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "TransporteInterno",
      dse_precio: fdoc_dsTransInt,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "OtrosNE",
      dse_precio: fdoc_dsOtros,
      dse_igv: 0,
    }
  ]

  const daduanas = [
    {
      // dad_id:,
      dad_nombre: "Valor FOB",
      dad_precio: fdoc_daValorFOB,
    },
    {
      // dad_id:,
      dad_nombre: "Valor Flete",
      dad_precio: fdoc_daValorFlete,
    },
    {
      // dad_id:,
      dad_nombre: "Seguro",
      dad_precio: fdoc_daSeguro,
    },
    {
      // dad_id:,
      dad_nombre: "Valor CIF",
      dad_precio: fdoc_daValorCIF,
    },
    {
      // dad_id:,
      dad_nombre: "AdValorem",
      dad_precio: fdoc_daAdValorem,
    },
    {
      // dad_id:,
      dad_nombre: "ISC",
      dad_precio: fdoc_daISC,
    },
    {
      // dad_id:,
      dad_nombre: "IPM",
      dad_precio: fdoc_daIPM,
    },
    {
      // dad_id:,
      dad_nombre: "IGV",
      dad_precio: fdoc_daIGV,
    },
    {
      // dad_id:,
      dad_nombre: "Percepcion",
      dad_precio: fdoc_daPercepcion,
    },
  ]

  const operaciones = [
    {
      // dop_id:,
      dop_nombre: "ETD",
      dop_valor: frou_doETD,
    },
    {
      // dop_id:,
      dop_nombre: "ETA",
      dop_valor: frou_doETA,
    },
    {
      // dop_id:,
      dop_nombre: "Booking",
      dop_valor: frou_doBooking,
    },
    {
      // dop_id:,
      dop_nombre: "Contenedor",
      dop_valor: frou_doContenedor,
    },
    {
      // dop_id:,
      dop_nombre: "BL/AWB/CP",
      dop_valor: frou_doBL,
    },
    {
      // dop_id:,
      dop_nombre: "Nave/Vuelo",
      dop_valor: frou_doNave,
    },
    {
      // dop_id:,
      dop_nombre: "Tracking",
      dop_valor: frou_doTracking,
    },
    {
      // dop_id:,
      dop_nombre: "GDrive",
      dop_valor: frou_doGDrive,
    },
  ]

  const pagos = [
    {
      // dpa_id:,
      dpa_nombre: "Flete",
      dpa_pago: fdpa_dpFlete,
    },
    {
      // dpa_id:,
      dpa_nombre: "GastosExtranjero",
      dpa_pago: fdpa_dpGasExt,
    },
    {
      // dpa_id:,
      dpa_nombre: "BL-AWB-CPORTE",
      dpa_pago: fdpa_dpBLAWB,
    },
    {
      // dpa_id:,
      dpa_nombre: "Handling",
      dpa_pago: fdpa_dpHandling,
    },
    {
      // dpa_id:,
      dpa_nombre: "Seguro",
      dpa_pago: fdpa_dpSeguro,
    },
    {
      // dpa_id:,
      dpa_nombre: "AdAduanas",
      dpa_pago: fdpa_dpAgAduanas,
    },
    {
      // dpa_id:,
      dpa_nombre: "GastosOperativos",
      dpa_pago: fdpa_dpGasOpe,
    },
    {
      // dpa_id:,
      dpa_nombre: "VistoBueno",
      dpa_pago: fdpa_dpVistoBueno,
    },
    {
      // dpa_id:,
      dpa_nombre: "GateIN",
      dpa_pago: fdpa_dpGateIn,
    },
    {
      // dpa_id:,
      dpa_nombre: "Desconsolidacion",
      dpa_pago: fdpa_dpDescon,
    },
    {
      // dpa_id:,
      dpa_nombre: "Almacen-DAntici",
      dpa_pago: fdpa_dpAlmacen,
    },
    {
      // dpa_id:,
      dpa_nombre: "TransporteInterno",
      dpa_pago: fdpa_dpTransInt,
    },
    {
      // dpa_id:,
      dpa_nombre: "OtrosNE",
      dpa_pago: fdpa_dpOtros,
    }
  ]


  const dato = {
    servicios: servicios
  }
  console.log(dato)

  const date = {
    daduanas: daduanas
  }
  console.log(date)

  const dati = {
    operaciones: operaciones
  }
  console.log(dati)

  const datu = {
    pagos: pagos
  }
  console.log(datu)

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

    const daduanasData = daduanas.map(daduana => ({
      ...daduana,
      doc_id: docId
    }));

    const operacionesData = operaciones.map(operacion => ({
      ...operacion,
      doc_id: docId
    }));
    const pagosData = pagos.map(pago => ({
      ...pago,
      doc_id: docId
    }));

    //Api post detalle_servicio
    conexApi.post(`detalle_servicio`, serviciosData)
      .then((res) => {
        console.log(res);
        console.log('Se agregaron correctamente los datos de los servicios');
      })
      .catch((error) => {
        console.error('Hubo un error al agregar los servicios:', error);
      });

    //Aqui post derechos_aduanas
    conexApi.post(`derechos_aduanas`, daduanasData)
      .then((res) => {
        console.log(res);
        console.log('Se agregaron correctamente los datos de los derechos');
      })
      .catch((error) => {
        console.error('Hubo un error al agregar los derechos:', error);
      });


    //Aqui post detalle_operacion
    conexApi.post(`detalle_operacion`, operacionesData)
      .then((res) => {
        console.log(res);
        console.log('Se agregaron correctamente los datos de las operaciones');
      })
      .catch((error) => {
        console.error('Hubo un error al agregar las operaciones:', error);
      });

    //Aqui post detalle_pagos
    conexApi.post(`detalle_pagado`, pagosData)
      .then((res) => {
        console.log(res);
        console.log('Se agregaron correctamente los datos de los pagos');
      })
      .catch((error) => {
        console.error('Hubo un error al agregar los pagos:', error);
      });

  


  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });

});


