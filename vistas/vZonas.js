class VistaZonas{

    constructor(controladorZonas){
        this.contenedorTarjetas = document.getElementById("contenedor-tarjetas");
        this.controladorZonas = controladorZonas;
    }

    mostrarZonas(zonas){
        let html="";
        zonas.forEach(zona => {
            html+= `
                <a href="tablero.html?z=${zona.id_zona}" class="tarjeta">
                <img src="${zona.imagenZona}" alt="${zona.nombre}">
                <h3 class="titulo-tarjeta">${zona.nombre}</h3>
                </a>
            `;
        });
        this.contenedorTarjetas.innerHTML=html;
        
    }

    mostrarError(mensaje){
        this.contenedorTarjetas.innerHTML = `<p style="color: red;">Error: ${mensaje}</p>`;
    }

}