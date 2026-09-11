<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'room_name' => fake()->sentence(),
            'monthly_price'=> fake()->numberBetween(1000, 6000),
            'room_type' => 'Studio Type',
            'created_by' => 1,
            'modified_by' => 1,
        ];
    }
}
