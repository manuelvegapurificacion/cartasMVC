<?php

    require_once __DIR__ . '/../modelo/mEventos.php';

    class CEventos {
        private $eventos;

        public function __construct(){
            $this->eventos = new MEventos();
        }

        function generarCartas(){
            $this->cartas->listar();
            include "/../vistas/vEventos.js";
        }
    }

?>