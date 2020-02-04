<?php
    ini_set('display_errors','On');
    error_reporting(E_ALL);
    require_once 'funciones.php';
    if(isset($_GET['codigo'])){
        // echo $_GET['codigo'];
        borrarTarea($_GET['codigo']);        
    }
?>