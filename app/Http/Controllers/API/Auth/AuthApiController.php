<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\repositories\AuthRepository;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthApiController extends Controller
{
    public $authRepository;
    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }
    //create access token
    public function createToken()
    {
        $user = User::first();
        $accesstoken = $user->createToken('Token Name')->accessToken;
        return $accesstoken;
    }
    //login
    public function login(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData,[
            'email' => 'required|email',
            'password' => 'required',
        ],[
            'email.required' => 'Please give Email Address',
            'password.required' => 'Please give Password',
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Error !',
                'errors' => $validator->getMessageBag(),
            ]);
        }
        if($this->authRepository->checkIfAuthicated($request)){
            $user = $this->authRepository->findUserByEmail($request->email);
            $accesstoken = $user->createToken('Token Name')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Logged in successfully !!',
                'user' => $user,
                'access_token' =>$accesstoken,
            ]);

        }else{
            return response()->json([
                'success' => false,
                'message' => 'Sorry Invaild Email and Password',
                'errors' => null,
            ]);
        }    
    }
    //register user
    public function register(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData,[
            'name' => 'required|min:3|max:30',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:8',
        ],[
            'name.required' => 'Please give Your Name',
            'email.required' => 'Please give Email Address',
            'email.unique' => 'Please give unique Email Address or Login',
            'password.required' => 'Please give Password',
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'errors' => $validator->getMessageBag(),
            ]);
        }
        $user = $this->authRepository->register($request);
        if(!is_null($user)){
            $user = $this->authRepository->findUserByEmail($request->email);
            $accesstoken = $user->createToken('Token Name')->accessToken;
            return response()->json([
                'success' => true,
                'message' => ' Registation successfully !!',
                'user' => $user,
                'access_token' =>$accesstoken,
            ]);

        }else{
            return response()->json([
                'success' => false,
                'message' => 'Registation Failed',
                'errors' => null,
            ]);
        }    
    }
}
