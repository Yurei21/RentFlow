<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle(Request $request)
    {
        // Store the remember preference in session
        if ($request->query('remember') === '1') {
            $request->session()->put('google_remember', true);
        }

        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(Request $request)
    {
        try {
            // Socialite 5.x: no stateless()
            $googleUser = Socialite::driver('google')->user();

            $user = User::firstOrCreate(
                ['email' => $googleUser->getEmail()],
                ['name' => $googleUser->getName(), 'password' => bcrypt(uniqid())]
            );

            // Retrieve the remember flag from session
            $remember = $request->session()->pull('google_remember', false);
            Auth::login($user, $remember);

            return redirect('/dashboard');
        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Unable to login with Google.');
        }
    }
}
