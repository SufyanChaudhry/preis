<?php

namespace Database\Seeders;

use App\Models\Color;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Size;
use Faker\Generator;
use Illuminate\Container\Container;
use Illuminate\Database\Seeder;

class ProductVariantSeeder extends Seeder
{
    protected $faker;

    public function __construct()
    {
        $this->faker = Container::getInstance()->make(Generator::class);
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Product::All();
        $colors = Color::All()->toArray();
        $sizes = Size::All()->toArray();

        $data = [];

        foreach ($products as $product) {
            $row = [];
            $row['product_id'] = $product['id'];
            $row['image'] = $this->faker->imageUrl($width = 200, $height = 200);
            $row['color_id'] = array_rand($colors) + 1;
            $row['size_id'] = array_rand($sizes) + 1;
            $row['price'] = $this->faker->numberBetween(5, 500);
            $data[] = $row;
        }

        ProductVariant::insert($data);
    }
}
