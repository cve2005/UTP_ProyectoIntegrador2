import axios from 'axios';

async function loginUser(email, password) {
    document.getElementById("spinner").style.display = "inline-block";
    const endpoint = 'https://cna-cms.onrender.com/auth/login';
    // Datos de inicio de sesión. Estos deberían ser recopilados de alguna forma segura, por ejemplo, un formulario.
    const loginData = {
        email, // Reemplaza con el email del usuario
        password, // Reemplaza con la contraseña del usuario
    };

    try {
        const response = await axios.post(endpoint, loginData);
        console.log('Datos recibidos:', response.data);
        window.location = "index.html";
        // Aquí puedes gestionar la respuesta. Por ejemplo, guardar tokens, redirigir al usuario, etc.
    } catch (error) {
        console.error('Error al iniciar sesión:', error.response.data);
       const errorMessage = document.getElementById('error-message');
         errorMessage.innerHTML = "Datos Incorrectos";
         errorMessage.style.display = "block";  
    } finally {
        document.getElementById("spinner").style.display = "none";
    }
}

document.getElementById('btnLogin').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('txtUser').value;
    const password = document.getElementById('txtPass').value;
    loginUser(email, password);
}); //
