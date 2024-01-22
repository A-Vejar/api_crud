-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 12, 2022 at 08:21 PM
-- Server version: 10.3.23-MariaDB-0+deb10u1
-- PHP Version: 7.3.19-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `DB_CRUD`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`wsaap`@`localhost` PROCEDURE `API_CRUD_DeleteUsuario` (IN `idUsuario` INT, IN `usuario` VARCHAR(10))  NO SQL
UPDATE API_CRUD_Usuario
SET
    DeletedBy = usuario
    ,DeletedAt = NOW()
WHERE Id = idUsuario$$

CREATE DEFINER=`wsaap`@`localhost` PROCEDURE `API_CRUD_GetUsuario` (IN `idUsuario` INT)  NO SQL
SELECT
	Id AS 'id'
    ,Nombre AS 'nombre'
    ,ApellidoPaterno AS 'apellido_paterno'
    ,ApellidoMaterno AS 'apellido_materno'
    ,FechaNacimiento AS 'fecha_nacimiento'
    ,DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),FechaNacimiento)), '%Y') + 0 AS 'edad'
    ,Correo AS 'correo'
    ,Telefono AS 'telefono'
    ,CreateBy AS 'created_by'
    ,CreateAt AS 'created_at'
    ,UpdatedBy AS 'updated_by'
    ,UpdatedAt AS 'updated_at'
    ,DeletedBy AS 'deleted_by'
    ,DeletedAt AS 'deleted_at'
FROM API_CRUD_Usuario
WHERE
	Id = idUsuario
	AND DeletedBy IS NULL
    AND DeletedAt IS NULL$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `API_CRUD_GetUsuarios` ()  NO SQL
SELECT
	Id AS 'id'
    ,Nombre AS 'nombre'
    ,ApellidoPaterno AS 'apellido_paterno'
    ,ApellidoMaterno AS 'apellido_materno'
    ,FechaNacimiento AS 'fecha_nacimiento'
    ,DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),FechaNacimiento)), '%Y') + 0 AS 'edad'
    ,Correo AS 'correo'
    ,Telefono AS 'telefono'
    ,CreateBy AS 'created_by'
    ,CreateAt AS 'created_at'
    ,UpdatedBy AS 'updated_by'
    ,UpdatedAt AS 'updated_at'
    ,DeletedBy AS 'deleted_by'
    ,DeletedAt AS 'deleted_at'
FROM API_CRUD_Usuario
WHERE
	DeletedBy IS NULL
    AND DeletedAt IS NULL$$

CREATE DEFINER=`wsaap`@`localhost` PROCEDURE `API_CRUD_PatchUsuario` (IN `idUsuario` INT, IN `nombre` VARCHAR(40), IN `apellidoPaterno` VARCHAR(20), IN `apellidoMaterno` VARCHAR(20), IN `fechaNacimiento` DATETIME, IN `correo` VARCHAR(100), IN `telefono` INT, IN `usuario` VARCHAR(10))  NO SQL
UPDATE API_CRUD_Usuario
SET
	Nombre = IFNULL(nombre, NULL)
    ,ApellidoPaterno = IFNULL(apellidoPaterno, NULL)
	,ApellidoMaterno = IFNULL(apellidoMaterno, NULL)
    ,FechaNacimiento = IFNULL(fechaNacimiento, NULL)
    ,Correo = IFNULL(correo, NULL)
    ,Telefono = IFNULL(telefono, NULL)
    ,UpdatedBy = usuario
    ,UpdatedAt = NOW()
WHERE Id = idUsuario$$

CREATE DEFINER=`wsaap`@`localhost` PROCEDURE `API_CRUD_PostUsuario` (IN `nombre` VARCHAR(40), IN `apellidoPaterno` VARCHAR(20), IN `apellidoMaterno` VARCHAR(20), IN `fechaNacimiento` DATETIME, IN `correo` VARCHAR(100), IN `telefono` INT, IN `usuario` VARCHAR(10))  NO SQL
INSERT INTO API_CRUD_Usuario
(Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Correo, Telefono, CreateBy, CreateAt)
VALUES(nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, correo, telefono, usuario, NOW())$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `API_CRUD_Usuario`
--

CREATE TABLE `API_CRUD_Usuario` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(40) NOT NULL,
  `ApellidoPaterno` varchar(20) NOT NULL,
  `ApellidoMaterno` varchar(20) NOT NULL,
  `FechaNacimiento` datetime NOT NULL,
  `Correo` varchar(100) DEFAULT NULL,
  `Telefono` int(11) DEFAULT NULL,
  `CreateBy` varchar(10) NOT NULL,
  `CreateAt` datetime NOT NULL,
  `UpdatedBy` varchar(10) DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `DeletedBy` varchar(10) DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `API_CRUD_Usuario`
--

INSERT INTO `API_CRUD_Usuario` (`Id`, `Nombre`, `ApellidoPaterno`, `ApellidoMaterno`, `FechaNacimiento`, `Correo`, `Telefono`, `CreateBy`, `CreateAt`, `UpdatedBy`, `UpdatedAt`, `DeletedBy`, `DeletedAt`) VALUES
(1, 'Ariel', 'Vejar', 'Martinez', '1993-11-06 00:00:00', 'ariel.vejar@live.cl', 975686616, 'avejar', '2022-07-10 20:56:23', NULL, NULL, NULL, NULL),
(2, 'Test update', 'Test update', 'Test update', '1990-12-25 00:00:00', 'x@y.z', 555, 'wsaap', '2022-07-11 12:38:06', 'wsaap', '2022-07-12 09:47:27', 'avejar', '2022-07-11 15:24:48'),
(3, 'Test 1', 'Test 2', 'Test 3', '1990-12-25 00:00:00', NULL, 123, 'wsaap', '2022-07-11 15:25:39', NULL, NULL, NULL, NULL),
(4, 'AAA', 'BBB', 'CCC', '2023-12-15 00:00:00', 'ASDASD', NULL, 'admin', '2022-07-12 18:02:11', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `API_CRUD_Usuario`
--
ALTER TABLE `API_CRUD_Usuario`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `API_CRUD_Usuario`
--
ALTER TABLE `API_CRUD_Usuario`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
