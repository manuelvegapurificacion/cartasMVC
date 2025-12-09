const title = document.title;
let zonaSeleccionada = title;

/* Un Array con todas las cartas seleccionadas actualmente para poder sacar su información en el panel central*/



function filtradoDeElementos(zonaSeleccionada) {
    const cartasDeZona = cartas.filter(carta => carta.zona === zonaSeleccionada);
    const eventosDeZona = eventos.filter(evento => evento.zona === zonaSeleccionada);
    return { cartasDeZona, eventosDeZona };
}/*No se si las cartas las filtramos con javascript o desde php con la variable y una consulta a la bd y cargamos los elementos en el array ya filtrados*/



function mostrarElementos(cartas, eventos) {
    const contenedorEventos = document.querySelector('.problemas');


   
    contenedorEventos.innerHTML = '';

    /*Decidir cuantos eventos y cartas al principio y cada turno o ronda cuantas se añaden*/
    
    const eventosAMostrar = eventos.slice(0, 2);

    //------------------------------------Bucle para mostrar cartas----------------------------------
    function actualizarPanelInfo(){
            const infoCarta = document.querySelector('.info-carta');

            //Muestra el texto predeterminado del panel y sale de la función
            if (cartasSeleccionadas.length === 0) {
                infoCarta.innerHTML = `
                <div>
                    <p><b>Info</b></p>
                    <p>Pasa el ratón sobre un Evento para ver su descripción, o selecciona una carta para ver su informacion en detalle</p>
                </div>
                `;
                return;
            }

            //Variable vacía a la que añadirle / quitarle texto
            let html = "";

            //Recorro el array de las cartas. Añado un index para tener el índice del array para uso posterior
            cartasSeleccionadas.forEach((carta, index) => {
                //Saco el nombre del evento neutralizado
                const eventoNeutralizado = eventos.find(ev => ev.id === carta.neutraliza);
                let neutralizaTexto = eventoNeutralizado.titulo;

                //Añado la información a la variable html
                html += `
                <div>
                        <p><b>${carta.titulo}</b></p>
                        <p>${carta.info}</p>
                        <p>Neutraliza: ${neutralizaTexto}</p>
                </div>
                `;
               
            });
            //Muestro la información
            infoCarta.innerHTML=html;
    }

    cartasAMostrar.forEach(carta => {
        
        //Crear div de carta y movidas
        const cartaDiv = document.createElement('div');
        cartaDiv.classList.add('carta', 'carta-mano');
        
        const efectoTexto = "+ "+ carta.efecto + " de vida para el planeta";
        
        /*relaccionar el id de neutraliza con el titulo del evento correspondiente desde javascript y quitar que las cartas no neutralizen nada dice samu*/
        let neutralizaTexto = '';
        const eventoQueNeutraliza = eventos.find(evento => evento.id === carta.neutraliza);
        if (eventoQueNeutraliza) {
            neutralizaTexto = eventoQueNeutraliza.titulo;
        }

        /*Lo que se muestra en la carta en la mano*/
        cartaDiv.innerHTML = `
            <p class="titulo-carta">${carta.titulo}</p>
            <p class="icono-carta">${carta.emoji}</p>
            
        `;

        //<p class="efecto-numero">${efectoTexto}</p> 

        manoCartas.appendChild(cartaDiv);

        // Variable para saber si está levantada
        let levantada = false;

        cartaDiv.addEventListener('click', () => {
            levantada = !levantada; // alternar estado

            if (levantada) {
                cartaDiv.classList.add('carta-levantada'); // CSS hace que suba
                cartasSeleccionadas.push(carta); //Añado la carta al array
            } else {
                cartaDiv.classList.remove('carta-levantada');
                cartasSeleccionadas = cartasSeleccionadas.filter(c => c.id !== carta.id); //Quito la carta del array
            }

            //Función aparte para actualizar el panel central con la información de las cartas en el array
            actualizarPanelInfo();
        });
    });

    //------------------------------------Bucle para mostrar eventos----------------------------------

    eventosAMostrar.forEach(evento => {
        const eventoDiv = document.createElement('div');
        eventoDiv.classList.add('carta', 'problema');
        const efectoTexto = evento.efecto + " de daño cada turno";

        eventoDiv.innerHTML = `
        <div>
            <p class="titulo-carta">${evento.titulo}</p>
            <p class="icono-carta">${evento.emoji}</p>
        </div>
            
        `;
        // <p class="efecto-numero">${efectoTexto}</p>
        contenedorEventos.appendChild(eventoDiv);

        eventoDiv.addEventListener('mouseover', () => {
            infoCarta.innerHTML = `
            <div>
                <p><b>${evento.titulo}</b></p>
                <p>${evento.info}</p>
            </div>
            `;
        });

        eventoDiv.addEventListener('mouseout', () => {
            if(cartasSeleccionadas==0){
                infoCarta.innerHTML = `
                <div>
                        <p><b>Info</b></p>
                        <p>Pasa el ratón sobre un Evento para ver su descripción, o selecciona una carta para ver su informacion en detalle</p>
                </div>
                `;
            }else{
                actualizarPanelInfo();
            }
            
        });
    });
}

/* ESTO SE HACE EN CONTROLADOR */
// /*iniciar funciones al cargar el dom*/
// document.addEventListener('DOMContentLoaded', () => {
//     let { cartasDeZona, eventosDeZona } = filtradoDeElementos(zonaSeleccionada);
//     mostrarElementos(cartasDeZona, eventosDeZona);
// });



/*Hacer movida para pasar rondas y turnos la idea seria q cuando se cargue el dom se generen eventos y cartas
/*luego al pasar o jugar turno las cartas jugadas meterlas en un array de ya usadas lo mismo con eventos y una vez clikado jugar o pasar
/*se generan nuevas cartas y eventos cada x turno o ronda ns dedicir entre los compas*/




/*Poner numero encima de la barra de vida y animarla barra de vida al subir y bajar*/
const barraVida = document.querySelector('.vida-restante');
let vidaActual = 100; // Vida inicial del planeta

function actualizarVida(cambio) {
    vidaActual += cambio;
    if (vidaActual > 100) vidaActual = 100;
    if (vidaActual < 0) vidaActual = 0;
    barraVida.style.height = vidaActual + '%';
    barraVida.textContent = vidaActual + '%';//Sustituir esto por una etiqueta nueva en el html y posicionarla encima de la barra
}
/*probar funcion actualizar vida*/
actualizarVida(-20); 


/*Duda quiero que el jugador pueda tirar varias cartas a la vez pero eso significa q en info
/* q se deberia mostrar la info de todas las cartas seleccionadas o la ultima seleccionada?
/*Actualmente solo muestra la ultima seleccionada
*/


/*Dice samu que la filtracion de cartas y eventos se haga desde php con consultas a la bd
/*y que se envie la zona seleccionada desde php a javascript y se carguen los arrays ya filtrados
/*asi que la funcion de filtrado de elementos en javascript no haria falta
*/

/*Todas las cartas neutralizan algo hay que cambiar el texto de las cartas q no neutralizan nada no puede ser null todas las cartas neutralizan algo camnbiar codigo*/