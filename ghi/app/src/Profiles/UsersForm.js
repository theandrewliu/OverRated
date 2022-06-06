import React from "react";


class UsersForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            // email: "",
            // first_name: "",
            // last_name: "",
            photo: "",
            about: "",
            height: "",
            job: "",
            education: "",
            gender: "",
            sexual_orientation: "",
            religion: "",
            pronouns: "",
        };
        // this.handleEmailChange = this.handleEmailChange.bind(this);
        // this.handleFirst_nameChange = this.handleDobChange.bind(this);
        // this.handleLast_nameChange = this.handlePasswordChange.bind(this);
        this.handlePhotoChange = this.handleVerify_PasswordChange.bind(this);
        this.handleAboutChange = this.handleEmailChange.bind(this);
        this.handleHeightChange = this.handleUsernameChange.bind(this);
        this.handleJobChange = this.handleDobChange.bind(this);
        this.handleEducationChange = this.handlePasswordChange.bind(this);
        this.handleGenderChange = this.handleVerify_PasswordChange.bind(this);
        this.handleSexual_orientationChange = this.handleDobChange.bind(this);
        this.handleReligionChange = this.handlePasswordChange.bind(this);
        this.handlePronounsChange = this.handleVerify_PasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};

        const user_Form_Url = "http://localhost:8090";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(user_Form_Url, fetchConfig);
        if(response.ok){
            const userform = await response.json();
            console.log(userform);
            this.setState({
                // email: "",
                // first_name: "",
                // last_name: "",
                photo: "",
                about: "",
                height: "",
                job: "",
                education: "",
                gender: "",
                sexual_orientation: "",
                religion: "",
                pronouns: "",
            });
        }
    }

    // handleEmailChange(event) {
    //     const value = event.target.value;
    //     this.setState({ email: value });
    // }
    // handleFirst_nameChange(event) {
    //     const value = event.target.value;
    //     this.setState({ first_name: value });
    // }
    // handleLast_nameChange(event) {
    //     const value = event.target.value;
    //     this.setState({ last_name: value });
    // }
    handlePhotoChange(event) {
        const value = event.target.value;
        this.setState({ photo: value });
    }
    handleAboutChange(event) {
        const value = event.target.value;
        this.setState({ About: value });
    }
    handleHeightChange(event) {
        const value = event.target.value;
        this.setState({ Height: value });
    }
    handleJobChange(event) {
        const value = event.target.value;
        this.setState({ Job: value });
    }
    handleEducationChange(event) {
        const value = event.target.value;
        this.setState({ Education: value });
    }
    handleGenderChange(event) {
        const value = event.target.value;
        this.setState({ Gender: value });
    }
    handleSexual_orientationChange(event) {
        const value = event.target.value;
        this.setState({ sexual_orientation: value });
    }
    handleReligionChange(event) {
        const value = event.target.value;
        this.setState({ religion: value });
    }
    handlePronounsChange(event) {
        const value = event.target.value;
        this.setState({ pronouns: value });
    }

    render(){
        return (
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Overrated Sign Up Form</h1>
                    <form onSubmit={this.handleSubmit} id="create-form">
                    {/* <div className="form-floating mb-3">
                        <input onChange={this.handleEmailChange} value={this.state.email} placeholder="Email" required type="email" name="email" id="email" className="form-control" />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleFirst_nameChange} value={this.state.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                        <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleLast_nameChange} value={this.state.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                        <label htmlFor="last_name">Last Name</label> */}
                    {/* </div> */}
                    <div className="form-floating mb-3">
                        <input onChange={this.handlePhotoChange} value={this.state.photo} placeholder="Photo" required type="image" name="photo" id="photo" className="form-control" />
                        <label htmlFor="photo">Photo</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleAboutChange} value={this.state.about} placeholder="About" required type="text" name="about" id="about" className="form-control" />
                        <label htmlFor="about">About Me</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleHeightChange} value={this.state.height} placeholder="Height" required type="number" name="height" id="height" className="form-control" />
                        <label htmlFor="height">Height</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleJobChange} value={this.state.job} placeholder="Job" required type="text" name="job" id="job" className="form-control" />
                        <label htmlFor="job">Job</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleEducationChange} value={this.state.education} placeholder="Education" required type="text" name="education" id="education" className="form-control" />
                        <label htmlFor="education">Education</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleGenderChange} value={this.state.gender} placeholder="Gender" required type="text" name="gender" id="gender" className="form-control" />
                        <label htmlFor="gender">Gender</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleSexual_orientationChange} value={this.state.sexual_orientation} placeholder="Sexual Orientation" required type="text" name="sexual_orientation" id="sexual_orientation" className="form-control" />
                        <label htmlFor="sexual_orientation">Sexual Orientation</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleReligionChange} value={this.state.religion} placeholder="Religion" required type="text" name="religion" id="religion" className="form-control" />
                        <label htmlFor="religion">Religion</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handlePronounsChange} value={this.state.pronouns} placeholder="Pronouns" required type="text" name="pronouns" id="pronouns" className="form-control" />
                        <label htmlFor="pronouns">Pronouns</label>
                    </div>
                    <button className="btn btn-primary">Edit</button>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default UsersForm;