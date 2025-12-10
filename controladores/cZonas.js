class CZonas{
    constructor(modelo, vista){
        this.modelo = modelo;
        this.vista = vista;
        console.log('Controlador: Inicializado');
    }

    async cargarZonas(){
        try{
            const zonas = await this.modelo.obtenerZonas();
            this.vista.mostrarZonas(zonas);
        }catch(error){
            this.vista.mostrarError('Fallo al cargar las zonas');
        }
    }
}