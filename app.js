document.addEventListener('DOMContentLoaded', async () => {

    const bodyId = document.body.id;

            const modeloZonas = new MZonas();
            const controladorZonas = new CZonas(modeloZonas);

        if(bodyId=="tablero"){
            const modeloCartas = new MCartas();
            const controladorCartas = new CCartas(modeloCartas);

            const modeloEventos = new MEventos();
            const controladorEventos = new CEventos(modeloEventos);

            const vistaCartas = new VistaCartas(controladorCartas, controladorEventos, controladorZonas);
            controladorCartas.vista = vistaCartas;
            controladorEventos.vista = vistaCartas;
            controladorZonas.vista = vistaCartas;

            await controladorCartas.cargarCartas();
            await controladorEventos.cargarEventos();
            await controladorZonas.cargarZonas();
        }else{
            const vistaZonas = new VistaZonas(controladorZonas);
            controladorZonas.vista = vistaZonas;
            await controladorZonas.cargarZonas();
        }
});