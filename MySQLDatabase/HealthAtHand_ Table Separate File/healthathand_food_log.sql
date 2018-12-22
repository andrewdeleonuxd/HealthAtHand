CREATE DATABASE  IF NOT EXISTS `healthathand` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `healthathand`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: sis-teach-01.sis.pitt.edu    Database: healthathand
-- ------------------------------------------------------
-- Server version	5.1.73

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
-- Table structure for table `food_log`
--

DROP TABLE IF EXISTS `food_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `food_log` (
  `cart_id` int(11) NOT NULL,
  `food_id` varchar(128) NOT NULL,
  `food_name` varchar(128) NOT NULL,
  `numCal` double NOT NULL,
  `food_qty` double NOT NULL,
  `food_qty_unit` varchar(128) NOT NULL,
  `totalCalories` double NOT NULL,
  PRIMARY KEY (`cart_id`,`food_id`),
  KEY `cart_id` (`cart_id`),
  CONSTRAINT `food_log_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `user_cart` (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_log`
--

LOCK TABLES `food_log` WRITE;
/*!40000 ALTER TABLE `food_log` DISABLE KEYS */;
INSERT INTO `food_log` VALUES (1,'10','Apple',100,0,'',0),(1,'20','Banana',100,0,'',0),(2,'40','Juice',100,0,'',0),(2,'50','Pasta',200,0,'',0),(3,'55','Cheeseburger',400,0,'',0),(11,'10','Apple',100,1,'serving',0),(11,'56','Big Mac',560,1,'serving',0),(13,'10','Banana',100,1,'serving',0),(13,'20','Pear',100,1,'serving',0),(14,'30','Kiwi',100,1,'serving',0),(14,'40','Nut',100,1,'serving',0),(15,'777','Peanut',30,1,'Serving',0),(16,'245','Bacon',360,1,'Slice',0),(17,'2200','Grapes',250,1,'serving',0),(36,'9003','apple',94.64,1,'medium',94.64),(36,'9040','banana',105.02,1,'medium',105.02),(36,'ae496963728f0935701a0c25','PizzaRev Fennel & Sausage Pizza',1150,1,'Whole Pizza',2300),(37,'9003','apple',94.64,1,'medium',94.64),(37,'9040','banana',105.02,1,'medium',105.02),(37,'ae496963728f0935701a0c25','PizzaRev Fennel & Sausage Pizza',1150,1,'Whole Pizza',2300),(38,'9003','apple',94.64,1,'medium',94.64),(38,'9040','banana',105.02,1,'medium',105.02),(38,'ae496963728f0935701a0c25','PizzaRev Fennel & Sausage Pizza',1150,1,'Whole Pizza',2300),(122,'513fbc1283aa2dc80c000053','McDonald\'s Big Mac',540,1,'burger',1080),(122,'51db37e0176fe9790a89a2c9','Sprite Soda',90,1,'can',90),(140,'18070','toast',63.8,1,'slice',63.8),(141,'14148','coke',140,1,'can',140),(141,'21138','french fries',365.04,1,'serving medium',365.04),(141,'21237','big mac',540,1,'burger',540),(142,'1123','egg',71.5,1,'large',71.5),(142,'18070','toast',63.8,1,'slice',63.8),(142,'529d0c3dae976a0000000008','Smithfield Bacon Thick Cut, Naturally Cherrywood Smoke',50,1,'fried slice',150),(143,'1000092','chicken salad',253.99,0.5,'cup',507.98),(143,'513fbc1283aa2dc80c000227','Yogurtland Blackberries',10,1,'oz',30),(144,'14006','miller lite',96,1,'bottle',96),(144,'513fbc1283aa2dc80c00001d','TGI Friday\'s Boneless BBQ Wings (add choice of dressing)',750,1,'serving',750),(145,'18070','toast',63.8,1,'slice',63.8),(145,'9003','apple',94.64,1,'serving',94.64),(145,'9038','avocado',227.12,1,'fruit, without skin and seed',227.12),(146,'21299','pizza',284.62,1,'slice',1138.48),(147,'11371','mashed potato',237.3,1,'cup',237.3),(147,'18326','pumpkin pie',323.19,1,'slice',323.19),(147,'5166','turkey',214.33,4,'oz, cooked',214.33),(148,'51db37bf176fe9790a898f7a','Frosted Flakes Cereal,Frosted Flakes',110,0.75,'cup',220),(148,'9202','orange',68.6,1,'serving',68.6),(149,'1000510','chicken alfredo pasta',1191.34,1,'serving (about 2 cups)',1191.34),(150,'1000463','fruit salad',96.62,1,'cup',96.62),(150,'11053','green beans',2.24,1,'bean',24.64),(150,'23006','tbone steak',245.65,3,'oz',245.65),(151,'513fbc1283aa2dc80c000053','McDonald\'s Big Mac',540,1,'burger',1080),(152,'10862','bacon',161.46,3,'slices',322.92),(152,'1123','egg',71.5,1,'large',143),(152,'18070','toast',63.8,1,'slice',127.6),(152,'9210','orange juice',117.03,1,'cup',234.06),(154,'513fbc1283aa2dc80c000009','Pizza Hut Cheese - Medium Original Pan Slice',260,1,'Slice',1560),(155,'10862','bacon',161.46,3,'slices',322.92),(155,'1123','egg',71.5,1,'large',143),(157,'21138','french fries',365.04,1,'serving medium',365.04),(157,'513fbc1283aa2dc80c000009','Pizza Hut Pepperoni - Medium Original Pan Slice',260,1,'Slice',1300),(158,'18070','toast',63.8,1,'slice',63.8),(159,'1123','egg',71.5,1,'large',143);
/*!40000 ALTER TABLE `food_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-19 10:58:26
