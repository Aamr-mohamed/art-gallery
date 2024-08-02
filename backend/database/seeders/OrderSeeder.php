<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 15 sample orders
        Order::factory()->count(15)->create();

        // Create a specific order
        Order::create([
            'order_number' => 'ORD123456',
            'user_id' => 1, // Assuming user ID 1 exists
            'order_status' => 'processing',
            'order_date' => now(),
            'order_total' => 199.99
        ]);
    }
}

