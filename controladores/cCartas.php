<?php
    require_once __DIR__ . '/../modelo/mCartas.php';

    $mCartas = new MCartas();
    $cCartas = $mCartas->listar();

    echo json_encode($cCartas);
    include "/../vistas/vCartas.js";
?>