import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBikeStatusAndRelation1556561468989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `stolen_bikes` ADD `resolved` BOOLEAN NOT NULL DEFAULT FALSE AFTER `description`, ADD `policeOfficerId` INT NULL AFTER `resolved`;");
        await queryRunner.query("ALTER TABLE stolen_bikes ADD FOREIGN KEY (policeOfficerId) REFERENCES police_officers(id);")
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
