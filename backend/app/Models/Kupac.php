<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Kupac extends Model
{
    use HasApiTokens;
    protected $table = 'kupci';
    public $timestamps = false;

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
