<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class ProductVariant extends Authenticatable
{
    protected $fillable = [
        'product_id',
        'image',
        'color_id',
        'size_id',
        'price',
    ];

    public function color()
    {
        return $this->belongsTo('App\Models\Color');
    }

    public function size()
    {
        return $this->belongsTo('App\Models\Size');
    }
}
