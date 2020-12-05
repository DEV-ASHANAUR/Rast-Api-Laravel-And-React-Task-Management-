<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\TaskRepository;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    public $TaskRepository;
    public function __construct(TaskRepository $TaskRepository)
    {
        $this->TaskRepository = $TaskRepository;
    }
    /**
     * index() Get all Task list
     * @return response
     */
    public function index()
    {
        $Task = $this->TaskRepository->getall();
        //return $Task;
        return response()->json([
            'success' => true,
            'message' => 'Task List',
            'data' => $Task
        ]);
    }  
    /**
     * show() findById
     *
     * @param  mixed $id
     * @return response
     */
    public function show($id)
    {
        $Task = $this->TaskRepository->findById($id);
        //return $Task;
        if (is_null($Task)){
            return response()->json([
                'success' => false,
                'message' => 'Task Details',
                'data' => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Task Details',
            'data' => $Task
        ]);
    }
       
    /**
     * store
     *
     * @param  mixed $request
     * @return response
     */
    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData,[
            'name' => 'required',
            'description' => 'required',
            'project_id' => 'required'
        ],[
            'name.required' => 'Please give Task name',
            'description.required' => 'Please give Task Description',
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'error' => $validator->getMessageBag(),
            ]);
        }
        $Task = $this->TaskRepository->create($request);

        return response()->json([
            'success' => true,
            'message' => 'Task Stored',
            'data' => $Task
        ]);
    }
        
    /**
     * update
     *
     * @param  mixed $request
     * @param  mixed $id
     * @return response
     */
    public function update(Request $request,$id)
    {
        $Task = $this->TaskRepository->findById($id);
        if(is_null($Task)){
            return response()->json([
                'success' => false,
                'message' => 'Task not found',
                'data' => null
            ]);
        }
        $formData = $request->all();
        $validator = \Validator::make($formData,[
            'name' => 'required',
            'description' => 'required',
            'project_id' => 'required'
        ],[
            'name.required' => 'Please give Task name',
            'description.required' => 'Please give Task Description',
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
            ]);
        }
        $Task = $this->TaskRepository->edit($request,$id);

        return response()->json([
            'success' => true,
            'message' => 'Task updated',
            'data' => $Task
        ]);
    }    
    /**
     * destroy
     *
     * @param  mixed $id
     * @return response
     */
    public function destroy($id)
    {
        $Task = $this->TaskRepository->findById($id);
        if(is_null($Task)){
            return response()->json([
                'success' => false,
                'message' => 'Task not found',
                'data' => null
            ]);
        }
        
        $Task = $this->TaskRepository->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'Task Deleted',
            'data' => $Task
        ]);
    }
}
