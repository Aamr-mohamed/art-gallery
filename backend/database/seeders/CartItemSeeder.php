<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CartItem;

class CartItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 30 sample cart items
        CartItem::factory()->count(30)->create();

        // Create a specific cart item
        CartItem::create([
            'cart_id' => 1, // Assuming cart ID 1 exists
            'product_id' => 2, // Assuming product ID 2 exists
            'quantity' => 3
        ]);
    }
}

