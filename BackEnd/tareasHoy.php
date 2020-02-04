<?php
    ini_set('display_errors','On');
    error_reporting(E_ALL);
    require_once 'funciones.php';
    if(isset($_GET['fecha'])){
        // echo $_GET['fecha'];
        tareasActuales($_GET['fecha']);       
    }
?>