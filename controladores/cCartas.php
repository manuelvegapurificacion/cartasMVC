<?php
    require_once __DIR__ . '/../modelo/mCartas.php';

    class CCartas {

        private $cartas;

        public function __construct(){
            $this->cartas = new MCartas();
        }

        function generarCartas(){
            $this->cartas->listar();
            include "/../vistas/vCartas.js";
        }

    }
?>