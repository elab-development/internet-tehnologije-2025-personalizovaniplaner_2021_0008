<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kupac extends Model
{
    protected $table = 'kupci';

    protected $fillable = [
        'ime',
        'prezime',
        'email',
        'adresa',
        'telefon',
        'lozinka',
    ];

    protected $hidden = [
        'lozinka',
    ];

    public function porudzbine()
    {
        return $this->hasMany(Porudzbina::class, 'kupacId');
    }
}
