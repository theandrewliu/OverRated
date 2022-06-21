import React, { Navigate } from 'react';
import { useParams } from "react-router-dom";




function AccountGetter(){
    const params = useParams();
    const account_id = params.id;
    console.log("Taco Bell", account_id)
    return <AccountForm account_id = {account_id}></AccountForm>
  }

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
    };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirst_nameChange = this.handleFirst_nameChange.bind(this);
        this.handleLast_nameChange = this.handleLast_nameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleVerify_PasswordChange = this.handleVerify_PasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // async deleteAccount(event){
    //     event.preventDefault();
    //     const deleteUrl = `${process.env.REACT_APP_API_HOST}/api/profiles/myself`;
    //     const fetchConfig = {method: "DELETE"}

    //     const response = await fetch(deleteUrl, fetchConfig);
    //     if(response.ok){
    //         console.log(response);
    //         window.location.reload();
    //     }
    // };


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log("Taco Taco", data);
        const url = `${process.env.REACT_APP_API_HOST}/accounts/${this.props.account_id}`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                credentials: "include",
            },
        };

        const response = await fetch(url, fetchConfig);
        console.log("talking", response)
        if(response.ok){
            const accountform = await response.json();
            console.log("Taco Bueno", accountform);
            this.setState({
                email: '',
                username: '',
                first_name: '',
                last_name: '',
                password: '',
                verify_password: '',
                error: '',
            })
        } else if (!response.ok){
            const message = ` An error: ${response.status} - ${response.statusText}`;
            throw new Error(message);
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
               this.state.username &&
               this.state.first_name &&
               this.state.last_name &&
               this.state.location;
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
                    <h1>Account Settings</h1>
                    <hr/>
                    <br></br>
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleEmailChange} value={this.state.email} placeholder="Email" required type="email" name="email" id="email" className="form-control" />
                            <label htmlFor="email">Email</label>
                        <button className="btn btn-primary">Edit</button>
                    </div>
                    </form>

                    <form onSubmit={this.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleLocationChange} value={this.state.location} placeholder="Location" required type="text" name="location" id="location" className="form-control" />
                            <label htmlFor="location">Location</label>
                        <button className="btn btn-primary">Edit</button>
                    </div>
                    </form>

                    <form onSubmit={this.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleFirst_nameChange} value={this.state.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                            <label htmlFor="first_name">First Name</label>
                        <button className="btn btn-primary">Edit</button>
                    </div>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleLast_nameChange} value={this.state.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                            <label htmlFor="last_name">Last Name</label> 
                        <button className="btn btn-primary">Edit</button>
                    </div>
                    </form>

                    <form onSubmit={this.handleSubmit}>
                    <div className="form-floating mb-3">
                            <input onChange={this.handleUsernameChange} value={this.state.username} placeholder="Username" required type="text" name="username" id="username" className="form-control" />
                                <label htmlFor="username">Username</label>
                            <button className="btn btn-primary">Edit</button>
                        </div>
                    </form>

                        <form onSubmit={this.handleSubmit}>
                        <div className="form-floating mb-3" >
                            <input onChange={this.handlePasswordChange} value={this.state.password} 
                                placeholder="Password" required type="password" name="password" id="password" />
                            <input onChange={this.handleVerify_PasswordChange} value={this.state.verify_password} 
                                placeholder="Verify Password" required type="password" name="verify-password" id="verify-password" />
                            <button disabled={!this.validForm()} className="btn btn-primary">Edit</button>
                        </div>
                    </form>
                </div>
                {/* <button onClick={() => this.deleteAccount(account_id)} type="button" className='btn btn-danger'>Delete Account</button> */}
            </div>
            </div>
        )
    }
    }


export default AccountGetter;
