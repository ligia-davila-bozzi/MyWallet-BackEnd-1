INSERT INTO "customers" ("name", "cpf") VALUES
  ('Allana Fidalgo Moreira',    '12345678900'),
  ('Benício Freire Sampaio',    '98765432100'),
  ('Orlando Pequeno Jesus',     '10293847560'),
  ('Olga Cascais Fortunato',    '01928374650'),
  ('Martinha Lima Zambujal',    '11992288445'),
  ('Anabela Baptista Soverosa', '22883377446'),
  ('Raul Arouca Pederneiras',   '11889922385'),
  ('Chico Buarque de Holanda',  '65719484743'),
  ('Lucca Santarém Branco',     '48769275911'),
  ('Patrícia Toste Prudente',   '19847457596');

INSERT INTO "products" ("name", "price") VALUES
  ('Bombonzinho de Morango', 2),
  ('Sorvetinho de Danoninho', 4),
  ('Docinho de Banana', 1),
  ('2x Paçoquinha', 1),
  ('Canudinhos de Chocolate', 5),
  ('Docinho de Mamão', 1),
  ('Brigadeirinho', 1),
  ('Balinha de Leite Ninho', 1);

INSERT INTO "purchases" ("customer_id", "product_id") VALUES
  (1, 7),
  (2, 1),
  (2, 2),
  (2, 7),
  (3, 2),
  (5, 5),
  (6, 6),
  (7, 1),
  (8, 3),
  (8, 1);
