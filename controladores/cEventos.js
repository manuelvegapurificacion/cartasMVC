class CEventos{
    constructor(modelo, vista){
        this.modelo = modelo;
        this.vista = vista;
        console.log('Controlador: Inicializado');
    }

    async cargarEventos(){
        try{
            const eventos = await this.modelo.obtenerEventos();
            this.vista.mostrarEventos(eventos);
        }catch(error){
            this.vista.mostrarError('Fallo al cargar los eventos');
        }
    }
}