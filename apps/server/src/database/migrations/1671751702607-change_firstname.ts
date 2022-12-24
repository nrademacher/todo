import { MigrationInterface, QueryRunner } from "typeorm";

export class changeFirstname1671751702607 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `user` RENAME COLUMN `firstName` TO `firstname`",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `user` RENAME COLUMN `firstname` TO `firstName`",
    );
  }
}
