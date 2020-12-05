import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {publicUrl} from './Service';
import Pagination from "react-js-pagination";
import ProjectList from './ProjectList';

const Project = () => {
    const[project,setProject] = useState([]);
    const[searchval,setSearchval] = useState(0);
    const[load,setLoad] = useState(false);
    const todosPerPage = 3;
    const [ activePage, setCurrentPage ] = useState( 1 );
    useEffect(()=>{
        getdata();
    },[]);
    /**
     * getdata() fetch all project data from server
     *
     */
    const getdata = async() =>{
        setLoad(true);
        const res = await axios.get(`http://localhost/lara7/api/projects`);
        const project = res.data.data;
        setProject(project);
        // setsearchList(project);
        console.log("data",currentTodos);
        setLoad(false);
    }
     // Logic for displaying current todos
     const indexOfLastTodo  = activePage * todosPerPage;
     const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
     const currentTodos     = project.slice( indexOfFirstTodo, indexOfLastTodo );

    const handlePageChange = ( pageNumber ) => {
        console.log( `active page is ${ pageNumber }` );
        setCurrentPage( pageNumber );
        // getdata();
     };
    //delete project
    const deleteProjecton = () =>{
        getdata();
    }
    //search project
    const searchProject = (e) =>{
        setLoad(true);
        const SearchText = e.target.value;
        console.log(SearchText.length);
        setSearchval(SearchText.length);
        if(SearchText.length > 0){
            const searchData = project.filter(function(item){
                const itemData = item.name + " " + item.description;
                const textData = SearchText.trim().toLowerCase();
                return itemData.trim().toLowerCase().indexOf(textData) !== -1;
            });
            // setsearchList(searchData);;
            setProject(searchData);
            // getdata();
            setLoad(false);
        }else{
            getdata();
        }
    }
    return (
        <>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h4 className="float-left mt-1">Project List  </h4>
                        <span className="badge badge-success">{project.length}</span>
                        <Link to={`${publicUrl}/project/create`} className="btn btn-sm btn-success float-right">Create Project</Link>
                        <input type="text" onChange={searchProject} className="form-control mr-sm-2" placeholder="Search Project.." />
                    </div>
                </div>
                <div className="row mb-5">
                    {load && (<div className="loader">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>)}
                    {
                        project.length == 0 && (<h3 className="ml-5 mt-4"> No Project Found ! </h3>) 
                    }
                    {
                       searchval > 0 ? project.map((val,index)=>(
                        <ProjectList key={index} si={index} val={val} onDeleteProject={deleteProjecton} />
                        )):currentTodos.map((val,index)=>(
                            <ProjectList key={index} si={index} val={val} onDeleteProject={deleteProjecton} />
                        ))  
                    }
                    {
                        project.length > 0 && searchval == 0 &&(
                            <div>
                                <Pagination
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activePage={ activePage }
                                    itemsCountPerPage={ 3 }
                                    totalItemsCount={ project.length }
                                    pageRangeDisplayed={ 3 }
                                    onChange={ handlePageChange }
                                />
                            </div>
                        ) 
                    }
                    
                </div>
            </div>
        </>
    );
}
export default Project;