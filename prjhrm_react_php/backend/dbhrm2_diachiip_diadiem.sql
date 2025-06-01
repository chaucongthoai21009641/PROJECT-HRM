-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 09, 2025 lúc 11:08 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `dbhrm`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bangcong`
--

CREATE TABLE `bangcong` (
  `maBC` int(11) NOT NULL,
  `tgCheckIn` time DEFAULT NULL,
  `tgCheckout` time DEFAULT NULL,
  `maLLV` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `bangcong`
--

INSERT INTO `bangcong` (`maBC`, `tgCheckIn`, `tgCheckout`, `maLLV`, `created_at`, `updated_at`) VALUES
(1, '07:36:00', '11:43:00', 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(2, '08:06:00', '12:12:00', 2, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(3, '07:41:00', '12:42:00', 3, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(4, '08:42:00', '12:51:00', 4, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(5, '08:25:00', '11:32:00', 5, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(6, '07:28:00', '11:02:00', 6, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(7, '07:31:00', '11:25:00', 7, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(8, '07:43:00', '12:45:00', 8, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(9, '08:25:00', '12:07:00', 9, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(10, '07:29:00', '12:32:00', 10, '2025-04-09 02:07:38', '2025-04-09 02:07:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `calam`
--

CREATE TABLE `calam` (
  `maCL` int(11) NOT NULL,
  `tenCa` varchar(255) NOT NULL,
  `gioCheckInSom` int(11) NOT NULL,
  `gioCheckOutMuon` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `calam`
--

INSERT INTO `calam` (`maCL`, `tenCa`, `gioCheckInSom`, `gioCheckOutMuon`, `created_at`, `updated_at`) VALUES
(1, 'Overtime', 5, 1, '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(2, 'Overtime', 2, 5, '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(3, 'Part-time', 6, 3, '2025-04-09 02:07:35', '2025-04-09 02:07:35');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietcalam`
--

CREATE TABLE `chitietcalam` (
  `maCTCL` int(11) NOT NULL,
  `thuTrongTuan` int(11) NOT NULL,
  `tgBatDau` time NOT NULL,
  `tgKetThuc` time NOT NULL,
  `tgBatDauNghi` time DEFAULT NULL,
  `tgKetThucNghi` time DEFAULT NULL,
  `heSoLuong` decimal(5,2) NOT NULL DEFAULT 1.00,
  `tienThuong` decimal(10,2) NOT NULL DEFAULT 0.00,
  `maCL` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietcalam`
--

INSERT INTO `chitietcalam` (`maCTCL`, `thuTrongTuan`, `tgBatDau`, `tgKetThuc`, `tgBatDauNghi`, `tgKetThucNghi`, `heSoLuong`, `tienThuong`, `maCL`, `created_at`, `updated_at`) VALUES
(1, 2, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 1, '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(2, 3, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 1, '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(3, 4, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 1, '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(4, 5, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 1, '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(5, 6, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 1, '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(6, 2, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 2, '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(7, 3, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 2, '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(8, 4, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 2, '2025-04-09 02:07:35', '2025-04-09 02:07:35');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diachiip`
--

CREATE TABLE `diachiip` (
  `maDCIP` int(11) NOT NULL,
  `tenThietBi` varchar(255) NOT NULL,
  `diaChiIP` varchar(45) NOT NULL,
  `trangThai` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `diachiip`
--

INSERT INTO `diachiip` (`maDCIP`, `tenThietBi`, `diaChiIP`, `trangThai`, `created_at`, `updated_at`) VALUES
(1, 'Wifi Văn phòng - aut', '2.173.86.71', 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(2, 'Wifi Bảo vệ - enim', '68.97.111.193', 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(3, 'Wifi Sân banh - in', '61.72.132.248', 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(4, 'Wifi Văn phòng - temporibus', '38.3.100.24', 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(5, 'Wifi Bảo vệ - reprehenderit', '38.192.114.118', 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(6, 'Wifi Văn phòng - dolor', '156.175.205.32', 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(7, 'Wifi Công ty 01 - ut', '120.37.167.48', 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diachiip_lichlamviec`
--

CREATE TABLE `diachiip_lichlamviec` (
  `maDCIP` int(11) NOT NULL,
  `maLLV` int(11) NOT NULL,
  `trangThai` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `diachiip_lichlamviec`
--

INSERT INTO `diachiip_lichlamviec` (`maDCIP`, `maLLV`, `trangThai`, `created_at`, `updated_at`) VALUES
(1, 6, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(1, 10, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(2, 2, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(2, 6, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(2, 7, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(2, 9, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(4, 3, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(4, 9, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(4, 10, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(5, 4, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(5, 5, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(6, 1, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(7, 8, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diadiem`
--

CREATE TABLE `diadiem` (
  `maDD` int(11) NOT NULL,
  `tenDiaDiem` varchar(255) NOT NULL,
  `viDo` decimal(10,7) NOT NULL,
  `kinhDo` decimal(10,7) NOT NULL,
  `banKinh` int(11) NOT NULL,
  `trangThai` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `diadiem`
--

INSERT INTO `diadiem` (`maDD`, `tenDiaDiem`, `viDo`, `kinhDo`, `banKinh`, `trangThai`, `created_at`, `updated_at`) VALUES
(1, 'shire Schneider', 14.6101020, 106.1832320, 250, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(2, 'furt Kassulke', 16.7928470, 103.6187990, 533, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(3, 'side Luettgen', 22.3667130, 107.9401900, 819, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(4, 'town Abernathy', 14.9498580, 107.1519920, 488, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diadiem_lichlamviec`
--

CREATE TABLE `diadiem_lichlamviec` (
  `maDD` int(11) NOT NULL,
  `maLLV` int(11) NOT NULL,
  `trangThai` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `diadiem_lichlamviec`
--

INSERT INTO `diadiem_lichlamviec` (`maDD`, `maLLV`, `trangThai`, `created_at`, `updated_at`) VALUES
(1, 2, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(1, 4, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(1, 6, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(1, 10, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(2, 3, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(2, 5, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(2, 7, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(2, 9, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(3, 1, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(4, 1, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(4, 3, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(4, 5, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(4, 6, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(4, 8, 0, '2025-04-09 02:07:38', '2025-04-09 02:07:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hopthoai`
--

CREATE TABLE `hopthoai` (
  `maHT` int(11) NOT NULL,
  `tieuDe` varchar(255) NOT NULL,
  `noiDung` text NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `soLanHienThi` int(11) NOT NULL DEFAULT 0,
  `tgBatDau` datetime DEFAULT NULL,
  `tgKetThuc` datetime DEFAULT NULL,
  `iconHienThi` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `hopthoai`
--

INSERT INTO `hopthoai` (`maHT`, `tieuDe`, `noiDung`, `url`, `soLanHienThi`, `tgBatDau`, `tgKetThuc`, `iconHienThi`, `created_at`, `updated_at`) VALUES
(1, 'Alias et sed earum cumque doloremque eligendi.', 'Amet illum sed dolorum quo. Non dolores nisi illum voluptatem et autem aut. Perferendis assumenda aliquam eos. Officia similique molestiae qui omnis non.', NULL, 40, '2025-04-01 11:06:20', '2025-04-28 03:47:37', 'icons/default.png', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(2, 'Nobis est magnam et excepturi esse.', 'Ullam eos ex ullam cum ab ullam odit eos. Reprehenderit quia nam veniam eum est eos facere et. Aliquid officiis quas asperiores. Rerum sunt accusantium est occaecati in.', 'http://www.orn.com/suscipit-odit-rerum-blanditiis-rerum-et', 9, '2025-03-25 09:15:44', '2025-04-12 09:21:46', 'icons/default.png', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(3, 'Libero ea ratione amet aut hic sint.', 'Voluptatibus facilis vitae dignissimos quasi ex iusto veniam. Ex commodi saepe et quos. Quidem qui et voluptas delectus quia minus. Animi qui sit voluptas aspernatur. Et possimus sapiente nisi et iure dignissimos placeat.', NULL, 31, '2025-03-11 18:49:49', '2025-04-27 09:13:22', 'icons/default.png', '2025-04-09 02:07:35', '2025-04-09 02:07:35');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lichlamviec`
--

CREATE TABLE `lichlamviec` (
  `maLLV` int(11) NOT NULL,
  `tenCa` varchar(50) NOT NULL,
  `ngayLamViec` date NOT NULL,
  `tgBatDau` time NOT NULL,
  `tgKetThuc` time NOT NULL,
  `tgBatDauNghi` time DEFAULT NULL,
  `tgKetThucNghi` time DEFAULT NULL,
  `tgCheckInSom` time DEFAULT NULL,
  `tgCheckOutMuon` time DEFAULT NULL,
  `heSoLuong` decimal(5,2) NOT NULL DEFAULT 1.00,
  `tienThuong` decimal(10,2) NOT NULL DEFAULT 0.00,
  `maNV` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `lichlamviec`
--

INSERT INTO `lichlamviec` (`maLLV`, `tenCa`, `ngayLamViec`, `tgBatDau`, `tgKetThuc`, `tgBatDauNghi`, `tgKetThucNghi`, `tgCheckInSom`, `tgCheckOutMuon`, `heSoLuong`, `tienThuong`, `maNV`, `created_at`, `updated_at`) VALUES
(1, 'Ca Chiều', '2020-05-17', '09:18:00', '17:49:00', '13:17:00', '05:54:00', '16:57:00', '16:25:00', 1.61, 665.98, 5, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(2, 'Ca Sáng', '2007-05-26', '10:14:00', '15:55:00', '23:00:00', '14:16:00', '04:12:00', '23:58:00', 2.92, 644.21, 8, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(3, 'Ca Sáng', '1989-11-30', '21:51:00', '01:47:00', '09:39:00', '12:52:00', '07:31:00', '08:02:00', 1.34, 745.63, 7, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(4, 'Ca Đêm', '1990-01-28', '06:25:00', '21:10:00', '09:23:00', '09:31:00', '07:41:00', '22:43:00', 2.94, 292.50, 6, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(5, 'Ca Chiều', '1994-07-27', '04:06:00', '06:24:00', '21:52:00', '02:44:00', '19:21:00', '06:12:00', 2.11, 235.44, 3, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(6, 'Ca Đêm', '2005-11-24', '02:50:00', '15:00:00', '13:58:00', '12:24:00', '15:43:00', '14:45:00', 1.55, 602.50, 9, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(7, 'Ca Chiều', '2011-01-01', '00:29:00', '05:19:00', '08:46:00', '04:30:00', '18:28:00', '16:27:00', 1.59, 214.47, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(8, 'Ca Đêm', '1971-07-29', '23:45:00', '22:57:00', '16:21:00', '01:01:00', '05:05:00', '20:36:00', 1.95, 408.90, 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(9, 'Ca Đêm', '1986-11-13', '09:44:00', '02:35:00', '16:33:00', '16:32:00', '10:46:00', '01:03:00', 1.69, 256.71, 7, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(10, 'Ca Đêm', '2016-09-29', '06:47:00', '18:54:00', '04:50:00', '21:27:00', '03:01:00', '22:12:00', 2.25, 660.07, 7, '2025-04-09 02:07:38', '2025-04-09 02:07:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `luong`
--

CREATE TABLE `luong` (
  `maLuong` int(11) NOT NULL,
  `kieuLuong` enum('Lương giờ có trừ trễ','Lương giờ không trừ trễ','Lương giờ làm bao nhiêu tính bấy nhiêu','Lương tháng có trừ trễ','Lương tháng không trừ trễ','Lương tháng làm bao nhiêu tính bấy nhiêu') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `luong`
--

INSERT INTO `luong` (`maLuong`, `kieuLuong`, `created_at`, `updated_at`) VALUES
(1, 'Lương giờ có trừ trễ', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(2, 'Lương giờ không trừ trễ', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(3, 'Lương giờ làm bao nhiêu tính bấy nhiêu', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(4, 'Lương tháng có trừ trễ', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(5, 'Lương tháng không trừ trễ', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(6, 'Lương tháng làm bao nhiêu tính bấy nhiêu', '2025-04-09 02:07:35', '2025-04-09 02:07:35');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(35, '0001_01_01_000001_create_cache_table', 1),
(36, '01_taikhoan', 1),
(37, '02_luong', 1),
(38, '03_nhanvien', 1),
(39, '2025_02_22_065611_thongbao_table', 1),
(40, '2025_02_22_071741_tailieu_table', 1),
(41, '2025_02_22_073131_hopthoai_table', 1),
(42, '2025_02_23_085619_create_calam_table', 1),
(43, '2025_02_23_115415_create_chi_tiet_ca_lams_table', 1),
(44, '2025_02_23_131355_create_sessions_table', 1),
(45, '2025_03_04_151446_create_ngay_les_table', 1),
(46, '2025_03_10_154024_04_thanhtoan', 1),
(47, '2025_03_25_041708_create_lich_lam_viecs_table', 1),
(48, '2025_04_09_053340_bangcong_table', 1),
(49, '2025_04_09_060519_diachiip_table', 1),
(50, '2025_04_09_072256_diachiip_lichlamviec_table', 1),
(51, '2025_04_09_083417_diadiem_table', 1),
(52, '2025_04_09_083418_diadiem_lichlamviec_table', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ngayle`
--

CREATE TABLE `ngayle` (
  `maNL` int(11) NOT NULL,
  `tieuDe` varchar(255) NOT NULL,
  `tgBatDau` datetime NOT NULL,
  `tgKetThuc` datetime NOT NULL,
  `mauSac` varchar(255) NOT NULL DEFAULT '#FF0000',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `ngayle`
--

INSERT INTO `ngayle` (`maNL`, `tieuDe`, `tgBatDau`, `tgKetThuc`, `mauSac`, `created_at`, `updated_at`) VALUES
(1, 'Animi corrupti ut dolores eos.', '2025-04-11 03:38:44', '2025-04-12 03:38:44', '#c2a682', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(2, 'Assumenda est sapiente recusandae.', '2025-05-17 05:53:47', '2025-05-18 05:53:47', '#be65a8', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(3, 'Quia iusto modi sunt.', '2025-06-10 16:56:29', '2025-06-11 16:56:29', '#5bed73', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(4, 'Dolorum officiis quis modi sint.', '2025-11-14 20:18:45', '2025-11-15 20:18:45', '#4d89a1', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(5, 'Molestias quis officiis rerum sequi.', '2025-09-09 22:16:42', '2025-09-10 22:16:42', '#35d49e', '2025-04-09 02:07:35', '2025-04-09 02:07:35');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

CREATE TABLE `nhanvien` (
  `maNV` int(11) NOT NULL,
  `hoTen` varchar(50) DEFAULT NULL,
  `chucDanh` varchar(255) DEFAULT NULL,
  `soDienThoai` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `gioiTinh` enum('Nam','Nữ','Khác') DEFAULT NULL,
  `ngayVaoLam` date DEFAULT NULL,
  `tienLuong` decimal(15,2) DEFAULT NULL,
  `ngaySinh` date DEFAULT NULL,
  `trangThai` tinyint(1) NOT NULL,
  `maTK` int(11) NOT NULL,
  `maLuong` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`maNV`, `hoTen`, `chucDanh`, `soDienThoai`, `email`, `gioiTinh`, `ngayVaoLam`, `tienLuong`, `ngaySinh`, `trangThai`, `maTK`, `maLuong`, `created_at`, `updated_at`) VALUES
(1, 'Marge Kub', 'Chemistry Teacher', '(272) 428-6736', 'estiedemann@example.com', 'Nữ', '2025-04-09', 37276435.53, NULL, 1, 1, 3, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(2, 'Roxane Casper', 'Veterinary Technician', '520-210-5806', 'electa.upton@example.net', 'Khác', '2025-04-09', 23233175.95, '2017-10-15', 0, 2, 6, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(3, 'Prof. Virgil Armstrong', 'Night Security Guard', '+1.731.971.8950', 'muller.cortney@example.net', 'Nam', '2025-04-09', 39449126.29, NULL, 0, 3, 5, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(4, 'Faustino Casper DVM', 'Social Media Marketing Manager', '1-973-204-0714', 'gmitchell@example.com', 'Nữ', '2025-04-09', 27210158.14, NULL, 1, 4, 6, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(5, 'Kirk King', 'Plate Finisher', '269.804.4086', 'gunnar.schmidt@example.org', 'Khác', '2025-04-09', 5589245.47, NULL, 0, 5, 6, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(6, 'Kiana Beer Sr.', 'Manager of Food Preparation', '(662) 255-7672', 'mdavis@example.net', 'Khác', '2025-04-09', 48247662.36, NULL, 0, 6, 2, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(7, 'Casey Kovacek', 'Credit Authorizer', '385.526.2324', 'rgorczany@example.org', 'Nam', '2025-04-09', 8119348.27, NULL, 0, 7, 6, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(8, 'Dr. Devonte Wilderman', 'Highway Maintenance Worker', '+13206043471', 'llynch@example.org', 'Nam', '2025-04-09', 41962792.87, NULL, 0, 8, 1, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(9, 'Clinton Goyette', 'Talent Acquisition Manager', '469-443-4513', 'ileffler@example.com', 'Nữ', '2025-04-09', 6609566.39, '2021-07-17', 1, 9, 3, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(10, 'Kurt Macejkovic', 'Segmental Paver', '743-995-8271', 'emely55@example.com', 'Khác', '2025-04-09', 32045727.30, NULL, 0, 10, 1, '2025-04-09 02:07:37', '2025-04-09 02:07:37');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `maTK` int(11) NOT NULL,
  `tenTaiKhoan` varchar(50) NOT NULL,
  `matKhau` varchar(100) NOT NULL,
  `quyenHan` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`maTK`, `tenTaiKhoan`, `matKhau`, `quyenHan`, `created_at`, `updated_at`) VALUES
(1, 'bruen.terry', '$2y$12$JhNtZPhh9U9JabMDWqKDyuxXhTa3ZRSrpXoCR0HtPl.BotHeLRf7m', 'admin', '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(2, 'frida.marquardt', '$2y$12$X15Pp9FeMbNL4jHQTNSnaOlWvCVS68ULrurser5iTr69ORNROtsAC', 'user', '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(3, 'iwilliamson', '$2y$12$TUOoaJc/1ZEhF.3GAfQxFOZ5/mnogkdRAeAK85lEZt/jb2xWz4khO', 'user', '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(4, 'parker.martina', '$2y$12$9XiRCH7jDGl.wsVXzy83h.mtWfXhpgX3EI5XKFqcevRolrrJGHjSq', 'admin', '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(5, 'elinor.hauck', '$2y$12$toITJOsygWtl8ctSgFuPQOEItkjJlebYvBnMSWzcsB47mNoLysjkq', 'admin', '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(6, 'effie.boyle', '$2y$12$9.qzrQF/JkYuEfRaiJ1/WOhGx2UT.p4kkAH.VFo6Qw2ItEpIHFI6u', 'admin', '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(7, 'cicero.langosh', '$2y$12$rXysrz9smEkyAd9nrPXvAefjmj7OpCkwWrPuSscBUcJbb1HnWArRq', 'user', '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(8, 'armstrong.allison', '$2y$12$2SNVR2e4nk3K.8g0XkaABepcOx8NiJ.4PoeS0iskKEBmniYAx9xnS', 'user', '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(9, 'beth51', '$2y$12$Hv1QQnEN6K5RW65Uv/RLVuNWM758h2pjQiLJcfZ4e1eEOtWfRVnDm', 'user', '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(10, 'lou.kihn', '$2y$12$TXOc5bO72f8bO/G1keugIu9BCdi0pCln9MyBJ16JjgdV0pbktGS6u', 'user', '2025-04-09 02:07:37', '2025-04-09 02:07:37');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tailieu`
--

CREATE TABLE `tailieu` (
  `maTL` int(11) NOT NULL,
  `tieuDe` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `tgBatDau` datetime NOT NULL,
  `tgKetThuc` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `tailieu`
--

INSERT INTO `tailieu` (`maTL`, `tieuDe`, `url`, `tgBatDau`, `tgKetThuc`, `created_at`, `updated_at`) VALUES
(1, 'Id corporis doloribus et aut doloribus consectetur.', 'https://anderson.com/quis-nulla-perferendis-sequi-saepe.html', '2025-04-09 09:07:35', '2025-04-18 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(2, 'Consectetur rerum voluptatem architecto tempora.', 'http://ernser.com/', '2025-04-09 09:07:35', '2025-04-12 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(3, 'Officia voluptate accusamus incidunt dolor qui eos fugiat.', 'https://aufderhar.com/ut-omnis-in-quis-rerum.html', '2025-04-09 09:07:35', '2025-04-11 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(4, 'Commodi iusto rerum ut blanditiis.', 'http://www.erdman.biz/', '2025-04-09 09:07:35', '2025-04-14 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(5, 'Amet dicta et quia minima numquam.', 'http://lemke.info/libero-molestiae-impedit-quis-modi', '2025-04-09 09:07:35', '2025-04-16 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(6, 'Et facere deleniti dolore dolores omnis quia repudiandae voluptatem.', 'http://mayert.com/provident-atque-quidem-consequatur-officiis', '2025-04-09 09:07:35', '2025-04-17 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(7, 'Et ullam enim eum et placeat harum placeat vitae.', 'http://beahan.net/', '2025-04-09 09:07:35', '2025-04-13 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(8, 'Vitae possimus est debitis sunt.', 'http://www.bednar.biz/est-sed-et-odit-asperiores-consequatur', '2025-04-09 09:07:35', '2025-04-10 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(9, 'Delectus quidem quo mollitia velit iste ipsum.', 'https://www.willms.com/molestiae-quo-ut-nemo-sit-est-recusandae', '2025-04-09 09:07:35', '2025-04-11 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(10, 'Sunt ex doloremque perspiciatis facere sequi architecto.', 'https://krajcik.info/et-molestias-hic-tenetur.html', '2025-04-09 09:07:35', '2025-04-15 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thanhtoan`
--

CREATE TABLE `thanhtoan` (
  `maTT` int(11) NOT NULL,
  `tenDVhoacNH` varchar(255) NOT NULL,
  `soDThoacSTK` varchar(255) NOT NULL,
  `tenChuTaiKhoan` varchar(255) NOT NULL,
  `hinhAnh` varchar(255) DEFAULT NULL,
  `maNV` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `thanhtoan`
--

INSERT INTO `thanhtoan` (`maTT`, `tenDVhoacNH`, `soDThoacSTK`, `tenChuTaiKhoan`, `hinhAnh`, `maNV`, `created_at`, `updated_at`) VALUES
(1, 'Techcombank', '4366843763', 'Dr. Antonio Schroeder', 'https://via.placeholder.com/200x200.png/0011aa?text=finance+QR+Code+eum', 1, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(2, 'Techcombank', '1932864772', 'Kane Schmidt', 'https://via.placeholder.com/200x200.png/00ccff?text=finance+QR+Code+nisi', 1, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(3, 'ZaloPay', '2187478517', 'Jonatan Parker', 'https://via.placeholder.com/200x200.png/000055?text=finance+QR+Code+omnis', 2, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(4, 'Vietcombank', '5479430641', 'Mrs. Paula Windler Jr.', 'https://via.placeholder.com/200x200.png/00ffdd?text=finance+QR+Code+est', 2, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(5, 'Vietcombank', '2073465142', 'Maudie Keebler', 'https://via.placeholder.com/200x200.png/00ff22?text=finance+QR+Code+eos', 3, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(6, 'Momo', '4964239886', 'Santiago Herzog', 'https://via.placeholder.com/200x200.png/006699?text=finance+QR+Code+et', 3, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(7, 'ZaloPay', '7338028919', 'Demarco Bradtke', 'https://via.placeholder.com/200x200.png/0000dd?text=finance+QR+Code+blanditiis', 4, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(8, 'Vietcombank', '4553031812', 'Dr. Gus Leffler', 'https://via.placeholder.com/200x200.png/00cc99?text=finance+QR+Code+illum', 5, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(9, 'ZaloPay', '3842731952', 'Ms. Aida Ruecker', 'https://via.placeholder.com/200x200.png/0055ee?text=finance+QR+Code+illum', 5, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(10, 'ZaloPay', '5024934523', 'Lon Mosciski Sr.', 'https://via.placeholder.com/200x200.png/0099aa?text=finance+QR+Code+voluptas', 6, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(11, 'BIDV', '9714772522', 'Dr. Sean Legros', 'https://via.placeholder.com/200x200.png/005599?text=finance+QR+Code+delectus', 6, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(12, 'Momo', '9974582809', 'Lela Jacobson', 'https://via.placeholder.com/200x200.png/009900?text=finance+QR+Code+in', 7, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(13, 'ZaloPay', '3913884112', 'Jamar Cremin', 'https://via.placeholder.com/200x200.png/00bbcc?text=finance+QR+Code+et', 7, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(14, 'Techcombank', '3083108903', 'Dr. Domingo Turcotte IV', 'https://via.placeholder.com/200x200.png/00ccee?text=finance+QR+Code+et', 8, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(15, 'Momo', '0216882311', 'Dr. Marcellus Bauch IV', 'https://via.placeholder.com/200x200.png/009999?text=finance+QR+Code+veritatis', 8, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(16, 'Momo', '5551781493', 'Cara Herzog', 'https://via.placeholder.com/200x200.png/004499?text=finance+QR+Code+aut', 8, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(17, 'Techcombank', '4995481497', 'Magnolia Miller', 'https://via.placeholder.com/200x200.png/00ffdd?text=finance+QR+Code+molestias', 9, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(18, 'ZaloPay', '6943241794', 'Esmeralda Kiehn', 'https://via.placeholder.com/200x200.png/002299?text=finance+QR+Code+rem', 9, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(19, 'Momo', '2662212507', 'Dr. Zion Roberts I', 'https://via.placeholder.com/200x200.png/003344?text=finance+QR+Code+est', 9, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(20, 'Techcombank', '5248786202', 'Prof. Giles Shanahan', 'https://via.placeholder.com/200x200.png/009966?text=finance+QR+Code+nulla', 10, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(21, 'Vietcombank', '4231660197', 'Declan Bauch', 'https://via.placeholder.com/200x200.png/005555?text=finance+QR+Code+corporis', 10, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(22, 'Techcombank', '3836321562', 'Brisa Brown', 'https://via.placeholder.com/200x200.png/00aacc?text=finance+QR+Code+laborum', 10, '2025-04-09 02:07:37', '2025-04-09 02:07:37'),
(23, 'Vietcombank', '6987674994', 'Effie Howell Sr.', 'https://via.placeholder.com/200x200.png/00cc88?text=finance+QR+Code+et', 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(24, 'Momo', '8080856472', 'Jennie Ebert', 'https://via.placeholder.com/200x200.png/00dd99?text=finance+QR+Code+aliquid', 5, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(25, 'Momo', '5931744169', 'Mr. Moses Moore', 'https://via.placeholder.com/200x200.png/0099cc?text=finance+QR+Code+vel', 9, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(26, 'BIDV', '1541526114', 'Dr. Heloise Wiegand III', 'https://via.placeholder.com/200x200.png/00aa11?text=finance+QR+Code+voluptatibus', 2, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(27, 'Techcombank', '6238434960', 'Naomi White', 'https://via.placeholder.com/200x200.png/009988?text=finance+QR+Code+ipsam', 8, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(28, 'ZaloPay', '2068227081', 'Prof. Alfredo Sanford DVM', 'https://via.placeholder.com/200x200.png/0055dd?text=finance+QR+Code+quasi', 6, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(29, 'Vietcombank', '1299753217', 'Edison Berge', 'https://via.placeholder.com/200x200.png/0088bb?text=finance+QR+Code+eum', 7, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(30, 'Momo', '0738016820', 'Henry Kshlerin', 'https://via.placeholder.com/200x200.png/006699?text=finance+QR+Code+nihil', 8, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(31, 'Techcombank', '7746820082', 'Pascale Beer', 'https://via.placeholder.com/200x200.png/009977?text=finance+QR+Code+accusantium', 8, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(32, 'Momo', '5143182850', 'Jeff Braun', 'https://via.placeholder.com/200x200.png/009966?text=finance+QR+Code+tempore', 6, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(33, 'ZaloPay', '1378970148', 'Clementine Friesen', 'https://via.placeholder.com/200x200.png/0022cc?text=finance+QR+Code+impedit', 6, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(34, 'Vietcombank', '0913966846', 'Chadrick Dickinson', 'https://via.placeholder.com/200x200.png/00aadd?text=finance+QR+Code+voluptates', 10, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(35, 'BIDV', '0569748539', 'Ms. Celestine McKenzie IV', 'https://via.placeholder.com/200x200.png/00ddff?text=finance+QR+Code+porro', 7, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(36, 'Vietcombank', '8313601269', 'Dr. Clay Windler Sr.', 'https://via.placeholder.com/200x200.png/0033bb?text=finance+QR+Code+voluptatem', 2, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(37, 'BIDV', '7052133589', 'Ebba Kub', 'https://via.placeholder.com/200x200.png/00dd66?text=finance+QR+Code+hic', 4, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(38, 'ZaloPay', '8097312367', 'Griffin Rath', 'https://via.placeholder.com/200x200.png/001100?text=finance+QR+Code+quam', 6, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(39, 'BIDV', '4394058868', 'Prof. Barrett Hintz', 'https://via.placeholder.com/200x200.png/005588?text=finance+QR+Code+est', 8, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(40, 'Momo', '6508901588', 'Ola Beatty', 'https://via.placeholder.com/200x200.png/0011dd?text=finance+QR+Code+cum', 2, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(41, 'Techcombank', '0314302521', 'Prof. Sammy Stiedemann IV', 'https://via.placeholder.com/200x200.png/002244?text=finance+QR+Code+earum', 5, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(42, 'Momo', '7179017309', 'Freda Tromp V', 'https://via.placeholder.com/200x200.png/008800?text=finance+QR+Code+saepe', 2, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(43, 'Techcombank', '4282997857', 'Prof. Antonio Quitzon I', 'https://via.placeholder.com/200x200.png/00ff99?text=finance+QR+Code+autem', 10, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(44, 'Momo', '3149328540', 'Ivory Abernathy', 'https://via.placeholder.com/200x200.png/0022ee?text=finance+QR+Code+dolorem', 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(45, 'BIDV', '8291016424', 'Nannie Von', 'https://via.placeholder.com/200x200.png/001199?text=finance+QR+Code+id', 5, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(46, 'ZaloPay', '7808146930', 'Prof. Brandon Ullrich', 'https://via.placeholder.com/200x200.png/0077ff?text=finance+QR+Code+mollitia', 2, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(47, 'Techcombank', '0413585828', 'Garland Deckow', 'https://via.placeholder.com/200x200.png/003355?text=finance+QR+Code+qui', 7, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(48, 'Momo', '2659367904', 'Mr. Wiley Breitenberg DVM', 'https://via.placeholder.com/200x200.png/0088dd?text=finance+QR+Code+rerum', 7, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(49, 'Techcombank', '9864330442', 'Lilly Murphy', 'https://via.placeholder.com/200x200.png/008855?text=finance+QR+Code+enim', 1, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(50, 'ZaloPay', '0406525468', 'Reginald Tromp', 'https://via.placeholder.com/200x200.png/007766?text=finance+QR+Code+deleniti', 4, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(51, 'ZaloPay', '6270099650', 'Pierre Pouros', 'https://via.placeholder.com/200x200.png/002233?text=finance+QR+Code+accusantium', 4, '2025-04-09 02:07:38', '2025-04-09 02:07:38'),
(52, 'Techcombank', '8126333798', 'Margarette Cummerata', 'https://via.placeholder.com/200x200.png/00aa22?text=finance+QR+Code+harum', 2, '2025-04-09 02:07:38', '2025-04-09 02:07:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thongbao`
--

CREATE TABLE `thongbao` (
  `maTB` int(11) NOT NULL,
  `tieuDe` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `tgBatDau` datetime NOT NULL,
  `tgKetThuc` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `thongbao`
--

INSERT INTO `thongbao` (`maTB`, `tieuDe`, `url`, `tgBatDau`, `tgKetThuc`, `created_at`, `updated_at`) VALUES
(1, 'Unde expedita repudiandae sint sint nemo fuga quia dolorum.', 'http://waters.com/in-eum-assumenda-deleniti', '2025-04-09 09:07:35', '2025-04-17 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(2, 'Cupiditate accusamus autem ex quia excepturi.', 'https://www.kling.com/quia-quibusdam-veritatis-totam-nesciunt-expedita-sint-voluptatum', '2025-04-09 09:07:35', '2025-04-17 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(3, 'Suscipit provident reiciendis cupiditate blanditiis id.', 'http://kling.org/ab-magnam-in-nisi-sit-itaque-molestiae-consectetur-eos.html', '2025-04-09 09:07:35', '2025-04-15 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(4, 'Sapiente distinctio itaque sunt ipsam molestias aliquam.', 'http://www.thiel.com/doloremque-molestiae-id-saepe-vel-et-voluptatem', '2025-04-09 09:07:35', '2025-04-10 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(5, 'Reiciendis quos aut eligendi.', 'http://www.pacocha.com/vel-et-praesentium-voluptate-hic-maiores-velit-consequatur.html', '2025-04-09 09:07:35', '2025-04-13 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(6, 'Recusandae accusantium labore quia quo nisi totam ea corrupti.', 'http://funk.com/reprehenderit-totam-laborum-facere-nemo', '2025-04-09 09:07:35', '2025-04-14 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(7, 'Quaerat autem velit minima dolores.', 'http://kerluke.com/', '2025-04-09 09:07:35', '2025-04-17 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(8, 'Nemo earum amet velit dolore autem ut placeat.', 'http://reilly.net/quia-consequatur-expedita-beatae-sint-totam', '2025-04-09 09:07:35', '2025-04-13 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(9, 'Eum deserunt odit beatae id quod voluptatem quia nobis.', 'http://leffler.biz/', '2025-04-09 09:07:35', '2025-04-11 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35'),
(10, 'Ex qui libero incidunt quia recusandae placeat vel.', 'http://www.kautzer.com/aut-eos-ea-occaecati-repudiandae-deleniti', '2025-04-09 09:07:35', '2025-04-12 09:07:35', '2025-04-09 02:07:35', '2025-04-09 02:07:35');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bangcong`
--
ALTER TABLE `bangcong`
  ADD PRIMARY KEY (`maBC`),
  ADD UNIQUE KEY `bangcong_mallv_unique` (`maLLV`);

--
-- Chỉ mục cho bảng `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `calam`
--
ALTER TABLE `calam`
  ADD PRIMARY KEY (`maCL`);

--
-- Chỉ mục cho bảng `chitietcalam`
--
ALTER TABLE `chitietcalam`
  ADD PRIMARY KEY (`maCTCL`),
  ADD KEY `chitietcalam_macl_foreign` (`maCL`);

--
-- Chỉ mục cho bảng `diachiip`
--
ALTER TABLE `diachiip`
  ADD PRIMARY KEY (`maDCIP`);

--
-- Chỉ mục cho bảng `diachiip_lichlamviec`
--
ALTER TABLE `diachiip_lichlamviec`
  ADD PRIMARY KEY (`maDCIP`,`maLLV`),
  ADD KEY `diachiip_lichlamviec_mallv_foreign` (`maLLV`);

--
-- Chỉ mục cho bảng `diadiem`
--
ALTER TABLE `diadiem`
  ADD PRIMARY KEY (`maDD`);

--
-- Chỉ mục cho bảng `diadiem_lichlamviec`
--
ALTER TABLE `diadiem_lichlamviec`
  ADD PRIMARY KEY (`maDD`,`maLLV`),
  ADD KEY `diadiem_lichlamviec_mallv_foreign` (`maLLV`);

--
-- Chỉ mục cho bảng `hopthoai`
--
ALTER TABLE `hopthoai`
  ADD PRIMARY KEY (`maHT`);

--
-- Chỉ mục cho bảng `lichlamviec`
--
ALTER TABLE `lichlamviec`
  ADD PRIMARY KEY (`maLLV`),
  ADD KEY `lichlamviec_manv_foreign` (`maNV`);

--
-- Chỉ mục cho bảng `luong`
--
ALTER TABLE `luong`
  ADD PRIMARY KEY (`maLuong`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `ngayle`
--
ALTER TABLE `ngayle`
  ADD PRIMARY KEY (`maNL`);

--
-- Chỉ mục cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`maNV`),
  ADD UNIQUE KEY `nhanvien_matk_unique` (`maTK`),
  ADD UNIQUE KEY `nhanvien_sodienthoai_unique` (`soDienThoai`),
  ADD UNIQUE KEY `nhanvien_email_unique` (`email`),
  ADD KEY `nhanvien_maluong_foreign` (`maLuong`);

--
-- Chỉ mục cho bảng `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`maTK`),
  ADD UNIQUE KEY `taikhoan_tentaikhoan_unique` (`tenTaiKhoan`);

--
-- Chỉ mục cho bảng `tailieu`
--
ALTER TABLE `tailieu`
  ADD PRIMARY KEY (`maTL`);

--
-- Chỉ mục cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD PRIMARY KEY (`maTT`),
  ADD KEY `thanhtoan_manv_foreign` (`maNV`);

--
-- Chỉ mục cho bảng `thongbao`
--
ALTER TABLE `thongbao`
  ADD PRIMARY KEY (`maTB`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bangcong`
--
ALTER TABLE `bangcong`
  MODIFY `maBC` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `calam`
--
ALTER TABLE `calam`
  MODIFY `maCL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `chitietcalam`
--
ALTER TABLE `chitietcalam`
  MODIFY `maCTCL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `diachiip`
--
ALTER TABLE `diachiip`
  MODIFY `maDCIP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `diadiem`
--
ALTER TABLE `diadiem`
  MODIFY `maDD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `hopthoai`
--
ALTER TABLE `hopthoai`
  MODIFY `maHT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `lichlamviec`
--
ALTER TABLE `lichlamviec`
  MODIFY `maLLV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `luong`
--
ALTER TABLE `luong`
  MODIFY `maLuong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT cho bảng `ngayle`
--
ALTER TABLE `ngayle`
  MODIFY `maNL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `maNV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `maTK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `tailieu`
--
ALTER TABLE `tailieu`
  MODIFY `maTL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  MODIFY `maTT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT cho bảng `thongbao`
--
ALTER TABLE `thongbao`
  MODIFY `maTB` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bangcong`
--
ALTER TABLE `bangcong`
  ADD CONSTRAINT `bangcong_mallv_foreign` FOREIGN KEY (`maLLV`) REFERENCES `lichlamviec` (`maLLV`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `chitietcalam`
--
ALTER TABLE `chitietcalam`
  ADD CONSTRAINT `chitietcalam_macl_foreign` FOREIGN KEY (`maCL`) REFERENCES `calam` (`maCL`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `diachiip_lichlamviec`
--
ALTER TABLE `diachiip_lichlamviec`
  ADD CONSTRAINT `diachiip_lichlamviec_madcip_foreign` FOREIGN KEY (`maDCIP`) REFERENCES `diachiip` (`maDCIP`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `diachiip_lichlamviec_mallv_foreign` FOREIGN KEY (`maLLV`) REFERENCES `lichlamviec` (`maLLV`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `diadiem_lichlamviec`
--
ALTER TABLE `diadiem_lichlamviec`
  ADD CONSTRAINT `diadiem_lichlamviec_madd_foreign` FOREIGN KEY (`maDD`) REFERENCES `diadiem` (`maDD`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `diadiem_lichlamviec_mallv_foreign` FOREIGN KEY (`maLLV`) REFERENCES `lichlamviec` (`maLLV`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `lichlamviec`
--
ALTER TABLE `lichlamviec`
  ADD CONSTRAINT `lichlamviec_manv_foreign` FOREIGN KEY (`maNV`) REFERENCES `nhanvien` (`maNV`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `nhanvien_maluong_foreign` FOREIGN KEY (`maLuong`) REFERENCES `luong` (`maLuong`) ON DELETE CASCADE,
  ADD CONSTRAINT `nhanvien_matk_foreign` FOREIGN KEY (`maTK`) REFERENCES `taikhoan` (`maTK`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD CONSTRAINT `thanhtoan_manv_foreign` FOREIGN KEY (`maNV`) REFERENCES `nhanvien` (`maNV`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
