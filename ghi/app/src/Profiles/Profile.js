import React from "react";
import { Redirect } from "react-router-dom";

function Profile({ authorized }) {

    if(!authorized) {
        return <Redirect to="/" />;
    }
    return <div>I'm Batman</div>;

    
}

export default Profile;