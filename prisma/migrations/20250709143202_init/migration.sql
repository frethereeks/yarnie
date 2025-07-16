-- CreateTable
CREATE TABLE `YnCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `status` ENUM('Visible', 'Hidden') NOT NULL DEFAULT 'Visible',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(50) NOT NULL,

    INDEX `YnCategory_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YnContact` (
    `id` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `message` VARCHAR(160) NOT NULL,
    `status` ENUM('Read', 'Unread', 'Deleted') NOT NULL DEFAULT 'Unread',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `YnContact_email_key`(`email`),
    INDEX `YnContact_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YnLogger` (
    `id` VARCHAR(191) NOT NULL,
    `action` VARCHAR(20) NOT NULL,
    `table` VARCHAR(20) NOT NULL,
    `message` LONGTEXT NOT NULL,
    `userId` VARCHAR(50) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` ENUM('Read', 'Unread', 'Deleted') NOT NULL DEFAULT 'Unread',

    INDEX `YnLogger_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YnProduct` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(500) NOT NULL,
    `image` LONGTEXT NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `qtyAvailable` DOUBLE NOT NULL DEFAULT 0,
    `popular` BOOLEAN NOT NULL DEFAULT false,
    `description` MEDIUMTEXT NULL,
    `status` ENUM('Visible', 'Hidden') NOT NULL DEFAULT 'Visible',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `categoryId` VARCHAR(50) NOT NULL,
    `userId` VARCHAR(50) NOT NULL,

    INDEX `YnProduct_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YnOrder` (
    `id` VARCHAR(50) NOT NULL,
    `fullname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `proof` TINYTEXT NOT NULL,
    `address` TINYTEXT NOT NULL,
    `status` ENUM('Pending', 'Received', 'OutForDelivery', 'Delivered', 'Returned') NOT NULL DEFAULT 'Pending',
    `delivery` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` VARCHAR(50) NULL,

    INDEX `YnOrder_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YnOrderItem` (
    `id` VARCHAR(50) NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('Pending', 'Received', 'OutForDelivery', 'Delivered', 'Returned') NOT NULL DEFAULT 'Pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` VARCHAR(50) NULL,
    `productId` VARCHAR(191) NULL,
    `orderId` VARCHAR(191) NULL,

    INDEX `YnOrderItem_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YnUser` (
    `id` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `image` LONGTEXT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `status` ENUM('Pending', 'Active', 'Suspended') NOT NULL DEFAULT 'Pending',
    `role` ENUM('Owner', 'Admin', 'User') NOT NULL DEFAULT 'User',
    `token` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `YnUser_email_key`(`email`),
    INDEX `YnUser_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `YnCategory` ADD CONSTRAINT `YnCategory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `YnUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `YnProduct` ADD CONSTRAINT `YnProduct_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `YnCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `YnProduct` ADD CONSTRAINT `YnProduct_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `YnUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `YnOrderItem` ADD CONSTRAINT `YnOrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `YnProduct`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `YnOrderItem` ADD CONSTRAINT `YnOrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `YnOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
