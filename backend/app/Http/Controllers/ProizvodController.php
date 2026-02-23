<?php

namespace App\Http\Controllers;

use App\Models\Proizvod;
use Illuminate\Http\Request;

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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'naziv' => 'required|string',
            'tip' => 'required|string',
            'opis' => 'required|string',
            'cena' => 'required|numeric',
            'cenaPopust' => 'nullable|numeric',
            'kategorija' => 'required|string',
            'dostupnaKolicina' => 'required|integer',
            'bojaProizvoda' => 'required|string',
            'materijalProizvoda' => 'required|string',
        ]);

        $proizvod = Proizvod::create($validated);

        return response()->json([
            'message' => 'Product created',
            'proizvod' => [
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
            ]
        ], 201);
    }

    public function update(Request $request, Proizvod $proizvod)
    {
        $validated = $request->validate([
            'naziv' => 'required|string',
            'tip' => 'required|string',
            'opis' => 'required|string',
            'cena' => 'required|numeric',
            'cenaPopust' => 'nullable|numeric',
            'kategorija' => 'required|string',
            'dostupnaKolicina' => 'required|integer',
            'bojaProizvoda' => 'required|string',
            'materijalProizvoda' => 'required|string',
        ]);

        $proizvod->update($validated);

        return response()->json([
            'message' => 'Product updated',
            'proizvod' => [
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
            ]
        ]);
    }

    public function destroy(Proizvod $proizvod)
    {
        $proizvod->delete();

        return response()->json([
            'message' => 'Product deleted'
        ]);
    }
}
