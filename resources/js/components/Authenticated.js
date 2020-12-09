import React from 'react';
import {publicUrl} from './Service';
import {Route,Redirect} from 'react-router-dom';

function Authenticated({ component: Component, authed, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authed === true ? (
            <Component {...props} exact={true} />
          ) : (
            <Redirect
              to={{
                pathname: `${publicUrl}/signin`,
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
  export default Authenticated;