<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        sleep(1); // Demo loading icon
        $perPage = ((int) $request->query('per_page')) ?: 10;

        $keyword = $request->query('keyword');
        $likeQuery = "%$keyword%";

        $sortablesFields = [
            'id',
            'name',
            'email',
        ];
        $sortField = $request->query('sort', 'id');
        if (!in_array($sortField, $sortablesFields)) {
            $sortField = 'id';
        }
        $sortDir = $request->query('dir', 'asc');
        if ($sortDir != 'asc' && $sortDir != 'desc') {
            $sortDir = 'asc';
        }

        return User::where('name', 'like', $likeQuery)
            ->orWhere('email', 'like', $likeQuery)
            ->orderBy($sortField, $sortDir)
            ->paginate($perPage);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::create($request->all());
        if ($user->exists) {
            return response()->json([
                'success' => true,
                'message' => 'User has been created!',
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Unknown error... Please try again',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return $user;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return $user;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        if ($user->update($request->all())) {
            return response()->json([
                'success' => true,
                'message' => 'User has been updated!',
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Unknown error... Please try again',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
    }
}
