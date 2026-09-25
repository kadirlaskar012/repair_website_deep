-- Hostinger MySQL Schema for Appliance Seva

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT PRIMARY KEY DEFAULT 1,
  `business_name` VARCHAR(255) NOT NULL,
  `business_name_bn` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `whatsapp` VARCHAR(50) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `address` TEXT NOT NULL,
  `address_bn` TEXT NOT NULL,
  `service_area` TEXT NOT NULL,
  `service_area_bn` TEXT NOT NULL,
  `working_hours` VARCHAR(100) NOT NULL,
  `working_hours_bn` VARCHAR(100) NOT NULL,
  `visit_fee` INT NOT NULL DEFAULT 299,
  `currency` VARCHAR(10) NOT NULL DEFAULT '₹',
  `pricing_disclaimer` TEXT NOT NULL,
  `pricing_disclaimer_bn` TEXT NOT NULL,
  `emergency_notice` TEXT,
  `emergency_notice_bn` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `categories` (
  `id` VARCHAR(100) PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(150) NOT NULL,
  `name_bn` VARCHAR(150) NOT NULL,
  `short_desc` TEXT,
  `short_desc_bn` TEXT,
  `full_desc` MEDIUMTEXT,
  `full_desc_bn` MEDIUMTEXT,
  `icon_name` VARCHAR(50) NOT NULL DEFAULT 'wrench',
  `image_url` VARCHAR(255),
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `meta_title` VARCHAR(255),
  `meta_title_bn` VARCHAR(255),
  `meta_desc` TEXT,
  `meta_desc_bn` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `problems` (
  `id` VARCHAR(100) PRIMARY KEY,
  `category_id` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `title_bn` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `description_bn` TEXT,
  `symptoms_json` JSON,
  `symptoms_bn_json` JSON,
  `common_causes` TEXT,
  `common_causes_bn` TEXT,
  `solution_note` TEXT,
  `solution_note_bn` TEXT,
  `diagnostic_fee_note` TEXT,
  `diagnostic_fee_note_bn` TEXT,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_cat` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `brands` (
  `id` VARCHAR(100) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `logo_url` VARCHAR(255),
  `categories_json` JSON,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `is_popular` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `locations` (
  `id` VARCHAR(100) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `name_bn` VARCHAR(100) NOT NULL,
  `hash_slug` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL DEFAULT 'West Bengal',
  `state_bn` VARCHAR(100) NOT NULL DEFAULT 'পশ্চিমবঙ্গ',
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `trust_items` (
  `id` VARCHAR(100) PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `title_bn` VARCHAR(150) NOT NULL,
  `subtitle` TEXT NOT NULL,
  `subtitle_bn` TEXT NOT NULL,
  `icon_name` VARCHAR(50) NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` VARCHAR(100) PRIMARY KEY,
  `customer_name` VARCHAR(150) NOT NULL,
  `location` VARCHAR(150) NOT NULL,
  `service_category` VARCHAR(100) NOT NULL,
  `rating` INT NOT NULL DEFAULT 5,
  `comment` TEXT NOT NULL,
  `comment_bn` TEXT NOT NULL,
  `is_verified` TINYINT(1) NOT NULL DEFAULT 1,
  `is_demo` TINYINT(1) NOT NULL DEFAULT 1,
  `date_str` VARCHAR(20) NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `booking_id` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(150) NOT NULL,
  `mobile` VARCHAR(25) NOT NULL,
  `service` VARCHAR(100) NOT NULL,
  `service_name` VARCHAR(150),
  `brand` VARCHAR(100) NOT NULL,
  `problem` TEXT NOT NULL,
  `address` TEXT NOT NULL,
  `preferred_date` VARCHAR(20) NOT NULL,
  `preferred_time` VARCHAR(50) NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_booking_id` (`booking_id`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` VARCHAR(100) PRIMARY KEY,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `title_bn` VARCHAR(255) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `content_bn` LONGTEXT NOT NULL,
  `excerpt` TEXT,
  `excerpt_bn` TEXT,
  `featured_image_url` VARCHAR(255),
  `category` VARCHAR(100),
  `focus_keyword` VARCHAR(255),
  `secondary_keywords_json` JSON,
  `meta_title` VARCHAR(255),
  `meta_desc` TEXT,
  `og_title` VARCHAR(255),
  `og_desc` TEXT,
  `faqs_json` JSON,
  `status` VARCHAR(20) NOT NULL DEFAULT 'draft',
  `author` VARCHAR(100) DEFAULT 'Service Team',
  `published_at` VARCHAR(50),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_slug` (`slug`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ai_settings` (
  `id` INT PRIMARY KEY DEFAULT 1,
  `provider` VARCHAR(50) NOT NULL DEFAULT 'gemini',
  `gemini_api_key` VARCHAR(255) DEFAULT '',
  `gemini_model` VARCHAR(100) DEFAULT 'gemini-1.5-flash',
  `openai_api_key` VARCHAR(255) DEFAULT '',
  `openai_model` VARCHAR(100) DEFAULT 'gpt-4o-mini',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `media_assets` (
  `id` VARCHAR(100) PRIMARY KEY,
  `filename` VARCHAR(255) NOT NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `mime_type` VARCHAR(100) NOT NULL,
  `size_bytes` BIGINT NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `alt_text` VARCHAR(255) DEFAULT '',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
