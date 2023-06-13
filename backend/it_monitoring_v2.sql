-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2023 at 09:08 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `it_monitoring_v2`
--

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `user` varchar(100) DEFAULT NULL,
  `action` varchar(100) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `department` varchar(100) NOT NULL,
  `date_requested` date NOT NULL,
  `pending` varchar(500) DEFAULT NULL,
  `date_received` date DEFAULT NULL,
  `purpose` varchar(500) DEFAULT NULL,
  `input_user` varchar(100) NOT NULL,
  `refnbr` varchar(50) NOT NULL,
  `qty` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `remarks` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tablets`
--

CREATE TABLE `tablets` (
  `id` int(11) NOT NULL,
  `company` varchar(50) NOT NULL,
  `item_name` varchar(300) NOT NULL,
  `model` varchar(200) DEFAULT NULL,
  `dop` date DEFAULT NULL,
  `date_added` datetime NOT NULL,
  `serial` varchar(200) DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `price` double DEFAULT NULL,
  `others` varchar(300) DEFAULT NULL,
  `remarks` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tablets`
--

INSERT INTO `tablets` (`id`, `company`, `item_name`, `model`, `dop`, `date_added`, `serial`, `qty`, `price`, `others`, `remarks`) VALUES
(14, 'Monheim', 'Samsung T285 Battery', 'Local', '2023-03-14', '2023-03-15 09:42:54', '', 1, 0, '', ''),
(15, 'Monheim', 'Samsung T285 Battery', 'Local', '2023-03-14', '2023-03-15 09:42:54', '', 1, 0, '', ''),
(16, 'Monheim', 'Samsung T285 Battery', 'Local', '2023-03-14', '2023-03-15 09:42:54', '', 1, 0, '', ''),
(17, 'Monheim', 'Samsung T285 Battery', 'Local', '2023-03-14', '2023-03-15 09:42:54', '', 1, 0, '', ''),
(18, 'Monheim', 'Samsung T285 Battery', 'Local', '2023-03-14', '2023-03-15 09:42:54', '', 1, 0, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `company` varchar(100) NOT NULL,
  `assigned_name` varchar(200) NOT NULL,
  `date_recret` date DEFAULT NULL,
  `item_id` int(11) NOT NULL,
  `item_type` varchar(50) NOT NULL,
  `remarks` varchar(300) NOT NULL,
  `transaction` varchar(50) NOT NULL,
  `date_added` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `company`, `assigned_name`, `date_recret`, `item_id`, `item_type`, `remarks`, `transaction`, `date_added`) VALUES
(21, 'Monheim', 'Gamaliel Rago', '2023-03-14', 18, 'tablet', 'NMD1 - Battery Replacement', 'receive', '2023-03-15 09:43:19'),
(22, 'Monheim', 'Greg Gallardo', '2023-03-14', 17, 'tablet', 'NMD1 - NC2 - Battery Replacement', 'receive', '2023-03-15 09:43:40'),
(23, 'Monheim', 'Garry Prima', '2023-03-14', 16, 'tablet', 'NMD3 - NC9 - Battery Replacement', 'receive', '2023-03-15 09:44:03'),
(24, 'Maryland', '	\nSM2', '2023-03-14', 15, 'tablet', 'SM2 - Battery Replacement', 'receive', '2023-03-15 10:33:07'),
(27, 'Maryland', 'Marco', '2023-03-14', 14, 'tablet', '', 'receive', '2023-03-20 15:30:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`) VALUES
(2, 'admin', 'admin', '$2b$10$WhffLHu70s2vwEJjJ25lHusFP6T8T1mkTJXoTd2h2kaws4MPToZDG'),
(3, 'James Quincy Matute', 'JMATUTE', '$2b$10$RRlbhqlnhW.FmQ7pN6FaE.0jk3ehuhrIi86.6X6BIq8pH0gkL761O'),
(4, 'Kathrine Angeles', 'KANGELES', '$2b$10$2C27HRu0C8dD5RSOnrYbxOCdVS.TLfHhbfRpl0Z/BwXX5fyDcCN3a');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tablets`
--
ALTER TABLE `tablets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `tablets`
--
ALTER TABLE `tablets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
