import React from 'react';
import { Navigate } from 'react-router-dom';


class AccountForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            username: "",
            first_name: "",
            last_name: "",
            password: "",
            verify_password: "",
            error: "",
            redirect: false,
            profile: ""
    };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirst_nameChange = this.handleFirst_nameChange.bind(this);
        this.handleLast_nameChange = this.handleLast_nameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleVerify_PasswordChange = this.handleVerify_PasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async getMyDetails() {
        const url = `${process.env.REACT_APP_API_HOST}/api/profiles/mine`;
        const response = await fetch(url, {
            credentials: 'include',
        });
        
        if (response.ok) {
            const profile = await response.json();
            
            this.setState({
                profile: profile,
                email: profile.email,
                username: profile.username,
                first_name: profile.first_name,
                last_name: profile.last_name,
        });
        }else if (response.status === 401){
        this.setState({redirect: true})
        }
    }
    componentDidMount() {
        this.getMyDetails();
      }


    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};
        delete data.redirect
        delete data.error
        delete data.profile
        delete data.verify_password

        const url = `${process.env.REACT_APP_API_HOST}/api/accounts/myself`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        };

        const response = await fetch(url, fetchConfig);
        if(response.ok){
            this.setState({
                redirect: true
            });
            
            if (response.ok) {
                this.setState({
                    profile: await response.json(),
                });
                }else if (response.status === 401){
                this.setState({redirect: true})
        }
    }
    }

    handleEmailChange(event) {
        const value = event.target.value;
        this.setState({ email: value });
    }

    handleFirst_nameChange(event) {
        const value = event.target.value;
        this.setState({ first_name: value });
    }
    handleLast_nameChange(event) {
        const value = event.target.value;
        this.setState({ last_name: value });
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
               this.state.first_name &&
               this.state.last_name
    }

    render(){
        if(this.state.redirect === true){
            return <Navigate to ='/my_profile'/>;
        }
        return(
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <div dangerouslySetInnerHTML={{__html: this.state.error}} />
                    <h1>Account Settings</h1>
                    <hr/>
                    <br></br>
                    <h3>Username: {this.state.profile.username}</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleEmailChange} value={this.state.email} placeholder="placeholder there" required type="email" name="email" id="email" className="form-control" />
                        </div>
                    
                        <label htmlFor="first_name">First Name</label>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleFirst_nameChange} value={this.state.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                        </div>
                    
                        <label htmlFor="last_name">Last Name</label> 
                        <div className="form-floating mb-3">
                            <input onChange={this.handleLast_nameChange} value={this.state.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                        </div>
                    
                        <div className="form-floating mb-3" >
                            <input onChange={this.handlePasswordChange} value={this.state.password} 
                                placeholder="Password" required type="password" name="password" id="password" />
                            <input onChange={this.handleVerify_PasswordChange} value={this.state.verify_password} 
                                placeholder="Verify Password" required type="password" name="verify-password" id="verify-password" />
                            <button disabled={!this.validForm()} className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        )
    }
    }


export default AccountForm;
