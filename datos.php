<?php
error_reporting(E_ERROR | E_PARSE);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');
//echo "sss".$_SERVER['HTTP_ORIGIN'];
try {
  if (isset($_GET["FUNC"])) {
    $v_Func = $_GET["FUNC"];
    if($v_Func == "createUser"){
        echo createUser();
    }else if($v_Func == "getUsers"){
        echo getUsers();
    }else if($v_Func == "createHistorial"){
        echo createHistorial();
    }else if($v_Func == "getHistorial"){
        echo getHistorial();
    }else{
        $message = array(
            "message" => "Opcion no existe."
        );

        echo json_encode($message,JSON_NUMERIC_CHECK);
    }
    
  }
} catch (Exception $e) {
    $message = array(
        "error" => $e->getMessage()
    );

    http_response_code(500);
    echo json_encode($message);
}


function createUser(){
    $parametros = file_get_contents('php://input');
    file_put_contents("user.txt", $parametros);
    $message = array(
        "data" => "Guardado correctamente."
    );

    return json_encode($message,JSON_NUMERIC_CHECK);
}

function getHistorial(){
    $result = file_get_contents("registro.txt");
    if($result==null){
        $message = array(
            "data" => array()
        );
    
        return json_encode($message,JSON_NUMERIC_CHECK);
    }
    return $result;
}

function createHistorial(){
    $parametros = file_get_contents('php://input');
    file_put_contents("registro.txt", $parametros);
    $message = array(
        "data" => "Guardado correctamente."
    );

    return json_encode($message,JSON_NUMERIC_CHECK);
}

function getUsers(){
    $result = file_get_contents("user.txt");
    if($result==null){
        $message = array(
            "data" => array()
        );
    
        return json_encode($message,JSON_NUMERIC_CHECK);
    }
    return $result;
}