<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}

// class CarController extends Controller
// {
//     private $status = 200;
    
//     public function index()
//     {
        
//         $cars = Car::all();
//         return response()->json([
//             'status'=>200,
//             'students'=>$student,
//         ])
//     }
    

//     public function store(Request $request)
//     {
//         $validation = Validator::make($request->all(),
//         [
//             'description'  => 'required|max:191',
//             'model' => 'required|max:191',
//             'produced_on'  => 'required|date',
//             'image'=>'mimes:jpeg,jpg,png,gif|max:10000',
//         ]
//     );

//         if ($validation->fails()){
//             return response()->json([
//                 'validate_err'=>$validation->messages(),
//             ])
//         }
//         else{
//             $car=new Car();
//             $car->description=$request->input('description');
//             $car->model=$request->input('model');
//             $car->produced_on=$request->input('produced_on');
//             $car->image=$request->input('image');
//             $car->save();

//             return response()->json([
//                 'status'=>200,
//                 'message'=> 'Add successfully7=',
//             ])
//         }

