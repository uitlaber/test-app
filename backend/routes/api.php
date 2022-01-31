<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\ShortLinksController;
use App\Http\Resources\API\UserResource;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


// Protected routes
Route::middleware('auth:sanctum')->group(function () {    

    Route::prefix('links')->group(function () {
        Route::get('', [ShortLinksController::class, 'index'])->name('links.index');     
        Route::post('/create', [ShortLinksController::class, 'store'])->name('links.create');
        Route::delete('/delete/{id}', [ShortLinksController::class, 'destroy'])->name('links.delete');
    });


    Route::get('user', function () {
        return new UserResource(auth()->user());
    });

    Route::post('logout', [AuthController::class, 'logout']);
});


