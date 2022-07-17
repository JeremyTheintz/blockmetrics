-- MySQL Script generated by MySQL Workbench
-- Sun Jun 12 11:29:44 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema blockmetrics-db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema blockmetrics-db
-- -----------------------------------------------------
USE `blockmetrics-db` ;

-- -----------------------------------------------------
-- Table `blockmetrics-db`.`blockchain`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`blockchain` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `note` TINYINT NULL DEFAULT NULL,
  `consensus` VARCHAR(20) NOT NULL,
  `node_count` INT UNSIGNED NULL DEFAULT NULL,
  `testnet_node_count` INT UNSIGNED NULL DEFAULT NULL,
  `single_node_power_consumption` FLOAT NULL DEFAULT '0',
  `blockchain_power_consumption` INT NULL DEFAULT NULL,
  `hashrate` DOUBLE NULL DEFAULT NULL,
  `difficulty` BIGINT NULL DEFAULT NULL,
  `last_block_timestamp` INT NULL DEFAULT NULL,
  `token_count` INT UNSIGNED NULL DEFAULT NULL,
  `transaction_count` BIGINT NOT NULL DEFAULT 0,
  `today_transaction_count` INT UNSIGNED NOT NULL DEFAULT '0',
  `address_count` BIGINT NOT NULL DEFAULT 0,
  `today_address_count` INT NOT NULL DEFAULT 0,
  `gas_price` BIGINT NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`blockchain_metadata`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`blockchain_metadata` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `language` VARCHAR(4) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `tagline` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_blockchain_metadata_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_blockchain_metadata_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`daily_active_users_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`daily_active_users_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `active_user_count` INT NOT NULL DEFAULT '0',
  `date` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_daily_active_users_history_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_daily_active_users_history_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `blockmetrics-db`.`daily_power_consumption_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`daily_power_consumption_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `power_consumption` INT NOT NULL DEFAULT '0',
  `date` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_daily_power_consumption_history_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_daily_power_consumption_history_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`daily_average_blocktime_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`daily_average_blocktime_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `second` FLOAT NULL DEFAULT '0',
  `date` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_daily_average_blocktime_history_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_daily_average_blocktime_history_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`daily_average_gas_price_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`daily_average_gas_price_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `gas_price` BIGINT NOT NULL COMMENT '[Wei]',
  `date` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_daily_average_gas_price_history_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_daily_average_gas_price_history_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`daily_difficulty_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`daily_difficulty_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `difficulty` FLOAT NOT NULL,
  `date` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_daily_difficulty_history_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_daily_difficulty_history_blockchain0`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`daily_hashrate_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`daily_hashrate_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `hashrate` DOUBLE NOT NULL COMMENT '[TH/s]',
  `date` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_hashrate_history_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_hashrate_history_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`daily_new_addresses_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`daily_new_addresses_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `address_count` INT NOT NULL DEFAULT '0',
  `date` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_daily_new_addresses_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_daily_new_addresses_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `blockmetrics-db`.`daily_transaction_count_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`daily_transaction_count_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `transaction_count` INT NOT NULL DEFAULT '0',
  `date` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_daily_transaction_count_history_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_daily_transaction_count_history_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`daily_new_contracts_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`daily_new_contracts_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `contract_count` INT NOT NULL DEFAULT '0',
  `date` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_daily_new_contracts_history_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_daily_new_contracts_history_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`daily_new_tokens_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`daily_new_tokens_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `token_count` INT NOT NULL DEFAULT '0',
  `date` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_daily_new_tokens_history_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_daily_new_tokens_history_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`daily_node_count_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`daily_node_count_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `node_count` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_daily_node_count_history_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_daily_node_count_history`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`daily_token_count_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`daily_token_count_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `token_count` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_daily_token_count_history_blockchain1_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_daily_token_count_history_blockchain1`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`today_active_address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`today_active_address` (
  `address` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `day` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`address`, `blockchain_id`, `day`),
  INDEX `fk_today_active_address_blockchain1_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_today_active_address_blockchain1`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


INSERT INTO `blockchain` (`id`, `name`, `note`, `node_count`, `testnet_node_count`, `single_node_power_consumption`, `blockchain_power_consumption`, `hashrate`, `difficulty`, `last_block_timestamp`, `token_count`, `transaction_count`, `gas_price`, `created_at`, `updated_at`, `consensus`, `today_transaction_count`, `address_count`, `today_address_count`) VALUES
('avalanche', 'Avalanche', NULL, NULL, 0, 51.33, 0, NULL, NULL, NULL, 0, 0, NULL, '2022-04-19 11:50:53', '2022-06-11 23:56:24', 'pos', 0, 0, 0),
('binance-smart-chain', 'Binance SC', NULL, NULL, 0, 50, 0, NULL, NULL, NULL, 0, 0, NULL, '2022-04-19 11:47:09', '2022-06-11 23:56:24', 'pos', 0, 0, 0),
('bitcoin', 'Bitcoin', NULL, NULL, 0, 0, 0, 0, NULL, NULL, 1, 0, NULL, '2022-04-19 11:48:19', '2022-06-11 23:56:24', 'pow', 0, 0, 0),
('ethereum', 'Ethereum', NULL, NULL, 0, 0, 0, 0, NULL, NULL, 0, 0, NULL, '2022-04-19 11:46:20', '2022-06-11 23:56:24', 'pow', 0, 0, 0),
('fantom', 'Fantom', NULL, 89, 0, 0.25, 0, NULL, NULL, NULL, 0, 0, NULL, '2022-05-14 09:47:40', '2022-06-11 23:56:24', 'pos', 0, 0, 0),
('polygon', 'Polygon', NULL, 100, 0, 1000, 0, NULL, NULL, NULL, 0, 0, NULL, '2022-04-19 11:47:32', '2022-06-11 23:56:24', 'pos', 0, 0, 0);



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
