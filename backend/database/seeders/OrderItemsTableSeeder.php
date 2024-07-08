<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OrderItem;
use App\Models\Order;
use App\Models\Product;

class OrderItemsTableSeeder extends Seeder
{
    public function run()
    {
        $order = Order::first(); // Assuming first order for simplicity
        $artworkA = Product::where('name', 'Sunset on the Nile')->first();
        $artworkB = Product::where('name', 'Pharaonic Sculpture')->first();

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $artworkA->id,
            'product_quantity' => 1,
            'product_subtotal' => $artworkA->price * 1,
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $artworkB->id,
            'product_quantity' => 1,
            'product_subtotal' => $artworkB->price * 1,
        ]);

    }
}

