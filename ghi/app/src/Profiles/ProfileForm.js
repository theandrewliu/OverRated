import React from "react";
import './profile.css';

// need to fix the height scale
// Fix the input box. imo they're too big

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
            location: "",
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
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleEthnicityChange = this.handleEthnicityChange.bind(this);
        this.handleInterestedChange = this.handleInterestedChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};

        const user_Form_Url = `${process.env.REACT_APP_API_HOST}/api/profiles/myself`;
        const fetchConfig = {
            method: "PUT",
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
                ethnicity: "",
                location: "",
            });
        }
    }

    handlePhotoChange(event) {
        const value = event.target.value;
        this.setState({ photo: value });
    }
    handleAboutChange(event) {
        const value = event.target.value;
        this.setState({ about: value });
    }
    handleHeightChange(event) {
        const value = event.target.value;
        this.setState({ height: value });
    }
    handleJobChange(event) {
        const value = event.target.value;
        this.setState({ job: value });
    }
    handleEducationChange(event) {
        const value = event.target.value;
        this.setState({ education: value });
    }
    handleGenderChange(event) {
        const value = event.target.value;
        this.setState({ gender: value });
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
    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({ location: value });
    }
    handleEthnicityChange(event) {
        const value = event.target.value;
        this.setState({ ethnicity: value });
    }
    handleInterestedChange(event) {
        const value = event.target.value;
        this.setState({ interested: value });
    }

    render(){
        return (
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Edit Your CatFish Information</h1>
                    <br></br>
                    <form onSubmit={this.handleSubmit} id="create-form">
{/* ------------------------Photos */}
                    <label htmlFor="height">Photos:</label>
                    <div className="form-floating mb-3">
                        <input onChange={this.handlePhotoChange} value={this.state.photo} 
                            placeholder="Photo" type="text" name="photo" 
                            id="photo" className="form-control" />
                    <button onSubmit={this.handleSubmit} className="btn btn-primary" value="Submit" form="create-form" type="submit">Upload</button>
                    </div>
                    </form>
{/* ------------------------About */}
                    <form onSubmit={this.handleSubmit} id="textarea">
                    <label htmlFor="about">About Me:</label>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleAboutChange} type="textarea" name="textValue" 
                            value={this.state.about} className="form-control" />
                    </div>
{/* ------------------------Height */}
                    <label htmlFor="height">Height:</label>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleHeightChange} value={this.state.height} 
                            type="number" name="height" 
                            min="4.0" max="8.0" className="form-control" />
                    </div>
{/* ------------------------Job */}
                    <label htmlFor="job">Job:</label>
                    <div className="form-floating mb-3" id="form_input">
                        <input onChange={this.handleJobChange} value={this.state.job} 
                            placeholder="Job" type="text" name="job" 
                            id="job" className="form-control" />
                    </div>
 {/* ------------------------Education */}
                    <label htmlFor="education">Education:</label>
                    <div className="form-floating mb-3" id="form_input">
                        <input onChange={this.handleEducationChange} value={this.state.education} 
                            placeholder="Education" type="text" name="education" 
                            id="education" className="form-control" />
                    </div>
{/* ------------------------Location */}
                    <label htmlFor="location">Location</label>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleLocationChange} value={this.state.location} 
                            placeholder="Location" type="text" name="location" 
                            id="location" className="form-control" />
                        </div>
 {/* --------------------Religion */}
                    <label htmlFor="religion">Religion:</label>
                    <div onChange={this.handleReligionChange} value={this.state.religion}>
                        <input type="radio" value="Christian" name="religion" />: Christian
                        <input type="radio" value="Judaism" name="religion" />: Judaism
                        <input type="radio" value="Islam" name="religion" />: Islam

                        <input type="radio" value="Hinduism" name="religion" />: Hinduism<br></br>
                        <input type="radio" value="Buddhism" name="religion" />: Buddhism

                        <input type="radio" value="Pagan" name="religion" />: Pagan
                        <input type="radio" value="Agnostic" name="religion" />: Agnostic
                        <input type="radio" value="Atheist" name="religion" />: Atheist
                    </div>                    
{/* --------------------Gender */}
                    <label htmlFor="gender">Gender:</label>
                    <div onChange={this.handleGenderChange}  value={this.state.gender} >
                    <img src="/images/Male.png" alt="gender" width="60" height="80"></img>
                        <input type="radio" value="male" name="gender" />: Male

                        <img src="/images/Female.png" alt="gender" width="60" height="80"></img>
                        <input type="radio" value="female" name="gender" />: Female

                        <img src="/images/Intersex.png" alt="gender" width="60" height="80"></img>
                        <input type="radio" value="other" name="gender" />: Inter-Sex
                    </div>
{/* ------------------------Interested */}
                    <label htmlFor="interested">Interested In:</label>
                    <div className="form-floating mb-3" >
                        <select value={this.state.interested} onChange={this.handleInterestedChange}>
                        <option value=''>--Select Interest--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="everyone">Everyone</option>
                        </select>
                    </div>
{/* ------------------------Sexual */}
                    <label htmlFor="sexual_orientation">Sexual Orientation:</label>
                    <div className="form-floating mb-3">
                    <select onChange={this.handleSexual_orientationChange} value={this.state.sexual_orientation}>
                        <option value=''>--Select Sexual Orientation--</option>
                        <option value="straight">Straight</option>
                        <option value="gay">Gay</option>
                        <option value="lesbian">Lesbian</option>

                        <option value="pan_sexual">Pan-Sexual</option>
                        <option value="demi_sexual">Demi-Sexual</option>
                        <option value="a_sexual">A-Sexual</option>
                    </select>
                    </div>
{/* ------------------------Ethnicity */}
                    <label htmlFor="ethnicity">Ethnicity:</label>
                    <div className="form-floating mb-3" onChange={this.handleEthnicityChange}>
                    <select>
                        <option value=''>--Select Sexual Orientation--</option>
                        <option value={this.state.ethnicity==="caucasian"}>Caucasian</option>
                        <option value={this.state.ethnicity==="african_decent"}>African Decent</option>
                        <option value={this.state.ethnicity==="native_american"}>Native American</option>

                        <option value={this.state.ethnicity==="asian"}>Asian</option>
                        <option value={this.state.ethnicity==="pacific_islander"}>Hawaiian or Pacific Islander</option>
                        <option value={this.state.ethnicity==="mixed"}>Mixed</option>
                    </select>
                    </div>
{/* ------------------------Pronouns */}
                    <label htmlFor="pronouns">Pronouns:</label>
                    <div className="form-floating mb-3" >
                    <select value={this.state.pronouns} onChange={this.handlePronounsChange} >
                        <option value=''>--Select Pronouns--</option>
                        <option value="He/Him" >He/Him</option>
                        <option value="She/Her" >She/Her</option>

                        <option value="They/Them">They/Them</option>
                        <option value="Xe/Xem/Xir">Xe/Xem/Xir</option>
                        </select>    
                    </div>

                    <button className="btn btn-primary">
                    <a href="http://localhost:3000/my_profile" 
                    style={{ color: "white" }}>Apply Changes</a></button>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default ProfileForm;