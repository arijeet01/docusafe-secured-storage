CREATE TABLE `docusafe`.`user_master_db` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_role` BINARY NULL DEFAULT 0,
  `user_fname` VARCHAR(45) NOT NULL,
  `user_lname` VARCHAR(45) NULL,
  `user_mobile` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(45) NULL,
  `user_password_otp` VARCHAR(45) NULL,
  `user_password` VARCHAR(45) NOT NULL,
  `user_dob` VARCHAR(45) NULL,
  `user_profile_url` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE,
  UNIQUE INDEX `user_mobile_UNIQUE` (`user_mobile` ASC) VISIBLE);

-- Modification Level 1 08-04-2023 09:12
ALTER TABLE `docusafe`.`user_master_db` 
CHANGE COLUMN `user_password` `user_password` VARCHAR(255) NOT NULL AFTER `user_email`,
CHANGE COLUMN `user_fname` `user_fname` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `user_lname` `user_lname` VARCHAR(255) NULL DEFAULT NULL ,
CHANGE COLUMN `user_mobile` `user_mobile` VARCHAR(55) NOT NULL ,
CHANGE COLUMN `user_email` `user_email` VARCHAR(255) NULL DEFAULT NULL ,
CHANGE COLUMN `user_password_otp` `user_password_otp` VARCHAR(255) NULL DEFAULT NULL ,
CHANGE COLUMN `user_profile_url` `user_profile_url` VARCHAR(255) NULL DEFAULT NULL ;


-- Modification level 2 08-04-2023 12:57
ALTER TABLE `docusafe`.`user_master_db` 
CHANGE COLUMN `user_role` `user_role` INT NULL DEFAULT '0' ;
