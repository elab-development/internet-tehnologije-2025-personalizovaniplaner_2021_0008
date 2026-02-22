<?php

namespace App\Http\Controllers;

use App\Models\Proizvod;

class ProizvodController extends Controller
{
    public function index()
    {
        $proizvodi = Proizvod::with('planer')->get();

        return response()->json($proizvodi->map(function ($proizvod) {
            return [
                'id' => $proizvod->id,
                'naziv' => $proizvod->naziv,
                'tip' => $proizvod->tip,
                'opis' => $proizvod->opis,
                'cena' => $proizvod->cena,
                'cenaPopust' => $proizvod->cenaPopust,
                'kategorija' => $proizvod->kategorija,
                'dostupnaKolicina' => $proizvod->dostupnaKolicina,
                'bojaProizvoda' => $proizvod->bojaProizvoda,
                'materijalProizvoda' => $proizvod->materijalProizvoda,
                'slika' => $proizvod->slika ? url('storage/' . $proizvod->slika) : null,
                'planer' => $proizvod->planer,
                'created_at' => $proizvod->created_at,
                'updated_at' => $proizvod->updated_at,
            ];
        }));
    }
}
