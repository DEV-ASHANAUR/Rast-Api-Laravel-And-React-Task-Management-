<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\repositories\ProjectRepository;
use Illuminate\Http\Request;

class ProjectsController extends Controller
{
    public $projectRepository;
    public function __construct(ProjectRepository $ProjectRepository)
    {
        $this->projectRepository = $ProjectRepository;
    }
    /**
     * index() Get all project list
     * @return response
     */
    public function index()
    {
        $project = $this->projectRepository->getall();
        //return $project;
        return response()->json([
            'success' => true,
            'message' => 'Project List',
            'data' => $project
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
        $project = $this->projectRepository->findById($id);
        //return $project;
        if (is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'Project Details',
                'data' => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Project Details',
            'data' => $project
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
            'user_id' => 'required'
        ],[
            'name.required' => 'Please give Project name',
            'description.required' => 'Please give Project Description',
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'errors' => $validator->getMessageBag(),
            ]);
        }
        $project = $this->projectRepository->create($request);

        return response()->json([
            'success' => true,
            'message' => 'Project Stored',
            'data' => $project
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
        $project = $this->projectRepository->findById($id);
        if(is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'project not found',
                'data' => null
            ]);
        }
        $formData = $request->all();
        $validator = \Validator::make($formData,[
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required'
        ],[
            'name.required' => 'Please give Project name',
            'description.required' => 'Please give Project Description',
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
            ]);
        }
        $project = $this->projectRepository->edit($request,$id);

        return response()->json([
            'success' => true,
            'message' => 'Project updated',
            'data' => $project
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
        $project = $this->projectRepository->findById($id);
        if(is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'project not found',
                'data' => null
            ]);
        }
        
        $project = $this->projectRepository->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'Project Deleted',
            'data' => $project
        ]);
    }
}
