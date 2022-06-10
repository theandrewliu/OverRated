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
            interested: "",
            ethnicity: "",
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
        this.handleInterestedChange = this.handleInterestedChange.bind(this);
        this.handleEthnicityChange = this.handleEthnicityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};

        const user_Form_Url = `${process.env.REACT_APP_API_HOST}/api/profiles/profiles`;
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
                interested: "",
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
    handleInterestedChange(event) {
        const value = event.target.value;
        this.setState({ interested_in: value });
    }
    handleEthnicityChange(event) {
        const value = event.target.value;
        this.setState({ ethnicity: value });
    }


    render(){
        return (
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Overrated Profile Creation</h1>
                    <br></br>
                    <form onSubmit={this.handleSubmit} id="create-form">

                    <label htmlFor="height">Photos:</label>
                    <div className="form-floating mb-3">
                        <input onChange={this.handlePhotoChange} value={this.state.photo} 
                            type="text" name="photo" 
                            id="photo" className="form-control" />
                    </div>

                    <label htmlFor="height">About Me:</label>
                    <div className="form-floating mb-3">
                        <textarea onChange={this.handleAboutChange} value={this.state.about} 
                            type="textarea" name="textValue" 
                            id="about" className="form-control" />
                    </div>

                    <label htmlFor="height">Height:</label>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleHeightChange} value={this.state.height} 
                            placeholder="Height" type="range" name="height" 
                            id="height" min="4'0" max="8'0" className="slider" />
                    </div>

                    <div className="form-floating mb-3">
                    <label htmlFor="job">Job</label>
                        <input onChange={this.handleJobChange} value={this.state.job} 
                            placeholder="Job" required type="text" name="job" 
                            id="job" className="form-control" />
                    </div>

                    <div className="form-floating mb-3">
                    <label htmlFor="education">Education</label>
                        <input onChange={this.handleEducationChange} value={this.state.education} 
                            placeholder="Education" required type="text" name="education" 
                            id="education" className="form-control" />
                    </div>

                    <div className="form-floating mb-3">
                    <label htmlFor="religion">Religion</label>
                        <input onChange={this.handleReligionChange} value={this.state.religion} 
                            placeholder="Religion" required type="text" name="religion" 
                            id="religion" className="form-control" />
                    </div>

                    <label htmlFor="gender">Gender:</label>
                    <div className="form-floating mb-3">
                        <select>
                        <option value=''>--Select Gender--</option>
                        <option onChange={this.handleGenderChange} 
                            value={this.state.gender==="Male"}>Male</option>

                        <option onChange={this.handleGenderChange} 
                            value={this.state.gender==="Female"}>Female</option>
                        <option onChange={this.handleGenderChange} 
                            value={this.state.gender==="Inter-Sex"}>Inter-Sex</option>
                        </select>
                    </div>

                    <label htmlFor="interested">Interested In:</label>
                    <div className="form-floating mb-3">
                        <select>
                        <option value=''>--Select Interest--</option>
                        <option onChange={this.handleInterestedChange} 
                            value={this.state.interested==="male"}>Male</option>

                        <option onChange={this.handleInterestedChange} 
                            value={this.state.interested==="female"}>Female</option>
                        <option onChange={this.handleInterestedChange} 
                            value={this.state.interested==="everyone"}>Everyone</option>
                        </select>
                    </div>

                    <label htmlFor="sexual_orientation">Sexual Orientation:</label>
                    <div className="form-floating mb-3">
                    <select>
                        <option value=''>--Select Sexual Orientation--</option>
                        <option onChange={this.handleSexual_orientationChange} 
                            value={this.state.sexual_orientation==="Straight"}>Straight</option>
                        <option onChange={this.handleSexual_orientationChange} 
                            value={this.state.sexual_orientation==="Gay"}>Gay</option>
                        <option onChange={this.handleSexual_orientationChange} 
                            value={this.state.sexual_orientation==="Lesbian"}>Lesbian</option>

                        <option onChange={this.handleSexual_orientationChange} 
                            value={this.state.sexual_orientation==="Pan-Sexual"}>Pan-Sexual</option>
                        <option onChange={this.handleSexual_orientationChange} 
                            value={this.state.sexual_orientation==="Demi-Sexual"}>Demi-Sexual</option>
                        <option onChange={this.handleSexual_orientationChange} 
                            value={this.state.sexual_orientation==="A-Sexual"}>A-Sexual</option>
                    </select>
                    </div>

                    <label htmlFor="ethnicity">Ethnicity:</label>
                    <div className="form-floating mb-3">
                    <select>
                        <option value=''>--Select Sexual Orientation--</option>
                        <option onChange={this.handleEthnicityChange} 
                            value={this.state.ethnicity==="caucasian"}>Caucasian</option>
                        <option onChange={this.handleEthnicityChange} 
                            value={this.state.ethnicity==="african_decent"}>African Decent</option>
                        <option onChange={this.handleEthnicityChange} 
                            value={this.state.ethnicity==="native_american"}>Native American</option>

                        <option onChange={this.handleEthnicityChange} 
                            value={this.state.ethnicity==="asian"}>Asian</option>
                        <option onChange={this.handleEthnicityChange} 
                            value={this.state.ethnicity==="pacific_islander"}>Hawaiian or Pacific Islander</option>
                        <option onChange={this.handleEthnicityChange} 
                            value={this.state.ethnicity==="mixed"}>Mixed</option>
                    </select>
                    </div>

                    <label htmlFor="pronouns">Pronouns:</label>
                    <div className="form-floating mb-3">
                    <select>
                        <option value=''>--Select Pronouns--</option>
                        <option onChange={this.handlePronounsChange} 
                            value={this.state.pronouns==="He/Him"} >He/Him</option>
                        <option onChange={this.handlePronounsChange} 
                            value={this.state.pronouns==="She/Her"} >She/Her</option>

                        <option onChange={this.handlePronounsChange} 
                            value={this.state.pronouns==="They/Them"}>They/Them</option>
                        <option onChange={this.handlePronounsChange} 
                            value={this.state.pronouns==="Xe/Xem/Xir"}>Xe/Xem/Xir</option>
                        </select>    
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