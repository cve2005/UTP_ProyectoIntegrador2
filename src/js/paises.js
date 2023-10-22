import axios from "axios";


axios.get("https://restcountries.com/v2/all").then((res) => {
    const select_pais_ori = document.getElementById("lista-paises");
    const select_pais_des = document.getElementById("lista-paises2");
  
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


