-- --------------------------------------------------------
-- Anfitrião:                    127.0.0.1
-- Versão do servidor:           10.1.40-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Versão:              10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for ustock
CREATE DATABASE IF NOT EXISTS `ustock` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ustock`;

-- Dumping structure for table ustock.articles
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `internal_code` varchar(255) DEFAULT '----',
  `inputId` int(11) DEFAULT NULL,
  `providerId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT '0',
  `purchase` decimal(10,0) DEFAULT NULL,
  `iva` decimal(10,0) DEFAULT '0',
  `discount` decimal(10,0) NOT NULL DEFAULT '0',
  `total` decimal(10,0) NOT NULL DEFAULT '0',
  `userId` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  `description` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `obs` varchar(255) DEFAULT '---',
  `manufactured_by` varchar(255) DEFAULT NULL,
  `type_value` varchar(255) DEFAULT 'A',
  `categoryId` int(11) DEFAULT NULL,
  `year_made` int(11) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `Column 23` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table ustock.articles: ~5 rows (approximately)
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` (`id`, `internal_code`, `inputId`, `providerId`, `quantity`, `purchase`, `iva`, `discount`, `total`, `userId`, `status`, `description`, `info`, `marca`, `modelo`, `color`, `serial_number`, `obs`, `manufactured_by`, `type_value`, `categoryId`, `year_made`, `photo`, `createdAt`, `updatedAt`, `Column 23`) VALUES
	(1, 'ATG1', NULL, NULL, 30, NULL, 0, 0, 0, 1, 1, 'Mouse', 'i', NULL, '98Hi', NULL, '34565', NULL, 'HPi', 'A', NULL, NULL, NULL, '2020-02-13 15:43:54', '2020-02-17 14:31:49', NULL),
	(2, 'ATG2', NULL, NULL, 0, NULL, 0, 0, 0, 1, 1, 'Teclado GTX 80', 'Leve', NULL, 'L6g', NULL, '990769', NULL, 'GTTECH', 'A', NULL, NULL, NULL, '2020-02-13 15:44:18', '2020-02-17 13:05:19', NULL),
	(3, 'ATG3', NULL, NULL, 0, NULL, 0, 0, 0, 1, 1, 'Teclado', NULL, NULL, 'RT76', NULL, '976237347043', NULL, 'LG', 'A', NULL, NULL, NULL, '2020-02-14 07:31:11', '2020-02-17 10:19:35', NULL),
	(4, 'ATG4', NULL, NULL, 0, NULL, 0, 0, 0, 1, 1, 'Fonte de Alimentação', '', NULL, '2308', NULL, '89720732', NULL, 'LoCKdev', 'A', NULL, NULL, NULL, '2020-02-14 07:57:47', '2020-02-17 10:19:35', NULL),
	(5, 'ATG5', NULL, NULL, 0, NULL, 0, 0, 0, 1, 1, 'HTC', NULL, NULL, 'gt66', NULL, '9737934', NULL, 'HP', 'A', NULL, NULL, NULL, '2020-02-15 13:48:49', '2020-02-17 13:05:32', NULL);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;

-- Dumping structure for table ustock.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0',
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ustock.categories: ~0 rows (approximately)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Dumping structure for table ustock.clients
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0',
  `internal_code` varchar(255) DEFAULT '----',
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `obs` varchar(255) DEFAULT '-----',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table ustock.clients: ~2 rows (approximately)
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` (`id`, `userId`, `internal_code`, `name`, `status`, `obs`, `createdAt`, `updatedAt`) VALUES
	(1, 0, 'CLI1', 'Fernanda Martíns', 0, 'Não Permitido', '2020-02-14 09:34:25', '2020-02-14 14:57:45'),
	(2, 0, 'CLI2', 'Maria Gomes', 1, NULL, '2020-02-14 09:34:33', '2020-02-14 14:56:58');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;

-- Dumping structure for table ustock.inputs
CREATE TABLE IF NOT EXISTS `inputs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0',
  `up_userId` int(11) DEFAULT '0',
  `internal_code` varchar(255) DEFAULT '----',
  `providerId` int(11) DEFAULT NULL,
  `locationId` int(11) DEFAULT NULL,
  `purchase` decimal(10,0) DEFAULT '0',
  `iva` decimal(10,0) DEFAULT '0',
  `discount` decimal(10,0) DEFAULT '0',
  `total` decimal(10,0) DEFAULT '0',
  `input_date` date DEFAULT NULL,
  `up_date` date DEFAULT NULL,
  `articleId` int(11) DEFAULT NULL,
  `clientId` int(11) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `internal_code_order` varchar(50) DEFAULT NULL,
  `quantity_input` int(11) DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table ustock.inputs: ~4 rows (approximately)
/*!40000 ALTER TABLE `inputs` DISABLE KEYS */;
INSERT INTO `inputs` (`id`, `userId`, `up_userId`, `internal_code`, `providerId`, `locationId`, `purchase`, `iva`, `discount`, `total`, `input_date`, `up_date`, `articleId`, `clientId`, `orderId`, `internal_code_order`, `quantity_input`, `status`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 0, 'IN1', 1, NULL, 1000, 14, 12, 1003, NULL, NULL, 1, NULL, NULL, NULL, 7, 1, '2020-02-17 13:17:30', '2020-02-17 13:17:30'),
	(2, 1, 0, 'IN2', 1, NULL, 2000, 14, 12, 2006, NULL, NULL, 1, NULL, NULL, NULL, 8, 1, '2020-02-17 13:24:47', '2020-02-17 13:24:47'),
	(3, 1, 0, 'IN3', 1, NULL, 33333, 14, 9, 34580, NULL, NULL, 1, NULL, NULL, NULL, 8, 1, '2020-02-17 13:27:40', '2020-02-17 13:27:40'),
	(4, 1, 0, 'IN4', 1, NULL, 2000, 0, 2, 1960, NULL, NULL, 1, NULL, NULL, NULL, 22, 1, '2020-02-17 14:31:49', '2020-02-17 14:31:49');
/*!40000 ALTER TABLE `inputs` ENABLE KEYS */;

-- Dumping structure for table ustock.locations
CREATE TABLE IF NOT EXISTS `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0',
  `description` varchar(255) DEFAULT NULL,
  `obs` varchar(255) DEFAULT '-----',
  `corredor` varchar(255) DEFAULT '0',
  `pratileira` varchar(255) DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ustock.locations: ~0 rows (approximately)
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;

-- Dumping structure for table ustock.materials
CREATE TABLE IF NOT EXISTS `materials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `internal_code` varchar(255) DEFAULT '----',
  `internal_code_order` varchar(255) DEFAULT '----',
  `purchase` decimal(10,0) DEFAULT '0',
  `iva` decimal(10,0) DEFAULT '0',
  `discount` decimal(10,0) DEFAULT '0',
  `total` decimal(10,0) DEFAULT '0',
  `userId` int(11) DEFAULT NULL,
  `inputId` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `description` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `obs` varchar(255) DEFAULT NULL,
  `manufactured_by` varchar(255) DEFAULT NULL,
  `type_value` varchar(255) DEFAULT 'A',
  `categoryId` int(11) DEFAULT NULL,
  `year_made` int(11) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table ustock.materials: ~3 rows (approximately)
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` (`id`, `internal_code`, `internal_code_order`, `purchase`, `iva`, `discount`, `total`, `userId`, `inputId`, `status`, `description`, `info`, `marca`, `modelo`, `color`, `serial_number`, `obs`, `manufactured_by`, `type_value`, `categoryId`, `year_made`, `photo`, `createdAt`, `updatedAt`) VALUES
	(1, 'EQP1', '----', 0, 0, 0, 0, 1, NULL, 1, 'UCLP140 Monitor', NULL, NULL, 'HP S2031a', NULL, '9923', NULL, 'HP', 'A', NULL, NULL, NULL, '2020-02-13 07:33:27', '2020-02-14 15:30:18'),
	(2, 'EQP2', '----', NULL, NULL, NULL, NULL, 1, NULL, 0, 'UCL239 Computador', NULL, NULL, 'i5', NULL, '43523424', 'Defeito', 'HP', 'A', NULL, NULL, NULL, '2020-02-14 09:52:52', '2020-02-17 13:27:20'),
	(3, 'EQP3', '----', NULL, NULL, NULL, NULL, 1, NULL, 1, 'UCL877 Leptop', NULL, NULL, 'i7', NULL, '324442', NULL, 'ASUS', 'A', NULL, NULL, NULL, '2020-02-14 09:53:21', '2020-02-14 15:30:52');
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;

-- Dumping structure for table ustock.operations
CREATE TABLE IF NOT EXISTS `operations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0',
  `internal_code` varchar(255) DEFAULT '------',
  `name` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `obs` varchar(255) DEFAULT '---',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table ustock.operations: ~4 rows (approximately)
/*!40000 ALTER TABLE `operations` DISABLE KEYS */;
INSERT INTO `operations` (`id`, `userId`, `internal_code`, `name`, `status`, `obs`, `createdAt`, `updatedAt`) VALUES
	(2, 0, 'OPE2', 'MOVICEL', 1, NULL, '2020-02-11 08:53:55', '2020-02-11 08:53:55'),
	(3, 0, 'OPE3', 'TV CABO', 0, 'CONTRATO EM ANDAMENTO', '2020-02-11 08:54:06', '2020-02-11 12:39:51'),
	(4, 0, 'OPE4', 'ZAP', 1, NULL, '2020-02-11 08:54:11', '2020-02-11 08:54:11'),
	(5, 0, 'OPE5', 'DSTV', 0, 'AINDA NÃO IMPLEMENTADO', '2020-02-11 08:54:18', '2020-02-11 08:54:47');
/*!40000 ALTER TABLE `operations` ENABLE KEYS */;

-- Dumping structure for table ustock.orderitems
CREATE TABLE IF NOT EXISTS `orderitems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0',
  `categoryId` int(11) DEFAULT '0',
  `orderId` int(11) DEFAULT NULL,
  `articleId` int(11) DEFAULT NULL,
  `internal_code` varchar(50) DEFAULT NULL,
  `quantity_item` int(11) DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table ustock.orderitems: ~4 rows (approximately)
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
INSERT INTO `orderitems` (`id`, `userId`, `categoryId`, `orderId`, `articleId`, `internal_code`, `quantity_item`, `status`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 0, 1, 1, NULL, 5, 1, '2020-02-17 13:18:02', '2020-02-17 13:18:02'),
	(2, 1, 0, 2, 1, NULL, 2, 1, '2020-02-17 13:18:16', '2020-02-17 13:18:16'),
	(3, 1, 0, 3, 1, NULL, 5, 1, '2020-02-17 13:25:14', '2020-02-17 13:25:14'),
	(4, 1, 0, 4, 1, NULL, 3, 1, '2020-02-17 13:25:31', '2020-02-17 13:25:31');
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;

-- Dumping structure for table ustock.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `quantity_input` int(11) DEFAULT NULL,
  `operationId` int(11) DEFAULT NULL,
  `materialId` int(11) DEFAULT NULL,
  `internal_code` varchar(50) DEFAULT NULL,
  `internal_code_order` varchar(50) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table ustock.orders: ~4 rows (approximately)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` (`id`, `clientId`, `userId`, `quantity_input`, `operationId`, `materialId`, `internal_code`, `internal_code_order`, `status`, `createdAt`, `updatedAt`) VALUES
	(1, 2, 1, 1, 2, 0, 'OUT1', 'OUTPUT', 1, '2020-02-17 13:18:02', '2020-02-17 13:18:02'),
	(2, 0, 1, 1, 0, 3, 'OUT2', 'OUTPUT', 1, '2020-02-17 13:18:16', '2020-02-17 13:18:16'),
	(3, 2, 1, 1, 4, 0, 'OUT3', 'OUTPUT', 1, '2020-02-17 13:25:14', '2020-02-17 13:25:14'),
	(4, 0, 1, 1, 0, 2, 'OUT4', 'OUTPUT', 1, '2020-02-17 13:25:31', '2020-02-17 13:25:31');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Dumping structure for table ustock.providers
CREATE TABLE IF NOT EXISTS `providers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `internal_code` varchar(255) DEFAULT '-----',
  `email` varchar(255) DEFAULT NULL,
  `phone1` varchar(255) DEFAULT '---',
  `phone2` varchar(255) DEFAULT '---',
  `status` tinyint(1) DEFAULT '1',
  `obs` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table ustock.providers: ~1 rows (approximately)
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` (`id`, `userId`, `name`, `info`, `internal_code`, `email`, `phone1`, `phone2`, `status`, `obs`, `createdAt`, `updatedAt`) VALUES
	(1, 0, 'NCR', NULL, 'FRNC1', 'ncr@gmail.com', '934666233', '222987866', 1, NULL, '2020-02-13 07:46:21', '2020-02-13 07:46:21');
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;

-- Dumping structure for table ustock.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table ustock.sequelizemeta: ~13 rows (approximately)
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20200205080909-create-task.js'),
	('20200205232910-create-category.js'),
	('20200205233102-create-location.js'),
	('20200205233213-create-operation.js'),
	('20200205233424-create-user.js'),
	('20200205233617-create-order.js'),
	('20200205233841-create-order-item.js'),
	('20200205234458-create-provider.js'),
	('20200205234854-create-transfer.js'),
	('20200205235333-create-input.js'),
	('20200206000530-create-client.js'),
	('20200206002623-create-article.js'),
	('20200212161318-create-material.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Dumping structure for table ustock.tasks
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `adminId` int(11) DEFAULT NULL,
  `dateFinish` datetime DEFAULT NULL,
  `dateStart` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `state` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ustock.tasks: ~0 rows (approximately)
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;

-- Dumping structure for table ustock.transfers
CREATE TABLE IF NOT EXISTS `transfers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0',
  `internal_code` varchar(255) DEFAULT '----',
  `orderId` int(11) DEFAULT NULL,
  `materialId` int(11) DEFAULT NULL,
  `clientId` int(11) DEFAULT NULL,
  `output_date` datetime DEFAULT NULL,
  `operationId` int(11) DEFAULT NULL,
  `quantity_article` int(11) DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ustock.transfers: ~0 rows (approximately)
/*!40000 ALTER TABLE `transfers` DISABLE KEYS */;
/*!40000 ALTER TABLE `transfers` ENABLE KEYS */;

-- Dumping structure for table ustock.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0',
  `internal_code` varchar(255) DEFAULT '------',
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `level` int(11) DEFAULT '3',
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `obs` varchar(255) DEFAULT '-----',
  `status` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table ustock.users: ~3 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `userId`, `internal_code`, `username`, `password`, `level`, `email`, `name`, `obs`, `status`, `createdAt`, `updatedAt`) VALUES
	(1, 0, 'USR1', 'admin', '$2b$05$mIHco3y/PIBsnjt5MOtpyexyTXJbpoLeLl1Mf8ZQZa8Vlx05ZoEMS', 1, 'reincedaniel@gmail.com', 'Lourenço D. S. Carlos', NULL, 1, '2020-02-11 08:26:00', '2020-02-11 09:10:48'),
	(2, 0, 'USR2', 'coo987', '$2b$05$pllKNbk7kinT4tbptZN/VuAwAPofwKoMgaBMakpy4orT.8lDzdVCK', 2, 'exemplo@gmail.com', 'Exemplo Coordenador', NULL, 1, '2020-02-11 08:27:29', '2020-02-11 08:37:09'),
	(3, 0, 'USR3', 'util789', '$2b$05$k9MXBux0iMcIQBW4ltEYVeC2PgFa/8GRpct9iTvNWI8cE.cw0GVr6', 3, 'fg12@gmail.com', 'Francisco Gomes', NULL, 1, '2020-02-11 08:33:06', '2020-02-17 13:20:48');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
