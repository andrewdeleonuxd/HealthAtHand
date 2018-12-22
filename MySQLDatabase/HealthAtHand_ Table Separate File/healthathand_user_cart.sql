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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-19 10:58:29
