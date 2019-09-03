CREATE TABLE   IF NOT EXISTS  `card` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `number` varchar(255) NOT NULL,
  `user_id` int(20) NOT NULL,  
  `type` varchar(255) DEFAULT NULL,  
  `bank` varchar(255) DEFAULT NULL,  
  `img` text DEFAULT NULL,   
  `create_time` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,    
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;