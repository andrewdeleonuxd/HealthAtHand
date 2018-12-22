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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-19 10:58:26
