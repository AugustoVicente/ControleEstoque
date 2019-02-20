CREATE DATABASE  IF NOT EXISTS `estoque_jeboni` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `estoque_jeboni`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: estoque_jeboni
-- ------------------------------------------------------
-- Server version	5.5.60

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `auditoria`
--

DROP TABLE IF EXISTS `auditoria`;
/*!50001 DROP VIEW IF EXISTS `auditoria`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `auditoria` AS SELECT 
 1 AS `idproduto`,
 1 AS `nome`,
 1 AS `marca`,
 1 AS `quantidade`,
 1 AS `unidade`,
 1 AS `preco_final`,
 1 AS `descricao`,
 1 AS `qtd_minima`,
 1 AS `status`,
 1 AS `idlog_estoque`,
 1 AS `tipo`,
 1 AS `id_produto`,
 1 AS `qtd_last`,
 1 AS `qtd_new`,
 1 AS `data`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `balanco`
--

DROP TABLE IF EXISTS `balanco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `balanco` (
  `idbalanco` int(11) NOT NULL AUTO_INCREMENT,
  `id_produto` int(11) NOT NULL,
  `qtd_nova` double NOT NULL,
  `qtd_old` double NOT NULL,
  `data` datetime NOT NULL,
  PRIMARY KEY (`idbalanco`),
  KEY `FK_Produto-Balanco_idx` (`id_produto`),
  CONSTRAINT `FK_Produto-Balanco` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`idproduto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `idcliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `cpfcnpj` varchar(45) NOT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `wpp` varchar(45) DEFAULT NULL,
  `contato` varchar(45) DEFAULT NULL,
  `endereco` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcliente`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compra` (
  `idcompra` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) DEFAULT NULL,
  `data` datetime NOT NULL,
  PRIMARY KEY (`idcompra`),
  KEY `FK_Cliente-Compra_idx` (`id_cliente`),
  CONSTRAINT `FK_Cliente-Compra` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`idcliente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `entrada_estoque`
--

DROP TABLE IF EXISTS `entrada_estoque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entrada_estoque` (
  `identrada_estoque` int(11) NOT NULL AUTO_INCREMENT,
  `id_produto` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `qtd_nova` double NOT NULL,
  `qtd_antiga` double NOT NULL,
  `id_fornecedor` int(11) NOT NULL,
  PRIMARY KEY (`identrada_estoque`),
  KEY `FK_Fornecedor-Entrada_idx` (`id_fornecedor`),
  KEY `FK_Produto-Entrada_idx` (`id_produto`),
  CONSTRAINT `FK_Fornecedor-Entrada` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`idfornecedor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Produto-Entrada` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`idproduto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fornecedor`
--

DROP TABLE IF EXISTS `fornecedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fornecedor` (
  `idfornecedor` int(11) NOT NULL AUTO_INCREMENT,
  `razao_social` varchar(45) NOT NULL,
  `nome_fantasia` varchar(45) NOT NULL,
  `endereco` varchar(45) DEFAULT NULL,
  `cep` varchar(45) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `contato` varchar(45) DEFAULT NULL,
  `wpp` varchar(45) DEFAULT NULL,
  `cpfcnpj` varchar(45) DEFAULT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idfornecedor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fornecedor_produto`
--

DROP TABLE IF EXISTS `fornecedor_produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fornecedor_produto` (
  `idfornecedor_produto` int(11) NOT NULL AUTO_INCREMENT,
  `id_fornecedor` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `preco_custo` double NOT NULL,
  PRIMARY KEY (`idfornecedor_produto`),
  KEY `FK_Produto-FP_idx` (`id_produto`),
  KEY `FK_Fornecedor-FP_idx` (`id_fornecedor`),
  CONSTRAINT `FK_Fornecedor-FP` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`idfornecedor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Produto-FP` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`idproduto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `historico`
--

DROP TABLE IF EXISTS `historico`;
/*!50001 DROP VIEW IF EXISTS `historico`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `historico` AS SELECT 
 1 AS `idcompra`,
 1 AS `idcliente`,
 1 AS `data`,
 1 AS `nome_cliente`,
 1 AS `cpfcnpj_cliente`,
 1 AS `qtd_itens`,
 1 AS `desconto_total`,
 1 AS `preco_unitario`,
 1 AS `valor_total`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itens_compra`
--

DROP TABLE IF EXISTS `itens_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itens_compra` (
  `iditens_compra` int(11) NOT NULL AUTO_INCREMENT,
  `id_compra` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `quantidade` double NOT NULL,
  `preco` double NOT NULL,
  `desconto` double NOT NULL,
  PRIMARY KEY (`iditens_compra`),
  KEY `FK_IC-Compra_idx` (`id_compra`),
  KEY `FK_IC-Produto_idx` (`id_produto`),
  CONSTRAINT `FK_IC-Compra` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`idcompra`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_IC-Produto` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`idproduto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `log_estoque`
--

DROP TABLE IF EXISTS `log_estoque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_estoque` (
  `idlog_estoque` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `qtd_last` double NOT NULL,
  `qtd_new` double NOT NULL,
  `data` datetime NOT NULL,
  PRIMARY KEY (`idlog_estoque`),
  KEY `FK_Produto-Log_idx` (`id_produto`),
  CONSTRAINT `FK_Produto-Log` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`idproduto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `mais_vendidos`
--

DROP TABLE IF EXISTS `mais_vendidos`;
/*!50001 DROP VIEW IF EXISTS `mais_vendidos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `mais_vendidos` AS SELECT 
 1 AS `idproduto`,
 1 AS `nome`,
 1 AS `marca`,
 1 AS `quantidade`,
 1 AS `unidade`,
 1 AS `preco_final`,
 1 AS `descricao`,
 1 AS `qtd_minima`,
 1 AS `status`,
 1 AS `vendas`,
 1 AS `data`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `margem_lucro_produto`
--

DROP TABLE IF EXISTS `margem_lucro_produto`;
/*!50001 DROP VIEW IF EXISTS `margem_lucro_produto`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `margem_lucro_produto` AS SELECT 
 1 AS `idproduto`,
 1 AS `nome`,
 1 AS `marca`,
 1 AS `quantidade`,
 1 AS `unidade`,
 1 AS `preco_final`,
 1 AS `descricao`,
 1 AS `qtd_minima`,
 1 AS `status`,
 1 AS `lucro`,
 1 AS `data`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `media_custo`
--

DROP TABLE IF EXISTS `media_custo`;
/*!50001 DROP VIEW IF EXISTS `media_custo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `media_custo` AS SELECT 
 1 AS `idproduto`,
 1 AS `nome`,
 1 AS `marca`,
 1 AS `quantidade`,
 1 AS `unidade`,
 1 AS `preco_final`,
 1 AS `descricao`,
 1 AS `qtd_minima`,
 1 AS `status`,
 1 AS `custo_medio`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `menos_vendidos`
--

DROP TABLE IF EXISTS `menos_vendidos`;
/*!50001 DROP VIEW IF EXISTS `menos_vendidos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `menos_vendidos` AS SELECT 
 1 AS `idproduto`,
 1 AS `nome`,
 1 AS `marca`,
 1 AS `quantidade`,
 1 AS `unidade`,
 1 AS `preco_final`,
 1 AS `descricao`,
 1 AS `qtd_minima`,
 1 AS `status`,
 1 AS `vendas`,
 1 AS `data`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produto` (
  `idproduto` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `marca` varchar(45) DEFAULT NULL,
  `quantidade` double NOT NULL,
  `unidade` varchar(45) NOT NULL,
  `preco_final` double NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `qtd_minima` double NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idproduto`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'estoque_jeboni'
--

--
-- Dumping routines for database 'estoque_jeboni'
--
/*!50003 DROP PROCEDURE IF EXISTS `balanco_produto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ALLOW_INVALID_DATES,ERROR_FOR_DIVISION_BY_ZERO,TRADITIONAL,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `balanco_produto`(id_out int, qtd_out int)
BEGIN
	select quantidade into @qtd_last from produto where idproduto = id_out;
	insert into balanco (id_produto, data, qtd_nova, qtd_old) values
    (id_out, now(), qtd_out, @qtd_last);
    update produto set quantidade = qtd_out where idproduto = id_out;
	insert into log_estoque (tipo, id_produto, data, qtd_new, qtd_last) values
    (3, id_out, now(), qtd_out, @qtd_last);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleta_produto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ALLOW_INVALID_DATES,ERROR_FOR_DIVISION_BY_ZERO,TRADITIONAL,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleta_produto`(id_out int)
BEGIN
	update produto set status = 0 where idproduto = id_out;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `entrada_estoque` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `entrada_estoque`(idproduto_out int, qtd_out double, 
preco_out double, preco_final_out double, idfornecedor_out int)
BEGIN
	select quantidade into @qtd_last from produto where idproduto = idproduto_out;
	insert into entrada_estoque (id_produto, data, qtd_nova, qtd_antiga, id_fornecedor) values
    (idproduto_out, now(), qtd_out+@qtd_last, @qtd_last, idfornecedor_out);
    update produto set quantidade = qtd_out+@qtd_last, preco_final = preco_final_out where idproduto = idproduto_out;
    update fornecedor_produto set preco_custo = preco_out where id_produto = idproduto_out and id_fornecedor = idfornecedor_out;
    insert into log_estoque (tipo, id_produto, data, qtd_new, qtd_last) values
    (2, idproduto_out, now(), qtd_out+@qtd_last, @qtd_last);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insere_produto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insere_produto`(nome_out varchar(45), marca_out varchar(45), qtd_out double, 
qtdmin_out double, unidade_out varchar(45), preco_out double, descricao_out varchar(45))
BEGIN
	INSERT INTO produto (nome, marca, quantidade, qtd_minima, unidade, preco_final, descricao)
	VALUES (nome_out, marca_out, qtd_out, qtdmin_out, unidade_out, preco_out, descricao_out);
	SELECT LAST_INSERT_ID() into @id;
    insert into log_estoque (tipo, id_produto, data, qtd_new, qtd_last) values
    (0, @id, now(), qtd_out, 0);
    select @id as id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `vende` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ALLOW_INVALID_DATES,ERROR_FOR_DIVISION_BY_ZERO,TRADITIONAL,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vende`(idcliente_out int)
BEGIN
	if idcliente_out = 0 then
		insert into compra (id_cliente, data) values (null, now());
		select last_insert_id() as id;
	else
		insert into compra (id_cliente, data) values (idcliente_out, now());
		select last_insert_id() as id;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `vende_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vende_item`(idcompra_out int, idproduto_out int, qtd_out double, desconto_out double)
BEGIN
	select quantidade, preco_final into @qtd_last, @pf from produto where idproduto = idproduto_out;
	INSERT INTO `itens_compra` (`id_compra`, `id_produto`, `quantidade`, `desconto`, preco)
	VALUES (idcompra_out, idproduto_out, qtd_out, desconto_out, @pf);
    insert into log_estoque (tipo, id_produto, data, qtd_new, qtd_last) values
    (1, idproduto_out, now(), @qtd_last-qtd_out, @qtd_last);
    update produto set quantidade = @qtd_last-qtd_out where idproduto = idproduto_out;
    select quantidade, qtd_minima into @qtd, @qtd_min from produto where idproduto = idproduto_out;
    if @qtd <= @qtd_min then
		select 0 as estado;
	else
		select 1 as estado;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `auditoria`
--

/*!50001 DROP VIEW IF EXISTS `auditoria`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `auditoria` AS select `p`.`idproduto` AS `idproduto`,`p`.`nome` AS `nome`,`p`.`marca` AS `marca`,`p`.`quantidade` AS `quantidade`,`p`.`unidade` AS `unidade`,`p`.`preco_final` AS `preco_final`,`p`.`descricao` AS `descricao`,`p`.`qtd_minima` AS `qtd_minima`,`p`.`status` AS `status`,`le`.`idlog_estoque` AS `idlog_estoque`,`le`.`tipo` AS `tipo`,`le`.`id_produto` AS `id_produto`,`le`.`qtd_last` AS `qtd_last`,`le`.`qtd_new` AS `qtd_new`,`le`.`data` AS `data` from (`produto` `p` join `log_estoque` `le` on((`le`.`id_produto` = `p`.`idproduto`))) order by `le`.`data` desc limit 50 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `historico`
--

/*!50001 DROP VIEW IF EXISTS `historico`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `historico` AS select `cm`.`idcompra` AS `idcompra`,`cm`.`id_cliente` AS `idcliente`,`cm`.`data` AS `data`,`cl`.`nome` AS `nome_cliente`,`cl`.`cpfcnpj` AS `cpfcnpj_cliente`,sum(`ic`.`quantidade`) AS `qtd_itens`,sum(`ic`.`desconto`) AS `desconto_total`,sum(`ic`.`preco`) AS `preco_unitario`,sum((`p`.`preco_final` - `ic`.`desconto`)) AS `valor_total` from (((`produto` `p` join `itens_compra` `ic` on((`ic`.`id_produto` = `p`.`idproduto`))) join `compra` `cm` on((`ic`.`id_compra` = `cm`.`idcompra`))) left join `cliente` `cl` on((`cl`.`idcliente` = `cm`.`id_cliente`))) group by `cm`.`idcompra` order by `cm`.`data` desc limit 50 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `mais_vendidos`
--

/*!50001 DROP VIEW IF EXISTS `mais_vendidos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `mais_vendidos` AS select `p`.`idproduto` AS `idproduto`,`p`.`nome` AS `nome`,`p`.`marca` AS `marca`,`p`.`quantidade` AS `quantidade`,`p`.`unidade` AS `unidade`,`p`.`preco_final` AS `preco_final`,`p`.`descricao` AS `descricao`,`p`.`qtd_minima` AS `qtd_minima`,`p`.`status` AS `status`,sum(`ic`.`quantidade`) AS `vendas`,`c`.`data` AS `data` from ((`produto` `p` join `itens_compra` `ic` on((`ic`.`id_produto` = `p`.`idproduto`))) join `compra` `c` on((`ic`.`id_compra` = `c`.`idcompra`))) where (`p`.`status` = 1) group by `p`.`idproduto`,month(`c`.`data`) order by sum(`ic`.`quantidade`) limit 5 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `margem_lucro_produto`
--

/*!50001 DROP VIEW IF EXISTS `margem_lucro_produto`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `margem_lucro_produto` AS select `p`.`idproduto` AS `idproduto`,`p`.`nome` AS `nome`,`p`.`marca` AS `marca`,`p`.`quantidade` AS `quantidade`,`p`.`unidade` AS `unidade`,`p`.`preco_final` AS `preco_final`,`p`.`descricao` AS `descricao`,`p`.`qtd_minima` AS `qtd_minima`,`p`.`status` AS `status`,sum(((`ic`.`preco` - `ic`.`desconto`) - `mc`.`custo_medio`)) AS `lucro`,`c`.`data` AS `data` from (((`produto` `p` join `itens_compra` `ic` on((`ic`.`id_produto` = `p`.`idproduto`))) join `compra` `c` on((`ic`.`id_compra` = `c`.`idcompra`))) join `media_custo` `mc` on((`mc`.`idproduto` = `p`.`idproduto`))) where (`p`.`status` = 1) group by `p`.`idproduto`,month(`c`.`data`) order by sum(((`ic`.`preco` - `ic`.`desconto`) - `mc`.`custo_medio`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `media_custo`
--

/*!50001 DROP VIEW IF EXISTS `media_custo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `media_custo` AS select `p`.`idproduto` AS `idproduto`,`p`.`nome` AS `nome`,`p`.`marca` AS `marca`,`p`.`quantidade` AS `quantidade`,`p`.`unidade` AS `unidade`,`p`.`preco_final` AS `preco_final`,`p`.`descricao` AS `descricao`,`p`.`qtd_minima` AS `qtd_minima`,`p`.`status` AS `status`,avg(`fp`.`preco_custo`) AS `custo_medio` from (`produto` `p` join `fornecedor_produto` `fp` on((`fp`.`id_produto` = `p`.`idproduto`))) where (`p`.`status` = 1) group by `p`.`idproduto` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `menos_vendidos`
--

/*!50001 DROP VIEW IF EXISTS `menos_vendidos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `menos_vendidos` AS select `p`.`idproduto` AS `idproduto`,`p`.`nome` AS `nome`,`p`.`marca` AS `marca`,`p`.`quantidade` AS `quantidade`,`p`.`unidade` AS `unidade`,`p`.`preco_final` AS `preco_final`,`p`.`descricao` AS `descricao`,`p`.`qtd_minima` AS `qtd_minima`,`p`.`status` AS `status`,sum(`ic`.`quantidade`) AS `vendas`,`c`.`data` AS `data` from ((`produto` `p` join `itens_compra` `ic` on((`ic`.`id_produto` = `p`.`idproduto`))) join `compra` `c` on((`ic`.`id_compra` = `c`.`idcompra`))) where (`p`.`status` = 1) group by `p`.`idproduto`,month(`c`.`data`) order by sum(`ic`.`quantidade`) desc limit 5 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-19 22:44:09
