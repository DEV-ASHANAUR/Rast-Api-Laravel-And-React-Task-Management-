import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {publicUrl,registation} from '../Service';

const SignUp = () => {
    const history = useHistory();
    const[error,setError] = useState([]);
    const[loader,setLoader] = useState(false);
    const[data,setData] = useState({
        name : '',
        email : '',
        password : '',
        password_confirmation : ''
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
            email:data.email,
            password:data.password,
            password_confirmation:data.password_confirmation
        };
       const response = await registation(postBody);
       console.log(response);
       if(response.success){
            setData({
                name : '',
                email : '',
                password : '',
                password_confirmation : ''
            });
            setError({
                error:"",
            });
            localStorage.setItem("logindata",JSON.stringify(response));
           alert("User Register Successfully");
        //    history.push(`${publicUrl}/project`);
       }else{
           //alert("Error"+ ' ' +response.message);
           setError({
               error:response.errors,
           });
           localStorage.setItem('logindata',null);
       }
       setLoader(false);
    }
    return ( 
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-sm-12 m-auto">
                        <div className="card mt-4">
                            <div className="card-header">
                                <h4 className="text-center">Sign Up</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={formSubmit}>

                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <input type="text" name="name" value={data.name} onChange={inputEvent} className="form-control mb-2" placeholder="Enter Title" />
                                            {error.error && (<p className="text-danger">{error.error.name}</p>)}
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" name="email" value={data.email} onChange={inputEvent} className="form-control mb-2" placeholder="Enter Email Address ..." />
                                            {error.error && (<p className="text-danger">{error.error.email}</p>)}
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <input type="password" name="password" value={data.password} onChange={inputEvent} className="form-control mb-2" placeholder="Enter password .." />
                                            {error.error && (<p className="text-danger">{error.error.password}</p>)}
                                        </div>
                                        <div className="col-md-6">
                                            <input type="password" name="password_confirmation" value={data.password_confirmation} onChange={inputEvent} className="form-control mb-2" placeholder="Enter Confirm Password ..." />
                                            {error.error && (<p className="text-danger">{error.error.password_confirmation}</p>)}
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        {
                                            loader && (
                                                <button className="btn btn-primary" disabled>Siging...
                                                </button>
                                            )
                                        }
                                        {
                                            !loader &&(
                                                <button className="btn btn-primary">Sign Up</button>
                                            )
                                        }
                                        <Link to={`${publicUrl}/signin`}> or login here</Link>
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
export default SignUp;