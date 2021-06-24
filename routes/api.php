<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CarController;



// Route::get('cars', [CarController::class, 'index']);
// Route::post('/add-car', [CarController::class, 'store']);
// Route::get('/edit-car/{id}', [CarController::class, 'edit']);

Route::resource('/cars',CarController::class);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

