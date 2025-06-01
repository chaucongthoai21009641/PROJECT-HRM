-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th5 18, 2025 lúc 04:17 PM
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
  `tgCheckOut` time DEFAULT NULL,
  `maLLV` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
(1, 'Fulltime', 4, 6, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(2, 'Ca Thoại', 6, 2, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(3, 'Ca Phát(2)', 4, 1, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(4, 'Part-time', 1, 4, '2025-05-18 07:17:07', '2025-05-18 07:17:07');

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
(1, 2, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 1, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(2, 3, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 1, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(3, 4, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 1, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(4, 5, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 1, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(5, 6, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 1, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(6, 2, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 2, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(7, 3, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 2, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(8, 4, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 2, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(9, 3, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 3, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(10, 5, '08:00:00', '12:00:00', NULL, NULL, 1.00, 0.00, 3, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(11, 7, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 3, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(12, 2, '13:00:00', '17:00:00', NULL, NULL, 1.00, 0.00, 4, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(13, 4, '08:00:00', '12:00:00', NULL, NULL, 1.00, 0.00, 4, '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(14, 6, '08:00:00', '17:00:00', '12:00:00', '13:00:00', 1.00, 0.00, 4, '2025-05-18 07:17:07', '2025-05-18 07:17:07');

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
(1, 'Wifi Văn phòng - accusantium', '221.34.237.5', 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(2, 'Wifi Văn phòng - quo', '245.245.196.123', 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(3, 'Wifi Công ty 01 - temporibus', '102.171.219.161', 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(4, 'Wifi Bảo vệ - id', '78.29.162.1', 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(5, 'Wifi Bảo vệ - error', '21.231.197.198', 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(6, 'Wifi Công ty 01 - aliquam', '122.98.77.151', 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(7, 'Wifi Bảo vệ - mollitia', '40.229.41.9', 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10');

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
(1, 8, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(1, 10, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(2, 3, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(2, 8, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(3, 2, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(4, 5, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(4, 6, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(4, 7, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(4, 10, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(5, 6, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(6, 1, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(6, 4, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(6, 5, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(6, 7, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(7, 9, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10');

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
(1, 'borough Fay', 21.7367650, 107.4524570, 484, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(2, 'stad Bailey', 16.7833800, 108.5645290, 738, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(3, 'berg Champlin', 11.3106330, 104.1591370, 140, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(4, 'shire Nikolaus', 21.0001340, 108.0909020, 514, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10');

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
(1, 5, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(1, 7, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(2, 4, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(2, 8, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(2, 9, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(2, 10, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(3, 2, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(3, 6, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(4, 1, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(4, 2, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(4, 3, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(4, 5, 0, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(4, 7, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donphep`
--

CREATE TABLE `donphep` (
  `maDP` int(11) NOT NULL,
  `loaiNghiPhep` enum('Nghỉ phép năm','Nghỉ không lương','Nghỉ có lương','Nghỉ đột xuất','Nghỉ phép ốm','Nghỉ thai sản') NOT NULL,
  `lyDo` varchar(255) NOT NULL,
  `ngayNghi` date NOT NULL,
  `batDauNghi` time NOT NULL,
  `ketThucNghi` time NOT NULL,
  `hinhAnh` varchar(255) DEFAULT NULL,
  `trangThai` enum('Chờ duyệt','Đã duyệt','Từ chối') NOT NULL DEFAULT 'Chờ duyệt',
  `nguoiDuyet` varchar(255) DEFAULT NULL,
  `maNV` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `donphep`
--

INSERT INTO `donphep` (`maDP`, `loaiNghiPhep`, `lyDo`, `ngayNghi`, `batDauNghi`, `ketThucNghi`, `hinhAnh`, `trangThai`, `nguoiDuyet`, `maNV`, `created_at`, `updated_at`) VALUES
(1, 'Nghỉ có lương', 'Labore facere ea modi est.', '2024-04-15', '09:42:00', '09:42:00', 'https://via.placeholder.com/640x480.png/003344?text=documents+ut', 'Chờ duyệt', 'Cái Thoại', 8, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(2, 'Nghỉ phép năm', 'Alias voluptate beatae expedita ratione assumenda totam.', '2007-03-15', '11:01:00', '11:01:00', 'https://via.placeholder.com/640x480.png/001122?text=documents+velit', 'Đã duyệt', 'Cái Thoại', 8, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(3, 'Nghỉ không lương', 'Voluptatem dolores neque omnis placeat.', '1990-07-27', '07:32:00', '07:32:00', 'https://via.placeholder.com/640x480.png/00bb99?text=documents+velit', 'Đã duyệt', 'Xa Trí', 5, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(4, 'Nghỉ đột xuất', 'Illum voluptatem earum itaque dignissimos et rerum.', '2010-10-22', '19:11:00', '19:11:00', 'https://via.placeholder.com/640x480.png/00aabb?text=documents+aliquid', 'Chờ duyệt', 'Hoàng Hảo', 5, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(5, 'Nghỉ không lương', 'Aut porro harum reiciendis sunt voluptatibus impedit optio.', '2011-01-21', '11:03:00', '11:03:00', 'https://via.placeholder.com/640x480.png/009977?text=documents+ullam', 'Chờ duyệt', 'Bá An', 11, '2025-05-18 07:17:10', '2025-05-18 07:17:10');

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
(1, 'Dignissimos doloremque blanditiis alias sequi sed quos quia reiciendis.', 'Eius illum nihil molestiae et modi voluptatem quod perspiciatis. Corrupti et sit quasi molestiae animi ipsam. Aut numquam voluptatum omnis.', 'http://www.hammes.com/sequi-nisi-aspernatur-ut-omnis-veniam-saepe', 37, '2025-05-16 08:20:31', '2025-05-28 13:44:16', 'icons/default.png', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(2, 'Aut ipsam est enim eos corporis.', 'Id consectetur labore dicta. Minus voluptatem reiciendis velit molestiae impedit perspiciatis odit. Reprehenderit iste eligendi fuga cum possimus eaque et. Officia numquam et autem fuga laborum et.', 'https://www.weber.com/minus-non-nostrum-voluptas-saepe-quidem', 3, '2025-05-06 14:44:53', '2025-05-29 16:56:04', 'icons/default.png', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(3, 'Omnis aut recusandae impedit necessitatibus.', 'Illum aut quis praesentium dolores ut. Deleniti sint eius est porro et. Hic repudiandae voluptates impedit. Facere et similique hic quam nam labore eum. Sed iure labore sunt optio sit illo.', 'http://www.daugherty.com/perferendis-nam-fugit-aut-neque.html', 40, '2025-04-19 11:38:21', '2025-06-09 23:43:33', 'icons/default.png', '2025-05-18 07:17:07', '2025-05-18 07:17:07');

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
(1, 'Ca Sáng', '2003-09-22', '02:02:00', '23:04:00', '01:20:00', '07:38:00', '09:20:00', '05:37:00', 1.28, 276.74, 9, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(2, 'Ca Sáng', '2011-03-04', '03:09:00', '23:22:00', '04:34:00', '21:42:00', '16:19:00', '18:02:00', 1.15, 668.59, 9, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(3, 'Ca Đêm', '1997-03-12', '13:56:00', '11:09:00', '23:09:00', '14:42:00', '03:40:00', '04:09:00', 2.08, 240.08, 3, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(4, 'Ca Chiều', '2005-05-13', '03:52:00', '16:55:00', '05:55:00', '23:07:00', '04:35:00', '02:01:00', 1.70, 365.11, 10, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(5, 'Ca Sáng', '2011-06-12', '02:33:00', '20:03:00', '12:28:00', '10:15:00', '14:34:00', '07:01:00', 2.62, 563.34, 10, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(6, 'Ca Đêm', '1975-03-11', '05:08:00', '03:26:00', '01:18:00', '07:13:00', '20:54:00', '10:49:00', 2.46, 355.31, 2, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(7, 'Ca Đêm', '1989-08-25', '02:37:00', '02:28:00', '11:22:00', '07:14:00', '17:08:00', '23:33:00', 1.98, 914.38, 11, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(8, 'Ca Đêm', '2022-03-02', '09:03:00', '21:45:00', '02:45:00', '22:37:00', '22:57:00', '13:29:00', 1.41, 357.87, 11, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(9, 'Ca Đêm', '2015-09-19', '17:02:00', '20:40:00', '07:03:00', '10:39:00', '22:27:00', '07:50:00', 1.16, 856.82, 5, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(10, 'Ca Đêm', '2013-08-07', '14:27:00', '13:48:00', '02:57:00', '05:27:00', '02:39:00', '18:53:00', 1.39, 219.91, 10, '2025-05-18 07:17:10', '2025-05-18 07:17:10');

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
(721, '0001_01_01_000001_create_cache_table', 1),
(722, '01_taikhoan', 1),
(723, '02_create_calam_table', 1),
(724, '03_nhanvien', 1),
(725, '2025_02_22_065611_thongbao_table', 1),
(726, '2025_02_22_071741_tailieu_table', 1),
(727, '2025_02_22_073131_hopthoai_table', 1),
(728, '2025_02_23_115415_create_chi_tiet_ca_lams_table', 1),
(729, '2025_02_23_131355_create_sessions_table', 1),
(730, '2025_03_04_151446_create_ngay_les_table', 1),
(731, '2025_03_10_154024_04_thanhtoan', 1),
(732, '2025_03_25_041708_create_lich_lam_viecs_table', 1),
(733, '2025_04_09_053340_bangcong_table', 1),
(734, '2025_04_09_060519_diachiip_table', 1),
(735, '2025_04_09_072256_diachiip_lichlamviec_table', 1),
(736, '2025_04_09_083417_diadiem_table', 1),
(737, '2025_04_09_083418_diadiem_lichlamviec_table', 1),
(738, '2025_04_24_132855_ngayphep_table', 1),
(739, '2025_04_24_150928_donphep_table', 1),
(740, '2025_04_24_155117_phieuluong_table', 1);

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
(1, 'Rem veniam optio.', '2025-01-06 05:35:40', '2025-01-07 05:35:40', '#fc4509', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(2, 'Est libero et enim.', '2025-01-27 19:40:49', '2025-01-28 19:40:49', '#bb7590', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(3, 'Non expedita sapiente magni.', '2025-09-15 23:32:50', '2025-09-16 23:32:50', '#7c1d75', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(4, 'Inventore impedit ut asperiores.', '2025-11-03 22:16:33', '2025-11-04 22:16:33', '#aaa4aa', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(5, 'Fugiat deleniti earum quis.', '2025-06-27 08:58:36', '2025-06-28 08:58:36', '#f9fcdc', '2025-05-18 07:17:07', '2025-05-18 07:17:07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ngayphep`
--

CREATE TABLE `ngayphep` (
  `maNP` int(11) NOT NULL,
  `namPhep` int(11) NOT NULL,
  `soNgay` int(11) DEFAULT NULL,
  `daNghi` int(11) DEFAULT NULL,
  `conLai` int(11) DEFAULT NULL,
  `maNV` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `ngayphep`
--

INSERT INTO `ngayphep` (`maNP`, `namPhep`, `soNgay`, `daNghi`, `conLai`, `maNV`, `created_at`, `updated_at`) VALUES
(1, 2025, 11, 4, 7, 1, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(2, 2025, 6, 1, 5, 2, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(3, 2025, 7, 1, 6, 3, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(4, 2025, 9, 0, 9, 4, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(5, 2024, 8, 8, 0, 5, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(6, 2024, 10, 6, 4, 6, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(7, 2025, 6, 4, 2, 7, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(8, 2025, 11, 0, 11, 8, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(9, 2025, 7, 3, 4, 9, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(10, 2024, 9, 4, 5, 10, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(11, 2024, 11, 0, 11, 11, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(12, 2025, 9, 8, 1, 12, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(13, 2024, 9, 6, 3, 13, '2025-05-18 07:17:10', '2025-05-18 07:17:10');

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
  `ngaySinh` date DEFAULT NULL,
  `trangThai` tinyint(1) NOT NULL,
  `maTK` int(11) NOT NULL,
  `maCL` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`maNV`, `hoTen`, `chucDanh`, `soDienThoai`, `email`, `gioiTinh`, `ngayVaoLam`, `ngaySinh`, `trangThai`, `maTK`, `maCL`, `created_at`, `updated_at`) VALUES
(1, 'Lê Lập', 'Trưởng nhóm kỹ thuật', '0595172623', 'ngan46@gmail.com', 'Nữ', '2025-05-18', NULL, 0, 1, 3, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(2, 'Mạch Chung', 'Chuyên viên marketing', '0168491216', 'nhamkim@gmail.com', 'Nam', '2025-05-18', '2011-12-26', 0, 2, 4, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(3, 'Bá An', 'Kỹ sư phần mềm', '0928703166', 'trangnguyet@gmail.com', 'Nam', '2025-05-18', '1993-04-15', 0, 3, 3, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(4, 'Lại Uyên', 'Kỹ sư phần mềm', '0922079998', 'gmn@gmail.com', 'Khác', '2025-05-18', '1979-01-19', 1, 4, 4, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(5, 'Xa Trí', 'Nhân viên kế toán', '0614490594', 'san@gmail.com', 'Nữ', '2025-05-18', '1982-09-15', 0, 5, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(6, 'Lỳ Ân', 'Nhân viên kế toán', '0228109819', 'thuan91@gmail.com', 'Khác', '2025-05-18', '1974-09-03', 1, 6, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(7, 'Hoàng Hảo', 'Trưởng phòng nhân sự', '0977940944', 'hoan92@gmail.com', 'Nam', '2025-05-18', '1991-09-27', 1, 7, 4, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(8, 'Chương Cúc', 'Nhân viên kế toán', '0291843666', 'idu@gmail.com', 'Khác', '2025-05-18', NULL, 0, 8, 4, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(9, 'Hồng Công', 'Chăm sóc khách hàng', '0657002089', 'tien18@gmail.com', 'Nữ', '2025-05-18', NULL, 0, 9, 4, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(10, 'Cái Thoại', 'Chăm sóc khách hàng', '0549604953', 'tun73@gmail.com', 'Nam', '2025-05-18', NULL, 1, 10, 4, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(11, 'Sử Ánh', 'Trưởng nhóm kỹ thuật', '0649849231', 'auan@gmail.com', 'Khác', '2025-05-18', '1987-09-28', 1, 11, 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(12, 'Xa Thụy', 'Trưởng nhóm kỹ thuật', '0124296215', 'nongnghiem@gmail.com', 'Nam', '2025-05-18', NULL, 1, 12, 4, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(13, 'Sơn Thạc', 'Trưởng phòng nhân sự', '0256745558', 'chau53@gmail.com', 'Nữ', '2025-05-18', '1985-12-25', 1, 13, 3, '2025-05-18 07:17:10', '2025-05-18 07:17:10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieuluong`
--

CREATE TABLE `phieuluong` (
  `maPL` int(11) NOT NULL,
  `kieuLuong` enum('Lương giờ có trừ trễ','Lương giờ không trừ trễ','Lương giờ làm bao nhiêu tính bấy nhiêu','Lương tháng có trừ trễ','Lương tháng không trừ trễ','Lương tháng làm bao nhiêu tính bấy nhiêu') NOT NULL,
  `luongCoBan` decimal(15,2) NOT NULL DEFAULT 0.00,
  `maNV` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `phieuluong`
--

INSERT INTO `phieuluong` (`maPL`, `kieuLuong`, `luongCoBan`, `maNV`, `created_at`, `updated_at`) VALUES
(1, 'Lương tháng có trừ trễ', 6236804.00, 1, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(2, 'Lương tháng có trừ trễ', 7675181.00, 2, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(3, 'Lương giờ có trừ trễ', 9743630.00, 3, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(4, 'Lương tháng làm bao nhiêu tính bấy nhiêu', 6876966.00, 4, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(5, 'Lương giờ không trừ trễ', 7798797.00, 5, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(6, 'Lương tháng làm bao nhiêu tính bấy nhiêu', 9573175.00, 6, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(7, 'Lương giờ làm bao nhiêu tính bấy nhiêu', 9317626.00, 7, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(8, 'Lương giờ không trừ trễ', 6133509.00, 8, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(9, 'Lương tháng làm bao nhiêu tính bấy nhiêu', 9920085.00, 9, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(10, 'Lương giờ có trừ trễ', 9022856.00, 10, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(11, 'Lương tháng có trừ trễ', 5086578.00, 11, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(12, 'Lương giờ có trừ trễ', 9453931.00, 12, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(13, 'Lương tháng không trừ trễ', 5228597.00, 13, '2025-05-18 07:17:10', '2025-05-18 07:17:10');

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
(1, 'admin', '$2y$12$7.BQ5ufK2ixiXVI6liTTz./J5k40K/wbYVq1egDgLGhK6blAl3Hz6', 'admin', '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(2, '11111', '$2y$12$hAsuXtvAikTqR0N8.Zm9kesILe.42w7.GbNMf5Ui6QxvkwLbP8AkC', 'user', '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(3, 'test1', '$2y$12$f4R65eQ.TrH9cDiBlpcTVOodEj0vIo2lmxmmzREtHXJplFtVNTgyK', 'user', '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(4, 'rainh508', '$2y$12$4tOKEzBjUJjzGS0oJYxVDezAqkv9KgTx1dWRlxwVK1Tk.niWE5de2', 'user', '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(5, 'in429', '$2y$12$4KJZEfe3SnaAz15b9Yo5F.V0U4t3odwgcw/ncKlgAMeXpWgxfWNNO', 'user', '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(6, 'anga491', '$2y$12$DgZH0N0FhKFIVz1BmtTZruJkPJyuUcfa3I2zXisrxZeVpO8oGC0dq', 'user', '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(7, 'hauhng', '$2y$12$rL3EgnoteCWx0GUHk2R5L.stMritrwTn0Q1M.x0RGySAj3IhtEuK6', 'admin', '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(8, 'nhhan229', '$2y$12$vcjUlNSTRZoAcGJlSel/DO5pH4HK8/Fc1BxmVNrWz9cNQmr0RVNaa', 'admin', '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(9, 'uc969', '$2y$12$0o2oTIzu71WkeTKzPtYw5.z/SS4dThW0JkBUCUb5e.bwhvnLFOlHC', 'admin', '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(10, 'hiuc726', '$2y$12$UKMTY7v6QWMZ8YNn7Svlp.8Zj5vugAkP1guw3Sx8lN72pFYWW3n7.', 'user', '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(11, 'rangu473', '$2y$12$o3LLuy9Qy6FsbOjR2eQlP.tqg.JwAjFR4kMRmdHSD4QEZFO9FPmQi', 'admin', '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(12, 'nh573', '$2y$12$5/DMniwzs0vzw6N/cpDWz.m3MUQEOxe72fTojx1vJiPbe8gmgiPwK', 'admin', '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(13, 'nan866', '$2y$12$q2xR2uF5csup86hr/TxQSeAa4STG0qHydmQtNnhy/z6ueEECVu68a', 'user', '2025-05-18 07:17:10', '2025-05-18 07:17:10');

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
(1, 'Consequatur debitis dolorum non.', 'https://conn.org/iure-iusto-consequatur-quae-illum-dolore.html', '2025-05-18 14:17:07', '2025-05-28 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(2, 'Distinctio architecto aut quaerat id quod occaecati exercitationem.', 'http://www.nitzsche.org/', '2025-05-18 14:17:07', '2025-05-25 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(3, 'Dolores voluptate qui aut corrupti nihil qui.', 'http://ward.com/sit-temporibus-et-aspernatur-asperiores.html', '2025-05-18 14:17:07', '2025-05-22 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(4, 'Aut labore et est ut magnam.', 'http://www.raynor.com/qui-excepturi-sed-nihil-et.html', '2025-05-18 14:17:07', '2025-05-20 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(5, 'Distinctio aut et laudantium sed ad modi molestiae molestiae.', 'http://www.lakin.com/amet-beatae-inventore-incidunt-et-sit-recusandae', '2025-05-18 14:17:07', '2025-05-22 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(6, 'Laudantium voluptates ullam est cumque ab et facilis.', 'http://wilderman.org/eius-itaque-praesentium-aspernatur-omnis-illo', '2025-05-18 14:17:07', '2025-05-28 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(7, 'Quam blanditiis aut possimus omnis accusamus ut.', 'http://tillman.com/expedita-vel-sunt-exercitationem-omnis-unde', '2025-05-18 14:17:07', '2025-05-21 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(8, 'Iure quas maxime quia qui eos.', 'http://kunze.com/hic-quas-et-praesentium-est-dolorum.html', '2025-05-18 14:17:07', '2025-05-21 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(9, 'Voluptate nesciunt voluptates molestias molestiae aut aut.', 'http://keebler.com/voluptatum-dolorum-qui-et-illum', '2025-05-18 14:17:07', '2025-05-20 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(10, 'Autem nesciunt facere minus sunt.', 'http://www.conroy.net/quo-tempore-molestiae-similique-aut-quia-eius-eligendi.html', '2025-05-18 14:17:07', '2025-05-24 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thanhtoan`
--

CREATE TABLE `thanhtoan` (
  `maTT` int(11) NOT NULL,
  `tenDVhoacNH` varchar(255) NOT NULL,
  `soDThoacSTK` varchar(255) NOT NULL,
  `tenChuTaiKhoan` varchar(255) NOT NULL,
  `loaiTaiKhoan` varchar(255) NOT NULL,
  `hinhAnh` varchar(255) DEFAULT NULL,
  `maNV` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `thanhtoan`
--

INSERT INTO `thanhtoan` (`maTT`, `tenDVhoacNH`, `soDThoacSTK`, `tenChuTaiKhoan`, `loaiTaiKhoan`, `hinhAnh`, `maNV`, `created_at`, `updated_at`) VALUES
(1, 'Techcombank', '7341557261', 'Mr. Braeden Gutmann', 'VDT', 'https://via.placeholder.com/200x200.png/00bbaa?text=finance+QR+Code+et', 1, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(2, 'Vietcombank', '3466690686', 'Dr. Camden Kessler', 'VDT', 'https://via.placeholder.com/200x200.png/00aa00?text=finance+QR+Code+eum', 1, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(3, 'BIDV', '5590097065', 'Dr. Arden Jones', 'VDT', 'https://via.placeholder.com/200x200.png/00aa00?text=finance+QR+Code+beatae', 1, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(4, 'Techcombank', '5289358832', 'Pearlie Rippin', 'VDT', 'https://via.placeholder.com/200x200.png/0055dd?text=finance+QR+Code+doloremque', 2, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(5, 'ZaloPay', '3039731961', 'Monte Rath', 'NH', 'https://via.placeholder.com/200x200.png/0077bb?text=finance+QR+Code+in', 2, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(6, 'BIDV', '6561491677', 'Ariel McDermott', 'VDT', 'https://via.placeholder.com/200x200.png/006688?text=finance+QR+Code+ipsam', 2, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(7, 'Momo', '3300917902', 'Karli Feest', 'NH', 'https://via.placeholder.com/200x200.png/00ee66?text=finance+QR+Code+voluptas', 3, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(8, 'Vietcombank', '7769003822', 'Ms. Mallie Konopelski IV', 'NH', 'https://via.placeholder.com/200x200.png/000088?text=finance+QR+Code+aut', 3, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(9, 'Techcombank', '6678695439', 'Mr. Jeffry Gutmann DDS', 'NH', 'https://via.placeholder.com/200x200.png/009944?text=finance+QR+Code+iusto', 3, '2025-05-18 07:17:08', '2025-05-18 07:17:08'),
(10, 'Momo', '7013567946', 'Belle McKenzie Sr.', 'NH', 'https://via.placeholder.com/200x200.png/006644?text=finance+QR+Code+ut', 4, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(11, 'Vietcombank', '2638835400', 'Toby Brakus', 'VDT', 'https://via.placeholder.com/200x200.png/0077dd?text=finance+QR+Code+quis', 5, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(12, 'Vietcombank', '2326314860', 'Nelson Torp', 'NH', 'https://via.placeholder.com/200x200.png/00aa55?text=finance+QR+Code+rerum', 5, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(13, 'Techcombank', '5823091202', 'Christine Ward', 'VDT', 'https://via.placeholder.com/200x200.png/00ff11?text=finance+QR+Code+ipsa', 5, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(14, 'BIDV', '3359845637', 'Rod Reilly', 'VDT', 'https://via.placeholder.com/200x200.png/009900?text=finance+QR+Code+odit', 6, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(15, 'Momo', '9921437030', 'Prof. Gwendolyn Toy I', 'VDT', 'https://via.placeholder.com/200x200.png/00ddee?text=finance+QR+Code+cum', 7, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(16, 'Momo', '2666383576', 'Dr. Jennings Kuhn Jr.', 'VDT', 'https://via.placeholder.com/200x200.png/006611?text=finance+QR+Code+aut', 8, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(17, 'BIDV', '7191053805', 'Brannon McGlynn', 'VDT', 'https://via.placeholder.com/200x200.png/006633?text=finance+QR+Code+doloribus', 8, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(18, 'Momo', '4945625216', 'Hertha Thompson', 'NH', 'https://via.placeholder.com/200x200.png/007744?text=finance+QR+Code+distinctio', 8, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(19, 'Techcombank', '9743450224', 'Jovan Harvey', 'NH', 'https://via.placeholder.com/200x200.png/00ddbb?text=finance+QR+Code+ut', 9, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(20, 'BIDV', '4149958356', 'Burdette Nicolas', 'VDT', 'https://via.placeholder.com/200x200.png/009955?text=finance+QR+Code+maiores', 9, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(21, 'Momo', '1750965454', 'Deshaun Lemke', 'NH', 'https://via.placeholder.com/200x200.png/005599?text=finance+QR+Code+voluptatem', 9, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(22, 'Vietcombank', '1490287741', 'Dr. Dejuan Veum DVM', 'NH', 'https://via.placeholder.com/200x200.png/006699?text=finance+QR+Code+atque', 10, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(23, 'ZaloPay', '6707863157', 'Dr. Tobin Bauch III', 'VDT', 'https://via.placeholder.com/200x200.png/00ff11?text=finance+QR+Code+quasi', 10, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(24, 'BIDV', '0938025257', 'Mr. Keenan Bahringer', 'VDT', 'https://via.placeholder.com/200x200.png/0022dd?text=finance+QR+Code+aperiam', 11, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(25, 'Techcombank', '0181948607', 'Kendrick Kirlin', 'VDT', 'https://via.placeholder.com/200x200.png/00eeff?text=finance+QR+Code+eos', 11, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(26, 'BIDV', '3691222252', 'Prince Keeling', 'NH', 'https://via.placeholder.com/200x200.png/000077?text=finance+QR+Code+aut', 12, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(27, 'ZaloPay', '4992224802', 'Theodore Hammes', 'VDT', 'https://via.placeholder.com/200x200.png/000033?text=finance+QR+Code+officia', 13, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(28, 'Techcombank', '7779676583', 'Dr. Terrill Russel IV', 'VDT', 'https://via.placeholder.com/200x200.png/00dd99?text=finance+QR+Code+explicabo', 13, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(29, 'Techcombank', '3793587232', 'Ethan Harvey', 'NH', 'https://via.placeholder.com/200x200.png/00ee00?text=finance+QR+Code+aperiam', 7, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(30, 'Vietcombank', '9829940015', 'Maye Auer', 'NH', 'https://via.placeholder.com/200x200.png/0055ff?text=finance+QR+Code+assumenda', 7, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(31, 'ZaloPay', '4924418135', 'Adaline Tromp', 'VDT', 'https://via.placeholder.com/200x200.png/008855?text=finance+QR+Code+quia', 3, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(32, 'BIDV', '3165880305', 'Desmond Strosin IV', 'NH', 'https://via.placeholder.com/200x200.png/0022cc?text=finance+QR+Code+maxime', 12, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(33, 'Vietcombank', '0403106433', 'Dr. Maxime Treutel', 'NH', 'https://via.placeholder.com/200x200.png/003388?text=finance+QR+Code+perferendis', 7, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(34, 'ZaloPay', '6952347103', 'Prof. Fidel Kris', 'VDT', 'https://via.placeholder.com/200x200.png/006611?text=finance+QR+Code+sit', 9, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(35, 'BIDV', '0134465787', 'Mario Schaefer', 'VDT', 'https://via.placeholder.com/200x200.png/0033aa?text=finance+QR+Code+saepe', 13, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(36, 'Techcombank', '2017171385', 'Cheyenne Koepp II', 'VDT', 'https://via.placeholder.com/200x200.png/009900?text=finance+QR+Code+minus', 11, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(37, 'Momo', '2748786344', 'Dr. Wilbert Watsica V', 'VDT', 'https://via.placeholder.com/200x200.png/0011dd?text=finance+QR+Code+animi', 9, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(38, 'ZaloPay', '1235532365', 'Dr. Berry Schmitt V', 'VDT', 'https://via.placeholder.com/200x200.png/0077aa?text=finance+QR+Code+esse', 4, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(39, 'BIDV', '9878158295', 'Deshaun Muller DVM', 'NH', 'https://via.placeholder.com/200x200.png/00bb66?text=finance+QR+Code+non', 9, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(40, 'BIDV', '5067171739', 'Lennie Hartmann', 'VDT', 'https://via.placeholder.com/200x200.png/00ffaa?text=finance+QR+Code+velit', 13, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(41, 'Momo', '4398718814', 'Delpha Kling PhD', 'VDT', 'https://via.placeholder.com/200x200.png/00cc22?text=finance+QR+Code+recusandae', 9, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(42, 'BIDV', '9378206759', 'Prof. Vladimir Sauer', 'NH', 'https://via.placeholder.com/200x200.png/0044ee?text=finance+QR+Code+quos', 9, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(43, 'ZaloPay', '1486205454', 'Prof. Elena Goodwin DDS', 'NH', 'https://via.placeholder.com/200x200.png/008877?text=finance+QR+Code+nam', 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(44, 'ZaloPay', '1196887110', 'Ewell Haag', 'NH', 'https://via.placeholder.com/200x200.png/0088aa?text=finance+QR+Code+unde', 4, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(45, 'ZaloPay', '4923333308', 'Mrs. Alda Heller', 'NH', 'https://via.placeholder.com/200x200.png/004400?text=finance+QR+Code+ad', 7, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(46, 'ZaloPay', '9793638439', 'Kirstin Kunde', 'VDT', 'https://via.placeholder.com/200x200.png/003311?text=finance+QR+Code+fugit', 8, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(47, 'Techcombank', '1217755312', 'Mercedes Kutch', 'VDT', 'https://via.placeholder.com/200x200.png/009933?text=finance+QR+Code+voluptatibus', 10, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(48, 'Techcombank', '5543894491', 'Rebeka Fisher', 'NH', 'https://via.placeholder.com/200x200.png/0011aa?text=finance+QR+Code+sed', 1, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(49, 'BIDV', '2413911399', 'Iliana Botsford I', 'NH', 'https://via.placeholder.com/200x200.png/001188?text=finance+QR+Code+ut', 7, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(50, 'BIDV', '5564216997', 'Nella Smith', 'VDT', 'https://via.placeholder.com/200x200.png/001177?text=finance+QR+Code+et', 8, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(51, 'Vietcombank', '1778208642', 'Baby Haag', 'VDT', 'https://via.placeholder.com/200x200.png/00eeff?text=finance+QR+Code+ipsa', 12, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(52, 'BIDV', '4604534950', 'Mrs. Desiree Boyer V', 'NH', 'https://via.placeholder.com/200x200.png/005511?text=finance+QR+Code+earum', 8, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(53, 'Momo', '2219871706', 'Crawford Bayer', 'NH', 'https://via.placeholder.com/200x200.png/000033?text=finance+QR+Code+illum', 3, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(54, 'ZaloPay', '8175036086', 'Karianne Rohan', 'VDT', 'https://via.placeholder.com/200x200.png/001111?text=finance+QR+Code+doloribus', 10, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(55, 'ZaloPay', '1315706792', 'Everette Lynch I', 'NH', 'https://via.placeholder.com/200x200.png/005588?text=finance+QR+Code+voluptatum', 11, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(56, 'BIDV', '1166074011', 'Emilia Keebler', 'NH', 'https://via.placeholder.com/200x200.png/0088ff?text=finance+QR+Code+molestias', 11, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(57, 'Techcombank', '9100526436', 'Jamil Nienow MD', 'NH', 'https://via.placeholder.com/200x200.png/00ffcc?text=finance+QR+Code+cum', 12, '2025-05-18 07:17:10', '2025-05-18 07:17:10'),
(58, 'BIDV', '2726146848', 'Kenya McGlynn', 'VDT', 'https://via.placeholder.com/200x200.png/0099ee?text=finance+QR+Code+omnis', 11, '2025-05-18 07:17:10', '2025-05-18 07:17:10');

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
(1, 'In delectus et ad aperiam omnis facilis.', 'http://pollich.com/sed-ea-recusandae-nemo-architecto.html', '2025-05-18 14:17:07', '2025-05-25 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(2, 'Sit saepe saepe nostrum eum.', 'http://www.heller.biz/qui-consequatur-sunt-qui-nisi', '2025-05-18 14:17:07', '2025-05-28 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(3, 'Voluptas architecto autem autem maxime.', 'http://ledner.biz/dolorem-sed-sint-aut-reiciendis', '2025-05-18 14:17:07', '2025-05-26 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(4, 'Et perferendis quibusdam iure pariatur numquam fuga suscipit.', 'http://schmidt.com/natus-aut-maiores-dolorem-dolore-et', '2025-05-18 14:17:07', '2025-05-21 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(5, 'Similique expedita quis mollitia quasi quae rerum voluptate.', 'https://connelly.biz/qui-sapiente-saepe-velit-odio.html', '2025-05-18 14:17:07', '2025-05-24 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(6, 'Beatae et fugit distinctio sequi suscipit neque.', 'http://moen.com/', '2025-05-18 14:17:07', '2025-05-24 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(7, 'Eos adipisci quisquam itaque ad.', 'https://www.lehner.com/rerum-debitis-enim-velit-quisquam-nostrum-voluptatem', '2025-05-18 14:17:07', '2025-05-28 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(8, 'Quidem aut temporibus et corrupti facere consectetur.', 'http://olson.com/nihil-nihil-officiis-facere-assumenda.html', '2025-05-18 14:17:07', '2025-05-24 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(9, 'Asperiores non sunt veritatis at unde officiis quidem.', 'http://www.mcglynn.info/vitae-illum-sunt-voluptatem-minima', '2025-05-18 14:17:07', '2025-05-26 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07'),
(10, 'Nobis voluptatibus voluptates aperiam architecto.', 'http://jones.com/soluta-modi-voluptate-est-voluptas.html', '2025-05-18 14:17:07', '2025-05-22 14:17:07', '2025-05-18 07:17:07', '2025-05-18 07:17:07');

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
-- Chỉ mục cho bảng `donphep`
--
ALTER TABLE `donphep`
  ADD PRIMARY KEY (`maDP`),
  ADD KEY `donphep_manv_foreign` (`maNV`);

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
-- Chỉ mục cho bảng `ngayphep`
--
ALTER TABLE `ngayphep`
  ADD PRIMARY KEY (`maNP`),
  ADD KEY `ngayphep_manv_foreign` (`maNV`);

--
-- Chỉ mục cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`maNV`),
  ADD UNIQUE KEY `nhanvien_matk_unique` (`maTK`),
  ADD UNIQUE KEY `nhanvien_sodienthoai_unique` (`soDienThoai`),
  ADD UNIQUE KEY `nhanvien_email_unique` (`email`),
  ADD KEY `nhanvien_macl_foreign` (`maCL`);

--
-- Chỉ mục cho bảng `phieuluong`
--
ALTER TABLE `phieuluong`
  ADD PRIMARY KEY (`maPL`),
  ADD KEY `phieuluong_manv_foreign` (`maNV`);

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
  MODIFY `maBC` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `calam`
--
ALTER TABLE `calam`
  MODIFY `maCL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `chitietcalam`
--
ALTER TABLE `chitietcalam`
  MODIFY `maCTCL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
-- AUTO_INCREMENT cho bảng `donphep`
--
ALTER TABLE `donphep`
  MODIFY `maDP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=741;

--
-- AUTO_INCREMENT cho bảng `ngayle`
--
ALTER TABLE `ngayle`
  MODIFY `maNL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `ngayphep`
--
ALTER TABLE `ngayphep`
  MODIFY `maNP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `maNV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `phieuluong`
--
ALTER TABLE `phieuluong`
  MODIFY `maPL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `maTK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `tailieu`
--
ALTER TABLE `tailieu`
  MODIFY `maTL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  MODIFY `maTT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

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
-- Các ràng buộc cho bảng `donphep`
--
ALTER TABLE `donphep`
  ADD CONSTRAINT `donphep_manv_foreign` FOREIGN KEY (`maNV`) REFERENCES `nhanvien` (`maNV`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `lichlamviec`
--
ALTER TABLE `lichlamviec`
  ADD CONSTRAINT `lichlamviec_manv_foreign` FOREIGN KEY (`maNV`) REFERENCES `nhanvien` (`maNV`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `ngayphep`
--
ALTER TABLE `ngayphep`
  ADD CONSTRAINT `ngayphep_manv_foreign` FOREIGN KEY (`maNV`) REFERENCES `nhanvien` (`maNV`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `nhanvien_macl_foreign` FOREIGN KEY (`maCL`) REFERENCES `calam` (`maCL`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `nhanvien_matk_foreign` FOREIGN KEY (`maTK`) REFERENCES `taikhoan` (`maTK`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `phieuluong`
--
ALTER TABLE `phieuluong`
  ADD CONSTRAINT `phieuluong_manv_foreign` FOREIGN KEY (`maNV`) REFERENCES `nhanvien` (`maNV`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD CONSTRAINT `thanhtoan_manv_foreign` FOREIGN KEY (`maNV`) REFERENCES `nhanvien` (`maNV`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
