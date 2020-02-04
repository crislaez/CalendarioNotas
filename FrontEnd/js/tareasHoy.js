'use strict';

function mostrarTareasHoy(){
    let fechaActual = new Date();

    var fecha;
    if((fechaActual.getMonth()+1) < 10){
        if(fechaActual.getDay() < 10){
            fecha = `${fechaActual.getFullYear()}-0${(fechaActual.getMonth()+1)}-0${fechaActual.getDate()}`;
        }
        else{
            fecha = `${fechaActual.getFullYear()}-0${(fechaActual.getMonth()+1)}-${fechaActual.getDate()}`;
        }       
    }else{
        if(fechaActual.getDay() < 10){
            fecha = `${fechaActual.getFullYear()}-${(fechaActual.getMonth()+1)}-0${fechaActual.getDate()}`;
        }
        else{
            fecha = `${fechaActual.getFullYear()}-${(fechaActual.getMonth()+1)}-${fechaActual.getDate()}`;
        }
    }  

    console.log(fecha);
    fetch('http://localhost:8088/cristian/WebNotas/BackEnd/tareasHoy.php?fecha='+fecha)
    .then(data => data.text())
    .then(resposne => {
        console.log(JSON.parse(resposne));
        rellenarDatosTareasHoy(JSON.parse(resposne))
    })
    .catch(error => {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    })
    
}

function rellenarDatosTareasHoy(respuesta){
    let rellenarDatos = document.querySelector('.rellenarDatos');
    for(let valor in respuesta){
        rellenarDatos.innerHTML += 
            `<div>
                <h4>${respuesta[valor].titulo}</h4>
                <p class='parrafo'>${respuesta[valor].descripcion}</p>
                <p class='fechaI'><strong>Hora inicio:</strong> ${respuesta[valor].horainicio}</p>
                <p class='fechaF'><strong>Hora fin:</strong> ${respuesta[valor].horafin}</p>
            </div>
            `;
    }    
}