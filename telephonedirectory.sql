-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 14 jan. 2025 à 20:57
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `telephonedirectory`
--

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `ID` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`ID`, `code`, `name`, `created_date`) VALUES
(1, 'PCA', 'PRESIDENT DU CONSEIL D\'ADMINSITRATION', '2025-01-08 11:53:23'),
(2, 'DG', 'DIRECTEUR GENERAL', '2025-01-08 11:54:02'),
(3, 'DGA', 'DIRECTEUR GENERAL ADJOINT', '2025-01-08 11:55:48'),
(4, 'CFI', 'COORDONATEUR FINANCE ISLAMIQUE', '2025-01-08 11:55:48'),
(9, 'SC', 'SECRETARIAT', '2025-01-08 11:58:58'),
(10, 'DF', 'DIRECTION FINANCIERE', '2025-01-08 11:58:58'),
(11, 'GP', 'GESTION PATRIMOINE', '2025-01-08 12:00:18'),
(12, 'CDFR', 'CHEF DEPARTEMENT FINANCE RURAL', '2025-01-08 12:00:18'),
(13, 'DDE', 'DEPARTEMENT DES ENGAGEMENTS', '2025-01-08 12:01:09'),
(14, 'SJ', 'SERVICE JURIDIQUE', '2025-01-08 12:01:09'),
(15, 'AD', 'AUDIT', '2025-01-08 12:02:05'),
(16, 'SCON', 'SERVICE CONTROLE', '2025-01-08 12:02:05'),
(17, 'DIS', 'DEPARTEMENT INFORMATIQUE ET STATISTIQUE', '2025-01-08 12:03:33'),
(18, 'RH', 'RESSOURCES HUMAINES', '2025-01-08 12:03:33'),
(19, 'DM', 'DEPARTEMENT MARKETING', '2025-01-08 12:04:25'),
(20, 'FM', 'FINANCE MOBILE', '2025-01-08 12:04:25'),
(21, 'FR', 'FINANCE RURAL', '2025-01-08 12:05:52'),
(22, ' SDR 4', 'SALLE DE REUNION 4eme', '2025-01-08 12:05:52'),
(23, 'SDR5', 'SALLE DE REUNION 5eme', '2025-01-08 12:06:39'),
(24, 'SDR6', 'SALLE DE REUNION 6eme', '2025-01-08 12:06:39'),
(25, 'ARDC', 'ACCUEIL REZ DE CHAUSSEE', '2025-01-08 12:08:06'),
(26, 'RC', 'RESPONSABLE DE LA COMMUNICATION', '2025-01-08 12:08:06');

-- --------------------------------------------------------

--
-- Structure de la table `telephonedirectory`
--

CREATE TABLE `telephonedirectory` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `telephonedirectory`
--

INSERT INTO `telephonedirectory` (`id`, `name`, `service`, `phone_number`) VALUES
(18, 'pola', 'AUDIT', '654369998'),
(19, 'Manfouo Teufa Cerena Merveille', 'DEPARTEMENT MARKETING', '654369998'),
(20, 'Nananananaa', 'COORDONATEUR FINANCE ISLAMIQUE', '55555555');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `telephonedirectory`
--
ALTER TABLE `telephonedirectory`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `telephonedirectory`
--
ALTER TABLE `telephonedirectory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
