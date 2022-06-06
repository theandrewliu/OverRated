import React from 'react';
import { Navigate } from 'react-router-dom'



class AccountForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            username: '',
            first_name: "",
            last_name: "",
            location: "",
            password: '',
            verify_password: '',
            error: '',

    };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirst_nameChange = this.handleFirst_nameChange.bind(this);
        this.handleLast_nameChange = this.handleLast_nameChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleVerify_PasswordChange = this.handleVerify_PasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async deleteAccount(account_id){
        const deleteUrl =  `http://localhost:8000/api/profiles/$(account_id)`;
        const fetchConfig = {method: "delete"}

        const response = await fetch(deleteUrl, fetchConfig);
        if(response.ok){
            console.log(response);
            window.location.reload();
        }
    };


    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};

        const account_Url = "http://localhost:8090";
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(account_Url, fetchConfig);
        if(response.ok){
            const accountform = await response.json();
            console.log(accountform);
            this.setState({
                email: "",
                username: '',
                first_name: "",
                last_name: "",
                location: "",
                password: '',
                verify_password: '',
                error: '',
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
    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({ location: value });
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


    render(){
        if (this.props.token) {
            return <Navigate to="/my_profile" />;
        }
        return(
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <div dangerouslySetInnerHTML={{__html: this.state.error}} />
                    <h1>CatFish Editor</h1>
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleEmailChange} value={this.state.email} placeholder="Email" required type="email" name="email" id="email" className="form-control" />
                        <label htmlFor="email">Email</label>
                    </div>
                    <button disabled={!this.validForm()} className="btn btn-primary">Apply Changes</button>
                    </form>

                    <form onSubmit={this.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleLocationChange} value={this.state.location} placeholder="Location" required type="text" name="location" id="location" className="form-control" />
                        <label htmlFor="location">Location</label>
                    </div>
                    <button disabled={!this.validForm()} className="btn btn-primary">Apply Changes</button>
                    </form>

                    <form onSubmit={this.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleFirst_nameChange} value={this.state.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                        <label htmlFor="first_name">First Name</label>
                    </div>
                    <button disabled={!this.validForm()} className="btn btn-primary">Apply Changes</button>
                    </form>

                    <form onSubmit={this.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleLast_nameChange} value={this.state.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                        <label htmlFor="last_name">Last Name</label> 
                    </div>
                    <button disabled={!this.validForm()} className="btn btn-primary">Apply Changes</button>
                    </form>

                    <form onSubmit={this.handleSubmit}>
                    <div className="form-floating mb-3">
                            <input onChange={this.handleUsernameChange} value={this.state.username} placeholder="Username" required type="text" name="username" id="username" className="form-control" />
                            <label htmlFor="username">Username</label>
                        </div>
                        <button disabled={!this.validForm()} className="btn btn-primary">Apply Changes</button>
                    </form>

                        <form onSubmit={this.handleSubmit}>
                        <div className="form-floating mb-3">
                            <input onChange={this.handlePasswordChange} value={this.state.password} placeholder="Password" required type="password" name="password" id="password" className="form-control" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleVerify_PasswordChange} value={this.state.verify_password} placeholder="Verify Password" required type="password" name="verify-password" id="verify-password" className="form-control" />
                            <label htmlFor="verify-password">Verify Password</label>
                        </div>
                        <button disabled={!this.validForm()} className="btn btn-primary">Apply Changes</button>
                    </form>
                </div>
                <button onClick={() => this.deleteAccount(account.id)} type="button" className='btn btn-danger'>Delete Account</button>
            </div>
            </div>
        )
    }
    }


export default AccountForm
