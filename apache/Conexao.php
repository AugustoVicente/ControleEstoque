<?php
    // criando classe de conexão
    class Conexao 
	{
		// definindo parâmetros de conexão
		private $hn      = 'localhost'; 			// host
		private $un      = 'root';			// usuário
		private $pwd     = 'root';  		// senha
		private $db      = 'estoque_jeboni';		// banco
		private $cs      = 'utf8';					// tipo de texto
		// construtor da classe
		function __construct(){}
		// método para abrir conexão
		public function AbreConexao()
		{
            try
            {
                // criando parâmetros do objeto pdo
                $dsn  = "mysql:host=".$this->hn.";port=3306;dbname=".$this->db.";charset=".$this->cs;
                $opt  = array(
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                    PDO::ATTR_EMULATE_PREPARES   => true,
                );
                // criando um objeto pdo global
                global $pdo;
                $pdo  = new PDO($dsn, $this->un, $this->pwd, $opt);
			}
			// se algo der errado
			catch(PDOException $e)
            {
				// retorna mensagem de erro como json
                echo json_encode($e);
            }
		}
		// método para fechar conexão com o banco
		public function FechaConexao()
		{
			// chamando objeto pdo global
			global $pdo;
			// fechando conexão com o banco
			$pdo = null;
		}
	}
?>