document.addEventListener('DOMContentLoaded', async () => {

    const bodyId = document.body.id;

    switch(bodyId){

        case "tablero":
            const modeloCartas = new MCartas();
            const controladorCartas = new CCartas(modeloCartas);

            const modeloEventos = new MEventos();
            const controladorEventos = new CEventos(modeloEventos);

            const vistaCartas = new VistaCartas(controladorCartas, controladorEventos);
            controladorCartas.vista = vistaCartas;
            controladorEventos.vista = vistaCartas;

            await controladorCartas.cargarCartas();
            await controladorEventos.cargarEventos();

            break;
        
        case "zonas":
            const modeloZonas = new MZonas();
            const controladorZonas = new CZonas(modeloZonas);
            const vistaZonas = new VistaZonas(controladorZonas);
            controladorZonas.vista = vistaZonas;
            await controladorZonas.cargarZonas();
            break;

        default:
            console.log("Error en app.js");

    }

});