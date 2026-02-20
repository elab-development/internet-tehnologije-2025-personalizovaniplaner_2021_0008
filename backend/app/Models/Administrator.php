<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Administrator extends Model
{
    protected $table = 'administratori';

    protected $fillable = [
        'ime',
        'prezime',
        'email',
        'korisnickoIme',
        'lozinka',
    ];

    protected $hidden = [
        'lozinka',
    ];
}
