<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;

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

// Public routes (no authentication required)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Authentication
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Projects CRUD
    Route::prefix('projects')->group(function () {
        Route::get('/', [ProjectController::class, 'index']);
        Route::post('/generate', [ProjectController::class, 'generate']);
        Route::get('/{id}', [ProjectController::class, 'show']);
        Route::put('/{id}', [ProjectController::class, 'update']);
        Route::delete('/{id}', [ProjectController::class, 'destroy']);
        
        // AI Chat for project
        Route::post('/{id}/chat', [ProjectController::class, 'handleChat']);
    });

    // Portfolio routes (optional - if you have portfolio controller)
    // Route::get('/portfolio', [PortfolioController::class, 'index']);
    // Route::put('/profile', [ProfileController::class, 'update']);
});

// Health check route (optional but recommended)
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now(),
        'service' => 'Ryder AI Project Generator'
    ]);
});

// Fallback for undefined API routes
Route::fallback(function () {
    return response()->json([
        'message' => 'API endpoint not found. Please check the documentation.',
        'status' => 404
    ], 404);
});