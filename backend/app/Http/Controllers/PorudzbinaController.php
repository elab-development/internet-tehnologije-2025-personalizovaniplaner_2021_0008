<?php

namespace App\Http\Controllers;

use App\Models\Porudzbina;
use App\Models\StavkaPorudzbine;
use App\Models\Proizvod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PorudzbinaController extends Controller
{
   ////prikazuje sve porudzbine koje je kupac napravio
    public function index()
    {
        $user = Auth::guard('sanctum')->user();
        
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $porudzbine = Porudzbina::where('kupacId', $user->id)
            ->with('stavkePorudzbine.proizvod')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($porudzbine);
    }

    /**
     * pravi novu porudzbinu na osnovu poslatih podataka o korpi i kreira stavke porudzbine, kao i smanjuje dostupnu kolicinu proizvoda
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


    
    public function update(Request $request, Porudzbina $porudzbina)
    {
        //
    }

    
    public function destroy(Porudzbina $porudzbina)
    {
        //
    }
}
