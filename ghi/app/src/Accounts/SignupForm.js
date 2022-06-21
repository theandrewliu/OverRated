import React from 'react';
import { Navigate } from 'react-router-dom';
import '../Profiles/profile.css';


class SignupForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            username: '',
            first_name:'',
            last_name:'',
            date_of_birth: '',
            location:'',
            password: '',
            verify_password: '',
            interested: [],
            showPassword: false,
            error: '',
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleDate_of_BirthChange = this.handleDate_of_BirthChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleInterestedChange = this.handleInterestedChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleVerify_PasswordChange = this.handleVerify_PasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { email, username, first_name, last_name, date_of_birth, interested, password } = this.state;
        const error = await this.props.signup(username, email, date_of_birth, interested, password);
        this.setState({ error });
        
        const url = `${process.env.REACT_APP_API_HOST}/api/profiles/profiles`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify({ email, username, first_name, last_name, date_of_birth, interested, password }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        };

        const response = await fetch(url, fetchConfig);
        if(response.ok){
            const accountform = await response.json();
            console.log(accountform);
            this.setState({
                email: '',
                username: '',
                first_name: '',
                last_name: '',
                location: '',
                interested: [],
                password: '',
                verify_password: '',
                error: '',
            });
        } else if (!response.ok){
            const message = ` An error: ${response.status} - ${response.statusText}`;
            throw new Error(message);
        }}
    
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
    handleDate_of_BirthChange(event) {
        const value = event.target.value;
        this.setState({ date_of_birth: value });
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
    handleInterestedChange(event) {
        const { value, checked } = event.target;
        console.log(event.target.name, "clicked");

        let listed = this.state.interested;
        let in_array = this.state.interested.includes(event.target.name);
        console.log(in_array, "in_array");
        console.log("CoCoBeansOnaMonday", `${value} is ${checked}`);

        if(checked) {
            listed.push(value);
            listed = listed.map(listed => ({interested: listed}));
            console.log("Rabbit", listed);
            
            this.setState({
                in_array: [ ...listed],
            });
            console.log("Jesus", in_array, listed)

        } else {
            listed.pop(value);
            this.setState({
                in_array: listed.filter((event) => event !== listed),
            });
            console.log("Throw Away", this.state, event.target.name);
        }
    }
    validForm() {
        return this.state.password.length >= 8 &&
               this.state.password === this.state.verify_password &&
               this.state.email &&
               this.state.username &&
               this.state.first_name &&
               this.state.last_name &&
               this.state.location &&
               this.state.interested &&
               this.state.date_of_birth;
    }
    
    render() {
        console.warn("Oops", this.state.showPassword);
        if (this.props.token) {
            return <Navigate to="/api/profiles/profiles" />;
        }

        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create an Account</h1>
                        <hr/>
                        <br></br>

                        <div dangerouslySetInnerHTML={{__html: this.state.error}} />
                        <form onSubmit={this.handleSubmit} id="create-form">
{/* ------------------------Email */}

                        <div className="form-floating mb-3">
                            <input onChange={this.handleEmailChange} value={this.state.email} 
                            placeholder="Email" required type="email" name="email" 
                            id="email" className="form-control" />
                            <label htmlFor="email">Email</label>
                        </div>
{/* ------------------------Username */}

                        <div className="form-floating mb-3">
                            <input onChange={this.handleUsernameChange} value={this.state.username} 
                            placeholder="Username" required type="text" name="username" 
                            id="username" className="form-control" />
                            <label htmlFor="username">Username</label>
                        </div>
{/* ------------------------First */}

                        <div className="form-floating mb-3" >
                            <input value={this.state.first_name} onChange={this.handleFirstNameChange}
                            placeholder="First Name" required type="text" name="first_name" 
                            id="first_name" className="form-control" />
                            <label htmlFor="first_name">First Name</label>
                        </div>
{/* ------------------------Last */}

                        <div className="form-floating mb-3" >
                            <input value={this.state.last_name} onChange={this.handleLastNameChange}
                            placeholder="Last Name" required type="text" name="last_name" 
                            id="last_name" className="form-control" />
                            <label htmlFor="last_name">Last name</label>
                        </div>
{/* ------------------------Date */}

                        <div className="form-floating mb-3">
                            <input onChange={this.handleDate_of_BirthChange} value={this.state.date_of_birth} 
                            placeholder="DOB" required type="date" name="date" 
                            id="date" className="form-control" />
                            <label htmlFor="date">Date of Birth</label>
                        </div>
{/* ------------------------Location */}

                        <div className="form-floating mb-3">
                            <input onChange={this.handleLocationChange} value={this.state.location} 
                            placeholder="Location" required type="text" name="location" 
                            id="location" className="form-control" />
                            <label htmlFor="location">Location</label>
                        </div>
{/* ------------------------Interested */}

                        <label htmlFor="interested">Interested In:</label>
                            <div className="form-check m-3" require onChange={this.handleInterestedChange} >

                                <input type="checkbox" id={this.state.interested}
                                    value="male" name="interested" />&nbsp;Men &nbsp;&nbsp;&nbsp;

                                <input type="checkbox" id={this.state.interested}
                                    value="female"  name="interested" />&nbsp;Women &nbsp;&nbsp;

                                <input type="checkbox" id={this.state.interested}
                                    value="other" name="interested" />&nbsp;Everyone! &nbsp;&nbsp;
                            </div>
{/* ------------------------Password */}

                        <div className="form-floating mb-3" onChange={this.handlePasswordChange}>
                            <div className='passwords'>
                            <input  value={this.state.password} 
                                placeholder="Password" required type={this.state.showPassword ? "text" : "password"} name="password" 
                                id="password" className="form-control" /> 
                            <button className='input-group-text bg-dark text-light'
                                    onClick={() => this.setState({showPassword: !this.state.showPassword})}>Show
                            </button>
                            </div>
                            <label htmlFor="password">Password</label>
                        </div>
{/* ------------------------Password */}

                        <div className="form-floating mb-3"  onChange={this.handleVerify_PasswordChange}>
                        <div className='passwords'>
                            <input value={this.state.verify_password} 
                                placeholder="Verify Password" required type={this.state.showPassword ? "text" : "password"} name="verify-password" 
                                id="verify-password" className="form-control" />
                            <button className='input-group-text bg-dark text-light'
                                    onClick={() => this.setState({showPassword: !this.state.showPassword})}>Show
                            </button>
                        </div>
                            <label htmlFor="verify-password">Verify Password</label>
                        </div>

                        <div>
                            <input type="checkbox" id="terms_condition" value="terms_condition" />
                            <label for="terms_condition">&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.youtube.com/watch?v=oHg5SJYRHA0&ab_channel=cotter548">
                                Terms and Conditions</a></label>
                        </div>
                        <br></br>
                        <button disabled={!this.validForm()} className="btn btn-primary">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default SignupForm;
