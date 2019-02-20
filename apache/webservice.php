<?php 
    header('Access-Control-Allow-Origin: *');
    // se clase não existe inclui ela
    if(!class_exists('Conexao'))
    {
        include 'Conexao.php';
        // instancia da classe
        $conexao = new Conexao();
    }
    // abrindo conexao e pegando objeto pdo
    $conexao->AbreConexao();
    global $pdo;
    // recebendo parametro da ação desejada por request
    $acao = $_REQUEST['acao'];
    // filtrar ações    
    switch ($acao) 
    {
        case 'buscar_produto':
            // recebe parâmetros por request
            $idproduto = $_REQUEST['idproduto'];
            // cria array para receber os dados
            $dados = array();
            // executa query
            $stmt = $pdo->query("select * from produto where idproduto = ".$idproduto.";");
            while($row  = $stmt->fetch(PDO::FETCH_OBJ))
            {
                // recebe os dados do usuario na array dados
                $dados[] = $row;
            }
            // retorna os dados como json
            echo json_encode($dados);
            break;
        case 'balanco':
            // recebe parâmetros por request
            $idproduto = $_REQUEST['idproduto'];
            $qtd = $_REQUEST['qtd'];
            // cria array para receber os dados
            $dados = array();
            // executa query
            $stmt = $pdo->query("call balanco_produto(".$idproduto.", ".$qtd.");");
            $dados[] = "ok";
            // retorna os dados como json
            echo json_encode($dados);
            break;
        case 'buscar_produtos':
            // cria array para receber os dados
            $dados = array();
            // executa query
            $stmt = $pdo->query("select * from produto;");
            while($row  = $stmt->fetch(PDO::FETCH_OBJ))
            {
                // recebe os dados do usuario na array dados
                $dados[] = $row;
            }
            // retorna os dados como json
            echo json_encode($dados);
            break;
        case 'compra':
            // recebe parâmetros por request
            $idcliente = $_REQUEST['idcliente'];
            // cria array para receber os dados
            $dados = array();
            // executa query
            $stmt = $pdo->query("call vende(".$idcliente.");");
            while($row  = $stmt->fetch(PDO::FETCH_OBJ))
            {
                // recebe os dados do usuario na array dados
                $dados[] = $row;
            }
            // retorna os dados como json
            echo json_encode($dados);
            break;
        case 'compra_item':
            // recebe parâmetros por request
            $idcompra   = $_REQUEST['idcompra'];
            $idproduto  = $_REQUEST['idproduto'];
            $qtd        = $_REQUEST['qtd'];
            $desconto   = $_REQUEST['desconto'];
            // cria array para receber os dados
            $dados = array();
            // executa query
            $stmt = $pdo->query("call vende_item(".$idcompra.",".$idproduto.",".$qtd.",".$desconto.");");
            while($row  = $stmt->fetch(PDO::FETCH_OBJ))
            {
                // recebe os dados do usuario na array dados
                $dados[] = $row;
            }
            // retorna os dados como json
            echo json_encode($dados);
            break;
        case 'buscar_clientes':
            // cria array para receber os dados
            $dados = array();
            // executa query
            $stmt = $pdo->query("select * from cliente;");
            while($row  = $stmt->fetch(PDO::FETCH_OBJ))
            {
                // recebe os dados do usuario na array dados
                $dados[] = $row;
            }
            // retorna os dados como json
            echo json_encode($dados);
            break;
        case 'historico':
            // cria array para receber os dados
            $dados = array();
            // executa query
            $stmt = $pdo->query("select * from historico;");
            while($row  = $stmt->fetch(PDO::FETCH_OBJ))
            {
                // recebe os dados do usuario na array dados
                $dados[] = $row;
            }
            // retorna os dados como json
            echo json_encode($dados);
            break;
    }
?>