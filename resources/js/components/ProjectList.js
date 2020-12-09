import React from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {publicUrl,projectDelete} from './Service';

const ProjectList = (props) =>{
    //delete project
    const deleteProject = async(id) => {
        if(window.confirm("Are You Sure ?")){
            const response = await projectDelete(id);
            if(response.success){
                alert("deleted");
                props.onDeleteProject();
            }else{
                alert("Error");
            }
        }
    }
    return(
        <>
            <div className="col-12">
                <div className="card my-2">
                    <div className="card-header">
                        {/* <h3>{props.si+1}</h3> */}
                        <h5 className="card-title text-capitalize"> <span>{props.si+1}</span> . Project Name ➡️{props.val.name} <span className="badge badge-warning">{props.val.tasks_count}</span> </h5>
                    </div>
                    <div className="card-body">
                        <h5>Project Description ⬇️ </h5>
                        <p className="card-text text-capitalize">{props.val.description}</p>
                    </div>
                    <div className="card-footer">
                        <Link to={`${publicUrl}/project/view/${props.val.id}`} className="btn btn-primary btn-sm mr-2">View & Edit </Link>
                        <button onClick={()=>deleteProject(props.val.id)} className="btn btn-danger btn-sm mr-2">Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProjectList;