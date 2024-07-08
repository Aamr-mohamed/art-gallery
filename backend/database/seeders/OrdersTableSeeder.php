<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\User;

class OrdersTableSeeder extends Seeder
{
    public function run()
    {
        $user = User::first();

        Order::create([
            'user_id' => $user->id,
            'order_number' => 'ORD-54321',
            'order_status' => 'pending',
            'order_total' => 1700.00, // Total of both artworks
        ]);

    }
}
