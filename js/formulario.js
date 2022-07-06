
/*
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

/*
let vaciar = document.getElementById("vaciar")
vaciar.addEventListener("click",function(e){
    e.preventDefault();
    let imprimir = document.getElementById("mostrar")
    imprimir.innerHTML = ""
    datos = []
})

*/

//---------------------------



const url = "https://62c0ab51d40d6ec55cd46776.mockapi.io/api/Especialidad"
let deleteId;
let page = 1
let limit = 8;
let id = 0
const modal_container = document.getElementById('modal_container');
const imprimir = document.getElementById("mostrar")

async function obtenerDatos(){

    
    try{
        let res = await fetch(`${url}?page=${page}&limit=${limit}`)
        let json = await res.json()
        console.log(json)

        let contador=0
        imprimir.innerHTML = ""
        for(const usuario of json){
            contador++
            let nombre = usuario.Nombre_apellido
            let email =  usuario.email
            let especialidad = usuario.especialidad
            id = usuario.id 
            if (contador > 5) {
                imprimir.innerHTML += `
                                        <tr class="color-tabla-dinamica">
                                            <td>${usuario.Nombre_apellido}</td>
                                            <td>${usuario.email}</td>
                                            <td>${usuario.especialidad}</td>
                                            <td><button class="elimina" data-id=${usuario.id}>🗑</button><button class="edita" data-id2=${usuario.id}>✍</button></td>
                                        </tr>
                                            ` 
                                            document.querySelectorAll(".elimina").forEach((boton)=>{
                                                boton.addEventListener("click",Eliminardatos)
                                            })
                                            document.querySelectorAll(".edita").forEach((boton)=>{
                                                boton.addEventListener("click",modificarDatos)
                                            })
   
        }
        else{
            imprimir.innerHTML += `
                                   <tr>
                                        <td>${usuario.Nombre_apellido}</td>
                                        <td>${usuario.email}</td>
                                        <td>${usuario.especialidad}</td>
                                        <td><button class="elimina" data-id=${usuario.id}>🗑</button><button class="edita" data-id2=${usuario.id}>✍</button></td>
                                    </tr>
    
                            `
                                            document.querySelectorAll(".elimina").forEach((boton)=>{
                                                boton.addEventListener("click",Eliminardatos)
                                            })
                                            document.querySelectorAll(".edita").forEach((boton)=>{
                                                boton.addEventListener("click",modificarDatos)
                                            })
            
        }
    }
}
    catch(error){
        console.log(error)
    }
}

obtenerDatos()


async function enviarform(event){
    event.preventDefault()
    let nombreapellido = document.getElementById("nombre-apellido").value
    let email = document.getElementById("email").value
    let especialidades = document.getElementById("especialidades").value
    let enviarForm = document.querySelector("#enviarForm").value
    let usuario = {
        "Nombre_apellido" : nombreapellido,
        "email" : email,
        "especialidad" : especialidades,
        "id" : id
    }
    console.log(usuario)
    
    if(enviarForm == "ENVIAR"){
        try{
            let res = await fetch(`${url}?page=${page}&limit=${limit}`, {
                "method" : "POST",
                "headers" : {"Content-Type": "application/json"},
                "body" : JSON.stringify(usuario)
            })
            if(res.status === 201){
                console.log("Se agrego correctamente (btn-enviar)")
            }
            }
        catch(error){
            console.log(error)
        }
    obtenerDatos()
    }
    else if(enviarForm == "ENVIAR X3"){
        for(let i=0;i<3;i++){
            try{
                let res = await fetch(`${url}?page=${page}&limit=${limit}`, {
                    "method" : "POST",
                    "headers" : {"Content-Type": "application/json"},
                    "body" : JSON.stringify(usuario)
                })
                if(res.status === 201){
                    console.log("Se agrego correctamente (btn-enviarX3)")
                }
                obtenerDatos()
                }
            catch(error){
                console.log(error)
            }
        }
    }
}



function modificarDatos(evento){
    modal_container.classList.add('show');
    deleteId = this.dataset.id2

    console.log(deleteId)

    let nombreapellido_edit = document.getElementById("nombre-apellido-edit").value  
    let email_edit = document.getElementById("email-edit").value
    let especialidades_edit = document.getElementById("especialidades-edit").value

    let usuario = {
        "Nombre_apellido" : nombreapellido_edit,
        "email" : email_edit,
        "especialidad" : especialidades_edit
    }
}

document.querySelector("#close").addEventListener("click", async function(e){
    e.preventDefault()

    console.log(deleteId)
    
    console.log("cerro")
    let nombreapellido_edit = document.getElementById("nombre-apellido-edit").value  
    let email_edit = document.getElementById("email-edit").value
    let especialidades_edit = document.getElementById("especialidades-edit").value
    let usuario = {
        "Nombre_apellido" : nombreapellido_edit,
        "email" : email_edit,
        "especialidad" : especialidades_edit
    }
    try{
        let res = await fetch(`${url}/${deleteId}`, {
            "method" : "PUT",
            "headers" : {"Content-Type": "application/json"},
            "body" : JSON.stringify(usuario)
        })
        if(res.status === 200){
            console.log("Se agrego correctamente (btn-modificar")
            imprimir.innerHTML += `
                            <tr>
                                <td>${usuario.Nombre_apellido}</td>
                                <td>${usuario.email}</td>
                                <td>${usuario.especialidad}</td>
                            </tr>                             
                            `
                            
        }
    }
    catch(error){
        console.log(error)
    }
    obtenerDatos()
    modal_container.classList.remove('show');
})


async function Eliminardatos(event){
    event.preventDefault()
    let deleteId = this.dataset.id
    console.log(deleteId)
    try{
        let res = await fetch(`${url}/${deleteId}`, {
            "method" : "DELETE"
        })
        console.log(id)
        if(res.status === 200){
            console.log("Se agrego correctamente")
        }
    }
    catch(error){
        console.log(error)
    }
    obtenerDatos()
}




document.querySelector("#next").addEventListener("click",function(e){
    page++
    if(page>1){
        obtenerDatos()
    }
})

document.querySelector("#previous").addEventListener("click",function(e){
    page--
    if(page==1){
        obtenerDatos()
    }
})

document.querySelector("#btn-filtrar").addEventListener("click", filtrarBusqueda);

async function filtrarBusqueda(){
    console.log("entro")
    let filtro = document.querySelector("#buscador").value;
    let filtroOpciones =  document.querySelector("#opciones").value;
    if(filtro != ""){
        console.log("entro2")
        let res = await fetch (`${url}?${filtroOpciones}=${filtro}`);
        let json = await res.json();
       imprimirDatos(json) 
    }
}
function imprimirDatos(json){
        imprimir.innerHTML = ""
        for(const usuario of json){
            let nombre = usuario.Nombre_apellido
            let email =  usuario.email
            let especialidad = usuario.especialidad
            id = usuario.id 
            imprimir.innerHTML += `
                                   <tr>
                                        <td>${usuario.Nombre_apellido}</td>
                                        <td>${usuario.email}</td>
                                        <td>${usuario.especialidad}</td>
                                        <td><button class="elimina" data-id=${usuario.id}>🗑</button><button class="edita" data-id2=${usuario.id}>✍</button></td>
                                    </tr>
    
                            `
                                            document.querySelectorAll(".elimina").forEach((boton)=>{
                                                boton.addEventListener("click",Eliminardatos)
                                            })
                                            document.querySelectorAll(".edita").forEach((boton)=>{
                                                boton.addEventListener("click",modificarDatos)
                                            })
    }
}

/*
let tres = document.querySelector("tres")
tres.addEventListener("click",async function(e){
    e.preventDefault()

    let nombreapellido = document.getElementById("nombre-apellido").value
    let email = document.getElementById("email").value
    let especialidades = document.getElementById("especialidades").value
    let info = [
        {
        "Nombre_apellido" : nombreapellido,
        "email" : email,
        "especialidad" : especialidades
        },
        {
        "Nombre_apellido" : nombreapellido,
        "email" : email,
        "especialidad" : especialidades
        },
        {
        "Nombre_apellido" : nombreapellido,
        "email" : email,
        "especialidad" : especialidades
    }]
        try{
            for(let i = 0; i < info.length ;i++){
                await fetch(`${url}?page=${page}&limit=${limit}`, {
                    "method" : "POST",
                    "headers" : {"Content-Type": "application/json"},
                    "body" : JSON.stringify(info[i]),
                })
                obtenerDatos()
            }
            console.log("entroX3")
        }
        catch(error){
            console.log(error)
        }

})
*/
document.querySelector("#form-valores").addEventListener("submit",enviarform)





