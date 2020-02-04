<?php
   define('SERVIDOR', 'localhost'); //el servidor local
   define('BBDD', 'aplicacioncalendario'); //la base de datos
   define('USUARIO', 'root'); //el usuario
   define('CLAVE', ''); //la clave del usuario

   function ingresar_tarea($datos){

    @$conexion = mysqli_connect(SERVIDOR, USUARIO, CLAVE, BBDD) or
    die("<p>Error de BBDD: ERROR ".mysqli_connect_errno().":".mysqli_connect_error()."</p>\n");
         
    mysqli_set_charset($conexion, 'utf8');

    $buscar1 = mysqli_real_escape_string($conexion,$datos['titulo']);
    $buscar2 = mysqli_real_escape_string($conexion,$datos['descripcion']);
    $buscar3 = mysqli_real_escape_string($conexion,$datos['fecha']);
    $buscar4 = mysqli_real_escape_string($conexion,$datos['horaInicio']);
    $buscar5 = mysqli_real_escape_string($conexion,$datos['horaFin']);

    $sql = "INSERT INTO tarea (titulo, descripcion, fecha, horainicio, horafin) VALUES ('$buscar1','$buscar2','$buscar3','$buscar4','$buscar5')";
            
    // mysqli_query($conexion, $sql) or die ("<p>Error de BBDD: ERROR ".mysqli_connect_errno($conexion).":".mysqli_connect_error($conexion)."</p>\n");

    $querie = $conexion->query($sql); 

    if($querie == true){
        echo "registro exitoso";
    }
    else{
        echo "registro fallo";
    }
    mysqli_close($conexion);
   }

function calendario_mes($mes=1,$anho=2020){
   if(!$anho){
       $anho=date("Y");
   }
   print "<table id='tabla' class=\"mes\">\n";
   print "<caption>".ucfirst(strftime("%B de %G",strtotime("$anho-$mes")))."</caption>\n";
 
   $un_lunes=strtotime("9/23/2019");
   print "<tr>\n";
   for($i=0;$i<7;$i++){
       print "<th>".strftime("%a",$un_lunes+$i*24*60*60)."</th>\n";
   }
   print "</tr>\n";
   
   $huecos=strftime("%u",strtotime("$anho-$mes-1"))-1;

   $dia=1-$huecos;
   $ultimo=strftime("%e",strtotime("last day of $anho-$mes"));
  
   while($dia<=$ultimo){
       print "<tr>\n";
       for($i=0;$i<7;$i++){
           if($dia<10){
               if($mes<10){
                print "<td><span style=display:none>".$anho."-0".$mes."-0".$dia."</span>".((($dia>0)&&($dia<=$ultimo))?"$dia":"")."</td>\n";
               }else{
                print "<td><span style=display:none>".$anho."-".$mes."-0".$dia."</span>".((($dia>0)&&($dia<=$ultimo))?"$dia":"")."</td>\n";
               }           
           }
           else{
            if($mes<10){
                print "<td><span style=display:none>".$anho."-0".$mes."-".$dia."</span>".((($dia>0)&&($dia<=$ultimo))?"$dia":"")."</td>\n";
               }else{
                print "<td><span style=display:none>".$anho."-".$mes."-".$dia."</span>".((($dia>0)&&($dia<=$ultimo))?"$dia":"")."</td>\n";
               }         
           }          
           $dia++;
       }
       print "</tr>\n";
   }
   print "</table>\n";
}   

function mostrarTareas(){

    @$conexion = mysqli_connect(SERVIDOR, USUARIO, CLAVE, BBDD) or
    die("<p>Error de BBDD: ERROR ".mysqli_connect_errno().":".mysqli_connect_error()."</p>\n");

    mysqli_set_charset($conexion, 'utf8');

    $sql = "SELECT * FROM `tarea`";

    @$resultado = mysqli_query($conexion, $sql) or die ("<p>Error de BBDD: ERROR ".mysqli_connect_errno($conexion).":".mysqli_connect_error($conexion)."</p>\n");

    mysqli_data_seek($resultado, 0);
    $todo = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
    echo json_encode($todo,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    
   mysqli_free_result($resultado);
   mysqli_close($conexion);  
}

function borrarTarea($codigo){

    @$conexion = mysqli_connect(SERVIDOR, USUARIO, CLAVE, BBDD) or
    die("<p>Error de BBDD: ERROR ".mysqli_connect_errno().":".mysqli_connect_error()."</p>\n");

    mysqli_set_charset($conexion, 'utf8');

    $sql = "DELETE FROM `tarea` WHERE `tarea`.`codigo` = '$codigo'";

    mysqli_query($conexion, $sql) or die ("<p>Error de BBDD: ERROR ".mysqli_connect_errno($conexion).":".mysqli_connect_error($conexion)."</p>\n");

    mysqli_close($conexion);

}

function tareasActuales($fecha){

    @$conexion = mysqli_connect(SERVIDOR, USUARIO, CLAVE, BBDD) or
    die("<p>Error de BBDD: ERROR ".mysqli_connect_errno().":".mysqli_connect_error()."</p>\n");

    mysqli_set_charset($conexion, 'utf8');

    $buscar = mysqli_real_escape_string($conexion,$fecha);

    $sql = "SELECT * FROM `tarea` WHERE fecha = '$buscar'";

    @$resultado = mysqli_query($conexion, $sql) or die ("<p>Error de BBDD: ERROR ".mysqli_connect_errno($conexion).":".mysqli_connect_error($conexion)."</p>\n");

    mysqli_data_seek($resultado, 0);
    $todo = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
    echo json_encode($todo,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    
    mysqli_free_result($resultado);
    mysqli_close($conexion);  
    
}

?>