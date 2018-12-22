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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-19 10:58:29
