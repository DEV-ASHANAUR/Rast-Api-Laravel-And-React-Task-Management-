<?php
namespace App\repositories;

use App\interfaces\Crudinterface;
use App\Model\Task;
use Illuminate\Http\Request;

class TaskRepository implements Crudinterface
{
    public function getall(){
        $Tasks = Task::orderBy('id','desc')->get();
        return $Tasks;
    }
    public function findById($id){
        $Task = Task::with('project')->find($id);
        return $Task;
    }
    public function create(Request $request){
        $Task = new Task();
        $Task->name = $request->name;
        $Task->description = $request->description;
        $Task->status = 0;
        $Task->project_id = $request->project_id;
        $Task->save();
        return $Task;
    }
    public function edit(Request $request,$id){
        $Task = $this->findById($id);
        $Task->name = $request->name;
        $Task->description = $request->description;
        $Task->status = $request->status;
        $Task->project_id = $request->project_id;
        $Task->save();
        return $Task;
    }
    public function delete($id){
        $Task = $this->findById($id);
        $Task->delete();
        return $Task;
    }
}