<?php

use Illuminate\Support\Facades\Route;

Route::get('/api/documentation', function () {
    return view('l5-swagger::index', [
        'documentation' => 'default',
        'useAbsolutePath' => false, // ili true, zavisno da li želiš apsolutne URL-ove
    ]);
});

Route::get('/api/docs', function () {
    return response()->file(storage_path('api-docs/api-docs.json'));
});