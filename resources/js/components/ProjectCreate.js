import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {publicUrl,storeData} from './Service';


const ProjectCreate = () => {
    const history = useHistory();
    const[error,setError] = useState([]);
    const[loader,setLoader] = useState(false);
    const[data,setData] = useState({
        name : '',
        description : ''
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
        };
       const response = await storeData(postBody);
       if(response.success){
            setData({
                name:'',
                description:''
            });
           alert("Porject Added Successfully");
           history.push(`${publicUrl}/project`);
       }else{
           //alert("Error"+ ' ' +response.message);
           setError({
               error:response.errors,
           });
       }
       setLoader(false);
    }
    return ( 
        <>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h4 className="float-left mt-1">Project Create</h4>
                        <Link to={`${publicUrl}/project`} className="btn btn-sm btn-success float-right">Project List</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-12 m-auto">
                        <div className="card mt-4">
                            <div className="card-header">
                                <h4 className="text-center">Create Project</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={formSubmit}>
                                    {error.error && (<p className="text-danger">{error.error.name}</p>)}
                                    <input type="text" name="name" value={data.name} onChange={inputEvent} className="form-control mb-2" placeholder="Enter Title" />
                                    {/* {error.error && (<p>{error.error[1]}</p>)} */}
                                    {error.error && (<p className="text-danger">{error.error.description}</p>)}
                                    <textarea name="description" value={data.description} onChange={inputEvent} className="form-control mb-2" rows="5" placeholder="Enter Description.."></textarea>

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
export default ProjectCreate;