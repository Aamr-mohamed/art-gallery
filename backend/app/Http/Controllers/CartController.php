<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\Product;

class CartController extends Controller
{
    // Apply middleware to ensure the user is authenticated if needed
    public function __construct()
    {
        // $this->middleware('auth'); // Uncomment if you want to enforce authentication
    }

    public function addToCart(Request $request)
    {
        // Validate the request
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'user_id' => 'required|exists:users,id'
        ]);

        // Get the user ID from the request
        $userId = $request->user_id;

        // Find or create a cart item for this user
        $cartItem = CartItem::updateOrCreate(
            [
                'user_id' => $userId,
                'product_id' => $request->product_id
            ],
            [
                'quantity' => $request->quantity
            ]
        );

        // Return the updated cart for the user
        return response()->json(['cart' => CartItem::where('user_id', $userId)->get()], 200);
    }

    public function getCart(Request $request)
    {
        $userId = $request->user_id;

        $cartItems = CartItem::where('user_id', $userId)->get(['id', 'product_id', 'quantity']); // Ensure IDs are included

        return response()->json(['cart' => $cartItems], 200);
    }

    public function updateCart(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $userId = $request->user_id;

        // Debugging output
        \Log::info("Updating cart item. User ID: $userId, Cart Item ID: $id");

        // Find the cart item for this user and update it
        $cartItem = CartItem::where('id', $id)->where('user_id', $userId)->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json(['cart' => CartItem::where('user_id', $userId)->get()], 200);
    }


    public function removeFromCart(Request $request, $id)
    {
        // Get the authenticated user's ID
        $userId = $request->user_id;

        // Find and delete the cart item for this user
        $cartItem = CartItem::where('id', $id)->where('user_id', $userId)->firstOrFail();
        $cartItem->delete();

        return response()->json(['cart' => CartItem::where('user_id', $userId)->get()], 200);
    }
}
