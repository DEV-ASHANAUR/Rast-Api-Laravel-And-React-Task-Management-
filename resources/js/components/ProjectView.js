import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import {Link} from 'react-router-dom';
import {publicUrl} from './Service';
import TaskCreate from './TaskCreate';
import TaskList from './TaskList';
import ProjectEdit from './ProjectEdit';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';


const ProjectView = () =>{
    const {id} = useParams();
    const[tasks,setTasks] = useState([]);
    const[project,setProject] = useState({});
    const[toggle,setToggle] = useState(false);
    const[projecEdit,setprojecEdit] = useState(false);
    /**
     * toggler() use for task add component 
     *
     */
    const toggler = () =>{
        toggle ? setToggle(false) : setToggle(true);
    }
    /**
     * projectEditer() use for projectEdit component 
     *
     */
    const projectEditer = () =>{
        // when project edit component open then task add component closed
        setToggle(false);
        projecEdit ? setprojecEdit(false) : setprojecEdit(true);
    }
    const[load,setLoad] = useState(false);
    useEffect(()=>{
        getprojectdetails();
    },[]);
    /**
     * getprojectdetails() fetch project view details from server
     *
     */
    const getprojectdetails = async ()=>{
        setLoad(true);
        const res = await axios.get(`http://localhost/lara7/api/projects/${id}`);
        const project = res.data.data;
        const tasks = res.data.data.tasks;
        setProject(project);
        setTasks(tasks);
        setLoad(false);
    }    
    /**
     * taskComplete() use for task complete status 
     *
     * @param {*} taskfromadd
     */
    const taskComplete = (taskfromadd) =>{
        toggler();
        let task = tasks;
        task.unshift(taskfromadd);
        setTasks(task);
        getprojectdetails();
    }    
    /**
     * projectComplete() use for project complete status 
     *
     */
    const projectComplete = () =>{
        projectEditer();
        getprojectdetails();
    }    
    /**
     *  taskup() use for load view after task update
     *
     */
    const taskup = () =>{getprojectdetails();}
    return (
        <>
            <div className="container">
                {
                    projecEdit && 
                    (
                        <ProjectEdit ontoggle={projectEditer} proval={project} onCompleteProject={projectComplete} />
                    )
                }
                {
                    !projecEdit &&
                    (
                    <div className="card mt-3">
                        <div className="card-header">
                            <div className="float-left">
                                <h4 className="float-left mt-1 text-capitalize">Project Name ➡️ {project.name}  </h4>
                            </div>
                            <div className="float-right">
                                <button className={`btn btn-sm btn-outline-${project.status == 1 ?"success":"warning"} mr-2`} disabled>
                                {
                                    project.status == 1 && (
                                        <span> Complete </span>
                                    ) 
                                }
                                {
                                    project.status == 0 && (
                                        <span> Pending </span>
                                    ) 
                                }
                                </button>
                                <button className="btn btn-success btn-sm" onClick={projectEditer}> Edit Project </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5>Project Description ⬇️ </h5>
                            <span className="text-capitalize ml-4">{project.description}</span>
                        </div>
                        <div className="card-footer">
                            <div className="float-left">
                                <h5>Project Tasks  ⬇️ <span className="badge badge-success">{tasks.length}</span> </h5>
                            </div>
                            <div className="float-right">
                                {toggle && (
                                    <Button variant="contained" color="secondary" onClick={toggler}> <CloseIcon /></Button>
                                )}
                                {!toggle && (
                                    <Button variant="contained" color="primary" onClick={toggler}> <AddIcon /> Task</Button>
                                )}
                            </div>
                        </div>
                    </div>
                    )
                }
                <div className="row mb-5 ml-3">
                    {load && (<div className="loader">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>)}
                    {toggle && (
                        <TaskCreate project_id={id} onCompleteTask={taskComplete} />
                    )}

                    {tasks.map((val,index)=>(
                        <TaskList key={index} val={val} taskup={taskup} />
                    ))}       
                </div>
            </div>
        </>
    );
}
export default ProjectView;