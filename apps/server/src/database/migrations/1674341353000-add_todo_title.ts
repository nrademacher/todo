import { MigrationInterface, QueryRunner } from "typeorm";

export class addTodoTitle1674341353000 implements MigrationInterface {
  name = "addTodoTitle1674341353000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`todo\` ADD \`title\` varchar(255) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`todo\` CHANGE \`description\` \`description\` varchar(255) NOT NULL DEFAULT ''`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`todo\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`title\``);
  }
}
