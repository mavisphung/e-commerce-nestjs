import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateSupplierTable1637912707374 implements MigrationInterface {
    name = 'UpdateSupplierTable1637912707374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`suppliers\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`suppliers\` ADD \`phoneNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` ADD \`status\` smallint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` ADD \`address\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` ADD \`role_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`unique_email\` ON \`suppliers\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` ADD CONSTRAINT \`FK_1a298acbc01973ccfef8c51d073\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`suppliers\` DROP FOREIGN KEY \`FK_1a298acbc01973ccfef8c51d073\``);
        await queryRunner.query(`DROP INDEX \`unique_email\` ON \`suppliers\``);
        await queryRunner.query(`ALTER TABLE \`suppliers\` DROP COLUMN \`role_id\``);
        await queryRunner.query(`ALTER TABLE \`suppliers\` DROP COLUMN \`address\``);
        await queryRunner.query(`ALTER TABLE \`suppliers\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`suppliers\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`suppliers\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`suppliers\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`suppliers\` ADD \`phone_number\` varchar(255) NOT NULL`);
    }

}
