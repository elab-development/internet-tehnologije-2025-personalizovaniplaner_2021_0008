CREATE DATABASE IF NOT EXISTS personalizovani_planer
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE personalizovani_planer;


CREATE TABLE IF NOT EXISTS kupci (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ime VARCHAR(100) NOT NULL,
  prezime VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  adresa VARCHAR(255) NOT NULL,
  telefon VARCHAR(30) NOT NULL,
  lozinka VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS administratori (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ime VARCHAR(100) NOT NULL,
  prezime VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  korisnickoIme VARCHAR(100) NOT NULL UNIQUE,
  lozinka VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS proizvodi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  naziv VARCHAR(150) NOT NULL,
  tip VARCHAR(100) NOT NULL,
  opis TEXT NOT NULL,
  cena DECIMAL(10,2) NOT NULL,
  cenaPopust DECIMAL(10,2) NULL,
  kategorija VARCHAR(100) NOT NULL,
  dostupnaKolicina INT NOT NULL,
  bojaProizvoda VARCHAR(60) NOT NULL,
  materijalProizvoda VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS planeri (
  id INT AUTO_INCREMENT PRIMARY KEY,
  proizvodId INT NOT NULL UNIQUE,
  bojaMetala VARCHAR(60) NOT NULL,
  postava VARCHAR(100) NOT NULL,
  brojDzepova INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_planeri_proizvodId
    FOREIGN KEY (proizvodId) REFERENCES proizvodi(id)
    ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS porudzbine (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kupacId INT NOT NULL,
  datumKreirana DATE NOT NULL,
  datumPoslata DATE NULL,
  status VARCHAR(50) NOT NULL,
  ukupniIznos DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_porudzbine_kupacId
    FOREIGN KEY (kupacId) REFERENCES kupci(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS stavke_porudzbine (
  id INT AUTO_INCREMENT PRIMARY KEY,
  porudzbinaId INT NOT NULL,
  rb INT NOT NULL,
  proizvodId INT NOT NULL,
  kolicina INT NOT NULL,
  iznosStavke DECIMAL(10,2) NOT NULL,
  personalizacija TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_stavke_porudzbine_porudzbinaId
    FOREIGN KEY (porudzbinaId) REFERENCES porudzbine(id)
    ON DELETE RESTRICT,
  CONSTRAINT fk_stavke_porudzbine_proizvodId
    FOREIGN KEY (proizvodId) REFERENCES proizvodi(id)
    ON DELETE RESTRICT,
  UNIQUE KEY uk_porudzbina_rb (porudzbinaId, rb)
);


INSERT INTO kupci (ime, prezime, email, adresa, telefon, lozinka) VALUES
('Marko', 'Marković', 'marko@test.com', 'Bulevar revolucije 73', '061234567', 'lozinka123'),
('Ana', 'Anić', 'ana@test.com', 'Knez Mihailova 15', '061234568', 'lozinka123'),
('User', 'Testović', 'user@test.com', 'Terazije 34', '061234569', 'user123');

INSERT INTO administratori (ime, prezime, email, korisnickoIme, lozinka) VALUES
('Admin', 'User', 'admin@test.com', 'admin', 'admin123'),
('Tester', 'Admin', 'tester@test.com', 'tester', 'Tester123!');

INSERT INTO proizvodi (naziv, tip, opis, cena, cenaPopust, kategorija, dostupnaKolicina, bojaProizvoda, materijalProizvoda) VALUES
('Weekly pages no grid refill', 'Weekly pages', 'Set of 50 weekly planner pages in A5 size.', 3.90, NULL, 'Pages', 120, 'White', 'Recycled paper'),
('Monthly pages calendar refill', 'Monthly pages', 'Set of 12 monthly planner pages in A5 size.', 1.50, NULL, 'Pages', 100, 'White', 'Recycled paper'),
('Permanent marker', 'Writing tool', 'High quality permanent marker.', 2.00, NULL, 'Stationery', 80, 'Black', 'plastic'),
('Red Ballpoint Pen', 'Writing tool', 'High quality red ballpoint pen.', 1.50, 1.2, 'Stationery', 30, 'Red', 'plastic'),
('Flourescent Highlighter', 'Writing tool', 'Highlighter pen for marking important text.', 1.50, 1.2, 'Stationery', 40, 'Yellow', 'plastic'),
('Personal Planner - Sage Green (Silver Binder)', 'Small Planners', 'A5 personalized yearly planner with silver binder and sage green cover.', 34.00, NULL, 'Planners', 25, 'Sage Green', 'PU leather'),
('Personal Planner - Cherry red (Gold Binder)', 'Small Planners', 'A4 personalized yearly planner with gold binder and cherry red cover.', 35.00, NULL, 'Planners', 29, 'Cherry Red', 'PU leather'),
('Fitness tracker', 'Trackers', 'Fitness tracker to monitor your daily activities.', 1.80, NULL, 'Pages', 0, 'white', 'paper');

INSERT INTO planeri (proizvodId, bojaMetala, postava, brojDzepova) VALUES
(6, 'silver', 'fabric', 3),
(7, 'gold', 'fabric', 2);

INSERT INTO porudzbine (kupacId, datumKreirana, datumPoslata, status, ukupniIznos) VALUES
(1, '2026-02-01', '2026-02-03', 'Shipped', 37.90),
(2, '2026-02-03', NULL, 'Pending', 67.80),
(3, '2026-01-15', '2026-01-18', 'Delivered', 67.80),
(3, '2026-02-05', NULL, 'Shipped', 42.30);

INSERT INTO stavke_porudzbine (porudzbinaId, rb, proizvodId, kolicina, iznosStavke, personalizacija) VALUES
(1, 1, 6, 1, 34.00, NULL),
(1, 2, 1, 1, 3.90, NULL),
(2, 1, 7, 1, 35.00, 'Text: Work Journal, Font: Sans-serif, Color: #1a1a1a'),
(2, 2, 2, 1, 1.50, NULL),
(2, 3, 4, 2, 3.00, NULL),
(3, 1, 6, 1, 34.00, NULL),
(3, 2, 1, 1, 3.90, NULL),
(4, 1, 4, 1, 1.50, 'Text: My Planner, Font: Serif, Color: #000000'),
(4, 2, 5, 1, 1.50, NULL),
(4, 3, 2, 1, 1.50, NULL);
