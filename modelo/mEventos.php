<?php

    require_once 'conexion.php';

    class MEventos extends Conexion {

        public function construct(){
            parent::construct();
        }

        public function listar(){
            $sql='SELECT 
            eventos.id_evento AS id,
            eventos.nombre AS titulo,
            eventos.descripcion AS info,
            eventos.dano AS efecto,
            eventos.id_zona AS zona,
            iconos.codigo AS emoji
            FROM eventos
            INNER JOIN iconos
            ON eventos.id_icono = iconos.id_icono;';
            $resultado = $this->conexion->query($sql);
            $array=$resultado->fetchAll(PDO::FETCH_ASSOC);
            header("Content-Type: application/json");
            echo json_encode($array);
            exit();
        }

    }

    $meventos = new MEventos();
    $meventos->listar();


?>