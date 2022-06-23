import React from 'react';
import { Navigate } from 'react-router-dom';
import '../CSS/login.css';

class LoginForm extends React.Component{
    state={
        username:'',
        password:'',
        showPassword: false,
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
        this.setState({
            username: '',
            password: '',
            showPassword: false,
        });
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
    
        <div className='login'>
            <div className="row_login">
                <div className="offset-3 col-6" id="wrapper" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <div className="shadow p-4 mt-4" id="outbox" >
                        <div dangerouslySetInnerHTML={{__html: this.state.error}} />
                        <form onSubmit={this.handleSubmit} id="login-form" >
                            <h1>Log In</h1>
                            <hr/>
                        
                            <div className="form-floating mb-3">
                                <input type='text' id="loginpagepass" name='username' placeholder='Username' 
                                    required onChange={this.handleChange} />
                            </div>
                            <div className="form-floating mb-3" >
                                <input type={this.state.showPassword ? "text" : "password"} id="loginpagepass" name='password' placeholder='Password' 
                                    required onChange={this.handleChange} />

                                <button className='input-group-text bg-dark text-light' type="button"
                                    onClick={() => this.setState({showPassword: !this.state.showPassword})}>Show Password
                                </button>
                            </div>
                            <hr/>
                            <div>
                                <button 
                                    type="submit"
                                    disabled={!this.validForm()} 
                                    className="btn btn-primary" form="login-form">Log In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
       
        )
    }
       
}


export default LoginForm
