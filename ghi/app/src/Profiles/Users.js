import React from "react";
import { Redirect } from "react-router-dom";

function Users({ authorized }) {

    if(!authorized) {
        return <Redirect to="/" />;
    }
    return <div>I'm Batman</div>;

    
}

export default Users;