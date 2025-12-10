class MEventos{
    constructor(){
        this.rutaPHP = 'modelo/mEventos.php';
        
    }

    async obtenerEventos(){
        try{
            console.log('Modelo: Solicitando eventos al php');
            const respuesta = await fetch(this.rutaPHP); 
            //const respuesta = await fetch('index.php?c=Cartas&m=mCartas');

            if(!respuesta.ok){
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }

            const eventos = await respuesta.json();
            console.log("Datos recibidos");
            console.log("mostrando eventos ... " + eventos[0].titulo);

            return eventos;
        }catch(error){
            console.error('Modelo: Error al obtener eventos:', error);
            throw error;
        }
    }
}