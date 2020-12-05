import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {publicUrl,storeTask} from './Service';

const TaskCreate = (props) =>{
    const[data,setData] = useState({
        name:'',
        description:'',
    });
    const [error,setError] = useState([]);
    const[loader,setLoader] = useState(false);
    const inputEvent = (event) =>{
        const{name,value} = event.target;
        setData((preValue)=>{
            return{
                ...preValue,
                [name]:value,
            }
        });
    }
    const formSubmit = async(e) =>{
        setLoader(true);
        e.preventDefault();
        const postbody = {
            name:data.name,
            description:data.description,
            project_id:props.project_id,
        };
        const response = await storeTask(postbody);
        //console.log(response.data);
        if(response.success){
            setData({
                name:'',
                description:'',
            });
            props.onCompleteTask(response.data);
        }else{
            setError({
                error:response.error,
            });
        }
        setLoader(false);
    }
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 m-auto">
                        <div className="card mt-4">
                            <div className="card-body">
                                <form onSubmit={formSubmit}>
                                    {error.error && (<p className="text-danger">{error.error.name}</p>)}
                                    <input type="text" name="name" value={data.name} onChange={inputEvent} className="form-control mb-2" placeholder="Enter Title" />
                                    {/* {error.error && (<p>{error.error[1]}</p>)} */}
                                    {error.error && (<p className="text-danger">{error.error.description}</p>)}
                                    <textarea 
                                     name="description" value={data.description} onChange={inputEvent} className="form-control mb-2" rows="5" placeholder="Enter Description.."></textarea>
                                    <div className="card-footer">
                                        {
                                            loader && (
                                                <button className="btn btn-primary w-100 d-block" disabled>Saving...
                                                </button>
                                            )
                                        }
                                        {
                                            !loader &&(
                                                <button className="btn btn-primary w-100 d-block">Save</button>
                                            )
                                        }
                                        {/* <button className="btn btn-primary w-100 d-block">Save</button> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    );
}
export default TaskCreate;