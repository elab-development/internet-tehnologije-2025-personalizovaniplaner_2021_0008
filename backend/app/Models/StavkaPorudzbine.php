<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StavkaPorudzbine extends Model
{
    protected $table = 'stavke_porudzbine';

    protected $fillable = [
        'porudzbinaId',
        'rb',
        'proizvodId',
        'kolicina',
        'iznosStavke',
        'personalizacija',
    ];

    public function porudzbina()
    {
        return $this->belongsTo(Porudzbina::class, 'porudzbinaId');
    }

    public function proizvod()
    {
        return $this->belongsTo(Proizvod::class, 'proizvodId');
    }
}
