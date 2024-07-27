<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
public function index()
{
$orders = Order::with('items', 'user')->get();
return response()->json($orders);
}

public function show($id)
{
$order = Order::with('items', 'user')->find($id);
if (!$order) {
return response()->json(['message' => 'Order not found'], 404);
}
return response()->json($order);
}

public function updateStatus(Request $request, $id)
{
$order = Order::find($id);
if (!$order) {
return response()->json(['message' => 'Order not found'], 404);
}
$order->update(['order_status' => $request->order_status]);
return response()->json(['message' => 'Order status updated successfully']);
}
}