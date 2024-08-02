<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cart;

class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 10 sample carts
        Cart::factory()->count(10)->create();

        // Create a specific cart
        Cart::create([
            'user_id' => 1, // Assuming user ID 1 exists
        ]);
    }
}

