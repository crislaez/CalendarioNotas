<?php
    ini_set('display_errors','On');
    error_reporting(E_ALL);
    require_once 'funciones.php';
    if(isset($_POST)){
        // echo "<pre>".print_r($_POST,true)."</pre>";
        ingresar_tarea($_POST);
    }
?>