document.addEventListener('DOMContentLoaded', function() { // Es un evento que se dispara cuando todo el documento html ha sido cargado, hay que usar esto siempre.
    
    let usuarios = [
            {
                "id": 1,
                "rol": "cliente",
                "nombre": "Charly",
                "apellido": "Garcia",
                "dni": "12120032",
                "clave": "123",
                "centroAtencion": "Centro de Salud Los Polvorines",
                "completoEncuesta": false
            },
            {
                "id": 2,
                "rol": "coordinador",
                "nombre": "Carlos",
                "apellido": "Gardel",
                "dni": "32120032",
                "clave": "1234",
                "zonasAsignadas": ["Centro de Salud Los Polvorines","Centro de Salud Pablo Nogués"]
            }
        ];

    // Manejo de validacion del formulario, veo los valores cuando presiono ingresar "es donde esta la accion submit"

    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        const dni = document.getElementById('dniolegajo').value; 
        const clave = document.getElementById('password').value; 
        let usuarioEncontrado = null;

        // Buscar el usuario 

        usuarios.forEach(usuario => { //Para cada valor del arreglo usuario, ejecuto la siguiente funcion, que compara los datos y en caso de encontrar almacena el usuario en la variable usuario encontrado.
            if (usuario.dni === dni && usuario.clave === clave) {
                usuarioEncontrado = usuario; // Guardar usuario si coincide
                console.log(usuarioEncontrado);
            }
        });

        // Si el usuario fue encontrado, llevar a la vista que le corresponda (dependiendo de si es paciente, coordinador o personal de secretaria)
   
        if (usuarioEncontrado) { 

            // Redirigir según el rol del usuario
            switch (usuarioEncontrado.rol) { 
                case 'cliente':
                    localStorage.setItem("centroAtencion", usuarioEncontrado.centroAtencion);
                    localStorage.setItem("estadoEncuesta", usuarioEncontrado.completoEncuesta);
                    localStorage.setItem("rol", usuarioEncontrado.rol);

                    window.location.href = 'pagina_paciente.html'; 
                    break;
                case 'coordinador':
                    localStorage.setItem("rol", usuarioEncontrado.rol);
                    localStorage.setItem("zonasAsignadas", JSON.stringify(usuarioEncontrado.zonasAsignadas));

                    window.location.href = 'pagina_coordinador.html'; 
                    break;
                default:
                    alert('Rol no reconocido');
            }
        } else {
            alert('Credenciales incorrectas. Intente de nuevo.');
        }
    });

});

