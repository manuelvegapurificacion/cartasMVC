document.addEventListener('DOMContentLoaded', async () => {
    const modeloCartas = new MCartas();
    const controladorCartas = new CCartas(modeloCartas);

    const modeloEventos = new MEventos();
    const controladorEventos = new CEventos(modeloEventos);

    const vista = new Vista(controladorCartas, controladorEventos);
    controladorCartas.vista = vista;
    controladorEventos.vista = vista;
    
    // Iniciar el juego cargando las cartas

    await controladorCartas.cargarCartas();
    await controladorEventos.cargarEventos();

});