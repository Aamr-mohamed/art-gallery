<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $imageNames = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg'];
        $randomImageName = 'images/' . $this->faker->randomElement($imageNames);
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 10, 100), // Prices between 10 and 100
            'stock' => $this->faker->numberBetween(0, 100),
            'image' => $randomImageName,
            'category' => $this->faker->randomElement(['Electronics', 'Clothing', 'Books']),
            'status' => '1', // Default to active
        ];
    }
}
