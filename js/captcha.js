'use strict'

let inputCaptcha = document.querySelector(".imp-captcha");
let captcha = 1;
let btnEnviar= document.querySelector("#boton");
btnEnviar.addEventListener("click", verificarCaptcha);


function cambiarCaptcha() {
    captcha++;
    if (captcha > 3) {
        captcha = 1;
    }
    document.querySelector(".captcha").src="../images/captcha/"+captcha+".jpg";
}

function verificarCaptcha(event) {
    event.preventDefault()
    let text = document.querySelector(".imp-captcha").value;
       if (text == "15" && captcha == 1){
        console.log("enviar");
        cambiarCaptcha();
        document.querySelector(".alerta").innerHTML="El captcha es correcto";
        return true;
    }
    if (text == "u9mcjk" && captcha == 2){
        console.log("enviar");
        cambiarCaptcha();
        document.querySelector(".alerta").innerHTML="El captcha es correcto";
        return true;
    }
    if (text == "qGphJD" && captcha == 3){
        console.log("enviar");
        cambiarCaptcha();
        document.querySelector(".alerta").innerHTML="El captcha es correcto";
        return true;
    }
    document.querySelector(".alerta").innerHTML="El captcha ingresado es incorrecto";
    return false;

}