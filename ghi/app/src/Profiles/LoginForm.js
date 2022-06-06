import React from 'react';
import { Link, Navigate } from 'react-router-dom'


class LoginForm extends React.Component{
    state={
        username:'',
        password:'',
    }

    handleChange = (e) =>{
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.login(this.state.username, this.state.password);
    }

    render(){
        if (this.props.token) {
            return <Navigate to="/my_profile" />;
        }
        return(
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type='text' name='username' placeholder='username' required onChange={this.handleChange} />
                        <input type='password' name='password' placeholder='password' required onChange={this.handleChange} />
                        <button onSubmit={this.handleSubmit}>Log In</button>
                        <div>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default LoginForm
