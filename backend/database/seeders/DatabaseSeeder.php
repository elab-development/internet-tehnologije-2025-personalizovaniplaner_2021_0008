<?php

namespace Database\Seeders;

use App\Models\Kupac;
use App\Models\Administrator;
use App\Models\Proizvod;
use App\Models\Planer;
use App\Models\Porudzbina;
use App\Models\StavkaPorudzbine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        //Kupci se dodaju sa hash-ovanim lozinkama
        Kupac::create([
            'ime' => 'Marko',
            'prezime' => 'Marković',
            'email' => 'marko@test.com',
            'adresa' => 'Bulevar revolucije 73',
            'telefon' => '06123456789',
            'lozinka' => Hash::make('lozinka123'),
        ]);

        Kupac::create([
            'ime' => 'Ana',
            'prezime' => 'Anić',
            'email' => 'ana@test.com',
            'adresa' => 'Knez Mihailova 15',
            'telefon' => '06123456790',
            'lozinka' => Hash::make('lozinka123'),
        ]);

        Kupac::create([
            'ime' => 'User',
            'prezime' => 'Testović',
            'email' => 'user@test.com',
            'adresa' => 'Terazije 34',
            'telefon' => '06123456791',
            'lozinka' => Hash::make('user123'),
        ]);

        //administratori se dodaju sa hash-ovanim lozinkama
        Administrator::create([
            'ime' => 'Admin',
            'prezime' => 'User',
            'email' => 'admin@test.com',
            'korisnickoIme' => 'admin',
            'lozinka' => Hash::make('admin123'),
        ]);

        Administrator::create([
            'ime' => 'Tester',
            'prezime' => 'Admin',
            'email' => 'tester@test.com',
            'korisnickoIme' => 'tester',
            'lozinka' => Hash::make('Tester123!'),
        ]);

        Proizvod::create([
            'naziv' => 'Weekly pages no grid refill',
            'tip' => 'Weekly pages',
            'opis' => 'Set of 50 weekly planner pages in A5 size.',
            'cena' => 3.90,
            'cenaPopust' => null,
            'kategorija' => 'Pages',
            'dostupnaKolicina' => 120,
            'bojaProizvoda' => 'White',
            'materijalProizvoda' => 'Recycled paper',
        ]);

        Proizvod::create([
            'naziv' => 'Monthly pages calendar refill',
            'tip' => 'Monthly pages',
            'opis' => 'Set of 12 monthly planner pages in A5 size.',
            'cena' => 1.50,
            'cenaPopust' => null,
            'kategorija' => 'Pages',
            'dostupnaKolicina' => 100,
            'bojaProizvoda' => 'White',
            'materijalProizvoda' => 'Recycled paper',
        ]);

        Proizvod::create([
            'naziv' => 'Permanent marker',
            'tip' => 'Writing tool',
            'opis' => 'High quality permanent marker.',
            'cena' => 2.00,
            'cenaPopust' => null,
            'kategorija' => 'Stationery',
            'dostupnaKolicina' => 80,
            'bojaProizvoda' => 'Black',
            'materijalProizvoda' => 'plastic',
        ]);

        Proizvod::create([
            'naziv' => 'Red Ballpoint Pen',
            'tip' => 'Writing tool',
            'opis' => 'High quality red ballpoint pen.',
            'cena' => 1.50,
            'cenaPopust' => 1.2,
            'kategorija' => 'Stationery',
            'dostupnaKolicina' => 30,
            'bojaProizvoda' => 'Red',
            'materijalProizvoda' => 'plastic',
        ]);

        Proizvod::create([
            'naziv' => 'Flourescent Highlighter',
            'tip' => 'Writing tool',
            'opis' => 'Highlighter pen for marking important text.',
            'cena' => 1.50,
            'cenaPopust' => 1.2,
            'kategorija' => 'Stationery',
            'dostupnaKolicina' => 40,
            'bojaProizvoda' => 'Yellow',
            'materijalProizvoda' => 'plastic',
        ]);

        Proizvod::create([
            'naziv' => 'Personal Planner - Sage Green (Silver Binder)',
            'tip' => 'Small Planners',
            'opis' => 'A5 personalized yearly planner with silver binder and sage green cover.',
            'cena' => 34.00,
            'cenaPopust' => null,
            'kategorija' => 'Planners',
            'dostupnaKolicina' => 25,
            'bojaProizvoda' => 'Sage Green',
            'materijalProizvoda' => 'PU leather',
        ]);

        Proizvod::create([
            'naziv' => 'Personal Planner - Cherry red (Gold Binder)',
            'tip' => 'Small Planners',
            'opis' => 'A4 personalized yearly planner with gold binder and cherry red cover.',
            'cena' => 35.00,
            'cenaPopust' => null,
            'kategorija' => 'Planners',
            'dostupnaKolicina' => 29,
            'bojaProizvoda' => 'Cherry Red',
            'materijalProizvoda' => 'PU leather',
        ]);

        Proizvod::create([
            'naziv' => 'Fitness tracker',
            'tip' => 'Trackers',
            'opis' => 'Fitness tracker to monitor your daily activities.',
            'cena' => 1.80,
            'cenaPopust' => null,
            'kategorija' => 'Pages',
            'dostupnaKolicina' => 0,
            'bojaProizvoda' => 'white',
            'materijalProizvoda' => 'paper',
        ]);

        Planer::create([
            'proizvodId' => 6,
            'bojaMetala' => 'silver',
            'postava' => 'fabric',
            'brojDzepova' => 3,
        ]);

        Planer::create([
            'proizvodId' => 7,
            'bojaMetala' => 'gold',
            'postava' => 'fabric',
            'brojDzepova' => 2,
        ]);

        Porudzbina::create([
            'kupacId' => 1,
            'datumKreirana' => '2026-02-01',
            'datumPoslata' => '2026-02-03',
            'status' => 'Shipped',
            'ukupniIznos' => 37.90,
        ]);

        Porudzbina::create([
            'kupacId' => 2,
            'datumKreirana' => '2026-02-03',
            'datumPoslata' => null,
            'status' => 'Pending',
            'ukupniIznos' => 67.80,
        ]);

        Porudzbina::create([
            'kupacId' => 3,
            'datumKreirana' => '2026-01-15',
            'datumPoslata' => '2026-01-18',
            'status' => 'Delivered',
            'ukupniIznos' => 67.80,
        ]);

        Porudzbina::create([
            'kupacId' => 3,
            'datumKreirana' => '2026-02-05',
            'datumPoslata' => null,
            'status' => 'Shipped',
            'ukupniIznos' => 42.30,
        ]);

        StavkaPorudzbine::create([
            'porudzbinaId' => 1,
            'rb' => 1,
            'proizvodId' => 6,
            'kolicina' => 1,
            'iznosStavke' => 34.00,
            'personalizacija' => null,
        ]);

        StavkaPorudzbine::create([
            'porudzbinaId' => 1,
            'rb' => 2,
            'proizvodId' => 1,
            'kolicina' => 1,
            'iznosStavke' => 3.90,
            'personalizacija' => null,
        ]);

        StavkaPorudzbine::create([
            'porudzbinaId' => 2,
            'rb' => 1,
            'proizvodId' => 7,
            'kolicina' => 1,
            'iznosStavke' => 35.00,
            'personalizacija' => 'Text: Work Journal, Font: Sans-serif, Color: #1a1a1a',
        ]);

        StavkaPorudzbine::create([
            'porudzbinaId' => 2,
            'rb' => 2,
            'proizvodId' => 2,
            'kolicina' => 1,
            'iznosStavke' => 1.50,
            'personalizacija' => null,
        ]);

        StavkaPorudzbine::create([
            'porudzbinaId' => 2,
            'rb' => 3,
            'proizvodId' => 4,
            'kolicina' => 2,
            'iznosStavke' => 3.00,
            'personalizacija' => null,
        ]);

        StavkaPorudzbine::create([
            'porudzbinaId' => 3,
            'rb' => 1,
            'proizvodId' => 6,
            'kolicina' => 1,
            'iznosStavke' => 34.00,
            'personalizacija' => null,
        ]);

        StavkaPorudzbine::create([
            'porudzbinaId' => 3,
            'rb' => 2,
            'proizvodId' => 1,
            'kolicina' => 1,
            'iznosStavke' => 3.90,
            'personalizacija' => null,
        ]);

        StavkaPorudzbine::create([
            'porudzbinaId' => 4,
            'rb' => 1,
            'proizvodId' => 4,
            'kolicina' => 1,
            'iznosStavke' => 1.50,
            'personalizacija' => 'Text: My Planner, Font: Serif, Color: #000000',
        ]);

        StavkaPorudzbine::create([
            'porudzbinaId' => 4,
            'rb' => 2,
            'proizvodId' => 5,
            'kolicina' => 1,
            'iznosStavke' => 1.50,
            'personalizacija' => null,
        ]);

        StavkaPorudzbine::create([
            'porudzbinaId' => 4,
            'rb' => 3,
            'proizvodId' => 2,
            'kolicina' => 1,
            'iznosStavke' => 1.50,
            'personalizacija' => null,
        ]);
    }
}
