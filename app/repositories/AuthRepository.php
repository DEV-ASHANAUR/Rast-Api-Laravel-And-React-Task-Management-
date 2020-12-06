<?php

namespace App\repositories;
use App\interfaces\Authinterface;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthRepository implements Authinterface
{
    public function checkIfAuthicated(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            return true;
        }else{
            return false;
        }
    }
    public function findUserByEmail($email)
    {
        $user = User::where('email',$email)->first();
        return $user;
    }
    public function register(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        return $user;
    }
}