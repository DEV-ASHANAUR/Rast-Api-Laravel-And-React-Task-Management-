import React, { useState } from 'react';
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
  import {publicUrl} from './Service';
  import ProjectCreate from './ProjectCreate';
  import ProjectView from './ProjectView';
  import SignUp from './Auth/SignUp';
  import SignIn from './Auth/SignIn';



function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path={`${publicUrl}`} component={()=> <Home /> } />
                    <Route exact path={`${publicUrl}/about`} component={()=> <About /> } />
                    <Route exact path={`${publicUrl}/project`} component={()=> <Project />} />
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
