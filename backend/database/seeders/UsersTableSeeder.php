<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Mohamed Ali',
            'email' => 'mohamed.ali@example.com',
            'phone' => '01012345678',
            'address' => 'Zamalek, Cairo, Egypt',
            'role' => 'customer',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'name' => 'Ahmed Mahmoud',
            'email' => 'ahmed.mahmoud@example.com',
            'phone' => '01234567890',
            'address' => 'Smouha, Alexandria, Egypt',
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        // Add more users as needed
    }
}
