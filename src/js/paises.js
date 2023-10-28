import axios from "axios";

async function cargarPaises(){
    axios.get("https://restcountries.com/v2/all").then((res) => {
        const select_pais_ori = document.getElementById("fpais_origen_id");
        const select_pais_des = document.getElementById("fpais_destino_id");
      
        select_pais_ori.innerHTML = '';
        select_pais_des.innerHTML = '';
    
            res.data.forEach((element) => {
                const option = document.createElement("option");
                option.text = element.name;
                const option2 = document.createElement("option");
                option2.text = element.name;
                select_pais_ori.add(option);
                select_pais_des.add(option2);
        } );
    });
    
    // axios.get("https://cna-cms.onrender.com/items/paises").then((res) => {
    //    const paises = document.getElementById("fmtx_id");
    //  paises.innerHTML = '';
    //         res.data.data.forEach((element) => {
    //         console.log(element)    
    //         const option = document.createElement("option");
    //         option.text = element.pais_nombre;
    //         paises.add(option);                                                                                                        
    //     } );
    // });
}


window.addEventListener('load', function () {
    if (window.location.href.includes("cotizacion.html")) {
        cargarPaises();
    }
    //else if (window.location.href.includes("2.html")) {
    //     onPageLoad2();
    // }
  });
