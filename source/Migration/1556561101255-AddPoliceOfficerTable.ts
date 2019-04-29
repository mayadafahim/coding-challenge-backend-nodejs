import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPoliceOfficerTable1556561101255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `police_officers` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `available` BOOLEAN NOT NULL DEFAULT TRUE , PRIMARY KEY (`id`)) ENGINE = InnoDB;");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
