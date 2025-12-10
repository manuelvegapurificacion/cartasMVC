class VistaCartas{
    constructor(controladorCartas, controladorEventos, controladorZonas){
        this.mano = document.querySelector('.mano');
        this.infoCarta = document.querySelector('.info-carta');
        this.contenedorEventos = document.querySelector('.problemas');
        this.evento = document.querySelector('.problema');
        this.carta = document.querySelector('.carta-mano');
        this.cartasSeleccionadas = [];
        this.controladorCartas = controladorCartas;
        this.controladorEventos = controladorEventos;
        this.controladorZonas = controladorZonas
        //this.controladorCartas.cargarEventos();
        //this.controladorCartas.cargarCartas();
    }

    mostrarZonas(zonas){
        //No muestra las zonas, sino los fondos. Tiene que llamarse así por el controlador.
        //Las imágenes ahora mismo están estáticas! Tendrían que ser dinámicas y sacadas de la base de datos mediante id!
        //Eso lo puedo hacer yo luego si quereis
        const urlParams = new URLSearchParams(window.location.search);
        const z = urlParams.get('z');
        console.log(z);
        console.log(zonas);
        let zonaSeleccionada = zonas.find(zona => zona.id_zona == z);
        console.log(zonaSeleccionada.nombre);
        console.log(zonaSeleccionada.imagenEventos);
        document.body.style.backgroundImage = zonaSeleccionada.fondoZona;
        this.evento.style.backgroundImage = `url('../${zonaSeleccionada.imagenEventos}')`;
        this.carta.style.backgroundImage = "url(../imagenes/cartas/cartaBosque.png)";
    }

    mostrarCartas(cartas){
        this.mano.innerHTML = '';
        const cartasAMostrar = cartas.slice(0,5); 
        
        cartasAMostrar.forEach(carta => {
        
            //Crear div de carta y movidas
            const cartaDiv = document.createElement('div');
            cartaDiv.classList.add('carta', 'carta-mano');
            
            const efectoTexto = "+ "+ carta.efecto + " de vida para el planeta";

            /*Lo que se muestra en la carta en la mano*/
            cartaDiv.innerHTML = `
                <p class="titulo-carta">${carta.titulo}</p>
                <p class="icono-carta">${carta.emoji}</p>
                
            `;

            //<p class="efecto-numero">${efectoTexto}</p> 

            this.mano.appendChild(cartaDiv);

            // Variable para saber si está levantada
            let levantada = false;

            cartaDiv.addEventListener('click', () => {
                levantada = !levantada; // alternar estado

                if (levantada) {
                    cartaDiv.classList.add('carta-levantada'); // CSS hace que suba
                    this.cartasSeleccionadas.push(carta); //Añado la carta al array
                } else {
                    cartaDiv.classList.remove('carta-levantada');
                    this.cartasSeleccionadas = this.cartasSeleccionadas.filter(c => c.id_carta !== carta.id_carta); //Quito la carta del array
                    console.log("Carta quitada", carta.id_carta)
                }

                //Función aparte para actualizar el panel central con la información de las cartas en el array
                this.actualizarPanelInfo();
            });
        });
    }

    mostrarEventos(eventos){
        this.contenedorEventos.innerHTML = '';
        const eventosAMostrar = eventos.slice(0, 2);
        eventosAMostrar.forEach(evento => {
            console.log("mostrando eventoooooo en la vista " + evento.titulo);
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
            this.contenedorEventos.appendChild(eventoDiv);

            eventoDiv.addEventListener('mouseover', () => {
                this.infoCarta.innerHTML = `
                <div>
                    <p><b>${evento.titulo}</b></p>
                    <p>${evento.info}</p>
                </div>
                `;
            });

            eventoDiv.addEventListener('mouseleave', () => {
                if(this.cartasSeleccionadas.length===0){
                    this.infoCarta.innerHTML = `
                    <div>
                            <p><b>Info</b></p>
                            <p>Pasa el ratón sobre un Evento para ver su descripción, o selecciona una carta para ver su informacion en detalle</p>
                    </div>
                    `;
                }else{
                    this.actualizarPanelInfo();
                }
                
            });
        });
    }

    mostrarError(mensaje){
        this.infoCarta.innerHTML = `<p style="color: red;">Error: ${mensaje}</p>`;
    }

    actualizarPanelInfo = () => {

            //Muestra el texto predeterminado del panel y sale de la función
            if (this.cartasSeleccionadas.length === 0) {
                this.infoCarta.innerHTML = `
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
            this.cartasSeleccionadas.forEach((carta, index) => {

                //Añado la información a la variable html
                html += `
                <div>
                        <p><b>${carta.titulo}</b></p>
                        <p>${carta.info}</p>
                        <p>Neutraliza: ${carta.nombreNeutraliza}</p>
                </div>
                `;
               
            });
            //Muestro la información
            this.infoCarta.innerHTML=html;
        }
}