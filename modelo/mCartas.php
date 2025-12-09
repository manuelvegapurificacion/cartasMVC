<?php

  require_once 'conexion.php';

    class MCartas extends Conexion {

        public function construct() {
            parent::construct(); // activa la conexión automáticamente
        }

        public function listar() {
            $sql = 'SELECT 
            cartas.id_carta,
            cartas.nombre AS titulo,
            cartas.descripcion AS info,
            cartas.curacion AS efecto,
            cartas.id_zona AS zona,
            iconos.codigo AS emoji,
            cartas.elimina_id_evento AS idNeutraliza,
            eventos.nombre AS nombreNeutraliza
            FROM cartas
            INNER JOIN iconos ON cartas.id_icono = iconos.id_icono
            INNER JOIN eventos ON cartas.elimina_id_evento = eventos.id_evento';
            $resultado = $this->conexion->query($sql);
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            header("Content-Type: application/json");
            echo json_encode($array);
            exit();
        }
    }

    $mcartas = new MCartas();
    $mcartas->listar();
    
?>