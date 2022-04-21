<?php

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Seeder;

class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sizes = ['XS', 'S', 'M', 'L', 'XL'];
        $data = [];
        foreach ($sizes as $size) {
            $row = [];
            $row['value'] = $size;
            $data[] = $row;
        }

        Size::insert($data);
    }
}
