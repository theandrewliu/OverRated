import React from 'react';
import { Link, Navigate } from 'react-router-dom'


class LoginForm extends React.Component{
    state={
        username:'',
        password:'',
        error: '',
    }

    handleChange = (e) =>{
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const error = await this.props.login(this.state.username, this.state.password);
        this.setState({ error: error })
    }

    render(){
        if (this.props.token) {
            return <Navigate to="/my_profile" />;
        }
        return(
            <div>
                <div>
                    <div dangerouslySetInnerHTML={{__html: this.state.error}} />
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type='text' name='username' placeholder='username' required onChange={this.handleChange} />
                        <label htmlFor="username">Username</label>
                        </div>
                    <div className="form-floating mb-3">
                        <input type='password' name='password' placeholder='password' required onChange={this.handleChange} />
                        <label htmlFor="password">Password</label>
                        </div>
                        <button onSubmit={this.handleSubmit}>Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}


export default LoginForm
