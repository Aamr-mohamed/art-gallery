<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_number' => $this->faker->unique()->numerify('ORD######'),
            'user_id' => User::factory(),
            'order_status' => $this->faker->randomElement(['pending', 'processing', 'completed']),
            'order_date' => $this->faker->dateTimeThisYear(),
            'order_total' => $this->faker->randomFloat(2, 50, 500),
        ];
    }
}

