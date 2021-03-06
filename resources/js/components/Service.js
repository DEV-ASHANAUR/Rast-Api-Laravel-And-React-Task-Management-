export const publicUrl = "/lara7";
import axios from "axios";

export const checkAuthenticated = () =>{
    const getlogindata = localStorage.getItem('logindata');
    console.log(getlogindata);
    if(getlogindata != null){
        const data = JSON.parse(getlogindata);
        if(data.success && data.access_token !== null){
            return data.user;
        }else{
            return false;
        }
    }else{
        return false;
    }
    
    //console.log('getlogindata',getlogindata);
}
/**
 *
 * storeData() insert project data
 * @param {*} data
 * @return {*} 
 */
export const storeData = async(data) => {
    data.user_id = 1;
    const res = await axios.post(`http://localhost/lara7/api/projects`,data);
    return res.data;
    //console.log("data",res);
    //console.log("data", data);
}
/**
 * editProject() edit project
 *
 * @param {*} id
 * @param {*} data
 * @return {*} 
 */
export const editProject = async(id,data) => {
    data.user_id = 1;
    const res = await axios.put(`http://localhost/lara7/api/projects/${id}`,data);
    return res.data;
    //console.log("data",res);
    //console.log("data", data);
}
/**
 * storeTask() store task data
 *
 * @param {*} data
 * @return {*} 
 */
export const storeTask = async(data) =>{
    //console.log("data",data);
    const res = await axios.post(`http://localhost/lara7/api/task`,data);
    return res.data;
}
/**
 * updatetask() update task data
 *
 * @param {*} id
 * @param {*} data
 * @return {*} 
 */
export const updatetask = async(id,data) =>{
    //console.log("data",data);
    const res = await axios.put(`http://localhost/lara7/api/task/${id}`,data);
    return res.data;
}/**
 *
 * deleteTask() delete task
 * @param {*} id
 * @return {*} 
 */
export const deleteTask = async(id) =>{
    const res = await axios.delete(`http://localhost/lara7/api/task/${id}`);
    return res.data;
}
 /**
 *
 * projectDelete() delete project data
 * @param {*} id
 * @return {*} 
 */
export const projectDelete = async(id)=>{
    const res = await axios.delete(`http://localhost/lara7/api/projects/${id}`);
    //console.log(res.data);
    return res.data;
}
/**
 * registation() store user_reg data
 *
 * @param {*} data
 * @return {*} 
 */
export const registation = async(data)=>{
    console.log("data",data);
    const res = await axios.post(`http://localhost/lara7/api/auth/reg`,data);
    return res.data;
}
/**
 * Login() check user data
 *
 * @param {*} data
 * @return {*} 
 */
export const Login = async(data)=>{
    console.log("data",data);
    const res = await axios.post(`http://localhost/lara7/api/auth/login`,data);
    return res.data;
}
