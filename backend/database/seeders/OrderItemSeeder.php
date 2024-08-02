<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OrderItem;

class OrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 30 sample order items
        OrderItem::factory()->count(30)->create();

        // Create a specific order item
        OrderItem::create([
            'order_id' => 1, // Assuming order ID 1 exists
            'product_id' => 1, // Assuming product ID 1 exists
            'product_quantity' => 2,
            'product_subtotal' => 59.98
        ]);
    }
}

