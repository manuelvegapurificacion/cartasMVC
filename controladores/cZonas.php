<?php

    require_once __DIR__ . '/../modelo/mZonas.php';

    class CZonas {
        private $zonas;

        public function __construct(){
            $this->zonas = new MZonas();
        }

        function generarZonas(){
            $this->zonas->listar();
            include "/../vistas/vZonas.js";
            include "/../vistas/vCartas.js";
        }
    }

?>