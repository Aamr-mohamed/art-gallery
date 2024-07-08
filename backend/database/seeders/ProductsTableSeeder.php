<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        Product::create([
            'name' => 'Sunset on the Nile',
            'description' => 'Oil painting depicting a colorful sunset over the Nile river.',
            'price' => 500.00,
            'stock' => 1,
            'category' => 'Painting',
        ]);

        Product::create([
            'name' => 'Pharaonic Sculpture',
            'description' => 'Stone sculpture inspired by ancient Egyptian pharaohs.',
            'price' => 1200.00,
            'stock' => 1,
            'category' => 'Sculpture',
        ]);

    }
}

