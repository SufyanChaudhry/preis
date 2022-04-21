<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $colors = ['Red', 'Pink', 'Orange', 'Yellow', 'Purple', 'Green', 'Blue', 'Brown'];
        $data = [];
        foreach ($colors as $color) {
            $row = [];
            $row['value'] = $color;
            $data[] = $row;
        }

        Color::insert($data);
    }
}
