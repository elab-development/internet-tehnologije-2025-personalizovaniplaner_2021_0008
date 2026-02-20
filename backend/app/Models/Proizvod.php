<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proizvod extends Model
{
    protected $table = 'proizvodi';

    protected $fillable = [
        'naziv',
        'tip',
        'opis',
        'cena',
        'cenaPopust',
        'kategorija',
        'dostupnaKolicina',
        'bojaProizvoda',
        'materijalProizvoda',
    ];

    public function planer()
    {
        return $this->hasOne(Planer::class, 'proizvodId');
    }

    public function stavkePorudzbine()
    {
        return $this->hasMany(StavkaPorudzbine::class, 'proizvodId');
    }
}
