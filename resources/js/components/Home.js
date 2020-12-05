import React from 'react';
import {Link} from 'react-router-dom';
import {publicUrl} from './Service';

const Home = () => {
    return (
        <>
            <h1 className="text-center text-capitalize mt-5">Home Page Add Very Soon</h1>
            <h3 className="text-center text-capitalize mt-5"><Link to={`${publicUrl}/project`}>Go to project page</Link></h3>
        </>
    );
}
export default Home;