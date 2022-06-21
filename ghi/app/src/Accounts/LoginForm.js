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
    }

    validForm() {
        return this.state.password.length >= 8 &&
               this.state.username
    }

    render(){
        console.warn("Oops", this.state.showPassword);
        if (this.props.token) {
            return <Navigate to="/my_profile" />;
        }
        return(
        <section className='login'>
        <div className="row_login">
            <div className="offset-3 col-6" id="wrapper" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <div className="shadow p-4 mt-4" id="outbox" >
                    <div dangerouslySetInnerHTML={{__html: this.state.error}} />
                    <form onSubmit={this.handleSubmit} id="create-form" >
                        <h1>Sign In</h1>
                        <hr/>
                    
                        <div className="form-floating mb-3">
                            <input type='text' id="loginpage" name='username' placeholder='Username' 
                                required onChange={this.handleChange} />
                        </div>
                        <div className="form-floating mb-3" >
                            <div className='loginpass'>
                            <input type='password' id="loginpage" name='password' placeholder='Password' 
                                required onChange={this.handleChange} />
                            <button className='input-group-text bg-dark text-light'
                                    onClick={() => this.setState({showPassword: !this.state.showPassword})}>Show
                            </button>
                            </div>
                        </div>
                        <hr/>
                        <button onSubmit={this.handleSubmit} id='login_button' 
                            disabled={!this.validForm()} value="Submit" 
                            form="create-form" type="submit" >Log In</button>
                        </form>
                    </div>
                </div>
            </div>
            </section>
        )
    }
}


export default LoginForm
