<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Porudzbina extends Model
{
    protected $table = 'porudzbine';

    protected $fillable = [
        'kupacId',
        'datumKreirana',
        'datumPoslata',
        'status',
        'ukupniIznos',
    ];

    protected $casts = [
        'datumKreirana' => 'date',
        'datumPoslata' => 'date',
    ];

    public function kupac()
    {
        return $this->belongsTo(Kupac::class, 'kupacId');
    }

    public function stavkePorudzbine()
    {
        return $this->hasMany(StavkaPorudzbine::class, 'porudzbinaId');
    }
}
