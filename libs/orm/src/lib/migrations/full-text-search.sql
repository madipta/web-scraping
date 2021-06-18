
UPDATE content set search_vector = 
  setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('simple', coalesce(header, '')), 'B') ||
  setweight(to_tsvector('simple', coalesce(text, '')), 'C');

CREATE INDEX content_search_vector_idx
  ON content
  USING GIN (search_vector);

CREATE FUNCTION content_tsvector_trigger() RETURNS trigger AS $$
  begin
    new.search_vector :=
    setweight(to_tsvector('simple', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.header, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(new.text, '')), 'C');
    return new;
  end
  $$ LANGUAGE plpgsql;

CREATE TRIGGER content_tsvectorupdate BEFORE INSERT OR UPDATE
    ON content FOR EACH ROW EXECUTE PROCEDURE content_tsvector_trigger();

