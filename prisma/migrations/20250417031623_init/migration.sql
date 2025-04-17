-- CreateTable
CREATE TABLE `YNCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `status` ENUM('VISIBLE', 'HIDDEN') NOT NULL DEFAULT 'VISIBLE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(50) NOT NULL,

    INDEX `YNCategory_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YNContact` (
    `id` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `message` VARCHAR(160) NOT NULL,
    `status` ENUM('READ', 'UNREAD', 'DELETED') NOT NULL DEFAULT 'UNREAD',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `YNContact_email_key`(`email`),
    INDEX `YNContact_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YNLogger` (
    `id` VARCHAR(191) NOT NULL,
    `message` LONGTEXT NOT NULL,
    `userId` VARCHAR(50) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` ENUM('READ', 'UNREAD', 'DELETED') NOT NULL DEFAULT 'UNREAD',

    INDEX `YNLogger_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YNProduct` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(500) NOT NULL,
    `image` LONGTEXT NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `qtyAvailable` DOUBLE NOT NULL DEFAULT 0,
    `popular` BOOLEAN NOT NULL DEFAULT false,
    `description` MEDIUMTEXT NULL,
    `status` ENUM('VISIBLE', 'HIDDEN') NOT NULL DEFAULT 'VISIBLE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `categoryId` VARCHAR(50) NOT NULL,
    `userId` VARCHAR(50) NOT NULL,

    INDEX `YNProduct_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YnOrder` (
    `id` VARCHAR(50) NOT NULL,
    `fullname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `proof` VARCHAR(20) NOT NULL,
    `status` ENUM('PENDING', 'ACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'PENDING',
    `delivery` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` VARCHAR(50) NOT NULL,

    INDEX `YnOrder_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YnOrderItem` (
    `id` VARCHAR(50) NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` VARCHAR(50) NOT NULL,
    `productId` VARCHAR(191) NULL,
    `orderId` VARCHAR(191) NULL,

    INDEX `YnOrderItem_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YNUser` (
    `id` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `image` LONGTEXT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `status` ENUM('PENDING', 'ACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'PENDING',
    `role` ENUM('ROOT', 'ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `token` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `YNUser_email_key`(`email`),
    INDEX `YNUser_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YNBlog` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `image` VARCHAR(100) NULL,
    `text` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NULL,

    INDEX `YNBlog_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YNComment` (
    `id` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `blogId` VARCHAR(191) NULL,

    INDEX `YNComment_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YNReply` (
    `id` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `commentId` VARCHAR(191) NULL,

    INDEX `YNReply_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `YNCategory` ADD CONSTRAINT `YNCategory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `YNUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `YNProduct` ADD CONSTRAINT `YNProduct_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `YNCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `YNProduct` ADD CONSTRAINT `YNProduct_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `YNUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `YnOrderItem` ADD CONSTRAINT `YnOrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `YNProduct`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `YnOrderItem` ADD CONSTRAINT `YnOrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `YnOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `YNBlog` ADD CONSTRAINT `YNBlog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `YNUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `YNComment` ADD CONSTRAINT `YNComment_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `YNBlog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `YNReply` ADD CONSTRAINT `YNReply_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `YNComment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
