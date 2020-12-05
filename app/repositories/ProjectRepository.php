<?php
namespace App\repositories;

use App\interfaces\Crudinterface;
use App\Model\Project;
use Illuminate\Http\Request;

class ProjectRepository implements Crudinterface
{
    public function getall(){
        $projects = Project::withCount('tasks')->orderBy('id','asc')->get();
        return $projects;
    }
    public function findById($id){
        $project = Project::with('tasks')->find($id);
        return $project;
    }
    public function create(Request $request){
        $project = new Project();
        $project->name = $request->name;
        $project->description = $request->description;
        $project->user_id = $request->user_id;
        $project->save();
        return $project;
    }
    public function edit(Request $request,$id){
        $project = $this->findById($id);
        $project->name = $request->name;
        $project->description = $request->description;
        $project->user_id = $request->user_id;
        $project->status = $request->status;
        $project->save();
        return $project;
    }
    public function delete($id){
        $project = $this->findById($id);
        $project->tasks()->delete();
        $project->delete();
        return $project;
    }
}