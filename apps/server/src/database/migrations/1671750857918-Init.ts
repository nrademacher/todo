import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1671750857918 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `todo` RENAME COLUMN `description` TO `task`",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `todo` RENAME COLUMN `task` TO `description`",
    );
  }
}
