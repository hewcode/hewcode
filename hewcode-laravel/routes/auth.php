<?php

use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [\Hewcode\Hewcode\Panel\Controllers\Auth\RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [\Hewcode\Hewcode\Panel\Controllers\Auth\RegisteredUserController::class, 'store'])
        ->name('register.store');

    Route::get('login', [\Hewcode\Hewcode\Panel\Controllers\Auth\AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [\Hewcode\Hewcode\Panel\Controllers\Auth\AuthenticatedSessionController::class, 'store'])
        ->name('login.store');

    Route::get('forgot-password', [\Hewcode\Hewcode\Panel\Controllers\Auth\PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [\Hewcode\Hewcode\Panel\Controllers\Auth\PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [\Hewcode\Hewcode\Panel\Controllers\Auth\NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [\Hewcode\Hewcode\Panel\Controllers\Auth\NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', \Hewcode\Hewcode\Panel\Controllers\Auth\EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', \Hewcode\Hewcode\Panel\Controllers\Auth\VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [\Hewcode\Hewcode\Panel\Controllers\Auth\EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [\Hewcode\Hewcode\Panel\Controllers\Auth\ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [\Hewcode\Hewcode\Panel\Controllers\Auth\ConfirmablePasswordController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('password.confirm.store');

    Route::post('logout', [\Hewcode\Hewcode\Panel\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
