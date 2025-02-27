<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ApiConfig;

class ApiConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $apiKey = 'AIzaSyDSlGtiJ8NuQoJZO7kJlRo--lcKb8-zyZ0'; 
        
        ApiConfig::create([
            'apiKey' => $apiKey,
        ]);

       
        $this->command->info('API key has been successfully seeded!');
    }
}