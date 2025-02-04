<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiConfig extends Model
{
    use HasFactory;
    protected $table = 'api_configs';
    protected $primaryKey = 'id';

    protected $fillable = ['apiKey'];

    protected $hidden = [
        'apiKey',
        'created_at',
        'updated_at',
    ];


    
}
