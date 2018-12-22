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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-19 10:58:27
