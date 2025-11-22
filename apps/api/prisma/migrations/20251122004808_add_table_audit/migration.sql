-- CreateTable
CREATE TABLE `miforge_account_audit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(255) NOT NULL,
    `details` TEXT NULL,
    `ip` VARCHAR(191) NULL,
    `userAgent` VARCHAR(512) NULL,
    `success` BOOLEAN NOT NULL DEFAULT true,
    `errorCode` VARCHAR(100) NULL,
    `requestId` VARCHAR(255) NULL,
    `metadata` JSON NULL,
    `account_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `idx_miforge_account_audit_request_id`(`requestId`),
    INDEX `idx_miforge_account_audit_action`(`action`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `miforge_account_audit` ADD CONSTRAINT `miforge_account_audit_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
