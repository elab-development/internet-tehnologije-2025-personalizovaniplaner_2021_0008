<?php

namespace App\Http\Controllers;

use App\Models\Kupac;
use App\Models\Administrator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    //Registracija novog kupca
    public function registerKupac(Request $request)
    {
        $validated = $request->validate([
            'ime' => 'required|string|max:100',
            'prezime' => 'required|string|max:100',
            'email' => 'required|email|unique:kupci,email',
            'adresa' => 'required|string|max:255',
            'telefon' => 'required|string|max:30',
            'lozinka' => 'required|string|min:6',
        ]);

        $validated['lozinka'] = Hash::make($validated['lozinka']);

        $kupac = Kupac::create($validated);

        return response()->json([
            'message' => 'Customer registered successfully',
            'kupac' => $kupac,
            'token' => $kupac->createToken('api_token')->plainTextToken,
        ], 201);
    }

    //Login kupca ili administratora istim endpointom
    
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'lozinka' => 'required|string',
        ]);

        $kupac = Kupac::where('email', $validated['email'])->first();

        if ($kupac && Hash::check($validated['lozinka'], $kupac->lozinka)) {
            return response()->json([
                'message' => 'Login successful',
                'role' => 'user',
                'user' => $kupac,
                'token' => $kupac->createToken('api_token')->plainTextToken,
            ]);
        }

        $admin = Administrator::where('email', $validated['email'])->first();

        if ($admin) {
            $adminPassword = $admin->lozinka;
            $isBcrypt = str_starts_with($adminPassword, '$2y$')
                || str_starts_with($adminPassword, '$2b$')
                || str_starts_with($adminPassword, '$2a$');

            $isValid = $isBcrypt
                ? Hash::check($validated['lozinka'], $adminPassword)
                : hash_equals($adminPassword, $validated['lozinka']);

            if ($isValid && !$isBcrypt) {
                $admin->lozinka = Hash::make($validated['lozinka']);
                $admin->save();
            }

            if ($isValid) {
                return response()->json([
                    'message' => 'Login successful',
                    'role' => 'admin',
                    'user' => $admin,
                    'token' => $admin->createToken('api_token')->plainTextToken,
                ]);
            }
        }

        throw ValidationException::withMessages([
            'email' => 'Invalid credentials.',
        ]);
    }

    //Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful',
        ]);
    }

    //Pronalaženje trenutnog korisnika
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }
}
