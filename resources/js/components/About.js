import React from 'react';
import {Link} from 'react-router-dom';
import {publicUrl} from './Service';

const About = () => {
    return (
        <>
            <h1 className="text-center text-capitalize mt-5">About Page Add Very Soon</h1>
            <h3 className="text-center text-capitalize mt-5"><Link to={`${publicUrl}/project`}>Go to project page</Link></h3>
        </>
    );
}
export default About;