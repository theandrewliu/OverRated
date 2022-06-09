import React from "react";
import { Navigate } from "react-router-dom";
import './profile.css';


class ProfileDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: "",
      redirect: false,
  };
  }

  async getMyDetails() {
    const url = `${process.env.REACT_APP_API_HOST}/api/random`;
    const response = await fetch(url, {
      credentials: 'include',
      
    });
    if (response.ok) {
      this.setState({
        profile: await response.json(),
      });
    }else if (response.status === 401){
      this.setState({redirect: true})
    }
  }


  componentDidMount() {
    this.getMyDetails();
  }
  
    render() {
      console.log(this.state)
      if(this.state.redirect === true){
        return <Navigate to = '/login' />;
      }
      return (
        <>
        <div className="profileContainer">
          <div className = 'container pic-name' >
              <h1>
                {this.state.profile.first_name + " " + this.state.profile.last_name}
              </h1>            
            {this.state.profile.photo}
          </div>
          <div className="details">
              <h1>
                Details
              </h1>
              <div className>Pronouns: {this.state.profile.pronouns}</div>
              <div className>Birthday: {this.state.profile.date_of_birth}</div>
              <div className>Location: {this.state.profile.location}</div>
              <div className>Height: {this.state.profile.height}</div>
              <div className>Job: {this.state.profile.job}</div>
              <div className>Education: {this.state.profile.education}</div>
              <div className>Gender: {this.state.profile.gender}</div>
              <div className>Sexual Orientation: {this.state.profile.sexual_orientation}</div>
              <div className>Religion: {this.state.profile.religion}</div>
              <div className>Ethnicity: {this.state.profile.ethnicity}</div>
          </div>
          <div className="mySummary">
               <h1>
                About Me
              </h1>
            {this.state.profile.about}
          </div>
          <div className="reviews">
              <h1>
                Review Score
              </h1>
            {this.state.profile.reviews}
          </div>
          <button className = 'dislikebutton'>Dislike</button>
          <button className = 'likebutton'>Like</button>
        </div>
        </>
      );
    }
  }
  
  export default ProfileDetail;


