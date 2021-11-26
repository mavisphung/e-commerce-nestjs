import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProducts1637909559379 implements MigrationInterface {
    name = 'AddProducts1637909559379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(64) NOT NULL, \`description\` varchar(255) NULL, \`price\` double NOT NULL DEFAULT '1', \`quantity\` int NOT NULL DEFAULT '1', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`products\``);
    }

}
