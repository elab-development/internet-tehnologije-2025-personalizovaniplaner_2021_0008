<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Planer extends Model
{
    protected $table = 'planeri';

    protected $fillable = [
        'proizvodId',
        'bojaMetala',
        'postava',
        'brojDzepova',
    ];

    public function proizvod()
    {
        return $this->belongsTo(Proizvod::class, 'proizvodId');
    }
}
