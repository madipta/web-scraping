import { QueryRunner } from "typeorm";

export class DbSetup {
  static async init(queryRunner: QueryRunner) {
    console.log("add uuid extension");
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    console.log("update table content: search_vector");
    await queryRunner.query(`
      UPDATE content set search_vector = 
        setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(header, '')), 'B') ||
        setweight(to_tsvector('simple', coalesce(text, '')), 'C');`);

    console.log("create index search_vector");
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS content_search_vector_idx ON content
        USING GIN (search_vector);`);

    console.log("create search_vector trigger on table content");
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION content_tsvector_trigger() RETURNS trigger AS $$
        begin
          new.search_vector :=
          setweight(to_tsvector('simple', coalesce(new.title, '')), 'A') ||
          setweight(to_tsvector('simple', coalesce(new.header, '')), 'B') ||
          setweight(to_tsvector('simple', coalesce(new.text, '')), 'C');
          return new;
        end
        $$ LANGUAGE plpgsql;`);

    console.log("create trigger to update search_vector")
    await queryRunner.query(`DROP TRIGGER IF EXISTS content_tsvectorupdate ON content;`);

    await queryRunner.query(`
      CREATE TRIGGER content_tsvectorupdate BEFORE INSERT OR UPDATE
        ON content FOR EACH ROW EXECUTE PROCEDURE content_tsvector_trigger();`);
}
}
