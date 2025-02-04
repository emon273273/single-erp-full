<?php

use App\Http\Controllers\ApiconfigController;
use Illuminate\Support\Facades\Route;

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


Route::middleware("permission:create-apiConfig")->post("/", [ApiconfigController::class, 'createApiConfig']);

// Route::middleware("permission:readAll-announcement")->get("/", [AnnouncementController::class, 'getAllAnnouncement']);

 Route::middleware("permission:readSingle-apiConfig")->get("/{id}", [ApiconfigController::class, 'getApiConfig']);

// Route::middleware("permission:update-announcement")->put("/{id}", [AnnouncementController::class, 'updateSingleAnnouncement']);

 Route::middleware("permission:delete-apiConfig")->patch("/{id}", [ApiconfigController::class, 'deleteApiConfig']);
