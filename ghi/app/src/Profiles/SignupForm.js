import React from 'react';
import { Link } from 'react-router-dom';

// username: str
// email: str
// password: str
// first_name: str
// last_name: str
// location: str
// date_of_birth: date
// interested: Interested

class SignupForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            username: '',
            dob: '',
            password: '',
            verify_password: '',
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleDobChange = this.handleDobChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleVerify_PasswordChange = this.handleVerify_PasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};

                    // need to find localhost
        const signup_formUrl = "http://localhost:8090/api/signup/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(signup_formUrl, fetchConfig);
        if(response.ok){
            const signupform = await response.json();
            console.log(signupform)
            this.setState({
                email: '',
                username: '',
                dob: '',
                password: '',
                verify_password: '',
            });
    }
}

    handleEmailChange(event) {
        const value = event.target.value;
        this.setState({ email: value });
    }
    handleUsernameChange(event) {
        const value = event.target.value;
        this.setState({ username: value });
    }
    handleDobChange(event) {
        const value = event.target.value;
        this.setState({ dob: value });
    }
    handlePasswordChange(event) {
        const value = event.target.value;
        this.setState({ password: value });
    }
    handleVerify_PasswordChange(event) {
        const value = event.target.value;
        this.setState({ verify_password: value });
    }
// if statement for password
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Overrated Sign Up Form</h1>
                        <form onSubmit={this.handleSubmit} id="create-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleEmailChange} value={this.state.email} placeholder="Email" required type="email" name="email" id="email" className="form-control" />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleUsernameChange} value={this.state.username} placeholder="Username" required type="text" name="username" id="username" className="form-control" />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleDobChange} value={this.state.dob} placeholder="DOB" required type="date" name="date" id="date" className="form-control" />
                            <label htmlFor="date">DOB</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handlePasswordChange} value={this.state.password} placeholder="Password" required type="password" name="password" id="password" className="form-control" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleVerify_PasswordChange} value={this.state.verify_password} placeholder="Verify Password" required type="password" name="verify-password" id="verify-password" className="form-control" />
                            <label htmlFor="verify-password">Verify Password</label>
                        </div>
                        <button className="btn btn-primary">Sign Up</button>
                        <div>
                            <Link to="/login">Login</Link>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default SignupForm