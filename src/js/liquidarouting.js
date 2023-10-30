import axios from "axios";


const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/items/'
});
let url = new URL(window.location.href);

// Usar URLSearchParams para obtener el valor de 'miVariable'
let id = url.searchParams.get("id");
async function cargarEditarLiquidacion() {
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

  conexApi.get(`detalle_pagado?filter[doc_id]=${id}`).then((res) => {
    const pagos = res.data.data
    console.log(pagos)
    // //para detalle pagado
    document.getElementById('fdpa_dpFlete').value = pagos[0].dpa_pago
    document.getElementById('fdpa_dpGasExt').value = pagos[1].dpa_pago
    document.getElementById('fdpa_dpBLAWB').value = pagos[2].dpa_pago
    document.getElementById('fdpa_dpHandling').value = pagos[3].dpa_pago
    document.getElementById('fdpa_dpSeguro').value = pagos[4].dpa_pago
    document.getElementById('fdpa_dpAgAduanas').value = pagos[5].dpa_pago
    document.getElementById('fdpa_dpGasOpe').value = pagos[6].dpa_pago
    document.getElementById('fdpa_dpVistoBueno').value = pagos[7].dpa_pago
    document.getElementById('fdpa_dpGateIn').value = pagos[8].dpa_pago
    document.getElementById('fdpa_dpDescon').value = pagos[9].dpa_pago
    document.getElementById('fdpa_dpAlmacen').value = pagos[10].dpa_pago
    document.getElementById('fdpa_dpTransInt').value = pagos[11].dpa_pago
    document.getElementById('fdpa_dpOtros').value = pagos[12].dpa_pago


  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });

  conexApi.get(`documento?filter[doc_id]=${id}&fields=*.*.*`).then((res) => {
    const doc = res.data.data[0]
    console.log(doc)


    document.getElementById('fvendedor').value = doc.cliente_id.emp_id.emp_razon_social
    document.getElementById('fporcentaje').value = doc.cliente_id.usu_comision

  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });

}


//Actualizar cliente
const actualizarClienteButton = document.getElementById('btnCalcular')
actualizarClienteButton.addEventListener('click', () => {
  //detalle servicios
  const fdoc_dsFlete = document.getElementById('fdoc_dsFlete').value
  const fdoc_dsGasExt = document.getElementById('fdoc_dsGasExt').value
  const fdoc_dsBLAWB = document.getElementById('fdoc_dsBLAWB').value
  const fdoc_dsHandling = document.getElementById('fdoc_dsHandling').value
  const fdoc_dsSeguro = document.getElementById('fdoc_dsSeguro').value
  const fdoc_dsAgAduanas = document.getElementById('fdoc_dsAgAduanas').value
  const fdoc_dsGasOpe = document.getElementById('fdoc_dsGasOpe').value
  const fdoc_dsVistoBueno = document.getElementById('fdoc_dsVistoBueno').value
  const fdoc_dsGateIn = document.getElementById('fdoc_dsGateIn').value
  const fdoc_dsDescon = document.getElementById('fdoc_dsDescon').value
  const fdoc_dsAlmacen = document.getElementById('fdoc_dsAlmacen').value
  const fdoc_dsTransInt = document.getElementById('fdoc_dsTransInt').value
  const fdoc_dsOtros = document.getElementById('fdoc_dsOtros').value


  //detallepagos
  const fdpa_dpFlete = document.getElementById('fdpa_dpFlete').value
  const fdpa_dpGasExt = document.getElementById('fdpa_dpGasExt').value
  const fdpa_dpBLAWB = document.getElementById('fdpa_dpBLAWB').value
  const fdpa_dpHandling = document.getElementById('fdpa_dpHandling').value
  const fdpa_dpSeguro = document.getElementById('fdpa_dpSeguro').value
  const fdpa_dpAgAduanas = document.getElementById('fdpa_dpAgAduanas').value
  const fdpa_dpGasOpe = document.getElementById('fdpa_dpGasOpe').value
  const fdpa_dpVistoBueno = document.getElementById('fdpa_dpVistoBueno').value
  const fdpa_dpGateIn = document.getElementById('fdpa_dpGateIn').value
  const fdpa_dpDescon = document.getElementById('fdpa_dpDescon').value
  const fdpa_dpAlmacen = document.getElementById('fdpa_dpAlmacen').value
  const fdpa_dpTransInt = document.getElementById('fdpa_dpTransInt').value
  const fdpa_dpOtros = document.getElementById('fdpa_dpOtros').value


  function calcular() {
    const suma = parseInt(fdoc_dsFlete) +
      parseInt(fdoc_dsGasExt) +
      parseInt(fdoc_dsBLAWB) +
      parseInt(fdoc_dsHandling) +
      parseInt(fdoc_dsSeguro) +
      parseInt(fdoc_dsAgAduanas) +
      parseInt(fdoc_dsGasOpe) +
      parseInt(fdoc_dsVistoBueno) +
      parseInt(fdoc_dsGateIn) +
      parseInt(fdoc_dsDescon) +
      parseInt(fdoc_dsAlmacen) +
      parseInt(fdoc_dsTransInt) +
      parseInt(fdoc_dsOtros)

    document.getElementById('ftotalIngresos').value = suma

    const suma2 = parseInt(fdpa_dpFlete) +
      parseInt(fdpa_dpGasExt) +
      parseInt(fdpa_dpBLAWB) +
      parseInt(fdpa_dpHandling) +
      parseInt(fdpa_dpSeguro) +
      parseInt(fdpa_dpAgAduanas) +
      parseInt(fdpa_dpGasOpe) +
      parseInt(fdpa_dpVistoBueno) +
      parseInt(fdpa_dpGateIn) +
      parseInt(fdpa_dpDescon,) +
      parseInt(fdpa_dpAlmacen,) +
      parseInt(fdpa_dpTransInt,) +
      parseInt(fdpa_dpOtros)
    document.getElementById('ftotalGastos').value = suma2

    const utilidad = suma - suma2
    document.getElementById('futilidad').value = utilidad

    const comision = document.getElementById('fporcentaje').value
    const final = utilidad * parseFloat(comision)
    console.log(final)
    document.getElementById('fcomision').value = parseFloat(final)
  }
  calcular()
})


window.addEventListener('load', function () {
  if (window.location.href.includes(`liq-routing.html`)) {
    cargarEditarLiquidacion();
  }
});