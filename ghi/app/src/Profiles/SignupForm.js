import React from 'react';
import { Link, Navigate } from 'react-router-dom';


class SignupForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            username: '',
            first_name:'',
            last_name:'',
            dob: '',
            location:'',
            password: '',
            verify_password: '',
            error: '',
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleDobChange = this.handleDobChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleVerify_PasswordChange = this.handleVerify_PasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { email, username, dob, password } = this.state;
        const error = await this.props.signup(username, email, dob, password);
        this.setState({ error });
    }

    handleEmailChange(event) {
        const value = event.target.value;
        this.setState({ email: value });
    }
    handleUsernameChange(event) {
        const value = event.target.value;
        this.setState({ username: value });
    }
    handleFirstNameChange(event) {
        const value = event.target.value;
        this.setState({ first_name: value });
    }
    handleLastNameChange(event) {
        const value = event.target.value;
        this.setState({ last_name: value });
    }
    handleDobChange(event) {
        const value = event.target.value;
        this.setState({ dob: value });
    }
    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({ location: value });
    }
    handlePasswordChange(event) {
        const value = event.target.value;
        this.setState({ password: value });
    }
    handleVerify_PasswordChange(event) {
        const value = event.target.value;
        this.setState({ verify_password: value });
    }

    validForm() {
        return this.state.password.length >= 8 &&
               this.state.password === this.state.verify_password &&
               this.state.email &&
               this.state.username &&
               this.state.first_name &&
               this.state.last_name &&
               this.state.location &&
               this.state.dob;
    }

    render() {
        if (this.props.token) {
            return <Navigate to="/my_profile" />;
        }
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Overrated Sign Up Form</h1>
                        <div dangerouslySetInnerHTML={{__html: this.state.error}} />
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
                            <input onChange={this.handleFirstNameChange} value={this.state.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleLastNameChange} value={this.state.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                            <label htmlFor="last_name">Last name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleDobChange} value={this.state.dob} placeholder="DOB" required type="date" name="date" id="date" className="form-control" />
                            <label htmlFor="date">DOB</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleLocationChange} value={this.state.location} placeholder="Location" required type="text" name="location" id="location" className="form-control" />
                            <label htmlFor="location">Location</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handlePasswordChange} value={this.state.password} placeholder="Password" required type="password" name="password" id="password" className="form-control" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleVerify_PasswordChange} value={this.state.verify_password} placeholder="Verify Password" required type="password" name="verify-password" id="verify-password" className="form-control" />
                            <label htmlFor="verify-password">Verify Password</label>
                        </div>
                        <button disabled={!this.validForm()} className="btn btn-primary">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default SignupForm
