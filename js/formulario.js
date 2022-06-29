let datos = []


let formulario = document.getElementById("form-valores")
formulario.addEventListener("submit",enviarform)
    function enviarform(e){
            e.preventDefault()
            let nombreapellido = document.getElementById("nombre-apellido").value
            let email = document.getElementById("email").value
            let especialidades = document.getElementById("especialidades").value

            let mostrar = {
                nombre : nombreapellido,
                email : email,
                especialidades : especialidades
            }
            console.log(mostrar)
            datos.push(mostrar)

            let imprimir = document.getElementById("mostrar")
            imprimir.innerHTML = ""
            let contador=0
            for(let elemento of datos){
            contador++
            if (contador > 5) {
            imprimir.innerHTML += `
                                        <thead>
                                        <tr>
                                            <th>Nombre/Apellido</th>
                                            <th>Email</th>
                                            <th>Especialidades</th>
                                        </tr>
                                        <tbody>
                                            <tr class="color-tabla-dinamica">
                                                <td>${elemento.nombre}</td>
                                                <td>${elemento.email}</td>
                                                <td>${elemento.especialidades}</td>
                                            </tr>
                                        </tbody>

            `
            }
            else{
                imprimir.innerHTML += `
                                        <thead>
                                        <tr>
                                            <th>Nombre/Apellido</th>
                                            <th>Email</th>
                                            <th>Especialidades</th>
                                        </tr>
                                        <tbody>
                                            <tr>
                                                <td>${elemento.nombre}</td>
                                                <td>${elemento.email}</td>
                                                <td>${elemento.especialidades}</td>
                                            </tr>
                                        </tbody>

            `
            }
        }
    }      
        
let tres = document.getElementById("tres")
tres.addEventListener("click",btn_3)
function btn_3(e){

    for(i=0;i<3;i++){
        enviarform(e)
    }
}

let vaciar = document.getElementById("vaciar")
vaciar.addEventListener("click",function(e){
    e.preventDefault();
    let imprimir = document.getElementById("mostrar")
    imprimir.innerHTML = ""
    datos = []
})

