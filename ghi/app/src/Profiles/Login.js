import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Login({Login, error}) {
    const [details, setDetails] = useState()
    return (
        <form>
            <div className="form-inner">
                <h2>Login</h2>
                {/* Error! */}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" />
                </div>
            </div>
        </form>
    )
}