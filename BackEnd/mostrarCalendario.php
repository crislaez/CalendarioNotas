<?php
    ini_set('display_errors','On');
    error_reporting(E_ALL);
    setlocale(LC_ALL,'es_ES.utf8','es-ES-utf8','es-ES.utf8');
    require_once 'funciones.php';

    if(isset($_GET['mes']) && isset($_GET['anho'])){
 
        calendario_mes($_GET['mes'],$_GET['anho']);
    }
    
  