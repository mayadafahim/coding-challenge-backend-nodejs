import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateStolenBikeTable1556560586243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `stolen_bikes` ( `id` INT NOT NULL AUTO_INCREMENT , `licenseNumber` VARCHAR(255) NOT NULL , `color` VARCHAR(255) NOT NULL , `type` VARCHAR(255) NOT NULL , `owner` VARCHAR(255) NOT NULL , `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `description` TEXT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
