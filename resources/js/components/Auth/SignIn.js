import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {publicUrl,Login} from '../Service';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

const SignIn = () => {
    const history = useHistory();
    const[error,setError] = useState([]);
    const[errormsg,setErrormsg] = useState('');
    const[loader,setLoader] = useState(false);
    const[data,setData] = useState({
        email : '',
        password : '',
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
            email:data.email,
            password:data.password
        };
       const response = await Login(postBody);
       console.log(response);
       if(response.success){
            setData({
                email : '',
                password : ''
            });
            setError({
                error:"",
            });
            localStorage.setItem("logindata",JSON.stringify(response));
           alert("User Login Successfully");
           history.replace(`${publicUrl}/project`);
       }else{
           //alert("Error"+ ' ' +response.message);
           setData({
                email : '',
                password : ''
            });
           setError({
               error:response.errors,
           });
           setErrormsg(response.message);
           localStorage.setItem('logindata',null);
       }
       setLoader(false);
    }
    return ( 
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 m-auto">
                        <div className="card mt-4">
                            <div className="card-header">
                                <h4 className="text-center">Sign Up</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={formSubmit}>
                                    {
                                        errormsg !=='' && (
                                            <Alert variant="filled" className="mb-2" severity="error" onClose={() => {setErrormsg('');}}>
                                            {errormsg}
                                            </Alert>
                                        )
                                    }
                                    <input type="text" name="email" value={data.email} onChange={inputEvent} className="form-control mb-2" placeholder="Enter Email Address ..." />
                                    {error.error && (<p className="text-danger">{error.error.email}</p>)}
                            
                                    <input type="password" name="password" value={data.password} onChange={inputEvent} className="form-control mb-2" placeholder="Enter password .." />
                                    {error.error && (<p className="text-danger">{error.error.password}</p>)}
                                    <div className="card-footer">
                                        {
                                            loader && (
                                                <button className="btn btn-primary" disabled>Siging...
                                                </button>
                                            )
                                        }
                                        {
                                            !loader &&(
                                                <button className="btn btn-primary">Sign In</button>
                                            )
                                        }
                                        <Link to={`${publicUrl}/signup`}> or create new Account</Link>
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
export default SignIn;