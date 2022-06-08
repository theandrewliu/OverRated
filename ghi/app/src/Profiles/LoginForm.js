import React from 'react';
import { Link, Navigate } from 'react-router-dom';


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

    validForm() {
        return this.state.password.length >= 8 &&
               this.state.username
    }

    render(){
        if (this.props.token) {
            return <Navigate to="/my_profile" />;
        }
        return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <div dangerouslySetInnerHTML={{__html: this.state.error}} />
                    <form onSubmit={this.handleSubmit} id="create-form" >
                        <div className="form-floating mb-3">
                            <input type='text' name='username' placeholder='username' required onChange={this.handleChange}  className="form-control"/>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type='password' name='password' placeholder='password' required onChange={this.handleChange}  className="form-control"/>
                            <label htmlFor="password">Password</label>
                        </div>
                        <button onSubmit={this.handleSubmit} disabled={!this.validForm()} className="btn btn-primary" value="Submit" form="create-form" type="submit">Log In</button>
                        </form>
                        <Link to="/login/new">SignUp</Link>
                    </div>
                </div>
            </div>
        )
    }
}


export default LoginForm
