<?php
    require_once 'conexion.php';

    class MZonas extends Conexion {

        public function __construct() {
            parent::__construct(); // activa conexiÃ³n
        }

        public function listar() {
            $sql = "SELECT 
                        id_zona AS id_zona,
                        nombre AS nombre
                        -- imagenZona AS imagenZona,
                        -- imagenCartas AS imagenCartas,
                        -- imagenEventos AS imagenEventos,
                        -- fondoZona AS fondoZona
                    FROM zonas";

            $resultado = $this->conexion->query($sql);
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            

            header("Content-Type: application/json");
            echo json_encode($array, JSON_UNESCAPED_UNICODE);
            exit();
        }
    }

    $mzonas = new MZonas();
    $mzonas->listar();
    

?>