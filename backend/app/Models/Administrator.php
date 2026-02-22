<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Administrator extends Model
{
    use HasApiTokens;
    protected $table = 'administratori';
    public $timestamps = false;

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
