<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 20 sample products
        Product::factory()->count(20)->create();

        // Create a specific product
        Product::create([
            'name' => 'Sample Product',
            'description' => 'This is a sample product.',
            'price' => 29.99,
            'stock' => 100,
            'image' => 'sample-product.jpg',
            'category' => 'Electronics',
            'status' => '1'
        ]);
    }
}

