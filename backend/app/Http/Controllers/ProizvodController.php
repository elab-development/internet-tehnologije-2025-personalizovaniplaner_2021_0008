<?php

namespace App\Http\Controllers;

use App\Models\Proizvod;
use Illuminate\Http\Request;

class ProizvodController extends Controller
{
    /**
 * @OA\Get(
 *     path="/api/products",
 *     summary="Prikaz svih proizvoda",
 *     tags={"Products"},
 *     @OA\Response(response=200, description="Lista proizvoda")
 * )
 */

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

/**
 * @OA\Post(
 *     path="/api/products",
 *     summary="Dodavanje novog proizvoda",
 *     tags={"Products"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"naziv","tip","opis","cena","kategorija","dostupnaKolicina","bojaProizvoda","materijalProizvoda"},
 *             @OA\Property(property="naziv", type="string"),
 *             @OA\Property(property="tip", type="string"),
 *             @OA\Property(property="opis", type="string"),
 *             @OA\Property(property="cena", type="number"),
 *             @OA\Property(property="cenaPopust", type="number"),
 *             @OA\Property(property="kategorija", type="string"),
 *             @OA\Property(property="dostupnaKolicina", type="integer"),
 *             @OA\Property(property="bojaProizvoda", type="string"),
 *             @OA\Property(property="materijalProizvoda", type="string")
 *         )
 *     ),
 *     @OA\Response(response=201, description="Proizvod kreiran")
 * )
 */

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
/**
 * @OA\Put(
 *     path="/api/products/{id}",
 *     summary="Ažuriranje proizvoda",
 *     tags={"Products"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID proizvoda",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"naziv","tip","opis","cena","kategorija","dostupnaKolicina","bojaProizvoda","materijalProizvoda"},
 *             @OA\Property(property="naziv", type="string"),
 *             @OA\Property(property="tip", type="string"),
 *             @OA\Property(property="opis", type="string"),
 *             @OA\Property(property="cena", type="number"),
 *             @OA\Property(property="cenaPopust", type="number"),
 *             @OA\Property(property="kategorija", type="string"),
 *             @OA\Property(property="dostupnaKolicina", type="integer"),
 *             @OA\Property(property="bojaProizvoda", type="string"),
 *             @OA\Property(property="materijalProizvoda", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Proizvod uspešno ažuriran"),
 *     @OA\Response(response=404, description="Proizvod nije pronađen")
 * )
 */

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

    /**
 * @OA\Delete(
 *     path="/api/products/{id}",
 *     summary="Brisanje proizvoda",
 *     tags={"Products"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID proizvoda",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(response=200, description="Proizvod obrisan"),
 *     @OA\Response(response=404, description="Proizvod nije pronađen")
 * )
 */

    public function destroy(Proizvod $proizvod)
    {
        $proizvod->delete();

        return response()->json([
            'message' => 'Product deleted'
        ]);
    }
}
