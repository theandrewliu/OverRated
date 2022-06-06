import React from 'react';
import { Link, Navigate } from 'react-router-dom';


class ProfileCreation extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            about: '',
            height: '',
            job: '',
            education: '',
            gender: '',
            sexual_orientation: '',
            religion: '',
            ethnicity: '',
            pronouns: '',
            interested_in: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const newState = {}
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }

    async componentDidMount() {
        const url = "http://localhost:3000/api/my_profile/";
        const response = await fetch(url);
        console.log(response)

        if (response.ok && salesResponse.ok) {
            const saleData = await salesResponse.json();
            const data = await response.json();
            console.log(data)

            

            this.setState({
                sales_records: data.salesrecord,
                salesReps: saleData.salesrep,
            })
            
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.sales_rep = data.salesReps;        
        delete data.salesReps;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(fetchConfig);
          if (response.ok) {
            const newName = await response.json();
            console.log(newName)          
            const cleared = {
              salesRep: ''
            }
            this.setState(cleared);
          }
        }

    validForm() {
        return this.state.password.length >= 8 &&
               this.state.password === this.state.verify_password &&
               this.state.email &&
               this.state.username &&
               this.state.dob;
    }

    render() {
        if (this.props.token) {
            return <Navigate to="/my_profile" />;
        }
        return (
            <div>
                <h1>Create a Profile!</h1>
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
                        <button disabled={!this.validForm()} className="btn btn-primary">Sign Up</button>
                        <div>
                            <Link to="/login">Login</Link>
                        </div>
                        </form>
            </div>
        );
    }
}


export default ProfileCreation
