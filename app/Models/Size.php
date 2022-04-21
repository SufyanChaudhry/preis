<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Size extends Authenticatable
{
    protected $fillable = [
        'value',
    ];
}
