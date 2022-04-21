<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'ProductController@index');
Route::post('products-listing', 'ProductController@getProducts');
Route::post('products-colors', 'ProductController@getProductColors');
Route::post('products-sizes', 'ProductController@getProductSizes');
