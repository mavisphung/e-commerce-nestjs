import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSupplierAndUpdateProductRelationship1637911388185 implements MigrationInterface {
    name = 'AddSupplierAndUpdateProductRelationship1637911388185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`suppliers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`supplier_id\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_66181e465a65c2ddcfa9c00c9c\` (\`email\`), UNIQUE INDEX \`supplier_id_unique\` (\`supplier_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`supplier_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_0ec433c1e1d444962d592d86c86\` FOREIGN KEY (\`supplier_id\`) REFERENCES \`suppliers\`(\`id\`) ON DELETE CASCADE ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_0ec433c1e1d444962d592d86c86\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`supplier_id\``);
        await queryRunner.query(`DROP INDEX \`supplier_id_unique\` ON \`suppliers\``);
        await queryRunner.query(`DROP INDEX \`IDX_66181e465a65c2ddcfa9c00c9c\` ON \`suppliers\``);
        await queryRunner.query(`DROP TABLE \`suppliers\``);
    }

}
