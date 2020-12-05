import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {publicUrl,editProject} from './Service';


const ProjectEdit = (props) => {
    const history = useHistory();
    const[error,setError] = useState([]);
    const[loader,setLoader] = useState(false);
    const[data,setData] = useState({
        name : props.proval.name,
        description : props.proval.description,
        status : props.proval.status
    });
    const inputEvent = (event) =>{
        const{name,value} = event.target;
        setData((preValue)=>{
            return {
                ...preValue,
                [name] : value
            }
        });
    }
    const formSubmit = async(e) =>{
        setLoader(true);
        e.preventDefault();
        const postBody = {
            name:data.name,
            description:data.description,
            status:data.status,
        };
       const response = await editProject(props.proval.id,postBody);
       if(response.success){
           alert("Porject Update Successfully");
        // history.push(`${publicUrl}/project`);
           props.onCompleteProject(); 
       }else{
           //alert("Error"+ ' ' +response.message);
           setError({
               error:response.errors,
           });
       }
       setLoader(false);
       //console.log(error);
       //console.log("getSubmitData",getSubmitData);
    }
    const cancletoggle = () =>{
        props.ontoggle();
    }
    return ( 
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 m-auto">
                        <div className="card mt-4">
                            <div className="card-header">
                                <div className="float-left">
                                    <h4 className="text-center">Edit Project</h4>
                                </div>
                                <div className="float-right">
                                    <button onClick={cancletoggle} className="btn btn-sm btn-danger"> Cancle Edit</button>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={formSubmit}>
                                
                                    {error.error && (<p className="text-danger">{error.error.name}</p>)}
                                    <input type="text" name="name" value={data.name} onChange={inputEvent} className="form-control mb-2" placeholder="Enter Title" />

                                    {/* {error.error && (<p>{error.error[1]}</p>)} */}
                                    {error.error && (<p className="text-danger">{error.error.description}</p>)}

                                    <textarea name="description" value={data.description} onChange={inputEvent} className="form-control mb-2" rows="5" placeholder="Enter Description.."></textarea>

                                    <select name="status" onChange={inputEvent} className="form-control">
                                        <option value={0} selected={data.status == 0 && (true)}>Pending</option>
                                        <option value={1} selected={data.status == 1 && (true)}>Complete</option>
                                    </select>

                                    <div className="card-footer">
                                        {
                                            loader && (
                                                <button className="btn btn-primary w-100 d-block" disabled>Updating...
                                                </button>
                                            )
                                        }
                                        {
                                            !loader &&(
                                                <button className="btn btn-primary w-100 d-block">Update</button>
                                            )
                                        }
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
export default ProjectEdit;