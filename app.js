document.addEventListener('DOMContentLoaded', async () => {
    const modelo = new MCartas();
    const controlador = new CCartas(modelo);
    const vista = new Vista(controlador);
    controlador.vista = vista;
    
    // Iniciar el juego cargando las cartas
    await controlador.cargarCartas();
});