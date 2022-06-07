import React from "react";


class ProfileForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            photo: "",
            about: "",
            height: "",
            job: "",
            education: "",
            gender: "",
            sexual_orientation: "",
            religion: "",
            pronouns: "",
            interested_in: "",
        };
        
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.handleAboutChange = this.handleAboutChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
        this.handleJobChange = this.handleJobChange.bind(this);
        this.handleEducationChange = this.handleEducationChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleSexual_orientationChange = this.handleSexual_orientationChange.bind(this);
        this.handleReligionChange = this.handleReligionChange.bind(this);
        this.handlePronounsChange = this.handlePronounsChange.bind(this);
        this.handleInterested_InChange = this.handleInterested_InChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};

        const user_Form_Url = "http://localhost:3000/api/my_profile/";
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
                photo: "",
                about: "",
                height: "",
                job: "",
                education: "",
                gender: "",
                sexual_orientation: "",
                religion: "",
                pronouns: "",
                interested_in: "",
            });
        }
    }


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
    handleInterested_InChange(event) {
        const value = event.target.value;
        this.setState({ interested_in: value });
    }


    render(){
        return (
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Overrated Sign Up Form</h1>
                    <form onSubmit={this.handleSubmit} id="create-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handlePhotoChange} value={this.state.photo} placeholder="Photo" required type="image" name="photo" id="photo" className="form-control" />
                        <label htmlFor="photo">Photo</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleAboutChange} value={this.state.about} placeholder="About" required type="text" name="about" id="about" className="form-control" />
                        <label htmlFor="about">About Me</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={this.handleHeightChange} value={this.state.height} placeholder="Height" required type="range" name="height" id="height" min="4'0&quot" max="8'0&quot" className="form-control" />
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
                    <div className="form-floating mb-3">
                        <input onChange={this.handleInterested_InChange} value={this.state.interested_in} placeholder="Interested In" required type="text" name="interested_in" id="interested_in" className="form-control" />
                        <label htmlFor="interested_in">Interested In</label>
                    </div>
                    <button className="btn btn-primary">Edit</button>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default ProfileForm;