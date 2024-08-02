<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use App\Models\Product;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        // Validate the request
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'cart_items' => 'required|array',
            'cart_items.*.product_id' => 'required|exists:products,id',
            'cart_items.*.quantity' => 'required|integer|min:1',
        ]);

        // Begin transaction
        \DB::beginTransaction();

        try {
            $userId = $request->user_id;
            $cartItems = $request->cart_items;

            // Create an order
            $order = Order::create([
                'user_id' => $userId,
                'order_number' => 'ORD-' . strtoupper(uniqid()),
                'order_status' => 'Pending',
                'order_total' => 0, // Will be calculated later
            ]);

            $orderTotal = 0;

            // Add order items and calculate total
            foreach ($cartItems as $item) {
                $product = Product::find($item['product_id']);
                $subtotal = $product->price * $item['quantity'];

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'product_quantity' => $item['quantity'],
                    'product_subtotal' => $subtotal,
                ]);

                $orderTotal += $subtotal;
            }

            // Update order total
            $order->update(['order_total' => $orderTotal]);

            // Clear the cart for this user
            CartItem::where('user_id', $userId)->delete();

            // Commit transaction
            \DB::commit();

            return response()->json(['message' => 'Order placed successfully', 'order_id' => $order->id], 200);

        } catch (\Exception $e) {
            // Rollback transaction if something fails
            \DB::rollBack();
            return response()->json(['message' => 'Failed to place order', 'error' => $e->getMessage()], 500);
        }
    }
}
