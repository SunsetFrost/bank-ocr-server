CREATE TABLE   IF NOT EXISTS  `scan` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `card_id` int(20) NOT NULL,
  `user_id` int(20) DEFAULT NULL,
  `card_coordinate` varchar(255) DEFAULT NULL,
  `start_scan_time` datetime DEFAULT NULL,
  `end_scan_time` datetime DEFAULT NULL,
  `scan_result` int(1) NOT NULL,
  `card_errmsg` varchar(255) DEFAULT NULL,  
  `status` int(11) DEFAULT NULL,    
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;