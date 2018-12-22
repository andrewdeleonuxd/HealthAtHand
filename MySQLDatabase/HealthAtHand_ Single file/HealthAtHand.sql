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
-- Table structure for table `daily_cal`
--

DROP TABLE IF EXISTS `daily_cal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daily_cal` (
  `user_id` int(11) NOT NULL,
  `day` date NOT NULL,
  `remaining_cal` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`day`),
  CONSTRAINT `daily_cal_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_cal`
--

LOCK TABLES `daily_cal` WRITE;
/*!40000 ALTER TABLE `daily_cal` DISABLE KEYS */;
INSERT INTO `daily_cal` VALUES (1,'0000-00-00',2000),(1,'2018-11-20',2000),(1,'2018-11-21',2000),(1,'2018-11-22',2000),(1,'2018-11-23',2000),(1,'2018-11-24',2000),(1,'2018-11-25',2000),(1,'2018-11-26',2000),(1,'2018-11-27',2000),(1,'2018-11-28',2000),(1,'2018-11-29',2000),(1,'2018-11-30',2000),(1,'2018-12-01',-297),(1,'2018-12-02',-925),(1,'2018-12-03',-387),(1,'2018-12-04',2000),(1,'2018-12-07',-130);
/*!40000 ALTER TABLE `daily_cal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_exercise`
--

DROP TABLE IF EXISTS `daily_exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daily_exercise` (
  `user_id` int(11) NOT NULL,
  `day` date NOT NULL,
  `total_min` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`day`),
  CONSTRAINT `fk13` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_exercise`
--

LOCK TABLES `daily_exercise` WRITE;
/*!40000 ALTER TABLE `daily_exercise` DISABLE KEYS */;
INSERT INTO `daily_exercise` VALUES (1,'0000-00-00',60),(1,'2018-11-30',170);
/*!40000 ALTER TABLE `daily_exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_weight`
--

DROP TABLE IF EXISTS `daily_weight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daily_weight` (
  `user_id` int(11) NOT NULL,
  `day` date NOT NULL,
  `weight` int(11) NOT NULL,
  KEY `user_id` (`user_id`),
  CONSTRAINT `daily_weight_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_weight`
--

LOCK TABLES `daily_weight` WRITE;
/*!40000 ALTER TABLE `daily_weight` DISABLE KEYS */;
INSERT INTO `daily_weight` VALUES (1,'2018-10-10',725),(1,'2018-10-12',717),(1,'2018-11-11',627),(1,'2018-11-12',627),(1,'2018-11-15',620),(1,'2018-11-25',602),(1,'2018-11-26',600),(1,'2018-11-28',600),(1,'2018-11-29',550),(1,'2018-11-30',525),(1,'2018-12-01',512),(1,'2018-01-01',1200),(1,'2018-12-01',510),(1,'2018-12-02',508),(1,'2018-12-03',400),(1,'2018-12-07',200);
/*!40000 ALTER TABLE `daily_weight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email`
--

DROP TABLE IF EXISTS `email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email` (
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `subject` varchar(200) CHARACTER SET utf8 NOT NULL,
  `email_body` varchar(2000) CHARACTER SET utf8 DEFAULT NULL,
  KEY `fk3_idx` (`user_id`),
  CONSTRAINT `fk3` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email`
--

LOCK TABLES `email` WRITE;
/*!40000 ALTER TABLE `email` DISABLE KEYS */;
INSERT INTO `email` VALUES (1,'2018-11-25 00:00:00','hello','This is a test');
/*!40000 ALTER TABLE `email` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_log`
--

DROP TABLE IF EXISTS `exercise_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercise_log` (
  `exercise_id` varchar(30) CHARACTER SET utf8 NOT NULL,
  `exercise_name` varchar(45) CHARACTER SET utf8 NOT NULL,
  `duration` int(11) NOT NULL,
  `intensity` varchar(11) CHARACTER SET utf8 NOT NULL,
  `user_id` int(11) NOT NULL,
  `day` date NOT NULL,
  PRIMARY KEY (`exercise_id`,`user_id`),
  KEY `fk14_idx` (`user_id`),
  KEY `fk16_idx` (`user_id`),
  CONSTRAINT `fk16` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_log`
--

LOCK TABLES `exercise_log` WRITE;
/*!40000 ALTER TABLE `exercise_log` DISABLE KEYS */;
INSERT INTO `exercise_log` VALUES ('2f269980f5d811e8893259532ef235','walking',40,'Low',1,'2018-11-30'),('328d8fc0f72c11e8a6e35ff3afc0ae','rock climbing',30,'High',1,'2018-12-03'),('37440050f5d611e8911c95aa3c4d7c','jogging',10,'Low',1,'2018-11-20'),('7dbb2bc0f72111e88a954fac596375','jogging',60,'Low',1,'2018-12-03'),('81a969a0fbc611e8a6ba512941a174','rock climbing',40,'Medium',1,'2018-12-09'),('88dc6a60fa5911e887f5bb1c299ee1','rock climbing',30,'Low',1,'2018-12-07'),('8f4056e0f72111e88a954fac596375','swimming',20,'High',1,'2018-12-03'),('985ad520f5dc11e88280f994b16710','running',30,'Medium',1,'2018-12-01'),('a43e80d0f5dc11e88280f994b16710','weight lifting',30,'Medium',1,'2018-12-01'),('acd010a0f4f211e89e588b92dbf086','rock climbing',30,'Low',1,'2018-11-30'),('b6d8d150fbc211e8be09b1840f8c39','jogging',30,'Low',1,'2018-12-09'),('c455de20f69211e89bd30d6e61c8d5','walking',30,'Low',1,'2018-12-02'),('e2ad6fd0f69411e89bd30d6e61c8d5','rock climbing',180,'Low',1,'2018-12-02'),('f314fbd0fa4b11e8ad3415080a9797','jogging',90,'Low',1,'2018-12-07');
/*!40000 ALTER TABLE `exercise_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`healthathand`@`%`*/ /*!50003 TRIGGER `healthathand`.`exercise_log_AFTER_INSERT` AFTER INSERT ON `exercise_log` FOR EACH ROW
BEGIN
		UPDATE daily_exercise
        SET total_min = total_min + NEW.duration
        WHERE user_id = NEW.user_id AND day = CURDATE();
        
        UPDATE weekly_exercise 
        SET total_week_min = total_week_min + NEW.duration
        WHERE user_id = NEW.user_id AND CURDATE() >= week_start AND CURDATE() < week_end ; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`healthathand`@`%`*/ /*!50003 TRIGGER `healthathand`.`exercise_log_AFTER_UPDATE` AFTER UPDATE ON `exercise_log` FOR EACH ROW
BEGIN
		UPDATE daily_exercise
        SET total_min = total_min + (NEW.duration - OLD.duration)
        WHERE user_id = NEW.user_id AND day = CURDATE();
        
        UPDATE weekly_exercise
        SET total_week_min = total_week_min + (NEW.duration - OLD.duration)
        WHERE user_id = NEW.user_id AND CURDATE() >= week_start AND CURDATE() < week_end  ;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`healthathand`@`%`*/ /*!50003 TRIGGER `healthathand`.`exercise_log_BEFORE_DELETE` BEFORE DELETE ON `exercise_log` FOR EACH ROW
BEGIN
		UPDATE daily_exercise
        SET total_min = total_min - OLD.duration
        WHERE user_id = user_id AND day = CURDATE();
        
        UPDATE weekly_exercise
        SET total_week_min = total_week_min - OLD.duration
        WHERE user_id = user_id AND CURDATE() >= week_start AND CURDATE() < week_end ;
        
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `exercise_note`
--

DROP TABLE IF EXISTS `exercise_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercise_note` (
  `user_id` int(11) NOT NULL,
  `day` date NOT NULL,
  `exercise_notes` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`day`),
  CONSTRAINT `fk2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_note`
--

LOCK TABLES `exercise_note` WRITE;
/*!40000 ALTER TABLE `exercise_note` DISABLE KEYS */;
INSERT INTO `exercise_note` VALUES (1,'2018-11-16','I ran 2 miles today!'),(1,'2018-11-25','Hey whats up, I am still working out'),(1,'2018-11-26','I\'m basically Michael Phelps but worse'),(1,'2018-11-27','I\'m sweating'),(1,'2018-11-28','Woop , I am hitting gym today'),(1,'2018-11-30',':)'),(1,'2018-12-01','I think I need a fitness coach. I don\'t know what I\'m doing!'),(1,'2018-12-02','I had to walk to the grocery store...'),(1,'2018-12-03','I suck at exercising.'),(1,'2018-12-07','Wow');
/*!40000 ALTER TABLE `exercise_note` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `food_note`
--

DROP TABLE IF EXISTS `food_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `food_note` (
  `user_id` int(11) NOT NULL,
  `day` date NOT NULL,
  `food_notes` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`user_id`,`day`),
  CONSTRAINT `fkuser_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_note`
--

LOCK TABLES `food_note` WRITE;
/*!40000 ALTER TABLE `food_note` DISABLE KEYS */;
INSERT INTO `food_note` VALUES (1,'2018-11-16','I binged from stress and ate a big mac with cheese and butter'),(1,'2018-11-19','This is coming to you straight from the MySQL server!'),(1,'2018-11-25','Woooooooooo'),(1,'2018-11-26','I ate pretty healthy stuff today!'),(1,'2018-11-27','I\'m fat'),(1,'2018-11-28','I\'m tried to stay away from soy sauce at the Chinese restaurant. Very spicy food. I was surprised at how light on calories it was. Should I eat out more? Now I am again hungry'),(1,'2018-11-29',':)'),(1,'2018-11-30','I\'m eating healthier than before.'),(1,'2018-12-01','Thanksgiving leftovers were going to waste, so I had to do something about it! I regret nothing.'),(1,'2018-12-02','I had leftovers from the other night, and cooked myself some dinner. Iâ€™m surprised I didnâ€™t go over my calories with the steak!'),(1,'2018-12-03','We had a nice hearty breakfast that I regret.'),(1,'2018-12-07','Iâ€™m not managing my calories well today!');
/*!40000 ALTER TABLE `food_note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `health_coach`
--

DROP TABLE IF EXISTS `health_coach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `health_coach` (
  `health_coach_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(200) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`health_coach_id`),
  CONSTRAINT `fk` FOREIGN KEY (`health_coach_id`) REFERENCES `user` (`health_coach_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `health_coach`
--

LOCK TABLES `health_coach` WRITE;
/*!40000 ALTER TABLE `health_coach` DISABLE KEYS */;
INSERT INTO `health_coach` VALUES (1,'add60@pitt.edu',1);
/*!40000 ALTER TABLE `health_coach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `max_cal`
--

DROP TABLE IF EXISTS `max_cal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `max_cal` (
  `user_id` int(11) NOT NULL,
  `max_cal` int(11) NOT NULL,
  `in_z` datetime NOT NULL,
  `out_z` datetime NOT NULL,
  KEY `user_id` (`user_id`),
  CONSTRAINT `max_cal_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `max_cal`
--

LOCK TABLES `max_cal` WRITE;
/*!40000 ALTER TABLE `max_cal` DISABLE KEYS */;
INSERT INTO `max_cal` VALUES (1,2000,'2018-10-18 00:00:00','2099-10-29 00:00:00');
/*!40000 ALTER TABLE `max_cal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `max_exercise`
--

DROP TABLE IF EXISTS `max_exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `max_exercise` (
  `user_id` int(11) NOT NULL,
  `max_min` int(11) NOT NULL,
  `in_z` date NOT NULL,
  `out_z` date DEFAULT NULL,
  PRIMARY KEY (`user_id`,`in_z`),
  CONSTRAINT `fk12` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `max_exercise`
--

LOCK TABLES `max_exercise` WRITE;
/*!40000 ALTER TABLE `max_exercise` DISABLE KEYS */;
INSERT INTO `max_exercise` VALUES (1,500,'2018-11-30','2099-12-31');
/*!40000 ALTER TABLE `max_exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `health_coach_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `fk5_idx` (`health_coach_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'drrogers@gmail.com','password',1),(2,'alex@gmail.com','123456789',2),(3,'person@email.com','12345',5);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_cart`
--

DROP TABLE IF EXISTS `user_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `datetime` date NOT NULL,
  `cart_cal` int(11) NOT NULL DEFAULT '0',
  `cart_name` varchar(45) NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_cart`
--

LOCK TABLES `user_cart` WRITE;
/*!40000 ALTER TABLE `user_cart` DISABLE KEYS */;
INSERT INTO `user_cart` VALUES (1,1,'2018-10-02',200,''),(2,2,'2018-10-02',300,''),(3,3,'2018-10-18',400,''),(4,1,'2018-11-08',200,''),(5,1,'2018-11-08',600,''),(6,1,'2018-11-08',300,''),(8,1,'2018-11-12',200,''),(9,1,'2018-11-12',300,''),(10,1,'2018-11-12',300,''),(11,1,'2018-11-14',560,'Lunch'),(13,1,'2018-11-14',270,'Lunch'),(14,1,'2018-11-14',270,'Dinner'),(15,1,'2018-11-19',655,'Breakfast'),(16,1,'2018-11-19',755,'Lunch'),(17,1,'2018-11-25',250,'Dinner'),(35,1,'2018-11-26',0,'1'),(36,1,'2018-11-26',500,'Breakfast'),(37,1,'2018-11-26',0,'1'),(38,1,'2018-11-26',0,'1'),(43,1,'2018-11-27',0,'1'),(46,1,'2018-11-27',0,'1'),(47,1,'2018-11-27',0,'1'),(48,1,'2018-11-27',0,'1'),(49,1,'2018-11-27',0,'1'),(50,1,'2018-11-27',0,'1'),(51,1,'2018-11-27',0,'1'),(52,1,'2018-11-27',0,'1'),(53,1,'2018-11-27',0,'1'),(54,1,'2018-11-27',0,'1'),(55,1,'2018-11-27',0,'1'),(56,1,'2018-11-27',0,'1'),(57,1,'2018-11-27',0,'1'),(58,1,'2018-11-27',0,'1'),(59,1,'2018-11-27',0,'1'),(60,1,'2018-11-27',0,'Meal 1'),(61,1,'2018-11-27',0,'Meal 1'),(62,1,'2018-11-27',0,'Meal 1'),(63,1,'2018-11-27',0,'Meal 2'),(64,1,'2018-11-27',0,'Meal 2'),(65,1,'2018-11-27',0,'Meal 1'),(66,1,'2018-11-27',0,'Meal 1'),(67,1,'2018-11-28',0,'Meal 1'),(68,1,'2018-11-28',0,'Meal 1'),(69,1,'2018-11-28',0,'Meal 2'),(70,1,'2018-11-28',0,'Meal 3'),(71,1,'2018-11-28',0,'Meal 4'),(72,1,'2018-11-28',0,'Meal 5'),(73,1,'2018-11-28',0,'Meal 1'),(74,1,'2018-11-28',0,'Meal 2'),(75,1,'2018-11-28',0,'Linner'),(76,1,'2018-11-28',0,'Meal 1'),(77,1,'2018-11-28',0,'Meal 3'),(78,1,'2018-11-28',0,'Meal 3'),(79,1,'2018-11-28',0,'Meal 4'),(80,1,'2018-11-28',0,'Meal 4'),(81,1,'2018-11-28',0,'Meal 1'),(82,1,'2018-11-28',0,'Meal 1'),(83,1,'2018-11-28',0,'Meal 1'),(84,1,'2018-11-28',0,'Meal 2'),(85,1,'2018-11-28',0,'Meal 1'),(86,1,'2018-11-28',0,'Meal 1'),(87,1,'2018-11-28',0,'Meal 1'),(88,1,'2018-11-28',0,'Meal 2'),(91,1,'2018-11-28',0,'Meal 1'),(95,1,'2018-11-28',0,'Meal 2'),(97,1,'2018-11-28',0,'Meal 1'),(101,1,'2018-11-28',0,'Meal 1'),(122,1,'2018-11-29',1170,'Meal 1'),(125,1,'2018-11-30',0,'Meal 2'),(126,1,'2018-11-30',0,'Meal 2'),(128,1,'2018-11-30',0,'Meal 3'),(135,1,'2018-11-30',1620,'Meal 1'),(137,1,'2018-11-30',1080,'Meal 1'),(140,1,'2018-11-20',63,'Meal 1'),(141,1,'2018-11-20',1045,'Meal 2'),(142,1,'2018-11-30',285,'Meal 1'),(143,1,'2018-11-30',537,'Meal 2'),(144,1,'2018-11-30',846,'Meal 3'),(145,1,'2018-12-01',385,'Meal 1'),(146,1,'2018-12-01',1138,'Meal 2'),(147,1,'2018-12-01',774,'Meal 3'),(148,1,'2018-12-02',288,'Meal 1'),(149,1,'2018-12-02',1191,'Meal 2'),(150,1,'2018-12-02',366,'Meal 3'),(151,1,'2018-12-02',1080,'Meal 4'),(152,1,'2018-12-03',827,'Meal 1'),(154,1,'2018-12-03',1560,'Meal 2'),(155,1,'2018-12-07',465,'Meal 1'),(157,1,'2018-12-07',1665,'Meal 2'),(158,1,'2018-12-09',63,'Meal 1'),(159,1,'2018-12-09',143,'Meal 2');
/*!40000 ALTER TABLE `user_cart` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`healthathand`@`%`*/ /*!50003 TRIGGER `update_cal` AFTER INSERT ON `user_cart` 
    FOR EACH ROW BEGIN

        UPDATE daily_cal
        SET remaining_cal = remaining_cal - NEW.cart_cal
        WHERE user_id = NEW.user_id AND day = CURDATE();
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`healthathand`@`%`*/ /*!50003 TRIGGER `healthathand`.`user_cart_AFTER_UPDATE` AFTER UPDATE ON `user_cart` FOR EACH ROW
BEGIN
		UPDATE daily_cal
        SET remaining_cal = remaining_cal - (NEW.cart_cal - OLD.cart_cal)
        WHERE user_id = NEW.user_id AND day = CURDATE();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`healthathand`@`%`*/ /*!50003 TRIGGER `healthathand`.`user_cart_BEFORE_DELETE` BEFORE DELETE ON `user_cart` FOR EACH ROW
BEGIN		
		UPDATE daily_cal
        SET remaining_cal = remaining_cal + OLD.cart_cal
        WHERE user_id = user_id AND day = CURDATE();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `weekly_exercise`
--

DROP TABLE IF EXISTS `weekly_exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weekly_exercise` (
  `user_id` int(11) NOT NULL,
  `total_week_min` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `week_start` date NOT NULL,
  `week_end` date DEFAULT NULL,
  PRIMARY KEY (`user_id`,`week_start`),
  CONSTRAINT `fk14` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weekly_exercise`
--

LOCK TABLES `weekly_exercise` WRITE;
/*!40000 ALTER TABLE `weekly_exercise` DISABLE KEYS */;
INSERT INTO `weekly_exercise` VALUES (1,'0','2018-11-18','2018-11-25'),(1,'0','2018-11-25','2018-12-01'),(1,'500','2018-12-01','2018-12-08'),(1,'70','2018-12-08','2018-12-15');
/*!40000 ALTER TABLE `weekly_exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'healthathand'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `reset_remaining_calories` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = '' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE EVENT `reset_remaining_calories` ON SCHEDULE EVERY 1 DAY STARTS '2019-01-01 00:00:00' ON COMPLETION PRESERVE ENABLE DO UPDATE daily_cal, max_cal
        SET daily_cal.remaining_cal = max_cal.max_cal
        WHERE daily_cal.user_id = max_cal.user_id */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'healthathand'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-19 10:44:57
