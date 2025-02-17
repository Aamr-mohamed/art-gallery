<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|string|email',
                'password' => 'required|string'
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');

        // Check if the email exists in the database
        $user = User::where('email', $credentials['email'])->first();

        if (!$user) {
            return response()->json(['message' => 'The email address is not registered.'], 404);
        }

        // If email exists, check the password
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'The password is incorrect.'], 401);
        }

        // Authentication passed, return success response
        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'user' => $user
        ]);
    }/* Register API */
    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'phone' => 'required|string|min:10',
                'address' => 'required|string|min:10',
                'role' => 'string|min:10',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'role' => $request->role,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User Registered Successfully',
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function getUsers(Request $request)
    {
        return response()->json(['message' => 'Users found', 'users' => User::all()]);
    }
    public function getUserById(Request $request)
    {
        return response()->json(['message' => 'User found', 'user' => User::find($request->id)]);
    }
    public function deleteUser(Request $request)
    {
        $user = User::find($request->id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted', 'user' => $user]);
    }
    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255|nullable',
            'email' => 'sometimes|email|unique:users,email,' . $id . '|nullable',
            'phone' => 'sometimes|string|max:20|nullable',
            'address' => 'sometimes|string|nullable',
            'role' => 'sometimes|string|nullable',
            'password' => 'sometimes|nullable|confirmed|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->only(['name', 'email', 'phone', 'address', 'role']);

        $data = array_filter($data, function ($value) {
            return !is_null($value);
        });

        if ($request->has('password')) {
            $data['password'] = Hash::make($request->input('password'));
        }

        $user->update($data);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }
}
