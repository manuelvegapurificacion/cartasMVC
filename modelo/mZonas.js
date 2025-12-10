class MZonas {
    constructor() {
        this.rutaPHP = 'modelo/mZonas.php';
    }

    async obtenerZonas() {
        try {
            console.log('Modelo: Solicitando zonas al PHP');
            const respuesta = await fetch(this.rutaPHP);

            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }

            const zonas = await respuesta.json();
            console.log("Modelo: Zonas recibidas correctamente");

            return zonas;
        } catch (error) {
            console.error('Modelo: Error al obtener zonas:', error);
            throw error;
        }
    }
}

