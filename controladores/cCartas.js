class CCartas {

    constructor(modelo, vista){
        this.modelo = modelo;
        this.vista = vista;
        console.log('Controlador: Inicializado');
    }

    async cargarCartas(){
        try{
            const cartas = await this.modelo.obtenerCartas();
            this.vista.mostrarCartas(cartas);
        }catch(error){
            this.vista.mostrarError('Fallo al cargar las cartas');
        }
    }

}