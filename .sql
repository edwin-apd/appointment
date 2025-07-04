--Base de datos para PERU
CREATE DATABASE appointments_service;

USE appointments_service;

CREATE TABLE `appointment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `insuredId` VARCHAR(100) NOT NULL,
  `scheduleId` INT NOT NULL,
  `countryISO` VARCHAR(10) NOT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--Base de datos para CHILE
CREATE DATABASE appointments_service;

USE appointments_service;

CREATE TABLE `appointment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `insuredId` VARCHAR(100) NOT NULL,
  `scheduleId` INT NOT NULL,
  `countryISO` VARCHAR(10) NOT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;