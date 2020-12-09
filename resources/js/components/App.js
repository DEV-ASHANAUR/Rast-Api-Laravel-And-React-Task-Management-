import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Navbar from './Navbar';
  import Home from './Home';
  import About from './About';
  import Contact from './Contact';
  import Project from './Project';
  import {publicUrl,checkAuthenticated} from './Service';
  import ProjectCreate from './ProjectCreate';
  import ProjectView from './ProjectView';
  import SignUp from './Auth/SignUp';
  import SignIn from './Auth/SignIn';
  import Authenticated from './Authenticated';



function App() {
    const[user,setUser] = useState({});
    const[isLoggedIn,SetIsLoggedIn] = useState(false);

    useEffect(()=>{
        if(checkAuthenticated()){
            console.log("checkAuthenticated user data",checkAuthenticated());
            setUser({user:checkAuthenticated()});
            SetIsLoggedIn(true);
        }
    },[]);

    //console.log(isLoggedIn);

    return (
        <>
            <Router>
                <Navbar user={user} auth={isLoggedIn} />
                <Switch>
                    <Route exact path={`${publicUrl}`} component={()=> <Home /> } />
                    <Route exact path={`${publicUrl}/about`} component={()=> <About /> } />

                    <Authenticated
                        exact
                        path={`${publicUrl}/project`}
                        component={()=> <Project />}
                        authed={isLoggedIn} // or whatever method you use for checking auth
                    />

                    {/* <Route exact path={`${publicUrl}/project`} component={()=> <Project />} /> */}
                    <Route exact path={`${publicUrl}/project/view/:id`} component={()=> <ProjectView />} />
                    <Route exact path={`${publicUrl}/project/create`} component={()=> <ProjectCreate />} />
                    <Route exact path={`${publicUrl}/contact`} component={()=> <Contact /> } />
                    <Route exact path={`${publicUrl}/signin`} component={()=> <SignIn />} />
                    <Route exact path={`${publicUrl}/signup`} component={()=> <SignUp />} />
                </Switch>
            </Router>
        </>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
