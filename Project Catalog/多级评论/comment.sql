/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.7.42 : Database - comment
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`comment` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `comment`;

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `comment_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `content` varchar(255) NOT NULL COMMENT '评论内容',
  `created_at` varchar(255) NOT NULL COMMENT '评论创建时间',
  `user_id` int(255) NOT NULL COMMENT '外键，关联用户表',
  `parent_id` int(255) DEFAULT NULL COMMENT '可选，用于存储回复的父评论ID，如果是顶级评论则为NULL',
  PRIMARY KEY (`comment_id`),
  KEY `userId` (`user_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

/*Data for the table `comment` */

insert  into `comment`(`comment_id`,`content`,`created_at`,`user_id`,`parent_id`) values (1,'大家好,我是猪八戒','2024/3/26 11:15',1,NULL),(2,'“呆子”','2024/3/27 7:20',2,1),(3,'你这泼猴，休得放肆！','2024/3/28 18:24',3,2),(4,'大师兄，师傅说的对啊...','2024/3/29 14:26',4,2),(23,'还得是你呀\n','2024-05-28 20:37',5,NULL),(24,'你好，小猪','2024-10-20 22:38',5,1);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`avatar`) values (1,'猪八戒','https://img2.baidu.com/it/u=1562219964,2845571792&fm=253&fmt=auto&app=138&f=PNG?w=350&h=350'),(2,'孙悟空','https://img2.baidu.com/it/u=4183032474,3268569206&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=451'),(3,'唐三藏','https://img1.baidu.com/it/u=1967784405,1978906555&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'),(4,'沙悟净','https://img2.baidu.com/it/u=3112121893,2976246098&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'),(5,'我','https://img2.baidu.com/it/u=3114971169,3183825162&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=528');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
