<?php
namespace App\interfaces;

use Illuminate\Http\Request;

interface Authinterface
{
    /**
     * checkIfAuthicated()
     * check if an user is authenticted or not by request
     * @param Request $request
     * @return bool ->true or false
     */
    public function checkIfAuthicated(Request $request);
    /**
     * findUserByEmail()
     * find an user by Email Address
     * @param $email
     * @return obj $user object
     */
    public function findUserByEmail($email);
    /**
     * register()
     * register a user by request form
     * @param Request $request
     * @return obj $user object
     */
    public function register(Request $request);
}