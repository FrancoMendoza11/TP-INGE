document.addEventListener('DOMContentLoaded', function() { // Es un evento que se dispara cuando todo el documento html ha sido cargado, hay que usar esto siempre.
    
    let usuarios = []; // Almacenar los usuarios cargados del JSON

    //Fetch se utiliza para hacer una "peticion" al servidor, solicitando informacion o recursos. fetch devuelve una promesa
    // Una promesa es un objeto que representa la finalizacion exitosa o la falla de una operacion asincrona. 
    // then se ejecuta cuando la promesa se cumple, catch cuando es rechazada hay un error.

    fetch('../jsons/usuarios.JSON')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            usuarios = data.usuarios; // Guardo el arreglo de usuarios de mi JSON en mi arreglo usuarios del script.
        })
        .catch(error => {
            console.error('Hubo un problema con la carga del JSON:', error);
                
        //Si no abren con algun live server el html, no va a funcionar fetch, asi que aca lo dejo manual
        usuarios = [
            {
                "id": 1,
                "rol": "cliente",
                "nombre": "Lucas",
                "apellido": "Quintana",
                "dni": "12120032",
                "clave": "123",
                "centroAtencion": "Centro de Salud Los Polvorines",
                "completoEncuesta": false
            },
            {
                "id": 2,
                "rol": "coordinador",
                "nombre": "Joel",
                "apellido": "Quintana",
                "dni": "32120032",
                "clave": "1234",
                "zonasAsignadas": [
                    "Malvinas Argentinas"
                ]
            },
            {
                "id": 3,
                "rol": "personal secretaria",
                "nombre": "Bruno",
                "apellido": "Mars",
                "dni": "52120232",
                "clave": "12345"
            }
        ];
        });

    // Manejo de validacion del formulario, veo los valores cuando presiono ingresar "es donde esta la accion submit"

    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        const dni = document.getElementById('dniolegajo').value; //Se fija el valor ingresado en el campo de usuario
        const clave = document.getElementById('password').value; //Se fija el valor ingresado en el campo de contraseña
        let usuarioEncontrado = null;

        // Buscar el usuario en el JSON cargado

        usuarios.forEach(usuario => { //Para cada valor del arreglo usuario, ejecuto la siguiente funcion, que compara los datos y en caso de encontrar almacena el usuario en la variable usuario encontrado.
            if (usuario.dni === dni && usuario.clave === clave) {
                usuarioEncontrado = usuario; // Guardar usuario si coincide
                console.log(usuarioEncontrado);
            }
        });

        // Si el usuario fue encontrado, llevar a la vista que le corresponda (dependiendo de si es paciente, coordinador o personal de secretaria)
   
        if (usuarioEncontrado) { 

            // //Almaceno en LocalStorage el centro de atencion del usuario.

            // localStorage.setItem("centroAtencion", usuarioEncontrado.centroAtencion);
            // localStorage.setItem("estadoEncuesta", usuarioEncontrado.completoEncuesta);
            // localStorage.setItem("rol", usuarioEncontrado.rol);

            // Redirigir según el rol del usuario
            switch (usuarioEncontrado.rol) { 
                case 'cliente':
                    localStorage.setItem("centroAtencion", usuarioEncontrado.centroAtencion);
                    localStorage.setItem("estadoEncuesta", usuarioEncontrado.completoEncuesta);
                    localStorage.setItem("rol", usuarioEncontrado.rol);

                    window.location.href = 'página_paciente.html'; // cAMBIAR A LA URL QUE CORRESPONDA
                    break;
                case 'coordinador':
                    localStorage.setItem("rol", usuarioEncontrado.rol);
                    localStorage.setItem("zonasAsignadas", usuarioEncontrado.zonasAsignadas);

                    window.location.href = 'pagina_coordinador.html'; // cAMBIAR A LA URL QUE CORRESPONDA
                    break;
                case 'personal secretaria':
                    window.location.href = 'pagina_secretaria.html'; // cAMBIAR A LA URL QUE CORRESPONDA
                    break;
                default:
                    alert('Rol no reconocido');
            }
        } else {
            alert('Credenciales incorrectas. Intente de nuevo.');
        }
    });

});

