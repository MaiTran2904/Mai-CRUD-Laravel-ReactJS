<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Psr7\Message;
use App\Models\Car;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    private $status = 200;
    
    public function index()
    {       
        $cars=Car::all();
        if(count($cars)>0){
            return response()->json(["status"=>$this->status,"success"=>true,"count"=>count($cars),"data"=>$cars]);
        }else{
            return response()->json(["status"=>"failed","success"=>false,"message"=>"Whoopa! no record found"]);            
        }
    }

    
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(),
        [
            "description"  => "required",
            "model" => "required",
            "produced_on"  => "required|date",
            "image"  => "required",

            'image'=>'mimes:jpeg,jpg,png,gif|max:10000'
        ],
        [   
            'description.required' => 'Bạn chưa nhập description!',
            'model.required' => 'Bạn chưa nhập model!',
            'produced_on.required' => 'Bạn chưa nhập produced_on!',
            'image.required'=>'Bạn chưa thêm image!',
        ]);
    

        if ($validation->fails()){
            return response()->json(
                ["status" => "error", "errors" => $validation->getMessageBag()
            ]);
        }
         //nếu dùng $this->validate() thì lấy về lỗi: $errors = $vali
        //kiểm tra file tồn tại
        $name='';
        
        if($request->hasfile('image'))
        {
            $this->validate($request, 
                [
                //Kiểm tra đúng file đuôi .jpg,.jpeg,.png.gif và dung lượng không quá 2M
                    'image' => 'mimes:jpg,jpeg,png,gif|max:2048',
                ],          
                [
                //Tùy chỉnh hiển thị thông báo không thõa điều kiện
                    'image.mimes' => 'Chỉ chấp nhận hình thẻ với đuôi .jpg .jpeg .png .gif',
                    'image.max' => 'Hình thẻ giới hạn dung lượng không quá 2M',
                ]);
            
            $file = $request->file('image');
            $name=time().'_'.$file->getClientOriginalName();
            $destinationPath=public_path('images'); //project\public\images\cars, //public_path(): trả về đường dẫn tới thư mục public
            $file->move($destinationPath, $name); //lưu hình ảnh vào thư mục public/images/cars
        } //hết if
        
        $car=new Car();
        $car->description=$request->input('description');
        $car->model=$request->input('model');
        $car->produced_on=$request->input('produced_on');
        $car->image=$name;
        $car->save();

        if($car) 
        {            
            return response()->json(["status" => $this->status, "data" => $car]);
        }    
        else 
        {
            return response()->json(["status" => "error", "errors" => $validation->getMessageBag()]);
        }
    }
        
    public function show($id) {
        $car = Car::find($id);
        if(!is_null($car)) {
            return response()->json(["status" => $this->status, "success" => true, "data" => $car]);
        }
        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! no car found"]);
        }

    }

    public function destroy($id)
    {
        $car=Car::find($id);
        $car->delete();
        return response()->json([
            'message' => 'Car deleted'
        ]);
    } 

    public function update(Request $request, $id) {
        $validation = Validator::make($request->all(),
        [
            "description"  => "required",
            "model" => "required",
            "produced_on"  => "required|date",
            "image"  => "required",
            'image'=>'mimes:jpeg,jpg,png,gif|max:10000'
        ],
        );

        if ($validation->fails()){
            return response()->json(
                ["status" => "error", "errors" => $validation->getMessageBag()
            ]);
        }
        // else{

        //kiểm tra file tồn tại
        $name='';
        
        if($request->hasfile('image'))
        {
            $this->validate($request, 
                [
                //Kiểm tra đúng file đuôi .jpg,.jpeg,.png.gif và dung lượng không quá 2M
                    'image' => 'mimes:jpg,jpeg,png,gif|max:2048',
                ],          
                [
                //Tùy chỉnh hiển thị thông báo không thõa điều kiện
                    'image.mimes' => 'Chỉ chấp nhận hình thẻ với đuôi .jpg .jpeg .png .gif',
                    'image.max' => 'Hình thẻ giới hạn dung lượng không quá 2M',
                ]);
            
            $file = $request->file('image');
            $name=time().'_'.$file->getClientOriginalName();
            $destinationPath=public_path('images'); //project\public\images\cars, //public_path(): trả về đường dẫn tới thư mục public
            $file->move($destinationPath, $name); //lưu hình ảnh vào thư mục public/images/cars
        } //hết if


        $car=Car::find($id);
        if (!is_null($car)){
            $car->description=$request->input('description');
            $car->model=$request->input('model');
            $car->produced_on=$request->input('produced_on');
            if($name==''){ 
                $name=$car->image;
            } 
            $car->image=$name;
            $car->save();
            
           if($car) 
        {            
            return response()->json(["status" => $this->status, "data" => $car]);
        }    
        else 
        {
            return response()->json(["status" => "error", "errors" => $validation->getMessageBag()]);
        }

        }
   //}//đóng else

    }
}
