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
             document.getElementById('fdpa_dpFlete').value =pagos[0].dpa_pago
             document.getElementById('fdpa_dpGasExt').value=pagos[1].dpa_pago
             document.getElementById('fdpa_dpBLAWB').value=pagos[2].dpa_pago
             document.getElementById('fdpa_dpHandling').value=pagos[3].dpa_pago
             document.getElementById('fdpa_dpSeguro').value=pagos[4].dpa_pago
             document.getElementById('fdpa_dpAgAduanas').value=pagos[5].dpa_pago
             document.getElementById('fdpa_dpGasOpe').value=pagos[6].dpa_pago
             document.getElementById('fdpa_dpVistoBueno').value=pagos[7].dpa_pago
             document.getElementById('fdpa_dpGateIn').value=pagos[8].dpa_pago
             document.getElementById('fdpa_dpDescon').value=pagos[9].dpa_pago
             document.getElementById('fdpa_dpAlmacen').value=pagos[10].dpa_pago
             document.getElementById('fdpa_dpTransInt').value=pagos[11].dpa_pago
             document.getElementById('fdpa_dpOtros').value=pagos[12].dpa_pago
            
   
          })
            .catch((error) => {
              console.error('Hubo un error:', error);
            });

 





    
}

window.addEventListener('load', function () {
    if (window.location.href.includes(`liq-routing.html`)) {
        cargarEditarLiquidacion();
    }
  });