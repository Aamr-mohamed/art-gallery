<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::middleware('auth:sanctum')->get('/check-auth', [AuthController::class, 'checkAuth']);

Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::get('users', 'getUsers');
    Route::get('user/{id}', 'getUserById');
    Route::delete('user/{id}', 'deleteUser');
    Route::patch('user/{id}', 'updateUser');
    Route::get('/check-auth','checkAuth');

});

// Product routes
Route::controller(ProductController::class)->group(function () {
    Route::get('products', 'index');
    Route::get('products/{id}', 'show');
    Route::post('products', 'store');
    Route::patch('products/{id}', 'update');
    Route::delete('products/{id}', 'destroy');
});

// Order routes
Route::controller(OrderController::class)->group(function () {
    Route::get('orders', 'index');
    Route::get('orders/{id}', 'show');
    Route::patch('orders/{id}', 'updateStatus');
});

Route::controller(CartController::class)->group(function () {
    Route::post('/cart', 'addToCart');
    Route::get('/cart', 'getCart');
    Route::put('/cart/{id}', 'updateCart');
    Route::delete('/cart/{id}', 'removeFromCart');
});

Route::post('/checkout', [CheckoutController::class, 'checkout']);
