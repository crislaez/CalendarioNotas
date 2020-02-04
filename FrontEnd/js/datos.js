'use strict';
var opcion = true;
var opcion2 = true;
var opcion3 = true;
var opcion4 = true;
var opcion5 = true;
var mesActual, anhoActual;;
var dia, mes, anyo, codigo;
var idTareas = 0;
var arrayMes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function menuLateral() {
    let botonMenu = document.querySelector('#botonMenu')
    let menu = document.querySelector('.menu');
    let articulo = document.querySelector('.articulo');

    botonMenu.addEventListener('click', function () {
        if (opcion) {
            menu.style.width = '17%';
            articulo.style.width = '83%';
            opcion = false;
        } else {
            menu.style.width = '0%';
            articulo.style.width = '100%';
            opcion = true;
        }
    })
}

function ponerCalendario() {
    let divCalendario = $('.divCalendario');
    divCalendario.datepicker();
}

function aparecerCalendario() {

    let botonCrear = document.querySelector('#botonCrear');
    let divFlotante = document.querySelector('.divFlotante');

    botonCrear.addEventListener('click', function () {
        if (opcion2) {
            // divFlotante.style.display = 'block';
            divFlotante.style.width = '40%';
            divFlotante.style.height = '400px';
            opcion2 = false;
        } else {
            // divFlotante.style.display = 'none';
            divFlotante.style.width = '0%';
            divFlotante.style.height = '0px';
            opcion2 = true;
        }
    })
}

function recogeDatosFormulario() {
    let formulario = document.querySelector('#formulario');
    let input = formulario.getElementsByTagName('input');

    formulario.addEventListener('submit', function () {
        event.preventDefault();

        if (!input[0].value) {
            alert('Rellene el titulo de la tarea');
        } else if (!input[1].value) {
            alert('Rellene la descripcion de la tarea');
        } else if (!input[2].value) {
            alert('Rellene la fecha de la tarea');
        } else if (!input[3].value) {
            alert('Rellene la hora de inicio de la tarea');
        } else if (!input[4].value) {
            alert('Rellene la hora de finalizar de la tarea');
        } else if (input[3].value > input[4].value) {
            alert('La fecha del final no puede ser mayor que la de inicio')
        } else {
            //enviar los datos
            let tarea =
            {
                titulo: input[0].value,
                descripcion: input[1].value,
                fecha: input[2].value,
                horaInicio: input[3].value,
                horaFin: input[4].value
            };

            peticuonAjax(tarea, input);
        }
    })
}

function peticuonAjax(dato, input) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8088/cristian/WebNotas/BackEnd/ingresarTarea.php',
        data: dato,
        success: function (response) {
            console.log(response);
            if (response == 'registro exitoso') {
                limpiarFormulario(input);
                console.log('registrado');
                mostrarDatosTareas();
            } else {
                alert('Error')
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function recogerDatosFormularioDos() {
    let formularioDos = document.querySelector('#formularioDos');
    let input = formularioDos.getElementsByTagName('input');

    formularioDos.addEventListener('submit', function () {
        event.preventDefault();

        if (!input[0].value) {
            alert('Rellene el titulo de la tarea');
        } else if (!input[1].value) {
            alert('Rellene la descripcion de la tarea');
        } else if (!input[2].value) {
            alert('Rellene la hora de inicio de la tarea');
        } else if (!input[3].value) {
            alert('Rellene la hora de finalizar de la tarea');
        } else if (input[2].value > input[3].value) {
            alert('La fecha del final no puede ser mayor que la de inicio')
        } else {
            //enviar los datos
            let dias = 0;
            if (dia < 10) {
                dias = '0' + dia;
            }
            else {
                dias = dia;
            }
            let tarea =
            {
                titulo: input[0].value,
                descripcion: input[1].value,
                fecha: anyo + '-' + mes + '-' + dia,
                horaInicio: input[2].value,
                horaFin: input[3].value
            };

            peticuonAjax(tarea, input);
        }
    })
}

//funcion para limpiar los input de los formulario
function limpiarFormulario(input) {

    input[0].value = '';
    input[1].value = '';
    input[2].value = '';
    input[3].value = '';
    if (input[4].type == 'time') {
        input[4].value = '';
        document.querySelector('.divFlotante').style.width = '0%';
        document.querySelector('.divFlotante').style.height = '0px';
        opcion2 = true;
    } else {
        console.log('aqui')
        document.querySelector('.divFlotanteDos').style.width = '0%';
        document.querySelector('.divFlotanteDos').style.marginLeft = '99.5%';
        opcion3 = true;
    }
}

//esta funcion llama al php donde esta el calendario, le pasamos el año y el mes para que se cargue dinamicamente
function cargarCalendario(mes = 1, anho = 2020) {
    fetch('../BackEnd/mostrarCalendario.php?mes=' + mes + '&anho=' + anho)
    .then(data => data.text())
    .then(respuesta => {
        let articulo = document.querySelector('.articulo');
        articulo.innerHTML = respuesta;
        eventosTd();
    })
    .catch(error => {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });

}

//esta funcion es para cunado clicamos en las flechas que estan arriba de la pagina, en el que la variable mes incrementara o decrementara 
//para ir cambiando cada mes
function escogerMes() {
    let botonIzquierda = document.querySelector('#botonIzquierda');
    let botonDerecha = document.querySelector('#botonDerecha');

    //evento click de la flecha izqueirda
    botonIzquierda.addEventListener('click', function () {
        mesActual--;
        if (mesActual == 0) {
            anhoActual--;
            mesActual = 12;
        }

        cargarCalendario(mesActual, anhoActual);
        mostrarDatosTareas();
    })

    //evento click de la felcha derecha
    botonDerecha.addEventListener('click', function () {
        mesActual++;
        if (mesActual == 12) {
            anhoActual++;
            mesActual = 1;

        }

        cargarCalendario(mesActual, anhoActual);
        mostrarDatosTareas();
    })
}

//funcion para saber el mes y el año actual
//dentro llamamos a la funcion del calendario para cargarlo
function mesActual() {
    let tiempo = new Date();
    tiempo.getFullYear();
    mesActual = tiempo.getMonth() + 1;
    anhoActual = tiempo.getFullYear();
    cargarCalendario(mesActual, anhoActual);
}

//funcion para dar evento a los td del calendario
function eventosTd() {
    let tabla = document.querySelector('#tabla')
    let td = tabla.getElementsByTagName('td');

    for (let i = 0; i < td.length; i++) {
        td[i].addEventListener('click', clickEventosTd);
    }
}

//fucncion que se ejecuta cuando hacemos click en cada td
function clickEventosTd() {
    let span = this.getElementsByTagName('span');
    let aux = span[0].innerHTML.split('-');
  
    dia = aux[2];
    mes = aux[1];
    anyo = aux[0];
    
    if (dia <= 0 || dia >= 32) {
    }
    else if((mes == 2 && dia >=29) || (mes == 4 && dia >=31) || (mes == 6 && dia >=31) || (mes == 9 && dia >=31) || (mes == 11 && dia >=31)){

    }
    else {
        mostrarDivFlotanteDos();
    }
}
//4------6----------------9-------11

//esta e sla funcion que mostrara el div de la derecha que esta oculto, para indresar una tarea, pero solo se mostrara cuando la variable dia
//sea entre 1 a 31
function mostrarDivFlotanteDos() {
    let divFlotanteDos = document.querySelector('.divFlotanteDos');
    let h3 = divFlotanteDos.getElementsByTagName('h3');
    h3[0].innerHTML = `Dia ${dia} de ${arrayMes[mes - 1]} de ${anyo}`;

    if (opcion3) {
        divFlotanteDos.style.width = '40%';
        divFlotanteDos.style.marginLeft = '50%';
        opcion3 = false;
    }
    else {
        divFlotanteDos.style.width = '0%';
        divFlotanteDos.style.marginLeft = '99.5%';
        opcion3 = true;
    }
}

//esta e sla funcion de recargar la tabla del calendario, en la qeu llamaremos cada vez que hagamso un evento
//para recargarlo
function mostrarDatosTareas() {
    fetch('http://localhost:8088/cristian/WebNotas/BackEnd/mostrarTareas.php')
    .then(data => data.text())
    .then(datos => {
        borrarbotones();
        // console.log(JSON.parse(datos))
        ingresarTareasEnTable(JSON.parse(datos));
        eventoBotonTarea();
    })
    .catch(error => {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

//buscamos los sapn y los td de la celda y s elo pasamos a la funcion de abajo recorriendo el array 
//recibido de tareas
function ingresarTareasEnTable(res) {
    let tabla = document.querySelector('#tabla');
    let td = tabla.getElementsByTagName('td');
    for (let i = 0; i < td.length; i++) {
        let span = td[i].getElementsByTagName('span');
        recorrerRespuesta(span[0].innerHTML, td[i], res);
    }
}

//si la fecha de la tarea es igual al span escondido de cada td, le creamos un boton
//y le asignamos estilos
function recorrerRespuesta(span, td, res) {
    // eliminarElemento(td)
    for (let i = 0; i < res.length; i++) {

        //todos los tds tienen en un span escondido la fecha y un codigo
        //si las fechas del JSON que esta en la base de datos, coincide con el span escondido
        //creariamos un boton que he llamado div, y al mismo le damos otro span escondido con los valores del json
        if (res[i].fecha == span) {  
            var div = document.createElement('button');
            var spanDos = document.createElement('span');

            spanDos.innerHTML = `${res[i].titulo}/${res[i].descripcion}/${res[i].horainicio}/${res[i].horafin}/${res[i].codigo}`;
            spanDos.style.display = 'none';
            estiloDiv(div);
            div.append(spanDos);
            td.append(div);
            idTareas++;
        }
    }
}

//funcion en el que se borran todos los botones para que se creen de nuevo al recargar la pagina
function borrarbotones() {
    console.log('borrado')
    $('#tabla button').remove();

}

//dar estilo a los botones de tareas
function estiloDiv(div) {
    div.setAttribute('class','tdBotones');
    div.innerHTML = 'T';
    div.style.color = 'white';
    div.id = idTareas;
}

//dar evento a los botones de tareas
function eventoBotonTarea() {
    let boton = document.getElementsByTagName('button');
    //empezamos desde 3 porque hay 3 botones creados en el html y no queremos darle ese evento
    for (let i = 3; i < boton.length; i++) {
        boton[i].addEventListener('click', verTarea);
    }
}

//evento click del boton de la tarea
function verTarea() {
    let span = this.getElementsByTagName('span');
    let datos = span[0].innerHTML.split('/');
    codigo = datos[4];

    //tdBoton es el td padre del boton tarea, le quetamos el evento para que cuando pinchamos en el boton
    //no salga tambien el menu para añadir tarea del evento padre
    let tdBoton = this.parentNode;
    tdBoton.removeEventListener('click', clickEventosTd, false);
    let aux = 0;
    var tiempo = setInterval(function () {
        if (aux == 1) {
            //le devolvemos el evento
            tdBoton.addEventListener('click', clickEventosTd);
            clearInterval(tiempo);           
        }
        aux++
    }, 200);

    let divFlotante = document.querySelector('.divMostrarTarea');

    divFlotante.innerHTML =
        ` <h3>${datos[0]}</h3>
          <h4>Descripcion:</h4>
          <p>${datos[1]}</p>
          <p><strong>Fecha inicio:</strong>${datos[2]}</p>
          <p><strong>Fecha fin:</strong>${datos[3]}</p>
          <input type="button" id="botonBorrar" value="Borrar">
        `;
    eventoBorrar(divFlotante);

    if (opcion4) {
        divFlotante.style.display = 'block';
        opcion4 = false;
    } else {
        divFlotante.style.display = 'none';
        opcion4 = true
    }
}


//esta funcio se ejecuta cuando ponchemos en el boton de borrar las tareas
function eventoBorrar(divFlotante) {

    let botonBorrar = document.querySelector('#botonBorrar');
    botonBorrar.addEventListener('click', function () {

        let confirmacion = confirm('Estas seguro que deseas borrar las tareas?');
  
        if (confirmacion) {
            fetch('http://localhost:8088/cristian/WebNotas/BackEnd/borrarTarea.php?codigo=' + codigo)
            .then(data => data.text())
            .then(response => {      
                //ocultamos el div
                divFlotante.style.display = 'none';
                opcion4 = true;
                //llamamos a la funcion de recargar el div
                mostrarDatosTareas();
            })
            .catch(error => {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            });
        }
    })
}