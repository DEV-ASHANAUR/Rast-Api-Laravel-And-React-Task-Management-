import React from 'react';
import {updatetask,deleteTask} from './Service';

const TaskList = (props) =>{
    const taskstatus = async(task) =>{
        if(task.status === 1){
            task.status = 0;
        }else{
            task.status = 1;
        }
        const response = await updatetask(task.id,task);
        console.log(response);
        if(response.success){
            props.taskup();
        }else{
            alert("error");
        }
    }
    //task delete
    const taskDelete = async(id) =>{
        if(window.confirm("Are You Sure ?")){
            const response = await deleteTask(id);
            if(response.success){
                alert('deleted');
                props.taskup();
            }else{
                alert("error");
            }
        }
    }
    return (
        <>
            <div className="col-12">
                <div className="card my-2">
                    <div className="card-header">
                        <div className="float-left">
                            {props.val.status == 1 && (
                                <del className="text-success" title="Task Complete">
                                    <h5 className="card-title text-capitalize"> Task Title ➡️{props.val.name}  </h5>
                                </del>
                            )}
                            {props.val.status ==0 && (
                                <h5 className="card-title text-capitalize"> Task Title ➡️{props.val.name}  </h5>
                            )}
                        </div>
                        <div className="float-right">
                            <button className={`btn btn-sm btn-outline-${props.val.status == 1 ? "success":"info"}`} onClick={()=>taskstatus(props.val)}>
                                {
                                    props.val.status == 1 && (
                                        <span> Mark As Panding </span>
                                    )
                                }
                                {
                                    props.val.status == 0 && (
                                        <span> Mark As Complete </span>
                                    )
                                }
                            </button>
                            <button className="btn btn-sm btn-outline-danger ml-2" disabled={props.val.status == 1 && true } onClick={()=>taskDelete(props.val.id)}>Delete</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <h5>Task Description ⬇️ </h5>
                        <p className="card-text text-capitalize">{props.val.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default TaskList;