class MCartas{
    constructor(){
        this.rutaPHP = 'modelo/mCartas.php';
    }

    async obtenerCartas(){
        try{
            console.log('Modelo: Solicitando cartas al php');
            const respuesta = await fetch(this.rutaPHP);

            if(!respuesta.ok){
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }

            const cartas = await respuesta.json();
            console.log("Datos recibidos");

            return cartas;
        }catch(error){
            console.error('Modelo: Error al obtener cartas:', error);
            throw error;
        }
    }
}