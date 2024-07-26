<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'image',
        'category',
        'status'
    ];

    protected static function booted()
    {
        static::saving(function ($product) {
            $product->status = $product->stock > 0 ? '1' : '0';
        });
    }
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
