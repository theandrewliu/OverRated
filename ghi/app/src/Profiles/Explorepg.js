import React from "react";
import { Navigate } from "react-router-dom";
import './profile.css';
import { calculateAge } from "./ConnectionsList";


class ProfileDetail extends React.Component {
  constructor(props) {
    super(props);
    this.likes = this.likes.bind(this)
    this.dislikes = this.dislikes.bind(this)
    this.state = {
      theirprofile: "",
      ourprofile: "",
      redirect: false,
  };
  }

  async getTheirDetails() {
    const url = `${process.env.REACT_APP_API_HOST}/api/random`;
    const response = await fetch(url, {
      credentials: 'include',
      
    });
    if (response.ok) {
      this.setState({
        theirprofile: await response.json(),
      });
    }else if (response.status === 401){
      this.setState({redirect: true})
    }
  }

  async getMyDetails() {
    const url = `${process.env.REACT_APP_API_HOST}/api/profiles/mine`;
    const response = await fetch(url, {
      credentials: 'include',
      
    });
    if (response.ok) {
      this.setState({
        ourprofile: await response.json(),
      });
    }else if (response.status === 401){
      this.setState({redirect: true})
    }
  }



  async likes() {
    const url = `${process.env.REACT_APP_API_HOST}/api/profiles/${this.state.theirprofile.id}/liked`;
    // const form = new FormData();
    // form.append('active_id', this.state.ourprofile.id);
    const form = {'target_user_id': this.state.theirprofile.id};
    const response = await fetch(url, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(form),
      headers: {
          'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
        window.location.reload(false);
    }
    let error = await response.json();
    return error.detail;
  }

  async dislikes() {
    const url = `${process.env.REACT_APP_API_HOST}/api/profiles/${this.state.theirprofile.id}/disliked`;
    // const form = new FormData();
    // form.append('active_id', this.state.ourprofile.id);
    const form = {'target_user_id': this.state.theirprofile.id};
    const response = await fetch(url, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(form),
      headers: {
          'Content-Type': 'application/json',
      },
    });
    console.log("test", response)
    if (response.ok) {
        window.location.reload(false);
    }
    let error = await response.json();
    return error.detail;
  }


  componentDidMount() {
    this.getMyDetails();
    this.getTheirDetails();
  }
  
    render() {
      if(this.state.redirect === true){
        return <Navigate to = '/login' />;
      }
      let feet = Math.floor(this.state.theirprofile.height/12)
      let inch = this.state.theirprofile.height%12

      let photo = this.state.theirprofile.photo 
      if (this.state.theirprofile.photo === null) {
          photo = "/images/blank-profile-pic.png"
      }    
      return (
        <>
        <div className="profileContainer">
          <div className = 'container pic-name' >
              <h1>
                {this.state.theirprofile.first_name + " " + this.state.theirprofile.last_name}
              </h1>       
              <img src={photo} alt="pic" width="70%" height="70%" />
          </div>
          <div className="details">
              <h1>
                Details
              </h1>
              <div className><b>Pronouns:</b> {this.state.theirprofile.pronouns}</div>
              <div className><b>Age:</b> {calculateAge(this.state.theirprofile.date_of_birth)}</div>
              <div className><b>Location:</b> {this.state.theirprofile.location}</div>
              <div className><b>Height:</b> { feet } ft { inch } inch</div>
              <div className><b>Job:</b> {this.state.theirprofile.job}</div>
              <div className><b>Education:</b> {this.state.theirprofile.education}</div>
              <div className><b>Gender:</b> {this.state.theirprofile.gender}</div>
              <div className><b>Sexual Orientation:</b> {this.state.theirprofile.sexual_orientation}</div>
              <div className><b>Religion:</b> {this.state.theirprofile.religion}</div>
              <div className><b>Ethnicity:</b> {this.state.theirprofile.ethnicity}</div>
          </div>
          <div className="mySummary">
               <h1>
                About Me
              </h1>
            {this.state.theirprofile.about}
          </div>
          <div className="reviews">
              <h1>
                Review Score
              </h1>
            {this.state.theirprofile.average_rating}
          </div>
          <button className = 'dislikebutton' onClick={ this.dislikes}>Dislike</button>
          <button className = 'likebutton' onClick={ this.likes}>Like</button>
        </div>
        </>
      );
    }
  }
  
  export default ProfileDetail;


