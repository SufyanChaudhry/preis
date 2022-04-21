<?php

namespace App\Http\Controllers;

use App\Models\Color;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(Request $request)
    {
    }

    public function index(Request $request)
    {
        return view('products');
    }

    public function getProducts(Request $request)
    {
        $products = Product::with(['product_variants', 'product_variants.color', 'product_variants.size'])
                     ->limit(30);

        if (!empty($request->colorId)) {
            $colorId = intval($request->colorId, 10);
            $products = $products->whereHas('product_variants', function ($query) use ($colorId) {
                $query->where('color_id', $colorId);
            });
        }

        if (!empty($request->sizeId)) {
            $sizeId = intval($request->sizeId, 10);
            $products = $products->whereHas('product_variants', function ($query) use ($sizeId) {
                $query->where('size_id', $sizeId);
            });
        }

        $products = $products->offset($request->offset)
                     ->get();

        $products = $products->map(function ($product, $key) {
            return  [
                'id' => $product->id,
                'name'  => $product->name,
                'details'  => $product->product_variants,
            ];
        });

        return $products;
    }

    public function getProductColors(Request $request)
    {
        $colors = Color::All();

        $colors = $colors->map(function ($color, $key) {
            return  [
                'id' => $color->id,
                'value'  => $color->value,
            ];
        });

        return $colors;
    }

    public function getProductSizes(Request $request)
    {
        $sizes = Size::All();

        $sizes = $sizes->map(function ($size, $key) {
            return  [
                'id' => $size->id,
                'value'  => $size->value,
            ];
        });

        return $sizes;
    }
}
