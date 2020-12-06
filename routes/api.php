<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('projects','API\ProjectsController');
Route::apiResource('task','API\TasksController');

Route::get('auth/create-token', 'API\Auth\AuthApiController@createToken');

Route::post('auth/login', 'API\Auth\AuthApiController@login');
Route::post('auth/reg', 'API\Auth\AuthApiController@register');


