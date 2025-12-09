class Vista{
    constructor(controlador){
        this.mano = document.querySelector('.mano');
        this.infoCarta = document.querySelector('.info-carta')
    }

    mostrarElementos(cartas){
        this.mano.innerHTML = '';
        const cartasAMostrar = cartas.slice(0,5); 
        let cartasSeleccionadas = [];
        const actualizarPanelInfo = () => {

            //Muestra el texto predeterminado del panel y sale de la función
            if (cartasSeleccionadas.length === 0) {
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
            cartasSeleccionadas.forEach((carta, index) => {

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
                    cartasSeleccionadas.push(carta); //Añado la carta al array
                } else {
                    cartaDiv.classList.remove('carta-levantada');
                    cartasSeleccionadas = cartasSeleccionadas.filter(c => c.id !== carta.id); //Quito la carta del array
                }

                //Función aparte para actualizar el panel central con la información de las cartas en el array
                actualizarPanelInfo();
            });
        });
    }

    mostrarError(mensaje){
        this.infoCarta.innerHTML = `<p style="color: red;">Error: ${mensaje}</p>`;
    }
}