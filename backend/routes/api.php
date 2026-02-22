<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProizvodController;

use App\Http\Controllers\PorudzbinaController;
Route::post('/kupci/register', [AuthController::class, 'registerKupac']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/proizvodi', [ProizvodController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/porudzbine', [PorudzbinaController::class, 'index']);
    Route::post('/porudzbine', [PorudzbinaController::class, 'store']);
});