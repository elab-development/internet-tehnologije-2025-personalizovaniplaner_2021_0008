<?php

namespace App\Http\Controllers;

use App\Models\Administrator;
use App\Models\Porudzbina;
use App\Models\StavkaPorudzbine;
use App\Models\Proizvod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PorudzbinaController extends Controller
{
   ////prikazuje sve porudzbine koje je kupac napravio
   /**
 * @OA\Get(
 *     path="/api/orders",
 *     summary="Prikaz svih porudžbina korisnika ili admina",
 *     tags={"Orders"},
 *     @OA\Response(response=200, description="Lista porudžbina")
 * )
 */

    public function index()
    {
        $user = Auth::guard('sanctum')->user();
        
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        if ($user instanceof Administrator) {
            $porudzbine = Porudzbina::with(['stavkePorudzbine.proizvod', 'kupac'])
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            $porudzbine = Porudzbina::where('kupacId', $user->id)
                ->with('stavkePorudzbine.proizvod')
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return response()->json($porudzbine);
    }

    /**
     * pravi novu porudzbinu na osnovu poslatih podataka o korpi i kreira stavke porudzbine, kao i smanjuje dostupnu kolicinu proizvoda
     */
    /**
 * @OA\Post(
 *     path="/api/orders",
 *     summary="Kreiranje nove porudžbine",
 *     tags={"Orders"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"cartItems","totalAmount","deliveryFee"},
 *             @OA\Property(property="cartItems", type="array",
 *                 @OA\Items(
 *                     @OA\Property(property="id", type="integer"),
 *                     @OA\Property(property="title", type="string"),
 *                     @OA\Property(property="price", type="number"),
 *                     @OA\Property(property="quantity", type="integer")
 *                 )
 *             ),
 *             @OA\Property(property="totalAmount", type="number"),
 *             @OA\Property(property="deliveryFee", type="number")
 *         )
 *     ),
 *     @OA\Response(response=201, description="Porudžbina kreirana")
 * )
 */

    public function store(Request $request)
    {
        $user = Auth::guard('sanctum')->user();
        
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'cartItems' => 'required|array|min:1',
            'cartItems.*.id' => 'required|integer',
            'cartItems.*.title' => 'required|string',
            'cartItems.*.price' => 'required|numeric',
            'cartItems.*.offerPrice' => 'nullable|numeric',
            'cartItems.*.quantity' => 'required|integer|min:1',
            'cartItems.*.personalizacija' => 'nullable|string',
            'totalAmount' => 'required|numeric|min:0',
            'deliveryFee' => 'required|numeric|min:0',
        ]);

        try {
            //porudžbina
            $porudzbina = Porudzbina::create([
                'kupacId' => $user->id,
                'datumKreirana' => now(),
                'status' => 'Pending',
                'ukupniIznos' => $validated['totalAmount'] + $validated['deliveryFee'],
            ]);

            //stavke porudzbine i update proizvoda
            foreach ($validated['cartItems'] as $index => $item) {
                $proizvod = Proizvod::find($item['id']);
                
                if (!$proizvod) {
                    return response()->json(['message' => "Product {$item['id']} not found"], 404);
                }

                // Provera dostupnosti proizvoda
                if ($proizvod->dostupnaKolicina < $item['quantity']) {
                    return response()->json(['message' => "There is no stock for {$item['title']}"], 422);
                }

                $proizvod->decrement('dostupnaKolicina', $item['quantity']);

                $price = $item['offerPrice'] ?? $item['price'];

                StavkaPorudzbine::create([
                    'porudzbinaId' => $porudzbina->id,
                    'rb' => $index + 1,
                    'proizvodId' => $item['id'],
                    'kolicina' => $item['quantity'],
                    'iznosStavke' => $price * $item['quantity'],
                    'personalizacija' => $item['personalizacija'] ?? null,
                ]);
            }

            return response()->json([
                'message' => 'Order created successfully',
                'porudzbina' => $porudzbina->load('stavkePorudzbine.proizvod'),
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating order: ' . $e->getMessage()], 500);
        }
    }

/**
 * @OA\Put(
 *     path="/api/orders/{id}",
 *     summary="Ažuriranje statusa porudžbine (admin)",
 *     tags={"Orders"},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"status"},
 *             @OA\Property(property="status", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Porudžbina ažurirana")
 * )
 */

    
    public function update(Request $request, Porudzbina $porudzbina)
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        if (!($user instanceof Administrator)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|string',
        ]);

        $porudzbina->status = $validated['status'];
        $porudzbina->save();

        return response()->json([
            'message' => 'Order updated successfully',
            'porudzbina' => $porudzbina->load('stavkePorudzbine.proizvod', 'kupac'),
        ]);
    }

    /**
 * @OA\Delete(
 *     path="/api/orders/{id}",
 *     summary="Brisanje porudžbine (samo admin)",
 *     tags={"Orders"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID porudžbine",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(response=200, description="Porudžbina obrisana"),
 *     @OA\Response(response=403, description="Zabranjen pristup"),
 *     @OA\Response(response=401, description="Nije autorizovan"),
 *     @OA\Response(response=404, description="Porudžbina nije pronađena")
 * )
 */

    public function destroy(Porudzbina $porudzbina)
    {
        //
    }
}
